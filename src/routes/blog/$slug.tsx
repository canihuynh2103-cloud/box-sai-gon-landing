/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowLeft, CalendarDays, Clock, User } from "lucide-react";

import { postDetailQuery, postsListQuery, type PostDetail } from "@/lib/blog-queries";
import { PROJECTS } from "@/data/site";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingButtons } from "@/components/site/FloatingButtons";
import { WatermarkedImage } from "@/components/site/WatermarkedImage";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { absUrl, breadcrumbLd, SITE_NAME } from "@/lib/seo";
import { ALL_TOPICS } from "@/data/content-plan";
import { SERVICE_PAGES } from "@/data/service-pages";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ context, params }) => {
    const [post] = await Promise.all([
      context.queryClient.ensureQueryData(postDetailQuery(params.slug)),
      context.queryClient.ensureQueryData(postsListQuery()),
    ]);
    return { post };
  },
  head: ({ params, loaderData }) => {
    const post = loaderData?.post;
    const url = absUrl(`/blog/${params.slug}`);
    const title = post
      ? post.seo_title || `${post.title} — Bốc Xếp Sài Gòn`
      : `${params.slug.replace(/-/g, " ")} — Bốc Xếp Sài Gòn`;
    const desc =
      post?.seo_description ||
      post?.excerpt ||
      "Bài viết kiến thức bốc xếp và logistics từ Bốc Xếp Sài Gòn.";
    const image = post?.og_image || post?.cover_image || "";
    const meta: Array<Record<string, string>> = [
      { title },
      { name: "description", content: desc },
      { property: "og:title", content: post?.og_title || title },
      { property: "og:description", content: post?.og_description || desc },
      { property: "og:type", content: "article" },
      { property: "og:url", content: url },
      { name: "twitter:card", content: "summary_large_image" },
    ];
    if (image.startsWith("https://")) {
      meta.push({ property: "og:image", content: image }, { name: "twitter:image", content: image });
    }
    return {
      meta,
      links: [{ rel: "canonical", href: url }],
      scripts: post ? [{ type: "application/ld+json", children: buildJsonLd(post, params.slug) }] : [],
    };
  },
  component: PostPage,
  errorComponent: () => (
    <div className="p-10 text-center text-muted-foreground">Không tải được bài viết.</div>
  ),
  notFoundComponent: () => <div className="p-10 text-center">Không tìm thấy bài viết.</div>,
});

type Post = PostDetail;

function buildJsonLd(data: Post, slug: string) {
  const url = absUrl(`/blog/${slug}`);
  const image = data.og_image || data.cover_image || undefined;
  return JSON.stringify([
    breadcrumbLd([
      { name: "Trang chủ", path: "/" },
      { name: "Kiến thức", path: "/blog" },
      { name: data.title, path: `/blog/${slug}` },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: data.seo_title || data.title,
      description: data.seo_description || data.excerpt || undefined,
      inLanguage: "vi-VN",
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      url,
      ...(image?.startsWith("http") ? { image: [image] } : {}),
      datePublished: data.published_at || undefined,
      dateModified: data.updated_at || data.published_at || undefined,
      articleSection: data.category || undefined,
      keywords: data.tags?.join(", ") || undefined,
      author: data.author
        ? { "@type": "Person", name: data.author }
        : { "@type": "Organization", name: SITE_NAME, url: absUrl("/") },
      publisher: { "@type": "Organization", name: SITE_NAME, url: absUrl("/") },
    },
  ]);
}

/** Adds ids to h2/h3 (string-based so SSR and client output match). */
function withHeadingIds(html: string) {
  let i = 0;
  return html.replace(/<(h[23])(\s[^>]*)?>/gi, (m, tag: string, attrs: string = "") => {
    i += 1;
    if (/\sid=/i.test(attrs)) return m;
    return `<${tag} id="muc-${i}"${attrs}>`;
  });
}

function PostPage() {
  const { slug } = Route.useParams();

  const { data } = useSuspenseQuery(postDetailQuery(slug));
  const isLoading = false;
  const content = useMemo(() => withHeadingIds(data?.content ?? ""), [data?.content]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto max-w-3xl px-4 pb-16 pt-44 lg:pt-32">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">
            Trang chủ
          </Link>
          <span className="mx-1.5">/</span>
          <Link to="/blog" className="hover:text-primary">
            Bài viết
          </Link>
          <span className="mx-1.5">/</span>
          <span className="text-foreground">{data?.title ?? slug.replace(/-/g, " ")}</span>
        </nav>
        <Link
          to="/blog"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" /> Tất cả bài viết
        </Link>


        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-56 w-full" />
          </div>
        ) : !data ? (
          <p className="text-muted-foreground">Bài viết không tồn tại hoặc chưa được xuất bản.</p>
        ) : (
          <article>
            {data.category ? <Badge variant="secondary">{data.category}</Badge> : null}
            <h1 className="mt-3 font-heading text-3xl font-bold uppercase tracking-tight md:text-4xl">
              {data.title}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-muted-foreground">
              {data.author ? (
                <span className="inline-flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5" /> {data.author}
                </span>
              ) : null}
              {data.published_at ? (
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {new Date(data.published_at).toLocaleDateString("vi-VN")}
                </span>
              ) : null}
              {data.reading_time ? (
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" /> {data.reading_time} phút đọc
                </span>
              ) : null}
              {data.updated_at ? (
                <span>Cập nhật {new Date(data.updated_at).toLocaleDateString("vi-VN")}</span>
              ) : null}
            </div>

            {data.cover_image ? (
              <WatermarkedImage
                wrapperClassName="mt-5 rounded-lg"
                src={data.cover_image}
                alt={data.cover_image_alt || data.title}
                className="w-full object-cover"
              />
            ) : null}
            {data.excerpt ? (
              <p className="mt-5 text-lg text-muted-foreground">{data.excerpt}</p>
            ) : null}

            <div
              className="post-content mt-5 space-y-3 text-base leading-relaxed [&_a]:text-primary [&_a]:underline [&_blockquote]:border-l-2 [&_blockquote]:border-primary [&_blockquote]:pl-3 [&_h2]:mt-6 [&_h2]:font-heading [&_h2]:text-2xl [&_h2]:font-bold [&_h3]:mt-5 [&_h3]:text-xl [&_h3]:font-bold [&_img]:rounded-lg [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5"
              dangerouslySetInnerHTML={{ __html: content }}
            />

            {data.tags?.length ? (
              <div className="mt-8 flex flex-wrap gap-2 border-t pt-5">
                {data.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    #{tag}
                  </Badge>
                ))}
              </div>
            ) : null}
          </article>
        )}

        <PillarServiceLink slug={slug} />
        <RelatedPosts slug={slug} category={data?.category ?? null} />
      </main>
      <Footer />
      <FloatingButtons />

    </div>
  );
}

