UPDATE public.posts SET
title = 'Quy trình nhập - xuất kho chuẩn 5 bước: làm đúng để không thất thoát hàng',
excerpt = 'Quy trình nhập xuất kho 5 bước áp dụng thực tế tại kho hàng TP.HCM: kiểm đếm, đối chiếu chứng từ, sắp xếp vị trí, xuất hàng theo FIFO và chốt tồn cuối ca. Kèm biểu mẫu, định mức nhân công và các lỗi thường gặp.',
category = 'Kho hàng',
focus_keyword = 'quy trình nhập xuất kho',
seo_title = 'Quy trình nhập xuất kho chuẩn 5 bước (áp dụng thực tế 2026)',
seo_description = 'Hướng dẫn quy trình nhập - xuất kho 5 bước chuẩn: kiểm đếm, chứng từ, sắp xếp vị trí, FIFO/FEFO và chốt tồn. Kèm định mức nhân công, biểu mẫu và lỗi hay gặp.',
seo_keywords = 'quy trình nhập xuất kho, quản lý kho hàng, kiểm đếm hàng hóa, FIFO, bốc xếp kho hàng',
canonical_url = 'https://bocxepsaigon.vn/blog/quy-trinh-nhap-xuat-kho-chuan-5-buoc',
og_title = 'Quy trình nhập - xuất kho chuẩn 5 bước',
og_description = 'Từ kiểm đếm đến chốt tồn cuối ca: quy trình nhập xuất kho thực tế tại các kho hàng TP.HCM, kèm định mức nhân công và biểu mẫu.',
author = 'Bốc Xếp Sài Gòn',
tags = ARRAY['kho hàng','quy trình','quản lý tồn kho'],
reading_time = 12,
status = 'published',
published_at = now(),
content = $html$
<p>Phần lớn thất thoát trong kho không đến từ trộm cắp. Nó đến từ những chuyện rất đời thường: xe tới lúc 22h, thủ kho ký nhận cho nhanh rồi mai đếm lại; hàng đặt tạm ở lối đi rồi quên; một pallet bị xếp nhầm ô nên hệ thống báo còn hàng mà thực tế đã xuất. Sau nhiều năm cung cấp nhân công bốc xếp cho kho ở Thủ Đức, Bình Tân, Sóng Thần và các khu công nghiệp lân cận, chúng tôi thấy quy trình nào bỏ bớt bước cũng đều trả giá bằng thời gian kiểm kê cuối tháng.</p>
<p>Bài này mô tả quy trình 5 bước mà đội chúng tôi chạy hằng ngày tại kho khách hàng — không phải lý thuyết trong giáo trình, mà là thứ đã được cắt gọt để một tổ 6-10 người làm được trong ca 8 tiếng.</p>

<h2>Trước khi vào quy trình: 3 thứ phải có sẵn</h2>
<p>Nếu thiếu một trong ba, mọi bước phía sau đều lệch:</p>
<ul>
<li><strong>Sơ đồ kho có mã vị trí.</strong> Tối thiểu là dãy - kệ - tầng (ví dụ A-03-2). Kho nhỏ dưới 500 m² vẫn nên đánh mã bằng sơn hoặc decal, chi phí không đáng kể so với thời gian tìm hàng.</li>
<li><strong>Bộ chứng từ chuẩn.</strong> Phiếu nhập kho, phiếu xuất kho, biên bản hàng hư hỏng, thẻ kho. Dùng giấy hay phần mềm đều được, miễn là có chữ ký hai bên.</li>
<li><strong>Người chịu trách nhiệm duy nhất cho mỗi ca.</strong> Không có chuyện "ai rảnh thì ký".</li>
</ul>

