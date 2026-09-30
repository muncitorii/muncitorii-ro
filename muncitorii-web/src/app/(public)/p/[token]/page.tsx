import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2, Circle, Clock, FileText } from "lucide-react";
import { getJobByToken, getSignedUrl } from "@/lib/coordonare/data";
import { getJobTypeLabel } from "@/lib/job-types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/components/ui/utils";
import { approveStageFormAction, decideChangeOrderFormAction } from "./actions";
import type { JobStage } from "@/lib/coordonare/types";

export const metadata: Metadata = {
  title: "Lucrarea ta | Muncitorii.ro",
  robots: { index: false },
};

const jobStatusLabel: Record<string, string> = {
  intake: "Cerere primită",
  evaluare: "În evaluare",
  oferte: "Oferte în comparare",
  in_lucru: "În lucru",
  finalizat: "Finalizat",
};

const stageStatusLabel: Record<JobStage["status"], string> = {
  pending: "Neînceput",
  in_progress: "În lucru",
  awaiting_approval: "Așteaptă confirmarea ta",
  approved: "Confirmat",
};

const stageChipClasses: Record<JobStage["status"], { chip: string; dot: string }> = {
  approved: { chip: "border-emerald-200 bg-emerald-50 text-emerald-700", dot: "bg-emerald-600" },
  awaiting_approval: { chip: "border-accent-200 bg-accent-50 text-accent-700", dot: "bg-accent-700" },
  in_progress: { chip: "border-primary-200 bg-primary-50 text-primary-700", dot: "bg-primary-700" },
  pending: { chip: "border-slate-200 bg-slate-50 text-slate-500", dot: "bg-slate-400" },
};

function StatusChip({ status }: { status: JobStage["status"] }) {
  const c = stageChipClasses[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold",
        c.chip,
      )}
    >
      <span className={cn("size-1.5 rounded-full", c.dot)} />
      {stageStatusLabel[status]}
    </span>
  );
}

function StageIcon({ status }: { status: JobStage["status"] }) {
  if (status === "approved") return <CheckCircle2 size={18} className="text-emerald-600" />;
  if (status === "awaiting_approval") return <Clock size={18} className="text-amber-600" />;
  if (status === "in_progress") return <Clock size={18} className="text-primary-700" />;
  return <Circle size={18} className="text-slate-300" />;
}

