import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUp, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { ADDRESS, EMAIL, HOTLINE_TEL } from "@/data/site";

export function FloatingButtons() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const base =
    "flex size-13 items-center justify-center rounded-full transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

  return (
    <div className="fixed bottom-5 right-4 z-40 flex flex-col gap-3 sm:right-5">
      <a
        href={`tel:${HOTLINE_TEL}`}
        aria-label="Gọi hotline 0888.977.822"
        className={`gradient-primary relative text-primary-foreground shadow-[var(--shadow-glow)] ${base}`}
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-primary/40 motion-reduce:animate-none" />
        <Phone className="relative size-5" />
      </a>
      <a
        href="https://zalo.me/0888977822"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat Zalo"
        className={`bg-secondary font-display text-sm font-bold text-secondary-foreground shadow-[var(--shadow-lift)] ${base}`}
      >
        Zalo
      </a>
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Xem bản đồ Google Maps"
        className={`border border-border bg-card text-primary shadow-[var(--shadow-card)] ${base}`}
      >
        <MapPin className="size-5" />
      </a>
      <a
        href={`mailto:${EMAIL}`}
        aria-label="Gửi email cho Bốc Xếp Sài Gòn"
        className={`border border-border bg-card text-foreground shadow-[var(--shadow-card)] ${base}`}
      >
        <Mail className="size-5" />
      </a>
      <Link
        to="/"
        hash="lien-he"
        aria-label="Gửi yêu cầu báo giá"
        className={`border border-border bg-card text-foreground shadow-[var(--shadow-card)] ${base}`}
      >
        <MessageCircle className="size-5" />
      </Link>
      {show && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Lên đầu trang"
          className={`border border-border bg-card text-foreground shadow-[var(--shadow-card)] ${base}`}
        >
          <ArrowUp className="size-5" />
        </button>
      )}
    </div>
  );
}
