import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Phone, Search } from "lucide-react";
import { HOTLINE, HOTLINE_TEL, NAV_ITEMS } from "@/data/site";
import logoAsset from "@/assets/logo.png.asset.json";
import { NavLink } from "@/components/site/NavLink";
import { QuoteButton } from "@/components/site/QuoteButton";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Đo chiều cao header thật để các section bên dưới không bị che / dư khoảng trắng
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const apply = () =>
      document.documentElement.style.setProperty("--header-h", `${el.offsetHeight}px`);
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    window.addEventListener("resize", apply);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", apply);
    };
  }, []);

  return (
    <header
      ref={ref}
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/95 text-foreground backdrop-blur transition-shadow duration-300",
        scrolled && "shadow-[0_6px_20px_-16px_oklch(0.1_0.005_20/0.6)]",
      )}
    >
      <div className="mx-auto grid min-h-16 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-2 px-3 py-2 sm:min-h-20 sm:gap-4 sm:px-6 lg:flex lg:gap-6 lg:px-8">
        <Link
          to="/"
          aria-label="Bốc Xếp Sài Gòn - Trang chủ"
          className="flex min-w-0 items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:gap-3.5 lg:shrink-0"
        >
          <span className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white sm:size-16">
            <img
              src={logoAsset.url}
              alt="Logo Sai Gon Cargo Handling - Bốc Xếp Sài Gòn"
              width={160}
              height={160}
              className="size-full object-contain"
            />
          </span>
          <span className="flex min-w-0 flex-col justify-center py-0.5">
            <span className="block truncate font-display text-lg font-bold leading-[1.35] tracking-wide text-secondary sm:text-2xl">
              Bốc Xếp Sài Gòn
            </span>
            <span className="block pt-0.5 text-[8px] font-semibold uppercase leading-[1.7] tracking-[0.02em] text-muted-foreground sm:text-[10px] sm:tracking-[0.12em]">
              <span className="sm:hidden">Chuyên Nghiệp - Tin Cậy</span>
              <span className="hidden sm:inline">Chuyên Nghiệp - Minh Bạch - Tin Cậy</span>
            </span>
          </span>
        </Link>

        <nav aria-label="Điều hướng chính" className="ml-auto hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              className="whitespace-nowrap rounded-md px-2.5 py-2 text-[13px] font-semibold text-foreground/75 transition-colors hover:bg-accent hover:text-accent-foreground xl:px-3 xl:text-sm"
              activeClassName="bg-accent text-accent-foreground"
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3 lg:ml-0">
          <a
            href={`tel:${HOTLINE_TEL}`}
            className="hidden items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary xl:flex"
          >
            <span className="flex size-9 items-center justify-center rounded-full bg-accent text-primary">
              <Phone className="size-4" />
            </span>
            <span className="leading-tight">
              <span className="block text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                Hotline 24/7
              </span>
              <span className="block font-display text-base font-bold leading-[1.4] text-primary">
                {HOTLINE}
              </span>
            </span>
          </a>
          <QuoteButton className="gradient-primary inline-flex shrink-0 animate-wiggle whitespace-nowrap rounded-md px-2.5 py-2 text-[10px] font-bold uppercase leading-none tracking-tight text-primary-foreground shadow-[var(--shadow-glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 motion-reduce:animate-none sm:px-5 sm:py-2.5 sm:text-sm sm:tracking-wide" />
        </div>
      </div>

      {/* Mobile: thanh danh mục gọn + tìm kiếm dịch vụ */}
      <div className="border-t border-border/60 lg:hidden">
        <nav
          aria-label="Điều hướng nhanh"
          className="flex gap-1.5 overflow-x-auto px-3 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              className="shrink-0 whitespace-nowrap rounded-full border border-border bg-muted px-3 py-1.5 text-xs font-semibold text-foreground/80 transition-colors hover:bg-accent hover:text-accent-foreground"
              activeClassName="border-primary bg-accent text-accent-foreground"
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            window.dispatchEvent(new CustomEvent("service-search", { detail: query }));
            document.getElementById("dich-vu")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="relative px-3 pb-2.5"
        >
          <Search className="pointer-events-none absolute left-6 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              window.dispatchEvent(new CustomEvent("service-search", { detail: e.target.value }));
            }}
            placeholder="Tìm dịch vụ: kho, container, chuyển nhà..."
            aria-label="Tìm dịch vụ"
            className="w-full rounded-full border border-border bg-muted py-2 pl-9 pr-4 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
          />
        </form>
      </div>
    </header>
  );
}
