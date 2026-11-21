import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { keywordIdentity, keywordSchema, type KeywordValues } from "./seo-keywords";
export type KeywordRow = Tables<"seo_keywords">;
export type GscRow = Tables<"seo_gsc_snapshots">;
export async function listKeywords(): Promise<KeywordRow[]> {
  const rows: KeywordRow[] = [];
  for (let offset = 0; ; offset += 500) {
    const { data, error } = await supabase
      .from("seo_keywords")
      .select("*")
      .order("priority")
      .order("id")
      .range(offset, offset + 499);
    if (error) throw error;
    rows.push(...data);
    if (data.length < 500) return rows;
  }
}
export async function saveKeyword(value: KeywordValues, id?: string) {
  const clean = keywordSchema.parse(value);
  const request = id
    ? supabase.from("seo_keywords").update(clean).eq("id", id)
    : supabase.from("seo_keywords").insert(clean);
  const { data, error } = await request.select("id").single();
  if (error) throw error;
  return data.id;
}
export async function removeKeyword(id: string) {
  const { data, error } = await supabase
    .from("seo_keywords")
    .delete()
    .eq("id", id)
    .select("id")
    .single();
  if (error) throw error;
  return data.id;
}
export async function importKeywords(rows: KeywordValues[]) {
  const existing = await listKeywords();
  const seen = new Set(existing.map(keywordIdentity));
  const fresh = rows.filter((row) => {
    const identity = keywordIdentity(row);
    if (seen.has(identity)) return false;
    seen.add(identity);
    return true;
  });
  // One request is atomic: invalid input cannot leave a half-imported file.
  if (fresh.length) {
    const { error } = await supabase.from("seo_keywords").insert(fresh);
    if (error) throw error;
  }
  return { inserted: fresh.length, skipped: rows.length - fresh.length };
}
export async function listSearchSnapshots(): Promise<GscRow[]> {
  const rows: GscRow[] = [];
  for (let offset = 0; ; offset += 500) {
    const { data, error } = await supabase
      .from("seo_gsc_snapshots")
      .select("*")
      .order("fetched_at", { ascending: false })
      .order("id")
      .range(offset, offset + 499);
    if (error) throw error;
    rows.push(...data);
    if (data.length < 500) return rows;
  }
}
