import { createFileRoute } from "@tanstack/react-router";
import { CrudManager, StatusBadge, type Field, type Column } from "@/components/admin/CrudManager";

export const Route = createFileRoute("/_authenticated/admin/projects")({
  component: ProjectsPage,
});

const fields: Field[] = [
  { name: "name", label: "Tên dự án", type: "text" },
  { name: "category", label: "Danh mục", type: "text", placeholder: "Chuyển Kho" },
  { name: "year", label: "Năm", type: "text" },
  { name: "location", label: "Địa điểm", type: "text" },
  { name: "duration", label: "Thời gian thực hiện", type: "text" },
  { name: "sort_order", label: "Thứ tự", type: "number" },
  { name: "is_active", label: "Hiển thị", type: "switch" },
  { name: "image", label: "Ảnh dự án", type: "image" },
  { name: "description", label: "Mô tả", type: "textarea" },
];

const columns: Column[] = [
  { key: "name", label: "Dự án", className: "font-medium" },
  { key: "category", label: "Danh mục" },
  { key: "year", label: "Năm", className: "w-16" },
  { key: "is_active", label: "Trạng thái", render: (row) => <StatusBadge active={row.is_active} /> },
];

function ProjectsPage() {
  return (
    <CrudManager
      table="projects"
      title="Dự án tiêu biểu"
      description="Quản lý danh sách dự án và bộ lọc theo danh mục."
      fields={fields}
      columns={columns}
      searchKeys={["name", "category", "location"]}
      defaults={{ is_active: true, sort_order: 0, category: "Chuyển Kho" }}
    />
  );
}
