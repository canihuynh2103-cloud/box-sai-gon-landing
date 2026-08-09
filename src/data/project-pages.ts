import { PROJECTS, type Project } from "@/data/site";

export type ProjectDetail = {
  slug: string;
  /** Trang dịch vụ tương ứng để liên kết nội bộ */
  serviceSlug: string;
  /** Tiêu đề SEO riêng cho trang dự án */
  seoTitle?: string;
  /** Mô tả meta riêng cho trang dự án */
  seoDescription?: string;
  /** Tổng quan dự án - 1-2 đoạn mở đầu */
  overview?: string[];
  /** Bối cảnh và nhu cầu của khách hàng */
  context?: string;
  /** Loại hàng hóa xử lý trong dự án */
  cargo?: string;
  /** Quy mô công việc (chỉ ghi dữ liệu đã có) */
  scale?: string[];
  /** Phạm vi công việc */
  scope?: string[];
  /** Cách đội ngũ tổ chức triển khai - viết dạng đoạn văn */
  execution?: string[];
  /** Quy trình thực hiện */
  process?: { step: string; detail: string }[];
  /** Các hạng mục đã thực hiện, mô tả cụ thể hơn scope */
  deliverables?: { title: string; detail: string }[];
  /** Nhân sự tham gia */
  personnel?: string;
  /** Thiết bị / phương tiện sử dụng */
  equipment?: string[];
  /** Kết quả hoàn thành */
  results?: string[];
  /** Điểm nổi bật */
  highlights?: string[];
  /** Ghi chú kỹ thuật / lưu ý nghiệp vụ hiển thị dạng box */
  notes?: string[];
  faqs?: { q: string; a: string }[];
};

/**
 * Nội dung được viết riêng cho từng dự án dựa trên dữ liệu đã có trong PROJECTS.
 * Phần diễn giải nghiệp vụ mô tả cách công việc thường được tổ chức, không bổ sung
 * số liệu mới ngoài những gì dữ liệu dự án đã ghi nhận.
 */
