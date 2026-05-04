import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AuthCard } from "@/components/auth-card";

export const metadata: Metadata = {
  title: "Creează cont client | Muncitorii.ro",
  description: "Înregistrează-te ca client și găsește meseriași verificați pentru lucrarea ta.",
};

export default function RegisterClientPage() {
  return (
    <section className="px-4 py-10 md:px-6 md:py-16">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/register"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 transition hover:text-slate-950"
        >
          <ArrowLeft size={16} />
          Înapoi la alegere cont
        </Link>

        <div className="mt-6 grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div>
            <span className="inline-flex rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-900">
              Cont client
            </span>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-950 md:text-5xl">
              Găsește meseriașul potrivit pentru lucrarea ta
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 md:text-lg">
              Postezi o lucrare, primești oferte de la meseriași verificați și alegi pe cel mai bun.
              Totul gratuit, fără comision.
            </p>
          </div>

          <AuthCard
            role="client"
            title="Creează cont client"
            subtitle="2 câmpuri și ești gata. Postezi prima lucrare imediat după."
          />
        </div>
      </div>
    </section>
  );
}
