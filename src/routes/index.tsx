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
import { Footer } from "@/components/site/Footer";
import { FloatingButtons } from "@/components/site/FloatingButtons";

const TITLE = "Bốc Xếp Sài Gòn — Dịch Vụ Bốc Xếp Hàng Hóa TP.HCM 24/7";
const DESC =
  "Dịch vụ bốc xếp hàng hóa, thuê nhân công, chuyển kho - nhà - văn phòng tại TP.HCM. 10+ năm kinh nghiệm, 80+ nhân công, báo giá minh bạch, hotline 24/7.";

export const Route = createFileRoute("/")({
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
        <Pricing />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}
