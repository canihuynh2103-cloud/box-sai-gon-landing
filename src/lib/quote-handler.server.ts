import { z } from "zod";

import { sendQuoteEmail, type QuotePayload } from "./quote.server";

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
  sourcePath: z.string().trim().max(200).optional().or(z.literal("")),
});

export type QuoteInput = z.infer<typeof quoteSchema>;

export async function submitQuoteHandler(input: QuoteInput) {
  const payload: QuotePayload = {
    name: input.name,
    phone: input.phone,
    email: input.email || undefined,
    service: input.service || undefined,
    address: input.address || undefined,
    message: input.message || undefined,
    sourcePath: input.sourcePath || undefined,
  };

  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  const { data: row, error } = await supabaseAdmin
    .from("quote_requests")
    .insert({
      name: payload.name,
      phone: payload.phone,
      email: payload.email ?? null,
      service: payload.service ?? null,
      address: payload.address ?? null,
      message: payload.message ?? null,
      source_path: payload.sourcePath ?? null,
    })
    .select("id")
    .single();

  if (error || !row) {
    console.error("[quote] insert failed", error);
    throw new Error("Không lưu được yêu cầu. Vui lòng gọi hotline 0888.997.822.");
  }

  const result = await sendQuoteEmail(payload, `quote-${row.id}`);

  await supabaseAdmin
    .from("quote_requests")
    .update({
      email_status: result.sent ? "sent" : "failed",
      email_error: result.reason ?? null,
    })
    .eq("id", row.id);

  if (!result.sent) console.error("[quote] email not sent:", result.reason);

  return { id: row.id as string, saved: true, emailSent: result.sent };
}
