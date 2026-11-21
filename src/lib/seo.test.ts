import { test } from "node:test";
import assert from "node:assert/strict";
import { workforceLd } from "./seo";

test("organization schema uses the owner's confirmed minimum of 80 workers", () => {
  assert.equal(workforceLd.minValue, 80);
});