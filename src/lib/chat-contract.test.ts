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

test("chat accepts 80 messages and rejects an 81st message", () => {
  const messages = Array.from({ length: 80 }, () => ({ role: "user", content: "Tư vấn" }));
  assert.equal(chatRequestSchema.safeParse({ messages }).success, true);
  assert.equal(
    chatRequestSchema.safeParse({ messages: [...messages, { role: "user", content: "Thêm" }] })
      .success,
    false,
  );
});

test("chat accepts 32000 total characters and rejects 32001", () => {
  const messages = Array.from({ length: 16 }, () => ({
    role: "user",
    content: "x".repeat(2000),
  }));
  assert.equal(chatRequestSchema.safeParse({ messages }).success, true);
  assert.equal(
    chatRequestSchema.safeParse({ messages: [...messages, { role: "user", content: "x" }] })
      .success,
    false,
  );
});

test("chat rejects empty history and requests ending in an assistant turn", () => {
  assert.equal(chatRequestSchema.safeParse({ messages: [] }).success, false);
  assert.equal(
    chatRequestSchema.safeParse({
      messages: [{ role: "assistant", content: "Tư vấn" }],
    }).success,
    false,
  );
});
