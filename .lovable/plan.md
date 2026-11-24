# Kế hoạch Audit SEO chỉ đọc – bocxepsaigon.vn (Saigon Handling)

Phạm vi: chỉ đọc source và production. Không sửa code, không commit/draft, không publish, không gọi refresh Search Console, không ghi DB, không đụng tracking/form/hotline/Ads. Kết quả duy nhất: một báo cáo Markdown + bảng keyword map XLSX lưu ở Files.

## Phát hiện sơ bộ đã xác minh trong source
- Route công khai: `src/routes/index.tsx`, `dich-vu-boc-xep-tphcm.tsx`, `dich-vu/index.tsx`, `dich-vu/$slug.tsx` (14 dịch vụ), `blog/index.tsx`, `blog/$slug.tsx`, `du-an/$slug.tsx`, `ho-so-nang-luc.tsx`, `chinh-sach-bao-mat.tsx`, sitemap động `sitemap[.]xml.ts`, `public/robots.txt` (Allow toàn bộ).
- Rủi ro cannibalization: title trang chủ "Saigon Handling – Dịch Vụ Bốc Xếp Sài Gòn, Bốc Vác 24/7" và `/dich-vu-boc-xep-tphcm` "Bốc Xếp TPHCM – Thuê Bốc Xếp Tận Nơi 24/7" cùng nhắm "bốc xếp TP.HCM/Sài Gòn"; `/dich-vu` cũng nhắm "dịch vụ bốc xếp TPHCM".
- Schema: FAQPage (trang chủ, dịch vụ, dự án), Service + LocalBusiness (dịch vụ, trang TP.HCM), LocalBusiness (hồ sơ năng lực, dự án), BreadcrumbList (`src/lib/seo.ts`). LocalBusiness lặp ở nhiều trang cần kiểm tra NAP/@id thống nhất.
- Claim cần chủ xác minh: "thành lập 2015" (About.tsx, Footer.tsx), "hơn 10 năm", "80+ nhân công" (Hero.tsx, `workforceLd` minValue 80), "3 chi nhánh", "bảo hiểm hàng hóa" (ho-so-nang-luc.tsx), 24/7.
- Search Console: logic server ở `src/lib/seo-gsc.server.ts` (chỉ báo có/không có biến cấu hình, không đọc giá trị).
- Tracking cần giữ nguyên: `src/lib/google-ads.ts`, `src/lib/consent.ts`, `src/routes/__root.tsx`, tests `tracking-invariants.test.ts`, `consent-flow.test.ts`.
- Asset lớn: `src/assets/hero-warehouse.jpg` (gốc, không dùng trên hero), `team.jpg` ~207 KB, tổng `src/assets` 1,8 MB.

## Các bước audit (đều chỉ đọc)
1. Crawl production toàn bộ URL sitemap: status, redirect, title/meta, H1/H2, canonical, robots meta, JSON-LD, breadcrumbs, link nội bộ, orphan; so sánh HTML SSR với preview.
2. Keyword map: gán từng cụm (bốc xếp TP.HCM, công ty bốc xếp, bốc xếp hàng hóa, thuê nhân công, container 20/40ft, kho, nhà máy, xe tải, cảng, sân bay, đóng gói, chuyển kho) vào đúng một URL chính theo intent; đánh dấu chồng lấn giữa trang chủ, `/dich-vu-boc-xep-tphcm`, `/dich-vu`, dịch vụ và blog. Không đề xuất doorway page.
3. E-E-A-T/NAP: đối chiếu tên, hotline, email, địa chỉ chi nhánh giữa header, footer, liên hệ, schema, llms.txt; liệt kê claim cần bằng chứng.
4. Search Console: mô tả luồng lấy property, kiểm tra quyền admin, xử lý lỗi; dùng snapshot đã lưu (đọc), không refresh.
5. Performance: phân tích bundle JS/CSS, ảnh lớn, font, nguyên nhân LCP/CLS tiềm năng, đối chiếu số liệu Vitals đã có.
6. Tracking: xác nhận AW-17877629629, send_to `AW-17877629629/67t4COLM5b0dEL3128xC`, consent gating còn nguyên; ghi "không đụng".
7. Bảng ưu tiên P0/P1/P2: effort, tác động SEO dự kiến (định tính), rủi ro, URL ảnh hưởng, việc nào cần dữ liệu Search Console hoặc xác minh doanh nghiệp trước.

## Kết quả giao
- `SEO-Audit-2026-11-24/Bao-cao.md` và `Keyword-Map.xlsx` trong Files. Không thay đổi website.

## Giới hạn
- Không suy diễn thứ hạng/volume ngoài dữ liệu Search Console/Semrush đã có; không bảo đảm tăng hạng.
