import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ImageIcon } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

type Props = { params: Promise<{ slug: string }> };

type WorkerRow = {
  id: string;
  slug: string;
  name: string;
  trade: string;
  trade_slug: string;
  city: string;
  county: string;
  rating: number;
  review_count: number;
  experience_years: number;
  response_time: string;
  availability: string;
  bio: string;
  badges: string[];
  hourly_rate_min: number | null;
  hourly_rate_max: number | null;
  phone: string | null;
  is_verified: boolean;
  is_active: boolean;
};

type PortfolioRow = {
  id: string;
  title: string;
  description: string;
  images: string[];
};

type ReviewRow = {
  id: string;
  author_name: string;
  author_city: string;
  text: string;
  rating: number;
  job_title: string;
  created_at: string;
};

async function fetchWorker(slug: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("workers")
    .select(
      "id, slug, name, trade, trade_slug, city, county, rating, review_count, experience_years, response_time, availability, bio, badges, hourly_rate_min, hourly_rate_max, phone, is_verified, is_active",
    )
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  const worker = data as WorkerRow | null;
  if (!worker) return null;

  const [portfolioRes, reviewsRes] = await Promise.all([
    supabase
      .from("portfolio_items")
      .select("id, title, description, images")
      .eq("worker_id", worker.id)
      .order("created_at", { ascending: false }),
    supabase
      .from("reviews")
      .select("id, author_name, author_city, text, rating, job_title, created_at")
      .eq("worker_id", worker.id)
      .order("created_at", { ascending: false })
      .limit(10),
  ]);

  return {
    worker,
    portfolio: (portfolioRes.data as PortfolioRow[] | null) ?? [],
    reviews: (reviewsRes.data as ReviewRow[] | null) ?? [],
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const result = await fetchWorker(slug);
  if (!result) return {};
  const { worker } = result;
  return {
    title: `${worker.name} — ${worker.trade} în ${worker.city} | Muncitorii.ro`,
    description: worker.bio || `Profil ${worker.trade} ${worker.name} pe Muncitorii.ro`,
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

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("ro-RO", { day: "numeric", month: "short", year: "numeric" });
}

export default async function WorkerProfilePage({ params }: Props) {
  const { slug } = await params;
  const result = await fetchWorker(slug);

  if (!result) notFound();
  const { worker, portfolio, reviews } = result;

  const waMessage = encodeURIComponent(
    `Bună ${worker.name}, te-am găsit pe Muncitorii.ro. Aș avea o lucrare pentru tine.`,
  );
  const waLink = worker.phone
    ? `https://wa.me/${worker.phone.replace(/\D/g, "")}?text=${waMessage}`
    : null;

  return (
    <>
      <section className="px-4 pb-24 pt-10 md:px-6 md:pb-16 md:pt-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-[1.15fr_0.85fr]">
            {/* Worker info card */}
            <div className="rounded-3xl bg-white p-6 shadow-card md:p-8">
              <div className="flex items-start gap-5">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-primary-50 text-3xl font-bold text-primary-900">
                  {worker.name.charAt(0)}
                </div>

                <div className="min-w-0 flex-1">
                  {Array.isArray(worker.badges) && worker.badges.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {(worker.badges as string[]).map((badge) => (
                        <span
                          key={badge}
                          className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700"
                        >
                          <span className="size-1.5 rounded-full bg-emerald-500" />
                          {badge}
                        </span>
                      ))}
                    </div>
                  )}

                  <h1 className="mt-3 text-3xl font-bold tracking-[-0.025em] text-slate-950 md:text-4xl">
                    {worker.name}
                  </h1>

                  <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-600">
                    <span>{worker.trade}</span>
                    <span className="text-slate-300">·</span>
                    <span>{worker.city}</span>
                    {worker.review_count > 0 && (
                      <>
                        <span className="text-slate-300">·</span>
                        <span className="flex items-center gap-1">
                          <Stars rating={Number(worker.rating)} />
                          <span className="font-semibold text-slate-950">
                            {Number(worker.rating).toFixed(1)}
                          </span>
                          <span className="text-slate-400">
                            ({worker.review_count} recenzii)
                          </span>
                        </span>
                      </>
                    )}
                  </div>

                  {worker.bio && (
                    <p className="mt-4 text-sm leading-relaxed text-slate-600 md:text-base">
                      {worker.bio}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-8 grid gap-3 md:grid-cols-3">
                {[
                  { label: "Răspuns", value: worker.response_time || "—" },
                  {
                    label: "Experiență",
                    value: worker.experience_years > 0 ? `${worker.experience_years}+ ani` : "—",
                  },
                  { label: "Disponibilitate", value: worker.availability || "—" },
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
                Contactează direct
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Trimite mesaj direct sau postează lucrarea ta pentru a primi oferte și de la alți meseriași.
              </p>
              <div className="mt-5 space-y-3">
                {waLink ? (
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center rounded-2xl bg-[#25D366] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-95"
                  >
                    Mesaj WhatsApp
                  </a>
                ) : (
                  <Link
                    href="/lucrari/nou"
                    className="flex w-full items-center justify-center rounded-2xl bg-primary-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary-700"
                  >
                    Trimite cerere
                  </Link>
                )}
                <Link
                  href="/lucrari/nou"
                  className="flex w-full items-center justify-center rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-800 transition hover:border-primary-500/30 hover:bg-primary-50 hover:text-primary-900"
                >
                  Postează o lucrare
                </Link>
              </div>

              <div className="mt-6 rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Tarif estimat
                </p>
                <p className="mt-1 font-semibold text-slate-950">
                  {worker.hourly_rate_min && worker.hourly_rate_max
                    ? `${worker.hourly_rate_min}–${worker.hourly_rate_max} lei/oră`
                    : worker.hourly_rate_min
                      ? `de la ${worker.hourly_rate_min} lei/oră`
                      : "Cerere ofertă"}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Prețul final se stabilește după discuție și inspecție.
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
              {portfolio.length === 0 ? (
                <div className="mt-5 rounded-2xl border border-dashed border-slate-200 p-8 text-center">
                  <ImageIcon size={28} className="mx-auto text-slate-300" />
                  <p className="mt-3 text-sm font-semibold text-slate-700">
                    Portofoliu în construcție
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Meseriașul mai adaugă lucrări curând.
                  </p>
                </div>
              ) : (
                <div className="mt-5 grid gap-4">
                  {portfolio.map((item) => (
                    <div key={item.id} className="rounded-2xl border border-slate-200 p-4">
                      {Array.isArray(item.images) && item.images.length > 0 ? (
                        <div className="mb-3 flex h-36 items-center justify-center overflow-hidden rounded-xl bg-slate-50">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={(item.images as string[])[0]}
                            alt={item.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="mb-3 flex h-36 items-center justify-center rounded-xl bg-slate-50 text-slate-300">
                          <ImageIcon size={32} />
                        </div>
                      )}
                      <p className="font-semibold text-slate-900">{item.title}</p>
                      {item.description && (
                        <p className="mt-1 text-sm text-slate-500">{item.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Reviews */}
            <div className="rounded-3xl bg-white p-6 shadow-card md:p-8">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-xl font-bold tracking-[-0.015em] text-slate-950">
                  Recenzii
                </h2>
                <span className="text-sm text-slate-500">{worker.review_count} total</span>
              </div>
              {reviews.length === 0 ? (
                <div className="mt-5 rounded-2xl border border-dashed border-slate-200 p-8 text-center">
                  <p className="text-sm font-semibold text-slate-700">Nicio recenzie încă</p>
                  <p className="mt-1 text-xs text-slate-500">
                    Fii primul care lasă o recenzie după ce colaborezi.
                  </p>
                </div>
              ) : (
                <div className="mt-5 space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="rounded-2xl border border-slate-200 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold text-slate-950">{review.author_name}</p>
                          <p className="text-xs text-slate-500">
                            {review.author_city}{review.author_city && " · "}{formatDate(review.created_at)}
                          </p>
                        </div>
                        <Stars rating={review.rating} />
                      </div>
                      {review.job_title && (
                        <p className="mt-2 text-xs text-slate-400">{review.job_title}</p>
                      )}
                      <p className="mt-2 text-sm leading-relaxed text-slate-700">
                        &ldquo;{review.text}&rdquo;
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Sticky CTA — mobile only */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-slate-200 bg-white p-4 md:hidden">
        {waLink ? (
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center rounded-2xl bg-[#25D366] px-4 py-3 text-sm font-semibold text-white"
          >
            Mesaj WhatsApp
          </a>
        ) : (
          <Link
            href="/lucrari/nou"
            className="flex w-full items-center justify-center rounded-2xl bg-primary-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary-700"
          >
            Trimite cerere
          </Link>
        )}
      </div>
    </>
  );
}
