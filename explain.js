/**
 * FILE: explain.js
 * Chức năng:
 * 1. Sinh câu nhận xét mẫu tiếng Việt & tiếng Anh theo danh sách câu mẫu cố định (i18n).
 * 2. Định dạng điểm số (+2.47, -1.30, M3) và câu mô tả thế cờ theo góc nhìn Trắng.
 * 3. Giải thích chi tiết cho nút "Explain" (Mức thiệt hại + Gợi ý PV đổi sang SAN + Lý do chiến thuật).
 */

// Tên các quân cờ theo ngôn ngữ
const PIECE_NAMES = {
    vi: { p: 'Tốt', n: 'Mã', b: 'Tượng', r: 'Xe', q: 'Hậu', k: 'Vua', piece: 'quân cờ' },
    en: { p: 'Pawn', n: 'Knight', b: 'Bishop', r: 'Rook', q: 'Queen', k: 'King', piece: 'piece' }
};
const PIECE_NAMES_VI = PIECE_NAMES.vi;

// Giá trị tương đối của từng quân cờ để phát hiện mất quân / ăn quân
const PIECE_VALUES = {
    p: 1,
    n: 3,
    b: 3,
    r: 5,
    q: 9,
    k: 100
};

/**
 * Chống tấn công XSS: Chuyển đổi các ký tự nguy hiểm sang thực thể HTML an toàn
 */
function escapeHTML(str) {
    if (typeof str !== 'string') {
        if (str === null || str === undefined) return '';
        str = String(str);
    }
    return str.replace(/[&<>'"]/g, match => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
    }[match]));
}

/**
 * Trợ thủ lấy hàm khởi tạo Chess an toàn cho cả trình duyệt và Node.js
 */
function getChessConstructor() {
    if (typeof Chess !== 'undefined') return Chess;
    if (typeof window !== 'undefined' && window.Chess) return window.Chess;
    if (typeof global !== 'undefined' && global.Chess) return global.Chess;
    try {
        const c = require('./chess.js');
        return c.Chess || c;
    } catch (e) {
        return null;
    }
}

/**
 * Chọn câu nhận xét cho nước đi (Đa ngôn ngữ & Chống lặp thông minh qua CoachDialogue)
 * @param {string} san - Ký hiệu SAN của nước vừa đi
 * @param {string} category - Loại nước đi
 * @param {number} moveIndex - Chỉ số nước đi
 * @param {boolean} isUserMove - true nếu là nước của mình
 * @param {string} lang - 'vi' hoặc 'en'
 * @param {Object} [context={}] - Ngữ cảnh bàn cờ bổ sung ({ move, prevPos, currPos, bestSan })
 */
function getCoachCommentText(san, category, moveIndex = 1, isUserMove = true, lang = (typeof currentLang !== 'undefined' ? currentLang : 'vi'), context = {}) {
    const CoachDialogueModule = (typeof CoachDialogue !== 'undefined')
        ? CoachDialogue
        : (typeof window !== 'undefined' && window.CoachDialogue ? window.CoachDialogue : null);

    if (CoachDialogueModule && typeof CoachDialogueModule.getDynamicCoachComment === 'function') {
        return CoachDialogueModule.getDynamicCoachComment({
            san,
            category,
            moveIndex,
            isUserMove,
            lang,
            move: context.move || {},
            prevPos: context.prevPos || null,
            currPos: context.currPos || null,
            bestSan: context.bestSan || ''
        });
    }

    return `${san}: ${category}`;
}

/**
 * Định dạng điểm đánh giá cạnh bên theo góc nhìn quân Trắng hoặc quân người chơi
 * @param {Object} evalObj - Đối tượng eval của thế cờ
 * @param {string} [userColor='w'] - Màu quân người chơi ('w' hoặc 'b')
 * @returns {string} Chuỗi điểm hiển thị
 */
function formatEvaluationBadge(evalObj, userColor = 'w') {
    if (!evalObj) return '0.00';
    const isBlack = (userColor === 'b');
    const multiplier = isBlack ? -1 : 1;

    if (evalObj.mateWhite !== null && evalObj.mateWhite !== undefined) {
        if (evalObj.mateWhite === 0) {
            if (isBlack) {
                return evalObj.cpWhite > 0 ? '0-1' : '1-0';
            }
            return evalObj.cpWhite > 0 ? '1-0' : '0-1';
        }
        const userMate = evalObj.mateWhite * multiplier;
        const absMate = Math.abs(userMate);
        const sign = userMate < 0 ? '-' : '';
        return `${sign}M${absMate}`;
    }

    const pawns = ((evalObj.cpWhite || 0) * multiplier) / 100;
    const sign = pawns >= 0 ? '+' : '';
    return `${sign}${pawns.toFixed(2)}`;
}

/**
 * Mô tả thế cờ bằng lời dựa trên điểm thế cờ và góc nhìn người chơi (Đa ngôn ngữ)
 * @param {Object} evalObj - Đối tượng eval của thế cờ
 * @param {string} lang - 'vi' hoặc 'en'
 * @param {string} [userColor='w'] - 'w' hoặc 'b'
 * @returns {string} Câu mô tả thế cờ
 */
