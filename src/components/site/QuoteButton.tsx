import type { ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

/**
 * Nút "Nhận báo giá": cuộn tới form liên hệ nếu có trên trang hiện tại,
 * nếu không thì điều hướng về trang chủ và cuộn tới #lien-he.
 */
export function QuoteButton({
  children = "Nhận Báo Giá",
  className,
  ariaLabel,
}: {
  children?: ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  const navigate = useNavigate();

  const onClick = () => {
    const el = document.getElementById("lien-he");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", "#lien-he");
      const input = el.querySelector<HTMLInputElement>("input, textarea");
      window.setTimeout(() => input?.focus({ preventScroll: true }), 650);
      return;
    }
    navigate({ to: "/", hash: "lien-he" });
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel ?? "Mở form nhận báo giá"}
      className={cn("cta-press", className)}
    >
      {children}
    </button>
  );
}
