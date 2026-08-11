import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import * as Icons from "lucide-react";
import { ArrowRight, Search } from "lucide-react";
import { SERVICES, SERVICE_POSTS } from "@/data/site";
import { SERVICE_PAGES } from "@/data/service-pages";
import { usePostsByCategory, useServices } from "@/hooks/use-content";

const IMAGE_BY_TITLE: Record<string, string> = Object.fromEntries(
  SERVICES.map((s) => [s.title, s.image]),
);

const ALT_BY_TITLE: Record<string, string> = Object.fromEntries(
  SERVICES.filter((s) => s.alt).map((s) => [s.title, s.alt as string]),
);

const SLUG_BY_NAME: Record<string, string> = Object.fromEntries(
  SERVICE_PAGES.map((s) => [s.name.toLowerCase(), s.slug]),
);

export function Services() {
  const [q, setQ] = useState("");
  const { data: dbServices = [] } = useServices();
  const postsByCategory = usePostsByCategory();

  useEffect(() => {
    const onSearch = (e: Event) => setQ((e as CustomEvent<string>).detail ?? "");
    window.addEventListener("service-search", onSearch);
    return () => window.removeEventListener("service-search", onSearch);
  }, []);

  const items = useMemo(() => {
    if (dbServices.length === 0) {
      return SERVICES.map((s) => ({
        title: s.title,
        desc: s.desc,
        icon: s.icon,
        image: s.image,
        alt: s.alt,
      }));
    }
    return dbServices.map((s) => ({
      title: s.title,
      desc: s.description ?? "",
      icon: s.icon ?? "Box",
      image: s.image || IMAGE_BY_TITLE[s.title] || SERVICES[0].image,
      alt: ALT_BY_TITLE[s.title] as string | undefined,
    }));
  }, [dbServices]);

  const filtered = useMemo(() => {
    const kw = q.trim().toLowerCase();
    if (!kw) return items;
    return items.filter(
      (s) => s.title.toLowerCase().includes(kw) || s.desc.toLowerCase().includes(kw),
    );
  }, [q, items]);


  return (
    <section id="dich-vu" className="bg-muted/40 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="section-eyebrow">Dịch vụ</span>
            <h2 className="mt-4 font-display text-4xl font-bold uppercase leading-tight sm:text-5xl">
              14 dịch vụ bốc xếp trọn gói
            </h2>
            <p className="mt-4 text-muted-foreground">
              Từ kho bãi, container, nhà máy đến chuyển nhà và chuyển văn phòng — mọi nhu cầu
              nhân công bốc xếp đều có phương án phù hợp.
            </p>
          </div>

          <label className="relative block w-full lg:max-w-sm">
            <span className="sr-only">Tìm dịch vụ</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Tìm dịch vụ: kho, container, chuyển nhà..."
              className="w-full rounded-lg border border-border bg-card py-3 pl-10 pr-4 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/30"
            />
          </label>
        </div>

        {filtered.length === 0 ? (
          <p className="mt-12 rounded-xl border border-dashed border-border bg-card p-10 text-center text-muted-foreground">
            Không tìm thấy dịch vụ khớp với "{q}". Hãy liên hệ để được tư vấn riêng.
          </p>
        ) : (
          <div className="mt-12 grid grid-cols-3 gap-2.5 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((s) => {
              const Icon =
                (Icons as unknown as Record<string, Icons.LucideIcon>)[s.icon] ?? Icons.Box;
              const dbPosts = (postsByCategory[s.title] ?? []).map((p) => ({
                key: p.id,
                slug: p.slug,
                title: p.title,
                excerpt: p.excerpt ?? "",
              }));
              const posts =
                dbPosts.length > 0
                  ? dbPosts
                  : (SERVICE_POSTS[s.title] ?? []).map((p) => ({
                      key: p.title,
                      slug: null,
                      title: p.title,
                      excerpt: p.excerpt,
                    }));
              const slug = SLUG_BY_NAME[s.title.trim().toLowerCase()];
              return (
                <article
                  key={s.title}
                  className="card-lift group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card"
                >
                  <div className="relative">
                    <WatermarkedImage
                      wrapperClassName="aspect-[4/3] rounded-t-xl"
                      src={s.image}
                      alt={s.alt ?? `Dịch vụ ${s.title} tại TP.HCM`}
                      loading="lazy"
                      width={800}
                      height={600}
                      className="size-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />

                    <span className="gradient-primary absolute bottom-0 left-3 z-10 flex size-8 translate-y-1/2 items-center justify-center rounded-lg text-primary-foreground shadow-[var(--shadow-glow)] sm:left-5 sm:size-11">
                      <Icon className="size-4 sm:size-5" />
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-3 pt-7 sm:p-5 sm:pt-8">
                    <h3 className="font-display text-sm font-bold leading-snug sm:text-xl">
                      {slug ? (
                        <Link
                          to="/dich-vu/$slug"
                          params={{ slug }}
                          className="after:absolute after:inset-0 after:content-[''] hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        >
                          {s.title}
                        </Link>
                      ) : (
                        <a
                          href="#lien-he"
                          className="after:absolute after:inset-0 after:content-[''] hover:text-primary"
                        >
                          {s.title}
                        </a>
                      )}
                    </h3>
                    <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground sm:text-sm">
                      {s.desc}
                    </p>
                    {posts.length > 0 && (
                      <ul className="relative z-10 mt-3 hidden space-y-2 border-t border-border pt-3 sm:block">
                        {posts.map((post) => (
                          <li key={post.key}>
                            {post.slug ? (
                              <Link
                                to="/blog/$slug"
                                params={{ slug: post.slug }}
                                className="text-xs font-bold leading-snug text-foreground hover:text-primary"
                              >
                                {post.title}
                              </Link>
                            ) : (
                              <p className="text-xs font-bold leading-snug text-foreground">
                                {post.title}
                              </p>
                            )}
                            <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                              {post.excerpt}
                            </p>
                          </li>
                        ))}
                      </ul>
                    )}

                    <span className="mt-3 inline-flex items-center gap-1.5 pt-1 text-[11px] font-bold text-primary sm:mt-4 sm:text-sm">
                      {slug ? "Xem chi tiết" : "Báo giá ngay"}
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </span>

                  </div>
                </article>
              );
            })}
          </div>
        )}

        <div className="mt-12 flex flex-col items-center gap-4 rounded-xl border border-dashed border-primary/40 bg-accent/60 px-6 py-8 text-center">
          <p className="max-w-xl text-sm text-accent-foreground">
            Bạn cần một dịch vụ đặc thù không có trong danh sách? Chúng tôi vẫn nhận khảo sát
            và xây dựng phương án riêng.
          </p>
          <a
            href="#lien-he"
            className="gradient-primary rounded-md px-6 py-3 font-display text-base font-bold uppercase tracking-wide text-primary-foreground shadow-[var(--shadow-glow)]"
          >
            Liên Hệ Tư Vấn Riêng
          </a>
        </div>
      </div>
    </section>
  );
}
