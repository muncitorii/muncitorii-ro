import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const portfolio = ["Tablou electric", "Reparație priză", "Instalație nouă în apartament"];
const reviews = [
  "Foarte serios și punctual. A explicat clar ce a făcut și a lucrat curat.",
  "A răspuns rapid și a rezolvat problema în aceeași zi.",
];

export default async function WorkerProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const name = slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <SiteHeader ctaHref="/register" ctaLabel="Postează o lucrare" />

      <section className="px-4 py-10 md:px-6 md:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-[2rem] bg-white p-6 shadow-sm md:p-8">
              <div className="flex items-start gap-5">
                <div className="flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-blue-100 text-3xl font-bold text-blue-700">
                  {name.charAt(0)}
                </div>
                <div>
                  <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                    Profil muncitor
                  </span>
                  <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
                    {name}
                  </h1>
                  <p className="mt-2 text-sm text-slate-600">Electrician • București • ⭐ 4.9</p>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 md:text-base">
                    Execut lucrări electrice pentru apartamente, case și spații comerciale. Pun accent pe seriozitate, claritate și răspuns rapid.
                  </p>
                </div>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <div className="rounded-3xl border border-slate-200 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Răspuns</p>
                  <p className="mt-2 font-semibold text-slate-950">În aceeași zi</p>
                </div>
                <div className="rounded-3xl border border-slate-200 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Experiență</p>
                  <p className="mt-2 font-semibold text-slate-950">8+ ani</p>
                </div>
                <div className="rounded-3xl border border-slate-200 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Disponibilitate</p>
                  <p className="mt-2 font-semibold text-slate-950">Activ acum</p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] bg-white p-6 shadow-sm md:p-8">
              <h2 className="text-xl font-bold tracking-tight text-slate-950">Contact rapid</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Trimite o cerere sau postează lucrarea ta pentru a începe discuția.
              </p>
              <div className="mt-5 space-y-3">
                <a
                  href="/register"
                  className="flex w-full items-center justify-center rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Trimite cerere
                </a>
                <a
                  href="/register"
                  className="flex w-full items-center justify-center rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-800 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                >
                  Postează o lucrare
                </a>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-[1fr_1fr]">
            <div className="rounded-[2rem] bg-white p-6 shadow-sm md:p-8">
              <h2 className="text-xl font-bold tracking-tight text-slate-950">Lucrări din portofoliu</h2>
              <div className="mt-5 grid gap-3">
                {portfolio.map((item) => (
                  <div key={item} className="rounded-3xl border border-slate-200 p-4">
                    <div className="mb-3 h-32 rounded-2xl bg-slate-100" />
                    <p className="font-semibold text-slate-900">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] bg-white p-6 shadow-sm md:p-8">
              <h2 className="text-xl font-bold tracking-tight text-slate-950">Recenzii</h2>
              <div className="mt-5 space-y-4">
                {reviews.map((review) => (
                  <div key={review} className="rounded-3xl border border-slate-200 p-4">
                    <p className="text-sm leading-6 text-slate-700">“{review}”</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
