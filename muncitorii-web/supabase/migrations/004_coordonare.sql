-- ============================================================
-- Muncitorii.ro → "Renovări coordonate" — Migration 004
-- Pivot de la marketplace la serviciul de coordonare a renovărilor.
--
-- IMPORTANT — citește înainte de a rula:
-- 1. NU rulăm această migrație pe proiectul Supabase live automat.
--    Comanda manuală (din rădăcina repo-ului, cu Supabase CLI configurat):
--      supabase db push
--    sau, direct în SQL Editor din Supabase Dashboard, lipești tot fișierul.
-- 2. Migrațiile 001-003 NU sunt modificate. Tabela veche `public.jobs`
--    (marketplace: client posta o lucrare publică, muncitorii aplicau)
--    este REDENUMITĂ în `public.legacy_marketplace_jobs` ca să elimine
--    coliziunea de nume cu noua tabelă `jobs` (coordonare). Datele vechi
--    NU se șterg.
-- 3. Rolul 'admin' e adăugat la constrângerea de rol din `profiles`.
--    Nu există auto-creare de admin — promovarea la admin se face manual
--    din SQL Editor (vezi README-COORDONARE.md).
-- ============================================================

-- ------------------------------------------------------------
-- 0. Redenumire tabelă marketplace veche (evită coliziunea de nume)
-- ------------------------------------------------------------
do $$
begin
  if exists (select 1 from information_schema.tables where table_schema = 'public' and table_name = 'jobs') then
    alter table public.jobs rename to legacy_marketplace_jobs;
  end if;
  -- indexurile vechi păstrează numele după rename → le redenumim ca să nu
  -- intre în coliziune cu indexurile noii tabele `jobs`
  if exists (select 1 from pg_indexes where schemaname='public' and tablename='legacy_marketplace_jobs' and indexname='jobs_status_idx') then
    alter index public.jobs_status_idx rename to legacy_marketplace_jobs_status_idx;
  end if;
  if exists (select 1 from pg_indexes where schemaname='public' and tablename='legacy_marketplace_jobs' and indexname='jobs_category_idx') then
    alter index public.jobs_category_idx rename to legacy_marketplace_jobs_category_idx;
  end if;
  if exists (select 1 from pg_indexes where schemaname='public' and tablename='legacy_marketplace_jobs' and indexname='jobs_city_idx') then
    alter index public.jobs_city_idx rename to legacy_marketplace_jobs_city_idx;
  end if;
  if exists (select 1 from pg_indexes where schemaname='public' and tablename='legacy_marketplace_jobs' and indexname='jobs_pkey') then
    alter index public.jobs_pkey rename to legacy_marketplace_jobs_pkey;
  end if;
end $$;

-- Permite rolul 'admin' pe profiles (fostul check permitea doar client/worker)
alter table public.profiles drop constraint if exists profiles_role_check;
alter table public.profiles add constraint profiles_role_check
  check (role in ('client', 'worker', 'admin'));

-- ------------------------------------------------------------
-- 1. CLIENTS — clienți ai serviciului de coordonare (fără cont)
-- ------------------------------------------------------------
create table if not exists public.clients (
  id          uuid primary key default uuid_generate_v4(),
  full_name   text not null,
  phone       text not null,
  email       text,
  city        text,
  created_at  timestamptz default now() not null
);

alter table public.clients enable row level security;

-- Fără politici de select/insert pentru anon/authenticated: totul trece
-- prin server actions cu service role. Doar admin (autentificat, rol admin
-- verificat în application layer) citește prin service role.
-- Nu adăugăm politici -> RLS blochează tot accesul direct (anon + authenticated),
-- exact comportamentul dorit ("restul doar prin API server-side cu service role").

-- ------------------------------------------------------------
-- 2. SUBCONTRACTORS — meseriași parteneri (fără cont, gestionați de admin)
-- ------------------------------------------------------------
create table if not exists public.subcontractors (
  id                uuid primary key default uuid_generate_v4(),
  full_name         text not null,
  trade             text not null,
  city              text,
  phone             text not null,
  experience_years  int,
  portfolio_photos  text[] default '{}',
  status            text default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at        timestamptz default now() not null
);

alter table public.subcontractors enable row level security;

