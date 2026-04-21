import Link from "next/link";
import { DashboardLayout } from "@/components/dashboard-layout";

const applications = [
  {
    id: "1",
    title: "Reparație instalație electrică",
    city: "București",
    budget: "300–500 lei",
    status: "în așteptare",
  },
  {
    id: "4",
    title: "Instalare aer condiționat",
    city: "Constanța",
    budget: "400–600 lei",
    status: "acceptat",
  },
];

const statusColors: Record<string, string> = {
  "în așteptare": "bg-amber-100 text-amber-700",
  acceptat: "bg-green-100 text-green-700",
  respins: "bg-red-100 text-red-700",
};

export default function WorkerDashboardPage() {
  return (
    <DashboardLayout role="muncitor" activeHref="/dashboard/muncitor" userName="Alex Popescu">
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            { label: "Aplicații trimise", value: "2" },
            { label: "Acceptate", value: "1" },
            { label: "Conversații", value: "1" },
            { label: "Recenzii", value: "12" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-[2rem] bg-white p-4 text-center shadow-sm">
              <p className="text-2xl font-bold text-slate-950">{stat.value}</p>
              <p className="mt-1 text-xs text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="rounded-[2rem] bg-blue-700 px-6 py-5 text-white">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-semibold">Profilul tău e complet 80%</p>
              <p className="mt-1 text-sm text-blue-100">
                Adaugă o descriere și poze de portofoliu pentru mai multă vizibilitate.
              </p>
            </div>
            <Link
              href="/dashboard/muncitor/profil"
              className="shrink-0 rounded-full border border-white/30 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Completează
            </Link>
          </div>
          <div className="mt-4 h-2 rounded-full bg-blue-800">
            <div className="h-2 w-4/5 rounded-full bg-white/80" />
          </div>
        </div>

        <div className="rounded-[2rem] bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-bold tracking-tight text-slate-950">Aplicațiile mele</h2>
            <Link
              href="/lucrari"
              className="text-sm font-semibold text-blue-700 hover:text-blue-800"
            >
              Caută lucrări
            </Link>
          </div>

          <div className="mt-5 space-y-3">
            {applications.map((app) => (
              <Link
                key={app.id}
                href={`/lucrari/${app.id}`}
                className="flex items-center justify-between gap-4 rounded-3xl border border-slate-200 p-4 transition hover:border-blue-200 hover:bg-blue-50/40"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-slate-950">{app.title}</p>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {app.city} • {app.budget}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${statusColors[app.status]}`}
                >
                  {app.status}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <Link
            href="/lucrari"
            className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-200 hover:bg-blue-50/40"
          >
            <p className="font-semibold text-slate-950">Lucrări disponibile</p>
            <p className="mt-1 text-sm text-slate-500">Răsfoiește cereri recente și aplică rapid.</p>
          </Link>
          <Link
            href="/dashboard/muncitor/profil"
            className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-200 hover:bg-blue-50/40"
          >
            <p className="font-semibold text-slate-950">Editează profilul</p>
            <p className="mt-1 text-sm text-slate-500">
              Adaugă poze, descriere și disponibilitate.
            </p>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
