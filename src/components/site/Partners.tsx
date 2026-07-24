import { PARTNERS } from "@/data/site";

export function Partners() {
  const list = [...PARTNERS, ...PARTNERS];
  return (
    <section className="border-y border-border bg-card py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-bold uppercase tracking-[0.24em] text-muted-foreground">
          Đối tác đã tin tưởng chúng tôi
        </p>
      </div>
      <div className="relative mt-8 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max animate-marquee gap-4">
          {list.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="flex h-16 min-w-[210px] items-center justify-center rounded-lg border border-border bg-muted/50 px-8 font-display text-xl font-bold uppercase tracking-wide text-muted-foreground"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
