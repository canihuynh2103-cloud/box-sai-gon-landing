import { test } from "node:test";
import assert from "node:assert/strict";
import { coversSite, searchPeriod } from "./seo-gsc-core";
test("Search Console property coverage rejects lookalike domains", () => {
  assert.equal(coversSite("sc-domain:bocxepsaigon.vn", "https://www.bocxepsaigon.vn/"), true);
  assert.equal(
    coversSite("sc-domain:bocxepsaigon.vn", "https://bocxepsaigon.vn.attacker.com/"),
    false,
  );
  assert.equal(coversSite("https://bocxepsaigon.vn/", "https://www.bocxepsaigon.vn/"), false);
});
test("28-day final-data window excludes the latest three days", () => {
  assert.deepEqual(searchPeriod(new Date("2026-11-21T12:08:00Z")), {
    startDate: "2026-10-22",
    endDate: "2026-11-18",
  });
});
