import Link from "next/link";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

type JobRow = {
  id: string;
  title: string;
  city: string;
  county: string;
  status: string;
  created_at: string;
};

export const dynamic = "force-dynamic";

export default async function ClientDashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const fullName =
    (user.user_metadata?.full_name as string | undefined) ??
    user.email?.split("@")[0] ??
    "Utilizator";

  const { data: rows } = await supabase
    .from("jobs")
    .select("id, title, city, county, status, created_at")
    .eq("client_id", user.id)
    .order("created_at", { ascending: false })
    .limit(20);

  const jobs = (rows as JobRow[] | null) ?? [];
  const activeCount = jobs.filter((j) => j.status === "deschis").length;
  const finishedCount = jobs.filter((j) => j.status === "finalizat").length;

  return (
    <DashboardLayout role="client" activeHref="/dashboard/client" userName={fullName}>
      <div className="space-y-6">
        {/* Welcome */}
        <div className="rounded-3xl bg-gradient-to-br from-primary-900 to-primary-950 px-6 py-7 text-white md:px-8 md:py-9">
          <p className="text-sm font-medium text-white/60">Bine ai venit,</p>
          <h1 className="mt-1 text-2xl font-bold tracking-[-0.015em] md:text-3xl">{fullName}</h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/75 md:text-base">
            {jobs.length === 0
              ? "Postează prima ta lucrare și primește oferte de la meseriași verificați din zona ta."
              : `Ai ${jobs.length} ${jobs.length === 1 ? "lucrare" : "lucrări"} în total.`}
          </p>
          <Link
            href="/lucrari/nou"
            className="mt-5 inline-flex rounded-full bg-accent-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-800"
          >
            + Postează o lucrare
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatBox value={String(activeCount)} label="Lucrări active" />
          <StatBox value={String(jobs.length)} label="Total postate" />
          <StatBox value="0" label="Conversații" />
          <StatBox value={String(finishedCount)} label="Finalizate" />
        </div>

        {/* Jobs list */}
        <Card>
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-bold tracking-[-0.015em] text-slate-950">Lucrările mele</h2>
            <Link
              href="/lucrari/nou"
              className="rounded-full bg-primary-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-700"
            >
              + Lucrare nouă
            </Link>
          </div>

          {jobs.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-slate-200 p-8 text-center">
              <p className="font-semibold text-slate-950">Nicio lucrare postată încă</p>
              <p className="mt-1 text-sm text-slate-500">
                Postează prima ta lucrare și primește oferte în câteva ore.
              </p>
              <Link
                href="/lucrari/nou"
                className="mt-4 inline-flex rounded-full bg-primary-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-700"
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
                  className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 p-4 transition hover:border-primary-500/30 hover:bg-primary-50/40"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-slate-950">{job.title}</p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      {job.city} ·{" "}
                      {new Date(job.created_at).toLocaleDateString("ro-RO", {
                        day: "numeric",
                        month: "short",
                      })}
                    </p>
                  </div>
                  <Badge
                    variant={job.status === "deschis" ? "success" : "default"}
                    dot={job.status === "deschis"}
                  >
                    {job.status}
                  </Badge>
                </Link>
              ))}
            </div>
          )}
        </Card>

        {/* Quick actions */}
        <div className="grid gap-3 md:grid-cols-2">
          <Link
            href="/lucrari/nou"
            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-card transition hover:border-primary-500/30 hover:bg-primary-50/40"
          >
            <p className="font-semibold text-slate-950">Postează o lucrare nouă</p>
            <p className="mt-1 text-sm text-slate-500">
              Publică o cerere și primește oferte de la meseriași.
            </p>
          </Link>
          <Link
            href="/muncitori"
            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-card transition hover:border-primary-500/30 hover:bg-primary-50/40"
          >
            <p className="font-semibold text-slate-950">Caută meseriași</p>
            <p className="mt-1 text-sm text-slate-500">Răsfoiește profiluri și contactează direct.</p>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}

function StatBox({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-card">
      <p className="text-3xl font-bold tracking-[-0.025em] text-slate-950">{value}</p>
      <p className="mt-1 text-xs font-medium text-slate-500">{label}</p>
    </div>
  );
}
