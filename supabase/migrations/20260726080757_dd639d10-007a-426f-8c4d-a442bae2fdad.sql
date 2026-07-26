ALTER TABLE public.posts
  ADD COLUMN IF NOT EXISTS focus_keyword text,
  ADD COLUMN IF NOT EXISTS canonical_url text,
  ADD COLUMN IF NOT EXISTS cover_image_alt text,
  ADD COLUMN IF NOT EXISTS og_title text,
  ADD COLUMN IF NOT EXISTS og_description text,
  ADD COLUMN IF NOT EXISTS og_image text,
  ADD COLUMN IF NOT EXISTS tags text[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS reading_time integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS author text,
  ADD COLUMN IF NOT EXISTS scheduled_at timestamp with time zone;

DROP TRIGGER IF EXISTS posts_touch_updated_at ON public.posts;
CREATE TRIGGER posts_touch_updated_at
  BEFORE UPDATE ON public.posts
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();