import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { usePosts } from "@/hooks/use-content";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

const TITLE = "Kiến Thức Bốc Xếp & Logistics — Bốc Xếp Sài Gòn";
const DESC =
  "Bài viết kinh nghiệm bốc xếp, đóng gói, chuyển kho và quản lý nhân công tại TP.HCM từ đội ngũ Bốc Xếp Sài Gòn.";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const { data = [], isLoading } = usePosts();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pb-16 pt-28 md:pt-36">
        <Link to="/" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
          <ArrowLeft className="h-4 w-4" /> Về trang chủ
        </Link>
        <h1 className="font-heading text-3xl font-bold uppercase tracking-tight md:text-4xl">
          Kiến Thức Bốc Xếp & Logistics
        </h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">{DESC}</p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-56 w-full" />)
            : data.map((post) => (
                <Link key={post.id} to="/blog/$slug" params={{ slug: post.slug }}>
                  <Card className="h-full overflow-hidden transition-shadow hover:shadow-lg">
                    {post.cover_image ? (
                      <img
                        src={post.cover_image}
                        alt={post.title}
                        loading="lazy"
                        className="h-40 w-full object-cover"
                      />
                    ) : null}
                    <CardContent className="space-y-2 p-4">
                      {post.category ? <Badge variant="secondary">{post.category}</Badge> : null}
                      <h2 className="font-heading text-lg font-bold leading-snug">{post.title}</h2>
                      <p className="line-clamp-3 text-sm text-muted-foreground">{post.excerpt}</p>
                      {post.published_at ? (
                        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <CalendarDays className="h-3.5 w-3.5" />
                          {new Date(post.published_at).toLocaleDateString("vi-VN")}
                        </span>
                      ) : null}
                    </CardContent>
                  </Card>
                </Link>
              ))}
        </div>
        {!isLoading && data.length === 0 ? (
          <p className="mt-10 text-muted-foreground">Chưa có bài viết nào được xuất bản.</p>
        ) : null}
      </main>
      <Footer />
    </div>
  );
}
