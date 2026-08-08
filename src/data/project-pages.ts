import { PROJECTS, type Project } from "@/data/site";

export type ProjectDetail = {
  slug: string;
  /** Trang dịch vụ tương ứng để liên kết nội bộ */
  serviceSlug: string;
  /** Loại hàng hóa xử lý trong dự án */
  cargo?: string;
  /** Quy mô công việc (chỉ ghi dữ liệu đã có) */
  scale?: string[];
  /** Phạm vi công việc */
  scope?: string[];
  /** Quy trình thực hiện */
  process?: { step: string; detail: string }[];
  /** Nhân sự tham gia */
  personnel?: string;
  /** Thiết bị / phương tiện sử dụng */
  equipment?: string[];
  /** Kết quả hoàn thành */
  results?: string[];
  /** Điểm nổi bật */
  highlights?: string[];
  faqs?: { q: string; a: string }[];
};

/**
 * Chỉ mô tả những gì đã có trong dữ liệu dự án hiện tại.
 * Trường nào chưa có dữ liệu thì để trống để bổ sung sau, không tự suy diễn.
 */
export const PROJECT_DETAILS: ProjectDetail[] = [
  {
    slug: "chuyen-kho-tong-unilever-vsip-1",
    serviceSlug: "chuyen-kho",
    cargo: "Hàng tiêu dùng nhanh (FMCG) đóng thùng, xếp trên pallet",
    scale: ["Kho tổng khoảng 6.000m²", "Hơn 9.000 pallet hàng", "Thời gian thực hiện 12 ngày"],
    scope: [
      "Lập kế hoạch di dời theo từng khu vực kho",
      "Hạ pallet, kiểm đếm và bọc lót hàng trước khi vận chuyển",
      "Chuyển hàng sang kho mới theo từng đợt",
      "Sắp xếp lại hàng theo sơ đồ vị trí do khách hàng cung cấp",
    ],
    process: [
      { step: "Khảo sát và lập kế hoạch", detail: "Đi thực tế hai kho, chốt trình tự di dời và số nhân sự mỗi ca." },
      { step: "Chuẩn bị", detail: "Bố trí dụng cụ, màng PE, khu vực tập kết và lối di chuyển an toàn." },
      { step: "Bốc xếp và vận chuyển", detail: "Làm theo 3 ca liên tục để hạn chế gián đoạn hoạt động kho." },
      { step: "Kiểm đếm hai lớp", detail: "Đếm khi xuất kho cũ và khi nhập kho mới, đối chiếu số liệu." },
      { step: "Sắp xếp và bàn giao", detail: "Xếp hàng đúng vị trí theo sơ đồ, bàn giao và nghiệm thu." },
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
  },
  {
    slug: "rut-ruot-container-cat-lai",
    serviceSlug: "boc-xep-container",
    cargo: "Hàng bao kiện trong container",
    scale: ["120 container", "Trung bình 7 container/ngày", "Thời gian thực hiện 18 ngày"],
    scope: [
      "Rút ruột container tại bãi",
      "Sang hàng lên xe tải / vào kho theo chỉ định",
      "Xếp hàng gọn để giải phóng bãi",
    ],
    process: [
      { step: "Đăng ký ra vào cảng", detail: "Nhân sự có thẻ ra vào cảng, làm việc theo quy định khu vực bãi." },
      { step: "Nhận lệnh và vị trí cont", detail: "Bố trí đội theo số cont cần rút trong ngày." },
      { step: "Rút hàng theo dây chuyền", detail: "Chia nhóm trong cont, nhóm trung chuyển và nhóm xếp hàng." },
      { step: "Kiểm đếm và bàn giao", detail: "Đếm kiện, ghi nhận hàng hư hỏng nếu có, ký biên bản." },
    ],
    personnel: "30 nhân công có thẻ ra vào cảng.",
    results: [
      "Rút ruột 120 container trong 18 ngày",
      "Duy trì tiến độ giải phóng bãi, tránh phát sinh phí lưu cont",
    ],
    highlights: ["Nhân sự đã có thẻ ra vào cảng", "Tổ chức theo dây chuyền để giữ năng suất ổn định"],
  },
  {
    slug: "chuyen-van-phong-deutsches-haus",
    serviceSlug: "chuyen-van-phong",
    cargo: "Bàn ghế, tài liệu, thiết bị IT và hệ thống máy chủ",
    scale: ["Toà nhà 14 tầng", "320 bộ bàn ghế", "Thi công 3 đêm"],
    scope: [
      "Đóng gói tài liệu, thiết bị theo từng phòng ban",
      "Tháo lắp bàn ghế, vách ngăn",
      "Di dời hệ thống máy chủ theo hướng dẫn của bộ phận IT",
      "Lắp đặt lại và dọn dẹp trước giờ làm việc",
    ],
    process: [
      { step: "Khảo sát và dán nhãn", detail: "Đánh dấu theo phòng ban, lập sơ đồ chỗ ngồi mới." },
      { step: "Thi công ngoài giờ", detail: "Làm từ 20h đến 5h sáng để không ảnh hưởng giờ hành chính." },
      { step: "Lắp đặt lại", detail: "Bố trí bàn ghế đúng sơ đồ, kết nối lại thiết bị." },
      { step: "Kiểm tra và bàn giao", detail: "Cùng khách hàng kiểm tra từng khu vực trước khi kết thúc ca." },
    ],
    results: [
      "Hoàn tất trong 3 đêm",
      "Nhân sự khách hàng làm việc bình thường vào sáng hôm sau",
    ],
    highlights: ["Thi công hoàn toàn ngoài giờ hành chính", "Di dời thiết bị máy chủ có phối hợp với bộ phận IT"],
  },
  {
    slug: "di-doi-day-chuyen-samsung",
    serviceSlug: "boc-xep-nha-may",
    cargo: "Máy móc, dây chuyền sản xuất nặng",
    scale: ["14 cụm máy nặng", "Thời gian thực hiện 21 ngày"],
    scope: [
      "Phối hợp kỹ sư nhà máy tháo dỡ máy móc",
      "Đóng kiện gỗ, chèn lót và cố định máy",
      "Vận chuyển và đưa máy vào vị trí mới",
      "Hỗ trợ lắp đặt lại theo hướng dẫn kỹ thuật",
    ],
    process: [
      { step: "Khảo sát cùng kỹ sư", detail: "Chốt phương án tháo dỡ, đường di chuyển và điểm kê máy." },
      { step: "Tháo dỡ và đóng kiện", detail: "Đóng kiện gỗ theo kích thước từng cụm máy." },
      { step: "Di chuyển máy", detail: "Dùng xe nâng và pa lăng chuyên dụng, đi theo tuyến đã khảo sát." },
      { step: "Lắp đặt và nghiệm thu", detail: "Đưa máy vào vị trí, hỗ trợ kỹ sư căn chỉnh và nghiệm thu." },
    ],
    equipment: ["Xe nâng 5 tấn", "Pa lăng chuyên dụng", "Kiện gỗ, con lăn, dây chằng"],
    results: ["Hoàn tất di dời 14 cụm máy trong 21 ngày", "Không xảy ra sự cố trong quá trình thi công"],
    highlights: ["Phối hợp trực tiếp với kỹ sư nhà máy", "Sử dụng thiết bị nâng hạ phù hợp cho máy nặng"],
  },
  {
    slug: "chuyen-nha-tron-goi-thao-dien",
    serviceSlug: "chuyen-nha",
    cargo: "Nội thất biệt thự, piano, tranh nghệ thuật, tủ rượu",
    scale: ["Biệt thự 3 tầng", "Thời gian thực hiện 2 ngày"],
    scope: [
      "Đóng gói và bọc lót nội thất, hàng dễ vỡ",
      "Tháo lắp giường tủ, kệ lớn",
      "Vận chuyển và lắp đặt lại tại nơi ở mới",
    ],
    process: [
      { step: "Khảo sát và báo giá", detail: "Ghi nhận danh mục đồ đạc, nhóm hàng cần bảo hiểm giá trị cao." },
      { step: "Đóng gói", detail: "Bọc lót nhiều lớp cho piano, tranh và đồ thủy tinh." },
      { step: "Vận chuyển", detail: "Xếp hàng theo thứ tự dỡ, cố định trong thùng xe." },
      { step: "Lắp đặt lại", detail: "Lắp giường tủ, kê đồ theo yêu cầu của gia chủ." },
    ],
    results: ["Hoàn tất trong 2 ngày", "Hàng dễ vỡ được bảo hiểm giá trị cao"],
    highlights: ["Xử lý riêng nhóm hàng giá trị cao", "Đóng gói nhiều lớp cho piano và tranh"],
  },
  {
    slug: "dong-goi-hang-xuat-khau-tan-binh",
    serviceSlug: "dong-goi-hang-hoa",
    cargo: "Hàng xuất khẩu đóng thùng carton",
    scale: ["4.000 kiện hàng", "Thời gian thực hiện 10 ngày"],
    scope: [
      "Đóng thùng carton 5 lớp",
      "Quấn màng PE và lên pallet",
      "Dán nhãn barcode theo tiêu chuẩn xuất khẩu EU",
    ],
    process: [
      { step: "Chuẩn bị vật tư", detail: "Kiểm tra thùng, màng PE, nhãn theo yêu cầu của khách hàng." },
      { step: "Đóng gói theo dây chuyền", detail: "Chia công đoạn đóng thùng - quấn màng - dán nhãn." },
      { step: "Kiểm tra đầu ra", detail: "Kiểm mẫu theo lô trước khi nhập kho chờ xuất." },
    ],
    results: ["Hoàn tất 4.000 kiện trong 10 ngày", "Tỉ lệ hàng lỗi khi kiểm tra đầu ra bằng 0"],
    highlights: ["Đóng gói theo tiêu chuẩn xuất khẩu EU", "Có bước kiểm tra đầu ra theo lô"],
  },
  {
    slug: "xep-do-hang-roi-hiep-phuoc",
    serviceSlug: "xep-do-hang-hoa",
    cargo: "Nguyên liệu dạng bao, hàng rời",
    scale: ["Trung bình 60 tấn/ngày", "Hợp tác theo tháng"],
    scope: [
      "Xếp dỡ hàng lên xuống xe tải và trong kho",
      "Đảo hàng, sắp xếp theo khu vực",
      "Báo cáo sản lượng và chấm công điện tử hàng tuần",
    ],
    process: [
      { step: "Định biên đội cố định", detail: "Bố trí 20 nhân sự trực tại kho theo lịch làm việc." },
      { step: "Vận hành hằng ngày", detail: "Nhận kế hoạch xuất nhập, xếp dỡ theo yêu cầu quản lý kho." },
      { step: "Báo cáo", detail: "Gửi sản lượng và dữ liệu chấm công hằng tuần cho khách hàng." },
    ],
    personnel: "Đội cố định 20 người trực tại kho.",
    results: ["Duy trì sản lượng trung bình 60 tấn/ngày", "Có báo cáo sản lượng và chấm công điện tử hằng tuần"],
    highlights: ["Đội cố định, hạn chế thay đổi nhân sự", "Số liệu công việc minh bạch theo tuần"],
  },
  {
    slug: "hang-air-cargo-tan-son-nhat",
    serviceSlug: "boc-xep-san-bay",
    cargo: "Hàng air cargo (hàng không)",
    scale: ["Hợp tác 6 tháng"],
    scope: [
      "Build-up pallet hàng air",
      "Break-down pallet hàng nhập",
      "Sang xe và sắp xếp hàng theo lô",
    ],
    process: [
      { step: "Kiểm tra an ninh nhân sự", detail: "Nhân công được kiểm tra an ninh hàng không trước khi vào khu vực làm việc." },
      { step: "Làm theo ca", detail: "Bố trí ca theo giờ cắt máng của từng chuyến." },
      { step: "Bàn giao", detail: "Bàn giao hàng theo lô cho đối tác forwarder." },
    ],
    personnel: "Nhân công đã qua kiểm tra an ninh hàng không.",
    results: ["Cung ứng nhân sự liên tục trong 6 tháng cho đối tác forwarder quốc tế"],
    highlights: ["Nhân sự đủ điều kiện làm việc khu vực sân bay", "Làm theo ca sát giờ cắt máng"],
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
