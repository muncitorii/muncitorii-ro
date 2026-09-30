import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PartnerForm } from "@/components/partner-form";

export const metadata: Metadata = {
  title: "Pentru meseriași | Muncitorii.ro",
  description:
    "Intră în rețeaua de subcontractori Muncitorii.ro și primești cereri de ofertă pentru lucrări deja evaluate, în Iași și împrejurimi.",
};

const benefits = [
  "Primești cereri de ofertă pentru lucrări deja evaluate, cu caiet de sarcini clar",
  "Nu mai pierzi timp cu clienți care nu știu exact ce vor",
  "Ești plătit pe etape, la fel ca clientul — fără să aștepți totul la final",
  "Construiești un istoric de lucrări documentate cu poze",
];

export default function ParteneriPage() {
  return (
    <section className="px-4 py-10 md:px-6 md:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-3xl bg-gradient-to-br from-primary-900 to-primary-950 px-6 py-7 text-white md:px-8 md:py-9">
          <p className="text-sm font-medium text-white/60">Pentru meseriași</p>
          <h1 className="mt-1 text-2xl font-bold tracking-[-0.015em] text-white md:text-3xl">
            Lucrări deja evaluate, clienți care știu ce vor
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/75 md:text-base">
            Nu suntem o platformă unde aplici la sute de anunțuri. Coordonăm lucrarea înainte să
            ajungă la tine — tu te ocupi de execuție.
          </p>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-start">
          <div className="rounded-3xl bg-white p-6 shadow-card md:p-8">
            <h2 className="text-xl font-bold tracking-tight text-primary-900">De ce să lucrezi cu noi</h2>
            <ul className="mt-5 space-y-3.5">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-700">
                  <Check size={16} className="mt-0.5 shrink-0 text-emerald-600" strokeWidth={2.5} />
                  {b}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-slate-400">
              Trimitem cererea ta unui admin care revizuiește manual profilul — nu e aprobare
              automată. Te contactăm dacă profilul se pretează la lucrările din rețea.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card md:p-8">
            <h2 className="text-xl font-bold tracking-tight text-primary-900">Aplică ca partener</h2>
            <p className="mt-1 text-sm text-slate-500">Un formular scurt, 1 minut.</p>
            <div className="mt-5">
              <PartnerForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
