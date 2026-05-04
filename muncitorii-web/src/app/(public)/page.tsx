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
      <section className="bg-white px-4 py-16 md:px-6 md:py-28">
        <div className="mx-auto max-w-3xl">
          <FadeUp>
            <span className="inline-flex rounded-full border border-accent-200 bg-accent-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent-700">
              Povestea Muncitorii.ro
            </span>
            <h2 className="mt-5 text-4xl font-bold leading-[1.1] tracking-[-0.025em] text-slate-950 md:text-5xl">
              De ce am construit
              <br className="hidden sm:block" /> această platformă.
            </h2>
          </FadeUp>

          <div className="mt-12 space-y-10 md:mt-16 md:space-y-14">
            {/* Cine sunt */}
            <FadeUp>
              <p className="text-xl leading-relaxed text-slate-800 md:text-2xl md:leading-[1.5]">
                Sunt <strong className="text-slate-950">Liviu</strong>.
              </p>
              <p className="mt-3 text-lg leading-relaxed text-slate-600 md:text-xl">
                La bază sunt <strong className="text-slate-800">Ofițer Electric pe nave cargo</strong>.
              </p>
              <p className="mt-3 text-lg leading-relaxed text-slate-600 md:text-xl">
                Recent mi-am schimbat jobul cu unul la mal — iar asta mi-a dat timp să gândesc.
              </p>
              <p className="mt-5 text-2xl font-semibold tracking-[-0.015em] text-slate-950 md:text-3xl">
                Și așa a apărut Muncitorii.ro.
              </p>
            </FadeUp>

            <div className="h-px bg-slate-100" />

            {/* Povestea renovării */}
            <FadeUp>
              <p className="text-sm font-semibold uppercase tracking-widest text-accent-700">
                Cum a început totul
              </p>
              <p className="mt-4 text-lg leading-relaxed text-slate-700 md:text-xl">
                Am pornit cu renovarea unui apartament.
              </p>
              <p className="mt-3 text-lg leading-relaxed text-slate-700 md:text-xl">
                Din recomandarea cuiva, am colaborat cu niște muncitori. Mi-au cerut un preț pentru lucrare. Am fost de acord.
              </p>
              <p className="mt-5 rounded-2xl bg-slate-50 p-5 text-lg italic leading-relaxed text-slate-800 md:p-6 md:text-xl">
                Dar pe parcurs am descoperit că finisajele nu erau la nivelul meu de perfecționist. <span className="not-italic">😅</span>
              </p>
              <p className="mt-5 text-lg leading-relaxed text-slate-700 md:text-xl">
                Am dus lucrarea la bun sfârșit cu ei. Dar nu sunt mulțumit.
              </p>
            </FadeUp>

            <div className="h-px bg-slate-100" />

            {/* De ce platformă */}
            <FadeUp>
              <p className="text-sm font-semibold uppercase tracking-widest text-accent-700">
                De aceea există acest site
              </p>
              <p className="mt-4 text-2xl font-semibold leading-[1.35] tracking-[-0.015em] text-slate-950 md:text-3xl">
                Vreau ca lumea să aibă posibilitatea să aleagă un meseriaș care lucrează exact la nivelul lor.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-slate-600 md:text-xl">
                Pentru că plătești pentru asta.
              </p>
              <p className="mt-6 text-lg leading-relaxed text-slate-700 md:text-xl">
                În același timp, le dăm posibilitatea <strong className="text-slate-950">muncitorilor serioși să iasă în evidență</strong> — ca lumea să aprecieze ceea ce fac.
              </p>
            </FadeUp>

            {/* Viziunea — block evidențiat */}
            <FadeUp>
              <div className="rounded-3xl border-2 border-accent-700 bg-gradient-to-br from-accent-50/60 to-white p-7 md:p-10">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-700">
                  Viziunea
                </p>
                <p className="mt-4 text-2xl font-bold leading-[1.25] tracking-[-0.02em] text-slate-950 md:text-3xl">
                  Vreau ca Muncitorii.ro să devină etalonul pentru tot ce poți face în casă.
                </p>
                <p className="mt-4 text-base leading-relaxed text-slate-700 md:text-lg">
                  De la o gaură în perete. La mutări de mobilă. La lucrări complexe.
                </p>
                <p className="mt-3 text-base leading-relaxed text-slate-700 md:text-lg">
                  Și să dea posibilitatea celor care vor un ban extra — să intre pe site și să vadă lucrările disponibile.
                </p>
              </div>
            </FadeUp>

            <div className="h-px bg-slate-100" />

            {/* Promisiunea */}
            <FadeUp>
              <p className="text-sm font-semibold uppercase tracking-widest text-accent-700">
                Promisiunea mea
              </p>
              <p className="mt-4 text-xl leading-relaxed text-slate-800 md:text-2xl">
                Pe această platformă muncitorii vor fi <strong className="text-slate-950">verificați</strong>.
              </p>
              <p className="mt-3 text-lg leading-relaxed text-slate-700 md:text-xl">
                Fiecare își va face profilul cum dorește — cu poze și descrieri.
              </p>
              <p className="mt-3 text-lg italic leading-relaxed text-slate-600 md:text-xl">
                Fiecare meseriaș trebuie să-și vândă marfa, cum se spune.
              </p>
            </FadeUp>

            {/* CTA Contact */}
            <FadeUp>
              <div className="rounded-3xl bg-slate-950 p-7 text-white md:p-10">
                <p className="text-base leading-relaxed text-white/70 md:text-lg">
                  Aveți idei sau sugestii? În <strong className="text-white">dreapta jos</strong> găsiți butonul de contact.
                </p>
                <p className="mt-3 text-lg font-semibold leading-relaxed text-white md:text-xl">
                  Citesc fiecare mesaj personal — voi aprecia feedback-ul dumneavoastră.
                </p>
                <p className="mt-6 text-sm font-semibold tracking-wide text-accent-500">
                  — Liviu, fondator Muncitorii.ro
                </p>
              </div>
            </FadeUp>
          </div>
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
