import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cum lucrez | Muncitorii.ro",
  description:
    "Cum organizez o renovare în Iași, pas cu pas: de la pozele pe care mi le trimiți, la dosarul digital final.",
};

const pasi = [
  {
    num: "01",
    title: "Îmi trimiți pozele și ce ai de făcut",
    text: "Prin formularul de pe /cerere: câteva poze cu spațiul, tipul lucrării, orașul, un buget orientativ dacă ai unul. Plătești o taxă de evaluare de 200 lei, care se scade integral din valoarea lucrării.",
  },
  {
    num: "02",
    title: "În 48 de ore îți răspund cu un plan",
    text: "Mă uit la poze, dacă e cazul vin să văd la fața locului, și îți scriu clar ce trebuie făcut: caietul de sarcini. O pagină, nu un contract stufos.",
  },
  {
    num: "03",
    title: "Aduc 2–3 oferte pe același format",
    text: "Trimit caietul de sarcini la meseriași din rețeaua mea și le cer ofertă pe aceleași puncte. Le pui una lângă alta și compari cifre, nu promisiuni spuse diferit de fiecare.",
  },
  {
    num: "04",
    title: "Șantierul merge pe etape, cu poze",
    text: "Fiecare etapă are un termen. Când e terminată, primești poze înainte și după, direct pe telefon, și un buton de confirmare. Nu trecem la etapa următoare fără OK-ul tău.",
  },
  {
    num: "05",
    title: "Dacă apare un cost extra, îl aprobi tu, în scris",
    text: "Se mai întâmplă — o instalație veche care nu ține, un perete care nu e drept. Îți explic ce s-a găsit și cât costă, și decizi tu: aprobi sau respingi, înainte să se facă orice.",
  },
  {
    num: "06",
    title: "La final, primești dosarul",
    text: "Facturi, garanții, procesul verbal de recepție, instrucțiuni de întreținere — tot într-un singur loc, pe linkul tău, oricând îl poți accesa.",
  },
];

const tuFaci = [
  "Îmi trimiți pozele și descrierea, cât mai clar",
  "Confirmi etapele pe măsură ce sunt terminate",
  "Aprobi sau respingi costurile extra propuse",
  "Plătești pe etape, conform planului: 40/40/20",
];

const euFac = [
  "Evaluez lucrarea și scriu caietul de sarcini",
  "Aduc și coordonez meseriași din rețeaua mea",
  "Documentez fiecare etapă cu poze înainte și după",
  "Țin dosarul la zi și îl predau complet la final",
];

const platiSplit = [
  { pct: "40%", label: "La start", detail: "după ce aprobi oferta și caietul de sarcini" },
  { pct: "40%", label: "La etapa intermediară", detail: "când etapele de mijloc sunt confirmate de tine" },
  { pct: "20%", label: "La recepție", detail: "după predarea dosarului digital complet" },
];

const nuFac = [
  "Nu dau un preț fix înainte de evaluare — bugetul orientativ e o estimare, oferta fermă vine după caietul de sarcini",
  "Nu sunt angajatorul meseriașilor din rețea — coordonez lucrarea, nu sunt intermediar de forță de muncă",
  "Nu lucrez în afara Iașiului și a 50 km din jur, momentan",
  "Nu pornesc o etapă nouă fără confirmarea celei anterioare",
];

export default function CumLucramPage() {
  return (
    <section className="px-4 py-10 md:px-6 md:py-16">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-medium text-slate-500">Cum lucrez</p>
        <h1 className="mt-3 text-3xl text-slate-950 md:text-5xl">
          Șase pași, ca să nu rămâi cu întrebări pe drum
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate-700">
          De la primele poze pe care mi le trimiți, la dosarul pe care-l ții la final.
        </p>

        <div className="mt-10 divide-y divide-slate-200 border-t border-b border-slate-200">
          {pasi.map((step) => (
            <div key={step.num} className="flex gap-5 py-6">
              <p className="w-8 shrink-0 text-sm font-medium text-slate-400">{step.num}</p>
              <div>
                <h2 className="text-lg text-slate-950">{step.title}</h2>
                <p className="mt-1.5 text-base leading-relaxed text-slate-700">{step.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Ce faci tu / ce fac eu */}
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-xl text-slate-950">Ce faci tu</h2>
            <ul className="mt-4 space-y-3">
              {tuFaci.map((item) => (
                <li key={item} className="border-t border-slate-200 pt-3 text-base leading-relaxed text-slate-700 first:border-t-0 first:pt-0">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl text-slate-950">Ce fac eu</h2>
            <ul className="mt-4 space-y-3">
              {euFac.map((item) => (
                <li key={item} className="border-t border-slate-200 pt-3 text-base leading-relaxed text-slate-700 first:border-t-0 first:pt-0">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Plata pe etape */}
        <div className="mt-12 border-t border-slate-200 pt-8">
          <h2 className="text-xl text-slate-950">Cum se plătește: 40/40/20</h2>
          <p className="mt-2 text-base leading-relaxed text-slate-700">
            Împart plata pe etape, ca să nu dai totul înainte să vezi rezultatul.
          </p>
          <div className="mt-6 divide-y divide-slate-200">
            {platiSplit.map((p) => (
              <div key={p.label} className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:gap-6">
                <p className="w-16 shrink-0 text-2xl text-primary-900">{p.pct}</p>
                <div>
                  <p className="text-base font-medium text-slate-950">{p.label}</p>
                  <p className="mt-0.5 text-sm text-slate-500">{p.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ce nu fac */}
        <div className="mt-12 border-t border-slate-200 pt-8">
          <h2 className="text-xl text-slate-950">Ce nu fac</h2>
          <ul className="mt-4 space-y-3">
            {nuFac.map((item) => (
              <li key={item} className="border-t border-slate-200 pt-3 text-base leading-relaxed text-slate-600 first:border-t-0 first:pt-0">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12">
          <Link
            href="/cerere"
            className="inline-flex rounded-2xl bg-accent-700 px-6 py-3.5 text-base font-medium text-white transition hover:bg-accent-800"
          >
            Trimite-mi pozele cu lucrarea
          </Link>
        </div>
      </div>
    </section>
  );
}
