import type { Metadata } from "next";
import Link from "next/link";
import { Check, X } from "lucide-react";

export const metadata: Metadata = {
  title: "Cum lucrăm | Muncitorii.ro",
  description:
    "Cum coordonăm o renovare: caiet de sarcini, oferte comparabile, etape cu poze și confirmare, plată 40/40/20, dosar la recepție.",
};

const flowSteps = [
  {
    num: "01",
    title: "Descrii lucrarea",
    text: "Trimiți poze și detalii prin formularul de pe /cerere. Plătești o taxă de evaluare de 200 lei, care se deduce integral din valoarea lucrării.",
  },
  {
    num: "02",
    title: "Evaluăm și scriem caietul de sarcini",
    text: "Venim la fața locului (sau evaluăm din poze, pentru lucrări mici), scriem clar ce trebuie făcut și trimitem cereri de ofertă către meseriași din rețeaua noastră.",
  },
  {
    num: "03",
    title: "Compari ofertele",
    text: "Primești ofertele scrise pe același caiet de sarcini. Compari prețul, termenul și garanția rând cu rând.",
  },
  {
    num: "04",
    title: "Lucrarea are etape cu poze",
    text: "Fiecare etapă are un termen. Când etapa e gata, primești poze înainte și după. Confirmi din telefon, apoi se trece la etapa următoare.",
  },
  {
    num: "05",
    title: "Costurile suplimentare se aprobă în scris",
    text: "Dacă apare ceva neprevăzut, de exemplu o coloană de apă corodată, primești costul suplimentar explicat și îl aprobi sau îl respingi tu, înainte să fie făcut.",
  },
  {
    num: "06",
    title: "Primești dosarul digital",
    text: "La final primești facturile, garanțiile, procesul-verbal de recepție și instrucțiunile de întreținere, organizate într-un singur dosar digital, accesibil oricând.",
  },
];

const youDo = [
  "Descrii lucrarea și trimiți poze",
  "Confirmi etapele pe măsură ce sunt finalizate",
  "Aprobi sau respingi costurile suplimentare propuse",
  "Plătești pe etape, conform planului de plată",
];

const weDo = [
  "Evaluăm lucrarea și scriem caietul de sarcini",
  "Găsim și coordonăm meseriași din rețeaua noastră",
  "Documentăm fiecare etapă cu poze înainte/după",
  "Ținem dosarul digital la zi și îl predăm complet la final",
];

const paymentSplit = [
  { pct: "40%", label: "La începerea lucrării", detail: "după ce ai aprobat oferta și caietul de sarcini" },
  { pct: "40%", label: "La jumătatea etapelor", detail: "când etapele intermediare sunt confirmate de tine" },
  { pct: "20%", label: "La finalizare", detail: "după predarea dosarului digital complet" },
];

const weDontDo = [
  "Prețul ferm vine după caietul de sarcini. Bugetul orientativ din formular este doar o estimare.",
  "Coordonăm lucrarea. Meseriașii din rețea sunt firme sau PFA independente, nu angajații noștri.",
  "Lucrăm momentan în Iași și pe o rază de 50 km.",
  "Nu începem o etapă nouă până nu ai confirmat-o pe cea anterioară.",
];

export default function CumLucramPage() {
  return (
    <section className="px-4 py-10 md:px-6 md:py-16">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-3xl bg-gradient-to-br from-primary-900 to-primary-950 px-6 py-7 text-white md:px-8 md:py-9">
          <p className="text-sm font-medium text-white/60">Cum lucrăm</p>
          <h1 className="mt-1 text-2xl font-bold tracking-[-0.015em] text-white md:text-3xl">
            Flow-ul complet, pas cu pas
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/75 md:text-base">
            De la primul mesaj la dosarul digital final. Șase pași, fiecare cu o dovadă.
          </p>
        </div>

        <div className="mt-10 space-y-4">
          {flowSteps.map((step) => (
            <div key={step.num} className="flex gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-card md:p-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-900 font-mono text-sm font-semibold text-white">
                {step.num}
              </div>
              <div>
                <h2 className="font-semibold text-slate-950">{step.title}</h2>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{step.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Ce faci tu / ce facem noi */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl bg-white p-6 shadow-card md:p-8">
            <h2 className="text-xl font-bold tracking-tight text-primary-900">Ce faci tu</h2>
            <ul className="mt-5 space-y-3">
              {youDo.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <Check size={16} className="mt-0.5 shrink-0 text-emerald-600" strokeWidth={2.5} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-card md:p-8">
            <h2 className="text-xl font-bold tracking-tight text-primary-900">Ce facem noi</h2>
            <ul className="mt-5 space-y-3">
              {weDo.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <Check size={16} className="mt-0.5 shrink-0 text-emerald-600" strokeWidth={2.5} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Plata pe etape */}
        <div className="mt-12 rounded-3xl border-2 border-primary-900/10 bg-primary-50/40 p-6 md:p-8">
          <h2 className="text-xl font-bold tracking-tight text-primary-900">Cum se plătește: 40/40/20</h2>
          <p className="mt-2 text-sm text-slate-600">
            Plata e împărțită pe etape, ca să nu plătești totul înainte să vezi rezultatul.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {paymentSplit.map((p) => (
              <div key={p.label} className="rounded-2xl bg-white p-5 shadow-card">
                <p className="text-3xl font-extrabold tracking-[-0.02em] text-primary-900">{p.pct}</p>
                <p className="mt-2 text-sm font-semibold text-slate-950">{p.label}</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">{p.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Ce nu facem */}
        <div className="mt-12 rounded-3xl bg-slate-950 p-6 text-white md:p-8">
          <h2 className="text-xl font-bold tracking-tight">Ce nu facem</h2>
          <ul className="mt-5 space-y-3">
            {weDontDo.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-white/75">
                <X size={16} className="mt-0.5 shrink-0 text-white/40" strokeWidth={2.5} />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/cerere"
            className="inline-flex rounded-full bg-accent-700 px-6 py-3.5 text-base font-bold text-white transition hover:bg-accent-800"
          >
            Descrie lucrarea
          </Link>
        </div>
      </div>
    </section>
  );
}
