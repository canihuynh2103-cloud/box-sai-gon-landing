import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CheckCircle2, Phone, MessageCircle, AlertTriangle } from "lucide-react";

import { Header } from "@/components/site/Header";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { FloatingButtons } from "@/components/site/FloatingButtons";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SERVICE_PAGES, findServicePage, type ServicePage } from "@/data/service-pages";
import { topicSlugsForPillar } from "@/data/content-plan";
import { usePosts } from "@/hooks/use-content";
import { HOTLINE, HOTLINE_TEL, ADDRESS, EMAIL, SERVICES } from "@/data/site";
import { absUrl, breadcrumbLd, metaFor, SITE_NAME } from "@/lib/seo";

export const Route = createFileRoute("/dich-vu/$slug")({
  loader: ({ params }): { page: ServicePage } => {
    const page = findServicePage(params.slug);
    if (!page) throw notFound();
    return { page };
  },
  head: ({ loaderData }) => {
    const page = loaderData?.page;
    if (!page) return {};
    const base = metaFor({
      title: page.seoTitle,
      description: page.seoDescription,
      path: `/dich-vu/${page.slug}`,
    });
    return {
      ...base,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbLd([
              { name: "Trang chủ", path: "/" },
              { name: "Dịch vụ", path: "/dich-vu" },
              { name: page.name, path: `/dich-vu/${page.slug}` },
            ]),
          ),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: page.name,
            serviceType: page.keyword,
            description: page.seoDescription,
            url: absUrl(`/dich-vu/${page.slug}`),
            areaServed: [{ "@type": "City", name: "Thành phố Hồ Chí Minh" }],
            provider: {
              "@type": "LocalBusiness",
              name: SITE_NAME,
              telephone: HOTLINE,
              email: EMAIL,
              address: { "@type": "PostalAddress", streetAddress: ADDRESS, addressCountry: "VN" },
              url: absUrl("/"),
            },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: page.faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        },
      ],
    };
  },
  component: ServiceDetail,
  notFoundComponent: () => (
    <div className="p-16 text-center text-muted-foreground">Không tìm thấy dịch vụ.</div>
  ),
});

