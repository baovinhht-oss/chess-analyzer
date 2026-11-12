/**
 * FILE: app.js
 * ĐÃ FIX LỖI SO SÁNH NƯỚC ĐI VÀ LỖI ĐÁNH GIÁ CHÉO.
 */

// Fallback an toàn nếu config.js bị thiếu hoặc load thất bại
if (typeof window !== 'undefined') {
    window.CHESSCOM_USERNAME = window.CHESSCOM_USERNAME || (typeof CHESSCOM_USERNAME !== 'undefined' ? CHESSCOM_USERNAME : 'bazu25022005');
}

const CATEGORY_ARROW_COLORS = {
    Brilliant: '#1baca6', Great: '#5c8bb0', Book: '#a88865', Best: '#81b64c',
    Excellent: '#96bc4b', Good: '#96af8b', Inaccuracy: '#f7c631', Mistake: '#e58f2a',
    Miss: '#ff7769', Blunder: '#ca3431'
};

const CATEGORY_ICONS = {
    Brilliant: '<svg viewBox="0 0 24 24"><text x="50%" y="54%" font-family="Arial, sans-serif" font-weight="900" font-size="20" text-anchor="middle" dominant-baseline="middle" letter-spacing="-1.5" fill="currentColor">!!</text></svg>',
    Great: '<svg viewBox="0 0 24 24"><text x="50%" y="54%" font-family="Arial, sans-serif" font-weight="900" font-size="20" text-anchor="middle" dominant-baseline="middle" fill="currentColor">!</text></svg>',
    Book: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.5 4c-1.8 0-3.5.4-5 1.2V21c1.5-.7 3.2-1.1 5-1.1 1.7 0 3.4.4 4.8 1.1l.7.4.7-.4c1.4-.7 3.1-1.1 4.8-1.1 1.8 0 3.5.4 5 1.1V5.2C21 4.4 19.3 4 17.5 4c-1.8 0-3.6.4-5.2 1.3C10.7 4.4 8.6 4 6.5 4z"/></svg>',
    Best: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',
    Excellent: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 20h4V9H2v11zm19.03-9.53a2.98 2.98 0 0 0-2.88-2.47h-6.19l.93-4.48c.03-.13.04-.26.04-.4 0-.6-.24-1.15-.64-1.55L11.23 0 4.62 6.62c-.39.39-.62.94-.62 1.54V18c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/></svg>',
    Good: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>',
    Inaccuracy: '<svg viewBox="0 0 24 24"><text x="50%" y="54%" font-family="Arial, sans-serif" font-weight="900" font-size="18" text-anchor="middle" dominant-baseline="middle" letter-spacing="-1" fill="currentColor">?!</text></svg>',
    Mistake: '<svg viewBox="0 0 24 24"><text x="50%" y="54%" font-family="Arial, sans-serif" font-weight="900" font-size="20" text-anchor="middle" dominant-baseline="middle" fill="currentColor">?</text></svg>',
    Miss: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>',
    Blunder: '<svg viewBox="0 0 24 24"><text x="50%" y="54%" font-family="Arial, sans-serif" font-weight="900" font-size="18" text-anchor="middle" dominant-baseline="middle" letter-spacing="-1.5" fill="currentColor">??</text></svg>'
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
        bot_branch_tag: '🤖 Nhánh đấu với Bot',
        bot_eval_feedback: 'Nước đi của bạn: {0}',
        bot_mode_title: 'Đang đấu với Bot (Stockfish)',
        bot_your_turn: 'Tới lượt bạn đi quân ({0})',
        bot_thinking: '🤖 Bot đang suy nghĩ...',
        bot_in_check: '⚠️ Bạn đang bị chiếu! Hãy đi quân ({0})...',
        bot_win_checkmate: '🏆 Chiếu hết! Bạn đã chiến thắng Bot!',
        bot_loss_checkmate: 'Chiếu hết! Bot đã chiến thắng.',
        bot_draw_stalemate: 'Hòa cờ do hết nước đi hợp lệ (Stalemate)!',
        bot_draw_repetition: 'Hòa cờ do lặp lại thế cờ 3 lần!',
        bot_draw_material: 'Hòa cờ do không đủ quân chiếu hết!',
        bot_draw_50moves: 'Hòa cờ theo luật 50 nước!',
        bot_draw_generic: 'Hòa cờ!',
        bot_moves_count: '{0} nước',
        bot_check_user: 'Bạn đang bị chiếu tướng!',
        bot_check_bot: 'Bot đang bị chiếu tướng!',
        live_engine_analyzing: 'Đang phân tích',
        live_engine_done: 'Hoàn tất',

        // Batch Analysis
        batch_start: '▶ Chạy phân tích nền',
        batch_stop: '⏸ Dừng lại',
        batch_running: 'Đang phân tích ván {0} / {1}...',
        batch_paused: 'Đã tạm dừng phân tích nền.',
        batch_done: 'Đã hoàn tất phân tích toàn bộ tháng!',
        batch_no_games: 'Chưa có danh sách ván cờ.'
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
        bot_branch_tag: '🤖 Bot Match Branch',
        bot_eval_feedback: 'Your move: {0}',
        bot_mode_title: 'Playing against Bot (Stockfish)',
        bot_your_turn: 'Your turn ({0})',
        bot_thinking: '🤖 Bot is thinking...',
        bot_in_check: '⚠️ You are in check! Make your move ({0})...',
        bot_win_checkmate: '🏆 Checkmate! You defeated the Bot!',
        bot_loss_checkmate: 'Checkmate! Bot won the game.',
        bot_draw_stalemate: 'Draw by Stalemate!',
        bot_draw_repetition: 'Draw by Threefold Repetition!',
        bot_draw_material: 'Draw by Insufficient Material!',
        bot_draw_50moves: 'Draw by 50-move rule!',
        bot_draw_generic: 'Draw!',
        bot_moves_count: '{0} moves',
        bot_check_user: 'You are in check!',
        bot_check_bot: 'Bot is in check!',
        live_engine_analyzing: 'Analyzing',
        live_engine_done: 'Done',

        // Batch Analysis
        batch_start: '▶ Start Batch Analysis',
        batch_stop: '⏸ Stop',
        batch_running: 'Analyzing game {0} / {1}...',
        batch_paused: 'Batch analysis paused.',
        batch_done: 'All monthly games analyzed!',
        batch_no_games: 'No games to analyze.'
    }
};

