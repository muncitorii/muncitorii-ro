import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Cererea a fost trimisă | Muncitorii.ro",
  robots: { index: false },
};

type SearchParams = Promise<{ token?: string }>;

export default async function CerereConfirmarePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { token } = await searchParams;

  return (
    <section className="px-4 py-10 md:px-6 md:py-14">
      <div className="mx-auto max-w-lg text-center">
        <div className="rounded-3xl bg-gradient-to-br from-primary-900 to-primary-950 px-6 py-9 text-white md:px-8 md:py-11">
          <p className="text-sm font-medium text-white/60">Cerere trimisă</p>
          <div className="mx-auto mt-3 flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
            <CheckCircle2 size={28} className="text-accent-500" strokeWidth={1.75} />
          </div>
          <h1 className="mt-4 text-2xl font-bold tracking-[-0.015em] text-white md:text-3xl">
            Cererea a fost trimisă
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-white/75 md:text-base">
            Te sunăm în 24h ca să stabilim următorii pași. Taxa de evaluare de 200 lei se deduce
            integral din valoarea lucrării, dacă mergem mai departe.
          </p>
        </div>

        {token && (
          <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6 text-left">
            <p className="text-sm font-semibold text-slate-950">Linkul tău de urmărire</p>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">
              Din momentul în care lucrarea intră în etapa de execuție, poți urmări progresul aici.
              Salvează linkul, nu ai nevoie de cont:
            </p>
            <Link
              href={`/p/${token}`}
              className="mt-3 block truncate rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-primary-900 hover:bg-primary-50"
            >
              muncitorii.ro/p/{token}
            </Link>
          </div>
        )}

        <Link
          href="/"
          className="mt-8 inline-flex text-sm font-semibold text-primary-900 hover:text-primary-700"
        >
          ← Înapoi la pagina principală
        </Link>
      </div>
    </section>
  );
}
