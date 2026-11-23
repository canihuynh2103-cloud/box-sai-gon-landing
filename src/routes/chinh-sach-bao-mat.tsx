import type { ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingButtons } from "@/components/site/FloatingButtons";
import { EMAIL } from "@/data/site";
import { breadcrumbLd, metaFor } from "@/lib/seo";
import { ADS_ID, POLICY_PATH } from "@/lib/google-ads";

const TITLE = "Chính Sách Bảo Mật — Saigon Handling";
const DESC =
  "Chính sách bảo mật và xử lý cookie của Saigon Handling: dữ liệu thu thập, Google Ads, mục đích đo lường quảng cáo, quyền đồng ý và cách rút lại đồng ý.";

export const Route = createFileRoute("/chinh-sach-bao-mat")({
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

function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className="mt-8 font-heading text-xl font-bold uppercase tracking-tight">{children}</h2>
  );
}

function P({ children }: { children: ReactNode }) {
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
          Áp dụng cho website bocxepsaigon.vn. Cập nhật lần cuối: 23/11/2026.
        </p>

        <H2>1. Dữ liệu chúng tôi xử lý</H2>
        <P>
          Website ghi nhận lượt truy cập, thời gian trên trang, tốc độ tải và lỗi bằng công cụ phân
          tích không dùng cookie, không lưu thông tin trên thiết bị và không xác định danh tính
          người truy cập. Khi bạn đồng ý với các mục đích tương ứng, website có thể đo thêm lượt
          nhấp; cookie quảng cáo có thể được lưu hoặc đọc trên thiết bị để đo hiệu quả quảng cáo.
          Chúng tôi không thu thập dữ liệu nhạy cảm và không bán dữ liệu cá nhân.
        </P>

        <H2>2. Cookie quảng cáo và Google Ads</H2>
        <P>
          Website sử dụng thẻ Google Ads (mã đo lường {ADS_ID}) do Google cung cấp để đo hiệu quả
          quảng cáo. Thẻ này, bao gồm tệp gtag.js, chỉ được tải sau khi bạn bật mục Quảng cáo
          (advertising). Chuyển đổi yêu cầu báo giá chỉ được gửi sau khi hệ thống xử lý biểu mẫu xác
          nhận thành công và bạn đã đồng ý quảng cáo. Nếu bạn từ chối quảng cáo, website không gửi
          chuyển đổi này. Lượt bấm nút gọi hotline không được gửi dưới dạng chuyển đổi Google Ads.
        </P>
        <P>
          Từ ngày 23/11/2026, tín hiệu đồng ý cho Phân tích (analytics) và Quảng cáo (advertising)
          đều mặc định là từ chối (denied) ở mọi quốc gia, bao gồm Việt Nam, EU/EEA, Vương quốc Anh,
          Thụy Sĩ, Canada và trường hợp không xác định được khu vực. Website không tải thẻ quảng cáo
          trước khi bạn bật quảng cáo. Việc đếm lượt truy cập, thời gian trên trang, tốc độ tải và
          lỗi không dùng cookie nêu ở mục 1 vẫn diễn ra; phân tích bổ sung chờ lựa chọn của bạn.
        </P>

        <H2>3. Mục đích sử dụng dữ liệu</H2>
        <P>
          - Đo lường lượt truy cập và hiệu quả quảng cáo. - Tối ưu chiến dịch quảng cáo của chúng
          tôi. - Xử lý yêu cầu báo giá mà bạn gửi qua form (email, số điện thoại, nội dung yêu cầu)
          để liên hệ tư vấn.
        </P>

        <H2>4. Quyền của bạn và cách từ chối</H2>
        <P>
          Banner có nút Chấp nhận và Từ chối cho cả hai mục đích. Trong Cài đặt cookie, bạn có thể
          bật hoặc tắt riêng Phân tích và Quảng cáo rồi lưu lựa chọn; lựa chọn cho một mục đích
          không thay thế lựa chọn cho mục đích còn lại. Bạn có thể đổi hoặc rút lại đồng ý bất cứ
          lúc nào qua liên kết Cài đặt cookie ở cuối trang. Bỏ qua banner không được coi là đồng ý.
        </P>
        <P>
          Khi trình duyệt gửi tín hiệu Global Privacy Control (GPC), Phân tích bổ sung và Quảng cáo
          được coi là từ chối, kể cả khi trước đó bạn đã đồng ý. Các công tắc tương ứng hiển thị tắt
          và không thể bật. Khi bạn rút lại đồng ý quảng cáo, website cập nhật tín hiệu denied và
          không gửi thêm chuyển đổi báo giá. Việc này không tự xóa cookie Google đã có hoặc gỡ mã đã
          tải; sau khi tải lại trang, thẻ quảng cáo không được tải nếu bạn vẫn từ chối.
        </P>
        <P>
          Bạn có thể chặn hoặc xoá cookie trong cài đặt trình duyệt, hoặc tắt quảng cáo được cá nhân
          hoá tại trang Cài đặt quảng cáo của Google (adssettings.google.com). Việc này không ảnh
          hưởng tới việc bạn sử dụng các chức năng của website.
        </P>

        <H2>5. Lưu trữ và liên hệ</H2>
        <P>
          Website lưu quyết định riêng cho từng mục đích, thời điểm lựa chọn (timestamp) và phiên
          bản thông báo (notice version) 2026-11-23-v2 trên trình duyệt. Lựa chọn đồng ý (granted)
          chỉ được sử dụng khi phiên bản thông báo còn phù hợp và chưa đủ 183 ngày kể từ lần lưu lựa
          chọn. Sau 183 ngày hoặc khi phiên bản thông báo thay đổi, website yêu cầu bạn chọn lại và
          không sử dụng lựa chọn đồng ý cũ để bật theo dõi. Nếu bạn xóa dữ liệu trình duyệt, website
          sẽ hỏi lại; nếu trình duyệt chặn lưu trữ, lựa chọn chỉ có hiệu lực trong phiên trang hiện
          tại và được hỏi lại khi tải lại trang.
        </P>
        <P>
          Dữ liệu yêu cầu báo giá chỉ được dùng để phản hồi yêu cầu của bạn. Mọi câu hỏi về bảo mật
          dữ liệu, vui lòng liên hệ {EMAIL} hoặc hotline 0888.997.822.
        </P>
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}
