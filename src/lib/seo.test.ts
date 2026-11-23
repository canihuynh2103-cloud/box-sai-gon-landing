import { test } from "node:test";
import assert from "node:assert/strict";
import { absUrl, SITE_URL, workforceLd } from "./seo";

test("organization schema uses the owner's confirmed minimum of 80 workers", () => {
  assert.equal(workforceLd.minValue, 80);
});

test("canonical URLs retain the existing HTTPS apex domain", () => {
  assert.equal(SITE_URL, "https://bocxepsaigon.vn");
  assert.equal(
    absUrl("/dich-vu/boc-xep-container"),
    "https://bocxepsaigon.vn/dich-vu/boc-xep-container",
  );
});