-- ------------------------------------------------------------
-- 3. JOBS (coordonare) — lucrarea unui client, coordonată de admin
-- ------------------------------------------------------------
create table if not exists public.jobs (
  id            uuid primary key default uuid_generate_v4(),
  client_id     uuid not null references public.clients(id) on delete cascade,
  brief         jsonb default '{}'::jsonb not null, -- tip lucrare, descriere, poze intake, etc.
  status        text default 'intake' check (status in ('intake', 'evaluare', 'oferte', 'in_lucru', 'finalizat')),
  public_token  uuid unique default uuid_generate_v4() not null, -- folosit în /p/[token]
  city          text,
  budget_hint   text,
  deadline_hint text,
  created_at    timestamptz default now() not null,
  updated_at    timestamptz default now() not null
);

create index if not exists jobs_public_token_idx on public.jobs(public_token);
create index if not exists jobs_client_idx on public.jobs(client_id);
create index if not exists jobs_status_idx on public.jobs(status);

alter table public.jobs enable row level security;

-- ------------------------------------------------------------
-- 4. JOB_STAGES — etapele lucrării, cu confirmare client
-- ------------------------------------------------------------
create table if not exists public.job_stages (
  id                    uuid primary key default uuid_generate_v4(),
  job_id                uuid not null references public.jobs(id) on delete cascade,
  sequence              int not null default 1,
  name                  text not null,
  deadline              date,
  status                text default 'pending' check (status in ('pending', 'in_progress', 'awaiting_approval', 'approved')),
  client_approved_at    timestamptz,
  client_approved_ip    text,
  client_approved_method text check (client_approved_method in ('click_link', 'admin_override')),
  created_at            timestamptz default now() not null
);

create index if not exists job_stages_job_idx on public.job_stages(job_id);
create unique index job_stages_job_sequence_idx on public.job_stages(job_id, sequence);

alter table public.job_stages enable row level security;

-- ------------------------------------------------------------
-- 5. RFQS — cereri de ofertă trimise către subcontractori (Sprint 2+ folosește mai mult; schema pregătită acum)
-- ------------------------------------------------------------
create table if not exists public.rfqs (
  id                uuid primary key default uuid_generate_v4(),
  job_id            uuid not null references public.jobs(id) on delete cascade,
  subcontractor_id  uuid references public.subcontractors(id) on delete set null,
  status            text default 'sent' check (status in ('sent', 'responded', 'declined')),
  created_at        timestamptz default now() not null
);

create index if not exists rfqs_job_idx on public.rfqs(job_id);

alter table public.rfqs enable row level security;

-- ------------------------------------------------------------
-- 6. OFFERS — oferte primite (comparabile) pentru o lucrare
-- ------------------------------------------------------------
create table if not exists public.offers (
  id                uuid primary key default uuid_generate_v4(),
  job_id            uuid not null references public.jobs(id) on delete cascade,
  subcontractor_id  uuid references public.subcontractors(id) on delete set null,
  amount            numeric(10,2),
  notes             text default '',
  status            text default 'pending' check (status in ('pending', 'accepted', 'rejected')),
  created_at        timestamptz default now() not null
);

create index if not exists offers_job_idx on public.offers(job_id);

alter table public.offers enable row level security;

-- ------------------------------------------------------------
-- 7. CHANGE_ORDERS — costuri extra, aprobate explicit de client
-- ------------------------------------------------------------
create table if not exists public.change_orders (
  id            uuid primary key default uuid_generate_v4(),
  job_id        uuid not null references public.jobs(id) on delete cascade,
  stage_id      uuid references public.job_stages(id) on delete set null,
  description   text not null,
  extra_cost    numeric(10,2) not null,
  status        text default 'pending' check (status in ('pending', 'approved', 'rejected')),
  approved_at   timestamptz,
  approved_ip   text,
  approved_method text check (approved_method in ('click_link', 'admin_override')),
  created_at    timestamptz default now() not null
);

create index if not exists change_orders_job_idx on public.change_orders(job_id);

alter table public.change_orders enable row level security;

-- ------------------------------------------------------------
-- 8. PHOTOS — poze intake / înainte / după, legate de etapă (opțional)
-- ------------------------------------------------------------
create table if not exists public.photos (
  id            uuid primary key default uuid_generate_v4(),
  job_id        uuid not null references public.jobs(id) on delete cascade,
  stage_id      uuid references public.job_stages(id) on delete set null,
  kind          text not null check (kind in ('intake', 'before', 'after')),
  storage_path  text not null, -- path în bucket-ul privat job-photos
  created_at    timestamptz default now() not null
);

create index if not exists photos_job_idx on public.photos(job_id);
create index if not exists photos_stage_idx on public.photos(stage_id);

alter table public.photos enable row level security;

