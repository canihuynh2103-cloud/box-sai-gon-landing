/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, CalendarDays, Clock, User } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const title = `${params.slug.replace(/-/g, " ")} — Bốc Xếp Sài Gòn`;
    return {
      meta: [
        { title },
        { name: "description", content: "Bài viết kiến thức bốc xếp và logistics từ Bốc Xếp Sài Gòn." },
        { property: "og:title", content: title },
        {
          property: "og:description",
          content: "Bài viết kiến thức bốc xếp và logistics từ Bốc Xếp Sài Gòn.",
        },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/blog/${params.slug}` }],
    };
  },
  component: PostPage,
  errorComponent: () => (
    <div className="p-10 text-center text-muted-foreground">Không tải được bài viết.</div>
  ),
  notFoundComponent: () => <div className="p-10 text-center">Không tìm thấy bài viết.</div>,
});

type Post = {
  title: string;
  excerpt: string | null;
  content: string | null;
  cover_image: string | null;
  cover_image_alt: string | null;
  category: string | null;
  published_at: string | null;
  updated_at: string | null;
  author: string | null;
  tags: string[] | null;
  reading_time: number | null;
  seo_title: string | null;
  seo_description: string | null;
  canonical_url: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
};

/** Adds ids to headings so the table-of-contents block can link to them. */
function withHeadingIds(html: string) {
  if (typeof window === "undefined") return html;
  const doc = new DOMParser().parseFromString(html, "text/html");
  doc.querySelectorAll("h2,h3").forEach((h, i) => {
    if (!h.id) h.id = `muc-${i + 1}`;
  });
  return doc.body.innerHTML;
}

function PostPage() {
  const { slug } = Route.useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["content", "post", slug],
    queryFn: async () => {
      const { data } = await (supabase as any)
        .from("posts")
        .select(
          "title,excerpt,content,cover_image,cover_image_alt,category,published_at,updated_at,author,tags,reading_time,seo_title,seo_description,canonical_url,og_title,og_description,og_image",
        )
        .eq("slug", slug)
        .maybeSingle();
      return data as Post | null;
    },
  });

  const content = useMemo(() => withHeadingIds(data?.content ?? ""), [data?.content]);

  const jsonLd = useMemo(() => {
    if (!data) return null;
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
        "@type": "Article",
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
        author: {
          "@type": "Person",
          name: data.author || `Đội ngũ ${SITE_NAME}`,
          jobTitle: "Chuyên gia vận hành bốc xếp & logistics",
          worksFor: { "@type": "Organization", name: SITE_NAME, url: absUrl("/") },
        },
        publisher: {
          "@type": "Organization",
          name: SITE_NAME,
          url: absUrl("/"),
        },
      },
    ]);
  }, [data, slug]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {data ? (
        <>
          <title>{data.seo_title || `${data.title} — Bốc Xếp Sài Gòn`}</title>
          <meta name="description" content={data.seo_description || data.excerpt || ""} />
          <meta property="og:title" content={data.og_title || data.seo_title || data.title} />
          <meta
            property="og:description"
            content={data.og_description || data.seo_description || data.excerpt || ""}
          />
          {data.og_image || data.cover_image ? (
            <meta property="og:image" content={(data.og_image || data.cover_image) as string} />
          ) : null}
          <link rel="canonical" href={data.canonical_url || `/blog/${slug}`} />
        </>
      ) : null}

      <main className="container mx-auto max-w-3xl px-4 pb-16 pt-28 md:pt-36">
        <Link
          to="/blog"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground"
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
              <img
                src={data.cover_image}
                alt={data.cover_image_alt || data.title}
                className="mt-5 w-full rounded-lg object-cover"
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
      </main>
      <Footer />
    </div>
  );
}
