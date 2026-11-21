CREATE TABLE public.seo_gsc_snapshots (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 site_url text NOT NULL,
 query text NOT NULL,
 page_url text NOT NULL,
 clicks bigint NOT NULL CHECK (clicks >= 0),
 impressions bigint NOT NULL CHECK (impressions >= 0),
 ctr double precision NOT NULL CHECK (ctr BETWEEN 0 AND 1),
 position double precision NOT NULL CHECK (position >= 0),
 start_date date NOT NULL,
 end_date date NOT NULL,
 fetched_at timestamptz NOT NULL DEFAULT now(),
 UNIQUE (site_url,query,page_url,start_date,end_date)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.seo_gsc_snapshots TO authenticated;
GRANT ALL ON public.seo_gsc_snapshots TO service_role;
ALTER TABLE public.seo_gsc_snapshots ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admin manage seo search snapshots" ON public.seo_gsc_snapshots FOR ALL TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role)) WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));