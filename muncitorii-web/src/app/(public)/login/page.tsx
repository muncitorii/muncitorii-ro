"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

// metadata nu funcționează în Client Components — mutată în layout dacă e nevoie

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
      <div className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-card md:p-8">
        <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
          Zonă administrare
        </span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950">Intră în cont</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Acces rezervat echipei Muncitorii.ro. Dacă ești client, urmărește lucrarea pe linkul
          personal primit după ce ai trimis cererea prin /cerere.
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
    </section>
  );
}
