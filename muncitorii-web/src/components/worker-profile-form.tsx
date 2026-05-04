"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { categories } from "@/lib/categories";
import { judete } from "@/lib/judete";
import { createClient } from "@/lib/supabase/client";

type Worker = {
  id: string;
  slug: string;
  name: string;
  trade: string;
  trade_slug: string;
  city: string;
  county: string;
  bio: string;
  experience_years: number;
  response_time: string;
  availability: string;
  hourly_rate_min: number | null;
  hourly_rate_max: number | null;
  phone: string | null;
};

const responseTimes = [
  "În aceeași zi",
  "În 2-4 ore",
  "În 24h",
  "A doua zi",
  "În 2-3 zile",
];

const availabilities = ["Disponibil", "Disponibil parțial", "Indisponibil temporar"];

export function WorkerProfileForm({ worker }: { worker: Worker }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    const updates = {
      trade: data.get("trade") as string,
      trade_slug: data.get("trade_slug") as string,
      city: (data.get("city") as string).trim(),
      county: data.get("county") as string,
      bio: (data.get("bio") as string).trim(),
      experience_years: parseInt((data.get("experience_years") as string) || "0", 10),
      response_time: data.get("response_time") as string,
      availability: data.get("availability") as string,
      phone: ((data.get("phone") as string) || "").trim() || null,
      hourly_rate_min: data.get("hourly_rate_min")
        ? parseInt(data.get("hourly_rate_min") as string, 10)
        : null,
      hourly_rate_max: data.get("hourly_rate_max")
        ? parseInt(data.get("hourly_rate_max") as string, 10)
        : null,
    };

    try {
      const supabase = createClient();
      const { error: updateError } = await (
        supabase.from("workers") as unknown as {
          update: (v: typeof updates) => {
            eq: (col: string, val: string) => Promise<{ error: Error | null }>;
          };
        }
      )
        .update(updates)
        .eq("id", worker.id);

      if (updateError) {
        setError(updateError.message);
        setLoading(false);
        return;
      }

      setSuccess(true);
      setLoading(false);
      router.refresh();
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Contact + telefon */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">
          Telefon WhatsApp <span className="text-slate-400">(opțional dar recomandat)</span>
        </label>
        <input
          name="phone"
          type="tel"
          defaultValue={worker.phone ?? ""}
          placeholder="+40712345678"
          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-primary-700 focus:ring-2 focus:ring-primary-700/15"
        />
        <p className="mt-1.5 text-xs text-slate-500">
          Clienții pot să te contacteze direct pe WhatsApp dacă completezi numărul.
        </p>
      </div>

      {/* Meserie */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">Meseria ta</label>
        <select
          name="trade_slug"
          defaultValue={worker.trade_slug}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-primary-700 focus:ring-2 focus:ring-primary-700/15"
        >
          {categories.map(({ slug, name }) => (
            <option key={slug} value={slug}>
              {name}
            </option>
          ))}
        </select>
        <input type="hidden" name="trade" defaultValue={worker.trade} />
      </div>

      {/* Locație */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Oraș</label>
          <input
            name="city"
            type="text"
            defaultValue={worker.city}
            required
            placeholder="Ex: București"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-primary-700 focus:ring-2 focus:ring-primary-700/15"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Județ</label>
          <select
            name="county"
            defaultValue={worker.county}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-primary-700 focus:ring-2 focus:ring-primary-700/15"
          >
            {judete.map((j) => (
              <option key={j} value={j}>
                {j}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Bio */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">
          Despre tine <span className="text-slate-400">(scurt, concret, ce te diferențiază)</span>
        </label>
        <textarea
          name="bio"
          rows={4}
          defaultValue={worker.bio}
          placeholder="Ex: Execut instalații electrice pentru apartamente și case. Lucrez curat, respect termenele, autorizat ANRE. Garanție 2 ani la lucrări."
          className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-primary-700 focus:ring-2 focus:ring-primary-700/15"
        />
      </div>

      {/* Experiență + răspuns */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Ani experiență</label>
          <input
            name="experience_years"
            type="number"
            min="0"
            max="60"
            defaultValue={worker.experience_years}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-primary-700 focus:ring-2 focus:ring-primary-700/15"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Timp de răspuns</label>
          <select
            name="response_time"
            defaultValue={worker.response_time || responseTimes[0]}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-primary-700 focus:ring-2 focus:ring-primary-700/15"
          >
            {responseTimes.map((rt) => (
              <option key={rt} value={rt}>
                {rt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Disponibilitate + tarif */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Disponibilitate</label>
          <select
            name="availability"
            defaultValue={worker.availability || availabilities[0]}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-primary-700 focus:ring-2 focus:ring-primary-700/15"
          >
            {availabilities.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Tarif minim (lei/oră) <span className="text-slate-400">— opțional</span>
          </label>
          <input
            name="hourly_rate_min"
            type="number"
            min="0"
            defaultValue={worker.hourly_rate_min ?? ""}
            placeholder="50"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-primary-700 focus:ring-2 focus:ring-primary-700/15"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Tarif maxim (lei/oră) <span className="text-slate-400">— opțional</span>
          </label>
          <input
            name="hourly_rate_max"
            type="number"
            min="0"
            defaultValue={worker.hourly_rate_max ?? ""}
            placeholder="120"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-primary-700 focus:ring-2 focus:ring-primary-700/15"
          />
        </div>
      </div>

      {error && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      )}

      {success && (
        <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
          <CheckCircle2 size={18} />
          Profilul a fost salvat cu succes.
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-2xl bg-primary-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-700 disabled:opacity-60"
      >
        {loading ? "Se salvează..." : "Salvează modificările"}
      </button>
    </form>
  );
}
