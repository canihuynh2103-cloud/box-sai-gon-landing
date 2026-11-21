export type SitemapPost = { slug: string; updated_at: string | null };

/** Public reads only. Never publish a partial sitemap when the source fails. */
export async function fetchSitemapPosts(
  url: string,
  key: string,
  fetcher: typeof fetch = fetch,
  pageSize = 200,
): Promise<SitemapPost[]> {
  const posts: SitemapPost[] = [];
  for (let offset = 0; ; offset += pageSize) {
    const endpoint = new URL(`${url}/rest/v1/posts`);
    endpoint.search = new URLSearchParams({
      select: "slug,updated_at",
      status: "eq.published",
      order: "slug.asc",
      limit: String(pageSize),
      offset: String(offset),
    }).toString();
    const response = await fetcher(endpoint, { headers: { apikey: key } });
    if (!response.ok) {
      throw new Error(`Public sitemap posts unavailable [${response.status}]: ${await response.text()}`);
    }
    const page: unknown = await response.json();
    if (!Array.isArray(page)) throw new Error("Invalid public sitemap posts response");
    for (const row of page) {
      if (
        !row || typeof row !== "object" ||
        typeof row.slug !== "string" || !row.slug ||
        (row.updated_at !== null && typeof row.updated_at !== "string")
      ) throw new Error("Invalid public sitemap post");
      posts.push({ slug: row.slug, updated_at: row.updated_at });
    }
    if (page.length < pageSize) return posts;
  }
}