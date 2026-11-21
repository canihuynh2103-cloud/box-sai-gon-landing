import Papa from "papaparse";
import { z } from "zod";
import { normalizeSearch } from "./site-search";

export const GROUPS = { A: "A · Dịch vụ chính", B: "B · Doanh nghiệp", C: "C · Container", D: "D · Kho & nhà máy", E: "E · Địa phương", F: "F · Giá & báo giá", G: "G · Kiến thức" };
export const INTENTS = { transactional: "Thuê dịch vụ", commercial: "So sánh / báo giá", informational: "Tìm hiểu", navigational: "Tìm thương hiệu" };
export const STATUSES = { proposed: "Đề xuất", review: "Cần rà soát", in_progress: "Đang tối ưu", approved: "Đã duyệt" };
export const SOURCES = { proposed: "Đề xuất chuyên môn", gsc: "Google Search Console", semrush: "Semrush" };
export const TYPES = { home: "Trang chủ", service: "Dịch vụ", blog: "Bài viết", project: "Dự án", hub: "Danh mục", local: "Địa phương", other: "Khác" };
const list = z.array(z.string().max(1000)).max(100).default([]);
const target = z.string().max(2000).default("").refine((value) => {
  if (!value) return true;
  try { const url = new URL(value); return url.origin === "https://bocxepsaigon.vn" && !url.username && !url.password && !url.hash && !url.search; } catch { return false; }
}, "URL đích phải là URL HTTPS của bocxepsaigon.vn, không có query hoặc hash.");
export const keywordSchema = z.object({
  keyword: z.string().trim().min(1, "Cần nhập từ khóa.").max(300),
  primary_keyword: z.string().max(300).default(""),
  secondary_keywords: list, semantic_keywords: list, long_tail_keywords: list, questions: list,
  keyword_group: z.enum(["A", "B", "C", "D", "E", "F", "G"]).default("A"),
  search_intent: z.enum(["transactional", "commercial", "informational", "navigational"]).default("transactional"),
  search_location: z.string().max(300).default("TP.HCM"), target_url: target,
  content_type: z.enum(["home", "service", "blog", "project", "hub", "local", "other"]).default("service"),
  seo_title: z.string().max(500).default(""), meta_description: z.string().max(2000).default(""), h1: z.string().max(500).default(""),
  content_status: z.enum(["proposed", "review", "in_progress", "approved"]).default("review"),
  priority: z.coerce.number().int().min(1).max(3).default(2),
  evidence_source: z.enum(["proposed", "gsc", "semrush"]).default("proposed"),
  notes: z.string().max(10000).default(""), related_urls: list, cta: z.string().max(300).default("Nhận báo giá"),
});
export type KeywordValues = z.infer<typeof keywordSchema>;
export const ARRAY_FIELDS = ["secondary_keywords", "semantic_keywords", "long_tail_keywords", "questions", "related_urls"] as const;
export const CSV_FIELDS = Object.keys(keywordSchema.shape);
export function parseKeywordCsv(csv: string): KeywordValues[] {
  const parsed = Papa.parse<Record<string, string>>(csv.replace(/^\uFEFF/, ""), { header: true, skipEmptyLines: "greedy" });
  if (parsed.errors.length) throw new Error(`CSV không hợp lệ: ${parsed.errors[0]?.message ?? "lỗi định dạng"}`);
  if (!parsed.meta.fields?.includes("keyword")) throw new Error("CSV cần có cột keyword.");
  if (parsed.data.length > 2000) throw new Error("Mỗi lần nhập tối đa 2.000 dòng.");
  return parsed.data.map((row, index) => {
    const values: Record<string, unknown> = {};
    for (const key of CSV_FIELDS) {
      const value = row[key];
      if (value !== undefined && value !== "") values[key] = value;
    }
    for (const key of ARRAY_FIELDS) values[key] = (row[key] ?? "").split("|").map((s) => s.trim()).filter(Boolean);
    const result = keywordSchema.safeParse(values);
    if (!result.success) throw new Error(`Dòng ${index + 2}: ${result.error.issues[0]?.message ?? "dữ liệu không hợp lệ"}`);
    return result.data;
  });
}
export function csvSafe(value: string) { return /^[\s]*[=+@\-\t\r]/.test(value) ? `'${value}` : value; }
export function exportKeywordCsv(rows: Record<string, unknown>[]) {
  const fields = [...CSV_FIELDS, "updated_at", "semrush_volume", "semrush_difficulty", "gsc_clicks", "gsc_impressions", "gsc_ctr", "gsc_position", "gsc_start_date", "gsc_end_date"];
  return "\uFEFF" + Papa.unparse({ fields, data: rows.map((row) => fields.map((key) => {
    const v = row[key]; return csvSafe(Array.isArray(v) ? v.join("|") : v == null ? "" : String(v));
  })) });
}
export function keywordIdentity(row: { keyword: string; target_url: string }) {
  return `${normalizeSearch(row.keyword).replace(/\s+/g, " ")}::${row.target_url.replace(/\/$/, "")}`;
}
export function keywordWarnings<T extends { id: string; keyword: string; primary_keyword: string; target_url: string }>(rows: T[]) {
  const keywords = new Map<string, string[]>(); const targets = new Map<string, Set<string>>();
  for (const row of rows) {
    const key = normalizeSearch(row.keyword).replace(/\s+/g, " ");
    keywords.set(key, [...(keywords.get(key) ?? []), row.id]);
    const focus = normalizeSearch(row.primary_keyword || row.keyword).replace(/\s+/g, " ");
    if (row.target_url) { const set = targets.get(focus) ?? new Set(); set.add(row.target_url.replace(/\/$/, "")); targets.set(focus, set); }
  }
  return rows.reduce((map, row) => {
    const duplicate = (keywords.get(normalizeSearch(row.keyword).replace(/\s+/g, " "))?.length ?? 0) > 1;
    const multipleUrls = (targets.get(normalizeSearch(row.primary_keyword || row.keyword).replace(/\s+/g, " "))?.size ?? 0) > 1;
    map.set(row.id, { duplicate, multipleUrls }); return map;
  }, new Map<string, { duplicate: boolean; multipleUrls: boolean }>());
}
