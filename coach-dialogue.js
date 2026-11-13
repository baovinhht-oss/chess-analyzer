/**
 * FILE: coach-dialogue.js
 * Dynamic Contextual Coach Dialogue System for Chessana
 * Features:
 * 1. Anti-Repetition Engine (recentHistory LRU memory per pool, 6-8 entries)
 * 2. Rich contextual branching (Checkmate, Captures, Castling, Comebacks, Tactical Blunders)
 * 3. 10-15+ natural coaching dialogue variants per move category (VI & EN)
 * 4. Multi-level Tactical Hints generator (12+ strategic & tactical concepts)
 * 5. Dynamic Game Over Banner narratives (Checkmate, Resignation, Comeback win, Defeat with stats, Draw)
 */

(function (global) {
    'use strict';

    // =========================================================================
    // 1. DATA DICTIONARIES & PIECE NAMES
    // =========================================================================
    const PIECE_NAMES = {
        vi: { p: 'Tốt', n: 'Mã', b: 'Tượng', r: 'Xe', q: 'Hậu', k: 'Vua', piece: 'quân cờ' },
        en: { p: 'Pawn', n: 'Knight', b: 'Bishop', r: 'Rook', q: 'Queen', k: 'King', piece: 'piece' }
    };

    const PHASE_NAMES = {
        vi: { opening: 'khai cuộc', middlegame: 'trung cuộc', endgame: 'tàn cuộc' },
        en: { opening: 'opening', middlegame: 'middlegame', endgame: 'endgame' }
    };

    // =========================================================================
    // 2. ANTI-REPETITION ENGINE
    // =========================================================================
    const recentHistory = {};
    const MAX_HISTORY_LEN = 8;

    function clearHistory(poolKey) {
        if (poolKey) {
            delete recentHistory[poolKey];
        } else {
            for (const k of Object.keys(recentHistory)) {
                delete recentHistory[k];
            }
        }
    }

    function pickDynamicPhrase(poolKey, variantsArray, variables = {}) {
        if (!Array.isArray(variantsArray) || variantsArray.length === 0) return '';
        if (!recentHistory[poolKey]) recentHistory[poolKey] = [];
        const history = recentHistory[poolKey];

        // Tìm các index chưa xuất hiện trong lịch sử gần nhất
        let availableIndices = [];
        for (let i = 0; i < variantsArray.length; i++) {
            if (!history.includes(i)) availableIndices.push(i);
        }

        // Nếu pool nhỏ hơn lịch sử hoặc đã bốc hết, chỉ giữ 2 mục mới nhất để tránh lặp tức thời
        if (availableIndices.length === 0) {
            const keepCount = Math.max(0, Math.min(2, variantsArray.length - 1));
            recentHistory[poolKey] = history.slice(-keepCount);
            availableIndices = [];
            for (let i = 0; i < variantsArray.length; i++) {
                if (!recentHistory[poolKey].includes(i)) availableIndices.push(i);
            }
            if (availableIndices.length === 0) availableIndices = [0];
        }

        const pickedIdx = availableIndices[Math.floor(Math.random() * availableIndices.length)];
        recentHistory[poolKey].push(pickedIdx);
        if (recentHistory[poolKey].length > MAX_HISTORY_LEN) {
            recentHistory[poolKey].shift();
        }

        let text = variantsArray[pickedIdx];
        // Thay thế các biến động: {piece}, {square}, {bestMove}, {phase}, etc.
        for (const [k, v] of Object.entries(variables)) {
            if (v === undefined || v === null) continue;
            const reg = new RegExp(`\\{\\{?${k}\\}?\\}`, 'gi');
            text = text.replace(reg, String(v));
        }
        return text;
    }

    // =========================================================================
    // 3. MOVE REVIEW DIALOGUE POOLS (10 CATEGORIES x 12-15+ VARIANTS x VI & EN)
    // =========================================================================
    const MOVE_REVIEW_POOLS = {
        vi: {
            Brilliant: [
                "Tuyệt đỉnh nhãn quan! Pha thí quân chói sáng mang dáng dấp của một Đại kiện tướng. {Actor} đã nhìn thấy viễn cảnh sâu sắc mà đối thủ không thể lường trước.",
                "Thần sầu quỷ khốc! Pha hy sinh {piece} quả cảm xé toang phòng tuyến {other}, biến thế cờ thành một kiệt tác tấn công.",
                "Đẳng cấp Grandmaster! {Actor} dâng tặng vật chất để đổi lấy thế công vũ bão và quyền kiểm soát tuyệt đối trên toàn bàn cờ.",
                "Nước cờ thiên tài! Sự hy sinh đầy dũng cảm mở toang cửa vào thành lũy của {other}, tạo thế công không thể ngăn cản.",
                "Một siêu phẩm chiến thuật! {Actor} sẵn sàng bỏ lại {piece} để kích hoạt đòn phối hợp sát thương cao nhất ván đấu.",
                "Quá ảo diệu! Nhãn quan sắc bén giúp {Actor} biến một tình huống tưởng chừng bất lợi thành ngòi nổ hủy diệt.",
                "Bản lĩnh phi thường! Nước đi này thách thức mọi nguyên lý thông thường để đạt được thắng lợi chiến lược áp đảo.",
                "Chiến thuật chói lóa! {Actor} nhìn thấu mọi toan tính của {other} bằng một pha thí quân đầy nghệ thuật.",
                "Đỉnh cao tư duy cờ vua! Pha xử lý mẫu mực khiến mọi cỗ máy phân tích đều phải nghiêng mình thán phục.",
                "Một nước cờ để đời! {Actor} biến quân {piece} thành mồi nhử hoàn hảo để giăng chiếc bẫy không lối thoát.",
                "Kinh điển! Nước đi hy sinh phá tan mọi cấu trúc kiên cố, đưa trận đấu vào giai đoạn định đoạt nhanh chóng.",
                "Xuất thần! Không một chút do dự, {Actor} tung cú đấm quyết định khiến {other} hoàn toàn trở tay không kịp."
            ],
            Great: [
                "Tuyệt hay! Nhãn quan chiến thuật tuyệt vời. Đây là nước cờ then chốt duy nhất giúp {actor} cứu vãn tình thế và xoay chuyển cục diện.",
                "Đỉnh cao bản lĩnh! {Actor} đã tìm ra chìa khóa then chốt duy nhất trong mê cung chiến thuật hiểm nghèo.",
                "Cực kỳ chuẩn xác! Nước cờ độc đạo giúp giữ vững ưu thế và dập tắt hy vọng phản kháng của {other}.",
                "Nước đi then chốt! Giữa muôn vàn lựa chọn rủi ro, {Actor} đã chọn đúng con đường tối ưu để làm chủ trận đấu.",
                "Xử lý bậc thầy! Đòn đánh này không chỉ giải tỏa sức ép mà còn kích hoạt lại toàn bộ thế công tiềm năng.",
                "Phòng thủ phản công sắc lẹm! Nước đi duy nhất trên toàn bàn cờ giúp {actor} bảo toàn cơ hội chiến thắng.",
                "Nhãn quan thượng thừa! {Actor} phát hiện ra nước cờ hiểm hóc mà không phải kỳ thủ nào cũng nhìn ra.",
                "Cứu vãn tình thế ngoạn mục! Một nước đi đầy tỉnh táo đưa thế trận từ hiểm nguy trở về trạng thái an toàn.",
                "Đột phá chiến lược! Nước đi phá vỡ thế bế tắc và mở ra hướng tiếp cận hoàn hảo vào trung tâm đối phương.",
                "Chính xác từng milimét! Nước cờ duy trì quyền chủ động và ép {other} phải bước vào biến thể bất lợi.",
                "Rất đẳng cấp! {Actor} khai thác triệt để sơ hở đối phương bằng nước đi chuẩn chỉ và quyết đoán.",
                "Một giải pháp hoàn mỹ! Nước cờ thông minh này khóa chặt mọi nỗ lực phản kích của {other}."
            ],
            Book: [
                "Bài bản như sách giáo khoa! {Actor} đang triển khai quân theo đúng lý thuyết khai cuộc kinh điển.",
                "Khai cuộc mẫu mực! Nước đi chuẩn lý thuyết giúp các quân chiếm lĩnh vị trí lý tưởng ngay từ đầu.",
                "Lý thuyết chuẩn mực! {Actor} nắm rất vững biến thể khai cuộc này và không phạm bất kỳ sai sót nào.",
                "Khởi đầu hoàn hảo! Nước đi nằm trong cẩm nang khai cuộc của các Đại kiện tướng hàng đầu thế giới.",
                "Đúng chuẩn bài! {Actor} phát triển quân nhịp nhàng, tạo nền tảng vững chắc cho giai đoạn trung cuộc.",
                "Khai cuộc sắc nét! Tuân thủ nghiêm ngặt nguyên tắc kiểm soát trung tâm và an toàn cho Vua.",
                "Lý thuyết vững vàng! Nước đi chứng tỏ {Actor} đã chuẩn bị rất kỹ lưỡng về khai cuộc.",
                "Triển khai bài bản! Quân cờ vào đúng vị trí chiến lược mà sách vở luôn khuyên dùng.",
                "Nước đi sách lược! Giúp duy trì nhịp độ ổn định và chuẩn bị cho các đòn tranh chấp trung tâm.",
                "Cổ điển và hiệu quả! Nước khai cuộc chuẩn chỉ tạo đà cho một thế trận bền vững.",
                "Không có gì để chê! Một nước đi chuẩn lý thuyết giúp giữ vững sự cân bằng hoặc nhỉnh hơn.",
                "Khai cuộc mực thước! Từng quân cờ được đưa vào trận địa một cách hết sức tự nhiên."
            ],
            Best: [
                "Lựa chọn hoàn hảo! Đây chính xác là những gì cỗ máy cờ vua mạnh nhất đề xuất. {Actor} đang kiểm soát thế trận rất tốt.",
                "Chuẩn xác tuyệt đối! Nước đi tối ưu nhất giúp duy trì quyền chủ động và gây sức ép tối đa lên {other}.",
                "Không thể hoàn hảo hơn! Nước cờ thể hiện nhãn quan sắc bén của một kỳ thủ có chiều sâu tư duy.",
                "Phương án tối ưu! {Actor} chọn nước đi mạnh nhất trên bàn cờ để thắt chặt thêm vòng vây.",
                "Nước đi số 1 của cỗ máy! Giữ vững lợi thế và không cho {other} bất kỳ cơ hội phản kháng nào.",
                "Cực kỳ thuyết phục! Nước cờ đặt quân {piece} vào vị trí đắc địa nhất, gia tăng tầm kiểm soát tối đa.",
                "Quyết định không thể bắt bẻ! {Actor} phát huy tối đa sức mạnh của toàn đội hình.",
                "Tuyệt vời! Nước đi thông minh nhất giúp thế trận ngày càng vững chắc như bàn thạch.",
                "Nước đi mạnh nhất vị trí này! {Actor} đang thi đấu với sự chính xác của một cỗ máy hàng đầu.",
                "Khóa chặt thế cờ! Lựa chọn tối ưu giúp {Actor} từng bước biến ưu thế nhỏ thành thắng lợi lớn.",
                "Đúng ý đồ chiến thuật! Nước đi tối ưu giải quyết trọn vẹn cả công lẫn thủ.",
                "Xuất sắc! Lựa chọn chính xác nhất giúp đội hình duy trì sự kết nối chặt chẽ và cơ động."
            ],
            Excellent: [
                "Nước đi xuất sắc! {Actor} đang tạo ra áp lực lớn và đặt quân cờ vào vị trí chiến lược cực đẹp.",
                "Rất sắc sảo! Nước đi gần như tối ưu, mở rộng không gian và tăng cường tính liên kết toàn đội hình.",
                "Rất hay! {Actor} đang làm chủ nhịp độ trận đấu và dồn ép {other} vào thế bị động.",
                "Nước cờ đầy uy lực! Duy trì sức ép liên tục và từng bước thu hẹp không gian của {other}.",
                "Đánh giá thế cờ rất tốt! Nước đi giúp quân cờ phát huy tối đa sức mạnh chiến đấu.",
                "Một nước cờ chất lượng cao! {Actor} tiếp tục củng cố vị thế vượt trội trên bàn cờ.",
                "Rất giàu ý tưởng! Nước đi cho thấy {Actor} đang chủ động dẫn dắt thế trận theo ý mình.",
                "Tấn công bài bản! {Actor} liên tục đặt ra những câu hỏi hóc búa cho hàng phòng ngự {other}.",
                "Rất chuẩn mực! Nước cờ mang lại ưu thế rõ rệt và hạn chế tối đa khả năng quấy phá của đối thủ.",
                "Sức ép nghẹt thở! {Actor} đưa thêm viện binh vào tham chiến, chuẩn bị cho đợt công thành.",
                "Cực kỳ hiệu quả! Nước đi gần sát với phương án của máy tính và rất dễ triển khai tiếp.",
                "Chiến thuật tinh tế! Vừa cải thiện vị trí quân vừa ngăn chặn ý đồ tiềm tàng của {other}."
            ],
            Good: [
                "Nước đi tốt! Giữ vững đội hình và tiếp tục kế hoạch chiến lược đã định.",
                "Chắc chắn và vững vàng! {Actor} đang bảo toàn cấu trúc thế trận và kiên nhẫn chờ đón thời cơ.",
                "Hợp lý và an toàn! Nước đi giữ cho thế trận trong tầm kiểm soát mà không gặp rủi ro.",
                "Nước cờ ổn thỏa! Duy trì nhịp độ ổn định và bảo vệ tốt các cứ điểm quan trọng.",
                "Điềm tĩnh và chắc chắn! Không có sai sót, toàn bộ đội hình vẫn giữ được sự phối hợp.",
                "Nước đi tích cực! Giúp các quân hỗ trợ lẫn nhau và hạn chế sơ hở cho {other} khai thác.",
                "Lựa chọn an toàn! Tiếp tục củng cố phòng tuyến và duy trì sức ép vừa phải.",
                "Giữ vững thế cân bằng! Một nước đi vừa vặn không tạo ra bất kỳ sự xáo trộn bất lợi nào.",
                "Nước đi đúng hướng! {Actor} tiếp tục tích lũy từng lợi thế nhỏ trên bàn cờ.",
                "Bình tĩnh triển khai! Kế hoạch thế trận vẫn đang đi đúng quỹ đạo dự kiến.",
                "Chắc tay! Nước cờ cho thấy sự tập trung và tuân thủ kỷ luật chiến thuật tốt.",
                "Tốt! Thế trận vẫn rất ổn định và sẵn sàng cho các biến chuyển tiếp theo."
            ],
            Inaccuracy: [
                "Chưa phải là tối ưu. Nước đi này hơi thụ động và nhường lại một chút quyền chủ động cho {other}.",
                "Hơi chệch hướng! {Actor} đã bỏ lỡ một phương án sắc bén hơn, tạo khoảng thở cho {other} củng cố phòng ngự.",
                "Hơi vội vàng! Nước {move} không gây đủ sức ép và để {other} dễ dàng hóa giải.",
                "Phương án này hơi thiếu chính xác! Lẽ ra {bestMove} sẽ giúp {actor} duy trì thế chủ động vượt trội.",
                "Đánh mất một chút ưu thế! Nước đi chưa khai thác hết tiềm năng vị trí của các quân cờ.",
                "Hơi non tay! {Actor} tạo điều kiện cho đối phương đơn giản hóa thế trận.",
                "Chưa thật sự sắc sảo. {bestMove} sẽ tạo nhiều đe dọa trực tiếp hơn so với nước {move}.",
                "Nước đi có phần gượng ép, khiến nhịp tấn công của {actor} bị chững lại một nhịp.",
                "Hơi lỏng lẻo! Nước đi này để lại một chút kẽ hở mà {other} có thể tận dụng để phản công.",
                "Chưa phải đòn đánh mạnh nhất. {Actor} vô tình để đối thủ có thời gian tổ chức lại phòng tuyến.",
                "Hơi chậm chạp! Ở vị trí này, tốc độ ra đòn là then chốt, {bestMove} sẽ nhanh hơn một nhịp.",
                "Một chút thiếu sót nhỏ! Thế trận vẫn ổn nhưng {actor} vừa đánh rơi cơ hội gia tăng sức ép."
            ],
            Mistake: [
                "Một quyết định vội vàng! Nước đi này làm suy yếu cấu trúc phòng ngự và mở ra cơ hội phản công cho {other}.",
                "Sai lầm đáng tiếc! {Actor} đã để lộ điểm yếu chết người, {bestMove} sẽ giữ thế trận vững chắc hơn.",
                "Cẩn thận! Nước {move} vô tình mở toang cánh Vua, đặt {actor} vào thế đối đầu đầy rủi ro.",
                "Sơ hở chiến thuật! Nước đi này đánh mất phần lớn ưu thế dày công xây dựng từ đầu trận.",
                "Mất kiểm soát trung tâm! {Actor} để {other} chớp lấy thời cơ tràn lên gây áp lực nặng nề.",
                "Nước cờ tai hại! Vừa tự trói chân các quân cờ vừa tạo mục tiêu tấn công rõ ràng cho đối thủ.",
                "Đòn xử lý lúng túng! {bestMove} lẽ ra là giải pháp hoàn hảo để tránh mọi hiểm họa sắp tới.",
                "Báo động! {Actor} vừa tự làm phức tạp hóa tình hình theo hướng hoàn toàn bất lợi cho mình.",
                "Sai sót nghiêm trọng! {other} có thể tung đòn phản công chớp nhoáng trừng phạt nước đi này.",
                "Đánh mất nhịp độ quan trọng! Nước cờ khiến hàng phòng ngự {actor} bị chia cắt nghiêm trọng.",
                "Một bước lùi đáng tiếc! {Actor} đánh giá sai mức độ đe dọa của đối phương.",
                "Bị động hoàn toàn! Sai lầm này buộc {actor} phải co cụm chống đỡ trong các nước tiếp theo."
            ],
            Miss: [
                "Bỏ lỡ cơ hội vàng! Một đòn trừng phạt quyết định vừa vuột khỏi tầm tay của {actor}.",
                "Tiếc quá! Bạn vừa bỏ lỡ cơ hội tung đòn quyết định với {bestMove} để kết liễu trận đấu.",
                "Bỏ lỡ thời cơ chiến thuật! {Actor} đã có thể bắt trọn quân hoặc tạo ưu thế thắng điểm áp đảo.",
                "Cơ hội ngàn vàng trôi qua! {bestMove} lẽ ra đã bẻ gãy hoàn toàn cấu trúc phòng ngự của {other}.",
                "Đáng tiếc! {Actor} quá tập trung phòng thủ mà bỏ qua đòn phản công sắc lẹm ngay trước mắt.",
                "Bỏ lỡ đòn kết liễu! Một pha phối hợp tuyệt đẹp đã bị lãng quên trong sự vội vã.",
                "Quá đáng tiếc! {other} vừa để lộ sơ hở lớn nhưng {actor} lại không kịp thời trừng phạt.",
                "Vuột mất ưu thế thắng! {bestMove} sẽ đưa ván đấu vào tầm tay với lợi thế vật chất cực lớn.",
                "Một pha bỏ lỡ đau đớn! Cục diện ván cờ lẽ ra đã được định đoạt ngay tại thời điểm này.",
                "Bỏ lỡ cơ hội lật ngược thế cờ! Một nước đi quyết đoán có thể cứu vãn cả trận chiến.",
                "Chưa kịp nhìn ra đòn đánh hiểm! {bestMove} là chìa khóa mở toang cánh cửa chiến thắng.",
                "Thời cơ vuột mất! {Actor} cần bình tĩnh quan sát toàn bàn cờ để không bỏ sót các đòn phối hợp."
            ],
            Blunder: [
                "Sai lầm chí mạng! {Actor} đã để lộ sơ hở nghiêm trọng khiến thế trận rơi vào nguy hiểm cận kề.",
                "Cú sảy chân thảm họa! Nước đi này dâng tặng lợi thế lớn cho {other} và đối mặt tổn thất lực lượng nặng nề.",
                "Báo động đỏ! Nước {move} vô tình mở toang cánh Vua và đặt số phận ván cờ vào thế ngàn cân treo sợi tóc.",
                "Trời ơi, sơ hở chết người! Quân cờ bị treo không ai bảo vệ, đối thủ có thể ăn gọn mà không tốn công sức.",
                "Một sai lầm không thể cứu vãn! Cục diện ván đấu bị đảo chiều 180 độ chỉ sau một nước cờ bất cẩn.",
                "Đổ vỡ toàn bộ thế trận! {Actor} đã đánh mất hoàn toàn quyền kiểm soát vào tay {other}.",
                "Thiếu quan sát tai hại! Nước đi này dẫn tới thảm họa mất quân nặng hoặc bị chiếu hết ép buộc.",
                "Cú sốc chiến thuật! {bestMove} mới là nước đi cứu mạng, còn nước {move} này là một thảm họa thực sự.",
                "Mất tập trung đáng tiếc! Một nước đi biến ván cờ đang cân bằng thành thế thua điểm không lối thoát.",
                "Sập bẫy đối phương! {Actor} đi thẳng vào tầm ngắm sát thương của đối thủ mà không hề hay biết.",
                "Khủng hoảng phòng ngự! Hàng rào bảo vệ Vua bị xé toạc, đối phương có thể tung đòn kết liễu ngay.",
                "Thảm kịch trên bàn cờ! Một nước đi khiến mọi nỗ lực từ đầu trận tan thành mây khói."
            ]
        },
        en: {
            Brilliant: [
                "Brilliant move! A breathtaking piece sacrifice worthy of a Grandmaster. {Actor} foresaw a deep tactical truth that blindsided {other}!",
                "Absolute genius! A courageous {piece} sacrifice that tears open enemy lines and turns the game into a masterpiece of attacking chess!",
                "Grandmaster level! Material was offered to claim total board dominance and an unstoppable initiative!",
                "A true stroke of genius! Offering up the {piece} dismantles the enemy citadel with unmatched attacking momentum.",
                "Masterpiece tactical blow! {Actor} fearlessly parted with material to unleash the most lethal sequence of the game.",
                "Incredible foresight! Sharp tactical intuition turned an apparent concession into a devastating breakthrough.",
                "Extraordinary bravery! Defying standard material dogma to secure an overwhelming strategic victory.",
                "Dazzling tactics! {Actor} saw straight through {other}'s plans with a piece sacrifice of pure artistry.",
                "Peak chess mastery! A model execution that commands the respect of any chess engine in the world.",
                "An unforgettable strike! {Actor} turned the {piece} into irresistible bait, ensnaring the opponent completely.",
                "A classic beauty! Shattering the enemy structure to bring the fight to an immediate, decisive climax.",
                "Peerless brilliance! Without hesitation, {Actor} delivered the tactical hammer blow that left {other} defenseless."
            ],
            Great: [
                "Great move! Outstanding tactical vision. This was the only move to preserve the advantage and turn the tables.",
                "Peak composure under fire! {Actor} uncovered the solitary winning thread within a treacherous tactical labyrinth.",
                "Laser precision! The only viable move on the board to sustain the upper hand and extinguish enemy counterplay.",
                "A pivotal breakthrough! Amid countless dangerous temptations, {Actor} navigated the razor-sharp path to victory.",
                "Masterful defensive conversion! Not only repelling the immediate threat, but reigniting your full attacking potential.",
                "Lethal counter-punch! The sole resource on the entire board to safeguard your winning prospects.",
                "Exceptional depth! {Actor} spotted a subtle, venomous continuation that most players would miss.",
                "Spectacular salvation! An ice-cold decision that steered the position away from mortal danger back into safety.",
                "Strategic triumph! Cracking the deadlock and securing direct central access into the opponent's territory.",
                "Precise to the millimeter! Clamping down on the initiative and forcing {other} into an untenable variation.",
                "World-class execution! Capitalizing mercilessly on the smallest enemy crack with decisive resolve.",
                "The textbook antidote! A flawless response that completely shuts down any potential comeback."
            ],
            Book: [
                "Right out of the textbook! {Actor} follows well-established opening theory with precision.",
                "Model opening play! Standard theory stations the pieces on their most harmonious initial squares.",
                "Flawless theoretical execution! {Actor} knows this variation inside and out, keeping a solid grip.",
                "Ideal start! This move directly matches the opening repertoire of elite Grandmasters.",
                "Textbook accuracy! Smooth piece development creates a rock-solid springboard for the middlegame.",
                "Crisp opening play! Strictly adhering to the golden laws of central control and King security.",
                "Deep opening preparation! This move shows thorough understanding of the strategic landscape.",
                "Methodical setup! The piece lands exactly where grandmaster manuals insist it belongs.",
                "Strategic opening choice! Keeping a disciplined tempo and prepping for key central breaks.",
                "Classical and efficient! A sound opening move that paves the way for sustainable long-term play.",
                "No flaws to be found! Maintaining an effortless theoretical balance with plenty of ambition.",
                "By the book! Every piece joins the formation in an organic, harmonious sequence."
            ],
            Best: [
                "Best move on the board! Exactly what top engine analysis recommends. {Actor} commands the position expertly.",
                "Absolute perfection! The most optimal continuation to maintain the initiative and suffocate {other}.",
                "Could not be any better! Reflects the deep positional intuition and tactical clarity of a seasoned master.",
                "The optimal solution! {Actor} chooses the strongest available move to tighten the noose.",
                "Top engine choice! Solidifying the advantage without affording {other} a single breath of counterplay.",
                "Utterly convincing! Anchoring the {piece} onto its ideal square to maximize firepower across the board.",
                "An unassailable decision! Extracting the absolute highest efficiency out of the whole team.",
                "Superb accuracy! The smartest path forward, cementing the position into an impenetrable fortress.",
                "The undisputed top engine line! {Actor} operates with the ruthless precision of Stockfish.",
                "Locking down the game! The optimal choice to steadily convert an edge into a full point.",
                "Tactical clarity at its finest! Resolving offensive pressure and defensive duties in a single stroke.",
                "First-rate chess! Harmonizing the army's coordination and keeping tactical mobility at its peak."
            ],
            Excellent: [
                "Excellent move! {Actor} mounts serious pressure and places the piece on a dominant outpost.",
                "Razor-sharp! Very close to optimal, expanding territory and tightening overall piece cohesion.",
                "Great command! {Actor} dictates the tempo of the fight, pushing {other} onto the defensive.",
                "A forceful maneuver! Sustaining relentless pressure and gradually starving {other} of space.",
                "Superb board evaluation! This move unlocks the full fighting potential of the deployed forces.",
                "High-caliber play! {Actor} reinforces a commanding positional grip across the board.",
                "Rich strategic intent! Showing complete command in steering the fight according to your agenda.",
                "Methodical offensive! Posing persistent, awkward tactical dilemmas for {other}'s backline.",
                "Disciplined excellence! Yielding a tangible upper hand while neutralizing enemy disruption.",
                "Suffocating grip! Bringing decisive reinforcements into the theater of operations.",
                "Highly effective! Tracking engine recommendations closely and opening up clear winning plans.",
                "Subtle mastery! Simultaneously improving piece placement while preempting enemy aspirations."
            ],
            Good: [
                "Solid move! Keeping the formation compact and pressing ahead with the strategic plan.",
                "Sturdy and reliable! Keeping forces compact and waiting for the right moment to strike.",
                "Sensible and safe! Retaining positional control without taking on unneeded tactical risks.",
                "A dependable move! Preserving steady rhythm and guarding all critical outposts diligently.",
                "Calm and composed! Zero missteps; the army remains united and coordinated.",
                "Constructive play! Fostering mutual piece protection and leaving nothing loose for {other}.",
                "A safe, grounded choice! Fortifying the ramparts and maintaining healthy board pressure.",
                "Preserving the balance! A measured continuation that avoids creating unnecessary liabilities.",
                "Moving in the right direction! Steadily accumulating micro-advantages across the board.",
                "Patient mobilization! The strategic blueprint unfolds in steady, orderly fashion.",
                "Solid technique! Demonstrating admirable focus and tactical discipline.",
                "Good move! The position stays secure and well-poised for future tactical breakthroughs."
            ],
            Inaccuracy: [
                "Suboptimal move. A bit too passive, letting the grip loosen and handing initiative to {other}.",
                "Slightly off the mark! There were more ambitious alternatives available that keep {other} on the ropes.",
                "A bit rushed! The move {move} lacks real sting, allowing {other} to breathe and regroup.",
                "Imprecise continuation! {bestMove} would have retained a far more stifling grip on the game.",
                "Relinquishing a fraction of the advantage! Falling short of maximizing your positional leverage.",
                "A touch naive! Allowing the opponent an easy avenue toward simplification.",
                "Lacking clinical bite! {bestMove} would have applied far more direct pressure than {move}.",
                "Somewhat awkward! The move stutters your offensive momentum for a vital tempo.",
                "A little loose! Leaving a minor seam in the position that {other} can seek to probe.",
                "Not the sharpest blow! Affording the opponent time to reorganize their defensive perimeter.",
                "A step too slow! Speed is paramount here, and {bestMove} was decidedly faster.",
                "A minor slip! The position remains viable, but a golden opportunity to squeeze was missed."
            ],
            Mistake: [
                "A hasty decision! This move weakens the defensive structure and gives {other} a golden counterchance.",
                "Costly slip! {Actor} ceded critical board space and gave away the strategic upper hand.",
                "Caution required! The move {move} prematurely unmasks the King, entering high-risk territory.",
                "Tactical stumble! Forfeiting a major portion of the hard-earned advantage built so far.",
                "Surrendering central control! Letting {other} seize the moment and mount dangerous pressure.",
                "Detrimental maneuver! Tying down your own pieces while offering the enemy a clear target.",
                "Awkward handling! {bestMove} was the clean remedy to avert imminent complications.",
                "Alarm bells! Unnecessarily complicating the fight in a distinctly unfavorable manner.",
                "Serious inaccuracy! {other} can jump on this misstep with an immediate counter-strike.",
                "Losing a vital tempo! The defensive barrier gets severed, inviting trouble inside.",
                "Regrettable regression! Misjudging the severity of the opponent's counterplay.",
                "Pushed onto the back foot! This mistake leaves {actor} scrambling to patch up holes."
            ],
            Miss: [
                "Missed opportunity! A decisive sequence slipped away from {actor} here.",
                "Missed win! A crushing tactical sequence was right there for the taking, but it went unplayed.",
                "Tactical blind spot! {Actor} had a forced route to win material or establish a decisive bind.",
                "A golden chance slipped by! {bestMove} would have broken the opponent's defensive spine completely.",
                "So close! {Actor} focused too narrowly on defense and missed a razor-sharp counter-blow.",
                "Missed the knockout! A picturesque tactical combination went unnoticed in the heat of battle.",
                "Painful omission! {other} left the door wide open, but the punishment was not dealt.",
                "Letting victory slip! {bestMove} would have wrapped up the game with an overwhelming edge.",
                "A crushing opportunity went begging! The contest could have been effectively settled right here.",
                "Missed turnaround! A sharp, courageous continuation was there to turn the tables.",
                "Overlooking the tactical strike! {bestMove} was the master key to crack the position.",
                "Momentum lost! Pausing to survey the full board would have revealed the winning tactic."
            ],
            Blunder: [
                "A catastrophic blunder! A lethal vulnerability was opened that puts the position in grave danger.",
                "Disaster strikes! This move hands over massive material or a crushing attack to {other}.",
                "Red alert! The move {move} blows the King's shelter wide open, leaving the game hanging by a thread.",
                "Heartbreaking oversight! A piece was left undefended, free for the opponent to harvest without cost.",
                "Fatal miscalculation! The trajectory of the game swings violently in a single careless heartbeat.",
                "Positional collapse! {Actor} loses all control, gifting the initiative directly to {other}.",
                "Costly lapse in board awareness! This directly invites heavy material loss or forced checkmate.",
                "Shocking blunder! {bestMove} was the mandatory lifeline, while {move} invites sheer ruin.",
                "A painful lapse in concentration! Turning a balanced fight into a hopeless deficit.",
                "Walking straight into the crosshairs! Stepping squarely into enemy artillery without realizing it.",
                "Defensive catastrophe! The royal barricades are shattered, leaving the King utterly exposed.",
                "Tragedy on the board! A single misstep that wipes away all the fine work achieved earlier."
            ]
        }
    };

    // =========================================================================
    // 4. CONTEXTUAL BRANCHING SPECIAL POOLS
    // =========================================================================
    const CONTEXT_POOLS = {
        vi: {
            checkmate: [
                "{san}: Đòn chiếu hết sấm sét! {Actor} tung cú đấm quyết định hạ gục đối thủ và khép lại ván cờ trong vinh quang!",
                "{san}: Chiếu hết tuyệt hảo! Một pha kết liễu lạnh lùng và chuẩn xác đến từng milimét, không cho Vua đối phương lối thoát!",
                "{san}: Chiến thắng vang dội! {Actor} đã giăng lưới bủa vây hoàn hảo, kết thúc trận đấu bằng đòn chiếu hết ngoạn mục!",
                "{san}: Tuyệt đỉnh kết thúc! Vua đối thủ hoàn toàn bị phong tỏa, một chiến thắng thuyết phục và áp đảo!"
            ],
            castling: [
                "{san}: Nhập thành mẫu mực! Đưa Vua lui về pháo đài kiên cố sau bức tường Tốt và kích hoạt Xe sẵn sàng tham chiến!",
                "{san}: Khóa chặt pháo đài Vua! Nước cờ hoàn tất khâu an toàn và kết nối song Xe kiểm soát các cột trung tâm!",
                "{san}: An toàn là số 1! {Actor} đưa Vua vào nơi ẩn nấp an toàn và lập tức đưa hỏa lực nặng vào trận địa!",
                "{san}: Bước ngoặt an toàn! Vua được che chắn kỹ càng, chuẩn bị cho những đợt công phá trung cuộc!"
            ],
            captureTrade: [
                "{san}: Đòn ăn quân dứt khoát! {Actor} dùng {piece} tiêu diệt {captured} tại {square}, giành ưu thế vật chất và mở rộng hỏa lực!",
                "{san}: Quyết định đổi quân chuẩn xác! Dọn sạch chướng ngại vật tại {square} và mở toang hướng tiến công!",
                "{san}: Trảm tướng đoạt thành! Một pha ra đòn lạnh lùng triệt hạ quân lực đối phương ngay trên ô {square}!",
                "{san}: Thu hồi vật chất quan trọng! {Actor} trừng phạt sơ hở của đối phương bằng pha bắt quân chuẩn xác."
            ],
            comeback: [
                "{san}: Bản lĩnh lội ngược dòng! Nước cờ kiên cường giúp {actor} từng bước lật ngược thế cờ từ tình thế ngặt nghèo!",
                "{san}: Cú bứt phá ngoạn mục! {Actor} không bỏ cuộc và vừa tìm ra cơ hội vàng để xoay chuyển toàn bộ cục diện!",
                "{san}: Tinh thần thép! Giữa muôn vàn khó khăn, {Actor} đã giật lại quyền chủ động và thắp sáng hy vọng chiến thắng!",
                "{san}: Đảo chiều ngoạn mục! Một nước đi quả cảm khiến đối thủ đánh mất thế thượng phong và rơi vào lúng túng!"
            ]
        },
        en: {
            checkmate: [
                "{san}: Crushing checkmate! {Actor} delivers the knockout blow to seal a glorious victory!",
                "{san}: Flawless checkmate! A cold-blooded and razor-sharp finish leaving the enemy King nowhere to run!",
                "{san}: Resounding victory! {Actor} spun an inescapable mating net to conclude the game in style!",
                "{san}: The ultimate coup de grâce! The opposing King is completely cornered — a masterclass finish!"
            ],
            castling: [
                "{san}: Textbook castling! Tucking the King behind solid pawns while mobilizing the Rook for battle!",
                "{san}: Fortifying the King! Securing safety and connecting the rooks to dominate the central files!",
                "{san}: King safety first! {Actor} moves the monarch to refuge and brings heavy artillery into play!",
                "{san}: Fortress established! The King is secured, setting the stage for aggressive middlegame clashes!"
            ],
            captureTrade: [
                "{san}: Decisive strike! {Actor} captures the {captured} on {square} with the {piece}, securing material and opening lines!",
                "{san}: Accurate trade! Clearing away the defender on {square} to unlock dangerous attacking runways!",
                "{san}: Clinical elimination! Cold-blooded removal of the enemy {captured} right on {square}!",
                "{san}: Tangible material gain! Punishing an opponent inaccuracy with a crisp capture on {square}."
            ],
            comeback: [
                "{san}: Incredible comeback spirit! A resilient move that turns the tide from a desperate situation!",
                "{san}: Spectacular turnaround! {Actor} refused to yield and seized the golden opportunity to flip the script!",
                "{san}: Nerves of steel! Under extreme pressure, {Actor} wrestles back the initiative and revives winning hopes!",
                "{san}: Breathtaking momentum shift! A brave move that catches the opponent off guard and levels the playing field!"
            ]
        }
    };

    // =========================================================================
    // 5. DYNAMIC MOVE REVIEW COMMENT GENERATOR
    // =========================================================================
    function getDynamicCoachComment({
        san = '',
        category = 'Good',
        moveIndex = 1,
        isUserMove = true,
        lang = 'vi',
        move = {},
        prevPos = null,
        currPos = null,
        bestSan = ''
    }) {
        const isEn = (lang === 'en');
        const dict = MOVE_REVIEW_POOLS[lang] || MOVE_REVIEW_POOLS.vi;
        const contextDict = CONTEXT_POOLS[lang] || CONTEXT_POOLS.vi;

        const pieceCode = (move.piece || (san.length > 0 && ['N','B','R','Q','K'].includes(san[0]) ? san[0].toLowerCase() : 'p')).toLowerCase();
        const capturedCode = move.captured ? move.captured.toLowerCase() : null;

        const pDict = PIECE_NAMES[lang] || PIECE_NAMES.vi;
        const pieceName = pDict[pieceCode] || (isEn ? 'piece' : 'quân cờ');
        const capturedName = capturedCode ? (pDict[capturedCode] || (isEn ? 'piece' : 'quân cờ')) : '';

        const square = move.to || (san.replace(/[^a-h1-8]/g, '').slice(-2) || '');
        const fromSquare = move.from || '';

        const actor = isEn ? (isUserMove ? 'you' : 'your opponent') : (isUserMove ? 'bạn' : 'đối thủ');
        const Actor = isEn ? (isUserMove ? 'You' : 'Your opponent') : (isUserMove ? 'Bạn' : 'Đối thủ');
        const other = isEn ? (isUserMove ? 'your opponent' : 'you') : (isUserMove ? 'đối thủ' : 'bạn');
        const Other = isEn ? (isUserMove ? 'Your opponent' : 'You') : (isUserMove ? 'Đối thủ' : 'Bạn');

        const moveNumber = Math.ceil(moveIndex / 2);
        let phase = 'middlegame';
        if (moveNumber <= 10) phase = 'opening';
        else if (currPos && currPos.fen) {
            const pieceCount = (currPos.fen.split(' ')[0].match(/[nbrqNBRQ]/g) || []).length;
            if (pieceCount <= 4) phase = 'endgame';
        }
        const phaseName = PHASE_NAMES[lang][phase] || phase;

        // Tính toán chênh lệch thế trận nếu có
        let isComeback = false;
        if (prevPos && prevPos.eval && currPos && currPos.eval) {
            const moverSign = (move.color === 'w') ? 1 : -1;
            const prevCp = (prevPos.eval.cpWhite !== null ? prevPos.eval.cpWhite : (prevPos.eval.mateWhite > 0 ? 9999 : -9999)) * moverSign;
            const currCp = (currPos.eval.cpWhite !== null ? currPos.eval.cpWhite : (currPos.eval.mateWhite > 0 ? 9999 : -9999)) * moverSign;
            if (prevCp <= -200 && currCp >= -30 && (category === 'Brilliant' || category === 'Great' || category === 'Best')) {
                isComeback = true;
            }
        }

        const vars = {
            san: san,
            move: san,
            piece: pieceName,
            captured: capturedName,
            square: square,
            from: fromSquare,
            bestMove: bestSan || (isEn ? 'the engine recommendation' : 'nước gợi ý tốt nhất'),
            actor: actor,
            Actor: Actor,
            other: other,
            Other: Other,
            phase: phaseName
        };

        // 1. Phân nhánh Chiếu hết (#)
        if (san.includes('#')) {
            const phrase = pickDynamicPhrase(`mate_${lang}`, contextDict.checkmate, vars);
            return phrase;
        }

        // 2. Phân nhánh Lội ngược dòng (Comeback)
        if (isComeback) {
            const phrase = pickDynamicPhrase(`comeback_${lang}`, contextDict.comeback, vars);
            return phrase;
        }

        // 3. Phân nhánh Nhập thành
        if (san === 'O-O' || san === 'O-O-O') {
            const phrase = pickDynamicPhrase(`castle_${lang}`, contextDict.castling, vars);
            return phrase;
        }

        // 4. Phân nhánh Ăn quân chất lượng cao (nếu Good/Best/Great/Brilliant)
        if (capturedCode && ['Brilliant', 'Great', 'Best', 'Excellent', 'Good'].includes(category)) {
            const phrase = pickDynamicPhrase(`capture_${lang}`, contextDict.captureTrade, vars);
            return phrase;
        }

        // 5. Fallback pool theo Category thông thường với Anti-Repetition
        const pool = dict[category] || dict.Good;
        const phrase = pickDynamicPhrase(`cat_${category}_${lang}`, pool, vars);
        return `${san}: ${phrase}`;
    }

    // =========================================================================
    // 6. MULTI-LEVEL TACTICAL HINTS GENERATOR (12+ CONCEPTS)
    // =========================================================================
    const HINT_CONCEPTS = {
        vi: {
            check: "Tung đòn chiếu trực diện để khuấy đảo vòng phòng thủ và ép Vua đối phương phải lộ diện!",
            mate: "Tung đòn chiếu hết quyết định hạ màn ván đấu ngay lập tức!",
            capture: "Khai thác quân cờ đang nằm trong tầm ngắm để giành lợi thế vật chất và mở đường tấn công!",
            promotion: "Đẩy Tốt phong cấp tạo ra ưu thế vật chất áp đảo định đoạt trận đấu!",
            castling: "Đưa Vua vào pháo đài an toàn và kết nối lực lượng song Xe ra kiểm soát trung tâm!",
            center: "Chiếm lĩnh trung tâm trọng yếu để bóp nghẹt không gian và hạn chế tầm hoạt động của đối thủ!",
            knight: "Cơ động Mã đến tiền đồn tích cực, tỏa sức mạnh kiểm soát các ô chiến lược then chốt!",
            bishop: "Khai thông đường chéo mở cho Tượng ngắm bắn vào cánh Vua và ghìm chặt quân đối phương!",
            rook: "Đưa Xe chiếm lĩnh cột mở trung tâm, chuẩn bị đòn thọc sâu vào hàng ngũ đối phương!",
            queen: "Điều động Hậu gây sức ép đa hướng, khai thác triệt để các ô yếu trong thế trận đối thủ!",
            pawn: "Đột phá Tốt để thách thức chuỗi Tốt đối phương, phá vỡ cấu trúc và mở đường cho đại quân!",
            king: "Linh hoạt di chuyển Vua né tránh các đường ngắm bắn tiềm tàng và củng cố hàng thủ!",
            threat: "Gia tăng áp lực chiến lược, buộc đối phương phải lúng túng co cụm đối phó!"
        },
        en: {
            check: "Deliver a direct check to rattle the enemy King and disrupt defensive coordination!",
            mate: "Deliver the decisive checkmate blow to conclude the match immediately!",
            capture: "Target the vulnerable piece to secure material gains and open new attack routes!",
            promotion: "Push the pawn to promote, unleashing overwhelming material power!",
            castling: "Tuck your King into safety and connect your rooks for central dominance!",
            center: "Stake a claim on key central squares to restrict the opponent's counterplay and breathing room!",
            knight: "Maneuver the Knight to an active outpost, radiating power across vital squares!",
            bishop: "Open long diagonals for the Bishop to pierce enemy lines and create uncomfortable pins!",
            rook: "Seize the open file with the Rook, preparing heavy artillery penetration into the enemy camp!",
            queen: "Deploy the Queen to apply multi-directional pressure and strike at opponent structural flaws!",
            pawn: "Push the pawn to challenge enemy chains, shattering structure and opening runways!",
            king: "Prophylactic King maneuver to step out of dangerous pins and strengthen your stronghold!",
            threat: "Ramp up the pressure, seizing the tempo and forcing the opponent onto the back foot!"
        }
    };

    function generateTacticalHint(fen, moveUci, moveSan = '', lang = 'vi') {
        const isEn = (lang === 'en');
        const concepts = HINT_CONCEPTS[lang] || HINT_CONCEPTS.vi;

        if (!moveUci || moveUci.length < 4) return concepts.threat;

        const toSq = moveUci.slice(2, 4);
        const fromSq = moveUci.slice(0, 2);
        const isPromotion = moveUci.length > 4;

        if (moveSan.includes('#')) return concepts.mate;
        if (moveSan.includes('+')) return concepts.check;
        if (isPromotion) return concepts.promotion;
        if (moveSan === 'O-O' || moveSan === 'O-O-O') return concepts.castling;
        if (moveSan.includes('x')) return concepts.capture;

        // Xác định quân đi từ SAN
        const firstChar = moveSan[0] || '';
        if (firstChar === 'N') return concepts.knight;
        if (firstChar === 'B') return concepts.bishop;
        if (firstChar === 'R') return concepts.rook;
        if (firstChar === 'Q') return concepts.queen;
        if (firstChar === 'K') return concepts.king;

        const centerSquares = ['e4', 'd4', 'e5', 'd5', 'c4', 'c5', 'e3', 'd3'];
        if (centerSquares.includes(toSq)) return concepts.center;

        // Nếu là nước Tốt
        if (firstChar.toLowerCase() === firstChar) {
            return concepts.pawn;
        }

        return concepts.threat;
    }

    // =========================================================================
    // 7. DYNAMIC GAME OVER NARRATIVES (8-10 VARIANTS PER SCENARIO)
    // =========================================================================
    const GAME_OVER_POOLS = {
        vi: {
            checkmate_win: [
                "Chiến thắng vang dội! Bạn đã tung đòn chiếu hết tuyệt đỉnh, kết liễu trận chiến không cho đối thủ cơ hội trở tay!",
                "Đòn kết liễu hoàn mỹ! Vua đối phương hoàn toàn sập bẫy trong tấm lưới chiếu hết đầy nghệ thuật của bạn.",
                "Một chiến thắng áp đảo! Toàn bộ đội hình phối hợp nhịp nhàng để tạo nên đòn chiếu hết mẫu mực.",
                "Chiếu hết ngoạn mục! Nhãn quan chiến thuật sắc sảo đã giúp bạn khép lại ván cờ với chiến thắng tuyệt đối.",
                "Đẳng cấp vượt trội! Bạn đã dẫn dắt thế trận từng bước và hạ màn bằng một đòn chiếu hết lạnh lùng.",
                "Kiệt tác tấn công! Bạn bóp nghẹt mọi lối thoát của Vua đối phương và kết thúc ván đấu vẻ vang.",
                "Một ván cờ mãn nhãn! Đòn chiếu hết dứt khoát khẳng định sự thống trị hoàn toàn của bạn trên bàn cờ.",
                "Bản lĩnh nhà vô địch! Bạn đã tìm ra con đường ngắn nhất để chiếu hết đối thủ trong thế trận nghẹt thở."
            ],
            standard_win: [
                "Chiến thắng thuyết phục! Sức ép nghẹt thở bạn tạo ra đã buộc đối thủ phải giương cờ trắng đầu hàng.",
                "Áp đảo toàn diện! Đối phương không thể chịu nổi thế công vũ bão và đành chấp nhận thất bại.",
                "Làm chủ trận địa! Bạn kiểm soát hoàn toàn nhịp độ trận đấu, khiến đối thủ cạn kiệt thời gian và phương án.",
                "Chiến thắng bản lĩnh! Những nước đi chắc chắn và áp lực liên tục đã đánh gục ý chí chiến đấu của đối thủ.",
                "Tuyệt vời! Bạn đã đẩy đối phương vào thế bế tắc không lối thoát, buộc họ phải chấp nhận thất bại.",
                "Thắng lợi xứng đáng! Sự chuẩn xác trong từng nước đi đã bóp nghẹt mọi hy vọng lật ngược thế cờ của đối phương.",
                "Đẳng cấp kiểm soát! Bạn quản lý tốt cả thời gian lẫn thế trận, buộc đối thủ phải đầu hàng tâm phục khẩu phục.",
                "Thế trận một chiều! Bạn từng bước tích lũy ưu thế và kết thúc trận đấu bằng một chiến thắng áp đảo."
            ],
            comeback_win: [
                "Cú lội ngược dòng không tưởng! Từng bị đối thủ dẫn sâu, nhưng tinh thần thép và sự kiên trì đã giúp bạn tạo nên kỳ tích!",
                "Bản lĩnh phi thường! Bạn đã từ cõi chết trở về, lật ngược thế cờ ngoạn mục để giành trọn vẹn chiến thắng!",
                "Đỉnh cao ý chí! Khi thế trận tưởng chừng đã tuột khỏi tầm tay, bạn đã chớp lấy thời cơ trừng phạt sai sót của đối thủ.",
                "Một chiến thắng để đời! Màn lội ngược dòng rực rỡ chứng minh rằng ván cờ chỉ kết thúc khi Vua bị chiếu hết.",
                "Tinh thần bất khuất! Bạn không hề nao núng khi gặp bất lợi và đã kiên nhẫn giăng bẫy lật kèo thành công!",
                "Kịch bản nghẹt thở! Một cú lội ngược dòng kinh điển khiến đối phương không kịp hiểu chuyện gì vừa xảy ra.",
                "Kiên cường tuyệt đối! Bạn biến tình huống hiểm nghèo thành bệ phóng cho một màn ngược dòng mãn nhãn.",
                "Bản lĩnh Grandmaster! Giữ vững sự điềm tĩnh trước sóng gió và trừng phạt đối thủ ở khoảnh khắc quyết định."
            ],
            defeat: [
                "Đừng nản lòng! Ván đấu này có rất nhiều ý tưởng hay. Hãy xem lại {lossDesc} để tích lũy thêm kinh nghiệm cho ván sau nhé.",
                "Thất bại là người thầy tốt nhất! Hãy mở Tab Key Moves để phân tích {lossDesc} và hoàn thiện hơn ở các ván tới.",
                "Một trận chiến kiên cường! Dù chưa giành thắng lợi, hãy cùng Huấn luyện viên xem lại {lossDesc} để ngày càng sắc bén hơn.",
                "Hãy giữ vững đam mê! Một vài nước xử lý vội vàng đã khiến thế trận đổi chiều. Xem lại {lossDesc} để nâng tầm kỳ nghệ!",
                "Không sao cả, hãy học từ ván đấu này! Hãy chú ý hơn đến {lossDesc} — chỉ cần khắc phục điểm này, Elo của bạn sẽ tăng vọt!",
                "Một ván cờ đầy trải nghiệm! Rút ra bài học từ {lossDesc} sẽ giúp bạn thi đấu bản lĩnh hơn rất nhiều trong tương lai.",
                "Cố gắng ở ván sau nhé! Hãy dành 1 phút xem lại {lossDesc} để không lặp lại sơ hở trong các ván đấu tiếp theo.",
                "Vấp ngã để trưởng thành! Hãy xem phần Giải thích của Huấn luyện viên tại {lossDesc} để nâng cao nhãn quan chiến thuật."
            ],
            draw: [
                "Một ván đấu cân tài cân sức! Cả hai bên đều thể hiện khả năng tính toán chuẩn xác và sự kiên cường đáng nể.",
                "Hòa cờ đẹp mắt! Sự giằng co quyết liệt từng ô cờ đã khép lại với kết quả công bằng cho đôi bên.",
                "Đấu trí đỉnh cao! Bạn đã phòng thủ kiên cường và hóa giải mọi mưu đồ tấn công của đối thủ để chia điểm xứng đáng.",
                "Bất phân thắng bại! Một màn so tài căng thẳng từ khai cuộc tới tàn cuộc với chất lượng chuyên môn rất cao.",
                "Chia điểm sòng phẳng! Thế cờ hòa chứng tỏ sự tập trung và bản lĩnh phòng ngự chắc chắn của bạn.",
                "Cân bằng hoàn hảo! Không bên nào để lộ sơ hở chí mạng, một ván cờ thể hiện sự chín chắn trong lối chơi.",
                "Hòa trong thế trận nảy lửa! Dù có nhiều sóng gió chiến thuật, bạn đã duy trì sự ổn định để bảo toàn tỷ số hòa.",
                "Kết quả xứng đáng! Cả hai kỳ thủ đều xứng đáng nhận được lời khen ngợi cho tinh thần thi đấu bền bỉ."
            ]
        },
        en: {
            checkmate_win: [
                "Resounding victory! You delivered a sensational checkmate, leaving your opponent with zero answers!",
                "Flawless finish! The enemy King was completely caught in your masterfully woven mating net.",
                "Dominant triumph! Perfect piece harmony culminated in a textbook, irresistible checkmate.",
                "Spectacular checkmate! Your sharp tactical vision sealed an absolute and well-deserved victory.",
                "Masterclass execution! You directed the board with composure and closed the show with cold precision.",
                "Attacking masterpiece! You smothered every enemy escape square and claimed a glorious win.",
                "Thrilling display! A decisive checkmate that emphatically confirmed your total control.",
                "Champion's mindset! You found the sharpest path to deliver mate in a high-octane battle."
            ],
            standard_win: [
                "Convincing win! The relentless pressure you applied forced your opponent to throw in the towel.",
                "Total domination! Your opponent simply could not withstand your fierce onslaught.",
                "Board mastery! You controlled the clock and the board, leaving your opponent out of time and ideas.",
                "Resilient triumph! Steady moves and sustained pressure broke your opponent's defensive will.",
                "Superb victory! You drove the position into an impasse, leaving no alternative but resignation.",
                "Well-deserved win! Surgical precision suffocated all hopes of an opponent counterattack.",
                "Mastery of control! Flawless time and positional management forced an undisputed surrender.",
                "One-sided triumph! You accumulated incremental gains and converted smoothly into a clean victory."
            ],
            comeback_win: [
                "Incredible comeback! Trailing by a wide margin earlier, your nerves of steel forged an unforgettable miracle!",
                "Extraordinary resilience! You rose from the ashes and pulled off a stunning turnaround to win!",
                "Peak fighting spirit! When the game seemed lost, you stayed alert and seized the decisive counter-strike.",
                "A win for the ages! A glorious comeback proving that a chess game is never over until the final handshake.",
                "Unbreakable resolve! You never panicked under pressure and patiently spun a match-winning trap!",
                "Breathless drama! A classic comeback that left your opponent wondering what hit them.",
                "Absolute tenacity! You turned a dire situation into a launching pad for a sensational triumph.",
                "Grandmaster composure! Weathering the storm with poise and delivering justice at the critical juncture."
            ],
            defeat: [
                "Keep your head up! You showed great ideas here. Review {lossDesc} to sharpen your skills for the next game.",
                "Defeat is the greatest teacher! Jump into Key Moves to analyze {lossDesc} and level up your play.",
                "A brave fight! Even without the win, let's review {lossDesc} together with the Coach to come back sharper.",
                "Stay motivated! A few hasty decisions shifted the balance. Examine {lossDesc} to return even stronger!",
                "No worries, every Master was once a beginner! Focus on {lossDesc} — fixing these will boost your Elo rapidly!",
                "A valuable learning game! Drawing key lessons from {lossDesc} will make your play far more formidable.",
                "On to the next victory! Spend 60 seconds reviewing {lossDesc} so you handle those moments flawlessly next time.",
                "Fall forward! Check out the Coach's Explanations on {lossDesc} to elevate your strategic instincts."
            ],
            draw: [
                "A wonderfully contested battle! Both players displayed razor-sharp calculation and deep resilience.",
                "A handsome draw! Fierce fighting on every square concluded with a fair result for both sides.",
                "High-level chess! You defended resolutely and neutralized every offensive wave to earn a well-deserved point.",
                "Evenly matched! An intense clash from opening to endgame featuring outstanding positional accuracy.",
                "Fair share of points! The draw showcases your solid concentration and rock-solid defensive grit.",
                "Perfect equilibrium! Neither player conceded a fatal flaw — a true sign of chess maturity.",
                "An electric draw! Despite dynamic tactical storms, you held firm to preserve the balance.",
                "Well-deserved outcome! Both warriors deserve high praise for their fighting spirit and tenacity."
            ]
        }
    };

    function getGameOverMessage({
        result = 'draw',
        reason = '',
        gamePositions = [],
        userColor = 'w',
        lang = 'vi'
    }) {
        const isEn = (lang === 'en');
        const pools = GAME_OVER_POOLS[lang] || GAME_OVER_POOLS.vi;
        const normalizedReason = String(reason || '').toLowerCase();
        const isMate = normalizedReason.includes('checkmate') || normalizedReason.includes('checkmated');

        // Thống kê lỗi của người dùng trong ván
        let blunderCount = 0;
        let mistakeCount = 0;
        let missCount = 0;
        let minUserCp = 0;

        if (Array.isArray(gamePositions) && gamePositions.length > 1) {
            const userSign = (userColor === 'w') ? 1 : -1;
            for (let i = 1; i < gamePositions.length; i++) {
                const pos = gamePositions[i];
                if (pos.move && pos.move.color === userColor && pos.classification) {
                    const cat = pos.classification.category;
                    if (cat === 'Blunder') blunderCount++;
                    else if (cat === 'Mistake') mistakeCount++;
                    else if (cat === 'Miss') missCount++;
                }
                if (pos.eval && pos.eval.cpWhite !== null) {
                    const userCp = pos.eval.cpWhite * userSign;
                    if (userCp < minUserCp) minUserCp = userCp;
                }
            }
        }

        let lossDesc = isEn ? 'the critical turning points' : 'các thời điểm then chốt';
        if (blunderCount > 0) {
            lossDesc = isEn ? `${blunderCount} blunder${blunderCount > 1 ? 's' : ''}` : `${blunderCount} nước sai lầm chí mạng`;
        } else if (mistakeCount > 0) {
            lossDesc = isEn ? `${mistakeCount} mistake${mistakeCount > 1 ? 's' : ''}` : `${mistakeCount} nước sai sót`;
        } else if (missCount > 0) {
            lossDesc = isEn ? `${missCount} missed chance${missCount > 1 ? 's' : ''}` : `${missCount} cơ hội bị bỏ lỡ`;
        }

        const vars = {
            blunderCount,
            mistakeCount,
            missCount,
            lossDesc
        };

        if (result === 'win') {
            // Kiểm tra lội ngược dòng: từng bị dẫn sâu <= -250 cp (-2.5 điểm)
            const wasDownDeep = (minUserCp <= -250);
            if (wasDownDeep) {
                return pickDynamicPhrase(`gob_comeback_${lang}`, pools.comeback_win, vars);
            }
            if (isMate) {
                return pickDynamicPhrase(`gob_mate_win_${lang}`, pools.checkmate_win, vars);
            }
            return pickDynamicPhrase(`gob_win_${lang}`, pools.standard_win, vars);
        } else if (result === 'loss') {
            return pickDynamicPhrase(`gob_loss_${lang}`, pools.defeat, vars);
        } else {
            return pickDynamicPhrase(`gob_draw_${lang}`, pools.draw, vars);
        }
    }

    // =========================================================================
    // 8. EXPORTS FOR WINDOW & NODE.JS
    // =========================================================================
    const CoachDialogue = {
        pickDynamicPhrase,
        clearHistory,
        getDynamicCoachComment,
        generateTacticalHint,
        getGameOverMessage,
        PIECE_NAMES,
        PHASE_NAMES,
        MOVE_REVIEW_POOLS,
        CONTEXT_POOLS,
        HINT_CONCEPTS,
        GAME_OVER_POOLS
    };

    if (typeof window !== 'undefined') {
        window.CoachDialogue = CoachDialogue;
        window.pickDynamicPhrase = pickDynamicPhrase;
        window.getDynamicCoachComment = getDynamicCoachComment;
        window.generateTacticalHint = generateTacticalHint;
        window.getGameOverMessage = getGameOverMessage;
    }

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = CoachDialogue;
    }

})(typeof window !== 'undefined' ? window : global);
