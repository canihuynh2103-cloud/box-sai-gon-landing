import { useState, type FormEvent } from "react";
import { Clock, Facebook, Mail, MapPin, Phone, Send, Youtube, Music2 } from "lucide-react";
import { BRANCHES, EMAIL, HOTLINE, HOTLINE_TEL, NAV_ITEMS, SERVICES, WORK_HOURS } from "@/data/site";

export function Footer() {
  const [sent, setSent] = useState(false);

  function onSubscribe(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.currentTarget.reset();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  }

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="gradient-primary flex size-11 items-center justify-center rounded-lg font-display text-xl font-bold text-primary-foreground">
                BX
              </span>
              <span className="font-display text-lg font-bold">Bốc Xếp Sài Gòn</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-secondary-foreground/70">
              Đơn vị cung cấp nhân công bốc xếp và di dời hàng hóa chuyên nghiệp tại TP.HCM
              từ năm 2010. Chuyên nghiệp - Minh bạch - Tin cậy.
            </p>
            <form onSubmit={onSubscribe} className="mt-5">
              <p className="text-xs font-bold uppercase tracking-widest text-secondary-foreground/60">
                Đăng ký nhận tin
              </p>
              <div className="mt-2 flex gap-2">
                <input
                  type="email"
                  required
                  name="email"
                  placeholder="Email của bạn"
                  className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-secondary-foreground outline-none placeholder:text-secondary-foreground/40 focus:border-primary"
                />
                <button
                  type="submit"
                  aria-label="Đăng ký"
                  className="gradient-primary flex size-11 shrink-0 items-center justify-center rounded-md text-primary-foreground"
                >
                  <Send className="size-4" />
                </button>
              </div>
              {sent && (
                <p className="mt-2 text-xs font-semibold text-primary">
                  Cảm ơn bạn đã đăng ký!
                </p>
              )}
            </form>
          </div>

          <div>
            <h3 className="font-display text-lg font-bold uppercase">Dịch Vụ</h3>
            <ul className="mt-4 space-y-2">
              {SERVICES.slice(0, 8).map((s) => (
                <li key={s.title}>
                  <a
                    href="#dich-vu"
                    className="text-sm text-secondary-foreground/70 transition-colors hover:text-primary"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg font-bold uppercase">Liên Kết Nhanh</h3>
            <ul className="mt-4 space-y-2">
              {NAV_ITEMS.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="text-sm text-secondary-foreground/70 transition-colors hover:text-primary"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#lien-he"
                  className="text-sm text-secondary-foreground/70 transition-colors hover:text-primary"
                >
                  Tuyển dụng
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg font-bold uppercase">Thông Tin Liên Hệ</h3>
            <ul className="mt-4 space-y-3 text-sm text-secondary-foreground/70">
              <li className="flex gap-2.5">
                <Phone className="mt-0.5 size-4 shrink-0 text-primary" />
                <a href={`tel:${HOTLINE_TEL}`} className="hover:text-primary">
                  {HOTLINE}
                </a>
              </li>
              <li className="flex gap-2.5">
                <Mail className="mt-0.5 size-4 shrink-0 text-primary" />
                <a href={`mailto:${EMAIL}`} className="hover:text-primary">
                  {EMAIL}
                </a>
              </li>
              {BRANCHES.map((b) => (
                <li key={b.name} className="flex gap-2.5">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span>
                    <span className="block text-xs font-bold uppercase tracking-wider text-secondary-foreground/50">
                      {b.name}
                    </span>
                    {b.address}
                  </span>
                </li>
              ))}
              <li className="flex gap-2.5">
                <Clock className="mt-0.5 size-4 shrink-0 text-primary" />
                {WORK_HOURS}
              </li>
            </ul>
            <div className="mt-5 flex gap-2">
              {[
                { icon: Facebook, label: "Facebook" },
                { icon: Youtube, label: "YouTube" },
                { icon: Music2, label: "TikTok" },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#top"
                  aria-label={s.label}
                  className="flex size-10 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-secondary-foreground/80 transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <s.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-secondary-foreground/55 sm:flex-row">
          <p>© {new Date().getFullYear()} Bốc Xếp Sài Gòn. Bảo lưu mọi quyền.</p>
          <div className="flex gap-5">
            <a href="#top" className="hover:text-primary">
              Chính sách bảo mật
            </a>
            <a href="#top" className="hover:text-primary">
              Điều khoản sử dụng
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
