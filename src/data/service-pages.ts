/**
 * Cluster landing pages cho từng dịch vụ (SEO service pages).
 * Nội dung mô tả năng lực thực tế của Bốc Xếp Sài Gòn — không bịa số liệu, chứng nhận.
 */
export type ServicePage = {
  slug: string;
  name: string;
  h1: string;
  seoTitle: string;
  seoDescription: string;
  keyword: string;
  subKeywords: string[];
  intro: string;
  forWho: string[];
  scope: string[];
  process: { step: string; detail: string }[];
  pros: string[];
  notes: string[];
  faqs: { q: string; a: string }[];
  related: string[];
};

export const SERVICE_PAGES: ServicePage[] = [
  {
    slug: "boc-xep-kho-hang",
    name: "Bốc Xếp Kho Hàng",
    h1: "Dịch Vụ Bốc Xếp Kho Hàng Tại TP.HCM",
    seoTitle: "Bốc Xếp Kho Hàng TP.HCM — Nhân Công Theo Ca 24/7",
    seoDescription:
      "Dịch vụ bốc xếp kho hàng tại TP.HCM: nhập xuất kho, sắp xếp pallet, kiểm đếm hàng hóa theo ca. Điều động nhanh, báo giá minh bạch, hotline 0888.977.822.",
    keyword: "bốc xếp kho hàng",
    subKeywords: ["nhân công bốc xếp kho", "bốc xếp kho hàng tphcm", "thuê nhân công nhập xuất kho"],
    intro:
      "Kho hàng là nơi dòng hàng hóa vào - ra liên tục, chỉ cần chậm một ca là lịch giao hàng phía sau bị dồn. Bốc Xếp Sài Gòn cung ứng nhân công bốc xếp kho theo ca, theo ngày và theo tháng cho các kho tại TP. Thủ Đức, Tân Bình, Bình Tân, Bình Chánh và các khu công nghiệp lân cận.",
    forWho: [
      "Kho phân phối FMCG, thực phẩm, hàng tiêu dùng có ca nhập - xuất cố định",
      "Kho thương mại điện tử cần tăng người vào mùa cao điểm sale",
      "Kho vật liệu, thiết bị cần đội bốc xếp hàng nặng",
      "Đơn vị 3PL cần bổ sung nhân sự ngắn hạn mà không tăng biên chế",
    ],
    scope: [
      "Nhập kho: hạ hàng từ xe tải, xe container, kiểm đếm và xếp lên pallet",
      "Xuất kho: soạn hàng theo phiếu, dán nhãn, đưa hàng lên xe",
      "Sắp xếp lại kho theo sơ đồ, dồn pallet, đảo hàng theo hạn sử dụng",
      "Hỗ trợ kiểm kê định kỳ, quấn màng PE, đóng gói lại thùng hỏng",
    ],
    process: [
      { step: "Tiếp nhận yêu cầu", detail: "Ghi nhận địa chỉ kho, loại hàng, khối lượng, khung giờ làm việc và số người cần." },
      { step: "Báo giá", detail: "Báo giá theo giờ, theo ngày hoặc theo tháng trước khi điều người, không phát sinh ngoài thỏa thuận." },
      { step: "Điều động đội", detail: "Đội có đội trưởng giám sát, trang bị bảo hộ, nhận bàn giao công việc từ quản lý kho." },
      { step: "Thi công", detail: "Làm theo quy trình kho của khách: kiểm đếm hai lớp, ghi nhận số lượng, báo ngay khi phát hiện hàng lỗi." },
      { step: "Bàn giao", detail: "Chốt sản lượng, ký biên bản ca làm việc, vệ sinh khu vực trước khi rời kho." },
    ],
    pros: [
      "Chủ động tăng - giảm số người theo mùa vụ, không phải tuyển dụng",
      "Có đội trưởng chịu trách nhiệm sản lượng và an toàn trong ca",
      "Nhận việc cả ca đêm, cuối tuần và ngày lễ",
      "Xuất hóa đơn, ký hợp đồng dài hạn cho kho cần đội cố định",
    ],
    notes: [
      "Ca lẻ vào giờ cao điểm cần đặt trước để đảm bảo đủ người",
      "Hàng quá khổ hoặc quá nặng phải khảo sát trước để chuẩn bị thiết bị hỗ trợ",
    ],
    faqs: [
      { q: "Thuê tối thiểu bao nhiêu giờ?", a: "Thông thường tính tối thiểu 3 giờ cho ca lẻ. Với kho làm thường xuyên, chúng tôi tính theo ca 8 giờ hoặc theo tháng để chi phí trên mỗi giờ thấp hơn." },
      { q: "Có nhận làm ca đêm không?", a: "Có. Nhiều kho chỉ nhập hàng ban đêm nên chúng tôi bố trí đội trực ca đêm và cuối tuần." },
      { q: "Ai chịu trách nhiệm nếu hàng bị hư hỏng?", a: "Đội trưởng lập biên bản tại hiện trường cùng quản lý kho. Phần lỗi do thao tác của nhân công, chúng tôi chịu trách nhiệm theo thỏa thuận trong hợp đồng." },
      { q: "Bao lâu thì có người tới kho?", a: "Trong nội thành TP.HCM, các ca đặt trước được điều đúng giờ; yêu cầu gấp thường xử lý trong vòng vài giờ tùy thời điểm và số người cần." },
      { q: "Nhân công có được trang bị bảo hộ?", a: "Có đồng phục, găng tay, giày bảo hộ và tuân thủ nội quy an toàn của kho." },
      { q: "Có ký hợp đồng và xuất hóa đơn VAT?", a: "Có, áp dụng cho cả hợp đồng ngắn hạn theo vụ việc và hợp đồng dài hạn theo tháng." },
    ],
    related: ["thue-nhan-cong-boc-xep", "chuyen-kho", "boc-xep-theo-thang"],
  },
  {
    slug: "boc-xep-container",
    name: "Bốc Xếp Container",
    h1: "Dịch Vụ Bốc Xếp Container — Rút Ruột & Đóng Hàng",
    seoTitle: "Bốc Xếp Container TP.HCM — Rút Ruột, Đóng Cont Nhanh",
    seoDescription:
      "Rút ruột container, đóng hàng lên cont tại depot, cảng và kho riêng ở TP.HCM. Đội bốc xếp container theo lịch tàu, tránh phí lưu cont. Gọi 0888.977.822.",
    keyword: "bốc xếp container",
    subKeywords: ["rút ruột container", "đóng hàng lên container", "bốc xếp cont tphcm"],
    intro:
      "Container nằm chờ là chi phí phát sinh: phí lưu cont, lưu bãi, phí chờ tài xế. Bốc Xếp Sài Gòn tổ chức đội bốc xếp container theo dây chuyền, chạy đúng lịch tàu và lịch trả cont để hàng ra khỏi cont sớm nhất có thể.",
    forWho: [
      "Doanh nghiệp nhập khẩu cần rút ruột cont tại kho",
      "Đơn vị xuất khẩu cần đóng hàng lên cont đúng quy cách",
      "Forwarder, đại lý hải quan cần nhân công tại depot và cảng",
    ],
    scope: [
      "Rút ruột container 20 feet, 40 feet tại kho, depot hoặc bãi",
      "Đóng hàng lên cont: sắp xếp theo tải trọng, chèn lót, ràng dây",
      "Đảo hàng, kiểm đếm theo packing list, dán nhãn kiện",
      "Hỗ trợ quấn màng PE, đóng pallet trước khi đưa vào cont",
    ],
    process: [
      { step: "Nhận thông tin lô hàng", detail: "Số lượng cont, loại hàng, trọng lượng kiện, địa điểm và thời hạn trả cont." },
      { step: "Bố trí nhân sự theo lịch", detail: "Chia đội theo số cont và khung giờ để không kéo dài thời gian giữ cont." },
      { step: "Thi công theo dây chuyền", detail: "Chia nhóm trong cont - nhóm trung chuyển - nhóm xếp kho để dòng hàng liên tục." },
      { step: "Kiểm đếm và ghi nhận", detail: "Đếm theo packing list, chụp ảnh kiện hư hỏng nếu có để làm cơ sở khiếu nại." },
      { step: "Vệ sinh và bàn giao", detail: "Thu gom vật liệu chèn lót, vệ sinh cont và khu vực, chốt sản lượng với khách." },
    ],
    pros: [
      "Tổ chức theo dây chuyền nên rút ngắn thời gian mỗi cont",
      "Phối hợp được với lịch tàu, lịch xe đầu kéo",
      "Nhận cả hàng bao kiện, hàng rời và hàng pallet",
    ],
    notes: [
      "Hàng siêu nặng, hàng quá khổ cần thiết bị nâng hỗ trợ, phải khảo sát trước",
      "Làm việc trong cont giữa trưa cần bố trí nghỉ luân phiên để đảm bảo an toàn",
    ],
    faqs: [
      { q: "Rút một container 40 feet mất bao lâu?", a: "Phụ thuộc loại hàng và số người. Hàng thùng carton xếp pallet nhanh hơn nhiều so với hàng bao rời. Khi nhận thông tin lô hàng, chúng tôi đề xuất số người để hoàn thành trong khung giờ bạn cần." },
      { q: "Có làm tại depot và cảng không?", a: "Có. Chúng tôi có nhân sự quen thủ tục ra vào bãi và cảng tại khu vực TP.HCM." },
      { q: "Chi phí tính theo cont hay theo giờ?", a: "Cả hai. Hàng đồng nhất thường tính theo cont hoặc theo tấn; hàng phức tạp tính theo giờ cho minh bạch." },
      { q: "Có hỗ trợ đóng gói trước khi vào cont?", a: "Có: quấn màng PE, đóng thùng, lên pallet và chèn lót chống xô hàng." },
      { q: "Làm ngoài giờ và ban đêm được không?", a: "Được, chúng tôi thường xuyên chạy ca đêm để kịp lịch trả cont." },
      { q: "Cần cung cấp gì để nhận báo giá?", a: "Loại hàng, số cont, trọng lượng trung bình mỗi kiện, địa chỉ và thời gian mong muốn." },
    ],
    related: ["boc-xep-cang", "xep-do-hang-hoa", "dong-goi-hang-hoa"],
  },
  {
    slug: "boc-xep-nha-may",
    name: "Bốc Xếp Nhà Máy",
    h1: "Bốc Xếp Nhà Máy & Di Dời Máy Móc Trong KCN",
    seoTitle: "Bốc Xếp Nhà Máy, Di Dời Máy Móc TP.HCM & Lân Cận",
    seoDescription:
      "Bốc xếp nhà máy, di dời máy móc, nguyên vật liệu và thành phẩm trong khu công nghiệp TP.HCM, Bình Dương, Đồng Nai. Khảo sát trước, thi công theo kế hoạch.",
    keyword: "bốc xếp nhà máy",
    subKeywords: ["di dời máy móc nhà máy", "bốc xếp khu công nghiệp", "chuyển nhà xưởng"],
    intro:
      "Trong nhà máy, mỗi giờ dừng dây chuyền đều tính được thành tiền. Vì vậy công việc bốc xếp và di dời phải có kế hoạch, có người giám sát và tuân thủ nội quy an toàn của nhà máy.",
    forWho: [
      "Nhà máy cần di dời máy móc sang vị trí hoặc mặt bằng mới",
      "Nhà máy cần nhân công bốc xếp nguyên vật liệu, thành phẩm theo ca",
      "Đơn vị lắp đặt thiết bị cần nhân công hỗ trợ tại chân công trình",
    ],
    scope: [
      "Tháo dỡ, đóng kiện gỗ, di chuyển và định vị lại máy móc",
      "Bốc xếp nguyên vật liệu vào - ra xưởng theo ca sản xuất",
      "Chuyển thành phẩm từ xưởng ra kho, lên xe tải hoặc container",
      "Dọn dẹp, thu hồi vật liệu chèn lót sau khi hoàn thành",
    ],
    process: [
      { step: "Khảo sát hiện trường", detail: "Đo lối di chuyển, xác định trọng lượng thiết bị và các điểm rủi ro." },
      { step: "Lập kế hoạch", detail: "Chốt trình tự công việc, thiết bị hỗ trợ, số người và khung giờ ít ảnh hưởng sản xuất." },
      { step: "Chuẩn bị an toàn", detail: "Phổ biến an toàn đầu ca, trang bị bảo hộ, phân luồng di chuyển trong xưởng." },
      { step: "Thi công", detail: "Thực hiện theo trình tự, có đội trưởng giám sát và phối hợp với kỹ thuật của nhà máy." },
      { step: "Nghiệm thu", detail: "Kiểm tra vị trí, tình trạng thiết bị và ký biên bản bàn giao." },
    ],
    pros: [
      "Có khảo sát và kế hoạch trước khi thi công",
      "Làm được ca đêm, ngày nghỉ để không dừng sản xuất",
      "Phối hợp tốt với bộ phận kỹ thuật và an toàn của nhà máy",
    ],
    notes: [
      "Thiết bị cần cân chỉnh, hiệu chuẩn sau di dời do kỹ thuật nhà máy hoặc nhà cung cấp thực hiện",
      "Một số KCN yêu cầu đăng ký nhân sự trước, cần thời gian làm thủ tục",
    ],
    faqs: [
      { q: "Có nhận di dời cả nhà xưởng không?", a: "Có. Chúng tôi nhận trọn gói tháo dỡ, vận chuyển và sắp xếp lại theo sơ đồ mặt bằng mới, chia thành nhiều giai đoạn nếu cần duy trì sản xuất." },
      { q: "Máy móc nặng vài tấn có làm được?", a: "Cần khảo sát để chọn thiết bị nâng phù hợp. Sau khảo sát chúng tôi báo phương án và chi phí cụ thể." },
      { q: "Nhân công có hồ sơ an toàn để vào KCN?", a: "Có. Chúng tôi cung cấp danh sách nhân sự để nhà máy đăng ký ra vào theo quy định." },
      { q: "Làm vào Chủ nhật được không?", a: "Được, đây là khung giờ nhiều nhà máy chọn để hạn chế ảnh hưởng dây chuyền." },
      { q: "Chi phí tính thế nào?", a: "Theo khối lượng công việc sau khảo sát, hoặc theo ngày công nếu công việc lặp lại theo ca." },
      { q: "Có xuất hóa đơn VAT?", a: "Có, kèm hợp đồng và biên bản nghiệm thu từng giai đoạn." },
    ],
    related: ["chuyen-kho", "boc-xep-hop-dong", "thue-nhan-cong-boc-xep"],
  },
  {
    slug: "boc-xep-cang",
    name: "Bốc Xếp Cảng",
    h1: "Bốc Xếp Tại Cảng & Depot Khu Vực TP.HCM",
    seoTitle: "Bốc Xếp Cảng TP.HCM — Nhân Công Ra Vào Cảng, Depot",
    seoDescription:
      "Nhân công bốc xếp tại cảng và depot khu vực TP.HCM: xếp dỡ hàng bao kiện, hàng rời, đảo hàng theo lịch tàu. Trực 24/7, hotline 0888.977.822.",
    keyword: "bốc xếp cảng",
    subKeywords: ["nhân công bốc xếp cảng cát lái", "bốc xếp depot", "xếp dỡ hàng tại cảng"],
    intro:
      "Công việc tại cảng phụ thuộc lịch tàu và quy định ra vào khu vực. Bốc Xếp Sài Gòn bố trí đội theo ca, làm việc đúng nội quy cảng và sẵn sàng tăng người khi lô hàng gấp.",
    forWho: [
      "Chủ hàng cần xếp dỡ tại cảng, depot trong khu vực TP.HCM",
      "Forwarder cần nhân công theo lô, theo ca",
      "Đơn vị vận tải cần đội hỗ trợ đảo hàng, sang xe",
    ],
    scope: [
      "Xếp dỡ hàng bao kiện, hàng rời, hàng pallet",
      "Đóng và rút hàng container tại bãi",
      "Sang xe, đảo hàng, kiểm đếm theo chứng từ",
      "Hỗ trợ chèn lót, ràng buộc hàng trước khi vận chuyển",
    ],
    process: [
      { step: "Nhận lịch làm việc", detail: "Theo lịch tàu, lịch lấy hàng và khung giờ cho phép ra vào." },
      { step: "Chuẩn bị nhân sự", detail: "Lập danh sách nhân sự, chuẩn bị bảo hộ và thủ tục ra vào theo yêu cầu." },
      { step: "Thi công theo ca", detail: "Tổ chức đội theo dây chuyền, có đội trưởng điều phối tại hiện trường." },
      { step: "Kiểm đếm & báo cáo", detail: "Chốt số lượng theo chứng từ, ghi nhận sự cố nếu có." },
    ],
    pros: [
      "Nhân sự quen môi trường cảng, thao tác nhanh và an toàn",
      "Nhận việc gấp theo lịch tàu, kể cả ban đêm",
      "Có thể tăng quy mô đội trong cùng ca khi khối lượng lớn",
    ],
    notes: [
      "Thủ tục ra vào từng cảng, depot khác nhau — cần thông tin sớm để chuẩn bị",
      "Thời tiết xấu có thể ảnh hưởng tiến độ xếp dỡ ngoài bãi",
    ],
    faqs: [
      { q: "Có nhận việc gấp trong ngày không?", a: "Tùy thời điểm và số người cần. Bạn gọi hotline để được xác nhận khả năng điều động ngay." },
      { q: "Đội bao nhiêu người là hợp lý?", a: "Hàng bao kiện thường tổ chức đội 10-15 người theo dây chuyền; hàng pallet cần ít người hơn nhưng cần thiết bị hỗ trợ." },
      { q: "Chi phí tính theo tấn hay theo giờ?", a: "Hàng đồng nhất tính theo tấn hoặc theo kiện; công việc phát sinh, đảo hàng thường tính theo giờ." },
      { q: "Có làm ban đêm?", a: "Có, chúng tôi bố trí ca đêm theo lịch tàu." },
      { q: "Ai giám sát chất lượng công việc?", a: "Đội trưởng tại hiện trường, làm việc trực tiếp với đại diện của bạn." },
      { q: "Có hợp đồng theo lô hàng?", a: "Có, hợp đồng theo lô hoặc hợp đồng khung cho khách làm thường xuyên." },
    ],
    related: ["boc-xep-container", "xep-do-hang-hoa", "boc-xep-hop-dong"],
  },
  {
    slug: "boc-xep-san-bay",
    name: "Bốc Xếp Sân Bay",
    h1: "Bốc Xếp Hàng Air Cargo Khu Vực Tân Sơn Nhất",
    seoTitle: "Bốc Xếp Sân Bay Tân Sơn Nhất — Hàng Air Cargo",
    seoDescription:
      "Nhân công xử lý hàng air cargo khu vực sân bay Tân Sơn Nhất: build-up pallet, đóng gói, sang xe, làm theo ca kịp giờ cắt máng. Gọi 0888.977.822.",
    keyword: "bốc xếp sân bay",
    subKeywords: ["bốc xếp hàng air cargo", "nhân công sân bay tân sơn nhất", "xử lý hàng hàng không"],
    intro:
      "Hàng air cargo chạy theo giờ cắt máng, chậm một nhịp là lỡ chuyến bay. Chúng tôi bố trí đội trực theo ca tại khu vực Tân Bình - Tân Sơn Nhất để xử lý hàng nhanh và đúng quy định an ninh.",
    forWho: [
      "Forwarder, công ty giao nhận hàng hàng không",
      "Doanh nghiệp gửi hàng gấp bằng đường air",
      "Kho hàng gần sân bay cần nhân công theo ca",
    ],
    scope: [
      "Sang xe, xếp dỡ hàng tại kho gần sân bay",
      "Đóng gói lại, quấn màng, cân và dán nhãn kiện",
      "Hỗ trợ build-up hàng lên pallet theo yêu cầu của hãng bay",
      "Kiểm đếm theo AWB và chứng từ đi kèm",
    ],
    process: [
      { step: "Nhận yêu cầu theo lô", detail: "Thông tin AWB, số kiện, trọng lượng, giờ cắt máng." },
      { step: "Điều động đội trực", detail: "Ưu tiên đội tại chi nhánh Tân Bình để tới hiện trường nhanh." },
      { step: "Xử lý hàng", detail: "Đóng gói, cân, dán nhãn, xếp hàng đúng quy cách." },
      { step: "Bàn giao", detail: "Chốt số kiện, trọng lượng và ký nhận với người phụ trách." },
    ],
    pros: [
      "Đội trực gần sân bay, phản ứng nhanh với hàng gấp",
      "Làm theo ca đêm để kịp chuyến sáng",
      "Thao tác cẩn thận với hàng giá trị cao, hàng dễ vỡ",
    ],
    notes: [
      "Công việc trong khu vực hạn chế của sân bay do đơn vị được cấp phép thực hiện",
      "Cần thông tin lô hàng sớm để chuẩn bị đủ người",
    ],
    faqs: [
      { q: "Có làm việc trong khu vực cách ly sân bay?", a: "Các công việc bên trong khu vực hạn chế do đơn vị được cấp phép đảm nhiệm. Chúng tôi hỗ trợ phần việc tại kho, bãi và khu vực ngoài theo yêu cầu của khách." },
      { q: "Nhận hàng gấp trong đêm không?", a: "Có, đây là khung giờ thường xuyên của hàng air." },
      { q: "Có hỗ trợ đóng gói theo chuẩn hàng không?", a: "Có: quấn màng PE, chèn lót, dán nhãn cảnh báo và cân kiện." },
      { q: "Tính phí thế nào?", a: "Theo giờ hoặc theo lô, thống nhất trước khi làm." },
      { q: "Hàng dễ vỡ có nhận không?", a: "Có, chúng tôi bố trí người có kinh nghiệm và tăng lớp chèn lót." },
      { q: "Bao lâu có người tới?", a: "Với khu vực Tân Bình - Tân Phú - Gò Vấp, thời gian điều động thường rất nhanh; hãy gọi hotline để xác nhận." },
    ],
    related: ["dong-goi-hang-hoa", "boc-hang-theo-gio", "thue-nhan-cong-boc-xep"],
  },
  {
    slug: "thue-nhan-cong-boc-xep",
    name: "Thuê Nhân Công",
    h1: "Cho Thuê Nhân Công Bốc Xếp Theo Giờ, Ngày, Tháng",
    seoTitle: "Thuê Nhân Công Bốc Xếp TP.HCM Theo Giờ, Ngày, Tháng",
    seoDescription:
      "Cho thuê nhân công bốc xếp tại TP.HCM theo giờ, theo ngày, theo tháng. Có đội trưởng giám sát, hợp đồng và hóa đơn. Hotline 0888.977.822.",
    keyword: "thuê nhân công bốc xếp",
    subKeywords: ["cho thuê nhân công thời vụ", "nhân công bốc xếp theo giờ", "cung ứng lao động bốc xếp"],
    intro:
      "Thuê nhân công theo nhu cầu giúp doanh nghiệp linh hoạt chi phí: cao điểm thì tăng người, thấp điểm thì giảm, không phải giữ biên chế cả năm.",
    forWho: [
      "Kho, xưởng có mùa vụ rõ rệt",
      "Doanh nghiệp cần bổ sung người trong thời gian ngắn",
      "Đơn vị tổ chức sự kiện, hội chợ cần nhân công lắp đặt và dọn dẹp",
    ],
    scope: [
      "Cung ứng nhân công theo giờ, theo ca 8 giờ, theo ngày hoặc theo tháng",
      "Bố trí đội trưởng giám sát và báo cáo sản lượng",
      "Nhân sự làm được nhiều loại việc: bốc xếp, đóng gói, sắp xếp, vệ sinh khu vực",
    ],
    process: [
      { step: "Xác định nhu cầu", detail: "Số người, khung giờ, tính chất công việc và thời gian thuê." },
      { step: "Báo giá & hợp đồng", detail: "Chốt đơn giá và điều kiện làm việc, ký hợp đồng nếu thuê dài hạn." },
      { step: "Điều người", detail: "Đội tới đúng giờ, nhận bàn giao công việc từ người phụ trách." },
      { step: "Theo dõi & điều chỉnh", detail: "Tăng giảm nhân sự theo thực tế, báo cáo theo ngày hoặc theo tuần." },
    ],
    pros: [
      "Linh hoạt số lượng, không ràng buộc dài hạn nếu không cần",
      "Có người giám sát nên chất lượng ổn định hơn thuê lẻ",
      "Hợp đồng, hóa đơn đầy đủ cho doanh nghiệp",
    ],
    notes: [
      "Mùa cao điểm nên đặt trước để đảm bảo đủ người",
      "Công việc đặc thù cần đào tạo ngắn tại chỗ trước khi vào việc",
    ],
    faqs: [
      { q: "Thuê 2 người trong 3 giờ có được không?", a: "Được. Ca lẻ thường tính tối thiểu 3 giờ." },
      { q: "Thuê theo tháng có lợi gì?", a: "Đơn giá trên mỗi giờ thấp hơn, đội cố định quen việc nên năng suất ổn định và có báo cáo định kỳ." },
      { q: "Có thay người nếu không phù hợp?", a: "Có. Bạn phản hồi với đội trưởng hoặc tổng đài, chúng tôi thay người trong ca kế tiếp." },
      { q: "Nhân công có bảo hộ lao động?", a: "Có đồng phục, găng tay, giày bảo hộ và tuân thủ nội quy nơi làm việc." },
      { q: "Làm ngoài TP.HCM được không?", a: "Được, chúng tôi nhận việc tại Bình Dương, Đồng Nai, Long An và các tỉnh lân cận." },
      { q: "Thanh toán thế nào?", a: "Theo ca cho việc lẻ, theo tuần hoặc theo tháng với khách có hợp đồng." },
    ],
    related: ["boc-xep-kho-hang", "boc-hang-theo-gio", "boc-xep-theo-thang"],
  },
  {
    slug: "dong-goi-hang-hoa",
    name: "Đóng Gói Hàng Hóa",
    h1: "Dịch Vụ Đóng Gói Hàng Hóa Tại TP.HCM",
    seoTitle: "Đóng Gói Hàng Hóa TP.HCM — Thùng Gỗ, Màng PE, Pallet",
    seoDescription:
      "Dịch vụ đóng gói hàng hóa tại TP.HCM: quấn màng PE, đóng thùng gỗ, chèn lót hàng dễ vỡ, lên pallet chuẩn vận chuyển. Gọi 0888.977.822.",
    keyword: "đóng gói hàng hóa",
    subKeywords: ["đóng thùng gỗ", "quấn màng pe pallet", "đóng gói hàng dễ vỡ"],
    intro:
      "Phần lớn hư hỏng trên đường đi bắt nguồn từ khâu đóng gói. Đóng gói đúng cách giúp giảm rủi ro và cũng giúp xếp hàng lên xe, lên cont hiệu quả hơn.",
    forWho: [
      "Doanh nghiệp gửi hàng đi tỉnh hoặc xuất khẩu",
      "Đơn vị chuyển kho, chuyển xưởng cần đóng kiện thiết bị",
      "Khách hàng có hàng dễ vỡ, hàng giá trị cao",
    ],
    scope: [
      "Quấn màng PE, dán băng keo, đóng thùng carton",
      "Đóng thùng gỗ, kiện gỗ cho thiết bị và máy móc",
      "Chèn lót xốp, giấy tổ ong, cố định góc cho hàng dễ vỡ",
      "Lên pallet, ràng dây, dán nhãn và ký hiệu cảnh báo",
    ],
    process: [
      { step: "Đánh giá hàng hóa", detail: "Kích thước, trọng lượng, độ nhạy cảm và phương thức vận chuyển." },
      { step: "Chọn vật liệu", detail: "Đề xuất vật liệu và quy cách đóng gói phù hợp chi phí." },
      { step: "Thi công", detail: "Đóng gói tại kho của bạn hoặc tại điểm tập kết." },
      { step: "Dán nhãn & bàn giao", detail: "Ghi nhận số kiện, dán nhãn và bàn giao kèm danh sách." },
    ],
    pros: [
      "Giảm rủi ro hư hỏng, móp méo khi vận chuyển",
      "Kiện hàng gọn, dễ xếp, tận dụng tốt không gian xe và cont",
      "Có thể kết hợp cùng dịch vụ bốc xếp trong cùng ca",
    ],
    notes: [
      "Thùng gỗ xuất khẩu cần đúng quy định xử lý gỗ của nước nhập khẩu",
      "Vật liệu đóng gói tính riêng theo thực tế sử dụng",
    ],
    faqs: [
      { q: "Có làm đóng gói tại kho khách?", a: "Có, chúng tôi mang vật liệu và nhân công tới kho của bạn." },
      { q: "Đóng thùng gỗ mất bao lâu?", a: "Tùy kích thước và số lượng kiện; kiện tiêu chuẩn có thể hoàn thành trong ngày." },
      { q: "Hàng xuất khẩu cần lưu ý gì?", a: "Cần đúng quy cách của tuyến vận chuyển và quy định về vật liệu gỗ của nước nhập khẩu; chúng tôi tư vấn theo yêu cầu của bạn hoặc forwarder." },
      { q: "Chi phí gồm vật liệu chưa?", a: "Báo giá tách phần nhân công và vật liệu để bạn dễ kiểm soát." },
      { q: "Có nhận hàng dễ vỡ như kính, gốm?", a: "Có, dùng nhiều lớp chèn lót và cố định góc, dán ký hiệu cảnh báo." },
      { q: "Có kết hợp bốc xếp lên xe?", a: "Có, thường làm liền mạch trong cùng ca để tiết kiệm chi phí." },
    ],
    related: ["boc-xep-container", "chuyen-nha", "chuyen-van-phong"],
  },
  {
    slug: "chuyen-kho",
    name: "Chuyển Kho",
    h1: "Dịch Vụ Chuyển Kho Trọn Gói Tại TP.HCM",
    seoTitle: "Chuyển Kho Trọn Gói TP.HCM — Không Gián Đoạn Vận Hành",
    seoDescription:
      "Chuyển kho trọn gói tại TP.HCM: lập kế hoạch, tháo dỡ, vận chuyển và sắp xếp lại kho mới theo sơ đồ. Làm theo giai đoạn, hotline 0888.977.822.",
    keyword: "chuyển kho",
    subKeywords: ["dịch vụ chuyển kho trọn gói", "di dời kho hàng", "chuyển kho tphcm"],
    intro:
      "Chuyển kho không chỉ là chuyển hàng, mà là chuyển cả cách vận hành. Kế hoạch tốt giúp kho mới hoạt động ngay từ ngày đầu, thay vì mất một tuần để tìm hàng.",
    forWho: [
      "Doanh nghiệp mở rộng, đổi mặt bằng kho",
      "Đơn vị 3PL chuyển hàng giữa các kho",
      "Chuỗi bán lẻ tái cấu trúc kho trung tâm",
    ],
    scope: [
      "Lập kế hoạch và trình tự chuyển theo nhóm hàng",
      "Đóng gói, dán nhãn vị trí, tháo dỡ kệ nếu cần",
      "Bốc xếp, vận chuyển và sắp xếp lại theo sơ đồ kho mới",
      "Kiểm đếm, bàn giao kèm danh sách vị trí hàng",
    ],
    process: [
      { step: "Khảo sát hai đầu", detail: "Đo lối đi, kiểm tra cửa, thang, mặt bằng kho cũ và kho mới." },
      { step: "Lập kế hoạch theo giai đoạn", detail: "Chia đợt để hoạt động xuất nhập vẫn diễn ra bình thường." },
      { step: "Thi công", detail: "Chuyển theo nhóm hàng, dán nhãn để dễ định vị tại kho mới." },
      { step: "Sắp xếp kho mới", detail: "Bố trí theo sơ đồ và tần suất xuất hàng do bạn cung cấp." },
      { step: "Bàn giao", detail: "Kiểm đếm, chốt danh sách vị trí và nghiệm thu." },
    ],
    pros: [
      "Giảm thời gian kho ngừng hoạt động",
      "Hàng được định vị đúng sơ đồ nên dễ vận hành ngay",
      "Một đầu mối phụ trách cả nhân công, đóng gói và sắp xếp",
    ],
    notes: [
      "Cần sơ đồ kho mới trước khi thi công để sắp xếp đúng",
      "Kho có kệ cao cần thiết bị chuyên dụng, phải khảo sát",
    ],
    faqs: [
      { q: "Chuyển kho mất bao lâu?", a: "Tùy khối lượng, khoảng cách và số lượng nhân sự. Sau khảo sát chúng tôi đưa ra kế hoạch theo ngày hoặc theo đợt." },
      { q: "Có cần dừng hoạt động kho?", a: "Không nhất thiết. Chúng tôi thường chia đợt và làm ngoài giờ để duy trì xuất nhập." },
      { q: "Có hỗ trợ tháo lắp kệ kho?", a: "Có, tùy loại kệ và độ cao, cần khảo sát trước." },
      { q: "Chi phí gồm những gì?", a: "Nhân công, vật liệu đóng gói, thiết bị hỗ trợ và vận chuyển nếu bạn cần trọn gói." },
      { q: "Có kiểm đếm khi chuyển?", a: "Có, kiểm đếm và ghi nhận theo danh sách hai đầu." },
      { q: "Có ký hợp đồng?", a: "Có hợp đồng, biên bản nghiệm thu và hóa đơn." },
    ],
    related: ["boc-xep-kho-hang", "boc-xep-nha-may", "dong-goi-hang-hoa"],
  },
  {
    slug: "chuyen-van-phong",
    name: "Chuyển Văn Phòng",
    h1: "Chuyển Văn Phòng Trọn Gói Tại TP.HCM",
    seoTitle: "Chuyển Văn Phòng TP.HCM — Làm Ngoài Giờ, Trọn Gói",
    seoDescription:
      "Chuyển văn phòng trọn gói tại TP.HCM: đóng gói hồ sơ, thiết bị IT, tháo lắp bàn ghế, thi công ngoài giờ để không gián đoạn công việc.",
    keyword: "chuyển văn phòng",
    subKeywords: ["chuyển office trọn gói", "chuyển văn phòng tphcm", "dọn văn phòng"],
    intro:
      "Văn phòng chuyển tốt là văn phòng sáng thứ Hai mọi người tới là làm việc được ngay: máy có điện, hồ sơ đúng phòng ban, bàn ghế đã lắp xong.",
    forWho: [
      "Công ty đổi mặt bằng, mở rộng diện tích",
      "Doanh nghiệp cần chuyển ngoài giờ hành chính",
      "Đơn vị cần chuyển thiết bị IT, server cẩn thận",
    ],
    scope: [
      "Đóng gói hồ sơ, tài liệu theo phòng ban, đánh số thùng",
      "Tháo lắp bàn ghế, vách ngăn, tủ hồ sơ",
      "Bọc chống sốc và di chuyển máy tính, màn hình, thiết bị mạng",
      "Sắp xếp lại theo sơ đồ chỗ ngồi mới, dọn dẹp sau khi xong",
    ],
    process: [
      { step: "Khảo sát", detail: "Kiểm tra thang máy, lối vào, khung giờ toà nhà cho phép thi công." },
      { step: "Chuẩn bị vật liệu", detail: "Thùng, màng PE, nhãn dán theo phòng ban." },
      { step: "Thi công ngoài giờ", detail: "Thường làm buổi tối hoặc cuối tuần để không ảnh hưởng công việc." },
      { step: "Lắp đặt & bàn giao", detail: "Lắp lại bàn ghế, đặt thiết bị đúng vị trí, dọn dẹp và nghiệm thu." },
    ],
    pros: [
      "Không mất ngày làm việc do thi công ngoài giờ",
      "Hồ sơ, thiết bị có đánh số nên dễ kiểm soát",
      "Một đội phụ trách từ đóng gói tới lắp đặt lại",
    ],
    notes: [
      "Cần đăng ký thi công với ban quản lý toà nhà trước",
      "Sơ đồ chỗ ngồi mới nên chốt trước ngày chuyển",
    ],
    faqs: [
      { q: "Chuyển văn phòng vào cuối tuần được không?", a: "Được, đây là lựa chọn phổ biến nhất." },
      { q: "Có tháo lắp bàn ghế, vách ngăn?", a: "Có, tùy loại kết cấu; hạng mục phức tạp cần khảo sát." },
      { q: "Server và thiết bị mạng xử lý thế nào?", a: "Chúng tôi bọc chống sốc và di chuyển; phần đấu nối, cấu hình do bộ phận IT của bạn hoặc nhà cung cấp thực hiện." },
      { q: "Chi phí tính theo gì?", a: "Theo khối lượng đồ đạc, số tầng, điều kiện thang máy và thời gian thi công." },
      { q: "Có cung cấp thùng đóng gói?", a: "Có, tính theo số thùng thực dùng." },
      { q: "Có bảo hiểm hàng giá trị cao?", a: "Với hạng mục giá trị cao, chúng tôi thống nhất phương án trách nhiệm cụ thể trong hợp đồng trước khi thi công." },
    ],
    related: ["chuyen-nha", "dong-goi-hang-hoa", "thue-nhan-cong-boc-xep"],
  },
  {
    slug: "chuyen-nha",
    name: "Chuyển Nhà",
    h1: "Chuyển Nhà Trọn Gói Tại TP.HCM",
    seoTitle: "Chuyển Nhà Trọn Gói TP.HCM — Bọc Lót, Lắp Đặt Lại",
    seoDescription:
      "Chuyển nhà trọn gói tại TP.HCM: đóng gói, bọc lót nội thất, tháo lắp giường tủ, lắp đặt lại tận nơi. Báo giá rõ ràng, hotline 0888.977.822.",
    keyword: "chuyển nhà trọn gói",
    subKeywords: ["chuyển nhà tphcm", "dịch vụ chuyển nhà", "chuyển nhà chung cư"],
    intro:
      "Chuyển nhà mệt nhất là khâu đóng gói và bảo vệ đồ đạc. Chúng tôi làm phần nặng và phần tỉ mỉ đó, bạn chỉ cần chỉ vị trí đặt đồ ở nhà mới.",
    forWho: [
      "Gia đình chuyển nhà trong nội thành hoặc đi tỉnh",
      "Người thuê căn hộ, chung cư cần chuyển theo giờ thang máy",
      "Khách cần chuyển ít đồ, chỉ thuê nhân công bốc xếp",
    ],
    scope: [
      "Đóng gói quần áo, đồ bếp, đồ dễ vỡ",
      "Tháo lắp giường, tủ, kệ; bọc lót nội thất gỗ và thiết bị điện",
      "Bốc xếp lên xe, vận chuyển và đưa vào nhà mới",
      "Lắp đặt lại, dọn dẹp rác đóng gói",
    ],
    process: [
      { step: "Khảo sát hoặc báo qua ảnh", detail: "Xác định khối lượng đồ, tầng, thang máy, lối vào." },
      { step: "Báo giá", detail: "Nêu rõ hạng mục, số người, số chuyến xe và vật liệu." },
      { step: "Đóng gói", detail: "Có thể làm trước một ngày với nhà nhiều đồ." },
      { step: "Vận chuyển", detail: "Cố định đồ trên xe, đi theo lộ trình đã thống nhất." },
      { step: "Lắp đặt & dọn dẹp", detail: "Đặt đồ đúng phòng, lắp lại nội thất, thu gom vật liệu." },
    ],
    pros: [
      "Không phải tự khuân, giảm rủi ro hỏng đồ và chấn thương",
      "Có thể chọn gói trọn gói hoặc chỉ thuê nhân công",
      "Làm được buổi tối, cuối tuần theo giờ thang máy chung cư",
    ],
    notes: [
      "Chung cư thường giới hạn giờ dùng thang máy, cần đăng ký trước",
      "Đồ quá khổ như tủ lớn, đàn piano cần khảo sát riêng",
    ],
    faqs: [
      { q: "Chuyển nhà cần đặt trước bao lâu?", a: "Nên đặt trước 1-3 ngày; cuối tuần và cuối tháng nên đặt sớm hơn." },
      { q: "Có nhận chuyển ít đồ?", a: "Có, bạn có thể chỉ thuê 2-3 người theo giờ." },
      { q: "Có tháo lắp máy lạnh?", a: "Hạng mục điện lạnh do kỹ thuật chuyên môn thực hiện; chúng tôi hỗ trợ kết nối hoặc phối hợp theo yêu cầu của bạn." },
      { q: "Chi phí phụ thuộc điều gì?", a: "Khối lượng đồ, tầng và thang máy, khoảng cách, số người và số chuyến xe." },
      { q: "Có cung cấp thùng carton?", a: "Có, tính theo số lượng thực dùng." },
      { q: "Nếu đồ bị hỏng thì sao?", a: "Đội trưởng lập biên bản tại chỗ; phần lỗi do thao tác của nhân công, chúng tôi chịu trách nhiệm theo thỏa thuận đã ký." },
    ],
    related: ["chuyen-van-phong", "dong-goi-hang-hoa", "boc-hang-theo-gio"],
  },
  {
    slug: "xep-do-hang-hoa",
    name: "Xếp Dỡ Hàng Hóa",
    h1: "Dịch Vụ Xếp Dỡ Hàng Hóa Lên Xuống Xe",
    seoTitle: "Xếp Dỡ Hàng Hóa TP.HCM — Xe Tải, Container, Hàng Rời",
    seoDescription:
      "Dịch vụ xếp dỡ hàng hóa tại TP.HCM: lên xuống xe tải, container, hàng bao kiện và hàng rời. Đội bốc xếp theo dây chuyền, gọi 0888.977.822.",
    keyword: "xếp dỡ hàng hóa",
    subKeywords: ["bốc xếp lên xe tải", "xếp dỡ hàng rời", "bốc hàng xuống xe"],
    intro:
      "Xếp dỡ đúng cách vừa nhanh vừa an toàn: hàng không bị xô lệch trên đường, tài xế không phải chờ, và mặt bằng sạch sau khi xong.",
    forWho: [
      "Đơn vị vận tải cần đội bốc xếp tại điểm giao nhận",
      "Cửa hàng, đại lý nhận hàng số lượng lớn",
      "Công trình, dự án cần hạ vật liệu",
    ],
    scope: [
      "Bốc hàng lên và hạ hàng xuống xe tải các loại",
      "Xếp dỡ hàng bao, hàng rời, hàng kiện, hàng pallet",
      "Sắp xếp hàng trên thùng xe, chèn lót và ràng buộc",
      "Vệ sinh khu vực sau khi hoàn thành",
    ],
    process: [
      { step: "Nhận yêu cầu", detail: "Loại hàng, khối lượng, địa điểm, thời gian xe tới." },
      { step: "Điều đội", detail: "Bố trí số người phù hợp để xe không phải chờ." },
      { step: "Thi công", detail: "Tổ chức dây chuyền, dùng xe đẩy hoặc ván trượt khi cần." },
      { step: "Chốt công việc", detail: "Ghi nhận số lượng và bàn giao mặt bằng sạch." },
    ],
    pros: [
      "Giảm thời gian xe chờ tại điểm giao nhận",
      "Hạn chế rơi vãi, hư hỏng khi bốc dỡ",
      "Nhận việc lẻ theo chuyến hoặc theo hợp đồng dài hạn",
    ],
    notes: [
      "Điểm giao nhận chật hẹp cần bố trí thêm người trung chuyển",
      "Hàng nặng cần thiết bị hỗ trợ, thống nhất trước khi làm",
    ],
    faqs: [
      { q: "Có nhận việc theo chuyến lẻ?", a: "Có, tính theo giờ hoặc theo chuyến, tối thiểu thường là 3 giờ." },
      { q: "Bao nhiêu người cho một xe tải 8 tấn?", a: "Tùy loại hàng; hàng thùng carton thường cần ít người hơn hàng bao rời. Chúng tôi đề xuất sau khi biết loại hàng." },
      { q: "Có làm đêm không?", a: "Có, nhiều tuyến xe chỉ vào nội thành được vào ban đêm." },
      { q: "Có xe nâng, xe đẩy?", a: "Chúng tôi mang xe đẩy, ván trượt; xe nâng thu xếp theo yêu cầu và tính riêng." },
      { q: "Giá có thay đổi khi phát sinh?", a: "Chỉ thay đổi khi khối lượng công việc khác thỏa thuận ban đầu và được bạn đồng ý trước." },
      { q: "Có làm ở tỉnh lân cận?", a: "Có, Bình Dương, Đồng Nai, Long An và khu vực gần TP.HCM." },
    ],
    related: ["boc-xep-container", "boc-hang-theo-gio", "boc-xep-cang"],
  },
  {
    slug: "boc-hang-theo-gio",
    name: "Bốc Hàng Theo Giờ",
    h1: "Bốc Hàng Theo Giờ — Điều Động Nhanh Tại TP.HCM",
    seoTitle: "Bốc Hàng Theo Giờ TP.HCM — Thuê Nhanh, Giá Theo Giờ",
    seoDescription:
      "Bốc hàng theo giờ tại TP.HCM, điều động nhanh, tính phí theo giờ thực tế, tối thiểu 3 giờ. Trực tổng đài 24/7, gọi 0888.977.822.",
    keyword: "bốc hàng theo giờ",
    subKeywords: ["thuê bốc xếp theo giờ", "bốc xếp gấp tphcm", "giá bốc xếp theo giờ"],
    intro:
      "Có những việc chỉ cần vài giờ: một xe hàng vừa tới, một lô hàng cần dọn gấp. Gói theo giờ dành cho những tình huống đó.",
    forWho: [
      "Khách cần bốc xếp gấp trong ngày",
      "Việc nhỏ, khối lượng ít, không cần thuê cả ca",
      "Doanh nghiệp muốn thử chất lượng trước khi ký hợp đồng dài hạn",
    ],
    scope: [
      "Bốc xếp hàng lên xuống xe, di chuyển hàng trong kho",
      "Dọn dẹp, sắp xếp lại khu vực chứa hàng",
      "Hỗ trợ đóng gói nhanh khi cần",
    ],
    process: [
      { step: "Gọi hotline", detail: "Mô tả việc, địa chỉ, số người và thời gian bắt đầu." },
      { step: "Chốt giá theo giờ", detail: "Xác nhận đơn giá và số giờ tối thiểu trước khi điều người." },
      { step: "Điều đội gần nhất", detail: "Ưu tiên đội thuộc chi nhánh gần địa điểm của bạn." },
      { step: "Chốt giờ thực tế", detail: "Tính theo giờ làm thực tế, thanh toán sau khi hoàn thành." },
    ],
    pros: [
      "Chi phí thấp cho việc nhỏ",
      "Không cần hợp đồng dài hạn",
      "Phù hợp với công việc phát sinh ngoài kế hoạch",
    ],
    notes: [
      "Giờ cao điểm có thể cần thêm thời gian điều động",
      "Việc kéo dài hơn dự kiến sẽ tính thêm theo giờ đã thống nhất",
    ],
    faqs: [
      { q: "Tối thiểu bao nhiêu giờ?", a: "Thường là 3 giờ cho mỗi lượt điều động." },
      { q: "Có phụ phí ngoài giờ?", a: "Ca đêm, ngày lễ có thể áp dụng đơn giá khác, chúng tôi báo rõ trước khi bạn xác nhận." },
      { q: "Bao lâu có người tới?", a: "Tùy khu vực và thời điểm; hãy gọi hotline để được xác nhận thời gian cụ thể." },
      { q: "Thanh toán bằng chuyển khoản được không?", a: "Được, chuyển khoản hoặc tiền mặt sau khi hoàn thành." },
      { q: "Có xuất hóa đơn cho việc lẻ?", a: "Có, nếu bạn cần hóa đơn hãy thông báo khi đặt dịch vụ." },
      { q: "Có nhận việc ban đêm?", a: "Có, tổng đài nhận yêu cầu và điều phối theo ca." },
    ],
    related: ["thue-nhan-cong-boc-xep", "xep-do-hang-hoa", "boc-xep-kho-hang"],
  },
  {
    slug: "boc-xep-theo-thang",
    name: "Bốc Xếp Theo Tháng",
    h1: "Bốc Xếp Theo Tháng — Đội Cố Định Trực Tại Kho",
    seoTitle: "Bốc Xếp Theo Tháng TP.HCM — Đội Cố Định, Báo Cáo Tuần",
    seoDescription:
      "Thuê đội bốc xếp theo tháng tại TP.HCM: nhân sự cố định trực tại kho, có đội trưởng, báo cáo sản lượng hằng tuần, hợp đồng và hóa đơn đầy đủ.",
    keyword: "bốc xếp theo tháng",
    subKeywords: ["thuê nhân công theo tháng", "đội bốc xếp cố định", "outsourcing nhân công kho"],
    intro:
      "Kho hoạt động đều mỗi ngày thì thuê theo tháng hợp lý hơn thuê lẻ: đội quen việc, năng suất ổn định và đơn giá mỗi giờ thấp hơn.",
    forWho: [
      "Kho, xưởng vận hành liên tục theo ca",
      "Doanh nghiệp muốn giảm gánh nặng tuyển dụng, quản lý nhân sự phổ thông",
      "Đơn vị cần báo cáo sản lượng định kỳ",
    ],
    scope: [
      "Bố trí đội cố định theo số người và số ca mỗi tuần",
      "Đội trưởng điều phối, chấm công và báo cáo",
      "Thay thế nhân sự khi nghỉ để không thiếu người",
      "Điều chỉnh quy mô đội theo mùa vụ",
    ],
    process: [
      { step: "Xác định định biên", detail: "Số người mỗi ca, số ca mỗi tuần, phạm vi công việc." },
      { step: "Ký hợp đồng", detail: "Thống nhất đơn giá, SLA, quy định an toàn và cách báo cáo." },
      { step: "Bàn giao & đào tạo tại chỗ", detail: "Đội làm quen quy trình kho trong những ngày đầu." },
      { step: "Vận hành & báo cáo", detail: "Chấm công, báo sản lượng hằng tuần, họp đánh giá định kỳ." },
    ],
    pros: [
      "Đơn giá mỗi giờ thấp hơn thuê lẻ",
      "Nhân sự quen quy trình nên ít sai sót",
      "Có cam kết thay người khi nghỉ",
    ],
    notes: [
      "Cần thời gian đầu để đội làm quen quy trình riêng của kho",
      "Thay đổi định biên lớn nên thông báo trước để chuẩn bị nhân sự",
    ],
    faqs: [
      { q: "Thuê tối thiểu bao nhiêu người theo tháng?", a: "Không có mức cứng; phổ biến là từ vài người trở lên cho một ca. Chúng tôi tư vấn định biên sau khi biết khối lượng công việc." },
      { q: "Nếu nhân sự nghỉ thì sao?", a: "Chúng tôi bố trí người thay để đủ định biên trong ca." },
      { q: "Có báo cáo sản lượng?", a: "Có, báo cáo hằng tuần hoặc theo tần suất bạn yêu cầu." },
      { q: "Có tăng người vào mùa cao điểm?", a: "Có, bổ sung theo ca hoặc theo tuần." },
      { q: "Thanh toán theo kỳ nào?", a: "Thường theo tháng, đối chiếu chấm công trước khi xuất hóa đơn." },
      { q: "Có cam kết chất lượng?", a: "Có, các tiêu chí về sản lượng, an toàn và thái độ làm việc được ghi trong hợp đồng." },
    ],
    related: ["boc-xep-hop-dong", "thue-nhan-cong-boc-xep", "boc-xep-kho-hang"],
  },
  {
    slug: "boc-xep-hop-dong",
    name: "Bốc Xếp Hợp Đồng",
    h1: "Bốc Xếp Theo Hợp Đồng Dài Hạn, Hóa Đơn VAT",
    seoTitle: "Bốc Xếp Hợp Đồng Dài Hạn — SLA Rõ Ràng, Hóa Đơn VAT",
    seoDescription:
      "Hợp đồng bốc xếp dài hạn cho doanh nghiệp tại TP.HCM: cam kết SLA, định biên nhân sự, báo cáo định kỳ và hóa đơn VAT. Gọi 0888.977.822.",
    keyword: "bốc xếp hợp đồng",
    subKeywords: ["hợp đồng bốc xếp dài hạn", "thuê ngoài nhân công bốc xếp", "dịch vụ bốc xếp doanh nghiệp"],
    intro:
      "Với doanh nghiệp, điều quan trọng không chỉ là giá mà là sự ổn định: đủ người, đúng giờ, có người chịu trách nhiệm và có chứng từ hợp lệ.",
    forWho: [
      "Doanh nghiệp sản xuất, phân phối cần nhân công thường xuyên",
      "Đơn vị 3PL, forwarder cần đối tác nhân công ổn định",
      "Chuỗi bán lẻ cần bốc xếp tại nhiều điểm",
    ],
    scope: [
      "Cung ứng nhân công theo định biên và lịch cố định",
      "Cam kết thời gian phản hồi và tỷ lệ đủ người mỗi ca",
      "Báo cáo sản lượng, biên bản sự cố, họp đánh giá định kỳ",
      "Xuất hóa đơn VAT theo kỳ thanh toán",
    ],
    process: [
      { step: "Trao đổi nhu cầu", detail: "Phạm vi công việc, khối lượng, địa điểm và yêu cầu đặc thù." },
      { step: "Đề xuất phương án", detail: "Định biên, đơn giá, SLA và cách đo lường chất lượng." },
      { step: "Ký hợp đồng", detail: "Thống nhất điều khoản trách nhiệm, an toàn và thanh toán." },
      { step: "Triển khai", detail: "Bàn giao, đào tạo tại chỗ, vận hành theo lịch." },
      { step: "Đánh giá & cải tiến", detail: "Rà soát định kỳ, điều chỉnh định biên và quy trình." },
    ],
    pros: [
      "Chi phí dự đoán được, dễ lập ngân sách",
      "Có SLA và đầu mối chịu trách nhiệm rõ ràng",
      "Chứng từ đầy đủ cho kế toán và kiểm toán",
    ],
    notes: [
      "Cần thời gian chuẩn bị nhân sự cho hợp đồng quy mô lớn",
      "Yêu cầu đặc thù (hàng nguy hiểm, kho lạnh) cần đánh giá riêng",
    ],
    faqs: [
      { q: "Hợp đồng tối thiểu bao lâu?", a: "Linh hoạt theo nhu cầu, phổ biến là theo tháng hoặc theo năm với điều khoản điều chỉnh định biên." },
      { q: "SLA gồm những gì?", a: "Thường gồm tỷ lệ đủ người mỗi ca, thời gian phản hồi yêu cầu phát sinh và các tiêu chí an toàn." },
      { q: "Có xuất hóa đơn VAT?", a: "Có, theo kỳ thanh toán đã thống nhất." },
      { q: "Có làm nhiều địa điểm cùng lúc?", a: "Có, chúng tôi phân đội theo khu vực dựa trên hệ thống chi nhánh." },
      { q: "Trách nhiệm khi xảy ra hư hỏng?", a: "Được quy định cụ thể trong hợp đồng, kèm quy trình lập biên bản và xử lý." },
      { q: "Có thể thử trước khi ký dài hạn?", a: "Có, nhiều khách bắt đầu bằng vài ca theo giờ hoặc theo tháng trước khi ký hợp đồng." },
    ],
    related: ["boc-xep-theo-thang", "boc-xep-nha-may", "boc-xep-kho-hang"],
  },
];

export const findServicePage = (slug: string) => SERVICE_PAGES.find((s) => s.slug === slug);
