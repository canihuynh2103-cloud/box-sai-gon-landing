import svcWarehouse from "@/assets/svc-warehouse.jpg";
import svcContainer from "@/assets/svc-container.jpg";
import svcFactory from "@/assets/svc-factory.jpg";
import svcPort from "@/assets/svc-port.jpg";
import svcAirport from "@/assets/svc-airport.jpg";
import svcOffice from "@/assets/svc-office.jpg";
import svcHouse from "@/assets/svc-house.jpg";
import svcPacking from "@/assets/svc-packing.jpg";

export const HOTLINE = "0888.977.822";
export const HOTLINE_TEL = "0888977822";
export const EMAIL = "info@bocxepsaigon.vn";
export const ADDRESS = "234 Tô Ngọc Vân, Thủ Đức, TP.HCM";
export const WORK_HOURS = "T2 - CN: 6h00 - 22h00";

export const BRANCHES = [
  {
    name: "Trụ sở chính",
    address: "234 Tô Ngọc Vân, Thủ Đức, TP.HCM",
    phone: "0888.977.822",
    area: "TP. Thủ Đức, Quận 2, Quận 9, Đồng Nai, Bình Dương",
  },
  {
    name: "Chi nhánh Tân Bình",
    address: "78 Cộng Hòa, Phường 4, Tân Bình, TP.HCM",
    phone: "0888.977.822",
    area: "Tân Bình, Tân Phú, Gò Vấp, Sân bay Tân Sơn Nhất",
  },
  {
    name: "Chi nhánh Bình Tân",
    address: "45 Kinh Dương Vương, Bình Tân, TP.HCM",
    phone: "0888.977.822",
    area: "Bình Tân, Bình Chánh, Quận 6, Long An",
  },
];

export const NAV_ITEMS = [
  { label: "Dịch Vụ", href: "#dich-vu" },
  { label: "Giới Thiệu", href: "#gioi-thieu" },
  { label: "Dự Án", href: "#du-an" },
  { label: "Bảng Giá", href: "#bang-gia" },
  { label: "FAQ", href: "#faq" },
  { label: "Liên Hệ", href: "#lien-he" },
];

export type Service = {
  title: string;
  desc: string;
  icon: string;
  image: string;
  posts?: { title: string; excerpt: string }[];
};

export const SERVICES: Service[] = [
  {
    title: "Bốc Xếp Kho Hàng",
    desc: "Nhập - xuất kho, sắp xếp pallet, kiểm đếm hàng hóa theo ca linh hoạt.",
    icon: "Warehouse",
    image: svcWarehouse,
  },
  {
    title: "Bốc Xếp Container",
    desc: "Rút ruột container, đóng hàng lên cont tại depot, cảng và kho riêng.",
    icon: "Container",
    image: svcContainer,
  },
  {
    title: "Bốc Xếp Nhà Máy",
    desc: "Di dời máy móc, nguyên vật liệu, thành phẩm trong khu công nghiệp.",
    icon: "Factory",
    image: svcFactory,
  },
  {
    title: "Bốc Xếp Cảng",
    desc: "Nhân công có thẻ ra vào cảng Cát Lái, Hiệp Phước, Tân Cảng.",
    icon: "Anchor",
    image: svcPort,
  },
  {
    title: "Bốc Xếp Sân Bay",
    desc: "Xử lý hàng air cargo tại Tân Sơn Nhất, đúng quy trình an ninh.",
    icon: "Plane",
    image: svcAirport,
  },
  {
    title: "Thuê Nhân Công",
    desc: "Cung ứng nhân công thời vụ theo ca, theo ngày, có giám sát đội.",
    icon: "Users",
    image: svcWarehouse,
  },
  {
    title: "Đóng Gói Hàng Hóa",
    desc: "Quấn màng PE, đóng thùng gỗ, chèn lót hàng dễ vỡ đạt chuẩn.",
    icon: "PackageCheck",
    image: svcPacking,
  },
  {
    title: "Chuyển Kho",
    desc: "Trọn gói tháo dỡ, vận chuyển và sắp xếp lại kho mới đúng sơ đồ.",
    icon: "Boxes",
    image: svcWarehouse,
  },
  {
    title: "Chuyển Văn Phòng",
    desc: "Chuyển bàn ghế, thiết bị IT, hồ sơ ngoài giờ để không gián đoạn.",
    icon: "Building2",
    image: svcOffice,
  },
  {
    title: "Chuyển Nhà",
    desc: "Chuyển nhà trọn gói, bọc lót nội thất, lắp đặt lại tận nơi.",
    icon: "Home",
    image: svcHouse,
  },
  {
    title: "Xếp Dỡ Hàng Hóa",
    desc: "Xếp dỡ xe tải, xe container, hàng rời và hàng bao kiện.",
    icon: "Forklift",
    image: svcContainer,
  },
  {
    title: "Bốc Hàng Theo Giờ",
    desc: "Điều động nhanh trong 60 phút, tính phí minh bạch theo giờ.",
    icon: "Clock",
    image: svcPacking,
  },
  {
    title: "Bốc Xếp Theo Tháng",
    desc: "Đội cố định trực tại kho, báo cáo sản lượng hàng tuần.",
    icon: "CalendarRange",
    image: svcFactory,
  },
  {
    title: "Bốc Xếp Hợp Đồng",
    desc: "Hợp đồng dài hạn, xuất hóa đơn VAT, cam kết SLA rõ ràng.",
    icon: "FileSignature",
    image: svcPort,
  },
];

