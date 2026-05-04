import Link from "next/link";
import { DashboardLayout } from "@/components/dashboard-layout";
import { StatCard } from "@/components/ui/stat-card";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const jobs = [
  {
    id: "1",
    title: "Reparație instalație electrică",
    status: "activ" as const,
    applicants: 3,
    city: "București",
    deadline: "30 apr",
  },
  {
    id: "2",
    title: "Zugrăvit living și dormitor",
    status: "activ" as const,
    applicants: 5,
    city: "București",
    deadline: "15 mai",
  },
  {
    id: "3",
    title: "Montaj gresie baie",
    status: "finalizat" as const,
    applicants: 2,
    city: "București",
    deadline: "Finalizat",
  },
];

export default function ClientDashboardPage() {
  return (
    <DashboardLayout role="client" activeHref="/dashboard/client" userName="Andreea">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatCard value="2" label="Lucrări active" />
          <StatCard value="8" label="Oferte primite" />
          <StatCard value="3" label="Conversații" />
          <StatCard value="1" label="Lucrări finalizate" />
        </div>

        {/* Jobs list */}
        <Card>
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-bold tracking-[-0.015em] text-slate-950">Lucrările mele</h2>
            <Link
              href="/lucrari/nou"
              className="rounded-full bg-primary-900 px-4 py-2 text-sm font-semibold text-white transition-all duration-200 ease-out hover:bg-primary-700"
            >
              + Lucrare nouă
            </Link>
          </div>

          {jobs.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-slate-200 p-8 text-center">
              <p className="font-semibold text-slate-950">Nicio lucrare postată</p>
              <p className="mt-1 text-sm text-slate-500">Postează prima ta lucrare și primește oferte.</p>
              <Link
                href="/lucrari/nou"
                className="mt-4 inline-flex rounded-full bg-primary-900 px-4 py-2 text-sm font-semibold text-white transition-all duration-200 ease-out hover:bg-primary-700"
              >
                Postează acum
              </Link>
            </div>
          ) : (
            <div className="mt-5 space-y-3">
              {jobs.map((job) => (
                <Link
                  key={job.id}
                  href={`/lucrari/${job.id}`}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 p-4 transition-all duration-200 ease-out hover:border-primary-500/30 hover:bg-primary-50/40"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-slate-950">{job.title}</p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      {job.city} · {job.deadline}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    {job.status === "activ" && job.applicants > 0 && (
                      <Badge variant="default" className="bg-primary-50 text-primary-900">
                        {job.applicants} oferte
                      </Badge>
                    )}
                    <Badge
                      variant={job.status === "activ" ? "success" : "default"}
                      dot={job.status === "activ"}
                    >
                      {job.status}
                    </Badge>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Card>

        {/* Quick actions */}
        <div className="grid gap-3 md:grid-cols-2">
          <Link
            href="/lucrari/nou"
            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-card transition-all duration-200 ease-out hover:border-primary-500/30 hover:bg-primary-50/40"
          >
            <p className="font-semibold text-slate-950">Postează o lucrare nouă</p>
            <p className="mt-1 text-sm text-slate-500">
              Publică o cerere și primește oferte de la meseriași.
            </p>
          </Link>
          <Link
            href="/muncitori"
            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-card transition-all duration-200 ease-out hover:border-primary-500/30 hover:bg-primary-50/40"
          >
            <p className="font-semibold text-slate-950">Caută muncitori</p>
            <p className="mt-1 text-sm text-slate-500">Răsfoiește profiluri și contactează direct.</p>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
