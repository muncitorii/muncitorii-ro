import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ImageIcon } from "lucide-react";
import { getWorkerBySlug } from "@/lib/workers";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const worker = getWorkerBySlug(slug);
  if (!worker) return {};
  return {
    title: `${worker.name} — ${worker.trade} în ${worker.city} | Muncitorii.ro`,
    description: worker.bio,
  };
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="text-amber-400">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i}>{i < Math.round(rating) ? "★" : "☆"}</span>
      ))}
    </span>
  );
}

export default async function WorkerProfilePage({ params }: Props) {
  const { slug } = await params;
  const worker = getWorkerBySlug(slug);

  if (!worker) notFound();

  return (
    <>
      <section className="px-4 pb-24 pt-10 md:px-6 md:pb-16 md:pt-16">
        <div className="mx-auto max-w-6xl">
          {/* Hero grid */}
          <div className="grid gap-6 md:grid-cols-[1.15fr_0.85fr]">
            {/* Worker info card */}
            <div className="rounded-3xl bg-white p-6 shadow-card md:p-8">
              <div className="flex items-start gap-5">
                {/* Avatar */}
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-primary-50 text-3xl font-bold text-primary-900">
                  {worker.name.charAt(0)}
                </div>

                <div className="min-w-0 flex-1">
                  {/* Badges */}
                  <div className="flex flex-wrap gap-2">
                    {worker.badges.map((badge) => (
                      <span
                        key={badge}
                        className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700"
                      >
                        <span className="size-1.5 rounded-full bg-emerald-500" />
                        {badge}
                      </span>
                    ))}
                  </div>

                  <h1 className="mt-3 text-3xl font-bold tracking-[-0.025em] text-slate-950 md:text-4xl">
                    {worker.name}
                  </h1>

                  <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-600">
                    <span>{worker.trade}</span>
                    <span className="text-slate-300">·</span>
                    <span>{worker.city}</span>
                    <span className="text-slate-300">·</span>
                    <span className="flex items-center gap-1">
                      <Stars rating={worker.rating} />
                      <span className="font-semibold text-slate-950">
                        {worker.rating.toFixed(1)}
                      </span>
                      <span className="text-slate-400">
                        ({worker.reviewCount} recenzii)
                      </span>
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-slate-600 md:text-base">
                    {worker.bio}
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-8 grid gap-3 md:grid-cols-3">
                {[
                  { label: "Răspuns", value: worker.responseTime },
                  { label: "Experiență", value: `${worker.experienceYears}+ ani` },
                  { label: "Disponibilitate", value: worker.availability },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl border border-slate-200 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      {item.label}
                    </p>
                    <p className="mt-1.5 font-semibold text-slate-950">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact card */}
            <div className="rounded-3xl bg-white p-6 shadow-card md:p-8">
              <h2 className="text-xl font-bold tracking-[-0.015em] text-slate-950">
                Trimite cerere
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Contactează-l direct sau postează lucrarea ta pentru a primi oferte de la alți meseriași.
              </p>
              <div className="mt-5 space-y-3">
                <Link
                  href="/register"
                  className="flex w-full items-center justify-center rounded-2xl bg-primary-900 px-4 py-3 text-sm font-semibold text-white transition-all duration-200 ease-out hover:bg-primary-700"
                >
                  Trimite cerere
                </Link>
                <Link
                  href="/register"
                  className="flex w-full items-center justify-center rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-800 transition-all duration-200 ease-out hover:border-primary-500/30 hover:bg-primary-50 hover:text-primary-900"
                >
                  Postează o lucrare
                </Link>
              </div>

              <div className="mt-6 rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Tarif estimat
                </p>
                <p className="mt-1 font-semibold text-slate-950">
                  Cerere ofertă
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Prețul se stabilește după discuție și inspecție.
                </p>
              </div>
            </div>
          </div>

          {/* Portfolio + Reviews */}
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {/* Portfolio */}
            <div className="rounded-3xl bg-white p-6 shadow-card md:p-8">
              <h2 className="text-xl font-bold tracking-[-0.015em] text-slate-950">
                Lucrări din portofoliu
              </h2>
              <div className="mt-5 grid gap-4">
                {worker.portfolio.map((item) => (
                  <div key={item.id} className="rounded-2xl border border-slate-200 p-4">
                    <div className="mb-3 flex h-36 items-center justify-center rounded-xl bg-slate-50 text-slate-300">
                        <ImageIcon size={32} />
                      </div>
                    <p className="font-semibold text-slate-900">{item.title}</p>
                    <p className="mt-1 text-sm text-slate-500">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="rounded-3xl bg-white p-6 shadow-card md:p-8">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-xl font-bold tracking-[-0.015em] text-slate-950">
                  Recenzii
                </h2>
                <span className="text-sm text-slate-500">
                  {worker.reviewCount} total
                </span>
              </div>
              <div className="mt-5 space-y-4">
                {worker.reviews.map((review) => (
                  <div key={review.id} className="rounded-2xl border border-slate-200 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-slate-950">{review.authorName}</p>
                        <p className="text-xs text-slate-500">
                          {review.authorCity} · {review.date}
                        </p>
                      </div>
                      <Stars rating={review.rating} />
                    </div>
                    <p className="mt-2 text-xs text-slate-400">{review.jobTitle}</p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-700">
                      &ldquo;{review.text}&rdquo;
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky CTA — mobile only */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-slate-200 bg-white p-4 md:hidden">
        <Link
          href="/register"
          className="flex w-full items-center justify-center rounded-2xl bg-primary-900 px-4 py-3 text-sm font-semibold text-white transition-all duration-200 ease-out hover:bg-primary-700"
        >
          Trimite cerere
        </Link>
      </div>
    </>
  );
}
