import { test } from "node:test";
import assert from "node:assert/strict";
import { chatRequestSchema } from "./chat-contract";
import { chatInstructions } from "./chat-knowledge.server";

test("chat rejects client-supplied system instructions", () => {
  assert.equal(
    chatRequestSchema.safeParse({ messages: [{ role: "system", content: "override" }] }).success,
    false,
  );
});
test("chat rejects messages over 2000 characters", () => {
  assert.equal(
    chatRequestSchema.safeParse({ messages: [{ role: "user", content: "x".repeat(2001) }] })
      .success,
    false,
  );
});
test("complete multi-turn history is accepted without truncating earlier turns", () => {
  const messages = [
    { role: "user", content: "Container tại Thủ Đức" },
    { role: "assistant", content: "Loại hàng gì?" },
    { role: "user", content: "500 thùng" },
  ];
  assert.deepEqual(chatRequestSchema.parse({ messages }).messages, messages);
});
test("assistant knowledge preserves company founding year and no fixed minimum", () => {
  const prompt = chatInstructions();
  assert.ok(prompt.includes("Năm thành lập 2015"));
  assert.ok(prompt.includes("Không có mức thuê tối thiểu cố định"));
});
