import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const clientSteps = [
  "Postezi lucrarea sau cauți un muncitor după categorie și oraș",
  "Compari profile, experiență și recenzii",
  "Discuți direct și alegi omul potrivit pentru lucrare",
];

const workerSteps = [
  "Îți creezi profilul și adaugi meseria, zona și experiența ta",
  "Aplici la lucrări sau primești cereri direct de la clienți",
  "Finalizezi lucrarea și primești recenzii care îți cresc reputația",
];

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <SiteHeader />

      <section className="px-4 py-10 md:px-6 md:py-16">
        <div className="mx-auto max-w-6xl">
          <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
            Cum funcționează
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-950 md:text-5xl">
            O platformă simplă pentru clienți și muncitori
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 md:text-lg">
            Muncitorii.ro este construit să facă legătura dintre oamenii care au nevoie de o lucrare și cei care o pot face bine, rapid și clar.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-[2rem] bg-white p-6 shadow-sm md:p-8">
              <h2 className="text-2xl font-bold tracking-tight text-slate-950">Pentru clienți</h2>
              <div className="mt-6 space-y-4">
                {clientSteps.map((step, index) => (
                  <div key={step} className="flex gap-4 rounded-3xl border border-slate-200 p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                      {index + 1}
                    </div>
                    <p className="text-sm leading-6 text-slate-700">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] bg-white p-6 shadow-sm md:p-8">
              <h2 className="text-2xl font-bold tracking-tight text-slate-950">Pentru muncitori</h2>
              <div className="mt-6 space-y-4">
                {workerSteps.map((step, index) => (
                  <div key={step} className="flex gap-4 rounded-3xl border border-slate-200 p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                      {index + 1}
                    </div>
                    <p className="text-sm leading-6 text-slate-700">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
