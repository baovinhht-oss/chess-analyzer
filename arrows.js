/**
 * arrows.js - LỚP VẼ MŨI TÊN TRÊN BÀN CỜ (BƯỚC 1 - GIAI ĐOẠN 4)
 * 
 * Chức năng:
 * - Quản lý lớp SVG phủ lên trên bàn cờ chessboard.js (pointer-events: none).
 * - squareToCoords(square, orientation): Chuyển tên ô (VD: "e2") thành tọa độ tâm ô,
 *   tự động tính đúng tọa độ cả khi bàn cờ xoay chiều Trắng ('white') hoặc Đen ('black').
 * - drawArrow(from, to, color, options): Vẽ mũi tên vector SVG sắc nét:
 *   + Nước đi của quân Mã (Knight): Vẽ mũi tên hình chữ L (đi 2 ô theo hướng dài trước,
 *     rồi rẽ vuông góc 1 ô).
 *   + Nước đi của các quân khác: Vẽ mũi tên thẳng từ tâm ô xuất phát đến tâm ô đích.
 * - clearArrows(): Xóa toàn bộ mũi tên trên bàn cờ (dùng khi chuyển nước đi).
 * - redrawArrows(orientation): Vẽ lại tất cả các mũi tên đang hiển thị theo hướng bàn cờ mới
 *   (dùng khi bấm xoay bàn cờ hoặc nhấn phím F).
 */

// Kích thước chuẩn tương ứng với viewBox của SVG overlay (560x560)
const ARROW_BOARD_SIZE = 560;
const ARROW_SQUARE_SIZE = ARROW_BOARD_SIZE / 8; // 70px mỗi ô cờ

// Bảng màu chuẩn quy định cho các loại mũi tên (Chuẩn Chess.com - Không vẽ icon trên mũi tên)
const ARROW_COLORS = {
    BEST: '#81b64c',       // Xanh lá chuẩn Chess.com: Nước đi tốt nhất
    THREAT: '#f97316',     // Màu cam/đỏ: Mối đe dọa hoặc đòn phản công/trừng phạt của đối phương
    SUGGEST_2: '#38bdf8',  // Xanh dương sáng: Nước gợi ý thứ 2 (MultiPV)
    SUGGEST_3: '#c084fc',  // Tím nhạt: Nước gợi ý thứ 3 (MultiPV)
    USER: '#f97316'        // Màu cam rực rỡ: Mũi tên do người dùng tự vẽ
};

// Mảng lưu danh sách các mũi tên đang hiển thị: { from, to, color, options }
let activeArrows = [];

// Trạng thái kéo chuột phải để vẽ mũi tên (Bước 3)
let isRightMouseDown = false;
let dragStartSquare = null;
let previewTargetSquare = null;

/**
 * Lấy hoặc khởi tạo phần tử SVG overlay trên bàn cờ
 * @returns {SVGSVGElement|null}
 */
function getBoardOverlaySvg() {
    if (typeof document === 'undefined') return null;
    let svg = document.getElementById('board-overlay-svg');
    if (!svg) {
        const boardWrapper = document.querySelector('.board-wrapper');
        if (boardWrapper) {
            svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.id = 'board-overlay-svg';
            svg.setAttribute('class', 'board-overlay-svg');
            svg.setAttribute('viewBox', `0 0 ${ARROW_BOARD_SIZE} ${ARROW_BOARD_SIZE}`);
            boardWrapper.appendChild(svg);
        }
    }
    return svg;
}

/**
 * Lấy hướng hiện tại của bàn cờ ('white' hoặc 'black')
 * @returns {'white'|'black'}
 */
function getCurrentBoardOrientation() {
    if (typeof board !== 'undefined' && board && typeof board.orientation === 'function') {
        return board.orientation();
    }
    return 'white';
}

