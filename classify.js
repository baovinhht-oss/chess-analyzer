/**
 * FILE: classify.js
 * Chức năng:
 * 1. Tính xác suất thắng (Win%) từ điểm centipawn (cp) theo chuẩn Chess.com.
 * 2. Tính độ chính xác (Accuracy %) của từng nước đi dựa trên chênh lệch Win%.
 * 3. Phân loại từng nước đi theo chuẩn Chess.com (10 hạng mục).
 * 4. Nhận diện nước đi xuất thần (Brilliant !!) dựa trên hy sinh quân có chủ đích.
 */

const MOVE_CATEGORIES = {
    Brilliant: { key: 'Brilliant', label: 'Brilliant', viName: 'Xuất thần', enName: 'Brilliant', color: '#1baca6', bgColor: 'rgba(27, 172, 166, 0.15)', icon: '!!' },
    Great: { key: 'Great', label: 'Great', viName: 'Tuyệt hay', enName: 'Great', color: '#5c8bb0', bgColor: 'rgba(92, 139, 176, 0.15)', icon: '!' },
    Book: { key: 'Book', label: 'Book', viName: 'Sách giáo khoa', enName: 'Book', color: '#a88865', bgColor: 'rgba(168, 136, 101, 0.15)', icon: '📖' },
    Best: { key: 'Best', label: 'Best', viName: 'Tốt nhất', enName: 'Best', color: '#81b64c', bgColor: 'rgba(129, 182, 76, 0.15)', icon: '★' },
    Excellent: { key: 'Excellent', label: 'Excellent', viName: 'Xuất sắc', enName: 'Excellent', color: '#96bc4b', bgColor: 'rgba(150, 188, 75, 0.15)', icon: '👍' },
    Good: { key: 'Good', label: 'Good', viName: 'Tốt', enName: 'Good', color: '#96af8b', bgColor: 'rgba(150, 175, 139, 0.15)', icon: '✔️' },
    Inaccuracy: { key: 'Inaccuracy', label: 'Inaccuracy', viName: 'Không chính xác', enName: 'Inaccuracy', color: '#f7c631', bgColor: 'rgba(247, 198, 49, 0.15)', icon: '?!' },
    Mistake: { key: 'Mistake', label: 'Mistake', viName: 'Sai lầm', enName: 'Mistake', color: '#e58f2a', bgColor: 'rgba(229, 143, 42, 0.15)', icon: '?' },
    Miss: { key: 'Miss', label: 'Miss', viName: 'Bỏ lỡ', enName: 'Miss', color: '#ff7769', bgColor: 'rgba(255, 119, 105, 0.15)', icon: 'X' },
    Blunder: { key: 'Blunder', label: 'Blunder', viName: 'Sai lầm nặng', enName: 'Blunder', color: '#ca3431', bgColor: 'rgba(202, 52, 49, 0.15)', icon: '??' }
};

function getCategoryName(categoryKey, lang = (typeof currentLang !== 'undefined' ? currentLang : 'vi')) {
    const cat = MOVE_CATEGORIES[categoryKey];
    if (!cat) return categoryKey;
    return lang === 'en' ? cat.enName : cat.viName;
}

/**
 * Tính xác suất thắng (Win Percentage) từ điểm centipawn (cp) theo công thức chuẩn Chess.com:
 * Win% = 50 + 50 * (2 / (1 + Math.exp(-0.00368208 * cp)) - 1)
 * @param {number} cp - Điểm centipawn từ góc nhìn của bên đi
 * @returns {number} Xác suất thắng (0 - 100%)
 */
function calculateWinPercentage(cp) {
    if (cp === null || cp === undefined) return 50.0;
    const safeCp = Math.max(-10000, Math.min(10000, Number(cp) || 0));
    const wp = 50 + 50 * (2 / (1 + Math.exp(-0.00368208 * safeCp)) - 1);
    return Math.max(0, Math.min(100, Number(wp.toFixed(2))));
}

/**
 * Tính độ chính xác (Accuracy %) của một nước đi dựa trên chênh lệch Win Percentage và hạng mục nước cờ.
 * Đảm bảo các nước Blunder bị kéo tụt điểm nghiêm trọng, không thể có Accuracy >90% khi có nhiều Blunder.
 * @param {number} winLoss - Độ sụt giảm xác suất thắng (Win%_Trước - Win%_Sau)
 * @param {string} [category] - Hạng mục nước đi (Best, Excellent, Good, Inaccuracy, Mistake, Miss, Blunder)
 * @param {number} [cpLoss] - Độ sụt giảm centipawn
 * @returns {number} Độ chính xác của nước đi (0 - 100%)
 */