function getPositionDescriptionText(evalObj, lang = (typeof currentLang !== 'undefined' ? currentLang : 'vi'), userColor = 'w') {
    const isEn = lang === 'en';
    if (!evalObj) return isEn ? 'Equal position.' : 'Thế cờ cân bằng.';

    if (evalObj.mateWhite !== null && evalObj.mateWhite !== undefined) {
        if (evalObj.mateWhite === 0) {
            const winner = evalObj.cpWhite >= 0 ? (isEn ? 'White' : 'Trắng') : (isEn ? 'Black' : 'Đen');
            return isEn ? `${winner} delivered checkmate.` : `${winner} đã chiếu hết đối phương.`;
        }
        const side = evalObj.mateWhite > 0 ? (isEn ? 'White' : 'Trắng') : (isEn ? 'Black' : 'Đen');
        const steps = Math.abs(evalObj.mateWhite);
        return isEn ? `${side} has mate in ${steps}.` : `${side} sẽ chiếu hết sau ${steps} nước.`;
    }

    const pawns = (evalObj.cpWhite || 0) / 100;
    const absPawns = Math.abs(pawns);
    const advantageSide = pawns >= 0 ? (isEn ? 'White' : 'Trắng') : (isEn ? 'Black' : 'Đen');

    if (absPawns < 0.5) {
        return isEn ? 'Equal position.' : 'Thế cờ cân bằng.';
    } else if (absPawns <= 1.5) {
        return isEn ? `${advantageSide} is slightly better.` : `${advantageSide} nhỉnh hơn một chút.`;
    } else if (absPawns <= 3.0) {
        return isEn ? `${advantageSide} has a clear advantage.` : `${advantageSide} đang chiếm ưu thế.`;
    } else {
        return isEn ? `${advantageSide} is winning.` : `${advantageSide} gần như thắng chắc.`;
    }
}

/**
 * Chuyển một nước đi từ định dạng UCI sang đối tượng move chi tiết của chess.js
 */
function applyUciMove(chessInstance, uciMove) {
    if (!uciMove || uciMove.length < 4) return null;
    const from = uciMove.slice(0, 2);
    const to = uciMove.slice(2, 4);
    const promotion = uciMove.length > 4 ? uciMove[4] : 'q';
    return chessInstance.move({ from, to, promotion });
}

/**
 * Đổi mảng đường biến chính (PV dạng UCI) sang chuỗi ký hiệu SAN bằng chess.js
 * @param {string} fenBefore - FEN trước khi đi nước đó
 * @param {Array<string>} pvUciList - Mảng các nước UCI trong PV
 * @param {number} maxMoves - Số nước tối đa cần lấy
 * @param {string} lang - 'vi' hoặc 'en'
 * @returns {{ bestSan: string|null, continuationText: string }}
 */
function convertPvToSanLine(fenBefore, pvUciList, maxMoves = 4, lang = (typeof currentLang !== 'undefined' ? currentLang : 'vi')) {
    if (!pvUciList || pvUciList.length === 0) {
        return { bestSan: null, continuationText: '' };
    }

    const ChessClass = getChessConstructor();
    if (!ChessClass) return { bestSan: null, continuationText: '' };
    const chess = new ChessClass(fenBefore);
    const sanMoves = [];

    const limit = Math.min(pvUciList.length, maxMoves);
    for (let i = 0; i < limit; i++) {
        const turnBeforeMove = chess.turn();
        const moveObj = applyUciMove(chess, pvUciList[i]);
        if (!moveObj) break;

        if (i === 0) {
            sanMoves.push(escapeHTML(moveObj.san));
        } else {
            const prefix = (turnBeforeMove === 'b') ? '...' : '';
            sanMoves.push(`${prefix}${escapeHTML(moveObj.san)}`);
        }
    }

    if (sanMoves.length === 0) {
        return { bestSan: null, continuationText: '' };
    }

    const bestSan = sanMoves[0];
    const followUp = sanMoves.slice(1);
    const continuationPrefix = lang === 'en' ? 'Possible continuation: ' : 'Sau đó có thể diễn ra: ';
    const continuationText = followUp.length > 0
        ? `${continuationPrefix}${followUp.join(', ')}.`
        : '';

    return { bestSan, continuationText };
}

/**
 * Lấy tên đầy đủ của quân cờ theo ngôn ngữ
 */
function getPieceName(code, lang = 'vi') {
    if (!code) return lang === 'en' ? 'piece' : 'quân cờ';
    const dict = PIECE_NAMES[lang] || PIECE_NAMES.vi;
    return dict[code.toLowerCase()] || (lang === 'en' ? 'piece' : 'quân cờ');
}

/**
 * Diễn giải một nước đi đơn lẻ trong chuỗi biến thành lời nói tự nhiên
 */
function describeSingleMoveStory(moveObj, isMoverTurn, lang = 'vi') {
    const isEn = lang === 'en';
    const piece = (moveObj.piece || 'p').toLowerCase();
    const pieceName = escapeHTML(getPieceName(piece, lang));
    const captured = moveObj.captured ? moveObj.captured.toLowerCase() : null;
    const capturedName = captured ? escapeHTML(getPieceName(captured, lang)) : '';
    const to = escapeHTML(moveObj.to);
    const san = escapeHTML(moveObj.san);

    if (san === 'O-O' || san === 'O-O-O') {
        return isEn
            ? `Castle (${san}) to safety`
            : `Nhập thành (${san}) để bảo vệ Vua`;
    }
    if (moveObj.promotion) {
        const promoName = getPieceName(moveObj.promotion, lang);
        return isEn
            ? `promote pawn to ${promoName} on ${to} (${san})`
            : `phong cấp Tốt thành ${promoName} ở ${to} (${san})`;
    }
    if (captured) {
        return isEn
            ? `capture the ${capturedName} on ${to} with ${pieceName} (${san})`
            : `dùng ${pieceName} ăn ${capturedName} ở ${to} (${san})`;
    }
    if (san.includes('+') || san.includes('#')) {
        return isEn
            ? `check with ${pieceName} to ${to} (${san})`
            : `đưa ${pieceName} lên ${to} chiếu Vua (${san})`;
    }
    return isEn
        ? `play ${pieceName} to ${to} (${san})`
        : `đi ${pieceName} lên ${to} (${san})`;
}

/**
 * Dịch chuỗi biến chính (PV) của máy tính ra câu chuyện đàm thoại từng bước
 */
