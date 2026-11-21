import { test } from "node:test";
import assert from "node:assert/strict";
import { fetchSitemapPosts } from "./sitemap-posts";

test("sitemap reads all public posts across pages", async () => {
  const offsets: string[] = [];
  const fetcher: typeof fetch = async (input) => {
    const url = new URL(String(input));
    assert.equal(url.searchParams.get("status"), "eq.published");
    offsets.push(url.searchParams.get("offset") ?? "");
    return Response.json(url.searchParams.get("offset") === "0"
      ? [{ slug: "a", updated_at: null }, { slug: "b", updated_at: "2026-11-20" }]
      : [{ slug: "c", updated_at: null }]);
  };
  assert.deepEqual((await fetchSitemapPosts("https://example.test", "public-key", fetcher, 2)).map(p => p.slug), ["a", "b", "c"]);
  assert.deepEqual(offsets, ["0", "2"]);
});

test("sitemap source failure rejects instead of returning incomplete URLs", async () => {
  const fetcher: typeof fetch = async () => new Response("unavailable", { status: 503 });
  await assert.rejects(fetchSitemapPosts("https://example.test", "public-key", fetcher), /\[503\]/);
});