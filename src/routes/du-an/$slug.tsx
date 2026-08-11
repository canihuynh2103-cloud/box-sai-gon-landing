import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CheckCircle2, Clock, MapPin, CalendarDays, Phone, Mail } from "lucide-react";

import { Header } from "@/components/site/Header";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { FloatingButtons } from "@/components/site/FloatingButtons";
import { QuoteButton } from "@/components/site/QuoteButton";
import { WatermarkedImage } from "@/components/site/WatermarkedImage";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  findProjectDetail,
  relatedProjects,
  type ProjectDetail,
} from "@/data/project-pages";
import { findServicePage } from "@/data/service-pages";
import { HOTLINE, HOTLINE_TEL, EMAIL, ZALO_LINK, ADDRESS, type Project } from "@/data/site";
import { absUrl, breadcrumbLd, metaFor, SITE_NAME } from "@/lib/seo";

export const Route = createFileRoute("/du-an/$slug")({
  loader: ({ params }): { project: Project; detail: ProjectDetail } => {
    const found = findProjectDetail(params.slug);
    if (!found) throw notFound();
    return found;
  },
  head: ({ loaderData }) => {
    const project = loaderData?.project;
    const detail = loaderData?.detail;
    if (!project) {
      return { meta: [{ title: "Không tìm thấy dự án" }, { name: "robots", content: "noindex" }] };
    }
    const title = detail?.seoTitle ?? `${project.name} | Dự án Bốc Xếp Sài Gòn`;
    const description =
      detail?.seoDescription ??
      `${project.name} - ${project.category} tại ${project.location}, thời gian thực hiện ${project.duration}. Xem chi tiết phạm vi công việc và quy trình thực hiện.`;
    const base = metaFor({
      title,
      description,
      path: `/du-an/${project.slug}`,
      type: "article",
    });
    const faqs = detail?.faqs ?? [];
    return {
      ...base,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbLd([
              { name: "Trang chủ", path: "/" },
              { name: "Dự án", path: "/#du-an" },
              { name: project.name, path: `/du-an/${project.slug}` },
            ]),
          ),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: project.name,
            about: project.category,
            description,
            url: absUrl(`/du-an/${project.slug}`),
            locationCreated: { "@type": "Place", name: project.location },
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
        ...(faqs.length
          ? [
              {
                type: "application/ld+json",
                children: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  mainEntity: faqs.map((f) => ({
                    "@type": "Question",
                    name: f.q,
                    acceptedAnswer: { "@type": "Answer", text: f.a },
                  })),
                }),
              },
            ]
          : []),
      ],
    };
  },

  component: ProjectDetailPage,
  notFoundComponent: () => (
    <div className="p-16 text-center text-muted-foreground">Không tìm thấy dự án.</div>
  ),
});

