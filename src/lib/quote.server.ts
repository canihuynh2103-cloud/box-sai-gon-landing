import { sendLovableEmail, EmailAPIError } from "@lovable.dev/email-js";

/** Địa chỉ nhận yêu cầu báo giá (không đổi). */
export const QUOTE_INBOX = "saigonhandling@gmail.com";

export type QuotePayload = {
  name: string;
  phone: string;
  email?: string;
  service?: string;
  address?: string;
  message?: string;
  sourcePath?: string;
};

const esc = (v: string) =>
  v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const sentAt = () =>
  new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Asia/Ho_Chi_Minh",
  }).format(new Date());

function buildRows(p: QuotePayload) {
  return [
    ["Họ và tên", p.name],
    ["Số điện thoại", p.phone],
    ["Email khách hàng", p.email || "Không cung cấp"],
    ["Loại dịch vụ", p.service || "Chưa chọn"],
    ["Địa điểm", p.address || "Chưa cung cấp"],
    ["Thời gian dự kiến / Nội dung yêu cầu", p.message || "Chưa cung cấp"],
    ["Trang gửi yêu cầu", p.sourcePath || "/"],
    ["Thời gian gửi", sentAt()],
  ] as const;
}

export function buildQuoteEmail(p: QuotePayload) {
  const rows = buildRows(p);
  const subject = `[YÊU CẦU BÁO GIÁ] Bốc Xếp Sài Gòn - ${p.name}`;
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html = `<!doctype html><html lang="vi"><body style="margin:0;background:#ffffff;font-family:Arial,Helvetica,sans-serif;color:#111827">
<div style="max-width:640px;margin:0 auto;padding:24px">
<h1 style="font-size:20px;margin:0 0 4px">Yêu cầu báo giá mới</h1>
<p style="margin:0 0 16px;color:#6b7280;font-size:13px">Gửi từ website bocxepsaigon.vn</p>
<table style="width:100%;border-collapse:collapse;font-size:14px">
${rows
  .map(
    ([k, v]) =>
      `<tr><td style="padding:8px 10px;border:1px solid #e5e7eb;background:#f9fafb;font-weight:bold;width:38%">${esc(
        k,
      )}</td><td style="padding:8px 10px;border:1px solid #e5e7eb">${esc(String(v))}</td></tr>`,
  )
  .join("")}
</table>
<p style="margin:20px 0 0;font-size:13px;color:#6b7280">Gọi lại khách hàng: <a href="tel:${esc(
    p.phone,
  )}">${esc(p.phone)}</a></p>
</div></body></html>`;
  return { subject, html, text };
}

/**
 * Gửi email thông báo yêu cầu báo giá.
 * Trả về lý do cụ thể nếu chưa gửi được để lưu lại trong database.
 */
export async function sendQuoteEmail(
  p: QuotePayload,
  idempotencyKey: string,
): Promise<{ sent: boolean; reason?: string }> {
  const apiKey = process.env["LOVABLE_API_KEY"];
  const senderDomain = process.env["EMAIL_SENDER_DOMAIN"];

  if (!apiKey) return { sent: false, reason: "missing_LOVABLE_API_KEY" };
  if (!senderDomain) return { sent: false, reason: "missing_EMAIL_SENDER_DOMAIN" };

  const { subject, html, text } = buildQuoteEmail(p);

  try {
    const res = await sendLovableEmail(
      {
        to: QUOTE_INBOX,
        from: `Bốc Xếp Sài Gòn <bao-gia@${senderDomain}>`,
        sender_domain: senderDomain,
        subject,
        html,
        text,
        reply_to: p.email || undefined,
        purpose: "quote-request",
        idempotency_key: idempotencyKey,
      },
      { apiKey, idempotencyKey },
    );
    return res.success ? { sent: true } : { sent: false, reason: "provider_rejected" };
  } catch (err) {
    if (err instanceof EmailAPIError) {
      return { sent: false, reason: `${err.code ?? "email_api_error"} (${err.status})` };
    }
    return { sent: false, reason: err instanceof Error ? err.message : "unknown_error" };
  }
}
