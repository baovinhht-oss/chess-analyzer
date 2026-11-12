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
 * DANH SÁCH CÂU MẪU CỐ ĐỊNH THEO NGÔN NGỮ (VI & EN)
 */
const COMMENT_TEMPLATES = {
    vi: {
        Brilliant: [
            'Nước đi xuất thần! Một nước thí quân tuyệt đỉnh mang lại ưu thế quyết định.',
            'Nước đi xuất thần! Pha hy sinh quân tuyệt vời xoay chuyển toàn bộ ván cờ.'
        ],
        Great: [
            'Nước đi tuyệt hay! Đây là nước đi duy nhất giúp giữ vững ưu thế hoặc cứu vãn ván cờ.',
            'Tuyệt hay! Bạn đã tìm ra nước đi then chốt duy nhất trong thế trận hiểm nghèo.'
        ],
        Book: [
            'Nước đi lý thuyết chuẩn sách giáo khoa.',
            'Nước đi khai cuộc bài bản theo sách giáo khoa.'
        ],
        Best: [
            'Nước đi tuyệt vời! Đây đúng là nước máy chọn.',
            'Nước đi tuyệt vời! Đây chính xác là nước máy chọn.'
        ],
        Excellent: [
            'Nước đi xuất sắc, gần như là nước hay nhất.',
            'Nước đi rất tốt, khai thác triệt để vị trí.'
        ],
        Good: [
            'Nước đi tốt, giữ vững thế trận.',
            'Nước đi ổn định, tiếp tục kế hoạch ván đấu.'
        ],
        Inaccuracy: [
            'Nước này hơi kém chính xác, có nước tốt hơn.',
            'Nước đi hơi thiếu chính xác, bạn có lựa chọn tốt hơn.'
        ],
        Mistake: [
            'Đây là một sai lầm, thế cờ của bạn bị xấu đi.',
            'Đây là một sai lầm làm thế cờ của bạn xấu đi.'
        ],
        Miss: [
            'Bỏ lỡ cơ hội! Bạn đã để tuột mất ưu thế thắng lớn trong tầm tay.',
            'Bỏ lỡ đòn quyết định! Bạn có thể gia tăng cách biệt lớn hơn ở nước này.'
        ],
        Blunder: [
            'Sai lầm nghiêm trọng! Nước này làm bạn mất lợi thế lớn.',
            'Sai lầm nghiêm trọng! Nước đi này khiến bạn thiệt hại rất lớn.'
        ]
    },
    en: {
        Brilliant: [
            'Brilliant move! A phenomenal sacrifice that seizes a decisive advantage.',
            'Brilliant! A wonderful piece sacrifice that transforms the entire game.'
        ],
        Great: [
            'Great move! This is the only move that maintains the advantage or saves the day.',
            'Great! You found the only crucial continuation in a sharp position.'
        ],
        Book: [
            'Standard book move from opening theory.',
            'Solid textbook opening move.'
        ],
        Best: [
            'Best move! Exactly what the engine recommends.',
            'Excellent choice! This is the engine top pick.'
        ],
        Excellent: [
            'Excellent move, nearly the engine top choice.',
            'Very good move, making the most of the position.'
        ],
        Good: [
            'Good move, holding the position firmly.',
            'Solid move, continuing the game plan.'
        ],
        Inaccuracy: [
            'An inaccuracy. There were better options available.',
            'Slightly inaccurate, you had a stronger alternative.'
        ],
        Mistake: [
            'This is a mistake, weakening your position.',
            'A mistake that allows your opponent a counterchance.'
        ],
        Miss: [
            'Missed opportunity! You let a large winning advantage slip away.',
            'Missed win! You could have pressed a much bigger advantage here.'
        ],
        Blunder: [
            'Blunder! This move gives away significant material or advantage.',
            'Severe blunder! This move incurs catastrophic damage.'
        ]
    }
};

/**
 * Chọn câu nhận xét cho nước đi (Đa ngôn ngữ)
 * @param {string} san - Ký hiệu SAN của nước vừa đi
 * @param {string} category - Loại nước đi
 * @param {number} moveIndex - Chỉ số nước đi
 * @param {boolean} isUserMove - true nếu là nước của mình
 * @param {string} lang - 'vi' hoặc 'en'
 */
