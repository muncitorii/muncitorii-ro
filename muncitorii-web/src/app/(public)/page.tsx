import Link from "next/link";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { getHomepageCategories } from "@/lib/categories";

const steps = [
  {
    num: "01",
    title: "Postezi sau cauți",
    description:
      "Publică o lucrare sau caută direct în catalogul de meseriași verificați din zona ta.",
  },
  {
    num: "02",
    title: "Compari și alegi",
    description:
      "Citești recenzii reale, compari experiența și prețurile, alegi omul potrivit.",
  },
  {
    num: "03",
    title: "Discuți și finalizezi",
    description:
      "Contactezi direct în platformă, stabilești detaliile și lucrarea se face.",
  },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="bg-gradient-to-br from-primary-900 to-primary-950 px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 lg:gap-20">

          {/* Stânga: text + checks */}
          <FadeUp>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent-700/30 bg-accent-700/10 px-4 py-1.5 text-xs font-bold tracking-wide text-accent-500">
              ✦ Platforma #1 pentru meseriași din România
            </span>
            <h1 className="mt-5 text-5xl font-black leading-[1.04] tracking-[-0.035em] text-white md:text-6xl lg:text-[64px]">
              Găsești meseriașul potrivit.{" "}
              <span className="text-accent-500">Rapid.</span>
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-white/60">
              De la reparații mici la renovări complete — compari profiluri reale, citești recenzii și alegi direct.
            </p>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              {["Gratuit", "Fără comision", "Profil verificat", "Recenzii reale"].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm font-medium text-white/55">
                  <span className="font-bold text-emerald-400">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </FadeUp>

          {/* Dreapta: card search */}
          <FadeUp delay={0.1}>
            <form
              method="GET"
              action="/muncitori"
              className="rounded-2xl border border-white/10 bg-white/6 p-6 md:p-7"
            >
              <h3 className="mb-5 text-base font-bold text-white">Caută un meseriaș</h3>
              <div className="flex flex-col gap-3">
                <input
                  type="text"
                  name="cat"
                  placeholder="Ce ai de făcut? (ex: instalator, zugrav...)"
                  className="w-full rounded-xl border border-white/12 bg-white/8 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-white/30 focus:ring-2 focus:ring-white/10"
                />
                <input
                  type="text"
                  name="oras"
                  placeholder="Oraș sau județ"
                  className="w-full rounded-xl border border-white/12 bg-white/8 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-white/30 focus:ring-2 focus:ring-white/10"
                />
                <button
                  type="submit"
                  className="w-full rounded-xl bg-accent-700 px-4 py-3 text-sm font-bold text-white transition-all duration-200 ease-out hover:bg-accent-800"
                >
                  Caută meseriași
                </button>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <div className="h-px flex-1 bg-white/8" />
                <span className="text-xs text-white/30">sau</span>
                <div className="h-px flex-1 bg-white/8" />
              </div>
              <Link
                href="/register/client"
                className="mt-3 block text-center text-sm font-semibold text-white/60 transition hover:text-white"
              >
                Postează o lucrare și primești oferte →
              </Link>
            </form>
          </FadeUp>

        </div>
      </section>

      {/* CATEGORII */}
      <section className="bg-white px-4 py-12 md:px-6 md:py-20">
        <div className="mx-auto max-w-6xl">
          <FadeUp>
            <h2 className="text-2xl font-bold tracking-[-0.02em] text-slate-950 md:text-3xl">
              Categorii populare
            </h2>
            <p className="mt-2 text-slate-600">Alege rapid domeniul care te interesează.</p>
          </FadeUp>

          <StaggerContainer className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {getHomepageCategories().map(({ name, slug, Icon }) => (
              <StaggerItem key={slug}>
                <Link
                  href={`/muncitori?cat=${slug}`}
                  className="group flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-5 shadow-card transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-primary-500/20 hover:shadow-card-hover"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary-900 transition-colors duration-200 group-hover:bg-primary-100">
                    <Icon size={22} />
                  </div>
                  <span className="font-semibold text-slate-900">{name}</span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CUM FUNCȚIONEAZĂ */}
      <section className="bg-slate-50 px-4 py-12 md:px-6 md:py-20">
        <div className="mx-auto max-w-6xl">
          <FadeUp className="max-w-2xl">
            <h2 className="text-2xl font-bold tracking-[-0.02em] text-slate-950 md:text-3xl">
              Cum funcționează
            </h2>
            <p className="mt-2 text-slate-600">
              Simplu, clar și fără pierdere de timp.
            </p>
          </FadeUp>

          <StaggerContainer className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map(({ num, title, description }) => (
              <StaggerItem key={num}>
                <div className="rounded-3xl bg-white p-6 shadow-card md:p-8">
                  <p className="text-5xl font-extrabold tracking-[-0.03em] text-slate-100">
                    {num}
                  </p>
                  <h3 className="mt-4 text-xl font-semibold tracking-[-0.015em] text-slate-950">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* FOUNDER STORY */}
      <section className="bg-white px-4 py-12 md:px-6 md:py-20">
        <div className="mx-auto max-w-4xl">
          <FadeUp>
            <span className="inline-flex rounded-full border border-accent-200 bg-accent-50 px-3 py-1 text-xs font-semibold text-accent-700">
              De ce există Muncitorii.ro
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-[-0.02em] text-slate-950 md:text-4xl">
              Am construit asta pentru că am pățit-o pe pielea mea.
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-700 md:text-lg">
              <p>
                Sunt Liviu, electrician cu 8 ani experiență. Am cumpărat un apartament
                și am renovat. Pe primul zugrav l-am găsit pe un grup de Facebook.
                Mi-a cerut un preț, am acceptat, a luat avans, a lucrat 4 zile.
              </p>
              <p>
                Rezultatul? <strong>Rosturi strâmbe. Pereți cu pete. Finisaj de copil de 5 ani.</strong>
              </p>
              <p>
                L-am dat afară. Am angajat altul. La final, aceeași lucrare —
                plătită de două ori. <strong>12.000 lei pierduți.</strong>
              </p>
              <p>
                Eu sunt meseriaș. Cunosc termenii. Și totuși am pățit-o.
                Pentru că pe Facebook nu vezi nimic — nici recenzii, nici poze, nici istoric.
              </p>
              <p className="text-slate-950 font-semibold">
                De-aia am construit Muncitorii.ro. Profil real, lucrări făcute, recenzii adevărate.
                Înainte să dai avansul pe primul telefon — uită-te aici.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* CTA DUAL */}
      <section className="px-4 py-12 md:px-6 md:py-20">
        <div className="mx-auto max-w-6xl">
          <FadeUp>
            <div className="grid gap-px overflow-hidden rounded-3xl bg-slate-200 md:grid-cols-2">
              <div className="bg-primary-900 px-8 py-10 md:px-10 md:py-14">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/60">
                  Pentru clienți
                </p>
                <h2 className="mt-3 text-2xl font-bold tracking-[-0.02em] text-white md:text-3xl">
                  Ai o lucrare de făcut?
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-white/80">
                  Postează acum și primești oferte de la meseriași verificați din zona ta.
                </p>
                <Link
                  href="/register/client"
                  className="mt-6 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-primary-900 transition-all duration-200 ease-out hover:bg-primary-50"
                >
                  Postează o lucrare
                </Link>
              </div>

              <div className="bg-primary-800 px-8 py-10 md:px-10 md:py-14">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/60">
                  Pentru meseriași
                </p>
                <h2 className="mt-3 text-2xl font-bold tracking-[-0.02em] text-white md:text-3xl">
                  Ești meseriaș?
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-white/80">
                  Creează-ți profilul și primește cereri de la clienți care caută exact meseria ta.
                </p>
                <Link
                  href="/register/muncitor"
                  className="mt-6 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-primary-900 transition-all duration-200 ease-out hover:bg-primary-50"
                >
                  Creează cont de meseriaș
                </Link>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