<h2>Bước 1 — Tiếp nhận và kiểm đếm khi hàng về</h2>
<p>Đây là bước duy nhất bạn còn quyền từ chối hàng. Sau khi xe rời kho, mọi sai lệch trở thành vấn đề của bạn.</p>
<p>Thứ tự làm việc chuẩn:</p>
<ol>
<li>Đối chiếu biển số xe, số seal (với container) với phiếu giao hàng trước khi mở cửa.</li>
<li>Chụp ảnh hiện trạng: seal còn nguyên, tình trạng thùng hàng lớp ngoài cùng. Ảnh này cứu bạn khi tranh chấp với hãng vận tải.</li>
<li>Đếm theo đơn vị lớn nhất trước (pallet, kiện), rồi mới bóc mẫu đếm lẻ. Đếm lẻ 100% chỉ áp dụng cho hàng giá trị cao hoặc hàng có lịch sử thiếu.</li>
<li>Tách riêng hàng nghi ngờ hư hỏng ra khu vực "chờ xử lý", không cho nhập chung.</li>
</ol>
<p><strong>Định mức thực tế:</strong> một tổ 6 người dỡ và kiểm đếm hàng bao 25-50 kg từ xe tải 8 tấn mất khoảng 60-90 phút. Hàng thùng carton nhẹ xếp pallet, có xe nâng hỗ trợ, chỉ 30-45 phút. Nếu bên vận chuyển ép bạn xong trong 20 phút, đó là lúc sai sót phát sinh.</p>

<h2>Bước 2 — Đối chiếu chứng từ và xác nhận nhập</h2>
<p>Kiểm đếm xong mới ký, không ký trước. Trên phiếu nhập cần ghi rõ ba con số: số lượng theo chứng từ, số lượng thực nhận, và chênh lệch. Nhiều kho chỉ ghi một con số rồi tự sửa sau — đó là nguồn gốc của tồn ảo.</p>
<p>Với hàng thiếu hoặc hư, lập biên bản ngay tại chỗ, có chữ ký tài xế. Tài xế không ký thì ghi rõ "tài xế từ chối ký" kèm ảnh — vẫn có giá trị khi khiếu nại.</p>
<p>Chỉ khi phiếu nhập được xác nhận, hàng mới được coi là tồn kho và mới được cập nhật lên phần mềm. Cập nhật trước khi kiểm xong là thói quen tai hại phổ biến nhất chúng tôi gặp.</p>

<h2>Bước 3 — Sắp xếp vào vị trí và ghi thẻ kho</h2>
<p>Nguyên tắc sắp xếp gói gọn trong ba ý:</p>
<ul>
<li><strong>Hàng quay vòng nhanh đặt gần cửa xuất.</strong> Phân loại ABC đơn giản: nhóm A (20% mã hàng, 80% lượt xuất) luôn nằm trong bán kính 10 m từ khu vực đóng hàng.</li>
<li><strong>Nặng dưới, nhẹ trên.</strong> Nghe hiển nhiên nhưng đây là nguyên nhân số một của sự cố sập kệ.</li>
<li><strong>Một mã hàng, một vị trí chính.</strong> Nếu buộc phải để hai nơi, ghi rõ vị trí phụ trên thẻ kho, đừng để trong đầu ai đó.</li>
</ul>
<p>Đọc thêm về cách tối ưu mặt bằng trong bài <a href="/blog/cach-sap-xep-pallet-toi-uu-dien-tich-kho">Cách sắp xếp pallet tối ưu diện tích kho</a>.</p>

<h2>Bước 4 — Soạn và xuất hàng theo FIFO/FEFO</h2>
<p>FIFO (nhập trước xuất trước) áp dụng cho hàng công nghiệp; FEFO (hết hạn trước xuất trước) bắt buộc với thực phẩm, dược, hóa mỹ phẩm. Muốn chạy được, mỗi pallet phải dán nhãn ngày nhập hoặc hạn dùng ở mặt hướng ra lối đi — nếu nhân viên phải kéo pallet ra để đọc nhãn, họ sẽ lấy pallet gần nhất.</p>
<p>Quy trình soạn hàng:</p>
<ol>
<li>In phiếu soạn theo tuyến đi trong kho, không in theo thứ tự mã hàng trên đơn. Việc này giảm 20-30% quãng đường di chuyển.</li>
<li>Soạn xong tập kết tại khu staging có kẻ vạch, gắn số đơn.</li>
<li>Kiểm tra chéo: người soạn và người kiểm là hai người khác nhau. Đây là chốt chặn rẻ nhất để chặn giao nhầm.</li>
<li>Chất lên xe theo nguyên tắc điểm giao cuối xếp trong, điểm giao đầu xếp ngoài.</li>
</ol>

