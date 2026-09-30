import Link from "next/link";
import { MapPin } from "lucide-react";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/motion";

const promises = [
  {
    title: "Caiet de sarcini",
    description:
      "Descrii lucrarea o singură dată, cu poze. Primești un document scris cu ce se face, în ce ordine și cu ce materiale.",
  },
  {
    title: "Oferte pe același caiet de sarcini",
    description:
      "Doi sau trei meseriași din rețea cotează aceeași listă de lucrări. Compari prețul, termenul și garanția pe aceleași rânduri.",
  },
  {
    title: "Etape cu poze și confirmare",
    description:
      "Lucrarea e împărțită în etape cu termen. La fiecare etapă primești poze înainte și după și confirmi din telefon înainte să se treacă mai departe.",
  },
  {
    title: "Costuri suplimentare aprobate în scris",
    description:
      "Dacă apare ceva neprevăzut, primești devizul suplimentar explicat. Se execută numai după aprobarea ta scrisă.",
  },
  {
    title: "Dosarul lucrării",
    description:
      "La recepție primești facturile, garanțiile, procesul-verbal și instrucțiunile de întreținere, într-un singur dosar digital.",
  },
];

const steps = [
  {
    num: "01",
    title: "Descrii lucrarea",
    description: "Trimiți poze, tipul lucrării, adresa și bugetul orientativ. Formularul durează 3 minute.",
  },
  {
    num: "02",
    title: "Primești caietul de sarcini și ofertele",
    description:
      "Evaluăm lucrarea, la fața locului sau din poze, și îți trimitem 2–3 oferte pe același caiet de sarcini, în 3–5 zile lucrătoare.",
  },
  {
    num: "03",
    title: "Urmărești etapele",
    description:
      "Fiecare etapă are termen și poze înainte și după. Confirmi etapa din linkul tău, apoi se trece la următoarea.",
  },
  {
    num: "04",
    title: "Primești dosarul digital",
    description: "La recepție primești dosarul lucrării: facturi, garanții, proces-verbal, instrucțiuni de întreținere.",
  },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="bg-white px-4 py-10 md:px-6 md:py-14">
        <div className="mx-auto max-w-4xl">
          <FadeUp>
            <div className="rounded-3xl bg-gradient-to-br from-primary-900 to-primary-950 px-6 py-10 text-center text-white md:px-10 md:py-16">
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-white/60">
                <MapPin size={14} /> Iași și împrejurimi
              </span>
              <h1 className="mt-3 text-4xl leading-[1.08] tracking-[-0.03em] text-white md:text-6xl">
                Renovarea ta, coordonată cu{" "}
                <span className="text-accent-500">dovadă</span>.
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-white/75">
                Lucrare clară, ofertă clară, dovadă clară. Coordonăm renovări în Iași și în jur.
                Caiet de sarcini scris, oferte comparabile, etape cu poze și confirmarea ta, dosar
                complet la recepție.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/cerere"
                  className="w-full rounded-full bg-accent-700 px-6 py-3.5 text-center text-base font-semibold text-white transition-all duration-200 ease-out hover:bg-accent-800 sm:w-auto"
                >
                  Descrie lucrarea
                </Link>
                <a
                  href={`https://wa.me/${(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "40712345678").replace(/^\+/, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full rounded-full border border-white/30 px-6 py-3.5 text-center text-base font-medium text-white transition-all duration-200 ease-out hover:bg-white/10 sm:w-auto"
                >
                  Scrie-ne pe WhatsApp
                </a>
              </div>

              <p className="mt-4 text-sm text-white/60">
                Taxă de evaluare 200 lei, se deduce integral din lucrare.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* CELE 5 PROMISIUNI */}
      <section className="bg-white px-4 py-12 md:px-6 md:py-20">
        <div className="mx-auto max-w-3xl">
          <FadeUp>
            <h2 className="text-2xl font-bold tracking-[-0.02em] text-primary-900 md:text-3xl">
              Ce primești
            </h2>
            <p className="mt-2 text-slate-600">Cinci lucruri incluse în fiecare lucrare pe care o coordonăm.</p>
          </FadeUp>

          <StaggerContainer className="mt-8 grid gap-4 sm:grid-cols-2">
            {promises.map(({ title, description }) => (
              <StaggerItem key={title}>
                <div className="h-full rounded-2xl border border-primary-900/10 p-5 shadow-card">
                  <p className="font-semibold text-slate-950">{title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CUM LUCRĂM, 4 pași */}
      <section className="bg-slate-50 px-4 py-12 md:px-6 md:py-20">
        <div className="mx-auto max-w-6xl">
          <FadeUp className="max-w-2xl">
            <h2 className="text-2xl font-bold tracking-[-0.02em] text-primary-900 md:text-3xl">
              Cum lucrăm
            </h2>
            <p className="mt-2 text-slate-600">Patru pași, de la prima poză la recepție.</p>
          </FadeUp>

          <StaggerContainer className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
            {steps.map(({ num, title, description }) => (
              <StaggerItem key={num}>
                <div className="h-full rounded-3xl bg-white p-6 shadow-card">
                  <p className="font-mono text-4xl font-light tracking-[-0.02em] text-slate-300">{num}</p>
                  <h3 className="mt-3 text-lg font-semibold tracking-[-0.015em] text-slate-950">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeUp className="mt-8 text-center">
            <Link
              href="/cum-lucram"
              className="text-sm font-semibold text-primary-900 hover:text-primary-700"
            >
              Vezi tot flow-ul, inclusiv plata pe etape →
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* PENTRU MESERIAȘI */}
      <section className="px-4 py-12 md:px-6 md:py-20">
        <div className="mx-auto max-w-6xl">
          <FadeUp>
            <div className="grid gap-px overflow-hidden rounded-3xl bg-slate-200 md:grid-cols-2">
              <div className="bg-primary-900 px-8 py-10 md:px-10 md:py-14">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/60">
                  Pentru clienți
                </p>
                <h2 className="mt-3 text-2xl font-bold tracking-[-0.02em] text-white md:text-3xl">
                  Ai o renovare de făcut?
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-white/80">
                  Descrie lucrarea și te sunăm în 24h cu următorii pași.
                </p>
                <Link
                  href="/cerere"
                  className="mt-6 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-primary-900 transition-all duration-200 ease-out hover:bg-primary-50"
                >
                  Descrie lucrarea
                </Link>
              </div>

              <div className="bg-primary-800 px-8 py-10 md:px-10 md:py-14">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/60">
                  Pentru meseriași
                </p>
                <h2 className="mt-3 text-2xl font-bold tracking-[-0.02em] text-white md:text-3xl">
                  Ești meseriaș în Iași?
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-white/80">
                  Intri în rețeaua de subcontractori și primești cereri de ofertă pentru lucrări deja evaluate.
                </p>
                <Link
                  href="/parteneri"
                  className="mt-6 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-primary-900 transition-all duration-200 ease-out hover:bg-primary-50"
                >
                  Aplică ca partener
                </Link>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
