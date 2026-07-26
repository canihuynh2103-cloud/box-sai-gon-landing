import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, CheckCircle2, MapPin, Phone, ShieldCheck, Users } from "lucide-react";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingButtons } from "@/components/site/FloatingButtons";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ADDRESS, BRANCHES, EMAIL, HOTLINE, HOTLINE_TEL, WORK_HOURS } from "@/data/site";
import { absUrl, breadcrumbLd, metaFor, SITE_NAME } from "@/lib/seo";

const TITLE = "Hồ Sơ Năng Lực Bốc Xếp Sài Gòn — Kinh Nghiệm & Cam Kết";
const DESC =
  "Hồ sơ năng lực Bốc Xếp Sài Gòn: hơn 10 năm kinh nghiệm, 100+ nhân công, 3 chi nhánh tại TP.HCM, quy trình an toàn, bảo hiểm hàng hóa và cam kết dịch vụ rõ ràng.";

const CAPABILITIES = [
  { label: "Năm kinh nghiệm", value: "10+", desc: "Hoạt động liên tục trong ngành bốc xếp tại TP.HCM" },
  { label: "Nhân công thường trực", value: "100+", desc: "Có hồ sơ, được huấn luyện an toàn lao động" },
  { label: "Chi nhánh điều phối", value: "3", desc: "Thủ Đức, Tân Bình, Bình Tân" },
  { label: "Thời gian điều động", value: "2 giờ", desc: "Trong nội thành, kể cả ngoài giờ hành chính" },
];

const EXPERIENCE = [
  {
    title: "Kho hàng & trung tâm phân phối",
    detail:
      "Nhập xuất kho theo ca cố định cho các kho tại Thủ Đức, Bình Tân, Long Hậu: xếp pallet, lên kệ, kiểm đếm đối chiếu phiếu, kiểm kê định kỳ.",
  },
  {
    title: "Container tại cảng và depot",
    detail:
      "Rút ruột và đóng hàng container 20/40 feet tại Cát Lái, Trường Thọ, ICD Sóng Thần — phối hợp tài xế để hoàn thành trong hạn miễn phí lưu bãi.",
  },
  {
    title: "Nhà máy & di dời thiết bị",
    detail:
      "Bố trí tổ theo 3 kíp cho nhà máy sản xuất, di dời máy móc cuối tuần để không gián đoạn dây chuyền.",
  },
  {
    title: "Hàng air và hàng đặc thù",
    detail:
      "Xử lý hàng tại TCS/SCSC sân bay Tân Sơn Nhất, hàng dễ vỡ, hàng hóa chất có MSDS, hàng siêu trường siêu trọng cần cẩu hỗ trợ.",
  },
];

const COMMITMENTS = [
  "Báo giá bằng văn bản trước khi triển khai, không phát sinh ngoài thỏa thuận đã ký.",
  "Nhân sự có đồng phục, bảo hộ lao động, danh sách gửi trước cho khách hàng và ban quản lý.",
  "Biên bản bàn giao kèm ảnh trước – sau cho mọi công việc liên quan tài sản giá trị cao.",
  "Bảo hiểm trách nhiệm và hỗ trợ thủ tục bảo hiểm hàng hóa khi khách hàng yêu cầu.",
  "SLA đo lường được: đúng giờ, đủ quân số, tỉ lệ hư hỏng dưới 0,1%.",
];

const PROCESS = [
  { step: "01", name: "Tiếp nhận & khảo sát", desc: "Ghi nhận loại hàng, khối lượng, mặt bằng, khung giờ; khảo sát tại chỗ với công việc lớn." },
  { step: "02", name: "Báo giá & chốt phương án", desc: "Đề xuất số nhân công, thiết bị, thời gian và đơn giá bằng văn bản." },
  { step: "03", name: "Điều động & triển khai", desc: "Tổ trưởng phổ biến an toàn đầu ca, phân công khu vực, làm theo quy trình đã duyệt." },
  { step: "04", name: "Nghiệm thu & hậu kiểm", desc: "Đối chiếu số lượng, ký biên bản, xử lý phát sinh trong 24 giờ nếu có." },
];

