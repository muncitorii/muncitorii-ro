import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WorkerCard } from "@/components/worker-card";

const categories = [
  "Electrician",
  "Instalator",
  "Zugrav",
  "Dulgher",
  "Curățenie",
  "Mutări",
  "IT",
  "Grădinărit",
];

const workers = [
  {
    name: "Alex Popescu",
    slug: "alex-popescu",
    trade: "Electrician",
    city: "București",
    rating: "4.9",
    badge: "Răspunde rapid",
  },
  {
    name: "Marian Ionescu",
    slug: "marian-ionescu",
    trade: "Zugrav",
    city: "Constanța",
    rating: "4.8",
    badge: "Profil complet",
  },
  {
    name: "Robert Pavel",
    slug: "robert-pavel",
    trade: "Instalator",
    city: "Cluj-Napoca",
    rating: "5.0",
    badge: "Recomandat",
  },
];

const testimonials = [
  {
    name: "Andreea",
    city: "București",
    text: "Am găsit foarte repede un electrician serios. Profilul era clar și am ales ușor.",
  },
  {
    name: "Mihai",
    city: "Constanța",
    text: "Mi-a plăcut că am putut compara mai mulți muncitori fără să pierd timp pe grupuri și telefoane.",
  },
  {
    name: "Raluca",
    city: "Iași",
    text: "Interfața e simplă și clară. Exact asta aș folosi pentru o lucrare urgentă acasă.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-white shadow-sm md:max-w-none md:shadow-none">
        <SiteHeader />

        <section className="bg-gradient-to-b from-blue-50 via-white to-white px-4 py-10 md:px-6 md:py-16">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                Simplu, rapid, local
              </span>
              <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-slate-950 md:text-6xl">
                Găsește rapid meseriașul potrivit
              </h1>
              <p className="mt-4 text-base leading-7 text-slate-600 md:text-lg">
                De la reparații mici la lucrări mari, găsești rapid muncitori potriviți în zona ta.
              </p>
            </div>

            <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-4 shadow-lg shadow-blue-100/60 md:p-5">
              <div className="grid gap-3 md:grid-cols-[1.4fr_1fr_auto]">
                <input
                  type="text"
                  placeholder="Ce lucrare ai de făcut?"
                  className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none ring-0 placeholder:text-slate-400 focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="În ce oraș?"
                  className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none ring-0 placeholder:text-slate-400 focus:border-blue-500"
                />
                <button className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
                  Caută meseriași
                </button>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
                <span className="text-slate-500">sau</span>
                <Link href="/register" className="font-semibold text-blue-700 hover:text-blue-800">
                  Postează o lucrare
                </Link>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 text-sm text-slate-600 md:grid-cols-4">
              {[
                "Recenzii reale",
                "Profiluri complete",
                "Răspuns rapid",
                "Profesioniști din zona ta",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-center font-medium"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-8 md:px-6 md:py-12">
          <div className="mx-auto max-w-6xl">
            <div className="mb-5 flex items-end justify-between gap-3">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-950">
                  Categorii populare
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  Alege rapid domeniul care te interesează.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {categories.map((category) => (
                <button
                  key={category}
                  className="rounded-3xl border border-slate-200 bg-white px-4 py-5 text-left text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
                >
                  <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-100 text-lg">
                    🔧
                  </span>
                  <p>{category}</p>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-50 px-4 py-8 md:px-6 md:py-12">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950">
              Cum funcționează
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                ["1", "Postezi lucrarea sau cauți un meseriaș"],
                ["2", "Primești oferte sau alegi din profiluri"],
                ["3", "Discuți și finalizezi lucrarea"],
              ].map(([step, text]) => (
                <div key={step} className="rounded-3xl bg-white p-5 shadow-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                    {step}
                  </div>
                  <p className="mt-4 text-base font-semibold text-slate-900">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-8 md:px-6 md:py-12">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950">
              De ce Muncitorii.ro
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                "Vezi recenzii înainte să alegi",
                "Compari profile și experiență",
                "Discuți direct în platformă",
                "Găsești oameni potriviți mai repede",
              ].map((item) => (
                <div key={item} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                    ✓
                  </div>
                  <p className="text-sm font-semibold text-slate-900">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-50 px-4 py-8 md:px-6 md:py-12">
          <div className="mx-auto max-w-6xl">
            <div className="flex items-end justify-between gap-3">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-950">
                  Meseriași recomandați
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  Exemple de profiluri care inspiră încredere și claritate.
                </p>
              </div>
              <Link href="/muncitori" className="text-sm font-semibold text-blue-700 hover:text-blue-800">
                Vezi toți
              </Link>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {workers.map((worker) => (
                <WorkerCard key={worker.slug} {...worker} />
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-8 md:px-6 md:py-12">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950">
              Ce spun clienții
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {testimonials.map((testimonial) => (
                <div key={testimonial.name} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-sm leading-6 text-slate-700">“{testimonial.text}”</p>
                  <div className="mt-4">
                    <p className="font-semibold text-slate-950">{testimonial.name}</p>
                    <p className="text-sm text-slate-500">{testimonial.city}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-8 pt-2 md:px-6 md:pb-14">
          <div className="mx-auto max-w-6xl rounded-[2rem] bg-blue-700 px-6 py-8 text-white md:px-10 md:py-10">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Ai o lucrare de făcut?
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-blue-100 md:text-base">
              Postează acum și găsește muncitorul potrivit fără să pierzi timp pe grupuri, telefoane și recomandări neclare.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/register"
                className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
              >
                Postează o lucrare
              </Link>
              <Link
                href="/register/muncitor"
                className="rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Creează cont muncitor
              </Link>
            </div>
          </div>
        </section>

        <SiteFooter />
      </div>
    </main>
  );
}
