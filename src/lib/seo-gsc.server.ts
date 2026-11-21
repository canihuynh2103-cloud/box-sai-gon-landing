import { z } from "zod";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { coversSite, searchPeriod } from "./seo-gsc-core";
import { SITE_URL } from "./seo";

const analyticsSchema = z.object({
  rows: z
    .array(
      z.object({
        keys: z.tuple([z.string(), z.string()]),
        clicks: z.number().int().nonnegative(),
        impressions: z.number().int().nonnegative(),
        ctr: z.number().min(0).max(1),
        position: z.number().nonnegative(),
      }),
    )
    .default([]),
});
export async function refreshGsc(
  client: SupabaseClient<Database>,
  userId: string,
  siteUrl?: string,
) {
  const { data: role, error: roleError } = await client
    .from("user_roles")
    .select("id")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();
  if (roleError || !role)
    throw new Error("Chỉ quản trị viên được cập nhật dữ liệu Search Console.");
  const key = process.env["LOVABLE_API_KEY"];
  const connection = process.env["GOOGLE_SEARCH_CONSOLE_API_KEY"];
  if (!key || !connection) return { status: "not_connected" as const };
  const headers = {
    Authorization: `Bearer ${key}`,
    "X-Connection-Api-Key": connection,
    "Content-Type": "application/json",
  };
  const gateway = "https://connector-gateway.lovable.dev/google_search_console";
  async function call(path: string, body?: object) {
    const response = await fetch(gateway + path, {
      method: body ? "POST" : "GET",
      headers,
      ...(body ? { body: JSON.stringify(body) } : {}),
      signal: AbortSignal.timeout(45000),
    });
    if (!response.ok) {
      const detail = await response.text();
      console.error(`Search Console [${response.status}]: ${detail}`);
      throw new Error(`Search Console [${response.status}]: ${detail}`);
    }
    return response.json() as Promise<unknown>;
  }
  const sites = z
    .object({
      siteEntry: z
        .array(z.object({ siteUrl: z.string(), permissionLevel: z.string().optional() }))
        .default([]),
    })
    .parse(await call("/webmasters/v3/sites"));
  const candidates = sites.siteEntry
    .filter(
      (entry) =>
        entry.permissionLevel !== "siteUnverifiedUser" && coversSite(entry.siteUrl, SITE_URL + "/"),
    )
    .map((entry) => entry.siteUrl);
  if (!candidates.length) throw new Error("Không có hồ sơ đã xác minh phù hợp với website.");
  if (siteUrl && !candidates.includes(siteUrl))
    throw new Error("Hồ sơ được chọn không còn quyền truy cập hợp lệ.");
  const selected = siteUrl ?? (candidates.length === 1 ? candidates[0] : undefined);
  if (!selected) return { status: "selection_required" as const, candidates };
  const period = searchPeriod();
  const data = analyticsSchema.parse(
    await call(`/webmasters/v3/sites/${encodeURIComponent(selected)}/searchAnalytics/query`, {
      ...period,
      dimensions: ["query", "page"],
      rowLimit: 25000,
      dataState: "final",
      type: "web",
    }),
  );
  const fetched = new Date().toISOString();
  if (data.rows.length) {
    const values = data.rows.map((row) => ({
      site_url: selected,
      query: row.keys[0],
      page_url: row.keys[1],
      clicks: row.clicks,
      impressions: row.impressions,
      ctr: row.ctr,
      position: row.position,
      start_date: period.startDate,
      end_date: period.endDate,
      fetched_at: fetched,
    }));
    const { error } = await client
      .from("seo_gsc_snapshots")
      .upsert(values, { onConflict: "site_url,query,page_url,start_date,end_date" });
    if (error) throw error;
  }
  return {
    status: "ok" as const,
    count: data.rows.length,
    siteUrl: selected,
    ...period,
    fetchedAt: fetched,
    capped: data.rows.length === 25000,
  };
}
