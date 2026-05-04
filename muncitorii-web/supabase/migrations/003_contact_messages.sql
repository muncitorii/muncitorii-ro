-- ============================================================
-- Muncitorii.ro — Migration 003
-- Tabela contact_messages pentru formularul de contact
-- ============================================================

create table public.contact_messages (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null,
  email       text not null,
  subject     text default '',
  message     text not null,
  user_id     uuid references auth.users(id) on delete set null,
  status      text default 'new' check (status in ('new', 'read', 'replied', 'archived')),
  created_at  timestamptz default now() not null
);

create index contact_messages_created_at_idx on public.contact_messages(created_at desc);
create index contact_messages_status_idx on public.contact_messages(status);

alter table public.contact_messages enable row level security;

-- Oricine poate trimite un mesaj (rate limiting se poate adăuga ulterior)
create policy "Anyone can submit contact message"
  on public.contact_messages for insert with check (true);

-- Doar admin (definit prin email în service role context) poate citi
-- Pentru moment, citire doar prin Supabase Dashboard
