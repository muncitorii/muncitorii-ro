import type { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";
import { WorkerCard } from "@/components/worker-card";
import { categories } from "@/lib/categories";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Meseriași verificați | Muncitorii.ro",
  description:
    "Găsește meseriași verificați din România. Compară profiluri, citește recenzii și alege direct.",
};

type SearchParams = Promise<{ cat?: string; oras?: string }>;

type WorkerListRow = {
  id: string;
  slug: string;
  name: string;
  trade: string;
  trade_slug: string;
  city: string;
  county: string;
  rating: number;
  review_count: number;
  badges: string[];
  bio: string;
};

function catPillHref(slug: string | undefined, oras: string | undefined) {
  const p = new URLSearchParams();
  if (slug) p.set("cat", slug);
  if (oras) p.set("oras", oras);
  const qs = p.toString();
  return `/muncitori${qs ? `?${qs}` : ""}`;
}

export const dynamic = "force-dynamic";

export default async function WorkersPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { cat, oras } = await searchParams;

  const supabase = await createClient();

  let query = supabase
    .from("workers")
    .select("id, slug, name, trade, trade_slug, city, county, rating, review_count, badges, bio")
    .eq("is_active", true)
    .order("rating", { ascending: false })
    .order("review_count", { ascending: false });

  if (cat) {
    // Match by trade_slug exact, or by trade text contains
    query = query.or(`trade_slug.eq.${cat},trade.ilike.%${cat}%`);
  }
  if (oras) {
    query = query.or(`city.ilike.%${oras}%,county.ilike.%${oras}%`);
  }

  const { data: workers, error } = await query;
  const results = (error ? [] : (workers as WorkerListRow[] | null) ?? []) as WorkerListRow[];

  return (
    <section className="px-4 py-10 md:px-6 md:py-16">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-[-0.025em] text-slate-950 md:text-5xl">
            Meseriași verificați
          </h1>
          <p className="mt-3 text-base leading-relaxed text-slate-600 md:text-lg">
            Compară profiluri, citește recenzii și alege direct.
          </p>
        </div>

        {/* Search form */}
        <form
          method="GET"
          action="/muncitori"
          className="mt-8 rounded-3xl border border-slate-200 bg-white p-4 shadow-card"
        >
          <div className="grid gap-3 md:grid-cols-[1.1fr_1fr_auto]">
            <input
              type="text"
              name="cat"
              defaultValue={cat}
              placeholder="Meserie (ex: Electrician)"
              className="rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-primary-700 focus:ring-2 focus:ring-primary-700/20"
            />
            <input
              type="text"
              name="oras"
              defaultValue={oras}
              placeholder="Oraș sau județ"
              className="rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-primary-700 focus:ring-2 focus:ring-primary-700/20"
            />
            <button
              type="submit"
              className="rounded-2xl bg-primary-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-700"
            >
              Caută
            </button>
          </div>

          {/* Category pills — afisăm doar primele 8 + Altele */}
          <div className="mt-3 flex flex-wrap gap-2">
            <Link
              href={catPillHref(undefined, oras)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 ease-out ${
                !cat
                  ? "bg-primary-900 text-white"
                  : "border border-slate-200 text-slate-600 hover:border-primary-500/30 hover:text-primary-900"
              }`}
            >
              Toate
            </Link>
            {categories
              .filter((c) => c.showOnHomepage || c.slug === "altele")
              .map(({ slug, name }) => (
                <Link
                  key={slug}
                  href={catPillHref(slug, oras)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 ease-out ${
                    cat === slug
                      ? "bg-primary-900 text-white"
                      : "border border-slate-200 text-slate-600 hover:border-primary-500/30 hover:text-primary-900"
                  }`}
                >
                  {name}
                </Link>
              ))}
          </div>
        </form>

        {/* Results count */}
        {results.length > 0 && (
          <p className="mt-6 text-sm text-slate-500">
            <span className="font-semibold text-slate-950">{results.length}</span>{" "}
            {results.length === 1 ? "meseriaș găsit" : "meseriași găsiți"}
            {(cat || oras) && (
              <Link
                href="/muncitori"
                className="ml-3 font-semibold text-primary-900 hover:text-primary-700"
              >
                Șterge filtrele
              </Link>
            )}
          </p>
        )}

        {/* Grid */}
        {results.length > 0 ? (
          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {results.map((worker) => (
              <WorkerCard
                key={worker.slug}
                name={worker.name}
                slug={worker.slug}
                trade={worker.trade}
                city={worker.city}
                rating={Number(worker.rating).toFixed(1)}
                badge={(worker.badges as string[])?.[0]}
                description={worker.bio || undefined}
              />
            ))}
          </div>
        ) : (
          <div className="mt-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <Search size={28} />
            </div>
            <p className="font-semibold text-slate-950">
              {cat || oras ? "Niciun meseriaș găsit" : "Niciun meseriaș înregistrat încă"}
            </p>
            <p className="mt-1 text-sm text-slate-500">
              {cat || oras
                ? "Încearcă o altă meserie sau un alt oraș."
                : "Suntem la început — primii meseriași verificați apar aici curând."}
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              {(cat || oras) && (
                <Link
                  href="/muncitori"
                  className="inline-flex rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Resetează căutarea
                </Link>
              )}
              <Link
                href="/register/muncitor"
                className="inline-flex rounded-full bg-accent-700 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-800"
              >
                Ești meseriaș? Înregistrează-te
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
