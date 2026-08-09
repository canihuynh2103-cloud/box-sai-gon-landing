import { z } from "zod";

import { sendCustomerConfirmation, sendQuoteEmail, type QuotePayload } from "./quote.server";

export const quoteSchema = z.object({
  name: z.string().trim().min(2).max(100),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+\-.\s()]{9,15}$/),
  email: z.string().trim().email().max(255).optional().or(z.literal("")),
  service: z.string().trim().max(120).optional().or(z.literal("")),
  address: z.string().trim().max(200).optional().or(z.literal("")),
  message: z.string().trim().max(500).optional().or(z.literal("")),
  preferredTime: z.string().trim().max(120).optional().or(z.literal("")),
  workersCount: z.string().trim().max(60).optional().or(z.literal("")),
  cargoType: z.string().trim().max(120).optional().or(z.literal("")),
  sourcePath: z.string().trim().max(200).optional().or(z.literal("")),
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
