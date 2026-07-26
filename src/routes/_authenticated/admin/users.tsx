/* eslint-disable @typescript-eslint/no-explicit-any */
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import { db } from "@/lib/admin-db";
import { supabase } from "@/integrations/supabase/client";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/_authenticated/admin/users")({
  component: UsersPage,
});

type UserRow = {
  id: string;
  email: string | null;
  full_name: string | null;
  created_at: string;
  roles: string[];
};

function UsersPage() {
  const qc = useQueryClient();

  const { data: me } = useQuery({
    queryKey: ["admin", "me"],
    queryFn: async () => (await supabase.auth.getUser()).data.user?.id ?? "",
  });

  const { data = [], isLoading } = useQuery<UserRow[]>({
    queryKey: ["admin", "users"],
    queryFn: async () => {
      const { data: profiles, error } = await db
        .from("profiles")
        .select("id,email,full_name,created_at")
        .order("created_at", { ascending: true });
      if (error) throw error;
      const { data: roles } = await db.from("user_roles").select("user_id,role");
      return (profiles ?? []).map((profile: any) => ({
        ...profile,
        roles: (roles ?? [])
          .filter((role: any) => role.user_id === profile.id)
          .map((role: any) => role.role as string),
      }));
    },
  });

  const toggleRole = useMutation({
    mutationFn: async ({
      userId,
      role,
      enabled,
    }: {
      userId: string;
      role: "admin" | "editor";
      enabled: boolean;
    }) => {
      if (enabled) {
        const { error } = await db.from("user_roles").insert({ user_id: userId, role });
        if (error) throw error;
      } else {
        const { error } = await db
          .from("user_roles")
          .delete()
          .eq("user_id", userId)
          .eq("role", role);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success("Đã cập nhật quyền");
      qc.invalidateQueries({ queryKey: ["admin", "users"] });
    },
    onError: (error: any) => toast.error(error?.message ?? "Cập nhật quyền thất bại"),
  });

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-heading text-2xl font-bold tracking-tight md:text-3xl">Người dùng</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Phân quyền quản trị viên (admin) và biên tập viên (editor) cho các tài khoản đã đăng ký.
        </p>
      </div>

      <div className="overflow-x-auto rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Họ tên</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Quyền hiện tại</TableHead>
              <TableHead className="w-28">Admin</TableHead>
              <TableHead className="w-28">Editor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="py-10 text-center">
                  <Loader2 className="mx-auto h-5 w-5 animate-spin text-muted-foreground" />
                </TableCell>
              </TableRow>
            ) : (
              data.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    {user.full_name ?? "—"}
                    {user.id === me ? (
                      <Badge variant="secondary" className="ml-2">
                        Bạn
                      </Badge>
                    ) : null}
                  </TableCell>
                  <TableCell>{user.email ?? "—"}</TableCell>
                  <TableCell>
                    {user.roles.length === 0 ? (
                      <span className="text-sm text-muted-foreground">Chưa có quyền</span>
                    ) : (
                      <div className="flex gap-1">
                        {user.roles.map((role) => (
                          <Badge key={role} variant={role === "admin" ? "default" : "secondary"}>
                            <ShieldCheck className="mr-1 h-3 w-3" />
                            {role}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </TableCell>
                  {(["admin", "editor"] as const).map((role) => (
                    <TableCell key={role}>
                      <Label className="sr-only" htmlFor={`${user.id}-${role}`}>
                        {role}
                      </Label>
                      <Switch
                        id={`${user.id}-${role}`}
                        checked={user.roles.includes(role)}
                        disabled={user.id === me && role === "admin"}
                        onCheckedChange={(checked) =>
                          toggleRole.mutate({ userId: user.id, role, enabled: checked })
                        }
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <p className="text-xs text-muted-foreground">
        Bạn không thể tự bỏ quyền admin của chính mình để tránh mất quyền truy cập.
      </p>
    </div>
  );
}