function ServiceDetail() {
  const { page } = Route.useLoaderData() as { page: ServicePage };
  const related = page.related
    .map((slug) => SERVICE_PAGES.find((s) => s.slug === slug))
    .filter(Boolean);

  const banner =
    SERVICES.find((s) => s.title.trim().toLowerCase() === page.name.trim().toLowerCase())?.image ??
    SERVICES[0].image;

  const { data: posts = [] } = usePosts();
  const clusterSlugs = topicSlugsForPillar(page.slug);
  const clusterPosts = posts.filter((p) => clusterSlugs.includes(p.slug)).slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pb-16 pt-44 lg:pt-32">
        <nav aria-label="Breadcrumb" className="mb-4 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">
            Trang chủ
          </Link>
          <span className="mx-1.5">/</span>
          <Link to="/dich-vu" className="hover:text-primary">
            Dịch vụ
          </Link>
          <span className="mx-1.5">/</span>
          <span className="text-foreground">{page.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <article className="max-w-3xl">
            <div className="overflow-hidden rounded-2xl border border-border">
              <img
                src={banner}
                alt={`${page.name} - hình ảnh thực tế đội bốc xếp tại TP.HCM`}
                width={1200}
                height={630}
                className="aspect-[16/9] w-full object-cover"
              />
            </div>
            <h1 className="mt-6 font-heading text-3xl font-bold uppercase tracking-tight md:text-4xl">
              {page.h1}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">{page.intro}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <a href={`tel:${HOTLINE_TEL}`}>
                  <Phone className="mr-2 h-4 w-4" /> Gọi {HOTLINE}
                </a>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <a href="https://zalo.me/0888977822" target="_blank" rel="noreferrer">
                  Chat Zalo
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#lien-he">Nhận báo giá</a>
              </Button>
            </div>

            <section className="mt-10">
              <h2 className="font-heading text-2xl font-bold uppercase">Dịch vụ này phù hợp với ai?</h2>
              <ul className="mt-4 space-y-2">
                {page.forWho.map((item) => (
                  <li key={item} className="flex gap-2 text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-10">
              <h2 className="font-heading text-2xl font-bold uppercase">Phạm vi công việc</h2>
              <ul className="mt-4 space-y-2">
                {page.scope.map((item) => (
                  <li key={item} className="flex gap-2 text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-10">
              <h2 className="font-heading text-2xl font-bold uppercase">Quy trình triển khai</h2>
              <ol className="mt-4 space-y-4">
                {page.process.map((p, i) => (
                  <li key={p.step} className="flex gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary font-heading font-bold text-primary-foreground">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-semibold">{p.step}</h3>
                      <p className="text-sm text-muted-foreground">{p.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section className="mt-10 grid gap-5 sm:grid-cols-2">
              <Card>
                <CardContent className="p-5">
                  <h2 className="font-heading text-xl font-bold uppercase">Ưu điểm</h2>
                  <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                    {page.pros.map((p) => (
                      <li key={p} className="flex gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-5">
                  <h2 className="font-heading text-xl font-bold uppercase">Lưu ý trước khi đặt</h2>
                  <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                    {page.notes.map((p) => (
                      <li key={p} className="flex gap-2">
                        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </section>

            <section className="mt-10">
              <h2 className="font-heading text-2xl font-bold uppercase">Câu hỏi thường gặp</h2>
              <Accordion type="single" collapsible className="mt-4">
                {page.faqs.map((f, i) => (
                  <AccordionItem key={f.q} value={`faq-${i}`}>
                    <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            {clusterPosts.length > 0 && (
              <section className="mt-10">
                <h2 className="font-heading text-2xl font-bold uppercase">
                  Bài viết chuyên sâu về {page.name}
                </h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {clusterPosts.map((post) => (
                    <Card key={post.id} className="h-full transition-colors hover:border-primary">
                      <CardContent className="flex h-full flex-col p-5">
                        <h3 className="font-heading text-base font-bold uppercase leading-snug">
                          <Link
                            to="/blog/$slug"
                            params={{ slug: post.slug }}
                            className="hover:text-primary"
                          >
                            {post.title}
                          </Link>
                        </h3>
                        {post.excerpt && (
                          <p className="mt-2 flex-1 text-sm text-muted-foreground">{post.excerpt}</p>
                        )}
                        <Link
                          to="/blog/$slug"
                          params={{ slug: post.slug }}
                          className="mt-3 text-sm font-semibold text-primary hover:underline"
                        >
                          Đọc bài viết
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}
            <p className="mt-10 text-sm text-muted-foreground">
              Xem thêm{" "}
              <Link to="/dich-vu" className="font-semibold text-primary hover:underline">
                toàn bộ dịch vụ bốc xếp
              </Link>{" "}
              hoặc{" "}
              <Link to="/blog" className="font-semibold text-primary hover:underline">
                kiến thức bốc xếp &amp; logistics
              </Link>
              .
            </p>
          </article>


          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <Card className="border-primary">
              <CardContent className="p-5">
                <h2 className="font-heading text-xl font-bold uppercase">Nhận báo giá {page.name}</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Gọi hotline để được báo giá trong ít phút, hoặc để lại thông tin để chúng tôi liên
                  hệ lại.
                </p>
                <div className="mt-4 grid gap-2">
                  <Button asChild size="lg">
                    <a href={`tel:${HOTLINE_TEL}`}>
                      <Phone className="mr-2 h-4 w-4" /> {HOTLINE}
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="secondary">
                    <a href="https://zalo.me/0888977822" target="_blank" rel="noreferrer">
                      Chat Zalo
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <a href="#lien-he">
                      <MessageCircle className="mr-2 h-4 w-4" /> Gửi yêu cầu
                    </a>
                  </Button>
                </div>
                <p className="mt-3 text-xs text-muted-foreground">Trụ sở: {ADDRESS}</p>
              </CardContent>
            </Card>

            {related.length > 0 && (
              <Card>
                <CardContent className="p-5">
                  <h2 className="font-heading text-lg font-bold uppercase">Dịch vụ liên quan</h2>
                  <ul className="mt-3 space-y-2 text-sm">
                    {related.map((r) => (
                      <li key={r!.slug}>
                        <Link
                          to="/dich-vu/$slug"
                          params={{ slug: r!.slug }}
                          className="text-primary hover:underline"
                        >
                          {r!.name}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link to="/blog" className="text-primary hover:underline">
                        Kiến thức bốc xếp &amp; logistics
                      </Link>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            )}
          </aside>
        </div>
      </main>
      <Contact />
      <Footer />
      <FloatingButtons />
    </div>
  );
}
