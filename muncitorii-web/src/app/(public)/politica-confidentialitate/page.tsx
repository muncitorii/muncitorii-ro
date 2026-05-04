import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politică de confidențialitate | Muncitorii.ro",
  description: "Cum colectăm, folosim și protejăm datele tale personale pe Muncitorii.ro.",
};

const sections = [
  {
    title: "1. Date colectate",
    text: "Colectăm datele pe care ni le furnizezi la înregistrare (nume, email, număr de telefon) și datele generate prin utilizarea platformei (lucrări postate, recenzii, mesaje).",
  },
  {
    title: "2. Cum folosim datele",
    text: "Datele sunt folosite exclusiv pentru funcționarea platformei: afișarea profilurilor, trimiterea notificărilor și îmbunătățirea serviciului. Nu vindem date terților.",
  },
  {
    title: "3. Cookie-uri",
    text: "Folosim cookie-uri esențiale pentru funcționarea platformei și cookie-uri analitice pentru a înțelege cum e folosit site-ul. Poți dezactiva cookie-urile non-esențiale din setările browserului.",
  },
  {
    title: "4. Drepturile tale",
    text: "Ai dreptul de acces, rectificare și ștergere a datelor tale. Poți solicita exportul sau ștergerea completă a datelor prin email la contact@muncitorii.ro.",
  },
  {
    title: "5. Securitate",
    text: "Datele sunt stocate în siguranță, cu acces restricționat. Nu stocăm parole în clar — folosim hashing standard.",
  },
  {
    title: "6. Contact",
    text: "Pentru orice întrebare legată de datele tale, scrie-ne la contact@muncitorii.ro.",
  },
];

export default function PoliticaConfidentialitatePage() {
  return (
    <section className="px-4 py-12 md:px-6 md:py-20">
      <div className="mx-auto max-w-4xl">
        <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
          Legal
        </span>
        <h1 className="mt-4 text-4xl font-bold tracking-[-0.025em] text-slate-950 md:text-5xl">
          Politică de confidențialitate
        </h1>
        <p className="mt-4 text-sm text-slate-500">
          Ultima actualizare:{" "}
          {new Intl.DateTimeFormat("ro-RO", { dateStyle: "long" }).format(
            new Date("2026-04-01"),
          )}
        </p>

        <div className="mt-10 space-y-4">
          {sections.map((s) => (
            <div
              key={s.title}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card md:p-8"
            >
              <h2 className="text-base font-semibold text-slate-950">{s.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
