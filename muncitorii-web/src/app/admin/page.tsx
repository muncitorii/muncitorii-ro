import Link from "next/link";
import { listJobsForAdmin } from "@/lib/coordonare/data";
import { getJobTypeLabel } from "@/lib/job-types";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export const dynamic = "force-dynamic";

const statusLabel: Record<string, string> = {
  intake: "Cerere primită",
  evaluare: "În evaluare",
  oferte: "Oferte în comparare",
  in_lucru: "În lucru",
  finalizat: "Finalizat",
};

export default async function AdminJobsPage() {
  const { jobs, seed } = await listJobsForAdmin();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-[-0.02em] text-slate-950">Lucrări</h1>
        <p className="mt-1 text-sm text-slate-600">
          {jobs.length} {jobs.length === 1 ? "lucrare" : "lucrări"} în total.
        </p>
      </div>

      {seed && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">
          SUPABASE_SERVICE_ROLE_KEY nu e configurat — se afișează date demo (seed), nu date reale.
          Vezi README-COORDONARE.md.
        </div>
      )}

      <Card>
        {jobs.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 p-8 text-center">
            <p className="font-semibold text-slate-950">Nicio cerere încă</p>
            <p className="mt-1 text-sm text-slate-500">
              Cererile trimise prin /cerere vor apărea aici.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {jobs.map((job) => {
              const brief = job.brief as { work_type?: string; description?: string };
              return (
                <Link
                  key={job.id}
                  href={`/admin/lucrari/${job.id}`}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 p-4 transition hover:border-primary-500/30 hover:bg-primary-50/40"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-slate-950">
                      {getJobTypeLabel(brief.work_type)} — {job.client?.full_name ?? "client necunoscut"}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      {job.city ?? "—"} ·{" "}
                      {new Date(job.created_at).toLocaleDateString("ro-RO", {
                        day: "numeric",
                        month: "short",
                      })}
                    </p>
                  </div>
                  <Badge variant={job.status === "finalizat" ? "success" : "default"} dot>
                    {statusLabel[job.status] ?? job.status}
                  </Badge>
                </Link>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
}