/**
 * Đổi tên ô cờ (VD: "e2", "e4", "g1") thành tọa độ tâm ô (x, y) trên viewBox 560x560
 * Xử lý chính xác cả khi bàn cờ ở hướng bình thường (Trắng) hoặc đang xoay (Đen)
 * 
 * @param {string} square Tên ô cờ chuẩn 2 ký tự (VD: "e2")
 * @param {'white'|'black'} [orientation] Chiều bàn cờ (nếu không truyền sẽ tự lấy hướng hiện tại)
 * @returns {{ x: number, y: number, col: number, row: number }} Tọa độ tâm ô
 */
function squareToCoords(square, orientation) {
    if (!square || square.length < 2) {
        return { x: 0, y: 0, col: 0, row: 0 };
    }

    const ori = orientation || getCurrentBoardOrientation();
    const fileIndex = square.charCodeAt(0) - 97;         // 'a' -> 0, ..., 'h' -> 7
    const rankIndex = parseInt(square[1], 10) - 1;       // '1' -> 0, ..., '8' -> 7

    let col, row;
    if (ori === 'white') {
        // Hướng quân Trắng: Cột 'a' ở bên trái (col 0), hàng 8 ở trên cùng (row 0), hàng 1 ở đáy (row 7)
        col = fileIndex;
        row = 7 - rankIndex;
    } else {
        // Hướng quân Đen: Bàn cờ xoay 180°, cột 'h' ở bên trái (col 0), hàng 1 ở trên cùng (row 0), hàng 8 ở đáy (row 7)
        col = 7 - fileIndex;
        row = rankIndex;
    }

    return {
        x: col * ARROW_SQUARE_SIZE + ARROW_SQUARE_SIZE / 2,
        y: row * ARROW_SQUARE_SIZE + ARROW_SQUARE_SIZE / 2,
        col,
        row
    };
}

/**
 * Kiểm tra xem nước đi từ ô `from` đến ô `to` có phải là nước đi của quân Mã không
 * Quân Mã luôn đi lệch 1 ô theo một trục và 2 ô theo trục còn lại
 * @param {string} from Ô bắt đầu (VD: "g1")
 * @param {string} to Ô đích (VD: "f3")
 * @returns {boolean}
 */
function isKnightMove(from, to) {
    if (!from || !to || from.length < 2 || to.length < 2) return false;
    const fromFile = from.charCodeAt(0) - 97;
    const fromRank = parseInt(from[1], 10) - 1;
    const toFile = to.charCodeAt(0) - 97;
    const toRank = parseInt(to[1], 10) - 1;

    const dFile = Math.abs(toFile - fromFile);
    const dRank = Math.abs(toRank - fromRank);

    return (dFile === 1 && dRank === 2) || (dFile === 2 && dRank === 1);
}

/**
 * Sinh mã HTML SVG cho một mũi tên hoàn chỉnh (thân mũi tên + đầu nhọn tam giác)
 * @param {string} from Ô xuất phát (VD: "e2")
 * @param {string} to Ô đích (VD: "e4")
 * @param {string} color Mã màu (VD: "#22c55e")
 * @param {object} [options] Tùy chỉnh (opacity, width, headLength, headWidth,...)
 * @param {'white'|'black'} [orientation] Chiều xoay bàn cờ
 * @returns {string} Chuỗi SVG <g>...</g>
 */
