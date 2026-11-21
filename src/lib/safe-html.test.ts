import { test } from "node:test";
import assert from "node:assert/strict";
import { safePostHtml, escapeHtmlText } from "./safe-html";

test("stored article scripts and event handlers cannot execute", () => {
  const result = safePostHtml('<h2 id="muc-1">Nội dung</h2><script>alert(1)</script><img src="/image.png" onerror="alert(1)"><svg onload="alert(1)"></svg>');
  assert.ok(!result.includes("<script"));
  assert.ok(!result.includes("onerror"));
  assert.ok(!result.includes("onload"));
  assert.ok(result.includes('<h2 id="muc-1">'));
});

test("unsafe links, embedded origins and executable CSS are removed", () => {
  const result = safePostHtml('<a href="javascript:alert(1)">X</a><iframe src="https://evil.example/"></iframe><p style="background:url(javascript:alert(1))">Y</p>');
  assert.ok(!result.includes("javascript:"));
  assert.ok(!result.includes("evil.example"));
  assert.ok(!result.includes("style="));
});

test("normal article tables and approved embeds are retained", () => {
  const result = safePostHtml('<table><tbody><tr><td colspan="2">Hàng hóa</td></tr></tbody></table><iframe src="https://www.youtube.com/embed/abcdefghijk"></iframe>');
  assert.ok(result.includes('colspan="2"'));
  assert.ok(result.includes("https://www.youtube.com/embed/abcdefghijk"));
});

test("block text cannot inject HTML attributes", () => {
  assert.equal(escapeHtmlText('\"><img onerror="alert(1)">'), '&quot;&gt;&lt;img onerror=&quot;alert(1)&quot;&gt;');
});