function translatePvToConversationalStory(fen, pvUciList, userColor, lang = 'vi') {
    const isEn = lang === 'en';
    if (!pvUciList || pvUciList.length === 0) return '';

    try {
        const ChessClass = getChessConstructor();
        if (!ChessClass) return '';
        const chess = new ChessClass(fen);
        const steps = [];
        const limit = Math.min(pvUciList.length, 3);

        for (let i = 0; i < limit; i++) {
            const turn = chess.turn();
            const isPlayer = turn === userColor;
            const moveObj = applyUciMove(chess, pvUciList[i]);
            if (!moveObj) break;

            const action = describeSingleMoveStory(moveObj, isPlayer, lang);
            if (i === 0) {
                if (isEn) {
                    steps.push(`${isPlayer ? 'You should' : 'The opponent will likely'} ${action}`);
                } else {
                    steps.push(`${isPlayer ? 'Bạn nên' : 'Đối thủ nhiều khả năng sẽ'} ${action}`);
                }
            } else if (i === 1) {
                if (isEn) {
                    steps.push(`${isPlayer ? 'then you can' : 'then opponent replies by'} ${action}`);
                } else {
                    steps.push(`${isPlayer ? 'kế tiếp bạn có thể' : 'tiếp theo đối thủ sẽ'} ${action}`);
                }
            } else {
                if (isEn) {
                    steps.push(`followed by ${action}`);
                } else {
                    steps.push(`sau đó ${action}`);
                }
            }
        }

        if (steps.length === 0) return '';
        return steps.join(isEn ? ', ' : ', ') + '.';
    } catch (e) {
        return '';
    }
}

/**
 * Phần 1: Ý nghĩa nước đi vừa rồi (What this move does)
 * Đổi ký hiệu sang tên quân đầy đủ, giải thích cụ thể điểm đến và hành vi với tư duy thế trận đỉnh cao
 */
function describeMoveAction(currPos, isUserMove, lang = 'vi') {
    const isEn = lang === 'en';
    const move = currPos.move || {};
    const san = escapeHTML(move.san || '');
    const from = escapeHTML(move.from || '');
    const to = escapeHTML(move.to || '');
    const piece = (move.piece || 'p').toLowerCase();
    const captured = move.captured ? move.captured.toLowerCase() : null;
    const pieceName = escapeHTML(getPieceName(piece, lang));
    const capturedName = captured ? escapeHTML(getPieceName(captured, lang)) : '';

    const subject = isEn ? (isUserMove ? 'You' : 'Your opponent') : (isUserMove ? 'Bạn' : 'Đối thủ');
    const oppPossessive = isEn ? (isUserMove ? "the opponent's" : 'your') : (isUserMove ? 'của đối thủ' : 'của bạn');

    if (san === 'O-O') {
        return isEn
            ? `${subject} castled kingside (O-O)! Tucking the King into an iron fortress behind protective pawns while launching the Rook onto an active central runway ready for combat!`
            : `${subject} đã Nhập thành gần (cánh Vua, O-O)! Đưa Vua lui về pháo đài kiên cố sau bức tường Tốt và kích hoạt Xe sẵn sàng đổ bộ ra trung tâm ngắm bắn!`;
    }
    if (san === 'O-O-O') {
        return isEn
            ? `${subject} castled queenside (O-O-O)! Securing the King in a deep bunker while instantly seizing an open central file with the Rook for heavy artillery pressure!`
            : `${subject} đã Nhập thành xa (cánh Hậu, O-O-O)! Đưa Vua vào nơi ẩn nấp an toàn và lập tức đưa Xe ra kiểm soát cột mở trung tâm, sẵn sàng tạo hỏa lực đánh phá cánh đối phương!`;
    }
    if (move.flags && (move.flags.includes('p') || move.promotion)) {
        const promoName = getPieceName(move.promotion || 'q', lang);
        return isEn
            ? `${subject} boldly pushed the pawn to ${to} and promoted to a ${promoName} (${san})! A massive material surge that reshapes the entire battlefield!`
            : `${subject} đã dũng mãnh đẩy Tốt lên ô ${to} và phong cấp thành ${promoName} (${san})! Một bước ngoặt lực lượng áp đảo làm rung chuyển bàn cờ!`;
    }
    if (captured) {
        const isMate = san.includes('#');
        const isCheck = san.includes('+');
        if (isEn) {
            const checkText = isMate ? ' and delivered a crushing checkmate!' : (isCheck ? ' with a piercing check on the King!' : '.');
            return `${subject} struck with the ${pieceName} from ${from}, eliminating ${oppPossessive} ${capturedName} on ${to} (${san})${checkText}`;
        } else {
            const checkText = isMate ? ' và tung đòn chiếu hết kết liễu trận đấu!' : (isCheck ? ' kèm theo nước chiếu Vua uy lực.' : '.');
            return `${subject} dùng ${pieceName} ở ${from} dũng cảm tiêu diệt ${capturedName} ${oppPossessive} tại ô ${to} (${san})${checkText}`;
        }
    }

    const isMate = san.includes('#');
    const isCheck = san.includes('+');
    const centerSquares = ['e4', 'd4', 'e5', 'd5', 'c4', 'c5'];

    if (isMate) {
        return isEn
            ? `${subject} maneuvered the ${pieceName} from ${from} to ${to} (${san}), landing a fatal checkmate blow and ending the game in triumph!`
            : `${subject} di chuyển ${pieceName} từ ${from} đến ${to} (${san}), tung đòn chiếu hết sấm sét hạ gục đối thủ và kết liễu ván cờ!`;
    }
    if (isCheck) {
        return isEn
            ? `${subject} thrust the ${pieceName} from ${from} to ${to} (${san}) with an aggressive check! Seizing the tempo and forcing the enemy King to scramble.`
            : `${subject} di chuyển ${pieceName} từ ${from} đến ${to} (${san}) tung đòn chiếu Vua hiểm hóc! Tước bỏ quyền chủ động và buộc đối phương phải loay hoay tìm đường tẩu thoát.`;
    }
    if (centerSquares.includes(to)) {
        return isEn
            ? `${subject} anchored the ${pieceName} from ${from} right onto the central hub ${to} (${san}). Dominating like a central fortress, this piece starves the enemy of breathing room and restricts their counterplay.`
            : `${subject} ${piece === 'n' ? 'nhảy Mã' : 'di chuyển ' + pieceName} từ ${from} lên trung tâm ${to} (${san}). Quân cờ này như một pháo đài ngự trị ngay tại trung tâm, bóp nghẹt không gian và hạn chế tầm hoạt động của ${isUserMove ? 'đối thủ' : 'bạn'}.`;
    }
    if ((piece === 'n' || piece === 'b') && (from.endsWith('1') || from.endsWith('8'))) {
        return isEn
            ? `${subject} mobilized the ${pieceName} from the back rank ${from} to an active post on ${to} (${san}), unleashing firing lines and connecting team forces.`
            : `${subject} phát triển ${pieceName} từ tuyến hậu phương ${from} lên tiền đồn cơ động ${to} (${san}), khai thông tuyến lửa và sẵn sàng tham chiến phối hợp cùng toàn đội hình.`;
    }

    return isEn
        ? `${subject} maneuvered the ${pieceName} from ${from} to ${to} (${san}) to secure key strategic squares, tighten piece coordination, and expand positional control.`
        : `${subject} cơ động ${pieceName} từ ${from} sang ${to} (${san}) để chiếm lĩnh ô chiến lược quan trọng, củng cố sự phối hợp và gia tăng kiểm soát không gian.`;
}

