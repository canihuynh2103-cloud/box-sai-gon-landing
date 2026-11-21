import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { postsListQuery } from "@/lib/blog-queries";

export function LatestPosts() {
  const { data = [] } = useQuery(postsListQuery());
  const posts = [...data]
    .sort((a, b) => (b.published_at ?? "").localeCompare(a.published_at ?? ""))
    .slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section id="bai-viet" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <span className="section-eyebrow">Kiến thức</span>
        <h2 className="mt-4 font-display text-4xl font-bold uppercase leading-tight sm:text-5xl">
          Bài viết mới
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {posts.map((p) => (
            <Link
              key={p.slug}
              to="/blog/$slug"
              params={{ slug: p.slug }}
              className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary"
            >
              {p.category && (
                <span className="text-xs font-bold uppercase tracking-wider text-primary">{p.category}</span>
              )}
              <h3 className="mt-2 font-semibold leading-snug text-foreground group-hover:text-primary">
                {p.title}
              </h3>
              {p.excerpt && <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{p.excerpt}</p>}
            </Link>
          ))}
        </div>
        <Link to="/blog" className="mt-8 inline-block font-medium text-primary underline-offset-4 hover:underline">
          Xem tất cả bài viết về bốc xếp
        </Link>
      </div>
    </section>
  );
}
