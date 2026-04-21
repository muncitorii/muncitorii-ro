import Link from "next/link";
import { DashboardLayout } from "@/components/dashboard-layout";

type Job = {
  title: string;
  category: string;
  city: string;
  budget: string;
  deadline: string;
  details: string;
  postedBy: string;
  postedAt: string;
};

const jobs: Record<string, Job> = {
  "1": {
    title: "Reparație instalație electrică",
    category: "Electrician",
    city: "București",
    budget: "300–500 lei",
    deadline: "30 apr 2026",
    details:
      "Apartament 3 camere, bloc vechi, tablou electric din anii '80. Am identificat 2-3 prize care nu mai funcționează și un siguranță care sare frecvent. Caut un electrician serios care să verifice toată instalația și să facă ce e necesar.",
    postedBy: "Andreea M.",
    postedAt: "18 apr 2026",
  },
  "2": {
    title: "Zugrăvit living și dormitor",
    category: "Zugrav",
    city: "București",
    budget: "1000–1500 lei",
    deadline: "15 mai 2026",
    details:
      "Living 20mp și dormitor 16mp. Pereții au deja tapetul scos. Se lucrează cu vopsea lavabilă pe care o furnizez eu. Caut un zugrav experimentat care lucrează curat și respectă programul.",
    postedBy: "Mihai C.",
    postedAt: "17 apr 2026",
  },
  "3": {
    title: "Montaj gresie și faianță baie",
    category: "Instalator",
    city: "Cluj-Napoca",
    budget: "800–1200 lei",
    deadline: "20 mai 2026",
    details:
      "Baie 6mp, gresie și faianță furnizate de client. Montaj curat cu rost uniform de 2mm. Caut un faianțar cu experiență și referințe.",
    postedBy: "Raluca S.",
    postedAt: "16 apr 2026",
  },
  "4": {
    title: "Instalare aer condiționat",
    category: "Electrician",
    city: "Constanța",
    budget: "400–600 lei",
    deadline: "10 mai 2026",
    details:
      "Un split de 9000BTU deja achiziționat. Necesită găurire perete exterior și racordare electrică. Apartament la etaj 3.",
    postedBy: "Dan P.",
    postedAt: "19 apr 2026",
  },
};

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const job = jobs[id];

  if (!job) {
    return (
      <DashboardLayout role="muncitor" activeHref="/lucrari" userName="Alex Popescu">
        <div className="rounded-[2rem] bg-white p-8 text-center shadow-sm">
          <p className="text-slate-600">Lucrarea nu a fost găsită.</p>
          <Link
            href="/lucrari"
            className="mt-4 inline-block text-sm font-semibold text-blue-700 hover:text-blue-800"
          >
            ← Înapoi la lucrări
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="muncitor" activeHref="/lucrari" userName="Alex Popescu">
      <div className="space-y-5">
        <Link
          href="/lucrari"
          className="inline-flex text-sm font-semibold text-blue-700 hover:text-blue-800"
        >
          ← Înapoi la lucrări
        </Link>

        <div className="grid gap-5 md:grid-cols-[1fr_300px]">
          <div className="rounded-[2rem] bg-white p-6 shadow-sm md:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-700">
                {job.category}
              </span>
              <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">
                Activ
              </span>
            </div>
            <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
              {job.title}
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Postat de {job.postedBy} • {job.postedAt}
            </p>

            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { label: "Buget", value: job.budget },
                { label: "Termen", value: job.deadline },
                { label: "Locație", value: job.city },
              ].map((item) => (
                <div key={item.label} className="rounded-3xl border border-slate-200 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {item.label}
                  </p>
                  <p className="mt-2 font-semibold text-slate-950">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <h2 className="text-base font-bold text-slate-950">Detalii lucrare</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{job.details}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-[2rem] bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold tracking-tight text-slate-950">
                Aplică la această lucrare
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Trimite o ofertă cu prețul și disponibilitatea ta.
              </p>
              <form className="mt-5 space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Prețul tău (lei)
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: 400"
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Mesaj scurt
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Prezintă-te pe scurt și explică de ce ești potrivit..."
                    className="w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Trimite oferta
                </button>
              </form>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-5">
              <p className="text-sm font-semibold text-slate-900">Client verificat</p>
              <p className="mt-1 text-xs text-slate-500">
                {job.postedBy} • Activ pe platformă din 2026
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
