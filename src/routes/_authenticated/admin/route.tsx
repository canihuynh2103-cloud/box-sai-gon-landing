import { createFileRoute, Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  BadgeDollarSign,
  FileText,
  GalleryHorizontal,
  HelpCircle,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquareQuote,
  Package,
  ShieldAlert,
  Star,
  Users,
} from "lucide-react";
import { useState } from "react";

import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/admin")({
  component: AdminLayout,
});

const NAV = [
  { to: "/admin", label: "Tổng quan", icon: LayoutDashboard, exact: true },
  { to: "/admin/posts", label: "Bài viết", icon: FileText },
  { to: "/admin/services", label: "Dịch vụ", icon: Package },
  { to: "/admin/projects", label: "Dự án", icon: GalleryHorizontal },
  { to: "/admin/reviews", label: "Đánh giá", icon: Star },
  { to: "/admin/pricing", label: "Bảng giá", icon: BadgeDollarSign },
  { to: "/admin/faqs", label: "FAQ", icon: HelpCircle },
  { to: "/admin/banners", label: "Banner", icon: MessageSquareQuote },
  { to: "/admin/users", label: "Người dùng", icon: Users },
] as const;

function AdminLayout() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [openNav, setOpenNav] = useState(false);

  const { data: access, isLoading } = useQuery({
    queryKey: ["admin", "access"],
    queryFn: async () => {
      const { data: userData } = await supabase.auth.getUser();
      const uid = userData.user?.id;
      if (!uid) return { isAdmin: false, email: "" };
      const { data } = await supabase.rpc("has_role", { _user_id: uid, _role: "admin" });
      return { isAdmin: Boolean(data), email: userData.user?.email ?? "" };
    },
  });

  const signOut = async () => {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  if (isLoading) {
    return (
      <div className="space-y-3 p-8">
        <Skeleton className="h-8 w-56" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!access?.isAdmin) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-6 text-center">
        <ShieldAlert className="h-10 w-10 text-destructive" />
        <div>
          <h1 className="font-heading text-2xl font-bold">Không có quyền truy cập</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Tài khoản {access?.email} chưa được cấp quyền quản trị.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={signOut}>
            Đăng xuất
          </Button>
          <Button asChild>
            <Link to="/">Về trang chủ</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <div className="flex min-h-screen w-full bg-muted/30">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-60 shrink-0 border-r bg-secondary text-secondary-foreground transition-transform lg:static lg:translate-x-0",
          openNav ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center gap-2 border-b border-white/10 px-4">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-xs font-bold text-primary-foreground">
            BX
          </div>
          <span className="font-heading text-lg font-bold uppercase">Admin</span>
        </div>
        <nav className="space-y-1 p-3">
          {NAV.map((item) => {
            const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpenNav(false)}
                className={cn(
                  "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-secondary-foreground/70 hover:bg-white/10 hover:text-secondary-foreground",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-0 w-full space-y-1 border-t border-white/10 p-3">
          <a
            href="/"
            className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm text-secondary-foreground/70 hover:bg-white/10"
          >
            <Home className="h-4 w-4" /> Xem website
          </a>
          <button
            onClick={signOut}
            className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm text-secondary-foreground/70 hover:bg-white/10"
          >
            <LogOut className="h-4 w-4" /> Đăng xuất
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center gap-3 border-b bg-background px-4 lg:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setOpenNav((v) => !v)}
            aria-label="Mở menu quản trị"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <span className="truncate text-sm text-muted-foreground">{access.email}</span>
        </header>
        <main className="min-w-0 flex-1 p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
