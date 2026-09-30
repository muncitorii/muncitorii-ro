import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AuthCard } from "@/components/auth-card";

export const metadata: Metadata = {
  title: "Creează cont meseriaș | Muncitorii.ro",
  description: "Creează-ți profilul de meseriaș și găsește clienți noi în zona ta. Gratuit primul an.",
};

export default function WorkerRegisterPage() {
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
            <span className="inline-flex rounded-full border border-accent-200 bg-accent-50 px-3 py-1 text-xs font-semibold text-accent-700">
              Cont meseriaș
            </span>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-950 md:text-5xl">
              Primește cereri direct de la clienți din zona ta
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 md:text-lg">
              Profil cu poze și recenzii, cereri direct, reputație construită cu lucrări reale.
              Gratuit primul an, fără comision.
            </p>
          </div>

          <AuthCard
            role="muncitor"
            title="Creează cont meseriaș"
            subtitle="Completează datele de bază. După înregistrare adaugi poze și portofoliu din dashboard."
          />
        </div>
      </div>
    </section>
  );
}
