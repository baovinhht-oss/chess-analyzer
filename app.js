/**
 * FILE: app.js
 * ĐÃ FIX LỖI SO SÁNH NƯỚC ĐI VÀ LỖI ĐÁNH GIÁ CHÉO.
 */

// Fallback an toàn nếu config.js bị thiếu hoặc load thất bại
if (typeof window !== 'undefined') {
    window.CHESSCOM_USERNAME = window.CHESSCOM_USERNAME || (typeof CHESSCOM_USERNAME !== 'undefined' ? CHESSCOM_USERNAME : '');
}

const CATEGORY_ARROW_COLORS = {
    Brilliant: '#1baca6', Great: '#5c8bb0', Book: '#a88865', Best: '#81b64c',
    Excellent: '#96bc4b', Good: '#96af8b', Inaccuracy: '#f7c631', Mistake: '#ffa459',
    Miss: '#ff7769', Blunder: '#fa412d'
};

const CATEGORY_ICONS = {
    Brilliant: `<svg viewBox="0 0 24 24" aria-hidden="true">${(typeof MOVE_ICONS !== 'undefined' && MOVE_ICONS.brilliant ? MOVE_ICONS.brilliant.svg : '<rect x="5.2" y="3.4" width="4.8" height="12" rx="1.3" fill="#fff"/><circle cx="7.6" cy="19.7" r="2.5" fill="#fff"/><rect x="14" y="3.4" width="4.8" height="12" rx="1.3" fill="#fff"/><circle cx="16.4" cy="19.7" r="2.5" fill="#fff"/>')}</svg>`,
    Great: `<svg viewBox="0 0 24 24" aria-hidden="true">${(typeof MOVE_ICONS !== 'undefined' && MOVE_ICONS.great ? MOVE_ICONS.great.svg : '<rect x="9.3" y="3.4" width="5.4" height="12" rx="1.3" fill="#fff"/><circle cx="12" cy="19.7" r="2.8" fill="#fff"/>')}</svg>`,
    Book: `<svg viewBox="0 0 24 24" aria-hidden="true">${(typeof MOVE_ICONS !== 'undefined' && MOVE_ICONS.book ? MOVE_ICONS.book.svg : '<polygon points="2.5,5.5 11,7.8 11,20.5 2.5,18.2" fill="#fff"/><polygon points="21.5,5.5 13,7.8 13,20.5 21.5,18.2" fill="#fff"/>')}</svg>`,
    Best: `<svg viewBox="0 0 24 24" aria-hidden="true">${(typeof MOVE_ICONS !== 'undefined' && MOVE_ICONS.best ? MOVE_ICONS.best.svg : '<polygon points="12,2.8 14.9,9 21.8,9.8 16.7,14.4 18.1,21.2 12,17.8 5.9,21.2 7.3,14.4 2.2,9.8 9.1,9" fill="#fff" stroke="#fff" stroke-width="1.6" stroke-linejoin="miter"/>')}</svg>`,
    Excellent: `<svg viewBox="0 0 24 24" aria-hidden="true">${(typeof MOVE_ICONS !== 'undefined' && MOVE_ICONS.excellent ? MOVE_ICONS.excellent.svg : '<polygon points="2.5,10.5 7.5,10.5 7.5,21 2.5,21" fill="#fff"/><polygon points="9.5,10.5 13,2.5 16.2,3.2 15.4,9 21.8,9 21.8,12 20.2,19.8 9.5,21" fill="#fff"/>')}</svg>`,
    Good: `<svg viewBox="0 0 24 24" aria-hidden="true">${(typeof MOVE_ICONS !== 'undefined' && MOVE_ICONS.good ? MOVE_ICONS.good.svg : '<polygon points="2.5,12.6 6,9.1 10,13.1 18,5.1 21.5,8.6 10,20.1" fill="#fff"/>')}</svg>`,
    Inaccuracy: `<svg viewBox="0 0 24 24" aria-hidden="true">${(typeof MOVE_ICONS !== 'undefined' && MOVE_ICONS.inaccuracy ? MOVE_ICONS.inaccuracy.svg : '<g transform="translate(0 1.5) scale(.8)"><path d="M6.6 8.4C6.6 2.8 17.4 2.8 17.4 8.2C17.4 12.4 12 11.8 12 15.4" fill="none" stroke="#fff" stroke-linejoin="round" stroke-linecap="butt" stroke-width="4.6"/><circle cx="12" cy="19.7" r="2.4" fill="#fff"/></g><g transform="translate(0 1.5) scale(.8)"><rect x="20.7" y="3.4" width="4.6" height="12" rx="1.3" fill="#fff"/><circle cx="23" cy="19.7" r="2.4" fill="#fff"/></g>')}</svg>`,
    Mistake: `<svg viewBox="0 0 24 24" aria-hidden="true">${(typeof MOVE_ICONS !== 'undefined' && MOVE_ICONS.mistake ? MOVE_ICONS.mistake.svg : '<path d="M6.6 8.4C6.6 2.8 17.4 2.8 17.4 8.2C17.4 12.4 12 11.8 12 15.4" fill="none" stroke="#fff" stroke-linejoin="round" stroke-linecap="butt" stroke-width="4.6"/><circle cx="12" cy="19.7" r="2.4" fill="#fff"/>')}</svg>`,
    Miss: `<svg viewBox="0 0 24 24" aria-hidden="true">${(typeof MOVE_ICONS !== 'undefined' && MOVE_ICONS.miss ? MOVE_ICONS.miss.svg : '<path d="M5 5L19 19M19 5L5 19" stroke="#fff" stroke-width="5" stroke-linecap="square" fill="none"/>')}</svg>`,
    Blunder: `<svg viewBox="0 0 24 24" aria-hidden="true">${(typeof MOVE_ICONS !== 'undefined' && MOVE_ICONS.blunder ? MOVE_ICONS.blunder.svg : '<g transform="translate(-0.6 4.6) scale(.62)"><path d="M6.6 8.4C6.6 2.8 17.4 2.8 17.4 8.2C17.4 12.4 12 11.8 12 15.4" fill="none" stroke="#fff" stroke-linejoin="round" stroke-linecap="butt" stroke-width="5.8"/><circle cx="12" cy="19.7" r="2.4" fill="#fff"/></g><g transform="translate(11.4 4.6) scale(.62)"><path d="M6.6 8.4C6.6 2.8 17.4 2.8 17.4 8.2C17.4 12.4 12 11.8 12 15.4" fill="none" stroke="#fff" stroke-linejoin="round" stroke-linecap="butt" stroke-width="5.8"/><circle cx="12" cy="19.7" r="2.4" fill="#fff"/></g>')}</svg>`
};

const EVAL_BADGE_SYMBOLS = CATEGORY_ICONS;
const SVG_ICONS = CATEGORY_ICONS;

const CATEGORY_TEXT_SYMBOLS = {
    Brilliant: '!!',
    Great: '!',
    Book: '📖',
    Best: '★',
    Excellent: '👍',
    Good: '✔️',
    Inaccuracy: '?!',
    Mistake: '?',
    Miss: 'X',
    Blunder: '??'
};

const CATEGORY_CSS_VAR = {
    Brilliant: 'brill', Great: 'great', Book: 'book', Best: 'best',
    Excellent: 'exc', Good: 'good', Inaccuracy: 'inac', Mistake: 'mis',
    Miss: 'miss', Blunder: 'blu'
};

const TRANSLATIONS = {
    vi: {
        page_title: 'Chess Analyzer',
        game_list_title: 'Danh sách ván cờ',
        clear_cache: 'Xóa bộ nhớ',
        fetch_btn: 'Tải',
        filter_result_all: 'Kết quả: Tất cả',
        filter_result_win: 'Thắng',
        filter_result_loss: 'Thua',
        filter_result_draw: 'Hòa',
        filter_time_all: 'Thể loại: Tất cả',
        sort_newest: 'Mới nhất',
        loading_games: 'Đang tải danh sách ván cờ...',
        cache_saved: 'Đã lưu phân tích',
        welcome_title: 'Chào mừng bạn đến với Chess.com Game Review',
        welcome_desc: 'Vui lòng bấm nút danh mục ở góc trên bên trái để chọn một ván cờ của',
        welcome_latest_game: 'Ván mới nhất của bạn',
        welcome_analyze_this_game: 'Phân tích ván này',
        welcome_month_games: 'Ván trong tháng',
        welcome_month_games_format: 'Ván trong tháng {0}',
        welcome_win_rate: 'Tỉ lệ thắng',
        welcome_avg_accuracy: 'Độ chính xác trung bình',
        welcome_recent_games: 'Ván gần đây',
        welcome_view_all: 'Xem tất cả',
        welcome_review: 'Xem lại',
        welcome_analyze: 'Phân tích',
        welcome_wins_count: '{0} ván thắng',
        welcome_no_analyzed: 'Chưa có ván phân tích',
        welcome_analyzed_count: '{0} ván đã phân tích',
        welcome_stats_sub: '{0} thắng · {1} hòa · {2} thua',
        promo_title: 'Chọn quân phong cấp',
        promo_queen: 'Hậu (Q)',
        promo_rook: 'Xe (R)',
        promo_bishop: 'Tượng (B)',
        promo_knight: 'Mã (N)',
        cancel_move: 'Hủy nước đi',
        game_review: 'Báo cáo ván đấu',
        reanalyze: 'Phân tích lại',
        copy_pgn: 'Sao chép PGN',
        copied: 'Đã chép!',
        pause_analysis: 'Tạm dừng',
        your_accuracy: 'Độ chính xác của bạn',
        opp_accuracy: 'Độ chính xác đối thủ',
        opening: 'Khai cuộc',
        your_mistakes: 'Sai lầm của bạn',
        starting_pos: 'Thế cờ xuất phát',
        white_perspective: 'Điểm số theo góc nhìn Trắng',
        black_perspective: 'Điểm số theo góc nhìn Đen',
        starting_comment: 'Thế cờ xuất phát. Hãy bấm Tiến hoặc phím mũi tên Phải để xem từng nước đi.',
        win_prob_white: 'Tỉ lệ thắng (Trắng):',
        win_prob_black: 'Tỉ lệ thắng (Đen):',
        move_word: 'Nước',
        btn_exit_trial: 'Quay lại ván gốc',
        btn_best: 'Nước tốt nhất',
        btn_hint: 'Gợi ý',
        btn_explain: 'Giải thích',
        btn_prev_mistake: 'Sai lầm trước',
        btn_next_mistake: 'Sai lầm sau',
        hints_title: 'Ý tưởng & Kế hoạch',
        tab_moves: 'Biên bản',
        tab_cls: 'Phân loại',
        tab_key: 'Nước then chốt',
        tab_engine: 'Live Engine',
        key_moves_title: 'Các nước cờ then chốt',
        no_game_selected: 'Chưa chọn ván cờ nào',
        live_engine: 'Live Engine',
        status_analyzing: 'Đang phân tích...',
        eval_label: 'Đánh giá:',
        best_move_label: 'Nước tốt nhất:',
        depth_label: 'Độ sâu:',
        ctrl_play: 'Phát',
        ctrl_flip: 'Đảo',

        cat_brilliant: 'Xuất thần',
        cat_great: 'Tuyệt hay',
        cat_book: 'Sách giáo khoa',
        cat_best: 'Tốt nhất',
        cat_excellent: 'Xuất sắc',
        cat_good: 'Tốt',
        cat_inaccuracy: 'Không chính xác',
        cat_mistake: 'Sai lầm',
        cat_miss: 'Bỏ lỡ',
        cat_blunder: 'Sai lầm nặng',

        phase_opening: 'Khai cuộc',
        phase_middlegame: 'Trung cuộc',
        phase_endgame: 'Tàn cuộc',
        moves_range_opening: 'Nước 1 - 10',
        moves_range_middlegame: 'Nước 11 - 25',
        moves_range_endgame: 'Nước 26+',

        accuracy: 'Độ chính xác',
        move_classification: 'Phân loại nước đi',
        game_phases: 'Giai đoạn ván cờ',
        mistakes_detail: '({0} sai lầm, {1} bỏ lỡ, {2} nặng)',
        waiting_stockfish: 'Đang chờ Stockfish phân tích nước đi này...',
        calculating_eval: 'Đang tính toán đánh giá thế cờ...',
        analyzing: 'Đang phân tích',
        you_played: 'bạn đi',
        opponent_played: 'đối thủ đi',
        trial_move: 'Đi thử',
        btn_hide_best: 'Ẩn nước tốt nhất',
        btn_best_move: 'Nước tốt nhất',
        btn_close_explain: 'Đóng giải thích',
        btn_close_hints: 'Đóng gợi ý',
        btn_hints_lbl: 'Gợi ý',
        btn_play_lbl: 'Phát',
        btn_pause_lbl: 'Dừng',
        trial_pos_desc: 'Đang xem nhánh đi thử (từ nước {0}). Bấm "Quay lại ván gốc" để hủy.',
        trial_win_loss: ' (Mất {0}% cơ hội thắng)',
        no_moves_phase: 'Không có nước đi',
        no_moves_game: 'Ván cờ này chưa có nước đi nào.',
        thinking_time: 'Thời gian suy nghĩ: {0}',

        // Months
        month_01: 'Thg 1',
        month_02: 'Thg 2',
        month_03: 'Thg 3',
        month_04: 'Thg 4',
        month_05: 'Thg 5',
        month_06: 'Thg 6',
        month_07: 'Thg 7',
        month_08: 'Thg 8',
        month_09: 'Thg 9',
        month_10: 'Thg 10',
        month_11: 'Thg 11',
        month_12: 'Thg 12',

        // Time classes
        filter_time_rapid: 'Rapid',
        filter_time_blitz: 'Blitz',
        filter_time_bullet: 'Bullet',
        filter_time_daily: 'Daily',

        // Board themes
        board_green: 'Bàn: Xanh lá',
        board_wood: 'Bàn: Gỗ tự nhiên',
        board_walnut: 'Bàn: Gỗ óc chó',
        board_dark: 'Bàn: Than tối',
        board_ocean: 'Bàn: Biển xanh',
        board_marble: 'Bàn: Cẩm thạch',
        board_glass: 'Bàn: Kính mờ',
        board_neon: 'Bàn: Neon Glow',
        board_minimalist: 'Bàn: Tối giản',
        board_parchment: 'Bàn: Giấy cổ',
        board_ice: 'Bàn: Băng tuyết',

        // Piece themes
        piece_classic: 'Quân: Classic (Vector SVG)',
        piece_neo: 'Quân: Neo (Chess.com)',
        piece_game_room: 'Quân: Game Room (Wood)',
        piece_glass: 'Quân: Glass (Thủy tinh)',
        piece_alpha: 'Quân: Alpha (Hiện đại)',
        piece_bases: 'Quân: Bases (Phẳng)',
        piece_cburnett: 'Quân: Cburnett (Lichess)',
        piece_merida: 'Quân: Merida (Truyền thống)',
        piece_california: 'Quân: California (Thanh lịch)',
        piece_cardinal: 'Quân: Cardinal (Sắc sảo)',
        piece_dubrovny: 'Quân: Dubrovny (Gỗ cổ)',

        // Depths
        depth_16: 'Độ sâu 16 (Nhanh - Dưới 1 phút)',
        depth_18: 'Độ sâu 18 (Cân bằng)',
        depth_20: 'Độ sâu 20 (Chuyên sâu)',
        depth_22: 'Độ sâu 22 (Rất sâu)',
        live_depth_10: '10 (Nhanh)',
        live_depth_12: '12',
        live_depth_13: '13 (Chuẩn)',
        live_depth_15: '15 (Sâu)',
        live_depth_18: '18 (Rất sâu)',

        // Theme toggle
        theme_dark: 'Giao diện: Tối',
        theme_light: 'Giao diện: Sáng',

        // Game list & players
        badge_analyzed: 'Đã phân tích',
        no_games_found: 'Không có ván cờ nào.',
        white_player_lbl: 'Trắng',
        black_player_lbl: 'Đen',

        // Lifetime Stats
        lifetime_stats_btn: 'Thống kê',
        lifetime_stats_title: 'Thống kê sự nghiệp',
        stats_subtitle: 'Tổng hợp phân tích từ toàn bộ lịch sử đấu',
        stats_total_games: 'Tổng số ván đấu',
        stats_wld_ratio: 'Tỷ lệ Thắng / Hòa / Thua',
        stats_win: 'Thắng',
        stats_draw: 'Hòa',
        stats_loss: 'Thua',
        stats_career_accuracy: 'Độ chính xác trung bình',
        stats_based_on_games: 'Dựa trên {0} ván đã phân tích',
        stats_no_analysis_yet: 'Chưa có ván nào được phân tích',
        stats_move_badges: 'Huy hiệu nước đi tích lũy',
        stats_favorite_openings: 'Khai cuộc chơi nhiều nhất',
        stats_opening_name: 'Khai cuộc',
        stats_games_count: 'Số ván',
        stats_win_rate: 'Tỉ lệ thắng',
        stats_no_games: 'Chưa có dữ liệu ván đấu nào.',
        stats_white_accuracy: 'Cầm Trắng: {0}%',
        stats_black_accuracy: 'Cầm Đen: {0}%',
        stats_btn_close: 'Đóng',

        // Performance Rating
        performance_rating: 'Hiệu suất ván đấu',
        performance_short: 'Hiệu suất',
        perf_diff_positive: '+{0} so với Elo hiện tại ({1})',
        perf_diff_negative: '{0} so với Elo hiện tại ({1})',
        perf_diff_equal: 'Bằng Elo hiện tại ({0})',
        perf_waiting: 'Chờ phân tích ván đấu...',

        // Play against Bot
        btn_play_bot: 'Đấu với Bot',
        btn_exit_bot: 'Thoát chế độ Bot',
        btn_bot_undo: 'Đi lùi lại 1 lượt đấu (Lùi 2 nước)',
        bot_undo_btn: 'Đi lùi',
        bot_no_moves: 'Chưa có nước đi nào trong trận đấu với Bot.',
        bot_branch_tag: 'Nhánh đấu với Bot',
        bot_eval_feedback: 'Nước đi của bạn: {0}',
        bot_mode_title: 'Đang đấu với Bot (Stockfish)',
        bot_your_turn: 'Tới lượt bạn đi quân ({0})',
        bot_thinking: 'Bot đang suy nghĩ...',
        bot_in_check: 'Bạn đang bị chiếu! Hãy đi quân ({0})...',
        bot_win_checkmate: 'Chiếu hết! Bạn đã chiến thắng Bot!',
        bot_loss_checkmate: 'Chiếu hết! Bot đã chiến thắng.',
        bot_draw_stalemate: 'Hòa cờ do hết nước đi hợp lệ (Stalemate)!',
        bot_draw_repetition: 'Hòa cờ do lặp lại thế cờ 3 lần!',
        bot_draw_material: 'Hòa cờ do không đủ quân chiếu hết!',
        bot_draw_50moves: 'Hòa cờ theo luật 50 nước!',
        bot_draw_generic: 'Hòa cờ!',
        bot_moves_count: '{0} nước',
        bot_check_user: 'Bạn đang bị chiếu tướng!',
        bot_check_bot: 'Bot đang bị chiếu tướng!',
        select_bot_elo_title: 'Chọn mức độ Elo của Bot',
        bot_elo_800: 'Tập sự (~800 Elo)',
        bot_elo_1200: 'Trung cấp (~1200 Elo)',
        bot_elo_1600: 'Nâng cao (~1600 Elo)',
        bot_elo_2000: 'Cao thủ (~2000 Elo)',
        bot_elo_2400: 'Kiện tướng (~2400 Elo)',
        custom_import_btn: 'Nhập PGN / FEN',
        custom_import_btn_title: 'Nhập biên bản PGN hoặc thế cờ FEN thủ công',
        custom_import_title: 'Nhập PGN / FEN thủ công',
        custom_import_subtitle: 'Dán biên bản ván cờ PGN đầy đủ hoặc chuỗi thế cờ FEN để phân tích hoặc đấu với Bot',
        custom_import_input_label: 'Biên bản PGN hoặc chuỗi FEN:',
        custom_import_placeholder: 'Dán biên bản PGN đầy đủ hoặc chuỗi thế cờ FEN vào đây...',
        custom_import_color_label: 'Góc nhìn / Màu quân của bạn:',
        custom_color_auto: 'Tự động (Theo PGN / FEN)',
        custom_color_white: 'Trắng (White)',
        custom_color_black: 'Đen (Black)',
        custom_import_submit: 'Nạp & Phân tích',
        cancel_btn: 'Hủy',
        custom_import_error_empty: 'Vui lòng nhập biên bản PGN hoặc chuỗi thế cờ FEN.',
        custom_import_error_invalid: 'Định dạng PGN hoặc FEN không hợp lệ. Vui lòng kiểm tra lại cú pháp.',
        custom_import_success_fen: 'Đã nạp thế cờ FEN thành công!',
        custom_import_success_pgn: 'Đã nạp ván cờ PGN thành công!',
        live_engine_analyzing: 'Đang phân tích',
        live_engine_done: 'Hoàn tất',

        // Personal Puzzles
        personal_puzzles_btn: 'Giải đố',
        personal_puzzles_btn_title: 'Kho giải đố cá nhân từ các sai lầm của bạn',
        personal_puzzles_title: 'Kho giải đố cá nhân',
        personal_puzzles_subtitle: 'Rèn luyện chiến thuật từ chính những sai lầm trong ván đấu của bạn',
        puzzle_streak_lbl: 'Chuỗi:',
        puzzle_record_lbl: 'Kỷ lục:',
        puzzle_you_played: 'Bạn đã đi:',
        puzzle_blunder_desc: '(Nước sai lầm nghiêm trọng)',
        puzzle_miss_desc: '(Bỏ lỡ cơ hội)',
        puzzle_white_turn: 'Lượt Trắng đi',
        puzzle_black_turn: 'Lượt Đen đi',
        puzzle_initial_prompt: 'Tìm nước đi tốt nhất thay thế cho nước sai lầm trước đó của bạn!',
        puzzle_success_msg: '🎉 Tuyệt vời! Bạn đã tìm ra nước đi tối ưu!',
        puzzle_opponent_reply: '🎉 Hoàn thành câu đố! Đối thủ đã đi đáp trả và bạn hoàn toàn kiểm soát thế trận.',
        puzzle_wrong_msg: '❌ Nước đi chưa tối ưu! Hãy quan sát kỹ thế cờ và thử lại.',
        puzzle_repeated_blunder: '⚠️ Cẩn thận! Đây chính là nước sai lầm bạn từng đi trong ván cờ này! Hãy thử nước khác.',
        puzzle_btn_hint: 'Gợi ý quân cờ',
        puzzle_hint_msg: '💡 Gợi ý: Hãy quan sát kỹ quân cờ tại ô {0}!',
        puzzle_btn_solution: 'Xem đáp án',
        puzzle_solution_msg: 'Đáp án tối ưu là: {0}. Hãy ghi nhớ thế cờ này!',
        puzzle_btn_skip: 'Bỏ qua',
        puzzle_btn_next: 'Câu tiếp theo',
        puzzle_counter_format: 'Câu đố {0} / {1}',
        puzzle_btn_review_game: 'Mở ván cờ này',
        puzzle_empty_title: 'Chưa có câu đố nào',
        puzzle_empty_desc: 'Kho câu đố sẽ tự động thu thập từ các nước đi sai lầm (Blunder / Miss) trong các ván cờ đã phân tích. Hãy tải và phân tích vài ván cờ để bắt đầu luyện tập!',
        puzzle_btn_open_games: 'Mở danh sách ván đấu',

        // Game Over Banner & King Badges
        game_over_victory: 'Chiến thắng xuất sắc!',
        game_over_defeat: 'Thất bại',
        game_over_draw: 'Hòa cờ',
        game_over_win_msg: 'Chúc mừng bạn đã làm chủ thế trận và giành chiến thắng!',
        game_over_loss_msg: 'Đừng nản lòng! Hãy xem lại các nước sai lầm để rút kinh nghiệm và cố gắng ở ván sau nhé.',
        game_over_draw_msg: 'Một ván đấu cân tài cân sức!',
        game_over_btn_reanalyze: 'Phân tích lại ván này',
        game_over_btn_play_bot: 'Đấu tiếp với Bot',
        game_over_btn_new_bot: 'Đấu ván mới với Bot',
        game_over_btn_exit_bot: 'Thoát chế độ Bot',
        game_over_crown_title: 'Chiến thắng (Quán quân)',
        game_over_loser_title: 'Thất bại',

        // Batch Analysis
        batch_start: 'Chạy phân tích nền',
        batch_stop: 'Dừng lại',
        batch_running: 'Đang phân tích ván {0} / {1}...',
        batch_paused: 'Đã tạm dừng phân tích nền.',
        batch_done: 'Đã hoàn tất phân tích toàn bộ tháng!',
        batch_no_games: 'Chưa có danh sách ván cờ.',

        // Settings Modal
        settings_title: 'Cài đặt',
        settings_subtitle: 'Tùy biến giao diện, font chữ, bàn cờ, quân cờ và engine phân tích',
        settings_btn: 'Cài đặt',
        settings_tab_ui: 'Giao diện & Font',
        settings_tab_board: 'Bàn cờ & Quân cờ',
        settings_tab_engine: 'Trò chơi & Engine',
        settings_tab_data: 'Hệ thống & Dữ liệu',
        settings_theme_label: 'Giao diện hiển thị',
        settings_theme_desc: 'Chuyển đổi giữa chế độ nền Tối và nền Sáng bảo vệ mắt',
        settings_theme_dark: 'Tối',
        settings_theme_light: 'Sáng',
        settings_lang_label: 'Ngôn ngữ giao diện',
        settings_lang_desc: 'Lựa chọn ngôn ngữ sử dụng trên toàn bộ trang và huấn luyện viên',
        settings_font_label: 'Font chữ ứng dụng',
        settings_font_desc: 'Chọn phong cách Typography ưa thích từ Google Fonts cao cấp',
        settings_font_default: 'Mặc định',
        settings_board_theme: 'Mẫu bàn cờ',
        settings_board_desc: 'Chọn màu sắc và chất liệu bàn cờ trực quan',
        settings_piece_theme: 'Bộ quân cờ',
        settings_piece_desc: 'Chọn bộ thiết kế quân cờ từ Chess.com, Lichess và Vector cổ điển',
        settings_mini_preview_hint: 'Xem trước thời gian thực — Bấm chọn bàn cờ hoặc quân cờ bên dưới để thay đổi lập tức!',
        settings_display_options: 'Tùy chọn hiển thị bàn cờ',
        settings_coordinates: 'Tọa độ bàn cờ (1-8, a-h)',
        settings_coords_desc: 'Hiển thị ký hiệu hàng và cột ở mép bàn cờ',
        settings_legal_hints: 'Chấm gợi ý nước đi hợp lệ',
        settings_legal_desc: 'Hiển thị các ô có thể đi khi nhấp chuột chọn quân',
        settings_highlight_last: 'Tô sáng nước đi cuối (Highlight)',
        settings_highlight_desc: 'Đánh dấu ô xuất phát và ô đích của nước vừa đi',
        settings_auto_flip: 'Tự động xoay bàn cờ theo màu quân',
        settings_autoflip_desc: 'Tự động xoay góc nhìn theo phía người dùng (Trắng/Đen) khi chọn ván cờ',
        settings_sound: 'Âm thanh (Sound Effects)',
        settings_sound_desc: 'Phát âm thanh khi đi quân, ăn quân, chiếu Vua và kết thúc ván',
        settings_anim_speed: 'Tốc độ di chuyển quân',
        settings_anim_desc: 'Thời gian chuyển động lướt quân cờ trên bàn đấu',
        settings_speed_instant: 'Tức thì (0ms)',
        settings_speed_fast: 'Nhanh (150ms)',
        settings_speed_standard: 'Chuẩn (280ms)',
        settings_speed_smooth: 'Mượt (450ms)',
        settings_review_depth: 'Độ sâu phân tích (Review Depth)',
        settings_depth_desc: 'Độ sâu tính toán của Stockfish khi chạy Game Review toàn ván',
        settings_move_time: 'Thời gian suy nghĩ mỗi nước',
        settings_movetime_desc: 'Giới hạn thời gian tối đa Stockfish tính toán cho mỗi nước cờ',
        settings_arrows_badges: 'Mũi tên & Huy hiệu trên bàn cờ',
        settings_best_arrow: 'Mũi tên gợi ý nước đi tốt nhất',
        settings_arrow_desc: 'Vẽ mũi tên vector xanh lá chỉ rõ nước cờ tối ưu của Stockfish',
        settings_eval_badges: 'Huy hiệu đánh giá trên ô cờ',
        settings_badge_desc: 'Gắn biểu tượng Brilliant (!!), Great (!), Best (★), Blunder (??)... vào ô đích',
        settings_default_user: 'Tài khoản Chess.com mặc định',
        settings_user_desc: 'Tự động tải danh sách ván đấu, nhận diện màu quân và thống kê sự nghiệp theo người chơi này',
        settings_save_user: 'Lưu & Tải lại',
        settings_cache_mgmt: 'Quản lý bộ nhớ đệm phân tích (IndexedDB)',
        settings_clear_cache_btn: 'Xóa bộ nhớ phân tích',
        settings_reset_label: 'Khôi phục cài đặt gốc',
        settings_reset_desc: 'Đưa toàn bộ tùy biến giao diện, font chữ, bàn cờ, âm thanh và engine về mặc định ban đầu',
        settings_reset_btn: 'Khôi phục mặc định',

        btn_loading: 'Đang tải...',
        progress_analyzing_format: 'Đang phân tích... {0}/{1}',
        progress_paused_format: 'Đã tạm dừng tại {0}/{1} thế cờ',
        progress_done_format: 'Đã phân tích xong {0}/{1} thế cờ',
        progress_cached_format: 'Đã lưu - tải từ bộ nhớ (Độ sâu {0})',
        btn_pause_analysis: 'Dừng phân tích',
        btn_resume_analysis: 'Phân tích tiếp',
        btn_calculating: 'Đang tính...',
        live_engine_off: 'Đã tắt',
        live_engine_off_format: 'Tắt / {0}',
        mistakes_detail_placeholder: '(-- sai lầm, -- bỏ lỡ, -- nặng)',
        trial_counter_format: 'Thử: {0}/{1} (từ nước {2})',
        player_you_suffix: '(Bạn)',
        future_month_error: 'Không thể xem tháng trong tương lai.',
        future_month_error_format: 'Tháng {0}/{1} nằm trong tương lai, không thể tải danh sách ván cờ.',
        analysis_in_progress: 'Đang phân tích ván cờ, vui lòng chờ.',
        clear_cache_success: 'Đã xóa toàn bộ bộ nhớ phân tích thành công.'
    },
    en: {
        page_title: 'Chess Analyzer',
        game_list_title: 'Game List',
        clear_cache: 'Clear Cache',
        fetch_btn: 'Fetch',
        filter_result_all: 'Result: All',
        filter_result_win: 'Win',
        filter_result_loss: 'Loss',
        filter_result_draw: 'Draw',
        filter_time_all: 'Format: All',
        sort_newest: 'Newest',
        loading_games: 'Loading games...',
        cache_saved: 'Saved to cache',
        welcome_title: 'Welcome to Chess.com Game Review',
        welcome_desc: 'Please click the menu button in the top left to choose a game from',
        welcome_latest_game: 'Your Latest Game',
        welcome_analyze_this_game: 'Analyze This Game',
        welcome_month_games: 'Games this month',
        welcome_month_games_format: 'Games in month {0}',
        welcome_win_rate: 'Win Rate',
        welcome_avg_accuracy: 'Average Accuracy',
        welcome_recent_games: 'Recent Games',
        welcome_view_all: 'View All',
        welcome_review: 'Review',
        welcome_analyze: 'Analyze',
        welcome_wins_count: '{0} wins',
        welcome_no_analyzed: 'No analyzed games yet',
        welcome_analyzed_count: '{0} analyzed games',
        welcome_stats_sub: '{0} wins · {1} draws · {2} losses',
        promo_title: 'Choose Promotion Piece',
        promo_queen: 'Queen (Q)',
        promo_rook: 'Rook (R)',
        promo_bishop: 'Bishop (B)',
        promo_knight: 'Knight (N)',
        cancel_move: 'Cancel move',
        game_review: 'Game Review',
        reanalyze: 'Re-analyze',
        copy_pgn: 'Copy PGN',
        copied: 'Copied!',
        pause_analysis: 'Pause',
        your_accuracy: 'Your Accuracy',
        opp_accuracy: "Opponent's Accuracy",
        opening: 'Opening',
        your_mistakes: 'Your Mistakes',
        starting_pos: 'Starting Position',
        white_perspective: "Evaluation from White's perspective",
        black_perspective: "Evaluation from Black's perspective",
        starting_comment: 'Starting position. Click Next or use Right Arrow to view moves.',
        win_prob_white: 'Win Chance (White):',
        win_prob_black: 'Win Chance (Black):',
        move_word: 'Move',
        btn_exit_trial: 'Exit Trial Line',
        btn_best: 'Best Move',
        btn_hint: 'Hint',
        btn_explain: 'Explain',
        btn_prev_mistake: 'Prev Mistake',
        btn_next_mistake: 'Next Mistake',
        hints_title: 'Ideas & Plans',
        tab_moves: 'Moves',
        tab_cls: 'Classify',
        tab_key: 'Key Moves',
        tab_engine: 'Live Engine',
        key_moves_title: 'Key Moves',
        no_game_selected: 'No game selected',
        live_engine: 'Live Engine',
        status_analyzing: 'Analyzing...',
        eval_label: 'Evaluation:',
        best_move_label: 'Best Move:',
        depth_label: 'Depth:',
        ctrl_play: 'Play',
        ctrl_flip: 'Flip',

        cat_brilliant: 'Brilliant',
        cat_great: 'Great',
        cat_book: 'Book',
        cat_best: 'Best',
        cat_excellent: 'Excellent',
        cat_good: 'Good',
        cat_inaccuracy: 'Inaccuracy',
        cat_mistake: 'Mistake',
        cat_miss: 'Miss',
        cat_blunder: 'Blunder',

        phase_opening: 'Opening',
        phase_middlegame: 'Middlegame',
        phase_endgame: 'Endgame',
        moves_range_opening: 'Moves 1 - 10',
        moves_range_middlegame: 'Moves 11 - 25',
        moves_range_endgame: 'Moves 26+',

        accuracy: 'Accuracy',
        move_classification: 'Move Classification',
        game_phases: 'Game Phases',
        mistakes_detail: '({0} mistakes, {1} misses, {2} blunders)',
        waiting_stockfish: 'Waiting for Stockfish analysis...',
        calculating_eval: 'Calculating position evaluation...',
        analyzing: 'Analyzing',
        you_played: 'you played',
        opponent_played: 'opponent played',
        trial_move: 'Trial',
        btn_hide_best: 'Hide Best Move',
        btn_best_move: 'Best Move',
        btn_close_explain: 'Close Explanation',
        btn_close_hints: 'Close Hints',
        btn_hints_lbl: 'Hint',
        btn_play_lbl: 'Play',
        btn_pause_lbl: 'Pause',
        trial_pos_desc: 'Viewing trial line (from move {0}). Click "Exit Trial Line" to return.',
        trial_win_loss: ' (Lost {0}% win chance)',
        no_moves_phase: 'No moves',
        no_moves_game: 'This game has no moves.',
        thinking_time: 'Thinking time: {0}',

        // Months
        month_01: 'Jan',
        month_02: 'Feb',
        month_03: 'Mar',
        month_04: 'Apr',
        month_05: 'May',
        month_06: 'Jun',
        month_07: 'Jul',
        month_08: 'Aug',
        month_09: 'Sep',
        month_10: 'Oct',
        month_11: 'Nov',
        month_12: 'Dec',

        // Time classes
        filter_time_rapid: 'Rapid',
        filter_time_blitz: 'Blitz',
        filter_time_bullet: 'Bullet',
        filter_time_daily: 'Daily',

        // Board themes
        board_green: 'Board: Green',
        board_wood: 'Board: Natural Wood',
        board_walnut: 'Board: Walnut',
        board_dark: 'Board: Dark Charcoal',
        board_ocean: 'Board: Ocean Blue',
        board_marble: 'Board: Marble',
        board_glass: 'Board: Frosted Glass',
        board_neon: 'Board: Neon Glow',
        board_minimalist: 'Board: Minimalist',
        board_parchment: 'Board: Parchment',
        board_ice: 'Board: Ice',

        // Piece themes
        piece_classic: 'Pieces: Classic (Vector SVG)',
        piece_neo: 'Pieces: Neo (Chess.com)',
        piece_game_room: 'Pieces: Game Room (Wood)',
        piece_glass: 'Pieces: Glass',
        piece_alpha: 'Pieces: Alpha (Modern)',
        piece_bases: 'Pieces: Bases (Flat)',
        piece_cburnett: 'Pieces: Cburnett (Lichess)',
        piece_merida: 'Pieces: Merida (Traditional)',
        piece_california: 'Pieces: California (Elegant)',
        piece_cardinal: 'Pieces: Cardinal (Sharp)',
        piece_dubrovny: 'Pieces: Dubrovny (Classic Wood)',

        // Depths
        depth_16: 'Depth 16 (Fast - Under 1 min)',
        depth_18: 'Depth 18 (Balanced)',
        depth_20: 'Depth 20 (Deep)',
        depth_22: 'Depth 22 (Very Deep)',
        live_depth_10: '10 (Fast)',
        live_depth_12: '12',
        live_depth_13: '13 (Standard)',
        live_depth_15: '15 (Deep)',
        live_depth_18: '18 (Very Deep)',

        // Theme toggle
        theme_dark: 'Theme: Dark',
        theme_light: 'Theme: Light',

        // Game list & players
        badge_analyzed: 'Analyzed',
        no_games_found: 'No games found.',
        white_player_lbl: 'White',
        black_player_lbl: 'Black',

        // Lifetime Stats
        lifetime_stats_btn: 'Stats',
        lifetime_stats_title: 'Lifetime Statistics',
        stats_subtitle: 'Career overview from your played and analyzed games',
        stats_total_games: 'Total Games',
        stats_wld_ratio: 'Win / Draw / Loss Ratio',
        stats_win: 'Win',
        stats_draw: 'Draw',
        stats_loss: 'Loss',
        stats_career_accuracy: 'Career Average Accuracy',
        stats_based_on_games: 'Based on {0} analyzed games',
        stats_no_analysis_yet: 'No analyzed games yet',
        stats_move_badges: 'Cumulative Move Badges',
        stats_favorite_openings: 'Favorite Openings',
        stats_opening_name: 'Opening',
        stats_games_count: 'Games',
        stats_win_rate: 'Win Rate',
        stats_no_games: 'No game data available.',
        stats_white_accuracy: 'As White: {0}%',
        stats_black_accuracy: 'As Black: {0}%',
        stats_btn_close: 'Close',

        // Performance Rating
        performance_rating: 'Performance Rating',
        performance_short: 'Performance',
        perf_diff_positive: '+{0} vs current rating ({1})',
        perf_diff_negative: '{0} vs current rating ({1})',
        perf_diff_equal: 'Equal to current rating ({0})',
        perf_waiting: 'Waiting for analysis...',

        // Play against Bot
        btn_play_bot: 'Play vs Bot',
        btn_exit_bot: 'Exit Bot Game',
        btn_bot_undo: 'Take back last move (Undo 2 moves)',
        bot_undo_btn: 'Undo',
        bot_no_moves: 'No moves played yet against Bot.',
        bot_branch_tag: 'Bot Match Branch',
        bot_eval_feedback: 'Your move: {0}',
        bot_mode_title: 'Playing against Bot (Stockfish)',
        bot_your_turn: 'Your turn ({0})',
        bot_thinking: 'Bot is thinking...',
        bot_in_check: 'You are in check! Make your move ({0})...',
        bot_win_checkmate: 'Checkmate! You defeated the Bot!',
        bot_loss_checkmate: 'Checkmate! Bot won the game.',
        bot_draw_stalemate: 'Draw by Stalemate!',
        bot_draw_repetition: 'Draw by Threefold Repetition!',
        bot_draw_material: 'Draw by Insufficient Material!',
        bot_draw_50moves: 'Draw by 50-move rule!',
        bot_draw_generic: 'Draw!',
        bot_moves_count: '{0} moves',
        bot_check_user: 'You are in check!',
        bot_check_bot: 'Bot is in check!',
        select_bot_elo_title: 'Select Bot Elo Level',
        bot_elo_800: 'Novice (~800 Elo)',
        bot_elo_1200: 'Intermediate (~1200 Elo)',
        bot_elo_1600: 'Advanced (~1600 Elo)',
        bot_elo_2000: 'Master (~2000 Elo)',
        bot_elo_2400: 'Grandmaster (~2400 Elo)',
        custom_import_btn: 'Import PGN / FEN',
        custom_import_btn_title: 'Import custom PGN game or FEN position',
        custom_import_title: 'Import PGN / FEN',
        custom_import_subtitle: 'Paste a full PGN game notation or a FEN position string to analyze or play vs Bot',
        custom_import_input_label: 'PGN notation or FEN string:',
        custom_import_placeholder: 'Paste full PGN game notation or FEN string here...',
        custom_import_color_label: 'Your viewpoint / piece color:',
        custom_color_auto: 'Auto (From PGN / FEN)',
        custom_color_white: 'White',
        custom_color_black: 'Black',
        custom_import_submit: 'Load & Analyze',
        cancel_btn: 'Cancel',
        custom_import_error_empty: 'Please enter a PGN game notation or a FEN string.',
        custom_import_error_invalid: 'Invalid PGN or FEN format. Please check the notation syntax.',
        custom_import_success_fen: 'FEN position loaded successfully!',
        custom_import_success_pgn: 'PGN game loaded successfully!',
        live_engine_analyzing: 'Analyzing',
        live_engine_done: 'Done',

        // Personal Puzzles
        personal_puzzles_btn: 'Puzzles',
        personal_puzzles_btn_title: 'Personal puzzle generator from your mistakes',
        personal_puzzles_title: 'Personal Puzzles',
        personal_puzzles_subtitle: 'Tactical training from your own in-game blunders and misses',
        puzzle_streak_lbl: 'Streak:',
        puzzle_record_lbl: 'Best:',
        puzzle_you_played: 'You played:',
        puzzle_blunder_desc: '(Severe blunder)',
        puzzle_miss_desc: '(Missed opportunity)',
        puzzle_white_turn: 'White to move',
        puzzle_black_turn: 'Black to move',
        puzzle_initial_prompt: 'Find the best move replacing your previous blunder!',
        puzzle_success_msg: '🎉 Brilliant! You found the optimal move!',
        puzzle_opponent_reply: '🎉 Puzzle complete! Opponent responded and you have the advantage.',
        puzzle_wrong_msg: '❌ Not the best move! Take another look and try again.',
        puzzle_repeated_blunder: '⚠️ Careful! This is the exact blunder you played in this game! Try another move.',
        puzzle_btn_hint: 'Piece Hint',
        puzzle_hint_msg: '💡 Hint: Look closely at the piece on square {0}!',
        puzzle_btn_solution: 'Show Solution',
        puzzle_solution_msg: 'The optimal move is: {0}. Remember this pattern!',
        puzzle_btn_skip: 'Skip',
        puzzle_btn_next: 'Next Puzzle',
        puzzle_counter_format: 'Puzzle {0} of {1}',
        puzzle_btn_review_game: 'Review this game',
        puzzle_empty_title: 'No Personal Puzzles Yet',
        puzzle_empty_desc: 'Personal puzzles are generated automatically from blunders and misses in your analyzed games. Analyze some games to start training!',
        puzzle_btn_open_games: 'Open Games Drawer',

        // Game Over Banner & King Badges
        game_over_victory: 'Victory!',
        game_over_defeat: 'Defeat',
        game_over_draw: 'Draw',
        game_over_win_msg: 'Congratulations on taking control of the game and winning!',
        game_over_loss_msg: "Don't be discouraged! Review the mistakes to learn and do better next time.",
        game_over_draw_msg: 'A closely fought contest!',
        game_over_btn_reanalyze: 'Reanalyze Game',
        game_over_btn_play_bot: 'Play vs Bot',
        game_over_btn_new_bot: 'New Bot Game',
        game_over_btn_exit_bot: 'Exit Bot Mode',
        game_over_crown_title: 'Winner',
        game_over_loser_title: 'Defeated',

        // Batch Analysis
        batch_start: 'Start Batch Analysis',
        batch_stop: 'Stop',
        batch_running: 'Analyzing game {0} / {1}...',
        batch_paused: 'Batch analysis paused.',
        batch_done: 'All monthly games analyzed!',
        batch_no_games: 'No games to analyze.',

        // Settings Modal
        settings_title: 'Settings',
        settings_subtitle: 'Customize appearance, font, chessboard, pieces, and engine review',
        settings_btn: 'Settings',
        settings_tab_ui: 'Appearance & Font',
        settings_tab_board: 'Board & Pieces',
        settings_tab_engine: 'Game & Engine',
        settings_tab_data: 'System & Data',
        settings_theme_label: 'Color Theme',
        settings_theme_desc: 'Switch between Dark mode and Light mode for comfort',
        settings_theme_dark: 'Dark',
        settings_theme_light: 'Light',
        settings_lang_label: 'Language',
        settings_lang_desc: 'Select preferred interface language for app and coach',
        settings_font_label: 'Application Font',
        settings_font_desc: 'Choose typography from modern Google Fonts',
        settings_font_default: 'Default',
        settings_board_theme: 'Chessboard Theme',
        settings_board_desc: 'Select visual board colors and textures',
        settings_piece_theme: 'Piece Set',
        settings_piece_desc: 'Choose piece set from Chess.com, Lichess, and Vector designs',
        settings_mini_preview_hint: 'Real-time Live Preview — Click any board or piece set below to see immediate updates!',
        settings_display_options: 'Board Display Options',
        settings_coordinates: 'Board Coordinates (1-8, a-h)',
        settings_coords_desc: 'Show rank and file numbers along board edges',
        settings_legal_hints: 'Legal Move Dots',
        settings_legal_desc: 'Highlight legal target squares when a piece is clicked',
        settings_highlight_last: 'Highlight Last Move',
        settings_highlight_desc: 'Highlight origin and destination squares of the latest move',
        settings_auto_flip: 'Auto-flip Board to User Side',
        settings_autoflip_desc: 'Automatically orient board to your player color (White/Black)',
        settings_sound: 'Sound Effects',
        settings_sound_desc: 'Play sounds for moves, captures, checks, and game over',
        settings_anim_speed: 'Piece Animation Speed',
        settings_anim_desc: 'Smooth sliding duration when pieces move',
        settings_speed_instant: 'Instant (0ms)',
        settings_speed_fast: 'Fast (150ms)',
        settings_speed_standard: 'Standard (280ms)',
        settings_speed_smooth: 'Smooth (450ms)',
        settings_review_depth: 'Stockfish Review Depth',
        settings_depth_desc: 'Search depth used during full game reviews',
        settings_move_time: 'Think Time per Move',
        settings_movetime_desc: 'Maximum calculation time per move allowed for Stockfish',
        settings_arrows_badges: 'Arrows & Badges on Board',
        settings_best_arrow: 'Best Move Arrow',
        settings_arrow_desc: 'Render green vector arrow indicating engine best move',
        settings_eval_badges: 'Square Evaluation Badges',
        settings_badge_desc: 'Attach Brilliant (!!), Great (!), Best (★), Blunder (??)... on squares',
        settings_default_user: 'Default Chess.com Username',
        settings_user_desc: 'Automatically fetch games, identify your side and compute lifetime stats',
        settings_save_user: 'Save & Reload',
        settings_cache_mgmt: 'Analysis Cache Management (IndexedDB)',
        settings_clear_cache_btn: 'Clear Analysis Cache',
        settings_reset_label: 'Restore Factory Defaults',
        settings_reset_desc: 'Reset all appearance, font, board, sound, and engine settings to defaults',
        settings_reset_btn: 'Restore Defaults',

        btn_loading: 'Loading...',
        progress_analyzing_format: 'Analyzing... {0}/{1}',
        progress_paused_format: 'Paused at position {0}/{1}',
        progress_done_format: 'Analysis completed for {0}/{1} positions',
        progress_cached_format: 'Loaded from cache (Depth {0})',
        btn_pause_analysis: 'Pause Analysis',
        btn_resume_analysis: 'Resume Analysis',
        btn_calculating: 'Calculating...',
        live_engine_off: 'Off',
        live_engine_off_format: 'Off / {0}',
        mistakes_detail_placeholder: '(-- mistakes, -- misses, -- blunders)',
        trial_counter_format: 'Trial: {0}/{1} (from move {2})',
        player_you_suffix: '(You)',
        future_month_error: 'Cannot view future months.',
        future_month_error_format: 'Month {0}/{1} is in the future, cannot load games.',
        analysis_in_progress: 'Game analysis is in progress, please wait.',
        clear_cache_success: 'Analysis cache cleared successfully.'
    }
};

function readStoredSetting(key, fallback = null) {
    try {
        const unifiedRaw = localStorage.getItem('chess_analyzer_settings');
        if (unifiedRaw) {
            const unified = JSON.parse(unifiedRaw);
            if (unified && unified[key] !== undefined && unified[key] !== null) {
                return unified[key];
            }
        }
    } catch (e) { }
    return fallback;
}

let currentLang = 'vi';
try {
    const savedLang = readStoredSetting('lang', null) || localStorage.getItem('chess_lang');
    if (savedLang === 'vi' || savedLang === 'en') {
        currentLang = savedLang;
    }
} catch (e) { }

let currentStats = null;

function t(key, ...args) {
    const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.vi;
    let text = dict[key] !== undefined ? dict[key] : (TRANSLATIONS.vi[key] || key);
    if (args.length > 0) {
        args.forEach((val, idx) => {
            text = text.replace(new RegExp(`\\{${idx}\\}`, 'g'), val);
        });
    }
    return text;
}

function updateThemeButtonText() {
    const btnTheme = document.getElementById('btn-theme');
    if (!btnTheme) return;
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    btnTheme.textContent = currentTheme === 'dark' ? t('theme_dark') : t('theme_light');
}

function applyLanguage(lang) {
    if (lang !== 'vi' && lang !== 'en') lang = 'vi';
    currentLang = lang;
    try {
        localStorage.setItem('chess_lang', lang);
    } catch (e) { }
    if (typeof syncSettingsToUnifiedStorage === 'function') syncSettingsToUnifiedStorage();

    const selectEl = document.getElementById('select-lang');
    if (selectEl && selectEl.value !== lang) {
        selectEl.value = lang;
    }

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (key) {
            el.textContent = t(key);
        }
    });

    document.querySelectorAll('[data-i18n-title]').forEach(el => {
        const key = el.getAttribute('data-i18n-title');
        if (key) {
            el.setAttribute('title', t(key));
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (key) {
            el.setAttribute('placeholder', t(key));
        }
    });

    updateThemeButtonText();

    if (typeof AppState.loadedGames !== 'undefined' && AppState.selectedGameIndex !== null && AppState.loadedGames[AppState.selectedGameIndex]) {
        const g = AppState.loadedGames[AppState.selectedGameIndex];
        if (currentStats) {
            renderStatsTable(currentStats, g);
        }
        const gamePlayersInfo = document.getElementById('game-players-info');
        if (gamePlayersInfo) {
            const whitePlayer = g.userColor === 'w' ? `${g.userUsername} (${g.userRating})` : `${g.opponentUsername} (${g.opponentRating})`;
            const blackPlayer = g.userColor === 'b' ? `${g.userUsername} (${g.userRating})` : `${g.opponentUsername} (${g.opponentRating})`;
            const whiteLabel = t('white_player_lbl');
            const blackLabel = t('black_player_lbl');
            gamePlayersInfo.innerHTML = `<strong>⬜ ${whiteLabel}:</strong> ${escapeHTML(whitePlayer)} &nbsp;|&nbsp; <strong>⬛ ${blackLabel}:</strong> ${escapeHTML(blackPlayer)}`;
        }
        const gameResultBadge = document.getElementById('game-result-badge');
        if (gameResultBadge) {
            const res = (typeof parseChessComResult === 'function') ? parseChessComResult(g.rawResult || g.resultLabel, currentLang) : null;
            if (res) gameResultBadge.textContent = res.label;
        }
    }
    if (typeof updateCoachPanel === 'function') {
        if (typeof isInTrialBranch === 'function' && isInTrialBranch()) {
            updateCoachPanelForTrial();
        } else {
            updateCoachPanel();
        }
    }
    if (typeof renderMoveList === 'function') {
        renderMoveList();
    }
    if (typeof renderKeyMovesList === 'function') {
        renderKeyMovesList();
    }
    if (typeof applyGameListFilters === 'function') {
        applyGameListFilters();
    }
    const statsModal = document.getElementById('lifetime-stats-modal');
    if (statsModal && !statsModal.classList.contains('hidden') && typeof openLifetimeStatsModal === 'function') {
        openLifetimeStatsModal();
    }
    if (typeof isBotGameActive !== 'undefined' && isBotGameActive && typeof updateBotGameUI === 'function') {
        updateBotGameUI();
    }
    if (typeof renderWelcomeDashboard === 'function' && typeof AppState.loadedGames !== 'undefined' && AppState.loadedGames && AppState.loadedGames.length) {
        renderWelcomeDashboard(AppState.loadedGames);
    }
}

if (typeof window !== 'undefined') {
    window.TRANSLATIONS = TRANSLATIONS;
    window.currentLang = currentLang;
    window.t = t;
    window.applyLanguage = applyLanguage;
    window.SVG_ICONS = SVG_ICONS;
    window.CATEGORY_TEXT_SYMBOLS = CATEGORY_TEXT_SYMBOLS;
    window.calculatePerformanceRating = calculatePerformanceRating;
    window.startBotGame = startBotGame;
    window.exitBotGame = exitBotGame;
    window.handleBotUndo = handleBotUndo;
    window.renderBotMoveList = renderBotMoveList;
    window.getBotMovesHistory = () => botMovesHistory;
    window.getIsBotGameActive = () => isBotGameActive;
    window.getBotUserEvalSessionId = () => botUserEvalSessionId;
    window.startBatchAnalysis = startBatchAnalysis;
    window.stopBatchAnalysis = stopBatchAnalysis;
    window.analyzeNextUnanalyzedGame = analyzeNextUnanalyzedGame;
    window.getIsBatchAnalyzing = () => isBatchAnalyzing;
    window.getCurrentBatchIndex = () => currentBatchIndex;
    window.renderWelcomeDashboard = renderWelcomeDashboard;
}

/**
 * Tính toán hiệu suất thi đấu (Performance Rating) ước lượng theo Elo chuẩn Chess.com:
 * Performance Rating = Elo_Đối_thủ + (Accuracy - 50) * 10
 * Phản ánh đúng Accuracy và Elo của đối thủ, không bị trừ phạt vô lý khiến điểm tụt về ~100.
 * @param {number} accuracy - Độ chính xác trung bình ván đấu (0 - 100)
 * @param {number} [mistakes] - Số lượng sai lầm (Mistakes)
 * @param {number} [blunders] - Số lượng sai lầm nặng (Blunders)
 * @param {number|string} [opponentRating] - Hệ số Elo của đối thủ
 * @param {number} [moveCount] - Số lượng nước đi của người chơi trong ván cờ
 * @returns {number} Elo hiệu suất ước tính
 */
function calculatePerformanceRating(accuracy, mistakes = 0, blunders = 0, opponentRating = 1000, moveCount = 0) {
    const oppElo = Math.max(100, Number(opponentRating) || 1000);
    const acc = Math.max(0, Math.min(100, Number(accuracy) || 0));

    // Xác định số nước đi (nếu chưa truyền vào thì thử lấy từ AppState nếu có)
    let moves = Number(moveCount) || 0;
    if (moves <= 0 && typeof AppState !== 'undefined' && Array.isArray(AppState.gamePositions) && AppState.gamePositions.length > 1) {
        moves = Math.floor((AppState.gamePositions.length - 1) / 2);
    }

    // Công thức tính Performance Rating theo chuẩn Chess.com:
    // Performance Rating = Elo_Đối_thủ + (Accuracy - 50) * 10
    // Khi Accuracy đạt mức cao (>85%), hệ số tăng dần để phản ánh trình độ Master/Grandmaster
    let delta = 0;
    if (acc >= 50) {
        if (acc <= 85) {
            delta = (acc - 50) * 10;
        } else {
            delta = 350 + (acc - 85) * 18;
        }
    } else {
        delta = (acc - 50) * 10;
    }

    // Giới hạn (cap) & scale theo độ dài ván cờ (nếu dưới 15 nước, giảm mạnh delta cộng thêm để tránh Elo ảo)
    if (delta > 0 && moves < 15) {
        if (moves <= 0) {
            delta = 0;
        } else {
            const moveScale = Math.max(0.1, moves / 15);
            delta = delta * moveScale;
            const maxShortGameBonus = moves * 25; // Mỗi nước đi tối đa đóng góp +25 Elo bonus
            delta = Math.min(delta, maxShortGameBonus);
        }
    }

    const rawPerformance = oppElo + delta;

    // Giới hạn trong khoảng hợp lý [100 - 3500] và làm tròn tới bội số 10
    const clampedPerf = Math.max(100, Math.min(3500, Math.round(rawPerformance / 10) * 10));

    return clampedPerf;
}

// detectBrilliant được dùng từ classify.js (tránh trùng lặp mã nguồn)

function scaleWinPctForChart(winPct) {
    const normalized = winPct / 100;
    const centered = normalized - 0.5;
    const amplified = 0.5 + centered * 1.65;
    const clamped = Math.max(0, Math.min(1, amplified));
    return clamped * 100;
}

const CUSTOM_SVG_PIECES = (() => {
    const createSvgUri = (innerContent) => {
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45">${innerContent}</svg>`;
        return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
    };
    const wStyle = 'fill="#ffffff" stroke="#1e293b" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"';
    const bStyle = 'fill="#1e293b" stroke="#0f172a" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"';
    const bDetail = 'stroke="#e2e8f0" stroke-width="1.3" stroke-linecap="round" fill="none"';

    return {
        wP: createSvgUri(`<path ${wStyle} d="M 22.5,9 C 19.5,9 17,11.5 17,14.5 C 17,16.8 18.4,18.7 20.4,19.5 C 17,21 14.5,24.5 14.5,29 L 30.5,29 C 30.5,24.5 28,21 24.6,19.5 C 26.6,18.7 28,16.8 28,14.5 C 28,11.5 25.5,9 22.5,9 z M 11.5,33 L 33.5,33 L 33.5,37 L 11.5,37 L 11.5,33 z"/>`),
        bP: createSvgUri(`<path ${bStyle} d="M 22.5,9 C 19.5,9 17,11.5 17,14.5 C 17,16.8 18.4,18.7 20.4,19.5 C 17,21 14.5,24.5 14.5,29 L 30.5,29 C 30.5,24.5 28,21 24.6,19.5 C 26.6,18.7 28,16.8 28,14.5 C 28,11.5 25.5,9 22.5,9 z M 11.5,33 L 33.5,33 L 33.5,37 L 11.5,37 L 11.5,33 z"/><path ${bDetail} d="M 15.5,29 L 29.5,29"/>`),
        wR: createSvgUri(`<g ${wStyle}><path d="M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14"/><path d="M 34,14 L 31,17 L 14,17 L 11,14"/><path d="M 31,17 L 31,29.5 L 14,29.5 L 14,17"/><path d="M 14,29.5 L 12,32 L 33,32 L 31,29.5"/></g>`),
        bR: createSvgUri(`<g ${bStyle}><path d="M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14"/><path d="M 34,14 L 31,17 L 14,17 L 11,14"/><path d="M 31,17 L 31,29.5 L 14,29.5 L 14,17"/><path d="M 14,29.5 L 12,32 L 33,32 L 31,29.5"/></g><path ${bDetail} d="M 14,17 L 31,17 M 14,29.5 L 31,29.5 M 12,32 L 33,32"/>`),
        wN: createSvgUri(`<g ${wStyle}><path d="M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18"/><path d="M 24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 C 9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 16.5,10 L 18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10"/><circle cx="15.5" cy="14.5" r="1.2" fill="#1e293b"/></g>`),
        bN: createSvgUri(`<g ${bStyle}><path d="M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18"/><path d="M 24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 C 9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 16.5,10 L 18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10"/></g><circle cx="15.5" cy="14.5" r="1.3" fill="#e2e8f0"/><path ${bDetail} d="M 16,36 L 37,36"/>`),
        wB: createSvgUri(`<g ${wStyle}><path d="M 9,36 C 12.39,35.03 19.11,36.43 22.5,34 C 25.89,36.43 32.61,35.03 36,36 C 36,36 37.65,36.54 39,38 C 38.32,38.97 37.35,38.99 36,38.5 C 32.61,37.53 25.89,38.96 22.5,37.5 C 19.11,38.96 12.39,37.53 9,38.5 C 7.646,38.99 6.677,38.97 6,38 C 7.354,36.06 9,36 9,36 z"/><path d="M 15,32 C 17.5,34.5 27.5,34.5 30,32 C 30.5,30.5 30,30 30,30 C 30,27.5 27.5,26 27.5,26 C 33,24.5 33.5,14.5 22.5,10.5 C 11.5,14.5 12,24.5 17.5,26 C 17.5,26 15,27.5 15,30 C 15,30 14.5,30.5 15,32 z"/><circle cx="22.5" cy="8" r="2.2"/><path d="M 20,18 L 25,18 M 22.5,15.5 L 22.5,20.5"/></g>`),
        bB: createSvgUri(`<g ${bStyle}><path d="M 9,36 C 12.39,35.03 19.11,36.43 22.5,34 C 25.89,36.43 32.61,35.03 36,36 C 36,36 37.65,36.54 39,38 C 38.32,38.97 37.35,38.99 36,38.5 C 32.61,37.53 25.89,38.96 22.5,37.5 C 19.11,38.96 12.39,37.53 9,38.5 C 7.646,38.99 6.677,38.97 6,38 C 7.354,36.06 9,36 9,36 z"/><path d="M 15,32 C 17.5,34.5 27.5,34.5 30,32 C 30.5,30.5 30,30 30,30 C 30,27.5 27.5,26 27.5,26 C 33,24.5 33.5,14.5 22.5,10.5 C 11.5,14.5 12,24.5 17.5,26 C 17.5,26 15,27.5 15,30 C 15,30 14.5,30.5 15,32 z"/><circle cx="22.5" cy="8" r="2.2"/></g><path ${bDetail} d="M 17.5,26 L 27.5,26 M 15,30 L 30,30 M 20,18 L 25,18 M 22.5,15.5 L 22.5,20.5"/>`),
        wQ: createSvgUri(`<g ${wStyle}><path d="M 9,26 C 17.5,24.5 30,24.5 36,26 L 38.5,13.5 L 31,25 L 30.7,10.9 L 25.5,24.5 L 22.5,10 L 19.5,24.5 L 14.3,10.9 L 14,25 L 6.5,13.5 L 9,26 z"/><path d="M 9,26 C 9,28 10.5,28 11.5,30 C 12.5,31.5 12.5,31 12,33.5 C 10.5,34.5 11,36 11,36 C 9.5,37.5 11,38.5 11,38.5 C 17.5,39.5 27.5,39.5 34,38.5 C 34,38.5 35.5,37.5 34,36 C 34,36 34.5,34.5 33,33.5 C 32.5,31 32.5,31.5 33.5,30 C 34.5,28 36,28 36,26 C 27.5,24.5 17.5,24.5 9,26 z"/><circle cx="6" cy="12" r="1.8"/><circle cx="14" cy="9" r="1.8"/><circle cx="22.5" cy="8" r="1.8"/><circle cx="31" cy="9" r="1.8"/><circle cx="39" cy="12" r="1.8"/></g>`),
        bQ: createSvgUri(`<g ${bStyle}><path d="M 9,26 C 17.5,24.5 30,24.5 36,26 L 38.5,13.5 L 31,25 L 30.7,10.9 L 25.5,24.5 L 22.5,10 L 19.5,24.5 L 14.3,10.9 L 14,25 L 6.5,13.5 L 9,26 z"/><path d="M 9,26 C 9,28 10.5,28 11.5,30 C 12.5,31.5 12.5,31 12,33.5 C 10.5,34.5 11,36 11,36 C 9.5,37.5 11,38.5 11,38.5 C 17.5,39.5 27.5,39.5 34,38.5 C 34,38.5 35.5,37.5 34,36 C 34,36 34.5,34.5 33,33.5 C 32.5,31 32.5,31.5 33.5,30 C 34.5,28 36,28 36,26 C 27.5,24.5 17.5,24.5 9,26 z"/><circle cx="6" cy="12" r="1.8"/><circle cx="14" cy="9" r="1.8"/><circle cx="22.5" cy="8" r="1.8"/><circle cx="31" cy="9" r="1.8"/><circle cx="39" cy="12" r="1.8"/></g><path ${bDetail} d="M 11.5,30 C 18,28.5 27,28.5 33.5,30 M 12,33.5 C 18.5,32.5 26.5,32.5 33,33.5"/>`),
        wK: createSvgUri(`<g ${wStyle}><path d="M 22.5,11.63 L 22.5,6 M 20,8 L 25,8"/><path d="M 22.5,25 C 22.5,25 27,17.5 25.5,14.5 C 25.5,14.5 24.5,12 22.5,12 C 20.5,12 19.5,14.5 19.5,14.5 C 18,17.5 22.5,25 22.5,25"/><path d="M 11.5,37 C 17,40.5 27,40.5 32.5,37 L 32.5,30 C 32.5,30 41.5,25.5 38.5,19.5 C 34.5,13 25,16 22.5,23.5 L 22.5,27 L 22.5,23.5 C 19,16 9.5,13 6.5,19.5 C 3.5,25.5 11.5,29.5 11.5,29.5 L 11.5,37 z"/><path d="M 11.5,30 C 17,27 27,27 32.5,30 M 11.5,33.5 C 17,30.5 27,30.5 32.5,33.5"/></g>`),
        bK: createSvgUri(`<g ${bStyle}><path d="M 22.5,11.63 L 22.5,6 M 20,8 L 25,8"/><path d="M 22.5,25 C 22.5,25 27,17.5 25.5,14.5 C 25.5,14.5 24.5,12 22.5,12 C 20.5,12 19.5,14.5 19.5,14.5 C 18,17.5 22.5,25 22.5,25"/><path d="M 11.5,37 C 17,40.5 27,40.5 32.5,37 L 32.5,30 C 32.5,30 41.5,25.5 38.5,19.5 C 34.5,13 25,16 22.5,23.5 L 22.5,27 L 22.5,23.5 C 19,16 9.5,13 6.5,19.5 C 3.5,25.5 11.5,29.5 11.5,29.5 L 11.5,37 z"/></g><path ${bDetail} d="M 11.5,30 C 17,27 27,27 32.5,30 M 11.5,33.5 C 17,30.5 27,30.5 32.5,33.5 M 11.5,37 C 17,34 27,34 32.5,37"/>`)
    };
})();

// ============================================================================
// 2. BIẾN TOÀN CỤC & DOM
// ============================================================================
// ============================================================================
// 2. TRẠNG THÁI ỨNG DỤNG TẬP TRUNG (CENTRALIZED APPLICATION STATE)
// ============================================================================
const AppState = {
    loadedGames: [],
    selectedGameIndex: null,
    gamePositions: [],
    currentMoveIndex: 0,
    isAnalyzing: false,
    trialBranch: null,

    resetCurrentGame() {
        this.gamePositions = [];
        this.currentMoveIndex = 0;
        this.trialBranch = null;
        this.isAnalyzing = false;
    },
    clearAll() {
        this.loadedGames = [];
        this.selectedGameIndex = null;
        this.gamePositions = [];
        this.currentMoveIndex = 0;
        this.isAnalyzing = false;
        this.trialBranch = null;
    }
};

if (typeof window !== 'undefined') {
    window.AppState = AppState;
    window.getLoadedGames = () => AppState.loadedGames;
    Object.defineProperty(window, 'loadedGames', {
        get: () => AppState.loadedGames,
        set: (v) => { AppState.loadedGames = v; },
        configurable: true
    });
    Object.defineProperty(window, 'selectedGameIndex', {
        get: () => AppState.selectedGameIndex,
        set: (v) => { AppState.selectedGameIndex = v; },
        configurable: true
    });
    Object.defineProperty(window, 'gamePositions', {
        get: () => AppState.gamePositions,
        set: (v) => { AppState.gamePositions = v; },
        configurable: true
    });
    Object.defineProperty(window, 'currentMoveIndex', {
        get: () => AppState.currentMoveIndex,
        set: (v) => { AppState.currentMoveIndex = v; },
        configurable: true
    });
    Object.defineProperty(window, 'isAnalyzing', {
        get: () => AppState.isAnalyzing,
        set: (v) => { AppState.isAnalyzing = v; },
        configurable: true
    });
    Object.defineProperty(window, 'trialBranch', {
        get: () => AppState.trialBranch,
        set: (v) => { AppState.trialBranch = v; },
        configurable: true
    });
}

/**
 * Xác định màu quân của người dùng (Trắng hay Đen) cho ván cờ hiện tại hoặc ván cờ được truyền vào
 * @param {Object} [game] - Đối tượng game, mặc định là AppState.loadedGames[AppState.selectedGameIndex]
 * @returns {'w'|'b'} 'w' nếu Trắng, 'b' nếu Đen
 */
function getCurrentUserColor(game = (AppState.selectedGameIndex !== null && AppState.loadedGames ? AppState.loadedGames[AppState.selectedGameIndex] : null)) {
    if (!game) return 'w';
    if (game.userColor) return game.userColor;
    const defaultUser = (typeof getAppUsername === 'function' ? getAppUsername() : (typeof CHESSCOM_USERNAME !== 'undefined' ? CHESSCOM_USERNAME : '')).toLowerCase();
    if (game.white) {
        const whiteName = (typeof game.white === 'string' ? game.white : (game.white.username || '')).toLowerCase();
        if (whiteName === defaultUser) return 'w';
    }
    if (game.black) {
        const blackName = (typeof game.black === 'string' ? game.black : (game.black.username || '')).toLowerCase();
        if (blackName === defaultUser) return 'b';
    }
    if (game.pgn && typeof game.pgn === 'string') {
        const whiteMatch = game.pgn.match(/\[White\s+"([^"]+)"\]/i);
        if (whiteMatch && whiteMatch[1].toLowerCase() === defaultUser) return 'w';
        const blackMatch = game.pgn.match(/\[Black\s+"([^"]+)"\]/i);
        if (blackMatch && blackMatch[1].toLowerCase() === defaultUser) return 'b';
    }
    return 'w';
}

function isCurrentUserWhite(game = (AppState.selectedGameIndex !== null && AppState.loadedGames ? AppState.loadedGames[AppState.selectedGameIndex] : null)) {
    return getCurrentUserColor(game) === 'w';
}

if (typeof window !== 'undefined') {
    window.getCurrentUserColor = getCurrentUserColor;
    window.isCurrentUserWhite = isCurrentUserWhite;
}
let board = null;
let dragPositionSynced = false;
let analysisSessionId = 0;
let isShowingBestMove = true;
let isShowingExplain = false;
let isShowingHints = false;
let currentHintsData = [];
let pendingPromotion = null;
let selectedSquareForMove = null;
let isBotGameActive = false;
let botGameChess = null;
let botMovesHistory = [];
let botPlayerColor = 'w';
let botThinking = false;
let botMoveCount = 0;
let botUserEvalSessionId = 0;
let currentDepth = 16;
try {
    const savedDepth = readStoredSetting('reviewDepth', null) ?? (localStorage.getItem('chess_review_depth') || localStorage.getItem('chess_analysis_depth'));
    if (savedDepth !== null && savedDepth !== undefined) {
        const parsedDepth = parseInt(savedDepth, 10);
        if (!isNaN(parsedDepth) && parsedDepth >= 10 && parsedDepth <= 30) {
            currentDepth = parsedDepth;
        }
    }
} catch (e) { }

let isAnalysisPaused = false;
let lastCompletedIndex = 0;
let analysisTimerInterval = null;
let elapsedSeconds = 0;
let isLiveEngineEnabled = true;
let currentLiveDepth = 15;
try {
    const savedLiveEn = readStoredSetting('liveEngineEnabled', null) ?? localStorage.getItem('chess_live_engine_enabled');
    if (savedLiveEn !== null) isLiveEngineEnabled = (savedLiveEn === true || savedLiveEn === 'true');
    const savedLiveDepth = readStoredSetting('liveDepth', null) ?? localStorage.getItem('chess_live_depth');
    if (savedLiveDepth !== null) {
        const parsedLive = parseInt(savedLiveDepth, 10);
        if (!isNaN(parsedLive) && parsedLive >= 10 && parsedLive <= 30) currentLiveDepth = parsedLive;
    }
} catch (e) { }
let liveAnalysisSessionId = 0;
let isBatchAnalyzing = false;
let currentBatchIndex = 0;

const btnStartBatch = document.getElementById('btn-start-batch');
const btnStopBatch = document.getElementById('btn-stop-batch');
const batchProgressText = document.getElementById('batch-progress-text');

const headerUsername = document.getElementById('header-username');
if (headerUsername) headerUsername.textContent = (typeof getAppUsername === 'function' ? getAppUsername() : '') || (typeof CHESSCOM_USERNAME !== 'undefined' ? CHESSCOM_USERNAME : '');
const monthSelect = document.getElementById('month');
const yearInput = document.getElementById('year');
const btnFetch = document.getElementById('btn-fetch');
const btnPrevMonth = document.getElementById('btn-prev-month');
const btnNextMonth = document.getElementById('btn-next-month');
const statusMessage = document.getElementById('status-message');
const gameListContainer = document.getElementById('game-list');
const gameCountSpan = document.getElementById('game-count');
const btnClearAllCache = document.getElementById('btn-clear-all-cache');
const filterResult = document.getElementById('filter-result');
const filterTimeClass = document.getElementById('filter-time-class');
const btnToggleSort = document.getElementById('btn-toggle-sort');
const sortIcon = document.getElementById('sort-icon');
const sortLabel = document.getElementById('sort-label');
let currentFilterResult = 'all';
let currentFilterTimeClass = 'all';
let currentSortOrder = 'newest';

const reviewPlaceholder = document.getElementById('review-placeholder');
const reviewContent = document.getElementById('review-content');
const gameInfoBar = document.getElementById('game-info-bar');
const gamePlayersInfo = document.getElementById('game-players-info');
const cacheStatusBadge = document.getElementById('cache-status-badge');
const btnReanalyze = document.getElementById('btn-reanalyze');
const gameResultBadge = document.getElementById('game-result-badge');
const moveListContainer = document.getElementById('move-list');
const moveCounterSpan = document.getElementById('move-counter');
const boardOverlaySvg = document.getElementById('board-overlay-svg');
const evalBar = document.getElementById('eval-bar');
const evalBarWhite = document.getElementById('eval-bar-white');
const evalBarBlack = document.getElementById('eval-bar-black');
const evalScoreWhite = document.getElementById('eval-score-white');
const evalScoreBlack = document.getElementById('eval-score-black');
const evalChartSvg = document.getElementById('eval-chart-svg');

const playerTopAvatar = document.getElementById('player-top-avatar');
const playerTopName = document.getElementById('player-top-name');
const playerTopRating = document.getElementById('player-top-rating');
const playerTopCaptured = document.getElementById('player-top-captured');
const playerTopAdvantage = document.getElementById('player-top-advantage');
const playerTopClock = document.getElementById('player-top-clock');

const playerBottomAvatar = document.getElementById('player-bottom-avatar');
const playerBottomName = document.getElementById('player-bottom-name');
const playerBottomRating = document.getElementById('player-bottom-rating');
const playerBottomCaptured = document.getElementById('player-bottom-captured');
const playerBottomAdvantage = document.getElementById('player-bottom-advantage');
const playerBottomClock = document.getElementById('player-bottom-clock');

const btnOpenChessCom = document.getElementById('btn-open-chesscom');
const btnCopyPgn = document.getElementById('btn-copy-pgn');
const copyToast = document.getElementById('copy-toast');
let analyzedGameUrls = new Set();
const progressBox = document.getElementById('analysis-progress-box');
const progressText = document.getElementById('analysis-progress-text');
const progressPercent = document.getElementById('analysis-progress-percent');
const progressFill = document.getElementById('analysis-progress-fill');
const analysisElapsedTime = document.getElementById('analysis-elapsed-time');
const btnPauseAnalysis = document.getElementById('btn-pause-analysis');
const selectDepth = document.getElementById('select-depth');

const coachPanel = document.getElementById('coach-panel');
const coachCommentText = document.getElementById('coach-comment-text');
const coachPosDesc = document.getElementById('coach-pos-desc');
const coachEvalBadge = document.getElementById('coach-eval-badge');
const btnCoachBest = document.getElementById('btn-coach-best');
const btnCoachHint = document.getElementById('btn-coach-hint');
const btnCoachExplain = document.getElementById('btn-coach-explain');
const btnPrevMistake = document.getElementById('btn-prev-mistake');
const btnNextMistake = document.getElementById('btn-next-mistake');
const coachExplainBox = document.getElementById('coach-explain-box');
const coachHintsBox = document.getElementById('coach-hints-box');
const hintsList = document.getElementById('hints-list');
const btnCloseHints = document.getElementById('btn-close-hints');
const btnCoachExitTrial = document.getElementById('btn-coach-exit-trial');
const btnPlayBot = document.getElementById('btn-play-bot');
const btnExitBot = document.getElementById('btn-exit-bot');
const botGamePanel = document.getElementById('bot-game-panel');
const botMovesCounter = document.getElementById('bot-moves-counter');
const botStatusMessage = document.getElementById('bot-status-message');
const promotionModal = document.getElementById('promotion-modal');
const btnCancelPromotion = document.getElementById('btn-cancel-promotion');

const liveEngineStatusBadge = document.getElementById('live-engine-status-badge');
const liveEvalText = document.getElementById('live-eval-text');
const liveBestMoveText = document.getElementById('live-best-move-text');
const liveDepthText = document.getElementById('live-depth-text');
const toggleLiveEngine = document.getElementById('toggle-live-engine');
const selectLiveDepth = document.getElementById('select-live-depth');

const keyMovesList = document.getElementById('key-moves-list');
const keyMovesCountBadge = document.getElementById('key-moves-count');

const gameDrawer = document.getElementById('game-drawer');
const scrim = document.getElementById('scrim');
const btnOpenDrawer = document.getElementById('btn-open-drawer');
const btnCloseDrawer = document.getElementById('btn-close-drawer');
const btnTheme = document.getElementById('btn-theme');
const kpiOpening = document.getElementById('kpi-opening');
const coachMoveTitle = document.getElementById('coach-move-title');
const currentWinProb = document.getElementById('current-win-prob');
const classificationBars = document.getElementById('classification-bars');

const btnStart = document.getElementById('btn-start');
const btnPrev = document.getElementById('btn-prev');
const btnPlay = document.getElementById('btn-play');
const btnNext = document.getElementById('btn-next');
const btnEnd = document.getElementById('btn-end');
const btnFlip = document.getElementById('btn-flip');

function setDrawerOpen(isOpen) {
    if (gameDrawer) gameDrawer.classList.toggle('open', isOpen);
    if (scrim) scrim.classList.toggle('on', isOpen);
    if (btnOpenDrawer) {
        btnOpenDrawer.setAttribute('aria-expanded', String(isOpen));
        btnOpenDrawer.classList.toggle('active', isOpen);
        btnOpenDrawer.setAttribute('aria-label', isOpen ? 'Đóng danh sách ván cờ' : 'Mở danh sách ván cờ');
        btnOpenDrawer.setAttribute('title', isOpen ? 'Đóng danh sách ván cờ' : 'Mở danh sách ván cờ');
    }
}
function openGameDrawer() { setDrawerOpen(true); }
function closeGameDrawer() { setDrawerOpen(false); }
function getCategoryVarName(category) { return CATEGORY_CSS_VAR[category] || 'mute'; }

function escapeHTML(str) {
    return String(str || '').replace(/[&<>'"]/g, match => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
    }[match]));
}
if (typeof window !== 'undefined') window.escapeHTML = escapeHTML;

function formatWinProbability(evalObj, userColor = getCurrentUserColor()) {
    if (!evalObj) return '--%';
    let whitePct = 50;
    if (evalObj.mateWhite !== null && evalObj.mateWhite !== undefined) {
        if (evalObj.mateWhite > 0) whitePct = 100;
        else if (evalObj.mateWhite < 0) whitePct = 0;
        else whitePct = (evalObj.cpWhite > 0 ? 100 : (evalObj.cpWhite < 0 ? 0 : 50));
    } else if (evalObj.cpWhite !== null && evalObj.cpWhite !== undefined) {
        whitePct = calculateWinPercentage(evalObj.cpWhite);
    } else {
        return '--%';
    }
    const finalPct = (userColor === 'b') ? (100 - whitePct) : whitePct;
    return `${finalPct.toFixed(1).replace('.', ',')}%`;
}

// extractOpeningNameFromPGN được dùng từ stats.js (tránh trùng lặp mã nguồn)

// ============================================================================
// 3. KHỞI TẠO BÀN CỜ, ÂM THANH
// ============================================================================
function initDefaultDate() {
    const now = new Date();
    monthSelect.value = String(now.getMonth() + 1).padStart(2, '0');
    yearInput.value = now.getFullYear();
    updateMonthNavButtons();
}

function isFutureMonth(year, month) {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;
    const checkYear = parseInt(year, 10);
    const checkMonth = parseInt(month, 10);
    if (checkYear > currentYear) return true;
    if (checkYear === currentYear && checkMonth > currentMonth) return true;
    return false;
}

function updateMonthNavButtons() {
    const currentYear = parseInt(yearInput.value, 10);
    const currentMonth = parseInt(monthSelect.value, 10);
    let nextMonth = currentMonth + 1;
    let nextYear = currentYear;
    if (nextMonth > 12) { nextMonth = 1; nextYear += 1; }
    if (btnNextMonth) {
        const nextIsFuture = isFutureMonth(nextYear, nextMonth);
        btnNextMonth.disabled = nextIsFuture;
        btnNextMonth.title = nextIsFuture ? 'Không thể xem tháng trong tương lai' : 'Xem tháng sau';
    }
}

function goToPrevMonth() {
    let year = parseInt(yearInput.value, 10);
    let month = parseInt(monthSelect.value, 10);
    month -= 1;
    if (month < 1) { month = 12; year -= 1; }
    monthSelect.value = String(month).padStart(2, '0');
    yearInput.value = year;
    updateMonthNavButtons();
    handleFetchGames();
}

function goToNextMonth() {
    let year = parseInt(yearInput.value, 10);
    let month = parseInt(monthSelect.value, 10);
    month += 1;
    if (month > 12) { month = 1; year += 1; }
    if (isFutureMonth(year, month)) {
        showStatus(t('future_month_error'), 'info');
        updateMonthNavButtons();
        return;
    }
    monthSelect.value = String(month).padStart(2, '0');
    yearInput.value = year;
    updateMonthNavButtons();
    handleFetchGames();
}

function showStatus(message, type = 'info') {
    statusMessage.textContent = message;
    statusMessage.className = `status-message ${type}`;
}
function hideStatus() {
    statusMessage.className = 'status-message hidden';
    statusMessage.textContent = '';
}

const SoundManager = (function () {
    let audioCtx = null;
    let isSoundEnabled = true;
    try {
        const savedSound = readStoredSetting('sound', null) ?? localStorage.getItem('chess_sound_enabled');
        if (savedSound !== null && savedSound !== undefined) isSoundEnabled = (savedSound === true || savedSound === 'true');
    } catch (e) { }

    function getAudioContext() {
        if (!audioCtx) {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            if (AudioContextClass) audioCtx = new AudioContextClass();
        }
        if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume().catch(() => { });
        return audioCtx;
    }
    return {
        setEnabled: function (val) {
            isSoundEnabled = Boolean(val);
            try { localStorage.setItem('chess_sound_enabled', String(val)); } catch (e) { }
            if (typeof syncSettingsToUnifiedStorage === 'function') syncSettingsToUnifiedStorage();
        },
        isEnabled: function () {
            return isSoundEnabled;
        },
        playMove: function () {
            if (!isSoundEnabled) return;
            try {
                const ctx = getAudioContext(); if (!ctx) return;
                const now = ctx.currentTime;
                const clickOsc = ctx.createOscillator(); const clickGain = ctx.createGain();
                clickOsc.type = 'triangle'; clickOsc.frequency.setValueAtTime(650, now); clickOsc.frequency.exponentialRampToValueAtTime(140, now + 0.02);
                clickGain.gain.setValueAtTime(0.35, now); clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);
                clickOsc.connect(clickGain); clickGain.connect(ctx.destination); clickOsc.start(now); clickOsc.stop(now + 0.02);
                const bodyOsc = ctx.createOscillator(); const bodyGain = ctx.createGain();
                bodyOsc.type = 'sine'; bodyOsc.frequency.setValueAtTime(218, now);
                bodyGain.gain.setValueAtTime(0.24, now); bodyGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);
                bodyOsc.connect(bodyGain); bodyGain.connect(ctx.destination); bodyOsc.start(now); bodyOsc.stop(now + 0.045);
            } catch (err) { }
        },
        playCapture: function () {
            if (!isSoundEnabled) return;
            try {
                const ctx = getAudioContext(); if (!ctx) return;
                const now = ctx.currentTime;
                const osc1 = ctx.createOscillator(); const gain1 = ctx.createGain();
                osc1.type = 'sine'; osc1.frequency.setValueAtTime(320, now); osc1.frequency.exponentialRampToValueAtTime(110, now + 0.12);
                gain1.gain.setValueAtTime(0.38, now); gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
                osc1.connect(gain1); gain1.connect(ctx.destination); osc1.start(now); osc1.stop(now + 0.12);
                const osc2 = ctx.createOscillator(); const gain2 = ctx.createGain();
                osc2.type = 'triangle'; osc2.frequency.setValueAtTime(600, now); osc2.frequency.exponentialRampToValueAtTime(80, now + 0.06);
                gain2.gain.setValueAtTime(0.32, now); gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
                osc2.connect(gain2); gain2.connect(ctx.destination); osc2.start(now); osc2.stop(now + 0.06);
            } catch (err) { }
        },
        playIllegal: function () {
            if (!isSoundEnabled) return;
            try {
                const ctx = getAudioContext(); if (!ctx) return;
                const now = ctx.currentTime;
                const osc = ctx.createOscillator(); const gain = ctx.createGain(); const filter = ctx.createBiquadFilter();
                osc.type = 'sawtooth'; osc.frequency.setValueAtTime(140, now); osc.frequency.exponentialRampToValueAtTime(70, now + 0.16);
                filter.type = 'lowpass'; filter.frequency.setValueAtTime(320, now);
                gain.gain.setValueAtTime(0.35, now); gain.gain.exponentialRampToValueAtTime(0.01, now + 0.06);
                gain.gain.setValueAtTime(0.28, now + 0.08); gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
                osc.connect(filter); filter.connect(gain); gain.connect(ctx.destination);
                osc.start(now); osc.stop(now + 0.16);
            } catch (err) { }
        },
        playCheck: function () {
            if (!isSoundEnabled) return;
            try {
                const ctx = getAudioContext(); if (!ctx) return;
                const now = ctx.currentTime;
                const osc = ctx.createOscillator(); const gain = ctx.createGain();
                osc.type = 'sine'; osc.frequency.setValueAtTime(880, now); osc.frequency.exponentialRampToValueAtTime(440, now + 0.15);
                gain.gain.setValueAtTime(0.3, now); gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
                osc.connect(gain); gain.connect(ctx.destination);
                osc.start(now); osc.stop(now + 0.15);
            } catch (err) { }
        },
        playEnd: function () {
            if (!isSoundEnabled) return;
            try {
                const ctx = getAudioContext(); if (!ctx) return;
                const now = ctx.currentTime;
                const osc = ctx.createOscillator(); const gain = ctx.createGain();
                osc.type = 'triangle'; osc.frequency.setValueAtTime(523.25, now); osc.frequency.setValueAtTime(659.25, now + 0.1); osc.frequency.setValueAtTime(783.99, now + 0.2);
                gain.gain.setValueAtTime(0.3, now); gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
                osc.connect(gain); gain.connect(ctx.destination);
                osc.start(now); osc.stop(now + 0.35);
            } catch (err) { }
        }
    };
})();

// ============================================================================
// BẢNG BÀN CỜ & QUÂN CỜ PHONG PHÚ
// ============================================================================
const BOARD_THEMES = {
    green: { name: 'Xanh lá', nameEn: 'Green', light: '#ebecd0', dark: '#779556' },
    wood: { name: 'Gỗ tự nhiên', nameEn: 'Wood', light: '#e9cda7', dark: '#a26c3f' },
    walnut: { name: 'Gỗ óc chó', nameEn: 'Walnut', light: '#dfc39e', dark: '#8b5a2b' },
    dark: { name: 'Than tối', nameEn: 'Dark', light: '#71828f', dark: '#495963' },
    ocean: { name: 'Biển xanh', nameEn: 'Ocean', light: '#d0e4ee', dark: '#4682b4' },
    marble: { name: 'Cẩm thạch', nameEn: 'Marble', light: '#f1f5f9', dark: '#94a3b8' },
    glass: { name: 'Kính mờ', nameEn: 'Glass', light: '#e0f2fe', dark: '#64748b' },
    neon: { name: 'Cyberpunk', nameEn: 'Neon', light: '#2d224c', dark: '#130f24' },
    emerald: { name: 'Ngọc lục bảo', nameEn: 'Emerald', light: '#d8ebd4', dark: '#3f784c' },
    bubblegum: { name: 'Hồng pastel', nameEn: 'Bubblegum', light: '#fce7f3', dark: '#d946ef' },
    icy_sea: { name: 'Xanh băng giá', nameEn: 'Icy Sea', light: '#dbeafe', dark: '#60a5fa' },
    '8bit': { name: '8-Bit Retro', nameEn: '8-Bit', light: '#e5e5e5', dark: '#525252' },
    minimalist: { name: 'Tối giản', nameEn: 'Minimalist', light: '#ffffff', dark: '#334155' },
    parchment: { name: 'Giấy cổ', nameEn: 'Parchment', light: '#f4ecd8', dark: '#bca072' },
    ice: { name: 'Băng tuyết', nameEn: 'Ice', light: '#e0f2fe', dark: '#38bdf8' }
};

const PIECE_THEMES = {
    classic: { name: 'Classic', desc: 'Vector SVG' },
    neo: { name: 'Neo', desc: 'Chess.com' },
    game_room: { name: 'Game Room', desc: 'Wood Vintage' },
    glass: { name: 'Glass', desc: 'Thủy tinh' },
    alpha: { name: 'Alpha', desc: 'Hiện đại' },
    bases: { name: 'Bases', desc: 'Phẳng tối giản' },
    cburnett: { name: 'Cburnett', desc: 'Lichess Chuẩn' },
    merida: { name: 'Merida', desc: 'Truyền thống' },
    california: { name: 'California', desc: 'Thanh lịch' },
    cardinal: { name: 'Cardinal', desc: 'Sắc sảo' },
    dubrovny: { name: 'Dubrovny', desc: 'Gỗ cổ điển' },
    maestro: { name: 'Maestro', desc: 'Lichess' },
    staunty: { name: 'Staunty', desc: 'Lichess' },
    tatiana: { name: 'Tatiana', desc: 'Lichess' },
    governor: { name: 'Governor', desc: 'Lichess' },
    '8_bit': { name: '8-Bit', desc: 'Pixel Retro' }
};

let currentBoardTheme = 'green';
let currentPieceTheme = 'classic';
let currentAnimationSpeed = 280;
let currentMoveTime = 180;
try {
    currentBoardTheme = readStoredSetting('boardTheme', null) || localStorage.getItem('chess_board_theme') || 'green';
    currentPieceTheme = readStoredSetting('pieceTheme', null) || localStorage.getItem('chess_piece_theme') || 'classic';
    const savedSpeed = readStoredSetting('animationSpeed', null) ?? localStorage.getItem('chess_animation_speed');
    if (savedSpeed !== null && savedSpeed !== undefined) currentAnimationSpeed = parseInt(savedSpeed, 10);
    const savedMoveTime = readStoredSetting('moveTime', null) ?? localStorage.getItem('chess_move_time');
    if (savedMoveTime !== null && savedMoveTime !== undefined) currentMoveTime = parseInt(savedMoveTime, 10);
} catch (e) { }

const LICHESS_PIECE_THEMES = new Set([
    'cburnett', 'merida', 'california', 'cardinal', 'dubrovny',
    'maestro', 'staunty', 'tatiana', 'governor', 'pixel'
]);

function getPieceThemeUrl(pieceCode, theme = currentPieceTheme) {
    if (!pieceCode) return '';
    const activeTheme = theme || currentPieceTheme || 'classic';
    if (activeTheme === 'classic') {
        return CUSTOM_SVG_PIECES[pieceCode] || '';
    }
    if (LICHESS_PIECE_THEMES.has(activeTheme)) {
        const lichessPiece = pieceCode[0].toLowerCase() + pieceCode[1].toUpperCase();
        return `https://raw.githubusercontent.com/lichess-org/lila/master/public/piece/${activeTheme}/${lichessPiece}.svg`;
    }
    // Chess.com CDN
    const chessComTheme = (activeTheme === '8-bit' || activeTheme === '8bit') ? '8_bit' : activeTheme;
    const codeLower = pieceCode.toLowerCase();
    return `https://images.chesscomfiles.com/chess-themes/pieces/${chessComTheme}/150/${codeLower}.png`;
}

function attachPieceFallback(img, pieceCode) {
    if (!img) return;
    img.onerror = () => {
        img.onerror = null;
        if (CUSTOM_SVG_PIECES[pieceCode]) {
            img.src = CUSTOM_SVG_PIECES[pieceCode];
        }
    };
}

let boardPieceObserver = null;
function initBoardPieceObserver() {
    const boardEl = document.getElementById('board');
    if (!boardEl || boardPieceObserver || typeof MutationObserver === 'undefined') return;
    boardPieceObserver = new MutationObserver((mutations) => {
        for (const m of mutations) {
            for (const node of m.addedNodes) {
                if (node.nodeType === 1) {
                    if (node.tagName === 'IMG' && node.classList.contains('piece-417db')) {
                        const pieceCode = node.getAttribute('data-piece');
                        if (pieceCode) attachPieceFallback(node, pieceCode);
                    } else if (node.querySelectorAll) {
                        node.querySelectorAll('img.piece-417db').forEach(img => {
                            const pieceCode = img.getAttribute('data-piece');
                            if (pieceCode) attachPieceFallback(img, pieceCode);
                        });
                    }
                }
            }
        }
    });
    boardPieceObserver.observe(boardEl, { childList: true, subtree: true });
}

function updateBoardPieceImages() {
    const boardEl = document.getElementById('board');
    if (!boardEl) return;
    initBoardPieceObserver();
    boardEl.querySelectorAll('img.piece-417db').forEach(img => {
        const pieceCode = img.getAttribute('data-piece');
        if (pieceCode) {
            attachPieceFallback(img, pieceCode);
            img.src = getPieceThemeUrl(pieceCode);
        }
    });
}

function updateMiniBoardPieces(theme = currentPieceTheme) {
    const miniBoard = document.getElementById('settings-mini-board');
    if (miniBoard) {
        miniBoard.querySelectorAll('.mini-piece').forEach(img => {
            const pieceCode = img.getAttribute('data-piece');
            if (pieceCode) {
                img.src = getPieceThemeUrl(pieceCode, theme);
                attachPieceFallback(img, pieceCode);
            }
        });
    }
    const titleEl = document.getElementById('mini-preview-theme-title');
    if (titleEl) {
        const bName = BOARD_THEMES[currentBoardTheme]?.name || currentBoardTheme;
        const pName = PIECE_THEMES[currentPieceTheme]?.name || currentPieceTheme;
        titleEl.textContent = `${t('settings_board_theme') || 'Bàn cờ'}: ${bName} • ${t('settings_piece_theme') || 'Quân cờ'}: ${pName}`;
    }
}

function syncSettingsToUnifiedStorage() {
    try {
        const themeVal = document.documentElement.getAttribute('data-theme') || readStoredSetting('theme', 'dark');
        const fontVal = readStoredSetting('font', null) || localStorage.getItem('chess_app_font') || 'inter';

        const storedCoords = readStoredSetting('coordinates', null);
        const showCoords = storedCoords !== null ? Boolean(storedCoords) : (localStorage.getItem('chess_show_coordinates') !== 'false');

        const storedLegal = readStoredSetting('legalHints', null);
        const showLegal = storedLegal !== null ? Boolean(storedLegal) : (localStorage.getItem('chess_show_legal_hints') !== 'false');

        const storedHighlight = readStoredSetting('highlightLastMove', null);
        const highlightLast = storedHighlight !== null ? Boolean(storedHighlight) : (localStorage.getItem('chess_highlight_last_move') !== 'false');

        const storedFlip = readStoredSetting('autoFlip', null);
        const autoFlip = storedFlip !== null ? Boolean(storedFlip) : (localStorage.getItem('chess_auto_flip') !== 'false');

        const storedArrow = readStoredSetting('bestArrow', null);
        const showBestArrow = storedArrow !== null ? Boolean(storedArrow) : (localStorage.getItem('chess_show_best_arrow') !== 'false');

        const storedBadges = readStoredSetting('evalBadges', null);
        const showEvalBadges = storedBadges !== null ? Boolean(storedBadges) : (localStorage.getItem('chess_show_eval_badges') !== 'false');

        const soundEnabled = (typeof SoundManager !== 'undefined' && SoundManager.isEnabled) ? SoundManager.isEnabled() : true;
        const currentUsername = typeof getAppUsername === 'function' ? getAppUsername() : '';

        const settings = {
            reviewDepth: currentDepth,
            moveTime: currentMoveTime,
            theme: themeVal,
            lang: currentLang,
            font: fontVal,
            boardTheme: currentBoardTheme,
            pieceTheme: currentPieceTheme,
            animationSpeed: currentAnimationSpeed,
            sound: soundEnabled,
            coordinates: showCoords,
            legalHints: showLegal,
            highlightLastMove: highlightLast,
            autoFlip: autoFlip,
            bestArrow: showBestArrow,
            evalBadges: showEvalBadges,
            username: currentUsername
        };
        localStorage.setItem('chess_analyzer_settings', JSON.stringify(settings));
        localStorage.setItem('chess_review_depth', String(currentDepth));
        localStorage.setItem('chess_analysis_depth', String(currentDepth));
        localStorage.setItem('chess_move_time', String(currentMoveTime));
        localStorage.setItem('chess_animation_speed', String(currentAnimationSpeed));
        localStorage.setItem('chess_app_theme', themeVal);
        localStorage.setItem('chess_lang', currentLang);
        localStorage.setItem('chess_board_theme', currentBoardTheme);
        localStorage.setItem('chess_piece_theme', currentPieceTheme);
        localStorage.setItem('chess_app_font', fontVal);
        localStorage.setItem('chess_sound_enabled', String(soundEnabled));
        localStorage.setItem('chess_show_coordinates', String(showCoords));
        localStorage.setItem('chess_show_legal_hints', String(showLegal));
        localStorage.setItem('chess_highlight_last_move', String(highlightLast));
        localStorage.setItem('chess_auto_flip', String(autoFlip));
        localStorage.setItem('chess_show_best_arrow', String(showBestArrow));
        localStorage.setItem('chess_show_eval_badges', String(showEvalBadges));
        localStorage.setItem('chesscom_username', currentUsername);
    } catch (e) { }
}

function applyAppTheme(themeVal) {
    if (themeVal !== 'light' && themeVal !== 'dark') themeVal = 'dark';
    document.documentElement.setAttribute('data-theme', themeVal);
    try { localStorage.setItem('chess_app_theme', themeVal); } catch (e) { }
    syncSettingsToUnifiedStorage();
    updateThemeButtonText();
    const themeSeg = document.getElementById('settings-theme-segmented');
    if (themeSeg) {
        themeSeg.querySelectorAll('.seg-btn').forEach(b => b.classList.toggle('active', b.dataset.themeVal === themeVal));
    }
}

function applyBoardTheme(theme) {
    if (!BOARD_THEMES[theme]) theme = 'green';
    currentBoardTheme = theme;
    document.documentElement.setAttribute('data-board-theme', theme);
    try { localStorage.setItem('chess_board_theme', theme); } catch (e) { }
    syncSettingsToUnifiedStorage();
    const selectEl = document.getElementById('select-board-theme');
    if (selectEl && selectEl.value !== theme) selectEl.value = theme;
    document.querySelectorAll('.board-swatch-card').forEach(card => {
        card.classList.toggle('active', card.dataset.boardTheme === theme);
    });
    updateMiniBoardPieces(currentPieceTheme);
}

function applyPieceTheme(theme) {
    if (!PIECE_THEMES[theme] && theme !== '8-bit') theme = 'classic';
    currentPieceTheme = theme;
    try { localStorage.setItem('chess_piece_theme', theme); } catch (e) { }
    syncSettingsToUnifiedStorage();
    const selectEl = document.getElementById('select-piece-theme');
    if (selectEl && selectEl.value !== theme) selectEl.value = theme;
    document.querySelectorAll('.piece-option-card').forEach(card => {
        card.classList.toggle('active', card.dataset.pieceTheme === theme);
    });
    updateBoardPieceImages();
    updateMiniBoardPieces(theme);
}

function applyFontFamily(fontName) {
    const fontMap = {
        'inter': "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        'plus-jakarta-sans': "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
        'outfit': "'Outfit', -apple-system, BlinkMacSystemFont, sans-serif",
        'space-grotesk': "'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif",
        'jetbrains-mono': "'JetBrains Mono', monospace"
    };
    const family = fontMap[fontName] || fontMap['inter'];
    document.body.style.fontFamily = family;
    try { localStorage.setItem('chess_app_font', fontName); } catch (e) { }
    syncSettingsToUnifiedStorage();
    document.querySelectorAll('.font-option-card').forEach(card => {
        card.classList.toggle('active', card.dataset.font === fontName);
    });
}

function applyBoardDisplayOptions() {
    let showCoords = true, showLegal = true, highlightLast = true, autoFlip = true;
    try {
        const unifiedCoords = readStoredSetting('coordinates', null);
        if (unifiedCoords !== null) showCoords = Boolean(unifiedCoords);
        else if (localStorage.getItem('chess_show_coordinates') !== null) {
            showCoords = localStorage.getItem('chess_show_coordinates') !== 'false';
        }

        const unifiedLegal = readStoredSetting('legalHints', null);
        if (unifiedLegal !== null) showLegal = Boolean(unifiedLegal);
        else if (localStorage.getItem('chess_show_legal_hints') !== null) {
            showLegal = localStorage.getItem('chess_show_legal_hints') !== 'false';
        }

        const unifiedHighlight = readStoredSetting('highlightLastMove', null);
        if (unifiedHighlight !== null) highlightLast = Boolean(unifiedHighlight);
        else if (localStorage.getItem('chess_highlight_last_move') !== null) {
            highlightLast = localStorage.getItem('chess_highlight_last_move') !== 'false';
        }

        const unifiedFlip = readStoredSetting('autoFlip', null);
        if (unifiedFlip !== null) autoFlip = Boolean(unifiedFlip);
        else if (localStorage.getItem('chess_auto_flip') !== null) {
            autoFlip = localStorage.getItem('chess_auto_flip') !== 'false';
        }
    } catch (e) { }

    document.body.classList.toggle('hide-coordinates', !showCoords);
    document.body.classList.toggle('hide-legal-hints', !showLegal);
    document.body.classList.toggle('hide-last-move-highlight', !highlightLast);

    const toggleCoords = document.getElementById('toggle-settings-coords');
    if (toggleCoords) toggleCoords.checked = showCoords;
    const toggleLegal = document.getElementById('toggle-settings-legal-hints');
    if (toggleLegal) toggleLegal.checked = showLegal;
    const toggleHighlight = document.getElementById('toggle-settings-highlight-last');
    if (toggleHighlight) toggleHighlight.checked = highlightLast;
    const toggleAutoFlip = document.getElementById('toggle-settings-auto-flip');
    if (toggleAutoFlip) toggleAutoFlip.checked = autoFlip;
}

function applyAnimationSpeed(speed) {
    currentAnimationSpeed = parseInt(speed, 10);
    try { localStorage.setItem('chess_animation_speed', String(currentAnimationSpeed)); } catch (e) { }
    syncSettingsToUnifiedStorage();
    if (typeof board !== 'undefined' && board && board.moveSpeed !== undefined) {
        board.moveSpeed = currentAnimationSpeed;
    }
    const seg = document.getElementById('settings-speed-segmented');
    if (seg) {
        seg.querySelectorAll('.seg-btn').forEach(btn => {
            btn.classList.toggle('active', parseInt(btn.dataset.speedVal, 10) === currentAnimationSpeed);
        });
    }
}

function applyMoveTime(val) {
    currentMoveTime = parseInt(val, 10);
    try { localStorage.setItem('chess_move_time', String(currentMoveTime)); } catch (e) { }
    syncSettingsToUnifiedStorage();
    const badge = document.getElementById('settings-move-time-val');
    if (badge) badge.textContent = `${currentMoveTime}ms`;
    const slider = document.getElementById('settings-move-time-slider');
    if (slider && parseInt(slider.value, 10) !== currentMoveTime) slider.value = currentMoveTime;
}

function applyReviewDepth(depth, autoReanalyze = false) {
    const parsed = parseInt(depth, 10);
    if (isNaN(parsed) || parsed < 10 || parsed > 30) return;
    currentDepth = parsed;
    try {
        localStorage.setItem('chess_review_depth', String(currentDepth));
        localStorage.setItem('chess_analysis_depth', String(currentDepth));
    } catch (e) { }
    syncSettingsToUnifiedStorage();

    const selectEl = document.getElementById('select-depth');
    if (selectEl && selectEl.value !== String(currentDepth)) {
        selectEl.value = String(currentDepth);
    }
    const seg = document.getElementById('settings-depth-segmented');
    if (seg) {
        seg.querySelectorAll('.seg-btn').forEach(btn => {
            btn.classList.toggle('active', parseInt(btn.dataset.depthVal, 10) === currentDepth);
        });
    }

    if (autoReanalyze && typeof getAllCachedGameUrls === 'function') {
        getAllCachedGameUrls(currentDepth).then(urls => {
            analyzedGameUrls = urls;
            applyGameListFilters();
        });
    }

    if (autoReanalyze && AppState.selectedGameIndex !== null && AppState.loadedGames && AppState.loadedGames[AppState.selectedGameIndex]) {
        const currentGame = AppState.loadedGames[AppState.selectedGameIndex];
        if (stockfishEngine && typeof stockfishEngine.stop === 'function') {
            stockfishEngine.stop();
        }
        (async () => {
            if (typeof getGameAnalysisCache === 'function') {
                try {
                    const cached = await getGameAnalysisCache(currentGame.url, currentDepth);
                    if (cached && typeof applyCachedAnalysis === 'function') {
                        await applyCachedAnalysis(cached, currentGame);
                        return;
                    }
                } catch (e) { }
            }
            const fn = (typeof triggerLiveAnalysis === 'function')
                ? triggerLiveAnalysis
                : (typeof window !== 'undefined' && typeof window.triggerLiveAnalysis === 'function' ? window.triggerLiveAnalysis : null);
            if (fn) {
                fn(null, true);
            }
        })();
    }
}

function getAppUsername() {
    try {
        const savedUnified = readStoredSetting('username', null);
        const saved = savedUnified || localStorage.getItem('chesscom_username');
        if (saved && String(saved).trim()) return String(saved).trim();
    } catch (e) { }
    return (typeof CHESSCOM_USERNAME !== 'undefined' ? CHESSCOM_USERNAME : '');
}

function updateAppUsername(newUsername) {
    const clean = (newUsername || '').trim();
    if (!clean) return;
    try { localStorage.setItem('chesscom_username', clean); } catch (e) { }
    if (typeof window !== 'undefined') window.CHESSCOM_USERNAME = clean;
    if (typeof CHESSCOM_USERNAME !== 'undefined') CHESSCOM_USERNAME = clean;
    syncSettingsToUnifiedStorage();

    const input = document.getElementById('settings-username-input');
    if (input) input.value = clean;
    const headerUser = document.getElementById('header-username');
    if (headerUser) headerUser.textContent = clean;
    const statsUser = document.getElementById('stats-username');
    if (statsUser) statsUser.textContent = clean;

    handleFetchGames();
    showStatus(`Đã cập nhật tài khoản Chess.com: ${clean}`, 'info');
}

async function updateSettingsCacheStats() {
    const countEl = document.getElementById('settings-cache-count');
    if (!countEl) return;
    try {
        if (typeof getAllCachedAnalyses === 'function') {
            const all = await getAllCachedAnalyses();
            const count = all ? all.length : 0;
            countEl.textContent = `${count} ván cờ`;
        }
    } catch (e) {
        countEl.textContent = '0 ván cờ';
    }
}

function renderSettingsSwatches() {
    // 1. Board Swatches
    const boardContainer = document.getElementById('settings-board-swatches');
    if (boardContainer && boardContainer.children.length === 0) {
        const boardKeys = ['green', 'wood', 'walnut', 'dark', 'ocean', 'marble', 'glass', 'neon', 'emerald', 'bubblegum', 'icy_sea', '8bit'];
        boardContainer.innerHTML = boardKeys.map(key => {
            const th = BOARD_THEMES[key] || { name: key, light: '#ebecd0', dark: '#779556' };
            const isActive = currentBoardTheme === key ? 'active' : '';
            return `
                <div class="board-swatch-card ${isActive}" data-board-theme="${key}" title="${th.name}">
                    <div class="swatch-2x2">
                        <div style="background-color: ${th.light}"></div>
                        <div style="background-color: ${th.dark}"></div>
                        <div style="background-color: ${th.dark}"></div>
                        <div style="background-color: ${th.light}"></div>
                    </div>
                    <span class="swatch-name">${th.name}</span>
                </div>
            `;
        }).join('');

        boardContainer.querySelectorAll('.board-swatch-card').forEach(card => {
            card.addEventListener('click', () => {
                applyBoardTheme(card.dataset.boardTheme);
            });
        });
    }

    // 2. Piece Sets Grid
    const piecesContainer = document.getElementById('settings-pieces-grid');
    if (piecesContainer && piecesContainer.children.length === 0) {
        const pieceKeys = Object.keys(PIECE_THEMES);
        piecesContainer.innerHTML = pieceKeys.map(key => {
            const pInfo = PIECE_THEMES[key];
            const isActive = currentPieceTheme === key ? 'active' : '';
            const wNUrl = getPieceThemeUrl('wN', key);
            const bKUrl = getPieceThemeUrl('bK', key);
            return `
                <div class="piece-option-card ${isActive}" data-piece-theme="${key}" title="${pInfo.name}">
                    <div class="piece-preview-pair">
                        <img class="piece-preview-img" src="${wNUrl}" alt="wN" data-piece="wN">
                        <img class="piece-preview-img" src="${bKUrl}" alt="bK" data-piece="bK">
                    </div>
                    <span class="piece-name">${pInfo.name}</span>
                </div>
            `;
        }).join('');

        piecesContainer.querySelectorAll('.piece-option-card').forEach(card => {
            card.addEventListener('click', () => {
                applyPieceTheme(card.dataset.pieceTheme);
            });
        });

        piecesContainer.querySelectorAll('.piece-preview-img').forEach(img => {
            attachPieceFallback(img, img.getAttribute('data-piece'));
        });
    }
}

function openSettingsModal(defaultTab = 'ui') {
    const modal = document.getElementById('settings-modal');
    if (!modal) return;
    renderSettingsSwatches();
    modal.classList.remove('hidden');
    switchSettingsTab(defaultTab);
    updateSettingsCacheStats();
    updateMiniBoardPieces(currentPieceTheme);

    const usernameInput = document.getElementById('settings-username-input');
    if (usernameInput) usernameInput.value = getAppUsername();

    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const themeSeg = document.getElementById('settings-theme-segmented');
    if (themeSeg) {
        themeSeg.querySelectorAll('.seg-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.themeVal === currentTheme);
        });
    }

    const langSeg = document.getElementById('settings-lang-segmented');
    if (langSeg) {
        langSeg.querySelectorAll('.seg-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.langVal === currentLang);
        });
    }

    const soundToggle = document.getElementById('toggle-settings-sound');
    if (soundToggle) soundToggle.checked = SoundManager.isEnabled();

    const arrowToggle = document.getElementById('toggle-settings-best-arrow');
    if (arrowToggle) {
        arrowToggle.checked = localStorage.getItem('chess_show_best_arrow') !== 'false';
    }

    const badgeToggle = document.getElementById('toggle-settings-eval-badges');
    if (badgeToggle) {
        badgeToggle.checked = localStorage.getItem('chess_show_eval_badges') !== 'false';
    }

    applyMoveTime(currentMoveTime);
    applyAnimationSpeed(currentAnimationSpeed);
    applyReviewDepth(currentDepth);
    applyBoardDisplayOptions();
}

function closeSettingsModal() {
    const modal = document.getElementById('settings-modal');
    if (modal) modal.classList.add('hidden');
}

function switchSettingsTab(tabName) {
    document.querySelectorAll('.settings-tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.settingsTab === tabName);
    });
    document.querySelectorAll('.settings-pane').forEach(pane => {
        pane.classList.toggle('active', pane.id === `settings-pane-${tabName}`);
    });
}

function initSettingsModal() {
    // 1. Nút mở/đóng Modal Cài đặt
    const btnOpenSettings = document.getElementById('btn-open-settings');
    if (btnOpenSettings) {
        btnOpenSettings.addEventListener('click', () => openSettingsModal());
    }
    const btnCloseSettings = document.getElementById('btn-close-settings-modal');
    if (btnCloseSettings) {
        btnCloseSettings.addEventListener('click', closeSettingsModal);
    }
    const modalEl = document.getElementById('settings-modal');
    if (modalEl) {
        modalEl.addEventListener('click', (e) => {
            if (e.target === modalEl) closeSettingsModal();
        });
    }
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalEl && !modalEl.classList.contains('hidden')) {
            closeSettingsModal();
        }
    });

    // 2. Chuyển Tab Sidebar
    document.querySelectorAll('.settings-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            switchSettingsTab(btn.dataset.settingsTab);
        });
    });

    // 3. Theme Segmented Control
    const themeSeg = document.getElementById('settings-theme-segmented');
    if (themeSeg) {
        themeSeg.querySelectorAll('.seg-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                applyAppTheme(btn.dataset.themeVal);
            });
        });
    }

    // 4. Lang Segmented Control
    const langSeg = document.getElementById('settings-lang-segmented');
    if (langSeg) {
        langSeg.querySelectorAll('.seg-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const langVal = btn.dataset.langVal;
                applyLanguage(langVal);
                langSeg.querySelectorAll('.seg-btn').forEach(b => b.classList.toggle('active', b === btn));
                updateMiniBoardPieces(currentPieceTheme);
            });
        });
    }

    // 5. Font Cards Selection
    document.querySelectorAll('.font-option-card').forEach(card => {
        card.addEventListener('click', () => {
            applyFontFamily(card.dataset.font);
        });
    });

    // 6. Board Display Toggles
    const toggleCoords = document.getElementById('toggle-settings-coords');
    if (toggleCoords) {
        toggleCoords.addEventListener('change', () => {
            try { localStorage.setItem('chess_show_coordinates', String(toggleCoords.checked)); } catch (e) { }
            syncSettingsToUnifiedStorage();
            applyBoardDisplayOptions();
        });
    }
    const toggleLegal = document.getElementById('toggle-settings-legal-hints');
    if (toggleLegal) {
        toggleLegal.addEventListener('change', () => {
            try { localStorage.setItem('chess_show_legal_hints', String(toggleLegal.checked)); } catch (e) { }
            syncSettingsToUnifiedStorage();
            applyBoardDisplayOptions();
        });
    }
    const toggleHighlight = document.getElementById('toggle-settings-highlight-last');
    if (toggleHighlight) {
        toggleHighlight.addEventListener('change', () => {
            try { localStorage.setItem('chess_highlight_last_move', String(toggleHighlight.checked)); } catch (e) { }
            syncSettingsToUnifiedStorage();
            applyBoardDisplayOptions();
        });
    }
    const toggleAutoFlip = document.getElementById('toggle-settings-auto-flip');
    if (toggleAutoFlip) {
        toggleAutoFlip.addEventListener('change', () => {
            try { localStorage.setItem('chess_auto_flip', String(toggleAutoFlip.checked)); } catch (e) { }
            syncSettingsToUnifiedStorage();
            applyBoardDisplayOptions();
        });
    }

    // 7. Sound Toggle
    const soundToggle = document.getElementById('toggle-settings-sound');
    if (soundToggle) {
        soundToggle.addEventListener('change', () => {
            SoundManager.setEnabled(soundToggle.checked);
        });
    }

    // 8. Animation Speed Segmented
    const speedSeg = document.getElementById('settings-speed-segmented');
    if (speedSeg) {
        speedSeg.querySelectorAll('.seg-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                applyAnimationSpeed(btn.dataset.speedVal);
            });
        });
    }

    // 9. Depth Segmented
    const depthSeg = document.getElementById('settings-depth-segmented');
    if (depthSeg) {
        depthSeg.querySelectorAll('.seg-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                applyReviewDepth(btn.dataset.depthVal, true);
            });
        });
    }

    // 10. Move Time Slider
    const moveSlider = document.getElementById('settings-move-time-slider');
    if (moveSlider) {
        const handleMoveTimeChange = (e) => applyMoveTime(e.target.value);
        moveSlider.addEventListener('input', handleMoveTimeChange);
        moveSlider.addEventListener('change', handleMoveTimeChange);
    }

    // 11. Arrows & Badges Toggles
    const arrowToggle = document.getElementById('toggle-settings-best-arrow');
    if (arrowToggle) {
        arrowToggle.addEventListener('change', () => {
            try { localStorage.setItem('chess_show_best_arrow', String(arrowToggle.checked)); } catch (e) { }
            syncSettingsToUnifiedStorage();
            if (!arrowToggle.checked && typeof clearArrows === 'function') clearArrows();
            else updateCurrentMoveArrow();
        });
    }
    const badgeToggle = document.getElementById('toggle-settings-eval-badges');
    if (badgeToggle) {
        badgeToggle.addEventListener('change', () => {
            try { localStorage.setItem('chess_show_eval_badges', String(badgeToggle.checked)); } catch (e) { }
            syncSettingsToUnifiedStorage();
            if (!badgeToggle.checked) clearBoardEvaluationBadge();
            else updateCurrentMoveArrow();
        });
    }

    // 12. Username Input & Save
    const btnSaveUser = document.getElementById('btn-save-username');
    if (btnSaveUser) {
        btnSaveUser.addEventListener('click', () => {
            const input = document.getElementById('settings-username-input');
            if (input && input.value.trim()) {
                updateAppUsername(input.value);
            }
        });
    }
    const userInput = document.getElementById('settings-username-input');
    if (userInput) {
        userInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && userInput.value.trim()) {
                updateAppUsername(userInput.value);
            }
        });
        userInput.addEventListener('change', () => {
            if (userInput.value.trim() && userInput.value.trim() !== getAppUsername()) {
                updateAppUsername(userInput.value);
            }
        });
    }

    // 13. Cache Management
    const btnSettingsClearCache = document.getElementById('btn-settings-clear-cache');
    if (btnSettingsClearCache) {
        btnSettingsClearCache.addEventListener('click', async () => {
            if (!confirm('Bạn có chắc chắn muốn xóa toàn bộ dữ liệu phân tích đã lưu trong bộ nhớ không?')) return;
            if (typeof clearAllAnalysisCache === 'function') await clearAllAnalysisCache();
            analyzedGameUrls.clear();
            applyGameListFilters();
            if (cacheStatusBadge) cacheStatusBadge.classList.add('hidden');
            if (btnReanalyze) btnReanalyze.classList.add('hidden');
            await updateSettingsCacheStats();
            updatePersonalPuzzlesBadge();
            showStatus(t('clear_cache_success'), 'info');
        });
    }

    // 14. Reset Defaults
    const btnResetDefaults = document.getElementById('btn-settings-reset-defaults');
    if (btnResetDefaults) {
        btnResetDefaults.addEventListener('click', () => {
            if (!confirm('Bạn có chắc chắn muốn khôi phục toàn bộ cài đặt về mặc định ban đầu không?')) return;
            try {
                localStorage.removeItem('chess_app_theme');
                localStorage.removeItem('chess_lang');
                localStorage.removeItem('chess_app_font');
                localStorage.removeItem('chess_board_theme');
                localStorage.removeItem('chess_piece_theme');
                localStorage.removeItem('chess_sound_enabled');
                localStorage.removeItem('chess_animation_speed');
                localStorage.removeItem('chess_analysis_depth');
                localStorage.removeItem('chess_review_depth');
                localStorage.removeItem('chess_move_time');
                localStorage.removeItem('chess_show_best_arrow');
                localStorage.removeItem('chess_show_eval_badges');
                localStorage.removeItem('chess_show_coordinates');
                localStorage.removeItem('chess_show_legal_hints');
                localStorage.removeItem('chess_highlight_last_move');
                localStorage.removeItem('chess_auto_flip');
                localStorage.removeItem('chesscom_username');
                localStorage.removeItem('chess_analyzer_settings');
            } catch (e) { }
            location.reload();
        });
    }
}

function openCustomImportModal() {
    const modal = document.getElementById('custom-import-modal');
    const input = document.getElementById('custom-pgn-fen-input');
    const errorEl = document.getElementById('custom-import-error');
    const colorEl = document.getElementById('select-custom-color');
    if (!modal) return;
    if (input) input.value = '';
    if (colorEl) colorEl.value = 'auto';
    if (errorEl) {
        errorEl.textContent = '';
        errorEl.classList.add('hidden');
    }
    modal.classList.remove('hidden');
    setTimeout(() => {
        if (input) input.focus();
    }, 60);
}

function closeCustomImportModal() {
    const modal = document.getElementById('custom-import-modal');
    if (modal) modal.classList.add('hidden');
}

function handleCustomImportSubmit() {
    const inputEl = document.getElementById('custom-pgn-fen-input');
    const errorEl = document.getElementById('custom-import-error');
    const colorEl = document.getElementById('select-custom-color');
    if (!inputEl) return;
    const text = inputEl.value.trim();
    if (!text) {
        if (errorEl) {
            errorEl.textContent = t('custom_import_error_empty');
            errorEl.classList.remove('hidden');
        }
        return;
    }

    const chess = new Chess();
    const chosenColor = colorEl ? colorEl.value : 'auto';

    // 1. Kiểm tra nếu là thế cờ FEN
    let normalizedFen = text;
    const fenParts = text.split(/\s+/);
    if (fenParts.length === 1 && fenParts[0].split('/').length === 8) {
        normalizedFen = `${fenParts[0]} w - - 0 1`;
    } else if (fenParts.length === 4) {
        normalizedFen = `${text} 0 1`;
    } else if (fenParts.length === 5) {
        normalizedFen = `${text} 1`;
    }

    const fenValidation = chess.validate_fen(normalizedFen);
    if (fenValidation && fenValidation.valid) {
        try {
            chess.load(normalizedFen);
        } catch (e) {
            if (errorEl) {
                errorEl.textContent = `${t('custom_import_error_invalid')} (${e.message || ''})`;
                errorEl.classList.remove('hidden');
            }
            return;
        }

        const fenTurn = chess.turn();
        const userColor = chosenColor === 'auto' ? fenTurn : chosenColor;
        const userName = (typeof getAppUsername === 'function' ? getAppUsername() : 'You');

        const customFenGame = {
            url: 'custom://fen/' + Date.now(),
            isCustomFen: true,
            fen: normalizedFen,
            pgn: '',
            userColor: userColor,
            userUsername: userName,
            userRating: '?',
            opponentUsername: 'Stockfish',
            opponentRating: '?',
            resultType: 'draw',
            resultLabel: 'FEN',
            rawResult: 'agreed',
            timeClass: 'custom',
            dateStr: new Date().toLocaleDateString(currentLang === 'en' ? 'en-US' : 'vi-VN'),
            endTime: Math.floor(Date.now() / 1000),
            white: { username: (userColor === 'w' ? userName : 'Stockfish'), rating: '?' },
            black: { username: (userColor === 'b' ? userName : 'Stockfish'), rating: '?' }
        };

        AppState.loadedGames.unshift(customFenGame);
        applyGameListFilters();
        closeCustomImportModal();
        closeGameDrawer();

        showStatus(t('custom_import_success_fen'), 'info');
        selectGame(customFenGame);
        return;
    }

    // 2. Kiểm tra nếu là biên bản PGN
    let pgnLoaded = false;
    try {
        pgnLoaded = chess.load_pgn(text, { sloppy: true });
    } catch (err) {
        pgnLoaded = false;
    }

    if (pgnLoaded && chess.history().length > 0) {
        const headers = chess.header() || {};
        const whiteUsername = headers.White || 'White';
        const blackUsername = headers.Black || 'Black';
        const whiteRating = headers.WhiteElo || headers.WhiteUSCF || '?';
        const blackRating = headers.BlackElo || headers.BlackUSCF || '?';
        const rawResult = headers.Result || '*';
        const dateHeader = headers.Date || new Date().toISOString().slice(0, 10);

        let determinedUserColor = 'w';
        const appUser = typeof getAppUsername === 'function' ? getAppUsername().toLowerCase() : '';
        if (chosenColor === 'w' || chosenColor === 'b') {
            determinedUserColor = chosenColor;
        } else if (appUser && blackUsername.toLowerCase() === appUser) {
            determinedUserColor = 'b';
        }

        let resultType = 'draw';
        if (rawResult === '1-0') {
            resultType = (determinedUserColor === 'w') ? 'win' : 'loss';
        } else if (rawResult === '0-1') {
            resultType = (determinedUserColor === 'b') ? 'win' : 'loss';
        }

        const customPgnGame = {
            url: 'custom://pgn/' + Date.now(),
            pgn: text,
            userColor: determinedUserColor,
            userUsername: determinedUserColor === 'w' ? whiteUsername : blackUsername,
            userRating: determinedUserColor === 'w' ? whiteRating : blackRating,
            opponentUsername: determinedUserColor === 'w' ? blackUsername : whiteUsername,
            opponentRating: determinedUserColor === 'w' ? blackRating : whiteRating,
            resultType: resultType,
            resultLabel: rawResult,
            rawResult: rawResult,
            timeClass: headers.TimeControl ? 'custom' : 'rapid',
            dateStr: dateHeader,
            endTime: Math.floor(Date.now() / 1000),
            white: { username: whiteUsername, rating: whiteRating },
            black: { username: blackUsername, rating: blackRating }
        };

        AppState.loadedGames.unshift(customPgnGame);
        applyGameListFilters();
        closeCustomImportModal();
        closeGameDrawer();

        showStatus(t('custom_import_success_pgn'), 'info');
        selectGame(customPgnGame);
        return;
    }

    // 3. Nếu không hợp lệ
    if (errorEl) {
        errorEl.textContent = t('custom_import_error_invalid');
        errorEl.classList.remove('hidden');
    }
}

function initCustomImportModal() {
    const btnOpen = document.getElementById('btn-open-custom-import');
    if (btnOpen) btnOpen.addEventListener('click', openCustomImportModal);
    const btnClose = document.getElementById('btn-close-custom-import-modal');
    if (btnClose) btnClose.addEventListener('click', closeCustomImportModal);
    const btnCancel = document.getElementById('btn-cancel-custom-import');
    if (btnCancel) btnCancel.addEventListener('click', closeCustomImportModal);
    const btnSubmit = document.getElementById('btn-submit-custom-import');
    if (btnSubmit) btnSubmit.addEventListener('click', handleCustomImportSubmit);

    const modalEl = document.getElementById('custom-import-modal');
    if (modalEl) {
        modalEl.addEventListener('click', (e) => {
            if (e.target === modalEl) closeCustomImportModal();
        });
    }
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalEl && !modalEl.classList.contains('hidden')) {
            closeCustomImportModal();
        }
    });
    const textareaEl = document.getElementById('custom-pgn-fen-input');
    if (textareaEl) {
        textareaEl.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                handleCustomImportSubmit();
            }
        });
    }
}

// =========================================================
// KHO GIẢI ĐỐ CÁ NHÂN (PERSONAL PUZZLE GENERATOR)
// =========================================================
let puzzleBoard = null;
let currentPuzzle = null;
let currentPuzzleChess = null;
let personalPuzzlesList = [];
let currentPuzzleIndex = 0;
let isPuzzleSolved = false;
let puzzleStreak = 0;
let puzzleMaxStreak = 0;
let puzzleSelectedSquare = null;

function getStoredPuzzleStreak() {
    try {
        puzzleStreak = Number(localStorage.getItem('chess_puzzle_streak')) || 0;
        puzzleMaxStreak = Number(localStorage.getItem('chess_puzzle_max_streak')) || 0;
    } catch (e) {
        puzzleStreak = 0;
        puzzleMaxStreak = 0;
    }
}

function updatePuzzleStreakUI() {
    const streakEl = document.getElementById('puzzle-streak-count');
    const maxEl = document.getElementById('puzzle-streak-max');
    if (streakEl) streakEl.textContent = String(puzzleStreak);
    if (maxEl) maxEl.textContent = String(puzzleMaxStreak);
}

async function updatePersonalPuzzlesBadge() {
    const badgeEl = document.getElementById('personal-puzzles-badge');
    if (!badgeEl) return;
    try {
        const extractor = (typeof extractPersonalPuzzles === 'function')
            ? extractPersonalPuzzles
            : (typeof window !== 'undefined' && typeof window.extractPersonalPuzzles === 'function' ? window.extractPersonalPuzzles : null);
        if (!extractor) return;
        const puzzles = await extractor(typeof AppState.loadedGames !== 'undefined' ? AppState.loadedGames : null);
        const count = puzzles ? puzzles.length : 0;
        if (count > 0) {
            badgeEl.textContent = count > 99 ? '99+' : String(count);
            badgeEl.classList.remove('hidden');
        } else {
            badgeEl.textContent = '0';
            badgeEl.classList.add('hidden');
        }
    } catch (e) {
        console.warn('Lỗi cập nhật badge câu đố:', e);
    }
}

async function openPersonalPuzzlesModal() {
    const modal = document.getElementById('personal-puzzle-modal');
    if (!modal) return;

    // Ngăn chặn xung đột với các chế độ đang chạy
    if (isBotGameActive && typeof exitBotGame === 'function') exitBotGame();
    if (typeof isInTrialBranch === 'function' && isInTrialBranch() && typeof exitTrialBranch === 'function') exitTrialBranch();
    stopAutoplay();
    if (AppState.isAnalyzing && stockfishEngine) stockfishEngine.stop();

    getStoredPuzzleStreak();
    updatePuzzleStreakUI();

    modal.classList.remove('hidden');

    const activeContainer = document.getElementById('puzzle-active-container');
    const emptyContainer = document.getElementById('puzzle-empty-container');
    const msgEl = document.getElementById('puzzle-status-message');

    // Hiển thị trạng thái Loading trước để tối ưu UX, tránh giật lag UI
    if (activeContainer) activeContainer.classList.remove('hidden');
    if (emptyContainer) emptyContainer.classList.add('hidden');
    if (msgEl) {
        msgEl.textContent = (typeof currentLang !== 'undefined' && currentLang === 'en')
            ? 'Scanning your analyzed games for tactical puzzles...'
            : 'Đang trích xuất câu đố từ các ván đấu đã phân tích...';
    }

    // Nhường Main Thread một nhịp để trình duyệt kịp paint Modal & trạng thái Loading
    await new Promise(r => setTimeout(r, 50));

    const extractor = (typeof extractPersonalPuzzles === 'function')
        ? extractPersonalPuzzles
        : (typeof window !== 'undefined' && typeof window.extractPersonalPuzzles === 'function' ? window.extractPersonalPuzzles : null);

    if (extractor) {
        try {
            personalPuzzlesList = await extractor(typeof AppState.loadedGames !== 'undefined' ? AppState.loadedGames : null);
        } catch (e) {
            personalPuzzlesList = [];
        }
    }

    if (!personalPuzzlesList || personalPuzzlesList.length === 0) {
        if (activeContainer) activeContainer.classList.add('hidden');
        if (emptyContainer) emptyContainer.classList.remove('hidden');
        updatePersonalPuzzlesBadge();
        return;
    }

    if (activeContainer) activeContainer.classList.remove('hidden');
    if (emptyContainer) emptyContainer.classList.add('hidden');

    currentPuzzleIndex = 0;
    loadCurrentPuzzle();
    updatePersonalPuzzlesBadge();
}

function closePersonalPuzzlesModal() {
    const modal = document.getElementById('personal-puzzle-modal');
    if (modal) modal.classList.add('hidden');
    clearPuzzleBoardHighlights();
    clearPuzzleArrows();
    isPuzzleSolved = false;
    puzzleSelectedSquare = null;
}

function loadCurrentPuzzle() {
    if (!personalPuzzlesList || !personalPuzzlesList.length) return;
    if (currentPuzzleIndex < 0) currentPuzzleIndex = 0;
    if (currentPuzzleIndex >= personalPuzzlesList.length) currentPuzzleIndex = 0;

    const puzzle = personalPuzzlesList[currentPuzzleIndex];
    currentPuzzle = puzzle;
    isPuzzleSolved = false;
    puzzleSelectedSquare = null;
    currentPuzzleChess = new Chess(puzzle.fen);

    const userOrientation = puzzle.turn === 'b' ? 'black' : 'white';

    const boardEl = document.getElementById('puzzle-board');
    if (boardEl) {
        if (!puzzleBoard) {
            puzzleBoard = Chessboard('puzzle-board', {
                position: puzzle.fen,
                orientation: userOrientation,
                draggable: true,
                moveSpeed: currentAnimationSpeed || 200,
                snapbackSpeed: 70,
                snapSpeed: 70,
                onDragStart: handlePuzzleDragStart,
                onDrop: handlePuzzleDrop,
                onSnapEnd: handlePuzzleSnapEnd,
                pieceTheme: (code) => getPieceThemeUrl(code)
            });
            initPuzzleClickToMove();
        } else {
            puzzleBoard.orientation(userOrientation);
            puzzleBoard.position(puzzle.fen, false);
        }
    }

    setTimeout(() => {
        if (puzzleBoard && typeof puzzleBoard.resize === 'function') puzzleBoard.resize();
    }, 60);

    clearPuzzleBoardHighlights();
    clearPuzzleArrows();
    updatePuzzleUI(puzzle);
}

function updatePuzzleUI(puzzle) {
    if (!puzzle) return;

    // Source Card
    const catEl = document.getElementById('puzzle-source-cat');
    if (catEl) {
        catEl.textContent = puzzle.category;
        catEl.className = `puzzle-source-tag ${puzzle.category === 'Miss' ? 'tag-miss' : 'tag-blunder'}`;
    }

    const dateEl = document.getElementById('puzzle-source-date');
    if (dateEl) dateEl.textContent = puzzle.gameDate || '';

    const playersEl = document.getElementById('puzzle-source-players');
    if (playersEl) {
        const oppLabel = puzzle.opponentName || 'Opponent';
        playersEl.textContent = `vs ${oppLabel} (Nước ${puzzle.moveNumber || 1})`;
    }

    const blunderSanEl = document.getElementById('puzzle-blunder-san');
    if (blunderSanEl) blunderSanEl.textContent = puzzle.userBlunderSan || '--';

    const blunderDescEl = document.getElementById('puzzle-blunder-desc');
    if (blunderDescEl) {
        blunderDescEl.textContent = puzzle.category === 'Miss' ? t('puzzle_miss_desc') : t('puzzle_blunder_desc');
    }

    // Turn Banner
    const turnDot = document.getElementById('puzzle-turn-dot');
    const turnText = document.getElementById('puzzle-turn-text');
    if (turnDot) {
        turnDot.className = `puzzle-turn-dot ${puzzle.turn === 'b' ? 'black-turn' : ''}`;
    }
    if (turnText) {
        turnText.textContent = puzzle.turn === 'b' ? t('puzzle_black_turn') : t('puzzle_white_turn');
    }

    // Feedback
    const cardEl = document.getElementById('puzzle-feedback-card');
    if (cardEl) cardEl.className = 'puzzle-feedback-card';

    const msgEl = document.getElementById('puzzle-status-message');
    if (msgEl) msgEl.textContent = t('puzzle_initial_prompt');

    // Nút câu tiếp theo
    const btnNext = document.getElementById('btn-next-puzzle');
    if (btnNext) btnNext.classList.add('hidden');

    // Counter
    const counterEl = document.getElementById('puzzle-counter-text');
    if (counterEl) {
        counterEl.textContent = t('puzzle_counter_format', currentPuzzleIndex + 1, personalPuzzlesList.length);
    }
}

function highlightPuzzleSquare(square, className) {
    const boardEl = document.getElementById('puzzle-board');
    if (!boardEl || !square) return;
    const sqEl = boardEl.querySelector(`.square-${square}`);
    if (sqEl) sqEl.classList.add(className);
}

function clearPuzzleBoardHighlights() {
    const boardEl = document.getElementById('puzzle-board');
    if (!boardEl) return;
    boardEl.querySelectorAll('.puzzle-sq-correct, .puzzle-sq-hint, .puzzle-sq-selected').forEach(el => {
        el.classList.remove('puzzle-sq-correct', 'puzzle-sq-hint', 'puzzle-sq-selected');
    });
}

function renderPuzzleArrow(from, to, color = '#81b64c') {
    const svg = document.getElementById('puzzle-arrow-overlay');
    if (!svg || !currentPuzzle) return;
    const orientation = currentPuzzle.turn === 'b' ? 'black' : 'white';
    const builder = (typeof buildArrowSvgString === 'function')
        ? buildArrowSvgString
        : (typeof window !== 'undefined' && typeof window.buildArrowSvgString === 'function' ? window.buildArrowSvgString : null);
    if (builder) {
        svg.innerHTML = builder(from, to, color, { width: 12, opacity: 0.9, className: 'puzzle-arrow' }, orientation);
    }
}

function clearPuzzleArrows() {
    const svg = document.getElementById('puzzle-arrow-overlay');
    if (svg) svg.innerHTML = '';
}

function isMoveMatchingPuzzleBest(playedUci, validMove, puzzle = null) {
    const targetPuzzle = puzzle
        || (typeof currentPuzzle !== 'undefined' && currentPuzzle)
        || (typeof window !== 'undefined' && window.currentPuzzle)
        || (typeof globalThis !== 'undefined' && globalThis.currentPuzzle)
        || null;
    if (!targetPuzzle || !targetPuzzle.bestMoveUci || !playedUci) return false;

    const bestUci = targetPuzzle.bestMoveUci.toLowerCase().trim();
    const played = playedUci.toLowerCase().trim();

    // So sánh tuyệt đối 4 ký tự đầu (from-to)
    if (played.slice(0, 4) === bestUci.slice(0, 4)) {
        // Chỉ kiểm tra charAt(4) nếu CẢ bestUci và playedUci đều có độ dài > 4 (phong cấp rõ ràng)
        if (bestUci.length > 4 && played.length > 4) {
            if (played.charAt(4) !== bestUci.charAt(4)) {
                return false;
            }
        }
        return true;
    }

    try {
        const testChess = new Chess(targetPuzzle.fen);
        testChess.move({ from: validMove.from, to: validMove.to, promotion: validMove.promotion || 'q' });
        if (testChess.in_checkmate()) return true;
    } catch (e) { }

    return false;
}

function handlePuzzleSuccess(validMove, from, to) {
    isPuzzleSolved = true;
    clearPuzzleArrows();
    clearPuzzleBoardHighlights();
    highlightPuzzleSquare(from, 'puzzle-sq-correct');
    highlightPuzzleSquare(to, 'puzzle-sq-correct');

    if (validMove.captured) {
        SoundManager.playCapture();
    } else {
        SoundManager.playMove();
    }

    puzzleStreak++;
    if (puzzleStreak > puzzleMaxStreak) {
        puzzleMaxStreak = puzzleStreak;
    }
    try {
        localStorage.setItem('chess_puzzle_streak', String(puzzleStreak));
        localStorage.setItem('chess_puzzle_max_streak', String(puzzleMaxStreak));
    } catch (e) { }
    updatePuzzleStreakUI();

    const btnNext = document.getElementById('btn-next-puzzle');
    if (btnNext) btnNext.classList.remove('hidden');

    const msgEl = document.getElementById('puzzle-status-message');
    const cardEl = document.getElementById('puzzle-feedback-card');
    if (cardEl) cardEl.className = 'puzzle-feedback-card card-success';
    if (msgEl) msgEl.textContent = t('puzzle_success_msg');

    if (currentPuzzle.pv && currentPuzzle.pv.length > 1) {
        const oppUci = currentPuzzle.pv[1];
        const currentFen = currentPuzzleChess ? currentPuzzleChess.fen() : null;
        setTimeout(() => {
            if (!isPuzzleSolved || !currentPuzzleChess || (currentFen && currentPuzzleChess.fen() !== currentFen)) return;
            const oppFrom = oppUci.substring(0, 2);
            const oppTo = oppUci.substring(2, 4);
            const oppPromo = oppUci.length > 4 ? oppUci.charAt(4) : 'q';
            const oppMove = currentPuzzleChess.move({ from: oppFrom, to: oppTo, promotion: oppPromo });
            if (oppMove) {
                if (puzzleBoard) puzzleBoard.position(currentPuzzleChess.fen(), true);
                if (oppMove.captured) SoundManager.playCapture();
                else SoundManager.playMove();
                highlightPuzzleSquare(oppFrom, 'puzzle-sq-selected');
                highlightPuzzleSquare(oppTo, 'puzzle-sq-selected');
                if (msgEl) msgEl.textContent = t('puzzle_opponent_reply');
            } else {
                if (msgEl) msgEl.textContent = t('puzzle_success_msg');
            }
        }, 500);
    }
}

function handlePuzzleFailure(validMove, from, to) {
    puzzleStreak = 0;
    try {
        localStorage.setItem('chess_puzzle_streak', '0');
    } catch (e) { }
    updatePuzzleStreakUI();

    const playedUci = from + to + (validMove.promotion || '');
    const isBlunderRepeated = (currentPuzzle.userBlunderUci && playedUci.slice(0, 4) === currentPuzzle.userBlunderUci.slice(0, 4))
        || (validMove.san && validMove.san.replace(/[+#!?]/g, '') === currentPuzzle.userBlunderSan.replace(/[+#!?]/g, ''));

    const msgEl = document.getElementById('puzzle-status-message');
    const cardEl = document.getElementById('puzzle-feedback-card');
    if (cardEl) cardEl.className = 'puzzle-feedback-card card-wrong';
    if (msgEl) {
        msgEl.textContent = isBlunderRepeated ? t('puzzle_repeated_blunder') : t('puzzle_wrong_msg');
    }

    SoundManager.playMove();
}

function handlePuzzleDragStart(source, piece) {
    if (isPuzzleSolved || !currentPuzzle) return false;
    const pieceColor = piece.charAt(0);
    if (pieceColor !== currentPuzzle.turn) return false;
    clearPuzzleBoardHighlights();
    return true;
}

function handlePuzzleDrop(source, target) {
    if (source === target || !currentPuzzle || !currentPuzzleChess) return;

    const moveAttempt = { from: source, to: target, promotion: 'q' };
    const validMove = currentPuzzleChess.move(moveAttempt);
    if (!validMove) return 'snapback';

    currentPuzzleChess.undo();
    const playedUci = source + target + (validMove.promotion || '');
    const isCorrect = isMoveMatchingPuzzleBest(playedUci, validMove);

    if (isCorrect) {
        currentPuzzleChess.move(validMove);
        puzzleBoard.position(currentPuzzleChess.fen(), false);
        handlePuzzleSuccess(validMove, source, target);
    } else {
        handlePuzzleFailure(validMove, source, target);
        return 'snapback';
    }
}

function handlePuzzleSnapEnd() {
    if (puzzleBoard && currentPuzzleChess) {
        puzzleBoard.position(currentPuzzleChess.fen());
    }
}

function initPuzzleClickToMove() {
    const boardEl = document.getElementById('puzzle-board');
    if (!boardEl) return;

    boardEl.addEventListener('click', (e) => {
        if (isPuzzleSolved || !currentPuzzle || !currentPuzzleChess) return;
        const squareEl = e.target.closest('[class*="square-"]');
        if (!squareEl) return;

        const match = squareEl.className.match(/square-([a-h][1-8])/);
        if (!match) return;
        const clickedSquare = match[1];

        if (!puzzleSelectedSquare) {
            const piece = currentPuzzleChess.get(clickedSquare);
            if (piece && piece.color === currentPuzzle.turn) {
                puzzleSelectedSquare = clickedSquare;
                clearPuzzleBoardHighlights();
                highlightPuzzleSquare(clickedSquare, 'puzzle-sq-selected');
            }
            return;
        }

        if (puzzleSelectedSquare === clickedSquare) {
            puzzleSelectedSquare = null;
            clearPuzzleBoardHighlights();
            return;
        }

        const targetPiece = currentPuzzleChess.get(clickedSquare);
        if (targetPiece && targetPiece.color === currentPuzzle.turn) {
            puzzleSelectedSquare = clickedSquare;
            clearPuzzleBoardHighlights();
            highlightPuzzleSquare(clickedSquare, 'puzzle-sq-selected');
            return;
        }

        const from = puzzleSelectedSquare;
        const to = clickedSquare;
        puzzleSelectedSquare = null;
        clearPuzzleBoardHighlights();

        const moveAttempt = { from, to, promotion: 'q' };
        const validMove = currentPuzzleChess.move(moveAttempt);
        if (!validMove) return;

        currentPuzzleChess.undo();
        const playedUci = from + to + (validMove.promotion || '');
        const isCorrect = isMoveMatchingPuzzleBest(playedUci, validMove);

        if (isCorrect) {
            currentPuzzleChess.move(validMove);
            puzzleBoard.position(currentPuzzleChess.fen(), true);
            handlePuzzleSuccess(validMove, from, to);
        } else {
            handlePuzzleFailure(validMove, from, to);
        }
    });
}

function handlePuzzleHint() {
    if (isPuzzleSolved || !currentPuzzle || !currentPuzzle.bestMoveUci) return;
    const fromSquare = currentPuzzle.bestMoveUci.substring(0, 2);
    clearPuzzleBoardHighlights();
    highlightPuzzleSquare(fromSquare, 'puzzle-sq-hint');
    const msgEl = document.getElementById('puzzle-status-message');
    if (msgEl) {
        msgEl.textContent = t('puzzle_hint_msg', fromSquare.toUpperCase());
    }
}

function handlePuzzleSolution() {
    if (!currentPuzzle || !currentPuzzle.bestMoveUci) return;
    puzzleStreak = 0;
    try { localStorage.setItem('chess_puzzle_streak', '0'); } catch (e) { }
    updatePuzzleStreakUI();

    isPuzzleSolved = true;
    clearPuzzleArrows();
    clearPuzzleBoardHighlights();

    const from = currentPuzzle.bestMoveUci.substring(0, 2);
    const to = currentPuzzle.bestMoveUci.substring(2, 4);
    const promo = currentPuzzle.bestMoveUci.length > 4 ? currentPuzzle.bestMoveUci.charAt(4) : 'q';

    renderPuzzleArrow(from, to, '#81b64c');
    highlightPuzzleSquare(from, 'puzzle-sq-correct');
    highlightPuzzleSquare(to, 'puzzle-sq-correct');

    let san = currentPuzzle.bestMoveUci;
    try {
        const temp = new Chess(currentPuzzle.fen);
        const m = temp.move({ from, to, promotion: promo });
        if (m) san = m.san;
    } catch (e) { }

    const msgEl = document.getElementById('puzzle-status-message');
    const cardEl = document.getElementById('puzzle-feedback-card');
    if (cardEl) cardEl.className = 'puzzle-feedback-card card-solution';
    if (msgEl) msgEl.textContent = t('puzzle_solution_msg', san);

    const btnNext = document.getElementById('btn-next-puzzle');
    if (btnNext) btnNext.classList.remove('hidden');

    const currentFen = currentPuzzleChess ? currentPuzzleChess.fen() : null;
    if (!currentFen) return;

    setTimeout(() => {
        if (!currentPuzzleChess || currentPuzzleChess.fen() !== currentFen) return;
        const validMove = currentPuzzleChess.move({ from, to, promotion: promo });
        if (validMove && puzzleBoard) {
            puzzleBoard.position(currentPuzzleChess.fen(), true);
            if (validMove.captured) SoundManager.playCapture();
            else SoundManager.playMove();
        }
    }, 400);
}

function handleNextPuzzle() {
    if (!personalPuzzlesList || !personalPuzzlesList.length) return;
    currentPuzzleIndex = (currentPuzzleIndex + 1) % personalPuzzlesList.length;
    loadCurrentPuzzle();
}

function handleSkipPuzzle() {
    if (!personalPuzzlesList || !personalPuzzlesList.length) return;
    currentPuzzleIndex = (currentPuzzleIndex + 1) % personalPuzzlesList.length;
    loadCurrentPuzzle();
}

function handlePuzzleReviewGame() {
    if (!currentPuzzle || !currentPuzzle.gameUrl) return;
    const targetGame = AppState.loadedGames.find(g => g.url === currentPuzzle.gameUrl);
    closePersonalPuzzlesModal();
    if (targetGame) {
        selectGame(targetGame);
    } else if (currentPuzzle.gameUrl.startsWith('http')) {
        window.open(currentPuzzle.gameUrl, '_blank');
    }
}

function initPersonalPuzzlesUI() {
    const btnOpen = document.getElementById('btn-personal-puzzles');
    if (btnOpen) btnOpen.addEventListener('click', openPersonalPuzzlesModal);

    const btnClose = document.getElementById('btn-close-puzzle-modal');
    if (btnClose) btnClose.addEventListener('click', closePersonalPuzzlesModal);

    const modalEl = document.getElementById('personal-puzzle-modal');
    if (modalEl) {
        modalEl.addEventListener('click', (e) => {
            if (e.target === modalEl) closePersonalPuzzlesModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalEl && !modalEl.classList.contains('hidden')) {
            closePersonalPuzzlesModal();
        }
    });

    const btnHint = document.getElementById('btn-puzzle-hint');
    if (btnHint) btnHint.addEventListener('click', handlePuzzleHint);

    const btnSolution = document.getElementById('btn-puzzle-solution');
    if (btnSolution) btnSolution.addEventListener('click', handlePuzzleSolution);

    const btnNext = document.getElementById('btn-next-puzzle');
    if (btnNext) btnNext.addEventListener('click', handleNextPuzzle);

    const btnSkip = document.getElementById('btn-puzzle-skip');
    if (btnSkip) btnSkip.addEventListener('click', handleSkipPuzzle);

    const btnReview = document.getElementById('btn-puzzle-review-game');
    if (btnReview) btnReview.addEventListener('click', handlePuzzleReviewGame);

    const btnDrawerOpen = document.getElementById('btn-puzzle-open-drawer');
    if (btnDrawerOpen) {
        btnDrawerOpen.addEventListener('click', () => {
            closePersonalPuzzlesModal();
            openGameDrawer();
        });
    }
}

function initCustomizationControls() {
    let savedTheme = 'dark';
    try {
        savedTheme = readStoredSetting('theme', null) || localStorage.getItem('chess_app_theme') || document.documentElement.getAttribute('data-theme') || 'dark';
    } catch (e) { }
    document.documentElement.setAttribute('data-theme', savedTheme);

    let savedFont = 'inter';
    try {
        savedFont = readStoredSetting('font', null) || localStorage.getItem('chess_app_font') || 'inter';
    } catch (e) { }
    applyFontFamily(savedFont);

    applyLanguage(currentLang);
    applyBoardTheme(currentBoardTheme);
    applyPieceTheme(currentPieceTheme);
    applyBoardDisplayOptions();
    applyAnimationSpeed(currentAnimationSpeed);
    applyMoveTime(currentMoveTime);
    applyReviewDepth(currentDepth);

    // Đồng bộ các select ẩn cũ
    const langSelect = document.getElementById('select-lang');
    if (langSelect) {
        langSelect.value = currentLang;
        langSelect.addEventListener('change', (e) => applyLanguage(e.target.value));
    }
    const boardSelect = document.getElementById('select-board-theme');
    if (boardSelect) {
        boardSelect.value = currentBoardTheme;
        boardSelect.addEventListener('change', (e) => applyBoardTheme(e.target.value));
    }
    const pieceSelect = document.getElementById('select-piece-theme');
    if (pieceSelect) {
        pieceSelect.value = currentPieceTheme;
        pieceSelect.addEventListener('change', (e) => applyPieceTheme(e.target.value));
    }
    const depthSelect = document.getElementById('select-depth');
    if (depthSelect) {
        depthSelect.value = String(currentDepth);
        depthSelect.addEventListener('change', (e) => applyReviewDepth(e.target.value, true));
    }
    const btnTheme = document.getElementById('btn-theme');
    if (btnTheme) {
        updateThemeButtonText();
        btnTheme.addEventListener('click', () => {
            const cur = document.documentElement.getAttribute('data-theme') || 'dark';
            applyAppTheme(cur === 'dark' ? 'light' : 'dark');
        });
    }

    initSettingsModal();
    initCustomImportModal();
    initBotEloSelector();
    initPersonalPuzzlesUI();
    updatePersonalPuzzlesBadge();
}

let lastBoardMouseDownButton = 0;
window.addEventListener('mousedown', (e) => { lastBoardMouseDownButton = e.button; }, true);
window.addEventListener('touchstart', () => { lastBoardMouseDownButton = 0; }, { capture: true, passive: true });

function clearBoardEvaluationBadge() {
    const boardEl = document.getElementById('board');
    if (!boardEl) return;
    boardEl.querySelectorAll('.board-eval-badge, .brilliant-ripple').forEach(el => el.remove());
}
function renderBoardMoveEvaluationBadge(square, category, isBrilliant = false) {
    clearBoardEvaluationBadge();
    let showBadges = true;
    try {
        const savedBadges = readStoredSetting('evalBadges', null) ?? localStorage.getItem('chess_show_eval_badges');
        if (savedBadges !== null) {
            showBadges = (savedBadges === true || savedBadges === 'true');
        }
    } catch (e) { }
    if (!showBadges) return;
    if (!square) return;
    const boardEl = document.getElementById('board'); if (!boardEl) return;
    const squareEl = boardEl.querySelector(`.square-${square}`); if (!squareEl) return;
    const effectiveCat = isBrilliant ? 'Brilliant' : (category || 'Best');
    const textSym = CATEGORY_TEXT_SYMBOLS[effectiveCat] || '★';
    const catName = typeof getCategoryName === 'function' ? getCategoryName(effectiveCat, currentLang) : effectiveCat;

    if (typeof badgeHTML === 'function') {
        const badgeMarkup = badgeHTML(effectiveCat, 27, {
            class: `board-eval-badge badge-${effectiveCat.toLowerCase()}`,
            title: `${catName} (${textSym})`
        });
        squareEl.insertAdjacentHTML('beforeend', badgeMarkup);
    } else {
        const symbol = EVAL_BADGE_SYMBOLS[effectiveCat] || SVG_ICONS.Best;
        const badge = document.createElement('div');
        badge.className = `board-eval-badge badge-${effectiveCat.toLowerCase()}`;
        badge.title = `${catName} (${textSym})`;
        badge.innerHTML = symbol;
        squareEl.appendChild(badge);
    }

    // Hiệu ứng sóng nước xanh ngọc (ripple/pulse) độc quyền cho nước Brilliant (!!)
    if (effectiveCat === 'Brilliant') {
        const ripple = document.createElement('div');
        ripple.className = 'brilliant-ripple';
        squareEl.appendChild(ripple);
        setTimeout(() => {
            if (ripple && ripple.parentNode) ripple.remove();
        }, 550);
    }
}

// =========================================================
// HUY HIỆU KẾT THÚC VÁN ĐẤU TRÊN Ô VUA & GAME OVER BANNER
// =========================================================
const WINNER_CROWN_SVG = `<svg width="16" height="16" viewBox="0 0 24 24" fill="#ffffff" aria-hidden="true"><path d="M5 18h14v2.5H5V18zm14-4.5L16.5 8l-4.5 3.5L7.5 8 5 13.5h14zM12 2a1.7 1.7 0 1 0 0 3.4A1.7 1.7 0 0 0 12 2zm-7 3.5a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4zm14 0a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4z"/></svg>`;

const LOSER_FALLEN_KING_SVG = `<svg width="15" height="15" viewBox="0 0 24 24" fill="#ffffff" style="transform: rotate(45deg); transform-origin: 50% 50%;" aria-hidden="true"><path d="M11 2h2v2h2v2h-2v2h3.5c1.4 0 2.5 1.1 2.5 2.5 0 .8-.4 1.6-1 2l1 6.5H5l1-6.5c-.6-.4-1-1.2-1-2C5 9.1 6.1 8 7.5 8H11V6H9V4h2V2zm-4 17h10v2H7v-2z"/></svg>`;

const DRAW_HALF_HTML = `<span class="king-badge-draw-val" aria-hidden="true">½</span>`;

let isGameOverBannerDismissed = false;

function findKingsFromFen(fen) {
    if (!fen) return { w: null, b: null };
    const ranks = fen.split(' ')[0].split('/');
    if (ranks.length < 8) return { w: null, b: null };
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    let wk = null, bk = null;
    for (let r = 0; r < 8; r++) {
        const rankStr = ranks[r];
        const rankNum = 8 - r;
        let fileIdx = 0;
        for (let i = 0; i < rankStr.length; i++) {
            const ch = rankStr[i];
            if (ch >= '1' && ch <= '8') {
                fileIdx += parseInt(ch, 10);
            } else {
                if (ch === 'K') wk = files[fileIdx] + rankNum;
                if (ch === 'k') bk = files[fileIdx] + rankNum;
                fileIdx++;
            }
        }
    }
    return { w: wk, b: bk };
}

function clearKingResultBadges() {
    const boardEl = document.getElementById('board');
    if (!boardEl) return;
    boardEl.querySelectorAll('.king-result-badge').forEach(el => el.remove());
    boardEl.querySelectorAll('.board-eval-badge.hidden-by-king-badge').forEach(el => {
        el.classList.remove('hidden-by-king-badge');
        el.style.display = '';
    });
}

function renderKingResultBadges(winnerColor, fen) {
    clearKingResultBadges();
    if (!fen || !winnerColor) return;
    const boardEl = document.getElementById('board');
    if (!boardEl) return;

    const kings = findKingsFromFen(fen);
    if (!kings.w || !kings.b) return;

    const wSqEl = boardEl.querySelector(`.square-${kings.w}`);
    const bSqEl = boardEl.querySelector(`.square-${kings.b}`);

    let whiteBadgeType = 'draw';
    let blackBadgeType = 'draw';
    if (winnerColor === 'w') {
        whiteBadgeType = 'winner';
        blackBadgeType = 'loser';
    } else if (winnerColor === 'b') {
        whiteBadgeType = 'loser';
        blackBadgeType = 'winner';
    }

    const createBadge = (type) => {
        const badge = document.createElement('div');
        badge.className = `king-result-badge badge-${type}`;
        if (type === 'winner') {
            badge.title = t('game_over_crown_title') || 'Winner';
            badge.innerHTML = WINNER_CROWN_SVG;
        } else if (type === 'loser') {
            badge.title = t('game_over_loser_title') || 'Defeated';
            badge.innerHTML = LOSER_FALLEN_KING_SVG;
        } else {
            badge.title = t('game_over_draw') || 'Draw';
            badge.innerHTML = DRAW_HALF_HTML;
        }
        return badge;
    };

    if (wSqEl) {
        const existingBadge = wSqEl.querySelector('.board-eval-badge');
        if (existingBadge) {
            existingBadge.classList.add('hidden-by-king-badge');
            existingBadge.style.display = 'none';
        }
        wSqEl.appendChild(createBadge(whiteBadgeType));
    }

    if (bSqEl) {
        const existingBadge = bSqEl.querySelector('.board-eval-badge');
        if (existingBadge) {
            existingBadge.classList.add('hidden-by-king-badge');
            existingBadge.style.display = 'none';
        }
        bSqEl.appendChild(createBadge(blackBadgeType));
    }
}

function formatGameOverReason(reasonCode, lang = currentLang) {
    const isEn = lang === 'en';
    const normalized = String(reasonCode || '').toLowerCase().trim();
    if (normalized.includes('checkmate') || normalized === 'checkmated') {
        return isEn ? 'Checkmate' : 'Chiếu hết';
    }
    if (normalized.includes('resig') || normalized === 'resigned') {
        return isEn ? 'Resignation' : 'Đối thủ đầu hàng';
    }
    if (normalized.includes('time') || normalized === 'timeout') {
        return isEn ? 'Timeout' : 'Hết giờ';
    }
    if (normalized.includes('stalemate')) {
        return isEn ? 'Stalemate' : 'Hết nước đi (Stalemate)';
    }
    if (normalized.includes('repetition')) {
        return isEn ? 'Threefold Repetition' : 'Lặp lại thế cờ 3 lần';
    }
    if (normalized.includes('insufficient') || normalized === 'insufficient_material') {
        return isEn ? 'Insufficient Material' : 'Không đủ quân';
    }
    if (normalized.includes('50move') || normalized.includes('50moves')) {
        return isEn ? '50-Move Rule' : 'Luật 50 nước';
    }
    if (normalized.includes('abandoned')) {
        return isEn ? 'Abandoned' : 'Bỏ cuộc';
    }
    if (normalized.includes('agreed')) {
        return isEn ? 'Agreed Draw' : 'Thỏa thuận hòa';
    }
    return '';
}

function showGameOverBanner({ result, reason, isBotGame = false, gamePositions: customPositions = null, userColor: customUserColor = null }) {
    if (isGameOverBannerDismissed) return;
    const bannerEl = document.getElementById('game-over-banner');
    if (!bannerEl) return;

    const iconWrap = document.getElementById('gob-icon-wrap');
    const titleEl = document.getElementById('gob-title');
    const reasonEl = document.getElementById('gob-reason');
    const messageEl = document.getElementById('gob-message');
    const actionsEl = document.getElementById('gob-actions');

    const resType = (result === 'win' || result === 'loss') ? result : 'draw';
    bannerEl.className = `game-over-banner banner-${resType}`;

    const reasonText = formatGameOverReason(reason, currentLang);
    if (reasonEl) {
        if (reasonText) {
            reasonEl.textContent = reasonText;
            reasonEl.style.display = '';
        } else {
            reasonEl.textContent = '';
            reasonEl.style.display = 'none';
        }
    }

    const activePositions = customPositions || (typeof AppState.gamePositions !== 'undefined' ? AppState.gamePositions : []);
    const activeUserColor = customUserColor || ((typeof getCurrentUserColor === 'function' && AppState.selectedGameIndex !== null && AppState.loadedGames) ? getCurrentUserColor(AppState.loadedGames[AppState.selectedGameIndex]) : 'w');

    const dynamicMsg = (typeof CoachDialogue !== 'undefined' && CoachDialogue.getGameOverMessage)
        ? CoachDialogue.getGameOverMessage({
            result: resType,
            reason: reason,
            gamePositions: activePositions,
            userColor: activeUserColor,
            lang: currentLang
        })
        : null;

    if (resType === 'win') {
        if (titleEl) titleEl.textContent = t('game_over_victory');
        if (messageEl) messageEl.textContent = dynamicMsg || t('game_over_win_msg');
        if (iconWrap) {
            iconWrap.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.45 1-1 1H7"/><path d="M14 14.66V17c0 .55.45 1 1 1h2"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/></svg>`;
        }
    } else if (resType === 'loss') {
        if (titleEl) titleEl.textContent = t('game_over_defeat');
        if (messageEl) messageEl.textContent = dynamicMsg || t('game_over_loss_msg');
        if (iconWrap) {
            iconWrap.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`;
        }
    } else {
        if (titleEl) titleEl.textContent = t('game_over_draw');
        if (messageEl) messageEl.textContent = dynamicMsg || t('game_over_draw_msg');
        if (iconWrap) {
            iconWrap.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>`;
        }
    }

    if (actionsEl) {
        actionsEl.innerHTML = '';
        if (isBotGame) {
            const btnNewBot = document.createElement('button');
            btnNewBot.type = 'button';
            btnNewBot.className = 'gob-btn primary';
            btnNewBot.id = 'btn-gob-bot-restart';
            btnNewBot.textContent = t('game_over_btn_new_bot');
            btnNewBot.addEventListener('click', () => {
                startBotGame();
            });

            const btnExitBot = document.createElement('button');
            btnExitBot.type = 'button';
            btnExitBot.className = 'gob-btn secondary';
            btnExitBot.id = 'btn-gob-bot-exit';
            btnExitBot.textContent = t('game_over_btn_exit_bot');
            btnExitBot.addEventListener('click', () => {
                exitBotGame();
            });

            actionsEl.appendChild(btnNewBot);
            actionsEl.appendChild(btnExitBot);
        } else {
            const btnRean = document.createElement('button');
            btnRean.type = 'button';
            btnRean.className = 'gob-btn primary';
            btnRean.id = 'btn-gob-reanalyze';
            btnRean.textContent = t('game_over_btn_reanalyze');
            btnRean.addEventListener('click', () => {
                const reanEl = document.getElementById('btn-reanalyze');
                if (reanEl) reanEl.click();
            });

            const btnPlayBotAction = document.createElement('button');
            btnPlayBotAction.type = 'button';
            btnPlayBotAction.className = 'gob-btn secondary';
            btnPlayBotAction.id = 'btn-gob-play-bot';
            btnPlayBotAction.textContent = t('game_over_btn_play_bot');
            btnPlayBotAction.addEventListener('click', () => {
                startBotGame();
            });

            actionsEl.appendChild(btnRean);
            actionsEl.appendChild(btnPlayBotAction);
        }
    }

    bannerEl.classList.remove('hidden');
}

function hideGameOverBanner(isManualDismiss = false) {
    if (isManualDismiss) {
        isGameOverBannerDismissed = true;
    }
    const bannerEl = document.getElementById('game-over-banner');
    if (bannerEl) {
        bannerEl.classList.add('hidden');
    }
}

function checkAndRenderGameOverReviewState() {
    if (typeof isBotGameActive !== 'undefined' && isBotGameActive) return;
    if (typeof isInTrialBranch === 'function' && isInTrialBranch()) {
        clearKingResultBadges();
        hideGameOverBanner();
        return;
    }
    if (!AppState.gamePositions || !AppState.gamePositions.length) return;
    const totalMoves = AppState.gamePositions.length - 1;
    if (AppState.currentMoveIndex === totalMoves && totalMoves > 0) {
        const selectedGame = (AppState.selectedGameIndex !== null && AppState.loadedGames) ? AppState.loadedGames[AppState.selectedGameIndex] : null;
        if (!selectedGame) return;
        const currentPos = AppState.gamePositions[AppState.currentMoveIndex];
        const userColor = getCurrentUserColor(selectedGame);
        let winnerColor = 'draw';
        if (selectedGame.resultType === 'win') {
            winnerColor = userColor;
        } else if (selectedGame.resultType === 'loss') {
            winnerColor = (userColor === 'w') ? 'b' : 'w';
        }

        renderKingResultBadges(winnerColor, currentPos.fen);
        showGameOverBanner({
            result: selectedGame.resultType,
            reason: selectedGame.rawResult || selectedGame.resultLabel,
            isBotGame: false,
            gamePositions: AppState.gamePositions,
            userColor: userColor
        });
    } else {
        isGameOverBannerDismissed = false;
        clearKingResultBadges();
        hideGameOverBanner();
    }
}
function initChessboard(orientation = 'white') {
    if (board !== null) return;
    // Cấu hình gia tốc chuyển động mượt mà cubic-bezier(0.4, 0, 0.2, 1) cho jQuery animate (chessboard.js)
    if (typeof window !== 'undefined' && window.jQuery && window.jQuery.easing) {
        window.jQuery.easing.swing = function (t) {
            return t < 0.5 ? 4 * t * t * t * 0.8 + 0.6 * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        };
    }
    board = Chessboard('board', {
        position: 'start', orientation: orientation, draggable: true,
        moveSpeed: currentAnimationSpeed, snapbackSpeed: 70, snapSpeed: 70,
        onDragStart: handleDragStart, onDrop: handleDrop, onSnapEnd: handleSnapEnd,
        pieceTheme: (pieceCode) => getPieceThemeUrl(pieceCode)
    });
    if (typeof initBoardArrowInteractions === 'function') initBoardArrowInteractions();
    initBoardPieceObserver();
    initClickToMove();
    initPromotionModal();
}

function parseClockToSeconds(clk) {
    if (!clk) return null;
    const parts = String(clk).trim().split(':');
    if (parts.length === 3) return parseFloat(parts[0]) * 3600 + parseFloat(parts[1]) * 60 + parseFloat(parts[2]);
    else if (parts.length === 2) return parseFloat(parts[0]) * 60 + parseFloat(parts[1]);
    const num = parseFloat(clk); return isNaN(num) ? null : num;
}
function formatClockDisplay(totalSec) {
    if (totalSec === null || totalSec === undefined || isNaN(totalSec)) return '';
    const s = Math.max(0, totalSec);
    const hours = Math.floor(s / 3600); const mins = Math.floor((s % 3600) / 60); const secs = Math.floor(s % 60); const tenths = Math.floor((s % 1) * 10);
    if (hours > 0) return `${hours}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    if (s < 20) return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}.${tenths}`;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function buildPositionsFromPGN(pgn) {
    const chess = new Chess();
    if (!chess.load_pgn(pgn, { sloppy: true })) throw new Error('Không thể đọc được biên bản PGN của ván cờ này.');
    const historyMoves = chess.history({ verbose: true });
    chess.reset();
    const tcMatch = pgn.match(/\[TimeControl\s+"([^"]+)"\]/);
    let initialSeconds = null; let incrementSeconds = 0;
    if (tcMatch && tcMatch[1]) {
        const tc = tcMatch[1].trim();
        if (tc.includes('+')) { const parts = tc.split('+'); initialSeconds = parseFloat(parts[0]) || 0; incrementSeconds = parseFloat(parts[1]) || 0; }
        else if (!tc.includes('/') && !isNaN(parseFloat(tc))) { initialSeconds = parseFloat(tc); }
    }
    const clkRegex = /\{\s*\[%clk\s+([0-9:.]+)\]\s*\}/g;
    const clkMatches = []; let clkMatch;
    while ((clkMatch = clkRegex.exec(pgn)) !== null) clkMatches.push(clkMatch[1]);
    if (clkMatches.length > 0 && (initialSeconds === null || initialSeconds <= 0)) {
        const firstSec = parseClockToSeconds(clkMatches[0]);
        if (firstSec !== null) initialSeconds = firstSec;
    }
    const hasClockData = Boolean(clkMatches.length > 0 && initialSeconds !== null && initialSeconds > 0);
    const positions = [];
    positions.push({
        index: 0, fen: chess.fen(), turn: chess.turn(), move: null, eval: null, classification: null, timeSpentSec: null, timeSpentStr: null,
        whiteClock: hasClockData ? { sec: initialSeconds, str: formatClockDisplay(initialSeconds) } : null,
        blackClock: hasClockData ? { sec: initialSeconds, str: formatClockDisplay(initialSeconds) } : null
    });
    let whiteClockCur = hasClockData ? initialSeconds : null; let blackClockCur = hasClockData ? initialSeconds : null;
    historyMoves.forEach((moveObj, idx) => {
        const fenBefore = chess.fen();
        chess.move(moveObj.san);
        const fenAfter = chess.fen();
        const isWhite = (moveObj.color === 'w');
        const clkStr = hasClockData ? clkMatches[idx] : null; const clkSec = hasClockData ? parseClockToSeconds(clkStr) : null;
        let timeSpentSec = null; let timeSpentStr = null;
        if (hasClockData && clkSec !== null) {
            const prevClock = isWhite ? whiteClockCur : blackClockCur;
            timeSpentSec = Math.max(0, prevClock - clkSec + incrementSeconds);
            if (timeSpentSec < 60) timeSpentStr = `${timeSpentSec.toFixed(1)}s`;
            else timeSpentStr = `${Math.floor(timeSpentSec / 60)}m${Math.round(timeSpentSec % 60)}s`;
            if (isWhite) whiteClockCur = clkSec; else blackClockCur = clkSec;
        }
        positions.push({
            index: idx + 1, fenBefore: fenBefore, fen: fenAfter, turn: chess.turn(),
            move: { san: moveObj.san, from: moveObj.from, to: moveObj.to, color: moveObj.color, piece: moveObj.piece, captured: moveObj.captured || null, promotion: moveObj.promotion || null, uci: moveObj.from + moveObj.to + (moveObj.promotion || '') },
            timeSpentSec: timeSpentSec, timeSpentStr: timeSpentStr,
            whiteClock: hasClockData ? { sec: whiteClockCur, str: formatClockDisplay(whiteClockCur) } : null,
            blackClock: hasClockData ? { sec: blackClockCur, str: formatClockDisplay(blackClockCur) } : null,
            eval: null, classification: null
        });
    });
    return positions;
}

// ============================================================================
// ĐI THỬ & NHÁNH THỬ
// ============================================================================
function isInTrialBranch() {
    return AppState.trialBranch !== null && AppState.trialBranch.isViewingBranch === true && Array.isArray(AppState.trialBranch.positions) && AppState.trialBranch.positions.length > 0 && typeof AppState.trialBranch.currentIndex === 'number' && AppState.trialBranch.currentIndex >= 0 && AppState.trialBranch.currentIndex < AppState.trialBranch.positions.length;
}

function getCurrentBoardFen() {
    if (isBotGameActive && botGameChess) {
        return botGameChess.fen();
    }
    if (isInTrialBranch()) {
        const tPos = AppState.trialBranch.positions[AppState.trialBranch.currentIndex];
        if (tPos && tPos.fen) return tPos.fen;
    }
    if (AppState.gamePositions && AppState.gamePositions[AppState.currentMoveIndex]) return AppState.gamePositions[AppState.currentMoveIndex].fen;
    return 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
}

function showPromotionModal(source, target, turn) {
    pendingPromotion = { source, target, turn };
    const isWhite = (turn === 'w');
    const iconQ = document.getElementById('promo-icon-q'); const iconR = document.getElementById('promo-icon-r');
    const iconB = document.getElementById('promo-icon-b'); const iconN = document.getElementById('promo-icon-n');
    if (iconQ) iconQ.textContent = isWhite ? '♕' : '♛'; if (iconR) iconR.textContent = isWhite ? '♖' : '♜';
    if (iconB) iconB.textContent = isWhite ? '♗' : '♝'; if (iconN) iconN.textContent = isWhite ? '♘' : '♞';
    if (promotionModal) promotionModal.classList.remove('hidden');
}
function hidePromotionModal() { pendingPromotion = null; if (promotionModal) promotionModal.classList.add('hidden'); }

function initPromotionModal() {
    if (!promotionModal || promotionModal.dataset.initialized === 'true') return;
    promotionModal.dataset.initialized = 'true';
    promotionModal.querySelectorAll('.btn-promotion').forEach(btn => {
        btn.addEventListener('click', () => {
            const piece = btn.dataset.piece;
            if (pendingPromotion && piece) {
                const { source, target } = pendingPromotion;
                hidePromotionModal();
                handlePlayerMove(source, target, piece, false);
            }
        });
    });
    if (btnCancelPromotion) {
        btnCancelPromotion.addEventListener('click', () => {
            hidePromotionModal();
            if (board) board.position(getCurrentBoardFen(), false);
        });
    }
}

function handleDragStart(source, piece, position, orientation) {
    if (lastBoardMouseDownButton !== 0) return false;
    stopAutoplay();
    if (isBotGameActive) {
        if (botThinking) return false;
        if (!botGameChess || botGameChess.game_over()) return false;
        const turn = botGameChess.turn();
        if (turn !== botPlayerColor) return false;
        if ((botPlayerColor === 'w' && piece.search(/^b/) !== -1) || (botPlayerColor === 'b' && piece.search(/^w/) !== -1)) return false;
        highlightLegalMovesForSquare(source, botGameChess);
        return true;
    }
    const currentFen = getCurrentBoardFen(); const chess = new Chess(currentFen);
    if (chess.in_checkmate() || chess.in_draw() || chess.in_stalemate() || chess.in_threefold_repetition() || chess.insufficient_material()) return false;
    const turn = chess.turn();
    if ((turn === 'w' && piece.search(/^b/) !== -1) || (turn === 'b' && piece.search(/^w/) !== -1)) return false;
    highlightLegalMovesForSquare(source, chess);
    return true;
}

let lastTouchTapTimestamp = 0;
let lastBoardDropTimestamp = 0;

function handleDrop(source, target) {
    dragPositionSynced = false;
    if (source === target) return 'snapback';

    clearSquareMoveHighlights();
    selectedSquareForMove = null;

    const currentFen = getCurrentBoardFen(); const chess = new Chess(currentFen); const turn = chess.turn();
    const piece = chess.get(source); const isPawn = piece && piece.type === 'p';
    const isPromotion = isPawn && ((turn === 'w' && source[1] === '7' && target[1] === '8') || (turn === 'b' && source[1] === '2' && target[1] === '1'));
    if (isPromotion) {
        const testMove = chess.move({ from: source, to: target, promotion: 'q' });
        if (!testMove) { SoundManager.playIllegal(); return 'snapback'; }
        lastBoardDropTimestamp = Date.now();
        showPromotionModal(source, target, turn);
        // Không return 'snapback', giữ nguyên quân Tốt ở ô đích trong khi chờ chọn Modal
        return;
    }
    const moveRes = chess.move({ from: source, to: target });
    if (!moveRes) { SoundManager.playIllegal(); return 'snapback'; }
    lastBoardDropTimestamp = Date.now();
    handlePlayerMove(source, target, 'q', true);
}

function handleSnapEnd() {
    if (!selectedSquareForMove) {
        clearSquareMoveHighlights();
    }
    if (!board) return;
    if (pendingPromotion) {
        // Đang chờ người dùng chọn quân trong Modal phong cấp, giữ nguyên vị trí Tốt ở ô đích
        return;
    }
    if (dragPositionSynced) {
        dragPositionSynced = false;
        return;
    }
    board.position(getCurrentBoardFen(), false);
}

function handlePlayerMove(source, target, promotion = 'q', isDrag = false) {
    stopAutoplay();
    if (isBotGameActive) {
        if (!botGameChess || botGameChess.game_over()) return false;
        const isUserTurn = (botGameChess.turn() === botPlayerColor);
        if (isUserTurn && botThinking) return false;

        const prevFen = botGameChess.fen();
        const moveRes = botGameChess.move({ from: source, to: target, promotion: promotion });
        if (!moveRes) return false;

        const isSpecialMove = Boolean(
            moveRes.san === 'O-O' || moveRes.san === 'O-O-O' ||
            (moveRes.flags && (moveRes.flags.includes('k') || moveRes.flags.includes('q') || moveRes.flags.includes('e')))
        );

        const plyRecord = {
            ply: botMovesHistory.length + 1,
            color: moveRes.color,
            san: moveRes.san,
            from: moveRes.from,
            to: moveRes.to,
            promotion: moveRes.promotion || null,
            captured: moveRes.captured || null,
            fen: botGameChess.fen(),
            fenBefore: prevFen,
            isUser: isUserTurn,
            classification: null,
            eval: null
        };
        botMovesHistory.push(plyRecord);
        botMoveCount = botMovesHistory.length;

        if (moveRes.captured) SoundManager.playCapture(); else SoundManager.playMove();
        if (botGameChess.in_check()) SoundManager.playCheck();

        if (!isDrag) {
            // Click-to-Move hoặc Bot tự đi: trượt quân mượt mà
            if (board) board.position(botGameChess.fen(), true);
        } else if (isSpecialMove) {
            // Drag nhập thành O-O / bắt tốt qua đường: đồng bộ tức thì với false
            if (board) board.position(botGameChess.fen(), false);
            dragPositionSynced = true;
        } else {
            // Drag thông thường: để onSnapEnd gọi board.position(..., false)
            dragPositionSynced = false;
        }

        clearBoardHighlightsAndArrows();
        highlightActualMove(moveRes);
        renderBotMoveList();
        updateBotGameUI();

        if (botGameChess.game_over()) {
            SoundManager.playEnd();
            return true;
        }

        if (isUserTurn) {
            botThinking = true;
            updateBotGameUI();

            const currentEvalSession = ++botUserEvalSessionId;
            (async () => {
                await executeBotMoveSafe();
                await evaluateAndClassifyBotUserMove(plyRecord, prevFen, plyRecord.fen, moveRes, currentEvalSession);
            })();
        }
        return true;
    }

    const currentFen = getCurrentBoardFen(); const chess = new Chess(currentFen);
    const moveRes = chess.move({ from: source, to: target, promotion: promotion });
    if (!moveRes) return false;
    if (moveRes.captured) SoundManager.playCapture(); else SoundManager.playMove();

    const isSpecialMove = Boolean(
        moveRes.san === 'O-O' || moveRes.san === 'O-O-O' ||
        (moveRes.flags && (moveRes.flags.includes('k') || moveRes.flags.includes('q') || moveRes.flags.includes('e')))
    );

    if (!isInTrialBranch()) {
        const nextOriginalPos = AppState.gamePositions[AppState.currentMoveIndex + 1];

        // Xử lý vụ mặc định promotion='q' gây lỗi nhảy nhầm sang Nhánh thử
        const isSameMove = nextOriginalPos && nextOriginalPos.move &&
            nextOriginalPos.move.from === source &&
            nextOriginalPos.move.to === target &&
            (nextOriginalPos.move.promotion || 'q') === (moveRes.promotion || 'q');

        if (isSameMove) {
            if (!isDrag) {
                // Click-to-Move: animation = true, playSound = false (đã phát âm thanh ở trên)
                goToMove(AppState.currentMoveIndex + 1, true, false, false);
            } else if (isSpecialMove) {
                // Drag nhập thành / bắt tốt qua đường: đồng bộ tức thì với false
                goToMove(AppState.currentMoveIndex + 1, false, false, false);
                dragPositionSynced = true;
            } else {
                // Drag thông thường: cập nhật UI trong onDrop, để onSnapEnd gọi board.position(..., false)
                goToMove(AppState.currentMoveIndex + 1, false, false, true);
                dragPositionSynced = false;
            }
            return true;
        }
        initTrialBranch(AppState.currentMoveIndex, moveRes, chess.fen(), isDrag);
    } else {
        appendMoveToTrialBranch(moveRes, chess.fen(), isDrag);
    }
    return true;
}

function initTrialBranch(baseIndex, moveRes, newFen, isDrag = false) {
    const isSpecialMove = Boolean(
        moveRes.san === 'O-O' || moveRes.san === 'O-O-O' ||
        (moveRes.flags && (moveRes.flags.includes('k') || moveRes.flags.includes('q') || moveRes.flags.includes('e')))
    );
    const chess = new Chess(newFen);
    const uci = `${moveRes.from}${moveRes.to}${moveRes.promotion || ''}`;
    const nextOrigPos = AppState.gamePositions[baseIndex + 1];
    let inheritedEval = null;
    let inheritedCls = null;
    if (nextOrigPos && nextOrigPos.fen === newFen && nextOrigPos.eval) {
        inheritedEval = { ...nextOrigPos.eval };
        inheritedCls = nextOrigPos.classification ? { ...nextOrigPos.classification } : null;
    }

    AppState.trialBranch = {
        baseMoveIndex: baseIndex, baseFen: AppState.gamePositions[baseIndex] ? AppState.gamePositions[baseIndex].fen : getCurrentBoardFen(),
        positions: [{
            fen: newFen, turn: chess.turn(), eval: inheritedEval, classification: inheritedCls,
            move: { from: moveRes.from, to: moveRes.to, san: moveRes.san, color: moveRes.color, piece: moveRes.piece, captured: moveRes.captured || null, promotion: moveRes.promotion || null, uci: uci }
        }],
        currentIndex: 0, isViewingBranch: true
    };
    if (!isDrag) {
        updateBoardToTrialCurrent(true, false, false);
    } else if (isSpecialMove) {
        updateBoardToTrialCurrent(false, false, false);
        dragPositionSynced = true;
    } else {
        updateBoardToTrialCurrent(false, false, true);
        dragPositionSynced = false;
    }
    renderMoveList();
}

function appendMoveToTrialBranch(moveRes, newFen, isDrag = false) {
    if (!AppState.trialBranch) return;
    if (AppState.trialBranch.currentIndex < AppState.trialBranch.positions.length - 1) AppState.trialBranch.positions = AppState.trialBranch.positions.slice(0, AppState.trialBranch.currentIndex + 1);
    const isSpecialMove = Boolean(
        moveRes.san === 'O-O' || moveRes.san === 'O-O-O' ||
        (moveRes.flags && (moveRes.flags.includes('k') || moveRes.flags.includes('q') || moveRes.flags.includes('e')))
    );
    const chess = new Chess(newFen);
    const uci = `${moveRes.from}${moveRes.to}${moveRes.promotion || ''}`;
    AppState.trialBranch.positions.push({
        fen: newFen, turn: chess.turn(), eval: null, classification: null,
        move: { from: moveRes.from, to: moveRes.to, san: moveRes.san, color: moveRes.color, piece: moveRes.piece, captured: moveRes.captured || null, promotion: moveRes.promotion || null, uci: uci }
    });
    AppState.trialBranch.currentIndex = AppState.trialBranch.positions.length - 1; AppState.trialBranch.isViewingBranch = true;
    if (!isDrag) {
        updateBoardToTrialCurrent(true, false, false);
    } else if (isSpecialMove) {
        updateBoardToTrialCurrent(false, false, false);
        dragPositionSynced = true;
    } else {
        updateBoardToTrialCurrent(false, false, true);
        dragPositionSynced = false;
    }
    renderMoveList();
}

function exitTrialBranch() {
    if (!AppState.trialBranch) return;
    const returnIndex = AppState.trialBranch.baseMoveIndex;
    AppState.trialBranch = null;
    if (btnCoachExitTrial) btnCoachExitTrial.classList.add('hidden');
    renderMoveList(); goToMove(returnIndex);
}

function updateBoardToTrialCurrent(useAnimation = true, playSound = true, skipBoardPosition = false) {
    if (!isInTrialBranch()) return;
    const pos = AppState.trialBranch.positions[AppState.trialBranch.currentIndex];
    if (!skipBoardPosition && board) {
        board.position(pos.fen, useAnimation);
    }
    if (playSound && pos && pos.move) {
        if (pos.move.captured || (pos.move.san && pos.move.san.includes('x'))) SoundManager.playCapture(); else SoundManager.playMove();
    }
    clearBoardHighlightsAndArrows();
    if (pos.move) highlightActualMove(pos.move);

    const curBranchMove = AppState.trialBranch.currentIndex + 1; const totalBranchMoves = AppState.trialBranch.positions.length;
    moveCounterSpan.textContent = t('trial_counter_format', curBranchMove, totalBranchMoves, AppState.trialBranch.baseMoveIndex);

    btnStart.disabled = false; btnPrev.disabled = false; btnNext.disabled = (AppState.trialBranch.currentIndex === totalBranchMoves - 1);
    btnEnd.disabled = (AppState.trialBranch.currentIndex === totalBranchMoves - 1); if (btnPlay) btnPlay.disabled = true;

    updateMoveListActiveForTrial();
    updatePlayersDisplay();
    updateCoachPanelForTrial();

    const bIdx = AppState.trialBranch.currentIndex;
    const trialPos = AppState.trialBranch.positions[bIdx];

    if (!trialPos.eval) {
        evaluateAndClassifyPosition(trialPos, true, true).catch(err => {
            if (err && err.message !== 'ENGINE_STOPPED' && err.message !== 'ENGINE_INTERRUPTED') console.error(err);
        });
    }
}

function updateCoachPanelForTrial() {
    if (!isInTrialBranch()) return;
    const pos = AppState.trialBranch.positions[AppState.trialBranch.currentIndex]; if (!pos) return;
    if (btnCoachExitTrial) btnCoachExitTrial.classList.remove('hidden');
    btnCoachExplain.disabled = true; btnPrevMistake.disabled = true; btnNextMistake.disabled = true;

    const selectedGame = (AppState.selectedGameIndex !== null && AppState.loadedGames) ? AppState.loadedGames[AppState.selectedGameIndex] : null;
    const userColor = getCurrentUserColor(selectedGame);
    const isUserWhite = (userColor === 'w');

    const evalPerspectiveEl = document.getElementById('coach-eval-perspective');
    if (evalPerspectiveEl) {
        if (typeof evalPerspectiveEl.setAttribute === 'function') {
            evalPerspectiveEl.setAttribute('data-i18n', isUserWhite ? 'white_perspective' : 'black_perspective');
        }
        evalPerspectiveEl.textContent = isUserWhite ? t('white_perspective') : t('black_perspective');
    }
    const winProbLabelEl = document.getElementById('win-prob-label');
    if (winProbLabelEl) {
        if (typeof winProbLabelEl.setAttribute === 'function') {
            winProbLabelEl.setAttribute('data-i18n', isUserWhite ? 'win_prob_white' : 'win_prob_black');
        }
        winProbLabelEl.textContent = isUserWhite ? t('win_prob_white') : t('win_prob_black');
    }

    if (pos.classification && pos.classification.info) {
        const isBrill = Boolean(pos.classification?.isBrilliant);
        const effectiveCategory = isBrill ? 'Brilliant' : pos.classification.category;
        const effectiveColor = CATEGORY_ARROW_COLORS[effectiveCategory] || (isBrill ? '#1baca6' : pos.classification.info.color);
        const effectiveVarName = getCategoryVarName(effectiveCategory);
        const catName = typeof getCategoryName === 'function' ? getCategoryName(effectiveCategory, currentLang) : (currentLang === 'en' ? (pos.classification.info.enName || effectiveCategory) : pos.classification.info.viName);
        const effectiveLabel = isBrill ? (currentLang === 'en' ? 'Brilliant !!' : 'Xuất thần !!') : catName;

        coachPanel.style.borderColor = effectiveColor; coachCommentText.style.color = effectiveColor;
        if (isBrill) coachPanel.classList.add('brilliant-move'); else coachPanel.classList.remove('brilliant-move');

        const bIdx = AppState.trialBranch.currentIndex;
        const prevEval = (bIdx === 0) ? (AppState.gamePositions[AppState.trialBranch.baseMoveIndex] ? AppState.gamePositions[AppState.trialBranch.baseMoveIndex].eval : null) : (AppState.trialBranch.positions[bIdx - 1] ? AppState.trialBranch.positions[bIdx - 1].eval : null);
        const bestUci = prevEval ? prevEval.bestmove : null;
        let isTrialTerminal = false;
        if (typeof Chess === 'function' && pos && pos.fen) {
            const c = new Chess(pos.fen);
            isTrialTerminal = c.in_checkmate() || c.in_draw() || c.moves().length === 0;
        }
        let trialBestSan = '';
        if (bestUci && !isTrialTerminal && bestUci !== '(none)') {
            const converted = convertPvToSanLine(getCurrentBoardFen(), [bestUci], 1, currentLang);
            trialBestSan = converted?.bestSan || '';
        }

        let lossDesc = '';
        if (pos.classification.winLoss !== undefined && pos.classification.winLoss > 0.5) lossDesc = t('trial_win_loss', pos.classification.winLoss.toFixed(1).replace('.', ','));

        coachCommentText.textContent = getCoachCommentText(
            pos.move.san,
            effectiveCategory,
            AppState.trialBranch.currentIndex + 1,
            true,
            currentLang,
            {
                move: pos.move,
                currPos: pos,
                bestSan: trialBestSan
            }
        ) + (lossDesc ? ` (${lossDesc})` : '');
        coachPosDesc.textContent = t('trial_pos_desc', AppState.trialBranch.baseMoveIndex);

        if (coachMoveTitle) {
            const badgeMarkup = typeof badgeHTML === 'function'
                ? badgeHTML(effectiveCategory, 36)
                : `<span class="dot" style="background:var(--${effectiveVarName});"></span>`;
            coachMoveTitle.innerHTML = `${badgeMarkup}<span class="move-title-san">${escapeHTML(pos.move.san)}</span> <span class="chip">${escapeHTML(effectiveLabel)} · ${t('trial_move')}</span>`;
        }

        if (currentWinProb) currentWinProb.textContent = formatWinProbability(pos.eval, userColor);
        if (pos.eval) {
            coachEvalBadge.textContent = formatEvaluationBadge(pos.eval, userColor).replace('.', ',');
            const isUserAhead = isUserWhite ? ((pos.eval.cpWhite || 0) >= 0) : ((pos.eval.cpWhite || 0) <= 0);
            coachEvalBadge.className = `coach-eval-badge ${isUserAhead ? 'white-adv' : 'black-adv'}`;
        }

        if (bestUci && effectiveCategory !== 'Best' && !isBrill && !isTrialTerminal && bestUci !== '(none)') {
            btnCoachBest.classList.remove('hidden'); btnCoachBest.classList.toggle('active', isShowingBestMove);
            btnCoachBest.textContent = isShowingBestMove ? `⭐ ${t('btn_hide_best')} (${trialBestSan || bestUci})` : `⭐ ${t('btn_best_move')}`;
        } else { btnCoachBest.classList.add('hidden'); }
    } else {
        coachPanel.style.borderColor = '#f59e0b'; coachCommentText.style.color = '#b45309';
        coachCommentText.textContent = `${pos.move.san}: ${t('waiting_stockfish')}`;
        coachPosDesc.textContent = t('trial_pos_desc', AppState.trialBranch.baseMoveIndex);
        if (coachMoveTitle) coachMoveTitle.innerHTML = `<span class="dot" style="background:var(--warn);"></span><span class="move-title-san">${escapeHTML(pos.move.san)}</span> <span class="chip">${t('trial_move')} · ${t('analyzing')}</span>`;
        if (currentWinProb) currentWinProb.textContent = formatWinProbability(pos.eval, userColor);
        coachEvalBadge.textContent = '...'; coachEvalBadge.className = 'coach-eval-badge'; btnCoachBest.classList.add('hidden');
    }
}

function scrollElementInsideContainer(el) {
    if (!el || typeof window === 'undefined') return;
    const isMobile = window.innerWidth <= 960;
    const container = isMobile
        ? (el.closest('.moves') || el.closest('.bot-moves-rows'))
        : (el.closest('.scroll') || el.closest('.moves') || el.closest('.bot-moves-rows'));
    if (!container) return;

    let elTop = 0;
    if (typeof el.getBoundingClientRect === 'function' && typeof container.getBoundingClientRect === 'function') {
        const elRect = el.getBoundingClientRect();
        const cRect = container.getBoundingClientRect();
        elTop = (elRect.top - cRect.top) + container.scrollTop;
    } else {
        let node = el;
        while (node && node !== container) {
            elTop += (node.offsetTop || 0);
            node = node.offsetParent;
            if (node && !container.contains(node)) {
                elTop -= (container.offsetTop || 0);
                break;
            }
        }
    }

    const elHeight = el.offsetHeight || (el.getBoundingClientRect ? el.getBoundingClientRect().height : 30) || 30;
    const cHeight = container.clientHeight || 200;
    const cScroll = container.scrollTop;
    const padding = 12;

    if (elTop < cScroll + padding) {
        const targetScroll = Math.max(0, elTop - padding);
        if (typeof container.scrollTo === 'function') {
            container.scrollTo({ top: targetScroll, behavior: 'smooth' });
        } else {
            container.scrollTop = targetScroll;
        }
    } else if (elTop + elHeight > cScroll + cHeight - padding) {
        const targetScroll = elTop + elHeight - cHeight + padding;
        if (typeof container.scrollTo === 'function') {
            container.scrollTo({ top: targetScroll, behavior: 'smooth' });
        } else {
            container.scrollTop = targetScroll;
        }
    }
}

function updateMoveListActiveForTrial() {
    if (!moveListContainer) return;
    moveListContainer.querySelectorAll('.move-cell.active').forEach(c => c.classList.remove('active'));
    const trialCells = moveListContainer.querySelectorAll('.trial-move-cell');
    let activeTrialCell = null;
    trialCells.forEach(cell => {
        const idx = Number(cell.dataset.branchIndex);
        if (isInTrialBranch() && idx === AppState.trialBranch.currentIndex) { cell.classList.add('active'); activeTrialCell = cell; }
        else { cell.classList.remove('active'); }
    });
    if (activeTrialCell) scrollElementInsideContainer(activeTrialCell);
}

function buildTrialBranchRowElement() {
    const branchContainer = document.createElement('div');
    branchContainer.className = 'trial-branch-row';
    const header = document.createElement('div');
    header.className = 'trial-branch-header';
    header.innerHTML = `<span class="trial-branch-badge">${escapeHTML(t('trial_move'))} (${escapeHTML(t('move_word'))} ${AppState.trialBranch.baseMoveIndex})</span><button class="btn-exit-trial" title="${escapeHTML(t('btn_exit_trial'))}">${escapeHTML(t('btn_exit_trial'))}</button>`;
    const exitBtn = header.querySelector('.btn-exit-trial');
    if (exitBtn) exitBtn.addEventListener('click', (e) => { e.stopPropagation(); exitTrialBranch(); });
    branchContainer.appendChild(header);

    const movesWrap = document.createElement('div');
    movesWrap.className = 'trial-branch-moves';
    AppState.trialBranch.positions.forEach((pos, bIdx) => {
        const moveNumber = Math.ceil((AppState.trialBranch.baseMoveIndex + 1 + bIdx) / 2);
        const isWhite = ((AppState.trialBranch.baseMoveIndex + 1 + bIdx) % 2) === 1;
        let prefix = '';
        if (isWhite) prefix = `${moveNumber}. `;
        else if (bIdx === 0) prefix = `${moveNumber}... `;

        const cell = document.createElement('span');
        cell.className = 'trial-move-cell';
        cell.dataset.branchIndex = bIdx;
        if (isInTrialBranch() && AppState.trialBranch.currentIndex === bIdx) {
            cell.classList.add('active');
        }

        const moveText = document.createTextNode(`${prefix}${(pos.move && pos.move.san) ? pos.move.san : ''}`);
        cell.appendChild(moveText);

        if (pos.classification && pos.classification.info) {
            const isBrill = Boolean(pos.classification?.isBrilliant);
            const cat = isBrill ? 'Brilliant' : (pos.classification.category || 'Best');
            const textSym = CATEGORY_TEXT_SYMBOLS[cat] || '★';
            const catClass = cat.toLowerCase();
            const catName = isBrill
                ? (currentLang === 'en' ? 'Brilliant !!' : 'Xuất thần !!')
                : (typeof getCategoryName === 'function' ? getCategoryName(cat, currentLang) : (pos.classification.info ? pos.classification.info.viName : cat));

            let badgeHtml = '';
            if (typeof badgeHTML === 'function') {
                badgeHtml = ' ' + badgeHTML(cat, 20, {
                    class: `move-class-badge badge-${catClass}`,
                    title: `${catName} (${textSym})`
                });
            } else {
                const symbol = EVAL_BADGE_SYMBOLS[cat] || SVG_ICONS.Best;
                badgeHtml = ` <span class="move-class-badge badge-${catClass}" title="${catName} (${textSym})">${symbol}</span>`;
            }
            const badgeSpan = document.createElement('span');
            badgeSpan.innerHTML = badgeHtml;
            cell.appendChild(badgeSpan);
        }

        // Clicks are handled via event delegation on moveListContainer
        movesWrap.appendChild(cell);
    });
    branchContainer.appendChild(movesWrap);
    return branchContainer;
}

function clearSquareMoveHighlights() {
    const boardEl = document.getElementById('board'); if (!boardEl) return;
    boardEl.querySelectorAll('.square-55d63').forEach(sq => sq.classList.remove('square-selected-piece', 'square-legal-target', 'has-piece'));
}
function highlightLegalMovesForSquare(source, chess) {
    clearSquareMoveHighlights(); const boardEl = document.getElementById('board'); if (!boardEl) return;
    const sourceEl = boardEl.querySelector(`.square-${source}`); if (sourceEl) sourceEl.classList.add('square-selected-piece');
    const legalMoves = chess.moves({ square: source, verbose: true });
    legalMoves.forEach(m => {
        const targetEl = boardEl.querySelector(`.square-${m.to}`);
        if (targetEl) { targetEl.classList.add('square-legal-target'); if (m.captured) targetEl.classList.add('has-piece'); }
    });
}
function handleSquareTap(clickedSquare) {
    if (!clickedSquare) {
        selectedSquareForMove = null;
        clearSquareMoveHighlights();
        return;
    }
    if (isBotGameActive) {
        if (botThinking) return;
        if (!botGameChess || botGameChess.game_over()) return;
        if (botGameChess.turn() !== botPlayerColor) return;
    }
    const currentFen = getCurrentBoardFen();
    const chess = new Chess(currentFen);
    const turn = chess.turn();
    if (chess.in_checkmate() || chess.in_draw() || chess.in_stalemate() || chess.in_threefold_repetition() || chess.insufficient_material()) {
        selectedSquareForMove = null;
        clearSquareMoveHighlights();
        return;
    }

    if (!selectedSquareForMove) {
        const pieceOnSq = chess.get(clickedSquare);
        if (pieceOnSq && pieceOnSq.color === turn) {
            selectedSquareForMove = clickedSquare;
            highlightLegalMovesForSquare(clickedSquare, chess);
        }
        return;
    }
    if (clickedSquare === selectedSquareForMove) {
        selectedSquareForMove = null;
        clearSquareMoveHighlights();
        return;
    }
    const pieceOnTarget = chess.get(clickedSquare);
    if (pieceOnTarget && pieceOnTarget.color === turn) {
        selectedSquareForMove = clickedSquare;
        highlightLegalMovesForSquare(clickedSquare, chess);
        return;
    }

    const source = selectedSquareForMove;
    const target = clickedSquare;
    selectedSquareForMove = null;
    clearSquareMoveHighlights();
    const piece = chess.get(source);
    const isPawn = piece && piece.type === 'p';
    const isPromotion = isPawn && ((turn === 'w' && source[1] === '7' && target[1] === '8') || (turn === 'b' && source[1] === '2' && target[1] === '1'));
    if (isPromotion) {
        if (chess.move({ from: source, to: target, promotion: 'q' })) showPromotionModal(source, target, turn);
        else SoundManager.playIllegal();
        return;
    }
    if (chess.move({ from: source, to: target })) handlePlayerMove(source, target, 'q', false);
    else SoundManager.playIllegal();
}

function initClickToMove() {
    const boardEl = document.getElementById('board');
    if (!boardEl) return;
    if (boardEl.dataset.clickMoveInitialized === 'true') return;
    boardEl.dataset.clickMoveInitialized = 'true';

    let touchStartInfo = null;

    boardEl.addEventListener('touchstart', (e) => {
        lastBoardMouseDownButton = 0;
        if (e.touches && e.touches.length === 1) {
            touchStartInfo = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY,
                time: Date.now()
            };
        } else {
            touchStartInfo = null;
        }
    }, { passive: true });

    boardEl.addEventListener('touchend', (e) => {
        if (!touchStartInfo || !e.changedTouches || e.changedTouches.length !== 1) {
            touchStartInfo = null;
            return;
        }
        const touch = e.changedTouches[0];
        const dist = Math.hypot(touch.clientX - touchStartInfo.x, touch.clientY - touchStartInfo.y);
        const dt = Date.now() - touchStartInfo.time;
        touchStartInfo = null;

        // Only treat as Tap-to-Move if finger didn't drag and wasn't just dropped as a drag move
        if (dist < 12 && dt < 500 && (Date.now() - lastBoardDropTimestamp > 200)) {
            const hitEl = document.elementFromPoint(touch.clientX, touch.clientY);
            const squareEl = (hitEl && hitEl.closest('.square-55d63')) || e.target.closest('.square-55d63');
            if (!squareEl) {
                handleSquareTap(null);
                return;
            }
            const match = squareEl.className.match(/square-([a-h][1-8])/);
            if (!match) return;
            lastTouchTapTimestamp = Date.now();
            handleSquareTap(match[1]);
        }
    }, { passive: true });

    boardEl.addEventListener('click', (e) => {
        if (e.button !== 0) return;
        if (Date.now() - lastTouchTapTimestamp < 450) return;
        if (Date.now() - lastBoardDropTimestamp < 200) return;
        const squareEl = e.target.closest('.square-55d63');
        if (!squareEl) {
            handleSquareTap(null);
            return;
        }
        const match = squareEl.className.match(/square-([a-h][1-8])/);
        if (!match) return;
        handleSquareTap(match[1]);
    });
}

// ============================================================================
// CHẾ ĐỘ ĐẤU VỚI BOT (PLAY FROM HERE AGAINST STOCKFISH)
// ============================================================================
function startBotGame() {
    stopAutoplay();
    if (isInTrialBranch()) {
        exitTrialBranch();
    }
    clearKingResultBadges();
    hideGameOverBanner();

    const currentFen = getCurrentBoardFen();
    botGameChess = new Chess(currentFen);
    if (botGameChess.game_over()) {
        showStatus('Thế cờ này đã kết thúc, không thể bắt đầu đấu với Bot.', 'info');
        return;
    }

    isBotGameActive = true;
    botMoveCount = 0;
    botThinking = false;
    botMovesHistory = [];
    botUserEvalSessionId++;

    // Xác định màu quân người chơi:
    const selectedGame = (AppState.selectedGameIndex !== null && AppState.loadedGames) ? AppState.loadedGames[AppState.selectedGameIndex] : null;
    botPlayerColor = selectedGame ? selectedGame.userColor : (board && board.orientation() === 'black' ? 'b' : 'w');

    // Cập nhật DOM
    const botPanel = document.getElementById('bot-game-panel');
    const btnPlayBotEl = document.getElementById('btn-play-bot');
    const btnExitBotEl = document.getElementById('btn-exit-bot');
    const checkWarningEl = document.getElementById('bot-check-warning');
    if (checkWarningEl) {
        checkWarningEl.classList.add('hidden');
        checkWarningEl.textContent = '';
    }
    if (botPanel) botPanel.classList.remove('hidden');
    if (btnPlayBotEl) btnPlayBotEl.classList.add('hidden');
    if (btnExitBotEl) btnExitBotEl.classList.remove('hidden');

    // Tách riêng biên bản đấu với Bot
    const moveListEl = document.getElementById('move-list');
    const botMoveListEl = document.getElementById('bot-move-list');
    if (moveListEl) moveListEl.classList.add('hidden');
    if (botMoveListEl) botMoveListEl.classList.remove('hidden');
    const tabMovesBtn = document.querySelector('.tabs button[data-tab="t-moves"]');
    if (tabMovesBtn) tabMovesBtn.click();
    hideBotUserFeedback();
    renderBotMoveList();

    const coachComment = document.getElementById('coach-comment-text');
    if (coachComment) coachComment.classList.add('hidden');
    const coachHints = document.getElementById('coach-hints-box');
    if (coachHints) coachHints.classList.add('hidden');
    const coachExplain = document.getElementById('coach-explain-box');
    if (coachExplain) coachExplain.classList.add('hidden');

    // Vô hiệu hóa nút nhảy nước cờ khi đang đấu với Bot
    const navButtons = [btnStart, btnPrev, btnPlay, btnNext, btnEnd, btnNextMistake, btnPrevMistake, btnCoachHint, btnCoachExplain];
    navButtons.forEach(btn => { if (btn) btn.disabled = true; });

    clearBoardHighlightsAndArrows();
    updateBotGameUI();

    // Nếu đến lượt Bot đi trước
    if (botGameChess.turn() !== botPlayerColor) {
        botThinking = true;
        updateBotGameUI();
        setTimeout(() => {
            executeBotMoveSafe();
        }, 400);
    }
}

function exitBotGame() {
    if (!isBotGameActive) return;
    stockfishEngine.stop();
    botUserEvalSessionId++;
    isBotGameActive = false;
    botThinking = false;
    botGameChess = null;
    botMovesHistory = [];
    clearKingResultBadges();
    hideGameOverBanner();

    const checkWarningEl = document.getElementById('bot-check-warning');
    if (checkWarningEl) {
        checkWarningEl.classList.add('hidden');
        checkWarningEl.textContent = '';
    }

    const botPanel = document.getElementById('bot-game-panel');
    const btnPlayBotEl = document.getElementById('btn-play-bot');
    const btnExitBotEl = document.getElementById('btn-exit-bot');
    if (botPanel) botPanel.classList.add('hidden');
    if (btnPlayBotEl) btnPlayBotEl.classList.remove('hidden');
    if (btnExitBotEl) btnExitBotEl.classList.add('hidden');

    // Khôi phục biên bản ván cờ chính
    const botMoveListEl = document.getElementById('bot-move-list');
    const moveListEl = document.getElementById('move-list');
    if (botMoveListEl) botMoveListEl.classList.add('hidden');
    if (moveListEl) moveListEl.classList.remove('hidden');
    hideBotUserFeedback();

    const coachComment = document.getElementById('coach-comment-text');
    if (coachComment) coachComment.classList.remove('hidden');

    // Khôi phục các nút điều hướng
    const navButtons = [btnStart, btnPrev, btnPlay, btnNext, btnEnd, btnCoachHint, btnCoachExplain];
    navButtons.forEach(btn => { if (btn) btn.disabled = false; });
    updateNextMistakeButtonState();

    // Khôi phục bàn cờ về nước đi hiện tại trong ván
    renderMoveList();
    goToMove(AppState.currentMoveIndex);
}

function updateBotGameUI() {
    // 1. Reset bắt buộc: LUÔN LUÔN ẩn thẻ cảnh báo Chiếu Vua ở đầu chu kỳ
    const checkWarningEl = document.getElementById('bot-check-warning');
    if (checkWarningEl) {
        checkWarningEl.classList.add('hidden');
        checkWarningEl.textContent = '';
    }

    if (!isBotGameActive || !botGameChess) return;

    const counterEl = document.getElementById('bot-moves-counter');
    const statusEl = document.getElementById('bot-status-message');
    const btnUndo = document.getElementById('btn-bot-undo');

    if (counterEl) {
        counterEl.textContent = t('bot_moves_count', botMovesHistory.length);
    }

    if (btnUndo) {
        btnUndo.disabled = (botThinking || botMovesHistory.length === 0);
    }

    if (!statusEl) return;
    statusEl.className = 'bot-status-message';

    if (botGameChess.game_over()) {
        let botResult = 'draw';
        let botReason = 'stalemate';
        let winnerColor = 'draw';

        if (botGameChess.in_checkmate()) {
            botReason = 'checkmate';
            if (botGameChess.turn() === botPlayerColor) {
                statusEl.textContent = t('bot_loss_checkmate');
                statusEl.classList.add('checkmate-loss');
                botResult = 'loss';
                winnerColor = (botPlayerColor === 'w') ? 'b' : 'w';
            } else {
                statusEl.textContent = t('bot_win_checkmate');
                statusEl.classList.add('checkmate');
                botResult = 'win';
                winnerColor = botPlayerColor;
            }
        } else if (botGameChess.in_stalemate()) {
            statusEl.textContent = t('bot_draw_stalemate');
            statusEl.classList.add('draw');
            botReason = 'stalemate';
        } else if (botGameChess.in_threefold_repetition()) {
            statusEl.textContent = t('bot_draw_repetition');
            statusEl.classList.add('draw');
            botReason = 'repetition';
        } else if (botGameChess.insufficient_material()) {
            statusEl.textContent = t('bot_draw_material');
            statusEl.classList.add('draw');
            botReason = 'insufficient';
        } else {
            statusEl.textContent = t('bot_draw_generic');
            statusEl.classList.add('draw');
            botReason = '50move';
        }

        renderKingResultBadges(winnerColor, botGameChess.fen());
        showGameOverBanner({
            result: botResult,
            reason: botReason,
            isBotGame: true
        });
        return;
    } else {
        clearKingResultBadges();
        hideGameOverBanner();
    }

    if (botThinking) {
        statusEl.textContent = t('bot_thinking');
        statusEl.classList.add('thinking');
        return;
    }

    const isUserTurn = botGameChess.turn() === botPlayerColor;
    const colorLabel = botPlayerColor === 'w' ? (currentLang === 'en' ? 'White' : 'Trắng') : (currentLang === 'en' ? 'Black' : 'Đen');
    if (isUserTurn) {
        // 2. Kiểm tra in_check() trên FEN chuẩn xác bằng đối tượng Chess mới
        const currentFen = botGameChess.fen();
        const checkChess = new Chess(currentFen);
        const isUserInCheck = checkChess.in_check() && (checkChess.turn() === botPlayerColor);

        if (isUserInCheck) {
            statusEl.textContent = t('bot_in_check', colorLabel);
            statusEl.classList.add('thinking');
            if (checkWarningEl) {
                checkWarningEl.textContent = t('bot_in_check', colorLabel);
                checkWarningEl.classList.remove('hidden');
            }
        } else {
            statusEl.textContent = t('bot_your_turn', colorLabel);
            if (checkWarningEl) {
                checkWarningEl.classList.add('hidden');
            }
        }
    } else {
        statusEl.textContent = t('bot_thinking');
        statusEl.classList.add('thinking');
        if (checkWarningEl) {
            checkWarningEl.classList.add('hidden');
        }
    }
}

function getBotSkillConfig() {
    const eloSelect = document.getElementById('select-bot-elo');
    let eloVal = 1200;
    if (eloSelect) {
        eloVal = Number(eloSelect.value) || 1200;
    } else {
        try {
            eloVal = Number(localStorage.getItem('chess_bot_elo')) || 1200;
        } catch (e) { }
    }
    const configMap = {
        800: { skillLevel: 2, depth: 5 },
        1200: { skillLevel: 6, depth: 8 },
        1600: { skillLevel: 11, depth: 11 },
        2000: { skillLevel: 16, depth: 14 },
        2400: { skillLevel: 20, depth: 16 }
    };
    return configMap[eloVal] || { skillLevel: 6, depth: 8 };
}

function initBotEloSelector() {
    const eloSelect = document.getElementById('select-bot-elo');
    if (!eloSelect) return;
    try {
        const saved = localStorage.getItem('chess_bot_elo');
        if (saved && eloSelect.querySelector(`option[value="${saved}"]`)) {
            eloSelect.value = saved;
        }
    } catch (e) { }
    eloSelect.addEventListener('change', () => {
        try {
            localStorage.setItem('chess_bot_elo', eloSelect.value);
        } catch (e) { }
    });
}

async function executeBotMoveSafe() {
    const currentFen = getCurrentBoardFen();
    const tempChess = new Chess(currentFen);

    // 1. Kiểm tra Cờ tàn / Chiếu hết trước khi gọi Bot
    if (tempChess.in_checkmate() || tempChess.in_draw() || tempChess.in_stalemate() || tempChess.moves().length === 0) {
        console.log("Game Over. Bot ngưng hoạt động.");
        botThinking = false;
        updateBotGameUI();
        return;
    }

    // 2. TẠM TẮT Live Engine & Analysis để chống đụng độ (Race Condition)
    const wasLiveEngineEnabled = isLiveEngineEnabled;
    isLiveEngineEnabled = false;
    AppState.isAnalyzing = true; // Khóa luồng phân tích phụ
    botThinking = true;
    updateBotGameUI();

    try {
        // 3. Cho Bot suy nghĩ theo mức độ Elo đã chọn
        const botConfig = getBotSkillConfig();
        const result = await stockfishEngine.evaluatePosition(currentFen, botConfig.depth, null, true, 0, botConfig.skillLevel);
        let botMoveUci = result?.bestmove;

        if (!botMoveUci || botMoveUci === '(none)') {
            // Fallback khẩn cấp nếu Engine kẹt
            const legalMoves = tempChess.moves({ verbose: true });
            if (legalMoves.length > 0 && legalMoves[0].from && legalMoves[0].to) {
                botMoveUci = legalMoves[0].from + legalMoves[0].to + (legalMoves[0].promotion || '');
            } else {
                return;
            }
        }

        // 4. Parse UCI và thực thi nước đi
        const moveObj = {
            from: botMoveUci.substring(0, 2),
            to: botMoveUci.substring(2, 4),
            promotion: botMoveUci.length > 4 ? botMoveUci.charAt(4) : 'q'
        };

        const validMove = tempChess.move(moveObj);
        if (validMove) {
            handlePlayerMove(validMove.from, validMove.to, validMove.promotion, false);
        } else {
            console.error("Bot tạo nước đi lỗi:", moveObj);
            const legalMoves = tempChess.moves({ verbose: true });
            if (legalMoves.length > 0 && legalMoves[0].from && legalMoves[0].to) {
                const fb = legalMoves[0];
                handlePlayerMove(fb.from, fb.to, fb.promotion || 'q', false);
            }
        }

    } catch (error) {
        console.error("Lỗi khi Bot suy nghĩ:", error);
        try {
            const fallbackChess = new Chess(getCurrentBoardFen());
            const legalMoves = fallbackChess.moves({ verbose: true });
            if (legalMoves.length > 0 && legalMoves[0].from && legalMoves[0].to) {
                const fb = legalMoves[0];
                handlePlayerMove(fb.from, fb.to, fb.promotion || 'q', false);
            }
        } catch (fbErr) {
            console.error("Lỗi fallback Bot:", fbErr);
        }
    } finally {
        // 5. Trả lại trạng thái sau khi Bot đi xong
        botThinking = false;
        isLiveEngineEnabled = wasLiveEngineEnabled;
        AppState.isAnalyzing = false;
        updateBotGameUI();

        // Gọi lại phân tích cho nước Bot vừa đi (nếu cần), đảm bảo Engine sẵn sàng và ván cờ chưa kết thúc
        if (isLiveEngineEnabled && stockfishEngine && stockfishEngine.isReady && botGameChess && !botGameChess.game_over()) {
            try {
                triggerLiveAnalysis(getCurrentBoardFen());
            } catch (liveErr) {
                console.warn("Không thể kích hoạt Live Analysis sau nước đi của Bot:", liveErr);
            }
        }
    }
}

const triggerBotResponse = executeBotMoveSafe;
const playBotMove = executeBotMoveSafe;
if (typeof window !== 'undefined') {
    window.executeBotMoveSafe = executeBotMoveSafe;
    window.triggerBotResponse = triggerBotResponse;
    window.playBotMove = playBotMove;
}

/**
 * Đánh giá và chấm điểm (classification, badge) CHỈ cho nước đi của người chơi trong chế độ Bot
 */
async function evaluateAndClassifyBotUserMove(userPly, fenBefore, fenAfter, moveRes, evalSessionId) {
    if (!isBotGameActive || !botGameChess || AppState.isAnalyzing) return;
    if (evalSessionId !== undefined && evalSessionId !== botUserEvalSessionId) return;
    try {
        const evalBefore = await stockfishEngine.evaluatePosition(fenBefore, 10);
        if (!isBotGameActive || !botGameChess || AppState.isAnalyzing) return;
        if (evalSessionId !== undefined && evalSessionId !== botUserEvalSessionId) return;
        const evalAfter = await stockfishEngine.evaluatePosition(fenAfter, 10);
        if (!isBotGameActive || !botGameChess) return;
        if (evalSessionId !== undefined && evalSessionId !== botUserEvalSessionId) return;

        userPly.eval = evalAfter;
        const playedUci = `${moveRes.from}${moveRes.to}${moveRes.promotion || ''}`;
        const bestUci = evalBefore?.bestmove;

        const evalPrevPrev = (botMovesHistory.length >= 2 && botMovesHistory[botMovesHistory.length - 2]?.eval) ? botMovesHistory[botMovesHistory.length - 2].eval : null;
        const classification = evaluateMoveQuality(
            evalBefore, evalAfter, userPly.color, playedUci, bestUci, botMovesHistory.length, {
            evalPrevPrev,
            move: userPly
        }
        );

        if (typeof detectBrilliant === 'function' && detectBrilliant({ move: userPly, eval: evalAfter, classification, fen: fenAfter }, { eval: evalBefore, fen: fenBefore })) {
            classification.isBrilliant = true;
            classification.category = 'Brilliant';
        }

        userPly.classification = classification;

        if (isBotGameActive && botGameChess && (evalSessionId === undefined || evalSessionId === botUserEvalSessionId)) {
            renderBoardMoveEvaluationBadge(userPly.to, classification.category, classification.isBrilliant);
            showBotUserFeedback(userPly);
            renderBotMoveList();

            // Nếu người chơi mắc lỗi và bật hiển thị Best Move, vẽ mũi tên chỉ dẫn
            const cat = classification.category;
            const isError = (cat === 'Blunder' || cat === 'Mistake' || cat === 'Miss' || cat === 'Inaccuracy');
            if (isError && isShowingBestMove && bestUci && bestUci.length >= 4 && bestUci !== '(none)' && bestUci !== playedUci) {
                drawBestMoveOnBoard(bestUci, 'Best');
            }
        }
    } catch (err) {
        // Silently catch interrupted evaluation
    }
}

function showBotUserFeedback(userPly) {
    const feedbackEl = document.getElementById('bot-user-feedback');
    if (!feedbackEl || !userPly || !userPly.classification) return;
    const cat = userPly.classification.category;
    const catName = typeof getCategoryName === 'function' ? getCategoryName(cat, currentLang) : cat;
    const color = CATEGORY_ARROW_COLORS[cat] || '#81b64c';
    const badgeMarkup = typeof badgeHTML === 'function'
        ? badgeHTML(cat, 22, `move-class-badge badge-${cat.toLowerCase()}`)
        : `<span class="move-class-badge badge-${cat.toLowerCase()}">${EVAL_BADGE_SYMBOLS[cat] || '★'}</span>`;
    feedbackEl.innerHTML = `
    ${badgeMarkup}
    <span><strong>${escapeHTML(userPly.san)}:</strong> <span style="color:${color};font-weight:700;">${escapeHTML(catName)}</span></span>
`;
    feedbackEl.classList.remove('hidden');
}

function hideBotUserFeedback() {
    const feedbackEl = document.getElementById('bot-user-feedback');
    if (feedbackEl) {
        feedbackEl.innerHTML = '';
        feedbackEl.classList.add('hidden');
    }
}

/**
 * Hiển thị danh sách nước đi của riêng trận đấu với Bot
 */
function renderBotMoveList() {
    const rowsContainer = document.getElementById('bot-moves-rows');
    const liveCountEl = document.getElementById('bot-moves-live-count');
    if (liveCountEl) {
        liveCountEl.textContent = t('bot_moves_count', botMovesHistory.length);
    }
    if (!rowsContainer) return;

    if (botMovesHistory.length === 0) {
        rowsContainer.innerHTML = `<p class="empty-text">${t('bot_no_moves')}</p>`;
        return;
    }

    let html = '';
    for (let i = 0; i < botMovesHistory.length; i += 2) {
        const turnNum = Math.floor(i / 2) + 1;
        const whiteMove = botMovesHistory[i];
        const blackMove = botMovesHistory[i + 1] || null;

        const renderCell = (mv) => {
            if (!mv) return '<span class="bot-move-san"></span>';
            let badgeHtml = '';
            if (mv.isUser && mv.classification) {
                const cat = mv.classification.category;
                const catName = typeof getCategoryName === 'function' ? getCategoryName(cat, currentLang) : cat;
                if (typeof badgeHTML === 'function') {
                    badgeHtml = badgeHTML(cat, 20, {
                        class: `move-class-badge badge-${cat.toLowerCase()}`,
                        title: catName
                    });
                } else {
                    const sym = EVAL_BADGE_SYMBOLS[cat] || '★';
                    badgeHtml = `<span class="move-class-badge badge-${cat.toLowerCase()}" title="${catName}">${sym}</span>`;
                }
            }
            const colClass = mv.isUser ? 'user-col' : 'bot-col';
            return `<span class="bot-move-san ${colClass}">${escapeHTML(mv.san)} ${badgeHtml}</span>`;
        };

        html += `
        <div class="bot-move-row">
            <span class="bot-move-num">${turnNum}.</span>
            ${renderCell(whiteMove)}
            ${renderCell(blackMove)}
        </div>
    `;
    }
    rowsContainer.innerHTML = html;
    rowsContainer.scrollTop = rowsContainer.scrollHeight;
}

/**
 * Nút "Đi lùi / Đánh lại" (Undo / Go Back):
 * Rút lại nước đi vừa rồi của người chơi (lùi 2 nước: nước của người chơi và nước của Bot vừa đáp trả)
 */
function handleBotUndo() {
    if (!isBotGameActive || !botGameChess || botThinking) return;
    if (botMovesHistory.length === 0) return;

    // Tăng session ID để lập tức vô hiệu hóa bất kỳ tiến trình phân tích ngầm nào của nước cờ vừa bị hủy
    botUserEvalSessionId++;

    // Nếu đến lượt người chơi đi (nghĩa là Bot vừa đi xong lượt trước)
    // Hệ thống sẽ tự động lùi lại 2 nước: nước của Bot và nước của người chơi
    if (botGameChess.turn() === botPlayerColor) {
        if (botMovesHistory.length > 0) {
            botGameChess.undo();
            botMovesHistory.pop();
        }
        if (botMovesHistory.length > 0) {
            botGameChess.undo();
            botMovesHistory.pop();
        }
    } else {
        // Người chơi vừa đi, Bot chưa kịp đáp trả
        if (botMovesHistory.length > 0) {
            botGameChess.undo();
            botMovesHistory.pop();
        }
    }

    botMoveCount = botMovesHistory.length;
    board.position(botGameChess.fen(), true);
    clearBoardHighlightsAndArrows();
    clearBoardEvaluationBadge();
    hideBotUserFeedback();

    if (botGameChess.in_check()) {
        highlightCheckSquare(botGameChess.turn());
        const checkWarningEl = document.getElementById('bot-check-warning');
        if (checkWarningEl) {
            checkWarningEl.classList.remove('hidden');
            checkWarningEl.textContent = botGameChess.turn() === botPlayerColor
                ? t('bot_check_user')
                : t('bot_check_bot');
        }
    } else {
        const checkWarningEl = document.getElementById('bot-check-warning');
        if (checkWarningEl) {
            checkWarningEl.classList.add('hidden');
            checkWarningEl.textContent = '';
        }
    }

    if (botMovesHistory.length > 0) {
        const lastMove = botMovesHistory[botMovesHistory.length - 1];
        lastMove.eval = null; // Reset eval để tránh kẹt trạng thái
        lastMove.classification = null;
        highlightActualMove(lastMove);
    }

    SoundManager.playMove();
    renderBotMoveList();
    updateBotGameUI();
}

function handlePrevMove() {
    stopAutoplay();
    if (isInTrialBranch()) {
        if (AppState.trialBranch.currentIndex > 0) { AppState.trialBranch.currentIndex--; updateBoardToTrialCurrent(); }
        else { AppState.trialBranch.isViewingBranch = false; AppState.trialBranch.currentIndex = null; goToMove(AppState.trialBranch.baseMoveIndex); }
        return;
    }
    if (AppState.currentMoveIndex > 0) goToMove(AppState.currentMoveIndex - 1);
}
function handleNextMove() {
    stopAutoplay();
    if (isInTrialBranch()) {
        if (AppState.trialBranch.currentIndex < AppState.trialBranch.positions.length - 1) { AppState.trialBranch.currentIndex++; updateBoardToTrialCurrent(); }
        return;
    }
    if (AppState.trialBranch && AppState.currentMoveIndex === AppState.trialBranch.baseMoveIndex && AppState.trialBranch.positions.length > 0) {
        AppState.trialBranch.isViewingBranch = true; AppState.trialBranch.currentIndex = 0; updateBoardToTrialCurrent(); return;
    }
    if (AppState.currentMoveIndex < AppState.gamePositions.length - 1) goToMove(AppState.currentMoveIndex + 1);
}
function handleStartMove() { stopAutoplay(); if (isInTrialBranch()) { AppState.trialBranch.isViewingBranch = false; AppState.trialBranch.currentIndex = null; goToMove(AppState.trialBranch.baseMoveIndex); return; } goToMove(0); }
function handleEndMove() { stopAutoplay(); if (isInTrialBranch()) { AppState.trialBranch.currentIndex = AppState.trialBranch.positions.length - 1; updateBoardToTrialCurrent(); return; } goToMove(AppState.gamePositions.length - 1); }

function highlightCheckSquare(turn) {
    const boardEl = document.getElementById('board');
    if (!boardEl || !botGameChess) return;
    boardEl.querySelectorAll('.square-in-check').forEach(sq => sq.classList.remove('square-in-check'));
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const ranks = ['1', '2', '3', '4', '5', '6', '7', '8'];
    for (const f of files) {
        for (const r of ranks) {
            const sq = f + r;
            const piece = botGameChess.get(sq);
            if (piece && piece.type === 'k' && piece.color === turn) {
                const sqEl = boardEl.querySelector(`.square-${sq}`);
                if (sqEl) sqEl.classList.add('square-in-check');
                return;
            }
        }
    }
}

function clearBoardHighlightsAndArrows() {
    const boardEl = document.getElementById('board');
    if (boardEl) boardEl.querySelectorAll('.square-55d63').forEach(sq => sq.classList.remove('highlight-last-move', 'highlight-best-move', 'square-in-check'));
    if (boardOverlaySvg) boardOverlaySvg.innerHTML = '';
    if (typeof clearArrows === 'function') clearArrows();
    clearBoardEvaluationBadge();
    clearKingResultBadges();
}
function highlightActualMove(moveObj) {
    if (!moveObj) return;
    const boardEl = document.getElementById('board'); if (!boardEl) return;
    const fromSq = boardEl.querySelector(`.square-${moveObj.from}`); const toSq = boardEl.querySelector(`.square-${moveObj.to}`);
    if (fromSq) fromSq.classList.add('highlight-last-move'); if (toSq) toSq.classList.add('highlight-last-move');
}

function drawBestMoveOnBoard(bestUci, categoryOverride, validationFen = null) {
    if (!bestUci || bestUci.length < 4 || bestUci === '(none)') return;
    let showArrow = true;
    try {
        const savedArrow = readStoredSetting('bestArrow', null) ?? localStorage.getItem('chess_show_best_arrow');
        if (savedArrow !== null) {
            showArrow = (savedArrow === true || savedArrow === 'true');
        }
    } catch (e) { }
    if (!showArrow) return;

    const currentFen = validationFen || getCurrentBoardFen();
    if (typeof Chess === 'function') {
        const currentChess = new Chess(currentFen);
        if (currentChess.in_checkmate() || currentChess.in_draw() || currentChess.moves().length === 0) return;

        const activeTurn = currentChess.turn();
        const fromSquare = bestUci.slice(0, 2);
        const toSquare = bestUci.slice(2, 4);

        // 1. Xác định chính xác lượt đi hiện tại từ FEN được kiểm tra
        const piece = currentChess.get(fromSquare);

        // 2. Đồng bộ hóa mũi tên với Stockfish:
        // Nếu activeTurn === 'w' mà nước đi trong bestmove lại là của quân đen (hoặc ngược lại), chỉ ép re-eval nếu là FEN hiện tại
        if (!piece || piece.color !== activeTurn) {
            console.warn(`[BestMoveArrow] Mũi tên ${bestUci} không khớp với lượt đi (${activeTurn}) của FEN (${currentFen}).`);
            if (currentFen === getCurrentBoardFen() && !AppState.isAnalyzing && typeof triggerLiveAnalysis === 'function') {
                triggerLiveAnalysis(currentFen, true);
            }
            return;
        }

        // 3. Kiểm tra tính hợp lệ của nước đi theo luật cờ vua
        const legalMoves = currentChess.moves({ verbose: true });
        const isLegal = legalMoves.some(m => m.from === fromSquare && m.to === toSquare);
        if (!isLegal) {
            console.warn(`[BestMoveArrow] Nước đi ${bestUci} không phải nước đi hợp lệ cho lượt hiện tại (${activeTurn}).`);
            if (currentFen === getCurrentBoardFen() && !AppState.isAnalyzing && typeof triggerLiveAnalysis === 'function') {
                triggerLiveAnalysis(currentFen, true);
            }
            return;
        }

        const boardEl = document.getElementById('board');
        if (boardEl) {
            const fromEl = boardEl.querySelector(`.square-${fromSquare}`);
            const toEl = boardEl.querySelector(`.square-${toSquare}`);
            if (fromEl) fromEl.classList.add('highlight-best-move');
            if (toEl) toEl.classList.add('highlight-best-move');
        }
        const arrowColor = '#81b64c';
        if (typeof drawArrow === 'function') {
            drawArrow(fromSquare, toSquare, arrowColor, {
                width: 17,
                opacity: 0.82,
                className: 'board-arrow arrow-best'
            });
        }
    }
}

function updateCurrentMoveArrow() {
    if (isShowingHints) return;
    if (typeof clearArrows === 'function') clearArrows();
    const boardEl = document.getElementById('board');
    if (boardEl) {
        boardEl.querySelectorAll('.square-55d63').forEach(sq => sq.classList.remove('highlight-best-move'));
    }

    const currentFen = getCurrentBoardFen();
    if (!currentFen) return;
    if (typeof Chess === 'function') {
        const currentChess = new Chess(currentFen);
        if (currentChess.in_checkmate() || currentChess.in_draw() || currentChess.moves().length === 0) {
            clearBoardEvaluationBadge();
            return;
        }
    }

    if (isInTrialBranch()) {
        const trialPos = AppState.trialBranch.positions[AppState.trialBranch.currentIndex];
        if (trialPos) {
            if (trialPos.move && trialPos.classification) {
                const isBrill = Boolean(trialPos.classification?.isBrilliant);
                const cat = isBrill ? 'Brilliant' : trialPos.classification.category;
                renderBoardMoveEvaluationBadge(trialPos.move.to, cat, isBrill);
            } else {
                clearBoardEvaluationBadge();
            }

            // Gợi ý nước đi tốt nhất trên chính thế cờ hiện tại của nhánh thử
            const bestUci = trialPos?.eval?.bestmove;
            if (isShowingBestMove && bestUci && bestUci.length >= 4 && bestUci !== '(none)') {
                drawBestMoveOnBoard(bestUci, 'Best', trialPos.fen);
            }
        }
        return;
    }

    if (!AppState.gamePositions || !AppState.gamePositions.length) {
        clearBoardEvaluationBadge();
        return;
    }

    const currentPos = AppState.gamePositions[AppState.currentMoveIndex];
    if (!currentPos) {
        clearBoardEvaluationBadge();
        return;
    }

    // Hiển thị badge đánh giá nước đi vừa thực hiện trên ô đích
    if (AppState.currentMoveIndex > 0 && currentPos.move && currentPos.classification) {
        const isBrill = Boolean(currentPos.classification?.isBrilliant);
        const cat = isBrill ? 'Brilliant' : currentPos.classification.category;
        renderBoardMoveEvaluationBadge(currentPos.move.to, cat, isBrill);
    } else {
        clearBoardEvaluationBadge();
    }

    // Vẽ mũi tên gợi ý nước đi tốt nhất (Best Move) sửa sai cho người dùng:
    // Khi đang xem lại nước đi (AppState.currentMoveIndex > 0), phải lấy prevPos.eval.bestmove thay vì currentPos.eval.bestmove
    const prevPos = AppState.currentMoveIndex > 0 ? AppState.gamePositions[AppState.currentMoveIndex - 1] : null;
    const targetPos = (AppState.currentMoveIndex > 0 && prevPos) ? prevPos : currentPos;
    const bestUci = targetPos?.eval?.bestmove;
    const targetFen = targetPos ? targetPos.fen : getCurrentBoardFen();

    if (isShowingBestMove && bestUci && bestUci.length >= 4 && bestUci !== '(none)') {
        drawBestMoveOnBoard(bestUci, 'Best', targetFen);
    }
}

// ============================================================================
// EVAL BAR & CHART
// ============================================================================
function updateEvalBarOrientation(orientation) {
    if (!evalBar) return;
    if (orientation === 'black') { evalBar.classList.add('orientation-black'); evalBar.classList.remove('orientation-white'); }
    else { evalBar.classList.add('orientation-white'); evalBar.classList.remove('orientation-black'); }
}

function setEvalBarDisplay(whiteWinPct, scoreText, isWhiteAhead) {
    if (!evalBarWhite || !evalBarBlack) return;
    const clampedWhitePct = Math.max(0, Math.min(100, whiteWinPct));
    const clampedBlackPct = 100 - clampedWhitePct;
    evalBarWhite.style.height = `${clampedWhitePct}%`; evalBarBlack.style.height = `${clampedBlackPct}%`;
    if (evalScoreWhite && evalScoreBlack) {
        evalScoreWhite.textContent = ''; evalScoreBlack.textContent = '';
        if (isWhiteAhead === null || !scoreText) return;
        if (isWhiteAhead) {
            evalScoreWhite.textContent = scoreText;
            evalScoreWhite.style.color = '#333';
        } else {
            evalScoreBlack.textContent = scoreText;
            evalScoreBlack.style.color = '#fff';
        }
    }
}

function updateEvalBar() {
    if (!AppState.gamePositions || !AppState.gamePositions.length) { setEvalBarDisplay(50, '', null); return; }
    const currentPos = AppState.gamePositions[AppState.currentMoveIndex];
    if (!currentPos || !currentPos.eval) { setEvalBarDisplay(50, '', null); return; }
    const ev = currentPos.eval;
    let whiteWinPct = 50; let scoreText = '0.0'; let isWhiteAhead = true;
    if (ev.mateWhite === 0) {
        if (ev.cpWhite > 0) { whiteWinPct = 100; scoreText = '1-0'; isWhiteAhead = true; }
        else { whiteWinPct = 0; scoreText = '0-1'; isWhiteAhead = false; }
    } else if (ev.mateWhite !== null && ev.mateWhite !== undefined) {
        if (ev.mateWhite > 0) { whiteWinPct = 100; scoreText = `M${Math.abs(ev.mateWhite)}`; isWhiteAhead = true; }
        else { whiteWinPct = 0; scoreText = `-M${Math.abs(ev.mateWhite)}`; isWhiteAhead = false; }
    } else if (ev.cpWhite !== null && ev.cpWhite !== undefined) {
        whiteWinPct = (typeof calculateWinPercentage === 'function')
            ? calculateWinPercentage(ev.cpWhite)
            : (50 + 50 * (2 / (1 + Math.exp(-0.00368208 * ev.cpWhite)) - 1));
        const centered = whiteWinPct - 50;
        whiteWinPct = Math.max(2, Math.min(98, 50 + centered * 1.35));
        const scoreVal = ev.cpWhite / 100;
        if (Math.abs(scoreVal) < 0.05) { scoreText = '0.0'; isWhiteAhead = true; }
        else if (scoreVal > 0) { scoreText = `+${scoreVal.toFixed(1)}`; isWhiteAhead = true; }
        else { scoreText = `${scoreVal.toFixed(1)}`; isWhiteAhead = false; }
    }
    setEvalBarDisplay(whiteWinPct, scoreText, isWhiteAhead);
}

function drawEvalChart() {
    if (!evalChartSvg) return;
    if (!AppState.gamePositions || AppState.gamePositions.length === 0) { evalChartSvg.innerHTML = ''; return; }
    const totalPositions = AppState.gamePositions.length; const svgWidth = 600; const svgHeight = 100; const centerY = 50; const padY = 8; const effectiveHeight = svgHeight - 2 * padY;
    const points = [];
    for (let i = 0; i < totalPositions; i++) {
        const x = (totalPositions > 1) ? (i / (totalPositions - 1)) * svgWidth : (svgWidth / 2);
        const pos = AppState.gamePositions[i];
        let winPct = 50;
        if (pos && pos.eval) {
            if (pos.eval.mateWhite === 0) winPct = (pos.eval.cpWhite > 0) ? 100 : 0;
            else if (pos.eval.mateWhite !== null && pos.eval.mateWhite !== undefined) winPct = (pos.eval.mateWhite > 0) ? 100 : 0;
            else if (pos.eval.cpWhite !== null && pos.eval.cpWhite !== undefined) winPct = calculateWinPercentage(pos.eval.cpWhite);
        }
        const displayWinPct = scaleWinPctForChart(winPct);
        const y = padY + (1 - displayWinPct / 100) * effectiveHeight;
        points.push({ x: Number(x.toFixed(1)), y: Number(y.toFixed(1)), pos: pos, index: i });
    }
    const linePathD = points.map((pt, idx) => `${idx === 0 ? 'M' : 'L'} ${pt.x} ${pt.y}`).join(' ');
    const areaPoints = [{ x: points[0].x, y: centerY }];
    for (let i = 0; i < points.length; i++) {
        const pt = points[i];
        if (i > 0) {
            const prev = points[i - 1];
            if ((prev.y - centerY) * (pt.y - centerY) < 0) {
                const t = (centerY - prev.y) / (pt.y - prev.y);
                const crossX = prev.x + t * (pt.x - prev.x);
                areaPoints.push({ x: Number(crossX.toFixed(1)), y: centerY });
            }
        }
        areaPoints.push(pt);
    }
    const lastX = points[points.length - 1].x; areaPoints.push({ x: lastX, y: centerY });
    const areaPolygonD = 'M ' + areaPoints.map(p => `${p.x} ${p.y}`).join(' L ') + ' Z';
    let dotsHtml = '';
    for (let i = 1; i < points.length; i++) {
        const pt = points[i];
        if (!pt.pos || !pt.pos.classification) continue;
        const cat = pt.pos.classification.category;
        const moveSan = (pt.pos.move && pt.pos.move.san) ? pt.pos.move.san : '';
        const movePrefix = (i % 2 === 1) ? `${Math.ceil(i / 2)}.` : `${Math.ceil(i / 2)}...`;
        if (cat === 'Mistake') dotsHtml += `<circle class="chart-error-dot" data-move-index="${i}" cx="${pt.x}" cy="${pt.y}" r="4" fill="#ea580c" stroke="#ffffff" stroke-width="1.5"><title>Nước ${movePrefix}${moveSan} - Sai lầm (Mistake)</title></circle>`;
        else if (cat === 'Blunder') dotsHtml += `<circle class="chart-error-dot" data-move-index="${i}" cx="${pt.x}" cy="${pt.y}" r="5" fill="#dc2626" stroke="#ffffff" stroke-width="1.8"><title>Nước ${movePrefix}${moveSan} - Sai lầm nặng (Blunder)</title></circle>`;
    }
    const curIdx = Math.max(0, Math.min(points.length - 1, AppState.currentMoveIndex));
    const curPoint = points[curIdx] || { x: 0, y: centerY };
    evalChartSvg.innerHTML = `<defs><clipPath id="chart-clip-white"><rect x="0" y="0" width="${svgWidth}" height="${centerY}" /></clipPath><clipPath id="chart-clip-black"><rect x="0" y="${centerY}" width="${svgWidth}" height="${svgHeight - centerY}" /></clipPath></defs><rect x="0" y="0" width="${svgWidth}" height="${centerY}" fill="#64748b" /><rect x="0" y="${centerY}" width="${svgWidth}" height="${svgHeight - centerY}" fill="#475569" /><path d="${areaPolygonD}" fill="#ffffff" clip-path="url(#chart-clip-white)" /><path d="${areaPolygonD}" fill="#0f172a" clip-path="url(#chart-clip-black)" /><line x1="0" y1="${centerY}" x2="${svgWidth}" y2="${centerY}" stroke="#cbd5e1" stroke-width="1.2" stroke-dasharray="4,3" /><path d="${linePathD}" fill="none" stroke="#38bdf8" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" /><g id="chart-error-dots">${dotsHtml}</g><line id="chart-marker-line" x1="${curPoint.x}" y1="0" x2="${curPoint.x}" y2="${svgHeight}" stroke="#ffffff" stroke-width="1.8" stroke-dasharray="3,2" /><circle id="chart-marker-handle" cx="${curPoint.x}" cy="${curPoint.y}" r="5" fill="#0284c7" stroke="#ffffff" stroke-width="2" />`;
}

function updateEvalChartMarker(overrideIndex = null) {
    const markerLine = document.getElementById('chart-marker-line'); const markerHandle = document.getElementById('chart-marker-handle');
    if (!markerLine || !markerHandle || !AppState.gamePositions || !AppState.gamePositions.length) { drawEvalChart(); return; }
    const totalPositions = AppState.gamePositions.length; const svgWidth = 600; const svgHeight = 100; const padY = 8; const effectiveHeight = svgHeight - 2 * padY;
    const activeIndex = (overrideIndex !== null && typeof overrideIndex === 'number') ? overrideIndex : AppState.currentMoveIndex;
    const curIdx = Math.max(0, Math.min(totalPositions - 1, activeIndex));
    const curX = (totalPositions > 1) ? (curIdx / (totalPositions - 1)) * svgWidth : (svgWidth / 2);
    const pos = AppState.gamePositions[curIdx]; let winPct = 50;
    if (pos && pos.eval) {
        if (pos.eval.mateWhite === 0) winPct = (pos.eval.cpWhite > 0) ? 100 : 0;
        else if (pos.eval.mateWhite !== null && pos.eval.mateWhite !== undefined) winPct = (pos.eval.mateWhite > 0) ? 100 : 0;
        else if (pos.eval.cpWhite !== null && pos.eval.cpWhite !== undefined) winPct = calculateWinPercentage(pos.eval.cpWhite);
    }
    const displayWinPct = scaleWinPctForChart(winPct); const curY = padY + (1 - displayWinPct / 100) * effectiveHeight;
    markerLine.setAttribute('x1', curX.toFixed(1)); markerLine.setAttribute('x2', curX.toFixed(1));
    markerHandle.setAttribute('cx', curX.toFixed(1)); markerHandle.setAttribute('cy', curY.toFixed(1));
}

function calculateMaterialAndCaptured(fen) {
    const starting = { p: 8, n: 2, b: 2, r: 2, q: 1 }; const values = { p: 1, n: 3, b: 3, r: 5, q: 9 };
    const counts = { w: { p: 0, n: 0, b: 0, r: 0, q: 0 }, b: { p: 0, n: 0, b: 0, r: 0, q: 0 } };
    if (typeof Chess !== 'undefined' && fen) {
        try {
            const tempChess = new Chess(fen); const boardGrid = tempChess.board();
            for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) { const piece = boardGrid[r][c]; if (piece && counts[piece.color] && counts[piece.color][piece.type] !== undefined) counts[piece.color][piece.type]++; }
        } catch (e) { }
    }
    const whiteCaptured = { q: Math.max(0, starting.q - counts.b.q), r: Math.max(0, starting.r - counts.b.r), b: Math.max(0, starting.b - counts.b.b), n: Math.max(0, starting.n - counts.b.n), p: Math.max(0, starting.p - counts.b.p) };
    const blackCaptured = { q: Math.max(0, starting.q - counts.w.q), r: Math.max(0, starting.r - counts.w.r), b: Math.max(0, starting.b - counts.w.b), n: Math.max(0, starting.n - counts.w.n), p: Math.max(0, starting.p - Math.max(0, counts.w.p)) };
    let whiteMaterial = 0; let blackMaterial = 0;
    ['p', 'n', 'b', 'r', 'q'].forEach(type => { whiteMaterial += counts.w[type] * values[type]; blackMaterial += counts.b[type] * values[type]; });
    const diff = whiteMaterial - blackMaterial;
    return { whiteCaptured, blackCaptured, whiteAdvantage: diff > 0 ? diff : 0, blackAdvantage: diff < 0 ? Math.abs(diff) : 0 };
}
function formatCapturedPiecesHtml(captured, color) {
    const symbols = (color === 'w') ? { q: '♛', r: '♜', b: '♝', n: '♞', p: '♟' } : { q: '♕', r: '♖', b: '♗', n: '♘', p: '♙' };
    let html = ''; const order = ['q', 'r', 'b', 'n', 'p'];
    order.forEach(type => { const count = captured[type]; if (count > 0) html += `<span class="captured-symbol ${color === 'w' ? 'captured-black-piece' : 'captured-white-piece'}">${symbols[type].repeat(count)}</span>`; });
    return html;
}
function updatePlayersDisplay() {
    if (AppState.selectedGameIndex === null || !AppState.loadedGames[AppState.selectedGameIndex]) return;
    const game = AppState.loadedGames[AppState.selectedGameIndex];
    const currentOrientation = board ? board.orientation() : (game.userColor === 'w' ? 'white' : 'black');
    const whitePlayer = { name: game.userColor === 'w' ? game.userUsername : game.opponentUsername, rating: game.userColor === 'w' ? game.userRating : game.opponentRating, isUser: game.userColor === 'w', color: 'w', avatar: '♔' };
    const blackPlayer = { name: game.userColor === 'b' ? game.userUsername : game.opponentUsername, rating: game.userColor === 'b' ? game.userRating : game.opponentRating, isUser: game.userColor === 'b', color: 'b', avatar: '♚' };
    const topPlayer = (currentOrientation === 'white') ? blackPlayer : whitePlayer;
    const bottomPlayer = (currentOrientation === 'white') ? whitePlayer : blackPlayer;
    const currentFen = (typeof getCurrentBoardFen === 'function') ? getCurrentBoardFen() : ((AppState.gamePositions && AppState.gamePositions[AppState.currentMoveIndex]) ? AppState.gamePositions[AppState.currentMoveIndex].fen : game.pgn);
    const materialData = calculateMaterialAndCaptured(currentFen);

    if (playerTopAvatar) playerTopAvatar.textContent = topPlayer.avatar;
    if (playerTopName) playerTopName.textContent = topPlayer.name + (topPlayer.isUser ? ` ${t('player_you_suffix')}` : '');
    if (playerTopRating) playerTopRating.textContent = `(${topPlayer.rating})`;
    const inTrial = (typeof isInTrialBranch === 'function') && isInTrialBranch();
    const currentPos = inTrial ? null : ((AppState.gamePositions && AppState.gamePositions[AppState.currentMoveIndex]) ? AppState.gamePositions[AppState.currentMoveIndex] : null);
    if (playerTopClock) {
        const topClock = currentPos ? (topPlayer.color === 'w' ? currentPos.whiteClock : currentPos.blackClock) : null;
        if (topClock && topClock.str) { playerTopClock.textContent = topClock.str; playerTopClock.classList.remove('hidden'); } else playerTopClock.classList.add('hidden');
    }
    if (playerTopCaptured && playerTopAdvantage) {
        const topCaptured = (topPlayer.color === 'w') ? materialData.whiteCaptured : materialData.blackCaptured;
        const topAdvantage = (topPlayer.color === 'w') ? materialData.whiteAdvantage : materialData.blackAdvantage;
        playerTopCaptured.innerHTML = formatCapturedPiecesHtml(topCaptured, topPlayer.color);
        if (topAdvantage > 0) { playerTopAdvantage.textContent = `+${topAdvantage}`; playerTopAdvantage.classList.remove('hidden'); } else playerTopAdvantage.classList.add('hidden');
    }
    if (playerBottomAvatar) playerBottomAvatar.textContent = bottomPlayer.avatar;
    if (playerBottomName) playerBottomName.textContent = bottomPlayer.name + (bottomPlayer.isUser ? ` ${t('player_you_suffix')}` : '');
    if (playerBottomRating) playerBottomRating.textContent = `(${bottomPlayer.rating})`;
    if (playerBottomClock) {
        const bottomClock = currentPos ? (bottomPlayer.color === 'w' ? currentPos.whiteClock : currentPos.blackClock) : null;
        if (bottomClock && bottomClock.str) { playerBottomClock.textContent = bottomClock.str; playerBottomClock.classList.remove('hidden'); } else playerBottomClock.classList.add('hidden');
    }
    if (playerBottomCaptured && playerBottomAdvantage) {
        const bottomCaptured = (bottomPlayer.color === 'w') ? materialData.whiteCaptured : materialData.blackCaptured;
        const bottomAdvantage = (bottomPlayer.color === 'w') ? materialData.whiteAdvantage : materialData.blackAdvantage;
        playerBottomCaptured.innerHTML = formatCapturedPiecesHtml(bottomCaptured, bottomPlayer.color);
        if (bottomAdvantage > 0) { playerBottomAdvantage.textContent = `+${bottomAdvantage}`; playerBottomAdvantage.classList.remove('hidden'); } else playerBottomAdvantage.classList.add('hidden');
    }
}
let copyToastTimeout = null;
function showCopyToast() { if (!copyToast) return; copyToast.classList.remove('hidden'); if (copyToastTimeout) clearTimeout(copyToastTimeout); copyToastTimeout = setTimeout(() => copyToast.classList.add('hidden'), 2000); }

// ============================================================================
// COACH PANEL
// ============================================================================
function updateCoachPanel() {
    if (!AppState.gamePositions.length) return;
    if (btnCoachExitTrial) btnCoachExitTrial.classList.add('hidden');
    const currentPos = AppState.gamePositions[AppState.currentMoveIndex];
    if (!currentPos) return;
    const prevPos = AppState.currentMoveIndex > 0 ? AppState.gamePositions[AppState.currentMoveIndex - 1] : null;
    const moveSan = (currentPos.move && currentPos.move.san) ? currentPos.move.san : '';
    updateNextMistakeButtonState();
    const selectedGame = (AppState.selectedGameIndex !== null) ? AppState.loadedGames[AppState.selectedGameIndex] : null;
    const userColor = getCurrentUserColor(selectedGame);
    const isUserWhite = (userColor === 'w');
    const isUserMove = Boolean(selectedGame && currentPos.move && currentPos.move.color === userColor);

    const evalPerspectiveEl = document.getElementById('coach-eval-perspective');
    if (evalPerspectiveEl) {
        if (typeof evalPerspectiveEl.setAttribute === 'function') {
            evalPerspectiveEl.setAttribute('data-i18n', isUserWhite ? 'white_perspective' : 'black_perspective');
        }
        evalPerspectiveEl.textContent = isUserWhite ? t('white_perspective') : t('black_perspective');
    }
    const winProbLabelEl = document.getElementById('win-prob-label');
    if (winProbLabelEl) {
        if (typeof winProbLabelEl.setAttribute === 'function') {
            winProbLabelEl.setAttribute('data-i18n', isUserWhite ? 'win_prob_white' : 'win_prob_black');
        }
        winProbLabelEl.textContent = isUserWhite ? t('win_prob_white') : t('win_prob_black');
    }

    if (AppState.currentMoveIndex === 0) {
        coachPanel.style.borderColor = 'var(--line)'; coachCommentText.style.color = 'var(--ink)';
        coachCommentText.textContent = t('starting_comment');
        coachPosDesc.textContent = currentPos.eval ? getPositionDescriptionText(currentPos.eval, currentLang, userColor) : t('starting_pos');
        coachEvalBadge.textContent = (currentPos.eval ? formatEvaluationBadge(currentPos.eval, userColor) : '+0.00').replace('.', ',');
        const isUserAhead = isUserWhite ? ((currentPos.eval?.cpWhite || 0) >= 0) : ((currentPos.eval?.cpWhite || 0) <= 0);
        coachEvalBadge.className = `coach-eval-badge ${isUserAhead ? 'white-adv' : 'black-adv'}`;
        if (coachMoveTitle) coachMoveTitle.innerHTML = `<span class="dot" style="background:var(--mute);"></span><span class="chip">${t('starting_pos')}</span>`;
        if (currentWinProb) currentWinProb.textContent = formatWinProbability(currentPos.eval, userColor);
        btnCoachBest.classList.add('hidden'); btnCoachExplain.disabled = true; btnCoachExplain.textContent = t('btn_explain'); coachExplainBox.classList.add('hidden');
        if (btnCoachHint) { btnCoachHint.disabled = false; btnCoachHint.classList.toggle('active', isShowingHints); btnCoachHint.textContent = isShowingHints ? t('btn_close_hints') : t('btn_hints_lbl'); }
        if (!isShowingHints && coachHintsBox) coachHintsBox.classList.add('hidden');
        return;
    }

    if (!currentPos.eval || !currentPos.classification) {
        coachPanel.style.borderColor = 'var(--line)'; coachCommentText.style.color = 'var(--ink)';
        coachCommentText.textContent = moveSan ? `${moveSan}: ${t('waiting_stockfish')}` : t('waiting_stockfish');
        coachPosDesc.textContent = t('calculating_eval'); coachEvalBadge.textContent = '...';
        if (coachMoveTitle) coachMoveTitle.innerHTML = `<span class="dot" style="background:var(--warn);"></span><span class="move-title-san">${escapeHTML(moveSan)}</span> <span class="chip">${t('analyzing')}</span>`;
        if (currentWinProb) currentWinProb.textContent = '--%';
        btnCoachBest.classList.add('hidden'); btnCoachExplain.disabled = true; btnCoachExplain.textContent = t('btn_explain'); coachExplainBox.classList.add('hidden');
        if (btnCoachHint) { btnCoachHint.disabled = false; btnCoachHint.classList.toggle('active', isShowingHints); btnCoachHint.textContent = isShowingHints ? t('btn_close_hints') : t('btn_hints_lbl'); }
        if (!isShowingHints && coachHintsBox) coachHintsBox.classList.add('hidden');
        updateCurrentMoveArrow(); return;
    }

    const cls = currentPos.classification;
    const catInfo = cls.info || (typeof MOVE_CATEGORIES !== 'undefined' ? MOVE_CATEGORIES[cls.category] : null) || { viName: cls.category, enName: cls.category, color: '#81b64c' };
    const isBrilliant = Boolean(cls?.isBrilliant);
    const effectiveCategory = isBrilliant ? 'Brilliant' : cls.category;
    const effectiveColor = CATEGORY_ARROW_COLORS[effectiveCategory] || catInfo.color;
    const effectiveVarName = getCategoryVarName(effectiveCategory);
    const catName = typeof getCategoryName === 'function' ? getCategoryName(effectiveCategory, currentLang) : (currentLang === 'en' ? (catInfo.enName || effectiveCategory) : catInfo.viName);
    const effectiveLabel = isBrilliant ? (currentLang === 'en' ? 'Brilliant !!' : 'Xuất thần !!') : catName;

    const targetPos = (AppState.currentMoveIndex > 0 && prevPos) ? prevPos : currentPos;
    const targetFen = targetPos ? targetPos.fen : getCurrentBoardFen();
    let isTargetTerminal = false;
    if (typeof Chess === 'function' && targetFen) {
        const c = new Chess(targetFen);
        isTargetTerminal = c.in_checkmate() || c.in_draw() || c.moves().length === 0;
    }

    const bestUci = targetPos?.eval?.bestmove;
    let computedBestSan = '';
    if (bestUci && !isTargetTerminal && bestUci !== '(none)') {
        const converted = convertPvToSanLine(targetFen, [bestUci], 1, currentLang);
        computedBestSan = converted?.bestSan || '';
    }

    coachCommentText.textContent = getCoachCommentText(
        moveSan,
        cls.category,
        AppState.currentMoveIndex,
        isUserMove,
        currentLang,
        {
            move: currentPos.move || {},
            prevPos: prevPos,
            currPos: currentPos,
            bestSan: computedBestSan
        }
    );
    coachCommentText.style.color = effectiveColor; coachPanel.style.borderColor = effectiveColor;
    if (isBrilliant) coachPanel.classList.add('brilliant-move'); else coachPanel.classList.remove('brilliant-move');

    if (coachMoveTitle) {
        const moverLabel = isUserMove ? t('you_played') : t('opponent_played');
        const badgeMarkup = typeof badgeHTML === 'function'
            ? badgeHTML(effectiveCategory, 36)
            : `<span class="dot" style="background:var(--${effectiveVarName});"></span>`;
        coachMoveTitle.innerHTML = `${badgeMarkup}<span class="move-title-san">${escapeHTML(moveSan)}</span> <span class="chip">${escapeHTML(effectiveLabel)} · ${moverLabel}</span>`;
    }
    if (currentWinProb) currentWinProb.textContent = formatWinProbability(currentPos.eval, userColor);
    coachEvalBadge.textContent = formatEvaluationBadge(currentPos.eval, userColor).replace('.', ',');
    const isUserAhead = isUserWhite ? ((currentPos.eval.cpWhite || 0) >= 0) : ((currentPos.eval.cpWhite || 0) <= 0);
    coachEvalBadge.className = `coach-eval-badge ${isUserAhead ? 'white-adv' : 'black-adv'}`;
    coachPosDesc.textContent = getPositionDescriptionText(currentPos.eval, currentLang, userColor);

    if (!bestUci || isTargetTerminal || bestUci === '(none)') {
        btnCoachBest.classList.add('hidden');
        btnCoachBest.classList.remove('active');
    } else {
        btnCoachBest.classList.remove('hidden');
        btnCoachBest.classList.toggle('active', isShowingBestMove);
        btnCoachBest.textContent = isShowingBestMove ? `${t('btn_hide_best')} (${computedBestSan || bestUci})` : t('btn_best_move');
        if (isShowingBestMove) drawBestMoveOnBoard(bestUci, 'Best', targetFen);
    }
    btnCoachExplain.disabled = false; btnCoachExplain.classList.toggle('active', isShowingExplain); btnCoachExplain.textContent = isShowingExplain ? t('btn_close_explain') : t('btn_explain');
    if (isShowingExplain) { coachExplainBox.innerHTML = buildMoveExplanation(prevPos, currentPos, isUserMove, currentLang); coachExplainBox.classList.remove('hidden'); } else coachExplainBox.classList.add('hidden');

    if (btnCoachHint) { btnCoachHint.disabled = false; btnCoachHint.classList.toggle('active', isShowingHints); btnCoachHint.textContent = isShowingHints ? t('btn_close_hints') : t('btn_hints_lbl'); }
    if (!isShowingHints && coachHintsBox) coachHintsBox.classList.add('hidden');
    updateCurrentMoveArrow();
}

function findNextMistakeIndex(fromIndex) {
    const errorCategories = ['Inaccuracy', 'Mistake', 'Blunder'];
    for (let i = fromIndex + 1; i < AppState.gamePositions.length; i++) { const cls = AppState.gamePositions[i].classification; if (cls && errorCategories.includes(cls.category)) return i; }
    for (let i = 1; i <= fromIndex; i++) { const cls = AppState.gamePositions[i].classification; if (cls && errorCategories.includes(cls.category)) return i; }
    return -1;
}
function findPrevMistakeIndex(fromIndex) {
    const errorCategories = ['Inaccuracy', 'Mistake', 'Blunder'];
    for (let i = fromIndex - 1; i >= 1; i--) { const cls = AppState.gamePositions[i].classification; if (cls && errorCategories.includes(cls.category)) return i; }
    for (let i = AppState.gamePositions.length - 1; i >= fromIndex; i--) { const cls = AppState.gamePositions[i].classification; if (cls && errorCategories.includes(cls.category)) return i; }
    return -1;
}
function updateMistakeButtonsState() {
    if (btnNextMistake) btnNextMistake.disabled = (findNextMistakeIndex(AppState.currentMoveIndex) === -1);
    if (btnPrevMistake) btnPrevMistake.disabled = (findPrevMistakeIndex(AppState.currentMoveIndex) === -1);
}
function updateNextMistakeButtonState() { updateMistakeButtonsState(); }

function buildMoveCellBadgeHtml(pos) {
    if (!pos.classification) return '';
    const isBrilliant = Boolean(pos.classification?.isBrilliant);
    const category = isBrilliant ? 'Brilliant' : (pos.classification.category || 'Best');
    const textSym = CATEGORY_TEXT_SYMBOLS[category] || '★';
    const catClass = category.toLowerCase();
    const catName = isBrilliant
        ? (currentLang === 'en' ? 'Brilliant !!' : 'Xuất thần !!')
        : (typeof getCategoryName === 'function' ? getCategoryName(category, currentLang) : (pos.classification.info ? pos.classification.info.viName : category));
    if (typeof badgeHTML === 'function') {
        return badgeHTML(category, 21, {
            class: `move-class-badge badge-${catClass}`,
            title: `${catName} (${textSym})`
        });
    }
    const symbol = EVAL_BADGE_SYMBOLS[category] || SVG_ICONS.Best;
    return `<span class="move-class-badge badge-${catClass}" title="${catName} (${textSym})">${symbol}</span>`;
}

function createMoveCell(pos) {
    const cell = document.createElement('div');
    cell.className = 'move-cell';
    if (!isInTrialBranch() && pos.index === AppState.currentMoveIndex) {
        cell.classList.add('active');
    }
    cell.dataset.moveIndex = pos.index;

    const sanSpan = document.createElement('span');
    sanSpan.className = 'move-san';
    sanSpan.textContent = (pos.move && pos.move.san) ? pos.move.san : '';
    cell.appendChild(sanSpan);

    if (pos.timeSpentStr) {
        const timeSpan = document.createElement('span');
        timeSpan.className = 'move-time-spent';
        timeSpan.title = t('thinking_time', pos.timeSpentStr);
        timeSpan.textContent = pos.timeSpentStr;
        cell.appendChild(timeSpan);
    }

    const badgeWrap = document.createElement('span');
    badgeWrap.className = 'move-badges-wrap';
    badgeWrap.id = `move-badge-${pos.index}`;
    badgeWrap.innerHTML = buildMoveCellBadgeHtml(pos);
    cell.appendChild(badgeWrap);

    return cell;
}

function renderMoveList() {
    initDelegatedEventListeners();
    if (!moveListContainer) return;
    moveListContainer.innerHTML = '';
    if (AppState.gamePositions.length <= 1) {
        const emptyP = document.createElement('p');
        emptyP.className = 'empty-text';
        emptyP.textContent = t('no_moves_game');
        moveListContainer.appendChild(emptyP);
        return;
    }

    const fragment = document.createDocumentFragment();

    if (AppState.trialBranch && AppState.trialBranch.baseMoveIndex === 0) {
        fragment.appendChild(buildTrialBranchRowElement());
    }

    for (let i = 1; i < AppState.gamePositions.length; i += 2) {
        const moveTurnNumber = Math.ceil(i / 2);
        const whitePos = AppState.gamePositions[i];
        const blackPos = AppState.gamePositions[i + 1] || null;

        const row = document.createElement('div');
        row.className = 'move-row';

        const numSpan = document.createElement('span');
        numSpan.className = 'move-number';
        numSpan.textContent = `${moveTurnNumber}.`;
        row.appendChild(numSpan);

        row.appendChild(createMoveCell(whitePos));

        if (blackPos) {
            row.appendChild(createMoveCell(blackPos));
        } else {
            row.appendChild(document.createElement('div'));
        }

        fragment.appendChild(row);

        if (AppState.trialBranch && AppState.trialBranch.baseMoveIndex > 0) {
            if (AppState.trialBranch.baseMoveIndex === whitePos.index || (blackPos && AppState.trialBranch.baseMoveIndex === blackPos.index)) {
                fragment.appendChild(buildTrialBranchRowElement());
            }
        }
    }

    moveListContainer.appendChild(fragment);
}

function getPhaseEvalBadge(positions, color, minTurn, maxTurn) {
    const noMovesText = t('no_moves_phase');
    if (!positions || positions.length <= 1) return `<span class="move-class-badge badge-neutral" title="${noMovesText}">-</span>`;
    const movesInPhase = [];
    for (let i = 1; i < positions.length; i++) {
        const p = positions[i]; if (!p || !p.move || p.move.color !== color) continue;
        const turn = Math.ceil(i / 2); if (turn >= minTurn && (maxTurn === null || turn <= maxTurn)) movesInPhase.push(p);
    }
    if (movesInPhase.length === 0) return `<span class="move-class-badge badge-neutral" title="${noMovesText}">-</span>`;
    let totalAcc = 0; let count = 0; let hasBrilliant = false;
    movesInPhase.forEach(p => {
        if (p.classification?.isBrilliant) hasBrilliant = true;
        if (p.classification && typeof p.classification.accuracy === 'number') { totalAcc += p.classification.accuracy; count++; }
    });
    const avgAcc = count > 0 ? (totalAcc / count) : 0;
    let cat = 'Best';
    if (hasBrilliant && avgAcc >= 90) { cat = 'Brilliant'; }
    else if (avgAcc >= 90) { cat = 'Best'; }
    else if (avgAcc >= 80) { cat = 'Excellent'; }
    else if (avgAcc >= 65) { cat = 'Good'; }
    else if (avgAcc >= 50) { cat = 'Inaccuracy'; }
    else if (avgAcc >= 35) { cat = 'Mistake'; }
    else { cat = 'Blunder'; }
    const catLabel = (cat === 'Brilliant') ? (currentLang === 'en' ? 'Brilliant !!' : 'Xuất thần !!') : (typeof getCategoryName === 'function' ? getCategoryName(cat, currentLang) : cat);
    if (typeof badgeHTML === 'function') {
        return badgeHTML(cat, 22, {
            class: `move-class-badge badge-${cat.toLowerCase()}`,
            title: `${catLabel} (${avgAcc.toFixed(1)}%)`
        });
    }
    const symbol = EVAL_BADGE_SYMBOLS[cat] || SVG_ICONS.Best;
    return `<span class="move-class-badge badge-${cat.toLowerCase()}" title="${catLabel} (${avgAcc.toFixed(1)}%)">${symbol}</span>`;
}

function renderStatsTable(stats, game) {
    currentStats = stats;
    let userBrilliant = 0; let oppBrilliant = 0; const userColor = game.userColor || 'w'; const oppColor = userColor === 'w' ? 'b' : 'w';
    for (let i = 1; i < AppState.gamePositions.length; i++) {
        const p = AppState.gamePositions[i];
        if (p && p.move && (p.classification?.category === 'Brilliant' || p.classification?.isBrilliant)) {
            if (p.move.color === userColor) userBrilliant++; else if (p.move.color === oppColor) oppBrilliant++;
        }
    }
    const whiteBrilliant = userColor === 'w' ? userBrilliant : oppBrilliant;
    const blackBrilliant = userColor === 'b' ? userBrilliant : oppBrilliant;

    const userStats = (stats && stats[userColor]) || { avgAccuracy: 0, counts: {} };
    const oppStats = (stats && stats[oppColor]) || { avgAccuracy: 0, counts: {} };
    const kpiUserAccEl = document.getElementById('kpi-user-accuracy'); const kpiOppAccEl = document.getElementById('kpi-opp-accuracy');
    const kpiUserMisEl = document.getElementById('kpi-user-mistakes'); const kpiUserMisDetailEl = document.getElementById('kpi-user-mistakes-detail');
    if (kpiUserAccEl) kpiUserAccEl.textContent = `${(Number(userStats.avgAccuracy) || 0).toFixed(1).replace('.', ',')}%`;
    if (kpiOppAccEl) kpiOppAccEl.textContent = `${(Number(oppStats.avgAccuracy) || 0).toFixed(1).replace('.', ',')}%`;
    const userMistakes = (userStats.counts.Mistake || 0) + (userStats.counts.Blunder || 0) + (userStats.counts.Miss || 0);
    if (kpiUserMisEl) kpiUserMisEl.textContent = String(userMistakes);
    if (kpiUserMisDetailEl) {
        kpiUserMisDetailEl.textContent = t('mistakes_detail', userStats.counts.Mistake || 0, userStats.counts.Miss || 0, userStats.counts.Blunder || 0);
    }

    // Cập nhật Performance Rating
    const userAccNum = Number(userStats.avgAccuracy) || 0;
    const countMistake = userStats.counts.Mistake || 0;
    const countBlunder = userStats.counts.Blunder || 0;
    const userRatingNum = Number(game.userRating) || 0;
    const oppRatingNum = Number(game.opponentRating) || userRatingNum || 1000;
    const userMovesCount = Array.isArray(userStats.accuracies) && userStats.accuracies.length > 0
        ? userStats.accuracies.length
        : (userStats.counts
            ? Object.values(userStats.counts).reduce((a, b) => a + (typeof b === 'number' ? b : 0), 0)
            : (AppState.gamePositions ? Math.max(0, Math.floor((AppState.gamePositions.length - 1) / 2)) : 0));

    const perfRating = calculatePerformanceRating(userAccNum, countMistake, countBlunder, oppRatingNum, userMovesCount);

    const kpiPerfRatingEl = document.getElementById('kpi-performance-rating');
    const kpiPerfDiffEl = document.getElementById('kpi-perf-diff');
    const kpiPerfCompEl = document.getElementById('kpi-perf-comparison');

    if (kpiPerfRatingEl) {
        kpiPerfRatingEl.textContent = `~${perfRating}`;
    }

    if (userRatingNum > 0) {
        const diff = perfRating - userRatingNum;
        if (kpiPerfDiffEl) {
            kpiPerfDiffEl.classList.remove('hidden');
            if (diff > 0) {
                kpiPerfDiffEl.textContent = `+${diff}`;
                kpiPerfDiffEl.className = 'perf-diff-badge diff-positive';
            } else if (diff < 0) {
                kpiPerfDiffEl.textContent = `${diff}`;
                kpiPerfDiffEl.className = 'perf-diff-badge diff-negative';
            } else {
                kpiPerfDiffEl.textContent = `0`;
                kpiPerfDiffEl.className = 'perf-diff-badge diff-equal';
            }
        }
        if (kpiPerfCompEl) {
            if (diff > 0) {
                kpiPerfCompEl.textContent = t('perf_diff_positive', diff, userRatingNum);
            } else if (diff < 0) {
                kpiPerfCompEl.textContent = t('perf_diff_negative', diff, userRatingNum);
            } else {
                kpiPerfCompEl.textContent = t('perf_diff_equal', userRatingNum);
            }
        }
    } else {
        if (kpiPerfDiffEl) kpiPerfDiffEl.classList.add('hidden');
        if (kpiPerfCompEl) kpiPerfCompEl.textContent = `vs ${game.opponentUsername || 'Opponent'} (${oppRatingNum})`;
    }

    const clsBarsEl = document.getElementById('classification-bars');
    if (clsBarsEl) {
        const whiteName = game.userColor === 'w' ? game.userUsername : game.opponentUsername;
        const blackName = game.userColor === 'b' ? game.userUsername : game.opponentUsername;
        const whiteRating = game.userColor === 'w' ? game.userRating : game.opponentRating;
        const blackRating = game.userColor === 'b' ? game.userRating : game.opponentRating;

        const wBrill = stats.w.counts.Brilliant !== undefined && stats.w.counts.Brilliant > 0 ? stats.w.counts.Brilliant : whiteBrilliant;
        const bBrill = stats.b.counts.Brilliant !== undefined && stats.b.counts.Brilliant > 0 ? stats.b.counts.Brilliant : blackBrilliant;
        const wBest = (stats.w.counts.Brilliant !== undefined && stats.w.counts.Brilliant > 0)
            ? (stats.w.counts.Best || 0)
            : Math.max(0, (stats.w.counts.Best || 0) - whiteBrilliant);
        const bBest = (stats.b.counts.Brilliant !== undefined && stats.b.counts.Brilliant > 0)
            ? (stats.b.counts.Best || 0)
            : Math.max(0, (stats.b.counts.Best || 0) - blackBrilliant);

        const catRows = [
            { key: 'Brilliant', label: t('cat_brilliant'), symbol: SVG_ICONS.Brilliant, cls: 'brilliant', colorVar: 'var(--brill)', w: wBrill, b: bBrill },
            { key: 'Great', label: t('cat_great'), symbol: SVG_ICONS.Great, cls: 'great', colorVar: 'var(--great)', w: stats.w.counts.Great || 0, b: stats.b.counts.Great || 0 },
            { key: 'Book', label: t('cat_book'), symbol: SVG_ICONS.Book, cls: 'book', colorVar: 'var(--book)', w: stats.w.counts.Book || 0, b: stats.b.counts.Book || 0 },
            { key: 'Best', label: t('cat_best'), symbol: SVG_ICONS.Best, cls: 'best', colorVar: 'var(--best)', w: wBest, b: bBest },
            { key: 'Excellent', label: t('cat_excellent'), symbol: SVG_ICONS.Excellent, cls: 'excellent', colorVar: 'var(--exc)', w: stats.w.counts.Excellent || 0, b: stats.b.counts.Excellent || 0 },
            { key: 'Good', label: t('cat_good'), symbol: SVG_ICONS.Good, cls: 'good', colorVar: 'var(--good)', w: stats.w.counts.Good || 0, b: stats.b.counts.Good || 0 },
            { key: 'Inaccuracy', label: t('cat_inaccuracy'), symbol: SVG_ICONS.Inaccuracy, cls: 'inaccuracy', colorVar: 'var(--inac)', w: stats.w.counts.Inaccuracy || 0, b: stats.b.counts.Inaccuracy || 0 },
            { key: 'Mistake', label: t('cat_mistake'), symbol: SVG_ICONS.Mistake, cls: 'mistake', colorVar: 'var(--mis)', w: stats.w.counts.Mistake || 0, b: stats.b.counts.Mistake || 0 },
            { key: 'Miss', label: t('cat_miss'), symbol: SVG_ICONS.Miss, cls: 'miss', colorVar: 'var(--miss)', w: stats.w.counts.Miss || 0, b: stats.b.counts.Miss || 0 },
            { key: 'Blunder', label: t('cat_blunder'), symbol: SVG_ICONS.Blunder, cls: 'blunder', colorVar: 'var(--blu)', w: stats.w.counts.Blunder || 0, b: stats.b.counts.Blunder || 0 }
        ];

        let moveClassesHtml = '';
        catRows.forEach(cat => {
            const wColor = (cat.w > 0) ? cat.colorVar : 'var(--mute)'; const bColor = (cat.b > 0) ? cat.colorVar : 'var(--mute)';
            const badge = typeof badgeHTML === 'function'
                ? badgeHTML(cat.key, 22, `move-class-badge badge-${cat.cls}`)
                : `<span class="move-class-badge badge-${cat.cls}">${cat.symbol}</span>`;
            moveClassesHtml += `<div class="sym-row"><div class="sym-count sym-left" style="color: ${wColor};">${cat.w}</div><div class="sym-center">${badge}<span class="sym-name">${cat.label}</span></div><div class="sym-count sym-right" style="color: ${bColor};">${cat.b}</div></div>`;
        });

        const phases = [
            { key: 'opening', title: t('phase_opening'), sub: t('moves_range_opening'), minTurn: 1, maxTurn: 10 },
            { key: 'middlegame', title: t('phase_middlegame'), sub: t('moves_range_middlegame'), minTurn: 11, maxTurn: 25 },
            { key: 'endgame', title: t('phase_endgame'), sub: t('moves_range_endgame'), minTurn: 26, maxTurn: null }
        ];
        let phasesHtml = '';
        phases.forEach(phase => {
            const wBadge = getPhaseEvalBadge(AppState.gamePositions, 'w', phase.minTurn, phase.maxTurn);
            const bBadge = getPhaseEvalBadge(AppState.gamePositions, 'b', phase.minTurn, phase.maxTurn);
            phasesHtml += `<div class="sym-row phase-row"><div class="phase-badge sym-left">${wBadge}</div><div class="sym-center phase-center"><span class="phase-name">${phase.title}</span><span class="phase-sub">${phase.sub}</span></div><div class="phase-badge sym-right">${bBadge}</div></div>`;
        });

        clsBarsEl.innerHTML = `
        <div class="sym-tab-wrapper">
            <div class="sym-top-section">
                <div class="sym-player-card white-side">
                    <div class="sym-player-header"><span class="sym-player-avatar">♔</span><span class="sym-player-name" title="${escapeHTML(whiteName)}">${escapeHTML(whiteName)}</span>${whiteRating ? `<span class="sym-player-rating">(${escapeHTML(whiteRating)})</span>` : ''}</div>
                    <div class="sym-accuracy-box"><span class="sym-acc-label">${t('accuracy')}</span><span class="sym-acc-badge white-acc">${stats.w.avgAccuracy}%</span></div>
                </div>
                <div class="sym-vs-badge">VS</div>
                <div class="sym-player-card black-side">
                    <div class="sym-player-header"><span class="sym-player-name" title="${escapeHTML(blackName)}">${escapeHTML(blackName)}</span>${blackRating ? `<span class="sym-player-rating">(${escapeHTML(blackRating)})</span>` : ''}<span class="sym-player-avatar">♚</span></div>
                    <div class="sym-accuracy-box"><span class="sym-acc-label">${t('accuracy')}</span><span class="sym-acc-badge black-acc">${stats.b.avgAccuracy}%</span></div>
                </div>
            </div>
            <div class="sym-section-title">${t('move_classification')}</div>
            <div class="sym-move-classes-list">${moveClassesHtml}</div>
            <div class="sym-section-title">${t('game_phases')}</div>
            <div class="sym-phases-list">${phasesHtml}</div>
        </div>`;
    }

    const thWhiteName = document.getElementById('th-white-name');
    const thBlackName = document.getElementById('th-black-name');
    const statsTableBody = document.getElementById('stats-table-body');
    const whiteName = game.userColor === 'w' ? game.userUsername : game.opponentUsername;
    const blackName = game.userColor === 'b' ? game.userUsername : game.opponentUsername;
    const whiteRating = game.userColor === 'w' ? game.userRating : game.opponentRating;
    const blackRating = game.userColor === 'b' ? game.userRating : game.opponentRating;
    if (thWhiteName) thWhiteName.textContent = `${whiteName} (${whiteRating || '?'})`;
    if (thBlackName) thBlackName.textContent = `${blackName} (${blackRating || '?'})`;
    if (statsTableBody && stats && stats.w && stats.b) {
        const wBrill = stats.w.counts.Brilliant !== undefined && stats.w.counts.Brilliant > 0 ? stats.w.counts.Brilliant : whiteBrilliant;
        const bBrill = stats.b.counts.Brilliant !== undefined && stats.b.counts.Brilliant > 0 ? stats.b.counts.Brilliant : blackBrilliant;
        const wBest = (stats.w.counts.Brilliant !== undefined && stats.w.counts.Brilliant > 0)
            ? (stats.w.counts.Best || 0)
            : Math.max(0, (stats.w.counts.Best || 0) - whiteBrilliant);
        const bBest = (stats.b.counts.Brilliant !== undefined && stats.b.counts.Brilliant > 0)
            ? (stats.b.counts.Best || 0)
            : Math.max(0, (stats.b.counts.Best || 0) - blackBrilliant);

        statsTableBody.innerHTML = `
        <tr><td>${stats.w.avgAccuracy}%</td><td>${t('accuracy')}</td><td>${stats.b.avgAccuracy}%</td></tr>
        <tr><td>${wBrill}</td><td>${t('cat_brilliant')}</td><td>${bBrill}</td></tr>
        <tr><td>${stats.w.counts.Great || 0}</td><td>${t('cat_great')}</td><td>${stats.b.counts.Great || 0}</td></tr>
        <tr><td>${stats.w.counts.Book || 0}</td><td>${t('cat_book')}</td><td>${stats.b.counts.Book || 0}</td></tr>
        <tr><td>${wBest}</td><td>${t('cat_best')}</td><td>${bBest}</td></tr>
        <tr><td>${stats.w.counts.Excellent || 0}</td><td>${t('cat_excellent')}</td><td>${stats.b.counts.Excellent || 0}</td></tr>
        <tr><td>${stats.w.counts.Good || 0}</td><td>${t('cat_good')}</td><td>${stats.b.counts.Good || 0}</td></tr>
        <tr><td>${stats.w.counts.Inaccuracy || 0}</td><td>${t('cat_inaccuracy')}</td><td>${stats.b.counts.Inaccuracy || 0}</td></tr>
        <tr><td>${stats.w.counts.Mistake || 0}</td><td>${t('cat_mistake')}</td><td>${stats.b.counts.Mistake || 0}</td></tr>
        <tr><td>${stats.w.counts.Miss || 0}</td><td>${t('cat_miss')}</td><td>${stats.b.counts.Miss || 0}</td></tr>
        <tr><td>${stats.w.counts.Blunder || 0}</td><td>${t('cat_blunder')}</td><td>${stats.b.counts.Blunder || 0}</td></tr>
    `;
    }
}

// ============================================================================
// ĐIỀU KHIỂN & PHÂN TÍCH STOCKFISH
// ============================================================================
let autoplayIntervalId = null;
function isAutoplayRunning() { return autoplayIntervalId !== null; }
function startAutoplay() {
    if (!AppState.gamePositions || AppState.gamePositions.length <= 1 || isAutoplayRunning()) return;
    if (AppState.currentMoveIndex >= AppState.gamePositions.length - 1) goToMove(0);
    if (btnPlay) { btnPlay.textContent = t('btn_pause_lbl'); btnPlay.title = 'Tạm dừng (Phím Space)'; btnPlay.classList.add('playing'); }
    autoplayIntervalId = setInterval(() => {
        if (!AppState.gamePositions || AppState.currentMoveIndex >= AppState.gamePositions.length - 1) { stopAutoplay(); return; }
        goToMove(AppState.currentMoveIndex + 1);
        if (AppState.currentMoveIndex >= AppState.gamePositions.length - 1) stopAutoplay();
    }, 1000);
}
function stopAutoplay() {
    if (autoplayIntervalId !== null) { clearInterval(autoplayIntervalId); autoplayIntervalId = null; }
    if (btnPlay) { btnPlay.textContent = t('btn_play_lbl'); btnPlay.title = 'Phát ván cờ (Space)'; btnPlay.classList.remove('playing'); }
}
function toggleAutoplay() { if (isAutoplayRunning()) stopAutoplay(); else startAutoplay(); }

function renderKeyMovesList() {
    initDelegatedEventListeners();
    if (!keyMovesList) return;
    keyMovesList.innerHTML = '';
    if (!AppState.gamePositions || AppState.gamePositions.length <= 1 || AppState.selectedGameIndex === null) {
        const emptyP = document.createElement('p');
        emptyP.className = 'empty-text';
        emptyP.textContent = (currentLang === 'en') ? 'No game selected.' : 'Chưa chọn ván cờ.';
        keyMovesList.appendChild(emptyP);
        if (keyMovesCountBadge) keyMovesCountBadge.textContent = '0';
        return;
    }
    const selectedGame = AppState.loadedGames[AppState.selectedGameIndex];
    if (!selectedGame) return;
    const userColor = selectedGame.userColor;
    const myCriticalMoves = [];
    for (let i = 1; i < AppState.gamePositions.length; i++) {
        const pos = AppState.gamePositions[i];
        if (!pos || !pos.move || pos.move.color !== userColor || !pos.classification) continue;
        const cat = pos.classification.category;
        if (cat === 'Mistake' || cat === 'Blunder') myCriticalMoves.push(pos);
    }
    if (keyMovesCountBadge) keyMovesCountBadge.textContent = String(myCriticalMoves.length);
    if (myCriticalMoves.length === 0) {
        const emptyDiv = document.createElement('div');
        if (AppState.isAnalyzing) {
            emptyDiv.className = 'key-moves-empty info';
            emptyDiv.textContent = t('status_analyzing');
        } else {
            emptyDiv.className = 'key-moves-empty success';
            const strong = document.createElement('strong');
            strong.textContent = (currentLang === 'en' ? 'Great!' : 'Tuyệt vời!') + ' ';
            emptyDiv.appendChild(strong);
            emptyDiv.appendChild(document.createTextNode(currentLang === 'en' ? 'You made no major mistakes.' : 'Bạn không mắc sai lầm nào.'));
        }
        keyMovesList.appendChild(emptyDiv);
        return;
    }

    const fragment = document.createDocumentFragment();
    myCriticalMoves.forEach((pos) => {
        const moveNumber = Math.ceil(pos.index / 2);
        const movePrefix = (pos.move.color === 'w') ? `${moveNumber}.` : `${moveNumber}...`;
        const moveSan = (pos.move && pos.move.san) ? pos.move.san : '';
        const cat = pos.classification.category;
        const isBlunder = (cat === 'Blunder');
        const badgeLabel = typeof getCategoryName === 'function' ? getCategoryName(cat, currentLang) : (isBlunder ? 'Sai lầm nặng' : 'Sai lầm');
        const badgeClass = isBlunder ? 'badge-blunder' : 'badge-mistake';
        const isActive = (pos.index === AppState.currentMoveIndex);

        const item = document.createElement('div');
        item.className = `key-move-item ${isActive ? 'active' : ''}`.trim();
        item.dataset.index = pos.index;
        item.title = `${currentLang === 'en' ? 'Click to jump to move' : 'Bấm để nhảy tới nước'} ${movePrefix} ${moveSan}`;

        const left = document.createElement('div');
        left.className = 'key-move-left';
        const numSpan = document.createElement('span');
        numSpan.className = 'key-move-num';
        numSpan.textContent = movePrefix;
        const sanSpan = document.createElement('span');
        sanSpan.className = 'key-move-san';
        sanSpan.textContent = moveSan;
        left.appendChild(numSpan);
        left.appendChild(sanSpan);

        const right = document.createElement('div');
        right.className = 'key-move-right';
        right.style.display = 'flex';
        right.style.alignItems = 'center';
        right.style.gap = '6px';

        if (typeof badgeHTML === 'function') {
            const iconWrap = document.createElement('span');
            iconWrap.innerHTML = badgeHTML(cat, 22, `move-class-badge badge-${cat.toLowerCase()}`);
            right.appendChild(iconWrap);
        }
        const badgeSpan = document.createElement('span');
        badgeSpan.className = `key-move-badge ${badgeClass}`;
        badgeSpan.textContent = badgeLabel;
        right.appendChild(badgeSpan);

        item.appendChild(left);
        item.appendChild(right);
        fragment.appendChild(item);
    });

    keyMovesList.appendChild(fragment);
}

function updateKeyMovesActive() {
    if (!keyMovesList) return;
    keyMovesList.querySelectorAll('.key-move-item').forEach((item) => { const idx = Number(item.dataset.index); item.classList.toggle('active', idx === AppState.currentMoveIndex); });
}

let previousMoveIndex = 0;
function goToMove(index, animate = null, playSound = true, skipBoardPosition = false) {
    if (!AppState.gamePositions.length) return;
    if (index < 0) index = 0; if (index >= AppState.gamePositions.length) index = AppState.gamePositions.length - 1;
    if (AppState.trialBranch) { AppState.trialBranch.isViewingBranch = false; AppState.trialBranch.currentIndex = null; }
    if (index !== AppState.currentMoveIndex) {
        isGameOverBannerDismissed = false;
    }
    selectedSquareForMove = null; clearSquareMoveHighlights();
    const isSingleStep = Math.abs(index - previousMoveIndex) === 1;
    const useAnimation = (animate !== null) ? Boolean(animate) : isSingleStep;
    AppState.currentMoveIndex = index; const currentPos = AppState.gamePositions[AppState.currentMoveIndex];
    isShowingBestMove = true; isShowingHints = false; currentHintsData = [];
    if (coachHintsBox) coachHintsBox.classList.add('hidden');
    if (btnCoachHint) { btnCoachHint.classList.remove('active'); btnCoachHint.textContent = t('btn_hints_lbl'); }

    if (!skipBoardPosition && board) {
        board.position(currentPos.fen, useAnimation);
    }
    if (playSound && isSingleStep && AppState.currentMoveIndex > 0 && currentPos.move) {
        if (currentPos.move.captured || (currentPos.move.san && currentPos.move.san.includes('x'))) SoundManager.playCapture(); else SoundManager.playMove();
    }
    previousMoveIndex = AppState.currentMoveIndex;

    clearBoardHighlightsAndArrows(); if (currentPos.move) highlightActualMove(currentPos.move); updateCurrentMoveArrow();
    const totalMoves = AppState.gamePositions.length - 1; moveCounterSpan.textContent = `${AppState.currentMoveIndex} / ${totalMoves}`;
    btnStart.disabled = (AppState.currentMoveIndex === 0); btnPrev.disabled = (AppState.currentMoveIndex === 0); btnNext.disabled = (AppState.currentMoveIndex === totalMoves); btnEnd.disabled = (AppState.currentMoveIndex === totalMoves);
    if (btnPlay) btnPlay.disabled = (totalMoves <= 0);
    if (AppState.currentMoveIndex >= totalMoves && isAutoplayRunning()) stopAutoplay();

    const allCells = moveListContainer.querySelectorAll('.move-cell'); let activeCell = null;
    allCells.forEach(cell => { const cellIndex = Number(cell.dataset.moveIndex); if (cellIndex === AppState.currentMoveIndex) { cell.classList.add('active'); activeCell = cell; } else cell.classList.remove('active'); });
    moveListContainer.querySelectorAll('.trial-move-cell.active').forEach(tc => tc.classList.remove('active'));
    if (activeCell) {
        scrollElementInsideContainer(activeCell);
    } else if (AppState.currentMoveIndex === 0 && moveListContainer) {
        moveListContainer.scrollTop = 0;
        if (typeof window !== 'undefined' && window.innerWidth > 960) {
            const scrollBox = moveListContainer.closest('.scroll');
            if (scrollBox) scrollBox.scrollTop = 0;
        }
    }

    updateCoachPanel(); updateEvalBar(); updateEvalChartMarker(); updateKeyMovesActive(); updatePlayersDisplay();
    checkAndRenderGameOverReviewState();
    if (!AppState.isAnalyzing || isAnalysisPaused || isInTrialBranch()) {
        triggerLiveAnalysis(currentPos.fen);
    }
}

function formatTimeDuration(totalSeconds) { const mins = Math.floor(totalSeconds / 60); const secs = totalSeconds % 60; return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`; }
function updateElapsedTimeDisplay(extraLabel = '') { if (analysisElapsedTime) analysisElapsedTime.textContent = `${formatTimeDuration(elapsedSeconds)}${extraLabel ? ` (${extraLabel})` : ''}`; }
function startElapsedTimer(resume = false) { if (!resume) elapsedSeconds = 0; clearInterval(analysisTimerInterval); updateElapsedTimeDisplay(); analysisTimerInterval = setInterval(() => { elapsedSeconds++; updateElapsedTimeDisplay(); }, 1000); }
function pauseElapsedTimer() { clearInterval(analysisTimerInterval); updateElapsedTimeDisplay('Tạm dừng'); }
function stopElapsedTimer() { clearInterval(analysisTimerInterval); updateElapsedTimeDisplay(); }

/**
 * HÀM ĐẠI NHẤT THỐNG LÕI: Phân tích 1 thế cờ (Dùng chung cho CẢ VÁN GỐC và NHÁNH ĐI THỬ)
 * Xóa sổ hoàn toàn sự bất đồng bộ giữa các chế độ.
 */
async function evaluateAndClassifyPosition(pos, isTrial, clearHash = false, moveTime = null) {
    const isLiveMode = isTrial || (isLiveEngineEnabled && !AppState.isAnalyzing);
    const targetDepth = isLiveMode ? currentLiveDepth : (currentDepth || 16);
    // For full Game Review (!isTrial && AppState.isAnalyzing), pass 0 so Stockfish completes the selected depth.
    // For Live Engine / Trial, respect user's currentMoveTime (or explicit moveTime).
    const targetMoveTime = isLiveMode
        ? (moveTime !== null ? moveTime : Math.max(currentMoveTime || 180, 250))
        : (moveTime !== null ? moveTime : 0);

    if (!isTrial) updateLiveEngineUIAnalyzing(targetDepth);
    else updateCoachPanelForTrial();

    const currentSession = ++liveAnalysisSessionId;

    const rawResult = await stockfishEngine.evaluatePosition(pos.fen, targetDepth, (progress) => {
        if (currentSession !== liveAnalysisSessionId) return;
        if (isTrial) {
            if (progress.bestmove && progress.bestmove.length >= 4) {
                if (typeof clearTrialSuggestionArrows === 'function') {
                    clearTrialSuggestionArrows();
                } else if (typeof activeArrows !== 'undefined') {
                    activeArrows = activeArrows.filter(a => !(a.options && a.options.className && a.options.className.includes('arrow-trial-suggestion')));
                }
                drawArrow(progress.bestmove.slice(0, 2), progress.bestmove.slice(2, 4), '#22c55e', {
                    width: 17, opacity: 0.76, className: 'board-arrow arrow-best arrow-trial-suggestion'
                });
            }
        } else {
            updateLiveEngineUIProgress(progress, targetDepth, pos.fen);
        }
    }, clearHash, targetMoveTime);

    if (currentSession !== liveAnalysisSessionId) return;

    const whiteScore = toWhitePerspective(rawResult, pos.turn);
    pos.eval = {
        depth: rawResult.depth || targetDepth,
        cp: rawResult.cp, mate: rawResult.mate, bestmove: rawResult.bestmove, pv: rawResult.pv,
        cpWhite: whiteScore.cpWhite, mateWhite: whiteScore.mateWhite
    };

    let evalBefore = null;
    let prevPos = null;
    if (isTrial) {
        const bIdx = AppState.trialBranch.currentIndex;
        if (bIdx === 0) {
            prevPos = AppState.gamePositions[AppState.trialBranch.baseMoveIndex];
            evalBefore = prevPos?.eval;
        } else {
            prevPos = AppState.trialBranch.positions[bIdx - 1];
            evalBefore = prevPos?.eval;
        }
    } else {
        if (pos.index > 0) {
            prevPos = AppState.gamePositions[pos.index - 1];
            evalBefore = prevPos?.eval;
        }
    }

    if (evalBefore && evalBefore.bestmove && pos.move) {
        const playedUci = pos.move.uci || `${pos.move.from}${pos.move.to}${pos.move.promotion || ''}`;
        let evalPrevPrev = null;
        if (!isTrial && pos.index >= 2 && AppState.gamePositions[pos.index - 2]) {
            evalPrevPrev = AppState.gamePositions[pos.index - 2].eval;
        } else if (isTrial && AppState.trialBranch) {
            const bIdx = AppState.trialBranch.currentIndex;
            if (bIdx >= 2 && AppState.trialBranch.positions[bIdx - 2]) {
                evalPrevPrev = AppState.trialBranch.positions[bIdx - 2].eval;
            } else if (bIdx === 1) {
                evalPrevPrev = AppState.gamePositions[AppState.trialBranch.baseMoveIndex]?.eval;
            }
        }
        pos.classification = evaluateMoveQuality(evalBefore, pos.eval, pos.move.color, playedUci, evalBefore.bestmove, pos.index, {
            evalPrevPrev,
            move: pos.move
        });

        if (prevPos && typeof detectBrilliant === 'function' && detectBrilliant(pos, prevPos)) {
            pos.classification.isBrilliant = true;
            pos.classification.category = 'Brilliant';
            pos.classification.info = MOVE_CATEGORIES['Brilliant'];
        }
    }

    if (isTrial) {
        updateCoachPanelForTrial();
        renderMoveList();
    } else {
        updateLiveEngineUIComplete(rawResult, targetDepth, pos.fen);
        const badgeContainer = document.getElementById(`move-badge-${pos.index}`);
        if (badgeContainer) badgeContainer.innerHTML = buildMoveCellBadgeHtml(pos);
        if (pos.index === AppState.currentMoveIndex) {
            updateCoachPanel();
            updateEvalBar();
        }
    }
}

/**
 * HÀM TÍCH HỢP ĐẠI NHẤT THỐNG 1: Dành cho Nhánh Đi Thử & Live Engine
 */
async function triggerLiveAnalysis(fen, forceReeval = false) {
    if (typeof isBotGameActive !== 'undefined' && isBotGameActive) return;
    const inTrial = isInTrialBranch();

    if (inTrial && AppState.isAnalyzing && !isAnalysisPaused) {
        if (typeof pauseAnalysis === 'function') pauseAnalysis();
    }

    if (!isLiveEngineEnabled && !inTrial) {
        updateLiveEngineUIOff();
        return;
    }

    if (AppState.isAnalyzing && !isAnalysisPaused && !inTrial) return;

    // FIX LỖI GHI ĐÈ KẾT QUẢ VÁN GỐC: 
    if (!forceReeval && !inTrial && AppState.gamePositions[AppState.currentMoveIndex] && AppState.gamePositions[AppState.currentMoveIndex].eval) {
        const existingEval = AppState.gamePositions[AppState.currentMoveIndex].eval;
        updateLiveEngineUIComplete(existingEval, currentDepth || 16, fen);
        return;
    }

    if (forceReeval && !inTrial && AppState.gamePositions[AppState.currentMoveIndex]) {
        AppState.gamePositions[AppState.currentMoveIndex].eval = null;
        AppState.gamePositions[AppState.currentMoveIndex].classification = null;
    }

    try {
        if (inTrial) {
            const bIdx = AppState.trialBranch.currentIndex;
            await evaluateAndClassifyPosition(AppState.trialBranch.positions[bIdx], true, true);
        } else {
            await evaluateAndClassifyPosition(AppState.gamePositions[AppState.currentMoveIndex], false, false);
        }
    } catch (err) {
        if (err && err.message !== 'ENGINE_STOPPED' && err.message !== 'ENGINE_INTERRUPTED') {
            console.error('Lỗi Live Analysis:', err);
        }
    }
}

/**
 * HÀM TÍCH HỢP ĐẠI NHẤT THỐNG 2: Dành cho Phân tích hàng loạt cả ván đấu
 */
async function analyzeCurrentGame(game, startIndex = 0) {
    const currentSession = ++analysisSessionId;
    stockfishEngine.stop();

    const totalPositions = AppState.gamePositions.length;
    if (totalPositions === 0) return;

    if (startIndex === 0) {
        try {
            await stockfishEngine.resetNewGame();
        } catch (e) { }
        if (currentSession !== analysisSessionId) return;
        lastCompletedIndex = 0;
        if (cacheStatusBadge) cacheStatusBadge.classList.add('hidden');
        if (btnReanalyze) btnReanalyze.classList.add('hidden');
        progressPercent.textContent = '0%';
        progressFill.style.width = '0%';
        startElapsedTimer(false);
    } else {
        startElapsedTimer(true);
    }

    AppState.isAnalyzing = true; isAnalysisPaused = false;
    progressBox.classList.remove('hidden', 'done', 'paused');
    progressText.textContent = t('progress_analyzing_format', startIndex, totalPositions);

    if (btnPauseAnalysis) {
        btnPauseAnalysis.classList.remove('hidden', 'btn-resume');
        btnPauseAnalysis.classList.add('btn-pause');
        btnPauseAnalysis.textContent = t('btn_pause_analysis');
    }

    try {
        await stockfishEngine.init();
        if (startIndex === 0 && typeof stockfishEngine.clearHash === 'function') {
            stockfishEngine.clearHash();
        }

        for (let i = startIndex; i < totalPositions; i++) {
            if (currentSession !== analysisSessionId || isAnalysisPaused) return;

            const shouldClearHash = (i === startIndex && startIndex === 0);
            await evaluateAndClassifyPosition(AppState.gamePositions[i], false, shouldClearHash);

            if (currentSession !== analysisSessionId || isAnalysisPaused) return;

            if (i !== AppState.currentMoveIndex) updateNextMistakeButtonState();
            if (i % 2 === 0 || i === totalPositions - 1) { drawEvalChart(); renderKeyMovesList(); }

            const completed = i + 1; lastCompletedIndex = completed;
            const percent = Math.round((completed / totalPositions) * 100);
            progressText.textContent = t('progress_analyzing_format', completed, totalPositions);
            progressPercent.textContent = `${percent}%`; progressFill.style.width = `${percent}%`;
        }

        AppState.isAnalyzing = false; isAnalysisPaused = false; stopElapsedTimer();
        if (btnPauseAnalysis) btnPauseAnalysis.classList.add('hidden');

        if (progressText) {
            progressText.textContent = (typeof currentLang !== 'undefined' && currentLang === 'en')
                ? 'Classifying moves & calculating accuracy...'
                : 'Đang phân loại nước đi & tính độ chính xác...';
        }
        if (progressBox) {
            progressBox.classList.remove('paused');
        }

        const classifyFn = (typeof classifyAllMovesAndStatsAsync === 'function')
            ? classifyAllMovesAndStatsAsync
            : classifyAllMovesAndStats;

        const finalStats = await classifyFn(AppState.gamePositions, {
            chunkSize: 8,
            onProgress: (done, total) => {
                if (progressText) {
                    const statusText = (typeof currentLang !== 'undefined' && currentLang === 'en')
                        ? 'Calculating accuracy'
                        : 'Đang tính độ chính xác';
                    progressText.textContent = `${statusText} (${done}/${total})...`;
                }
            }
        });
        // Gắn weightedSum và totalWeight để lưu cache chuẩn xác cho Global Weighted Mean
        ['w', 'b'].forEach(c => {
            if (finalStats && finalStats[c]) {
                if (typeof finalStats[c].weightedSum !== 'number' || typeof finalStats[c].totalWeight !== 'number' || finalStats[c].totalWeight <= 0) {
                    const arr = Array.isArray(finalStats[c].accuracies) ? finalStats[c].accuracies : [];
                    let wSum = 0;
                    let tWeight = 0;
                    for (const acc of arr) {
                        const num = Number(acc);
                        if (Number.isFinite(num)) {
                            const weight = num < 50 ? 2.0 : (num < 80 ? 1.4 : 1.0);
                            wSum += num * weight;
                            tWeight += weight;
                        }
                    }
                    finalStats[c].weightedSum = Number(wSum.toFixed(2));
                    finalStats[c].totalWeight = Number(tWeight.toFixed(2));
                }
            }
        });

        renderStatsTable(finalStats, game);
        updateCoachPanel(); updateEvalBar(); drawEvalChart(); renderKeyMovesList();

        if (typeof saveGameAnalysisCache === 'function') {
            await saveGameAnalysisCache(game.url, currentDepth, AppState.gamePositions, finalStats, game.userColor);
            analyzedGameUrls.add(game.url); applyGameListFilters();
            updatePersonalPuzzlesBadge();
        }

        if (cacheStatusBadge) cacheStatusBadge.classList.remove('hidden');
        if (btnReanalyze) btnReanalyze.classList.remove('hidden');
        progressBox.classList.remove('paused'); progressBox.classList.add('done');
        progressText.textContent = t('progress_done_format', totalPositions, totalPositions);

        // Giải phóng hash table Stockfish giữa các ván để đảm bảo không rò rỉ RAM khi phân tích batch liên tục
        if (typeof stockfishEngine.clearHash === 'function') {
            stockfishEngine.clearHash();
        }

        // Tự động gối đầu sang ván tiếp theo khi hoàn tất 100% ván hiện tại (Batch Analysis)
        if (isBatchAnalyzing) {
            setTimeout(() => {
                analyzeNextUnanalyzedGame();
            }, 300);
        }
    } catch (error) {
        if (typeof stockfishEngine.clearHash === 'function') {
            stockfishEngine.clearHash();
        }
        if (error && (error.message === 'ENGINE_STOPPED' || error.message === 'ENGINE_INTERRUPTED')) {
            if (!isAnalysisPaused && currentSession === analysisSessionId) {
                AppState.isAnalyzing = false;
                stopElapsedTimer();
                if (btnPauseAnalysis) btnPauseAnalysis.classList.add('hidden');
            }
            return;
        }
        AppState.isAnalyzing = false; stopElapsedTimer();
        if (btnPauseAnalysis) btnPauseAnalysis.classList.add('hidden');
        showStatus(error.message, 'error'); progressBox.classList.add('hidden');
        if (isBatchAnalyzing) {
            setTimeout(() => {
                analyzeNextUnanalyzedGame();
            }, 500);
        }
    }
}

/**
 * Bắt đầu tiến trình phân tích chạy nền liên tục (Batch Analysis) cho toàn bộ ván cờ trong tháng
 */
async function startBatchAnalysis() {
    if (!AppState.loadedGames || AppState.loadedGames.length === 0) {
        showStatus(t('batch_no_games'), 'info');
        return;
    }

    isBatchAnalyzing = true;

    const btnStart = document.getElementById('btn-start-batch');
    const btnStop = document.getElementById('btn-stop-batch');
    const progressEl = document.getElementById('batch-progress-text');

    if (btnStart) btnStart.style.display = 'none';
    if (btnStop) btnStop.style.display = '';

    // Nếu đã duyệt hết danh sách trước đó, reset về 0 để quét lại từ đầu
    if (currentBatchIndex >= AppState.loadedGames.length) {
        currentBatchIndex = 0;
    }

    if (progressEl) {
        progressEl.textContent = t('loading_games');
        progressEl.style.color = '';
    }

    await analyzeNextUnanalyzedGame();
}

/**
 * Dừng tiến trình phân tích chạy nền liên tục
 */
function stopBatchAnalysis() {
    isBatchAnalyzing = false;

    const btnStart = document.getElementById('btn-start-batch');
    const btnStop = document.getElementById('btn-stop-batch');
    const progressEl = document.getElementById('batch-progress-text');

    if (btnStart) btnStart.style.display = '';
    if (btnStop) btnStop.style.display = 'none';

    if (progressEl && !progressEl.textContent.includes(t('batch_done'))) {
        progressEl.textContent = t('batch_paused');
        progressEl.style.color = 'var(--muted)';
    }
}

/**
 * Tìm và kích hoạt phân tích ván cờ tiếp theo chưa có trong bộ nhớ cache
 */
async function analyzeNextUnanalyzedGame() {
    // 1. Kiểm tra điều kiện ngắt ngay lập tức: nếu người dùng đã bấm Dừng, thoát ngay
    if (!isBatchAnalyzing) return;

    if (!AppState.loadedGames || AppState.loadedGames.length === 0) {
        stopBatchAnalysis();
        return;
    }

    const totalGames = AppState.loadedGames.length;
    let foundIndex = -1;

    // Quét tìm ván chưa phân tích tính từ currentBatchIndex đến hết mảng
    for (let i = currentBatchIndex; i < totalGames; i++) {
        const game = AppState.loadedGames[i];
        if (game && game.url && !analyzedGameUrls.has(game.url)) {
            foundIndex = i;
            break;
        }
    }

    // Nếu từ currentBatchIndex trở đi không còn, nhưng có thể các ván trước đó chưa phân tích
    if (foundIndex === -1) {
        for (let i = 0; i < currentBatchIndex; i++) {
            const game = AppState.loadedGames[i];
            if (game && game.url && !analyzedGameUrls.has(game.url)) {
                foundIndex = i;
                break;
            }
        }
    }

    // Nếu tất cả ván cờ đã được phân tích hoàn tất:
    if (foundIndex === -1) {
        stopBatchAnalysis();
        const progressEl = document.getElementById('batch-progress-text');
        if (progressEl) {
            progressEl.textContent = t('batch_done');
            progressEl.style.color = 'var(--best)';
        }
        return;
    }

    currentBatchIndex = foundIndex + 1;
    const progressEl = document.getElementById('batch-progress-text');
    if (progressEl) {
        progressEl.textContent = t('batch_running', foundIndex + 1, totalGames);
        progressEl.style.color = 'var(--text)';
    }

    // Chọn ván này để nạp bàn cờ và bắt đầu phân tích
    // Giữ danh sách ván cờ nếu đang mở để người dùng tiện theo dõi tiến độ
    await selectGame(foundIndex, true);
}

function pauseAnalysis() {
    if (!AppState.isAnalyzing || isAnalysisPaused) return;
    isAnalysisPaused = true; stockfishEngine.stop(); pauseElapsedTimer();
    if (btnPauseAnalysis) { btnPauseAnalysis.textContent = t('btn_resume_analysis'); btnPauseAnalysis.classList.add('btn-resume'); btnPauseAnalysis.classList.remove('btn-pause'); }
    progressBox.classList.add('paused'); progressText.textContent = t('progress_paused_format', lastCompletedIndex, AppState.gamePositions.length); drawEvalChart();
}
function resumeAnalysis() {
    if (!isAnalysisPaused || AppState.selectedGameIndex === null) return;
    isAnalysisPaused = false;
    if (btnPauseAnalysis) { btnPauseAnalysis.textContent = t('btn_pause_analysis'); btnPauseAnalysis.classList.remove('btn-resume'); btnPauseAnalysis.classList.add('btn-pause'); }
    progressBox.classList.remove('paused'); analyzeCurrentGame(AppState.loadedGames[AppState.selectedGameIndex], lastCompletedIndex);
}
async function applyCachedAnalysis(cachedData, game) {
    const currentSession = ++analysisSessionId;
    stockfishEngine.stop(); AppState.isAnalyzing = false; isAnalysisPaused = false; stopElapsedTimer();
    if (btnPauseAnalysis) btnPauseAnalysis.classList.add('hidden');
    if (progressBox) {
        progressBox.classList.remove('hidden', 'paused');
        if (progressText) {
            progressText.textContent = (typeof currentLang !== 'undefined' && currentLang === 'en')
                ? 'Loading cached analysis...'
                : 'Đang tải phân tích đã lưu...';
        }
    }
    if (cachedData.positions && cachedData.positions.length) {
        cachedData.positions.forEach(p => {
            if (AppState.gamePositions[p.index]) {
                AppState.gamePositions[p.index].eval = p.eval;
            }
        });
        // Tự động phân loại lại theo thuật toán mới nhất với Yielding
        const classifyFn = (typeof classifyAllMovesAndStatsAsync === 'function')
            ? classifyAllMovesAndStatsAsync
            : classifyAllMovesAndStats;

        const freshStats = await classifyFn(AppState.gamePositions, {
            chunkSize: 12,
            onProgress: (done, total) => {
                if (progressText && currentSession === analysisSessionId) {
                    const statusText = (typeof currentLang !== 'undefined' && currentLang === 'en')
                        ? 'Reading cache'
                        : 'Đang nạp phân tích';
                    progressText.textContent = `${statusText} (${done}/${total})...`;
                }
            }
        });
        if (currentSession !== analysisSessionId) return;
        cachedData.stats = freshStats;
    }
    for (let i = 1; i < AppState.gamePositions.length; i++) {
        const badgeContainer = document.getElementById(`move-badge-${i}`);
        if (badgeContainer) badgeContainer.innerHTML = buildMoveCellBadgeHtml(AppState.gamePositions[i]);
    }
    const statsToRender = (cachedData.stats && cachedData.stats.w)
        ? cachedData.stats
        : null;
    if (statsToRender) renderStatsTable(statsToRender, game);
    if (cacheStatusBadge) cacheStatusBadge.classList.remove('hidden');
    if (btnReanalyze) btnReanalyze.classList.remove('hidden');
    progressBox.classList.remove('hidden', 'paused');
    progressBox.classList.add('done');
    progressText.textContent = t('progress_cached_format', cachedData.depth || currentDepth);
    progressPercent.textContent = '100%';
    progressFill.style.width = '100%';
    if (analysisElapsedTime) analysisElapsedTime.textContent = t('cache_saved');
    drawEvalChart();
    renderKeyMovesList();
    goToMove(AppState.currentMoveIndex);
}

function updateLiveEngineUIOff() {
    if (liveEngineStatusBadge) { liveEngineStatusBadge.className = 'live-status-badge off'; liveEngineStatusBadge.textContent = t('live_engine_off'); }
    if (liveEvalText) { liveEvalText.textContent = '--'; liveEvalText.className = 'live-result-val score-neutral'; }
    if (liveBestMoveText) liveBestMoveText.textContent = '--';
    if (liveDepthText) liveDepthText.textContent = t('live_engine_off_format', currentLiveDepth);
}
function updateLiveEngineUIAnalyzing(targetDepth) {
    if (liveEngineStatusBadge) { liveEngineStatusBadge.className = 'live-status-badge running'; liveEngineStatusBadge.textContent = t('live_engine_analyzing'); }
    if (liveDepthText) liveDepthText.textContent = `0 / ${targetDepth}`;
}
function updateLiveEngineUIProgress(data, targetDepth, fen) {
    if (!data) return;
    const userColor = getCurrentUserColor();
    const isBlack = (userColor === 'b');
    const multiplier = isBlack ? -1 : 1;

    if (liveDepthText) liveDepthText.textContent = `${data.depth || 0} / ${targetDepth}`;
    if (liveEvalText) {
        if (data.mateWhite !== null && data.mateWhite !== undefined) {
            if (data.mateWhite === 0) {
                liveEvalText.textContent = (data.cpWhite > 0) ? (isBlack ? '0-1' : '1-0') : (isBlack ? '1-0' : '0-1');
            } else {
                const userMate = data.mateWhite * multiplier;
                liveEvalText.textContent = `M${userMate > 0 ? '+' : ''}${userMate}`;
            }
            liveEvalText.className = 'live-result-val score-mate';
        } else if (data.cpWhite !== null && data.cpWhite !== undefined) {
            const userCp = data.cpWhite * multiplier;
            const pawns = (userCp / 100).toFixed(2);
            liveEvalText.textContent = userCp > 0 ? `+${pawns}` : `${pawns}`;
            if (userCp > 20) liveEvalText.className = 'live-result-val score-white-fav';
            else if (userCp < -20) liveEvalText.className = 'live-result-val score-black-fav';
            else liveEvalText.className = 'live-result-val score-neutral';
        }
    }
    if (liveBestMoveText && data.bestmove) {
        const san = (typeof uciToSan === 'function') ? uciToSan(fen, data.bestmove) : data.bestmove;
        liveBestMoveText.textContent = `${san} (${data.bestmove})`;
    }
}
function updateLiveEngineUIComplete(result, targetDepth, fen) {
    if (liveEngineStatusBadge) { liveEngineStatusBadge.className = 'live-status-badge done'; liveEngineStatusBadge.textContent = t('live_engine_done'); }
    updateLiveEngineUIProgress(result, targetDepth, fen);
}

function formatTimeClass(timeClass, lang = currentLang) {
    const map = { bullet: 'Bullet', blitz: 'Blitz', rapid: 'Rapid', daily: 'Daily' };
    return map[timeClass] || (timeClass ? timeClass.toUpperCase() : (lang === 'en' ? 'Chess' : 'Cờ vua'));
}

function renderGameList(games) {
    initDelegatedEventListeners();
    const list = Array.isArray(games) ? games : AppState.loadedGames;
    if (!gameListContainer) return;
    gameListContainer.innerHTML = '';
    if (gameCountSpan) gameCountSpan.textContent = list.length;
    if (list.length === 0) {
        const emptyP = document.createElement('p');
        emptyP.className = 'empty-text';
        emptyP.textContent = t('no_games_found');
        gameListContainer.appendChild(emptyP);
        return;
    }

    const fragment = document.createDocumentFragment();

    list.forEach((game) => {
        const item = document.createElement('div');
        item.className = 'game-item';
        const originalIndex = AppState.loadedGames.indexOf(game);
        item.dataset.index = originalIndex;
        if (originalIndex === AppState.selectedGameIndex) item.classList.add('active');
        const colorClass = game.userColor === 'w' ? 'white' : 'black';
        const badgeClass = `badge-${game.resultType}`;
        const timeClassSafe = (game.timeClass || 'rapid').toLowerCase();
        const isAnalyzed = analyzedGameUrls.has(game.url);

        const res = (game.isCustomFen)
            ? { label: 'FEN', type: 'draw' }
            : ((typeof parseChessComResult === 'function')
                ? parseChessComResult(game.rawResult || game.resultLabel, currentLang)
                : { label: game.resultLabel, type: game.resultType });

        let resultIcon = '';
        if (game.resultType === 'win') resultIcon = '<svg class="result-icon" width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M2 6l3 3 5-6"/></svg>';
        else if (game.resultType === 'loss') resultIcon = '<svg class="result-icon" width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M2.5 2.5l7 7M9.5 2.5l-7 7"/></svg>';
        else resultIcon = '<svg class="result-icon" width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M2 4.5h8M2 7.5h8"/></svg>';

        let timeIcon = '';
        if (timeClassSafe === 'rapid') timeIcon = '<svg class="time-icon" width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="8" cy="8" r="6"/><path d="M8 5v3l2 2"/></svg>';
        else if (timeClassSafe === 'blitz') timeIcon = '<svg class="time-icon" width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 2L4 9h5l-2 5 7-8H9l2-4z"/></svg>';
        else if (timeClassSafe === 'bullet') timeIcon = '<svg class="time-icon" width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 2c-3 0-5 3-5 7a5 5 0 0 0 10 0c0-4-2-7-5-7z"/></svg>';
        else timeIcon = '<svg class="time-icon" width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="10" height="9" rx="1"/><path d="M8 2v3"/></svg>';

        let displayDate = game.dateStr;
        if (game.endTime) {
            const locale = (currentLang === 'en') ? 'en-US' : 'vi-VN';
            displayDate = new Date(game.endTime * 1000).toLocaleDateString(locale, {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        }

        const header = document.createElement('div');
        header.className = 'game-item-header';

        const playerInfo = document.createElement('div');
        playerInfo.className = 'game-player-info';

        const colorSq = document.createElement('span');
        colorSq.className = `color-square ${colorClass}`;

        const oppName = document.createElement('span');
        oppName.className = 'opponent-name';
        oppName.textContent = game.opponentUsername || '';

        const oppRating = document.createElement('span');
        oppRating.className = 'opponent-rating';
        oppRating.textContent = `(${game.opponentRating || '?'})`;

        playerInfo.appendChild(colorSq);
        playerInfo.appendChild(oppName);
        playerInfo.appendChild(oppRating);

        const dateSpan = document.createElement('span');
        dateSpan.className = 'game-date';
        dateSpan.textContent = displayDate || '';

        header.appendChild(playerInfo);
        header.appendChild(dateSpan);

        const meta = document.createElement('div');
        meta.className = 'game-item-meta';

        const tags = document.createElement('div');
        tags.className = 'game-item-tags';

        const timeBadge = document.createElement('span');
        timeBadge.className = `time-class-badge time-${timeClassSafe}`;
        timeBadge.innerHTML = `${timeIcon} `;
        timeBadge.appendChild(document.createTextNode(formatTimeClass(game.timeClass, currentLang)));
        tags.appendChild(timeBadge);

        if (isAnalyzed) {
            const analyzedBadge = document.createElement('span');
            analyzedBadge.className = 'badge-analyzed';
            analyzedBadge.textContent = t('badge_analyzed');
            tags.appendChild(analyzedBadge);
        }

        const resBadge = document.createElement('span');
        resBadge.className = `badge-result ${badgeClass}`;
        resBadge.innerHTML = `${resultIcon} `;
        resBadge.appendChild(document.createTextNode(res.label || ''));

        meta.appendChild(tags);
        meta.appendChild(resBadge);

        item.appendChild(header);
        item.appendChild(meta);

        // Click handled via event delegation on gameListContainer
        fragment.appendChild(item);
    });

    gameListContainer.appendChild(fragment);
}
function applyGameListFilters() {
    let result = [...AppState.loadedGames];
    if (currentFilterResult !== 'all') result = result.filter(game => game.resultType === currentFilterResult);
    if (currentFilterTimeClass !== 'all') result = result.filter(game => (game.timeClass || '').toLowerCase() === currentFilterTimeClass.toLowerCase());
    if (currentSortOrder === 'oldest') result.reverse();
    renderGameList(result);
}

let selectGameToken = 0;

async function selectGame(gameOrIndex, keepDrawerOpen = false) {
    const myToken = ++selectGameToken;
    if (!keepDrawerOpen && !isBatchAnalyzing) closeGameDrawer();
    let index, game;
    if (typeof gameOrIndex === 'number') { index = gameOrIndex; game = AppState.loadedGames[index]; } else { game = gameOrIndex; index = AppState.loadedGames.indexOf(game); }
    AppState.selectedGameIndex = index;
    gameListContainer.querySelectorAll('.game-item').forEach((el) => el.classList.toggle('active', Number(el.dataset.index) === AppState.selectedGameIndex));
    try {
        if (isBotGameActive) exitBotGame();
        const btnPlayBotEl = document.getElementById('btn-play-bot');
        if (btnPlayBotEl) btnPlayBotEl.disabled = false;
        hideStatus(); AppState.trialBranch = null; if (btnCoachExitTrial) btnCoachExitTrial.classList.add('hidden');
        selectedSquareForMove = null; clearSquareMoveHighlights(); isShowingBestMove = true; isShowingExplain = false;
        if (kpiOpening) kpiOpening.textContent = (typeof extractOpeningNameFromPGN === 'function') ? extractOpeningNameFromPGN(game.pgn) : '--';
        document.getElementById('kpi-user-accuracy').textContent = '--%'; document.getElementById('kpi-opp-accuracy').textContent = '--%';
        document.getElementById('kpi-user-mistakes').textContent = '--'; document.getElementById('kpi-user-mistakes-detail').textContent = t('mistakes_detail_placeholder');
        const kpiPerfRatingEl = document.getElementById('kpi-performance-rating');
        const kpiPerfDiffEl = document.getElementById('kpi-perf-diff');
        const kpiPerfCompEl = document.getElementById('kpi-perf-comparison');
        if (kpiPerfRatingEl) kpiPerfRatingEl.textContent = '--';
        if (kpiPerfDiffEl) { kpiPerfDiffEl.textContent = '--'; kpiPerfDiffEl.className = 'perf-diff-badge hidden'; }
        if (kpiPerfCompEl) kpiPerfCompEl.textContent = t('perf_waiting');
        document.getElementById('classification-bars').innerHTML = '';
        reviewPlaceholder.classList.add('hidden'); reviewContent.classList.remove('hidden');
        setTimeout(() => { if (board && typeof board.resize === 'function') board.resize(); }, 50);

        const userColor = getCurrentUserColor(game);
        const myUsername = game.userUsername || (typeof getAppUsername === 'function' ? getAppUsername() : '') || (currentLang === 'en' ? 'You' : 'Bạn');
        const whitePlayer = userColor === 'w' ? `${myUsername} (${game.userRating || '?'})` : `${game.opponentUsername || 'Opponent'} (${game.opponentRating || '?'})`;
        const blackPlayer = userColor === 'b' ? `${myUsername} (${game.userRating || '?'})` : `${game.opponentUsername || 'Opponent'} (${game.opponentRating || '?'})`;
        const whiteLabel = t('white_player_lbl');
        const blackLabel = t('black_player_lbl');
        if (gamePlayersInfo) gamePlayersInfo.innerHTML = `<strong>⬜ ${whiteLabel}:</strong> ${escapeHTML(whitePlayer)} &nbsp;|&nbsp; <strong>⬛ ${blackLabel}:</strong> ${escapeHTML(blackPlayer)}`;
        const res = (game.isCustomFen)
            ? { label: 'FEN', type: 'draw' }
            : ((typeof parseChessComResult === 'function')
                ? parseChessComResult(game.rawResult || game.resultLabel, currentLang)
                : { label: game.resultLabel, type: game.resultType });
        if (gameResultBadge) { gameResultBadge.className = `badge-result badge-${res.type || game.resultType}`; gameResultBadge.textContent = res.label; }
        if (btnOpenChessCom) {
            if (game.url && !game.url.startsWith('custom://')) {
                btnOpenChessCom.href = game.url;
                btnOpenChessCom.classList.remove('hidden');
            } else {
                btnOpenChessCom.classList.add('hidden');
            }
        }

        AppState.isAnalyzing = false; isAnalysisPaused = false; stockfishEngine.stop(); stopElapsedTimer();
        const userOrientation = (userColor === 'b') ? 'black' : 'white';
        const autoFlip = (typeof localStorage !== 'undefined' && localStorage.getItem('chess_auto_flip') !== 'false');
        if (autoFlip) {
            initChessboard(userOrientation);
            if (board) board.orientation(userOrientation);
            updateEvalBarOrientation(userOrientation);
        } else {
            initChessboard('white');
        }
        if (typeof board.resize === 'function') board.resize();
        stopAutoplay();
        if (game.isCustomFen) {
            AppState.gamePositions = [{
                index: 0,
                fen: game.fen,
                turn: new Chess(game.fen).turn(),
                move: null,
                eval: null,
                classification: null,
                timeSpentSec: null,
                timeSpentStr: null,
                whiteClock: null,
                blackClock: null
            }];
            if (board) {
                board.orientation(userOrientation);
                board.position(game.fen, false);
                updateEvalBarOrientation(userOrientation);
            }
            renderMoveList();
            drawEvalChart();
            renderKeyMovesList();
            goToMove(0, false, false, false);
            triggerLiveAnalysis(game.fen);
            return;
        }
        AppState.gamePositions = buildPositionsFromPGN(game.pgn);
        renderMoveList(); drawEvalChart(); renderKeyMovesList(); goToMove(0);

        let cachedData = null;
        if (typeof getGameAnalysisCache === 'function') cachedData = await getGameAnalysisCache(game.url, currentDepth);
        if (myToken !== selectGameToken) return;
        if (cachedData && cachedData.positions && cachedData.positions.length) {
            await applyCachedAnalysis(cachedData, game);
            analyzedGameUrls.add(game.url);
            applyGameListFilters();
            if (isBatchAnalyzing) {
                setTimeout(() => {
                    analyzeNextUnanalyzedGame();
                }, 150);
            }
        } else {
            if (cacheStatusBadge) cacheStatusBadge.classList.add('hidden');
            if (btnReanalyze) btnReanalyze.classList.add('hidden');
            analyzeCurrentGame(game, 0);
        }
    } catch (error) {
        showStatus(error.message, 'error');
        if (isBatchAnalyzing) {
            setTimeout(() => {
                analyzeNextUnanalyzedGame();
            }, 300);
        }
    }
}

/**
 * Render Mini-Dashboard trên màn hình chờ (#review-placeholder)
 * @param {Array} games - Danh sách ván cờ đã tải (AppState.loadedGames)
 */
async function renderWelcomeDashboard(games) {
    const placeholderEl = document.getElementById('review-placeholder');
    const emptyEl = document.getElementById('welcome-empty');
    const dashboardEl = document.getElementById('welcome-dashboard');
    if (!placeholderEl) return;

    if (!games || !games.length) {
        if (emptyEl) emptyEl.classList.remove('hidden');
        if (dashboardEl) dashboardEl.classList.add('hidden');
        return;
    }

    if (emptyEl) emptyEl.classList.add('hidden');
    if (dashboardEl) dashboardEl.classList.remove('hidden');

    // 1. Phân vùng Hero: Ván cờ mới nhất (games[0])
    const latestGame = games[0];
    const heroTitleEl = document.getElementById('welcome-hero-title');
    const heroMetaEl = document.getElementById('welcome-hero-meta');
    const heroAnalyzeBtn = document.getElementById('btn-welcome-hero-analyze');

    if (heroTitleEl) {
        heroTitleEl.textContent = `vs ${latestGame.opponentUsername} (${latestGame.opponentRating || '?'})`;
    }
    if (heroMetaEl) {
        const timeClassText = (latestGame.timeClass || 'chess');
        const capTimeClass = timeClassText.charAt(0).toUpperCase() + timeClassText.slice(1);
        const resInfo = (typeof parseChessComResult === 'function')
            ? parseChessComResult(latestGame.rawResult || latestGame.resultLabel, currentLang)
            : { label: latestGame.resultLabel, type: latestGame.resultType };

        let heroDate = latestGame.dateStr || '';
        if (latestGame.endTime) {
            const locale = (currentLang === 'en') ? 'en-US' : 'vi-VN';
            heroDate = new Date(latestGame.endTime * 1000).toLocaleDateString(locale, {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        }

        heroMetaEl.innerHTML = `
        <span class="dot ${escapeHTML(latestGame.userColor)}"></span>
        <span class="tg">${escapeHTML(capTimeClass)}</span>
        <span class="res ${escapeHTML(resInfo.type)}">${escapeHTML(resInfo.label)}</span>
        <span class="mute">${escapeHTML(heroDate)}</span>
    `;
    }
    if (heroAnalyzeBtn) {
        heroAnalyzeBtn.onclick = (e) => {
            e.stopPropagation();
            selectGame(0);
        };
    }

    // 2. Phân vùng Tiles: Thống kê nhanh
    const totalGames = games.length;
    const winCount = games.filter(g => g && g.resultType === 'win').length;
    const lossCount = games.filter(g => g && g.resultType === 'loss').length;
    const drawCount = Math.max(0, totalGames - winCount - lossCount);
    const winPct = (totalGames > 0 && Number.isFinite(winCount / totalGames)) ? Math.round((winCount / totalGames) * 100) : 0;

    const currentMonthVal = monthSelect ? monthSelect.value : '';
    const currentYearVal = yearInput ? yearInput.value : '';
    const monthLabelStr = currentMonthVal ? `${currentMonthVal}/${currentYearVal}` : '';

    const tileGamesLabel = document.getElementById('welcome-tile-games-label');
    const tileGamesCount = document.getElementById('welcome-tile-games-count');
    const tileGamesBar = document.getElementById('welcome-tile-games-bar');
    const tileGamesSub = document.getElementById('welcome-tile-games-sub');

    if (tileGamesLabel) {
        tileGamesLabel.textContent = monthLabelStr
            ? t('welcome_month_games_format', monthLabelStr)
            : t('welcome_month_games');
    }
    if (tileGamesCount) tileGamesCount.textContent = totalGames;
    if (tileGamesBar) {
        if (totalGames > 0) {
            tileGamesBar.innerHTML = `
            <i style="flex:${winCount};background:var(--best)" title="${winCount} ${t('filter_result_win')}"></i>
            <i style="flex:${drawCount};background:var(--good)" title="${drawCount} ${t('filter_result_draw')}"></i>
            <i style="flex:${lossCount};background:var(--blu)" title="${lossCount} ${t('filter_result_loss')}"></i>
        `;
        } else {
            tileGamesBar.innerHTML = `<i style="flex:1;background:var(--line)"></i>`;
        }
    }
    if (tileGamesSub) {
        tileGamesSub.textContent = t('welcome_stats_sub', winCount, drawCount, lossCount);
    }

    // Tile 2: Tỉ lệ thắng
    const tileWinrateVal = document.getElementById('welcome-tile-winrate-val');
    const tileWinrateSub = document.getElementById('welcome-tile-winrate-sub');
    if (tileWinrateVal) tileWinrateVal.textContent = `${winPct}%`;
    if (tileWinrateSub) tileWinrateSub.textContent = t('welcome_wins_count', winCount);

    // Tile 3: Độ chính xác trung bình
    const tileAccVal = document.getElementById('welcome-tile-accuracy-val');
    const tileAccSub = document.getElementById('welcome-tile-accuracy-sub');
    let avgAcc = null;
    let analyzedCount = 0;

    try {
        if (typeof getAllCachedAnalyses === 'function') {
            const analyses = await getAllCachedAnalyses();
            if (analyses && analyses.length) {
                const cacheByUrl = new Map();
                for (const item of analyses) {
                    if (!item) continue;
                    if (item.gameUrl) cacheByUrl.set(item.gameUrl, item);
                    if (item.id) cacheByUrl.set(item.id, item);
                }

                let accSum = 0;
                for (const g of games) {
                    const cached = cacheByUrl.get(g.url);
                    if (cached && cached.stats) {
                        const userSideStats = cached.stats[g.userColor] || cached.stats[g.userColor === 'w' ? 'white' : 'black'];
                        if (userSideStats) {
                            const acc = Number(userSideStats.avgAccuracy ?? userSideStats.accuracy);
                            if (!isNaN(acc) && acc > 0) {
                                accSum += acc;
                                analyzedCount++;
                            }
                        }
                    }
                }
                if (analyzedCount > 0) {
                    avgAcc = (accSum / analyzedCount).toFixed(1);
                }
            }
        }
    } catch (cacheErr) {
        console.warn('Lỗi đọc cache accuracy cho welcome dashboard:', cacheErr);
    }

    if (tileAccVal) {
        tileAccVal.textContent = avgAcc !== null ? `${avgAcc}%` : '--%';
    }
    if (tileAccSub) {
        tileAccSub.textContent = analyzedCount > 0
            ? t('welcome_analyzed_count', analyzedCount)
            : t('welcome_no_analyzed');
    }

    // 3. Phân vùng List: 5 ván cờ gần nhất
    const recentListEl = document.getElementById('welcome-recent-list');
    const viewAllBtn = document.getElementById('btn-welcome-view-all');

    if (viewAllBtn) {
        viewAllBtn.onclick = (e) => {
            e.stopPropagation();
            if (typeof openGameDrawer === 'function') openGameDrawer();
        };
    }

    if (recentListEl) {
        const top5 = games.slice(0, 5);
        recentListEl.innerHTML = top5.map((g, idx) => {
            const isAnalyzed = analyzedGameUrls && analyzedGameUrls.has(g.url);
            const actionBtnClass = isAnalyzed ? 'btn-row-action' : 'btn-row-action primary';
            const actionBtnText = isAnalyzed ? t('welcome_review') : t('welcome_analyze');
            const timeClassText = (g.timeClass || '');
            const capTimeClass = timeClassText ? (timeClassText.charAt(0).toUpperCase() + timeClassText.slice(1)) : '';
            const resInfo = (typeof parseChessComResult === 'function')
                ? parseChessComResult(g.rawResult || g.resultLabel, currentLang)
                : { label: g.resultLabel, type: g.resultType };

            return `
            <div class="r welcome-game-row" data-index="${idx}">
                <span class="dot ${escapeHTML(g.userColor)}"></span>
                <b>vs ${escapeHTML(g.opponentUsername)} <span class="opponent-rating">(${escapeHTML(g.opponentRating || '?')})</span></b>
                <span class="tc"><span class="tg">${escapeHTML(capTimeClass)}</span></span>
                <span class="rs res ${escapeHTML(resInfo.type)}">${escapeHTML(resInfo.label)}</span>
                <button type="button" class="${actionBtnClass}" data-index="${idx}">${escapeHTML(actionBtnText)}</button>
            </div>
        `;
        }).join('');

        recentListEl.querySelectorAll('.welcome-game-row').forEach(row => {
            row.addEventListener('click', () => {
                const idx = Number(row.dataset.index);
                if (!isNaN(idx)) selectGame(idx);
            });
        });

        recentListEl.querySelectorAll('.btn-row-action').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const idx = Number(btn.dataset.index);
                if (!isNaN(idx)) selectGame(idx);
            });
        });
    }
}

async function handleFetchGames() {
    if (isBatchAnalyzing) stopBatchAnalysis();
    currentBatchIndex = 0;
    const progressEl = document.getElementById('batch-progress-text');
    if (progressEl) progressEl.textContent = '';

    const username = (typeof getAppUsername === 'function' ? getAppUsername() : (typeof CHESSCOM_USERNAME !== 'undefined' ? CHESSCOM_USERNAME : ''));
    if (!username) {
        showStatus((typeof currentLang !== 'undefined' && currentLang === 'en') ? 'Please enter a Chess.com username in Settings.' : 'Vui lòng nhập username Chess.com trong Cài đặt.', 'error');
        return;
    }
    const year = parseInt(yearInput.value, 10); const month = monthSelect.value;
    if (isFutureMonth(year, month)) { showStatus(t('future_month_error_format', month, year), 'error'); updateMonthNavButtons(); return; }
    btnFetch.disabled = true; btnFetch.textContent = t('btn_loading'); showStatus(t('loading_games'), 'info');
    try {
        AppState.loadedGames = await fetchMonthlyGames(username, year, month);
        if (typeof getAllCachedGameUrls === 'function') analyzedGameUrls = await getAllCachedGameUrls(currentDepth);
        applyGameListFilters();
        await renderWelcomeDashboard(AppState.loadedGames);
        hideStatus();
    } catch (error) {
        AppState.loadedGames = []; gameCountSpan.textContent = '0'; gameListContainer.innerHTML = `<p class="empty-text">${t('no_games_found')}</p>`;
        await renderWelcomeDashboard([]);
        showStatus(error.message, 'error');
    } finally { btnFetch.disabled = false; btnFetch.textContent = t('fetch_btn'); }
}

btnStart.addEventListener('click', handleStartMove);
btnPrev.addEventListener('click', handlePrevMove);
if (btnPlay) btnPlay.addEventListener('click', toggleAutoplay);
btnNext.addEventListener('click', handleNextMove);
btnEnd.addEventListener('click', handleEndMove);
btnFlip.addEventListener('click', () => {
    if (!board) return; board.flip(); const currentOrientation = board.orientation();
    updateEvalBarOrientation(currentOrientation); updatePlayersDisplay();
    clearBoardHighlightsAndArrows();

    if (typeof isBotGameActive !== 'undefined' && isBotGameActive) {
        if (typeof botMovesHistory !== 'undefined' && botMovesHistory.length > 0) {
            const lastBotMove = botMovesHistory[botMovesHistory.length - 1];
            if (lastBotMove) highlightActualMove(lastBotMove);
        }
        if (botGameChess && botGameChess.in_check() && typeof highlightCheckSquare === 'function') {
            highlightCheckSquare(botGameChess.turn());
        }
    } else if (typeof isInTrialBranch === 'function' && isInTrialBranch()) {
        const trialPos = AppState.trialBranch.positions[AppState.trialBranch.currentIndex];
        if (trialPos && trialPos.move) highlightActualMove(trialPos.move);
    } else {
        const currentPos = AppState.gamePositions[AppState.currentMoveIndex];
        if (currentPos && currentPos.move) highlightActualMove(currentPos.move);
    }

    updateCurrentMoveArrow();
    if (typeof redrawArrows === 'function') redrawArrows(currentOrientation);
    if (typeof isBotGameActive !== 'undefined' && isBotGameActive) {
        if (botGameChess && botGameChess.game_over()) {
            updateBotGameUI();
        }
    } else {
        checkAndRenderGameOverReviewState();
    }
});

const btnCloseGob = document.getElementById('btn-close-game-over-banner');
if (btnCloseGob) {
    btnCloseGob.addEventListener('click', () => {
        hideGameOverBanner(true);
    });
}

if (btnCopyPgn) {
    btnCopyPgn.addEventListener('click', async () => {
        if (AppState.selectedGameIndex === null || !AppState.loadedGames[AppState.selectedGameIndex]) return;
        const game = AppState.loadedGames[AppState.selectedGameIndex]; if (!game.pgn) return;
        try { await navigator.clipboard.writeText(game.pgn); showCopyToast(); } catch (err) {
            const ta = document.createElement('textarea'); ta.value = game.pgn; ta.style.position = 'fixed'; ta.style.opacity = '0'; document.body.appendChild(ta); ta.focus(); ta.select(); document.execCommand('copy'); document.body.removeChild(ta); showCopyToast();
        }
    });
}

btnCoachBest.addEventListener('click', () => {
    if (isInTrialBranch()) {
        const trialPos = AppState.trialBranch.positions[AppState.trialBranch.currentIndex];
        if (!trialPos || !trialPos.eval || !trialPos.eval.bestmove) return;
        if (isShowingHints) {
            isShowingHints = false;
            currentHintsData = [];
            if (coachHintsBox) coachHintsBox.classList.add('hidden');
            btnCoachHint.classList.remove('active');
            btnCoachHint.textContent = t('btn_hints_lbl');
        }
        isShowingBestMove = !isShowingBestMove;
        clearBoardHighlightsAndArrows();
        if (trialPos && trialPos.move) highlightActualMove(trialPos.move);
        updateCurrentMoveArrow();
        updateCoachPanelForTrial();
        return;
    }
    const currentPos = AppState.gamePositions[AppState.currentMoveIndex];
    const prevPos = AppState.currentMoveIndex > 0 ? AppState.gamePositions[AppState.currentMoveIndex - 1] : null;
    const targetPos = (AppState.currentMoveIndex > 0 && prevPos) ? prevPos : currentPos;
    if (!targetPos || !targetPos.eval || !targetPos.eval.bestmove) return;
    if (isShowingHints) {
        isShowingHints = false;
        currentHintsData = [];
        if (coachHintsBox) coachHintsBox.classList.add('hidden');
        btnCoachHint.classList.remove('active');
        btnCoachHint.textContent = t('btn_hints_lbl');
    }
    isShowingBestMove = !isShowingBestMove;
    clearBoardHighlightsAndArrows();
    if (currentPos && currentPos.move) highlightActualMove(currentPos.move);
    updateCurrentMoveArrow();
    updateCoachPanel();
});

function renderHintsList(fen, results) {
    if (!coachHintsBox || !hintsList) return; hintsList.innerHTML = '';
    results.forEach((item, idx) => {
        const rank = idx + 1; const uci = item.uci; const san = (typeof uciToSan === 'function') ? uciToSan(fen, uci) : uci;
        const whiteEval = toWhitePerspective({ cp: item.cp, mate: item.mate, turn: item.turn }, item.turn);
        let scoreText = ''; let scoreClass = 'score-white-fav';
        if (whiteEval.mateWhite !== null) {
            scoreText = (whiteEval.mateWhite === 0)
                ? (whiteEval.cpWhite > 0 ? '1-0' : '0-1')
                : `M${whiteEval.mateWhite > 0 ? '+' : ''}${whiteEval.mateWhite}`;
            scoreClass = 'score-mate';
        }
        else if (whiteEval.cpWhite !== null) { const pawns = (whiteEval.cpWhite / 100).toFixed(2); scoreText = whiteEval.cpWhite > 0 ? `+${pawns}` : `${pawns}`; scoreClass = (whiteEval.cpWhite >= 0) ? 'score-white-fav' : 'score-black-fav'; }

        const hintIdea = (typeof CoachDialogue !== 'undefined' && CoachDialogue.generateTacticalHint)
            ? CoachDialogue.generateTacticalHint(fen, uci, san, currentLang)
            : '';

        const itemEl = document.createElement('div');
        itemEl.className = 'hint-item';
        itemEl.title = currentLang === 'en' ? `Hint #${rank}: ${san}` : `Nước gợi ý #${rank}: ${san}`;
        itemEl.innerHTML = `
        <div class="hint-main-row">
            <div class="hint-left">
                <span class="hint-rank-badge rank-${rank}">#${rank}</span>
                <span class="hint-move-san">${escapeHTML(san)}</span>
                <span class="hint-move-uci">(${escapeHTML(uci)})</span>
            </div>
            <span class="hint-eval-badge ${scoreClass}">${escapeHTML(scoreText)}</span>
        </div>
        ${hintIdea ? `<div class="hint-idea">${escapeHTML(hintIdea)}</div>` : ''}
    `;
        itemEl.addEventListener('click', () => {
            const boardEl = document.getElementById('board');
            if (boardEl && uci.length >= 4) {
                const fromSq = uci.slice(0, 2); const toSq = uci.slice(2, 4);
                boardEl.querySelectorAll('.square-55d63').forEach(sq => sq.classList.remove('highlight-best-move'));
                const fEl = boardEl.querySelector(`.square-${fromSq}`); const tEl = boardEl.querySelector(`.square-${toSq}`);
                if (fEl) fEl.classList.add('highlight-best-move'); if (tEl) tEl.classList.add('highlight-best-move');
            }
        });
        hintsList.appendChild(itemEl);
    });
    coachHintsBox.classList.remove('hidden');
}

if (btnCoachHint) {
    btnCoachHint.addEventListener('click', async () => {
        if (!AppState.gamePositions || AppState.gamePositions.length === 0) return;
        const currentPos = AppState.gamePositions[AppState.currentMoveIndex]; if (!currentPos) return;
        if (isShowingHints) { isShowingHints = false; currentHintsData = []; if (typeof clearArrows === 'function') clearArrows(); if (coachHintsBox) coachHintsBox.classList.add('hidden'); btnCoachHint.classList.remove('active'); btnCoachHint.textContent = t('btn_hints_lbl'); return; }
        if (AppState.isAnalyzing && !isAnalysisPaused) { showStatus(t('analysis_in_progress'), 'info'); return; }

        let targetFen = currentPos.fen;
        if (isInTrialBranch()) {
            const bIdx = AppState.trialBranch.currentIndex;
            targetFen = (bIdx === 0) ? AppState.trialBranch.baseFen : AppState.trialBranch.positions[bIdx - 1].fen;
        } else if (AppState.currentMoveIndex > 0) {
            targetFen = AppState.gamePositions[AppState.currentMoveIndex - 1].fen;
        }

        const chessCheck = new Chess(targetFen);
        if (chessCheck.in_checkmate() || chessCheck.in_draw() || chessCheck.in_stalemate() || chessCheck.in_threefold_repetition() || chessCheck.insufficient_material()) return;
        if (isShowingBestMove) { isShowingBestMove = false; updateCoachPanel(); }

        const analyzingMoveIndex = AppState.currentMoveIndex;
        btnCoachHint.disabled = true; btnCoachHint.textContent = t('btn_calculating');
        try {
            const results = await stockfishEngine.evaluateMultiPV(targetFen, 15, 3);
            if (AppState.currentMoveIndex !== analyzingMoveIndex) return;
            btnCoachHint.disabled = false;
            if (!results || results.length === 0) { btnCoachHint.textContent = t('btn_hints_lbl'); return; }
            isShowingHints = true; currentHintsData = results; btnCoachHint.classList.add('active'); btnCoachHint.textContent = t('btn_close_hints');
            if (typeof clearArrows === 'function') clearArrows();
            const hintColors = [ARROW_COLORS.BEST, ARROW_COLORS.SUGGEST_2, ARROW_COLORS.SUGGEST_3];
            const hintWidths = [17, 15, 14]; const hintOpacities = [0.85, 0.78, 0.72];
            results.forEach((item, idx) => {
                if (item.uci && item.uci.length >= 4) drawArrow(item.uci.slice(0, 2), item.uci.slice(2, 4), hintColors[idx] || ARROW_COLORS.SUGGEST_2, { width: hintWidths[idx] || 15, opacity: hintOpacities[idx] || 0.76, className: `board-arrow arrow-hint-${idx + 1}` });
            });
            renderHintsList(targetFen, results);
        } catch (err) {
            if (btnCoachHint) { btnCoachHint.disabled = false; btnCoachHint.textContent = t('btn_hints_lbl'); btnCoachHint.classList.remove('active'); }
        }
    });
}

if (btnCloseHints) btnCloseHints.addEventListener('click', () => { isShowingHints = false; currentHintsData = []; if (typeof clearArrows === 'function') clearArrows(); if (coachHintsBox) coachHintsBox.classList.add('hidden'); if (btnCoachHint) { btnCoachHint.classList.remove('active'); btnCoachHint.textContent = t('btn_hints_lbl'); } });
btnCoachExplain.addEventListener('click', () => { if (AppState.currentMoveIndex <= 0) return; isShowingExplain = !isShowingExplain; updateCoachPanel(); });
if (btnPrevMistake) btnPrevMistake.addEventListener('click', () => { stopAutoplay(); const prevErrIdx = findPrevMistakeIndex(AppState.currentMoveIndex); if (prevErrIdx !== -1) goToMove(prevErrIdx); });
btnNextMistake.addEventListener('click', () => { stopAutoplay(); const nextErrIdx = findNextMistakeIndex(AppState.currentMoveIndex); if (nextErrIdx !== -1) goToMove(nextErrIdx); });
if (btnCoachExitTrial) btnCoachExitTrial.addEventListener('click', () => { stopAutoplay(); exitTrialBranch(); });
if (btnPlayBot) btnPlayBot.addEventListener('click', () => { startBotGame(); });
if (btnExitBot) btnExitBot.addEventListener('click', () => { exitBotGame(); });
const btnBotUndoEl = document.getElementById('btn-bot-undo');
if (btnBotUndoEl) btnBotUndoEl.addEventListener('click', () => { handleBotUndo(); });

let isDraggingEvalChart = false;
let evalChartThrottleTimer = null;
let lastChartTargetMove = -1;

function getChartMoveIndexFromEvent(e) {
    if (!AppState.gamePositions || AppState.gamePositions.length === 0) return -1;
    if (e.target && e.target.classList && e.target.classList.contains('chart-error-dot')) {
        const moveIdx = Number(e.target.dataset.moveIndex);
        if (!isNaN(moveIdx) && moveIdx >= 0 && moveIdx < AppState.gamePositions.length) return moveIdx;
    }
    const rect = evalChartSvg.getBoundingClientRect();
    if (rect.width <= 0) return -1;
    const clientX = (e.clientX !== undefined) ? e.clientX : (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
    const clickX = clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    return Math.round(ratio * (AppState.gamePositions.length - 1));
}

function handleEvalChartInteraction(e, isDrag = false) {
    if (typeof isBotGameActive !== 'undefined' && isBotGameActive) return;
    if (!AppState.gamePositions || AppState.gamePositions.length === 0) return;
    stopAutoplay();
    const targetMove = getChartMoveIndexFromEvent(e);
    if (targetMove === -1) return;

    if (!isDrag) {
        if (evalChartThrottleTimer) { clearTimeout(evalChartThrottleTimer); evalChartThrottleTimer = null; }
        lastChartTargetMove = targetMove;
        goToMove(targetMove);
        return;
    }

    // 1. Cập nhật marker line ngay lập tức để trải nghiệm rê chuột siêu mượt 60fps
    updateEvalChartMarker(targetMove);

    // 2. Throttle hàm nặng goToMove (40ms) chống nghẽn CPU và dồn âm thanh
    lastChartTargetMove = targetMove;
    if (!evalChartThrottleTimer) {
        evalChartThrottleTimer = setTimeout(() => {
            evalChartThrottleTimer = null;
            if (lastChartTargetMove !== -1 && lastChartTargetMove !== AppState.currentMoveIndex) {
                goToMove(lastChartTargetMove);
            }
        }, 40);
    }
}

if (evalChartSvg) {
    evalChartSvg.addEventListener('mousedown', (e) => {
        isDraggingEvalChart = true;
        handleEvalChartInteraction(e, false);
    });
    window.addEventListener('mousemove', (e) => {
        if (isDraggingEvalChart) handleEvalChartInteraction(e, true);
    });
    window.addEventListener('mouseup', () => {
        if (isDraggingEvalChart) {
            isDraggingEvalChart = false;
            if (evalChartThrottleTimer) { clearTimeout(evalChartThrottleTimer); evalChartThrottleTimer = null; }
            if (lastChartTargetMove !== -1 && lastChartTargetMove !== AppState.currentMoveIndex) {
                goToMove(lastChartTargetMove);
            }
        }
    });
    evalChartSvg.addEventListener('touchstart', (e) => {
        isDraggingEvalChart = true;
        handleEvalChartInteraction(e, false);
    }, { passive: true });
    window.addEventListener('touchmove', (e) => {
        if (isDraggingEvalChart) handleEvalChartInteraction(e, true);
    }, { passive: true });
    window.addEventListener('touchend', () => {
        if (isDraggingEvalChart) {
            isDraggingEvalChart = false;
            if (evalChartThrottleTimer) { clearTimeout(evalChartThrottleTimer); evalChartThrottleTimer = null; }
            if (lastChartTargetMove !== -1 && lastChartTargetMove !== AppState.currentMoveIndex) {
                goToMove(lastChartTargetMove);
            }
        }
    });
}

if (btnPrevMonth) btnPrevMonth.addEventListener('click', goToPrevMonth);
if (btnNextMonth) btnNextMonth.addEventListener('click', goToNextMonth);
monthSelect.addEventListener('change', () => { updateMonthNavButtons(); handleFetchGames(); });
yearInput.addEventListener('change', () => { updateMonthNavButtons(); handleFetchGames(); });
yearInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') { updateMonthNavButtons(); handleFetchGames(); } });

if (filterResult) filterResult.addEventListener('change', (e) => { currentFilterResult = e.target.value; applyGameListFilters(); });
if (filterTimeClass) filterTimeClass.addEventListener('change', (e) => { currentFilterTimeClass = e.target.value; applyGameListFilters(); });
if (btnToggleSort) {
    btnToggleSort.addEventListener('click', () => {
        currentSortOrder = (currentSortOrder === 'newest') ? 'oldest' : 'newest';
        if (sortIcon) {
            sortIcon.innerHTML = (currentSortOrder === 'newest')
                ? '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>'
                : '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>';
        }
        if (sortLabel) sortLabel.textContent = (currentSortOrder === 'newest') ? (typeof t === 'function' ? t('sort_newest') : 'Mới nhất') : (typeof t === 'function' ? t('sort_oldest') : 'Cũ nhất');
        applyGameListFilters();
    });
}

document.addEventListener('keydown', (e) => {
    const activeTag = document.activeElement ? document.activeElement.tagName : '';
    if (activeTag === 'INPUT' || activeTag === 'SELECT' || activeTag === 'TEXTAREA') return;
    if (isBotGameActive) {
        if (e.key === 'Escape') exitBotGame();
        return;
    }
    if (!AppState.gamePositions || !AppState.gamePositions.length) return;
    if (e.key === 'ArrowLeft') { e.preventDefault(); handlePrevMove(); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); handleNextMove(); }
    else if (e.key === 'Home') { e.preventDefault(); handleStartMove(); }
    else if (e.key === 'End') { e.preventDefault(); handleEndMove(); }
    else if (e.code === 'Space' || e.key === ' ') { e.preventDefault(); toggleAutoplay(); }
    else if (e.key === 'f' || e.key === 'F') { e.preventDefault(); if (btnFlip) btnFlip.click(); }
});

let resizeTimer = null;
function handleResponsiveResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (board && typeof board.resize === 'function') {
            board.resize();
            if (typeof redrawArrows === 'function' && typeof board.orientation === 'function') {
                redrawArrows(board.orientation());
            }
            if (typeof isBotGameActive !== 'undefined' && isBotGameActive && botGameChess && botGameChess.in_check() && typeof highlightCheckSquare === 'function') {
                highlightCheckSquare(botGameChess.turn());
            }
        }
    }, 60);
}

window.addEventListener('resize', handleResponsiveResize);
window.addEventListener('orientationchange', () => {
    setTimeout(handleResponsiveResize, 150);
});

// Quan sát tự động thay đổi kích thước của .board-wrapper (khi xoay màn hình hoặc co giãn layout)
if (typeof ResizeObserver !== 'undefined') {
    const boardWrapperEl = document.querySelector('.board-wrapper');
    if (boardWrapperEl) {
        let roTimer = null;
        const ro = new ResizeObserver(() => {
            clearTimeout(roTimer);
            roTimer = setTimeout(handleResponsiveResize, 40);
        });
        ro.observe(boardWrapperEl);
    }
}
btnFetch.addEventListener('click', handleFetchGames);
if (btnStartBatch) btnStartBatch.addEventListener('click', startBatchAnalysis);
if (btnStopBatch) btnStopBatch.addEventListener('click', stopBatchAnalysis);

if (btnReanalyze) {
    btnReanalyze.addEventListener('click', async () => {
        if (AppState.selectedGameIndex === null || !AppState.loadedGames[AppState.selectedGameIndex]) return;
        const game = AppState.loadedGames[AppState.selectedGameIndex];
        if (typeof deleteGameAnalysisCache === 'function') await deleteGameAnalysisCache(game.url, currentDepth);
        analyzedGameUrls.delete(game.url); applyGameListFilters();
        if (cacheStatusBadge) cacheStatusBadge.classList.add('hidden'); btnReanalyze.classList.add('hidden');
        stopAutoplay(); AppState.gamePositions = buildPositionsFromPGN(game.pgn);
        renderMoveList(); drawEvalChart(); renderKeyMovesList(); goToMove(0);
        analyzeCurrentGame(game, 0);
    });
}

if (btnPauseAnalysis) btnPauseAnalysis.addEventListener('click', () => { if (isAnalysisPaused) resumeAnalysis(); else pauseAnalysis(); });

if (toggleLiveEngine) toggleLiveEngine.addEventListener('change', () => { isLiveEngineEnabled = toggleLiveEngine.checked; if (isLiveEngineEnabled) triggerLiveAnalysis(getCurrentBoardFen()); else { stockfishEngine.stop(); updateLiveEngineUIOff(); } });
if (selectLiveDepth) selectLiveDepth.addEventListener('change', () => { currentLiveDepth = parseInt(selectLiveDepth.value, 10); if (isLiveEngineEnabled) triggerLiveAnalysis(getCurrentBoardFen()); });

if (btnClearAllCache) {
    btnClearAllCache.addEventListener('click', async () => {
        if (!confirm('Bạn có chắc chắn muốn xóa toàn bộ dữ liệu phân tích đã lưu trong bộ nhớ không?')) return;
        if (typeof clearAllAnalysisCache === 'function') await clearAllAnalysisCache();
        analyzedGameUrls.clear(); applyGameListFilters();
        if (cacheStatusBadge) cacheStatusBadge.classList.add('hidden'); if (btnReanalyze) btnReanalyze.classList.add('hidden');
        showStatus(t('clear_cache_success'), 'info');
    });
}

if (btnOpenDrawer) {
    btnOpenDrawer.addEventListener('click', () => {
        const isOpen = gameDrawer && gameDrawer.classList.contains('open');
        setDrawerOpen(!isOpen);
    });
}
if (btnCloseDrawer) btnCloseDrawer.addEventListener('click', closeGameDrawer);
if (scrim) {
    scrim.addEventListener('click', closeGameDrawer);
    scrim.addEventListener('touchstart', (e) => {
        e.preventDefault();
        closeGameDrawer();
    }, { passive: false });
}

// Cử chỉ vuốt sang trái (Swipe-to-close) trên Drawer danh sách ván cờ trên thiết bị di động
if (gameDrawer) {
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;

    gameDrawer.addEventListener('touchstart', (e) => {
        if (e.touches && e.touches.length === 1) {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            touchStartTime = Date.now();
        }
    }, { passive: true });

    gameDrawer.addEventListener('touchend', (e) => {
        if (e.changedTouches && e.changedTouches.length === 1) {
            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;
            const dx = touchEndX - touchStartX;
            const dy = touchEndY - touchStartY;
            const dt = Date.now() - touchStartTime;

            // Vuốt sang trái tối thiểu 45px, ưu tiên trục hoành so với trục tung, thời gian vuốt < 600ms
            if (dx < -45 && Math.abs(dx) > Math.abs(dy) * 1.2 && dt < 600) {
                closeGameDrawer();
            }
        }
    }, { passive: true });
}

document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && gameDrawer && gameDrawer.classList.contains('open')) closeGameDrawer(); });

const tabButtons = document.querySelectorAll('.tabs button[data-tab]');
if (tabButtons.length > 0) {
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-tab'); tabButtons.forEach(b => b.classList.toggle('on', b === btn));
            ['t-moves', 't-cls', 't-key', 't-engine'].forEach(paneId => { const pane = document.getElementById(paneId); if (pane) pane.style.display = (paneId === targetId) ? '' : 'none'; });
        });
    });
}

function initDelegatedEventListeners() {
    if (typeof document === 'undefined') return;

    if (moveListContainer && !moveListContainer._delegated && !moveListContainer.dataset?.delegated) {
        moveListContainer._delegated = true;
        if (moveListContainer.dataset) moveListContainer.dataset.delegated = 'true';
        moveListContainer.addEventListener('click', (e) => {
            if (!e || !e.target) return;
            const cell = e.target.closest?.('.move-cell');
            if (cell && cell.dataset?.moveIndex !== undefined) {
                stopAutoplay();
                const idx = Number(cell.dataset.moveIndex);
                if (!isNaN(idx)) goToMove(idx);
                return;
            }
            const trialCell = e.target.closest?.('.trial-move-cell');
            if (trialCell && trialCell.dataset?.branchIndex !== undefined) {
                stopAutoplay();
                if (AppState.trialBranch) {
                    AppState.trialBranch.isViewingBranch = true;
                    AppState.trialBranch.currentIndex = Number(trialCell.dataset.branchIndex);
                    updateBoardToTrialCurrent();
                }
                return;
            }
            const btnExitTrial = e.target.closest?.('.btn-exit-trial');
            if (btnExitTrial) {
                stopAutoplay();
                exitTrialBranch();
                return;
            }
        });
    }

    if (keyMovesList && !keyMovesList._delegated && !keyMovesList.dataset?.delegated) {
        keyMovesList._delegated = true;
        if (keyMovesList.dataset) keyMovesList.dataset.delegated = 'true';
        keyMovesList.addEventListener('click', (e) => {
            if (!e || !e.target) return;
            const item = e.target.closest?.('.key-move-item');
            if (item && item.dataset?.index !== undefined) {
                stopAutoplay();
                const idx = Number(item.dataset.index);
                if (!isNaN(idx)) goToMove(idx);
            }
        });
    }

    if (gameListContainer && !gameListContainer._delegated && !gameListContainer.dataset?.delegated) {
        gameListContainer._delegated = true;
        if (gameListContainer.dataset) gameListContainer.dataset.delegated = 'true';
        gameListContainer.addEventListener('click', (e) => {
            if (!e || !e.target) return;
            const item = e.target.closest?.('.game-item');
            if (item && item.dataset?.index !== undefined) {
                const idx = Number(item.dataset.index);
                if (!isNaN(idx) && AppState.loadedGames[idx]) {
                    selectGame(AppState.loadedGames[idx]);
                }
            }
        });
    }
}

function bootApplication() {
    initCustomizationControls();
    initDefaultDate();
    initDelegatedEventListeners();
    handleFetchGames();
}

if (typeof document !== 'undefined') {
    initDelegatedEventListeners();
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', bootApplication);
    } else {
        bootApplication();
    }
}

if (typeof window !== 'undefined') {
    window.initDelegatedEventListeners = initDelegatedEventListeners;
    window.renderMoveList = renderMoveList;
    window.renderKeyMovesList = renderKeyMovesList;
    window.renderGameList = renderGameList;
    window.applyReviewDepth = applyReviewDepth;
    window.syncSettingsToUnifiedStorage = syncSettingsToUnifiedStorage;
    window.readStoredSetting = readStoredSetting;
    window.initCustomizationControls = initCustomizationControls;
    window.openSettingsModal = openSettingsModal;
    window.closeSettingsModal = closeSettingsModal;
    window.openCustomImportModal = openCustomImportModal;
    window.closeCustomImportModal = closeCustomImportModal;
    window.handleCustomImportSubmit = handleCustomImportSubmit;
    window.openPersonalPuzzlesModal = openPersonalPuzzlesModal;
    window.closePersonalPuzzlesModal = closePersonalPuzzlesModal;
    window.updatePersonalPuzzlesBadge = updatePersonalPuzzlesBadge;
    window.applyAppTheme = applyAppTheme;
    window.applyBoardTheme = applyBoardTheme;
    window.applyPieceTheme = applyPieceTheme;
    window.applyAnimationSpeed = applyAnimationSpeed;
    window.applyMoveTime = applyMoveTime;
    window.handleDrop = handleDrop;
    window.handleSnapEnd = handleSnapEnd;
    window.handlePlayerMove = handlePlayerMove;
    window.goToMove = goToMove;
    window.initChessboard = initChessboard;
    window.initTrialBranch = initTrialBranch;
    window.updateBoardToTrialCurrent = updateBoardToTrialCurrent;
    window.buildPositionsFromPGN = buildPositionsFromPGN;
    window.findKingsFromFen = findKingsFromFen;
    window.renderKingResultBadges = renderKingResultBadges;
    window.clearKingResultBadges = clearKingResultBadges;
    window.showGameOverBanner = showGameOverBanner;
    window.hideGameOverBanner = hideGameOverBanner;
    window.formatGameOverReason = formatGameOverReason;
    window.checkAndRenderGameOverReviewState = checkAndRenderGameOverReviewState;
    window.applyCachedAnalysis = applyCachedAnalysis;
    window.isMoveMatchingPuzzleBest = isMoveMatchingPuzzleBest;
    window.triggerLiveAnalysis = triggerLiveAnalysis;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        AppState,
        applyCachedAnalysis,
        isMoveMatchingPuzzleBest,
        triggerLiveAnalysis,
        initDelegatedEventListeners,
        renderMoveList,
        renderKeyMovesList,
        renderGameList,
        applyReviewDepth,
        syncSettingsToUnifiedStorage,
        readStoredSetting,
        initCustomizationControls,
        openSettingsModal,
        closeSettingsModal,
        openCustomImportModal,
        closeCustomImportModal,
        handleCustomImportSubmit,
        openPersonalPuzzlesModal,
        closePersonalPuzzlesModal,
        updatePersonalPuzzlesBadge,
        applyAppTheme,
        applyBoardTheme,
        applyPieceTheme,
        applyAnimationSpeed,
        applyMoveTime,
        handleDrop,
        handleSnapEnd,
        handlePlayerMove,
        goToMove,
        initChessboard,
        initTrialBranch,
        updateBoardToTrialCurrent,
        buildPositionsFromPGN,
        findKingsFromFen,
        renderKingResultBadges,
        clearKingResultBadges,
        showGameOverBanner,
        hideGameOverBanner,
        formatGameOverReason,
        checkAndRenderGameOverReviewState
    };
}