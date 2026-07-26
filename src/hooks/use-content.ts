/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const client = supabase as any;

export type DbService = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  icon: string | null;
  image: string | null;
};

export type DbProject = {
  id: string;
  name: string;
  category: string;
  year: string | null;
  location: string | null;
  duration: string | null;
  image: string | null;
  description: string | null;
};

export type DbReview = {
  id: string;
  name: string;
  role: string | null;
  content: string;
  rating: number;
};

export type DbPricing = {
  id: string;
  name: string;
  price: string;
  unit: string | null;
  note: string | null;
  features: string[];
  cta: string | null;
  popular: boolean;
};

export type DbFaq = { id: string; question: string; answer: string };

export type DbPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  cover_image: string | null;
  category: string | null;
  published_at: string | null;
  seo_title: string | null;
  seo_description: string | null;
};

function useContent<T>(key: string, table: string, columns: string, order = "sort_order") {
  return useQuery<T[]>({
    queryKey: ["content", key],
    queryFn: async () => {
      const { data, error } = await client
        .from(table)
        .select(columns)
        .order(order, { ascending: true });
      if (error) throw error;
      return (data ?? []) as T[];
    },
    staleTime: 60_000,
  });
}

export const useServices = () =>
  useContent<DbService>("services", "services", "id,title,slug,description,icon,image");

export const useProjects = () =>
  useContent<DbProject>(
    "projects",
    "projects",
    "id,name,category,year,location,duration,image,description",
  );

export const useReviews = () =>
  useContent<DbReview>("reviews", "reviews", "id,name,role,content,rating");

export const usePricing = () =>
  useContent<DbPricing>(
    "pricing_plans",
    "pricing_plans",
    "id,name,price,unit,note,features,cta,popular",
  );

export const useFaqs = () => useContent<DbFaq>("faqs", "faqs", "id,question,answer");

export const usePosts = () =>
  useContent<DbPost>(
    "posts",
    "posts",
    "id,title,slug,excerpt,content,cover_image,category,published_at,seo_title,seo_description",
  );

export function usePostsByCategory() {
  const { data = [] } = usePosts();
  return data.reduce<Record<string, DbPost[]>>((acc, post) => {
    const key = post.category ?? "Khác";
    acc[key] = acc[key] ? [...acc[key], post] : [post];
    return acc;
  }, {});
}

export function useHeroBanner() {
  return useQuery({
    queryKey: ["content", "banner-hero"],
    queryFn: async () => {
      const { data } = await client
        .from("banners")
        .select("id,title,subtitle,image,cta_label,cta_href")
        .eq("position", "hero")
        .order("sort_order", { ascending: true })
        .limit(1)
        .maybeSingle();
      return data as {
        title: string;
        subtitle: string | null;
        image: string | null;
        cta_label: string | null;
        cta_href: string | null;
      } | null;
    },
    staleTime: 60_000,
  });
}
