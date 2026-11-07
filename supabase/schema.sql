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


-- ===================== Admin content (blog, media, photo slots) =====================
-- Same model as above: RLS on, no policies. Only the server (service-role key) reads/writes.

create table if not exists public.posts (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  slug         text not null unique,
  title        text not null,
  excerpt      text not null default '',
  body         text not null default '',
  cover_url    text,
  published    boolean not null default false,
  published_at timestamptz
);

create table if not exists public.media (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  kind        text not null check (kind in ('image', 'video')),
  path        text not null unique,
  url         text not null,
  title       text not null default '',
  alt         text not null default '',
  caption     text not null default '',
  in_gallery  boolean not null default true
);

-- Overrides for the photography slots defined in src/config/photos.ts.
create table if not exists public.photo_slots (
  slot        text primary key,
  url         text not null,
  alt         text,
  updated_at  timestamptz not null default now()
);

alter table public.posts       enable row level security;
alter table public.media       enable row level security;
alter table public.photo_slots enable row level security;
revoke all on public.posts, public.media, public.photo_slots from anon, authenticated;

-- Public bucket for uploaded photos and videos (50 MB per file is the free-plan cap).
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('media', 'media', true, 52428800,
  array['image/jpeg','image/png','image/webp','image/gif','image/avif','video/mp4','video/webm','video/quicktime'])
on conflict (id) do update
  set public = excluded.public, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;
