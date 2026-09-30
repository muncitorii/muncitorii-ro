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
        <div className="rounded-3xl bg-gradient-to-br from-primary-900 to-primary-950 px-6 py-7 text-white md:px-8 md:py-9">
          <p className="text-sm font-medium text-white/60">Cerere nouă</p>
          <h1 className="mt-1 text-2xl font-bold tracking-[-0.015em] text-white md:text-3xl">
            Descrie lucrarea
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-white/75">
            Trei minute, poze incluse. Te sunăm în 24h cu următorii pași — taxa de evaluare de 200 lei
            se deduce integral din valoarea lucrării.
          </p>
        </div>

        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-card md:p-8">
          <IntakeForm />
        </div>
      </div>
    </section>
  );
}
