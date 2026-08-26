import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Clock, MapPin, Phone, Mail, Globe } from "lucide-react";

import { Header } from "@/components/site/Header";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { FloatingButtons } from "@/components/site/FloatingButtons";
import { WatermarkedImage } from "@/components/site/WatermarkedImage";
import { QuoteButton } from "@/components/site/QuoteButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SERVICES, HOTLINE, HOTLINE_TEL, EMAIL, ADDRESS } from "@/data/site";
import { absUrl, breadcrumbLd, metaFor, SITE_NAME, SITE_URL } from "@/lib/seo";
import containerAsset from "@/assets/svc-container.jpg.asset.json";


const PATH = "/dich-vu-boc-xep-tphcm";
const TITLE = "Dịch Vụ Bốc Xếp TP.HCM Chuyên Nghiệp 24/7 | Bốc Xếp Sài Gòn";
const DESC =
  "Dịch vụ bốc xếp TP.HCM chuyên nghiệp 24/7 tại kho, nhà máy, container và xe tải. Thuê nhân công theo giờ, ngày hoặc dài hạn. Gọi 0888.997.822.";

/** Ảnh thực tế có sẵn trên site, dùng làm og:image (URL tuyệt đối). */
const OG_IMAGE = `${SITE_URL}${containerAsset.url}`;

/** Những trường hợp khách thường cần thuê dịch vụ bốc xếp. */
const USE_CASES: { t: string; d: string }[] = [
  {
    t: "Kho hàng nhập - xuất theo ca",
    d: "Kho cần thêm người cho ca nhận hàng buổi sáng hoặc ca soạn - giao hàng buổi chiều mà không muốn tăng biên chế cố định.",
  },
  {
    t: "Container về kho cần rút hoặc đóng hàng",
    d: "Cont về theo lịch tàu, cần đủ người hoàn thành trong thời gian lưu bãi để tránh phát sinh chi phí chờ.",
  },
  {
    t: "Xe tải cần lên - xuống hàng",
    d: "Xe tới điểm giao nhưng bên nhận không có người xếp dỡ, cần đội hỗ trợ đúng giờ hẹn của tài xế.",
  },
  {
    t: "Nhà máy di dời máy móc, nguyên vật liệu",
    d: "Chuyển vị trí dây chuyền, dịch chuyển nguyên vật liệu hoặc thành phẩm giữa các xưởng và khu vực lưu trữ.",
  },
  {
    t: "Mùa cao điểm cần bổ sung nhân công",
    d: "Giai đoạn lễ, Tết hoặc chương trình khuyến mại khiến lượng hàng tăng đột biến trong vài tuần.",
  },
  {
    t: "Chuyển kho, sắp xếp lại hàng hóa",
    d: "Đổi mặt bằng kho, gom hàng về một điểm hoặc bố trí lại sơ đồ kệ để dễ soạn hàng hơn.",
  },
  {
    t: "Công việc ngoài giờ hoặc ban đêm",
    d: "Nhiều kho, cửa hàng và tuyến đường chỉ cho nhận hàng ngoài giờ hành chính nên ca làm rơi vào buổi tối hoặc đêm.",
  },
];


/** Card dịch vụ: chỉ liên kết tới URL đã tồn tại; mục không có trang riêng để trống `slug`. */
const SERVICE_CARDS: { name: string; desc: string; slug?: string }[] = [
  {
    name: "Bốc xếp kho hàng",
    desc: "Nhập - xuất kho theo ca, xếp pallet, kiểm đếm, đảo hàng theo sơ đồ kho.",
    slug: "boc-xep-kho-hang",
  },
  {
    name: "Bốc xếp container",
    desc: "Rút ruột và đóng hàng lên container tại cảng, depot hoặc kho của khách.",
    slug: "boc-xep-container",
  },
  {
    name: "Bốc xếp nhà máy",
    desc: "Xếp dỡ nguyên vật liệu, thành phẩm, di dời máy móc trong khu công nghiệp.",
    slug: "boc-xep-nha-may",
  },
  {
    name: "Bốc xếp xe tải",
    desc: "Lên - xuống hàng xe tải các tải trọng, xếp hàng đúng thứ tự tuyến giao, chèn lót chống xô lệch.",
  },
  {
    name: "Cung ứng nhân công bốc xếp",
    desc: "Nhân công theo giờ, theo ca, theo tháng, có đội trưởng giám sát tại hiện trường.",
    slug: "thue-nhan-cong-boc-xep",
  },
  {
    name: "Đóng gói hàng hóa",
    desc: "Đóng thùng, quấn màng PE, chèn lót, dán nhãn trước khi vận chuyển.",
    slug: "dong-goi-hang-hoa",
  },
  {
    name: "Tháo dỡ và lắp đặt",
    desc: "Tháo kệ kho, giá đỡ, bàn ghế, thiết bị và lắp lại tại vị trí mới theo yêu cầu.",
  },
  {
    name: "Chuyển kho",
    desc: "Chuyển toàn bộ hàng hóa sang kho mới theo đợt, giữ nguyên phân loại và mã hàng.",
    slug: "chuyen-kho",
  },
  {
    name: "Xếp dỡ hàng hóa",
    desc: "Xếp dỡ hàng rời, hàng bao, hàng kiện, hàng nặng tại kho bãi và công trình.",
    slug: "xep-do-hang-hoa",
  },
];

