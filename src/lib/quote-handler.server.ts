import { z } from "zod";

import { sendCustomerConfirmation, sendQuoteEmail, type QuotePayload } from "./quote.server";

/** Loại bỏ ký tự điều khiển / xuống dòng để chống header injection & dữ liệu rác. */
const singleLine = (max: number) =>
  z
    .string()
    .transform((v) => v.replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim())
    .pipe(z.string().max(max));

/** Nội dung nhiều dòng: giữ xuống dòng, bỏ ký tự điều khiển khác. */
const multiLine = (max: number) =>
  z
    .string()
    .transform((v) =>
      v
        .replace(/\r\n/g, "\n")
        .replace(/[\u0000-\u0009\u000b-\u001f\u007f]/g, " ")
        .trim(),
    )
    .pipe(z.string().max(max));

export const quoteSchema = z.object({
  name: singleLine(100).pipe(z.string().min(2)),
  phone: singleLine(15).pipe(
    z
      .string()
      .regex(/^[0-9+\-.\s()]{9,15}$/, "Số điện thoại không hợp lệ"),
  ),
  email: singleLine(255)
    .pipe(z.string().email().or(z.literal("")))
    .optional(),
  service: singleLine(120).optional(),
  address: singleLine(200).optional(),
  message: multiLine(500).optional(),
  preferredTime: singleLine(120).optional(),
  workersCount: singleLine(60).optional(),
  cargoType: singleLine(120).optional(),
  sourcePath: singleLine(200)
    .pipe(z.string().regex(/^\/[\w\-./?=&%]*$/, "Đường dẫn không hợp lệ").or(z.literal("")))
    .optional(),
});

export type QuoteInput = z.infer<typeof quoteSchema>;

export async function submitQuoteHandler(input: QuoteInput) {
  // Validate lại ở backend (không tin frontend).
  const parsed = quoteSchema.parse(input);

  const payload: QuotePayload = {
    name: parsed.name,
    phone: parsed.phone,
    email: parsed.email || undefined,
    service: parsed.service || undefined,
    address: parsed.address || undefined,
    message: parsed.message || undefined,
    preferredTime: parsed.preferredTime || undefined,
    workersCount: parsed.workersCount || undefined,
    cargoType: parsed.cargoType || undefined,
    sourcePath: parsed.sourcePath || undefined,
  };

  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  // 1) Lưu lead trước — không mất dữ liệu dù email lỗi.
  const { data: row, error } = await supabaseAdmin
    .from("quote_requests")
    .insert({
      name: payload.name,
      phone: payload.phone,
      email: payload.email ?? null,
      service: payload.service ?? null,
      address: payload.address ?? null,
      message: payload.message ?? null,
      preferred_time: payload.preferredTime ?? null,
      workers_count: payload.workersCount ?? null,
      cargo_type: payload.cargoType ?? null,
      source_path: payload.sourcePath ?? null,
    })
    .select("id")
    .single();

  if (error || !row) {
    console.error("[quote] insert failed", error?.message);
    throw new Error(
      "Không thể gửi yêu cầu lúc này. Vui lòng thử lại hoặc gọi Hotline 0888.997.822.",
    );
  }

  // 2) Gửi email thông báo quản trị + xác nhận khách.
  const admin = await sendQuoteEmail(payload);
  const customer = await sendCustomerConfirmation(payload);

  await supabaseAdmin
    .from("quote_requests")
    .update({
      email_status: admin.sent ? "sent" : "failed",
      email_error: admin.reason ?? null,
      customer_email_status: customer.sent ? "sent" : (customer.reason ?? "failed"),
    })
    .eq("id", row.id);

  if (!admin.sent) {
    console.error("[quote] admin email not sent:", admin.reason);
  }

  return {
    id: row.id as string,
    saved: true,
    emailSent: admin.sent,
    customerEmailSent: customer.sent,
  };
}