export const PARTNERS = [
  "Tân Cảng Sài Gòn",
  "Cảng Cát Lái",
  "VinGroup",
  "Samsung",
  "Unilever",
  "P&G",
  "DHL",
  "Gemalink",
  "SPCT",
  "Nestlé",
];

export const PROJECT_FILTERS = [
  "Tất Cả",
  "Chuyển Kho",
  "Container",
  "Văn Phòng",
  "Nhà Máy",
  "Chuyển Nhà",
  "Đóng Gói",
  "Xếp Dỡ",
  "Sân Bay",
];

export type Project = {
  id: number;
  name: string;
  category: string;
  year: string;
  location: string;
  duration: string;
  image: string;
  description: string;
};

export const PROJECTS: Project[] = [
  {
    id: 1,
    name: "Chuyển kho tổng 6.000m² Unilever",
    category: "Chuyển Kho",
    year: "2024",
    location: "KCN Vsip 1, Bình Dương",
    duration: "12 ngày",
    image: svcWarehouse,
    description:
      "Huy động 45 nhân công chia 3 ca, di dời hơn 9.000 pallet hàng tiêu dùng sang kho mới. Toàn bộ hàng được kiểm đếm hai lớp và sắp xếp lại theo sơ đồ vị trí do khách hàng cung cấp.",
  },
  {
    id: 2,
    name: "Rút ruột 120 container tại Cát Lái",
    category: "Container",
    year: "2024",
    location: "Cảng Cát Lái, TP. Thủ Đức",
    duration: "18 ngày",
    image: svcContainer,
    description:
      "Đội 30 nhân công có thẻ ra vào cảng thực hiện rút ruột container hàng bao kiện, trung bình 7 cont/ngày, đảm bảo tiến độ giải phóng bãi và tránh phí lưu cont.",
  },
  {
    id: 3,
    name: "Chuyển văn phòng 14 tầng Deutsches Haus",
    category: "Văn Phòng",
    year: "2023",
    location: "Quận 1, TP.HCM",
    duration: "3 đêm",
    image: svcOffice,
    description:
      "Thi công ngoài giờ hành chính từ 20h đến 5h sáng, di dời 320 bộ bàn ghế và toàn bộ hệ thống máy chủ. Sáng hôm sau nhân sự khách hàng làm việc bình thường.",
  },
  {
    id: 4,
    name: "Di dời dây chuyền sản xuất Samsung",
    category: "Nhà Máy",
    year: "2023",
    location: "KCN Sóng Thần, Bình Dương",
    duration: "21 ngày",
    image: svcFactory,
    description:
      "Phối hợp cùng kỹ sư nhà máy tháo dỡ, đóng kiện gỗ và lắp đặt lại 14 cụm máy nặng. Sử dụng xe nâng 5 tấn và pa lăng chuyên dụng, không xảy ra sự cố.",
  },
  {
    id: 5,
    name: "Chuyển nhà trọn gói khu Thảo Điền",
    category: "Chuyển Nhà",
    year: "2024",
    location: "TP. Thủ Đức",
    duration: "2 ngày",
    image: svcHouse,
    description:
      "Chuyển toàn bộ nội thất biệt thự 3 tầng bao gồm piano, tranh nghệ thuật và tủ rượu. Hàng dễ vỡ được bọc lót nhiều lớp và có bảo hiểm giá trị cao.",
  },
  {
    id: 6,
    name: "Đóng gói xuất khẩu 4.000 kiện hàng",
    category: "Đóng Gói",
    year: "2022",
    location: "KCN Tân Bình, TP.HCM",
    duration: "10 ngày",
    image: svcPacking,
    description:
      "Đóng thùng carton 5 lớp, quấn màng PE và dán nhãn barcode theo tiêu chuẩn xuất khẩu EU. Tỉ lệ hàng lỗi khi kiểm tra đầu ra bằng 0.",
  },
  {
    id: 7,
    name: "Xếp dỡ hàng rời cho Nestlé",
    category: "Xếp Dỡ",
    year: "2023",
    location: "Kho Hiệp Phước, Nhà Bè",
    duration: "Theo tháng",
    image: svcPort,
    description:
      "Đội cố định 20 người trực tại kho, xếp dỡ trung bình 60 tấn nguyên liệu mỗi ngày, có báo cáo sản lượng và chấm công điện tử hàng tuần.",
  },
  {
    id: 8,
    name: "Xử lý hàng air cargo Tân Sơn Nhất",
    category: "Sân Bay",
    year: "2024",
    location: "Sân bay Tân Sơn Nhất, TP.HCM",
    duration: "6 tháng",
    image: svcAirport,
    description:
      "Cung ứng nhân công đã qua kiểm tra an ninh hàng không, xử lý build-up và break-down pallet hàng air cho đối tác forwarder quốc tế.",
  },
];

