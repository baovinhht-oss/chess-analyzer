/**
 * FILE: stats.js
 * Chức năng:
 * 1. Tính toán thống kê sự nghiệp tổng quan (Lifetime Stats) từ loadedGames và IndexedDB cache.
 * 2. Đổ dữ liệu lên Modal thống kê sự nghiệp chuẩn Chess.com Profile.
 * 3. Hỗ trợ đầy đủ song ngữ Anh - Việt (i18n).
 */

/**
 * Trích xuất tên khai cuộc từ chuỗi PGN
 * @param {string} pgn
 * @returns {string} Tên khai cuộc hoặc '--'
 */
function extractOpeningNameFromPGN(pgn) {
    if (!pgn || typeof pgn !== 'string') return '--';
    const ecoUrlMatch = pgn.match(/\[ECOUrl\s+"https?:\/\/[^"]*\/openings\/([^"]+)"\]/i) ||
        pgn.match(/\[ECOUrl\s+"[^"]*\/([^"/]+)"\]/i);
    if (ecoUrlMatch && ecoUrlMatch[1]) {
        let name = decodeURIComponent(ecoUrlMatch[1]).replace(/[-_]+/g, ' ').trim();
        return name || '--';
    }
    const openingMatch = pgn.match(/\[Opening\s+"([^"]+)"\]/i);
    if (openingMatch && openingMatch[1]) return openingMatch[1].trim();
    return '--';
}

/**
 * Xử lý escape chuỗi chống tấn công XSS
 * @param {string} str
 * @returns {string}
 */
function escapeHTML(str) {
    if (typeof window !== 'undefined' && typeof window.escapeHTML === 'function') {
        return window.escapeHTML(str);
    }
    return String(str || '').replace(/[&<>'"]/g, match => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
    }[match]));
}

/**
 * Trích xuất tổng trọng số (totalWeight) và tổng tích lũy (weightedSum) của từng ván đấu
 * Giải quyết triệt để Nghịch lý Simpson (Simpson's Paradox) khi tính độ chính xác trung bình tích lũy.
 * @param {Object} userStats - Thống kê của người chơi trong ván đấu
 * @param {Object} [cachedRecord] - Bản ghi cache đầy đủ (nếu có)
 * @returns {{ weightedSum: number, totalWeight: number }}
 */
function getGameWeightedAccuracy(userStats, cachedRecord = null) {
    if (!userStats || typeof userStats !== 'object') {
        return { weightedSum: 0, totalWeight: 0 };
    }

    // 1. Nếu ván đấu đã lưu sẵn weightedSum và totalWeight (từ classify.js / app.js)
    if (typeof userStats.weightedSum === 'number' && typeof userStats.totalWeight === 'number' && userStats.totalWeight > 0) {
        return {
            weightedSum: userStats.weightedSum,
            totalWeight: userStats.totalWeight
        };
    }

    // 2. Nếu có mảng accuracies của từng nước đi trong ván
    const accuracies = Array.isArray(userStats.accuracies) ? userStats.accuracies : null;
    if (accuracies && accuracies.length > 0) {
        let weightedSum = 0;
        let totalWeight = 0;
        for (const acc of accuracies) {
            const num = Number(acc);
            if (Number.isFinite(num)) {
                const weight = num < 50 ? 2.0 : (num < 80 ? 1.4 : 1.0);
                weightedSum += num * weight;
                totalWeight += weight;
            }
        }
        if (totalWeight > 0) {
            return {
                weightedSum: Number(weightedSum.toFixed(2)),
                totalWeight: Number(totalWeight.toFixed(2))
            };
        }
    }

    // 3. Nếu có cachedRecord.positions chứa các nước đi đã phân loại
    if (cachedRecord && Array.isArray(cachedRecord.positions) && cachedRecord.positions.length > 1) {
        const targetColor = cachedRecord.userColor || userStats.userColor;
        let weightedSum = 0;
        let totalWeight = 0;
        for (let i = 1; i < cachedRecord.positions.length; i++) {
            const pos = cachedRecord.positions[i];
            const moveColor = pos?.move?.color || (pos?.turn === 'w' ? 'b' : 'w');
            if (!targetColor || moveColor === targetColor) {
                const num = pos?.classification?.accuracy;
                if (typeof num === 'number' && Number.isFinite(num)) {
                    const weight = num < 50 ? 2.0 : (num < 80 ? 1.4 : 1.0);
                    weightedSum += num * weight;
                    totalWeight += weight;
                }
            }
        }
        if (totalWeight > 0) {
            return {
                weightedSum: Number(weightedSum.toFixed(2)),
                totalWeight: Number(totalWeight.toFixed(2))
            };
        }
    }

    // 4. Fallback: Nếu chỉ có avgAccuracy / accuracy và tổng số nước đi (từ counts)
    const acc = Number(userStats.avgAccuracy ?? userStats.accuracy);
    if (Number.isFinite(acc) && acc >= 0) {
        let moveCount = 0;
        if (userStats.counts && typeof userStats.counts === 'object') {
            for (const val of Object.values(userStats.counts)) {
                if (typeof val === 'number' && val > 0) moveCount += val;
            }
        }
        const weight = acc < 50 ? 2.0 : (acc < 80 ? 1.4 : 1.0);
        const totalWeight = (moveCount > 0 ? moveCount : 1) * weight;
        const weightedSum = acc * totalWeight;
        return {
            weightedSum: Number(weightedSum.toFixed(2)),
            totalWeight: Number(totalWeight.toFixed(2))
        };
    }

    return { weightedSum: 0, totalWeight: 0 };
}

/**
 * Tính toán thống kê trọn đời / sự nghiệp của người chơi
 * @param {Object} options
 * @param {Array} [options.loadedGames] - Danh sách ván cờ đã tải từ API Chess.com
 * @param {Array} [options.cachedAnalyses] - Danh sách phân tích đã lưu trong IndexedDB
 * @param {string} [options.username] - Tên người dùng
 * @param {string} [options.lang] - Ngôn ngữ ('vi' | 'en')
 * @returns {Object} Đối tượng thống kê chi tiết
 */
function calculateLifetimeStats(options = {}) {
    let games = [];
    if (Array.isArray(options.loadedGames)) {
        games = options.loadedGames;
    } else if (typeof window !== 'undefined' && typeof window.getLoadedGames === 'function') {
        const loaded = window.getLoadedGames();
        games = Array.isArray(loaded) ? loaded : [];
    } else if (typeof loadedGames !== 'undefined' && Array.isArray(loadedGames)) {
        games = loadedGames;
    }

    const analyses = Array.isArray(options.cachedAnalyses)
        ? options.cachedAnalyses
        : [];

    const rawUser = options.username || (typeof getAppUsername === 'function' ? getAppUsername() : (typeof CHESSCOM_USERNAME !== 'undefined' ? CHESSCOM_USERNAME : ''));
    const username = String(rawUser).trim().toLowerCase();
    const lang = options.lang || (typeof currentLang !== 'undefined' ? currentLang : 'vi');

    // 1. Thống kê kết quả ván đấu (Win / Loss / Draw)
    let wins = 0;
    let losses = 0;
    let draws = 0;
    const totalGames = games.length;

    // Map khai cuộc: openingName -> { name, count, wins, draws, losses }
    const openingsMap = new Map();

    for (const game of games) {
        if (!game || typeof game !== 'object') continue;

        const rType = game.resultType;
        if (rType === 'win') wins++;
        else if (rType === 'draw') draws++;
        else if (rType === 'loss') losses++;

        const openingExtractor = (typeof extractOpeningName === 'function')
            ? extractOpeningName
            : extractOpeningNameFromPGN;
        const openingName = openingExtractor(game.pgn);

        if (openingName && openingName !== '--') {
            if (!openingsMap.has(openingName)) {
                openingsMap.set(openingName, { name: openingName, count: 0, wins: 0, draws: 0, losses: 0 });
            }
            const opData = openingsMap.get(openingName);
            opData.count++;
            if (rType === 'win') opData.wins++;
            else if (rType === 'draw') opData.draws++;
            else if (rType === 'loss') opData.losses++;
        }
    }

    const winPct = (totalGames > 0 && Number.isFinite(wins / totalGames)) ? Number(((wins / totalGames) * 100).toFixed(1)) : 0;
    const drawPct = (totalGames > 0 && Number.isFinite(draws / totalGames)) ? Number(((draws / totalGames) * 100).toFixed(1)) : 0;
    const lossPct = (totalGames > 0 && Number.isFinite(losses / totalGames)) ? Number(((losses / totalGames) * 100).toFixed(1)) : 0;

    // 2. Thống kê phân tích (Global Weighted Accuracy & Move Badges)
    const cacheByUrl = new Map();
    for (const item of analyses) {
        if (!item || typeof item !== 'object') continue;
        if (item.gameUrl) {
            const prev = cacheByUrl.get(item.gameUrl);
            if (!prev || (item.depth || 0) >= (prev.depth || 0)) {
                cacheByUrl.set(item.gameUrl, item);
            }
        }
        if (item.id && !item.gameUrl) {
            const prev = cacheByUrl.get(item.id);
            if (!prev || (item.depth || 0) >= (prev.depth || 0)) {
                cacheByUrl.set(item.id, item);
            }
        }
    }

    const badges = {
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
    };

    let userAnalyzedCount = 0;
    let userGlobalWeightedSum = 0;
    let userGlobalTotalWeight = 0;

    let whiteAnalyzedCount = 0;
    let whiteGlobalWeightedSum = 0;
    let whiteGlobalTotalWeight = 0;

    let blackAnalyzedCount = 0;
    let blackGlobalWeightedSum = 0;
    let blackGlobalTotalWeight = 0;

    const processedGameUrls = new Set();

    for (const game of games) {
        if (!game || typeof game !== 'object' || !game.url) continue;
        const cached = cacheByUrl.get(game.url);
        if (cached && cached.stats && typeof cached.stats === 'object') {
            processedGameUrls.add(game.url);
            const userColor = game.userColor || (game.white && game.white.username && String(game.white.username).toLowerCase() === username ? 'w' : 'b');
            const userStats = cached.stats[userColor];

            if (userStats && typeof userStats === 'object') {
                const { weightedSum, totalWeight } = getGameWeightedAccuracy(userStats, cached);
                if (totalWeight > 0) {
                    userAnalyzedCount++;
                    userGlobalWeightedSum += weightedSum;
                    userGlobalTotalWeight += totalWeight;
                    if (userColor === 'w') {
                        whiteAnalyzedCount++;
                        whiteGlobalWeightedSum += weightedSum;
                        whiteGlobalTotalWeight += totalWeight;
                    } else {
                        blackAnalyzedCount++;
                        blackGlobalWeightedSum += weightedSum;
                        blackGlobalTotalWeight += totalWeight;
                    }
                }

                if (userStats.counts && typeof userStats.counts === 'object') {
                    for (const cat of Object.keys(badges)) {
                        if (typeof userStats.counts[cat] === 'number' && Number.isFinite(userStats.counts[cat])) {
                            badges[cat] += userStats.counts[cat];
                        }
                    }
                }
            }
        }
    }

    // Nếu có cache trong IndexedDB của ván ngoài danh sách loadedGames (hoặc khi loadedGames chưa tải)
    if (games.length === 0) {
        for (const item of cacheByUrl.values()) {
            if (!item || !item.stats || typeof item.stats !== 'object') continue;
            // Chỉ cộng dồn thống kê nước đi & độ chính xác của người chơi khi xác định được userColor
            const targetColor = item.userColor || item.stats.userColor;
            if (targetColor && (targetColor === 'w' || targetColor === 'b')) {
                const sideStats = item.stats[targetColor];
                if (sideStats && typeof sideStats === 'object') {
                    const { weightedSum, totalWeight } = getGameWeightedAccuracy(sideStats, item);
                    if (totalWeight > 0) {
                        userAnalyzedCount++;
                        userGlobalWeightedSum += weightedSum;
                        userGlobalTotalWeight += totalWeight;
                        if (targetColor === 'w') {
                            whiteAnalyzedCount++;
                            whiteGlobalWeightedSum += weightedSum;
                            whiteGlobalTotalWeight += totalWeight;
                        } else {
                            blackAnalyzedCount++;
                            blackGlobalWeightedSum += weightedSum;
                            blackGlobalTotalWeight += totalWeight;
                        }
                    }
                    if (sideStats.counts && typeof sideStats.counts === 'object') {
                        for (const cat of Object.keys(badges)) {
                            if (typeof sideStats.counts[cat] === 'number' && Number.isFinite(sideStats.counts[cat])) {
                                badges[cat] += sideStats.counts[cat];
                            }
                        }
                    }
                }
            }
        }
    }

    // Global Weighted Mean: Tính trung bình chung có trọng số, triệt tiêu Simpson's Paradox
    const avgAccuracy = (userGlobalTotalWeight > 0 && Number.isFinite(userGlobalWeightedSum / userGlobalTotalWeight))
        ? Number((userGlobalWeightedSum / userGlobalTotalWeight).toFixed(1))
        : null;
    const whiteAccuracy = (whiteGlobalTotalWeight > 0 && Number.isFinite(whiteGlobalWeightedSum / whiteGlobalTotalWeight))
        ? Number((whiteGlobalWeightedSum / whiteGlobalTotalWeight).toFixed(1))
        : null;
    const blackAccuracy = (blackGlobalTotalWeight > 0 && Number.isFinite(blackGlobalWeightedSum / blackGlobalTotalWeight))
        ? Number((blackGlobalWeightedSum / blackGlobalTotalWeight).toFixed(1))
        : null;

    // 3. Khai cuộc phổ biến nhất (Top 5)
    const favoriteOpenings = Array.from(openingsMap.values())
        .filter(op => op && typeof op === 'object' && (op.count || 0) > 0)
        .sort((a, b) => (b.count || 0) - (a.count || 0) || (b.wins || 0) - (a.wins || 0))
        .slice(0, 5)
        .map(op => {
            const count = op.count || 0;
            const opWins = op.wins || 0;
            const rawRate = count > 0 ? (opWins / count) * 100 : 0;
            const winRate = Number.isFinite(rawRate) ? Math.round(rawRate) : 0;
            return {
                ...op,
                count,
                wins: opWins,
                draws: op.draws || 0,
                losses: op.losses || 0,
                winRate
            };
        });

    return {
        username: rawUser,
        totalGames,
        wins,
        draws,
        losses,
        winPct,
        drawPct,
        lossPct,
        analyzedCount: userAnalyzedCount,
        avgAccuracy,
        whiteAccuracy,
        blackAccuracy,
        weightedSum: Number(userGlobalWeightedSum.toFixed(2)),
        totalWeight: Number(userGlobalTotalWeight.toFixed(2)),
        badges,
        favoriteOpenings
    };
}

/**
 * Hiển thị dữ liệu lên giao diện Modal Lifetime Stats
 * @param {Object} stats - Dữ liệu trả về từ calculateLifetimeStats
 * @param {string} [lang] - 'vi' hoặc 'en'
 */
function renderLifetimeStatsModal(stats, lang = (typeof currentLang !== 'undefined' ? currentLang : 'vi')) {
    if (typeof document === 'undefined') return;

    const translate = (key, ...args) => {
        if (typeof t === 'function') return t(key, ...args);
        return key;
    };

    // User Avatar & Username
    const avatarEl = document.getElementById('stats-user-avatar');
    const usernameEl = document.getElementById('stats-username');
    if (avatarEl && stats.username) {
        avatarEl.textContent = stats.username.charAt(0).toUpperCase();
    }
    if (usernameEl && stats.username) {
        usernameEl.textContent = stats.username;
    }

    // Card 1: Tổng quan ván đấu & Bar W/L/D
    const totalGamesEl = document.getElementById('stats-total-games-count');
    if (totalGamesEl) {
        const gamesUnit = lang === 'en' ? 'games' : 'ván';
        totalGamesEl.textContent = `${stats.totalGames} ${gamesUnit}`;
    }

    const barWin = document.getElementById('wld-win-bar');
    const barDraw = document.getElementById('wld-draw-bar');
    const barLoss = document.getElementById('wld-loss-bar');

    if (barWin) {
        barWin.style.width = `${stats.winPct}%`;
        barWin.title = `${translate('stats_win')}: ${stats.wins} (${stats.winPct}%)`;
    }
    if (barDraw) {
        barDraw.style.width = `${stats.drawPct}%`;
        barDraw.title = `${translate('stats_draw')}: ${stats.draws} (${stats.drawPct}%)`;
    }
    if (barLoss) {
        barLoss.style.width = `${stats.lossPct}%`;
        barLoss.title = `${translate('stats_loss')}: ${stats.losses} (${stats.lossPct}%)`;
    }

    const winsCountEl = document.getElementById('stats-wins-count');
    const winsPctEl = document.getElementById('stats-wins-pct');
    const drawsCountEl = document.getElementById('stats-draws-count');
    const drawsPctEl = document.getElementById('stats-draws-pct');
    const lossesCountEl = document.getElementById('stats-losses-count');
    const lossesPctEl = document.getElementById('stats-losses-pct');

    if (winsCountEl) winsCountEl.textContent = String(stats.wins);
    if (winsPctEl) winsPctEl.textContent = `(${stats.winPct}%)`;
    if (drawsCountEl) drawsCountEl.textContent = String(stats.draws);
    if (drawsPctEl) drawsPctEl.textContent = `(${stats.drawPct}%)`;
    if (lossesCountEl) lossesCountEl.textContent = String(stats.losses);
    if (lossesPctEl) lossesPctEl.textContent = `(${stats.lossPct}%)`;

    // Card 2: Độ chính xác trung bình
    const avgAccEl = document.getElementById('stats-avg-accuracy');
    const circleProgress = document.getElementById('stats-accuracy-circle');
    const analyzedTextEl = document.getElementById('stats-analyzed-games-text');
    const whiteAccEl = document.getElementById('stats-white-accuracy');
    const blackAccEl = document.getElementById('stats-black-accuracy');

    const circumference = 326.72; // 2 * PI * 52

    if (stats.avgAccuracy !== null) {
        if (avgAccEl) avgAccEl.textContent = `${stats.avgAccuracy}%`;
        if (circleProgress) {
            const offset = circumference * (1 - Math.min(100, Math.max(0, stats.avgAccuracy)) / 100);
            circleProgress.style.strokeDashoffset = String(offset);
        }
    } else {
        if (avgAccEl) avgAccEl.textContent = '--%';
        if (circleProgress) circleProgress.style.strokeDashoffset = String(circumference);
    }

    if (analyzedTextEl) {
        if (stats.analyzedCount > 0) {
            analyzedTextEl.textContent = translate('stats_based_on_games', stats.analyzedCount);
        } else {
            analyzedTextEl.textContent = translate('stats_no_analysis_yet');
        }
    }

    if (whiteAccEl) {
        if (stats.whiteAccuracy !== null) {
            whiteAccEl.textContent = translate('stats_white_accuracy', stats.whiteAccuracy);
            whiteAccEl.style.display = '';
        } else {
            whiteAccEl.style.display = 'none';
        }
    }

    if (blackAccEl) {
        if (stats.blackAccuracy !== null) {
            blackAccEl.textContent = translate('stats_black_accuracy', stats.blackAccuracy);
            blackAccEl.style.display = '';
        } else {
            blackAccEl.style.display = 'none';
        }
    }

    // Card 3: Huy hiệu nước đi tích lũy (10 hạng mục)
    const badgesGrid = document.getElementById('stats-badges-grid');
    if (badgesGrid) {
        const categoriesOrder = [
            'Brilliant', 'Great', 'Book', 'Best', 'Excellent',
            'Good', 'Inaccuracy', 'Mistake', 'Miss', 'Blunder'
        ];

        const colorsMap = (typeof CATEGORY_ARROW_COLORS !== 'undefined') ? CATEGORY_ARROW_COLORS : {};

        let badgesHtml = '';
        for (const cat of categoriesOrder) {
            const count = stats.badges[cat] || 0;
            const color = colorsMap[cat] || '#81b64c';
            const cssCls = cat.toLowerCase();

            let catLabel = cat;
            if (typeof getCategoryName === 'function') {
                catLabel = getCategoryName(cat, lang);
            } else if (typeof MOVE_CATEGORIES !== 'undefined' && MOVE_CATEGORIES[cat]) {
                catLabel = lang === 'en' ? MOVE_CATEGORIES[cat].enName : MOVE_CATEGORIES[cat].viName;
            }

            const badgeSvg = typeof badgeHTML === 'function'
                ? badgeHTML(cat, 22, `move-class-badge badge-${cssCls}`)
                : `<span class="move-class-badge badge-${cssCls}">★</span>`;

            badgesHtml += `
                <div class="stats-badge-item" title="${escapeHTML(catLabel)}">
                    <div class="badge-item-left">
                        ${badgeSvg}
                        <span class="badge-item-name">${escapeHTML(catLabel)}</span>
                    </div>
                    <span class="badge-item-count" style="color: ${color};">${count}</span>
                </div>
            `;
        }
        badgesGrid.innerHTML = badgesHtml;
    }

    // Card 4: Khai cuộc chơi nhiều nhất
    const openingsList = document.getElementById('stats-openings-list');
    if (openingsList) {
        if (!stats.favoriteOpenings || stats.favoriteOpenings.length === 0) {
            openingsList.innerHTML = `<p class="empty-text">${translate('stats_no_games')}</p>`;
        } else {
            let opsHtml = '';
            const gamesWord = lang === 'en' ? 'games' : 'ván';
            const winWord = translate('stats_win');

            for (const op of stats.favoriteOpenings) {
                const winRateCls = op.winRate >= 50 ? 'high-win' : 'normal-win';
                opsHtml += `
                    <div class="stats-opening-row">
                        <div class="opening-row-info">
                            <div class="opening-title-line">
                                <span class="opening-name" title="${escapeHTML(op.name)}">${escapeHTML(op.name)}</span>
                                <span class="opening-games-badge">${op.count} ${gamesWord}</span>
                            </div>
                            <div class="opening-winrate-bar-wrap">
                                <div class="opening-winrate-bar" style="width: ${op.winRate}%;"></div>
                            </div>
                        </div>
                        <div class="opening-winrate-badge ${winRateCls}">
                            ${op.winRate}% ${winWord}
                        </div>
                    </div>
                `;
            }
            openingsList.innerHTML = opsHtml;
        }
    }
}

/**
 * Mở Modal Lifetime Stats và cập nhật dữ liệu mới nhất
 */
async function openLifetimeStatsModal() {
    const modal = document.getElementById('lifetime-stats-modal');
    if (!modal) return;

    modal.classList.remove('hidden');

    // Lấy cache từ IndexedDB
    let cachedAnalyses = [];
    if (typeof getAllCachedAnalyses === 'function') {
        try {
            cachedAnalyses = await getAllCachedAnalyses();
        } catch (e) {
            console.warn('Lỗi lấy cache cho Lifetime Stats:', e);
        }
    }

    const currentGames = (typeof window !== 'undefined' && typeof window.getLoadedGames === 'function')
        ? window.getLoadedGames()
        : (typeof loadedGames !== 'undefined' ? loadedGames : []);

    const lang = typeof currentLang !== 'undefined' ? currentLang : 'vi';
    const username = (typeof getAppUsername === 'function') ? getAppUsername() : ((typeof CHESSCOM_USERNAME !== 'undefined') ? CHESSCOM_USERNAME : '');

    const stats = calculateLifetimeStats({
        loadedGames: currentGames,
        cachedAnalyses: cachedAnalyses,
        username: username,
        lang: lang
    });

    renderLifetimeStatsModal(stats, lang);
}

/**
 * Đóng Modal Lifetime Stats
 */
function closeLifetimeStatsModal() {
    const modal = document.getElementById('lifetime-stats-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

/**
 * Khởi tạo các sự kiện giao diện cho Lifetime Stats
 */
function initLifetimeStatsUI() {
    if (typeof document === 'undefined') return;

    const btnOpen = document.getElementById('btn-lifetime-stats');
    if (btnOpen) {
        btnOpen.addEventListener('click', openLifetimeStatsModal);
    }

    const btnDrawerOpen = document.getElementById('btn-drawer-lifetime-stats');
    if (btnDrawerOpen) {
        btnDrawerOpen.addEventListener('click', openLifetimeStatsModal);
    }

    const btnClose = document.getElementById('btn-close-stats-modal');
    if (btnClose) {
        btnClose.addEventListener('click', closeLifetimeStatsModal);
    }

    const modal = document.getElementById('lifetime-stats-modal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeLifetimeStatsModal();
            }
        });
    }

    if (!document._lifetimeStatsKeydownBound) {
        document._lifetimeStatsKeydownBound = true;
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const currentModal = document.getElementById('lifetime-stats-modal');
                if (currentModal && !currentModal.classList.contains('hidden')) {
                    closeLifetimeStatsModal();
                }
            }
        });
    }
}

