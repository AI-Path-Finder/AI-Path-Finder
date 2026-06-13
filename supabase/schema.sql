-- Optional Supabase schema for persisting assessments
-- Run in Supabase SQL Editor if you want backend persistence

create table if not exists assessments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users,
  company_name text,
  onboarding jsonb not null default '{}',
  opportunities jsonb,
  top_recommendation_id text,
  created_at timestamptz default now()
);

alter table assessments enable row level security;

create policy "Allow anonymous inserts"
  on assessments for insert
  with check (true);

create policy "Allow anonymous reads"
  on assessments for select
  using (true);
