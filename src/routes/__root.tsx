import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { supabase } from "@/integrations/supabase/client";
import { Toaster } from "@/components/ui/sonner";


function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Không tìm thấy trang</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Trang bạn tìm không tồn tại hoặc đã được chuyển. Vui lòng quay lại trang chủ hoặc gọi
          hotline 0888.997.822 để được hỗ trợ.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="cta-press inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Về trang chủ
          </Link>

        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Bốc Xếp Sài Gòn" },
      { name: "description", content: "Dịch vụ bốc xếp hàng hóa chuyên nghiệp tại TP.HCM." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:site_name", content: "Bốc Xếp Sài Gòn" },
      { property: "og:locale", content: "vi_VN" },
      { name: "robots", content: "index, follow, max-image-preview:large" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Bốc Xếp Sài Gòn",
          url: "https://bocxepsaigon.vn",
          telephone: "+84888997822",
          email: "saigonhandling@gmail.com",
          image: "https://bocxepsaigon.vn/logo-og.png",
          logo: "https://bocxepsaigon.vn/logo-og.png",
          address: {
            "@type": "PostalAddress",
            streetAddress: "234 Tô Ngọc Vân",
            addressLocality: "Thủ Đức",
            addressRegion: "TP.HCM",
            addressCountry: "VN",
          },
          areaServed: ["Thành phố Hồ Chí Minh", "Bình Dương", "Đồng Nai", "Long An"],
          openingHours: "Mo-Su 06:00-22:00",
          priceRange: "$$",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Bốc Xếp Sài Gòn",
          alternateName: "Sai Gon Cargo Handling",
          url: "https://bocxepsaigon.vn",
          logo: {
            "@type": "ImageObject",
            url: "https://bocxepsaigon.vn/logo-og.png",
            width: 512,
            height: 512,
          },
          image: "https://bocxepsaigon.vn/logo-og.png",
          telephone: "+84888997822",
          email: "saigonhandling@gmail.com",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Bốc Xếp Sài Gòn",
          url: "https://bocxepsaigon.vn",
          inLanguage: "vi-VN",
          publisher: {
            "@type": "Organization",
            name: "Bốc Xếp Sài Gòn",
            logo: "https://bocxepsaigon.vn/logo-og.png",
          },
        }),
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap",
      },
      { rel: "icon", href: "/favicon.png", type: "image/png", sizes: "64x64" },
      { rel: "icon", href: "/logo-circle.png", type: "image/png", sizes: "512x512" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="vi">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const router = useRouter();

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
      router.invalidate();
      if (event !== "SIGNED_OUT") queryClient.invalidateQueries();
    });
    return () => data.subscription.unsubscribe();
  }, [router, queryClient]);

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <Toaster richColors position="top-right" />
    </QueryClientProvider>
  );
}

