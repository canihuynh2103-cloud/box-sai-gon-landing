CREATE SCHEMA IF NOT EXISTS private;

CREATE OR REPLACE FUNCTION private.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

REVOKE ALL ON FUNCTION private.has_role(uuid, public.app_role) FROM PUBLIC;
GRANT USAGE ON SCHEMA private TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION private.has_role(uuid, public.app_role) TO authenticated, service_role;

DROP POLICY "admin delete profile" ON public.profiles;
DROP POLICY "own profile update" ON public.profiles;
DROP POLICY "own profile read" ON public.profiles;
CREATE POLICY "admin delete profile" ON public.profiles FOR DELETE TO authenticated
  USING (private.has_role(auth.uid(), 'admin'));
CREATE POLICY "own profile update" ON public.profiles FOR UPDATE TO authenticated
  USING ((auth.uid() = id) OR private.has_role(auth.uid(), 'admin'));
CREATE POLICY "own profile read" ON public.profiles FOR SELECT TO authenticated
  USING ((auth.uid() = id) OR private.has_role(auth.uid(), 'admin'));

DROP POLICY "admin manage roles" ON public.user_roles;
DROP POLICY "read own roles" ON public.user_roles;
CREATE POLICY "admin manage roles" ON public.user_roles FOR ALL TO authenticated
  USING (private.has_role(auth.uid(), 'admin'))
  WITH CHECK (private.has_role(auth.uid(), 'admin'));
CREATE POLICY "read own roles" ON public.user_roles FOR SELECT TO authenticated
  USING ((auth.uid() = user_id) OR private.has_role(auth.uid(), 'admin'));

DROP POLICY "admin manage services" ON public.services;
CREATE POLICY "admin manage services" ON public.services FOR ALL TO authenticated
  USING (private.has_role(auth.uid(), 'admin')) WITH CHECK (private.has_role(auth.uid(), 'admin'));
DROP POLICY "admin manage faqs" ON public.faqs;
CREATE POLICY "admin manage faqs" ON public.faqs FOR ALL TO authenticated
  USING (private.has_role(auth.uid(), 'admin')) WITH CHECK (private.has_role(auth.uid(), 'admin'));
DROP POLICY "admin manage reviews" ON public.reviews;
CREATE POLICY "admin manage reviews" ON public.reviews FOR ALL TO authenticated
  USING (private.has_role(auth.uid(), 'admin')) WITH CHECK (private.has_role(auth.uid(), 'admin'));
DROP POLICY "admin manage banners" ON public.banners;
CREATE POLICY "admin manage banners" ON public.banners FOR ALL TO authenticated
  USING (private.has_role(auth.uid(), 'admin')) WITH CHECK (private.has_role(auth.uid(), 'admin'));
DROP POLICY "admin manage pricing_plans" ON public.pricing_plans;
CREATE POLICY "admin manage pricing_plans" ON public.pricing_plans FOR ALL TO authenticated
  USING (private.has_role(auth.uid(), 'admin')) WITH CHECK (private.has_role(auth.uid(), 'admin'));
DROP POLICY "admin manage projects" ON public.projects;
CREATE POLICY "admin manage projects" ON public.projects FOR ALL TO authenticated
  USING (private.has_role(auth.uid(), 'admin')) WITH CHECK (private.has_role(auth.uid(), 'admin'));
DROP POLICY "admin manage posts" ON public.posts;
CREATE POLICY "admin manage posts" ON public.posts FOR ALL TO authenticated
  USING (private.has_role(auth.uid(), 'admin')) WITH CHECK (private.has_role(auth.uid(), 'admin'));

DROP POLICY "admin read media" ON storage.objects;
DROP POLICY "admin upload media" ON storage.objects;
DROP POLICY "admin update media" ON storage.objects;
DROP POLICY "admin delete media" ON storage.objects;
CREATE POLICY "admin read media" ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'media' AND private.has_role(auth.uid(), 'admin'));
CREATE POLICY "admin upload media" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'media' AND private.has_role(auth.uid(), 'admin'));
CREATE POLICY "admin update media" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'media' AND private.has_role(auth.uid(), 'admin'));
CREATE POLICY "admin delete media" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'media' AND private.has_role(auth.uid(), 'admin'));

DROP FUNCTION IF EXISTS public.has_role(uuid, public.app_role);