function calculateMoveAccuracy(winLoss, category = null, cpLoss = 0) {
    const loss = Math.max(0, Number(winLoss) || 0);

    // Công thức tính Accuracy từ Win% loss (chênh lệch Xác suất Thắng):
    let acc = 100 - (loss * 2.2);
    if (loss > 5) {
        acc -= Math.pow(loss - 5, 1.25) * 0.85;
    }

    // Rào chắn phân hạng (Caps & Floors) theo chuẩn Chess.com:
    // Đảm bảo Blunder kéo tụt Accuracy cực mạnh (không thể có chuyện Accuracy >90% khi có nhiều Blunder)
    if (category === 'Best' || category === 'Book' || category === 'Brilliant' || category === 'Great') {
        acc = Math.max(98, acc);
    } else if (category === 'Excellent') {
        acc = Math.min(98, Math.max(88, acc));
    } else if (category === 'Good') {
        acc = Math.min(88, Math.max(68, acc));
    } else if (category === 'Inaccuracy') {
        acc = Math.min(68, Math.max(40, acc));
    } else if (category === 'Mistake') {
        acc = Math.min(40, Math.max(15, acc));
    } else if (category === 'Miss') {
        acc = Math.min(30, Math.max(5, acc));
    } else if (category === 'Blunder') {
        // Blunder luôn bị phạt cực nặng: tối đa 15%, giảm dần về 0% theo lượng cpLoss
        const blunderScore = Math.max(0, 15 - Math.max(0, cpLoss - 250) / 50);
        acc = Math.min(blunderScore, acc);
    }

    return Math.max(0, Math.min(100, Math.round(acc * 10) / 10));
}

/**
 * Đánh giá chất lượng của một nước đi theo chuẩn Expected Points Model (Chess.com & Lichess)
 * @param {Object} evalBefore - Đánh giá thế cờ trước nước đi
 * @param {Object} evalAfter - Đánh giá thế cờ sau nước đi
 * @param {string} moverColor - 'w' hoặc 'b'
 * @param {string} playedUci - Nước đi thực tế dạng UCI (vd: 'e2e4')
 * @param {string} bestUci - Nước đi tốt nhất của Engine dạng UCI
 * @param {number} [moveIndex] - Chỉ số nước cờ (để nhận diện Book moves)
 * @returns {Object} Kết quả phân loại chi tiết
 */
