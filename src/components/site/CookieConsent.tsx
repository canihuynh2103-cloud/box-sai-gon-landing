import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { onConsentChange } from "@/lib/consent";
import { choiceFor, privacySignal, saveSiteChoices, shouldShowBanner } from "@/lib/google-ads";

export function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [advertising, setAdvertising] = useState(false);
  const [gpc, setGpc] = useState(false);
  const panel = useRef<HTMLElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const sync = () => {
      setAnalytics(choiceFor("analytics") === "granted");
      setAdvertising(choiceFor("advertising") === "granted");
      setGpc(privacySignal());
      setOpen(shouldShowBanner());
    };
    const showSettings = () => {
      previousFocus.current =
        document.activeElement instanceof HTMLElement ? document.activeElement : null;
      sync();
      setSettings(true);
      setOpen(true);
    };
    sync();
    const unsubscribe = onConsentChange(sync);
    window.addEventListener("open-cookie-settings", showSettings);
    return () => {
      unsubscribe();
      window.removeEventListener("open-cookie-settings", showSettings);
    };
  }, []);

  useEffect(() => {
    if (open && panel.current) {
      panel.current.scrollTop = 0;
      panel.current.focus({ preventScroll: true });
    }
  }, [open, settings]);

  function save(allowAnalytics: boolean, allowAdvertising: boolean) {
    saveSiteChoices({
      analytics: allowAnalytics ? "granted" : "denied",
      advertising: allowAdvertising ? "granted" : "denied",
    });
    setOpen(false);
    setSettings(false);
    previousFocus.current?.focus({ preventScroll: true });
  }

  if (!open) return null;
  return (
    <section
      ref={panel}
      tabIndex={-1}
      role="region"
      aria-label="Lựa chọn quyền riêng tư"
      className="fixed inset-x-3 bottom-20 z-[80] mx-auto max-h-[calc(100dvh-7rem)] max-w-xl overflow-y-auto rounded-lg border border-border bg-background p-5 text-foreground shadow-[var(--shadow-lift)] focus:outline-none sm:inset-x-6 sm:p-6 lg:bottom-6"
    >
      <h2 className="font-display text-2xl font-bold">
        {settings ? "Cài đặt cookie" : "Quyền riêng tư của bạn"}
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        Chúng tôi đếm lượt truy cập không dùng cookie. Nếu bạn chấp nhận phân tích, chúng tôi đo
        thêm lượt nhấp. Cookie quảng cáo giúp đo hiệu quả quảng cáo và yêu cầu báo giá. Phân tích bổ
        sung và thẻ quảng cáo chỉ được bật theo lựa chọn của bạn.
      </p>
      <Link
        to="/chinh-sach-bao-mat"
        className="mt-2 inline-block text-sm text-primary underline underline-offset-4"
      >
        Chính sách bảo mật
      </Link>
      {settings && (
        <div className="mt-4 divide-y divide-border border-y border-border">
          <div className="flex items-center justify-between gap-4 py-3 text-sm">
            <span>Cần thiết</span>
            <span className="text-muted-foreground">Luôn bật</span>
          </div>
          <label className="flex items-center justify-between gap-4 py-3 text-sm">
            <span>Phân tích — do Lovable cung cấp</span>
            <Switch
              aria-label="Phân tích"
              checked={analytics}
              onCheckedChange={setAnalytics}
              disabled={gpc}
            />
          </label>
          <label className="flex items-center justify-between gap-4 py-3 text-sm">
            <span>Quảng cáo — do Google cung cấp</span>
            <Switch
              aria-label="Quảng cáo"
              checked={advertising}
              onCheckedChange={setAdvertising}
              disabled={gpc}
            />
          </label>
        </div>
      )}
      {gpc && (
        <p className="mt-3 text-sm text-muted-foreground">
          Tín hiệu quyền riêng tư của trình duyệt đang áp dụng. Phân tích bổ sung và quảng cáo đều
          tắt.
        </p>
      )}
      <div className="mt-5 grid grid-cols-2 gap-3">
        <Button variant="outline" className="h-11" onClick={() => save(true, true)} disabled={gpc}>
          Chấp nhận
        </Button>
        <Button variant="outline" className="h-11" onClick={() => save(false, false)}>
          Từ chối
        </Button>
      </div>
      {settings ? (
        <Button className="mt-3 h-11 w-full" onClick={() => save(analytics, advertising)}>
          Lưu lựa chọn
        </Button>
      ) : (
        <Button variant="link" className="mt-2 w-full" onClick={() => setSettings(true)}>
          Cài đặt cookie
        </Button>
      )}
    </section>
  );
}
