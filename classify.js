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
 * Continuous Accuracy curve (Chess.com / Lichess standard):
 * Acc = 103.1668 * exp(-0.04354 * winLoss) - 3.1669
 * Eliminates artificial step-function cliffs across classification thresholds.
 */
function calculateMoveAccuracy(winLoss, category = null, cpLoss = 0) {
    const loss = Math.max(0, Number(winLoss) || 0);

    if (loss <= 0.1 || category === 'Brilliant' || category === 'Book' || category === 'Best') {
        return 100.0;
    }

    let acc = 103.1668 * Math.exp(-0.04354 * loss) - 3.1669;

    if (category === 'Blunder') {
        acc = Math.min(acc, Math.max(0, 25 - Math.max(0, loss - 20) * 0.45));
    } else if (category === 'Miss') {
        acc = Math.min(acc, Math.max(5, 45 - Math.max(0, loss - 15) * 0.5));
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
function evaluateMoveQuality(evalBefore, evalAfter, moverColor, playedUci, bestUci, moveIndex = null, moveContext = null) {
    if (!evalBefore || !evalAfter) return null;

    const toWhitePerspectiveFn = (typeof toWhitePerspective === 'function')
        ? toWhitePerspective
        : (raw, turn) => {
            const mult = (turn === 'w') ? 1 : -1;
            if (raw && raw.mate === 0) {
                const winnerSign = (turn === 'w') ? -1 : 1;
                return { cpWhite: winnerSign * 10000, mateWhite: 0 };
            }
            if (raw && raw.mate !== null && raw.mate !== undefined) {
                const mateW = raw.mate * mult;
                return { cpWhite: mateW > 0 ? 10000 : -10000, mateWhite: mateW };
            }
            return { cpWhite: (raw?.cp || 0) * mult, mateWhite: null };
        };

    const whiteBefore = (evalBefore.cpWhite !== undefined) ? evalBefore : toWhitePerspectiveFn(evalBefore, moverColor);
    const nextTurn = moverColor === 'w' ? 'b' : 'w';
    const whiteAfter = (evalAfter.cpWhite !== undefined) ? evalAfter : toWhitePerspectiveFn(evalAfter, nextTurn);

    const sign = (moverColor === 'w') ? 1 : -1;
    const cpMoverBefore = (whiteBefore.cpWhite || 0) * sign;
    const cpMoverAfter = (whiteAfter.cpWhite || 0) * sign;

    const mateMoverBefore = (whiteBefore.mateWhite !== null && whiteBefore.mateWhite !== undefined) ? (whiteBefore.mateWhite * sign) : null;
    const mateMoverAfter = (whiteAfter.mateWhite !== null && whiteAfter.mateWhite !== undefined) ? (whiteAfter.mateWhite * sign) : null;

    const deliveredCheckmate = (mateMoverAfter === 0 && cpMoverAfter > 0);
    const wasGettingMatedBefore = (mateMoverBefore !== null && mateMoverBefore < 0);
    const isGettingMatedAfter = (mateMoverAfter !== null && mateMoverAfter < 0) || (mateMoverAfter === 0 && cpMoverAfter < 0);
    const hadMateBefore = (mateMoverBefore !== null && mateMoverBefore > 0);
    const hasMateAfter = deliveredCheckmate || (mateMoverAfter !== null && mateMoverAfter > 0);

    let cpLoss = Math.max(0, cpMoverBefore - cpMoverAfter);
    const isBlunderedMate = (!wasGettingMatedBefore && isGettingMatedAfter);
    if (isBlunderedMate) cpLoss = Math.max(cpLoss, 10000);

    let isAcceleratedMate = false;
    if (wasGettingMatedBefore && isGettingMatedAfter && mateMoverBefore !== null && mateMoverAfter !== null) {
        if (mateMoverAfter === 0 || Math.abs(mateMoverAfter) < Math.abs(mateMoverBefore)) {
            isAcceleratedMate = true;
            cpLoss = Math.max(cpLoss, 5000);
        }
    }

    const winBefore = hadMateBefore ? 100.0 : (wasGettingMatedBefore ? 0.0 : calculateWinPercentage(cpMoverBefore));
    const winAfter = hasMateAfter ? 100.0 : (isGettingMatedAfter ? 0.0 : calculateWinPercentage(cpMoverAfter));
    const winLoss = Math.max(0, winBefore - winAfter);

    const cleanPlayed = playedUci ? playedUci.trim().toLowerCase() : '';
    const cleanBest = bestUci ? bestUci.trim().toLowerCase() : '';
    const isEngineBest = Boolean(cleanPlayed && cleanBest && cleanPlayed === cleanBest);

    let isGreat = false;
    if ((isEngineBest || deliveredCheckmate) && !isBlunderedMate && !isAcceleratedMate && (moveIndex === null || moveIndex > 6)) {
        let opponentGaveChance = false;
        let swingGain = 0;
        if (moveContext && moveContext.evalPrevPrev) {
            const whitePrevPrev = (moveContext.evalPrevPrev.cpWhite !== undefined)
                ? moveContext.evalPrevPrev
                : toWhitePerspectiveFn(moveContext.evalPrevPrev, moverColor);
            const winPrevPrev = calculateWinPercentage((whitePrevPrev.cpWhite || 0) * sign);
            swingGain = winBefore - winPrevPrev;
            if (swingGain >= 15.0 && winAfter >= 45.0 && winAfter <= 92.0) {
                opponentGaveChance = true;
            }
        }
        const moveObj = moveContext && moveContext.move ? moveContext.move : null;
        const isRecapture = Boolean(moveObj && moveObj.captured && swingGain < 15.0);
        const foundHiddenMate = (hasMateAfter && !hadMateBefore && cpMoverBefore < 500);
        const rescuedBadPosition = (winBefore < 45.0 && winAfter >= 48.0 && !isRecapture);

        isGreat = opponentGaveChance || foundHiddenMate || rescuedBadPosition;
    }

    const isBook = (
        moveIndex !== null &&
        moveIndex !== undefined &&
        moveIndex <= 10 &&
        winLoss <= 1.0 &&
        winBefore >= 38.0 &&
        winBefore <= 62.0 &&
        Math.abs(cpMoverBefore) <= 120 &&
        !isGreat
    );

    const hadWinningChance = hadMateBefore || (winBefore >= 82.0 && cpMoverBefore >= 350);
    const stayedNotLosing = !isGettingMatedAfter && winAfter >= 40.0;
    const isMissedMate = (hadMateBefore && !hasMateAfter && winAfter < 95.0);
    const isLostWinningEdge = (winBefore - winAfter >= 18.0 && winAfter < 68.0);
    const isMiss = !isBlunderedMate && !isAcceleratedMate && hadWinningChance && stayedNotLosing && (isMissedMate || isLostWinningEdge);

    let categoryKey = 'Good';

    if (isBlunderedMate || isAcceleratedMate) {
        categoryKey = 'Blunder';
    } else if (isGettingMatedAfter && !isEngineBest && !wasGettingMatedBefore) {
        categoryKey = 'Blunder';
    } else if (isEngineBest || deliveredCheckmate || winLoss < 0.5) {
        categoryKey = isGreat ? 'Great' : (isBook ? 'Book' : 'Best');
    } else if (isMiss) {
        categoryKey = 'Miss';
    } else if (isBook) {
        categoryKey = 'Book';
    } else if (cpMoverAfter >= 500 && !hadMateBefore) {
        categoryKey = (winLoss <= 5.0) ? 'Excellent' : 'Good';
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

    const moveAccuracy = calculateMoveAccuracy(winLoss, categoryKey, cpLoss);

    return {
        category: categoryKey,
        info: MOVE_CATEGORIES[categoryKey],
        winBefore,
        winAfter,
        winLoss: Number(winLoss.toFixed(2)),
        cpLoss,
        accuracy: moveAccuracy,
        isEngineBest
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
    if (cls.category === 'Book') return false;

    const moverColor = pos.move.color;
    const sign = (moverColor === 'w') ? 1 : -1;

    const whiteCpBefore = (prevPos.eval.cpWhite !== undefined)
        ? prevPos.eval.cpWhite
        : ((prevPos.eval.cp || 0) * (moverColor === 'w' ? 1 : -1));
    const moverCpBefore = whiteCpBefore * sign;
    const mateMoverBefore = (prevPos.eval.mateWhite !== null && prevPos.eval.mateWhite !== undefined)
        ? (prevPos.eval.mateWhite * sign)
        : null;

    if ((mateMoverBefore !== null && mateMoverBefore < 0) || moverCpBefore < -120 || moverCpBefore > 500) {
        return false;
    }

    const whiteCpAfter = (pos.eval.cpWhite !== undefined)
        ? pos.eval.cpWhite
        : ((pos.eval.cp || 0) * (moverColor === 'w' ? -1 : 1));
    const moverCpAfter = whiteCpAfter * sign;
    const mateMoverAfter = (pos.eval.mateWhite !== null && pos.eval.mateWhite !== undefined)
        ? (pos.eval.mateWhite * sign)
        : null;

    if (mateMoverAfter !== null && mateMoverAfter < 0) return false;
    const hasMateAfter = (mateMoverAfter === 0 && moverCpAfter > 0) || (mateMoverAfter !== null && mateMoverAfter > 0);

    if (!hasMateAfter && (moverCpAfter < moverCpBefore - 30 || moverCpAfter < -80)) return false;
    if (cls.winLoss !== undefined && cls.winLoss > 0.8) return false;
    if (cls.winAfter !== undefined && cls.winAfter < 48.0) return false;

    const isTopChoice = Boolean(cls.isEngineBest || cls.category === 'Best' || cls.category === 'Great' || (cls.winLoss !== undefined && cls.winLoss < 0.5));
    if (!isTopChoice) return false;

    const pieceValues = { q: 9, r: 5, b: 3, n: 3, p: 1, k: 100 };
    const movedPiece = (pos.move.piece || '').toLowerCase();
    const movedVal = pieceValues[movedPiece] || 0;
    const capturedPiece = pos.move.captured ? pos.move.captured.toLowerCase() : null;
    const capturedVal = capturedPiece ? (pieceValues[capturedPiece] || 0) : 0;

    if (movedPiece === 'k') return false;
    if (capturedPiece && capturedVal >= movedVal) return false;

    const fenAfter = pos.fen || (pos.move && pos.move.fen) || null;
    const ChessConstructor = (typeof Chess !== 'undefined') ? Chess : (typeof window !== 'undefined' ? window.Chess : null);
    if (!fenAfter || !ChessConstructor) return false;

    try {
        const cAfter = new ChessConstructor(fenAfter);
        const oppMoves = cAfter.moves({ verbose: true });

        if (movedVal >= 3) {
            const toSq = pos.move.to;
            const attacksOnPiece = oppMoves.filter(m => m.to === toSq);

            if (attacksOnPiece.length > 0) {
                const minAttackerVal = Math.min(...attacksOnPiece.map(m => pieceValues[m.piece] || 100));
                if (minAttackerVal < movedVal) return true;

                for (const oppCapture of attacksOnPiece) {
                    const m = cAfter.move(oppCapture);
                    if (m) {
                        const ourRecaptures = cAfter.moves({ verbose: true }).filter(r => r.to === toSq);
                        cAfter.undo();
                        if (ourRecaptures.length === 0) return true;
                    }
                }
            }
        }

        const fenBefore = pos.fenBefore || prevPos.fen || null;
        let previouslyHangingSquares = new Set();
        const rawOppCapturesOther = oppMoves.filter(m => m.captured && (pieceValues[m.captured] || 0) >= 3 && m.to !== pos.move.to);

        if (fenBefore && rawOppCapturesOther.length > 0) {
            const cBefore = new ChessConstructor(fenBefore);
            const parts = fenBefore.split(' ');
            parts[1] = moverColor === 'w' ? 'b' : 'w';
            parts[3] = '-';
            if (cBefore.load(parts.join(' '))) {
                cBefore.moves({ verbose: true })
                    .filter(m => m.captured)
                    .forEach(m => previouslyHangingSquares.add(m.to));
            }
        }

        const oppCapturesOther = rawOppCapturesOther.filter(m => !previouslyHangingSquares.has(m.to));

        for (const oppCap of oppCapturesOther) {
            const oppPieceVal = pieceValues[oppCap.piece] || 100;
            const targetPieceVal = pieceValues[oppCap.captured] || 0;
            if (oppPieceVal < targetPieceVal) return true;

            const m = cAfter.move(oppCap);
            if (m) {
                const recaptures = cAfter.moves({ verbose: true }).filter(r => r.to === oppCap.to);
                cAfter.undo();
                if (recaptures.length === 0) return true;
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

    if (!Array.isArray(positions) || positions.length <= 1) {
        return stats;
    }

    for (let i = 1; i < positions.length; i++) {
        const prevPos = positions[i - 1];
        const currPos = positions[i];

        if (!prevPos || !currPos || !currPos.move || !prevPos.eval || !currPos.eval) continue;

        const moverColor = currPos.move.color;
        if (!stats[moverColor]) continue;

        const playedUci = currPos.move.uci;
        const bestUci = prevPos.eval.bestmove;

        const evalPrevPrev = (i >= 2 && positions[i - 2] && positions[i - 2].eval) ? positions[i - 2].eval : null;
        const result = evaluateMoveQuality(prevPos.eval, currPos.eval, moverColor, playedUci, bestUci, i, {
            evalPrevPrev: evalPrevPrev,
            move: currPos.move
        });

        if (!result) continue;
        currPos.classification = result;

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
            let weightedSum = 0;
            let totalWeight = 0;
            for (const acc of arr) {
                const weight = acc < 50 ? 2.0 : (acc < 80 ? 1.4 : 1.0);
                weightedSum += acc * weight;
                totalWeight += weight;
            }
            stats[color].avgAccuracy = Number((weightedSum / totalWeight).toFixed(1));
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