function evaluateMoveQuality(evalBefore, evalAfter, moverColor, playedUci, bestUci, moveIndex = null) {
    const toWhitePerspectiveFn = (typeof toWhitePerspective === 'function')
        ? toWhitePerspective
        : (raw, turn) => {
            const mult = (turn === 'w') ? 1 : -1;
            return { cpWhite: (raw?.cp || 0) * mult, mateWhite: (raw?.mate !== null && raw?.mate !== undefined) ? raw.mate * mult : null };
        };

    const whiteBefore = (evalBefore && evalBefore.cpWhite !== undefined) ? evalBefore : toWhitePerspectiveFn(evalBefore, moverColor);
    const nextTurn = moverColor === 'w' ? 'b' : 'w';
    const whiteAfter = (evalAfter && evalAfter.cpWhite !== undefined) ? evalAfter : toWhitePerspectiveFn(evalAfter, nextTurn);

    const sign = (moverColor === 'w') ? 1 : -1;
    const cpMoverBefore = (whiteBefore.cpWhite || 0) * sign;
    const cpMoverAfter = (whiteAfter.cpWhite || 0) * sign;

    const mateMoverBefore = (whiteBefore.mateWhite !== null && whiteBefore.mateWhite !== undefined) ? (whiteBefore.mateWhite * sign) : null;
    const mateMoverAfter = (whiteAfter.mateWhite !== null && whiteAfter.mateWhite !== undefined) ? (whiteAfter.mateWhite * sign) : null;

    const isGettingMatedAfter = (mateMoverAfter !== null && mateMoverAfter < 0) || (cpMoverAfter <= -9000);
    const wasGettingMatedBefore = (mateMoverBefore !== null && mateMoverBefore < 0) || (cpMoverBefore <= -9000);
    const hadMateBefore = (mateMoverBefore !== null && mateMoverBefore > 0);
    const hasMateAfter = (mateMoverAfter !== null && mateMoverAfter > 0);

    let cpLoss = Math.max(0, cpMoverBefore - cpMoverAfter);

    // 1. Blunder Mate: Nước đi khiến bản thân rơi vào thế bị chiếu hết
    const isBlunderedMate = (!wasGettingMatedBefore && isGettingMatedAfter);
    if (isBlunderedMate) {
        cpLoss = Math.max(cpLoss, 10000);
    }

    // 2. Accelerated Mate: Đang bị chiếu hết nhưng đi nước làm tăng tốc độ bị chiếu (ví dụ từ M5 -> M1)
    let isAcceleratedMate = false;
    if (wasGettingMatedBefore && isGettingMatedAfter && mateMoverBefore !== null && mateMoverAfter !== null) {
        if (Math.abs(mateMoverAfter) < Math.abs(mateMoverBefore)) {
            isAcceleratedMate = true;
            cpLoss = Math.max(cpLoss, 5000);
        }
    }

    // 3. Chuyển đổi Centipawn (cp) sang Win Percentage (WP) trước khi phân loại (Expected Points Model):
    // const winPercent = (cp) => 50 + 50 * (2 / (1 + Math.exp(-0.00368208 * cp)) - 1);
    const winPercent = (cp) => 50 + 50 * (2 / (1 + Math.exp(-0.00368208 * cp)) - 1);

    let winBefore = 50.0;
    if (hadMateBefore) {
        winBefore = 100.0;
    } else if (wasGettingMatedBefore) {
        winBefore = 0.0;
    } else {
        winBefore = winPercent(cpMoverBefore);
    }

    let winAfter = 50.0;
    if (hasMateAfter) {
        winAfter = 100.0;
    } else if (isGettingMatedAfter) {
        winAfter = 0.0;
    } else {
        winAfter = winPercent(cpMoverAfter);
    }

    const winLoss = Math.max(0, winBefore - winAfter);

    // 4. Miss (Bỏ lỡ): Xảy ra khi trước đó đang có lợi thế thắng rất lớn (CP >= 300 hoặc có thế chiếu hết thắng)
    // nhưng nước đi làm rơi mất lợi thế đó về gần cân bằng hoặc thua, mà không hẳn là Blundered Mate
    const hadHugeAdvantage = hadMateBefore || (winBefore >= 90.0) || (cpMoverBefore >= 300);
    const lostHugeAdvantage = (winAfter < 65.0) && (winLoss >= 20.0);
    const isMissedMate = (hadMateBefore && !hasMateAfter && winAfter < 80.0);
    const isMiss = !isBlunderedMate && !isAcceleratedMate && hadHugeAdvantage && (lostHugeAdvantage || isMissedMate);

    const isEngineBest = Boolean(playedUci && bestUci && playedUci === bestUci);

    // 5. Great (!): Nước đi duy nhất (only move) giúp cứu vãn thế cờ hiểm nghèo hoặc duy trì ưu thế duy nhất
    const isGreat = isEngineBest && (winLoss < 1.0) && (
        (wasGettingMatedBefore && !isGettingMatedAfter) || // Thoát khỏi chiếu hết
        (winBefore < 30.0 && winAfter >= 30.0) ||          // Cứu vãn thế cờ thua
        (cpMoverAfter - cpMoverBefore >= 80) ||            // Engine nhìn thấy chiến thuật sâu hơn (Horizon effect)
        (mateMoverAfter !== null && mateMoverAfter > 0 && mateMoverBefore === null) // Đột ngột tìm ra đường Mat
    );

    // 6. Book (📖): Nằm trong 10 ply đầu (moveIndex <= 10) và winLoss rất thấp
    const isBook = (moveIndex !== null && moveIndex !== undefined && moveIndex <= 10 && winLoss <= 1.0);

    // 7. PHÂN LOẠI THEO CHUẨN EXPECTED POINTS MODEL (WIN LOSS):
    // - Best (★): Nước đi tốt nhất của engine (hoặc chênh lệch win% < 0.5%)
    // - Excellent (👍): Sụt giảm win% từ 0.5% đến 2%
    // - Good (✔️): Sụt giảm win% từ 2% đến 5%
    // - Inaccuracy (?!): Sụt giảm win% từ 5% đến 10%
    // - Mistake (?): Sụt giảm win% từ 10% đến 20%
    // - Blunder (??): Sụt giảm win% > 20%
    let categoryKey = 'Good';

    if (isBlunderedMate || isAcceleratedMate) {
        categoryKey = 'Blunder';
    } else if (isMiss) {
        categoryKey = 'Miss';
    } else if (isGreat) {
        categoryKey = 'Great';
    } else if (isBook) {
        categoryKey = 'Book';
    } else if (isGettingMatedAfter && !isEngineBest) {
        categoryKey = 'Blunder';
    } else if (isEngineBest || winLoss < 0.5) {
        categoryKey = 'Best';
    } else if (winLoss <= 2.0) {
        categoryKey = 'Excellent';
    } else if (winLoss <= 5.0) {
        categoryKey = 'Good';
    } else if (winLoss <= 10.0) {
        categoryKey = 'Inaccuracy';
    } else if (winLoss <= 20.0) {
        categoryKey = 'Mistake';
    } else {
        categoryKey = 'Blunder';
    }

    // 8. Tính Accuracy cho nước đi
    const moveAccuracy = calculateMoveAccuracy(winLoss, categoryKey, cpLoss);

    return {
        category: categoryKey,
        info: MOVE_CATEGORIES[categoryKey],
        winBefore: Number(winBefore.toFixed(2)),
        winAfter: Number(winAfter.toFixed(2)),
        winLoss: Number(winLoss.toFixed(2)),
        cpLoss: cpLoss,
        accuracy: moveAccuracy,
        isEngineBest: isEngineBest
    };
}

