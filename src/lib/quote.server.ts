/** Địa chỉ nhận yêu cầu báo giá (không đổi). */
export const QUOTE_INBOX = "saigonhandling@gmail.com";

/** Địa chỉ gửi mặc định — domain đã verify trên Resend. */
const DEFAULT_FROM = "Bốc Xếp Sài Gòn <contact@bocxepsaigon.vn>";

export type QuotePayload = {
  name: string;
  phone: string;
  email?: string;
  service?: string;
  address?: string;
  message?: string;
  preferredTime?: string;
  workersCount?: string;
  cargoType?: string;
  sourcePath?: string;
};

const NA = "Không cung cấp";

const esc = (v: string) =>
  v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const sentAt = () =>
  new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Asia/Ho_Chi_Minh",
  }).format(new Date());

type Group = { heading: string; rows: [string, string][] };

function buildGroups(p: QuotePayload): Group[] {
  return [
    {
      heading: "Thông tin khách hàng",
      rows: [
        ["Họ và tên", p.name || NA],
        ["Số điện thoại", p.phone || NA],
        ["Email", p.email || NA],
      ],
    },
    {
      heading: "Thông tin dịch vụ",
      rows: [
        ["Dịch vụ", p.service || NA],
        ["Địa điểm", p.address || NA],
        ["Thời gian", p.preferredTime || NA],
        ["Số lượng nhân công", p.workersCount || NA],
        ["Loại hàng hóa", p.cargoType || NA],
      ],
    },
    {
      heading: "Nội dung yêu cầu",
      rows: [["Nội dung", p.message || NA]],
    },
    {
      heading: "Nguồn gửi",
      rows: [
        ["Trang gửi yêu cầu", p.sourcePath || "/"],
        ["Thời gian gửi", sentAt()],
        ["Nguồn", "Website bocxepsaigon.vn"],
      ],
    },
  ];
}

const shell = (inner: string) =>
  `<!doctype html><html lang="vi"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;color:#111827">
<div style="max-width:640px;margin:0 auto;padding:16px">
<div style="background:#111827;border-radius:10px 10px 0 0;padding:20px 24px">
<p style="margin:0;color:#ffffff;font-size:13px;letter-spacing:2px;font-weight:bold">BỐC XẾP SÀI GÒN</p>
</div>
<div style="background:#ffffff;border:1px solid #e5e7eb;border-top:0;border-radius:0 0 10px 10px;padding:24px">
${inner}
</div>
<p style="margin:14px 0 0;text-align:center;font-size:12px;color:#6b7280">Bốc Xếp Sài Gòn · Hotline 0888.997.822 · bocxepsaigon.vn</p>
</div></body></html>`;

export function buildQuoteEmail(p: QuotePayload) {
  const groups = buildGroups(p);
  const subject = `Yêu cầu báo giá mới - Bốc Xếp Sài Gòn (${p.name} - ${p.phone})`;
  const text = groups
    .map((g) => `${g.heading.toUpperCase()}\n${g.rows.map(([k, v]) => `- ${k}: ${v}`).join("\n")}`)
    .join("\n\n");
  const tel = p.phone.replace(/[^0-9+]/g, "");

  const body = groups
    .map(
      (g) => `<h2 style="margin:22px 0 8px;font-size:14px;color:#dc2626;letter-spacing:1px;text-transform:uppercase">${esc(
        g.heading,
      )}</h2>
<table role="presentation" style="width:100%;border-collapse:collapse;font-size:14px">
${g.rows
  .map(
    ([k, v]) =>
      `<tr><td style="padding:9px 10px;border:1px solid #e5e7eb;background:#f9fafb;font-weight:bold;width:40%">${esc(
        k,
      )}</td><td style="padding:9px 10px;border:1px solid #e5e7eb;white-space:pre-wrap">${esc(
        String(v),
      )}</td></tr>`,
  )
  .join("")}
</table>`,
    )
    .join("");

  const html = shell(
    `<h1 style="margin:0;font-size:20px">Yêu cầu báo giá mới</h1>
<p style="margin:6px 0 0;color:#6b7280;font-size:13px">Khách hàng vừa gửi yêu cầu từ website bocxepsaigon.vn</p>
${body}
<p style="margin:24px 0 0"><a href="tel:${esc(tel)}" style="display:inline-block;background:#dc2626;color:#ffffff;text-decoration:none;padding:12px 20px;border-radius:6px;font-weight:bold">Gọi khách hàng: ${esc(
      p.phone,
    )}</a></p>`,
  );

  return { subject, html, text };
}

