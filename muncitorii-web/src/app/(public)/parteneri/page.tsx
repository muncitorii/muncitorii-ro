import type { Metadata } from "next";
import { PartnerForm } from "@/components/partner-form";

export const metadata: Metadata = {
  title: "Pentru meseriași | Muncitorii.ro",
  description:
    "Lucrezi bine și te-ai săturat să alergi după clienți și după bani? Eu aduc lucrarea, tu o faci, ești plătit la 3–5 zile după ce încasez.",
};

const motive = [
  "Primești cereri pentru lucrări deja evaluate, cu caiet de sarcini clar — nu ghicești ce vrea clientul",
  "Nu mai stai la telefon cu oameni care nu știu exact ce vor sau nu au bugetul",
  "Ești plătit pe etape, la fel ca clientul — nu aștepți totul la final",
  "Ești plătit la 3–5 zile după ce încasez de la client",
  "Îți construiești un istoric de lucrări documentate cu poze, pe care le poți arăta altor clienți",
];

export default function ParteneriPage() {
  return (
    <section className="px-4 py-10 md:px-6 md:py-16">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-medium text-slate-500">Pentru meseriași</p>
        <h1 className="mt-3 text-3xl text-slate-950 md:text-5xl">
          Lucrezi bine și te-ai săturat să alergi după clienți și după bani?
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate-700">
          Eu aduc lucrarea, tu o faci, ești plătit la 3–5 zile după ce încasez. Nu ești pe o
          platformă unde aplici la sute de anunțuri — coordonez lucrarea înainte să ajungă la
          tine, tu te ocupi de execuție.
        </p>

        <div className="mt-10 grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-start">
          <div>
            <h2 className="text-xl text-slate-950">De ce merită</h2>
            <ul className="mt-5 divide-y divide-slate-200 border-t border-slate-200">
              {motive.map((m) => (
                <li key={m} className="py-3.5 text-base leading-relaxed text-slate-700">
                  {m}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-slate-500">
              Îți citesc eu profilul, manual — nu e o aprobare automată. Te contactez dacă se
              potrivește cu lucrările pe care le am în lucru.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card md:p-8">
            <h2 className="text-xl text-slate-950">Aplică</h2>
            <p className="mt-1 text-sm text-slate-500">Un formular scurt, un minut.</p>
            <div className="mt-5">
              <PartnerForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