let currentLang = 'vi';
try {
    const savedLang = localStorage.getItem('chess_lang');
    if (savedLang === 'vi' || savedLang === 'en') {
        currentLang = savedLang;
    }
} catch (e) {}

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
    } catch (e) {}

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

    updateThemeButtonText();

    if (typeof loadedGames !== 'undefined' && selectedGameIndex !== null && loadedGames[selectedGameIndex]) {
        const g = loadedGames[selectedGameIndex];
        if (currentStats) {
            renderStatsTable(currentStats, g);
        }
        const gamePlayersInfo = document.getElementById('game-players-info');
        if (gamePlayersInfo) {
            const whitePlayer = g.userColor === 'w' ? `${g.userUsername} (${g.userRating})` : `${g.opponentUsername} (${g.opponentRating})`;
            const blackPlayer = g.userColor === 'b' ? `${g.userUsername} (${g.userRating})` : `${g.opponentUsername} (${g.opponentRating})`;
            const whiteLabel = currentLang === 'en' ? 'White' : 'Trắng';
            const blackLabel = currentLang === 'en' ? 'Black' : 'Đen';
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
    if (typeof renderWelcomeDashboard === 'function' && typeof loadedGames !== 'undefined' && loadedGames && loadedGames.length) {
        renderWelcomeDashboard(loadedGames);
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
 * @returns {number} Elo hiệu suất ước tính
 */
function calculatePerformanceRating(accuracy, mistakes = 0, blunders = 0, opponentRating = 1000) {
    const oppElo = Math.max(100, Number(opponentRating) || 1000);
    const acc = Math.max(0, Math.min(100, Number(accuracy) || 0));

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
let loadedGames = [];
if (typeof window !== 'undefined') {
    window.getLoadedGames = () => loadedGames;
}
let selectedGameIndex = null;

/**
 * Xác định màu quân của người dùng (Trắng hay Đen) cho ván cờ hiện tại hoặc ván cờ được truyền vào
 * @param {Object} [game] - Đối tượng game, mặc định là loadedGames[selectedGameIndex]
 * @returns {'w'|'b'} 'w' nếu Trắng, 'b' nếu Đen
 */
function getCurrentUserColor(game = (selectedGameIndex !== null && loadedGames ? loadedGames[selectedGameIndex] : null)) {
    if (!game) return 'w';
    if (game.userColor) return game.userColor;
    const defaultUser = (typeof CHESSCOM_USERNAME !== 'undefined' ? CHESSCOM_USERNAME : 'bazu25022005').toLowerCase();
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

function isCurrentUserWhite(game = (selectedGameIndex !== null && loadedGames ? loadedGames[selectedGameIndex] : null)) {
    return getCurrentUserColor(game) === 'w';
}

if (typeof window !== 'undefined') {
    window.getCurrentUserColor = getCurrentUserColor;
    window.isCurrentUserWhite = isCurrentUserWhite;
}
let board = null;
let gamePositions = [];
let currentMoveIndex = 0;
let analysisSessionId = 0;
let isShowingBestMove = true;
let isShowingExplain = false;
let isShowingHints = false;
let currentHintsData = [];
let trialBranch = null;
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
let isAnalysisPaused = false;
let isAnalyzing = false;
let lastCompletedIndex = 0;
let analysisTimerInterval = null;
let elapsedSeconds = 0;
let isLiveEngineEnabled = true;
let currentLiveDepth = 15;
let liveAnalysisSessionId = 0;
let isBatchAnalyzing = false;
let currentBatchIndex = 0;

const btnStartBatch = document.getElementById('btn-start-batch');
const btnStopBatch = document.getElementById('btn-stop-batch');
const batchProgressText = document.getElementById('batch-progress-text');

const headerUsername = document.getElementById('header-username');
if (headerUsername && typeof CHESSCOM_USERNAME !== 'undefined') headerUsername.textContent = CHESSCOM_USERNAME;
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
    if (btnOpenDrawer) btnOpenDrawer.setAttribute('aria-expanded', String(isOpen));
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
        showStatus('Không thể xem tháng trong tương lai.', 'info');
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
    function getAudioContext() {
        if (!audioCtx) {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            if (AudioContextClass) audioCtx = new AudioContextClass();
        }
        if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume().catch(() => { });
        return audioCtx;
    }
    return {
        playMove: function () {
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

const BOARD_THEMES = { green: 'Xanh lá', wood: 'Gỗ', walnut: 'Gỗ óc chó', dark: 'Than tối', ocean: 'Biển xanh', marble: 'Cẩm thạch', glass: 'Kính mờ', neon: 'Neon', minimalist: 'Tối giản', parchment: 'Giấy cổ', ice: 'Băng tuyết' };
let currentBoardTheme = 'green';
let currentPieceTheme = 'classic';
try { currentBoardTheme = localStorage.getItem('chess_board_theme') || 'green'; currentPieceTheme = localStorage.getItem('chess_piece_theme') || 'classic'; } catch (e) { }

const LICHESS_PIECE_THEMES = new Set(['cburnett', 'merida', 'california', 'cardinal', 'dubrovny']);

function getPieceThemeUrl(pieceCode) {
    if (!pieceCode) return '';
    if (currentPieceTheme === 'classic') {
        return CUSTOM_SVG_PIECES[pieceCode] || '';
    }
    if (LICHESS_PIECE_THEMES.has(currentPieceTheme)) {
        const lichessPiece = pieceCode[0].toLowerCase() + pieceCode[1].toUpperCase();
        return `https://raw.githubusercontent.com/lichess-org/lila/master/public/piece/${currentPieceTheme}/${lichessPiece}.svg`;
    }
    // Chess.com CDN
    const codeLower = pieceCode.toLowerCase();
    return `https://images.chesscomfiles.com/chess-themes/pieces/${currentPieceTheme}/150/${codeLower}.png`;
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
    if (!boardEl || boardPieceObserver) return;
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
function applyBoardTheme(theme) {
    if (!BOARD_THEMES[theme]) theme = 'green';
    currentBoardTheme = theme;
    document.documentElement.setAttribute('data-board-theme', theme);
    try { localStorage.setItem('chess_board_theme', theme); } catch (e) { }
    const selectEl = document.getElementById('select-board-theme');
    if (selectEl && selectEl.value !== theme) selectEl.value = theme;
}
function applyPieceTheme(theme) {
    currentPieceTheme = theme;
    try { localStorage.setItem('chess_piece_theme', theme); } catch (e) { }
    const selectEl = document.getElementById('select-piece-theme');
    if (selectEl && selectEl.value !== theme) selectEl.value = theme;
    updateBoardPieceImages();
}
function initCustomizationControls() {
    applyLanguage(currentLang);
    applyBoardTheme(currentBoardTheme);
    applyPieceTheme(currentPieceTheme);
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
}

let lastBoardMouseDownButton = 0;
window.addEventListener('mousedown', (e) => { lastBoardMouseDownButton = e.button; }, true);

function clearBoardEvaluationBadge() {
    const boardEl = document.getElementById('board');
    if (!boardEl) return;
    boardEl.querySelectorAll('.board-eval-badge, .brilliant-ripple').forEach(el => el.remove());
}
function renderBoardMoveEvaluationBadge(square, category, isBrilliant = false) {
    clearBoardEvaluationBadge();
    if (!square) return;
    const boardEl = document.getElementById('board'); if (!boardEl) return;
    const squareEl = boardEl.querySelector(`.square-${square}`); if (!squareEl) return;
    const effectiveCat = isBrilliant ? 'Brilliant' : (category || 'Best');
    const symbol = EVAL_BADGE_SYMBOLS[effectiveCat] || SVG_ICONS.Best;
    const textSym = CATEGORY_TEXT_SYMBOLS[effectiveCat] || '★';
    const catName = typeof getCategoryName === 'function' ? getCategoryName(effectiveCat, currentLang) : effectiveCat;
    const badge = document.createElement('div');
    badge.className = `board-eval-badge badge-${effectiveCat.toLowerCase()}`;
    badge.title = `${catName} (${textSym})`;
    badge.innerHTML = symbol;
    squareEl.appendChild(badge);

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
        moveSpeed: 280, snapbackSpeed: 70, snapSpeed: 70,
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
    if (!chess.load_pgn(pgn)) throw new Error('Không thể đọc được biên bản PGN của ván cờ này.');
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
    return trialBranch !== null && trialBranch.isViewingBranch === true && Array.isArray(trialBranch.positions) && trialBranch.positions.length > 0 && typeof trialBranch.currentIndex === 'number' && trialBranch.currentIndex >= 0 && trialBranch.currentIndex < trialBranch.positions.length;
}

function getCurrentBoardFen() {
    if (isBotGameActive && botGameChess) {
        return botGameChess.fen();
    }
    if (isInTrialBranch()) {
        const tPos = trialBranch.positions[trialBranch.currentIndex];
        if (tPos && tPos.fen) return tPos.fen;
    }
    if (gamePositions && gamePositions[currentMoveIndex]) return gamePositions[currentMoveIndex].fen;
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
                handlePlayerMove(source, target, piece);
            }
        });
    });
    if (btnCancelPromotion) {
        btnCancelPromotion.addEventListener('click', () => {
            hidePromotionModal();
            if (board) board.position(getCurrentBoardFen());
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

function handleDrop(source, target) {
    clearSquareMoveHighlights();
    if (source === target) return 'snapback';
    const currentFen = getCurrentBoardFen(); const chess = new Chess(currentFen); const turn = chess.turn();
    const piece = chess.get(source); const isPawn = piece && piece.type === 'p';
    const isPromotion = isPawn && ((turn === 'w' && source[1] === '7' && target[1] === '8') || (turn === 'b' && source[1] === '2' && target[1] === '1'));
    if (isPromotion) {
        const testMove = chess.move({ from: source, to: target, promotion: 'q' });
        if (!testMove) { SoundManager.playIllegal(); return 'snapback'; }
        showPromotionModal(source, target, turn);
        return 'snapback';
    }
    const moveRes = chess.move({ from: source, to: target });
    if (!moveRes) { SoundManager.playIllegal(); return 'snapback'; }
    setTimeout(() => { handlePlayerMove(source, target); }, 10);
}

function handleSnapEnd() { clearSquareMoveHighlights(); if (board) board.position(getCurrentBoardFen(), false); }

function handlePlayerMove(source, target, promotion = 'q') {
    stopAutoplay();
    if (isBotGameActive) {
        if (!botGameChess || botGameChess.game_over()) return false;
        const isUserTurn = (botGameChess.turn() === botPlayerColor);
        if (isUserTurn && botThinking) return false;

        const prevFen = botGameChess.fen();
        const moveRes = botGameChess.move({ from: source, to: target, promotion: promotion });
        if (!moveRes) return false;

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

        board.position(botGameChess.fen(), true);
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

    if (!isInTrialBranch()) {
        const nextOriginalPos = gamePositions[currentMoveIndex + 1];

        // CẬP NHẬT LOGIC: Xử lý vụ mặc định promotion='q' gây lỗi nhảy nhầm sang Nhánh thử
        const isSameMove = nextOriginalPos && nextOriginalPos.move &&
            nextOriginalPos.move.from === source &&
            nextOriginalPos.move.to === target &&
            (nextOriginalPos.move.promotion || 'q') === (moveRes.promotion || 'q');

        if (isSameMove) {
            goToMove(currentMoveIndex + 1);
            return true;
        }
        initTrialBranch(currentMoveIndex, moveRes, chess.fen());
    } else {
        appendMoveToTrialBranch(moveRes, chess.fen());
    }
    return true;
}

function initTrialBranch(baseIndex, moveRes, newFen) {
    const chess = new Chess(newFen);
    const uci = `${moveRes.from}${moveRes.to}${moveRes.promotion || ''}`;
    const nextOrigPos = gamePositions[baseIndex + 1];
    let inheritedEval = null;
    let inheritedCls = null;
    if (nextOrigPos && nextOrigPos.fen === newFen && nextOrigPos.eval) {
        inheritedEval = { ...nextOrigPos.eval };
        inheritedCls = nextOrigPos.classification ? { ...nextOrigPos.classification } : null;
    }

    trialBranch = {
        baseMoveIndex: baseIndex, baseFen: gamePositions[baseIndex].fen,
        positions: [{
            fen: newFen, turn: chess.turn(), eval: inheritedEval, classification: inheritedCls,
            move: { from: moveRes.from, to: moveRes.to, san: moveRes.san, color: moveRes.color, piece: moveRes.piece, captured: moveRes.captured || null, promotion: moveRes.promotion || null, uci: uci }
        }],
        currentIndex: 0, isViewingBranch: true
    };
    updateBoardToTrialCurrent();
    renderMoveList();
}

function appendMoveToTrialBranch(moveRes, newFen) {
    if (!trialBranch) return;
    if (trialBranch.currentIndex < trialBranch.positions.length - 1) trialBranch.positions = trialBranch.positions.slice(0, trialBranch.currentIndex + 1);
    const chess = new Chess(newFen);
    const uci = `${moveRes.from}${moveRes.to}${moveRes.promotion || ''}`;
    trialBranch.positions.push({
        fen: newFen, turn: chess.turn(), eval: null, classification: null,
        move: { from: moveRes.from, to: moveRes.to, san: moveRes.san, color: moveRes.color, piece: moveRes.piece, captured: moveRes.captured || null, promotion: moveRes.promotion || null, uci: uci }
    });
    trialBranch.currentIndex = trialBranch.positions.length - 1; trialBranch.isViewingBranch = true;
    updateBoardToTrialCurrent(); renderMoveList();
}

function exitTrialBranch() {
    if (!trialBranch) return;
    const returnIndex = trialBranch.baseMoveIndex;
    trialBranch = null;
    if (btnCoachExitTrial) btnCoachExitTrial.classList.add('hidden');
    renderMoveList(); goToMove(returnIndex);
}

function updateBoardToTrialCurrent() {
    if (!isInTrialBranch()) return;
    const pos = trialBranch.positions[trialBranch.currentIndex];
    board.position(pos.fen, true);
    if (pos && pos.move) {
        if (pos.move.captured || (pos.move.san && pos.move.san.includes('x'))) SoundManager.playCapture(); else SoundManager.playMove();
    }
    clearBoardHighlightsAndArrows();
    if (pos.move) highlightActualMove(pos.move);

    const curBranchMove = trialBranch.currentIndex + 1; const totalBranchMoves = trialBranch.positions.length;
    moveCounterSpan.textContent = `Thử: ${curBranchMove}/${totalBranchMoves} (từ nước ${trialBranch.baseMoveIndex})`;

    btnStart.disabled = false; btnPrev.disabled = false; btnNext.disabled = (trialBranch.currentIndex === totalBranchMoves - 1);
    btnEnd.disabled = (trialBranch.currentIndex === totalBranchMoves - 1); if (btnPlay) btnPlay.disabled = true;

    updateMoveListActiveForTrial();
    updatePlayersDisplay();
    updateCoachPanelForTrial();

    const bIdx = trialBranch.currentIndex;
    const trialPos = trialBranch.positions[bIdx];

    if (!trialPos.eval) {
        evaluateAndClassifyPosition(trialPos, true, true).catch(err => {
            if (err && err.message !== 'ENGINE_STOPPED' && err.message !== 'ENGINE_INTERRUPTED') console.error(err);
        });
    }
}

function updateCoachPanelForTrial() {
    if (!isInTrialBranch()) return;
    const pos = trialBranch.positions[trialBranch.currentIndex]; if (!pos) return;
    if (btnCoachExitTrial) btnCoachExitTrial.classList.remove('hidden');
    btnCoachExplain.disabled = true; btnPrevMistake.disabled = true; btnNextMistake.disabled = true;

    const selectedGame = (selectedGameIndex !== null && loadedGames) ? loadedGames[selectedGameIndex] : null;
    const userColor = getCurrentUserColor(selectedGame);
    const isUserWhite = (userColor === 'w');

    const evalPerspectiveEl = document.getElementById('coach-eval-perspective');
    if (evalPerspectiveEl) {
        evalPerspectiveEl.setAttribute('data-i18n', isUserWhite ? 'white_perspective' : 'black_perspective');
        evalPerspectiveEl.textContent = isUserWhite ? t('white_perspective') : t('black_perspective');
    }
    const winProbLabelEl = document.getElementById('win-prob-label');
    if (winProbLabelEl) {
        winProbLabelEl.setAttribute('data-i18n', isUserWhite ? 'win_prob_white' : 'win_prob_black');
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

        let lossDesc = '';
        if (pos.classification.winLoss !== undefined && pos.classification.winLoss > 0.5) lossDesc = t('trial_win_loss', pos.classification.winLoss.toFixed(1).replace('.', ','));
        coachCommentText.textContent = `${pos.move.san}: ${effectiveLabel} ${isBrill ? '!!' : (CATEGORY_TEXT_SYMBOLS[effectiveCategory] || '')}${lossDesc}`;
        coachPosDesc.textContent = t('trial_pos_desc', trialBranch.baseMoveIndex);

        if (coachMoveTitle) {
            const dotClass = isBrill ? 'dot dot-brilliant' : 'dot';
            const iconHtml = isBrill
                ? `<span class="${dotClass}"></span><span class="move-title-san">${pos.move.san}</span> <span style="color:var(--brill);font-weight:800;">!!</span> <span class="chip">${effectiveLabel} · ${t('trial_move')}</span>`
                : `<span class="dot" style="background:var(--${effectiveVarName});"></span><span class="move-title-san">${pos.move.san}</span> <span class="chip">${effectiveLabel} · ${t('trial_move')}</span>`;
            coachMoveTitle.innerHTML = iconHtml;
        }

        if (currentWinProb) currentWinProb.textContent = formatWinProbability(pos.eval, userColor);
        if (pos.eval) {
            coachEvalBadge.textContent = formatEvaluationBadge(pos.eval, userColor).replace('.', ',');
            const isUserAhead = isUserWhite ? ((pos.eval.cpWhite || 0) >= 0) : ((pos.eval.cpWhite || 0) <= 0);
            coachEvalBadge.className = `coach-eval-badge ${isUserAhead ? 'white-adv' : 'black-adv'}`;
        }

        const bIdx = trialBranch.currentIndex;
        const prevEval = (bIdx === 0) ? (gamePositions[trialBranch.baseMoveIndex] ? gamePositions[trialBranch.baseMoveIndex].eval : null) : (trialBranch.positions[bIdx - 1] ? trialBranch.positions[bIdx - 1].eval : null);
        const bestUci = prevEval ? prevEval.bestmove : null;
        let isTrialTerminal = false;
        if (typeof Chess === 'function' && pos && pos.fen) {
            const c = new Chess(pos.fen);
            isTrialTerminal = c.in_checkmate() || c.in_draw() || c.moves().length === 0;
        }
        if (bestUci && effectiveCategory !== 'Best' && !isBrill && !isTrialTerminal && bestUci !== '(none)') {
            const { bestSan } = convertPvToSanLine(getCurrentBoardFen(), [bestUci], 1, currentLang);
            btnCoachBest.classList.remove('hidden'); btnCoachBest.classList.toggle('active', isShowingBestMove);
            btnCoachBest.textContent = isShowingBestMove ? `⭐ ${t('btn_hide_best')} (${bestSan || bestUci})` : `⭐ ${t('btn_best_move')}`;
        } else { btnCoachBest.classList.add('hidden'); }
    } else {
        coachPanel.style.borderColor = '#f59e0b'; coachCommentText.style.color = '#b45309';
        coachCommentText.textContent = `${pos.move.san}: ${t('waiting_stockfish')}`;
        coachPosDesc.textContent = t('trial_pos_desc', trialBranch.baseMoveIndex);
        if (coachMoveTitle) coachMoveTitle.innerHTML = `<span class="dot" style="background:var(--warn);"></span><span class="move-title-san">${pos.move.san}</span> <span class="chip">${t('trial_move')} · ${t('analyzing')}</span>`;
        if (currentWinProb) currentWinProb.textContent = formatWinProbability(pos.eval, userColor);
        coachEvalBadge.textContent = '...'; coachEvalBadge.className = 'coach-eval-badge'; btnCoachBest.classList.add('hidden');
    }
}

function updateMoveListActiveForTrial() {
    if (!moveListContainer) return;
    moveListContainer.querySelectorAll('.move-cell.active').forEach(c => c.classList.remove('active'));
    const trialCells = moveListContainer.querySelectorAll('.trial-move-cell');
    let activeTrialCell = null;
    trialCells.forEach(cell => {
        const idx = Number(cell.dataset.branchIndex);
        if (isInTrialBranch() && idx === trialBranch.currentIndex) { cell.classList.add('active'); activeTrialCell = cell; }
        else { cell.classList.remove('active'); }
    });
    if (activeTrialCell) activeTrialCell.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
}

function buildTrialBranchRowElement() {
    const branchContainer = document.createElement('div');
    branchContainer.className = 'trial-branch-row';
    const header = document.createElement('div');
    header.className = 'trial-branch-header';
    header.innerHTML = `<span class="trial-branch-badge">${t('trial_move')} (${t('move_word')} ${trialBranch.baseMoveIndex})</span><button class="btn-exit-trial" title="${t('btn_exit_trial')}">${t('btn_exit_trial')}</button>`;
    const exitBtn = header.querySelector('.btn-exit-trial');
    if (exitBtn) exitBtn.addEventListener('click', (e) => { e.stopPropagation(); exitTrialBranch(); });
    branchContainer.appendChild(header);

    const movesWrap = document.createElement('div'); movesWrap.className = 'trial-branch-moves';
    trialBranch.positions.forEach((pos, bIdx) => {
        const moveNumber = Math.ceil((trialBranch.baseMoveIndex + 1 + bIdx) / 2);
        const isWhite = ((trialBranch.baseMoveIndex + 1 + bIdx) % 2) === 1;
        let prefix = ''; if (isWhite) prefix = `${moveNumber}. `; else if (bIdx === 0) prefix = `${moveNumber}... `;

        const cell = document.createElement('span'); cell.className = 'trial-move-cell'; cell.dataset.branchIndex = bIdx;
        let badgeHtml = '';
        if (pos.classification && pos.classification.info) {
            const isBrill = Boolean(pos.classification?.isBrilliant);
            const cat = isBrill ? 'Brilliant' : (pos.classification.category || 'Best');
            const symbol = EVAL_BADGE_SYMBOLS[cat] || SVG_ICONS.Best;
            const textSym = CATEGORY_TEXT_SYMBOLS[cat] || '★';
            const catClass = cat.toLowerCase();
            const catName = isBrill
                ? (currentLang === 'en' ? 'Brilliant !!' : 'Xuất thần !!')
                : (typeof getCategoryName === 'function' ? getCategoryName(cat, currentLang) : (pos.classification.info ? pos.classification.info.viName : cat));
            badgeHtml = ` <span class="move-class-badge badge-${catClass}" title="${catName} (${textSym})">${symbol}</span>`;
        }
        cell.innerHTML = `${prefix}${pos.move.san}${badgeHtml}`;
        if (isInTrialBranch() && trialBranch.currentIndex === bIdx) cell.classList.add('active');
        cell.addEventListener('click', () => { stopAutoplay(); trialBranch.isViewingBranch = true; trialBranch.currentIndex = bIdx; updateBoardToTrialCurrent(); });
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
function initClickToMove() {
    const boardEl = document.getElementById('board'); if (!boardEl) return;
    if (boardEl.dataset.clickMoveInitialized === 'true') return;
    boardEl.dataset.clickMoveInitialized = 'true';
    boardEl.addEventListener('click', (e) => {
        if (e.button !== 0) return;
        const squareEl = e.target.closest('.square-55d63');
        if (!squareEl) { selectedSquareForMove = null; clearSquareMoveHighlights(); return; }
        const match = squareEl.className.match(/square-([a-h][1-8])/); if (!match) return;
        const clickedSquare = match[1];
        if (isBotGameActive) {
            if (botThinking) return;
            if (!botGameChess || botGameChess.game_over()) return;
            if (botGameChess.turn() !== botPlayerColor) return;
        }
        const currentFen = getCurrentBoardFen(); const chess = new Chess(currentFen); const turn = chess.turn();

        if (!selectedSquareForMove) {
            const pieceOnSq = chess.get(clickedSquare);
            if (pieceOnSq && pieceOnSq.color === turn) { selectedSquareForMove = clickedSquare; highlightLegalMovesForSquare(clickedSquare, chess); }
            return;
        }
        if (clickedSquare === selectedSquareForMove) { selectedSquareForMove = null; clearSquareMoveHighlights(); return; }
        const pieceOnTarget = chess.get(clickedSquare);
        if (pieceOnTarget && pieceOnTarget.color === turn) { selectedSquareForMove = clickedSquare; highlightLegalMovesForSquare(clickedSquare, chess); return; }

        const source = selectedSquareForMove; const target = clickedSquare; selectedSquareForMove = null; clearSquareMoveHighlights();
        const piece = chess.get(source); const isPawn = piece && piece.type === 'p';
        const isPromotion = isPawn && ((turn === 'w' && source[1] === '7' && target[1] === '8') || (turn === 'b' && source[1] === '2' && target[1] === '1'));
        if (isPromotion) {
            if (chess.move({ from: source, to: target, promotion: 'q' })) showPromotionModal(source, target, turn);
            else SoundManager.playIllegal();
            return;
        }
        if (chess.move({ from: source, to: target })) handlePlayerMove(source, target);
        else SoundManager.playIllegal();
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
    const selectedGame = (selectedGameIndex !== null && loadedGames) ? loadedGames[selectedGameIndex] : null;
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
    goToMove(currentMoveIndex);
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
        if (botGameChess.in_checkmate()) {
            if (botGameChess.turn() === botPlayerColor) {
                statusEl.textContent = t('bot_loss_checkmate');
                statusEl.classList.add('checkmate-loss');
            } else {
                statusEl.textContent = t('bot_win_checkmate');
                statusEl.classList.add('checkmate');
            }
        } else if (botGameChess.in_stalemate()) {
            statusEl.textContent = t('bot_draw_stalemate');
            statusEl.classList.add('draw');
        } else if (botGameChess.in_threefold_repetition()) {
            statusEl.textContent = t('bot_draw_repetition');
            statusEl.classList.add('draw');
        } else if (botGameChess.insufficient_material()) {
            statusEl.textContent = t('bot_draw_material');
            statusEl.classList.add('draw');
        } else {
            statusEl.textContent = t('bot_draw_generic');
            statusEl.classList.add('draw');
        }
        return;
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
    isAnalyzing = true; // Khóa luồng phân tích phụ
    botThinking = true;
    updateBotGameUI();

    try {
        // 3. Cho Bot suy nghĩ ở độ sâu 10 (nhanh, đủ thông minh để chạy chiếu)
        const result = await stockfishEngine.evaluatePosition(currentFen, 10, null, true);
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
            handlePlayerMove(validMove.from, validMove.to, validMove.promotion);
        } else {
            console.error("Bot tạo nước đi lỗi:", moveObj);
            const legalMoves = tempChess.moves({ verbose: true });
            if (legalMoves.length > 0 && legalMoves[0].from && legalMoves[0].to) {
                const fb = legalMoves[0];
                handlePlayerMove(fb.from, fb.to, fb.promotion || 'q');
            }
        }

    } catch (error) {
        console.error("Lỗi khi Bot suy nghĩ:", error);
        try {
            const fallbackChess = new Chess(getCurrentBoardFen());
            const legalMoves = fallbackChess.moves({ verbose: true });
            if (legalMoves.length > 0 && legalMoves[0].from && legalMoves[0].to) {
                const fb = legalMoves[0];
                handlePlayerMove(fb.from, fb.to, fb.promotion || 'q');
            }
        } catch (fbErr) {
            console.error("Lỗi fallback Bot:", fbErr);
        }
    } finally {
        // 5. Trả lại trạng thái sau khi Bot đi xong
        botThinking = false;
        isLiveEngineEnabled = wasLiveEngineEnabled;
        isAnalyzing = false;
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
    if (!isBotGameActive || !botGameChess || isAnalyzing) return;
    if (evalSessionId !== undefined && evalSessionId !== botUserEvalSessionId) return;
    try {
        const evalBefore = await stockfishEngine.evaluatePosition(fenBefore, 10);
        if (!isBotGameActive || !botGameChess || isAnalyzing) return;
        if (evalSessionId !== undefined && evalSessionId !== botUserEvalSessionId) return;
        const evalAfter = await stockfishEngine.evaluatePosition(fenAfter, 10);
        if (!isBotGameActive || !botGameChess) return;
        if (evalSessionId !== undefined && evalSessionId !== botUserEvalSessionId) return;

        userPly.eval = evalAfter;
        const playedUci = `${moveRes.from}${moveRes.to}${moveRes.promotion || ''}`;
        const bestUci = evalBefore?.bestmove;

        const classification = evaluateMoveQuality(
            evalBefore, evalAfter, userPly.color, playedUci, bestUci
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
    const symbol = EVAL_BADGE_SYMBOLS[cat] || '★';
    const catName = typeof getCategoryName === 'function' ? getCategoryName(cat, currentLang) : cat;
    const color = CATEGORY_ARROW_COLORS[cat] || '#81b64c';
    feedbackEl.innerHTML = `
        <span class="move-class-badge badge-${cat.toLowerCase()}">${symbol}</span>
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
                const sym = EVAL_BADGE_SYMBOLS[cat] || '★';
                badgeHtml = `<span class="move-class-badge badge-${cat.toLowerCase()}" title="${cat}">${sym}</span>`;
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
        if (trialBranch.currentIndex > 0) { trialBranch.currentIndex--; updateBoardToTrialCurrent(); }
        else { trialBranch.isViewingBranch = false; trialBranch.currentIndex = null; goToMove(trialBranch.baseMoveIndex); }
        return;
    }
    if (currentMoveIndex > 0) goToMove(currentMoveIndex - 1);
}
function handleNextMove() {
    stopAutoplay();
    if (isInTrialBranch()) {
        if (trialBranch.currentIndex < trialBranch.positions.length - 1) { trialBranch.currentIndex++; updateBoardToTrialCurrent(); }
        return;
    }
    if (trialBranch && currentMoveIndex === trialBranch.baseMoveIndex && trialBranch.positions.length > 0) {
        trialBranch.isViewingBranch = true; trialBranch.currentIndex = 0; updateBoardToTrialCurrent(); return;
    }
    if (currentMoveIndex < gamePositions.length - 1) goToMove(currentMoveIndex + 1);
}
function handleStartMove() { stopAutoplay(); if (isInTrialBranch()) { trialBranch.isViewingBranch = false; trialBranch.currentIndex = null; goToMove(trialBranch.baseMoveIndex); return; } goToMove(0); }
function handleEndMove() { stopAutoplay(); if (isInTrialBranch()) { trialBranch.currentIndex = trialBranch.positions.length - 1; updateBoardToTrialCurrent(); return; } goToMove(gamePositions.length - 1); }

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
}
function highlightActualMove(moveObj) {
    if (!moveObj) return;
    const boardEl = document.getElementById('board'); if (!boardEl) return;
    const fromSq = boardEl.querySelector(`.square-${moveObj.from}`); const toSq = boardEl.querySelector(`.square-${moveObj.to}`);
    if (fromSq) fromSq.classList.add('highlight-last-move'); if (toSq) toSq.classList.add('highlight-last-move');
}

function drawBestMoveOnBoard(bestUci, categoryOverride, validationFen = null) {
    if (!bestUci || bestUci.length < 4 || bestUci === '(none)') return;
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
        // Nếu activeTurn === 'w' mà nước đi trong bestmove lại là của quân đen (hoặc ngược lại), ép engine phân tích lại FEN
        if (!piece || piece.color !== activeTurn) {
            console.warn(`[BestMoveArrow] Mũi tên ${bestUci} không khớp với lượt đi (${activeTurn}) của FEN (${currentFen}). Ép engine phân tích lại.`);
            if (typeof triggerLiveAnalysis === 'function') {
                triggerLiveAnalysis(currentFen, true);
            }
            return;
        }

        // 3. Kiểm tra tính hợp lệ của nước đi theo luật cờ vua
        const legalMoves = currentChess.moves({ verbose: true });
        const isLegal = legalMoves.some(m => m.from === fromSquare && m.to === toSquare);
        if (!isLegal) {
            console.warn(`[BestMoveArrow] Nước đi ${bestUci} không phải nước đi hợp lệ cho lượt hiện tại (${activeTurn}).`);
            if (typeof triggerLiveAnalysis === 'function') {
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
    clearArrows();
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
        const trialPos = trialBranch.positions[trialBranch.currentIndex];
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

    if (!gamePositions || !gamePositions.length) {
        clearBoardEvaluationBadge();
        return;
    }

    const currentPos = gamePositions[currentMoveIndex];
    if (!currentPos) {
        clearBoardEvaluationBadge();
        return;
    }

    // Hiển thị badge đánh giá nước đi vừa thực hiện trên ô đích
    if (currentMoveIndex > 0 && currentPos.move && currentPos.classification) {
        const isBrill = Boolean(currentPos.classification?.isBrilliant);
        const cat = isBrill ? 'Brilliant' : currentPos.classification.category;
        renderBoardMoveEvaluationBadge(currentPos.move.to, cat, isBrill);
    } else {
        clearBoardEvaluationBadge();
    }

    // Vẽ mũi tên gợi ý nước đi tốt nhất (Best Move) sửa sai cho người dùng:
    // Khi đang xem lại nước đi (currentMoveIndex > 0), phải lấy prevPos.eval.bestmove thay vì currentPos.eval.bestmove
    const prevPos = currentMoveIndex > 0 ? gamePositions[currentMoveIndex - 1] : null;
    const targetPos = (currentMoveIndex > 0 && prevPos) ? prevPos : currentPos;
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
    if (!gamePositions || !gamePositions.length) { setEvalBarDisplay(50, '', null); return; }
    const currentPos = gamePositions[currentMoveIndex];
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
        whiteWinPct = calculateWinPercentage(ev.cpWhite);
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
    if (!gamePositions || gamePositions.length === 0) { evalChartSvg.innerHTML = ''; return; }
    const totalPositions = gamePositions.length; const svgWidth = 600; const svgHeight = 100; const centerY = 50; const padY = 8; const effectiveHeight = svgHeight - 2 * padY;
    const points = [];
    for (let i = 0; i < totalPositions; i++) {
        const x = (totalPositions > 1) ? (i / (totalPositions - 1)) * svgWidth : (svgWidth / 2);
        const pos = gamePositions[i];
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
    const curIdx = Math.max(0, Math.min(points.length - 1, currentMoveIndex));
    const curPoint = points[curIdx] || { x: 0, y: centerY };
    evalChartSvg.innerHTML = `<defs><clipPath id="chart-clip-white"><rect x="0" y="0" width="${svgWidth}" height="${centerY}" /></clipPath><clipPath id="chart-clip-black"><rect x="0" y="${centerY}" width="${svgWidth}" height="${svgHeight - centerY}" /></clipPath></defs><rect x="0" y="0" width="${svgWidth}" height="${centerY}" fill="#64748b" /><rect x="0" y="${centerY}" width="${svgWidth}" height="${svgHeight - centerY}" fill="#475569" /><path d="${areaPolygonD}" fill="#ffffff" clip-path="url(#chart-clip-white)" /><path d="${areaPolygonD}" fill="#0f172a" clip-path="url(#chart-clip-black)" /><line x1="0" y1="${centerY}" x2="${svgWidth}" y2="${centerY}" stroke="#cbd5e1" stroke-width="1.2" stroke-dasharray="4,3" /><path d="${linePathD}" fill="none" stroke="#38bdf8" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" /><g id="chart-error-dots">${dotsHtml}</g><line id="chart-marker-line" x1="${curPoint.x}" y1="0" x2="${curPoint.x}" y2="${svgHeight}" stroke="#ffffff" stroke-width="1.8" stroke-dasharray="3,2" /><circle id="chart-marker-handle" cx="${curPoint.x}" cy="${curPoint.y}" r="5" fill="#0284c7" stroke="#ffffff" stroke-width="2" />`;
}

function updateEvalChartMarker(overrideIndex = null) {
    const markerLine = document.getElementById('chart-marker-line'); const markerHandle = document.getElementById('chart-marker-handle');
    if (!markerLine || !markerHandle || !gamePositions || !gamePositions.length) { drawEvalChart(); return; }
    const totalPositions = gamePositions.length; const svgWidth = 600; const svgHeight = 100; const padY = 8; const effectiveHeight = svgHeight - 2 * padY;
    const activeIndex = (overrideIndex !== null && typeof overrideIndex === 'number') ? overrideIndex : currentMoveIndex;
    const curIdx = Math.max(0, Math.min(totalPositions - 1, activeIndex));
    const curX = (totalPositions > 1) ? (curIdx / (totalPositions - 1)) * svgWidth : (svgWidth / 2);
    const pos = gamePositions[curIdx]; let winPct = 50;
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
    if (selectedGameIndex === null || !loadedGames[selectedGameIndex]) return;
    const game = loadedGames[selectedGameIndex];
    const currentOrientation = board ? board.orientation() : (game.userColor === 'w' ? 'white' : 'black');
    const whitePlayer = { name: game.userColor === 'w' ? game.userUsername : game.opponentUsername, rating: game.userColor === 'w' ? game.userRating : game.opponentRating, isUser: game.userColor === 'w', color: 'w', avatar: '♔' };
    const blackPlayer = { name: game.userColor === 'b' ? game.userUsername : game.opponentUsername, rating: game.userColor === 'b' ? game.userRating : game.opponentRating, isUser: game.userColor === 'b', color: 'b', avatar: '♚' };
    const topPlayer = (currentOrientation === 'white') ? blackPlayer : whitePlayer;
    const bottomPlayer = (currentOrientation === 'white') ? whitePlayer : blackPlayer;
    const currentFen = (typeof getCurrentBoardFen === 'function') ? getCurrentBoardFen() : ((gamePositions && gamePositions[currentMoveIndex]) ? gamePositions[currentMoveIndex].fen : game.pgn);
    const materialData = calculateMaterialAndCaptured(currentFen);

    if (playerTopAvatar) playerTopAvatar.textContent = topPlayer.avatar;
    if (playerTopName) playerTopName.textContent = topPlayer.name + (topPlayer.isUser ? ' (Bạn)' : '');
    if (playerTopRating) playerTopRating.textContent = `(${topPlayer.rating})`;
    const inTrial = (typeof isInTrialBranch === 'function') && isInTrialBranch();
    const currentPos = inTrial ? null : ((gamePositions && gamePositions[currentMoveIndex]) ? gamePositions[currentMoveIndex] : null);
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
    if (playerBottomName) playerBottomName.textContent = bottomPlayer.name + (bottomPlayer.isUser ? ' (Bạn)' : '');
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
    if (!gamePositions.length) return;
    if (btnCoachExitTrial) btnCoachExitTrial.classList.add('hidden');
    const currentPos = gamePositions[currentMoveIndex]; const prevPos = currentMoveIndex > 0 ? gamePositions[currentMoveIndex - 1] : null;
    updateNextMistakeButtonState();
    const selectedGame = (selectedGameIndex !== null) ? loadedGames[selectedGameIndex] : null;
    const userColor = getCurrentUserColor(selectedGame);
    const isUserWhite = (userColor === 'w');
    const isUserMove = Boolean(selectedGame && currentPos.move && currentPos.move.color === userColor);

    const evalPerspectiveEl = document.getElementById('coach-eval-perspective');
    if (evalPerspectiveEl) {
        evalPerspectiveEl.setAttribute('data-i18n', isUserWhite ? 'white_perspective' : 'black_perspective');
        evalPerspectiveEl.textContent = isUserWhite ? t('white_perspective') : t('black_perspective');
    }
    const winProbLabelEl = document.getElementById('win-prob-label');
    if (winProbLabelEl) {
        winProbLabelEl.setAttribute('data-i18n', isUserWhite ? 'win_prob_white' : 'win_prob_black');
        winProbLabelEl.textContent = isUserWhite ? t('win_prob_white') : t('win_prob_black');
    }

    if (currentMoveIndex === 0) {
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
        coachCommentText.textContent = `${currentPos.move.san}: ${t('waiting_stockfish')}`;
        coachPosDesc.textContent = t('calculating_eval'); coachEvalBadge.textContent = '...';
        if (coachMoveTitle) coachMoveTitle.innerHTML = `<span class="dot" style="background:var(--warn);"></span><span class="move-title-san">${currentPos.move.san}</span> <span class="chip">${t('analyzing')}</span>`;
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

    coachCommentText.textContent = getCoachCommentText(currentPos.move.san, cls.category, currentMoveIndex, isUserMove, currentLang);
    coachCommentText.style.color = effectiveColor; coachPanel.style.borderColor = effectiveColor;
    if (isBrilliant) coachPanel.classList.add('brilliant-move'); else coachPanel.classList.remove('brilliant-move');

    if (coachMoveTitle) {
        const moverLabel = isUserMove ? t('you_played') : t('opponent_played');
        const dotClass = isBrilliant ? 'dot dot-brilliant' : 'dot';
        const iconHtml = isBrilliant ? `<span class="${dotClass}"></span><span class="move-title-san">${currentPos.move.san}</span> <span style="color:var(--brill);font-weight:800;">!!</span> <span class="chip">${effectiveLabel} · ${moverLabel}</span>`
            : `<span class="dot" style="background:var(--${effectiveVarName});"></span><span class="move-title-san">${currentPos.move.san}</span> <span class="chip">${effectiveLabel} · ${moverLabel}</span>`;
        coachMoveTitle.innerHTML = iconHtml;
    }
    if (currentWinProb) currentWinProb.textContent = formatWinProbability(currentPos.eval, userColor);
    coachEvalBadge.textContent = formatEvaluationBadge(currentPos.eval, userColor).replace('.', ',');
    const isUserAhead = isUserWhite ? ((currentPos.eval.cpWhite || 0) >= 0) : ((currentPos.eval.cpWhite || 0) <= 0);
    coachEvalBadge.className = `coach-eval-badge ${isUserAhead ? 'white-adv' : 'black-adv'}`;
    coachPosDesc.textContent = getPositionDescriptionText(currentPos.eval, currentLang, userColor);

    const targetPos = (currentMoveIndex > 0 && prevPos) ? prevPos : currentPos;
    const targetFen = targetPos ? targetPos.fen : currentFen;
    let isTargetTerminal = false;
    if (typeof Chess === 'function' && targetFen) {
        const c = new Chess(targetFen);
        isTargetTerminal = c.in_checkmate() || c.in_draw() || c.moves().length === 0;
    }

    const bestUci = targetPos?.eval?.bestmove;
    if (!bestUci || isTargetTerminal || bestUci === '(none)') {
        btnCoachBest.classList.add('hidden');
        btnCoachBest.classList.remove('active');
    } else {
        const { bestSan } = convertPvToSanLine(targetFen, [bestUci], 1, currentLang);
        btnCoachBest.classList.remove('hidden');
        btnCoachBest.classList.toggle('active', isShowingBestMove);
        btnCoachBest.textContent = isShowingBestMove ? `${t('btn_hide_best')} (${bestSan || bestUci})` : t('btn_best_move');
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
    for (let i = fromIndex + 1; i < gamePositions.length; i++) { const cls = gamePositions[i].classification; if (cls && errorCategories.includes(cls.category)) return i; }
    for (let i = 1; i <= fromIndex; i++) { const cls = gamePositions[i].classification; if (cls && errorCategories.includes(cls.category)) return i; }
    return -1;
}
function findPrevMistakeIndex(fromIndex) {
    const errorCategories = ['Inaccuracy', 'Mistake', 'Blunder'];
    for (let i = fromIndex - 1; i >= 1; i--) { const cls = gamePositions[i].classification; if (cls && errorCategories.includes(cls.category)) return i; }
    for (let i = gamePositions.length - 1; i >= fromIndex; i--) { const cls = gamePositions[i].classification; if (cls && errorCategories.includes(cls.category)) return i; }
    return -1;
}
function updateMistakeButtonsState() {
    if (btnNextMistake) btnNextMistake.disabled = (findNextMistakeIndex(currentMoveIndex) === -1);
    if (btnPrevMistake) btnPrevMistake.disabled = (findPrevMistakeIndex(currentMoveIndex) === -1);
}
function updateNextMistakeButtonState() { updateMistakeButtonsState(); }

function buildMoveCellBadgeHtml(pos) {
    if (!pos.classification) return '';
    const isBrilliant = Boolean(pos.classification?.isBrilliant);
    const category = isBrilliant ? 'Brilliant' : (pos.classification.category || 'Best');
    const symbol = EVAL_BADGE_SYMBOLS[category] || SVG_ICONS.Best;
    const textSym = CATEGORY_TEXT_SYMBOLS[category] || '★';
    const catClass = category.toLowerCase();
    const catName = isBrilliant
        ? (currentLang === 'en' ? 'Brilliant !!' : 'Xuất thần !!')
        : (typeof getCategoryName === 'function' ? getCategoryName(category, currentLang) : (pos.classification.info ? pos.classification.info.viName : category));
    return `<span class="move-class-badge badge-${catClass}" title="${catName} (${textSym})">${symbol}</span>`;
}

function renderMoveList() {
    moveListContainer.innerHTML = '';
    if (gamePositions.length <= 1) { moveListContainer.innerHTML = `<p class="empty-text">${t('no_moves_game')}</p>`; return; }
    if (trialBranch && trialBranch.baseMoveIndex === 0) moveListContainer.appendChild(buildTrialBranchRowElement());

    for (let i = 1; i < gamePositions.length; i += 2) {
        const moveTurnNumber = Math.ceil(i / 2); const whitePos = gamePositions[i]; const blackPos = gamePositions[i + 1] || null;
        const row = document.createElement('div'); row.className = 'move-row';
        const numSpan = document.createElement('span'); numSpan.className = 'move-number'; numSpan.textContent = `${moveTurnNumber}.`; row.appendChild(numSpan);

        const whiteCell = document.createElement('div'); whiteCell.className = 'move-cell';
        if (!isInTrialBranch() && whitePos.index === currentMoveIndex) whiteCell.classList.add('active');
        whiteCell.dataset.moveIndex = whitePos.index;
        const whiteTimeHtml = whitePos.timeSpentStr ? `<span class="move-time-spent" title="${t('thinking_time', whitePos.timeSpentStr)}">${whitePos.timeSpentStr}</span>` : '';
        whiteCell.innerHTML = `<span class="move-san">${whitePos.move.san}</span>${whiteTimeHtml}<span class="move-badges-wrap" id="move-badge-${whitePos.index}">${buildMoveCellBadgeHtml(whitePos)}</span>`;
        whiteCell.addEventListener('click', () => { stopAutoplay(); goToMove(whitePos.index); }); row.appendChild(whiteCell);

        if (blackPos) {
            const blackCell = document.createElement('div'); blackCell.className = 'move-cell';
            if (!isInTrialBranch() && blackPos.index === currentMoveIndex) blackCell.classList.add('active');
            blackCell.dataset.moveIndex = blackPos.index;
            const blackTimeHtml = blackPos.timeSpentStr ? `<span class="move-time-spent" title="${t('thinking_time', blackPos.timeSpentStr)}">${blackPos.timeSpentStr}</span>` : '';
            blackCell.innerHTML = `<span class="move-san">${blackPos.move.san}</span>${blackTimeHtml}<span class="move-badges-wrap" id="move-badge-${blackPos.index}">${buildMoveCellBadgeHtml(blackPos)}</span>`;
            blackCell.addEventListener('click', () => { stopAutoplay(); goToMove(blackPos.index); }); row.appendChild(blackCell);
        } else { row.appendChild(document.createElement('div')); }
        moveListContainer.appendChild(row);

        if (trialBranch && trialBranch.baseMoveIndex > 0) {
            if (trialBranch.baseMoveIndex === whitePos.index || (blackPos && trialBranch.baseMoveIndex === blackPos.index)) moveListContainer.appendChild(buildTrialBranchRowElement());
        }
    }
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
    const symbol = EVAL_BADGE_SYMBOLS[cat] || SVG_ICONS.Best;
    const catLabel = (cat === 'Brilliant') ? (currentLang === 'en' ? 'Brilliant !!' : 'Xuất thần !!') : (typeof getCategoryName === 'function' ? getCategoryName(cat, currentLang) : cat);
    return `<span class="move-class-badge badge-${cat.toLowerCase()}" title="${catLabel} (${avgAcc.toFixed(1)}%)">${symbol}</span>`;
}

function renderStatsTable(stats, game) {
    currentStats = stats;
    let userBrilliant = 0; let oppBrilliant = 0; const userColor = game.userColor || 'w'; const oppColor = userColor === 'w' ? 'b' : 'w';
    for (let i = 1; i < gamePositions.length; i++) {
        const p = gamePositions[i];
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

    const perfRating = calculatePerformanceRating(userAccNum, countMistake, countBlunder, oppRatingNum);

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
            moveClassesHtml += `<div class="sym-row"><div class="sym-count sym-left" style="color: ${wColor};">${cat.w}</div><div class="sym-center"><span class="move-class-badge badge-${cat.cls}">${cat.symbol}</span><span class="sym-name">${cat.label}</span></div><div class="sym-count sym-right" style="color: ${bColor};">${cat.b}</div></div>`;
        });

        const phases = [
            { key: 'opening', title: t('phase_opening'), sub: t('moves_range_opening'), minTurn: 1, maxTurn: 10 },
            { key: 'middlegame', title: t('phase_middlegame'), sub: t('moves_range_middlegame'), minTurn: 11, maxTurn: 25 },
            { key: 'endgame', title: t('phase_endgame'), sub: t('moves_range_endgame'), minTurn: 26, maxTurn: null }
        ];
        let phasesHtml = '';
        phases.forEach(phase => {
            const wBadge = getPhaseEvalBadge(gamePositions, 'w', phase.minTurn, phase.maxTurn);
            const bBadge = getPhaseEvalBadge(gamePositions, 'b', phase.minTurn, phase.maxTurn);
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
    if (thWhiteName) thWhiteName.textContent = `⬜ ${whiteName} (${whiteRating || '?'})`;
    if (thBlackName) thBlackName.textContent = `⬛ ${blackName} (${blackRating || '?'})`;
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
            <tr><td>${wBrill}</td><td>${t('cat_brilliant')} (!!)</td><td>${bBrill}</td></tr>
            <tr><td>${stats.w.counts.Great || 0}</td><td>${t('cat_great')} (!)</td><td>${stats.b.counts.Great || 0}</td></tr>
            <tr><td>${stats.w.counts.Book || 0}</td><td>${t('cat_book')} (📖)</td><td>${stats.b.counts.Book || 0}</td></tr>
            <tr><td>${wBest}</td><td>${t('cat_best')} (★)</td><td>${bBest}</td></tr>
            <tr><td>${stats.w.counts.Excellent || 0}</td><td>${t('cat_excellent')} (👍)</td><td>${stats.b.counts.Excellent || 0}</td></tr>
            <tr><td>${stats.w.counts.Good || 0}</td><td>${t('cat_good')} (✔️)</td><td>${stats.b.counts.Good || 0}</td></tr>
            <tr><td>${stats.w.counts.Inaccuracy || 0}</td><td>${t('cat_inaccuracy')} (?!)</td><td>${stats.b.counts.Inaccuracy || 0}</td></tr>
            <tr><td>${stats.w.counts.Mistake || 0}</td><td>${t('cat_mistake')} (?)</td><td>${stats.b.counts.Mistake || 0}</td></tr>
            <tr><td>${stats.w.counts.Miss || 0}</td><td>${t('cat_miss')} (X)</td><td>${stats.b.counts.Miss || 0}</td></tr>
            <tr><td>${stats.w.counts.Blunder || 0}</td><td>${t('cat_blunder')} (??)</td><td>${stats.b.counts.Blunder || 0}</td></tr>
        `;
    }
}

// ============================================================================
// ĐIỀU KHIỂN & PHÂN TÍCH STOCKFISH
// ============================================================================
let autoplayIntervalId = null;
function isAutoplayRunning() { return autoplayIntervalId !== null; }
function startAutoplay() {
    if (!gamePositions || gamePositions.length <= 1 || isAutoplayRunning()) return;
    if (currentMoveIndex >= gamePositions.length - 1) goToMove(0);
    if (btnPlay) { btnPlay.textContent = t('btn_pause_lbl'); btnPlay.title = 'Tạm dừng (Phím Space)'; btnPlay.classList.add('playing'); }
    autoplayIntervalId = setInterval(() => {
        if (!gamePositions || currentMoveIndex >= gamePositions.length - 1) { stopAutoplay(); return; }
        goToMove(currentMoveIndex + 1);
        if (currentMoveIndex >= gamePositions.length - 1) stopAutoplay();
    }, 1000);
}
function stopAutoplay() {
    if (autoplayIntervalId !== null) { clearInterval(autoplayIntervalId); autoplayIntervalId = null; }
    if (btnPlay) { btnPlay.textContent = t('btn_play_lbl'); btnPlay.title = 'Phát ván cờ (Space)'; btnPlay.classList.remove('playing'); }
}
function toggleAutoplay() { if (isAutoplayRunning()) stopAutoplay(); else startAutoplay(); }

function renderKeyMovesList() {
    if (!keyMovesList) return;
    if (!gamePositions || gamePositions.length <= 1 || selectedGameIndex === null) {
        keyMovesList.innerHTML = '<p class="empty-text">Chưa chọn ván cờ.</p>'; if (keyMovesCountBadge) keyMovesCountBadge.textContent = '0'; return;
    }
    const selectedGame = loadedGames[selectedGameIndex]; if (!selectedGame) return;
    const userColor = selectedGame.userColor;
    const myCriticalMoves = [];
    for (let i = 1; i < gamePositions.length; i++) {
        const pos = gamePositions[i]; if (!pos || !pos.move || pos.move.color !== userColor || !pos.classification) continue;
        const cat = pos.classification.category; if (cat === 'Mistake' || cat === 'Blunder') myCriticalMoves.push(pos);
    }
    if (keyMovesCountBadge) keyMovesCountBadge.textContent = String(myCriticalMoves.length);
    if (myCriticalMoves.length === 0) {
        if (isAnalyzing) keyMovesList.innerHTML = `<div class="key-moves-empty info">${t('status_analyzing')}</div>`;
        else keyMovesList.innerHTML = `<div class="key-moves-empty success"><strong>${currentLang === 'en' ? 'Great!' : 'Tuyệt vời!'}</strong> ${currentLang === 'en' ? 'You made no major mistakes.' : 'Bạn không mắc sai lầm nào.'}</div>`;
        return;
    }
    let html = '';
    myCriticalMoves.forEach((pos) => {
        const moveNumber = Math.ceil(pos.index / 2); const movePrefix = (pos.move.color === 'w') ? `${moveNumber}.` : `${moveNumber}...`;
        const moveSan = pos.move.san; const cat = pos.classification.category; const isBlunder = (cat === 'Blunder');
        const badgeLabel = typeof getCategoryName === 'function' ? getCategoryName(cat, currentLang) : (isBlunder ? 'Sai lầm nặng' : 'Sai lầm');
        const badgeClass = isBlunder ? 'badge-blunder' : 'badge-mistake';
        const isActive = (pos.index === currentMoveIndex);
        html += `<div class="key-move-item ${isActive ? 'active' : ''}" data-index="${pos.index}" title="Bấm để nhảy tới nước ${movePrefix} ${moveSan}"><div class="key-move-left"><span class="key-move-num">${movePrefix}</span><span class="key-move-san">${moveSan}</span></div><div class="key-move-right"><span class="key-move-badge ${badgeClass}">${badgeLabel}</span></div></div>`;
    });
    keyMovesList.innerHTML = html;
    keyMovesList.querySelectorAll('.key-move-item').forEach((item) => { item.addEventListener('click', () => { stopAutoplay(); const idx = Number(item.dataset.index); if (!isNaN(idx)) goToMove(idx); }); });
}

function updateKeyMovesActive() {
    if (!keyMovesList) return;
    keyMovesList.querySelectorAll('.key-move-item').forEach((item) => { const idx = Number(item.dataset.index); item.classList.toggle('active', idx === currentMoveIndex); });
}

let previousMoveIndex = 0;
function goToMove(index) {
    if (!gamePositions.length) return;
    if (index < 0) index = 0; if (index >= gamePositions.length) index = gamePositions.length - 1;
    if (trialBranch) { trialBranch.isViewingBranch = false; trialBranch.currentIndex = null; }
    selectedSquareForMove = null; clearSquareMoveHighlights();
    const isSingleStep = Math.abs(index - previousMoveIndex) === 1;
    currentMoveIndex = index; const currentPos = gamePositions[currentMoveIndex];
    isShowingBestMove = true; isShowingHints = false; currentHintsData = [];
    if (coachHintsBox) coachHintsBox.classList.add('hidden');
    if (btnCoachHint) { btnCoachHint.classList.remove('active'); btnCoachHint.textContent = t('btn_hints_lbl'); }

    board.position(currentPos.fen, isSingleStep);
    if (isSingleStep && currentMoveIndex > 0 && currentPos.move) {
        if (currentPos.move.captured || (currentPos.move.san && currentPos.move.san.includes('x'))) SoundManager.playCapture(); else SoundManager.playMove();
    }
    previousMoveIndex = currentMoveIndex;

    clearBoardHighlightsAndArrows(); if (currentPos.move) highlightActualMove(currentPos.move); updateCurrentMoveArrow();
    const totalMoves = gamePositions.length - 1; moveCounterSpan.textContent = `${currentMoveIndex} / ${totalMoves}`;
    btnStart.disabled = (currentMoveIndex === 0); btnPrev.disabled = (currentMoveIndex === 0); btnNext.disabled = (currentMoveIndex === totalMoves); btnEnd.disabled = (currentMoveIndex === totalMoves);
    if (btnPlay) btnPlay.disabled = (totalMoves <= 0);
    if (currentMoveIndex >= totalMoves && isAutoplayRunning()) stopAutoplay();

    const allCells = moveListContainer.querySelectorAll('.move-cell'); let activeCell = null;
    allCells.forEach(cell => { const cellIndex = Number(cell.dataset.moveIndex); if (cellIndex === currentMoveIndex) { cell.classList.add('active'); activeCell = cell; } else cell.classList.remove('active'); });
    moveListContainer.querySelectorAll('.trial-move-cell.active').forEach(tc => tc.classList.remove('active'));
    if (activeCell) activeCell.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); else if (currentMoveIndex === 0) moveListContainer.scrollTop = 0;

    updateCoachPanel(); updateEvalBar(); updateEvalChartMarker(); updateKeyMovesActive(); updatePlayersDisplay();
    if (!isAnalyzing || isAnalysisPaused || isInTrialBranch()) {
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
async function evaluateAndClassifyPosition(pos, isTrial, clearHash = false, moveTime = 180) {
    const targetDepth = (isTrial || (isLiveEngineEnabled && !isAnalyzing)) 
        ? currentLiveDepth 
        : (currentDepth || 16);
    const targetMoveTime = (isTrial || (isLiveEngineEnabled && !isAnalyzing))
        ? 200
        : (moveTime !== undefined && moveTime !== null ? moveTime : 180);

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
        cp: rawResult.cp, mate: rawResult.mate, bestmove: rawResult.bestmove, pv: rawResult.pv,
        cpWhite: whiteScore.cpWhite, mateWhite: whiteScore.mateWhite
    };

    let evalBefore = null;
    let prevPos = null;
    if (isTrial) {
        const bIdx = trialBranch.currentIndex;
        if (bIdx === 0) {
            prevPos = gamePositions[trialBranch.baseMoveIndex];
            evalBefore = prevPos?.eval;
        } else {
            prevPos = trialBranch.positions[bIdx - 1];
            evalBefore = prevPos?.eval;
        }
    } else {
        if (pos.index > 0) {
            prevPos = gamePositions[pos.index - 1];
            evalBefore = prevPos?.eval;
        }
    }

    if (evalBefore && evalBefore.bestmove && pos.move) {
        const playedUci = pos.move.uci || `${pos.move.from}${pos.move.to}${pos.move.promotion || ''}`;
        pos.classification = evaluateMoveQuality(evalBefore, pos.eval, pos.move.color, playedUci, evalBefore.bestmove, pos.index);

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
        if (pos.index === currentMoveIndex) {
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

    if (!isLiveEngineEnabled && !inTrial) {
        updateLiveEngineUIOff();
        return;
    }

    if (isAnalyzing && !isAnalysisPaused && !inTrial) return;

    // FIX LỖI GHI ĐÈ KẾT QUẢ VÁN GỐC: 
    if (!forceReeval && !inTrial && gamePositions[currentMoveIndex] && gamePositions[currentMoveIndex].eval) {
        const existingEval = gamePositions[currentMoveIndex].eval;
        updateLiveEngineUIComplete(existingEval, currentDepth || 16, fen);
        return;
    }

    if (forceReeval && !inTrial && gamePositions[currentMoveIndex]) {
        gamePositions[currentMoveIndex].eval = null;
        gamePositions[currentMoveIndex].classification = null;
    }

    try {
        if (inTrial) {
            const bIdx = trialBranch.currentIndex;
            await evaluateAndClassifyPosition(trialBranch.positions[bIdx], true, true);
        } else {
            await evaluateAndClassifyPosition(gamePositions[currentMoveIndex], false, false);
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

    const totalPositions = gamePositions.length;
    if (totalPositions === 0) return;

    if (startIndex === 0) {
        lastCompletedIndex = 0;
        if (cacheStatusBadge) cacheStatusBadge.classList.add('hidden');
        if (btnReanalyze) btnReanalyze.classList.add('hidden');
        progressPercent.textContent = '0%';
        progressFill.style.width = '0%';
        startElapsedTimer(false);
    } else {
        startElapsedTimer(true);
    }

    isAnalyzing = true; isAnalysisPaused = false;
    progressBox.classList.remove('hidden', 'done', 'paused');
    progressText.textContent = `Đang phân tích... ${startIndex}/${totalPositions}`;

    if (btnPauseAnalysis) {
        btnPauseAnalysis.classList.remove('hidden', 'btn-resume');
        btnPauseAnalysis.classList.add('btn-pause');
        btnPauseAnalysis.textContent = 'Dừng phân tích';
    }

    try {
        await stockfishEngine.init();
        if (startIndex === 0 && typeof stockfishEngine.clearHash === 'function') {
            stockfishEngine.clearHash();
        }

        for (let i = startIndex; i < totalPositions; i++) {
            if (currentSession !== analysisSessionId || isAnalysisPaused) return;

            const shouldClearHash = (i === startIndex && startIndex === 0);
            await evaluateAndClassifyPosition(gamePositions[i], false, shouldClearHash);

            if (currentSession !== analysisSessionId || isAnalysisPaused) return;

            if (i !== currentMoveIndex) updateNextMistakeButtonState();
            if (i % 2 === 0 || i === totalPositions - 1) { drawEvalChart(); renderKeyMovesList(); }

            const completed = i + 1; lastCompletedIndex = completed;
            const percent = Math.round((completed / totalPositions) * 100);
            progressText.textContent = `Đang phân tích... ${completed}/${totalPositions}`;
            progressPercent.textContent = `${percent}%`; progressFill.style.width = `${percent}%`;
        }

        isAnalyzing = false; isAnalysisPaused = false; stopElapsedTimer();
        if (btnPauseAnalysis) btnPauseAnalysis.classList.add('hidden');

        const finalStats = classifyAllMovesAndStats(gamePositions);
        renderStatsTable(finalStats, game);
        updateCoachPanel(); updateEvalBar(); drawEvalChart(); renderKeyMovesList();

        if (typeof saveGameAnalysisCache === 'function') {
            await saveGameAnalysisCache(game.url, currentDepth, gamePositions, finalStats);
            analyzedGameUrls.add(game.url); applyGameListFilters();
        }

        if (cacheStatusBadge) cacheStatusBadge.classList.remove('hidden');
        if (btnReanalyze) btnReanalyze.classList.remove('hidden');
        progressBox.classList.remove('paused'); progressBox.classList.add('done');
        progressText.textContent = `Đã phân tích xong ${totalPositions}/${totalPositions} thế cờ`;

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
        if (error && (error.message === 'ENGINE_STOPPED' || error.message === 'ENGINE_INTERRUPTED')) return;
        isAnalyzing = false; stopElapsedTimer();
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
    if (!loadedGames || loadedGames.length === 0) {
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
    if (currentBatchIndex >= loadedGames.length) {
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

    if (!loadedGames || loadedGames.length === 0) {
        stopBatchAnalysis();
        return;
    }

    const totalGames = loadedGames.length;
    let foundIndex = -1;

    // Quét tìm ván chưa phân tích tính từ currentBatchIndex đến hết mảng
    for (let i = currentBatchIndex; i < totalGames; i++) {
        const game = loadedGames[i];
        if (game && game.url && !analyzedGameUrls.has(game.url)) {
            foundIndex = i;
            break;
        }
    }

    // Nếu từ currentBatchIndex trở đi không còn, nhưng có thể các ván trước đó chưa phân tích
    if (foundIndex === -1) {
        for (let i = 0; i < currentBatchIndex; i++) {
            const game = loadedGames[i];
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
    if (!isAnalyzing || isAnalysisPaused) return;
    isAnalysisPaused = true; stockfishEngine.stop(); pauseElapsedTimer();
    if (btnPauseAnalysis) { btnPauseAnalysis.textContent = 'Phân tích tiếp'; btnPauseAnalysis.classList.add('btn-resume'); btnPauseAnalysis.classList.remove('btn-pause'); }
    progressBox.classList.add('paused'); progressText.textContent = `Đã tạm dừng tại ${lastCompletedIndex}/${gamePositions.length} thế cờ`; drawEvalChart();
}
function resumeAnalysis() {
    if (!isAnalysisPaused || selectedGameIndex === null) return;
    isAnalysisPaused = false;
    if (btnPauseAnalysis) { btnPauseAnalysis.textContent = 'Dừng phân tích'; btnPauseAnalysis.classList.remove('btn-resume'); btnPauseAnalysis.classList.add('btn-pause'); }
    progressBox.classList.remove('paused'); analyzeCurrentGame(loadedGames[selectedGameIndex], lastCompletedIndex);
}
function applyCachedAnalysis(cachedData, game) {
    ++analysisSessionId; stockfishEngine.stop(); isAnalyzing = false; isAnalysisPaused = false; stopElapsedTimer();
    if (btnPauseAnalysis) btnPauseAnalysis.classList.add('hidden');
    if (cachedData.depth) { currentDepth = cachedData.depth; if (selectDepth) selectDepth.value = String(cachedData.depth); }
    if (cachedData.positions && cachedData.positions.length) {
        cachedData.positions.forEach(p => {
            if (gamePositions[p.index]) {
                gamePositions[p.index].eval = p.eval;
                gamePositions[p.index].classification = p.classification;
            }
        });
        // Đồng bộ hóa cờ isBrilliant từ phân loại đã lưu trong bộ nhớ đệm
        for (let i = 1; i < gamePositions.length; i++) {
            const p = gamePositions[i];
            if (p && p.classification && p.classification.category === 'Brilliant') {
                p.classification.isBrilliant = true;
            }
        }
    }
    for (let i = 1; i < gamePositions.length; i++) {
        const badgeContainer = document.getElementById(`move-badge-${i}`);
        if (badgeContainer) badgeContainer.innerHTML = buildMoveCellBadgeHtml(gamePositions[i]);
    }
    const statsToRender = (cachedData.stats && cachedData.stats.w)
        ? cachedData.stats
        : (typeof classifyAllMovesAndStats === 'function' ? classifyAllMovesAndStats(gamePositions) : null);
    if (statsToRender) renderStatsTable(statsToRender, game);
    if (cacheStatusBadge) cacheStatusBadge.classList.remove('hidden');
    if (btnReanalyze) btnReanalyze.classList.remove('hidden');
    progressBox.classList.remove('hidden', 'paused');
    progressBox.classList.add('done');
    progressText.textContent = `Đã lưu - tải từ bộ nhớ (Độ sâu ${cachedData.depth || currentDepth})`;
    progressPercent.textContent = '100%';
    progressFill.style.width = '100%';
    if (analysisElapsedTime) analysisElapsedTime.textContent = 'Đã lưu';
    drawEvalChart();
    renderKeyMovesList();
    goToMove(currentMoveIndex);
}

function updateLiveEngineUIOff() {
    if (liveEngineStatusBadge) { liveEngineStatusBadge.className = 'live-status-badge off'; liveEngineStatusBadge.textContent = 'Đã tắt'; }
    if (liveEvalText) { liveEvalText.textContent = '--'; liveEvalText.className = 'live-result-val score-neutral'; }
    if (liveBestMoveText) liveBestMoveText.textContent = '--';
    if (liveDepthText) liveDepthText.textContent = `Tắt / ${currentLiveDepth}`;
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
    const list = Array.isArray(games) ? games : loadedGames;
    gameListContainer.innerHTML = '';
    gameCountSpan.textContent = list.length;
    if (list.length === 0) {
        gameListContainer.innerHTML = `<p class="empty-text">${t('no_games_found')}</p>`;
        return;
    }

    list.forEach((game) => {
        const item = document.createElement('div');
        item.className = 'game-item';
        const originalIndex = loadedGames.indexOf(game);
        item.dataset.index = originalIndex;
        if (originalIndex === selectedGameIndex) item.classList.add('active');
        const colorClass = game.userColor === 'w' ? 'white' : 'black';
        const badgeClass = `badge-${game.resultType}`;
        const timeClassSafe = (game.timeClass || 'rapid').toLowerCase();
        const isAnalyzed = analyzedGameUrls.has(game.url);

        const res = (typeof parseChessComResult === 'function')
            ? parseChessComResult(game.rawResult || game.resultLabel, currentLang)
            : { label: game.resultLabel, type: game.resultType };

        let resultIcon = '';
        if (game.resultType === 'win') resultIcon = '<svg class="result-icon" width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M2 6l3 3 5-6"/></svg>';
        else if (game.resultType === 'loss') resultIcon = '<svg class="result-icon" width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M2.5 2.5l7 7M9.5 2.5l-7 7"/></svg>';
        else resultIcon = '<svg class="result-icon" width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M2 4.5h8M2 7.5h8"/></svg>';

        let timeIcon = '';
        if (timeClassSafe === 'rapid') timeIcon = '<svg class="time-icon" width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="8" cy="8" r="6"/><path d="M8 5v3l2 2"/></svg>';
        else if (timeClassSafe === 'blitz') timeIcon = '<svg class="time-icon" width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 2L4 9h5l-2 5 7-8H9l2-4z"/></svg>';
        else if (timeClassSafe === 'bullet') timeIcon = '<svg class="time-icon" width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 2c-3 0-5 3-5 7a5 5 0 0 0 10 0c0-4-2-7-5-7z"/></svg>';
        else timeIcon = '<svg class="time-icon" width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="10" height="9" rx="1"/><path d="M8 2v3"/></svg>';

        item.innerHTML = `<div class="game-item-header"><div class="game-player-info"><span class="color-square ${colorClass}"></span><span class="opponent-name">${escapeHTML(game.opponentUsername)}</span><span class="opponent-rating">(${escapeHTML(game.opponentRating)})</span></div><span class="game-date">${escapeHTML(game.dateStr)}</span></div><div class="game-item-meta"><div class="game-item-tags"><span class="time-class-badge time-${timeClassSafe}">${timeIcon} ${escapeHTML(formatTimeClass(game.timeClass, currentLang))}</span>${isAnalyzed ? `<span class="badge-analyzed">${t('badge_analyzed')}</span>` : ''}</div><span class="badge-result ${badgeClass}">${resultIcon} ${escapeHTML(res.label)}</span></div>`;
        item.addEventListener('click', () => selectGame(game));
        gameListContainer.appendChild(item);
    });
}
function applyGameListFilters() {
    let result = [...loadedGames];
    if (currentFilterResult !== 'all') result = result.filter(game => game.resultType === currentFilterResult);
    if (currentFilterTimeClass !== 'all') result = result.filter(game => (game.timeClass || '').toLowerCase() === currentFilterTimeClass.toLowerCase());
    if (currentSortOrder === 'oldest') result.reverse();
    renderGameList(result);
}

async function selectGame(gameOrIndex, keepDrawerOpen = false) {
    if (!keepDrawerOpen && !isBatchAnalyzing) closeGameDrawer();
    let index, game;
    if (typeof gameOrIndex === 'number') { index = gameOrIndex; game = loadedGames[index]; } else { game = gameOrIndex; index = loadedGames.indexOf(game); }
    selectedGameIndex = index;
    gameListContainer.querySelectorAll('.game-item').forEach((el) => el.classList.toggle('active', Number(el.dataset.index) === selectedGameIndex));
    try {
        if (isBotGameActive) exitBotGame();
        const btnPlayBotEl = document.getElementById('btn-play-bot');
        if (btnPlayBotEl) btnPlayBotEl.disabled = false;
        hideStatus(); trialBranch = null; if (btnCoachExitTrial) btnCoachExitTrial.classList.add('hidden');
        selectedSquareForMove = null; clearSquareMoveHighlights(); isShowingBestMove = true; isShowingExplain = false;
        if (kpiOpening) kpiOpening.textContent = (typeof extractOpeningNameFromPGN === 'function') ? extractOpeningNameFromPGN(game.pgn) : '--';
        document.getElementById('kpi-user-accuracy').textContent = '--%'; document.getElementById('kpi-opp-accuracy').textContent = '--%';
        document.getElementById('kpi-user-mistakes').textContent = '--'; document.getElementById('kpi-user-mistakes-detail').textContent = '(-- sai lầm, -- sai lầm nặng)';
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
        const whitePlayer = userColor === 'w' ? `${game.userUsername || 'bazu25022005'} (${game.userRating || '?'})` : `${game.opponentUsername || 'Opponent'} (${game.opponentRating || '?'})`;
        const blackPlayer = userColor === 'b' ? `${game.userUsername || 'bazu25022005'} (${game.userRating || '?'})` : `${game.opponentUsername || 'Opponent'} (${game.opponentRating || '?'})`;
        const whiteLabel = currentLang === 'en' ? 'White' : 'Trắng';
        const blackLabel = currentLang === 'en' ? 'Black' : 'Đen';
        if (gamePlayersInfo) gamePlayersInfo.innerHTML = `<strong>⬜ ${whiteLabel}:</strong> ${escapeHTML(whitePlayer)} &nbsp;|&nbsp; <strong>⬛ ${blackLabel}:</strong> ${escapeHTML(blackPlayer)}`;
        const res = (typeof parseChessComResult === 'function')
            ? parseChessComResult(game.rawResult || game.resultLabel, currentLang)
            : { label: game.resultLabel, type: game.resultType };
        if (gameResultBadge) { gameResultBadge.className = `badge-result badge-${game.resultType}`; gameResultBadge.textContent = res.label; }
        if (btnOpenChessCom && game.url) btnOpenChessCom.href = game.url;

        isAnalyzing = false; isAnalysisPaused = false; stockfishEngine.stop(); stopElapsedTimer();
        const userOrientation = (userColor === 'b') ? 'black' : 'white';
        initChessboard(userOrientation);
        if (board) board.orientation(userOrientation);
        updateEvalBarOrientation(userOrientation);
        if (typeof board.resize === 'function') board.resize();
        stopAutoplay(); gamePositions = buildPositionsFromPGN(game.pgn);
        renderMoveList(); drawEvalChart(); renderKeyMovesList(); goToMove(0);

        let cachedData = null;
        if (typeof getGameAnalysisCache === 'function') cachedData = await getGameAnalysisCache(game.url, currentDepth);
        if (cachedData && cachedData.positions && cachedData.positions.length) {
            applyCachedAnalysis(cachedData, game);
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
    } catch (error) { showStatus(error.message, 'error'); }
}

/**
 * Render Mini-Dashboard trên màn hình chờ (#review-placeholder)
 * @param {Array} games - Danh sách ván cờ đã tải (loadedGames)
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

        heroMetaEl.innerHTML = `
            <span class="dot ${latestGame.userColor}"></span>
            <span class="tg">${escapeHTML(capTimeClass)}</span>
            <span class="res ${resInfo.type}">${escapeHTML(resInfo.label)}</span>
            <span class="mute">${escapeHTML(latestGame.dateStr || '')}</span>
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
                    <span class="dot ${g.userColor}"></span>
                    <b>vs ${escapeHTML(g.opponentUsername)} <span class="opponent-rating">(${g.opponentRating || '?'})</span></b>
                    <span class="tc"><span class="tg">${escapeHTML(capTimeClass)}</span></span>
                    <span class="rs res ${resInfo.type}">${escapeHTML(resInfo.label)}</span>
                    <button type="button" class="${actionBtnClass}" data-index="${idx}">${actionBtnText}</button>
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

    const username = typeof CHESSCOM_USERNAME !== 'undefined' ? CHESSCOM_USERNAME : 'bazu25022005';
    const year = parseInt(yearInput.value, 10); const month = monthSelect.value;
    if (isFutureMonth(year, month)) { showStatus(`Tháng ${month}/${year} nằm trong tương lai, không thể tải danh sách ván cờ.`, 'error'); updateMonthNavButtons(); return; }
    btnFetch.disabled = true; btnFetch.textContent = 'Đang tải...'; showStatus(`Đang tải danh sách ván cờ...`, 'info');
    try {
        loadedGames = await fetchMonthlyGames(username, year, month);
        if (typeof getAllCachedGameUrls === 'function') analyzedGameUrls = await getAllCachedGameUrls(currentDepth);
        applyGameListFilters();
        await renderWelcomeDashboard(loadedGames);
        hideStatus();
    } catch (error) {
        loadedGames = []; gameCountSpan.textContent = '0'; gameListContainer.innerHTML = `<p class="empty-text">Không có dữ liệu hiển thị.</p>`;
        await renderWelcomeDashboard([]);
        showStatus(error.message, 'error');
    } finally { btnFetch.disabled = false; btnFetch.textContent = 'Tải'; }
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
    const currentPos = gamePositions[currentMoveIndex];
    if (currentPos && currentPos.move) highlightActualMove(currentPos.move);
    updateCurrentMoveArrow();
    if (typeof redrawArrows === 'function') redrawArrows(currentOrientation);
});

if (btnCopyPgn) {
    btnCopyPgn.addEventListener('click', async () => {
        if (selectedGameIndex === null || !loadedGames[selectedGameIndex]) return;
        const game = loadedGames[selectedGameIndex]; if (!game.pgn) return;
        try { await navigator.clipboard.writeText(game.pgn); showCopyToast(); } catch (err) {
            const ta = document.createElement('textarea'); ta.value = game.pgn; ta.style.position = 'fixed'; ta.style.opacity = '0'; document.body.appendChild(ta); ta.focus(); ta.select(); document.execCommand('copy'); document.body.removeChild(ta); showCopyToast();
        }
    });
}

btnCoachBest.addEventListener('click', () => {
    if (isInTrialBranch()) {
        const trialPos = trialBranch.positions[trialBranch.currentIndex];
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
    const prevPos = currentMoveIndex > 0 ? gamePositions[currentMoveIndex - 1] : null;
    const targetPos = (currentMoveIndex > 0 && prevPos) ? prevPos : gamePositions[currentMoveIndex];
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
        const itemEl = document.createElement('div'); itemEl.className = 'hint-item'; itemEl.title = `Nước gợi ý #${rank}`;
        itemEl.innerHTML = `<div class="hint-left"><span class="hint-rank-badge rank-${rank}">#${rank}</span><span class="hint-move-san">${san}</span><span class="hint-move-uci">(${uci})</span></div><span class="hint-eval-badge ${scoreClass}">${scoreText}</span>`;
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
        if (!gamePositions || gamePositions.length === 0) return;
        const currentPos = gamePositions[currentMoveIndex]; if (!currentPos) return;
        if (isShowingHints) { isShowingHints = false; currentHintsData = []; clearArrows(); if (coachHintsBox) coachHintsBox.classList.add('hidden'); btnCoachHint.classList.remove('active'); btnCoachHint.textContent = 'Gợi ý'; return; }
        if (isAnalyzing && !isAnalysisPaused) { showStatus('Đang phân tích ván cờ, vui lòng chờ.', 'info'); return; }

        let targetFen = currentPos.fen;
        if (isInTrialBranch()) {
            const bIdx = trialBranch.currentIndex;
            targetFen = (bIdx === 0) ? trialBranch.baseFen : trialBranch.positions[bIdx - 1].fen;
        } else if (currentMoveIndex > 0) {
            targetFen = gamePositions[currentMoveIndex - 1].fen;
        }

        const chessCheck = new Chess(targetFen);
        if (chessCheck.in_checkmate() || chessCheck.in_draw() || chessCheck.in_stalemate() || chessCheck.in_threefold_repetition() || chessCheck.insufficient_material()) return;
        if (isShowingBestMove) { isShowingBestMove = false; updateCoachPanel(); }

        const analyzingMoveIndex = currentMoveIndex;
        btnCoachHint.disabled = true; btnCoachHint.textContent = 'Đang tính...';
        try {
            const results = await stockfishEngine.evaluateMultiPV(targetFen, 15, 3);
            if (currentMoveIndex !== analyzingMoveIndex) return;
            btnCoachHint.disabled = false;
            if (!results || results.length === 0) { btnCoachHint.textContent = 'Gợi ý'; return; }
            isShowingHints = true; currentHintsData = results; btnCoachHint.classList.add('active'); btnCoachHint.textContent = 'Đóng gợi ý';
            clearArrows();
            const hintColors = [ARROW_COLORS.BEST, ARROW_COLORS.SUGGEST_2, ARROW_COLORS.SUGGEST_3];
            const hintWidths = [17, 15, 14]; const hintOpacities = [0.85, 0.78, 0.72];
            results.forEach((item, idx) => {
                if (item.uci && item.uci.length >= 4) drawArrow(item.uci.slice(0, 2), item.uci.slice(2, 4), hintColors[idx] || ARROW_COLORS.SUGGEST_2, { width: hintWidths[idx] || 15, opacity: hintOpacities[idx] || 0.76, className: `board-arrow arrow-hint-${idx + 1}` });
            });
            renderHintsList(targetFen, results);
        } catch (err) {
            if (btnCoachHint) { btnCoachHint.disabled = false; btnCoachHint.textContent = 'Gợi ý'; btnCoachHint.classList.remove('active'); }
        }
    });
}

if (btnCloseHints) btnCloseHints.addEventListener('click', () => { isShowingHints = false; currentHintsData = []; clearArrows(); if (coachHintsBox) coachHintsBox.classList.add('hidden'); if (btnCoachHint) { btnCoachHint.classList.remove('active'); btnCoachHint.textContent = 'Gợi ý'; } });
btnCoachExplain.addEventListener('click', () => { if (currentMoveIndex <= 0) return; isShowingExplain = !isShowingExplain; updateCoachPanel(); });
if (btnPrevMistake) btnPrevMistake.addEventListener('click', () => { stopAutoplay(); const prevErrIdx = findPrevMistakeIndex(currentMoveIndex); if (prevErrIdx !== -1) goToMove(prevErrIdx); });
btnNextMistake.addEventListener('click', () => { stopAutoplay(); const nextErrIdx = findNextMistakeIndex(currentMoveIndex); if (nextErrIdx !== -1) goToMove(nextErrIdx); });
if (btnCoachExitTrial) btnCoachExitTrial.addEventListener('click', () => { stopAutoplay(); exitTrialBranch(); });
if (btnPlayBot) btnPlayBot.addEventListener('click', () => { startBotGame(); });
if (btnExitBot) btnExitBot.addEventListener('click', () => { exitBotGame(); });
const btnBotUndoEl = document.getElementById('btn-bot-undo');
if (btnBotUndoEl) btnBotUndoEl.addEventListener('click', () => { handleBotUndo(); });

let isDraggingEvalChart = false;
let evalChartThrottleTimer = null;
let lastChartTargetMove = -1;

function getChartMoveIndexFromEvent(e) {
    if (!gamePositions || gamePositions.length === 0) return -1;
    if (e.target && e.target.classList && e.target.classList.contains('chart-error-dot')) {
        const moveIdx = Number(e.target.dataset.moveIndex);
        if (!isNaN(moveIdx) && moveIdx >= 0 && moveIdx < gamePositions.length) return moveIdx;
    }
    const rect = evalChartSvg.getBoundingClientRect();
    if (rect.width <= 0) return -1;
    const clientX = (e.clientX !== undefined) ? e.clientX : (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
    const clickX = clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    return Math.round(ratio * (gamePositions.length - 1));
}

function handleEvalChartInteraction(e, isDrag = false) {
    if (!gamePositions || gamePositions.length === 0) return;
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
            if (lastChartTargetMove !== -1 && lastChartTargetMove !== currentMoveIndex) {
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
            if (lastChartTargetMove !== -1 && lastChartTargetMove !== currentMoveIndex) {
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
            if (lastChartTargetMove !== -1 && lastChartTargetMove !== currentMoveIndex) {
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
        if (sortIcon) sortIcon.textContent = (currentSortOrder === 'newest') ? '⬇️' : '⬆️';
        if (sortLabel) sortLabel.textContent = (currentSortOrder === 'newest') ? 'Mới nhất' : 'Cũ nhất';
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
    if (!gamePositions || !gamePositions.length) return;
    if (e.key === 'ArrowLeft') { e.preventDefault(); handlePrevMove(); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); handleNextMove(); }
    else if (e.key === 'Home') { e.preventDefault(); handleStartMove(); }
    else if (e.key === 'End') { e.preventDefault(); handleEndMove(); }
    else if (e.code === 'Space' || e.key === ' ') { e.preventDefault(); toggleAutoplay(); }
    else if (e.key === 'f' || e.key === 'F') { e.preventDefault(); if (btnFlip) btnFlip.click(); }
});

let resizeTimer = null;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (board && typeof board.resize === 'function') {
            board.resize();
            if (typeof redrawArrows === 'function' && typeof board.orientation === 'function') {
                redrawArrows(board.orientation());
            }
        }
    }, 100);
});
btnFetch.addEventListener('click', handleFetchGames);
if (btnStartBatch) btnStartBatch.addEventListener('click', startBatchAnalysis);
if (btnStopBatch) btnStopBatch.addEventListener('click', stopBatchAnalysis);

if (btnReanalyze) {
    btnReanalyze.addEventListener('click', async () => {
        if (selectedGameIndex === null || !loadedGames[selectedGameIndex]) return;
        const game = loadedGames[selectedGameIndex];
        if (typeof deleteGameAnalysisCache === 'function') await deleteGameAnalysisCache(game.url, currentDepth);
        analyzedGameUrls.delete(game.url); applyGameListFilters();
        if (cacheStatusBadge) cacheStatusBadge.classList.add('hidden'); btnReanalyze.classList.add('hidden');
        stopAutoplay(); gamePositions = buildPositionsFromPGN(game.pgn);
        renderMoveList(); drawEvalChart(); renderKeyMovesList(); goToMove(0);
        analyzeCurrentGame(game, 0);
    });
}

if (btnPauseAnalysis) btnPauseAnalysis.addEventListener('click', () => { if (isAnalysisPaused) resumeAnalysis(); else pauseAnalysis(); });
if (selectDepth) {
    selectDepth.addEventListener('change', async () => {
        currentDepth = parseInt(selectDepth.value, 10);
        if (typeof getAllCachedGameUrls === 'function') { analyzedGameUrls = await getAllCachedGameUrls(currentDepth); applyGameListFilters(); }
        if (selectedGameIndex !== null && loadedGames[selectedGameIndex]) {
            const game = loadedGames[selectedGameIndex];
            isAnalyzing = false; isAnalysisPaused = false; stockfishEngine.stop(); stopElapsedTimer();
            let cachedData = null;
            if (typeof getGameAnalysisCache === 'function') cachedData = await getGameAnalysisCache(game.url, currentDepth);
            if (cachedData && cachedData.positions && cachedData.positions.length) applyCachedAnalysis(cachedData, game);
            else {
                if (cacheStatusBadge) cacheStatusBadge.classList.add('hidden'); if (btnReanalyze) btnReanalyze.classList.add('hidden');
                stopAutoplay(); gamePositions = buildPositionsFromPGN(game.pgn);
                renderMoveList(); drawEvalChart(); renderKeyMovesList(); goToMove(0);
                analyzeCurrentGame(game, 0);
            }
        }
    });
}

if (toggleLiveEngine) toggleLiveEngine.addEventListener('change', () => { isLiveEngineEnabled = toggleLiveEngine.checked; if (isLiveEngineEnabled) triggerLiveAnalysis(getCurrentBoardFen()); else { stockfishEngine.stop(); updateLiveEngineUIOff(); } });
if (selectLiveDepth) selectLiveDepth.addEventListener('change', () => { currentLiveDepth = parseInt(selectLiveDepth.value, 10); if (isLiveEngineEnabled) triggerLiveAnalysis(getCurrentBoardFen()); });

if (btnClearAllCache) {
    btnClearAllCache.addEventListener('click', async () => {
        if (!confirm('Bạn có chắc chắn muốn xóa toàn bộ dữ liệu phân tích đã lưu trong bộ nhớ không?')) return;
        if (typeof clearAllAnalysisCache === 'function') await clearAllAnalysisCache();
        analyzedGameUrls.clear(); applyGameListFilters();
        if (cacheStatusBadge) cacheStatusBadge.classList.add('hidden'); if (btnReanalyze) btnReanalyze.classList.add('hidden');
        showStatus('Đã xóa toàn bộ bộ nhớ phân tích thành công.', 'info');
    });
}

if (btnOpenDrawer) btnOpenDrawer.addEventListener('click', openGameDrawer);
if (btnCloseDrawer) btnCloseDrawer.addEventListener('click', closeGameDrawer);
if (scrim) scrim.addEventListener('click', closeGameDrawer);
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && gameDrawer && gameDrawer.classList.contains('open')) closeGameDrawer(); });

if (btnTheme) {
    btnTheme.addEventListener('click', () => {
        const root = document.documentElement;
        const currentTheme = root.getAttribute('data-theme') || 'dark';
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', nextTheme);
        updateThemeButtonText();
    });
}

const tabButtons = document.querySelectorAll('.tabs button[data-tab]');
if (tabButtons.length > 0) {
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-tab'); tabButtons.forEach(b => b.classList.toggle('on', b === btn));
            ['t-moves', 't-cls', 't-key', 't-engine'].forEach(paneId => { const pane = document.getElementById(paneId); if (pane) pane.style.display = (paneId === targetId) ? '' : 'none'; });
        });
    });
}

initCustomizationControls();
initDefaultDate();
handleFetchGames();