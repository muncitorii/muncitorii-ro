import type { Metadata } from "next";
import { Mail, MessageCircle, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact | Muncitorii.ro",
  description:
    "Contactează echipa Muncitorii.ro — email, WhatsApp sau formular direct. Răspundem în aceeași zi.",
};

const WA_NUMBER = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "40712345678").replace(/^\+/, "");
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
  "Bună! Am o întrebare despre Muncitorii.ro."
)}`;

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
              <p className="font-semibold text-slate-950">Email</p>
              <p className="mt-0.5 text-sm text-slate-500">
                contact@muncitorii.ro
              </p>
            </div>
            <p className="text-xs text-slate-400">Răspuns în max. 24h</p>
          </a>

          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/50 p-6 shadow-card transition-shadow hover:shadow-card-hover"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#25D366]/15 text-[#25D366]">
              <MessageCircle size={20} strokeWidth={1.75} />
            </div>
            <div>
              <p className="font-semibold text-slate-950">WhatsApp</p>
              <p className="mt-0.5 text-sm text-slate-500">Chat direct</p>
            </div>
            <p className="text-xs text-slate-400">Răspuns rapid în timpul orelor de program</p>
          </a>

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
            Completează formularul și îți răspundem pe email în aceeași zi.
          </p>
          <form className="mt-6 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Nume
                </label>
                <input
                  type="text"
                  placeholder="Numele tău"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-primary-700 focus:bg-white focus:ring-2 focus:ring-primary-700/15"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-primary-700 focus:bg-white focus:ring-2 focus:ring-primary-700/15"
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Subiect
              </label>
              <input
                type="text"
                placeholder="Despre ce vrei să ne scrii?"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-primary-700 focus:bg-white focus:ring-2 focus:ring-primary-700/15"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Mesaj
              </label>
              <textarea
                rows={5}
                placeholder="Scrie mesajul tău..."
                className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-primary-700 focus:bg-white focus:ring-2 focus:ring-primary-700/15"
              />
            </div>
            <button
              type="submit"
              className="rounded-2xl bg-primary-900 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-primary-700 active:scale-[0.98]"
            >
              Trimite mesaj
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
