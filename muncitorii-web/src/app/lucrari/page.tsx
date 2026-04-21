import Link from "next/link";
import { DashboardLayout } from "@/components/dashboard-layout";

const jobs = [
  {
    id: "1",
    title: "Reparație instalație electrică",
    category: "Electrician",
    city: "București",
    budget: "300–500 lei",
    deadline: "30 apr",
    description:
      "Tablou electric defect, scurtcircuite în apartament vechi. Caut electrician serios.",
    applicants: 3,
  },
  {
    id: "2",
    title: "Zugrăvit living și dormitor",
    category: "Zugrav",
    city: "București",
    budget: "1000–1500 lei",
    deadline: "15 mai",
    description:
      "Două camere, fiecare ~18mp. Prepar pereții, inclus chit și glet dacă e nevoie.",
    applicants: 5,
  },
  {
    id: "3",
    title: "Montaj gresie și faianță baie",
    category: "Instalator",
    city: "Cluj-Napoca",
    budget: "800–1200 lei",
    deadline: "20 mai",
    description: "Baie 6mp, gresie și faianță furnizate de client. Montaj curat, rost uniform.",
    applicants: 2,
  },
  {
    id: "4",
    title: "Instalare aer condiționat",
    category: "Electrician",
    city: "Constanța",
    budget: "400–600 lei",
    deadline: "10 mai",
    description:
      "Un split de 9000BTU. Necesită găurire perete și racordare electrică.",
    applicants: 4,
  },
];

const categories = ["Toate", "Electrician", "Instalator", "Zugrav", "Dulgher", "Curățenie", "Mutări"];

export default function JobsPage() {
  return (
    <DashboardLayout role="muncitor" activeHref="/lucrari" userName="Alex Popescu">
      <div className="space-y-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-950">Lucrări disponibile</h1>
          <p className="mt-1 text-sm text-slate-600">Caută cereri recente și aplică rapid.</p>
        </div>

        <div className="rounded-[2rem] bg-white p-4 shadow-sm">
          <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
            <input
              type="text"
              placeholder="Caută după titlu sau meserie"
              className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Oraș"
              className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-blue-500"
            />
            <button className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
              Caută
            </button>
          </div>
          <div className="-mx-1 mt-3 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                  cat === "Toate"
                    ? "bg-blue-600 text-white"
                    : "border border-slate-200 text-slate-600 hover:border-blue-200 hover:text-blue-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {jobs.map((job) => (
            <div key={job.id} className="rounded-[2rem] bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-700">
                      {job.category}
                    </span>
                    <span className="text-xs text-slate-500">
                      {job.city} • Termen: {job.deadline}
                    </span>
                  </div>
                  <h3 className="mt-2 text-base font-bold text-slate-950">{job.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{job.description}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-sm font-bold text-slate-950">{job.budget}</p>
                  <p className="mt-0.5 text-xs text-slate-500">{job.applicants} aplicanți</p>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Link
                  href={`/lucrari/${job.id}`}
                  className="flex-1 rounded-2xl border border-slate-200 px-4 py-2.5 text-center text-sm font-semibold text-slate-800 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                >
                  Detalii
                </Link>
                <button className="flex-1 rounded-2xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700">
                  Aplică rapid
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
