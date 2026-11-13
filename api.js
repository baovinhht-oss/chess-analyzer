/**
 * FILE: api.js
 * Chức năng: Gọi API công khai của Chess.com để lấy danh sách ván cờ theo tháng/năm
 * và chuẩn hóa dữ liệu (đối thủ, màu quân, kết quả, ngày chơi) để dễ hiển thị.
 */

// Fallback an toàn nếu config.js bị thiếu hoặc load thất bại
if (typeof window !== 'undefined') {
    window.CHESSCOM_USERNAME = window.CHESSCOM_USERNAME || (typeof CHESSCOM_USERNAME !== 'undefined' ? CHESSCOM_USERNAME : 'bazu25022005');
}

/**
 * Hàm quy đổi mã kết quả của Chess.com sang tiếng Việt/Anh và phân loại Thắng/Thua/Hòa
 * @param {string} resultCode - Mã kết quả từ API Chess.com (VD: 'win', 'checkmated', 'stalemate'...)
 * @param {string} lang - 'vi' hoặc 'en'
 * @returns {Object} { label: Chuỗi hiển thị, type: 'win' | 'loss' | 'draw' }
 */
function parseChessComResult(resultCode, lang = (typeof currentLang !== 'undefined' ? currentLang : 'vi')) {
    const isEn = lang === 'en';
    if (resultCode === 'win') {
        return { label: isEn ? 'Win' : 'Thắng', type: 'win' };
    }

    // Các mã kết quả hòa trên Chess.com
    const drawCodes = [
        'agreed', 'repetition', 'stalemate',
        'insufficient', '50move', 'timevsinsufficient'
    ];
    if (drawCodes.includes(resultCode)) {
        return { label: isEn ? 'Draw' : 'Hòa', type: 'draw' };
    }

    // Các trường hợp còn lại là Thua (kèm lý do cụ thể)
    const lossReasonsVi = {
        'checkmated': 'Thua (Bị chiếu hết)',
        'timeout': 'Thua (Hết giờ)',
        'resigned': 'Thua (Đầu hàng)',
        'abandoned': 'Thua (Bỏ cuộc)',
        'lose': 'Thua'
    };
    const lossReasonsEn = {
        'checkmated': 'Loss (Checkmated)',
        'timeout': 'Loss (Timeout)',
        'resigned': 'Loss (Resigned)',
        'abandoned': 'Loss (Abandoned)',
        'lose': 'Loss'
    };

    const lossMap = isEn ? lossReasonsEn : lossReasonsVi;
    const defaultLoss = isEn ? `Loss (${resultCode})` : `Thua (${resultCode})`;

    return {
        label: lossMap[resultCode] || defaultLoss,
        type: 'loss'
    };
}

/**
 * Gọi API lấy danh sách các ván cờ của người chơi trong tháng/năm chỉ định
 * @param {string} [username=CHESSCOM_USERNAME] - Tên người dùng trên Chess.com (mặc định từ config.js)
 * @param {string|number} year - Năm (4 chữ số, VD: 2024)
 * @param {string|number} month - Tháng (1-12 hoặc '01'-'12')
 * @returns {Promise<Array>} Danh sách các ván cờ đã được xử lý thông tin
 */
