import type { ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/**
 * Ảnh nội dung có watermark thương hiệu.
 * Watermark là lớp phủ pseudo-element (pointer-events: none) nên không ảnh
 * hưởng click/zoom, không làm tối hay đổi tỉ lệ ảnh.
 */
export function WatermarkedImage({
  wrapperClassName,
  className,
  ...imgProps
}: ImgHTMLAttributes<HTMLImageElement> & { wrapperClassName?: string }) {
  return (
    <span className={cn("wm-frame", wrapperClassName)}>
      <img className={className} {...imgProps} />
      <span aria-hidden="true" className="wm-mark" />
    </span>
  );
}
