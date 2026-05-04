"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

type AuthCardProps = {
  title: string;
  subtitle: string;
  role: "client" | "muncitor";
};

export function AuthCard({ title, subtitle, role }: AuthCardProps) {
  const isWorker = role === "muncitor";
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    const email = data.get("email") as string;
    const password = data.get("password") as string;
    const fullName = data.get("full_name") as string;
    const trade = data.get("trade") as string | undefined;
    const city = data.get("city") as string | undefined;

    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: isWorker ? "worker" : "client",
            trade: trade ?? null,
            city: city ?? null,
          },
        },
      });

      if (authError) {
        setError(authError.message);
        setLoading(false);
        return;
      }

      setSuccess(true);
      setLoading(false);
      router.push(isWorker ? "/dashboard/muncitor" : "/dashboard/client");
      router.refresh();
    } catch (err) {
      setError("Eroare de conexiune. Verifică internetul și încearcă din nou.");
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="w-full max-w-md rounded-3xl border border-emerald-200 bg-emerald-50 p-8">
        <p className="font-semibold text-emerald-800">Cont creat cu succes!</p>
        <p className="mt-2 text-sm text-emerald-700">
          Verifică email-ul pentru a confirma contul, apoi intră în cont.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-card md:p-8">
      <span className="inline-flex rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-900">
        {isWorker ? "Cont muncitor" : "Cont client"}
      </span>
      <h2 className="mt-4 text-3xl font-bold tracking-[-0.025em] text-slate-950">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{subtitle}</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="auth-name" className="mb-1.5 block text-sm font-medium text-slate-700">
            Nume complet
          </label>
          <Input id="auth-name" name="full_name" type="text" placeholder="Ex: Ion Popescu" autoComplete="name" required />
        </div>

        <div>
          <label htmlFor="auth-email" className="mb-1.5 block text-sm font-medium text-slate-700">
            Email
          </label>
          <Input id="auth-email" name="email" type="email" placeholder="tu@email.com" autoComplete="email" required />
        </div>

        <div>
          <label htmlFor="auth-password" className="mb-1.5 block text-sm font-medium text-slate-700">
            Parolă
          </label>
          <Input
            id="auth-password"
            name="password"
            type="password"
            placeholder="Minim 8 caractere"
            autoComplete="new-password"
            minLength={8}
            required
          />
        </div>

        {isWorker && (
          <>
            <div>
              <label htmlFor="auth-trade" className="mb-1.5 block text-sm font-medium text-slate-700">
                Meserie principală
              </label>
              <Input id="auth-trade" name="trade" type="text" placeholder="Ex: Electrician" required />
            </div>
            <div>
              <label htmlFor="auth-city" className="mb-1.5 block text-sm font-medium text-slate-700">
                Oraș
              </label>
              <Input id="auth-city" name="city" type="text" placeholder="Ex: București" required />
            </div>
          </>
        )}

        {error && (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
        )}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Se creează contul..." : "Creează cont"}
        </Button>
      </form>

      <div className="mt-5 text-center text-sm text-slate-600">
        <Link href="/login" className="font-semibold text-primary-900 hover:text-primary-700">
          Ai deja cont? Intră aici
        </Link>
      </div>
    </div>
  );
}