function getCoachCommentText(san, category, moveIndex = 1, isUserMove = true, lang = (typeof currentLang !== 'undefined' ? currentLang : 'vi')) {
    const dict = COMMENT_TEMPLATES[lang] || COMMENT_TEMPLATES.vi;
    const templates = dict[category] || dict.Good;
    const rawTemplate = templates[moveIndex % templates.length];

    if (lang === 'en') {
        const subject = isUserMove ? 'you' : 'your opponent';
        const subjectCap = isUserMove ? 'You' : 'Your opponent';
        const adjustedTemplate = rawTemplate
            .replace(/your opponent/g, subject)
            .replace(/Your opponent/g, subjectCap)
            .replace(/\byou\b/g, subject)
            .replace(/\bYou\b/g, subjectCap);
        return `${san}: ${adjustedTemplate}`;
    }

    const subject = isUserMove ? 'bạn' : 'đối thủ';
    const subjectCap = isUserMove ? 'Bạn' : 'Đối thủ';
    const adjustedTemplate = rawTemplate
        .replace(/bạn/g, subject)
        .replace(/Bạn/g, subjectCap);

    return `${san}: ${adjustedTemplate}`;
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

    const chess = new Chess(fenBefore);
    const sanMoves = [];

    const limit = Math.min(pvUciList.length, maxMoves);
    for (let i = 0; i < limit; i++) {
        const turnBeforeMove = chess.turn();
        const moveObj = applyUciMove(chess, pvUciList[i]);
        if (!moveObj) break;

        if (i === 0) {
            sanMoves.push(moveObj.san);
        } else {
            const prefix = (turnBeforeMove === 'b') ? '...' : '';
            sanMoves.push(`${prefix}${moveObj.san}`);
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
    const pieceName = getPieceName(piece, lang);
    const captured = moveObj.captured ? moveObj.captured.toLowerCase() : null;
    const capturedName = captured ? getPieceName(captured, lang) : '';
    const to = moveObj.to;
    const san = moveObj.san;

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
        const chess = new Chess(fen);
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
 * Đổi ký hiệu sang tên quân đầy đủ, giải thích cụ thể điểm đến và hành vi
 */
function describeMoveAction(currPos, isUserMove, lang = 'vi') {
    const isEn = lang === 'en';
    const move = currPos.move || {};
    const san = move.san || '';
    const from = move.from || '';
    const to = move.to || '';
    const piece = (move.piece || 'p').toLowerCase();
    const captured = move.captured ? move.captured.toLowerCase() : null;
    const pieceName = getPieceName(piece, lang);
    const capturedName = captured ? getPieceName(captured, lang) : '';

    const subject = isEn ? (isUserMove ? 'You' : 'Your opponent') : (isUserMove ? 'Bạn' : 'Đối thủ');
    const oppPossessive = isEn ? (isUserMove ? "the opponent's" : 'your') : (isUserMove ? 'của đối thủ' : 'của bạn');

    if (san === 'O-O') {
        return isEn
            ? `${subject} castled kingside (O-O). This tucks the King safely behind pawns and brings the Rook into active play.`
            : `${subject} đã Nhập thành gần (cánh Vua, O-O). Nước đi này vừa đưa Vua vào góc an toàn sau hàng Tốt, vừa kích hoạt Xe tham gia trận chiến.`;
    }
    if (san === 'O-O-O') {
        return isEn
            ? `${subject} castled queenside (O-O-O). This protects the King while placing the Rook directly onto an active central file.`
            : `${subject} đã Nhập thành xa (cánh Hậu, O-O-O). Nước đi đưa Vua vào nơi ẩn nấp an toàn và lập tức đưa Xe ra kiểm soát cột trung tâm.`;
    }
    if (move.flags && (move.flags.includes('p') || move.promotion)) {
        const promoName = getPieceName(move.promotion || 'q', lang);
        return isEn
            ? `${subject} pushed a pawn to ${to} and promoted to a ${promoName} (${san})! A massive material upgrade.`
            : `${subject} đã đẩy Tốt lên ô ${to} và phong cấp thành ${promoName} (${san})! Một bước ngoặt lực lượng vô cùng lớn.`;
    }
    if (captured) {
        const isMate = san.includes('#');
        const isCheck = san.includes('+');
        if (isEn) {
            const checkText = isMate ? ' and delivered checkmate!' : (isCheck ? ' with a check!' : '.');
            return `${subject} captured ${oppPossessive} ${capturedName} on ${to} using the ${pieceName} from ${from} (${san})${checkText}`;
        } else {
            const checkText = isMate ? ' và chiếu hết ván cờ!' : (isCheck ? ' kèm theo nước chiếu Vua nguy hiểm.' : '.');
            return `${subject} dùng ${pieceName} ở ${from} ăn ${capturedName} ${oppPossessive} tại ô ${to} (${san})${checkText}`;
        }
    }

    const isMate = san.includes('#');
    const isCheck = san.includes('+');
    const centerSquares = ['e4', 'd4', 'e5', 'd5', 'c4', 'c5'];

    if (isMate) {
        return isEn
            ? `${subject} moved the ${pieceName} from ${from} to ${to} (${san}), delivering checkmate and ending the game!`
            : `${subject} di chuyển ${pieceName} từ ${from} đến ${to} (${san}), chiếu hết Vua đối phương và kết thúc ván cờ!`;
    }
    if (isCheck) {
        return isEn
            ? `${subject} moved the ${pieceName} from ${from} to ${to} (${san}) to deliver check, forcing the enemy King to respond!`
            : `${subject} di chuyển ${pieceName} từ ${from} đến ${to} (${san}) và chiếu Vua đối phương! Buộc đối thủ phải tìm cách chống đỡ ngay lập tức.`;
    }
    if (centerSquares.includes(to)) {
        return isEn
            ? `${subject} moved the ${pieceName} from ${from} to ${to} (${san}). This occupies a vital central square, exerting strong pressure on surrounding squares.`
            : `${subject} ${piece === 'n' ? 'nhảy Mã' : 'di chuyển ' + pieceName} từ ${from} lên ${to} (${san}). Đây là vị trí chiến lược ở trung tâm bàn cờ, giúp ${pieceName} kiểm soát nhiều ô xung quanh và gây áp lực lên phần sân ${isUserMove ? 'đối thủ' : 'của bạn'}.`;
    }
    if ((piece === 'n' || piece === 'b') && (from.endsWith('1') || from.endsWith('8'))) {
        return isEn
            ? `${subject} developed the ${pieceName} from ${from} to an active square ${to} (${san}), mobilizing forces and freeing lines for other pieces.`
            : `${subject} phát triển ${pieceName} từ ô xuất phát ${from} lên ${to} (${san}) nhằm huy động lực lượng tham gia trận đấu và mở đường cho các quân khác.`;
    }

    return isEn
        ? `${subject} moved the ${pieceName} from ${from} to ${to} (${san}) to reposition forces and control key squares.`
        : `${subject} di chuyển ${pieceName} từ ${from} sang ${to} (${san}) để củng cố thế trận và định hình lại các ô kiểm soát.`;
}

/**
 * Phần 2: Tại sao nó Tốt / Tại sao nó Sai lầm (Why it works / Why it fails)
 * Quét sâu bàn cờ bằng chess.js để chỉ rõ quân treo, đổi quân lỗ, đòn đe dọa, an toàn Vua
 */
function detectTacticalReason(prevPos, currPos, isUserMove = true, lang = (typeof currentLang !== 'undefined' ? currentLang : 'vi')) {
    const isEn = lang === 'en';
    const move = currPos.move || {};
    const category = (currPos.classification && currPos.classification.category) || 'Good';
    const piece = (move.piece || 'p').toLowerCase();
    const pieceName = getPieceName(piece, lang);
    const to = move.to || '';
    const from = move.from || '';
    const san = move.san || '';
    const subject = isEn ? (isUserMove ? 'you' : 'your opponent') : (isUserMove ? 'bạn' : 'đối thủ');
    const subjectCap = isEn ? (isUserMove ? 'You' : 'Your opponent') : (isUserMove ? 'Bạn' : 'Đối thủ');
    const otherSide = isEn ? (isUserMove ? 'the opponent' : 'you') : (isUserMove ? 'đối thủ' : 'bạn');
    const otherSideCap = isEn ? (isUserMove ? 'The opponent' : 'You') : (isUserMove ? 'Đối thủ' : 'Bạn');

    // 1. Kiểm tra Chiếu hết đã diễn ra
    const chessAfter = new Chess(currPos.fen);
    if (chessAfter.in_checkmate()) {
        return isEn
            ? `Decisive Checkmate: ${subjectCap} delivered a fatal blow! The opposing King cannot escape, securing immediate victory.`
            : `Đòn Chiếu Hết Quyết Định: ${subjectCap} đã tung ra đòn kết liễu hoàn hảo! Vua đối phương không còn đường thoát và ván cờ kết thúc ngay lập tức.`;
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
                ? `Missed Checkmate: ${subjectCap} had a forced checkmate in ${steps} moves, but this move let ${otherSide} off the hook!`
                : `Bỏ Lỡ Chiếu Hết: ${subjectCap} đã nắm chắc chiến thắng với chuỗi chiếu hết ép buộc sau ${steps} nước, nhưng nước đi này đã vô tình để ${otherSide} thoát hiểm!`;
        }
    }

    // 3. Chiếu Vua trực tiếp
    if (chessAfter.in_check()) {
        return isEn
            ? `Direct Check: Places ${otherSide}'s King in immediate danger, disrupting their plans and forcing an evasive move.`
            : `Chiếu Vua Trực Tiếp: Đặt Vua của ${otherSide} vào thế nguy hiểm cận kề, tước quyền chủ động và ép đối phương phải lập tức tìm cách cứu Vua.`;
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
            const simChess = new Chess(currPos.fen);
            simChess.move(minAttacker);
            const recaptures = simChess.moves({ verbose: true }).filter(r => r.to === to);
            hasDefender = recaptures.length > 0;
        } catch (e) {}

        if (!hasDefender && movedVal >= 3 && category !== 'Brilliant') {
            const attackerName = getPieceName(minAttacker.piece, lang);
            return isEn
                ? `Severe Blunder (Hanging Piece): ${subjectCap} moved the ${pieceName} to ${to} without any protection! ${otherSideCap} can capture it for free with their ${attackerName}.`
                : `Mất Quân Nghiêm Trọng (Quân treo): ${subjectCap} vừa đưa ${pieceName} đến ô ${to} mà không có quân nào bảo vệ! ${otherSideCap} có thể ăn đứt quân này bằng ${attackerName} mà không phải trả giá.`;
        } else if (hasDefender && minAttackerVal < movedVal && category !== 'Brilliant') {
            const attackerName = getPieceName(minAttacker.piece, lang);
            return isEn
                ? `Bad Trade: The ${pieceName} (${movedVal} pts) on ${to} is attacked by a cheaper ${attackerName} (${minAttackerVal} pts). Trading here results in a net material deficit!`
                : `Đổi Quân Thua Thiệt: Quân ${pieceName} (${movedVal} điểm) trên ô ${to} đang bị ${attackerName} rẻ tiền hơn (${minAttackerVal} điểm) tấn công. Đổi quân ở đây sẽ khiến ${subject} bị lỗ nặng về quân số!`;
        }
    }

    // 5. Kiểm tra để hở quân khác bị ăn mất ở nước tiếp theo (theo PV của engine)
    if (currPos.eval && currPos.eval.pv && currPos.eval.pv.length > 0) {
        const testChess = new Chess(currPos.fen);
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
                    ? `Overlooked Defense: This move diverted protection away from the ${lostPieceName}, allowing ${otherSide} to capture it with material advantage.`
                    : `Bỏ Quên Phòng Thủ: Nước đi này đã rút đi quân bảo vệ hoặc mở đường cho đối phương, khiến quân ${lostPieceName} của ${subject} bị ăn mất ở nước tiếp theo mà không thể gỡ lại.`;
            }
        }
    }

    // 6. Kiểm tra đòn tấn công trực tiếp vào Hậu/Xe của đối phương
    try {
        const fenParts = currPos.fen.split(' ');
        fenParts[1] = move.color;
        const hypoChess = new Chess(fenParts.join(' '));
        const threats = hypoChess.moves({ verbose: true }).filter(m => m.from === to && m.captured);
        const bigTarget = threats.find(m => m.captured === 'q' || m.captured === 'r');
        if (bigTarget && (category === 'Best' || category === 'Great' || category === 'Excellent' || category === 'Good')) {
            const targetName = getPieceName(bigTarget.captured, lang);
            return isEn
                ? `Active Threat: The ${pieceName} on ${to} creates an immediate attack on ${otherSide}'s ${targetName}, seizing tempo and forcing them backwards.`
                : `Đòn Đe Dọa Chủ Động: Quân ${pieceName} vừa lên ${to} tạo đòn tấn công trực tiếp vào ${targetName} của ${otherSide}, giành quyền chủ động và ép đối thủ phải lùi bước.`;
        }
    } catch (e) {}

    // 7. Nhập thành an toàn
    if (san === 'O-O' || san === 'O-O-O') {
        return isEn
            ? `King Safety & Piece Mobilization: Castling secures the King behind protective pawns and establishes vital central communication for the Rook.`
            : `Bảo Vệ Vua & Kết Nối Xe: Nước nhập thành giúp Vua lui về pháo đài kiên cố, đồng thời đưa Xe ra cột trung tâm để sẵn sàng tham chiến.`;
    }

    // 8. Đẩy Tốt hở Vua
    if (piece === 'p' && (category === 'Inaccuracy' || category === 'Mistake' || category === 'Blunder')) {
        if (from.startsWith('f') || from.startsWith('g') || from.startsWith('h')) {
            return isEn
                ? `Weakened King Shield: Pushing pawns around the King creates permanent holes and open lines that enemy pieces can infiltrate.`
                : `Làm Hở Lá Chắn Của Vua: Đẩy các Tốt phòng thủ quanh Vua tạo ra các ô yếu chí mạng và mở đường cho quân địch tràn vào tấn công.`;
        }
    }

    // 9. Kiểm soát ô trung tâm
    const centerSquares = ['e4', 'd4', 'e5', 'd5', 'c4', 'c5'];
    if (centerSquares.includes(to) && (category === 'Best' || category === 'Great' || category === 'Excellent' || category === 'Good')) {
        return isEn
            ? `Dominating the Center: Occupies and controls critical central space, boosting piece mobility while cramping ${otherSide}'s options.`
            : `Kiểm Soát Trung Tâm: Chiếm lĩnh và làm chủ ô trung tâm trọng yếu (${to}), mở rộng không gian hoạt động cho quân mình và kìm hãm đối phương.`;
    }

    // 10. Fallback theo phân loại chuẩn
    if (category === 'Brilliant') {
        return isEn
            ? `Phenomenal Sacrifice: Voluntarily surrendering material to shatter enemy defenses or trigger an unstoppable offensive wave!`
            : `Thí Quân Thiên Tài: Dũng cảm hy sinh vật chất để phá tan lớp phòng thủ của đối phương và mở màn cho đợt tấn công không thể cản phá!`;
    }
    if (category === 'Great') {
        return isEn
            ? `Solitary Savior: The only precise move on the board that holds the position together or preserves a winning advantage!`
            : `Nước Đi Cứu Cánh Duy Nhất: Đây là lựa chọn chuẩn xác duy nhất trên bàn cờ giúp giữ vững thế trận hoặc duy trì ưu thế thắng!`;
    }
    if (category === 'Best') {
        return isEn
            ? `Engine Top Choice: The most harmonious move available, maximizing tactical defense and piece coordination.`
            : `Nước Tối Ưu Nhất Của Máy: Nước đi hoàn hảo nhất trong thế cờ, dung hòa trọn vẹn giữa an toàn chiến thuật và sự cơ động của các quân.`;
    }
    if (category === 'Inaccuracy') {
        return isEn
            ? `Suboptimal Choice: Not an immediate disaster, but it gives away a fraction of your initiative and grants ${otherSide} extra breathing room.`
            : `Thiếu Chuẩn Xác: Chưa gây thiệt hại ngay lập tức nhưng làm giảm nhẹ ưu thế và cho ${otherSide} thêm thời gian để củng cố đội hình.`;
    }
    if (category === 'Mistake') {
        return isEn
            ? `Costly Mistake: Lets the initiative slip away and provides ${otherSide} a clear opportunity to tilt the balance.`
            : `Sai Lầm Đáng Tiếc: Khiến thế cờ của ${subject} bị thụ động và mở ra cơ hội rõ nét cho ${otherSide} nắm lấy quyền kiểm soát.`;
    }
    if (category === 'Miss') {
        return isEn
            ? `Missed Opportunity: Overlooked a golden tactical blow or winning transition, allowing the opponent to stay alive.`
            : `Bỏ Lỡ Đòn Quyết Định: Không nhìn thấy đòn chiến thuật trừng phạt sơ hở của đối thủ, để tuột mất cơ hội gia tăng cách biệt.`;
    }
    if (category === 'Blunder') {
        return isEn
            ? `Critical Blunder: Gives away crucial material or positional stability, turning the evaluation heavily in ${otherSide}'s favor!`
            : `Sai Lầm Nghiêm Trọng: Đánh mất quân quan trọng hoặc phá vỡ hoàn toàn thế trận, dâng ưu thế lớn cho ${otherSide}!`;
    }

    return isEn
        ? `Solid Continuation: Maintains healthy piece coordination, sound structure, and strategic balance.`
        : `Nước Đi Vững Chắc: Duy trì tính liên kết chặt chẽ giữa các quân, giữ cấu trúc tốt và bảo đảm sự cân bằng.`;
}