/**
 * Tái tạo thế cờ và nước đi từ chuỗi PGN
 * @param {string} pgn 
 * @returns {Array<object>}
 */
function reconstructPositionsFromPgn(pgn) {
    if (!pgn || typeof pgn !== 'string') return [];
    if (typeof window !== 'undefined' && typeof window.buildPositionsFromPGN === 'function') {
        try { return window.buildPositionsFromPGN(pgn); } catch (e) { }
    }
    const ChessLib = (typeof Chess !== 'undefined') ? Chess : (typeof require !== 'undefined' ? (require('./chess.js').Chess || require('./chess.js')) : null);
    if (!ChessLib) return [];
    try {
        const chess = new ChessLib();
        if (!chess.load_pgn(pgn, { sloppy: true })) return [];
        const historyMoves = chess.history({ verbose: true });
        chess.reset();
        const positions = [{ index: 0, fen: chess.fen(), turn: chess.turn(), move: null }];
        for (let i = 0; i < historyMoves.length; i++) {
            const m = historyMoves[i];
            chess.move(m);
            positions.push({
                index: i + 1,
                fen: chess.fen(),
                turn: chess.turn(),
                move: { san: m.san, from: m.from, to: m.to, color: m.color, piece: m.piece }
            });
        }
        return positions;
    } catch (e) {
        return [];
    }
}

