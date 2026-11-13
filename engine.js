/**
 * FILE: engine.js
 * ĐẠI NHẤT THỐNG ENGINE: Hợp nhất Phân tích & Đi thử vào 1 hàm duy nhất.
 * ĐÃ FIX LỖI "MỖI LẦN PHÂN TÍCH RA 1 KẾT QUẢ KHÁC NHAU":
 * - Ép chạy 1 luồng (Threads = 1) để kết quả Deterministic (Cố định).
 * - Clear Hash (Xóa bộ nhớ) trước mỗi lần tính toán.
 */

const STOCKFISH_LOCAL_URL = 'stockfish.js';
const STOCKFISH_FALLBACK_URL = 'stockfish-fallback.js';

class StockfishEngine {
    constructor() {
        this.worker = null;
        this.isReady = false;
        this.initPromise = null;
        this.activeSearchId = 0;
        this.currentCallback = null;
        this.currentReject = null;
        this.isSearchActive = false;
        this.awaitingBestmove = false;
        this.mutexChain = Promise.resolve();
        this.engineName = 'Stockfish';
    }

    async init() {
        if (this.worker && this.isReady) return;
        if (this.initPromise) return this.initPromise;

        this.initPromise = new Promise((resolve, reject) => {
            let fallbackAttempted = false;

            const setupWorker = (w, allowFallback = true) => {
                this.worker = w;

                this.worker.onmessage = (event) => {
                    const line = typeof event.data === 'string' ? event.data.trim() : '';
                    if (!line) return;

                    if (line.startsWith('id name ')) {
                        this.engineName = line.replace('id name ', '').trim();
                    }

                    if (line.startsWith('bestmove ')) {
                        this.awaitingBestmove = false;
                    }

                    if (line === 'uciok') {
                        this.isReady = true;
                        try {
                            this.worker.postMessage('setoption name Hash value 128');
                            this.worker.postMessage('setoption name Threads value 1');
                        } catch (optErr) { }

                        console.log(`♟️ [Stockfish Ổn Định] Khởi động: ${this.engineName} (Hash: 128MB, Threads: 1)`);
                        resolve();
                    }

                    if (this.currentCallback) this.currentCallback(line);
                };

                this.worker.onerror = async (err) => {
                    if (!this.isReady && allowFallback && !fallbackAttempted) {
                        fallbackAttempted = true;
                        try {
                            if (this.worker) { try { this.worker.terminate(); } catch (e) { } this.worker = null; }
                            const res = await fetch(STOCKFISH_FALLBACK_URL);
                            if (!res.ok) throw new Error('HTTP ' + res.status);
                            const scriptText = await res.text();
                            const blob = new Blob([scriptText], { type: 'application/javascript' });
                            const fallbackWorker = new Worker(URL.createObjectURL(blob));
                            setupWorker(fallbackWorker, false);
                            return;
                        } catch (fallbackErr) { }
                    }
                    if (this.worker) { try { this.worker.terminate(); } catch (e) { } this.worker = null; }
                    this.isReady = false;
                    reject(new Error('Stockfish Web Worker gặp sự cố.'));
                };

                this.worker.postMessage('uci');
            };

            try {
                setupWorker(new Worker(STOCKFISH_LOCAL_URL), true);
            } catch (directErr) {
                (async () => {
                    try {
                        const res = await fetch(STOCKFISH_FALLBACK_URL);
                        const scriptText = await res.text();
                        const blob = new Blob([scriptText], { type: 'application/javascript' });
                        setupWorker(new Worker(URL.createObjectURL(blob)), false);
                    } catch (blobErr) {
                        reject(new Error('Trình duyệt không thể khởi tạo Web Worker.'));
                    }
                })();
            }
        }).finally(() => {
            this.initPromise = null;
        });

        return this.initPromise;
    }

    /**
     * Serializes all search operations through a strict FIFO mutex queue
     * so concurrent callers can never overwrite each other's callbacks or deadlocks.
     */
    _enqueue(taskFn) {
        const run = this.mutexChain.then(taskFn, taskFn);
        this.mutexChain = run.catch(() => { });
        return run;
    }

