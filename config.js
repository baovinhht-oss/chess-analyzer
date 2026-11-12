/**
 * FILE: config.js
 * Chức năng: Cấu hình hằng số dùng chung cho toàn bộ ứng dụng.
 * Tên người dùng chess.com mặc định là bazu25022005 và có thể thay đổi linh hoạt qua Bảng Cài Đặt.
 */

// Username Chess.com cho người dùng ứng dụng (mặc định bazu25022005, ưu tiên lấy từ localStorage)
let CHESSCOM_USERNAME = "bazu25022005";
try {
    const savedUser = localStorage.getItem('chesscom_username');
    if (savedUser && savedUser.trim()) {
        CHESSCOM_USERNAME = savedUser.trim();
    }
} catch (e) {}

if (typeof window !== 'undefined') {
    window.CHESSCOM_USERNAME = CHESSCOM_USERNAME;
}
