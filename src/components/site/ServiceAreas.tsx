import { Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { BRANCHES } from "@/data/site";

const PROVINCES = ["Bình Dương", "Đồng Nai", "Long An"];

export function ServiceAreas() {
  return (
    <section id="khu-vuc" className="bg-muted/40 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <span className="section-eyebrow">Khu vực phục vụ</span>
        <h2 className="mt-4 font-display text-4xl font-bold uppercase leading-tight sm:text-5xl">
          Bốc xếp tại TP.HCM và các tỉnh lân cận
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Đội nhân công xuất phát từ 3 điểm tại TP.HCM nên có thể có mặt nhanh ở các quận, khu công
          nghiệp và cảng. Ngoài TP.HCM, chúng tôi nhận việc tại {PROVINCES.join(", ")}.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {BRANCHES.map((b) => (
            <div key={b.name} className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-center gap-2 font-semibold text-foreground">
                <MapPin className="size-5 text-primary" aria-hidden="true" />
                {b.name}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{b.address}</p>
              <p className="mt-3 text-sm text-foreground">
                <span className="font-medium">Phục vụ chính:</span> {b.area}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm text-muted-foreground">
          Xem chi tiết dịch vụ tại{" "}
          <Link to="/dich-vu-boc-xep-tphcm" className="font-medium text-primary underline-offset-4 hover:underline">
            dịch vụ bốc xếp TP.HCM
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
