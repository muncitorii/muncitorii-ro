import type { Metadata } from "next";
import { IntakeForm } from "@/components/intake-form";

export const metadata: Metadata = {
  title: "Trimite-mi pozele cu lucrarea | Muncitorii.ro",
  description:
    "Trimite-mi câteva poze și ce ai de făcut — îți răspund în 48h cu un caiet de sarcini și pașii următori.",
};

export default function CererePage() {
  return (
    <section className="px-4 py-10 md:px-6 md:py-16">
      <div className="mx-auto max-w-2xl">
        <p className="text-sm font-medium text-slate-500">Trimite-mi pozele cu lucrarea</p>
        <h1 className="mt-3 text-3xl text-slate-950 md:text-4xl">
          Spune-mi ce ai de făcut
        </h1>
        <p className="mt-2 text-base leading-relaxed text-slate-700">
          Trei minute, poze incluse. Te sun eu în 24h cu pașii următori — taxa de evaluare de
          200 lei se scade integral din valoarea lucrării.
        </p>

        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-card md:p-8">
          <IntakeForm />
        </div>
      </div>
    </section>
  );
}
