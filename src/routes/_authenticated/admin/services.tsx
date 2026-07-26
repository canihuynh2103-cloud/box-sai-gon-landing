import { createFileRoute } from "@tanstack/react-router";
import { CrudManager, StatusBadge, type Field, type Column } from "@/components/admin/CrudManager";

export const Route = createFileRoute("/_authenticated/admin/services")({
  component: ServicesPage,
});

const fields: Field[] = [
  { name: "title", label: "Tên dịch vụ", type: "text" },
  { name: "slug", label: "Đường dẫn (slug)", type: "slug", from: "title" },
  { name: "icon", label: "Icon (lucide)", type: "text", placeholder: "Warehouse" },
  { name: "sort_order", label: "Thứ tự", type: "number" },
  { name: "is_active", label: "Hiển thị trên website", type: "switch" },
  { name: "description", label: "Mô tả ngắn", type: "textarea" },
  { name: "image", label: "Ảnh dịch vụ", type: "image" },
  { name: "content", label: "Nội dung chi tiết", type: "richtext" },
  { name: "seo_title", label: "SEO title", type: "text" },
  { name: "seo_description", label: "SEO description", type: "textarea" },
];

const columns: Column[] = [
  { key: "title", label: "Dịch vụ", className: "font-medium" },
  { key: "icon", label: "Icon" },
  { key: "is_active", label: "Trạng thái", render: (row) => <StatusBadge active={row.is_active} /> },
  { key: "sort_order", label: "Thứ tự", className: "w-16" },
];

function ServicesPage() {
  return (
    <CrudManager
      table="services"
      title="Dịch vụ"
      description="Quản lý danh sách dịch vụ hiển thị ở mục Dịch Vụ trên trang chủ."
      fields={fields}
      columns={columns}
      searchKeys={["title", "description"]}
      defaults={{ is_active: true, sort_order: 0, icon: "Boxes", content: "" }}
    />
  );
}
