import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Phone } from "lucide-react";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingButtons } from "@/components/site/FloatingButtons";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SERVICE_PAGES } from "@/data/service-pages";
import { HOTLINE, HOTLINE_TEL } from "@/data/site";
import { absUrl, breadcrumbLd, metaFor } from "@/lib/seo";

const TITLE = "Dịch Vụ Bốc Xếp Hàng Hóa TP.HCM — Danh Mục Đầy Đủ";
const DESC =
  "Tổng hợp toàn bộ dịch vụ bốc xếp của Bốc Xếp Sài Gòn: bốc xếp kho hàng, container, nhà máy, cảng, sân bay, thuê nhân công, đóng gói, chuyển kho, chuyển nhà và văn phòng.";

export const Route = createFileRoute("/dich-vu/")({
  head: () => {
    const base = metaFor({ title: TITLE, description: DESC, path: "/dich-vu" });
    return {
      ...base,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbLd([
              { name: "Trang chủ", path: "/" },
              { name: "Dịch vụ", path: "/dich-vu" },
            ]),
          ),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Dịch vụ bốc xếp Bốc Xếp Sài Gòn",
            itemListElement: SERVICE_PAGES.map((s, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: s.name,
              url: absUrl(`/dich-vu/${s.slug}`),
            })),
          }),
        },
      ],
    };
  },
  component: ServiceHub,
});

function ServiceHub() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pb-16 pt-28 md:pt-36">
        <nav aria-label="Breadcrumb" className="mb-4 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">
            Trang chủ
          </Link>
          <span className="mx-1.5">/</span>
          <span className="text-foreground">Dịch vụ</span>
        </nav>

        <h1 className="font-heading text-3xl font-bold uppercase tracking-tight md:text-4xl">
          Dịch Vụ Bốc Xếp Hàng Hóa Tại TP.HCM
        </h1>
        <p className="mt-3 max-w-3xl text-muted-foreground">
          Bốc Xếp Sài Gòn cung ứng nhân công và dịch vụ bốc xếp cho kho hàng, nhà máy, cảng, depot,
          sân bay và hộ gia đình tại TP.HCM cùng các tỉnh phía Nam. Chọn dịch vụ bên dưới để xem
          phạm vi công việc, quy trình và câu hỏi thường gặp.
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <a href={`tel:${HOTLINE_TEL}`}>
              <Phone className="mr-2 h-4 w-4" /> Gọi {HOTLINE}
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/" hash="lien-he">
              Nhận báo giá
            </Link>
          </Button>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_PAGES.map((s) => (
            <Card key={s.slug} className="group h-full transition-colors hover:border-primary">
              <CardContent className="flex h-full flex-col p-5">
                <h2 className="font-heading text-lg font-bold uppercase">{s.name}</h2>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{s.seoDescription}</p>
                <Link
                  to="/dich-vu/$slug"
                  params={{ slug: s.slug }}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
                >
                  Xem chi tiết <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}
