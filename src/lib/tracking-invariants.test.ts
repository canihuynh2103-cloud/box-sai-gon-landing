import { test } from "node:test";
import assert from "node:assert/strict";
import { ADS_ID, CONSENT_REGIONS, QUOTE_CONVERSION_SEND_TO } from "./consent";

test("Google Ads retains the owner's existing tag ID", () => {
  assert.equal(ADS_ID, "AW-17877629629");
});

test("quote success retains the owner's existing conversion destination", () => {
  assert.equal(QUOTE_CONVERSION_SEND_TO, "AW-17877629629/f-4LCKyL1pUdEL3128xC");
});

test("Vietnam remains a consent region", () => {
  assert.equal(CONSENT_REGIONS.has("VN"), true);
});
