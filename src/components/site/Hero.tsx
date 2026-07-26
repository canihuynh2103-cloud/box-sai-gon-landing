import { useEffect, useState } from "react";
import { ChevronDown, Phone, ShieldCheck } from "lucide-react";
import heroImage from "@/assets/hero-warehouse.jpg";
import { HOTLINE, HOTLINE_TEL, STATS } from "@/data/site";
import { useHeroBanner } from "@/hooks/use-content";
import { QuoteButton } from "@/components/site/QuoteButton";

export function Hero() {
  const [offset, setOffset] = useState(0);
  const { data: banner } = useHeroBanner();

  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden"
      style={{ minHeight: "calc(100svh - var(--header-h, 4rem))" }}
    >
      <div
        className="absolute inset-x-0 -top-24 h-[130%] will-change-transform"
        style={{ transform: `translateY(${offset * 0.35}px)` }}
      >
        <img
          src={banner?.image || heroImage}
          alt="Đội bốc xếp hàng hóa tại kho bãi container ở TP.HCM"
          width={1920}
          height={1088}
          className="size-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(105deg,oklch(0.2_0.04_258/0.92)_0%,oklch(0.2_0.04_258/0.72)_45%,oklch(0.2_0.04_258/0.35)_100%)]" />

      <div
        className="relative mx-auto flex max-w-7xl flex-col px-4 pb-14 sm:px-6 lg:px-8"
        style={{ minHeight: "100svh", paddingTop: "calc(var(--header-h, 4rem) + 0.75rem)" }}
      >
        <div className="flex flex-1 flex-col justify-center py-4 sm:py-8">

          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-primary-foreground backdrop-blur">
            <ShieldCheck className="size-4" />
            Dịch vụ bốc xếp chuyên nghiệp tại TP.HCM
          </span>


          <h1 className="mt-6 max-w-3xl font-display text-5xl font-bold leading-[0.95] text-secondary-foreground sm:text-7xl lg:text-8xl">
            Bốc Xếp Sài Gòn
          </h1>
          <p className="mt-3 font-display text-2xl font-semibold uppercase tracking-[0.06em] text-primary sm:text-3xl">
            Chuyên Nghiệp - Nhanh Chóng - An Toàn
          </p>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-secondary-foreground/80 sm:text-lg">
            {banner?.subtitle ??
              "Hơn 10 năm kinh nghiệm trong ngành bốc xếp và di dời hàng hóa. Đội ngũ 100+ nhân công được huấn luyện an toàn lao động, sẵn sàng phục vụ 24/7 tại TP.HCM và các tỉnh lân cận."}
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            {banner?.cta_href && !banner.cta_href.startsWith("#") ? (
              <a
                href={banner.cta_href}
                className="gradient-primary cta-press inline-flex items-center rounded-md px-7 py-3.5 font-display text-lg font-bold uppercase tracking-wide text-primary-foreground shadow-[var(--shadow-glow)]"
              >
                {banner.cta_label || "Nhận Báo Giá"}
              </a>
            ) : (
              <QuoteButton className="gradient-primary inline-flex items-center rounded-md px-7 py-3.5 font-display text-lg font-bold uppercase tracking-wide text-primary-foreground shadow-[var(--shadow-glow)]">
                {banner?.cta_label || "Nhận Báo Giá"}
              </QuoteButton>
            )}
            <a
              href={`tel:${HOTLINE_TEL}`}
              className="cta-press inline-flex items-center gap-2 rounded-md border border-white/30 bg-white/10 px-7 py-3.5 font-display text-lg font-bold uppercase tracking-wide text-secondary-foreground backdrop-blur hover:bg-white/20"
            >
              <Phone className="size-5" />
              {HOTLINE}
            </a>
          </div>


          <dl className="mt-14 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/15 bg-white/15 backdrop-blur sm:grid-cols-4 lg:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="min-w-0 bg-secondary/60 px-3 py-4 sm:px-5 sm:py-5">
                <dt className="font-display text-2xl font-bold text-primary sm:text-4xl">
                  {s.value}
                  {s.suffix}
                </dt>
                <dd className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-secondary-foreground/75 sm:text-xs">
                  {s.label}
                </dd>

              </div>
            ))}
          </dl>
        </div>

        <a
          href="#dich-vu"
          aria-label="Cuộn xuống"
          className="mx-auto flex size-11 items-center justify-center rounded-full border border-white/25 text-secondary-foreground/80 transition-colors hover:bg-white/15"
        >
          <ChevronDown className="size-5 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
