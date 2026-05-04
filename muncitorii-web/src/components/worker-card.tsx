import Link from "next/link";

type WorkerCardProps = {
  name: string;
  slug: string;
  trade: string;
  city: string;
  rating: string;
  description?: string;
  badge?: string;
};

export function WorkerCard({ name, slug, trade, city, rating, description, badge }: WorkerCardProps) {
  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-card transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-slate-200 hover:shadow-card-hover">
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary-50 text-xl font-bold text-primary-900">
          {name.charAt(0)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <p className="truncate font-semibold text-slate-950">{name}</p>
            <span className="shrink-0 rounded-full border border-amber-200 bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-700">
              ★ {rating}
            </span>
          </div>
          <p className="mt-0.5 text-sm text-slate-500">
            {trade} · {city}
          </p>
          {badge && (
            <span className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              {badge}
            </span>
          )}
          {description && (
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{description}</p>
          )}
        </div>
      </div>
      <Link
        href={`/muncitori/${slug}`}
        className="mt-5 flex w-full items-center justify-center rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-800 transition-all duration-200 ease-out hover:border-primary-500/30 hover:bg-primary-50 hover:text-primary-900"
      >
        Vezi profil
      </Link>
    </div>
  );
}