<h2>Bước 5 — Chốt tồn cuối ca và bàn giao</h2>
<p>Kết ca không phải là dọn dẹp rồi về. Trong 15-20 phút cuối, tổ trưởng phải:</p>
<ul>
<li>Đối chiếu tổng nhập - tổng xuất - tồn hệ thống với thực tế của 5-10 mã hàng nhóm A (kiểm đếm chu kỳ - cycle count).</li>
<li>Ghi nhận hàng còn dở dang, hàng chờ xử lý, khu vực nào chưa dọn.</li>
<li>Ký sổ bàn giao ca. Ca sau nhận hiện trạng nào thì chịu trách nhiệm từ đó.</li>
</ul>
<p>Kiểm đếm chu kỳ mỗi ngày vài mã hàng tốt hơn nhiều so với kiểm kê toàn kho mỗi quý. Sai lệch phát hiện trong 24 giờ còn truy được nguyên nhân; sai lệch phát hiện sau 3 tháng chỉ còn cách ghi giảm.</p>

<h2>Định mức nhân công tham khảo</h2>
<table>
<thead><tr><th>Loại hàng</th><th>Năng suất/người/giờ</th><th>Ghi chú</th></tr></thead>
<tbody>
<tr><td>Bao 25-50 kg, vác vai</td><td>1,5 - 2,5 tấn</td><td>Cự ly dưới 15 m</td></tr>
<tr><td>Thùng carton 10-20 kg</td><td>2,5 - 4 tấn</td><td>Có băng chuyền tăng 30%</td></tr>
<tr><td>Hàng pallet, có xe nâng</td><td>6 - 10 tấn</td><td>Tính cho cả tổ vận hành</td></tr>
<tr><td>Hàng rời, hàng cồng kềnh</td><td>0,8 - 1,5 tấn</td><td>Cần thêm người cảnh giới</td></tr>
</tbody>
</table>
<p>Con số này dùng để kiểm tra ngược báo giá: nếu nhà thầu hứa 4 người xong 40 tấn hàng bao trong 4 tiếng, tức 2,5 tấn/người/giờ liên tục không nghỉ — thực tế sẽ vỡ tiến độ.</p>

<h2>5 lỗi khiến kho thất thoát nhiều nhất</h2>
<ol>
<li><strong>Ký nhận trước, đếm sau.</strong> Mất quyền khiếu nại.</li>
<li><strong>Để hàng ở lối đi "tạm một lát".</strong> Hàng không có vị trí là hàng không tồn tại trên hệ thống.</li>
<li><strong>Người soạn tự kiểm.</strong> Không có chốt chặn thứ hai.</li>
<li><strong>Không cập nhật khi hàng hư.</strong> Tồn hệ thống đẹp, tồn thực tế lệch dần.</li>
<li><strong>Đổi ca không bàn giao bằng văn bản.</strong> Không ai chịu trách nhiệm.</li>
</ol>

<h2>Câu hỏi thường gặp</h2>
<h3>Kho nhỏ dưới 300 m² có cần quy trình 5 bước không?</h3>
<p>Có, nhưng gọn hơn: gộp bước 1 và 2, chốt tồn 2 lần/tuần thay vì mỗi ca. Điều không được bỏ là kiểm đếm trước khi ký và mã hóa vị trí.</p>
<h3>Thuê ngoài nhân công bốc xếp có ảnh hưởng quy trình không?</h3>
<p>Không, nếu tổ trưởng nhà thầu được brief sơ đồ kho và quy tắc FIFO trước ca đầu tiên. Chúng tôi thường yêu cầu 30 phút bàn giao quy trình trước khi vào việc.</p>
<h3>Nên kiểm kê toàn kho bao lâu một lần?</h3>
<p>6 tháng đến 1 năm là đủ nếu bạn duy trì kiểm đếm chu kỳ hằng ngày cho nhóm A và hằng tuần cho nhóm B.</p>