/**
 * Phần 4: Lời khuyên cốt lõi của Huấn luyện viên dành cho người chơi Elo 500
 */
function getCoachTip(currPos, isUserMove, lang = 'vi') {
    const isEn = lang === 'en';
    const move = currPos.move || {};
    const to = move.to || '';
    const piece = (move.piece || 'p').toLowerCase();
    const category = (currPos.classification && currPos.classification.category) || 'Good';
    const moveNum = currPos.moveNumber || 1;

    // 1. Mã ở biên
    const rimSquares = ['a1','a2','a3','a4','a5','a6','a7','a8','h1','h2','h3','h4','h5','h6','h7','h8'];
    if (piece === 'n' && rimSquares.includes(to)) {
        return isEn
            ? `"A knight on the rim is dim." Knights placed on the board's edge control at most 4 squares. Keep them centralized (d4, e4, d5, e5) where they control up to 8 squares and radiate power!`
            : `"Mã ở biên là Mã bỏ đi". Khi đứng ở rìa bàn cờ, quân Mã chỉ kiểm soát được tối đa 4 ô. Hãy luôn ưu tiên đưa Mã vào các ô trung tâm (d4, e4, d5, e5) để kiểm soát tới 8 ô và phát huy tối đa sức mạnh!`;
    }

    // 2. Sai lầm / Mất quân
    if (category === 'Blunder' || category === 'Mistake') {
        return isEn
            ? `Before making your move, pause for 3 seconds and ask two life-saving questions: 1. "Can any enemy piece take my piece on this square?" and 2. "What is my opponent currently threatening?". This single habit prevents most beginner blunders!`
            : `Trước mỗi nước đi, hãy dành 3 giây tự hỏi 2 câu thần chú: 1. "Ô mình sắp đến có bị quân nào của đối thủ ăn không?" và 2. "Đối thủ đang đe dọa ăn quân nào của mình?". Thói quen này sẽ giúp bạn tránh mất quân vô cớ và tăng ngay 200 Elo!`;
    }

    // 3. Khai cuộc (moveNumber <= 10)
    if (moveNum <= 10 && (category === 'Inaccuracy' || category === 'Mistake' || category === 'Blunder')) {
        return isEn
            ? `Remember the 3 golden opening rules: 1. Occupy the center with pawns (e4/d4), 2. Develop Knights and Bishops, 3. Castle early to protect your King. Avoid moving the same piece repeatedly in the opening!`
            : `3 nguyên tắc vàng khai cuộc cho người mới: 1. Chiếm trung tâm bằng Tốt (e4/d4), 2. Phát triển Mã và Tượng ra trận, 3. Nhập thành thật sớm để bảo vệ Vua an toàn. Hạn chế đi một quân nhiều lần trong giai đoạn này!`;
    }

    // 4. Nhập thành
    if (move.san === 'O-O' || move.san === 'O-O-O') {
        return isEn
            ? `King safety is paramount. Castling early prevents dangerous center attacks and activates your Rook into the game.`
            : `An toàn của Vua là số 1 trong cờ vua. Nhập thành sớm giúp bạn tránh được các đòn tấn công bất ngờ ở trung lộ và đưa Xe vào trận chiến.`;
    }

    // 5. Đổi quân (Trading)
    if (move.captured) {
        return isEn
            ? `Golden trading rule: When you have more material than your opponent, trade pieces to simplify into an easy winning endgame. When down material, avoid trades and keep pieces to create tactical counter-chances!`
            : `Quy tắc đổi quân cốt lõi: Khi bạn đang hơn quân đối thủ, hãy tích cực đổi các quân cờ để đưa về tàn cuộc thắng dễ dàng. Khi đang bị thua quân, hãy tránh đổi quân để giữ lại cơ hội tạo đòn phản công!`;
    }

    // 6. Nước đi xuất sắc
    if (category === 'Brilliant' || category === 'Great' || category === 'Best') {
        return isEn
            ? `Great chess vision! Always scan for tactical weaknesses and active piece placements just like this move.`
            : `Tư duy cờ vua tuyệt vời! Hãy luôn duy trì thói quen quan sát toàn bộ bàn cờ để tìm kiếm các vị trí đặt quân tích cực như bạn vừa thực hiện.`;
    }

    // 7. Mặc định
    return isEn
        ? `Always ensure piece coordination: never send a lone piece into enemy lines without teammates guarding its back.`
        : `Luôn chú ý sự phối hợp giữa các quân cờ: đừng bao giờ đưa một quân đơn độc lao vào phần sân đối phương mà không có đồng đội bọc lót phía sau.`;
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
        ? (isGoodMove ? '2. Why it works' : '2. Why it fails / Tactical vulnerability')
        : (isGoodMove ? '2. Tại sao nước này Tốt' : '2. Tại sao nước này Sai lầm / Điểm sơ hở');
    const sec3Title = isEn ? '3. What happens next' : '3. Kịch bản tiếp theo';
    const sec4Title = isEn ? "4. Coach's Tip (For Elo 500)" : '4. Lời khuyên của HLV (Dành cho Elo 500)';

    return `
<div class="explain-coach-card">
    <div class="coach-block block-action">
        <div class="coach-sec-header">
            <span>🎯</span> <span>${sec1Title}</span>
        </div>
        <div>${actionDesc}</div>
    </div>

    <div class="coach-block ${isGoodMove ? 'block-why-good' : 'block-why-bad'}">
        <div class="coach-sec-header">
            <span>${isGoodMove ? '✅' : '⚠️'}</span> <span>${sec2Title}</span>
        </div>
        <div>${tacticalReason}</div>
    </div>

    ${pvStory ? `
    <div class="coach-block block-pv">
        <div class="coach-sec-header">
            <span>🔮</span> <span>${sec3Title}</span>
        </div>
        <div>${pvStory}</div>
    </div>` : ''}

    <div class="coach-block block-tip">
        <div class="coach-sec-header">
            <span>💡</span> <span>${sec4Title}</span>
        </div>
        <div>${coachTip}</div>
    </div>
</div>`.trim();
}

if (typeof window !== 'undefined') {
    window.PIECE_NAMES = PIECE_NAMES;
    window.COMMENT_TEMPLATES = COMMENT_TEMPLATES;
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