export function buildCustomerEmail(p: QuotePayload) {
  const subject = "Bốc Xếp Sài Gòn đã nhận yêu cầu của bạn";
  const info: [string, string][] = [
    ["Dịch vụ", p.service || NA],
    ["Địa điểm", p.address || NA],
    ["Thời gian", p.preferredTime || NA],
    ["Số lượng nhân công", p.workersCount || NA],
    ["Loại hàng hóa", p.cargoType || NA],
  ];
  const text = `Chào ${p.name},\n\nBốc Xếp Sài Gòn đã nhận được yêu cầu của bạn.\n\nThông tin yêu cầu:\n${info
    .map(([k, v]) => `- ${k}: ${v}`)
    .join(
      "\n",
    )}\n\nĐội ngũ của chúng tôi sẽ liên hệ lại với bạn trong thời gian sớm nhất.\n\nTrân trọng,\nBỐC XẾP SÀI GÒN\nHotline: 0888.997.822\nWebsite: bocxepsaigon.vn`;

  const html = shell(
    `<h1 style="margin:0;font-size:20px">Chào ${esc(p.name)},</h1>
<p style="margin:10px 0 0;font-size:14px;line-height:1.65">Bốc Xếp Sài Gòn đã nhận được yêu cầu của bạn. Bộ phận điều phối sẽ liên hệ lại trong thời gian sớm nhất.</p>
<h2 style="margin:22px 0 8px;font-size:14px;color:#dc2626;letter-spacing:1px;text-transform:uppercase">Thông tin yêu cầu</h2>
<table role="presentation" style="width:100%;border-collapse:collapse;font-size:14px">
${info
  .map(
    ([k, v]) =>
      `<tr><td style="padding:9px 10px;border:1px solid #e5e7eb;background:#f9fafb;font-weight:bold;width:40%">${esc(
        k,
      )}</td><td style="padding:9px 10px;border:1px solid #e5e7eb;white-space:pre-wrap">${esc(
        v,
      )}</td></tr>`,
  )
  .join("")}
</table>
<p style="margin:24px 0 0"><a href="tel:0888997822" style="display:inline-block;background:#dc2626;color:#ffffff;text-decoration:none;padding:12px 20px;border-radius:6px;font-weight:bold">Hotline 24/7: 0888.997.822</a></p>
<p style="margin:18px 0 0;font-size:13px;color:#6b7280">Trân trọng,<br/>BỐC XẾP SÀI GÒN</p>`,
  );

  return { subject, html, text };
}

type SendArgs = {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
};

/** Gửi email qua Resend HTTP API (server-side, API key chỉ đọc từ env). */
async function sendViaResend(args: SendArgs): Promise<{ sent: boolean; reason?: string }> {
  const apiKey = process.env["RESEND_API_KEY"];
  if (!apiKey) return { sent: false, reason: "missing_RESEND_API_KEY" };

  const from = process.env["RESEND_FROM_EMAIL"] || DEFAULT_FROM;

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
      console.error(`[quote] resend failed [${res.status}]: ${body.slice(0, 300)}`);
      return { sent: false, reason: `resend_${res.status}` };
    }
    return { sent: true };
  } catch (err) {
    console.error("[quote] resend error", err instanceof Error ? err.message : err);
    return { sent: false, reason: "network_error" };
  }
}

/** Email thông báo cho quản trị (Reply-To = email khách nếu có). */
export async function sendQuoteEmail(p: QuotePayload): Promise<{ sent: boolean; reason?: string }> {
  const { subject, html, text } = buildQuoteEmail(p);
  return sendViaResend({ to: QUOTE_INBOX, subject, html, text, replyTo: p.email || undefined });
}

/** Email xác nhận cho khách (chỉ khi khách nhập email). */
export async function sendCustomerConfirmation(
  p: QuotePayload,
): Promise<{ sent: boolean; reason?: string }> {
  if (!p.email) return { sent: false, reason: "no_customer_email" };
  const { subject, html, text } = buildCustomerEmail(p);
  return sendViaResend({ to: p.email, subject, html, text, replyTo: QUOTE_INBOX });
}
