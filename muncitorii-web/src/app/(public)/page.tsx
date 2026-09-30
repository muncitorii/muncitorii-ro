import Link from "next/link";
import {
  ClipboardList,
  FileCheck2,
  Camera,
  FileSignature,
  FolderCheck,
  MapPin,
} from "lucide-react";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/motion";

const promises = [
  {
    Icon: ClipboardList,
    title: "Lucrare clară",
    description: "Descrii o dată, cu poze — primești un caiet de sarcini scris, nu vorbe în vânt.",
  },
  {
    Icon: FileCheck2,
    title: "Ofertă clară",
    description: "Compari oferte pe aceleași criterii, nu ghicești ce e inclus și ce nu.",
  },
  {
    Icon: Camera,
    title: "Dovadă clară",
    description: "Fiecare etapă are poze înainte/după și confirmarea ta, nu \"pe cuvânt\".",
  },
  {
    Icon: FileSignature,
    title: "Costuri fără surprize",
    description: "Orice cost suplimentar se aprobă în scris, de tine, înainte să fie făcut.",
  },
  {
    Icon: FolderCheck,
    title: "Dosar complet la final",
    description: "Facturi, garanții, instrucțiuni de întreținere — totul într-un singur loc.",
  },
];

const steps = [
  {
    num: "01",
    title: "Descrii lucrarea",
    description: "Trimiți poze, tipul lucrării, orașul și bugetul orientativ. Durează 3 minute.",
  },
  {
    num: "02",
    title: "Primești caiet de sarcini și oferte",
    description: "Evaluăm lucrarea și îți trimitem oferte comparabile de la meseriași din rețea.",
  },
  {
    num: "03",
    title: "Urmărești etapele cu poze",
    description: "Fiecare etapă are termen, poze înainte/după și un buton de confirmare pentru tine.",
  },
  {
    num: "04",
    title: "Primești dosarul digital",
    description: "La final: facturi, garanții, instrucțiuni de întreținere, totul organizat.",
  },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="bg-gradient-to-br from-primary-900 to-primary-950 px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <FadeUp>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent-700/30 bg-accent-700/10 px-4 py-1.5 text-xs font-bold tracking-wide text-accent-500">
              <MapPin size={14} /> Iași și împrejurimi
            </span>
            <h1 className="mt-5 text-4xl font-black leading-[1.08] tracking-[-0.03em] text-white md:text-6xl">
              Renovarea ta, coordonată cu{" "}
              <span className="text-accent-500">dovadă</span>.
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-white/65">
              Lucrare clară, ofertă clară, dovadă clară. Descrii ce ai de făcut, primești caiet de
              sarcini și oferte comparabile, urmărești fiecare etapă cu poze înainte/după.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/cerere"
                className="w-full rounded-2xl bg-accent-700 px-6 py-3.5 text-center text-base font-bold text-white transition-all duration-200 ease-out hover:bg-accent-800 sm:w-auto"
              >
                Descrie lucrarea
              </Link>
              <a
                href={`https://wa.me/${(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "40712345678").replace(/^\+/, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full rounded-2xl border border-white/20 bg-white/5 px-6 py-3.5 text-center text-base font-semibold text-white transition-all duration-200 ease-out hover:bg-white/10 sm:w-auto"
              >
                Scrie-ne pe WhatsApp
              </a>
            </div>

            <p className="mt-4 text-sm text-white/45">
              Taxă de evaluare 200 lei — se deduce integral din lucrare.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* CELE 5 PROMISIUNI */}
      <section className="bg-white px-4 py-12 md:px-6 md:py-20">
        <div className="mx-auto max-w-6xl">
          <FadeUp className="max-w-2xl">
            <h2 className="text-2xl font-bold tracking-[-0.02em] text-slate-950 md:text-3xl">
              Ce înseamnă „coordonat"
            </h2>
            <p className="mt-2 text-slate-600">Cinci promisiuni concrete, nu cuvinte goale.</p>
          </FadeUp>

          <StaggerContainer className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {promises.map(({ Icon, title, description }) => (
              <StaggerItem key={title}>
                <div className="flex h-full flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-5 shadow-card transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-primary-500/20 hover:shadow-card-hover">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-50 text-primary-900">
                    <Icon size={20} />
                  </div>
                  <p className="font-semibold text-slate-950">{title}</p>
                  <p className="text-sm leading-relaxed text-slate-600">{description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CUM LUCRĂM — 4 pași */}
      <section className="bg-slate-50 px-4 py-12 md:px-6 md:py-20">
        <div className="mx-auto max-w-6xl">
          <FadeUp className="max-w-2xl">
            <h2 className="text-2xl font-bold tracking-[-0.02em] text-slate-950 md:text-3xl">
              Cum lucrăm
            </h2>
            <p className="mt-2 text-slate-600">Patru pași, fără zone gri.</p>
          </FadeUp>

          <StaggerContainer className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
            {steps.map(({ num, title, description }) => (
              <StaggerItem key={num}>
                <div className="h-full rounded-3xl bg-white p-6 shadow-card">
                  <p className="text-4xl font-extrabold tracking-[-0.03em] text-slate-100">{num}</p>
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
