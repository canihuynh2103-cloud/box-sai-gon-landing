import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingButtons } from "@/components/site/FloatingButtons";
import { EMAIL } from "@/data/site";
import { breadcrumbLd, metaFor } from "@/lib/seo";
import { ADS_ID, POLICY_PATH } from "@/lib/consent";

const TITLE = "Chính Sách Bảo Mật — Bốc Xếp Sài Gòn";
const DESC =
  "Chính sách bảo mật và xử lý cookie của Bốc Xếp Sài Gòn: dữ liệu thu thập, Google Ads, mục đích đo lường quảng cáo, quyền đồng ý và cách rút lại đồng ý.";

export const Route = createFileRoute(POLICY_PATH as "/chinh-sach-bao-mat")({
  head: () => {
    const base = metaFor({ title: TITLE, description: DESC, path: POLICY_PATH });
    return {
      ...base,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbLd([
              { name: "Trang chủ", path: "/" },
              { name: "Chính sách bảo mật", path: POLICY_PATH },
            ]),
          ),
        },
      ],
    };
  },
  component: PrivacyPolicyPage,
});

function H2({ children }: { children: string }) {
  return <h2 className="mt-8 font-heading text-xl font-bold uppercase tracking-tight">{children}</h2>;
}

function P({ children }: { children: string }) {
  return <p className="mt-3 leading-relaxed text-muted-foreground">{children}</p>;
}

function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto max-w-3xl px-4 pb-16 pt-44 lg:pt-32">
        <nav aria-label="Breadcrumb" className="mb-4 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">
            Trang chủ
          </Link>
          <span className="mx-1.5">/</span>
          <span className="text-foreground">Chính sách bảo mật</span>
        </nav>

        <h1 className="font-heading text-3xl font-bold uppercase tracking-tight md:text-4xl">
          Chính Sách Bảo Mật
        </h1>
        <p className="mt-2 text-muted-foreground">
          Áp dụng cho website bocxepsaigon.vn. Cập nhật lần cuối: tháng 10/2026.
        </p>

        <H2>1. Dữ liệu chúng tôi xử lý</H2>
        <P>
          Khi bạn truy cập website, một số dữ liệu kỹ thuật và cookie có thể được lưu hoặc
          đọc trên thiết bị của bạn: nhận diện phiên truy cập, thời gian truy cập, trang bạn
          xem và dữ liệu quảng cáo (như việc bạn từng bấm vào quảng cáo nào). Chúng tôi không
          thu thập dữ liệu nhạy cảm và không bán dữ liệu cá nhân.
        </P>

        <H2>2. Cookie quảng cáo và Google Ads</H2>
        <P>
          Website cài Google Ads tag (mã đo lường {ADS_ID}) do Google Ireland Limited và các
          công ty liên kết của Google cung cấp. Cookie của Google Ads giúp đo lường hiệu quả
          quảng cáo (lượt nhấp, lượt hiển thị) và — khi bạn đồng ý — đo lường và tối ưu các
          chuyển đổi như yêu cầu báo giá hoặc gọi điện qua nút hotline.
        </P>
        <P>
          Mặc định, ở các khu vực pháp luật yêu cầu sự đồng ý (bao gồm Việt Nam, EEA, Vương
          quốc Anh và Thụy Sĩ), cookie quảng cáo bị tắt cho đến khi bạn chọn "Chấp nhận" trên
          banner cookie. Bạn có thể rút lại hoặc thay đổi lựa chọn bất cứ lúc nào qua mục
          "Cài đặt cookie" ở chân trang.
        </P>

        <H2>3. Mục đích sử dụng dữ liệu</H2>
        <P>
          - Đo lường lượt truy cập và hiệu quả quảng cáo. - Tối ưu chiến dịch quảng cáo của
          chúng tôi. - Xử lý yêu cầu báo giá mà bạn gửi qua form (email, số điện thoại, nội
          dung yêu cầu) để liên hệ tư vấn.
        </P>

        <H2>4. Quyền của bạn và cách từ chối</H2>
        <P>
          Bạn có quyền từ chối cookie quảng cáo ngay trên banner, hoặc rút lại đồng ý sau đó
          qua "Cài đặt cookie" ở chân trang mọi trang. Việc từ chối cookie quảng cáo không
          ảnh hưởng tới việc bạn sử dụng các chức năng của website. Lựa chọn của bạn được lưu
          trên thiết bị của bạn và được áp dụng ngay lập tức.
        </P>

        <H2>5. Lưu trữ và liên hệ</H2>
        <P>
          Lựa chọn cookie được lưu trên trình duyệt của bạn cho đến khi bạn xoá dữ liệu
          trình duyệt. Dữ liệu yêu cầu báo giá chỉ được dùng để phản hồi yêu cầu của bạn.
          Mọi câu hỏi về bảo mật dữ liệu, vui lòng liên hệ {EMAIL} hoặc hotline
          0888.997.822.
        </P>
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}
