import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import { PROJECTS, type Project } from "@/data/site";
import { useProjects } from "@/hooks/use-content";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { slugify } from "@/lib/seo";
import { cn } from "@/lib/utils";

const IMAGE_BY_CATEGORY: Record<string, string> = Object.fromEntries(
  PROJECTS.map((p) => [p.category, p.image]),
);

const DETAIL_SLUGS = new Set(PROJECTS.map((p) => p.slug));

/** Ghép dự án từ DB với trang case study tĩnh (theo tên, slug hoặc danh mục). */
function resolveDetailSlug(name: string, category: string) {
  const slug = slugify(name);
  if (DETAIL_SLUGS.has(slug)) return slug;
  const byName = PROJECTS.find((p) => p.name === name);
  if (byName) return byName.slug;
  const byCategory = PROJECTS.filter((p) => p.category === category);
  if (byCategory.length === 1) return byCategory[0].slug;
  return slug;
}

export function Projects() {
  const [filter, setFilter] = useState("Tất Cả");
  const [active, setActive] = useState<Project | null>(null);
  const { data: dbProjects = [] } = useProjects();

  const projects: Project[] = useMemo(() => {
    if (dbProjects.length === 0) return PROJECTS;
    return dbProjects.map((p, index) => ({
      id: index + 1,
      slug: resolveDetailSlug(p.name, p.category),
      name: p.name,
      category: p.category,
      year: p.year ?? "",
      location: p.location ?? "",
      duration: p.duration ?? "",
      image: p.image || IMAGE_BY_CATEGORY[p.category] || PROJECTS[0].image,
      description: p.description ?? "",
    }));
  }, [dbProjects]);


  const filters = useMemo(
    () => ["Tất Cả", ...Array.from(new Set(projects.map((p) => p.category)))],
    [projects],
  );

  const list = filter === "Tất Cả" ? projects : projects.filter((p) => p.category === filter);


  return (
    <section id="du-an" className="bg-muted/40 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="section-eyebrow">Dự án</span>
          <h2 className="mt-4 font-display text-4xl font-bold uppercase leading-tight sm:text-5xl">
            Dự án tiêu biểu
          </h2>
          <p className="mt-4 text-muted-foreground">
            Một vài công trình chúng tôi đã thực hiện cho các doanh nghiệp sản xuất, phân
            phối và logistics.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                filter === f
                  ? "border-transparent bg-primary text-primary-foreground shadow-[var(--shadow-glow)]"
                  : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-primary",
              )}
            >
              {f}
            </button>
          ))}
        </div>


        <div className="mt-10 grid grid-cols-3 gap-2.5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((p) => {
            const hasDetail = DETAIL_SLUGS.has(p.slug);
            const inner = (
              <>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={p.image}
                    alt={`Hình ảnh minh hoạ hạng mục ${p.category} - ${p.name}`}
                    loading="lazy"
                    width={800}
                    height={600}
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-2 top-2 rounded-full bg-secondary/85 px-2 py-0.5 text-[10px] sm:left-4 sm:top-4 sm:px-3 sm:py-1 sm:text-xs font-bold text-secondary-foreground backdrop-blur">
                    {p.year}
                  </span>
                </div>
                <div className="p-3 sm:p-5">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-primary sm:text-xs">
                    {p.category}
                  </p>
                  <h3 className="mt-1.5 font-display text-sm font-bold leading-snug sm:mt-2 sm:text-lg">{p.name}</h3>
                  <p className="mt-2 flex items-center gap-1.5 text-[11px] text-muted-foreground sm:mt-3 sm:text-sm">
                    <MapPin className="size-3 shrink-0 sm:size-4" /> {p.location}
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 text-[11px] text-muted-foreground sm:text-sm">
                    <Clock className="size-3 shrink-0 sm:size-4" /> {p.duration}
                  </p>
                  {hasDetail && (
                    <span className="mt-2 inline-block text-[11px] font-bold uppercase tracking-wider text-primary sm:text-xs">
                      Xem chi tiết →
                    </span>
                  )}
                </div>
              </>
            );

            const cls = "card-lift group block overflow-hidden rounded-xl border border-border bg-card text-left";

            return hasDetail ? (
              <Link key={p.id} to="/du-an/$slug" params={{ slug: p.slug }} className={cls}>
                {inner}
              </Link>
            ) : (
              <button key={p.id} type="button" onClick={() => setActive(p)} className={cls}>
                {inner}
              </button>
            );
          })}
        </div>

      </div>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-2xl overflow-hidden p-0">
          {active && (
            <>
              <img
                src={active.image}
                alt={active.name}
                width={800}
                height={600}
                className="aspect-[16/9] w-full object-cover"
              />
              <div className="p-6">
                <DialogHeader>
                  <p className="text-xs font-bold uppercase tracking-widest text-primary">
                    {active.category}
                  </p>
                  <DialogTitle className="font-display text-2xl font-bold">
                    {active.name}
                  </DialogTitle>
                  <DialogDescription className="sr-only">
                    Chi tiết dự án {active.name}
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <p className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarDays className="size-4 text-primary" /> {active.year}
                  </p>
                  <p className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="size-4 text-primary" /> {active.location}
                  </p>
                  <p className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="size-4 text-primary" /> {active.duration}
                  </p>
                </div>
                <p className="mt-5 leading-relaxed text-muted-foreground">
                  {active.description}
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
