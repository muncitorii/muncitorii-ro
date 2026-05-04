import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Despre noi | Muncitorii.ro",
  description:
    "Cine suntem și de ce am construit Muncitorii.ro — platforma care conectează clienți cu meseriași serioși din România.",
};

export default function DesprePage() {
  return (
    <section className="px-4 py-12 md:px-6 md:py-20">
      <div className="mx-auto max-w-4xl">
        <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
          Despre noi
        </span>

        <h1 className="mt-4 text-4xl font-bold tracking-[-0.025em] text-slate-950 md:text-5xl">
          Construim piața meseriașilor serioși din România.
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-slate-600">
          Muncitorii.ro e o platformă care conectează oameni cu lucrări de făcut cu meseriași
          verificați, cu experiență reală și recenzii autentice.
        </p>

        <div className="mt-12 space-y-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card md:p-8">
            <h2 className="text-xl font-semibold tracking-[-0.015em] text-slate-950">
              De ce am construit asta
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Pe piața din România, găsirea unui meseriaș serios era o problemă reală. Grupuri
              Facebook dezorganizate, recomandări nesigure, prețuri netransparente. Am construit
              Muncitorii.ro ca să schimbăm asta — un loc clar, simplu și cinstit unde poți
              compara, alege și angaja.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card md:p-8">
            <h2 className="text-xl font-semibold tracking-[-0.015em] text-slate-950">
              Cum funcționăm
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Verificăm identitatea meseriașilor, afișăm recenzii reale de la clienți reali și
              menținem standardele platformei. Niciun profil fals, nicio recenzie cumpărată.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card md:p-8">
            <h2 className="text-xl font-semibold tracking-[-0.015em] text-slate-950">
              Suntem la început
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Platforma e în versiune beta. Creștem gradual, verificăm fiecare meseriaș manual și
              îmbunătățim produsul în funcție de feedback. Dacă ai întrebări sau sugestii, scrie-ne.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Contactează-ne
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
