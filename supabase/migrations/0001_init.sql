-- IDROK BUSINESS: first database migration.
-- Run in the Supabase SQL editor (or `supabase db push`).
-- Rule: every table has Row Level Security ON; users only see their own rows.

-- 1) profiles: one row per user. `level` drives the game levels (0 = beginner).
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  level int not null default 0 check (level >= 0),
  created_at timestamptz not null default now()
);

-- 2) products: things we research. `is_demo` keeps demo data separate from real data.
create table public.products (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users (id) on delete cascade,
  name text not null check (char_length(name) between 1 and 200),
  marketplace text not null default 'amazon' check (marketplace in ('amazon', 'uzum')),
  category text,
  source_url text,
  notes text,
  status text not null default 'new'
    check (status in ('new', 'researching', 'needs_review', 'approved', 'rejected')),
  rejection_reason text,
  is_demo boolean not null default false,
  created_at timestamptz not null default now()
);
create index products_owner_idx on public.products (owner_id, created_at desc);

-- 3) audit_log: append-only record of important actions (no update/delete policies).
create table public.audit_log (
  id bigint generated always as identity primary key,
  actor_id uuid not null references auth.users (id) on delete cascade,
  action text not null,
  entity text not null,
  entity_id uuid,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.audit_log enable row level security;

create policy "own profile read" on public.profiles for select using (id = auth.uid());
-- Users can NOT change their own level: levels are raised by trusted server code only.

create policy "own products read" on public.products for select using (owner_id = auth.uid());
create policy "own products insert" on public.products for insert with check (owner_id = auth.uid());
create policy "own products update" on public.products for update
  using (owner_id = auth.uid()) with check (owner_id = auth.uid());
create policy "own products delete" on public.products for delete using (owner_id = auth.uid());

create policy "own audit read" on public.audit_log for select using (actor_id = auth.uid());
create policy "own audit insert" on public.audit_log for insert with check (actor_id = auth.uid());

-- Auto-create a profile (level 0) when someone signs up.
create function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id) values (new.id);
  return new;
end $$;

create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();
