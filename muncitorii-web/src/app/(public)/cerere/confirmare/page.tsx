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
    <section className="px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-lg text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
          <CheckCircle2 size={28} className="text-emerald-600" strokeWidth={1.75} />
        </div>
        <h1 className="mt-5 text-3xl font-bold tracking-[-0.025em] text-slate-950">
          Cererea a fost trimisă
        </h1>
        <p className="mt-3 text-base leading-relaxed text-slate-600">
          Te sunăm în 24h ca să stabilim următorii pași. Taxa de evaluare de 200 lei se deduce
          integral din valoarea lucrării, dacă mergem mai departe.
        </p>

        {token && (
          <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6 text-left">
            <p className="text-sm font-semibold text-slate-950">Linkul tău de urmărire</p>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">
              Din momentul în care lucrarea intră în etapa de execuție, poți urmări progresul aici —
              salvează linkul, nu ai nevoie de cont:
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
