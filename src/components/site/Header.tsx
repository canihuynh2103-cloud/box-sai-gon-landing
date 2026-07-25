import { useEffect, useState } from "react";
import { Menu, Phone, Search, X } from "lucide-react";
import { HOTLINE, HOTLINE_TEL, NAV_ITEMS } from "@/data/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-secondary text-secondary-foreground transition-shadow duration-300",
        scrolled && "shadow-[var(--shadow-card)]",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:h-20 sm:gap-4 sm:px-6 lg:gap-6 lg:px-8">
        <a href="#top" className="flex shrink-0 items-center gap-3">
          <span className="gradient-primary flex size-11 items-center justify-center rounded-lg font-display text-xl font-bold text-primary-foreground shadow-[var(--shadow-glow)]">
            BX
          </span>
          <span className="leading-tight">
            <span className="block font-display text-lg font-bold tracking-wide text-secondary-foreground">
              Bốc Xếp Sài Gòn
            </span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-secondary-foreground/70">
              Chuyên Nghiệp - Minh Bạch - Tin Cậy
            </span>
          </span>
        </a>

        <nav className="ml-auto hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-semibold text-secondary-foreground/85 transition-colors hover:bg-white/10 hover:text-secondary-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3 lg:ml-0">
          <a href={`tel:${HOTLINE_TEL}`} className="hidden items-center gap-2 xl:flex">
            <span className="flex size-9 items-center justify-center rounded-full bg-primary/20 text-primary-foreground">
              <Phone className="size-4" />
            </span>
            <span className="leading-tight">
              <span className="block text-[10px] font-semibold uppercase tracking-widest text-secondary-foreground/70">
                Hotline 24/7
              </span>
              <span className="block font-display text-base font-bold text-secondary-foreground">
                {HOTLINE}
              </span>
            </span>
          </a>
          <a
            href="#lien-he"
            className="gradient-primary hidden shrink-0 animate-wiggle sm:inline-flex whitespace-nowrap rounded-md px-3 py-2 text-[11px] font-bold uppercase text-primary-foreground shadow-[var(--shadow-glow)] sm:px-5 sm:py-2.5 sm:text-sm"
          >
            Nhận Báo Giá
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Mở menu"
            className="hidden size-10 items-center justify-center rounded-md border border-white/25 text-secondary-foreground"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile: thanh danh mục gọn + tìm kiếm dịch vụ */}
      <div className="border-t border-white/10 lg:hidden">
        <div className="flex gap-1.5 overflow-x-auto px-3 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-secondary-foreground/85"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#lien-he"
            className="gradient-primary shrink-0 animate-wiggle whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-bold uppercase text-primary-foreground sm:hidden"
          >
            Nhận Báo Giá
          </a>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            window.dispatchEvent(new CustomEvent("service-search", { detail: query }));
            document.getElementById("dich-vu")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="relative px-3 pb-2.5"
        >
          <Search className="pointer-events-none absolute left-6 top-1/2 size-4 -translate-y-1/2 text-secondary-foreground/50" />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              window.dispatchEvent(new CustomEvent("service-search", { detail: e.target.value }));
            }}
            placeholder="Tìm dịch vụ: kho, container, chuyển nhà..."
            aria-label="Tìm dịch vụ"
            className="w-full rounded-full border border-white/15 bg-white/5 py-2 pl-9 pr-4 text-sm text-secondary-foreground outline-none placeholder:text-secondary-foreground/45 focus:border-primary"
          />
        </form>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-secondary px-4 pb-4 lg:hidden">
          <nav className="grid gap-1 py-2">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-semibold text-secondary-foreground/90 hover:bg-white/10"
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
