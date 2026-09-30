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
        <span className="inline-flex rounded-full border border-accent-200 bg-accent-50 px-3 py-1 text-xs font-semibold text-accent-700">
          Pentru meseriași
        </span>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-950 md:text-5xl">
          Lucrări deja evaluate, clienți care știu ce vor
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
          Nu suntem o platformă unde aplici la sute de anunțuri. Coordonăm lucrarea înainte să
          ajungă la tine — tu te ocupi de execuție.
        </p>

        <div className="mt-10 grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-start">
          <div className="rounded-3xl bg-white p-6 shadow-card md:p-8">
            <h2 className="text-xl font-bold tracking-tight text-slate-950">De ce să lucrezi cu noi</h2>
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
            <h2 className="text-xl font-bold tracking-tight text-slate-950">Aplică ca partener</h2>
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