<h2>Cần đội bốc xếp chạy đúng quy trình?</h2>
<p>Bốc Xếp Sài Gòn cung cấp nhân công theo giờ, theo ca hoặc thường trực tại kho, có tổ trưởng điều phối và tuân thủ quy trình nhập xuất của chủ kho. Xem chi tiết dịch vụ tại <a href="/dich-vu/boc-xep-kho-hang">Bốc xếp kho hàng</a> hoặc gọi hotline <a href="tel:0888977822">0888.977.822</a> để nhận báo giá trong 15 phút.</p>
$html$
WHERE slug = 'quy-trinh-nhap-xuat-kho-chuan-5-buoc';

UPDATE public.posts SET
title = 'Nên thuê nhân công bốc xếp theo giờ hay theo tháng? Điểm hòa vốn và cách chọn',
excerpt = 'So sánh chi tiết thuê nhân công bốc xếp theo giờ, theo ca và thường trực theo tháng: chi phí thực tế, điểm hòa vốn theo số ngày phát sinh việc, rủi ro pháp lý và tình huống nên chọn mô hình nào.',
category = 'Nhân công',
focus_keyword = 'thuê nhân công bốc xếp theo giờ',
seo_title = 'Thuê nhân công bốc xếp theo giờ hay theo tháng? So sánh chi phí 2026',
seo_description = 'Phân tích chi phí thuê nhân công bốc xếp theo giờ, theo ca và theo tháng tại TP.HCM: điểm hòa vốn, rủi ro, tiêu chí chọn và bảng so sánh thực tế.',
seo_keywords = 'thuê nhân công bốc xếp theo giờ, thuê nhân công theo tháng, giá thuê bốc xếp, nhân công thời vụ',
canonical_url = 'https://bocxepsaigon.vn/blog/nen-thue-nhan-cong-theo-gio-hay-theo-thang',
og_title = 'Thuê nhân công bốc xếp theo giờ hay theo tháng?',
og_description = 'Điểm hòa vốn nằm ở khoảng 14-16 ngày phát sinh việc mỗi tháng. Đây là cách tính để bạn tự kiểm tra.',
author = 'Bốc Xếp Sài Gòn',
tags = ARRAY['nhân công','chi phí','thuê ngoài'],
reading_time = 11,
status = 'published',
published_at = now(),
content = $html$
<p>Câu hỏi này gần như tuần nào cũng có khách hỏi: "Bên anh nên ký theo tháng hay cứ cần thì gọi?". Câu trả lời không nằm ở việc mô hình nào rẻ hơn về đơn giá, mà nằm ở <strong>số ngày thực sự phát sinh việc trong tháng</strong> và mức độ ổn định của khối lượng.</p>
<p>Bài viết này đưa ra khung tính toán để bạn tự quyết định, kèm khoảng giá thị trường TP.HCM đầu 2026 mà chúng tôi đang áp dụng.</p>

<h2>Ba mô hình thuê phổ biến</h2>
<h3>1. Thuê theo giờ</h3>
<p>Tính từ lúc nhân công có mặt tại địa điểm, thường có mức tối thiểu 3-4 giờ. Phù hợp việc phát sinh đột xuất: một xe hàng về gấp, dọn kho cuối tuần, sự kiện.</p>
<p><em>Khoảng giá tham khảo:</em> 70.000 - 100.000 đ/người/giờ ban ngày; ca đêm và ngày lễ cộng thêm 30-50%.</p>
<h3>2. Thuê theo ca / theo ngày</h3>
<p>Ca 8 tiếng, có nghỉ trưa. Đây là mô hình phổ biến nhất cho kho hàng có lịch nhập xuất cố định vài ngày trong tuần.</p>
<p><em>Khoảng giá tham khảo:</em> 500.000 - 700.000 đ/người/ca 8 tiếng, tùy loại hàng và mức độ nặng nhọc. Tăng ca tính 1,5 lần giờ thường.</p>
<h3>3. Nhân công thường trực theo tháng</h3>
<p>Nhân sự cắm tại kho, 26 công/tháng, do nhà thầu quản lý lương - bảo hiểm - thay người khi nghỉ.</p>
<p><em>Khoảng giá tham khảo:</em> 9 - 13 triệu đ/người/tháng tùy vị trí và ca làm.</p>

