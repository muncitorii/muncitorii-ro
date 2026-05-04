import Link from "next/link";
import { DashboardLayout } from "@/components/dashboard-layout";
import { StatCard } from "@/components/ui/stat-card";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const applications = [
  {
    id: "1",
    title: "Reparație instalație electrică",
    city: "București",
    budget: "300–500 lei",
    status: "în așteptare" as const,
  },
  {
    id: "4",
    title: "Instalare aer condiționat",
    city: "Constanța",
    budget: "400–600 lei",
    status: "acceptat" as const,
  },
];

export default function WorkerDashboardPage() {
  return (
    <DashboardLayout role="muncitor" activeHref="/dashboard/muncitor" userName="Alex Popescu">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatCard value="2" label="Aplicații trimise" />
          <StatCard value="1" label="Acceptate" />
          <StatCard value="1" label="Conversații" />
          <StatCard value="12" label="Recenzii" />
        </div>

        {/* Profile completion */}
        <div className="rounded-3xl bg-primary-900 px-6 py-5 text-white">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-semibold">Profilul tău e complet 80%</p>
              <p className="mt-1 text-sm text-primary-200">
                Adaugă o descriere și poze din portofoliu pentru mai multă vizibilitate.
              </p>
            </div>
            <Link
              href="/dashboard/muncitor/profil"
              className="shrink-0 rounded-full border border-white/30 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Completează
            </Link>
          </div>
          <div className="mt-4 h-2 rounded-full bg-primary-800">
            <div className="h-2 w-4/5 rounded-full bg-white/80" />
          </div>
        </div>

        {/* Applications */}
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

          {applications.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-slate-200 p-8 text-center">
              <p className="font-semibold text-slate-950">Nicio aplicație trimisă</p>
              <p className="mt-1 text-sm text-slate-500">Caută lucrări disponibile și aplică rapid.</p>
              <Link
                href="/lucrari"
                className="mt-4 inline-flex rounded-full bg-primary-900 px-4 py-2 text-sm font-semibold text-white transition-all duration-200 ease-out hover:bg-primary-700"
              >
                Caută lucrări
              </Link>
            </div>
          ) : (
            <div className="mt-5 space-y-3">
              {applications.map((app) => (
                <Link
                  key={app.id}
                  href={`/lucrari/${app.id}`}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 p-4 transition-all duration-200 ease-out hover:border-primary-500/30 hover:bg-primary-50/40"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-slate-950">{app.title}</p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      {app.city} · {app.budget}
                    </p>
                  </div>
                  <Badge
                    variant={
                      app.status === "acceptat"
                        ? "success"
                        : app.status === "în așteptare"
                          ? "pending"
                          : "default"
                    }
                    dot
                  >
                    {app.status}
                  </Badge>
                </Link>
              ))}
            </div>
          )}
        </Card>

        {/* Quick actions */}
        <div className="grid gap-3 md:grid-cols-2">
          <Link
            href="/lucrari"
            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-card transition-all duration-200 ease-out hover:border-primary-500/30 hover:bg-primary-50/40"
          >
            <p className="font-semibold text-slate-950">Lucrări disponibile</p>
            <p className="mt-1 text-sm text-slate-500">Răsfoiește cereri recente și aplică rapid.</p>
          </Link>
          <Link
            href="/dashboard/muncitor/profil"
            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-card transition-all duration-200 ease-out hover:border-primary-500/30 hover:bg-primary-50/40"
          >
            <p className="font-semibold text-slate-950">Editează profilul</p>
            <p className="mt-1 text-sm text-slate-500">Adaugă poze, descriere și disponibilitate.</p>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
