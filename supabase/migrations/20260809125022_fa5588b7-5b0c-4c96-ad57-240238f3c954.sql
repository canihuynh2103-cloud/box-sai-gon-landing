ALTER TABLE public.quote_requests
  ADD COLUMN IF NOT EXISTS workers_count text,
  ADD COLUMN IF NOT EXISTS cargo_type text,
  ADD COLUMN IF NOT EXISTS customer_email_status text NOT NULL DEFAULT 'pending';