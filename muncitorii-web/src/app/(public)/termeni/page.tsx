import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termeni și condiții | Muncitorii.ro",
  description: "Termenii și condițiile de utilizare a platformei Muncitorii.ro.",
};

const sections = [
  {
    title: "1. Acceptarea termenilor",
    text: "Prin accesarea și utilizarea platformei Muncitorii.ro, ești de acord cu acești termeni. Dacă nu ești de acord, te rugăm să nu folosești platforma.",
  },
  {
    title: "2. Descrierea serviciului",
    text: "Muncitorii.ro este o platformă de intermediere care conectează clienți cu meseriași. Nu suntem angajatorul niciunui meseriaș și nu garantăm rezultatele lucrărilor contractate prin platformă.",
  },
  {
    title: "3. Conturi și responsabilitate",
    text: "Ești responsabil pentru acuratețea informațiilor din cont și pentru toate activitățile desfășurate prin acesta. Utilizarea falsă de identitate sau informații false duce la suspendarea contului.",
  },
  {
    title: "4. Recenzii",
    text: "Recenziile trebuie să fie autentice și bazate pe experiențe reale. Recenziile false, instigatoare sau calomnioase vor fi eliminate iar conturile responsabile vor fi sancționate.",
  },
  {
    title: "5. Modificări",
    text: "Ne rezervăm dreptul de a modifica acești termeni în orice moment. Modificările vor fi anunțate pe platformă și vor intra în vigoare imediat după publicare.",
  },
  {
    title: "6. Contact",
    text: "Pentru orice întrebări legate de acești termeni, contactează-ne la contact@muncitorii.ro.",
  },
];

export default function TermeniPage() {
  return (
    <section className="px-4 py-12 md:px-6 md:py-20">
      <div className="mx-auto max-w-4xl">
        <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
          Legal
        </span>
        <h1 className="mt-4 text-4xl font-bold tracking-[-0.025em] text-slate-950 md:text-5xl">
          Termeni și condiții
        </h1>
        <p className="mt-4 text-sm text-slate-500">
          Ultima actualizare: {new Intl.DateTimeFormat("ro-RO", { dateStyle: "long" }).format(new Date("2026-04-01"))}
        </p>

        <div className="mt-10 space-y-4">
          {sections.map((s) => (
            <div key={s.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card md:p-8">
              <h2 className="text-base font-semibold text-slate-950">{s.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
