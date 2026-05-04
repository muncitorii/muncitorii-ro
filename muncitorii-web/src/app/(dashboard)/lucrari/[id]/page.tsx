import Link from "next/link";
import { notFound } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getJobById } from "@/lib/jobs";

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const job = getJobById(id);

  if (!job) notFound();

  return (
    <DashboardLayout role="muncitor" activeHref="/lucrari" userName="Alex Popescu">
      <div className="space-y-5">
        <Link
          href="/lucrari"
          className="inline-flex text-sm font-semibold text-primary-900 hover:text-primary-700"
        >
          ← Înapoi la lucrări
        </Link>

        <div className="grid gap-5 md:grid-cols-[1fr_300px]">
          {/* Job detail */}
          <Card>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="default" className="bg-primary-50 text-primary-900">
                {job.category}
              </Badge>
              <Badge variant="success" dot>
                Activ
              </Badge>
              {job.urgency === "ridicată" && <Badge variant="accent">Urgent</Badge>}
            </div>

            <h1 className="mt-4 text-2xl font-bold tracking-[-0.02em] text-slate-950 md:text-3xl">
              {job.title}
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Postat de {job.postedBy} · {job.postedDate}
            </p>

            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { label: "Buget", value: job.budget },
                { label: "Termen", value: job.deadline },
                { label: "Locație", value: job.city },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-slate-200 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    {item.label}
                  </p>
                  <p className="mt-1.5 font-semibold text-slate-950">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <h2 className="text-base font-bold text-slate-950">Detalii lucrare</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{job.details}</p>
            </div>
          </Card>

          {/* Apply sidebar */}
          <div className="space-y-4">
            <Card>
              <h2 className="text-lg font-bold tracking-[-0.015em] text-slate-950">
                Aplică la această lucrare
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Trimite o ofertă cu prețul și disponibilitatea ta.
              </p>
              <form className="mt-5 space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Prețul tău (lei)
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: 400"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Mesaj scurt
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Prezintă-te pe scurt..."
                    className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-2xl bg-primary-900 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 ease-out hover:bg-primary-700"
                >
                  Trimite oferta
                </button>
              </form>
            </Card>

            <Card variant="bordered" className="p-5 md:p-5">
              <p className="text-sm font-semibold text-slate-900">Client verificat</p>
              <p className="mt-1 text-xs text-slate-500">
                {job.postedBy} · Activ pe platformă din 2026
              </p>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
