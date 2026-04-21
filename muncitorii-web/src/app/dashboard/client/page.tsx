import Link from "next/link";
import { DashboardLayout } from "@/components/dashboard-layout";

const jobs = [
  {
    id: "1",
    title: "Reparație instalație electrică",
    status: "activ",
    applicants: 3,
    city: "București",
    deadline: "30 apr",
  },
  {
    id: "2",
    title: "Zugrăvit living și dormitor",
    status: "activ",
    applicants: 5,
    city: "București",
    deadline: "15 mai",
  },
  {
    id: "3",
    title: "Montaj gresie baie",
    status: "finalizat",
    applicants: 2,
    city: "București",
    deadline: "Finalizat",
  },
];

const statusColors: Record<string, string> = {
  activ: "bg-green-100 text-green-700",
  finalizat: "bg-slate-100 text-slate-600",
  anulat: "bg-red-100 text-red-700",
};

export default function ClientDashboardPage() {
  return (
    <DashboardLayout role="client" activeHref="/dashboard/client" userName="Andreea">
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            { label: "Lucrări active", value: "2" },
            { label: "Oferte primite", value: "8" },
            { label: "Conversații", value: "3" },
            { label: "Lucrări finalizate", value: "1" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-[2rem] bg-white p-4 text-center shadow-sm">
              <p className="text-2xl font-bold text-slate-950">{stat.value}</p>
              <p className="mt-1 text-xs text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="rounded-[2rem] bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-bold tracking-tight text-slate-950">Lucrările mele</h2>
            <Link
              href="/lucrari/nou"
              className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              + Lucrare nouă
            </Link>
          </div>

          <div className="mt-5 space-y-3">
            {jobs.map((job) => (
              <Link
                key={job.id}
                href={`/lucrari/${job.id}`}
                className="flex items-center justify-between gap-4 rounded-3xl border border-slate-200 p-4 transition hover:border-blue-200 hover:bg-blue-50/40"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-slate-950">{job.title}</p>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {job.city} • {job.deadline}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  {job.status === "activ" && job.applicants > 0 && (
                    <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-700">
                      {job.applicants} oferte
                    </span>
                  )}
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusColors[job.status]}`}
                  >
                    {job.status}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <Link
            href="/lucrari/nou"
            className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-200 hover:bg-blue-50/40"
          >
            <p className="font-semibold text-slate-950">Postează o lucrare nouă</p>
            <p className="mt-1 text-sm text-slate-500">
              Publică o cerere și primește oferte de la muncitori.
            </p>
          </Link>
          <Link
            href="/muncitori"
            className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-200 hover:bg-blue-50/40"
          >
            <p className="font-semibold text-slate-950">Caută muncitori</p>
            <p className="mt-1 text-sm text-slate-500">
              Răsfoiește profile și contactează direct.
            </p>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
