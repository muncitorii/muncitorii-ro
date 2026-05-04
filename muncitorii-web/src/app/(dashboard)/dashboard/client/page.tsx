import Link from "next/link";
import { DashboardLayout } from "@/components/dashboard-layout";
import { StatCard } from "@/components/ui/stat-card";
import { Card } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";

export default async function ClientDashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const fullName =
    (user?.user_metadata?.full_name as string | undefined) ??
    user?.email?.split("@")[0] ??
    "Utilizator";

  return (
    <DashboardLayout role="client" activeHref="/dashboard/client" userName={fullName}>
      <div className="space-y-6">
        {/* Welcome */}
        <div className="rounded-3xl bg-gradient-to-br from-primary-900 to-primary-950 px-6 py-7 text-white md:px-8 md:py-9">
          <p className="text-sm font-medium text-white/60">Bine ai venit,</p>
          <h1 className="mt-1 text-2xl font-bold tracking-[-0.015em] md:text-3xl">{fullName}</h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/75 md:text-base">
            Postează prima ta lucrare și primește oferte de la meseriași verificați din zona ta.
          </p>
          <Link
            href="/lucrari/nou"
            className="mt-5 inline-flex rounded-full bg-accent-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-800"
          >
            + Postează o lucrare
          </Link>
        </div>

        {/* Stats — toate la 0 până când userul are activitate */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatCard value="0" label="Lucrări active" />
          <StatCard value="0" label="Oferte primite" />
          <StatCard value="0" label="Conversații" />
          <StatCard value="0" label="Lucrări finalizate" />
        </div>

        {/* Empty state pentru lucrări */}
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