<h2>Điểm hòa vốn: con số bạn cần tự tính</h2>
<p>Lấy giá tháng chia cho giá ca để ra số ngày hòa vốn:</p>
<p><strong>11.000.000 đ/tháng ÷ 650.000 đ/ca ≈ 17 ngày.</strong></p>
<p>Nghĩa là nếu tháng nào bạn cũng cần nhân công từ 17 ngày trở lên, hợp đồng tháng rẻ hơn. Dưới 12-13 ngày, thuê theo ca gần như luôn có lợi. Vùng 13-17 ngày là vùng xám — lúc này quyết định dựa trên yếu tố phi chi phí bên dưới.</p>
<table>
<thead><tr><th>Số ngày phát sinh việc/tháng</th><th>Theo ca (650k)</th><th>Theo tháng (11 tr)</th><th>Nên chọn</th></tr></thead>
<tbody>
<tr><td>6 ngày</td><td>3,9 triệu</td><td>11 triệu</td><td>Theo giờ/ca</td></tr>
<tr><td>12 ngày</td><td>7,8 triệu</td><td>11 triệu</td><td>Theo ca</td></tr>
<tr><td>17 ngày</td><td>11,05 triệu</td><td>11 triệu</td><td>Hòa vốn</td></tr>
<tr><td>22 ngày</td><td>14,3 triệu</td><td>11 triệu</td><td>Theo tháng</td></tr>
<tr><td>26 ngày</td><td>16,9 triệu</td><td>11 triệu</td><td>Theo tháng (tiết kiệm ~35%)</td></tr>
</tbody>
</table>

<h2>Những chi phí ẩn khiến bài toán lệch</h2>
<ul>
<li><strong>Giờ tối thiểu.</strong> Thuê theo giờ nhưng chỉ dùng 1,5 tiếng vẫn tính 3-4 tiếng. Nhiều kho tưởng đang tiết kiệm nhưng thực tế trả cho thời gian không dùng.</li>
<li><strong>Thời gian đào tạo lại.</strong> Nhân công mới mỗi lần mất 30-60 phút để quen sơ đồ kho và quy tắc soạn hàng. Việc lặp lại 15 lần/tháng là 10-15 giờ công mất trắng.</li>
<li><strong>Rủi ro không có người vào cao điểm.</strong> Cuối tháng, cận Tết, mùa hàng — giá thuê thời vụ tăng và có lúc gọi không ra người. Hợp đồng tháng khóa được nguồn lực.</li>
<li><strong>Chi phí hư hỏng.</strong> Đội quen hàng làm rơi vỡ ít hơn rõ rệt. Với hàng dễ vỡ hoặc thiết bị, khoản này thường lớn hơn phần chênh lệch nhân công.</li>
</ul>

<h2>Khi nào chắc chắn nên thuê theo giờ/ca</h2>
<ol>
<li>Khối lượng biến động mạnh, có tháng không phát sinh.</li>
<li>Công việc đơn giản, không cần hiểu quy trình nội bộ: dỡ hàng bao, chuyển kho một lần, dọn mặt bằng.</li>
<li>Bạn đang thử nhà thầu mới và chưa muốn cam kết dài hạn.</li>
<li>Dự án ngắn dưới 2 tuần.</li>
</ol>

<h2>Khi nào nên ký theo tháng</h2>
<ol>
<li>Kho vận hành từ 5 ngày/tuần trở lên.</li>
<li>Hàng hóa đặc thù: dễ vỡ, hàng lạnh, hàng có mã lô cần soi kỹ, thiết bị điện tử.</li>
<li>Bạn cần cùng một nhóm người để giữ chất lượng và trách nhiệm rõ ràng.</li>
<li>Cần đội biết vận hành xe nâng, xe rùa, thiết bị của kho.</li>
</ol>

<h2>Mô hình lai: nền tảng cố định + bổ sung theo ca</h2>
<p>Cách nhiều khách hàng của chúng tôi đang dùng và thường tối ưu nhất: ký thường trực 3-4 người làm nền, những ngày cao điểm gọi bổ sung 4-8 người theo ca. Bạn giữ được đội hiểu quy trình mà không phải trả lương cố định cho công suất đỉnh chỉ xuất hiện 5-6 ngày/tháng.</p>

