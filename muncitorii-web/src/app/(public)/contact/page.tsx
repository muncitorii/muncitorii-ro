import type { Metadata } from "next";
import { Mail, AlertTriangle, MessageSquare } from "lucide-react";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact | Muncitorii.ro",
  description:
    "Contactează echipa Muncitorii.ro — formular direct sau email. Răspundem în aceeași zi.",
};

export default function ContactPage() {
  return (
    <section className="px-4 py-12 md:px-6 md:py-20">
      <div className="mx-auto max-w-4xl">
        <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
          Contact
        </span>
        <h1 className="mt-4 text-4xl font-bold tracking-[-0.025em] text-slate-950 md:text-5xl">
          Scrie-ne.
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate-600">
          Suntem o echipă mică și răspundem în aceeași zi. Orice întrebare,
          sugestie sau feedback e bine venit.
        </p>

        {/* Canale contact */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <a
            href="mailto:contact@muncitorii.ro"
            className="group flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-card transition-shadow hover:shadow-card-hover"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-900/8 text-primary-900">
              <Mail size={20} strokeWidth={1.75} />
            </div>
            <div>
              <p className="font-semibold text-slate-950">Email direct</p>
              <p className="mt-0.5 text-sm text-slate-500">contact@muncitorii.ro</p>
            </div>
            <p className="text-xs text-slate-400">Răspuns în max. 24h</p>
          </a>

          <div className="flex flex-col gap-3 rounded-2xl border border-primary-200 bg-primary-50/40 p-6 shadow-card">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-900/15 text-primary-900">
              <MessageSquare size={20} strokeWidth={1.75} />
            </div>
            <div>
              <p className="font-semibold text-slate-950">Formular rapid</p>
              <p className="mt-0.5 text-sm text-slate-500">Mai jos pe pagină</p>
            </div>
            <p className="text-xs text-slate-400">Trimite în 30 secunde</p>
          </div>

          <a
            href="mailto:abuz@muncitorii.ro"
            className="group flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-card transition-shadow hover:shadow-card-hover"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-700/8 text-accent-700">
              <AlertTriangle size={20} strokeWidth={1.75} />
            </div>
            <div>
              <p className="font-semibold text-slate-950">Raportează</p>
              <p className="mt-0.5 text-sm text-slate-500">abuz@muncitorii.ro</p>
            </div>
            <p className="text-xs text-slate-400">Profil fals, recenzie suspectă</p>
          </a>
        </div>

        {/* Formular */}
        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-card md:p-8">
          <h2 className="text-xl font-semibold tracking-[-0.015em] text-slate-950">
            Trimite un mesaj
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Mesajul ajunge direct la Liviu. Răspuns în aceeași zi.
          </p>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
