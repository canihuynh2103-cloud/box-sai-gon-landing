import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, Search } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingButtons } from "@/components/site/FloatingButtons";
import { usePosts } from "@/hooks/use-content";
import { WatermarkedImage } from "@/components/site/WatermarkedImage";
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

function normalize(v: string) {
  return v
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d");
}

function BlogIndex() {
  const { data = [], isLoading } = usePosts();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("Tất cả");

  const categories = useMemo(
    () => ["Tất cả", ...Array.from(new Set(data.map((p) => p.category).filter(Boolean) as string[]))],
    [data],
  );

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    return data.filter((p) => {
      const matchCat = category === "Tất cả" || p.category === category;
      const matchQuery =
        !q ||
        normalize(`${p.title} ${p.excerpt ?? ""} ${p.category ?? ""}`).includes(q);
      return matchCat && matchQuery;
    });
  }, [data, query, category]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pb-16 pt-44 lg:pt-32">
        <nav aria-label="Breadcrumb" className="mb-4 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">
            Trang chủ
          </Link>
          <span className="mx-1.5">/</span>
          <span className="text-foreground">Bài viết</span>
        </nav>

        <h1 className="font-heading text-3xl font-bold uppercase tracking-tight md:text-4xl">
          Kiến Thức Bốc Xếp & Logistics
        </h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">{DESC}</p>

        <div className="mt-6 max-w-xl">
          <label htmlFor="blog-search" className="sr-only">
            Tìm bài viết
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              id="blog-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm bài viết: container, đóng gói, chuyển kho..."
              className="w-full rounded-full border border-input bg-background py-2.5 pl-10 pr-4 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/25"
            />
          </div>
        </div>

        {categories.length > 1 && (
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] sm:flex-wrap sm:overflow-visible [&::-webkit-scrollbar]:hidden">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                aria-pressed={category === c}
                className={`shrink-0 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  category === c
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        )}

        <p aria-live="polite" className="mt-4 text-sm text-muted-foreground">
          {isLoading ? "Đang tải bài viết..." : `${filtered.length} bài viết`}
        </p>

        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-56 w-full" />)
            : filtered.map((post) => (
                <Link
                  key={post.id}
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className="rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
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
        {!isLoading && filtered.length === 0 ? (
          <p className="mt-10 text-muted-foreground">
            Không tìm thấy bài viết phù hợp. Thử từ khóa khác nhé.
          </p>
        ) : null}
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}