function buildArrowSvgString(from, to, color = '#81b64c', options = {}, orientation) {
    if (!from || !to || from === to || from.length < 2 || to.length < 2) return '';

    const ori = orientation || getCurrentBoardOrientation();
    const start = squareToCoords(from, ori);
    const end = squareToCoords(to, ori);

    // Mũi tên dày hơn (thân 17px), đầu sắc sảo góc cạnh, độ mờ nhẹ bán trong suốt (Yêu cầu 7)
    const shaftWidth = options.width || 17;
    const headLength = options.headLength || 28;
    const headWidth = options.headWidth || 34;
    const opacity = options.opacity !== undefined ? options.opacity : 0.76;
    const className = options.className || 'board-arrow';

    const fromFile = from.charCodeAt(0) - 97;
    const fromRank = parseInt(from[1], 10) - 1;
    const toFile = to.charCodeAt(0) - 97;
    const toRank = parseInt(to[1], 10) - 1;

    const dFile = Math.abs(toFile - fromFile);
    const dRank = Math.abs(toRank - fromRank);
    const isKnight = (dFile === 1 && dRank === 2) || (dFile === 2 && dRank === 1);

    if (isKnight) {
        // Nước đi của quân Mã: Vẽ chữ L đi theo hướng dài 2 ô trước, rồi rẽ vuông góc 1 ô
        let corner;
        if (dRank === 2) {
            corner = { x: start.x, y: end.y };
        } else {
            corner = { x: end.x, y: start.y };
        }

        const dx = end.x - corner.x;
        const dy = end.y - corner.y;
        const dist = Math.hypot(dx, dy) || 1;
        const ux = dx / dist;
        const uy = dy / dist;
        const px = -uy;
        const py = ux;

        // Đỉnh nhọn góc cạnh tại tâm ô đích
        const tipX = end.x;
        const tipY = end.y;

        const baseX = tipX - ux * headLength;
        const baseY = tipY - uy * headLength;

        // Đáy vát góc lõm nhẹ chuẩn Chess.com
        const innerBaseX = baseX + ux * 5;
        const innerBaseY = baseY + uy * 5;

        const wing1X = baseX + px * (headWidth / 2);
        const wing1Y = baseY + py * (headWidth / 2);
        const wing2X = baseX - px * (headWidth / 2);
        const wing2Y = baseY - py * (headWidth / 2);

        const shaftEndX = innerBaseX + ux * 2;
        const shaftEndY = innerBaseY + uy * 2;

        const pathD = `M ${start.x} ${start.y} L ${corner.x} ${corner.y} L ${shaftEndX} ${shaftEndY}`;

        return `
            <g class="${className}" data-from="${from}" data-to="${to}" opacity="${opacity}">
                <path d="${pathD}" fill="none" stroke="${color}" stroke-width="${shaftWidth}" stroke-linecap="butt" stroke-linejoin="miter"/>
                <polygon points="${tipX},${tipY} ${wing1X},${wing1Y} ${innerBaseX},${innerBaseY} ${wing2X},${wing2Y}" fill="${color}" stroke="${color}" stroke-width="1.5" stroke-linejoin="miter"/>
            </g>
        `;
    } else {
        // Mũi tên thẳng: Góc cạnh, dứt khoát, thanh thoát chuẩn giao diện chiến thuật
        const dx = end.x - start.x;
        const dy = end.y - start.y;
        const dist = Math.hypot(dx, dy) || 1;
        const ux = dx / dist;
        const uy = dy / dist;
        const px = -uy;
        const py = ux;

        const tipX = end.x;
        const tipY = end.y;

        const baseX = tipX - ux * headLength;
        const baseY = tipY - uy * headLength;

        // Đáy vát góc lõm sắc nét
        const innerBaseX = baseX + ux * 5;
        const innerBaseY = baseY + uy * 5;

        const wing1X = baseX + px * (headWidth / 2);
        const wing1Y = baseY + py * (headWidth / 2);
        const wing2X = baseX - px * (headWidth / 2);
        const wing2Y = baseY - py * (headWidth / 2);

        const shaftEndX = innerBaseX + ux * 2;
        const shaftEndY = innerBaseY + uy * 2;

        return `
            <g class="${className}" data-from="${from}" data-to="${to}" opacity="${opacity}">
                <line x1="${start.x}" y1="${start.y}" x2="${shaftEndX}" y2="${shaftEndY}" stroke="${color}" stroke-width="${shaftWidth}" stroke-linecap="butt"/>
                <polygon points="${tipX},${tipY} ${wing1X},${wing1Y} ${innerBaseX},${innerBaseY} ${wing2X},${wing2Y}" fill="${color}" stroke="${color}" stroke-width="1.5" stroke-linejoin="miter"/>
            </g>
        `;
    }
}

/**
 * Vẽ tất cả các mũi tên có trong mảng activeArrows lên lớp SVG overlay
 * Bao gồm cả mũi tên xem trước (preview) khi người dùng đang kéo chuột phải (Bước 3)
 * @param {'white'|'black'} [orientation] Chiều xoay bàn cờ
 */
