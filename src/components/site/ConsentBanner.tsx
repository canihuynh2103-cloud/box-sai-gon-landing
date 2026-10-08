import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import {
  acceptConsent,
  getBannerVisible,
  rejectConsent,
  subscribeConsent,
  POLICY_PATH,
} from "@/lib/consent";
import { Button } from "@/components/ui/button";

/**
 * Regional cookie consent banner (advertising/measurement).
 * Rendered only client-side, only in consent regions or when the region
 * is unknown. Accept and refuse are equally easy; choice persists and can
 * be changed later via footer "Cài đặt cookie".
 */
export function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(getBannerVisible());
    return subscribeConsent(() => setVisible(getBannerVisible()));
  }, []);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cài đặt cookie và quyền riêng tư"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card text-card-foreground shadow-lg"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
        <div className="flex items-start gap-3">
          <ShieldCheck aria-hidden className="mt-0.5 size-5 shrink-0 text-primary" />
          <p className="text-sm leading-relaxed text-muted-foreground">
            Chúng tôi dùng cookie để đo lường hiệu quả quảng cáo (Google Ads) và cải thiện
            trang web. Bạn có thể chấp nhận hoặc từ chối — lựa chọn của bạn được ghi lại và
            có thể thay đổi bất cứ lúc nào qua{" "}
            <Link to={POLICY_PATH} className="font-semibold text-primary underline underline-offset-2">
              Chính sách bảo mật
            </Link>
            .
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <Button
            type="button"
            onClick={acceptConsent}
            className="min-w-32 flex-1 sm:flex-none"
          >
            Chấp nhận
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={rejectConsent}
            className="min-w-32 flex-1 sm:flex-none"
          >
            Từ chối
          </Button>
        </div>
      </div>
    </div>
  );
}
