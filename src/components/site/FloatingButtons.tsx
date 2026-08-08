import { useEffect, useState } from "react";
import { ArrowUp, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { EMAIL, HOTLINE_TEL, MAPS_LINK, ZALO_LINK } from "@/data/site";
import { QuoteButton } from "@/components/site/QuoteButton";

export function FloatingButtons() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const base =
    "cta-press flex size-13 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

  return (
    <div className="fixed bottom-5 right-4 z-40 flex flex-col gap-3 sm:right-5">
      <a
        href={`tel:${HOTLINE_TEL}`}
        aria-label="Gọi hotline 0888.997.822"
        className={`gradient-primary cta-float relative text-primary-foreground shadow-[var(--shadow-glow)] ${base}`}
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-primary/40 motion-reduce:animate-none" />
        <Phone className="relative size-5" />
      </a>
      <a
        href={ZALO_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat Zalo với Bốc Xếp Sài Gòn"
        className={`bg-secondary font-display text-sm font-bold text-secondary-foreground shadow-[var(--shadow-lift)] ${base}`}
      >
        Zalo
      </a>
      <a
        href={MAPS_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Xem bản đồ Google Maps tới trụ sở"
        className={`border border-border bg-card text-primary shadow-[var(--shadow-card)] ${base}`}
      >
        <MapPin className="size-5" />
      </a>
      <a
        href={`mailto:${EMAIL}?subject=Y%C3%AAu%20c%E1%BA%A7u%20b%C3%A1o%20gi%C3%A1%20b%E1%BB%91c%20x%E1%BA%BFp`}
        aria-label="Gửi email cho Bốc Xếp Sài Gòn"
        className={`border border-border bg-card text-foreground shadow-[var(--shadow-card)] ${base}`}
      >
        <Mail className="size-5" />
      </a>
      <QuoteButton
        ariaLabel="Gửi yêu cầu báo giá"
        className={`border border-border bg-card text-foreground shadow-[var(--shadow-card)] ${base}`}
      >
        <MessageCircle className="size-5" />
      </QuoteButton>
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
