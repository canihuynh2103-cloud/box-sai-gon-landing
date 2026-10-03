/* eslint-disable @typescript-eslint/no-explicit-any */
import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { DbPost } from "@/hooks/use-content";

const client = supabase as any;

export type PostDetail = {
  title: string;
  excerpt: string | null;
  content: string | null;
  cover_image: string | null;
  cover_image_alt: string | null;
  category: string | null;
  published_at: string | null;
  updated_at: string | null;
  author: string | null;
  tags: string[] | null;
  reading_time: number | null;
  seo_title: string | null;
  seo_description: string | null;
  canonical_url: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
};

/** Same key/shape as usePosts() so the cache is shared. */
export const postsListQuery = () =>
  queryOptions({
    queryKey: ["content", "posts"],
    queryFn: async () => {
      const { data, error } = await client
        .from("posts")
        .select("id,title,slug,excerpt,content,cover_image,category,published_at,seo_title,seo_description")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return (data ?? []) as DbPost[];
    },
    staleTime: 60_000,
  });

export const postDetailQuery = (slug: string) =>
  queryOptions({
    queryKey: ["content", "post", slug],
    queryFn: async () => {
      const { data } = await client
        .from("posts")
        .select(
          "title,excerpt,content,cover_image,cover_image_alt,category,published_at,updated_at,author,tags,reading_time,seo_title,seo_description,canonical_url,og_title,og_description,og_image",
        )
        .eq("slug", slug)
        .maybeSingle();
      return (data as PostDetail | null) ?? null;
    },
    staleTime: 60_000,
  });