<h2>Điều khoản cần có trong hợp đồng</h2>
<ul>
<li>Đơn giá rõ theo ca ngày / ca đêm / ngày lễ, và cách tính tăng ca.</li>
<li>Thời gian tối thiểu tính công và quy định khi hủy lịch trong ngày.</li>
<li>Cam kết thay người trong bao lâu nếu nhân sự nghỉ đột xuất.</li>
<li>Trách nhiệm bồi thường hàng hư hỏng và mức tối đa.</li>
<li>Xác nhận nhà thầu đóng bảo hiểm tai nạn cho người lao động — đây là điều khoản bảo vệ chính bạn, không phải nhà thầu.</li>
</ul>

<h2>Câu hỏi thường gặp</h2>
<h3>Thuê theo giờ có bị tính phí di chuyển không?</h3>
<p>Trong nội thành TP.HCM thường không. Ngoài phạm vi 20-25 km hoặc các tỉnh lân cận thường có phụ phí di chuyển tính theo lượt.</p>
<h3>Ca đêm đắt hơn bao nhiêu?</h3>
<p>Thông thường cộng 30% cho ca sau 22h và 50-100% cho ngày lễ, Tết.</p>
<h3>Có thể đổi từ theo ca sang theo tháng giữa chừng không?</h3>
<p>Được. Chúng tôi thường khuyến nghị chạy 4-6 tuần theo ca để có dữ liệu thật về số ngày phát sinh, rồi mới chốt hợp đồng tháng với đúng số người cần.</p>

<h2>Cần tư vấn mô hình phù hợp?</h2>
<p>Gửi chúng tôi lịch nhập xuất trung bình một tháng của kho, chúng tôi sẽ tính giúp phương án rẻ nhất — kể cả khi kết luận là bạn không nên ký hợp đồng tháng. Xem thêm <a href="/dich-vu/cho-thue-nhan-cong">dịch vụ cho thuê nhân công</a>, tham khảo <a href="/blog/gia-thue-boc-xep-kho-hang-tphcm">cách tính giá bốc xếp kho hàng</a> hoặc gọi <a href="tel:0888977822">0888.977.822</a>.</p>
$html$
WHERE slug = 'nen-thue-nhan-cong-theo-gio-hay-theo-thang';

UPDATE public.posts SET
title = 'Rút ruột container: tránh phí lưu container (DEM/DET) bằng cách nào?',
excerpt = 'Phân biệt DEM, DET, phí lưu bãi và cách tổ chức rút ruột container đúng thời gian miễn phí: tính ngược lịch, chuẩn bị nhân công, xử lý hàng khó và các tình huống thường làm trễ.',
category = 'Container',
focus_keyword = 'phí lưu container',
seo_title = 'Rút ruột container: cách tránh phí lưu container DEM/DET 2026',
seo_description = 'Hiểu đúng DEM, DET và phí lưu bãi; cách tính ngược lịch rút ruột container, bố trí nhân công và xử lý sự cố để không phát sinh phí lưu cont.',
seo_keywords = 'phí lưu container, DEM DET, rút ruột container, free time container, bốc xếp container',
canonical_url = 'https://bocxepsaigon.vn/blog/rut-ruot-container-tranh-phi-luu-cont',
og_title = 'Tránh phí lưu container khi rút ruột: hướng dẫn thực tế',
og_description = 'DEM, DET khác nhau thế nào và làm sao để rút ruột container xong trước khi hết free time.',
author = 'Bốc Xếp Sài Gòn',
tags = ARRAY['container','logistics','chi phí'],
reading_time = 11,
status = 'published',
published_at = now(),
content = $html$
<p>Một container 40ft rút ruột trễ hai ngày có thể tốn thêm vài triệu đồng — nhiều hơn cả tiền thuê nhân công rút hàng. Điều đáng nói là gần như toàn bộ các trường hợp trễ mà chúng tôi từng chứng kiến đều tránh được, chỉ cần lùi lịch ngược từ ngày hết free time thay vì "hàng về rồi tính".</p>