const AREAS_HCM = [
  "TP.HCM",
  "Thủ Đức",
  "Tân Bình",
  "Bình Tân",
  "Bình Thạnh",
  "Quận 7",
  "Bình Chánh",
  "Hóc Môn",
  "Củ Chi",
  "Nhà Bè",
];

const PROCESS = [
  { step: "Tiếp nhận yêu cầu", detail: "Gọi hotline hoặc gửi form: địa chỉ, loại hàng, khối lượng, khung giờ và số người cần." },
  { step: "Trao đổi / khảo sát", detail: "Trao đổi tình trạng hàng hóa, lối vào, tầng lầu, thiết bị hỗ trợ. Khối lượng lớn hoặc hàng đặc thù sẽ khảo sát trước." },
  { step: "Báo giá", detail: "Báo giá theo giờ, theo ngày, theo tháng hoặc theo hợp đồng trước khi điều người, thống nhất phạm vi công việc." },
  { step: "Điều phối nhân công", detail: "Điều đội đúng giờ, có đội trưởng phụ trách, nhân công mang bảo hộ và tuân thủ nội quy nơi làm việc." },
  { step: "Thực hiện và nghiệm thu", detail: "Thi công theo phạm vi đã chốt, chốt sản lượng, vệ sinh khu vực và bàn giao cho người phụ trách." },
];

const WHY = [
  { t: "Phục vụ 24/7", d: "Nhận ca ngày, ca đêm, cuối tuần và ngày lễ theo lịch nhập - xuất hàng của khách." },
  { t: "Đội ngũ nhân công có tổ chức", d: "Làm việc theo đội, có đội trưởng giám sát tiến độ và an toàn trong suốt ca." },
  { t: "Nhận nhiều loại hàng hóa", d: "Hàng thùng, hàng bao, hàng kiện, hàng rời, hàng nặng, máy móc và thiết bị." },
  { t: "Đa dạng hiện trường", d: "Kho hàng, nhà máy, container, xe tải, văn phòng, cửa hàng và công trình." },
  { t: "Thuê theo giờ / ngày / tháng", d: "Chọn hình thức phù hợp khối lượng công việc, có hợp đồng cho nhu cầu dài hạn." },
  { t: "TP.HCM và khu vực lân cận", d: "Phục vụ toàn TP.HCM, đồng thời nhận việc tại Bình Dương, Đồng Nai, Long An." },
];

const FAQS = [
  {
    q: "Dịch vụ bốc xếp TP.HCM nhận làm những công việc gì?",
    a: "Chúng tôi nhận bốc xếp kho hàng, nhà máy, container, xe tải, xếp dỡ hàng hóa tại kho bãi, đóng gói - chèn lót, tháo dỡ và lắp đặt, chuyển kho, cùng việc cung ứng nhân công cho các ca nhập - xuất hàng.",
  },
  {
    q: "Có nhận bốc xếp container không?",
    a: "Có. Chúng tôi rút ruột và đóng hàng lên container tại cảng, depot hoặc tại kho riêng của khách, bố trí đủ người theo số cont và khung giờ cần hoàn thành.",
  },
  {
    q: "Có thể thuê nhân công bốc xếp theo giờ không?",
    a: "Được. Bạn có thể thuê theo giờ cho ca lẻ, theo ngày cho công việc trọn ca, hoặc theo tháng và theo hợp đồng nếu cần đội cố định.",
  },
  {
    q: "Bốc xếp ban đêm có nhận không?",
    a: "Có. Nhiều kho và cửa hàng chỉ nhận hàng ngoài giờ hành chính nên chúng tôi bố trí đội làm ca đêm; bạn nên đặt trước để đảm bảo đủ người.",
  },
  {
    q: "Bốc xếp ở Thủ Đức có nhận không?",
    a: "Có. Thủ Đức là khu vực chúng tôi phục vụ thường xuyên, cùng với Tân Bình, Bình Tân, Bình Thạnh, Quận 7, Bình Chánh, Hóc Môn, Củ Chi, Nhà Bè và các khu vực còn lại của TP.HCM.",
  },
  {
    q: "Làm sao để nhận báo giá?",
    a: `Gọi hotline ${HOTLINE} hoặc gửi form yêu cầu trên trang này với địa chỉ, loại hàng, khối lượng và thời gian dự kiến. Chúng tôi báo giá trước khi điều nhân công.`,
  },
  {
    q: "Bốc Xếp Sài Gòn có phục vụ ngoài TP.HCM không?",
    a: "Có. Ngoài TP.HCM, chúng tôi nhận việc tại Bình Dương, Đồng Nai, Long An và các khu vực lân cận; với địa điểm xa, vui lòng trao đổi trước để sắp xếp lịch điều đội.",
  },
];

