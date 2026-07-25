import { useEffect, useState } from "react";
import { ArrowUp, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { ADDRESS, EMAIL, HOTLINE_TEL } from "@/data/site";

export function FloatingButtons() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
      <a
        href={`tel:${HOTLINE_TEL}`}
        aria-label="Gọi hotline"
        className="gradient-primary flex size-13 items-center justify-center rounded-full text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-110"
      >
        <span className="absolute size-13 animate-ping rounded-full bg-primary/40" />
        <Phone className="relative size-5" />
      </a>
      <a
        href="https://zalo.me/0888977822"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat Zalo"
        className="flex size-13 items-center justify-center rounded-full bg-secondary font-display text-sm font-bold text-secondary-foreground shadow-[var(--shadow-lift)] transition-transform hover:scale-110"
      >
        Zalo
      </a>
      <a
        href="#lien-he"
        aria-label="Gửi yêu cầu"
        className="flex size-13 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-[var(--shadow-card)] transition-transform hover:scale-110"
      >
        <MessageCircle className="size-5" />
      </a>
      {show && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Lên đầu trang"
          className="flex size-13 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-[var(--shadow-card)] transition-transform hover:scale-110"
        >
          <ArrowUp className="size-5" />
        </button>
      )}
    </div>
  );
}
