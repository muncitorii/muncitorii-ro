import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Intră în cont | Muncitorii.ro",
  description: "Accesează contul tău pe Muncitorii.ro.",
};

export default function LoginPage() {
  return (
    <section className="px-4 py-10 md:px-6 md:py-16">
      <div className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-card md:p-8">
        <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
          Bine ai revenit
        </span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950">Intră în cont</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Continuă de unde ai rămas și gestionează lucrările, ofertele și conversațiile tale.
        </p>

        <form className="mt-6 space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              placeholder="tu@email.com"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-primary-700 focus:ring-2 focus:ring-primary-700/20"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Parolă</label>
            <input
              type="password"
              placeholder="Introdu parola"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-primary-700 focus:ring-2 focus:ring-primary-700/20"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl bg-primary-900 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 ease-out hover:bg-primary-700"
          >
            Intră în cont
          </button>
        </form>

        <div className="mt-5 text-center text-sm text-slate-600">
          <a href="/register" className="font-semibold text-primary-900 hover:text-primary-700">
            Nu ai cont? Creează unul acum
          </a>
        </div>
      </div>
    </section>
  );
}