function renderAllArrows(orientation) {
    const svg = getBoardOverlaySvg();
    if (!svg) return;

    const ori = orientation || getCurrentBoardOrientation();
    let innerHtml = '';

    // 1. Render tất cả các mũi tên chính thức (Engine + User)
    for (const arrow of activeArrows) {
        innerHtml += buildArrowSvgString(arrow.from, arrow.to, arrow.color, arrow.options, ori);
    }

    // 2. Render mũi tên xem trước (preview) khi người dùng đang kéo giữ chuột phải
    if (isRightMouseDown && dragStartSquare && previewTargetSquare && dragStartSquare !== previewTargetSquare) {
        innerHtml += buildArrowSvgString(
            dragStartSquare,
            previewTargetSquare,
            ARROW_COLORS.USER,
            {
                width: 11,
                opacity: 0.65,
                className: 'board-arrow arrow-preview'
            },
            ori
        );
    }

    svg.innerHTML = innerHtml;
}

/**
 * Đổi tọa độ con trỏ chuột (clientX, clientY) thành tên ô cờ (VD: "e4")
 * Hỗ trợ tự động cả khi bàn cờ xoay chiều Trắng hoặc Đen
 * @param {number} clientX
 * @param {number} clientY
 * @returns {string|null} Tên ô cờ (VD: "e4") hoặc null nếu ngoài bàn cờ
 */
function getSquareFromPoint(clientX, clientY) {
    const boardEl = document.getElementById('board') || document.querySelector('.board-wrapper');
    if (!boardEl) return null;

    const rect = boardEl.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return null;

    if (clientX < rect.left || clientX > rect.right || clientY < rect.top || clientY > rect.bottom) {
        return null;
    }

    const relX = clientX - rect.left;
    const relY = clientY - rect.top;
    const sqW = rect.width / 8;
    const sqH = rect.height / 8;

    let col = Math.floor(relX / sqW);
    let row = Math.floor(relY / sqH);
    col = Math.max(0, Math.min(7, col));
    row = Math.max(0, Math.min(7, row));

    const ori = getCurrentBoardOrientation();
    let fileIndex, rankIndex;
    if (ori === 'white') {
        fileIndex = col;
        rankIndex = 7 - row;
    } else {
        fileIndex = 7 - col;
        rankIndex = row;
    }

    const file = String.fromCharCode(97 + fileIndex);
    const rank = String(rankIndex + 1);
    return file + rank;
}

/**
 * Thêm hoặc xóa (toggle) mũi tên do người dùng tự vẽ bằng chuột phải (Bước 3)
 * Nhấn giữ chuột phải từ ô A sang ô B lần nữa thì xóa nó
 * @param {string} from Ô xuất phát
 * @param {string} to Ô đích
 */
function toggleUserArrow(from, to) {
    if (!from || !to || from === to || from.length < 2 || to.length < 2) return;

    const existingIdx = activeArrows.findIndex(
        a => a.from === from && a.to === to && a.options && a.options.type === 'user'
    );

    if (existingIdx >= 0) {
        // Đã có cùng một mũi tên tự vẽ -> xóa nó đi
        activeArrows.splice(existingIdx, 1);
    } else {
        // Chưa có -> thêm mới mũi tên tự vẽ màu cam rực rỡ
        activeArrows.push({
            from,
            to,
            color: ARROW_COLORS.USER,
            options: {
                type: 'user',
                width: 11,
                opacity: 0.88,
                className: 'board-arrow arrow-user'
            }
        });
    }

    renderAllArrows();
}

/**
 * Xóa mũi tên tự vẽ nối với một ô cờ (khi người dùng bấm chuột phải lên cùng ô mà không kéo)
 * @param {string} square Ô cờ (VD: "e4")
 * @returns {boolean} True nếu có xóa mũi tên
 */