/**
 * Trích xuất danh sách câu đố chiến thuật cá nhân từ IndexedDB cache
 * Dựa trên các nước đi Blunder hoặc Miss trong lịch sử đấu của người dùng
 * @param {Array} [loadedGamesList] Danh sách loadedGames truyền vào (tùy chọn)
 * @returns {Promise<Array<object>>} Danh sách câu đố cá nhân
 */
async function extractPersonalPuzzles(loadedGamesList = null) {
    let analyses = [];
    if (typeof getAllCachedAnalyses === 'function') {
        try {
            analyses = await getAllCachedAnalyses();
        } catch (e) {
            console.warn('Lỗi đọc cache cho Personal Puzzles:', e);
        }
    } else if (typeof window !== 'undefined' && typeof window.getAllCachedAnalyses === 'function') {
        try {
            analyses = await window.getAllCachedAnalyses();
        } catch (e) { }
    }

    const games = Array.isArray(loadedGamesList)
        ? loadedGamesList
        : (typeof loadedGames !== 'undefined' && Array.isArray(loadedGames)
            ? loadedGames
            : (typeof window !== 'undefined' && typeof window.getLoadedGames === 'function' ? window.getLoadedGames() : []));

    const puzzles = [];
    const seenFens = new Set();

    for (let recordIdx = 0; recordIdx < analyses.length; recordIdx++) {
        const record = analyses[recordIdx];
        if (recordIdx > 0 && recordIdx % 8 === 0) {
            await new Promise(r => setTimeout(r, 0));
        }
        if (!record || !record.positions || !Array.isArray(record.positions)) continue;

        const matchedGame = games.find(g => g.url === record.gameUrl) || null;

        // Xác định màu quân của người dùng
        let userColor = record.userColor || (record.stats && record.stats.userColor) || null;
        if (!userColor && matchedGame) {
            userColor = (typeof getCurrentUserColor === 'function')
                ? getCurrentUserColor(matchedGame)
                : (typeof window !== 'undefined' && typeof window.getCurrentUserColor === 'function'
                    ? window.getCurrentUserColor(matchedGame)
                    : (matchedGame.userColor || 'w'));
        }
        if (!userColor) userColor = 'w';

        // Lấy tên đối thủ
        let opponentName = 'Stockfish';
        let gameDate = '';
        if (matchedGame) {
            opponentName = matchedGame.opponentUsername
                || (userColor === 'w' ? (matchedGame.black?.username || 'Black') : (matchedGame.white?.username || 'White'));
            gameDate = matchedGame.dateStr || '';
        } else if (record.stats && record.stats.opponentUsername) {
            opponentName = record.stats.opponentUsername;
        }

        // Tái tạo thế cờ nếu bản ghi cũ chỉ có eval/classification mà thiếu fen
        let fullPositions = record.positions;
        if ((!fullPositions[0] || !fullPositions[0].fen) && matchedGame && matchedGame.pgn) {
            const reconstructed = reconstructPositionsFromPgn(matchedGame.pgn);
            if (reconstructed.length > 0) {
                fullPositions = reconstructed.map(p => {
                    const cachedPos = record.positions[p.index];
                    return {
                        ...p,
                        eval: cachedPos?.eval || p.eval,
                        classification: cachedPos?.classification || p.classification
                    };
                });
            }
        }

        // Quét từng nước đi để tìm Blunder / Miss
        for (let i = 1; i < fullPositions.length; i++) {
            const currPos = fullPositions[i];
            const prevPos = fullPositions[i - 1];

            if (!currPos || !prevPos || !prevPos.fen || !currPos.move) continue;

            // Nước đi này phải do người dùng đi
            const moveColor = currPos.move.color || prevPos.turn;
            if (moveColor !== userColor) continue;

            const cls = currPos.classification;
            if (!cls) continue;

            const isBlunderOrMiss = (cls.category === 'Blunder' || cls.category === 'Miss' || (cls.winLoss !== undefined && cls.winLoss >= 18));
            if (!isBlunderOrMiss) continue;

            // Thế cờ trước đó phải có bestmove hợp lệ
            const bestMoveUci = prevPos.eval && prevPos.eval.bestmove;
            if (!bestMoveUci || bestMoveUci === '(none)' || bestMoveUci.length < 4) continue;

            // Loại bỏ trùng lặp theo FEN
            if (seenFens.has(prevPos.fen)) continue;
            seenFens.add(prevPos.fen);

            const userBlunderUci = (currPos.move.from && currPos.move.to)
                ? (currPos.move.from + currPos.move.to + (currPos.move.promotion || ''))
                : null;

            puzzles.push({
                id: `puzzle_${record.gameUrl || 'game'}_${i}`,
                fen: prevPos.fen,
                turn: prevPos.turn || userColor,
                bestMoveUci: bestMoveUci,
                pv: (prevPos.eval.pv && prevPos.eval.pv.length > 0) ? prevPos.eval.pv : [bestMoveUci],
                userBlunderSan: currPos.move.san || '?',
                userBlunderUci: userBlunderUci,
                opponentName: opponentName,
                gameUrl: record.gameUrl || '',
                gameDate: gameDate,
                category: cls.category || 'Blunder',
                winLoss: cls.winLoss || 0,
                moveNumber: Math.ceil(i / 2)
            });
        }
    }

    return puzzles;
}

// Khởi tạo khi DOM sẵn sàng
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLifetimeStatsUI);
    } else {
        initLifetimeStatsUI();
    }
}

// Xuất cho môi trường trình duyệt
if (typeof window !== 'undefined') {
    window.extractOpeningNameFromPGN = extractOpeningNameFromPGN;
    window.getGameWeightedAccuracy = getGameWeightedAccuracy;
    window.calculateLifetimeStats = calculateLifetimeStats;
    window.renderLifetimeStatsModal = renderLifetimeStatsModal;
    window.openLifetimeStatsModal = openLifetimeStatsModal;
    window.closeLifetimeStatsModal = closeLifetimeStatsModal;
    window.initLifetimeStatsUI = initLifetimeStatsUI;
    window.extractPersonalPuzzles = extractPersonalPuzzles;
}

// Xuất cho môi trường Node.js testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        extractOpeningNameFromPGN,
        getGameWeightedAccuracy,
        calculateLifetimeStats,
        renderLifetimeStatsModal,
        openLifetimeStatsModal,
        closeLifetimeStatsModal,
        initLifetimeStatsUI,
        extractPersonalPuzzles
    };
}

