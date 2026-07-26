/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { deleteRow, listRows, saveRow, slugify, type Row, type TableName } from "@/lib/admin-db";

export type FieldType =
  | "text"
  | "textarea"
  | "richtext"
  | "number"
  | "switch"
  | "image"
  | "list"
  | "select"
  | "slug";

export type Field = {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: { value: string; label: string }[];
  from?: string; // slug source field
  full?: boolean;
  help?: string;
};

export type Column = {
  key: string;
  label: string;
  render?: (row: Row) => React.ReactNode;
  className?: string;
};

type Props = {
  table: TableName;
  title: string;
  description: string;
  fields: Field[];
  columns: Column[];
  defaults?: Row;
  order?: { column: string; ascending?: boolean };
  searchKeys?: string[];
};

export function CrudManager({
  table,
  title,
  description,
  fields,
  columns,
  defaults = {},
  order,
  searchKeys = [],
}: Props) {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Row | null>(null);
  const [values, setValues] = useState<Row>({});
  const [deleteTarget, setDeleteTarget] = useState<Row | null>(null);
  const [query, setQuery] = useState("");

  const { data = [], isLoading } = useQuery({
    queryKey: ["admin", table],
    queryFn: () => listRows(table, order),
  });

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q || searchKeys.length === 0) return data;
    return data.filter((row) =>
      searchKeys.some((key) => String(row[key] ?? "").toLowerCase().includes(q)),
    );
  }, [data, query, searchKeys]);

  const save = useMutation({
    mutationFn: async () => {
      const payload: Row = { ...values };
      fields.forEach((field) => {
        if (field.type === "number") payload[field.name] = Number(payload[field.name] ?? 0);
        if (field.type === "list" && typeof payload[field.name] === "string") {
          payload[field.name] = String(payload[field.name])
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean);
        }
      });
      delete payload.id;
      delete payload.created_at;
      delete payload.updated_at;
      await saveRow(table, payload, editing?.id);
    },
    onSuccess: () => {
      toast.success(editing ? "Đã cập nhật" : "Đã thêm mới");
      qc.invalidateQueries({ queryKey: ["admin", table] });
      qc.invalidateQueries({ queryKey: ["content"] });
      setOpen(false);
    },
    onError: (error: any) => toast.error(error?.message ?? "Lưu thất bại"),
  });

  const remove = useMutation({
    mutationFn: (id: string) => deleteRow(table, id),
    onSuccess: () => {
      toast.success("Đã xoá");
      qc.invalidateQueries({ queryKey: ["admin", table] });
      qc.invalidateQueries({ queryKey: ["content"] });
      setDeleteTarget(null);
    },
    onError: (error: any) => toast.error(error?.message ?? "Xoá thất bại"),
  });

  const openCreate = () => {
    setEditing(null);
    setValues({ ...defaults });
    setOpen(true);
  };

  const openEdit = (row: Row) => {
    setEditing(row);
    const next: Row = { ...row };
    fields.forEach((field) => {
      if (field.type === "list" && Array.isArray(next[field.name])) {
        next[field.name] = (next[field.name] as string[]).join("\n");
      }
    });
    setValues(next);
    setOpen(true);
  };

  const set = (name: string, value: any) => setValues((prev) => ({ ...prev, [name]: value }));

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight md:text-3xl">{title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="flex items-center gap-2">
          {searchKeys.length > 0 ? (
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tìm kiếm..."
                className="w-40 pl-8 sm:w-56"
              />
            </div>
          ) : null}
          <Button onClick={openCreate}>
            <Plus className="mr-1.5 h-4 w-4" /> Thêm mới
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.key} className={column.className}>
                  {column.label}
                </TableHead>
              ))}
              <TableHead className="w-24 text-right">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length + 1} className="py-10 text-center">
                  <Loader2 className="mx-auto h-5 w-5 animate-spin text-muted-foreground" />
                </TableCell>
              </TableRow>
            ) : rows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  className="py-10 text-center text-sm text-muted-foreground"
                >
                  Chưa có dữ liệu.
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
                <TableRow key={row.id}>
                  {columns.map((column) => (
                    <TableCell key={column.key} className={column.className}>
                      {column.render ? column.render(row) : String(row[column.key] ?? "—")}
                    </TableCell>
                  ))}
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => openEdit(row)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-destructive"
                        onClick={() => setDeleteTarget(row)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? `Sửa: ${title}` : `Thêm ${title.toLowerCase()}`}</DialogTitle>
            <DialogDescription>Điền thông tin bên dưới rồi nhấn Lưu.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 sm:grid-cols-2">
            {fields.map((field) => (
              <div
                key={field.name}
                className={
                  field.full || ["richtext", "textarea", "image", "list"].includes(field.type)
                    ? "space-y-2 sm:col-span-2"
                    : "space-y-2"
                }
              >
                <Label htmlFor={field.name}>{field.label}</Label>
                {field.type === "textarea" ? (
                  <Textarea
                    id={field.name}
                    rows={3}
                    value={values[field.name] ?? ""}
                    placeholder={field.placeholder}
                    onChange={(e) => set(field.name, e.target.value)}
                  />
                ) : field.type === "list" ? (
                  <Textarea
                    id={field.name}
                    rows={5}
                    value={values[field.name] ?? ""}
                    placeholder={field.placeholder ?? "Mỗi dòng một mục"}
                    onChange={(e) => set(field.name, e.target.value)}
                  />
                ) : field.type === "richtext" ? (
                  <RichTextEditor
                    value={values[field.name] ?? ""}
                    onChange={(html) => set(field.name, html)}
                    placeholder={field.placeholder}
                  />
                ) : field.type === "image" ? (
                  <ImageUpload value={values[field.name]} onChange={(url) => set(field.name, url)} />
                ) : field.type === "switch" ? (
                  <div className="flex h-10 items-center">
                    <Switch
                      id={field.name}
                      checked={Boolean(values[field.name])}
                      onCheckedChange={(checked) => set(field.name, checked)}
                    />
                  </div>
                ) : field.type === "select" ? (
                  <Select
                    value={values[field.name] ?? ""}
                    onValueChange={(value) => set(field.name, value)}
                  >
                    <SelectTrigger id={field.name}>
                      <SelectValue placeholder="Chọn..." />
                    </SelectTrigger>
                    <SelectContent>
                      {(field.options ?? []).map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : field.type === "slug" ? (
                  <div className="flex gap-2">
                    <Input
                      id={field.name}
                      value={values[field.name] ?? ""}
                      placeholder={field.placeholder}
                      onChange={(e) => set(field.name, e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => set(field.name, slugify(String(values[field.from ?? "title"] ?? "")))}
                    >
                      Tạo
                    </Button>
                  </div>
                ) : (
                  <Input
                    id={field.name}
                    type={field.type === "number" ? "number" : "text"}
                    value={values[field.name] ?? ""}
                    placeholder={field.placeholder}
                    onChange={(e) => set(field.name, e.target.value)}
                  />
                )}
                {field.help ? (
                  <p className="text-xs text-muted-foreground">{field.help}</p>
                ) : null}
              </div>
            ))}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Huỷ
            </Button>
            <Button onClick={() => save.mutate()} disabled={save.isPending}>
              {save.isPending ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> : null}
              Lưu
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={Boolean(deleteTarget)} onOpenChange={(o) => !o && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xoá mục này?</AlertDialogTitle>
            <AlertDialogDescription>
              Hành động này không thể hoàn tác. Nội dung sẽ bị xoá khỏi website.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Huỷ</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteTarget && remove.mutate(deleteTarget.id)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Xoá
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export function StatusBadge({ active, labels }: { active: boolean; labels?: [string, string] }) {
  const [on, off] = labels ?? ["Đang bật", "Đã tắt"];
  return <Badge variant={active ? "default" : "secondary"}>{active ? on : off}</Badge>;
}
