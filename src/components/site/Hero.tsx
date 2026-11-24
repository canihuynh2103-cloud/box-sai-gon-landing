import { ChevronDown, Phone, ShieldCheck } from "lucide-react";
import heroImage from "@/assets/hero-warehouse.webp";
import { HOTLINE, HOTLINE_TEL, STATS } from "@/data/site";
import { useHeroBanner } from "@/hooks/use-content";
import { QuoteButton } from "@/components/site/QuoteButton";

export function Hero() {
  const { data: banner } = useHeroBanner();

  return (
    <section id="top" className="relative isolate overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={banner?.image || heroImage}
          alt="Đội bốc xếp hàng hóa tại kho bãi container ở TP.HCM"
          width={1376}
          height={768}
          loading="eager"
          fetchPriority="high"
          className="size-full object-cover"
        />
      </div>
      <div className="hero-overlay absolute inset-0" />

      <div className="home-hero-content relative mx-auto flex max-w-7xl flex-col px-4 pb-6 sm:px-6 lg:px-8">
        <div className="flex flex-1 flex-col justify-start py-2 sm:justify-center sm:py-8">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-3 py-1.5 text-xs font-bold uppercase text-primary-foreground backdrop-blur">
            <ShieldCheck className="size-4 shrink-0" />
            Dịch vụ bốc xếp chuyên nghiệp tại TP.HCM
          </span>

          <p className="mt-5 max-w-3xl font-display text-4xl font-bold leading-tight text-secondary-foreground sm:text-7xl lg:text-8xl">
            Saigon Handling
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-2xl font-semibold uppercase leading-tight text-secondary-foreground sm:text-3xl">
            Công Ty Bốc Xếp Hàng Hóa Chuyên Nghiệp 24/7
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-secondary-foreground/80 sm:text-lg">
            {banner?.subtitle ??
              "Hơn 10 năm kinh nghiệm trong ngành bốc xếp và di dời hàng hóa. Đội ngũ 80+ nhân công được huấn luyện an toàn lao động, sẵn sàng phục vụ 24/7 tại TP.HCM và các tỉnh lân cận."}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-3">
            {banner?.cta_href && !banner.cta_href.startsWith("#") ? (
              <a
                href={banner.cta_href}
                className="gradient-primary cta-press inline-flex min-h-12 items-center justify-center rounded-md px-3 py-3 font-display text-sm font-bold uppercase text-primary-foreground shadow-[var(--shadow-glow)] sm:px-7 sm:text-lg"
              >
                {banner.cta_label || "Nhận Báo Giá"}
              </a>
            ) : (
              <QuoteButton className="gradient-primary inline-flex min-h-12 items-center justify-center rounded-md px-3 py-3 font-display text-sm font-bold uppercase text-primary-foreground shadow-[var(--shadow-glow)] sm:px-7 sm:text-lg">
                {banner?.cta_label || "Nhận Báo Giá"}
              </QuoteButton>
            )}
            <a
              href={`tel:${HOTLINE_TEL}`}
              className="cta-press cta-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-secondary-foreground/30 bg-secondary-foreground/10 px-3 py-3 font-display text-sm font-bold uppercase text-secondary-foreground backdrop-blur hover:bg-secondary-foreground/20 sm:px-7 sm:text-lg"
            >
              <Phone className="size-4 shrink-0 sm:size-5" />
              {HOTLINE}
            </a>
          </div>

          <dl className="mt-8 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-lg border border-secondary-foreground/15 bg-secondary-foreground/15 backdrop-blur sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="min-w-0 bg-secondary/60 px-3 py-3 sm:px-5 sm:py-5">
                <dt className="font-display text-2xl font-bold text-primary sm:text-4xl">
                  {s.value}
                  {s.suffix}
                </dt>
                <dd className="mt-1 text-[10px] font-semibold uppercase text-secondary-foreground/75 sm:text-xs">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <a
          href="#dich-vu"
          aria-label="Cuộn xuống"
          className="mx-auto mt-3 flex size-11 items-center justify-center rounded-full border border-secondary-foreground/25 text-secondary-foreground/80 transition-colors hover:bg-secondary-foreground/15"
        >
          <ChevronDown className="size-5 animate-bounce motion-reduce:animate-none" />
        </a>
      </div>
    </section>
  );
}
