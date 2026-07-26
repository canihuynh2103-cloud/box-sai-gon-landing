import { createFileRoute } from "@tanstack/react-router";
import { CrudManager, StatusBadge, type Field, type Column } from "@/components/admin/CrudManager";

export const Route = createFileRoute("/_authenticated/admin/banners")({
  component: BannersPage,
});

const fields: Field[] = [
  { name: "title", label: "Tiêu đề", type: "text" },
  {
    name: "position",
    label: "Vị trí",
    type: "select",
    options: [
      { value: "hero", label: "Hero (đầu trang)" },
      { value: "mid", label: "Giữa trang" },
      { value: "footer", label: "Cuối trang" },
    ],
  },
  { name: "cta_label", label: "Nhãn nút", type: "text" },
  { name: "cta_href", label: "Liên kết nút", type: "text", placeholder: "#lien-he" },
  { name: "sort_order", label: "Thứ tự", type: "number" },
  { name: "is_active", label: "Hiển thị", type: "switch" },
  { name: "image", label: "Ảnh banner", type: "image" },
  { name: "subtitle", label: "Phụ đề", type: "textarea" },
];

const columns: Column[] = [
  { key: "title", label: "Banner", className: "font-medium" },
  { key: "position", label: "Vị trí" },
  { key: "is_active", label: "Trạng thái", render: (row) => <StatusBadge active={row.is_active} /> },
  { key: "sort_order", label: "Thứ tự", className: "w-16" },
];

function BannersPage() {
  return (
    <CrudManager
      table="banners"
      title="Banner"
      description="Quản lý tiêu đề, phụ đề, ảnh nền và nút CTA của banner hero."
      fields={fields}
      columns={columns}
      searchKeys={["title"]}
      defaults={{ is_active: true, sort_order: 0, position: "hero" }}
    />
  );
}