<h2>Ba loại phí hay bị gọi nhầm là "phí lưu cont"</h2>
<table>
<thead><tr><th>Loại phí</th><th>Ai thu</th><th>Phát sinh khi</th></tr></thead>
<tbody>
<tr><td><strong>DEM (Demurrage)</strong></td><td>Hãng tàu</td><td>Container còn nằm trong cảng quá thời gian miễn phí</td></tr>
<tr><td><strong>DET (Detention)</strong></td><td>Hãng tàu</td><td>Container đã kéo ra ngoài nhưng chưa trả vỏ đúng hạn</td></tr>
<tr><td><strong>Phí lưu bãi (Storage)</strong></td><td>Cảng / depot</td><td>Container chiếm chỗ trong bãi, tính song song với DEM</td></tr>
</tbody>
</table>
<p>Điểm khiến nhiều doanh nghiệp bất ngờ: DEM và storage có thể cùng phát sinh trong một ngày, do hai đơn vị khác nhau thu. Tính tổng chi phí trễ hạn phải cộng cả hai.</p>

<h2>Free time bao lâu và tính từ khi nào?</h2>
<p>Thông thường hàng nhập được 5-7 ngày miễn phí, một số tuyến hoặc khách hàng có hợp đồng dài hạn được 10-14 ngày. Free time thường tính từ ngày tàu cập (hoặc ngày container được dỡ xuống bãi), <strong>tính cả thứ Bảy, Chủ nhật và ngày lễ</strong> — đây là chi tiết làm hỏng nhiều kế hoạch. Container về chiều thứ Sáu với 5 ngày free time thực chất chỉ còn 3 ngày làm việc.</p>
<p>Việc đầu tiên cần làm khi có thông báo hàng đến: hỏi forwarder chính xác ngày hết free time DEM và DET, ghi vào lịch, rồi lùi ngược.</p>

<h2>Cách tính ngược lịch rút ruột</h2>
<p>Giả sử free time hết vào ngày D:</p>
<ul>
<li><strong>D-5:</strong> Hoàn tất thủ tục hải quan, thanh toán, lấy D/O. Đây là khâu hay trễ nhất, không phải khâu bốc xếp.</li>
<li><strong>D-3:</strong> Chốt xe kéo và đặt lịch nhân công rút hàng. Đặt trước 48-72 giờ để có đội đúng số lượng, đặt trong ngày thường phải chấp nhận đội ghép.</li>
<li><strong>D-2:</strong> Container về kho, rút ruột. Chừa một ngày đệm cho sự cố.</li>
<li><strong>D-1:</strong> Trả vỏ về depot đúng nơi hãng tàu chỉ định.</li>
</ul>
<p>Ngày đệm là thứ rẻ nhất trong toàn bộ kế hoạch. Bỏ nó đi để tiết kiệm một ngày kho bãi là đánh cược với tiền DEM/DET.</p>

<h2>Bố trí nhân công đúng để rút xong trong ngày</h2>
<p>Thời gian rút ruột phụ thuộc loại hàng nhiều hơn phụ thuộc kích cỡ container:</p>
<table>
<thead><tr><th>Loại hàng</th><th>Cont 20ft</th><th>Cont 40ft</th><th>Số người đề xuất</th></tr></thead>
<tbody>
<tr><td>Hàng pallet, có xe nâng</td><td>45-60 phút</td><td>1,5-2 giờ</td><td>4-5</td></tr>
<tr><td>Thùng carton xếp tay</td><td>2-3 giờ</td><td>3-4,5 giờ</td><td>6-8</td></tr>
<tr><td>Bao 25-50 kg</td><td>2,5-3,5 giờ</td><td>4-5,5 giờ</td><td>8-10</td></tr>
<tr><td>Hàng rời, cồng kềnh, hàng nặng</td><td>4-6 giờ</td><td>6-8 giờ</td><td>10-12</td></tr>
</tbody>
</table>
<p>Chi tiết đơn giá theo từng loại hàng có trong bài <a href="/blog/gia-rut-ruot-container-tphcm">Giá rút ruột container TP.HCM 2026</a>.</p>

