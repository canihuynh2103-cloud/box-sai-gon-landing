/* eslint-disable @typescript-eslint/no-explicit-any */
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";

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
    };
  },
  component: PostPage,
  errorComponent: () => (
    <div className="p-10 text-center text-muted-foreground">Không tải được bài viết.</div>
  ),
  notFoundComponent: () => <div className="p-10 text-center">Không tìm thấy bài viết.</div>,
});

function PostPage() {
  const { slug } = Route.useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["content", "post", slug],
    queryFn: async () => {
      const { data } = await (supabase as any)
        .from("posts")
        .select("title,excerpt,content,cover_image,category,published_at")
        .eq("slug", slug)
        .maybeSingle();
      return data as {
        title: string;
        excerpt: string | null;
        content: string | null;
        cover_image: string | null;
        category: string | null;
        published_at: string | null;
      } | null;
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
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
            {data.published_at ? (
              <p className="mt-2 text-sm text-muted-foreground">
                {new Date(data.published_at).toLocaleDateString("vi-VN")}
              </p>
            ) : null}
            {data.cover_image ? (
              <img
                src={data.cover_image}
                alt={data.title}
                className="mt-5 w-full rounded-lg object-cover"
              />
            ) : null}
            {data.excerpt ? (
              <p className="mt-5 text-lg text-muted-foreground">{data.excerpt}</p>
            ) : null}
            <div
              className="mt-5 space-y-3 text-base leading-relaxed [&_a]:text-primary [&_a]:underline [&_blockquote]:border-l-2 [&_blockquote]:border-primary [&_blockquote]:pl-3 [&_h2]:mt-6 [&_h2]:font-heading [&_h2]:text-2xl [&_h2]:font-bold [&_h3]:mt-5 [&_h3]:text-xl [&_h3]:font-bold [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5"
              dangerouslySetInnerHTML={{ __html: data.content ?? "" }}
            />
          </article>
        )}
      </main>
      <Footer />
    </div>
  );
}