/**
 * Phần 2: Tại sao nó Tốt / Tại sao nó Sai lầm (Why it works / Why it fails)
 * Quét sâu bàn cờ bằng chess.js để phân tích thế trận, định vị quân, không gian, quân treo, đòn chiến thuật
 */
function detectTacticalReason(prevPos, currPos, isUserMove = true, lang = (typeof currentLang !== 'undefined' ? currentLang : 'vi')) {
    const isEn = lang === 'en';
    const move = currPos.move || {};
    const category = (currPos.classification && currPos.classification.category) || 'Good';
    const piece = (move.piece || 'p').toLowerCase();
    const pieceName = escapeHTML(getPieceName(piece, lang));
    const to = escapeHTML(move.to || '');
    const from = escapeHTML(move.from || '');
    const san = escapeHTML(move.san || '');
    const subject = isEn ? (isUserMove ? 'you' : 'your opponent') : (isUserMove ? 'bạn' : 'đối thủ');
    const subjectCap = isEn ? (isUserMove ? 'You' : 'Your opponent') : (isUserMove ? 'Bạn' : 'Đối thủ');
    const otherSide = isEn ? (isUserMove ? 'the opponent' : 'you') : (isUserMove ? 'đối thủ' : 'bạn');
    const otherSideCap = isEn ? (isUserMove ? 'The opponent' : 'You') : (isUserMove ? 'Đối thủ' : 'Bạn');

    const ChessClass = getChessConstructor();
    if (!ChessClass) return '';

    // 1. Kiểm tra Chiếu hết đã diễn ra
    const chessAfter = new ChessClass(currPos.fen);
    if (chessAfter.in_checkmate()) {
        return isEn
            ? `Decisive Checkmate: ${subjectCap} delivered the ultimate coup de grâce! The enemy King is trapped in an inescapable net, sealing immediate victory.`
            : `Đòn Chiếu Hết Quyết Định: ${subjectCap} đã tung ra đòn kết liễu ngoạn mục! Vua đối phương hoàn toàn bị phong tỏa và trận chiến khép lại với thắng lợi vang dội.`;
    }

    // 2. Bỏ lỡ chiếu hết ép buộc
    if (prevPos.eval && prevPos.eval.mate !== null && prevPos.eval.mate > 0) {
        const moverSign = move.color === 'w' ? 1 : -1;
        const mateForMoverAfter = (currPos.eval && currPos.eval.mateWhite !== null)
            ? currPos.eval.mateWhite * moverSign
            : null;
        if (currPos.eval.mate !== 0 && (mateForMoverAfter === null || mateForMoverAfter <= 0)) {
            const steps = Math.abs(prevPos.eval.mate);
            return isEn
                ? `Missed Checkmate: ${subjectCap} held a forced mate in ${steps} moves, but this hesitation let ${otherSide} slip through the cracks!`
                : `Bỏ Lỡ Chiếu Hết: ${subjectCap} đã nắm chắc trong tay chuỗi chiếu hết ép buộc sau ${steps} nước, nhưng nước đi này đã vô tình để ${otherSide} lách qua khe cửa hẹp thoát hiểm!`;
        }
    }

    // 3. Chiếu Vua trực tiếp
    if (chessAfter.in_check()) {
        return isEn
            ? `Fierce Check: Puts ${otherSide}'s King under severe fire, disrupting their tactical harmony and forcing immediate defensive triage.`
            : `Chiếu Vua Uy Lực: Đặt Vua của ${otherSide} vào vòng lửa nguy cấp, cắt đứt sự phối hợp của đối phương và buộc họ phải chống đỡ trong thế bị động.`;
    }

    // 4. KIỂM TRA QUÂN TREO (HANGING PIECE) & BỊ ĂN HƠN QUÂN TRỰC TIẾP
    const oppMoves = chessAfter.moves({ verbose: true });
    const directCapturesOnTo = oppMoves.filter(m => m.to === to);
    if (directCapturesOnTo.length > 0) {
        directCapturesOnTo.sort((a, b) => (PIECE_VALUES[a.piece] || 1) - (PIECE_VALUES[b.piece] || 1));
        const minAttacker = directCapturesOnTo[0];
        const minAttackerVal = PIECE_VALUES[minAttacker.piece] || 1;
        const movedVal = PIECE_VALUES[piece] || 1;

        let hasDefender = false;
        try {
            const simChess = new ChessClass(currPos.fen);
            simChess.move(minAttacker);
            const recaptures = simChess.moves({ verbose: true }).filter(r => r.to === to);
            hasDefender = recaptures.length > 0;
        } catch (e) {}

        if (!hasDefender && movedVal >= 3 && category !== 'Brilliant') {
            const attackerName = getPieceName(minAttacker.piece, lang);
            return isEn
                ? `Lethal Blunder (Hanging Piece): ${subjectCap} pushed the ${pieceName} to ${to} with zero backup from teammates! ${otherSideCap} can capture it for free with their ${attackerName}, gaining a massive material windfall.`
                : `Sơ hở chết người! (Quân treo): ${subjectCap} vừa đẩy ${pieceName} đến ${to} mà không có bất kỳ đồng đội nào phía sau bọc lót, biến nó thành miếng mồi ngon cho đối thủ! ${otherSideCap} có thể ăn gọn quân này bằng ${attackerName} mà không tốn một giọt mồ hôi.`;
        } else if (hasDefender && minAttackerVal < movedVal && category !== 'Brilliant') {
            const attackerName = getPieceName(minAttacker.piece, lang);
            return isEn
                ? `Disastrous Trade: The valuable ${pieceName} (${movedVal} pts) on ${to} is ambushed by a cheaper ${attackerName} (${minAttackerVal} pts). Trading here yields a crushing material deficit that tilts the entire game!`
                : `Đổi quân lỗ nặng: Quân ${pieceName} (${movedVal} điểm) trên ô ${to} đang bị ${attackerName} rẻ tiền hơn (${minAttackerVal} điểm) đe dọa. Pha đổi quân này sẽ khiến ${subject} bị thâm hụt lực lượng nghiêm trọng và làm suy kiệt toàn bộ thế trận!`;
        }
    }

    // 5. Kiểm tra để hở quân khác bị ăn mất ở nước tiếp theo (theo PV của engine)
    if (currPos.eval && currPos.eval.pv && currPos.eval.pv.length > 0) {
        const testChess = new ChessClass(currPos.fen);
        const oppReply = applyUciMove(testChess, currPos.eval.pv[0]);
        if (oppReply && oppReply.captured && oppReply.captured !== 'p') {
            const lostPieceCode = oppReply.captured;
            const lostVal = PIECE_VALUES[lostPieceCode] || 1;
            let recapturedVal = 0;
            if (currPos.eval.pv.length > 1) {
                const userReply = applyUciMove(testChess, currPos.eval.pv[1]);
                if (userReply && userReply.captured) recapturedVal = PIECE_VALUES[userReply.captured] || 1;
            }
            if (lostVal - recapturedVal >= 2 && category !== 'Brilliant') {
                const lostPieceName = getPieceName(lostPieceCode, lang);
                return isEn
                    ? `Overlooked Defense: This move abandoned the guarding post, leaving ${subject}'s ${lostPieceName} unprotected for ${otherSide} to snap up with impunity!`
                    : `Bỏ rơi đồng đội: Nước đi này đã rút mất chốt chặn bảo vệ, bỏ mặc quân ${lostPieceName} quý giá của ${subject} cho đối phương ăn thịt ở nước tiếp theo mà không thể đòi lại!`;
            }
        }
    }

    // 6. Kiểm tra đòn tấn công trực tiếp vào Hậu/Xe của đối phương
    try {
        const fenParts = currPos.fen.split(' ');
        fenParts[1] = move.color;
        const hypoChess = new ChessClass(fenParts.join(' '));
        const threats = hypoChess.moves({ verbose: true }).filter(m => m.from === to && m.captured);
        const bigTarget = threats.find(m => m.captured === 'q' || m.captured === 'r');
        if (bigTarget && (category === 'Best' || category === 'Great' || category === 'Excellent' || category === 'Good')) {
            const targetName = getPieceName(bigTarget.captured, lang);
            return isEn
                ? `Seizing the Tempo (Active Threat): The ${pieceName} on ${to} unleashes a direct assault on ${otherSide}'s ${targetName}, hijacking the initiative and forcing the enemy to scramble in retreat!`
                : `Cướp Nhịp Độ (Tempo) & Đe Dọa: Quân ${pieceName} vừa lên ${to} tạo đòn tấn công trực diện vào ${targetName} của ${otherSide}, giành lấy quyền chủ động tối cao và ép đối phương phải hốt hoảng rút lui!`;
        }
    } catch (e) {}

    // 7. Nhập thành an toàn
    if (san === 'O-O' || san === 'O-O-O') {
        return isEn
            ? `King Bunker & Rook Launchpad: Castling locks the monarch into a reinforced citadel while launching the Rook onto open central runways ready for combat!`
            : `Pháo Đài An Toàn & Động Viên Quân: Đưa Vua lui về pháo đài kiên cố sau bức tường Tốt và kích hoạt Xe sẵn sàng đổ bộ ra trung tâm ngắm bắn, hoàn thiện phòng tuyến và mở đường phản công!`;
    }

    // 8. Đẩy Tốt hở Vua
    if (piece === 'p' && (category === 'Inaccuracy' || category === 'Mistake' || category === 'Blunder')) {
        if (from.startsWith('f') || from.startsWith('g') || from.startsWith('h')) {
            return isEn
                ? `Shattered King Shield: Pushing pawns around the King creates permanent defensive craters that invite enemy invaders straight into the throne room!`
                : `Phá Nát Lá Chắn Vua: Đẩy các Tốt quanh Vua tạo ra những lỗ hổng vĩnh viễn không thể vá lành, trải thảm đỏ cho quân địch tràn vào công phá thành trì!`;
        }
    }

    // 9. Kiểm soát ô trung tâm
    const centerSquares = ['e4', 'd4', 'e5', 'd5', 'c4', 'c5'];
    if (centerSquares.includes(to) && (category === 'Best' || category === 'Great' || category === 'Excellent' || category === 'Good')) {
        return isEn
            ? `Dominating the Center: Staking an unshakeable claim on the vital center (${to}), smothering enemy space and giving your forces supreme mobility.`
            : `Làm Chủ Trung Tâm: Quân cờ này như một pháo đài ngự trị ngay tại trung tâm (${to}), bóp nghẹt không gian và hạn chế tầm hoạt động của ${otherSide}.`;
    }

    // 10. Fallback theo phân loại chuẩn
    if (category === 'Brilliant') {
        return isEn
            ? `Brilliant Sacrifice: Audaciously offering up material to dismantle the enemy fortress and unleash an unstoppable tactical onslaught!`
            : `Tuyệt Đỉnh Thí Quân: Dũng cảm hy sinh vật chất để phá tan lớp phòng ngự kiên cố nhất, mở toang cánh cửa dẫn tới chiến thắng rực rỡ!`;
    }
    if (category === 'Great') {
        return isEn
            ? `The Solitary Savior: Masterclass tactical vision! This was the only move on the entire board to turn the tide and preserve the game!`
            : `Nước Cờ Cứu Cánh Duy Nhất: Nhãn quan chiến thuật phi thường! Đây là nước cờ duy nhất trên toàn bộ bàn cờ cứu vãn tình thế và lật ngược thế cờ!`;
    }
    if (category === 'Best') {
        return isEn
            ? `Engine Masterpiece: The highest-octane move on the board, flawlessly harmonizing aggressive pressure, tempo, and piece unity!`
            : `Lựa Chọn Tối Ưu: Nước cờ hoàn hảo nhất cỗ máy đề xuất, cân bằng tuyệt đối giữa áp lực tấn công, nhịp độ và sự hài hòa của toàn đội hình!`;
    }
    if (category === 'Inaccuracy') {
        return isEn
            ? `Suboptimal Move: A step too passive that relinquishes a fraction of your initiative and affords ${otherSide} welcome breathing space.`
            : `Chưa Phải Tối Ưu: Nước đi hơi thụ động và nhường lại một chút quyền chủ động, tạo cơ hội cho ${otherSide} có thêm khoảng thở để củng cố phòng ngự.`;
    }
    if (category === 'Mistake') {
        return isEn
            ? `Hasty Mistake: Erodes your structural foundation and presents ${otherSide} with an immediate tactical springboard to fight back!`
            : `Một Quyết Định Vội Vàng: Nước đi này làm suy yếu cấu trúc thế trận và mở toang cánh cửa cho ${otherSide} chớp lấy thời cơ phản kích!`;
    }
    if (category === 'Miss') {
        return isEn
            ? `Missed Golden Chance: You focused too much on defense and overlooked a lightning counter-strike that could have decided the game on the spot!`
            : `Bỏ Lỡ Cơ Hội Vàng: Bạn đã quá tập trung vào phòng thủ mà bỏ lỡ một đòn phản công chớp nhoáng có thể định đoạt ngay ván đấu!`;
    }
    if (category === 'Blunder') {
        return isEn
            ? `Catastrophic Blunder: A devastating misstep that opens up a fatal wound and turns a promising fight into an uphill battle!`
            : `Trời ơi, Sai Lầm Chí Mạng: Bạn đã để lộ điểm yếu chết người khiến toàn bộ thế trận đứng trước bờ vực sụp đổ. Hãy cẩn thận hơn!`;
    }

    return isEn
        ? `Solid Maneuver: Maintains disciplined piece coordination, preserves board real estate, and sets the stage for future operations.`
        : `Nước Cờ Vững Vàng: Giữ vững tính liên kết chặt chẽ giữa các quân, bảo toàn không gian kiểm soát và chuẩn bị cho các đợt tác chiến tiếp theo.`;
}