    async ensureIdle() {
        if (!this.worker || !this.isReady) return;
        this.isSearchActive = false;
        this.activeSearchId++;

        if (this.currentReject) {
            const rej = this.currentReject;
            this.currentReject = null;
            try { rej(new Error('ENGINE_STOPPED')); } catch (e) { }
        }

        return new Promise((resolve) => {
            let timeout = null;
            let gotReadyok = false;

            const cleanup = () => {
                if (timeout) {
                    clearTimeout(timeout);
                    timeout = null;
                }
                if (this.currentCallback === handleIdleLine) {
                    this.currentCallback = null;
                }
            };

            const checkDone = () => {
                if (!this.awaitingBestmove && gotReadyok) {
                    cleanup();
                    resolve();
                }
            };

            const handleIdleLine = (line) => {
                if (line === 'readyok') {
                    gotReadyok = true;
                }
                checkDone();
            };

            this.currentCallback = handleIdleLine;
            this.worker.postMessage('stop');
            this.worker.postMessage('isready');

            // Safety fallback if worker drops a bestmove in extreme edge cases
            timeout = setTimeout(() => {
                this.awaitingBestmove = false;
                cleanup();
                resolve();
            }, 1200);
        });
    }

    async resetNewGame() {
        if (!this.worker || !this.isReady) await this.init();
        return this._enqueue(async () => {
            await this.ensureIdle();
            this.worker.postMessage('ucinewgame');
            this.worker.postMessage('setoption name Clear Hash value true');
            await new Promise((resolve) => {
                const timer = setTimeout(() => {
                    if (this.currentCallback === onReady) this.currentCallback = null;
                    resolve();
                }, 1000);
                const onReady = (line) => {
                    if (line === 'readyok') {
                        clearTimeout(timer);
                        this.currentCallback = null;
                        resolve();
                    }
                };
                this.currentCallback = onReady;
                this.worker.postMessage('isready');
            });
        });
    }

