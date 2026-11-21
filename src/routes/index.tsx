import { createFileRoute } from "@tanstack/react-router";
import { FAQS } from "@/data/site";
import { absUrl } from "@/lib/seo";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Services } from "@/components/site/Services";
import { About } from "@/components/site/About";
import { Partners } from "@/components/site/Partners";
import { Projects } from "@/components/site/Projects";
import { Reviews } from "@/components/site/Reviews";
import { Pricing } from "@/components/site/Pricing";
import { Faq } from "@/components/site/Faq";
import { Contact } from "@/components/site/Contact";
import { ServiceAreas } from "@/components/site/ServiceAreas";
import { LatestPosts } from "@/components/site/LatestPosts";
import { postsListQuery } from "@/lib/blog-queries";
import { Footer } from "@/components/site/Footer";
import { FloatingButtons } from "@/components/site/FloatingButtons";

const TITLE = "Dịch Vụ Bốc Xếp TP.HCM Giá Tốt, Uy Tín 24/7 | Bốc Xếp Sài Gòn";
const DESC =
  "Bốc Xếp Sài Gòn cung cấp dịch vụ bốc xếp hàng hóa tại TP.HCM: kho hàng, container, nhà máy, cảng và thuê nhân công theo giờ, ngày, tháng. Báo giá minh bạch, phục vụ 24/7.";

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.prefetchQuery(postsListQuery()),
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: absUrl("/") },
      { property: "og:site_name", content: "Bốc Xếp Sài Gòn" },
    ],
    links: [{ rel: "canonical", href: absUrl("/") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f: { q: string; a: string }) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Services />
        <About />
        <Partners />
        <Projects />
        <Reviews />
        <ServiceAreas />
        <Pricing />
        <LatestPosts />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}
