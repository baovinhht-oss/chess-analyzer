/**
 * FILE: cache.js
 * Chức năng:
 * - Quản lý bộ nhớ đệm (Cache) kết quả phân tích ván cờ với IndexedDB.
 * - Khóa dữ liệu theo URL ván cờ (gameUrl) và độ sâu Stockfish (depth).
 * - Đã sửa lỗi mất dữ liệu do sai tên biến và lỗi giao dịch (Transaction Commit).
 */

const CACHE_DB_NAME = 'ChessReviewCacheDB';
const CACHE_DB_VERSION = 2; // Tăng version lên 2 để ép trình duyệt dọn sạch cache bị lỗi cũ
const CACHE_STORE_NAME = 'game_analysis';

// Singleton Pattern: Tái sử dụng kết nối IndexedDB, chống memory leak khi chạy Batch Analysis liên tục
let dbPromise = null;

/**
 * Mở hoặc khởi tạo cơ sở dữ liệu IndexedDB (Singleton Pattern)
 */
function openCacheDB() {
    if (dbPromise) return dbPromise;

    dbPromise = new Promise((resolve, reject) => {
        if (typeof window === 'undefined' || !window.indexedDB) {
            dbPromise = null;
            return reject(new Error('Trình duyệt không hỗ trợ IndexedDB'));
        }

        const request = window.indexedDB.open(CACHE_DB_NAME, CACHE_DB_VERSION);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            let store;
            // Bảo tồn dữ liệu: Chỉ tạo mới store nếu chưa tồn tại, tránh xóa sạch cache khi nâng cấp phiên bản
            if (!db.objectStoreNames.contains(CACHE_STORE_NAME)) {
                store = db.createObjectStore(CACHE_STORE_NAME, { keyPath: 'id' });
            } else {
                store = event.target.transaction.objectStore(CACHE_STORE_NAME);
            }
            if (store && !store.indexNames.contains('gameUrl')) {
                store.createIndex('gameUrl', 'gameUrl', { unique: false });
            }
            if (store && !store.indexNames.contains('depth')) {
                store.createIndex('depth', 'depth', { unique: false });
            }
        };

        request.onsuccess = () => {
            const db = request.result;
            db.onclose = () => { dbPromise = null; };
            db.onversionchange = () => { db.close(); dbPromise = null; };
            resolve(db);
        };
        request.onerror = () => {
            dbPromise = null;
            reject(request.error);
        };
    });

    return dbPromise;
}

function makeCacheKey(gameUrl, depth) {
    return `${gameUrl}#depth_${depth}`;
}

/**
 * Kiểm tra tính hợp lệ và toàn vẹn của dữ liệu phân tích trước khi lưu vào IndexedDB
 * @param {string} gameUrl
 * @param {number} depth
 * @param {Array} positions
 * @param {Object} stats
 * @returns {{ valid: boolean, error?: string }}
 */
function validateAnalysisData(gameUrl, depth, positions, stats) {
    if (!gameUrl || typeof gameUrl !== 'string' || !gameUrl.trim()) {
        return { valid: false, error: 'gameUrl không hợp lệ hoặc bị rỗng' };
    }
    const numDepth = Number(depth);
    if (!Number.isInteger(numDepth) || numDepth <= 0 || numDepth > 100) {
        return { valid: false, error: 'Độ sâu depth không hợp lệ' };
    }
    if (!Array.isArray(positions) || positions.length === 0) {
        return { valid: false, error: 'Danh sách positions không phải là mảng hoặc bị rỗng' };
    }
    if (!positions[0] || typeof positions[0].fen !== 'string' || !positions[0].fen.includes('/')) {
        return { valid: false, error: 'Thế cờ đầu tiên thiếu chuỗi FEN hợp lệ' };
    }
    return { valid: true };
}

/**
 * Kiểm tra tính toàn vẹn của một bản ghi phân tích lấy từ IndexedDB
 * @param {Object} record
 * @returns {boolean}
 */
function validateCachedRecord(record) {
    if (!record || typeof record !== 'object') return false;
    if (!record.id || !record.gameUrl || !record.depth) return false;
    if (!Array.isArray(record.positions) || record.positions.length === 0) return false;
    if (!record.positions[0] || typeof record.positions[0].fen !== 'string') return false;
    return true;
}

/**
 * Lấy dữ liệu phân tích đã lưu từ IndexedDB
 */
async function getGameAnalysisCache(gameUrl, depth) {
    try {
        const db = await openCacheDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(CACHE_STORE_NAME, 'readonly');
            const store = tx.objectStore(CACHE_STORE_NAME);
            const key = makeCacheKey(gameUrl, depth);
            const request = store.get(key);

            request.onsuccess = () => {
                const res = request.result;
                if (res && !validateCachedRecord(res)) {
                    console.warn('⚠️ Bản ghi cache bị lỗi cấu trúc dữ liệu, bỏ qua:', key);
                    resolve(null);
                    return;
                }
                resolve(res || null);
            };
            request.onerror = () => reject(request.error);
        });
    } catch (err) {
        console.warn('⚠️ Lỗi đọc cache từ IndexedDB:', err);
        return null;
    }
}

/**
 * Lưu kết quả phân tích ván cờ vào IndexedDB
 */