function removeUserArrowsConnectedTo(square) {
    if (!square) return false;
    const idx = activeArrows.findIndex(
        a => (a.from === square || a.to === square) && a.options && a.options.type === 'user'
    );
    if (idx >= 0) {
        activeArrows.splice(idx, 1);
        renderAllArrows();
        return true;
    }
    return false;
}

/**
 * Xóa toàn bộ mũi tên do người dùng tự vẽ (khi bấm chuột trái lên bàn cờ)
 * Giữ nguyên các mũi tên của Engine (Tốt nhất / Gợi ý) nếu có
 * @returns {boolean} True nếu có mũi tên bị xóa
 */
function clearUserArrows() {
    const initialCount = activeArrows.length;
    activeArrows = activeArrows.filter(a => !(a.options && a.options.type === 'user'));
    if (activeArrows.length !== initialCount) {
        renderAllArrows();
        return true;
    }
    return false;
}

/**
 * Khởi tạo bắt sự kiện chuột trên bàn cờ để tự vẽ mũi tên bằng chuột phải (Bước 3)
 */
function initBoardArrowInteractions() {
    const boardWrapper = document.querySelector('.board-wrapper');
    if (!boardWrapper) return;

    // Tránh gắn lặp sự kiện nhiều lần
    if (boardWrapper.dataset.arrowInteractionsInitialized === 'true') return;
    boardWrapper.dataset.arrowInteractionsInitialized = 'true';

    // 1. Chặn menu chuột phải mặc định trên bàn cờ (contextmenu preventDefault)
    boardWrapper.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });

    // 2. Bắt sự kiện nhấn chuột xuống (mousedown)
    boardWrapper.addEventListener('mousedown', (e) => {
        // Nút chuột trái (button === 0): Bấm chuột trái lên bàn cờ thì xóa hết mũi tên tự vẽ
        if (e.button === 0) {
            clearUserArrows();
            return;
        }

        // Nút chuột phải (button === 2): Nhấn giữ chuột phải ở một ô để bắt đầu vẽ
        if (e.button === 2) {
            e.preventDefault();
            const startSquare = getSquareFromPoint(e.clientX, e.clientY);
            if (startSquare) {
                isRightMouseDown = true;
                dragStartSquare = startSquare;
                previewTargetSquare = null;
            }
        }
    });

    // 3. Bắt sự kiện di chuột (mousemove) trên phạm vi toàn window để kéo mượt không bị khựng
    window.addEventListener('mousemove', (e) => {
        if (!isRightMouseDown || !dragStartSquare) return;

        const currentSquare = getSquareFromPoint(e.clientX, e.clientY);
        if (currentSquare && currentSquare !== dragStartSquare) {
            if (previewTargetSquare !== currentSquare) {
                previewTargetSquare = currentSquare;
                renderAllArrows();
            }
        } else if (previewTargetSquare !== null) {
            previewTargetSquare = null;
            renderAllArrows();
        }
    });

    // 4. Bắt sự kiện thả chuột (mouseup) trên phạm vi toàn window
    window.addEventListener('mouseup', (e) => {
        if (e.button === 2 && isRightMouseDown) {
            isRightMouseDown = false;
            const endSquare = getSquareFromPoint(e.clientX, e.clientY);
            previewTargetSquare = null;

            if (dragStartSquare) {
                if (endSquare && endSquare !== dragStartSquare) {
                    // Kéo sang ô khác -> Thêm hoặc xóa (toggle) mũi tên tự vẽ
                    toggleUserArrow(dragStartSquare, endSquare);
                } else if (endSquare && endSquare === dragStartSquare) {
                    // Nhấn chuột phải lên cùng ô mà không kéo -> Xóa mũi tên tự vẽ nối với ô này
                    removeUserArrowsConnectedTo(endSquare);
                }
            }

            dragStartSquare = null;
            renderAllArrows();
        }
    });
}

/**
 * Vẽ một mũi tên từ ô `from` đến ô `to` với màu sắc chỉ định
 * @param {string} from Ô bắt đầu (VD: "e2", "g1")
 * @param {string} to Ô kết thúc (VD: "e4", "f3")
 * @param {string} [color="#22c55e"] Mã màu mũi tên (mặc định xanh lá)
 * @param {object} [options] Các tùy chỉnh (opacity, width, id,...)
 */
