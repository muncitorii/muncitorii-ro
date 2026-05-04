-- ============================================================
-- Muncitorii.ro — Migration 002
-- Auto-creare profil worker la înregistrare cu rol='worker'
-- ============================================================

-- Helper: slug-ify nume (Liviu Stoia → liviu-stoia)
create or replace function public.slugify(input text)
returns text language plpgsql immutable as $$
declare
  result text;
begin
  result := lower(unaccent(input));
  result := regexp_replace(result, '[^a-z0-9]+', '-', 'g');
  result := regexp_replace(result, '^-+|-+$', '', 'g');
  return result;
end;
$$;

-- Trigger updated: profil + worker dacă rol=worker
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public, extensions
as $$
declare
  v_role text;
  v_full_name text;
  v_trade text;
  v_trade_slug text;
  v_city text;
  v_slug_base text;
  v_slug text;
  v_counter int := 0;
begin
  v_role := coalesce(new.raw_user_meta_data->>'role', 'client');
  v_full_name := coalesce(new.raw_user_meta_data->>'full_name', '');
  v_trade := new.raw_user_meta_data->>'trade';
  v_trade_slug := new.raw_user_meta_data->>'trade_slug';
  v_city := new.raw_user_meta_data->>'city';

  -- Insert profile (with phone if present)
  insert into public.profiles (id, role, full_name, city)
  values (new.id, v_role, v_full_name, v_city);

  -- If worker, also create worker row
  if v_role = 'worker' and v_full_name <> '' and v_trade is not null and v_city is not null then
    -- Generate unique slug
    v_slug_base := public.slugify(v_full_name);
    if v_slug_base = '' then v_slug_base := 'meserias-' || substr(new.id::text, 1, 8); end if;
    v_slug := v_slug_base;

    while exists(select 1 from public.workers where slug = v_slug) loop
      v_counter := v_counter + 1;
      v_slug := v_slug_base || '-' || v_counter;
    end loop;

    insert into public.workers (
      user_id, slug, name, trade, trade_slug,
      city, county, bio, is_active, is_verified
    )
    values (
      new.id, v_slug, v_full_name, v_trade,
      coalesce(v_trade_slug, public.slugify(v_trade)),
      v_city, v_city,
      '',
      true, false
    );
  end if;

  return new;
end;
$$;

-- Permite vizualizare workers chiar și pentru anon
-- (deja exista policy "Muncitori activi vizibili public" — verificat)
