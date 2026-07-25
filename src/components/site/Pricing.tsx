import { Check } from "lucide-react";
import { PRICING } from "@/data/site";
import { cn } from "@/lib/utils";

export function Pricing() {
  return (
    <section id="bang-gia" className="bg-secondary py-24 text-secondary-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow">Bảng giá</span>
          <h2 className="mt-4 font-display text-4xl font-bold uppercase leading-tight sm:text-5xl">
            Giá tham khảo dịch vụ
          </h2>
          <p className="mt-4 text-secondary-foreground/70">
            Ba hình thức thuê nhân công linh hoạt theo khối lượng công việc của bạn.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {PRICING.map((p) => (
            <div
              key={p.name}
              className={cn(
                "relative flex flex-col rounded-2xl border p-8 transition-transform",
                p.popular
                  ? "border-primary bg-white/[0.07] shadow-[var(--shadow-glow)] lg:-translate-y-4"
                  : "border-white/12 bg-white/[0.03]",
              )}
            >
              {p.popular && (
                <span className="gradient-primary absolute -top-3 left-8 rounded-full px-4 py-1 text-xs font-bold uppercase tracking-widest text-primary-foreground">
                  Phổ Biến Nhất
                </span>
              )}
              <h3 className="font-display text-2xl font-bold uppercase">{p.name}</h3>
              <p className="mt-5 font-display text-4xl font-bold text-primary">{p.price}</p>
              <p className="mt-1 text-sm font-semibold text-secondary-foreground/70">
                {p.unit}
              </p>
              <p className="mt-1 text-xs text-secondary-foreground/50">{p.note}</p>

              <ul className="mt-7 flex-1 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span className="text-secondary-foreground/80">{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#lien-he"
                className={cn(
                  "mt-8 rounded-md px-6 py-3 text-center font-display text-base font-bold uppercase tracking-wide transition-transform hover:scale-[1.02]",
                  p.popular
                    ? "gradient-primary text-primary-foreground"
                    : "border border-white/25 text-secondary-foreground hover:bg-white/10",
                )}
              >
                {p.cta}
              </a>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-secondary-foreground/60">
          * Giá thực tế phụ thuộc vào khối lượng hàng hóa, địa điểm thi công và các yêu cầu
          cụ thể. Vui lòng liên hệ để nhận báo giá chính xác.
        </p>
      </div>
    </section>
  );
}