function drawArrow(from, to, color = '#81b64c', options = {}) {
    if (!from || !to || from === to || from.length < 2 || to.length < 2) return;

    // Kiểm tra nếu mũi tên này đã tồn tại thì cập nhật màu/tùy chọn, nếu chưa thì thêm mới
    const existingIndex = activeArrows.findIndex(a => a.from === from && a.to === to);
    const arrowData = { from, to, color, options };

    if (existingIndex >= 0) {
        activeArrows[existingIndex] = arrowData;
    } else {
        activeArrows.push(arrowData);
    }

    renderAllArrows();
}

/**
 * Xóa một mũi tên cụ thể giữa 2 ô `from` và `to`
 * @param {string} from Ô bắt đầu
 * @param {string} to Ô kết thúc
 * @returns {boolean} True nếu tìm thấy và xóa thành công
 */
function removeArrow(from, to) {
    const idx = activeArrows.findIndex(a => a.from === from && a.to === to);
    if (idx >= 0) {
        activeArrows.splice(idx, 1);
        renderAllArrows();
        return true;
    }
    return false;
}

/**
 * Xóa toàn bộ mũi tên đang hiển thị trên bàn cờ
 */
function clearArrows() {
    activeArrows = [];
    const svg = getBoardOverlaySvg();
    if (svg) {
        svg.innerHTML = '';
    }
}

/**
 * Xóa các mũi tên gợi ý của chế độ đi thử (trial suggestion) để tránh vẽ đè nhiều mũi tên
 */
function clearTrialSuggestionArrows() {
    const initialCount = activeArrows.length;
    activeArrows = activeArrows.filter(a => !(a.options && a.options.className && a.options.className.includes('arrow-trial-suggestion')));
    if (activeArrows.length !== initialCount) {
        renderAllArrows();
        return true;
    }
    return false;
}

/**
 * Vẽ lại tất cả các mũi tên đang hiển thị theo hướng bàn cờ mới (dùng khi xoay bàn cờ)
 * @param {'white'|'black'} [orientation]
 */
function redrawArrows(orientation) {
    renderAllArrows(orientation);
}

/**
 * Lấy danh sách các mũi tên đang hiển thị
 * @returns {Array<{ from: string, to: string, color: string, options: object }>}
 */
function getActiveArrows() {
    return [...activeArrows];
}

// Xuất các hàm ra phạm vi toàn cục hoặc module để dùng trong ứng dụng
if (typeof window !== 'undefined') {
    window.squareToCoords = squareToCoords;
    window.drawArrow = drawArrow;
    window.removeArrow = removeArrow;
    window.clearArrows = clearArrows;
    window.clearTrialSuggestionArrows = clearTrialSuggestionArrows;
    window.redrawArrows = redrawArrows;
    window.getActiveArrows = getActiveArrows;
    window.isKnightMove = isKnightMove;
    window.ARROW_COLORS = ARROW_COLORS;
    window.toggleUserArrow = toggleUserArrow;
    window.clearUserArrows = clearUserArrows;
    window.removeUserArrowsConnectedTo = removeUserArrowsConnectedTo;
    window.getSquareFromPoint = getSquareFromPoint;
    window.initBoardArrowInteractions = initBoardArrowInteractions;

    // Tự động khởi tạo bắt sự kiện kéo chuột phải trên bàn cờ khi tải trang
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initBoardArrowInteractions);
    } else {
        initBoardArrowInteractions();
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        squareToCoords,
        drawArrow,
        removeArrow,
        clearArrows,
        clearTrialSuggestionArrows,
        redrawArrows,
        getActiveArrows,
        isKnightMove,
        buildArrowSvgString,
        ARROW_COLORS,
        toggleUserArrow,
        clearUserArrows,
        removeUserArrowsConnectedTo,
        getSquareFromPoint,
        initBoardArrowInteractions
    };
}

