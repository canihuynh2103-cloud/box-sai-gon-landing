import { test } from "node:test";
import assert from "node:assert/strict";
import { searchItems } from "./site-search";

const items = [
  { title: "Đóng gói hàng hóa" },
  { title: "Bốc xếp container" },
  { title: "Chuyển kho" },
];
const text = (item: { title: string }) => item.title;
test("Vietnamese search accepts accents and no accents regardless of case", () => {
  assert.deepEqual(searchItems(items, "DONG GOI", text), [items[0]]);
  assert.deepEqual(searchItems(items, "đóng GÓI", text), [items[0]]);
});
test("search tolerates a common container typing error", () => {
  assert.equal(searchItems(items, "contaner", text)[0]?.title, "Bốc xếp container");
});
test("unrelated query returns no fabricated matches", () => {
  assert.deepEqual(searchItems(items, "zzzzzzzzzzzz", text), []);
});
test("empty search preserves every existing item", () => {
  assert.deepEqual(searchItems(items, "", text), items);
});