<h2>Sáu tình huống làm trễ và cách chặn trước</h2>
<ol>
<li><strong>Hải quan vướng kiểm hóa.</strong> Chuẩn bị bộ chứng từ đầy đủ và khai đúng mã HS ngay từ đầu; hàng thuộc diện kiểm chuyên ngành phải nộp hồ sơ trước khi tàu cập.</li>
<li><strong>Không có xe kéo vào cao điểm.</strong> Cuối tháng và cận Tết luôn khan xe. Đặt sớm hoặc chấp nhận giá cao hơn.</li>
<li><strong>Kho không có chỗ nhận hàng.</strong> Dọn sẵn khu vực tiếp nhận trước khi container tới, đừng dọn khi xe đã đậu ngoài cổng.</li>
<li><strong>Hàng bị xô đổ trong cont.</strong> Rất thường gặp với hàng xếp cao. Cần thêm 1-2 người xử lý và tuyệt đối không mở cửa đứng thẳng trước cont.</li>
<li><strong>Rút ban đêm không xin phép.</strong> Nhiều khu vực hạn chế xe container theo giờ; kiểm tra khung giờ cấm tải trước khi lên lịch.</li>
<li><strong>Trả vỏ sai depot.</strong> Depot trả vỏ do hãng tàu chỉ định, có thể đổi vào phút chót. Xác nhận lại trong ngày trả.</li>
</ol>

<h2>Mẹo giảm rủi ro chi phí</h2>
<ul>
<li><strong>Đàm phán free time dài hơn ngay khi book cước</strong>, đặc biệt với lô hàng định kỳ — thường dễ hơn xin miễn giảm DEM sau khi đã phát sinh.</li>
<li><strong>Rút ruột tại bãi thay vì kéo về kho</strong> khi kho xa hoặc chật: giảm DET vì trả vỏ ngay tại chỗ, nhưng chi phí nhân công tại bãi thường cao hơn và bị ràng buộc giờ làm việc của cảng.</li>
<li><strong>Chốt lịch nhân công theo khung giờ cứng</strong>, có tổ trưởng liên lạc trực tiếp với tài xế để bám giờ xe tới.</li>
<li><strong>Chụp ảnh tình trạng seal và hàng lớp ngoài</strong> trước khi rút — vừa để khiếu nại tổn thất, vừa là bằng chứng thời điểm bắt đầu làm việc.</li>
</ul>

<h2>Câu hỏi thường gặp</h2>
<h3>Phí DEM tính theo ngày hay theo giờ?</h3>
<p>Theo ngày, và thường tăng lũy tiến theo bậc: vài ngày đầu một mức, sau đó tăng gấp rưỡi đến gấp đôi.</p>
<h3>Trễ vì hải quan có được miễn phí lưu không?</h3>
<p>Không tự động. Có thể xin giảm qua hãng tàu nếu chứng minh được nguyên nhân khách quan, nhưng đừng xây kế hoạch dựa trên khả năng này.</p>
<h3>Rút ruột ban đêm có tăng giá nhiều không?</h3>
<p>Thường cộng 30-50% cho ca đêm. Con số này vẫn nhỏ hơn nhiều so với một ngày DEM + storage của container 40ft.</p>
<h3>Nên đặt nhân công trước bao lâu?</h3>
<p>48-72 giờ để đảm bảo đủ người và đúng loại đội. Trường hợp gấp, chúng tôi vẫn điều được trong 3-6 giờ tại khu vực nội thành TP.HCM.</p>

<h2>Cần đội rút ruột container đúng giờ?</h2>
<p>Bốc Xếp Sài Gòn nhận rút ruột container tại kho, tại bãi và tại các cảng khu vực TP.HCM, Bình Dương, Đồng Nai, Long An — có tổ trưởng điều phối và cam kết khung giờ. Xem <a href="/dich-vu/boc-xep-container">dịch vụ bốc xếp container</a> hoặc gọi <a href="tel:0888977822">0888.977.822</a>.</p>
$html$
WHERE slug = 'rut-ruot-container-tranh-phi-luu-cont';
