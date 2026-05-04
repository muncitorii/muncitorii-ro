import Link from "next/link";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { categories, getCategoryBySlug } from "@/lib/categories";
import { createClient } from "@/lib/supabase/server";

type SearchParams = Promise<{ cat?: string; oras?: string }>;

type JobRow = {
  id: string;
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

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `acum ${minutes || 1} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `acum ${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `acum ${days} zile`;
  return new Date(iso).toLocaleDateString("ro-RO", { day: "numeric", month: "short" });
}

export const dynamic = "force-dynamic";

export default async function JobsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { cat, oras } = await searchParams;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const fullName =
    (user?.user_metadata?.full_name as string | undefined) ??
    user?.email?.split("@")[0] ??
    "Utilizator";

  // Pre-fill cu meseria userului dacă nu e cat în URL
  const userTradeSlug = user?.user_metadata?.trade_slug as string | undefined;
  const effectiveCat = cat || userTradeSlug;

  let query = supabase
    .from("jobs")
    .select(
      "id, title, description, category, city, county, budget_min, budget_max, status, created_at",
    )
    .eq("status", "deschis")
    .order("created_at", { ascending: false })
    .limit(50);

  if (effectiveCat) query = query.eq("category", effectiveCat);
  if (oras) query = query.or(`city.ilike.%${oras}%,county.ilike.%${oras}%`);

  const { data: rows } = await query;
  const jobs = (rows as JobRow[] | null) ?? [];

  return (
    <DashboardLayout role="muncitor" activeHref="/lucrari" userName={fullName}>
      <div className="space-y-5">
        <div>
          <h1 className="text-2xl font-bold tracking-[-0.02em] text-slate-950">Lucrări disponibile</h1>
          <p className="mt-1 text-sm text-slate-600">
            {effectiveCat
              ? `Lucrări în ${getCategoryBySlug(effectiveCat)?.name ?? effectiveCat}`
              : "Vezi cereri noi și aplică rapid la ce ți se potrivește."}
          </p>
        </div>

        <Card variant="flat" className="p-4 md:p-4">
          <form method="GET" action="/lucrari" className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
            <select
              name="cat"
              defaultValue={cat ?? ""}
              className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-primary-700 focus:ring-2 focus:ring-primary-700/15"
            >
              <option value="">Toate categoriile</option>
              {categories.map(({ slug, name }) => (
                <option key={slug} value={slug}>
                  {name}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="oras"
              defaultValue={oras ?? ""}
              placeholder="Oraș sau județ"
              className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-primary-700 focus:ring-2 focus:ring-primary-700/15"
            />
            <button
              type="submit"
              className="rounded-2xl bg-primary-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-700"
            >
              Caută
            </button>
          </form>
        </Card>

        {jobs.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-card">
            <p className="font-semibold text-slate-950">
              {effectiveCat || oras
                ? "Nicio lucrare găsită cu aceste filtre"
                : "Nicio lucrare disponibilă momentan"}
            </p>
            <p className="mt-1 text-sm text-slate-500">
              {effectiveCat || oras
                ? "Schimbă filtrele sau revino mai târziu."
                : "Lucrările noi apar aici imediat ce sunt postate."}
            </p>
            {(effectiveCat || oras) && (
              <Link
                href="/lucrari"
                className="mt-4 inline-flex rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Resetează filtrele
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {jobs.map((job) => {
              const cat = getCategoryBySlug(job.category);
              return (
                <div key={job.id} className="rounded-3xl bg-white p-5 shadow-card">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="default" className="bg-primary-50 text-primary-900">
                          {cat?.name ?? job.category}
                        </Badge>
                        <span className="text-xs text-slate-500">
                          {job.city} · {job.county}
                        </span>
                        <span className="text-xs text-slate-400">· {timeAgo(job.created_at)}</span>
                      </div>
                      <h3 className="mt-2 text-base font-bold text-slate-950">{job.title}</h3>
                      {job.description && (
                        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-slate-600">
                          {job.description}
                        </p>
                      )}
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-sm font-bold text-slate-950">
                        {formatBudget(job.budget_min, job.budget_max)}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Link
                      href={`/lucrari/${job.id}`}
                      className="flex-1 rounded-2xl border border-slate-200 px-4 py-2.5 text-center text-sm font-semibold text-slate-800 transition hover:border-primary-500/30 hover:bg-primary-50 hover:text-primary-900"
                    >
                      Vezi detalii
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
