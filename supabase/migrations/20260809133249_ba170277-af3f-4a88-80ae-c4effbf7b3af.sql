-- 1. quote_requests: chặn ghi trực tiếp từ anon/authenticated, chỉ server (service_role) được insert
REVOKE ALL ON TABLE public.quote_requests FROM anon;
REVOKE INSERT ON TABLE public.quote_requests FROM authenticated;
GRANT SELECT, UPDATE, DELETE ON TABLE public.quote_requests TO authenticated;
GRANT ALL ON TABLE public.quote_requests TO service_role;

DROP POLICY IF EXISTS "No direct client inserts on quote requests" ON public.quote_requests;
CREATE POLICY "No direct client inserts on quote requests"
ON public.quote_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (false);

-- 2. private.has_role: chỉ authenticated + service_role được EXECUTE
REVOKE USAGE ON SCHEMA private FROM PUBLIC, anon;
GRANT USAGE ON SCHEMA private TO authenticated, service_role;
REVOKE ALL ON FUNCTION private.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION private.has_role(uuid, public.app_role) TO authenticated, service_role;