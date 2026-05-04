"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { categories } from "@/lib/categories";
import { createClient } from "@/lib/supabase/client";
import { judete } from "@/lib/judete";

export function NewJobForm() {
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

    const title = (data.get("title") as string).trim();
    const description = (data.get("description") as string).trim();
    const category = data.get("category") as string;
    const city = (data.get("city") as string).trim();
    const county = (data.get("county") as string).trim();
    const budgetMinRaw = data.get("budget_min") as string;
    const budgetMaxRaw = data.get("budget_max") as string;

    if (!title || !category || !city || !county) {
      setError("Completează titlul, categoria, orașul și județul.");
      setLoading(false);
      return;
    }

    const budget_min = budgetMinRaw ? parseInt(budgetMinRaw, 10) : null;
    const budget_max = budgetMaxRaw ? parseInt(budgetMaxRaw, 10) : null;

    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError("Trebuie să fii autentificat.");
        setLoading(false);
        return;
      }

      const { error: insertError } = await supabase.from("jobs").insert([
        {
          client_id: user.id,
          title,
          description,
          category,
          city,
          county,
          budget_min,
          budget_max,
        },
      ] as never);

      if (insertError) {
        setError(insertError.message);
        setLoading(false);
        return;
      }

      // Trigger notification email to matching workers (background, non-blocking)
      fetch("/api/jobs/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, county, city, title }),
      }).catch(() => {});

      setSuccess(true);
      setLoading(false);
      setTimeout(() => {
        router.push("/dashboard/client");
        router.refresh();
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="mt-6 flex flex-col items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <CheckCircle2 size={40} className="text-emerald-600" strokeWidth={1.75} />
        <p className="text-lg font-semibold text-emerald-800">Lucrarea a fost publicată!</p>
        <p className="text-sm text-emerald-700">
          Notificăm meseriașii potriviți. Te redirectăm la dashboard...
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-5">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">
          Titlul lucrării *
        </label>
        <input
          name="title"
          type="text"
          placeholder="Ex: Zugrăvit living și dormitor"
          required
          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-primary-700 focus:ring-2 focus:ring-primary-700/15"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">Descriere</label>
        <textarea
          name="description"
          rows={4}
          placeholder="Descrie ce ai nevoie: suprafață, materiale, detalii importante..."
          className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-primary-700 focus:ring-2 focus:ring-primary-700/15"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">Categorie *</label>
        <select
          name="category"
          required
          defaultValue=""
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-primary-700 focus:ring-2 focus:ring-primary-700/15"
        >
          <option value="" disabled>Alege categoria...</option>
          {categories.map(({ slug, name }) => (
            <option key={slug} value={slug}>{name}</option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Oraș *</label>
          <input
            name="city"
            type="text"
            placeholder="Ex: București"
            required
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-primary-700 focus:ring-2 focus:ring-primary-700/15"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Județ *</label>
          <select
            name="county"
            required
            defaultValue=""
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-primary-700 focus:ring-2 focus:ring-primary-700/15"
          >
            <option value="" disabled>Alege județul...</option>
            {judete.map((j) => (
              <option key={j} value={j}>{j}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Buget minim (lei)</label>
          <input
            name="budget_min"
            type="number"
            min="0"
            placeholder="500"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-primary-700 focus:ring-2 focus:ring-primary-700/15"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Buget maxim (lei)</label>
          <input
            name="budget_max"
            type="number"
            min="0"
            placeholder="1000"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-primary-700 focus:ring-2 focus:ring-primary-700/15"
          />
        </div>
      </div>

      {error && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-2xl bg-primary-900 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 ease-out hover:bg-primary-700 disabled:opacity-60"
      >
        {loading ? "Se publică..." : "Publică lucrarea"}
      </button>
    </form>
  );
}