    async evaluatePosition(fen, depth = 16, onProgress = null, clearHash = false, moveTime = 0) {
        if (!this.worker || !this.isReady) await this.init();

        const actualDepth = depth ? Math.max(1, depth) : 16;
        const chess = new Chess(fen);
        const turn = chess.turn();

        if (chess.in_checkmate()) {
            const rawRes = { depth: 0, cp: null, mate: 0, bestmove: null, pv: [], turn: turn, isGameOver: true, gameOverType: 'checkmate' };
            const whiteScore = toWhitePerspective(rawRes, turn);
            rawRes.cpWhite = whiteScore.cpWhite;
            rawRes.mateWhite = whiteScore.mateWhite;
            rawRes.matedColor = whiteScore.matedColor || turn;
            if (onProgress) onProgress({ ...rawRes });
            return Promise.resolve(rawRes);
        }

        if (chess.in_draw() || chess.in_stalemate() || chess.in_threefold_repetition() || chess.insufficient_material()) {
            const drawType = chess.in_stalemate() ? 'stalemate' : (chess.in_threefold_repetition() ? 'threefold' : (chess.insufficient_material() ? 'material' : 'draw'));
            const rawRes = { depth: 0, cp: 0, mate: null, bestmove: null, pv: [], turn: turn, isGameOver: true, gameOverType: drawType };
            const whiteScore = toWhitePerspective(rawRes, turn);
            rawRes.cpWhite = whiteScore.cpWhite;
            rawRes.mateWhite = whiteScore.mateWhite;
            if (onProgress) onProgress({ ...rawRes });
            return Promise.resolve(rawRes);
        }

        // Pre-cancel any running search immediately so queued older callers abort before mutex runs
        const ticketSearchId = ++this.activeSearchId;
        this.abortCurrentSearch();

        return this._enqueue(async () => {
            if (ticketSearchId !== this.activeSearchId) {
                throw new Error('ENGINE_INTERRUPTED');
            }
            await this.ensureIdle();

            return new Promise((resolve, reject) => {
                let lastCp = 0; let lastMate = null; let lastPv = []; let lastDepth = 0; let lastBestmove = null;
                const mySearchId = ++this.activeSearchId;

                this.currentReject = reject;
                this.worker.postMessage('setoption name MultiPV value 1');

                if (clearHash) {
                    this.worker.postMessage('setoption name Clear Hash value true');
                }

                this.currentCallback = (line) => {
                    if (mySearchId !== this.activeSearchId || !this.isSearchActive) return;

                    if (line.startsWith('info ') && line.includes(' score ')) {
                        const depthMatch = line.match(/depth (\d+)/);
                        if (depthMatch) lastDepth = parseInt(depthMatch[1], 10);

                        const cpMatch = line.match(/score\s+cp\s+(-?\d+)/);
                        const mateMatch = line.match(/score\s+mate\s+(-?\d+)/);

                        if (cpMatch) {
                            lastCp = parseInt(cpMatch[1], 10);
                            lastMate = null;
                        } else if (mateMatch) {
                            lastMate = parseInt(mateMatch[1], 10);
                            lastCp = null;
                        }

                        const pvMatch = line.match(/ pv (.+)$/);
                        if (pvMatch) {
                            lastPv = pvMatch[1].trim().split(/\s+/);
                            lastBestmove = lastPv[0] || null;
                        }

                        if (onProgress) {
                            const whiteScore = toWhitePerspective({ cp: lastCp, mate: lastMate, turn }, turn);
                            onProgress({
                                depth: lastDepth, cp: lastCp, mate: lastMate, bestmove: lastBestmove, pv: lastPv, turn: turn,
                                cpWhite: whiteScore.cpWhite, mateWhite: whiteScore.mateWhite, isGameOver: false
                            });
                        }
                    }

                    if (line.startsWith('bestmove ')) {
                        if (mySearchId !== this.activeSearchId || !this.isSearchActive) return;
                        this.isSearchActive = false;
                        const parts = line.split(/\s+/);
                        const bestmove = (parts[1] && parts[1] !== '(none)') ? parts[1] : (lastBestmove || null);

                        this.currentCallback = null;
                        this.currentReject = null;

                        const whiteScore = toWhitePerspective({ cp: lastCp, mate: lastMate, turn }, turn);
                        resolve({
                            depth: lastDepth || actualDepth, cp: lastCp, mate: lastMate, bestmove: bestmove, pv: lastPv, turn: turn,
                            cpWhite: whiteScore.cpWhite, mateWhite: whiteScore.mateWhite, isGameOver: false
                        });
                    }
                };

                this.worker.postMessage(`position fen ${fen}`);
                this.isSearchActive = true;
                this.awaitingBestmove = true;
                let goCmd = `go depth ${actualDepth}`;
                if (moveTime && moveTime > 0) {
                    goCmd += ` movetime ${moveTime}`;
                }
                this.worker.postMessage(goCmd);
            });
        });
    }

    clearHash() {
        if (this.worker && this.isReady) {
            this.worker.postMessage('setoption name Clear Hash value true');
        }
    }

