import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WorkerCard } from "@/components/worker-card";

const workers = [
  {
    name: "Alex Popescu",
    slug: "alex-popescu",
    trade: "Electrician",
    city: "București",
    rating: "4.9",
    description: "Instalații electrice, reparații și lucrări rezidențiale.",
  },
  {
    name: "Marian Ionescu",
    slug: "marian-ionescu",
    trade: "Zugrav",
    city: "Constanța",
    rating: "4.8",
    description: "Zugrăveli interioare și finisaje curate pentru apartamente și case.",
  },
  {
    name: "Robert Pavel",
    slug: "robert-pavel",
    trade: "Instalator",
    city: "Cluj-Napoca",
    rating: "5.0",
    description: "Intervenții rapide, reparații și montaj pentru instalații sanitare.",
  },
  {
    name: "Florin Matei",
    slug: "florin-matei",
    trade: "Dulgher",
    city: "Brașov",
    rating: "4.7",
    description: "Mobilier, montaj și lucrări personalizate din lemn.",
  },
];

export default function WorkersPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <SiteHeader ctaHref="/register/muncitor" ctaLabel="Devino muncitor" />

      <section className="px-4 py-10 md:px-6 md:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
              Director muncitori
            </span>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-950 md:text-5xl">
              Găsește meseriași după categorie și oraș
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-600 md:text-lg">
              Vezi profiluri clare, experiență și rating-uri înainte să alegi.
            </p>
          </div>

          <div className="mt-8 grid gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[1.1fr_1fr_auto]">
            <input
              type="text"
              placeholder="Meserie"
              className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Oraș"
              className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-blue-500"
            />
            <button className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
              Caută
            </button>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {workers.map((worker) => (
              <WorkerCard key={worker.slug} {...worker} />
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
