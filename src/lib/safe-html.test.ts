import { expect, test } from "bun:test";
import { safePostHtml, escapeHtmlText } from "./safe-html";

test("stored article scripts and event handlers cannot execute", () => {
  const result = safePostHtml('<h2 id="muc-1">Nội dung</h2><script>alert(1)</script><img src="/image.png" onerror="alert(1)"><svg onload="alert(1)"></svg>');
  expect(result).not.toContain("<script");
  expect(result).not.toContain("onerror");
  expect(result).not.toContain("onload");
  expect(result).toContain('<h2 id="muc-1">');
});

test("unsafe links, embedded origins and executable CSS are removed", () => {
  const result = safePostHtml('<a href="javascript:alert(1)">X</a><iframe src="https://evil.example/"></iframe><p style="background:url(javascript:alert(1))">Y</p>');
  expect(result).not.toContain("javascript:");
  expect(result).not.toContain("evil.example");
  expect(result).not.toContain("style=");
});

test("normal article tables and approved embeds are retained", () => {
  const result = safePostHtml('<table><tbody><tr><td colspan="2">Hàng hóa</td></tr></tbody></table><iframe src="https://www.youtube.com/embed/abcdefghijk"></iframe>');
  expect(result).toContain('colspan="2"');
  expect(result).toContain("https://www.youtube.com/embed/abcdefghijk");
});

test("block text cannot inject HTML attributes", () => {
  expect(escapeHtmlText('\"><img onerror="alert(1)">')).toBe('&quot;&gt;&lt;img onerror=&quot;alert(1)&quot;&gt;');
});