/**
 * Phần 4: Lời khuyên cốt lõi của Huấn luyện viên cờ vua nhiệt huyết (Dành cho mọi kỳ thủ)
 */
function getCoachTip(currPos, isUserMove, lang = 'vi') {
    const isEn = lang === 'en';
    const move = currPos.move || {};
    const to = move.to || '';
    const piece = (move.piece || 'p').toLowerCase();
    const category = (currPos.classification && currPos.classification.category) || 'Good';
    const moveNum = currPos.moveNumber || Math.ceil((currPos.index || 1) / 2);

    // 1. Mã ở biên
    const rimSquares = ['a1','a2','a3','a4','a5','a6','a7','a8','h1','h2','h3','h4','h5','h6','h7','h8'];
    if (piece === 'n' && rimSquares.includes(to)) {
        return isEn
            ? `"A knight on the rim is dim!" On the board edge, a knight controls merely 4 squares. Station your knights on protected central outposts (d4, e4, d5, e5) where they radiate octopus-like power across 8 vital squares!`
            : `"Mã ở biên là Mã bỏ đi!" Khi đứng ở rìa bàn cờ, quân Mã chỉ kiểm soát được tối đa 4 ô và mất nửa sức mạnh. Hãy đặt Mã vào các tiền đồn trung tâm (Outpost d4, e4, d5, e5) được Tốt bảo vệ — nó sẽ trở thành một con quái vật bóp nghẹt toàn bộ trận địa của đối thủ!`;
    }

    // 2. Sai lầm / Mất quân (The 3-second blundercatcher / capitalizing on mistakes)
    if (category === 'Blunder' || category === 'Mistake') {
        if (!isUserMove) {
            return isEn
                ? `Notice your opponent's mistake: When they slip under pressure, stay calm. Look closely for what they left undefended and strike at their weakest point!`
                : `Hãy quan sát sơ hở của đối thủ: Khi đối phương đi sai, đừng vội vàng. Hãy nhìn xem họ vừa để lỏng ô nào hoặc quân nào mất bảo vệ để tung đòn trừng phạt chuẩn xác!`;
        }
        return isEn
            ? `Before releasing your move, pause for 3 life-saving seconds: 1. "Is my destination square truly safe from enemy fire?" and 2. "What is my opponent threatening with their last move?". This single mental checkpoint stops 90% of painful blunders!`
            : `Trước mỗi lần hạ cờ, hãy hít sâu 3 giây và tự hỏi 2 câu sinh tử: 1. "Ô mình sắp hạ quân có bị ai ngắm bắn không?" và 2. "Đối thủ vừa đi nước đó để đe dọa ăn quân nào của mình?". Chỉ 3 giây này thôi sẽ cứu bạn khỏi 90% các ván thua tức tưởi và tăng ngay 200 Elo!`;
    }

    // 3. Khai cuộc (moveNumber <= 10)
    if (moveNum <= 10 && (category === 'Inaccuracy' || category === 'Mistake' || category === 'Blunder')) {
        if (!isUserMove) {
            return isEn
                ? `Your opponent violated basic opening principles here. Focus on rapid piece development, King safety, and dominating the center to punish their premature play.`
                : `Đối thủ vừa vi phạm nguyên tắc khai cuộc cơ bản. Hãy tập trung phát triển quân nhanh, nhập thành an toàn và làm chủ trung tâm để trừng phạt nước đi sớm này!`;
        }
        return isEn
            ? `The 3 golden opening laws: 1. Stake out the center with pawns (e4/d4), 2. Rapidly develop Knights and Bishops toward the center, 3. Castle early to tuck your King away. Never move the same piece repeatedly or unleash your Queen into early danger!`
            : `3 nguyên tắc vàng khai cuộc cho mọi kỳ thủ: 1. Chiếm đóng trung tâm bằng Tốt (e4/d4), 2. Phát triển Mã và Tượng ra trận, 3. Nhập thành thật sớm để bảo vệ Vua. Tuyệt đối không đi một quân nhiều lần hay rút Hậu ra trận quá sớm khi quân khác còn đang ngủ!`;
    }

    // 4. Nhập thành & An toàn Vua
    if (move.san === 'O-O' || move.san === 'O-O-O') {
        return isEn
            ? `No matter how fiery the tactical clash, King safety is rule #1. An exposed King is an invitation to checkmate. Castling early locks the monarch in a bunker and launches the Rook into battle.`
            : `Dù thế trận có đang căng thẳng đến đâu, ưu tiên số 1 vẫn là sự an toàn của Vua. Một Vua hở sườn là một Vua sắp bị chiếu hết. Nhập thành sớm giúp bạn khóa chặt pháo đài kiên cố và kích hoạt Xe tham chiến.`;
    }

    // 5. Đổi quân (Trading principle)
    if (move.captured) {
        return isEn
            ? `The golden trading rule: When ahead in material, trade pieces ruthlessly to cruise into a won endgame. When down material, avoid trades like the plague — keep the board messy and brew tactical storms for a comeback!`
            : `Quy tắc đổi quân vàng: Khi bạn hơn quân, hãy tìm mọi cách đổi quân để đưa về tàn cuộc thắng nhẹ nhàng. Ngược lại, khi bị thua quân, tuyệt đối né tránh đổi quân — hãy giữ lại nhiều quân nhất có thể để giăng bẫy chiến thuật và tìm kiếm cơ hội lật kèo!`;
    }

    // 6. Cấu trúc Tốt (Pawn structure)
    if (piece === 'p') {
        return isEn
            ? `Remember: Pawns can never step backwards! Every pawn push leaves permanent holes and weaknesses behind. Push pawns with deep calculation, sculpting pawn chains that serve as springboards for your major pieces.`
            : `Hãy nhớ: Tốt không bao giờ đi lùi được! Mỗi lần đẩy Tốt lên, bạn để lại những khoảng trống và ô yếu vĩnh viễn ở phía sau. Hãy đẩy Tốt có tính toán, xây dựng chuỗi xích Tốt vững chắc làm bàn đạp cho các quân nặng.`;
    }

    // 7. Nước đi xuất sắc / Tầm nhìn kiện tướng
    if (category === 'Brilliant' || category === 'Great' || category === 'Best') {
        if (!isUserMove) {
            return isEn
                ? `Your opponent found a high-level resource here. Keep your defense resilient, avoid panic, and look for practical counter-chances!`
                : `Đối thủ vừa tìm ra một nước cờ chất lượng cao. Hãy giữ bình tĩnh, gia cố hàng phòng thủ và kiên nhẫn chờ thời cơ phản công!`;
        }
        return isEn
            ? `World-class vision! You are weaving together tempo, space, and lethal piece synergy. Maintain this razor-sharp momentum and squeeze the life out of your opponent's defense!`
            : `Tầm nhìn thượng thừa! Bạn đang kết hợp hài hòa giữa nhịp độ (Tempo), không gian (Space) và đòn phối hợp. Hãy tiếp tục duy trì trạng thái tập trung đỉnh cao này để nghiền nát đối thủ!`;
    }

    // 8. Mặc định: Phối hợp quân (Piece coordination)
    return isEn
        ? `Chess is the ultimate team game. Never launch a solo raid with an isolated Queen or Knight. Weave your pieces into an impenetrable web where every piece defends another and all guns point at the same target.`
        : `Cờ vua là trò chơi đồng đội. Đừng để một quân Mã hay Hậu lao lên tấn công đơn độc. Hãy kết nối các quân cờ lại thành một mạng lưới không thể bị phá vỡ — quân này bảo vệ quân kia, cùng hướng về một mục tiêu chung.`;
}

