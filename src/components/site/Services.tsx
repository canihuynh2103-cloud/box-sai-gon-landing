import * as Icons from "lucide-react";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "@/data/site";

export function Services() {
  return (
    <section id="dich-vu" className="bg-muted/40 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="section-eyebrow">Dịch vụ</span>
          <h2 className="mt-4 font-display text-4xl font-bold uppercase leading-tight sm:text-5xl">
            14 dịch vụ bốc xếp trọn gói
          </h2>
          <p className="mt-4 text-muted-foreground">
            Từ kho bãi, container, nhà máy đến chuyển nhà và chuyển văn phòng — mọi nhu cầu
            nhân công bốc xếp đều có phương án phù hợp.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {SERVICES.map((s) => {
            const Icon =
              (Icons as unknown as Record<string, Icons.LucideIcon>)[s.icon] ?? Icons.Box;
            return (
              <article
                key={s.title}
                className="card-lift group flex flex-col overflow-hidden rounded-xl border border-border bg-card"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.title}
                    loading="lazy"
                    width={800}
                    height={600}
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="gradient-primary absolute bottom-0 left-5 flex size-11 translate-y-1/2 items-center justify-center rounded-lg text-primary-foreground shadow-[var(--shadow-glow)]">
                    <Icon className="size-5" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5 pt-8">
                  <h3 className="font-display text-xl font-bold">{s.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {s.desc}
                  </p>
                  <a
                    href="#lien-he"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-primary transition-colors hover:text-primary-dark"
                  >
                    Báo giá ngay
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 rounded-xl border border-dashed border-primary/40 bg-accent/60 px-6 py-8 text-center">
          <p className="max-w-xl text-sm text-accent-foreground">
            Bạn cần một dịch vụ đặc thù không có trong danh sách? Chúng tôi vẫn nhận khảo sát
            và xây dựng phương án riêng.
          </p>
          <a
            href="#lien-he"
            className="gradient-primary rounded-md px-6 py-3 font-display text-base font-bold uppercase tracking-wide text-primary-foreground shadow-[var(--shadow-glow)]"
          >
            Liên Hệ Tư Vấn Riêng
          </a>
        </div>
      </div>
    </section>
  );
}
