-- ============================================================
-- Muncitorii.ro — Schema inițială
-- ============================================================

-- Extensii
create extension if not exists "uuid-ossp";
create extension if not exists "unaccent";

-- ============================================================
-- PROFILES (extinde auth.users cu rol + info suplimentar)
-- ============================================================
create table public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  role        text not null check (role in ('client', 'worker')),
  full_name   text,
  phone       text,
  city        text,
  county      text,
  created_at  timestamptz default now() not null
);

alter table public.profiles enable row level security;

create policy "Profil vizibil public"
  on public.profiles for select using (true);

create policy "Userul își editează propriul profil"
  on public.profiles for update using (auth.uid() = id);

-- Creare automată profil la înregistrare
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, role, full_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'role', 'client'),
    coalesce(new.raw_user_meta_data->>'full_name', '')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================
-- WORKERS
-- ============================================================
create table public.workers (
  id                uuid primary key default uuid_generate_v4(),
  user_id           uuid not null references auth.users(id) on delete cascade,
  slug              text unique not null,
  name              text not null,
  trade             text not null,
  trade_slug        text not null,
  city              text not null,
  county            text not null,
  rating            numeric(3,2) default 0 not null,
  review_count      int default 0 not null,
  experience_years  int default 0 not null,
  response_time     text default 'Nespecificat',
  availability      text default 'Disponibil',
  bio               text default '',
  badges            text[] default '{}',
  hourly_rate_min   int,
  hourly_rate_max   int,
  phone             text,
  is_verified       boolean default false not null,
  is_active         boolean default true not null,
  created_at        timestamptz default now() not null
);

create index workers_trade_slug_idx on public.workers(trade_slug);
create index workers_city_idx on public.workers(city);
create index workers_is_active_idx on public.workers(is_active);

alter table public.workers enable row level security;

create policy "Muncitori activi vizibili public"
  on public.workers for select using (is_active = true);

create policy "Muncitorul își editează propriul profil"
  on public.workers for update using (auth.uid() = user_id);

create policy "Muncitorul își poate insera profilul"
  on public.workers for insert with check (auth.uid() = user_id);

-- ============================================================
-- PORTFOLIO ITEMS
-- ============================================================
create table public.portfolio_items (
  id          uuid primary key default uuid_generate_v4(),
  worker_id   uuid not null references public.workers(id) on delete cascade,
  title       text not null,
  description text default '',
  images      text[] default '{}',
  created_at  timestamptz default now() not null
);

create index portfolio_worker_idx on public.portfolio_items(worker_id);

alter table public.portfolio_items enable row level security;

create policy "Portfolio vizibil public"
  on public.portfolio_items for select using (true);

create policy "Muncitorul își editează portfolio-ul"
  on public.portfolio_items for all
  using (
    auth.uid() = (select user_id from public.workers where id = worker_id)
  );

-- ============================================================
-- REVIEWS
-- ============================================================
create table public.reviews (
  id          uuid primary key default uuid_generate_v4(),
  worker_id   uuid not null references public.workers(id) on delete cascade,
  author_id   uuid references auth.users(id) on delete set null,
  author_name text not null,
  author_city text default '',
  text        text not null,
  rating      int not null check (rating between 1 and 5),
  job_title   text default '',
  created_at  timestamptz default now() not null
);

create index reviews_worker_idx on public.reviews(worker_id);

alter table public.reviews enable row level security;

create policy "Recenzii vizibile public"
  on public.reviews for select using (true);

create policy "Utilizatorii autentificați pot adăuga recenzii"
  on public.reviews for insert with check (auth.uid() is not null);

-- Actualizare automată rating după inserare/ștergere recenzie
create or replace function public.update_worker_rating()
returns trigger language plpgsql security definer set search_path = public
as $$
declare
  v_worker_id uuid;
begin
  v_worker_id := coalesce(new.worker_id, old.worker_id);
  update public.workers
  set
    rating = (
      select round(avg(rating)::numeric, 2)
      from public.reviews
      where worker_id = v_worker_id
    ),
    review_count = (
      select count(*) from public.reviews where worker_id = v_worker_id
    )
  where id = v_worker_id;
  return coalesce(new, old);
end;
$$;

create trigger on_review_change
  after insert or delete on public.reviews
  for each row execute procedure public.update_worker_rating();

-- ============================================================
-- JOBS (lucrări postate de clienți)
-- ============================================================
create table public.jobs (
  id          uuid primary key default uuid_generate_v4(),
  client_id   uuid not null references auth.users(id) on delete cascade,
  title       text not null,
  description text default '',
  category    text not null,
  city        text not null,
  county      text not null,
  budget_min  int,
  budget_max  int,
  status      text default 'deschis' check (status in ('deschis', 'in_lucru', 'finalizat', 'anulat')),
  created_at  timestamptz default now() not null
);

create index jobs_status_idx on public.jobs(status);
create index jobs_category_idx on public.jobs(category);
create index jobs_city_idx on public.jobs(city);

alter table public.jobs enable row level security;

create policy "Lucrări deschise vizibile public"
  on public.jobs for select using (status = 'deschis');

create policy "Clientul vede propriile lucrări"
  on public.jobs for select using (auth.uid() = client_id);

create policy "Clientul poate posta lucrări"
  on public.jobs for insert with check (auth.uid() = client_id);

create policy "Clientul poate edita lucrările proprii"
  on public.jobs for update using (auth.uid() = client_id);

-- ============================================================
-- STORAGE BUCKETS
-- ============================================================
insert into storage.buckets (id, name, public)
values ('portfolio', 'portfolio', true)
on conflict do nothing;

create policy "Portfolio images vizibile public"
  on storage.objects for select
  using (bucket_id = 'portfolio');

create policy "Utilizatorii autentificați pot urca imagini"
  on storage.objects for insert
  with check (
    bucket_id = 'portfolio'
    and auth.uid() is not null
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Utilizatorii șterg propriile imagini"
  on storage.objects for delete
  using (
    bucket_id = 'portfolio'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