/**
 * Tạo đoạn giải thích hoàn chỉnh khi người dùng bấm nút "Explain" (Chuẩn HLV Elo 500, Đa ngôn ngữ)
 * @param {Object} prevPos - Thế cờ trước
 * @param {Object} currPos - Thế cờ hiện tại
 * @param {boolean} isUserMove - true nếu là nước của mình
 * @param {string} lang - 'vi' hoặc 'en'
 */
function buildMoveExplanation(prevPos, currPos, isUserMove = true, lang = (typeof currentLang !== 'undefined' ? currentLang : 'vi')) {
    const isEn = lang === 'en';
    if (!prevPos || !currPos || !currPos.classification) {
        return isEn
            ? 'Please wait for Stockfish to finish analyzing to view detailed move explanation.'
            : 'Hãy đợi Stockfish phân tích xong để xem giải thích chi tiết cho nước đi này.';
    }

    const category = currPos.classification.category || 'Good';
    const actionDesc = describeMoveAction(currPos, isUserMove, lang);
    const tacticalReason = detectTacticalReason(prevPos, currPos, isUserMove, lang);

    // Xác định người chơi là màu nào
    const userColor = isUserMove
        ? (currPos.move && currPos.move.color ? currPos.move.color : 'w')
        : (currPos.move && currPos.move.color === 'w' ? 'b' : 'w');

    let pvStory = '';
    if (category === 'Best' || category === 'Great' || category === 'Brilliant') {
        const pvList = (currPos.eval && currPos.eval.pv && currPos.eval.pv.length > 0)
            ? currPos.eval.pv
            : (prevPos.eval && prevPos.eval.pv ? prevPos.eval.pv.slice(1) : []);
        if (pvList.length > 0) {
            const story = translatePvToConversationalStory(currPos.fen, pvList, userColor, lang);
            if (story) {
                pvStory = isEn
                    ? `<strong>Expected continuation:</strong> ${story}`
                    : `<strong>Kịch bản tiếp theo:</strong> ${story}`;
            }
        }
    } else {
        let betterLineStory = '';
        if (prevPos.eval && prevPos.eval.pv && prevPos.eval.pv.length > 0) {
            const story = translatePvToConversationalStory(prevPos.fen, prevPos.eval.pv, userColor, lang);
            if (story) {
                betterLineStory = isEn
                    ? `<strong>Better plan you missed:</strong> ${story}`
                    : `<strong>Kế hoạch tốt hơn bạn đã bỏ lỡ:</strong> ${story}`;
            }
        }

        let oppPunishStory = '';
        if (currPos.eval && currPos.eval.pv && currPos.eval.pv.length > 0) {
            const story = translatePvToConversationalStory(currPos.fen, currPos.eval.pv, userColor, lang);
            if (story) {
                oppPunishStory = isEn
                    ? `<strong>How the opponent can respond:</strong> ${story}`
                    : `<strong>Đối thủ có thể đáp trả bằng:</strong> ${story}`;
            }
        }

        if (betterLineStory && oppPunishStory) {
            pvStory = `${betterLineStory}<br>${oppPunishStory}`;
        } else {
            pvStory = betterLineStory || oppPunishStory;
        }
    }

    const coachTip = getCoachTip(currPos, isUserMove, lang);

    const sec1Title = isEn ? '1. What this move does' : '1. Ý nghĩa nước đi vừa rồi';
    const isGoodMove = ['Brilliant', 'Great', 'Best', 'Excellent', 'Good', 'Book'].includes(category);
    const sec2Title = isEn
        ? (isGoodMove ? '2. Why it works / Tactical strength' : '2. Critical flaw / Tactical vulnerability')
        : (isGoodMove ? '2. Tại sao nước này Tốt / Sức mạnh chiến thuật' : '2. Điểm sơ hở chí mạng / Sai lầm chiến thuật');
    const sec3Title = isEn ? '3. What happens next (Expected continuation)' : '3. Kịch bản tiếp theo (Diễn biến dự kiến)';
    const sec4Title = isEn ? "4. Coach's Master Tip" : '4. Lời khuyên của Huấn luyện viên';

    const iconAction = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>`;
    const iconGood = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--best, #81b64c)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;
    const iconBad = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--blu, #fa412d)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12.01" y1="17" x2="12.01" y2="17"></line></svg>`;
    const iconPv = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;
    const iconTip = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path><path d="M9 18h6"></path><path d="M10 22h4"></path></svg>`;

    return `
<div class="explain-coach-card">
    <div class="coach-block block-action">
        <div class="coach-sec-header">
            <span>${iconAction}</span> <span>${sec1Title}</span>
        </div>
        <div>${actionDesc}</div>
    </div>

    <div class="coach-block ${isGoodMove ? 'block-why-good' : 'block-why-bad'}">
        <div class="coach-sec-header">
            <span>${isGoodMove ? iconGood : iconBad}</span> <span>${sec2Title}</span>
        </div>
        <div>${tacticalReason}</div>
    </div>

    ${pvStory ? `
    <div class="coach-block block-pv">
        <div class="coach-sec-header">
            <span>${iconPv}</span> <span>${sec3Title}</span>
        </div>
        <div>${pvStory}</div>
    </div>` : ''}

    <div class="coach-block block-tip">
        <div class="coach-sec-header">
            <span>${iconTip}</span> <span>${sec4Title}</span>
        </div>
        <div>${coachTip}</div>
    </div>
</div>`.trim();
}

if (typeof window !== 'undefined') {
    window.escapeHTML = escapeHTML;
    window.PIECE_NAMES = PIECE_NAMES;
    window.formatEvaluationBadge = formatEvaluationBadge;
    window.getPositionDescriptionText = getPositionDescriptionText;
    window.buildMoveExplanation = buildMoveExplanation;
    window.detectTacticalReason = detectTacticalReason;
    window.describeMoveAction = describeMoveAction;
    window.translatePvToConversationalStory = translatePvToConversationalStory;
    window.getCoachTip = getCoachTip;
    window.applyUciMove = applyUciMove;
    window.convertPvToSanLine = convertPvToSanLine;
    window.getCoachCommentText = getCoachCommentText;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        escapeHTML,
        formatEvaluationBadge,
        getPositionDescriptionText,
        buildMoveExplanation,
        detectTacticalReason,
        describeMoveAction,
        translatePvToConversationalStory,
        getCoachTip,
        applyUciMove,
        convertPvToSanLine,
        getCoachCommentText
    };
}
