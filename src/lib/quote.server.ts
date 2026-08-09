/** Địa chỉ nhận yêu cầu báo giá (không đổi). */
export const QUOTE_INBOX = "saigonhandling@gmail.com";

export type QuotePayload = {
  name: string;
  phone: string;
  email?: string;
  service?: string;
  address?: string;
  message?: string;
  preferredTime?: string;
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
    ["Thời gian dự kiến", p.preferredTime || "Chưa cung cấp"],
    ["Nội dung yêu cầu", p.message || "Chưa cung cấp"],
    ["Trang gửi yêu cầu", p.sourcePath || "/"],
    ["Thời gian gửi", sentAt()],
  ] as const;
}

export function buildQuoteEmail(p: QuotePayload) {
  const rows = buildRows(p);
  const subject = `Yêu cầu báo giá mới - Bốc Xếp Sài Gòn (${p.name} - ${p.phone})`;
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  const tel = p.phone.replace(/[^0-9+]/g, "");
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
<p style="margin:20px 0 0"><a href="tel:${esc(tel)}" style="display:inline-block;background:#dc2626;color:#ffffff;text-decoration:none;padding:12px 20px;border-radius:6px;font-weight:bold">Gọi khách hàng: ${esc(p.phone)}</a></p>
</div></body></html>`;
  return { subject, html, text };
}

export function buildCustomerEmail(p: QuotePayload) {
  const subject = "Bốc Xếp Sài Gòn đã nhận yêu cầu báo giá của bạn";
  const text = `Xin chào ${p.name},\n\nChúng tôi đã nhận được yêu cầu báo giá của bạn và sẽ liên hệ trong ít phút.\nDịch vụ: ${p.service || "Chưa chọn"}\nThời gian dự kiến: ${p.preferredTime || "Chưa cung cấp"}\n\nHotline 24/7: 0888.997.822\nBốc Xếp Sài Gòn - bocxepsaigon.vn`;
  const html = `<!doctype html><html lang="vi"><body style="margin:0;background:#ffffff;font-family:Arial,Helvetica,sans-serif;color:#111827">
<div style="max-width:640px;margin:0 auto;padding:24px">
<h1 style="font-size:20px;margin:0 0 8px">Cảm ơn ${esc(p.name)}!</h1>
<p style="font-size:14px;line-height:1.6">Chúng tôi đã nhận được yêu cầu báo giá của bạn. Bộ phận điều phối sẽ liên hệ tư vấn trong ít phút.</p>
<p style="font-size:14px;line-height:1.6">Dịch vụ: <b>${esc(p.service || "Chưa chọn")}</b><br/>Thời gian dự kiến: <b>${esc(p.preferredTime || "Chưa cung cấp")}</b></p>
<p style="margin:20px 0 0"><a href="tel:0888997822" style="display:inline-block;background:#dc2626;color:#ffffff;text-decoration:none;padding:12px 20px;border-radius:6px;font-weight:bold">Hotline 24/7: 0888.997.822</a></p>
<p style="margin:20px 0 0;font-size:12px;color:#6b7280">Bốc Xếp Sài Gòn - bocxepsaigon.vn</p>
</div></body></html>`;
  return { subject, html, text };
}

type SendArgs = {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
};

/**
 * Gửi email qua Resend HTTP API (chỉ cần API key, không cần NS record/nameserver).
 * FROM mặc định dùng onboarding@resend.dev (chỉ gửi được tới email chủ tài khoản Resend);
 * đặt RESEND_FROM_EMAIL sau khi verify domain để gửi cho khách hàng.
 */
async function sendViaResend(args: SendArgs): Promise<{ sent: boolean; reason?: string }> {
  const apiKey = process.env["RESEND_API_KEY"];
  if (!apiKey) return { sent: false, reason: "missing_RESEND_API_KEY" };

  const from = process.env["RESEND_FROM_EMAIL"] || "Bốc Xếp Sài Gòn <onboarding@resend.dev>";

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from,
        to: [args.to],
        subject: args.subject,
        html: args.html,
        text: args.text,
        ...(args.replyTo ? { reply_to: args.replyTo } : {}),
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error(`[quote] resend failed [${res.status}]: ${body}`);
      return { sent: false, reason: `resend_${res.status}: ${body.slice(0, 200)}` };
    }
    return { sent: true };
  } catch (err) {
    console.error("[quote] resend error", err);
    return { sent: false, reason: err instanceof Error ? err.message : "unknown_error" };
  }
}

/** Email thông báo cho quản trị. */
export async function sendQuoteEmail(p: QuotePayload): Promise<{ sent: boolean; reason?: string }> {
  const { subject, html, text } = buildQuoteEmail(p);
  return sendViaResend({ to: QUOTE_INBOX, subject, html, text, replyTo: p.email || undefined });
}

/** Email xác nhận cho khách (chỉ khi đã cấu hình domain gửi riêng). */
export async function sendCustomerConfirmation(
  p: QuotePayload,
): Promise<{ sent: boolean; reason?: string }> {
  if (!p.email) return { sent: false, reason: "no_customer_email" };
  if (!process.env["RESEND_FROM_EMAIL"]) return { sent: false, reason: "no_verified_sender" };
  const { subject, html, text } = buildCustomerEmail(p);
  return sendViaResend({ to: p.email, subject, html, text });
}
