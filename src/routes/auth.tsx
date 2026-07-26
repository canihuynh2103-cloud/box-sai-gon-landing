import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Loader2, Lock } from "lucide-react";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TITLE = "Đăng Nhập Quản Trị — Bốc Xếp Sài Gòn";
const DESC = "Trang đăng nhập dành cho quản trị viên website Bốc Xếp Sài Gòn.";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);

  const signIn = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    navigate({ to: "/admin", replace: true });
  };

  const resetPassword = async () => {
    if (!email) {
      toast.error("Nhập email của bạn trước khi đặt lại mật khẩu.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Đã gửi email đặt lại mật khẩu. Kiểm tra hộp thư (cả mục Spam).");
  };

  const signUp = async () => {

    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/admin`,
        data: { full_name: fullName },
      },
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Đã tạo tài khoản. Kiểm tra email nếu cần xác nhận, sau đó đăng nhập.");
  };

  const signInWithGoogle = async () => {
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin + "/auth",
    });
    if (result.error) {
      toast.error("Không thể đăng nhập Google. Vui lòng thử lại.");
      return;
    }
    if (result.redirected) return;
    navigate({ to: "/admin", replace: true });
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-secondary px-4 py-10">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Lock className="h-5 w-5" />
          </div>
          <CardTitle className="font-heading text-2xl">Quản Trị Website</CardTitle>
          <CardDescription>Bốc Xếp Sài Gòn — khu vực dành cho quản trị viên</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Đăng nhập</TabsTrigger>
              <TabsTrigger value="signup">Tạo tài khoản</TabsTrigger>
            </TabsList>

            <TabsContent value="signin" className="mt-4 space-y-3">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Mật khẩu</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && signIn()}
                />
              </div>
              <Button className="w-full" onClick={signIn} disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Đăng nhập
              </Button>
            </TabsContent>

            <TabsContent value="signup" className="mt-4 space-y-3">
              <div className="space-y-2">
                <Label htmlFor="name">Họ tên</Label>
                <Input id="name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email2">Email</Label>
                <Input id="email2" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password2">Mật khẩu</Label>
                <Input
                  id="password2"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button className="w-full" onClick={signUp} disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Tạo tài khoản
              </Button>
              <p className="text-xs text-muted-foreground">
                Tài khoản đầu tiên được cấp quyền admin tự động. Các tài khoản sau cần admin phân quyền.
              </p>
            </TabsContent>
          </Tabs>

          <div className="my-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">hoặc</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <Button variant="outline" className="w-full" onClick={signInWithGoogle}>
            Tiếp tục với Google
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
