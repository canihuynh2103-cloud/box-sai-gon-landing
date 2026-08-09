import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { Clock, Facebook, Mail, MapPin, Phone, Send, Youtube, Music2 } from "lucide-react";
import { BRANCHES, EMAIL, HOTLINE, HOTLINE_TEL, NAV_ITEMS, SERVICES, WORK_HOURS } from "@/data/site";
import { NavLink } from "@/components/site/NavLink";
import logoAsset from "@/assets/logo.png.asset.json";

const SOCIALS = [
  { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/" },
  { icon: Youtube, label: "YouTube", href: "https://www.youtube.com/" },
  { icon: Music2, label: "TikTok", href: "https://www.tiktok.com/" },
];

export function Footer() {
  const [sent, setSent] = useState(false);

  function onSubscribe(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.currentTarget.reset();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  }

  const linkCls =
    "text-sm text-secondary-foreground/70 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm";

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-16 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg">
                <img
                  src={logoAsset.url}
                  alt="Logo Sai Gon Cargo Handling - Bốc Xếp Sài Gòn"
                  width={240}
                  height={240}
                  loading="lazy"
                  className="h-full w-full object-contain"
                />
              </span>
              <span className="font-display text-lg font-bold leading-[1.4]">Bốc Xếp Sài Gòn</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-secondary-foreground/70">
              Đơn vị cung cấp nhân công bốc xếp và di dời hàng hóa chuyên nghiệp tại TP.HCM
              từ năm 2010. Chuyên nghiệp - Minh bạch - Tin cậy.
            </p>
            <form onSubmit={onSubscribe} className="mt-5">
              <label
                htmlFor="footer-email"
                className="text-xs font-bold uppercase tracking-widest text-secondary-foreground/60"
              >
                Đăng ký nhận tin
              </label>
              <div className="mt-2 flex gap-2">
                <input
                  id="footer-email"
                  type="email"
                  required
                  name="email"
                  placeholder="Email của bạn"
                  className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-secondary-foreground outline-none placeholder:text-secondary-foreground/40 focus:border-primary"
                />
                <button
                  type="submit"
                  aria-label="Đăng ký nhận tin"
                  className="gradient-primary flex size-11 shrink-0 items-center justify-center rounded-md text-primary-foreground transition-transform hover:scale-105"
                >
                  <Send className="size-4" />
                </button>
              </div>
              {sent && (
                <p role="status" className="mt-2 text-xs font-semibold text-primary">
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
                  <Link to="/dich-vu" className={linkCls}>
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg font-bold uppercase">Liên Kết Nhanh</h3>
            <ul className="mt-4 space-y-2">
              {NAV_ITEMS.map((n) => (
                <li key={n.href}>
                  <NavLink href={n.href} className={linkCls} activeClassName="text-primary">
                    {n.label}
                  </NavLink>
                </li>
              ))}
              <li>
                <Link to="/ho-so-nang-luc" className={linkCls}>
                  Hồ sơ năng lực
                </Link>
              </li>
              <li>
                <Link to="/" hash="lien-he" className={linkCls}>
                  Tuyển dụng
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg font-bold uppercase">Thông Tin Liên Hệ</h3>
            <ul className="mt-4 space-y-3 break-words text-sm text-secondary-foreground/70">
              <li className="flex min-w-0 gap-2.5">
                <Phone className="mt-0.5 size-4 shrink-0 text-primary" />
                <a href={`tel:${HOTLINE_TEL}`} className="hover:text-primary">
                  {HOTLINE}
                </a>
              </li>
              <li className="flex min-w-0 gap-2.5">
                <Mail className="mt-0.5 size-4 shrink-0 text-primary" />
                <a href={`mailto:${EMAIL}`} className="min-w-0 break-all hover:text-primary">
                  {EMAIL}
                </a>
              </li>
              {BRANCHES.map((b) => (
                <li key={b.name} className="flex min-w-0 gap-2.5">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(b.address)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="min-w-0 hover:text-primary"
                  >
                    <span className="block text-xs font-bold uppercase tracking-wider text-secondary-foreground/50">
                      {b.name}
                    </span>
                    {b.address}
                  </a>
                </li>
              ))}
              <li className="flex min-w-0 gap-2.5">
                <Clock className="mt-0.5 size-4 shrink-0 text-primary" />
                {WORK_HOURS}
              </li>
            </ul>
            <div className="mt-5 flex gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="flex size-11 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-secondary-foreground/80 transition-colors hover:bg-primary hover:text-primary-foreground"
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
            <Link to="/ho-so-nang-luc" className="hover:text-primary">
              Hồ sơ năng lực
            </Link>
            <Link to="/" hash="lien-he" className="hover:text-primary">
              Liên hệ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
