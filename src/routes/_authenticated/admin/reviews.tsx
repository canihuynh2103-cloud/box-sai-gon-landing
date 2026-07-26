import { createFileRoute } from "@tanstack/react-router";
import { CrudManager, StatusBadge, type Field, type Column } from "@/components/admin/CrudManager";

export const Route = createFileRoute("/_authenticated/admin/reviews")({
  component: ReviewsPage,
});

const fields: Field[] = [
  { name: "name", label: "Khách hàng", type: "text" },
  { name: "role", label: "Chức danh / công ty", type: "text" },
  { name: "rating", label: "Số sao (1-5)", type: "number" },
  { name: "sort_order", label: "Thứ tự", type: "number" },
  { name: "is_active", label: "Hiển thị", type: "switch" },
  { name: "avatar", label: "Ảnh đại diện", type: "image" },
  { name: "content", label: "Nội dung đánh giá", type: "textarea" },
];

const columns: Column[] = [
  { key: "name", label: "Khách hàng", className: "font-medium" },
  { key: "role", label: "Chức danh" },
  { key: "rating", label: "Sao", className: "w-16" },
  { key: "is_active", label: "Trạng thái", render: (row) => <StatusBadge active={row.is_active} /> },
];

function ReviewsPage() {
  return (
    <CrudManager
      table="reviews"
      title="Đánh giá khách hàng"
      description="Quản lý các đánh giá hiển thị trong carousel trên trang chủ."
      fields={fields}
      columns={columns}
      searchKeys={["name", "content"]}
      defaults={{ is_active: true, sort_order: 0, rating: 5 }}
    />
  );
}
