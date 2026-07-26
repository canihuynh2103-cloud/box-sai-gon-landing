import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  BadgeDollarSign,
  FileText,
  GalleryHorizontal,
  HelpCircle,
  Package,
  Star,
} from "lucide-react";

import { db } from "@/lib/admin-db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: Dashboard,
});

const CARDS = [
  { table: "posts", label: "Bài viết", icon: FileText, to: "/admin/posts" },
  { table: "services", label: "Dịch vụ", icon: Package, to: "/admin/services" },
  { table: "projects", label: "Dự án", icon: GalleryHorizontal, to: "/admin/projects" },
  { table: "reviews", label: "Đánh giá", icon: Star, to: "/admin/reviews" },
  { table: "pricing_plans", label: "Gói giá", icon: BadgeDollarSign, to: "/admin/pricing" },
  { table: "faqs", label: "Câu hỏi", icon: HelpCircle, to: "/admin/faqs" },
] as const;

function Dashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "stats"],
    queryFn: async () => {
      const entries = await Promise.all(
        CARDS.map(async (card) => {
          const { count } = await db.from(card.table).select("id", { count: "exact", head: true });
          return [card.table, count ?? 0] as const;
        }),
      );
      const { data: drafts } = await db.from("posts").select("id").eq("status", "draft");
      return {
        counts: Object.fromEntries(entries) as Record<string, number>,
        drafts: drafts?.length ?? 0,
      };
    },
  });

  const { data: recent } = useQuery({
    queryKey: ["admin", "recent-posts"],
    queryFn: async () => {
      const { data } = await db
        .from("posts")
        .select("id,title,status,updated_at")
        .order("updated_at", { ascending: false })
        .limit(6);
      return data ?? [];
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold tracking-tight md:text-3xl">Tổng quan</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Quản lý toàn bộ nội dung hiển thị trên website Bốc Xếp Sài Gòn.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CARDS.map((card) => (
          <Link key={card.table} to={card.to}>
            <Card className="transition-shadow hover:shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {card.label}
                </CardTitle>
                <card.icon className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Skeleton className="h-8 w-12" />
                ) : (
                  <div className="font-heading text-3xl font-bold">
                    {data?.counts[card.table] ?? 0}
                  </div>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Bài viết cập nhật gần đây
            {data?.drafts ? (
              <Badge variant="secondary" className="ml-2">
                {data.drafts} bản nháp
              </Badge>
            ) : null}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {(recent ?? []).map((post: { id: string; title: string; status: string }) => (
            <div
              key={post.id}
              className="flex items-center justify-between gap-3 rounded-md border px-3 py-2 text-sm"
            >
              <span className="truncate">{post.title}</span>
              <Badge variant={post.status === "published" ? "default" : "secondary"}>
                {post.status === "published" ? "Đã xuất bản" : "Nháp"}
              </Badge>
            </div>
          ))}
          {recent && recent.length === 0 ? (
            <p className="text-sm text-muted-foreground">Chưa có bài viết nào.</p>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
