import Link from "next/link";
import { DashboardLayout } from "@/components/dashboard-layout";
import { StatCard } from "@/components/ui/stat-card";
import { Card } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";

export default async function WorkerDashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const fullName =
    (user?.user_metadata?.full_name as string | undefined) ??
    user?.email?.split("@")[0] ??
    "Utilizator";
  const trade = (user?.user_metadata?.trade as string | undefined) ?? "Meseriaș";
  const city = (user?.user_metadata?.city as string | undefined) ?? "";

  return (
    <DashboardLayout role="muncitor" activeHref="/dashboard/muncitor" userName={fullName}>
      <div className="space-y-6">
        {/* Welcome */}
        <div className="rounded-3xl bg-gradient-to-br from-primary-900 to-primary-950 px-6 py-7 text-white md:px-8 md:py-9">
          <p className="text-sm font-medium text-white/60">Bine ai venit,</p>
          <h1 className="mt-1 text-2xl font-bold tracking-[-0.015em] md:text-3xl">{fullName}</h1>
          <p className="mt-2 text-sm text-white/70">
            {trade}{city ? ` · ${city}` : ""}
          </p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/75 md:text-base">
            Completează-ți profilul cu poze și descrieri ca să apari în căutările clienților.
          </p>
        </div>

        {/* Profil incomplete notice */}
        <div className="rounded-3xl border-2 border-amber-200 bg-amber-50/40 px-6 py-5 md:px-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-slate-950">Profilul tău nu e încă complet</p>
              <p className="mt-1 text-sm text-slate-600">
                Adaugă o descriere, poze cu lucrări făcute și disponibilitatea ta.
              </p>
            </div>
            <Link
              href="/dashboard/muncitor/profil"
              className="shrink-0 rounded-full bg-primary-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-700"
            >
              Completează
            </Link>
          </div>
        </div>

        {/* Stats — toate la 0 pentru cont nou */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatCard value="0" label="Aplicații trimise" />
          <StatCard value="0" label="Acceptate" />
          <StatCard value="0" label="Conversații" />
          <StatCard value="0" label="Recenzii" />
        </div>

        {/* Empty state aplicații */}
        <Card>
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-bold tracking-[-0.015em] text-slate-950">Aplicațiile mele</h2>
            <Link
              href="/lucrari"
              className="text-sm font-semibold text-primary-900 hover:text-primary-700"
            >
              Caută lucrări
            </Link>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 p-8 text-center">
            <p className="font-semibold text-slate-950">Nicio aplicație trimisă</p>
            <p className="mt-1 text-sm text-slate-500">Răsfoiește lucrări disponibile și aplică rapid.</p>
            <Link
              href="/lucrari"
              className="mt-4 inline-flex rounded-full bg-primary-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-700"
            >
              Caută lucrări
            </Link>
          </div>
        </Card>

        {/* Quick actions */}
        <div className="grid gap-3 md:grid-cols-2">
          <Link
            href="/lucrari"
            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-card transition hover:border-primary-500/30 hover:bg-primary-50/40"
          >
            <p className="font-semibold text-slate-950">Lucrări disponibile</p>
            <p className="mt-1 text-sm text-slate-500">Răsfoiește cereri recente și aplică rapid.</p>
          </Link>
          <Link
            href="/dashboard/muncitor/profil"
            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-card transition hover:border-primary-500/30 hover:bg-primary-50/40"
          >
            <p className="font-semibold text-slate-950">Editează profilul</p>
            <p className="mt-1 text-sm text-slate-500">Adaugă bio, telefon, tarif, disponibilitate.</p>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
