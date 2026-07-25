import { PARTNERS } from "@/data/site";

export function Partners() {
  const list = [...PARTNERS, ...PARTNERS];
  return (
    <section className="border-y border-white/5 bg-secondary py-14 text-secondary-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-bold uppercase tracking-[0.24em] text-secondary-foreground/60">
          Đối tác đã tin tưởng chúng tôi
        </p>
      </div>
      <div className="relative mt-8 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max animate-marquee gap-4">
          {list.map((p, i) => (
            <span
              key={`${p.name}-${i}`}
              title={p.name}
              className="flex h-16 min-w-[190px] items-center justify-center rounded-lg border border-white/10 bg-white/5 px-8"
            >
              {p.logo ? (
                <img
                  src={p.logo}
                  alt={`Logo ${p.name}`}
                  loading="lazy"
                  width={120}
                  height={32}
                  className="h-7 w-auto max-w-[130px] object-contain opacity-80 transition-opacity hover:opacity-100"
                />
              ) : (
                <span className="font-display text-lg font-bold uppercase tracking-wide text-secondary-foreground/75">
                  {p.name}
                </span>
              )}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