function ProjectDetailPage() {
  const { project, detail } = Route.useLoaderData() as {
    project: Project;
    detail: ProjectDetail;
  };
  const service = detail.serviceSlug ? findServicePage(detail.serviceSlug) : undefined;
  const related = relatedProjects(project.slug, project.category);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pb-16 pt-44 lg:pt-32">
        <nav aria-label="Breadcrumb" className="mb-4 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">
            Trang chủ
          </Link>
          <span className="mx-1.5">/</span>
          <Link to="/" hash="du-an" className="hover:text-primary">
            Dự án
          </Link>
          <span className="mx-1.5">/</span>
          <span className="text-foreground">{project.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <article className="max-w-3xl">
            <WatermarkedImage
              wrapperClassName="rounded-2xl border border-border"
              src={project.image}
              alt={`Hình ảnh minh hoạ công việc ${project.category} tại ${project.location}`}
              width={1200}
              height={630}
              className="aspect-[16/9] w-full object-cover"
            />

            <h1 className="mt-6 font-display text-3xl font-bold uppercase tracking-tight md:text-4xl">
              {project.name}
            </h1>

            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <CalendarDays className="size-4 text-primary" /> {project.year}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="size-4 text-primary" /> {project.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="size-4 text-primary" /> {project.duration}
              </span>
            </div>

            <section className="mt-6">
              <h2 className="font-display text-2xl font-bold uppercase">Giới thiệu dự án</h2>
              <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
                {project.description}
              </p>
              {detail.overview?.map((p) => (
                <p key={p} className="mt-4 leading-relaxed text-muted-foreground">
                  {p}
                </p>
              ))}
            </section>


            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <a href={`tel:${HOTLINE_TEL}`}>
                  <Phone className="mr-2 size-4" /> Gọi {HOTLINE}
                </a>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <a href={ZALO_LINK} target="_blank" rel="noreferrer">
                  Chat Zalo
                </a>
              </Button>
              <QuoteButton className="inline-flex items-center rounded-md border border-primary px-6 text-sm font-bold uppercase tracking-wide text-primary hover:bg-primary/10" />
              <Button asChild size="lg" variant="ghost">
                <Link to="/" hash="du-an">
                  ← Danh sách dự án
                </Link>
              </Button>
            </div>


            <Section title="Bối cảnh và nhu cầu của khách hàng">
              {detail.context ? (
                <p className="text-muted-foreground">{detail.context}</p>
              ) : service ? (
                <p className="text-muted-foreground">{service.intro}</p>
              ) : (
                <Pending />
              )}
            </Section>


            <Section title="Loại hàng hóa">
              {detail.cargo ? <p className="text-muted-foreground">{detail.cargo}</p> : <Pending />}
            </Section>

            <Section title="Quy mô công việc">
              {detail.scale?.length ? <Bullets items={detail.scale} /> : <Pending />}
            </Section>

            <Section title="Phạm vi công việc">
              {detail.scope?.length ? <Bullets items={detail.scope} /> : <Pending />}
            </Section>

            {detail.deliverables?.length ? (
              <Section title="Các hạng mục đã thực hiện">
                <div className="grid gap-4 sm:grid-cols-2">
                  {detail.deliverables.map((d) => (
                    <div key={d.title} className="rounded-xl border border-border bg-card p-4">
                      <h3 className="font-display text-base font-bold">{d.title}</h3>
                      <p className="mt-1.5 text-sm text-muted-foreground">{d.detail}</p>
                    </div>
                  ))}
                </div>
              </Section>
            ) : null}


            <Section title="Quy trình thực hiện">
              {detail.process?.length ? (
                <ol className="space-y-4">
                  {detail.process.map((p, i) => (
                    <li key={p.step} className="flex gap-4">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary font-display font-bold text-primary-foreground">
                        {i + 1}
                      </span>
                      <div>
                        <h3 className="font-semibold">{p.step}</h3>
                        <p className="text-sm text-muted-foreground">{p.detail}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              ) : (
                <Pending />
              )}
            </Section>

            {detail.execution?.length ? (
              <Section title="Cách chúng tôi triển khai tại hiện trường">
                <div className="space-y-4">
                  {detail.execution.map((p) => (
                    <p key={p} className="leading-relaxed text-muted-foreground">
                      {p}
                    </p>
                  ))}
                </div>
              </Section>
            ) : null}



            <Section title="Nhân sự tham gia">
              {detail.personnel ? (
                <p className="text-muted-foreground">{detail.personnel}</p>
              ) : (
                <Pending />
              )}
            </Section>

            <Section title="Thiết bị và phương tiện sử dụng">
              {detail.equipment?.length ? <Bullets items={detail.equipment} /> : <Pending />}
            </Section>

            <Section title="Kết quả hoàn thành">
              {detail.results?.length ? <Bullets items={detail.results} /> : <Pending />}
            </Section>

            <Section title="Điểm nổi bật của dự án">
              {detail.highlights?.length ? <Bullets items={detail.highlights} /> : <Pending />}
            </Section>

            {detail.notes?.length ? (
              <Section title="Lưu ý rút ra từ dự án">
                <div className="rounded-xl border border-border bg-muted/40 p-5">
                  <ul className="space-y-3">
                    {detail.notes.map((n) => (
                      <li key={n} className="flex gap-2 text-sm text-muted-foreground">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                        <span>{n}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Section>
            ) : null}


            <Section title="Dịch vụ chúng tôi đã thực hiện">
              <div className="rounded-xl border border-border bg-card p-5">
                {service ? (
                  <>
                    <p className="text-xs font-bold uppercase tracking-widest text-primary">
                      Dịch vụ chính
                    </p>
                    <h3 className="mt-1 font-display text-xl font-bold">{service.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{service.seoDescription}</p>
                    <Link
                      to="/dich-vu/$slug"
                      params={{ slug: service.slug }}
                      className="mt-3 inline-block text-sm font-bold uppercase tracking-wider text-primary hover:underline"
                    >
                      Xem chi tiết dịch vụ →
                    </Link>
                  </>
                ) : (
                  <Pending />
                )}
                {detail.scope?.length ? (
                  <div className="mt-5 border-t border-border pt-4">
                    <p className="text-sm font-semibold">Các hạng mục đã đảm nhận</p>
                    <div className="mt-3">
                      <Bullets items={detail.scope} />
                    </div>
                  </div>
                ) : null}
              </div>
            </Section>


            <Section title="Hình ảnh thực tế">
              <WatermarkedImage
                wrapperClassName="rounded-xl border border-border"
                src={project.image}
                alt={`Hình ảnh minh hoạ quá trình thi công hạng mục ${project.category}`}
                loading="lazy"
                width={1200}
                height={800}
                className="aspect-[3/2] w-full object-cover"
              />
              <p className="mt-2 text-xs text-muted-foreground">
                Thư viện hình ảnh thực tế của dự án đang được cập nhật thêm.
              </p>
            </Section>

            {(detail.faqs?.length ? detail.faqs : service?.faqs?.slice(0, 4) ?? []).length ? (
              <Section title="Câu hỏi thường gặp về dự án này">
                <Accordion type="single" collapsible>
                  {(detail.faqs?.length ? detail.faqs : service!.faqs.slice(0, 4)).map((f) => (
                    <AccordionItem key={f.q} value={f.q}>
                      <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </Section>
            ) : null}


            {service && (
              <p className="mt-8 text-muted-foreground">
                Xem thêm dịch vụ liên quan:{" "}
                <Link
                  to="/dich-vu/$slug"
                  params={{ slug: service.slug }}
                  className="font-semibold text-primary hover:underline"
                >
                  {service.name}
                </Link>
              </p>
            )}

            <Section title="Dự án liên quan">
              <div className="grid gap-4 sm:grid-cols-3">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    to="/du-an/$slug"
                    params={{ slug: r.slug }}
                    className="card-lift group block overflow-hidden rounded-xl border border-border bg-card"
                  >
                    <WatermarkedImage
                      src={r.image}
                      alt={`Hình ảnh minh hoạ hạng mục ${r.category}`}
                      loading="lazy"
                      width={600}
                      height={400}
                      className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="p-4">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-primary">
                        {r.category}
                      </p>
                      <h3 className="mt-1 font-display text-base font-bold leading-snug">{r.name}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </Section>
          </article>

          <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
            <Card>
              <CardContent className="p-5">
                <h2 className="font-display text-xl font-bold uppercase">Cần báo giá tương tự?</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Gọi hotline hoặc để lại thông tin, bộ phận điều phối sẽ khảo sát và báo giá.
                </p>
                <div className="mt-4 grid gap-2">
                  <Button asChild>
                    <a href={`tel:${HOTLINE_TEL}`}>
                      <Phone className="mr-2 size-4" /> Gọi ngay
                    </a>
                  </Button>
                  <Button asChild variant="secondary">
                    <a href={ZALO_LINK} target="_blank" rel="noreferrer">
                      Chat Zalo
                    </a>
                  </Button>
                  <QuoteButton className="inline-flex h-9 items-center justify-center rounded-md border border-primary px-4 text-sm font-bold uppercase text-primary hover:bg-primary/10" />
                  <Button asChild variant="outline">
                    <a href={`mailto:${EMAIL}?subject=${encodeURIComponent("Yêu cầu báo giá bốc xếp")}`}>
                      <Mail className="mr-2 size-4" /> Gửi email
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
      <Contact />
      <Footer />
      <FloatingButtons />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="font-display text-2xl font-bold uppercase">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((i) => (
        <li key={i} className="flex gap-2 text-muted-foreground">
          <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
          <span>{i}</span>
        </li>
      ))}
    </ul>
  );
}

function Pending() {
  return <p className="text-sm text-muted-foreground">Thông tin đang được cập nhật.</p>;
}
