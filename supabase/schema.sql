-- Run once in the Supabase SQL editor.
-- RLS is enabled with NO policies: the public/anon key cannot read or write
-- anything. Only the server (service-role key) and dashboard users can.

create table if not exists public.founder_applications (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  status      text not null default 'new',
  name        text,
  email       text,
  answers     jsonb not null,
  ip_hash     text,
  user_agent  text
);
create table if not exists public.investor_applications (like public.founder_applications including all);
create table if not exists public.service_enquiries     (like public.founder_applications including all);

alter table public.founder_applications  enable row level security;
alter table public.investor_applications enable row level security;
alter table public.service_enquiries     enable row level security;

revoke all on public.founder_applications  from anon, authenticated;
revoke all on public.investor_applications from anon, authenticated;
revoke all on public.service_enquiries     from anon, authenticated;