async function fetchMonthlyGames(username = (typeof CHESSCOM_USERNAME !== 'undefined' ? CHESSCOM_USERNAME : (typeof window !== 'undefined' && window.CHESSCOM_USERNAME ? window.CHESSCOM_USERNAME : 'bazu25022005')), year, month) {
    const targetUser = username || (typeof CHESSCOM_USERNAME !== 'undefined' ? CHESSCOM_USERNAME : (typeof window !== 'undefined' && window.CHESSCOM_USERNAME ? window.CHESSCOM_USERNAME : 'bazu25022005'));
    const cleanUsername = targetUser.trim().toLowerCase();
    if (!cleanUsername) {
        throw new Error('Không tìm thấy username Chess.com được cấu hình.');
    }

    // Đảm bảo tháng luôn có 2 chữ số (ví dụ: 5 -> "05") đúng chuẩn URL của Chess.com
    const formattedMonth = String(month).padStart(2, '0');
    const url = `https://api.chess.com/pub/player/${encodeURIComponent(cleanUsername)}/games/${year}/${formattedMonth}`;

    let response;
    try {
        response = await fetch(url);
    } catch (networkError) {
        // Lỗi khi rớt mạng hoặc không kết nối được tới máy chủ
        throw new Error('Không thể kết nối đến máy chủ Chess.com. Vui lòng kiểm tra lại kết nối mạng của bạn.');
    }

    // Xử lý các mã lỗi HTTP trả về từ Chess.com
    if (response.status === 404) {
        throw new Error(`Không tìm thấy người chơi "${username}" hoặc dữ liệu tháng ${formattedMonth}/${year} không tồn tại.`);
    }

    if (response.status === 429) {
        throw new Error('Bạn đang gửi yêu cầu quá nhanh đến Chess.com (Giới hạn tần suất - Rate Limit). Vui lòng đợi khoảng 1 phút rồi thử lại.');
    }

    if (!response.ok) {
        throw new Error(`Lỗi khi tải dữ liệu từ Chess.com (Mã lỗi HTTP: ${response.status}).`);
    }

    const data = await response.json();

    // Kiểm tra xem tháng đó có ván cờ nào không
    if (!data.games || data.games.length === 0) {
        throw new Error(`Người chơi "${username}" không có ván cờ nào trong tháng ${formattedMonth}/${year}.`);
    }

    // Chỉ lọc các ván cờ tiêu chuẩn (rules === 'chess') và có sẵn dữ liệu biên bản PGN
    // (Loại bỏ các biến thể như cờ 960, Bughouse, 3-check... vì chuẩn PGN/Stockfish cơ bản khác nhau)
    const validGames = data.games.filter(g => g.rules === 'chess' && g.pgn);

    if (validGames.length === 0) {
        throw new Error(`Không tìm thấy ván cờ vua tiêu chuẩn nào có biên bản PGN trong tháng ${formattedMonth}/${year}.`);
    }

    // Chuẩn hóa dữ liệu từng ván và đảo ngược mảng để ván mới nhất hiện lên đầu
    return validGames.map((game, index) => {
        const isWhite = game.white.username.toLowerCase() === cleanUsername;
        const userSide = isWhite ? game.white : game.black;
        const opponentSide = isWhite ? game.black : game.white;

        const resultInfo = parseChessComResult(userSide.result);

        // Đổi end_time (Unix timestamp tính bằng giây) sang ngày/tháng/năm dễ đọc
        const dateObj = new Date(game.end_time * 1000);
        const locale = (typeof currentLang !== 'undefined' && currentLang === 'en') ? 'en-US' : 'vi-VN';
        const dateStr = dateObj.toLocaleDateString(locale, {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        return {
            id: index,
            url: game.url,
            pgn: game.pgn,
            endTime: game.end_time,
            timeClass: game.time_class, // rapid, blitz, bullet...
            userColor: isWhite ? 'w' : 'b',
            userColorText: isWhite ? 'Trắng' : 'Đen',
            userUsername: userSide.username,
            userRating: userSide.rating,
            opponentUsername: opponentSide.username,
            opponentRating: opponentSide.rating,
            rawResult: userSide.result,
            resultLabel: resultInfo.label,
            resultType: resultInfo.type, // 'win', 'loss', 'draw'
            dateStr: dateStr
        };
    }).reverse();
}

if (typeof window !== 'undefined') {
    window.parseChessComResult = parseChessComResult;
    window.fetchMonthlyGames = fetchMonthlyGames;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        parseChessComResult,
        fetchMonthlyGames
    };
}