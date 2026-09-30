import Link from "next/link";
import { FadeUp } from "@/components/ui/motion";

const primesti = [
  "Un caiet de sarcini de o pagină.",
  "Oferte pe care le poți compara.",
  "Poze la fiecare etapă, în telefonul tău.",
  "Costuri extra doar cu OK-ul tău scris.",
  "Dosar cu facturi și garanții, la final.",
];

const nuFac = [
  "lucrări sub 1.000 lei",
  "urgențe de noapte",
  "renovări peste 90.000 lei în primul an",
];

const costuri = [
  { titlu: "Evaluare", detaliu: "200 lei, se scad din lucrare." },
  { titlu: "Coordonare", detaliu: "10–12% din valoarea lucrării." },
  { titlu: "Plata lucrării", detaliu: "40% la start, 40% la etapa intermediară, 20% la recepție." },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="bg-[#f7f2ea] px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-3xl">
          <FadeUp>
            <p className="text-sm font-medium text-slate-500">Iași și 50 km în jur</p>
            <h1 className="mt-4 text-3xl leading-tight text-slate-950 md:text-5xl md:leading-tight">
              Renovezi baia sau apartamentul și nu vrei să te trezești cu meseriașul{" "}
              <em className="font-medium italic text-primary-900">dispărut</em> și factura dublă.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-700">
              Mă numesc Liviu, sunt electrician. Din 2026 organizez lucrări în Iași: îți scriu ce
              trebuie făcut, aduc 2–3 oferte pe același format, țin șantierul pe etape și nu se
              pune un leu în plus fără să semnezi tu.
            </p>

            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <Link
                href="/cerere"
                className="rounded-2xl bg-accent-700 px-6 py-3.5 text-base font-medium text-white transition-all duration-200 ease-out hover:bg-accent-800"
              >
                Trimite-mi pozele cu lucrarea
              </Link>
              <a
                href={`https://wa.me/${(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "40712345678").replace(/^\+/, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-slate-700 underline underline-offset-4 hover:text-slate-950"
              >
                sau scrie-mi pe WhatsApp
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* CE PRIMEȘTI */}
      <section className="bg-white px-4 py-12 md:px-6 md:py-20">
        <div className="mx-auto max-w-3xl">
          <FadeUp>
            <h2 className="text-2xl text-slate-950 md:text-3xl">Ce primești, pe scurt</h2>
            <ul className="mt-6 divide-y divide-slate-200 border-t border-slate-200">
              {primesti.map((item) => (
                <li key={item} className="py-4 text-base leading-relaxed text-slate-700">
                  {item}
                </li>
              ))}
            </ul>
          </FadeUp>
        </div>
      </section>

      {/* CE NU FAC */}
      <section className="bg-[#f7f2ea] px-4 py-12 md:px-6 md:py-20">
        <div className="mx-auto max-w-3xl">
          <FadeUp>
            <h2 className="text-2xl text-slate-950 md:text-3xl">Ce nu fac</h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-700">
              Nu iau {nuFac.join(", ")}. Și nu promit „meseriași verificați&rdquo; — spun exact ce
              verific: actele lucrării, calitatea materialelor, ce s-a discutat și s-a scris.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* CAT COSTA */}
      <section className="bg-white px-4 py-12 md:px-6 md:py-20">
        <div className="mx-auto max-w-3xl">
          <FadeUp>
            <h2 className="text-2xl text-slate-950 md:text-3xl">Cât costă</h2>
            <div className="mt-6 divide-y divide-slate-200 border-t border-slate-200">
              {costuri.map((c) => (
                <div key={c.titlu} className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:gap-6">
                  <p className="w-40 shrink-0 text-sm font-medium text-slate-500">{c.titlu}</p>
                  <p className="text-base leading-relaxed text-slate-800">{c.detaliu}</p>
                </div>
              ))}
            </div>
          </FadeUp>

          <FadeUp className="mt-8">
            <Link href="/cum-lucram" className="text-sm font-medium text-primary-900 underline underline-offset-4 hover:text-primary-700">
              Vezi cum lucrez pas cu pas →
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* PENTRU MESERIASI */}
      <section className="bg-slate-950 px-4 py-12 md:px-6 md:py-20">
        <div className="mx-auto max-w-3xl">
          <FadeUp>
            <p className="text-sm font-medium text-white/50">Ești meseriaș</p>
            <h2 className="mt-2 text-2xl text-white md:text-3xl">
              Lucrezi bine și te-ai săturat să alergi după clienți?
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70">
              Eu aduc lucrarea, tu o faci, ești plătit la 3–5 zile după ce încasez.
            </p>
            <Link
              href="/parteneri"
              className="mt-6 inline-flex text-sm font-medium text-white underline underline-offset-4 hover:text-white/80"
            >
              Vezi cum aplici →
            </Link>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
