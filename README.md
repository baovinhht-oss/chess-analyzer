<div align="center">

# ♟️ Chess Analyzer & Game Review

**Ứng dụng web phân tích cờ vua toàn diện tích hợp Stockfish, Game Review phong cách Chess.com và Chế độ đấu với Bot.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![JavaScript](https://img.shields.io/badge/language-JavaScript-f7df1e.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Stockfish](https://img.shields.io/badge/Engine-Stockfish%20WASM-blue.svg)](https://stockfishchess.org/)

</div>

---

## 🚀 Giới thiệu dự án

**Chess Analyzer** là một ứng dụng web cục bộ (Local Web Application) được phát triển nhằm mang lại trải nghiệm xem lại, phân tích ván đấu (Game Review) chuyên nghiệp như trên các nền tảng cờ vua lớn (Chess.com/Lichess) ngay trực tiếp trên trình duyệt của bạn. 

Ứng dụng tự động kết nối với API công khai của Chess.com để tải lịch sử ván đấu theo tháng, chạy engine phân tích Stockfish sâu để chấm điểm từng nước đi, gán huy hiệu phân loại nước đi chuyên nghiệp và cung cấp chế độ đấu tập trực tiếp với AI.

---

## ✨ Các tính năng nổi bật

* 🌐 **Đồng bộ tự động Chess.com:** Nhập tên tài khoản và chọn tháng/năm để tải toàn bộ danh sách ván đấu (Rapid, Blitz, Bullet, Daily) kèm biên bản PGN chuẩn xác.
* 🤖 **Phân tích chiều sâu với Stockfish:** Tích hợp engine Stockfish WebAssembly chạy ngầm để tính toán điểm số thế cờ (`CP`, `Mate`), tìm nước đi tốt nhất (`Best Move`) và chấm điểm chuẩn xác tỷ lệ thắng (`Win Probability`).
* 🏅 **Huy hiệu phân loại nước đi (Move Classification):** Tự động nhận diện các loại nước đi từ *Brilliant (!!)*, *Great (!)*, *Best (★)*, *Book*, *Good*, *Inaccuracy (?!)*, *Mistake (?)* cho đến *Blunder (??)* kèm hiệu ứng trực quan.
* 📈 **Biểu đồ đánh giá thế trận (Eval Chart):** Biểu đồ trực quan diễn biến ván đấu qua từng nước đi, cho phép bấm hoặc rê chuột để nhảy nhanh đến bất kỳ thế cờ nào.
* ⚔️ **Chế độ Đấu với Bot (Play vs Bot):** Cho phép bạn chọn bất kỳ thế cờ nào trong ván đấu để chơi tiếp trực tiếp với Stockfish ở các mức độ khác nhau.
* 💡 **Gợi ý nước đi (MultiPV / Hints):** Hiển thị các phương án chiến thuật tối ưu kèm mũi tên chỉ dẫn trực tiếp trên bàn cờ.
* 📊 **Thống kê sự nghiệp (Lifetime Stats):** Tổng hợp tỉ lệ Thắng / Hòa / Thua, độ chính xác trung bình và hiệu suất thi đấu (Performance Rating).
* 🌍 **Đa ngôn ngữ & Giao diện tùy chỉnh:** Hỗ trợ song ngữ Tiếng Việt / Tiếng Anh, nhiều bộ giao diện bàn cờ và các bộ quân cờ đẹp mắt (Classic, Lichess Cburnett, Chess.com Neo,...).

---

## 🛠️ Công nghệ sử dụng

* **Frontend:** HTML5, CSS3, JavaScript (Vanilla ES6+), giao diện thiết kế tối ưu, linh hoạt.
* **Thư viện Cờ vua:** 
  * `chessboard.js` (Hiển thị và tương tác bàn cờ).
  * `chess.js` (Xử lý luật chơi và logic di chuyển quân cờ).
* **Chess Engine:** Stockfish (WebAssembly / Worker).
* **API:** Chess.com Public API.

---

## 📂 Cấu trúc thư mục dự án

```text
chess-analyzer/
│
├── index.html          # Giao diện chính của ứng dụng
├── style.css           # Bảng định dạng giao diện (Dark/Light mode, Board themes)
├── app.js              # Logic điều hướng, bàn cờ, UI, tương tác người dùng
├── api.js              # Kết nối API Chess.com & chuẩn hóa dữ liệu ván cờ
├── engine.js           # Giao tiếp với Stockfish WebAssembly Engine
├── cache.js            # Quản lý lưu trữ bộ nhớ đệm (IndexedDB / LocalStorage)
├── arrows.js           # Vẽ mũi tên phân tích và gợi ý nước đi trên bàn cờ
├── classify.js         # Thuật toán chấm điểm và gán huy hiệu nước đi
├── explain.js          # Tạo nội dung giải thích chi tiết nước cờ
├── stats.js            # Thống kê sự nghiệp & Dashboard tổng quan
└── config.js           # Cấu hình tài khoản mặc định và thông số hệ thống
