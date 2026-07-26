DROP POLICY IF EXISTS "public read posts" ON public.posts;
CREATE POLICY "public read posts" ON public.posts
  FOR SELECT TO anon, authenticated
  USING (status = 'published' AND (published_at IS NULL OR published_at <= now()));