/**
 * Nhận diện nước đi xuất thần (Brilliant !!) theo chuẩn Expected Points & Chess.com:
 * CHỈ gán nhãn Brilliant khi nước đi đó là một nước HY SINH QUÂN
 * (đi quân vào ô bị tấn công mà không có bảo vệ, hoặc đổi quân lỗ giá trị material)
 * VÀ điểm số đánh giá sau đó của Stockfish vẫn giữ nguyên hoặc tốt hơn, đồng thời không ở trạng thái thua trước đó.
 * TUYỆT ĐỐI KHÔNG gán Brilliant cho các nước đổi Hậu hay ăn quân thông thường.
 * @param {Object} pos - Thế cờ sau nước đi
 * @param {Object} prevPos - Thế cờ trước nước đi
 * @returns {boolean} True nếu là nước cờ Brilliant
 */
function detectBrilliant(pos, prevPos) {
    if (!pos || !pos.classification || !pos.eval || !pos.move) return false;
    if (!prevPos || !prevPos.eval) return false;

    const cls = pos.classification;

    // Không tính các nước mở đầu sách giáo khoa
    if (cls.category === 'Book') return false;

    const moverColor = pos.move.color;
    const sign = (moverColor === 'w') ? 1 : -1;

    // 1. Kiểm tra đánh giá TRƯỚC nước đi (prevPos):
    // ĐIỀU KIỆN: KHÔNG ở trạng thái thua trước đó
    const whiteCpBefore = (prevPos.eval.cpWhite !== undefined)
        ? prevPos.eval.cpWhite
        : ((prevPos.eval.cp || 0) * (prevPos.turn === 'w' ? 1 : -1));
    const moverCpBefore = whiteCpBefore * sign;
    const mateMoverBefore = (prevPos.eval.mateWhite !== null && prevPos.eval.mateWhite !== undefined)
        ? (prevPos.eval.mateWhite * sign)
        : null;

    const wasGettingMatedBefore = (mateMoverBefore !== null && mateMoverBefore < 0);
    // Nếu trước đó đang bị chiếu hết hoặc điểm số âm nặng (thua rõ rệt, cp < -100):
    if (wasGettingMatedBefore || moverCpBefore < -100) return false;

    // 2. Kiểm tra đánh giá SAU nước đi (pos):
    // ĐIỀU KIỆN: Điểm số đánh giá sau đó của Stockfish vẫn GIỮ NGUYÊN hoặc TỐT HƠN
    const whiteCpAfter = (pos.eval.cpWhite !== undefined)
        ? pos.eval.cpWhite
        : ((pos.eval.cp || 0) * (pos.turn === 'w' ? 1 : -1));
    const moverCpAfter = whiteCpAfter * sign;
    const mateMoverAfter = (pos.eval.mateWhite !== null && pos.eval.mateWhite !== undefined)
        ? (pos.eval.mateWhite * sign)
        : null;

    const isGettingMatedAfter = (mateMoverAfter !== null && mateMoverAfter < 0);
    const hasMateAfter = (mateMoverAfter !== null && mateMoverAfter > 0);

    // Không thể là Brilliant nếu sau nước đi rơi vào thế bị chiếu hết
    if (isGettingMatedAfter) return false;

    // Điểm số sau nước đi phải giữ nguyên hoặc tốt hơn (cho phép sai số engine depth tối đa 5 cp)
    // Hoặc đem lại thế chiếu hết thắng (hasMateAfter)
    const evalMaintainedOrBetter = hasMateAfter || (moverCpAfter >= moverCpBefore - 5);
    if (!evalMaintainedOrBetter) return false;

    // Sau nước đi, thế cờ phải không thua (moverCpAfter >= -50)
    if (moverCpAfter < -50) return false;

    // Xác suất thắng không được sụt giảm quá 0.5%
    if (cls.winLoss !== undefined && cls.winLoss > 0.5) return false;
    if (cls.cpLoss !== undefined && cls.cpLoss > 5) return false;
    if (cls.winAfter !== undefined && cls.winAfter < 50.0) return false;

    // Phải là nước đi tốt nhất hoặc thuộc nhóm Best của Engine
    const isTopChoice = Boolean(cls.isEngineBest || cls.category === 'Best' || (cls.winLoss !== undefined && cls.winLoss < 0.5));
    if (!isTopChoice) return false;

    // 3. ĐIỀU KIỆN HY SINH QUÂN (SACRIFICE) NGHIÊM NGẶT:
    // Tuyệt đối không gán Brilliant cho các nước đổi Hậu hay ăn quân thông thường.
    const pieceValues = { q: 9, r: 5, b: 3, n: 3, p: 1, k: 0 };
    const movedPiece = (pos.move.piece || '').toLowerCase();
    const movedVal = pieceValues[movedPiece] || 0;
    const capturedPiece = pos.move.captured ? pos.move.captured.toLowerCase() : null;
    const capturedVal = capturedPiece ? (pieceValues[capturedPiece] || 0) : 0;

    // Vua không bao giờ là quân hy sinh
    if (movedPiece === 'k') return false;

    // TUYỆT ĐỐI LOẠI TRỪ: Nước ăn quân bình thường hoặc đổi quân (capturedVal >= movedVal)
    // Ví dụ: Đổi Hậu (QxQ 9 vs 9), đổi Xe (RxR 5 vs 5), đổi Mã/Tượng (3 vs 3), ăn hơn quân (PxQ, NxQ, RxQ...)
    if (capturedPiece && capturedVal >= movedVal) {
        return false;
    }

    const fenAfter = pos.fen || (pos.move && pos.move.fen) || null;
    const ChessConstructor = (typeof Chess !== 'undefined') ? Chess : (typeof window !== 'undefined' ? window.Chess : null);
    if (!fenAfter || !ChessConstructor) return false;

    try {
        const cAfter = new ChessConstructor(fenAfter);
        const oppMoves = cAfter.moves({ verbose: true });

        // Trường hợp 1: Quân vừa đi là quân bị hy sinh (Knight, Bishop, Rook, Queen: movedVal >= 3)
        if (movedVal >= 3) {
            const toSq = pos.move.to;
            const attacksOnPiece = oppMoves.filter(m => m.to === toSq);

            if (attacksOnPiece.length > 0) {
                const minAttackerVal = Math.min(...attacksOnPiece.map(m => pieceValues[m.piece] || 0));

                // 1.1: Đối phương có thể ăn bằng quân giá trị nhỏ hơn (ví dụ Tốt ăn Hậu/Xe/Mã/Tượng, hoặc Mã/Tượng ăn Hậu)
                // Đây chắc chắn là hy sinh material
                if (minAttackerVal < movedVal) {
                    return true;
                }

                // 1.2: Đi quân vào ô bị tấn công MÀ KHÔNG CÓ BẢO VỆ (unprotected / hanging piece)
                // Khi đối phương ăn, ta không có nước ăn lại nào (recaptures.length === 0)
                for (const oppCapture of attacksOnPiece) {
                    const cSim = new ChessConstructor(fenAfter);
                    const validOppMove = cSim.move(oppCapture);
                    if (validOppMove) {
                        const ourRecaptures = cSim.moves({ verbose: true }).filter(m => m.to === toSq);
                        if (ourRecaptures.length === 0) {
                            return true;
                        }
                    }
                }
            }
        }

        // Trường hợp 2: Hy sinh quân khác (Discovered Sacrifice / Deflection):
        // Nước đi bỏ mặc một quân giá trị cao khác (Xe, Hậu, Mã, Tượng >= 3) cho đối phương ăn
        const oppCapturesOther = oppMoves.filter(m => m.captured && (pieceValues[m.captured] || 0) >= 3 && m.to !== pos.move.to);
        for (const oppCap of oppCapturesOther) {
            const oppPieceVal = pieceValues[oppCap.piece] || 0;
            const targetPieceVal = pieceValues[oppCap.captured] || 0;

            // Bỏ mặc quân bị ăn bởi quân giá trị nhỏ hơn
            if (oppPieceVal < targetPieceVal) {
                return true;
            }

            // Hoặc quân đó bị bỏ mặc hoàn toàn không có bảo vệ
            const cSim = new ChessConstructor(fenAfter);
            if (cSim.move(oppCap)) {
                const recaptures = cSim.moves({ verbose: true }).filter(m => m.to === oppCap.to);
                if (recaptures.length === 0) {
                    return true;
                }
            }
        }
    } catch (e) {
        return false;
    }

    return false;
}