export const REVIEWS = [
  {
    name: "Nguyễn Thanh Hải",
    role: "Giám đốc Logistics, Công ty TNHH Vận Tải Đại Phát",
    content:
      "Đội bốc xếp có mặt đúng giờ, làm việc rất nhanh và gọn. Chúng tôi thuê theo tháng gần 2 năm nay và chưa từng phải phàn nàn về nhân sự.",
  },
  {
    name: "Trần Minh Quân",
    role: "Chủ doanh nghiệp phân phối FMCG",
    content:
      "Báo giá minh bạch, không phát sinh lắt nhắt. Hàng dễ vỡ được bọc lót cẩn thận, kiểm đếm rõ ràng trước và sau khi bốc.",
  },
  {
    name: "Lê Thị Bích Ngọc",
    role: "Quản lý sản xuất, nhà máy KCN Sóng Thần",
    content:
      "Đợt di dời dây chuyền của chúng tôi rất gấp, bên Bốc Xếp Sài Gòn huy động thêm người chỉ trong một buổi chiều. Rất chuyên nghiệp.",
  },
  {
    name: "Phạm Văn Cường",
    role: "Trưởng kho, chuỗi siêu thị bán lẻ",
    content:
      "Nhân công được đào tạo an toàn, đeo đầy đủ bảo hộ. Làm ca đêm vẫn giữ tốc độ tốt, không ảnh hưởng đến lịch xuất hàng buổi sáng.",
  },
  {
    name: "Đặng Hoàng Nam",
    role: "Giám đốc điều hành, công ty forwarder",
    content:
      "Điều động rất nhanh, gọi hotline là có người phản hồi ngay. Hợp đồng rõ ràng, xuất hóa đơn VAT đầy đủ cho công ty chúng tôi.",
  },
];