    async evaluateMultiPV(fen, depth = 15, lines = 3, moveTime = 300) {
        if (!this.worker || !this.isReady) await this.init();
        const chess = new Chess(fen); const turn = chess.turn();
        if (chess.in_checkmate() || chess.in_draw() || chess.in_stalemate() || chess.in_threefold_repetition() || chess.insufficient_material()) return [];
        const legalMoves = chess.moves({ verbose: true });
        if (legalMoves.length === 0) return [];
        const actualLines = Math.min(lines, legalMoves.length);

        const ticketSearchId = ++this.activeSearchId;
        this.abortCurrentSearch();

        return this._enqueue(async () => {
            if (ticketSearchId !== this.activeSearchId) {
                throw new Error('ENGINE_INTERRUPTED');
            }
            await this.ensureIdle();

            return new Promise((resolve, reject) => {
                const pvMap = new Map();
                const mySearchId = ++this.activeSearchId;
                this.currentReject = (err) => { if (this.worker) this.worker.postMessage('setoption name MultiPV value 1'); reject(err); };

                this.worker.postMessage('setoption name Clear Hash value true');
                this.worker.postMessage(`setoption name MultiPV value ${actualLines}`);

                this.currentCallback = (line) => {
                    if (mySearchId !== this.activeSearchId || !this.isSearchActive) return;

                    if (line.startsWith('info ') && line.includes('multipv ') && line.includes(' score ')) {
                        const mpMatch = line.match(/\bmultipv\s+(\d+)/);
                        const cpMatch = line.match(/\bscore\s+cp\s+(-?\d+)/);
                        const mateMatch = line.match(/\bscore\s+mate\s+(-?\d+)/);
                        const pvMatch = line.match(/\bpv\s+(.+)$/);

                        if (mpMatch && pvMatch) {
                            const rank = parseInt(mpMatch[1], 10);
                            const pvArray = pvMatch[1].trim().split(/\s+/);
                            const uci = pvArray[0];
                            let cp = null; let mate = null;
                            if (cpMatch) cp = parseInt(cpMatch[1], 10);
                            else if (mateMatch) mate = parseInt(mateMatch[1], 10);
                            pvMap.set(rank, { rank, uci, cp, mate, pv: pvArray, turn });
                        }
                    }
                    if (line.startsWith('bestmove ')) {
                        if (mySearchId !== this.activeSearchId || !this.isSearchActive) return;
                        this.isSearchActive = false;
                        this.worker.postMessage('setoption name MultiPV value 1');
                        this.currentCallback = null; this.currentReject = null;
                        const results = [];
                        for (let r = 1; r <= actualLines; r++) if (pvMap.has(r)) results.push(pvMap.get(r));
                        if (results.length === 0) {
                            const parts = line.split(/\s+/);
                            const bestUci = parts[1];
                            if (bestUci && bestUci !== '(none)') results.push({ rank: 1, uci: bestUci, cp: 0, mate: null, pv: [bestUci], turn });
                        }
                        resolve(results);
                    }
                };
                this.worker.postMessage(`position fen ${fen}`);
                this.isSearchActive = true;
                this.awaitingBestmove = true;
                let goCmd = `go depth ${Math.max(12, depth)}`;
                if (moveTime && moveTime > 0) {
                    goCmd += ` movetime ${moveTime}`;
                }
                this.worker.postMessage(goCmd);
            });
        });
    }

    abortCurrentSearch() {
        this.isSearchActive = false;
        if (this.worker && this.isReady) {
            this.worker.postMessage('stop');
            if (this.currentReject) {
                const rejectFn = this.currentReject;
                this.currentReject = null;
                this.currentCallback = null;
                try { rejectFn(new Error('ENGINE_STOPPED')); } catch (e) { }
            }
        }
    }

    stop() {
        this.activeSearchId++;
        this.abortCurrentSearch();
        if (this.worker && this.isReady) {
            this.worker.postMessage('setoption name MultiPV value 1');
        }
    }
}

function toWhitePerspective(rawEval, turnOverride) {
    if (!rawEval) return { cpWhite: 0, mateWhite: null };
    const turn = turnOverride || rawEval.turn;
    const multiplier = (turn === 'w') ? 1 : -1;

    if (rawEval.mate === 0) {
        const winnerSign = (turn === 'w') ? -1 : 1;
        return { cpWhite: winnerSign * 10000, mateWhite: 0, matedColor: turn };
    }
    if (rawEval.mate !== null && rawEval.mate !== undefined) {
        const mateWhite = rawEval.mate * multiplier;
        const cpEquivalent = (mateWhite > 0 ? 10000 : -10000);
        return { cpWhite: cpEquivalent, mateWhite: mateWhite };
    }
    return { cpWhite: (rawEval.cp || 0) * multiplier, mateWhite: null };
}

const stockfishEngine = new StockfishEngine();

function uciToSan(fen, uci) {
    if (!fen || !uci || uci.length < 4) return uci || '';
    try {
        const c = new Chess(fen);
        const move = c.move({ from: uci.slice(0, 2), to: uci.slice(2, 4), promotion: uci.length > 4 ? uci[4] : undefined });
        return move ? move.san : uci;
    } catch (e) { return uci; }
}

if (typeof window !== 'undefined') { window.stockfishEngine = stockfishEngine; window.toWhitePerspective = toWhitePerspective; window.uciToSan = uciToSan; }
if (typeof module !== 'undefined' && module.exports) { module.exports = { StockfishEngine, stockfishEngine, toWhitePerspective, uciToSan }; }