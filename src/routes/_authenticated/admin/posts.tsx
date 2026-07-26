import { createFileRoute } from "@tanstack/react-router";
import { CrudManager, StatusBadge, type Field, type Column } from "@/components/admin/CrudManager";

export const Route = createFileRoute("/_authenticated/admin/posts")({
  component: PostsPage,
});

const fields: Field[] = [
  { name: "title", label: "Tiêu đề", type: "text" },
  { name: "slug", label: "Đường dẫn (slug)", type: "slug", from: "title" },
  { name: "category", label: "Danh mục", type: "text", placeholder: "Bốc Xếp Kho Hàng" },
  {
    name: "status",
    label: "Trạng thái",
    type: "select",
    options: [
      { value: "draft", label: "Bản nháp" },
      { value: "published", label: "Đã xuất bản" },
    ],
  },
  { name: "sort_order", label: "Thứ tự", type: "number" },
  { name: "excerpt", label: "Mô tả ngắn", type: "textarea" },
  { name: "cover_image", label: "Ảnh bìa", type: "image" },
  { name: "content", label: "Nội dung", type: "richtext", placeholder: "Nhập nội dung bài viết..." },
  { name: "seo_title", label: "SEO title", type: "text", help: "Nên dưới 60 ký tự" },
  { name: "seo_keywords", label: "SEO keywords", type: "text" },
  { name: "seo_description", label: "SEO description", type: "textarea", help: "Nên dưới 160 ký tự" },
];

const columns: Column[] = [
  { key: "title", label: "Tiêu đề", className: "font-medium" },
  { key: "category", label: "Danh mục" },
  {
    key: "status",
    label: "Trạng thái",
    render: (row) => (
      <StatusBadge active={row.status === "published"} labels={["Đã xuất bản", "Nháp"]} />
    ),
  },
  { key: "sort_order", label: "Thứ tự", className: "w-16" },
];

function PostsPage() {
  return (
    <CrudManager
      table="posts"
      title="Bài viết"
      description="Viết, chỉnh sửa và xuất bản bài viết blog kèm trường SEO."
      fields={fields}
      columns={columns}
      searchKeys={["title", "category"]}
      order={{ column: "sort_order", ascending: true }}
      defaults={{ status: "draft", sort_order: 0, content: "" }}
    />
  );
}