-- ------------------------------------------------------------
-- 9. DOCUMENTS — dosarul digital final (facturi, garanții, instrucțiuni, PV, oferte PDF)
-- ------------------------------------------------------------
create table if not exists public.documents (
  id            uuid primary key default uuid_generate_v4(),
  job_id        uuid not null references public.jobs(id) on delete cascade,
  kind          text not null check (kind in ('invoice', 'warranty', 'instructions', 'pv', 'offer_pdf')),
  storage_path  text not null, -- path în bucket-ul privat job-photos (folder /documents)
  label         text default '',
  created_at    timestamptz default now() not null
);

create index if not exists documents_job_idx on public.documents(job_id);

alter table public.documents enable row level security;

-- ============================================================
-- RLS: admin full access, restul doar prin API server-side (service role)
-- ============================================================
-- Notă: service role bypass-uiește automat RLS, deci server actions care
-- folosesc `createAdminClient()` (service role key) funcționează indiferent
-- de politicile de mai jos. Politicile de "admin full" sunt pentru accesul
-- direct din Supabase Dashboard / din client autentificat cu rol admin
-- (ex. dacă vom muta vreodată citirea admin pe client-side cu sesiune RLS).

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.profiles where id = auth.uid() and role = 'admin'
  );
$$;

drop policy if exists "Admin full access clients" on public.clients;
create policy "Admin full access clients" on public.clients for all using (public.is_admin()) with check (public.is_admin());
drop policy if exists "Admin full access subcontractors" on public.subcontractors;
create policy "Admin full access subcontractors" on public.subcontractors for all using (public.is_admin()) with check (public.is_admin());
drop policy if exists "Admin full access jobs" on public.jobs;
create policy "Admin full access jobs" on public.jobs for all using (public.is_admin()) with check (public.is_admin());
drop policy if exists "Admin full access job_stages" on public.job_stages;
create policy "Admin full access job_stages" on public.job_stages for all using (public.is_admin()) with check (public.is_admin());
drop policy if exists "Admin full access rfqs" on public.rfqs;
create policy "Admin full access rfqs" on public.rfqs for all using (public.is_admin()) with check (public.is_admin());
drop policy if exists "Admin full access offers" on public.offers;
create policy "Admin full access offers" on public.offers for all using (public.is_admin()) with check (public.is_admin());
drop policy if exists "Admin full access change_orders" on public.change_orders;
create policy "Admin full access change_orders" on public.change_orders for all using (public.is_admin()) with check (public.is_admin());
drop policy if exists "Admin full access photos" on public.photos;
create policy "Admin full access photos" on public.photos for all using (public.is_admin()) with check (public.is_admin());
drop policy if exists "Admin full access documents" on public.documents;
create policy "Admin full access documents" on public.documents for all using (public.is_admin()) with check (public.is_admin());

-- ============================================================
-- STORAGE — bucket privat pentru poze + documente
-- ============================================================
insert into storage.buckets (id, name, public)
values ('job-photos', 'job-photos', false)
on conflict do nothing;

drop policy if exists "Admin full access job-photos storage" on storage.objects;
create policy "Admin full access job-photos storage"
  on storage.objects for all
  using (bucket_id = 'job-photos' and public.is_admin())
  with check (bucket_id = 'job-photos' and public.is_admin());

-- Accesul clientului la poze/documente NU se face prin politici de storage
-- directe (portalul /p/[token] e public, fără auth) — server actions
-- generează URL-uri semnate (createSignedUrl) cu service role, valide
-- temporar. Fără politică publică pe bucket = fără leak de poze din alte
-- lucrări.

-- ============================================================
-- Trigger updated_at pe jobs
-- ============================================================
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists jobs_set_updated_at on public.jobs;
create trigger jobs_set_updated_at before update on public.jobs
  for each row execute procedure public.set_updated_at();

-- ============================================================
-- GRANTS — fără acestea, cheia service_role/sb_secret primește
-- "permission denied for table ..." (42501) pe PostgREST.
-- ============================================================
grant usage on schema public to anon, authenticated, service_role;
grant all on all tables in schema public to service_role;
grant all on all sequences in schema public to service_role;
grant all on all functions in schema public to service_role;
alter default privileges in schema public grant all on tables to service_role;
alter default privileges in schema public grant all on sequences to service_role;
alter default privileges in schema public grant all on functions to service_role;
-- authenticated: doar prin RLS (politicile admin) — fără grant nu poate nici cu policy
grant select, insert, update, delete on all tables in schema public to authenticated;
alter default privileges in schema public grant select, insert, update, delete on tables to authenticated;
