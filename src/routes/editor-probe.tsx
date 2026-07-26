import { createFileRoute } from "@tanstack/react-router";
import { PostEditor } from "@/components/admin/PostEditor";

export const Route = createFileRoute("/editor-probe")({
  ssr: false,
  component: () => (
    <div className="p-6">
      <PostEditor
        post={{
          id: "probe-1",
          title: "Bài viết thử",
          slug: null,
          category: null,
          excerpt: null,
          content: "<p>Nội dung <b>thử</b></p>",
          cover_image: null,
          cover_image_alt: null,
          seo_title: null,
          seo_description: null,
          seo_keywords: ["a", "b"],
          focus_keyword: null,
          canonical_url: null,
          og_title: null,
          og_description: null,
          og_image: 123,
          author: null,
          tags: ["bốc xếp", "kho"],
          status: null,
          sort_order: null,
          published_at: "bad-date",
          scheduled_at: null,
          updated_at: null,
        }}
        onClose={() => undefined}
      />
    </div>
  ),
});
