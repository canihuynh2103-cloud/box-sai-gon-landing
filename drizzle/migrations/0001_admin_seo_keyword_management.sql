CREATE TABLE public.seo_keywords (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 keyword text NOT NULL CHECK (length(trim(keyword)) > 0),
 primary_keyword text NOT NULL DEFAULT '',
 secondary_keywords text[] NOT NULL DEFAULT '{}',
 semantic_keywords text[] NOT NULL DEFAULT '{}',
 long_tail_keywords text[] NOT NULL DEFAULT '{}',
 questions text[] NOT NULL DEFAULT '{}',
 keyword_group text NOT NULL DEFAULT 'A' CHECK (keyword_group IN ('A','B','C','D','E','F','G')),
 search_intent text NOT NULL DEFAULT 'transactional' CHECK (search_intent IN ('transactional','commercial','informational','navigational')),
 search_location text NOT NULL DEFAULT 'TP.HCM',
 target_url text NOT NULL DEFAULT '',
 content_type text NOT NULL DEFAULT 'service' CHECK (content_type IN ('home','service','blog','project','hub','local','other')),
 seo_title text NOT NULL DEFAULT '',
 meta_description text NOT NULL DEFAULT '',
 h1 text NOT NULL DEFAULT '',
 content_status text NOT NULL DEFAULT 'review' CHECK (content_status IN ('proposed','review','in_progress','approved')),
 priority integer NOT NULL DEFAULT 2 CHECK (priority BETWEEN 1 AND 3),
 evidence_source text NOT NULL DEFAULT 'proposed' CHECK (evidence_source IN ('proposed','gsc','semrush')),
 notes text NOT NULL DEFAULT '',
 related_urls text[] NOT NULL DEFAULT '{}',
 cta text NOT NULL DEFAULT 'Nhận báo giá',
 gsc_clicks bigint CHECK (gsc_clicks >= 0),
 gsc_impressions bigint CHECK (gsc_impressions >= 0),
 gsc_ctr double precision CHECK (gsc_ctr BETWEEN 0 AND 1),
 gsc_position double precision CHECK (gsc_position >= 0),
 gsc_start_date date,
 gsc_end_date date,
 gsc_synced_at timestamptz,
 semrush_volume integer CHECK (semrush_volume >= 0),
 semrush_difficulty numeric CHECK (semrush_difficulty BETWEEN 0 AND 100),
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.seo_keywords TO authenticated;
GRANT ALL ON public.seo_keywords TO service_role;
ALTER TABLE public.seo_keywords ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admin manage seo keywords" ON public.seo_keywords FOR ALL TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role)) WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE INDEX seo_keywords_target_idx ON public.seo_keywords (target_url);
CREATE INDEX seo_keywords_group_intent_idx ON public.seo_keywords (keyword_group, search_intent);
CREATE TRIGGER seo_keywords_touch_updated_at BEFORE UPDATE ON public.seo_keywords FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();