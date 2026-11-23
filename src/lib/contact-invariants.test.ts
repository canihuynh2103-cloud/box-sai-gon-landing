import { test } from "node:test";
import assert from "node:assert/strict";
import { EMAIL, HOTLINE, HOTLINE_TEL } from "../data/site";

test("rebranding retains the owner's hotline and dial target", () => {
  assert.equal(HOTLINE, "0888.997.822");
  assert.equal(HOTLINE_TEL, "0888997822");
});

test("rebranding retains the owner's email", () => {
  assert.equal(EMAIL, "saigonhandling@gmail.com");
});
