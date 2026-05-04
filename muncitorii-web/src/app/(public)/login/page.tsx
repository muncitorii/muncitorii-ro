"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

// metadata nu funcționează în Client Components — mutată în layout dacă e nevoie

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = e.currentTarget;
    const data = new FormData(form);
    const email = data.get("email") as string;
    const password = data.get("password") as string;

    try {
      const supabase = createClient();
      const { error: authError, data: authData } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError("Email sau parolă incorectă. Încearcă din nou.");
        setLoading(false);
        return;
      }

      const role = authData.user?.user_metadata?.role;
      router.push(role === "worker" ? "/dashboard/muncitor" : "/dashboard/client");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Eroare necunoscută. Încearcă din nou.");
      setLoading(false);
    }
  }

  return (
    <section className="px-4 py-10 md:px-6 md:py-16">
      <div className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-card md:p-8">
        <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
          Bine ai revenit
        </span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950">Intră în cont</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Continuă de unde ai rămas și gestionează lucrările, ofertele și conversațiile tale.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">Email</label>
            <Input id="email" name="email" type="email" placeholder="tu@email.com" autoComplete="email" required />
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-slate-700">Parolă</label>
            <Input id="password" name="password" type="password" placeholder="Parola ta" autoComplete="current-password" required />
          </div>

          {error && (
            <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Se verifică..." : "Intră în cont"}
          </Button>
        </form>

        <div className="mt-5 space-y-2 text-center text-sm text-slate-600">
          <div>
            <Link href="/register" className="font-semibold text-primary-900 hover:text-primary-700">
              Nu ai cont? Creează unul acum
            </Link>
          </div>
          <div>
            <Link href="/register/muncitor" className="text-slate-500 hover:text-slate-700">
              Ești meseriaș? Înregistrează-te ca profesionist
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
