import { useEffect, useRef, useState } from "react";
import { HandHeart, Gauge, ScrollText, ShieldCheck } from "lucide-react";
import teamAsset from "@/assets/team-group.jpg.asset.json";

const teamImage = teamAsset.url;
import { STATS } from "@/data/site";

const VALUES = [
  {
    icon: ShieldCheck,
    title: "An Toàn",
    desc: "Bảo hộ đầy đủ, quy trình nâng hạ chuẩn, cam kết bồi thường hàng hóa.",
  },
  {
    icon: Gauge,
    title: "Nhanh Chóng",
    desc: "Điều động nhân công trong 60 phút, làm việc cả ca đêm và ngày lễ.",
  },
  {
    icon: ScrollText,
    title: "Minh Bạch",
    desc: "Chốt giá trước khi thi công, không phát sinh ngoài thỏa thuận.",
  },
  {
    icon: HandHeart,
    title: "Tận Tâm",
    desc: "Giám sát theo từng đội, hỗ trợ khách hàng đến khi nghiệm thu xong.",
  },
];

function useCountUp(target: number, start: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    const duration = 1600;
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start]);
  return value;
}

function StatItem({ value, suffix, label, start }: (typeof STATS)[number] & { start: boolean }) {
  const n = useCountUp(value, start);
  return (
    <div className="text-center">
      <p className="font-display text-4xl font-bold text-primary sm:text-5xl">
        {n}
        {suffix}
      </p>
      <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
    </div>
  );
}

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="gioi-thieu" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="relative">
            <WatermarkedImage
              wrapperClassName="rounded-2xl shadow-[var(--shadow-lift)]"
              src={teamImage}
              alt="Đội ngũ hơn 20 nhân công Bốc Xếp Sài Gòn đội mũ bảo hộ, mặc áo phản quang trong nhà xưởng"
              loading="lazy"
              width={1456}
              height={1092}
              className="aspect-[4/3] w-full object-cover object-center"
            />

            <div className="gradient-primary absolute -bottom-6 right-0 rounded-xl px-5 py-3 text-primary-foreground shadow-[var(--shadow-glow)] sm:right-8 sm:px-6 sm:py-4">
              <p className="font-display text-3xl font-bold leading-none">10+</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-widest">
                Năm Kinh Nghiệm
              </p>
            </div>
          </div>

          <div>
            <span className="section-eyebrow">Giới thiệu</span>
            <h2 className="mt-4 font-display text-4xl font-bold uppercase leading-tight sm:text-5xl">
              Đồng hành cùng doanh nghiệp từ năm 2010
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Bốc Xếp Sài Gòn được thành lập năm 2010, khởi đầu từ một tổ đội nhỏ tại khu vực
              Thủ Đức. Đến nay chúng tôi có hơn 100 nhân công chính thức, trụ sở chính tại 234
              Tô Ngọc Vân (Thủ Đức) cùng chi nhánh Tân Bình và Bình Tân, phục vụ hàng trăm kho
              bãi, nhà máy và doanh nghiệp logistics trên khắp TP.HCM.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Sứ mệnh của chúng tôi rất đơn giản: giúp khách hàng không còn phải lo về nhân
              công. Đúng người, đúng giờ, đúng giá — và hàng hóa luôn nguyên vẹn.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {VALUES.map((v) => (
                <div
                  key={v.title}
                  className="rounded-xl border border-border bg-card p-5 card-lift"
                >
                  <span className="flex size-10 items-center justify-center rounded-lg bg-primary/12 text-primary">
                    <v.icon className="size-5" />
                  </span>
                  <h3 className="mt-3 font-display text-lg font-bold">{v.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{v.desc}</p>
                </div>
              ))}
            </div>

            <a
              href="#lien-he"
              className="gradient-primary mt-8 inline-flex rounded-md px-6 py-3 font-display text-base font-bold uppercase tracking-wide text-primary-foreground shadow-[var(--shadow-glow)]"
            >
              Đặt Lịch Khảo Sát Miễn Phí
            </a>
          </div>
        </div>

        <div
          ref={ref}
          className="mt-20 grid grid-cols-2 gap-8 rounded-2xl border border-border bg-muted/50 px-6 py-10 lg:grid-cols-4"
        >
          {STATS.map((s) => (
            <StatItem key={s.label} {...s} start={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}
