"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { categories } from "@/lib/categories";

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
  const [tradeSlug, setTradeSlug] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    const email = data.get("email") as string;
    const password = data.get("password") as string;
    const fullName = data.get("full_name") as string;
    const selectedSlug = data.get("trade_slug") as string | undefined;
    const customTrade = data.get("trade_custom") as string | undefined;
    const city = data.get("city") as string | undefined;

    // Pentru meseriași: dacă "altele" → folosim descrierea, altfel numele categoriei
    let trade: string | null = null;
    let finalTradeSlug: string | null = null;
    if (isWorker && selectedSlug) {
      if (selectedSlug === "altele") {
        trade = (customTrade ?? "").trim();
        finalTradeSlug = "altele";
      } else {
        const cat = categories.find((c) => c.slug === selectedSlug);
        trade = cat?.name ?? null;
        finalTradeSlug = selectedSlug;
      }
    }

    try {
      const supabase = createClient();
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: isWorker ? "worker" : "client",
            trade,
            trade_slug: finalTradeSlug,
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

      if (authData.session) {
        router.push(isWorker ? "/dashboard/muncitor" : "/dashboard/client");
        router.refresh();
      } else {
        router.push(
          `/verify?email=${encodeURIComponent(email)}&role=${isWorker ? "worker" : "client"}`,
        );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="w-full max-w-md rounded-3xl border border-emerald-200 bg-emerald-50 p-8">
        <p className="font-semibold text-emerald-800">Cont creat cu succes!</p>
        <p className="mt-2 text-sm text-emerald-700">Te trimitem să confirmi codul primit pe email...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-card md:p-8">
      <span className="inline-flex rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-900">
        {isWorker ? "Cont meseriaș" : "Cont client"}
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
              <select
                id="auth-trade"
                name="trade_slug"
                value={tradeSlug}
                onChange={(e) => setTradeSlug(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-primary-700 focus:ring-2 focus:ring-primary-700/15"
              >
                <option value="" disabled>
                  Alege meseria ta...
                </option>
                {categories.map((cat) => (
                  <option key={cat.slug} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {tradeSlug === "altele" && (
              <div>
                <label
                  htmlFor="auth-trade-custom"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Descrie ce meserie practici
                </label>
                <Input
                  id="auth-trade-custom"
                  name="trade_custom"
                  type="text"
                  placeholder="Ex: Acoperitor, Tencuieli decorative, Climatizare auto"
                  required
                />
                <p className="mt-1.5 text-xs text-slate-500">
                  Scrie clar și scurt — clienții vor căuta după acest termen.
                </p>
              </div>
            )}

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
