import { useState, type FormEvent } from "react";
import { CheckCircle2, Clock, Loader2, Mail, MapPin, Phone, AlertCircle } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { ADDRESS, BRANCHES, EMAIL, HOTLINE, HOTLINE_TEL, SERVICES, WORK_HOURS } from "@/data/site";
import { submitQuote } from "@/lib/quote.functions";


const schema = z.object({
  name: z.string().trim().min(2, "Vui lòng nhập họ tên").max(100),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+\-.\s()]{9,15}$/, "Số điện thoại không hợp lệ"),
  email: z.string().trim().email("Email không hợp lệ").max(255).or(z.literal("")),
  service: z.string().trim().min(1, "Vui lòng chọn dịch vụ"),
  address: z.string().trim().max(200),
  preferredTime: z.string().trim().max(120),
  message: z.string().trim().max(500),

});

type Status = "idle" | "loading" | "success" | "error";

const INFO = [
  { icon: Phone, label: "Hotline 24/7", value: HOTLINE, href: `tel:${HOTLINE_TEL}` },
  { icon: Mail, label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
  { icon: MapPin, label: "Địa chỉ", value: ADDRESS },
  { icon: Clock, label: "Giờ làm việc", value: WORK_HOURS },
];

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const send = useServerFn(submitQuote);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    if (data.company) return; // honeypot

    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      setStatus("error");
      setError(parsed.error.issues[0]?.message ?? "Thông tin chưa hợp lệ");
      return;
    }

    setStatus("loading");
    setError(null);
    try {
      await send({
        data: {
          ...parsed.data,
          sourcePath: typeof window !== "undefined" ? window.location.pathname : "/",
        },
      });
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error && err.message
          ? err.message
          : `Gửi yêu cầu thất bại. Vui lòng gọi hotline ${HOTLINE}.`,
      );
    }
  }



  return (
    <section id="lien-he" className="bg-muted/40 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="section-eyebrow">Liên hệ</span>
          <h2 className="mt-4 font-display text-4xl font-bold uppercase leading-tight sm:text-5xl">
            Nhận báo giá trong 15 phút
          </h2>
          <p className="mt-4 text-muted-foreground">
            Để lại thông tin, bộ phận điều phối sẽ liên hệ tư vấn và khảo sát miễn phí.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <form
            onSubmit={onSubmit}
            className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] sm:p-8"
          >
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Họ và tên *">
                <input name="name" required maxLength={100} className={inputCls} placeholder="Nguyễn Văn A" />
              </Field>
              <Field label="Số điện thoại *">
                <input name="phone" required maxLength={15} className={inputCls} placeholder="09xx xxx xxx" />
              </Field>
              <Field label="Email">
                <input name="email" type="email" maxLength={255} className={inputCls} placeholder="email@congty.vn" />
              </Field>
              <Field label="Dịch vụ quan tâm *">
                <select name="service" required defaultValue="" className={inputCls}>
                  <option value="" disabled>
                    Chọn dịch vụ
                  </option>
                  {SERVICES.map((s) => (
                    <option key={s.title} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                  <option value="Khác">Dịch vụ khác</option>
                </select>
              </Field>
              <div className="sm:col-span-2">
                <Field label="Địa chỉ công trình">
                  <input name="address" maxLength={200} className={inputCls} placeholder="Số nhà, đường, quận/huyện" />
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field label="Thời gian dự kiến">
                  <input
                    name="preferredTime"
                    maxLength={120}
                    className={inputCls}
                    placeholder="VD: 8h ngày 20/08, hoặc trong tuần này"
                  />
                </Field>
              </div>

              <div className="sm:col-span-2">
                <Field label="Nội dung yêu cầu">
                  <textarea
                    name="message"
                    rows={4}
                    maxLength={500}
                    className={inputCls}
                    placeholder="Khối lượng hàng, thời gian dự kiến, số nhân công cần..."
                  />
                </Field>
                <p className="mt-1 text-xs text-muted-foreground">Tối đa 500 ký tự</p>
              </div>
            </div>

            {status === "error" && error && (
              <p className="mt-5 flex items-center gap-2 rounded-md bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive">
                <AlertCircle className="size-4" /> {error}
              </p>
            )}
            {status === "success" && (
              <p className="mt-5 flex items-center gap-2 rounded-md bg-primary/10 px-4 py-3 text-sm font-medium text-primary-dark">
                <CheckCircle2 className="size-4" /> Đã gửi yêu cầu! Chúng tôi sẽ liên hệ trong
                ít phút.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="gradient-primary mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md px-6 py-3.5 font-display text-lg font-bold uppercase tracking-wide text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.01] disabled:opacity-60"
            >
              {status === "loading" && <Loader2 className="size-5 animate-spin" />}
              {status === "loading" ? "Đang gửi..." : "Gửi Yêu Cầu Báo Giá"}
            </button>
          </form>

          <div className="flex flex-col gap-6">
            <div className="overflow-hidden rounded-2xl border border-border shadow-[var(--shadow-card)]">
              <iframe
                title="Bản đồ Bốc Xếp Sài Gòn"
                src={`https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[300px] w-full border-0"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {BRANCHES.map((b) => (
                <div key={b.name} className="rounded-xl border border-border bg-card p-5">
                  <p className="text-xs font-bold uppercase tracking-widest text-primary">
                    {b.name}
                  </p>
                  <p className="mt-2 font-semibold leading-snug">{b.address}</p>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    Phụ trách khu vực: {b.area}
                  </p>
                </div>
              ))}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {INFO.map((i) => (
                <div key={i.label} className="rounded-xl border border-border bg-card p-5">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-primary/12 text-primary">
                    <i.icon className="size-5" />
                  </span>
                  <p className="mt-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    {i.label}
                  </p>
                  {i.href ? (
                    <a
                      href={i.href}
                      className="mt-1 block font-display text-lg font-bold hover:text-primary"
                    >
                      {i.value}
                    </a>
                  ) : (
                    <p className="mt-1 font-semibold leading-snug">{i.value}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const inputCls =
  "w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/25";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold">{label}</span>
      {children}
    </label>
  );
}
