import { createFileRoute } from "@tanstack/react-router";
import { KeywordManager } from "@/components/admin/KeywordManager";

export const Route = createFileRoute("/_authenticated/admin/keywords")({
  head: () => ({
    meta: [
      { title: "Quản Lý Từ Khóa SEO — Saigon Handling" },
      {
        name: "description",
        content: "Quản trị bản đồ từ khóa, URL đích và dữ liệu Search Console của Saigon Handling.",
      },
      { property: "og:title", content: "Quản Lý Từ Khóa SEO — Saigon Handling" },
      {
        property: "og:description",
        content: "Quản trị từ khóa và kế hoạch nội dung SEO của Saigon Handling.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: KeywordManager,
});