export default async function ClientPortalPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const { job, seed } = await getJobByToken(token);

  if (!job) notFound();

  const pendingChangeOrders = job.change_orders.filter((co) => co.status === "pending");
  const documentUrls = await Promise.all(
    job.documents.map(async (doc) => ({ doc, url: await getSignedUrl(doc.storage_path) })),
  );
  const photoUrls = await Promise.all(
    job.photos.map(async (photo) => ({ photo, url: await getSignedUrl(photo.storage_path) })),
  );
  const intakePhotos = photoUrls.filter(({ photo, url }) => photo.kind === "intake" && url);
  const photosForStage = (stageId: string, kind: "before" | "after") =>
    photoUrls.filter(({ photo, url }) => photo.stage_id === stageId && photo.kind === kind && url);

  const brief = job.brief as { work_type?: string; description?: string };

  const totalStages = job.stages.length;
  const approvedStages = job.stages.filter((s) => s.status === "approved").length;
  const progressPct = totalStages > 0 ? Math.round((approvedStages / totalStages) * 100) : 0;

  return (
    <section className="px-4 py-10 md:px-6 md:py-14">
      <div className="mx-auto max-w-3xl">
        {seed && (
          <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs font-medium text-amber-800">
            Date demo — SUPABASE_SERVICE_ROLE_KEY nu e configurat, se afișează o lucrare seed.
          </div>
        )}

        {/* HEADER */}
        <div className="rounded-3xl bg-gradient-to-br from-primary-900 to-primary-950 px-6 py-7 text-white md:px-8 md:py-9">
          <p className="text-sm font-medium text-white/60">Lucrarea ta</p>
          <h1 className="mt-1 text-2xl font-bold tracking-[-0.015em] md:text-3xl">
            {getJobTypeLabel(brief.work_type)} {job.city ? `— ${job.city}` : ""}
          </h1>
          <div className="mt-3">
            <Badge variant="accent">{jobStatusLabel[job.status] ?? job.status}</Badge>
          </div>
          {totalStages > 0 && (
            <div className="mt-4 max-w-xs">
              <div className="flex items-center justify-between text-xs text-white/70">
                <span>Progres etape</span>
                <span className="font-mono text-white">
                  {approvedStages} din {totalStages} etape
                </span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/20">
                <div
                  className="h-full rounded-full bg-amber-400"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>
          )}
          {brief.description && (
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/75">{brief.description}</p>
          )}
          {intakePhotos.length > 0 && (
            <div className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-4">
              {intakePhotos.map(({ photo, url }) => (
                <a key={photo.id} href={url!} target="_blank" rel="noopener noreferrer">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={url!}
                    alt="Poză trimisă de client"
                    className="aspect-square w-full rounded-xl object-cover ring-1 ring-white/20"
                  />
                </a>
              ))}
            </div>
          )}
        </div>

        {/* TIMELINE ETAPE */}
        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-card md:p-8">
          <h2 className="text-xl font-bold tracking-[-0.015em] text-slate-950">Etapele lucrării</h2>

          {job.stages.length === 0 ? (
            <p className="mt-3 text-sm text-slate-500">
              Etapele vor apărea aici imediat ce lucrarea intră în execuție.
            </p>
          ) : (
            <div className="mt-5 space-y-3">
              {job.stages.map((stage, index) => (
                <div
                  key={stage.id}
                  className="flex flex-col gap-3 rounded-2xl border border-slate-200 p-4 sm:flex-row sm:items-start sm:justify-between"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 font-mono text-sm text-slate-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <StageIcon status={stage.status} />
                    <div>
                      <p className="font-semibold text-slate-950">{stage.name}</p>
                      <p className="mt-0.5 text-xs text-slate-500">
                        {stage.deadline ? (
                          <>
                            Termen:{" "}
                            <span className="font-mono">
                              {new Date(stage.deadline).toLocaleDateString("ro-RO", {
                                day: "numeric",
                                month: "long",
                              })}
                            </span>
                          </>
                        ) : (
                          "Fără termen fixat"
                        )}
                      </p>
                      <div className="mt-2">
                        <StatusChip status={stage.status} />
                      </div>
                    </div>
                  </div>

                  {(photosForStage(stage.id, "before").length > 0 ||
                    photosForStage(stage.id, "after").length > 0) && (
                    <div className="grid grid-cols-2 gap-3 sm:w-72">
                      {(["before", "after"] as const).map((kind) => {
                        const items = photosForStage(stage.id, kind);
                        if (items.length === 0) return null;
                        return (
                          <div key={kind}>
                            <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                              {kind === "before" ? "Înainte" : "După"}
                            </p>
                            <div className="grid grid-cols-2 gap-1.5">
                              {items.map(({ photo, url }) => (
                                <a key={photo.id} href={url!} target="_blank" rel="noopener noreferrer">
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img
                                    src={url!}
                                    alt={kind === "before" ? "Înainte" : "După"}
                                    className="aspect-square w-full rounded-lg object-cover ring-1 ring-slate-200"
                                  />
                                </a>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {stage.status === "awaiting_approval" && (
                    <form action={approveStageFormAction}>
                      <input type="hidden" name="stage_id" value={stage.id} />
                      <input type="hidden" name="token" value={token} />
                      <button
                        type="submit"
                        className="w-full rounded-full bg-primary-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-700 sm:w-auto"
                      >
                        Confirm etapa
                      </button>
                    </form>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* COSTURI SUPLIMENTARE */}
        {pendingChangeOrders.length > 0 && (
          <div className="mt-6 rounded-3xl border-2 border-amber-300 bg-amber-50/50 p-6 md:p-8">
            <h2 className="text-xl font-bold tracking-[-0.015em] text-slate-950">
              Costuri suplimentare de aprobat
            </h2>
            <div className="mt-5 space-y-4">
              {pendingChangeOrders.map((co) => (
                <div key={co.id} className="rounded-2xl bg-white p-5 shadow-card">
                  <p className="text-sm leading-relaxed text-slate-700">{co.description}</p>
                  <p className="mt-2 font-mono text-lg font-bold text-slate-950">
                    +{co.extra_cost.toLocaleString("ro-RO")} lei
                  </p>
                  <div className="mt-4 flex gap-2">
                    <form action={decideChangeOrderFormAction}>
                      <input type="hidden" name="change_order_id" value={co.id} />
                      <input type="hidden" name="token" value={token} />
                      <input type="hidden" name="decision" value="approved" />
                      <button
                        type="submit"
                        className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
                      >
                        Aprob
                      </button>
                    </form>
                    <form action={decideChangeOrderFormAction}>
                      <input type="hidden" name="change_order_id" value={co.id} />
                      <input type="hidden" name="token" value={token} />
                      <input type="hidden" name="decision" value="rejected" />
                      <button
                        type="submit"
                        className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                      >
                        Resping
                      </button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DOCUMENTE */}
        {documentUrls.length > 0 && (
          <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-card md:p-8">
            <h2 className="text-xl font-bold tracking-[-0.015em] text-slate-950">Documente</h2>
            <div className="mt-4 space-y-2">
              {documentUrls.map(({ doc, url }) => (
                <a
                  key={doc.id}
                  href={url ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-primary-500/30 hover:bg-primary-50/40"
                >
                  <FileText size={16} className="text-slate-400" />
                  {doc.label || doc.kind}
                </a>
              ))}
            </div>
          </div>
        )}

        <p className="mt-8 text-center text-xs text-slate-400">
          Acest link e personal — nu îl distribui. Nu vezi date despre alte lucrări.
        </p>
      </div>
    </section>
  );
}