async function saveGameAnalysisCache(gameUrl, depth, positions, stats, userColor = null) {
    const val = validateAnalysisData(gameUrl, depth, positions, stats);
    if (!val.valid) {
        console.warn('⚠️ Bỏ qua lưu cache vì dữ liệu không hợp lệ:', val.error);
        return;
    }

    try {
        const db = await openCacheDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(CACHE_STORE_NAME, 'readwrite');
            const store = tx.objectStore(CACHE_STORE_NAME);
            const key = makeCacheKey(gameUrl, depth);

            // Clone dữ liệu bằng Spread Operator để đảm bảo lấy ĐÚNG TÊN TẤT CẢ BIẾN từ classify.js và engine.js
            const cleanPositions = positions.map(pos => ({
                index: pos.index,
                fen: pos.fen || null,
                turn: pos.turn || (pos.fen ? (pos.fen.split(' ')[1] || 'w') : null),
                move: pos.move ? {
                    san: pos.move.san,
                    from: pos.move.from,
                    to: pos.move.to,
                    color: pos.move.color,
                    piece: pos.move.piece
                } : null,
                eval: pos.eval ? { ...pos.eval } : null,
                classification: pos.classification ? { ...pos.classification } : null
            }));

            const record = {
                id: key,
                gameUrl: gameUrl,
                depth: depth,
                userColor: userColor || (stats && stats.userColor) || null,
                analyzedAt: new Date().toISOString(),
                positions: cleanPositions,
                stats: stats
            };

            store.put(record);

            // QUAN TRỌNG: Dùng tx.oncomplete để đảm bảo dữ liệu THỰC SỰ ĐÃ GHI XUỐNG Ổ CỨNG
            tx.oncomplete = () => resolve();
            tx.onerror = () => reject(tx.error);
        });
    } catch (err) {
        console.error('❌ Không thể lưu cache vào IndexedDB:', err);
    }
}

/**
 * Xóa cache phân tích của một ván cụ thể (Nút "Phân tích lại")
 */
async function deleteGameAnalysisCache(gameUrl, depth) {
    try {
        const db = await openCacheDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(CACHE_STORE_NAME, 'readwrite');
            const store = tx.objectStore(CACHE_STORE_NAME);
            const key = makeCacheKey(gameUrl, depth);

            store.delete(key);

            tx.oncomplete = () => resolve();
            tx.onerror = () => reject(tx.error);
        });
    } catch (err) {
        console.error('❌ Không thể xóa cache ván cờ:', err);
    }
}

/**
 * Xóa toàn bộ dữ liệu phân tích (Nút "Xóa toàn bộ bộ nhớ")
 */
async function clearAllAnalysisCache() {
    try {
        const db = await openCacheDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(CACHE_STORE_NAME, 'readwrite');
            const store = tx.objectStore(CACHE_STORE_NAME);

            store.clear();

            tx.oncomplete = () => resolve();
            tx.onerror = () => reject(tx.error);
        });
    } catch (err) {
        console.error('❌ Không thể xóa toàn bộ cache:', err);
    }
}

/**
 * Lấy tập hợp (Set) các URL ván cờ đã có kết quả phân tích trong cache để hiển thị thẻ "Đã phân tích"
 */
async function getAllCachedGameUrls(depth = null) {
    try {
        const db = await openCacheDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(CACHE_STORE_NAME, 'readonly');
            const store = tx.objectStore(CACHE_STORE_NAME);
            const request = store.getAll();

            request.onsuccess = () => {
                const results = request.result || [];
                const urlSet = new Set();
                results.forEach(item => {
                    if (depth === null || item.depth === depth) {
                        urlSet.add(item.gameUrl);
                    }
                });
                resolve(urlSet);
            };
            request.onerror = () => reject(request.error);
        });
    } catch (err) {
        console.warn('⚠️ Lỗi lấy danh sách URL cache:', err);
        return new Set();
    }
}

/**
 * Lấy toàn bộ các bản ghi phân tích đã lưu trong cache (cho tính năng Lifetime Stats)
 */
async function getAllCachedAnalyses() {
    try {
        const db = await openCacheDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(CACHE_STORE_NAME, 'readonly');
            const store = tx.objectStore(CACHE_STORE_NAME);
            const request = store.getAll();
            request.onsuccess = () => {
                const list = request.result || [];
                const validList = list.filter(validateCachedRecord);
                resolve(validList);
            };
            request.onerror = () => reject(request.error);
        });
    } catch (err) {
        console.warn('⚠️ Lỗi đọc toàn bộ cache phân tích:', err);
        return [];
    }
}

if (typeof window !== 'undefined') {
    window.validateAnalysisData = validateAnalysisData;
    window.validateCachedRecord = validateCachedRecord;
    window.getAllCachedAnalyses = getAllCachedAnalyses;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        CACHE_DB_NAME,
        CACHE_DB_VERSION,
        CACHE_STORE_NAME,
        makeCacheKey,
        openCacheDB,
        validateAnalysisData,
        validateCachedRecord,
        getGameAnalysisCache,
        saveGameAnalysisCache,
        deleteGameAnalysisCache,
        clearAllAnalysisCache,
        getAllCachedGameUrls,
        getAllCachedAnalyses
    };
}
