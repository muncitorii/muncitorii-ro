import Link from "next/link";
import { notFound } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getCategoryBySlug } from "@/lib/categories";
import { createClient } from "@/lib/supabase/server";

type JobRow = {
  id: string;
  client_id: string;
  title: string;
  description: string;
  category: string;
  city: string;
  county: string;
  budget_min: number | null;
  budget_max: number | null;
  status: string;
  created_at: string;
};

function formatBudget(min: number | null, max: number | null) {
  if (min && max) return `${min}–${max} lei`;
  if (min) return `de la ${min} lei`;
  if (max) return `până la ${max} lei`;
  return "Buget de discutat";
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data } = await supabase
    .from("jobs")
    .select(
      "id, client_id, title, description, category, city, county, budget_min, budget_max, status, created_at",
    )
    .eq("id", id)
    .maybeSingle();

  const job = data as JobRow | null;
  if (!job) notFound();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const fullName =
    (user?.user_metadata?.full_name as string | undefined) ??
    user?.email?.split("@")[0] ??
    "Utilizator";
  const role = (user?.user_metadata?.role as string | undefined) ?? "client";

  const cat = getCategoryBySlug(job.category);
  const isOwnJob = user?.id === job.client_id;

  return (
    <DashboardLayout
      role={role === "worker" ? "muncitor" : "client"}
      activeHref={role === "worker" ? "/lucrari" : "/dashboard/client"}
      userName={fullName}
    >
      <div className="space-y-5">
        <Link
          href={role === "worker" ? "/lucrari" : "/dashboard/client"}
          className="inline-flex text-sm font-semibold text-primary-900 hover:text-primary-700"
        >
          ← Înapoi
        </Link>

        <Card>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="default" className="bg-primary-50 text-primary-900">
              {cat?.name ?? job.category}
            </Badge>
            <Badge variant={job.status === "deschis" ? "success" : "default"} dot>
              {job.status}
            </Badge>
          </div>
          <h1 className="mt-3 text-3xl font-bold tracking-[-0.025em] text-slate-950">
            {job.title}
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            {job.city} · {job.county} ·{" "}
            {new Date(job.created_at).toLocaleDateString("ro-RO", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>

          {job.description && (
            <div className="mt-6">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Descriere
              </h2>
              <p className="mt-2 whitespace-pre-line text-base leading-relaxed text-slate-700">
                {job.description}
              </p>
            </div>
          )}

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Buget
              </p>
              <p className="mt-1 font-semibold text-slate-950">
                {formatBudget(job.budget_min, job.budget_max)}
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Locație
              </p>
              <p className="mt-1 font-semibold text-slate-950">
                {job.city}, {job.county}
              </p>
            </div>
          </div>

          {!isOwnJob && role === "worker" && (
            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center">
              <p className="text-sm font-semibold text-slate-950">
                Aplicarea online va fi disponibilă curând.
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Pentru moment contactează clientul prin platformă după ce e activă funcția.
              </p>
            </div>
          )}

          {isOwnJob && (
            <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
              <p className="text-sm font-semibold text-emerald-800">Aceasta e lucrarea ta</p>
              <p className="mt-1 text-xs text-emerald-700">
                Meseriașii potriviți o văd în lista lor de cereri.
              </p>
            </div>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
}
