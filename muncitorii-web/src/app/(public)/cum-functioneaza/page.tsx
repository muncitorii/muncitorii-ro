import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cum funcționează | Muncitorii.ro",
  description: "Pași simpli pentru clienți și meseriași — postezi, compari și finalizezi direct.",
};

const clientSteps = [
  "Postezi lucrarea sau cauți un meseriaș după categorie și oraș",
  "Compari profiluri, experiență și recenzii",
  "Discuți direct și alegi omul potrivit pentru lucrare",
];

const workerSteps = [
  "Îți creezi profilul și adaugi meseria, zona și experiența ta",
  "Aplici la lucrări sau primești cereri direct de la clienți",
  "Finalizezi lucrarea și primești recenzii care îți construiesc reputația",
];

export default function HowItWorksPage() {
  return (
    <section className="px-4 py-10 md:px-6 md:py-16">
      <div className="mx-auto max-w-6xl">
        <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
          Cum funcționează
        </span>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-950 md:text-5xl">
          O platformă simplă pentru clienți și meseriași
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 md:text-lg">
          Muncitorii.ro îi aduce laolaltă pe oamenii care au o lucrare de făcut și pe cei care o pot rezolva bine, rapid și clar.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl bg-white p-6 shadow-card md:p-8">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950">Pentru clienți</h2>
            <div className="mt-6 space-y-4">
              {clientSteps.map((step, index) => (
                <div key={step} className="flex gap-4 rounded-2xl border border-slate-200 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-900 text-sm font-bold text-white">
                    0{index + 1}
                  </div>
                  <p className="text-sm leading-6 text-slate-700">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-card md:p-8">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950">Pentru meseriași</h2>
            <div className="mt-6 space-y-4">
              {workerSteps.map((step, index) => (
                <div key={step} className="flex gap-4 rounded-2xl border border-slate-200 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-900 text-sm font-bold text-white">
                    0{index + 1}
                  </div>
                  <p className="text-sm leading-6 text-slate-700">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
