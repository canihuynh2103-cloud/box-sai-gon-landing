/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from "@/integrations/supabase/client";

export type TableName =
  | "posts"
  | "services"
  | "faqs"
  | "pricing_plans"
  | "projects"
  | "reviews"
  | "banners";

/** Untyped view of the generated client, used by the generic CRUD manager. */
export const db = supabase as any;

export type Row = Record<string, any>;

export async function listRows(
  table: TableName,
  order: { column: string; ascending?: boolean } = { column: "sort_order", ascending: true },
): Promise<Row[]> {
  const { data, error } = await db
    .from(table)
    .select("*")
    .order(order.column, { ascending: order.ascending ?? true });
  if (error) throw error;
  return (data ?? []) as Row[];
}

export async function saveRow(table: TableName, values: Row, id?: string) {
  if (id) {
    const { error } = await db.from(table).update(values).eq("id", id);
    if (error) throw error;
    return;
  }
  const { error } = await db.from(table).insert(values);
  if (error) throw error;
}

/** Same as saveRow but returns the row id (needed for auto-save of new posts). */
export async function saveRowReturning(
  table: TableName,
  values: Row,
  id?: string,
): Promise<string> {
  if (id) {
    const { error } = await db.from(table).update(values).eq("id", id);
    if (error) throw error;
    return id;
  }
  const { data, error } = await db.from(table).insert(values).select("id").single();
  if (error) throw error;
  return data.id as string;
}

export async function getRow(table: TableName, id: string): Promise<Row | null> {
  const { data, error } = await db.from(table).select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return (data ?? null) as Row | null;
}


export async function deleteRow(table: TableName, id: string) {
  const { error } = await db.from(table).delete().eq("id", id);
  if (error) throw error;
}

const TEN_YEARS = 60 * 60 * 24 * 365 * 10;

/** Uploads a file to the private "media" bucket and returns a long-lived signed URL. */
export async function uploadMedia(file: File): Promise<string> {
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${new Date().getFullYear()}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage
    .from("media")
    .upload(path, file, { cacheControl: "31536000", upsert: false });
  if (error) throw error;
  const { data, error: signError } = await supabase.storage
    .from("media")
    .createSignedUrl(path, TEN_YEARS);
  if (signError) throw signError;
  return data.signedUrl;
}

export function slugify(input: string) {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
