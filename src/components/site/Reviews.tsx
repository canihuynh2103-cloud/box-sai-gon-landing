import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { REVIEWS } from "@/data/site";
import { cn } from "@/lib/utils";

const PER_PAGE = 3;

export function Reviews() {
  const pages = Math.ceil(REVIEWS.length / PER_PAGE);
  const [page, setPage] = useState(0);

  const visible = REVIEWS.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <span className="section-eyebrow">Đánh giá</span>
            <h2 className="mt-4 font-display text-4xl font-bold uppercase leading-tight sm:text-5xl">
              Khách hàng nói gì
            </h2>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex gap-0.5 text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-5 fill-current" />
                ))}
              </div>
              <p className="text-sm font-semibold text-muted-foreground">
                <span className="font-display text-lg text-foreground">4.9/5</span> từ hơn 500
                đánh giá
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Trước"
              onClick={() => setPage((p) => (p - 1 + pages) % pages)}
              className="flex size-11 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Sau"
              onClick={() => setPage((p) => (p + 1) % pages)}
              className="flex size-11 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {visible.map((r) => (
            <figure
              key={r.name}
              className="card-lift flex flex-col rounded-xl border border-border bg-card p-6"
            >
              <Quote className="size-8 text-primary/30" />
              <div className="mt-4 flex gap-0.5 text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 leading-relaxed text-muted-foreground">
                “{r.content}”
              </blockquote>
              <figcaption className="mt-6 border-t border-border pt-4">
                <p className="font-display text-lg font-bold">{r.name}</p>
                <p className="text-sm text-muted-foreground">{r.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Trang ${i + 1}`}
              onClick={() => setPage(i)}
              className={cn(
                "h-2.5 rounded-full transition-all",
                i === page ? "w-8 bg-primary" : "w-2.5 bg-border hover:bg-primary/50",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
