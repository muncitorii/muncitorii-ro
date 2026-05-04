import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, User, Wrench, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Creează cont | Muncitorii.ro",
  description: "Alege tipul de cont — client sau meseriaș — și începe să folosești Muncitorii.ro.",
};

export default function RegisterPage() {
  return (
    <section className="px-4 py-12 md:px-6 md:py-20">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center">
          <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
            Bine ai venit pe Muncitorii.ro
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-[-0.025em] text-slate-950 md:text-5xl">
            Cum vrei să folosești platforma?
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
            Alege ce tip de cont vrei să creezi. Te poți răzgândi oricând.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {/* CLIENT CARD */}
          <Link
            href="/register/client"
            className="group relative flex flex-col rounded-3xl border-2 border-slate-200 bg-white p-7 shadow-card transition-all duration-200 hover:border-primary-700 hover:shadow-card-hover md:p-8"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-900/8 text-primary-900">
              <User size={26} strokeWidth={1.75} />
            </div>

            <h2 className="mt-5 text-2xl font-bold tracking-[-0.015em] text-slate-950">
              Sunt client
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              Caut un meseriaș pentru o lucrare la mine acasă sau la firmă.
            </p>

            <ul className="mt-6 space-y-2.5 text-sm text-slate-700">
              <li className="flex items-center gap-2.5">
                <Check size={16} className="shrink-0 text-emerald-600" strokeWidth={2.5} />
                Postezi o lucrare în 2 minute
              </li>
              <li className="flex items-center gap-2.5">
                <Check size={16} className="shrink-0 text-emerald-600" strokeWidth={2.5} />
                Primești oferte de la meseriași verificați
              </li>
              <li className="flex items-center gap-2.5">
                <Check size={16} className="shrink-0 text-emerald-600" strokeWidth={2.5} />
                Compari recenzii și portofolii reale
              </li>
              <li className="flex items-center gap-2.5">
                <Check size={16} className="shrink-0 text-emerald-600" strokeWidth={2.5} />
                100% gratuit pentru clienți
              </li>
            </ul>

            <div className="mt-7 flex items-center gap-2 text-sm font-semibold text-primary-900 transition-colors group-hover:text-primary-700">
              Continuă ca client
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          {/* MUNCITOR CARD */}
          <Link
            href="/register/muncitor"
            className="group relative flex flex-col rounded-3xl border-2 border-accent-700 bg-accent-50/30 p-7 shadow-card transition-all duration-200 hover:bg-accent-50/60 hover:shadow-card-hover md:p-8"
          >
            <span className="absolute right-5 top-5 inline-flex rounded-full bg-accent-700 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
              Recomandat
            </span>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-700/10 text-accent-700">
              <Wrench size={26} strokeWidth={1.75} />
            </div>

            <h2 className="mt-5 text-2xl font-bold tracking-[-0.015em] text-slate-950">
              Sunt meseriaș
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Caut clienți care au nevoie de serviciile mele profesionale.
            </p>

            <ul className="mt-6 space-y-2.5 text-sm text-slate-700">
              <li className="flex items-center gap-2.5">
                <Check size={16} className="shrink-0 text-emerald-600" strokeWidth={2.5} />
                Profil cu poze, recenzii și portofoliu
              </li>
              <li className="flex items-center gap-2.5">
                <Check size={16} className="shrink-0 text-emerald-600" strokeWidth={2.5} />
                Primești cereri direct în zona ta
              </li>
              <li className="flex items-center gap-2.5">
                <Check size={16} className="shrink-0 text-emerald-600" strokeWidth={2.5} />
                Construiești reputație cu recenzii reale
              </li>
              <li className="flex items-center gap-2.5">
                <Check size={16} className="shrink-0 text-emerald-600" strokeWidth={2.5} />
                Gratuit primul an, fără comision
              </li>
            </ul>

            <div className="mt-7 flex items-center gap-2 text-sm font-semibold text-accent-700 transition-colors group-hover:text-accent-800">
              Continuă ca meseriaș
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        </div>

        {/* Footer link */}
        <p className="mt-8 text-center text-sm text-slate-500">
          Ai deja cont?{" "}
          <Link href="/login" className="font-semibold text-primary-900 hover:text-primary-700">
            Intră în cont
          </Link>
        </p>
      </div>
    </section>
  );
}
