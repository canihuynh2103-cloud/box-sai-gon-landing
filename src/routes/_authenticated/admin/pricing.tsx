import { createFileRoute } from "@tanstack/react-router";
import { CrudManager, StatusBadge, type Field, type Column } from "@/components/admin/CrudManager";

export const Route = createFileRoute("/_authenticated/admin/pricing")({
  component: PricingPage,
});

const fields: Field[] = [
  { name: "name", label: "Tên gói", type: "text" },
  { name: "price", label: "Giá", type: "text", placeholder: "400.000 - 600.000" },
  { name: "unit", label: "Đơn vị", type: "text", placeholder: "VNĐ/ngày/người" },
  { name: "note", label: "Ghi chú", type: "text" },
  { name: "cta", label: "Nhãn nút", type: "text" },
  { name: "sort_order", label: "Thứ tự", type: "number" },
  { name: "popular", label: "Gói nổi bật", type: "switch" },
  { name: "is_active", label: "Hiển thị", type: "switch" },
  {
    name: "features",
    label: "Tính năng",
    type: "list",
    placeholder: "Mỗi dòng một tính năng",
  },
];

const columns: Column[] = [
  { key: "name", label: "Gói", className: "font-medium" },
  { key: "price", label: "Giá" },
  { key: "unit", label: "Đơn vị" },
  { key: "popular", label: "Nổi bật", render: (row) => (row.popular ? "★" : "—") },
  { key: "is_active", label: "Trạng thái", render: (row) => <StatusBadge active={row.is_active} /> },
];

function PricingPage() {
  return (
    <CrudManager
      table="pricing_plans"
      title="Bảng giá"
      description="Quản lý các gói giá dịch vụ hiển thị ở mục Bảng Giá."
      fields={fields}
      columns={columns}
      searchKeys={["name"]}
      defaults={{ is_active: true, popular: false, sort_order: 0, features: [], cta: "Nhận Báo Giá" }}
    />
  );
}
