import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Muncitorii.ro",
  description: "Contactează echipa Muncitorii.ro — suntem disponibili pentru întrebări, sugestii sau raportări.",
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
        <p className="mt-4 text-lg leading-relaxed text-slate-600">
          Avem o echipă mică și răspundem rapid. Orice întrebare sau feedback e bine venit.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card md:p-8">
            <h2 className="text-xl font-semibold tracking-[-0.015em] text-slate-950">
              Email
            </h2>
            <p className="mt-2 text-sm text-slate-600">Pentru orice întrebare sau colaborare.</p>
            <a
              href="mailto:contact@muncitorii.ro"
              className="mt-3 block font-semibold text-primary-900 hover:text-primary-700"
            >
              contact@muncitorii.ro
            </a>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card md:p-8">
            <h2 className="text-xl font-semibold tracking-[-0.015em] text-slate-950">
              Raportează o problemă
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Profil fals, recenzie suspectă sau comportament neadecvat.
            </p>
            <a
              href="mailto:abuz@muncitorii.ro"
              className="mt-3 block font-semibold text-primary-900 hover:text-primary-700"
            >
              abuz@muncitorii.ro
            </a>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-card md:p-8">
          <h2 className="text-xl font-semibold tracking-[-0.015em] text-slate-950">
            Trimite un mesaj
          </h2>
          <form className="mt-5 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Nume</label>
                <input
                  type="text"
                  placeholder="Numele tău"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Email</label>
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Mesaj</label>
              <textarea
                rows={4}
                placeholder="Scrie mesajul tău..."
                className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
              />
            </div>
            <button
              type="submit"
              className="rounded-2xl bg-primary-900 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 ease-out hover:bg-primary-700"
            >
              Trimite mesaj
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
