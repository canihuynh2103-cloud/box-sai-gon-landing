import { createFileRoute } from "@tanstack/react-router";
import { CrudManager, StatusBadge, type Field, type Column } from "@/components/admin/CrudManager";

export const Route = createFileRoute("/_authenticated/admin/faqs")({
  component: FaqsPage,
});

const fields: Field[] = [
  { name: "question", label: "Câu hỏi", type: "text", full: true },
  { name: "sort_order", label: "Thứ tự", type: "number" },
  { name: "is_active", label: "Hiển thị", type: "switch" },
  { name: "answer", label: "Câu trả lời", type: "textarea" },
];

const columns: Column[] = [
  { key: "question", label: "Câu hỏi", className: "font-medium" },
  { key: "is_active", label: "Trạng thái", render: (row) => <StatusBadge active={row.is_active} /> },
  { key: "sort_order", label: "Thứ tự", className: "w-16" },
];

function FaqsPage() {
  return (
    <CrudManager
      table="faqs"
      title="Câu hỏi thường gặp"
      description="Quản lý nội dung mục FAQ dạng accordion trên trang chủ."
      fields={fields}
      columns={columns}
      searchKeys={["question", "answer"]}
      defaults={{ is_active: true, sort_order: 0 }}
    />
  );
}
