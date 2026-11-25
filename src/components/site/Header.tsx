import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, Phone, X } from "lucide-react";
import { HOTLINE, HOTLINE_TEL, NAV_ITEMS } from "@/data/site";
import logoAsset from "@/assets/logo-header.png.asset.json";
import { NavLink } from "@/components/site/NavLink";
import { QuoteButton } from "@/components/site/QuoteButton";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    drawerRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/95 text-foreground backdrop-blur transition-shadow duration-300",
        scrolled && "shadow-[0_6px_20px_-16px_oklch(0.1_0.005_20/0.6)]",
      )}
    >
      <div className="relative z-10 mx-auto grid h-14 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-2 bg-background/95 px-3 sm:gap-4 sm:px-6 lg:h-20 lg:flex lg:gap-6 lg:px-8">
        <Link
          to="/"
          aria-label="Saigon Handling - Trang chủ"
          className="flex min-w-0 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary lg:shrink-0"
        >
          <img
            src={logoAsset.url}
            alt="Logo Saigon Handling"
            width={884}
            height={200}
            className="h-9 w-auto max-w-full object-contain sm:h-10 lg:h-9"
          />
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
            className="cta-ring hidden items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary xl:flex"
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
          <QuoteButton className="gradient-primary inline-flex shrink-0 whitespace-nowrap rounded-md px-2.5 py-2 text-[10px] font-bold uppercase leading-none tracking-tight text-primary-foreground shadow-[var(--shadow-glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 motion-reduce:animate-none sm:px-5 sm:py-2.5 sm:text-sm sm:tracking-wide" />
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Đóng menu điều hướng" : "Mở menu điều hướng"}
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-md text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary lg:hidden"
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile: hàng điều hướng gọn, chữ thường không pill */}
      <div className="relative z-10 border-t border-border/60 bg-background/95 lg:hidden">
        <nav
          aria-label="Điều hướng nhanh"
          className="flex h-10 items-center gap-5 overflow-x-auto px-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              className="shrink-0 whitespace-nowrap py-2 text-[13px] font-semibold text-foreground/70 transition-colors hover:text-primary"
              activeClassName="text-primary"
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Mobile: menu drawer từ nút hamburger */}
      {menuOpen && (
        <div className="lg:hidden">
          <button
            type="button"
            aria-label="Đóng menu điều hướng"
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 cursor-default bg-foreground/40"
          />
          <div
            ref={drawerRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu điều hướng"
            className="relative border-t border-border/60 bg-background shadow-[0_18px_36px_-24px_oklch(0.1_0.005_20/0.5)]"
          >
            <nav aria-label="Menu di động" className="flex flex-col px-3 py-2">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-md px-3 py-3 text-sm font-semibold text-foreground/80 transition-colors hover:bg-accent hover:text-accent-foreground"
                  activeClassName="bg-accent text-accent-foreground"
                >
                  {item.label}
                </NavLink>
              ))}
              <a
                href={`tel:${HOTLINE_TEL}`}
                className="mt-1 flex items-center gap-2 rounded-md border-t border-border/60 px-3 py-3 text-sm font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <Phone className="size-4" />
                Gọi hotline {HOTLINE}
              </a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