const GALLERY = [
  { key: "Bốc Xếp Container", fallback: 1 },
  { key: "Bốc Xếp Kho Hàng", fallback: 0 },
  { key: "Đóng Gói Hàng Hóa", fallback: 7 },
  { key: "Thuê Nhân Công", fallback: 5 },
];

export const Route = createFileRoute("/dich-vu-boc-xep-tphcm")({
  head: () => {
    const base = metaFor({
      title: TITLE,
      description: DESC,
      path: PATH,
      image: OG_IMAGE,
    });

    return {
      ...base,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbLd([
              { name: "Trang chủ", path: "/" },
              { name: "Dịch vụ bốc xếp TP.HCM", path: PATH },
            ]),
          ),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Dịch vụ bốc xếp hàng hóa tại TP.HCM",
            serviceType: "Dịch vụ bốc xếp TP.HCM",
            description: DESC,
            url: absUrl(PATH),
            areaServed: [
              { "@type": "City", name: "Thành phố Hồ Chí Minh" },
              { "@type": "AdministrativeArea", name: "Bình Dương" },
              { "@type": "AdministrativeArea", name: "Đồng Nai" },
              { "@type": "AdministrativeArea", name: "Long An" },
            ],
            provider: {
              "@type": "LocalBusiness",
              name: SITE_NAME,
              telephone: HOTLINE,
              email: EMAIL,
              url: absUrl("/"),
              address: { "@type": "PostalAddress", streetAddress: ADDRESS, addressCountry: "VN" },
            },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        },
      ],
    };
  },
  component: HcmcLandingPage,
});

