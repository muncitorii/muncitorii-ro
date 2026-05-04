import Link from "next/link";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { jobs } from "@/lib/jobs";
import { categories } from "@/lib/categories";
import { createClient } from "@/lib/supabase/server";

export default async function JobsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const fullName =
    (user?.user_metadata?.full_name as string | undefined) ??
    user?.email?.split("@")[0] ??
    "Utilizator";

  return (
    <DashboardLayout role="muncitor" activeHref="/lucrari" userName={fullName}>
      <div className="space-y-5">
        <div>
          <h1 className="text-2xl font-bold tracking-[-0.02em] text-slate-950">Lucrări disponibile</h1>
          <p className="mt-1 text-sm text-slate-600">
            Vezi cereri noi și aplică rapid la ce ți se potrivește.
          </p>
        </div>

        {/* Search + filters */}
        <Card variant="flat" className="p-4 md:p-4">
          <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
            <input
              type="text"
              placeholder="Caută după titlu sau meserie"
              className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
            />
            <input
              type="text"
              placeholder="Oraș"
              className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
            />
            <button className="rounded-2xl bg-primary-900 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 ease-out hover:bg-primary-700">
              Caută
            </button>
          </div>
          <div className="-mx-1 mt-3 flex flex-wrap gap-2">
            <button className="rounded-full bg-primary-900 px-3 py-1.5 text-xs font-medium text-white">
              Toate
            </button>
            {categories.slice(0, 5).map(({ slug, name }) => (
              <button
                key={slug}
                className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition-all duration-200 ease-out hover:border-primary-500/30 hover:text-primary-900"
              >
                {name}
              </button>
            ))}
          </div>
        </Card>

        {/* Jobs list */}
        {jobs.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-card">
            <p className="font-semibold text-slate-950">Nicio lucrare disponibilă momentan</p>
            <p className="mt-1 text-sm text-slate-500">Revino mai târziu sau activează notificările.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {jobs.map((job) => (
              <div key={job.id} className="rounded-3xl bg-white p-5 shadow-card">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="default" className="bg-primary-50 text-primary-900">
                        {job.category}
                      </Badge>
                      <span className="text-xs text-slate-500">
                        {job.city} · Până la {job.deadline}
                      </span>
                      {job.urgency === "ridicată" && (
                        <Badge variant="accent">Urgent</Badge>
                      )}
                    </div>
                    <h3 className="mt-2 text-base font-bold text-slate-950">{job.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{job.description}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-sm font-bold text-slate-950">{job.budget}</p>
                    <p className="mt-0.5 text-xs text-slate-500">{job.applicants} aplicanți</p>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Link
                    href={`/lucrari/${job.id}`}
                    className="flex-1 rounded-2xl border border-slate-200 px-4 py-2.5 text-center text-sm font-semibold text-slate-800 transition-all duration-200 ease-out hover:border-primary-500/30 hover:bg-primary-50 hover:text-primary-900"
                  >
                    Detalii
                  </Link>
                  <button className="flex-1 rounded-2xl bg-primary-900 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 ease-out hover:bg-primary-700">
                    Aplică rapid
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