export const Route = createFileRoute("/ho-so-nang-luc")({
  head: () => {
    const base = metaFor({ title: TITLE, description: DESC, path: "/ho-so-nang-luc" });
    return {
      ...base,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbLd([
              { name: "Trang chủ", path: "/" },
              { name: "Hồ sơ năng lực", path: "/ho-so-nang-luc" },
            ]),
          ),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: SITE_NAME,
            url: absUrl("/"),
            email: EMAIL,
            telephone: `+84${HOTLINE_TEL.slice(1)}`,
            address: {
              "@type": "PostalAddress",
              streetAddress: ADDRESS,
              addressLocality: "TP. Hồ Chí Minh",
              addressCountry: "VN",
            },
            areaServed: "TP. Hồ Chí Minh và các tỉnh lân cận",
            numberOfEmployees: { "@type": "QuantitativeValue", minValue: 100 },
            department: BRANCHES.map((b) => ({
              "@type": "LocalBusiness",
              name: `${SITE_NAME} — ${b.name}`,
              address: b.address,
              telephone: b.phone,
            })),
          }),
        },
      ],
    };
  },
  component: CapabilityPage,
});

function CapabilityPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pb-16 pt-44 lg:pt-32">
        <nav aria-label="Breadcrumb" className="mb-4 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">
            Trang chủ
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Hồ sơ năng lực</span>
        </nav>

        <header className="max-w-3xl">
          <h1 className="font-heading text-3xl uppercase leading-tight md:text-5xl">
            Hồ sơ năng lực Bốc Xếp Sài Gòn
          </h1>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Chúng tôi cung cấp nhân công và dịch vụ bốc xếp hàng hóa tại TP.HCM từ kho hàng, container,
            nhà máy, cảng biển đến sân bay. Trang này tổng hợp năng lực thực tế, quy trình làm việc và
            cam kết dịch vụ để khách hàng có đủ cơ sở đánh giá trước khi hợp tác.
          </p>
        </header>

        <section className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {CAPABILITIES.map((c) => (
            <Card key={c.label} className="border-border/60">
              <CardContent className="p-5">
                <div className="font-heading text-3xl text-primary">{c.value}</div>
                <div className="mt-1 font-semibold">{c.label}</div>
                <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="mt-14">
          <h2 className="font-heading text-2xl uppercase md:text-3xl">Kinh nghiệm triển khai</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {EXPERIENCE.map((e) => (
              <Card key={e.title} className="border-border/60">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">{e.title}</h3>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{e.detail}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="font-heading text-2xl uppercase md:text-3xl">Quy trình làm việc</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {PROCESS.map((p) => (
              <Card key={p.step} className="border-border/60">
                <CardContent className="p-6">
                  <div className="font-heading text-2xl text-primary">{p.step}</div>
                  <h3 className="mt-2 font-semibold">{p.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-14 grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-2xl uppercase md:text-3xl">Cam kết dịch vụ</h2>
            <ul className="mt-6 space-y-3">
              {COMMITMENTS.map((c) => (
                <li key={c} className="flex gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-heading text-2xl uppercase md:text-3xl">An toàn lao động</h2>
            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                Huấn luyện an toàn định kỳ, phổ biến rủi ro đầu mỗi ca làm việc.
              </li>
              <li className="flex gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                Trang bị giày bảo hộ, găng tay, áo phản quang; mũ bảo hộ tại công trường và cảng.
              </li>
              <li className="flex gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                Tách lối đi bộ và khu vực xe nâng; một người duy nhất ra tín hiệu khi cẩu hàng.
              </li>
              <li className="flex gap-3">
                <Users className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                Tổ trưởng giám sát trực tiếp, ghi nhật ký ca và biên bản sự cố trong ngày.
              </li>
            </ul>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="font-heading text-2xl uppercase md:text-3xl">Mạng lưới điều phối</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {BRANCHES.map((b) => (
              <Card key={b.name} className="border-border/60">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">{b.name}</h3>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{b.address}</p>
                  <p className="mt-2 text-sm text-muted-foreground">Khu vực phục vụ: {b.area}</p>
                  <p className="mt-2 text-sm font-semibold text-primary">{b.phone}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Giờ làm việc: {WORK_HOURS}. Email: {EMAIL}.
          </p>
        </section>

        <section className="mt-14 rounded-xl border border-border/60 bg-card p-8">
          <h2 className="font-heading text-2xl uppercase">Cần bản hồ sơ năng lực chi tiết?</h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
            Chúng tôi gửi hồ sơ năng lực đầy đủ kèm bảng giá, mẫu hợp đồng và phụ lục SLA theo yêu cầu
            của bộ phận mua hàng.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href={`tel:${HOTLINE_TEL}`}>
                <Phone className="mr-2 h-4 w-4" /> Gọi {HOTLINE}
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/dich-vu">Xem danh mục dịch vụ</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}
