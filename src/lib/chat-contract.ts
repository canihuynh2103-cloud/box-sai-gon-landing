import { z } from "zod";

export const chatRequestSchema = z
  .object({
    messages: z
      .array(
        z
          .object({
            role: z.enum(["user", "assistant"]),
            content: z.string().trim().min(1).max(2000),
          })
          .strict(),
      )
      .min(1)
      .max(80),
  })
  .strict()
  .superRefine(({ messages }, ctx) => {
    if (messages.at(-1)?.role !== "user")
      ctx.addIssue({ code: "custom", message: "Expected user message" });
    if (messages.reduce((n, m) => n + m.content.length, 0) > 32000)
      ctx.addIssue({ code: "custom", message: "Conversation too long" });
  });

export const chatFrameSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("delta"), text: z.string() }),
  z.object({ type: z.literal("done") }),
  z.object({ type: z.literal("error"), message: z.string() }),
]);
