import { test } from "node:test";
import assert from "node:assert/strict";
import {
  parseKeywordCsv,
  exportKeywordCsv,
  keywordWarnings,
  keywordSchema,
  csvSafe,
} from "./seo-keywords";
test("CSV preserves Vietnamese, quoted text and lists", () => {
  const row = keywordSchema.parse({
    keyword: 'bốc xếp, "kho"',
    secondary_keywords: ["pallet", "nhân công"],
  });
  assert.deepEqual(parseKeywordCsv(exportKeywordCsv([row]))[0], row);
});
test("invalid import is rejected entirely, external and script URLs are blocked", () => {
  assert.throws(() => parseKeywordCsv("keyword,target_url\nbốc xếp,javascript:alert(1)"));
  assert.throws(() => parseKeywordCsv("keyword,target_url\nbốc xếp,https://other.vn"));
  assert.throws(() => parseKeywordCsv("keyword,priority\nbốc xếp,5"));
});
test("same primary keyword across distinct URLs gets a cannibalization warning", () => {
  const rows = [
    {
      id: "1",
      keyword: "Bốc xếp kho",
      primary_keyword: "bốc xếp kho",
      target_url: "https://bocxepsaigon.vn/dich-vu/boc-xep-kho-hang",
    },
    {
      id: "2",
      keyword: "boc xep kho",
      primary_keyword: "bốc xếp kho",
      target_url: "https://bocxepsaigon.vn/",
    },
  ];
  assert.equal(keywordWarnings(rows).get("1")?.multipleUrls, true);
  assert.equal(keywordWarnings(rows).get("2")?.duplicate, true);
  assert.equal(
    keywordWarnings([rows[0]].filter((r) => r !== undefined)).get("1")?.multipleUrls,
    false,
  );
});
test("spreadsheet formulas are neutralized on export", () => {
  assert.equal(csvSafe("=1+1"), "'=1+1");
  assert.equal(csvSafe("bốc xếp"), "bốc xếp");
});
test("imports cannot fabricate measured Search Console or Semrush metrics", () => {
  const row = parseKeywordCsv("keyword,gsc_clicks,semrush_volume\nbốc xếp,999,999")[0];
  assert.ok(row);
  assert.equal("gsc_clicks" in row, false);
  assert.equal("semrush_volume" in row, false);
});
