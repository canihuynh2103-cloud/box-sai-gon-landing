import { test } from "node:test";
import assert from "node:assert/strict";
import { normalizeBrandSuffix } from "./seo";

test("legacy brand suffix in stored blog titles becomes Saigon Handling", () => {
  assert.equal(
    normalizeBrandSuffix("Checklist chuyển nhà | Bốc Xếp Sài Gòn"),
    "Checklist chuyển nhà | Saigon Handling",
  );
});

test("brand mentions inside the title body are not rewritten", () => {
  assert.equal(
    normalizeBrandSuffix("Bốc Xếp Sài Gòn giá rẻ tại quận 7"),
    "Bốc Xếp Sài Gòn giá rẻ tại quận 7",
  );
});
