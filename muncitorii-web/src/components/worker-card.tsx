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
    <div className="rounded-[2rem] bg-white p-5 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-xl font-bold text-blue-700">
          {name.charAt(0)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <p className="truncate font-semibold text-slate-950">{name}</p>
            <span className="shrink-0 rounded-full bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-700">
              ⭐ {rating}
            </span>
          </div>
          <p className="text-sm text-slate-600">
            {trade} • {city}
          </p>
          {badge && (
            <span className="mt-2 inline-flex rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
              {badge}
            </span>
          )}
          {description && (
            <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
          )}
        </div>
      </div>
      <Link
        href={`/muncitori/${slug}`}
        className="mt-5 flex w-full items-center justify-center rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-800 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
      >
        Vezi profil
      </Link>
    </div>
  );
}
