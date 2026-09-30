import type { Metadata } from "next";
import { IntakeForm } from "@/components/intake-form";

export const metadata: Metadata = {
  title: "Descrie lucrarea | Muncitorii.ro",
  description:
    "Descrie lucrarea de renovare cu poze — primești caiet de sarcini și oferte comparabile în câteva zile.",
};

export default function CererePage() {
  return (
    <section className="px-4 py-10 md:px-6 md:py-16">
      <div className="mx-auto max-w-2xl">
        <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
          Cerere nouă
        </span>
        <h1 className="mt-4 text-3xl font-bold tracking-[-0.025em] text-slate-950 md:text-4xl">
          Descrie lucrarea
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          Trei minute, poze incluse. Te sunăm în 24h cu următorii pași — taxa de evaluare de 200 lei
          se deduce integral din valoarea lucrării.
        </p>

        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-card md:p-8">
          <IntakeForm />
        </div>
      </div>
    </section>
  );
}