function HcmcLandingPage() {
  const heroImage =
    SERVICES.find((s) => s.title === "Bốc Xếp Container")?.image ?? SERVICES[0].image;
  const gallery = GALLERY.map((g) => {
    const svc = SERVICES.find((s) => s.title === g.key) ?? SERVICES[g.fallback];
    return { title: svc.title, image: svc.image, alt: svc.alt ?? svc.title };
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-40 lg:pt-28">
        {/* HERO */}
        <section className="container mx-auto px-4 pb-4">
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">
              Trang chủ
            </Link>
            <span className="mx-1.5">/</span>
            <span className="text-foreground">Dịch vụ bốc xếp TP.HCM</span>
          </nav>

          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div>
              <span className="section-eyebrow">Bốc Xếp Sài Gòn</span>
              <h1 className="mt-4 font-display text-3xl font-bold uppercase leading-tight md:text-5xl">
                Dịch Vụ Bốc Xếp TP.HCM Chuyên Nghiệp 24/7
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Bốc Xếp Sài Gòn là đơn vị cung cấp dịch vụ bốc xếp hàng hóa tại TP.HCM, phục vụ kho
                hàng, nhà máy, container, xe tải, văn phòng, cửa hàng và các nhu cầu xếp dỡ hàng hóa
                khác. Bạn cần thêm người cho một ca nhập hàng gấp hay một đội cố định làm việc mỗi
                ngày, chúng tôi bố trí nhân công đúng giờ và báo giá trước khi bắt đầu.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button asChild size="lg">
                  <a href={`tel:${HOTLINE_TEL}`} className="cta-ring">
                    <Phone className="mr-2 h-4 w-4" /> Gọi Ngay {HOTLINE}
                  </a>
                </Button>
                <QuoteButton className="inline-flex items-center justify-center rounded-md border border-primary px-5 py-3 text-sm font-bold uppercase tracking-wide text-primary transition-colors hover:bg-accent hover:text-accent-foreground" />
              </div>

              <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 text-primary" /> Nhận yêu cầu 24/7, kể cả ca đêm, cuối tuần
                và ngày lễ.
              </p>
            </div>

            <WatermarkedImage
              wrapperClassName="rounded-2xl border border-border"
              src={heroImage}
              alt="Nhân công Bốc Xếp Sài Gòn bốc xếp hàng hóa từ container tại TP.HCM"
              width={1200}
              height={800}
              className="aspect-[4/3] w-full rounded-2xl object-cover object-center"
            />
          </div>
        </section>

        {/* GIỚI THIỆU DỊCH VỤ */}
        <section className="container mx-auto px-4 py-14">
          <h2 className="font-display text-2xl font-bold uppercase md:text-3xl">
            Bốc Xếp Sài Gòn cung cấp dịch vụ bốc xếp tại TP.HCM như thế nào
          </h2>
          <div className="mt-5 grid gap-6 lg:grid-cols-2">
            <div className="space-y-4 text-muted-foreground">
              <p>
                Chúng tôi nhận trọn phần công việc xếp dỡ tại hiện trường: hạ hàng từ xe tải và
                container, đưa hàng vào kho, xếp pallet theo sơ đồ, soạn hàng cho các chuyến giao,
                đóng gói - chèn lót và di dời hàng hóa giữa các vị trí. Mỗi ca đều có đội trưởng
                nhận bàn giao công việc từ người phụ trách của khách để làm đúng quy trình tại kho,
                nhà máy hoặc mặt bằng của bạn.
              </p>
              <p>
                Nhóm khách hàng phù hợp thường là kho phân phối và kho thương mại điện tử cần tăng
                người theo mùa vụ, nhà máy trong khu công nghiệp cần đội xếp dỡ nguyên vật liệu và
                thành phẩm, đơn vị vận tải cần người lên - xuống hàng theo chuyến, cửa hàng và văn
                phòng cần chuyển hoặc sắp xếp lại hàng hóa, cùng các đơn vị logistics muốn bổ sung
                nhân sự ngắn hạn mà không tăng biên chế.
              </p>
            </div>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-display text-lg font-bold uppercase">Hình thức thuê nhân công</h3>
                <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                  {[
                    "Theo giờ: phù hợp ca lẻ, hàng về đột xuất, khối lượng nhỏ.",
                    "Theo ngày: trọn ca làm việc cho đợt nhập - xuất hàng lớn.",
                    "Theo tháng: đội cố định làm việc theo lịch kho của bạn.",
                    "Theo hợp đồng dài hạn: có hợp đồng, phân công và định mức rõ ràng.",
                  ].map((i) => (
                    <li key={i} className="flex gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{i}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CÁC DỊCH VỤ */}
        <section className="bg-muted/40 py-14">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-2xl font-bold uppercase md:text-3xl">
              Các dịch vụ bốc xếp tại TP.HCM
            </h2>
            <p className="mt-3 max-w-3xl text-muted-foreground">
              Chọn hạng mục gần nhất với công việc của bạn. Nếu chưa rõ nên bố trí bao nhiêu người,
              hãy gọi hotline để chúng tôi tính theo khối lượng thực tế.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICE_CARDS.map((c) => (
                <Card key={c.name} className="group h-full transition-colors hover:border-primary">
                  <CardContent className="flex h-full flex-col p-5">
                    <h3 className="font-display text-lg font-bold uppercase">{c.name}</h3>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground">{c.desc}</p>
                    {c.slug ? (
                      <Link
                        to="/dich-vu/$slug"
                        params={{ slug: c.slug }}
                        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
                      >
                        Xem chi tiết dịch vụ
                      </Link>
                    ) : (
                      <a
                        href={`tel:${HOTLINE_TEL}`}
                        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
                      >
                        Gọi {HOTLINE} để trao đổi
                      </a>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            <p className="mt-6 text-sm text-muted-foreground">
              Xem thêm{" "}
              <Link to="/dich-vu" className="font-semibold text-primary hover:underline">
                danh mục đầy đủ các dịch vụ bốc xếp
              </Link>{" "}
              hoặc{" "}
              <Link to="/ho-so-nang-luc" className="font-semibold text-primary hover:underline">
                hồ sơ năng lực của Bốc Xếp Sài Gòn
              </Link>
              .
            </p>
          </div>
        </section>

        {/* KHU VỰC PHỤC VỤ */}
        <section className="container mx-auto px-4 py-14">
          <h2 className="font-display text-2xl font-bold uppercase md:text-3xl">Khu vực phục vụ</h2>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            Chúng tôi nhận việc trên toàn TP.HCM, thường xuyên nhất tại các khu vực có nhiều kho
            hàng, nhà máy và depot container:
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {AREAS_HCM.map((a) => (
              <li
                key={a}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-1.5 text-sm font-semibold"
              >
                <MapPin className="h-3.5 w-3.5 text-primary" /> {a}
              </li>
            ))}
            <li className="inline-flex items-center rounded-full border border-dashed border-border px-3.5 py-1.5 text-sm text-muted-foreground">
              và các khu vực lân cận
            </li>
          </ul>
          <p className="mt-5 max-w-3xl text-muted-foreground">
            Ngoài TP.HCM, chúng tôi cũng nhận điều nhân công đi <strong>Bình Dương</strong>,{" "}
            <strong>Đồng Nai</strong> và <strong>Long An</strong> cho các kho, nhà máy và công trình
            trong khu vực. Với địa điểm xa, bạn nên trao đổi trước một khoảng thời gian để chúng tôi
            xếp lịch đội.
          </p>
        </section>

        {/* QUY TRÌNH */}
        <section className="bg-muted/40 py-14">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-2xl font-bold uppercase md:text-3xl">
              Quy trình làm việc
            </h2>
            <ol className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
              {PROCESS.map((p, i) => (
                <li key={p.step} className="rounded-xl border border-border bg-card p-5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary font-display font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                  <h3 className="mt-3 font-display text-base font-bold uppercase">{p.step}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* VÌ SAO CHỌN */}
        <section className="container mx-auto px-4 py-14">
          <h2 className="font-display text-2xl font-bold uppercase md:text-3xl">
            Vì sao nên chọn Bốc Xếp Sài Gòn
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {WHY.map((w) => (
              <div key={w.t} className="rounded-xl border border-border bg-card p-5">
                <h3 className="flex items-center gap-2 font-display text-base font-bold uppercase">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" /> {w.t}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{w.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* HÌNH ẢNH THỰC TẾ */}
        <section className="bg-muted/40 py-14">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-2xl font-bold uppercase md:text-3xl">
              Hình ảnh công việc thực tế
            </h2>
            <p className="mt-3 max-w-3xl text-muted-foreground">
              Một số hình ảnh ca làm việc của đội Bốc Xếp Sài Gòn tại kho hàng, depot container và
              hiện trường đóng gói ở TP.HCM.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {gallery.map((g) => (
                <figure key={g.title} className="overflow-hidden rounded-xl border border-border">
                  <WatermarkedImage
                    src={g.image}
                    alt={g.alt}
                    loading="lazy"
                    width={600}
                    height={600}
                    className="aspect-square w-full object-cover object-center"
                  />
                  <figcaption className="bg-card px-4 py-3 text-sm font-semibold">
                    {g.title}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="container mx-auto px-4 py-14">
          <h2 className="font-display text-2xl font-bold uppercase md:text-3xl">
            Câu hỏi thường gặp về dịch vụ bốc xếp TP.HCM
          </h2>
          <Accordion type="single" collapsible className="mt-8 max-w-3xl space-y-3">
            {FAQS.map((f, i) => (
              <AccordionItem
                key={f.q}
                value={`faq-${i}`}
                className="rounded-xl border border-border bg-card px-5 last:border-b"
              >
                <AccordionTrigger className="text-left font-display text-base font-bold hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* CTA CUỐI TRANG */}
        <section className="border-y border-border bg-card py-14">
          <div className="container mx-auto grid gap-8 px-4 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="font-display text-2xl font-bold uppercase md:text-3xl">
                Cần đội bốc xếp tại TP.HCM?
              </h2>
              <p className="mt-3 text-muted-foreground">
                Gọi hotline để trao đổi khối lượng hàng và khung giờ, chúng tôi báo giá và xếp lịch
                đội ngay trong cuộc gọi.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <a href={`tel:${HOTLINE_TEL}`} className="cta-ring">
                    <Phone className="mr-2 h-4 w-4" /> Gọi ngay {HOTLINE}
                  </a>
                </Button>
                <QuoteButton className="inline-flex items-center justify-center rounded-md border border-primary px-5 py-3 text-sm font-bold uppercase tracking-wide text-primary transition-colors hover:bg-accent hover:text-accent-foreground" />
              </div>
            </div>

            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <a href={`tel:${HOTLINE_TEL}`} className="font-display text-lg font-bold text-primary">
                  {HOTLINE}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Globe className="h-4 w-4 shrink-0 text-primary" />
                <a href={SITE_URL} className="hover:text-primary">
                  bocxepsaigon.vn
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <a href={`mailto:${EMAIL}`} className="hover:text-primary">
                  {EMAIL}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{ADDRESS}</span>
              </li>
            </ul>
          </div>
        </section>

        <Contact />
      </main>

      <Footer />
      <FloatingButtons />
    </div>
  );
}