/**
 * Phân loại toàn bộ các nước đi và tính toán thống kê (Accuracy, Category Counts) của ván cờ
 * @param {Array} positions - Mảng các thế cờ gamePositions
 * @returns {Object} Thống kê chi tiết cho White ('w') và Black ('b')
 */
function classifyAllMovesAndStats(positions) {
    const stats = {
        w: {
            accuracies: [],
            avgAccuracy: 0,
            counts: {
                Brilliant: 0,
                Great: 0,
                Book: 0,
                Best: 0,
                Excellent: 0,
                Good: 0,
                Inaccuracy: 0,
                Mistake: 0,
                Miss: 0,
                Blunder: 0
            }
        },
        b: {
            accuracies: [],
            avgAccuracy: 0,
            counts: {
                Brilliant: 0,
                Great: 0,
                Book: 0,
                Best: 0,
                Excellent: 0,
                Good: 0,
                Inaccuracy: 0,
                Mistake: 0,
                Miss: 0,
                Blunder: 0
            }
        }
    };

    for (let i = 1; i < positions.length; i++) {
        const prevPos = positions[i - 1];
        const currPos = positions[i];

        if (!prevPos.eval || !currPos.eval) continue;

        const moverColor = currPos.move.color;
        const playedUci = currPos.move.uci;
        const bestUci = prevPos.eval.bestmove;

        const result = evaluateMoveQuality(prevPos.eval, currPos.eval, moverColor, playedUci, bestUci, i);
        currPos.classification = result;

        // Tích hợp kiểm tra Brilliant trực tiếp
        if (detectBrilliant(currPos, prevPos)) {
            currPos.classification.isBrilliant = true;
            currPos.classification.category = 'Brilliant';
            currPos.classification.info = MOVE_CATEGORIES['Brilliant'];
            currPos.classification.accuracy = 100.0;
        }

        const finalCat = currPos.classification.category;
        stats[moverColor].accuracies.push(currPos.classification.accuracy);
        if (stats[moverColor].counts[finalCat] !== undefined) {
            stats[moverColor].counts[finalCat]++;
        }
    }

    ['w', 'b'].forEach(color => {
        const arr = stats[color].accuracies;
        if (arr.length > 0) {
            const sum = arr.reduce((a, b) => a + b, 0);
            stats[color].avgAccuracy = Number((sum / arr.length).toFixed(1));
        } else {
            stats[color].avgAccuracy = 0;
        }
    });

    return stats;
}

if (typeof window !== 'undefined') {
    window.MOVE_CATEGORIES = MOVE_CATEGORIES;
    window.getCategoryName = getCategoryName;
    window.calculateWinPercentage = calculateWinPercentage;
    window.calculateMoveAccuracy = calculateMoveAccuracy;
    window.evaluateMoveQuality = evaluateMoveQuality;
    window.detectBrilliant = detectBrilliant;
    window.classifyAllMovesAndStats = classifyAllMovesAndStats;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        MOVE_CATEGORIES,
        getCategoryName,
        calculateWinPercentage,
        calculateMoveAccuracy,
        evaluateMoveQuality,
        detectBrilliant,
        classifyAllMovesAndStats
    };
}
