import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { HOTLINE, HOTLINE_TEL, NAV_ITEMS } from "@/data/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/95 shadow-[var(--shadow-card)] backdrop-blur"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex shrink-0 items-center gap-3">
          <span className="gradient-primary flex size-11 items-center justify-center rounded-lg font-display text-xl font-bold text-primary-foreground shadow-[var(--shadow-glow)]">
            BX
          </span>
          <span className="leading-tight">
            <span
              className={cn(
                "block font-display text-lg font-bold tracking-wide transition-colors",
                scrolled ? "text-foreground" : "text-secondary-foreground",
              )}
            >
              Bốc Xếp Sài Gòn
            </span>
            <span
              className={cn(
                "block text-[10px] font-semibold uppercase tracking-[0.16em] transition-colors",
                scrolled ? "text-muted-foreground" : "text-secondary-foreground/75",
              )}
            >
              Chuyên Nghiệp - Minh Bạch - Tin Cậy
            </span>
          </span>
        </a>

        <nav className="ml-auto hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-semibold transition-colors",
                scrolled
                  ? "text-foreground/80 hover:bg-accent hover:text-accent-foreground"
                  : "text-secondary-foreground/90 hover:bg-white/10 hover:text-secondary-foreground",
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3 lg:ml-0">
          <a
            href={`tel:${HOTLINE_TEL}`}
            className="hidden items-center gap-2 xl:flex"
          >
            <span className="flex size-9 items-center justify-center rounded-full bg-primary/15 text-primary">
              <Phone className="size-4" />
            </span>
            <span className="leading-tight">
              <span
                className={cn(
                  "block text-[10px] font-semibold uppercase tracking-widest",
                  scrolled ? "text-muted-foreground" : "text-secondary-foreground/70",
                )}
              >
                Hotline 24/7
              </span>
              <span
                className={cn(
                  "block font-display text-base font-bold",
                  scrolled ? "text-foreground" : "text-secondary-foreground",
                )}
              >
                {HOTLINE}
              </span>
            </span>
          </a>
          <a
            href="#lien-he"
            className="gradient-primary hidden rounded-md px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.03] sm:inline-flex"
          >
            Nhận Báo Giá
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Mở menu"
            className={cn(
              "flex size-10 items-center justify-center rounded-md border lg:hidden",
              scrolled
                ? "border-border text-foreground"
                : "border-white/25 text-secondary-foreground",
            )}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background px-4 pb-4 lg:hidden">
          <nav className="grid gap-1 py-2">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-semibold text-foreground hover:bg-accent hover:text-accent-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href={`tel:${HOTLINE_TEL}`}
            className="gradient-primary flex items-center justify-center gap-2 rounded-md px-4 py-3 text-sm font-bold text-primary-foreground"
          >
            <Phone className="size-4" /> {HOTLINE}
          </a>
        </div>
      )}
    </header>
  );
}
