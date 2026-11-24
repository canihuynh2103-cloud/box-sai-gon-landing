import { readFileSync } from "node:fs";
import { test } from "node:test";
import assert from "node:assert/strict";
import { BUSINESS_ID, businessRef } from "./seo";

const read = (p: string) => readFileSync(p, "utf8");

test("uses one stable @id on the canonical domain", () => {
  assert.equal(BUSINESS_ID, "https://bocxepsaigon.vn/#business");
  assert.deepEqual(businessRef, { "@id": BUSINESS_ID });
});

test("declares a single LocalBusiness with that id in the root head", () => {
  const root = read("src/routes/__root.tsx");
  assert.equal(root.match(/"@type": "LocalBusiness"/g)?.length, 1);
  assert.ok(root.includes('"@id": "https://bocxepsaigon.vn/#business"'));
  assert.ok(!root.includes('"@type": "Organization"'));
});

test("service, project and local pages reference the entity instead of redeclaring it", () => {
  for (const p of [
    "src/routes/dich-vu-boc-xep-tphcm.tsx",
    "src/routes/dich-vu/$slug.tsx",
    "src/routes/du-an/$slug.tsx",
  ]) {
    const s = read(p);
    assert.ok(s.includes("provider: businessRef"), p);
    assert.ok(!s.includes('"@type": "LocalBusiness"'), p);
  }
});

test("only the local landing page targets 'Dịch Vụ Bốc Xếp TP.HCM' in its title", () => {
  assert.ok(
    read("src/routes/dich-vu-boc-xep-tphcm.tsx").includes('const TITLE = "Dịch Vụ Bốc Xếp TP.HCM'),
  );
  assert.doesNotMatch(read("src/routes/index.tsx"), /const TITLE = ".*TP\.?HCM/);
  assert.doesNotMatch(read("src/routes/dich-vu/index.tsx"), /const TITLE = ".*TP\.?HCM/);
});
