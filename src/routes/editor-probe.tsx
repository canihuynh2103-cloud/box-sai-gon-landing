import { createFileRoute } from "@tanstack/react-router";
import { PostEditor } from "@/components/admin/PostEditor";

// Temporary probe used to test the editor without an admin session.
const fake = {
  id: "11111111-1111-1111-1111-111111111111",
  title: "Bài viết mẫu",
  slug: "bai-viet-mau",
  category: null,
  excerpt: null,
  content: "<p>hi</p>",
  cover_image: null,
  cover_image_alt: null,
  status: "published",
  sort_order: null,
  seo_title: null,
  seo_description: null,
  seo_keywords: ["a", "b"],
  focus_keyword: null,
  canonical_url: null,
  og_title: 123,
  og_description: null,
  og_image: null,
  author: null,
  tags: ["bốc xếp", "kho hàng"],
  reading_time: 1,
  published_at: new Date().toISOString(),
  scheduled_at: null,
  updated_at: new Date().toISOString(),
};

export const Route = createFileRoute("/editor-probe")({
  ssr: false,
  component: () => <PostEditor post={fake} onClose={() => undefined} />,
});
