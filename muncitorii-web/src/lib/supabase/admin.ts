import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://afesbzdgftvvebkerjpp.supabase.co";

const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

/**
 * Client Supabase cu service role — bypass RLS. Folosit DOAR în server
 * actions / route handlers, niciodată expus către client.
 *
 * Toate tabelele coordonare (clients, jobs, job_stages, ...) nu au
 * politici RLS pentru anon/authenticated, deci accesul public (intake,
 * portal client, formular parteneri) trebuie mereu să treacă prin acest
 * client din server action.
 *
 * Returnează `null` dacă SUPABASE_SERVICE_ROLE_KEY nu e setat în env —
 * apelantul trebuie să trateze acest caz (mesaj clar către utilizator +
 * fallback la date seed în UI, vezi src/lib/seed-coordonare.ts).
 */
export function createAdminClient() {
  if (!SERVICE_ROLE_KEY) return null;
  return createSupabaseClient<Database>(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export function hasServiceRole(): boolean {
  return Boolean(SERVICE_ROLE_KEY);
}