export const PRICING = [
  {
    name: "Theo Giờ",
    price: "50.000 - 80.000",
    unit: "VNĐ/giờ/người",
    note: "Tối thiểu 3 giờ",
    popular: false,
    features: [
      "Điều động trong 60 phút",
      "Tính phí theo giờ thực tế",
      "Phù hợp việc phát sinh gấp",
      "Có giám sát đội đi kèm",
      "Trang bị bảo hộ đầy đủ",
    ],
    cta: "Đặt Nhân Công",
  },
  {
    name: "Theo Ngày",
    price: "400.000 - 600.000",
    unit: "VNĐ/ngày/người",
    note: "Ca 8 giờ, tăng ca tính riêng",
    popular: true,
    features: [
      "Đội hình cố định cả ngày",
      "Miễn phí khảo sát trước",
      "Hỗ trợ dụng cụ xe đẩy, dây ràng",
      "Kiểm đếm và biên bản bàn giao",
      "Ưu tiên khi đặt từ 5 người",
    ],
    cta: "Nhận Báo Giá",
  },
  {
    name: "Theo Tháng",
    price: "Liên hệ",
    unit: "Hợp đồng dài hạn",
    note: "Chiết khấu theo sản lượng",
    popular: false,
    features: [
      "Đội cố định trực tại kho",
      "Báo cáo sản lượng hàng tuần",
      "Xuất hóa đơn VAT",
      "Cam kết SLA trong hợp đồng",
      "Thay thế nhân sự trong 24h",
    ],
    cta: "Nhận Tư Vấn",
  },
];

export const FAQS = [
  {
    q: "Bốc Xếp Sài Gòn phục vụ những khu vực nào?",
    a: "Chúng tôi phục vụ toàn bộ 22 quận huyện TP.HCM và các tỉnh lân cận gồm Bình Dương, Đồng Nai, Long An, Bà Rịa - Vũng Tàu, Tây Ninh. Với hợp đồng dài hạn, chúng tôi có thể điều động nhân sự đi các tỉnh xa hơn.",
  },
  {
    q: "Bao lâu thì nhận được báo giá?",
    a: "Với yêu cầu đơn giản, chúng tôi báo giá qua điện thoại hoặc Zalo trong vòng 15 phút. Với công trình lớn cần khảo sát, chúng tôi cử người tới trong ngày và gửi báo giá chi tiết trong vòng 24 giờ.",
  },
  {
    q: "Có bảo hiểm hàng hóa không?",
    a: "Có. Mọi đơn hàng đều có cam kết bồi thường theo biên bản bàn giao. Với hàng giá trị cao như máy móc, thiết bị điện tử hoặc đồ nghệ thuật, chúng tôi mua bảo hiểm hàng hóa riêng theo giá trị khai báo.",
  },
  {
    q: "Giá dịch vụ được tính như thế nào?",
    a: "Giá phụ thuộc vào số lượng nhân công, thời lượng làm việc, khối lượng và tính chất hàng hóa, khoảng cách di chuyển cũng như điều kiện mặt bằng (có thang máy hay không, khoảng cách khiêng vác). Chúng tôi luôn chốt giá trước khi thi công, không phát sinh ngoài thỏa thuận.",
  },
  {
    q: "Có làm ca đêm, ngày lễ không?",
    a: "Có, chúng tôi nhận việc 24/7 kể cả ca đêm, Chủ Nhật và ngày lễ Tết. Phụ phí ca đêm và ngày lễ được thông báo rõ ràng trong báo giá ban đầu.",
  },
  {
    q: "Quy trình làm việc gồm những bước nào?",
    a: "Bốn bước: (1) Tiếp nhận yêu cầu qua hotline hoặc form; (2) Khảo sát và báo giá; (3) Ký xác nhận, điều động nhân công đúng giờ; (4) Nghiệm thu, ký biên bản bàn giao và thanh toán.",
  },
  {
    q: "Có những phương thức thanh toán nào?",
    a: "Chúng tôi nhận tiền mặt, chuyển khoản ngân hàng và ví điện tử. Khách hàng doanh nghiệp có thể thanh toán theo kỳ, xuất hóa đơn VAT đầy đủ theo hợp đồng.",
  },
  {
    q: "Nhân công có được đào tạo an toàn lao động không?",
    a: "Toàn bộ nhân công đều qua khóa huấn luyện an toàn lao động, được trang bị giày bảo hộ, găng tay, đai lưng và nón bảo hộ. Nhân sự làm việc tại cảng và sân bay còn có thẻ ra vào và chứng nhận an ninh riêng.",
  },
];

export const STATS = [
  { value: 10, suffix: "+", label: "Năm Kinh Nghiệm" },
  { value: 1200, suffix: "+", label: "Dự Án" },
  { value: 850, suffix: "+", label: "Khách Hàng" },
  { value: 80, suffix: "+", label: "Nhân Công" },
];
