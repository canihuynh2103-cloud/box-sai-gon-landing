/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Clock, Loader2, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PostEditor } from "@/components/admin/PostEditor";
import { deleteRow, listRows, type Row } from "@/lib/admin-db";

export const Route = createFileRoute("/_authenticated/admin/posts")({
  component: PostsPage,
});

function PostsPage() {
  const qc = useQueryClient();
  const [editor, setEditor] = useState<{ open: boolean; post: Row | null }>({
    open: false,
    post: null,
  });
  const [deleteTarget, setDeleteTarget] = useState<Row | null>(null);
  const [query, setQuery] = useState("");

  const { data = [], isLoading } = useQuery({
    queryKey: ["admin", "posts"],
    queryFn: () => listRows("posts", { column: "sort_order", ascending: true }),
  });

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data;
    return data.filter((row) =>
      ["title", "category", "author"].some((key) =>
        String(row[key] ?? "").toLowerCase().includes(q),
      ),
    );
  }, [data, query]);

  const remove = useMutation({
    mutationFn: (id: string) => deleteRow("posts", id),
    onSuccess: () => {
      toast.success("Đã xoá");
      qc.invalidateQueries({ queryKey: ["admin", "posts"] });
      qc.invalidateQueries({ queryKey: ["content"] });
      setDeleteTarget(null);
    },
    onError: (error: any) => toast.error(error?.message ?? "Xoá thất bại"),
  });

  if (editor.open) {
    return (
      <PostEditor
        post={editor.post}
        onClose={() => {
          setEditor({ open: false, post: null });
          qc.invalidateQueries({ queryKey: ["admin", "posts"] });
        }}
      />
    );
  }

  const statusOf = (row: Row) => {
    if (row.status !== "published") return <Badge variant="secondary">Nháp</Badge>;
    if (row.published_at && new Date(row.published_at) > new Date())
      return (
        <Badge variant="outline" className="gap-1">
          <Clock className="h-3 w-3" /> Đã hẹn giờ
        </Badge>
      );
    return <Badge>Đã xuất bản</Badge>;
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight md:text-3xl">Bài viết</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Soạn thảo dạng khối, tự lưu nháp, SEO đầy đủ và hẹn giờ xuất bản.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm kiếm..."
              className="w-40 pl-8 sm:w-56"
            />
          </div>
          <Button onClick={() => setEditor({ open: true, post: null })}>
            <Plus className="mr-1.5 h-4 w-4" /> Thêm mới
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tiêu đề</TableHead>
              <TableHead>Danh mục</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Ngày xuất bản</TableHead>
              <TableHead>Cập nhật</TableHead>
              <TableHead className="w-24 text-right">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="py-10 text-center">
                  <Loader2 className="mx-auto h-5 w-5 animate-spin text-muted-foreground" />
                </TableCell>
              </TableRow>
            ) : rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-10 text-center text-sm text-muted-foreground">
                  Chưa có bài viết.
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-medium">
                    <button
                      type="button"
                      className="text-left hover:text-primary"
                      onClick={() => setEditor({ open: true, post: row })}
                    >
                      {row.title}
                    </button>
                    <span className="ml-2 text-xs text-muted-foreground">
                      {row.reading_time ? `${row.reading_time} phút đọc` : null}
                    </span>
                  </TableCell>
                  <TableCell>{row.category ?? "—"}</TableCell>
                  <TableCell>{statusOf(row)}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {row.published_at ? new Date(row.published_at).toLocaleString("vi-VN") : "—"}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {row.updated_at ? new Date(row.updated_at).toLocaleDateString("vi-VN") : "—"}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8"
                        onClick={() => setEditor({ open: true, post: row })}
                      >
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

      <AlertDialog open={Boolean(deleteTarget)} onOpenChange={(o) => !o && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xoá bài viết này?</AlertDialogTitle>
            <AlertDialogDescription>
              Hành động này không thể hoàn tác. Bài viết sẽ bị xoá khỏi website.
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
