/**
 * GIAI ĐOẠN 2 — Content Hub: bản đồ chủ đề theo 14 cluster dịch vụ.
 * Dùng để lên lịch viết bài (Giai đoạn 3) và tạo internal link về pillar page /dich-vu/$slug.
 */
export type TopicIntent = "informational" | "commercial" | "transactional" | "local";

export type Topic = {
  title: string;
  slug: string;
  keyword: string;
  intent: TopicIntent;
  priority: 1 | 2 | 3;
  pillar: string; // slug của trang dịch vụ trụ cột
};

export type Cluster = { pillar: string; name: string; topics: Topic[] };

const t = (
  title: string,
  slug: string,
  keyword: string,
  intent: TopicIntent,
  priority: 1 | 2 | 3,
  pillar: string,
): Topic => ({ title, slug, keyword, intent, priority, pillar });

export const CONTENT_CLUSTERS: Cluster[] = [
  {
    pillar: "boc-xep-kho-hang",
    name: "Bốc xếp kho hàng",
    topics: [
      t("Quy trình nhập xuất kho chuẩn 5 bước cho kho hàng TP.HCM", "quy-trinh-nhap-xuat-kho-chuan-5-buoc", "quy trình nhập xuất kho", "informational", 1, "boc-xep-kho-hang"),
      t("Giá thuê bốc xếp kho hàng TP.HCM: bảng giá và cách tính", "gia-thue-boc-xep-kho-hang-tphcm", "giá bốc xếp kho hàng", "commercial", 1, "boc-xep-kho-hang"),
      t("Cách xếp pallet đúng chuẩn để không hư hàng", "cach-xep-pallet-dung-chuan", "xếp pallet đúng cách", "informational", 2, "boc-xep-kho-hang"),
      t("Kiểm kê kho cuối năm: checklist nhân sự và thời gian", "kiem-ke-kho-cuoi-nam-checklist", "kiểm kê kho cuối năm", "informational", 2, "boc-xep-kho-hang"),
      t("Thuê bốc xếp kho theo ca đêm: lưu ý và chi phí", "boc-xep-kho-ca-dem", "bốc xếp ca đêm", "commercial", 3, "boc-xep-kho-hang"),
      t("An toàn lao động trong kho: 12 nguyên tắc bắt buộc", "an-toan-lao-dong-trong-kho", "an toàn lao động trong kho", "informational", 2, "boc-xep-kho-hang"),
      t("Sai lầm khiến chi phí bốc xếp kho tăng 30%", "sai-lam-tang-chi-phi-boc-xep-kho", "giảm chi phí bốc xếp", "informational", 3, "boc-xep-kho-hang"),
    ],
  },
  {
    pillar: "boc-xep-container",
    name: "Bốc xếp container",
    topics: [
      t("Rút ruột container: quy trình và thời gian chuẩn", "rut-ruot-container-quy-trinh", "rút ruột container", "informational", 1, "boc-xep-container"),
      t("Bao nhiêu người rút một container 40 feet?", "bao-nhieu-nguoi-rut-container-40-feet", "rút container 40 feet", "informational", 1, "boc-xep-container"),
      t("Giá rút ruột container TP.HCM 2026", "gia-rut-ruot-container-tphcm", "giá rút ruột container", "commercial", 1, "boc-xep-container"),
      t("Đóng hàng vào container: cách chằng buộc chống xê dịch", "dong-hang-vao-container-chang-buoc", "đóng hàng container", "informational", 2, "boc-xep-container"),
      t("Phí lưu container (DEM/DET) và cách rút hàng kịp hạn", "phi-luu-container-dem-det", "phí lưu container", "informational", 2, "boc-xep-container"),
      t("Rút container hàng lạnh: yêu cầu đặc thù", "rut-container-hang-lanh", "container hàng lạnh", "commercial", 3, "boc-xep-container"),
    ],
  },
  {
    pillar: "boc-xep-nha-may",
    name: "Bốc xếp nhà máy",
    topics: [
      t("Thuê nhân công bốc xếp nhà máy theo ca: mô hình hiệu quả", "thue-nhan-cong-nha-may-theo-ca", "nhân công nhà máy theo ca", "commercial", 1, "boc-xep-nha-may"),
      t("Di dời máy móc nhà máy: quy trình và thiết bị", "di-doi-may-moc-nha-may", "di dời máy móc", "informational", 1, "boc-xep-nha-may"),
      t("5S trong xưởng sản xuất và vai trò của tổ bốc xếp", "5s-trong-xuong-san-xuat", "5S trong sản xuất", "informational", 3, "boc-xep-nha-may"),
      t("Bốc xếp hàng hóa chất: quy định an toàn", "boc-xep-hang-hoa-chat-an-toan", "bốc xếp hóa chất", "informational", 2, "boc-xep-nha-may"),
      t("KPI đo hiệu suất tổ bốc xếp trong nhà máy", "kpi-to-boc-xep-nha-may", "KPI bốc xếp", "informational", 3, "boc-xep-nha-may"),
    ],
  },
  {
    pillar: "boc-xep-cang",
    name: "Bốc xếp cảng & depot",
    topics: [
      t("Bốc xếp tại cảng Cát Lái: thủ tục và lưu ý", "boc-xep-cang-cat-lai", "bốc xếp cảng Cát Lái", "local", 1, "boc-xep-cang"),
      t("Hàng rời tại cảng: quy trình xếp dỡ an toàn", "xep-do-hang-roi-tai-cang", "xếp dỡ hàng rời", "informational", 2, "boc-xep-cang"),
      t("Giấy tờ cần có khi đưa nhân công vào cảng", "giay-to-vao-cang-cho-nhan-cong", "thủ tục vào cảng", "informational", 2, "boc-xep-cang"),
      t("Depot và ICD khác gì nhau khi thuê bốc xếp?", "depot-va-icd-khac-nhau", "depot ICD", "informational", 3, "boc-xep-cang"),
    ],
  },
  {
    pillar: "boc-xep-san-bay",
    name: "Bốc xếp sân bay & hàng air",
    topics: [
      t("Bốc xếp hàng air tại Tân Sơn Nhất: quy trình", "boc-xep-hang-air-tan-son-nhat", "bốc xếp hàng air", "local", 1, "boc-xep-san-bay"),
      t("Đóng gói hàng đi máy bay chuẩn IATA", "dong-goi-hang-di-may-bay", "đóng gói hàng air", "informational", 2, "boc-xep-san-bay"),
      t("Hàng dễ vỡ đi đường air: cách bảo vệ", "hang-de-vo-di-duong-air", "hàng dễ vỡ air", "informational", 3, "boc-xep-san-bay"),
    ],
  },
  {
    pillar: "thue-nhan-cong-boc-xep",
    name: "Thuê nhân công bốc xếp",
    topics: [
      t("Thuê nhân công bốc xếp theo giờ TP.HCM: giá và cách đặt", "thue-nhan-cong-theo-gio-tphcm", "thuê nhân công theo giờ", "transactional", 1, "thue-nhan-cong-boc-xep"),
      t("Thuê nhân công gấp trong 2 giờ: làm thế nào?", "thue-nhan-cong-gap-trong-2-gio", "thuê nhân công gấp", "transactional", 1, "thue-nhan-cong-boc-xep"),
      t("Hợp đồng cung ứng nhân công: điều khoản cần có", "hop-dong-cung-ung-nhan-cong", "hợp đồng cung ứng nhân công", "commercial", 2, "thue-nhan-cong-boc-xep"),
      t("Tự tuyển hay thuê ngoài tổ bốc xếp: so sánh chi phí", "tu-tuyen-hay-thue-ngoai-boc-xep", "thuê ngoài bốc xếp", "informational", 2, "thue-nhan-cong-boc-xep"),
      t("Thuê nhân công dịp cao điểm Tết: kinh nghiệm", "thue-nhan-cong-cao-diem-tet", "nhân công dịp Tết", "commercial", 3, "thue-nhan-cong-boc-xep"),
      t("Bốc xếp thời vụ cho sàn TMĐT mùa sale", "boc-xep-thoi-vu-tmdt", "bốc xếp thời vụ", "commercial", 3, "thue-nhan-cong-boc-xep"),
    ],
  },
  {
    pillar: "dong-goi-hang-hoa",
    name: "Đóng gói hàng hóa",
    topics: [
      t("Đóng gói hàng hóa vận chuyển: hướng dẫn theo loại hàng", "dong-goi-hang-hoa-theo-loai", "đóng gói hàng hóa", "informational", 1, "dong-goi-hang-hoa"),
      t("Đóng thùng gỗ, kiện gỗ cho hàng máy móc", "dong-thung-go-cho-may-moc", "đóng thùng gỗ", "commercial", 2, "dong-goi-hang-hoa"),
      t("Vật liệu đóng gói: chọn màng PE, xốp hay carton?", "chon-vat-lieu-dong-goi", "vật liệu đóng gói", "informational", 2, "dong-goi-hang-hoa"),
      t("Đóng gói hàng dễ vỡ: 9 kỹ thuật thực tế", "dong-goi-hang-de-vo", "đóng gói hàng dễ vỡ", "informational", 2, "dong-goi-hang-hoa"),
    ],
  },
  {
    pillar: "chuyen-kho",
    name: "Chuyển kho",
    topics: [
      t("Chuyển kho không gián đoạn sản xuất: kế hoạch 7 bước", "chuyen-kho-khong-gian-doan", "chuyển kho", "informational", 1, "chuyen-kho"),
      t("Chi phí chuyển kho xưởng: các đầu mục cần dự trù", "chi-phi-chuyen-kho-xuong", "chi phí chuyển kho", "commercial", 1, "chuyen-kho"),
      t("Checklist bàn giao kho cũ và nhận kho mới", "checklist-ban-giao-kho", "bàn giao kho", "informational", 3, "chuyen-kho"),
    ],
  },
  {
    pillar: "chuyen-van-phong",
    name: "Chuyển văn phòng",
    topics: [
      t("Chuyển văn phòng cuối tuần: kế hoạch không mất giờ làm", "chuyen-van-phong-cuoi-tuan", "chuyển văn phòng", "commercial", 1, "chuyen-van-phong"),
      t("Đóng gói hồ sơ, máy tính khi chuyển văn phòng", "dong-goi-ho-so-may-tinh", "đóng gói văn phòng", "informational", 2, "chuyen-van-phong"),
      t("Chuyển văn phòng tòa nhà cao tầng: xin phép ban quản lý", "chuyen-van-phong-toa-nha-cao-tang", "chuyển văn phòng tòa nhà", "informational", 2, "chuyen-van-phong"),
    ],
  },
  {
    pillar: "chuyen-nha",
    name: "Chuyển nhà",
    topics: [
      t("Chuyển nhà TP.HCM: bảng giá và cách tiết kiệm", "chuyen-nha-tphcm-bang-gia", "chuyển nhà TP.HCM", "commercial", 1, "chuyen-nha"),
      t("Checklist chuyển nhà trong 7 ngày", "checklist-chuyen-nha-7-ngay", "checklist chuyển nhà", "informational", 2, "chuyen-nha"),
      t("Chuyển nhà chung cư: quy định thang máy và giờ giấc", "chuyen-nha-chung-cu-quy-dinh", "chuyển nhà chung cư", "informational", 2, "chuyen-nha"),
      t("Ngày tốt chuyển nhà và những việc nên làm trước", "ngay-tot-chuyen-nha", "ngày tốt chuyển nhà", "informational", 3, "chuyen-nha"),
    ],
  },
  {
    pillar: "xep-do-hang-hoa",
    name: "Xếp dỡ hàng hóa",
    topics: [
      t("Xếp dỡ hàng lên xe tải: thứ tự và phân bổ tải trọng", "xep-do-hang-len-xe-tai", "xếp dỡ hàng lên xe tải", "informational", 1, "xep-do-hang-hoa"),
      t("Xe nâng hay nhân công: khi nào dùng cái nào?", "xe-nang-hay-nhan-cong", "xe nâng bốc xếp", "informational", 2, "xep-do-hang-hoa"),
      t("Hàng siêu trường siêu trọng: phương án xếp dỡ", "hang-sieu-truong-sieu-trong", "hàng siêu trọng", "commercial", 3, "xep-do-hang-hoa"),
    ],
  },
  {
    pillar: "boc-hang-theo-gio",
    name: "Bốc hàng theo giờ",
    topics: [
      t("Bốc xếp theo giờ tính phí thế nào cho đúng?", "boc-xep-theo-gio-tinh-phi", "bốc xếp theo giờ", "commercial", 1, "boc-hang-theo-gio"),
      t("Bốc xếp gấp ngoài giờ, ngày lễ: phụ phí bao nhiêu?", "boc-xep-ngoai-gio-ngay-le", "bốc xếp ngoài giờ", "commercial", 2, "boc-hang-theo-gio"),
    ],
  },
  {
    pillar: "boc-xep-theo-thang",
    name: "Bốc xếp theo tháng",
    topics: [
      t("Thuê tổ bốc xếp theo tháng: mô hình và chi phí", "thue-to-boc-xep-theo-thang", "bốc xếp theo tháng", "commercial", 1, "boc-xep-theo-thang"),
      t("Quản lý tổ bốc xếp thuê ngoài: 8 nguyên tắc", "quan-ly-to-boc-xep-thue-ngoai", "quản lý tổ bốc xếp", "informational", 3, "boc-xep-theo-thang"),
    ],
  },
  {
    pillar: "boc-xep-hop-dong",
    name: "Bốc xếp theo hợp đồng",
    topics: [
      t("Hợp đồng bốc xếp dài hạn: mẫu điều khoản và rủi ro", "hop-dong-boc-xep-dai-han", "hợp đồng bốc xếp", "commercial", 1, "boc-xep-hop-dong"),
      t("Bảo hiểm hàng hóa trong hợp đồng bốc xếp", "bao-hiem-hang-hoa-hop-dong-boc-xep", "bảo hiểm hàng hóa", "informational", 2, "boc-xep-hop-dong"),
      t("SLA cho dịch vụ bốc xếp: chỉ số nên đưa vào hợp đồng", "sla-dich-vu-boc-xep", "SLA bốc xếp", "informational", 3, "boc-xep-hop-dong"),
    ],
  },
];

export const ALL_TOPICS: Topic[] = CONTENT_CLUSTERS.flatMap((c) => c.topics);

/** Slug các bài viết thuộc cluster của một pillar page (dùng cho internal link 2 chiều). */
export const topicSlugsForPillar = (pillar: string): string[] =>
  ALL_TOPICS.filter((t) => t.pillar === pillar).map((t) => t.slug);