/**
 * Liên kết nội bộ về trang dịch vụ trụ cột tương ứng với chủ đề bài viết.
 * Dữ liệu lấy từ bản đồ chủ đề tĩnh (content-plan) nên được render ngay trong
 * HTML SSR — Googlebot đọc được link mà không cần chạy JS.
 */
function PillarServiceLink({ slug }: { slug: string }) {
  const topic = ALL_TOPICS.find((t) => t.slug === slug);
  if (!topic) return null;
  const pillar = SERVICE_PAGES.find((p) => p.slug === topic.pillar);
  if (!pillar) return null;
  const idx = ALL_TOPICS.indexOf(topic);
  const project = PROJECTS.length ? PROJECTS[idx % PROJECTS.length] : null;

  return (
    <nav aria-label="Dịch vụ liên quan" className="mt-12 rounded-xl border border-border bg-card p-5">
      <p className="text-sm text-muted-foreground">
        Bài viết thuộc chuyên mục{" "}
        <Link to="/dich-vu/$slug" params={{ slug: pillar.slug }} className="font-semibold text-primary hover:underline">
          {pillar.name}
        </Link>
        . Xem thêm{" "}
        <Link to="/dich-vu-boc-xep-tphcm" className="font-semibold text-primary hover:underline">
          dịch vụ bốc xếp tại TP.HCM
        </Link>{" "}
        hoặc{" "}
        <Link to="/dich-vu" className="font-semibold text-primary hover:underline">
          toàn bộ dịch vụ bốc xếp
        </Link>{" "}
        của Bốc Xếp Sài Gòn.
        {project ? (
          <>
            {" "}Tham khảo dự án thực tế:{" "}
            <Link to="/du-an/$slug" params={{ slug: project.slug }} className="font-semibold text-primary hover:underline">
              {project.name}
            </Link>
            , hoặc{" "}
            <Link to="/" hash="lien-he" className="font-semibold text-primary hover:underline">
              gửi yêu cầu báo giá
            </Link>
            .
          </>
        ) : null}
      </p>
    </nav>
  );
}

function RelatedPosts({ slug, category }: { slug: string; category: string | null }) {
  const { data } = useSuspenseQuery(postsListQuery());
  const related = data
    .filter((p) => p.slug !== slug)
    .sort((a, b) => {
      const sa = a.category && a.category === category ? 1 : 0;
      const sb = b.category && b.category === category ? 1 : 0;
      return sb - sa;
    })
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section aria-labelledby="bai-viet-lien-quan" className="mt-14 border-t pt-8">
      <h2 id="bai-viet-lien-quan" className="font-heading text-2xl font-bold uppercase">
        Bài viết liên quan
      </h2>
      <ul className="mt-5 grid gap-4 sm:grid-cols-3">
        {related.map((p) => (
          <li key={p.id}>
            <Link
              to="/blog/$slug"
              params={{ slug: p.slug }}
              className="block h-full rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <h3 className="font-heading text-base font-bold leading-snug">{p.title}</h3>
              <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{p.excerpt}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
