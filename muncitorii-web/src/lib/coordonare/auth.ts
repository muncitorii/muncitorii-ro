import { createClient } from "@/lib/supabase/server";

/**
 * Verifică dacă userul curent (din cookie-ul de sesiune Supabase) e admin.
 * Folosește clientul server normal (anon key) — policy-ul "Profil vizibil
 * public" pe `profiles` permite select pentru orice rând, deci nu e nevoie
 * de service role aici.
 */
export async function getCurrentAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { user: null, isAdmin: false as const };

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, full_name")
    .eq("id", user.id)
    .maybeSingle();

  const isAdmin = profile?.role === "admin";
  return { user, isAdmin, fullName: profile?.full_name ?? user.email ?? "Admin" };
}
