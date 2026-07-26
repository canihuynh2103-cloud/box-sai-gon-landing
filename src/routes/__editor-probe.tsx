import { createFileRoute } from "@tanstack/react-router";
import { PostEditor } from "@/components/admin/PostEditor";

export const Route = createFileRoute("/__editor-probe")({
  ssr: false,
  component: () => <PostEditor post={null} onClose={() => undefined} />,
});