export const PROJECT_DETAILS: ProjectDetail[] = [
  {
    slug: "chuyen-kho-tong-unilever-vsip-1",
    serviceSlug: "chuyen-kho",
    seoTitle: "Chuyển kho tổng 6.000m² tại KCN Vsip 1 | Dự án Bốc Xếp Sài Gòn",
    seoDescription:
      "Case study chuyển kho tổng 6.000m² tại KCN Vsip 1, Bình Dương: cách chia đợt di dời hơn 9.000 pallet, kiểm đếm hai lớp và sắp xếp lại theo sơ đồ kho mới trong 12 ngày.",
    overview: [
      "Đây là dạng công việc mà khối lượng không phải phần khó nhất. Cái khó nằm ở chỗ kho vẫn phải xuất hàng trong lúc di dời, nên mỗi pallet rời khỏi vị trí cũ đều phải biết trước nó sẽ nằm ở đâu trong kho mới và ai là người xác nhận.",
      "Toàn bộ công việc được chia theo khu vực kho thay vì chuyển theo kiểu cuốn chiếu từ cửa vào. Cách chia này giúp bộ phận kho của khách hàng luôn biết khu nào đã đóng, khu nào còn lấy hàng được, và tránh tình trạng một mã hàng bị tách ra nằm ở hai kho cùng lúc.",
    ],
    context:
      "Khách hàng cần chuyển toàn bộ hàng hóa của một kho tổng sang kho mới trong khi hoạt động xuất nhập vẫn phải tiếp tục. Yêu cầu quan trọng nhất là hàng không bị thất lạc, số liệu tồn kho khớp sau khi di dời và thời gian kho ngừng hoạt động càng ngắn càng tốt.",
    cargo: "Hàng tiêu dùng nhanh (FMCG) đóng thùng, xếp trên pallet",
    scale: ["Kho tổng khoảng 6.000m²", "Hơn 9.000 pallet hàng", "Thời gian thực hiện 12 ngày"],
    scope: [
      "Lập kế hoạch di dời theo từng khu vực kho",
      "Hạ pallet, kiểm đếm và bọc lót hàng trước khi vận chuyển",
      "Chuyển hàng sang kho mới theo từng đợt",
      "Sắp xếp lại hàng theo sơ đồ vị trí do khách hàng cung cấp",
    ],
    execution: [
      "Trước ngày khởi công, đội trưởng đi thực tế cả hai kho để chốt lối di chuyển của xe nâng, vị trí đỗ xe tải và khu vực tập kết tạm. Những dãy kệ nằm sát cửa xuất được xếp vào đợt cuối để bộ phận kho vẫn lấy hàng bình thường trong các ngày đầu.",
      "Nhân công được chia thành nhóm hạ pallet, nhóm bọc lót và kiểm đếm, nhóm xếp lên xe và nhóm nhận hàng tại kho mới. Cách chia nhóm cố định như vậy giúp mỗi người chỉ lặp lại một thao tác, tốc độ ổn định hơn và hạn chế việc hàng phải nhấc lên đặt xuống nhiều lần.",
      "Mỗi đợt xe chạy đều đi kèm phiếu ghi số pallet và mã khu vực. Đội nhận hàng ở kho mới đối chiếu phiếu trước khi cho hàng vào vị trí, nên chênh lệch nếu có được phát hiện ngay trong ngày thay vì đợi đến lúc kiểm kê cuối kỳ.",
    ],
    process: [
      { step: "Khảo sát và lập kế hoạch", detail: "Đi thực tế hai kho, chốt trình tự di dời và số nhân sự mỗi ca." },
      { step: "Chuẩn bị", detail: "Bố trí dụng cụ, màng PE, khu vực tập kết và lối di chuyển an toàn." },
      { step: "Bốc xếp và vận chuyển", detail: "Làm theo 3 ca liên tục để hạn chế gián đoạn hoạt động kho." },
      { step: "Kiểm đếm hai lớp", detail: "Đếm khi xuất kho cũ và khi nhập kho mới, đối chiếu số liệu." },
      { step: "Sắp xếp và bàn giao", detail: "Xếp hàng đúng vị trí theo sơ đồ, bàn giao và nghiệm thu." },
    ],
    deliverables: [
      { title: "Hạ và gom pallet theo khu vực", detail: "Pallet được hạ khỏi kệ, gom về khu tập kết của từng khu vực trước khi lên xe." },
      { title: "Bọc lót và cố định hàng", detail: "Quấn màng PE cho các pallet có thùng xếp cao hoặc hàng dễ xô lệch khi xe chạy." },
      { title: "Kiểm đếm hai đầu", detail: "Đếm tại kho cũ khi xuất và đếm lại tại kho mới khi nhập, ghi vào cùng một phiếu." },
      { title: "Xếp hàng theo sơ đồ kho mới", detail: "Đưa pallet vào đúng dãy, đúng tầng kệ theo bản đồ vị trí khách hàng cung cấp." },
    ],
    personnel: "45 nhân công chia 3 ca, có đội trưởng giám sát từng ca.",
    results: [
      "Hoàn tất di dời trong 12 ngày theo kế hoạch",
      "Hàng được kiểm đếm hai lớp, số liệu khớp khi bàn giao",
      "Hàng hóa sắp xếp đúng sơ đồ vị trí kho mới",
    ],
    highlights: [
      "Quy mô lớn nhưng vẫn giữ được tiến độ theo từng khu vực",
      "Làm 3 ca để giảm thời gian kho ngừng hoạt động",
    ],
    notes: [
      "Với kho đang vận hành, nên chốt danh sách mã hàng không được đụng tới trong từng ngày để bộ phận kho chủ động lấy hàng.",
      "Sơ đồ vị trí kho mới cần có trước khi xe đầu tiên chạy, nếu không hàng sẽ phải xếp tạm rồi dời lại lần hai.",
    ],
    faqs: [
      {
        q: "Kho đang hoạt động có chuyển được không?",
        a: "Được. Cách làm là chia kho thành từng khu vực và di dời lần lượt, khu nào chưa tới lượt thì vẫn xuất nhập bình thường. Trình tự khu vực do bộ phận kho của khách hàng chốt cùng đội trưởng trước khi bắt đầu.",
      },
      {
        q: "Làm sao đảm bảo tồn kho khớp sau khi chuyển?",
        a: "Hàng được đếm hai lần trên cùng một phiếu: một lần khi xuất khỏi kho cũ và một lần khi nhập vào kho mới. Chênh lệch nếu có sẽ lộ ra ngay trong ngày, không phải đợi kiểm kê cuối kỳ.",
      },
    ],
  },
  {
    slug: "rut-ruot-container-cat-lai",
    serviceSlug: "boc-xep-container",
    seoTitle: "Rút ruột 120 container tại cảng Cát Lái | Dự án Bốc Xếp Sài Gòn",
    seoDescription:
      "Case study rút ruột 120 container hàng bao kiện tại cảng Cát Lái: tổ chức nhân công có thẻ ra vào cảng theo dây chuyền, giữ nhịp trung bình 7 container mỗi ngày trong 18 ngày.",
    overview: [
      "Rút ruột container ở cảng là công việc bị ràng buộc bởi thời gian nhiều hơn bởi sức người. Cont nằm bãi thêm ngày nào là phát sinh chi phí ngày đó, nên tiến độ mỗi ngày quan trọng hơn tốc độ của một ca riêng lẻ.",
      "Điểm khác biệt so với rút hàng tại kho là nhân sự phải đủ điều kiện ra vào khu vực bãi và làm việc theo quy định của cảng. Việc này quyết định đội có vào được đúng giờ hay không, và vì vậy được chuẩn bị trước khi bàn tới chuyện năng suất.",
    ],
    context:
      "Khách hàng có lượng container hàng bao kiện về liên tục theo lịch tàu. Nếu không rút hàng đúng tiến độ, chi phí lưu cont và lưu bãi sẽ phát sinh, vì vậy cần đội nhân công đủ điều kiện ra vào cảng và làm việc ổn định theo ngày.",
    cargo: "Hàng bao kiện trong container",
    scale: ["120 container", "Trung bình 7 container/ngày", "Thời gian thực hiện 18 ngày"],
    scope: [
      "Rút ruột container tại bãi",
      "Sang hàng lên xe tải / vào kho theo chỉ định",
      "Xếp hàng gọn để giải phóng bãi",
    ],
    execution: [
      "Mỗi buổi sáng đội nhận danh sách số cont cần rút trong ngày và vị trí cont trên bãi, từ đó chia người theo cụm vị trí gần nhau để hạn chế thời gian di chuyển giữa các điểm.",
      "Trong mỗi container bố trí một nhóm nhỏ chuyền hàng ra cửa cont, một nhóm trung chuyển và một nhóm xếp hàng lên xe. Cách chia này giữ được nhịp liên tục: khi nhóm trong cont còn đang chuyền thì nhóm ngoài đã xếp phần trước đó, hàng không bị dồn đống ở cửa cont.",
      "Không gian trong container nóng và chật, nên các nhóm được luân phiên vị trí giữa trong và ngoài cont. Đây là cách đơn giản để giữ tốc độ đều trong cả ca thay vì nhanh lúc đầu rồi chậm dần về cuối.",
      "Kiện hàng có dấu hiệu rách, ướt hoặc bẹp được tách riêng và ghi nhận ngay lúc rút, tránh tranh cãi về trách nhiệm sau khi hàng đã vào kho.",
    ],
    process: [
      { step: "Đăng ký ra vào cảng", detail: "Nhân sự có thẻ ra vào cảng, làm việc theo quy định khu vực bãi." },
      { step: "Nhận lệnh và vị trí cont", detail: "Bố trí đội theo số cont cần rút trong ngày." },
      { step: "Rút hàng theo dây chuyền", detail: "Chia nhóm trong cont, nhóm trung chuyển và nhóm xếp hàng." },
      { step: "Kiểm đếm và bàn giao", detail: "Đếm kiện, ghi nhận hàng hư hỏng nếu có, ký biên bản." },
    ],
    deliverables: [
      { title: "Rút hàng khỏi container", detail: "Chuyền kiện từ trong lòng cont ra cửa theo lớp, không kéo lê làm rách bao." },
      { title: "Sang hàng theo chỉ định", detail: "Xếp lên xe tải hoặc đưa vào kho tùy lệnh điều phối trong ngày." },
      { title: "Ghi nhận hàng bất thường", detail: "Tách riêng kiện rách, ướt, bẹp và ghi vào biên bản khi bàn giao." },
      { title: "Dọn và trả cont", detail: "Quét dọn lòng cont sau khi rút để trả rỗng đúng tình trạng." },
    ],
    personnel: "30 nhân công có thẻ ra vào cảng.",
    results: [
      "Rút ruột 120 container trong 18 ngày",
      "Duy trì tiến độ giải phóng bãi, tránh phát sinh phí lưu cont",
    ],
    highlights: ["Nhân sự đã có thẻ ra vào cảng", "Tổ chức theo dây chuyền để giữ năng suất ổn định"],
    notes: [
      "Vị trí cont trên bãi ảnh hưởng trực tiếp tới sản lượng ngày: cont nằm rải rác thì thời gian di chuyển chiếm phần đáng kể trong ca.",
      "Nên chốt trước điểm nhận hàng (lên xe hay vào kho) vì hai phương án cần cách bố trí người khác nhau.",
    ],
    faqs: [
      {
        q: "Nhân công có vào được khu vực bãi cảng không?",
        a: "Đội làm dự án này là nhân sự đã có thẻ ra vào cảng và làm việc theo quy định của khu vực bãi. Với các cảng khác, thời gian làm thủ tục cho nhân sự cần được tính vào lịch trước khi chốt ngày khởi công.",
      },
      {
        q: "Hàng hư hỏng trong container được xử lý thế nào?",
        a: "Kiện có dấu hiệu rách, ướt hoặc bẹp được tách riêng ngay lúc rút và ghi vào biên bản bàn giao, thay vì để lẫn vào lô hàng rồi phát hiện sau khi đã nhập kho.",
      },
    ],
  },
  {
    slug: "chuyen-van-phong-deutsches-haus",
    serviceSlug: "chuyen-van-phong",
    seoTitle: "Chuyển văn phòng 14 tầng tại Quận 1 trong 3 đêm | Bốc Xếp Sài Gòn",
    seoDescription:
      "Case study di dời văn phòng 14 tầng tại Quận 1: đóng gói theo phòng ban, thi công ngoài giờ từ 20h đến 5h, di dời 320 bộ bàn ghế và hệ thống máy chủ, sáng hôm sau làm việc bình thường.",
    overview: [
      "Chuyển văn phòng trong tòa nhà cao tầng bị giới hạn bởi ba thứ: thang máy, giờ được phép thi công và thời điểm nhân viên quay lại làm việc. Khối lượng đồ đạc thường không lớn bằng kho hàng, nhưng sai một chi tiết là sáng hôm sau có người không có chỗ ngồi hoặc không tìm ra hồ sơ.",
      "Vì vậy phần lớn công sức nằm ở khâu dán nhãn và sơ đồ chỗ ngồi, làm trước khi bất kỳ món đồ nào được tháo ra.",
    ],
    context:
      "Khách hàng cần di dời văn phòng nhiều tầng nhưng không được ảnh hưởng đến công việc trong giờ hành chính. Toàn bộ tài liệu, thiết bị và hệ thống máy chủ phải được di chuyển an toàn và sẵn sàng sử dụng ngay sáng hôm sau.",
    cargo: "Bàn ghế, tài liệu, thiết bị IT và hệ thống máy chủ",
    scale: ["Toà nhà 14 tầng", "320 bộ bàn ghế", "Thi công 3 đêm"],
    scope: [
      "Đóng gói tài liệu, thiết bị theo từng phòng ban",
      "Tháo lắp bàn ghế, vách ngăn",
      "Di dời hệ thống máy chủ theo hướng dẫn của bộ phận IT",
      "Lắp đặt lại và dọn dẹp trước giờ làm việc",
    ],
    execution: [
      "Mỗi phòng ban được cấp một màu nhãn riêng, dán lên thùng tài liệu, thân bàn và thiết bị. Trên sơ đồ chỗ ngồi mới, từng vị trí cũng mang màu tương ứng, nên nhân công không cần hỏi lại vẫn biết món đồ thuộc về khu vực nào.",
      "Đồ cá nhân trên mặt bàn do nhân viên tự cho vào thùng của mình trước khi ra về, đội chỉ dán nhãn và vận chuyển. Cách này giảm hẳn số lần phải tìm lại đồ thất lạc sau khi chuyển.",
      "Thùng tài liệu và thiết bị nhỏ được gom xuống trước theo từng tầng, bàn ghế và vách ngăn tháo sau vì chiếm nhiều diện tích thang máy. Trình tự này giúp thang máy không bị nghẽn ở khung giờ đầu ca đêm.",
      "Phần máy chủ chỉ được tháo và đóng gói sau khi bộ phận IT của khách hàng xác nhận đã tắt hệ thống, và được đưa vào phòng máy mới trước để IT có thời gian kết nối lại trong đêm.",
    ],
    process: [
      { step: "Khảo sát và dán nhãn", detail: "Đánh dấu theo phòng ban, lập sơ đồ chỗ ngồi mới." },
      { step: "Thi công ngoài giờ", detail: "Làm từ 20h đến 5h sáng để không ảnh hưởng giờ hành chính." },
      { step: "Lắp đặt lại", detail: "Bố trí bàn ghế đúng sơ đồ, kết nối lại thiết bị." },
      { step: "Kiểm tra và bàn giao", detail: "Cùng khách hàng kiểm tra từng khu vực trước khi kết thúc ca." },
    ],
    deliverables: [
      { title: "Đóng gói theo phòng ban", detail: "Thùng tài liệu và thiết bị được dán nhãn theo màu của từng bộ phận." },
      { title: "Tháo lắp bàn ghế, vách ngăn", detail: "Tháo rời tại nơi cũ và lắp lại đúng cấu hình tại nơi mới." },
      { title: "Di dời thiết bị máy chủ", detail: "Thực hiện theo hướng dẫn và lịch của bộ phận IT khách hàng." },
      { title: "Dọn dẹp trước giờ làm việc", detail: "Thu gom vật tư đóng gói, trả lại mặt bằng sạch trước 5h sáng." },
    ],
    results: [
      "Hoàn tất trong 3 đêm",
      "Nhân sự khách hàng làm việc bình thường vào sáng hôm sau",
    ],
    highlights: ["Thi công hoàn toàn ngoài giờ hành chính", "Di dời thiết bị máy chủ có phối hợp với bộ phận IT"],
    notes: [
      "Cần đăng ký giờ dùng thang máy và lối vận chuyển với ban quản lý tòa nhà trước ngày thi công.",
      "Sơ đồ chỗ ngồi mới nên chốt trước ít nhất một ngày, vì mọi việc lắp đặt lại đều dựa vào nó.",
    ],
    faqs: [
      {
        q: "Có làm ngoài giờ hành chính được không?",
        a: "Dự án này thi công từ 20h đến 5h sáng trong 3 đêm liên tiếp. Khung giờ cụ thể phụ thuộc vào quy định của ban quản lý tòa nhà về thời gian được phép vận chuyển và dùng thang máy.",
      },
      {
        q: "Thiết bị máy chủ ai chịu trách nhiệm tháo lắp?",
        a: "Đội bốc xếp thực hiện phần đóng gói, di chuyển và đưa thiết bị vào phòng máy mới. Việc tắt hệ thống, tháo kết nối và cấu hình lại do bộ phận IT của khách hàng chủ trì, hai bên bám theo cùng một lịch trong đêm.",
      },
    ],
  },
  {
    slug: "di-doi-day-chuyen-samsung",
    serviceSlug: "boc-xep-nha-may",
    seoTitle: "Di dời dây chuyền sản xuất tại KCN Sóng Thần | Bốc Xếp Sài Gòn",
    seoDescription:
      "Case study di dời 14 cụm máy nặng trong nhà máy tại KCN Sóng Thần: phối hợp kỹ sư tháo dỡ, đóng kiện gỗ, dùng xe nâng 5 tấn và pa lăng chuyên dụng, hoàn tất trong 21 ngày.",
    overview: [
      "Di dời máy móc trong nhà máy khác hẳn việc chuyển hàng hóa: mỗi cụm máy có tâm nặng riêng, có điểm được phép móc cáp và có bộ phận không được chịu lực. Sai điểm kê hoặc sai điểm móc là hỏng thiết bị, không phải chỉ trầy xước.",
      "Vì vậy toàn bộ phương án tháo dỡ và di chuyển đều bám theo hướng dẫn của kỹ sư nhà máy. Đội bốc xếp đảm nhận phần cơ bắp và thiết bị nâng hạ, phần quyết định kỹ thuật thuộc về bộ phận kỹ thuật của khách hàng.",
    ],
    context:
      "Khách hàng cần di dời dây chuyền sản xuất gồm nhiều cụm máy nặng. Yêu cầu là bảo vệ máy móc trong suốt quá trình tháo dỡ, vận chuyển, lắp đặt lại và phối hợp chặt với bộ phận kỹ thuật của nhà máy.",
    cargo: "Máy móc, dây chuyền sản xuất nặng",
    scale: ["14 cụm máy nặng", "Thời gian thực hiện 21 ngày"],
    scope: [
      "Phối hợp kỹ sư nhà máy tháo dỡ máy móc",
      "Đóng kiện gỗ, chèn lót và cố định máy",
      "Vận chuyển và đưa máy vào vị trí mới",
      "Hỗ trợ lắp đặt lại theo hướng dẫn kỹ thuật",
    ],
    execution: [
      "Buổi khảo sát đầu tiên đi cùng kỹ sư nhà máy để xác định thứ tự tháo, tuyến di chuyển trong xưởng và những đoạn có cửa hẹp hoặc nền yếu. Tuyến đi được chốt trên bản vẽ trước, không quyết định tại chỗ khi máy đã treo trên pa lăng.",
      "Mỗi cụm máy được chụp ảnh hiện trạng và đánh dấu vị trí đường ống, dây điện trước khi tháo. Bộ phận nào tháo rời thì được cho vào thùng riêng dán nhãn theo tên cụm máy, tránh tình trạng lắp lại thiếu chi tiết.",
      "Kiện gỗ được đóng theo kích thước thực của từng cụm, bên trong chèn lót ở những điểm chịu lực do kỹ sư chỉ định. Máy được cố định bằng dây chằng để không xê dịch khi xe đi qua đoạn đường xấu.",
      "Khi đưa máy vào vị trí mới, đội dùng con lăn và pa lăng để căn từng chút một theo dấu đã kẻ trên nền, sau đó kỹ sư nhà máy kiểm tra cân chỉnh trước khi nghiệm thu.",
    ],
    process: [
      { step: "Khảo sát cùng kỹ sư", detail: "Chốt phương án tháo dỡ, đường di chuyển và điểm kê máy." },
      { step: "Tháo dỡ và đóng kiện", detail: "Đóng kiện gỗ theo kích thước từng cụm máy." },
      { step: "Di chuyển máy", detail: "Dùng xe nâng và pa lăng chuyên dụng, đi theo tuyến đã khảo sát." },
      { step: "Lắp đặt và nghiệm thu", detail: "Đưa máy vào vị trí, hỗ trợ kỹ sư căn chỉnh và nghiệm thu." },
    ],
    deliverables: [
      { title: "Hỗ trợ tháo dỡ cụm máy", detail: "Làm theo trình tự và hướng dẫn của kỹ sư nhà máy, có chụp ảnh hiện trạng." },
      { title: "Đóng kiện và chèn lót", detail: "Đóng kiện gỗ theo kích thước thực tế, chèn lót tại các điểm chịu lực." },
      { title: "Nâng hạ và vận chuyển", detail: "Dùng xe nâng, pa lăng và con lăn theo tuyến đã khảo sát trong xưởng." },
      { title: "Đưa máy vào vị trí mới", detail: "Căn chỉnh theo dấu trên nền, bàn giao cho kỹ sư kiểm tra." },
    ],
    equipment: ["Xe nâng 5 tấn", "Pa lăng chuyên dụng", "Kiện gỗ, con lăn, dây chằng"],
    results: ["Hoàn tất di dời 14 cụm máy trong 21 ngày", "Không xảy ra sự cố trong quá trình thi công"],
    highlights: ["Phối hợp trực tiếp với kỹ sư nhà máy", "Sử dụng thiết bị nâng hạ phù hợp cho máy nặng"],
    notes: [
      "Tuyến di chuyển trong xưởng cần được dọn trống và kiểm tra tải nền trước khi đưa máy nặng đi qua.",
      "Các chi tiết tháo rời nên đóng thùng và dán nhãn theo tên cụm máy ngay tại chỗ, không gom chung.",
    ],
    faqs: [
      {
        q: "Đội bốc xếp có tự tháo máy không?",
        a: "Không. Trình tự tháo, điểm móc cáp và điểm kê đều do kỹ sư nhà máy quyết định. Đội đảm nhận phần thao tác, nâng hạ, đóng kiện và vận chuyển theo hướng dẫn đó.",
      },
      {
        q: "Máy nặng được bảo vệ ra sao khi vận chuyển?",
        a: "Mỗi cụm được đóng kiện gỗ theo kích thước thực tế, chèn lót ở các điểm chịu lực và cố định bằng dây chằng để không xê dịch trên đường.",
      },
    ],
  },
  {
    slug: "chuyen-nha-tron-goi-thao-dien",
    serviceSlug: "chuyen-nha",
    seoTitle: "Chuyển nhà trọn gói biệt thự 3 tầng khu Thảo Điền | Bốc Xếp Sài Gòn",
    seoDescription:
      "Case study chuyển nhà trọn gói biệt thự 3 tầng tại Thảo Điền: đóng gói piano, tranh và tủ rượu, tháo lắp nội thất lớn và sắp xếp lại tại nơi ở mới trong 2 ngày.",
    overview: [
      "Với nhà ở, thứ khiến khách hàng lo nhất không phải khối lượng mà là vài món đồ không thể thay thế. Một cây đàn, một bức tranh hay bộ ly pha lê hỏng thì không có cách nào bù lại bằng tiền công.",
      "Vì vậy công việc được tách làm hai phần rõ ràng: nhóm đồ thông thường xử lý theo nhịp nhanh, nhóm đồ giá trị cao đóng gói riêng, có người phụ trách riêng và đi trong chuyến riêng nếu cần.",
    ],
    context:
      "Gia chủ cần chuyển toàn bộ nội thất của một căn biệt thự, trong đó có nhiều món giá trị cao và dễ hư hỏng. Yêu cầu là đóng gói kỹ, vận chuyển an toàn và lắp đặt lại gọn gàng tại nơi ở mới.",
    cargo: "Nội thất biệt thự, piano, tranh nghệ thuật, tủ rượu",
    scale: ["Biệt thự 3 tầng", "Thời gian thực hiện 2 ngày"],
    scope: [
      "Đóng gói và bọc lót nội thất, hàng dễ vỡ",
      "Tháo lắp giường tủ, kệ lớn",
      "Vận chuyển và lắp đặt lại tại nơi ở mới",
    ],
    execution: [
      "Buổi khảo sát đi từng tầng để ghi lại danh mục đồ đạc và tách riêng nhóm cần xử lý đặc biệt. Piano, tranh và đồ thủy tinh được liệt kê riêng để bố trí vật tư bọc lót và người phụ trách trước.",
      "Nhà ba tầng nên trình tự đóng gói đi từ trên xuống: tầng cao xử lý trước, đồ đưa xuống tập kết ở tầng trệt theo từng phòng. Cách này giữ cho lối cầu thang luôn thông và không phải xách đồ ngược lên.",
      "Đồ nội thất lớn được tháo rời phần chân, kệ và cánh cửa; ốc vít cho vào túi dán ngay lên thân món đồ đó. Đến nơi mới chỉ cần mở túi là lắp lại được, không mất thời gian dò tìm.",
      "Khi xếp lên xe, thứ tự xếp được tính ngược theo thứ tự dỡ: món cần lắp trước ở nơi mới thì xếp sau cùng để lấy ra đầu tiên. Đồ giá trị cao được đặt ở vị trí cố định, có chèn lót xung quanh và không chất đồ khác lên trên.",
    ],
    process: [
      { step: "Khảo sát và báo giá", detail: "Ghi nhận danh mục đồ đạc, nhóm hàng cần bảo hiểm giá trị cao." },
      { step: "Đóng gói", detail: "Bọc lót nhiều lớp cho piano, tranh và đồ thủy tinh." },
      { step: "Vận chuyển", detail: "Xếp hàng theo thứ tự dỡ, cố định trong thùng xe." },
      { step: "Lắp đặt lại", detail: "Lắp giường tủ, kê đồ theo yêu cầu của gia chủ." },
    ],
    deliverables: [
      { title: "Đóng gói đồ dễ vỡ", detail: "Bọc lót nhiều lớp cho piano, tranh nghệ thuật và đồ thủy tinh trong tủ rượu." },
      { title: "Tháo lắp nội thất lớn", detail: "Tháo giường, tủ, kệ và gom ốc vít theo từng món để lắp lại nhanh." },
      { title: "Vận chuyển có cố định", detail: "Xếp theo thứ tự dỡ, chèn lót và cố định trong thùng xe." },
      { title: "Kê đặt tại nơi ở mới", detail: "Lắp lại và kê đồ theo vị trí gia chủ chỉ định trước khi bàn giao." },
    ],
    results: ["Hoàn tất trong 2 ngày", "Hàng dễ vỡ được bảo hiểm giá trị cao"],
    highlights: ["Xử lý riêng nhóm hàng giá trị cao", "Đóng gói nhiều lớp cho piano và tranh"],
    notes: [
      "Nên chốt trước vị trí kê đồ ở nhà mới, nhất là các món nặng, để không phải dời lại sau khi đã đặt xuống.",
      "Đồ có giá trị cao cần được thống nhất danh mục trước khi đóng gói để áp dụng phương án bảo hiểm phù hợp.",
    ],
    faqs: [
      {
        q: "Piano và tranh được đóng gói thế nào?",
        a: "Nhóm đồ này được bọc lót nhiều lớp, có người phụ trách riêng khi khiêng và được đặt ở vị trí cố định trong xe, không chất đồ khác lên trên.",
      },
      {
        q: "Có tháo lắp lại giường tủ tại nhà mới không?",
        a: "Có. Các món nội thất lớn được tháo rời khi đi và lắp lại tại nơi ở mới, ốc vít gom theo từng món nên không bị thiếu chi tiết khi lắp.",
      },
    ],
  },
  {
    slug: "dong-goi-hang-xuat-khau-tan-binh",
    serviceSlug: "dong-goi-hang-hoa",
    seoTitle: "Đóng gói 4.000 kiện hàng xuất khẩu tại KCN Tân Bình | Bốc Xếp Sài Gòn",
    seoDescription:
      "Case study đóng gói 4.000 kiện hàng xuất khẩu: đóng thùng carton 5 lớp, quấn màng PE lên pallet và dán nhãn barcode theo tiêu chuẩn EU, hoàn tất trong 10 ngày.",
    overview: [
      "Hàng xuất khẩu bị soi ở hai điểm: kiện có chịu được quãng đường dài hay không, và nhãn có đúng quy cách của thị trường nhập khẩu hay không. Kiện đóng chắc nhưng dán sai nhãn thì vẫn ách lại ở khâu chứng từ.",
      "Do đó công việc được tổ chức như một dây chuyền có bước kiểm tra, thay vì đóng xong rồi mới rà lại toàn bộ lô.",
    ],
    context:
      "Khách hàng cần đóng gói lô hàng xuất khẩu theo đúng tiêu chuẩn của thị trường nhập khẩu. Hàng phải đủ chắc để đi đường dài, dán nhãn đúng quy cách và kiểm tra được chất lượng trước khi xuất.",
    cargo: "Hàng xuất khẩu đóng thùng carton",
    scale: ["4.000 kiện hàng", "Thời gian thực hiện 10 ngày"],
    scope: [
      "Đóng thùng carton 5 lớp",
      "Quấn màng PE và lên pallet",
      "Dán nhãn barcode theo tiêu chuẩn xuất khẩu EU",
    ],
    execution: [
      "Trước khi chạy lô đầu tiên, vật tư được kiểm tra đối chiếu với yêu cầu của khách hàng: quy cách thùng, loại màng và mẫu nhãn. Một mẫu kiện hoàn chỉnh được làm trước để khách duyệt, lấy đó làm chuẩn cho cả lô.",
      "Dây chuyền chia thành ba trạm: đóng thùng, quấn màng lên pallet và dán nhãn. Mỗi trạm chỉ làm một việc nên thao tác đều tay, và khi có lỗi thì biết ngay lỗi phát sinh ở trạm nào.",
      "Nhãn barcode được quét kiểm tra thay vì chỉ nhìn bằng mắt, vì nhãn in mờ hoặc dán lệch mép thùng đều có thể khiến máy đọc không nhận ở đầu nhập.",
      "Hàng đóng xong được kiểm mẫu theo lô trước khi nhập kho chờ xuất; lô nào có kiện chưa đạt thì làm lại tại chỗ, không đẩy sang khâu sau.",
    ],
    process: [
      { step: "Chuẩn bị vật tư", detail: "Kiểm tra thùng, màng PE, nhãn theo yêu cầu của khách hàng." },
      { step: "Đóng gói theo dây chuyền", detail: "Chia công đoạn đóng thùng - quấn màng - dán nhãn." },
      { step: "Kiểm tra đầu ra", detail: "Kiểm mẫu theo lô trước khi nhập kho chờ xuất." },
    ],
    deliverables: [
      { title: "Đóng thùng carton 5 lớp", detail: "Đóng theo quy cách thống nhất với khách hàng, dán băng keo chắc các mép chịu lực." },
      { title: "Lên pallet và quấn màng PE", detail: "Xếp kiện thành khối vuông vức rồi quấn màng để cả pallet đi được đường dài." },
      { title: "Dán nhãn barcode", detail: "Dán đúng vị trí theo tiêu chuẩn xuất khẩu EU và quét kiểm tra khả năng đọc." },
      { title: "Kiểm mẫu theo lô", detail: "Lấy mẫu kiểm tra từng lô trước khi cho nhập kho chờ xuất." },
    ],
    results: ["Hoàn tất 4.000 kiện trong 10 ngày", "Tỉ lệ hàng lỗi khi kiểm tra đầu ra bằng 0"],
    highlights: ["Đóng gói theo tiêu chuẩn xuất khẩu EU", "Có bước kiểm tra đầu ra theo lô"],
    notes: [
      "Mẫu kiện chuẩn nên được khách hàng duyệt trước khi chạy lô đại trà, tránh phải bóc dán lại hàng loạt.",
      "Nhãn barcode cần được quét thử, vì lỗi thường gặp là dán vắt qua mép thùng khiến máy không đọc được.",
    ],
    faqs: [
      {
        q: "Vật tư đóng gói do bên nào chuẩn bị?",
        a: "Thùng carton, màng PE và nhãn được kiểm tra theo đúng yêu cầu khách hàng đưa ra trước khi bắt đầu. Quy cách cụ thể được chốt trong buổi khảo sát vật tư.",
      },
      {
        q: "Làm sao biết kiện hàng đạt chuẩn xuất khẩu?",
        a: "Một mẫu kiện hoàn chỉnh được duyệt trước để làm chuẩn, sau đó từng lô đều được lấy mẫu kiểm tra đầu ra trước khi nhập kho chờ xuất.",
      },
    ],
  },
  {
    slug: "xep-do-hang-roi-hiep-phuoc",
    serviceSlug: "xep-do-hang-hoa",
    seoTitle: "Đội xếp dỡ hàng rời cố định tại kho Hiệp Phước | Bốc Xếp Sài Gòn",
    seoDescription:
      "Case study cung ứng đội xếp dỡ cố định 20 người tại kho Hiệp Phước, Nhà Bè: xử lý trung bình 60 tấn nguyên liệu mỗi ngày, báo cáo sản lượng và chấm công điện tử hằng tuần.",
    overview: [
      "Khi khối lượng xếp dỡ phát sinh mỗi ngày, thuê lẻ theo từng đợt gây ra hai vấn đề: người mới không quen sơ đồ kho, và chi phí khó đối chiếu vì mỗi lần một mức. Đội cố định giải quyết cả hai.",
      "Điểm mấu chốt của mô hình theo tháng không nằm ở tốc độ một ngày, mà ở việc duy trì được cùng một nhóm người và có số liệu để khách hàng kiểm tra chi phí hằng tuần.",
    ],
    context:
      "Khách hàng có nhu cầu xếp dỡ hàng phát sinh mỗi ngày tại kho, nên cần một đội nhân công cố định thay vì thuê lẻ. Yêu cầu kèm theo là số liệu sản lượng và chấm công minh bạch để đối chiếu chi phí.",
    cargo: "Nguyên liệu dạng bao, hàng rời",
    scale: ["Trung bình 60 tấn/ngày", "Hợp tác theo tháng"],
    scope: [
      "Xếp dỡ hàng lên xuống xe tải và trong kho",
      "Đảo hàng, sắp xếp theo khu vực",
      "Báo cáo sản lượng và chấm công điện tử hàng tuần",
    ],
    execution: [
      "Đội được định biên cố định và trực tại kho theo lịch, nhận kế hoạch xuất nhập từ quản lý kho vào đầu ca. Nhờ làm quen mặt bằng, nhân công biết trước khu nào chứa loại hàng nào nên không mất thời gian hỏi vị trí.",
      "Hàng bao được xếp thành khối theo lớp so le để chồng hàng đứng vững, không bị đổ khi đảo hàng hoặc khi rút bao từ mặt ngoài. Lối đi giữa các khối được giữ đủ rộng cho xe đẩy và người di chuyển.",
      "Với hàng rời dạng bao, việc kéo lê làm rách bao là nguyên nhân hao hụt phổ biến nhất, nên thao tác nâng - đặt được quán triệt ngay từ đầu và đội trưởng nhắc trực tiếp tại hiện trường.",
      "Cuối tuần, sản lượng và dữ liệu chấm công được tổng hợp gửi khách hàng để đối chiếu với khối lượng thực tế đã xử lý.",
    ],
    process: [
      { step: "Định biên đội cố định", detail: "Bố trí 20 nhân sự trực tại kho theo lịch làm việc." },
      { step: "Vận hành hằng ngày", detail: "Nhận kế hoạch xuất nhập, xếp dỡ theo yêu cầu quản lý kho." },
      { step: "Báo cáo", detail: "Gửi sản lượng và dữ liệu chấm công hằng tuần cho khách hàng." },
    ],
    deliverables: [
      { title: "Xếp dỡ lên xuống xe", detail: "Xử lý hàng bao và hàng rời theo kế hoạch xuất nhập trong ngày." },
      { title: "Đảo hàng trong kho", detail: "Sắp xếp lại theo khu vực, giữ lối đi và chiều cao chồng hàng an toàn." },
      { title: "Báo cáo sản lượng", detail: "Tổng hợp khối lượng đã xử lý gửi khách hàng theo tuần." },
      { title: "Chấm công điện tử", detail: "Ghi nhận công của đội cố định để khách hàng đối chiếu chi phí." },
    ],
    personnel: "Đội cố định 20 người trực tại kho.",
    results: ["Duy trì sản lượng trung bình 60 tấn/ngày", "Có báo cáo sản lượng và chấm công điện tử hằng tuần"],
    highlights: ["Đội cố định, hạn chế thay đổi nhân sự", "Số liệu công việc minh bạch theo tuần"],
    notes: [
      "Kế hoạch xuất nhập gửi từ chiều hôm trước giúp bố trí người sát nhu cầu hơn là báo vào đầu ca.",
      "Chiều cao chồng bao nên được thống nhất với quản lý kho để vừa tận dụng diện tích vừa an toàn khi rút hàng.",
    ],
    faqs: [
      {
        q: "Thuê đội cố định khác gì thuê theo buổi?",
        a: "Đội cố định trực tại kho theo lịch nên quen mặt bằng và quy trình của khách hàng, ít phải hướng dẫn lại. Chi phí cũng ổn định và đối chiếu được qua dữ liệu chấm công hằng tuần.",
      },
      {
        q: "Khách hàng theo dõi khối lượng công việc bằng cách nào?",
        a: "Sản lượng xử lý và dữ liệu chấm công được tổng hợp gửi hằng tuần để đối chiếu với thực tế tại kho.",
      },
    ],
  },
  {
    slug: "hang-air-cargo-tan-son-nhat",
    serviceSlug: "boc-xep-san-bay",
    seoTitle: "Xử lý hàng air cargo tại Tân Sơn Nhất | Dự án Bốc Xếp Sài Gòn",
    seoDescription:
      "Case study cung ứng nhân công xử lý hàng air cargo tại Tân Sơn Nhất: build-up và break-down pallet, làm theo ca sát giờ cắt máng, hợp tác 6 tháng với đối tác forwarder.",
    overview: [
      "Hàng air chạy theo giờ cắt máng của từng chuyến, nên công việc không dàn đều trong ngày mà dồn vào những khung giờ nhất định. Đội phải có mặt đúng khung đó, chậm là hàng rớt chuyến.",
      "Điều kiện tiên quyết là nhân sự phải qua kiểm tra an ninh hàng không mới vào được khu vực làm việc. Đây là lý do mô hình hợp tác dài hạn phù hợp hơn việc điều động nhân công lẻ theo từng ngày.",
    ],
    context:
      "Đối tác forwarder cần nhân sự xử lý hàng air theo ca, sát giờ cắt máng của từng chuyến. Nhân sự phải đáp ứng điều kiện an ninh của khu vực sân bay và làm việc ổn định trong thời gian dài.",
    cargo: "Hàng air cargo (hàng không)",
    scale: ["Hợp tác 6 tháng"],
    scope: [
      "Build-up pallet hàng air",
      "Break-down pallet hàng nhập",
      "Sang xe và sắp xếp hàng theo lô",
    ],
    execution: [
      "Ca làm được xếp theo giờ cắt máng của từng chuyến, nên lịch nhân sự bám theo lịch bay chứ không theo giờ hành chính. Đội trưởng nhận kế hoạch chuyến và bố trí người trước mỗi ca.",
      "Khi build-up, kiện được xếp theo hình dạng pallet air, kiện nặng nằm dưới và phần trên vuốt gọn theo đường bao cho phép, sau đó phủ lưới và cố định. Xếp sai đường bao thì pallet phải dỡ ra làm lại, mất đúng khoảng thời gian không có để mất.",
      "Với hàng nhập, việc break-down được làm theo lô để chứng từ và hàng đi cùng nhau, tránh trộn lẫn giữa các lô của nhiều chủ hàng khi sang xe.",
      "Kiện có dấu hiệu móp, rách được tách và báo cho đối tác forwarder ngay tại thời điểm phát hiện, thay vì để phát sinh khiếu nại về sau.",
    ],
    process: [
      { step: "Kiểm tra an ninh nhân sự", detail: "Nhân công được kiểm tra an ninh hàng không trước khi vào khu vực làm việc." },
      { step: "Làm theo ca", detail: "Bố trí ca theo giờ cắt máng của từng chuyến." },
      { step: "Bàn giao", detail: "Bàn giao hàng theo lô cho đối tác forwarder." },
    ],
    deliverables: [
      { title: "Build-up pallet hàng xuất", detail: "Xếp kiện theo đường bao pallet air, phủ lưới và cố định trước giờ cắt máng." },
      { title: "Break-down hàng nhập", detail: "Dỡ pallet và tách hàng theo từng lô để khớp với chứng từ." },
      { title: "Sang xe theo lô", detail: "Chuyển hàng lên phương tiện của đối tác, giữ nguyên phân lô." },
      { title: "Ghi nhận kiện bất thường", detail: "Tách riêng và báo ngay các kiện móp, rách khi phát hiện." },
    ],
    personnel: "Nhân công đã qua kiểm tra an ninh hàng không.",
    results: ["Cung ứng nhân sự liên tục trong 6 tháng cho đối tác forwarder quốc tế"],
    highlights: ["Nhân sự đủ điều kiện làm việc khu vực sân bay", "Làm theo ca sát giờ cắt máng"],
    notes: [
      "Thời gian làm thủ tục an ninh cho nhân sự cần tính vào kế hoạch trước khi bắt đầu hợp tác.",
      "Lịch ca nên bám theo lịch chuyến bay, vì khối lượng dồn vào các khung giờ trước cắt máng.",
    ],
    faqs: [
      {
        q: "Nhân sự có đủ điều kiện làm việc trong khu vực sân bay không?",
        a: "Nhân công tham gia dự án này đã qua kiểm tra an ninh hàng không trước khi vào khu vực làm việc. Với hợp tác mới, phần thủ tục này cần thời gian chuẩn bị nên được đưa vào kế hoạch từ đầu.",
      },
      {
        q: "Có làm được ca đêm hoặc ca gãy theo lịch bay không?",
        a: "Có. Ca làm được xếp theo giờ cắt máng của từng chuyến, nên lịch bám theo lịch bay chứ không cố định theo giờ hành chính.",
      },
    ],
  },
];

export const findProjectDetail = (slug: string) => {
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return null;
  const detail = PROJECT_DETAILS.find((d) => d.slug === slug) ?? { slug, serviceSlug: "" };
  return { project, detail } as { project: Project; detail: ProjectDetail };
};

export const relatedProjects = (slug: string, category: string) =>
  [
    ...PROJECTS.filter((p) => p.slug !== slug && p.category === category),
    ...PROJECTS.filter((p) => p.slug !== slug && p.category !== category),
  ].slice(0, 3);
