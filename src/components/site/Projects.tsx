import { useState } from "react";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import { PROJECTS, PROJECT_FILTERS, type Project } from "@/data/site";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export function Projects() {
  const [filter, setFilter] = useState("Tất Cả");
  const [active, setActive] = useState<Project | null>(null);

  const list =
    filter === "Tất Cả" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

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
          {PROJECT_FILTERS.map((f) => (
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
          {list.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setActive(p)}
              className="card-lift group overflow-hidden rounded-xl border border-border bg-card text-left"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  width={800}
                  height={600}
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-secondary/85 px-3 py-1 text-xs font-bold text-secondary-foreground backdrop-blur">
                  {p.year}
                </span>
              </div>
              <div className="p-3 sm:p-5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-primary sm:text-xs">
                  {p.category}
                </p>
                <h3 className="mt-2 font-display text-lg font-bold leading-snug">{p.name}</h3>
                <p className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="size-4 shrink-0" /> {p.location}
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Clock className="size-4 shrink-0" /> {p.duration}
                </p>
              </div>
            </button>
          ))}
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
