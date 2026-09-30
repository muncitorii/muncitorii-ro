"use client";

import { useActionState } from "react";
import { CheckCircle2 } from "lucide-react";
import { submitPartnerAction, type PartnerActionState } from "@/app/(public)/parteneri/actions";

const initialState: PartnerActionState = null;

export function PartnerForm() {
  const [state, formAction, isPending] = useActionState(submitPartnerAction, initialState);

  if (state?.ok) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <CheckCircle2 size={40} className="text-emerald-600" strokeWidth={1.75} />
        <p className="text-lg font-semibold text-emerald-800">Cererea a fost trimisă!</p>
        <p className="text-sm text-emerald-700">
          Analizăm profilul tău și te contactăm dacă ai un fit bun cu lucrările din rețea.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">Nume *</label>
        <input
          name="full_name"
          type="text"
          required
          placeholder="Numele tău"
          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-primary-700 focus:ring-2 focus:ring-primary-700/15"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">Meserie *</label>
        <input
          name="trade"
          type="text"
          required
          placeholder="Ex: Electrician, Faianțar, Zugrav..."
          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-primary-700 focus:ring-2 focus:ring-primary-700/15"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Zonă</label>
          <input
            name="city"
            type="text"
            placeholder="Ex: Iași"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-primary-700 focus:ring-2 focus:ring-primary-700/15"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Ani experiență</label>
          <input
            name="experience_years"
            type="number"
            min="0"
            max="60"
            placeholder="10"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-primary-700 focus:ring-2 focus:ring-primary-700/15"
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">Telefon *</label>
        <input
          name="phone"
          type="tel"
          required
          placeholder="07xx xxx xxx"
          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-primary-700 focus:ring-2 focus:ring-primary-700/15"
        />
      </div>

      {state && !state.ok && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-2xl bg-primary-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-700 disabled:opacity-60"
      >
        {isPending ? "Se trimite..." : "Trimite cererea"}
      </button>
    </form>
  );
}
