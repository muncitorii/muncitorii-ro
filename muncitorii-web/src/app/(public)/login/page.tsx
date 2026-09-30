"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

// metadata nu funcționează în Client Components, mutată în layout dacă e nevoie

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const notAdmin = searchParams.get("error") === "not_admin";
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
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

      if (authError) {
        setError("Email sau parolă incorectă. Încearcă din nou.");
        setLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Eroare necunoscută. Încearcă din nou.");
      setLoading(false);
    }
  }

  return (
    <section className="px-4 py-10 md:px-6 md:py-16">
      <div className="mx-auto max-w-md">
        <div className="rounded-3xl bg-gradient-to-br from-primary-900 to-primary-950 px-6 py-7 text-white md:px-8 md:py-9">
          <p className="text-sm font-medium text-white/60">Zonă administrare</p>
          <h1 className="mt-1 text-2xl font-bold tracking-[-0.015em] text-white md:text-3xl">
            Intră în cont
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-white/75">
            Acces rezervat echipei Muncitorii.ro. Dacă ești client, urmărește lucrarea pe linkul
            personal primit după ce ai trimis cererea prin /cerere.
          </p>
        </div>

        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-card md:p-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">Email</label>
            <Input id="email" name="email" type="email" placeholder="tu@email.com" autoComplete="email" required />
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-slate-700">Parolă</label>
            <Input id="password" name="password" type="password" placeholder="Parola ta" autoComplete="current-password" required />
          </div>

          {notAdmin && !error && (
            <p className="rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">
              Contul tău nu are rol de admin.
            </p>
          )}

          {error && (
            <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Se verifică..." : "Intră în cont"}
          </Button>
        </form>
        </div>
      </div>
    </section>
  );
}
