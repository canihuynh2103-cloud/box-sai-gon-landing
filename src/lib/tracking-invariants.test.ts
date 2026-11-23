import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { ADS_ID, CONSENT_REGIONS, QUOTE_CONVERSION_SEND_TO } from "./google-ads";

test("Google Ads retains the owner's existing tag ID", () => {
  assert.equal(ADS_ID, "AW-17877629629");
});

test("quote success uses the owner's newly approved conversion destination", () => {
  assert.equal(QUOTE_CONVERSION_SEND_TO, "AW-17877629629/67t4COLM5b0dEL3128xC");
});

test("the retired conversion label is absent from application source", () => {
  const root = resolve(import.meta.dirname, "..");
  const retiredLabel = ["f-4LCKyL1pUd", "EL3128xC"].join("");
  const files = readdirSync(root, { recursive: true, withFileTypes: true }).filter(
    (entry) => entry.isFile() && /\.(ts|tsx|js|jsx)$/.test(entry.name),
  );
  assert.ok(files.length > 0);
  for (const file of files) {
    const path = resolve(file.parentPath, file.name);
    assert.equal(readFileSync(path, "utf8").includes(retiredLabel), false, path);
  }
});

test("Vietnam remains a consent region", () => {
  assert.equal(CONSENT_REGIONS.has("VN"), true);
});
