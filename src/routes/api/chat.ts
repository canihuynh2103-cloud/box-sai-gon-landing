import { createFileRoute } from "@tanstack/react-router";
import { chatRequestSchema } from "@/lib/chat-contract";

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const headers = { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" };
        const origin = request.headers.get("origin");
        if (!origin || origin !== new URL(request.url).origin)
          return Response.json({ error: "Yêu cầu không hợp lệ." }, { status: 403, headers });
        if (!request.headers.get("content-type")?.startsWith("application/json"))
          return Response.json({ error: "Yêu cầu không hợp lệ." }, { status: 415, headers });
        const reader = request.body?.getReader();
        if (!reader) return Response.json({ error: "Thiếu nội dung." }, { status: 400, headers });
        let body = "";
        let bytes = 0;
        const decoder = new TextDecoder();
        try {
          while (true) {
            const chunk = await reader.read();
            if (chunk.done) break;
            bytes += chunk.value.byteLength;
            if (bytes > 128000) {
              await reader.cancel();
              return Response.json(
                { error: "Hội thoại quá dài; vui lòng bắt đầu cuộc trò chuyện mới." },
                { status: 413, headers },
              );
            }
            body += decoder.decode(chunk.value, { stream: true });
          }
          body += decoder.decode();
        } catch {
          return Response.json({ error: "Không đọc được tin nhắn." }, { status: 400, headers });
        }
        let parsed;
        try {
          parsed = chatRequestSchema.safeParse(JSON.parse(body));
        } catch {
          return Response.json({ error: "Tin nhắn không hợp lệ." }, { status: 400, headers });
        }
        if (!parsed.success)
          return Response.json(
            { error: "Tin nhắn quá dài hoặc không hợp lệ; vui lòng bắt đầu cuộc trò chuyện mới." },
            { status: 400, headers },
          );
        const { streamResponse, GatewayError } = await import("@lovable.dev/ai-gateway");
        const { chatInstructions } = await import("@/lib/chat-knowledge.server");
        let faqs: { question: string; answer: string }[] = [];
        try {
          const { createClient } = await import("@supabase/supabase-js");
          const url = process.env["SUPABASE_URL"];
          const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
          if (url && key) {
            const client = createClient(url, key, {
              auth: { persistSession: false },
              global: {
                fetch: (input, init) => {
                  const h = new Headers(init?.headers);
                  if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`)
                    h.delete("Authorization");
                  h.set("apikey", key);
                  return fetch(input, { ...init, headers: h });
                },
              },
            });
            const { data, error } = await client
              .from("faqs")
              .select("question,answer")
              .order("sort_order")
              .limit(30);
            if (!error && data) faqs = data;
          }
        } catch {
          /* Public static FAQ fallback; never read private records. */
        }
        const safeError =
          "Trợ lý chưa thể trả lời lúc này. Bạn có thể gọi 0888.997.822 hoặc liên hệ Zalo.";
        const logError = (error: unknown) => {
          if (error instanceof GatewayError) console.error("[chat] gateway", error.code, error.ids);
          else console.error("[chat] service failure");
        };
        try {
          const upstream = await streamResponse(
            {
              model: "openai/gpt-6-astra",
              instructions: chatInstructions(faqs),
              input: parsed.data.messages.map((m) =>
                m.role === "assistant"
                  ? {
                      role: "assistant" as const,
                      content: [{ type: "output_text" as const, text: m.content }],
                    }
                  : { role: "user" as const, content: m.content },
              ),
              max_output_tokens: 1800,
              reasoning: { effort: "low" },
            },
            { signal: request.signal },
          );
          const encoder = new TextEncoder();
          const stream = new ReadableStream<Uint8Array>({
            async start(controller) {
              const emit = (frame: object) =>
                controller.enqueue(encoder.encode(JSON.stringify(frame) + "\n"));
              try {
                let completed = false;
                for await (const event of upstream) {
                  if (
                    event.type === "response.output_text.delta" ||
                    event.type === "response.refusal.delta"
                  )
                    emit({ type: "delta", text: event.delta });
                  if (event.type === "response.completed") completed = true;
                  if (event.type === "response.incomplete") throw new Error("Incomplete response");
                }
                if (!completed) throw new Error("Interrupted response");
                emit({ type: "done" });
              } catch (error) {
                logError(error);
                emit({ type: "error", message: safeError });
              } finally {
                controller.close();
              }
            },
          });
          return new Response(stream, {
            headers: { ...headers, "Content-Type": "application/x-ndjson; charset=utf-8" },
          });
        } catch (error) {
          logError(error);
          return Response.json({ error: safeError }, { status: 503, headers });
        }
      },
    },
  },
});
