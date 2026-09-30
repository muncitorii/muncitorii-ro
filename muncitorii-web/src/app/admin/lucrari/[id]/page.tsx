import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getJobByIdForAdmin, getSignedUrl } from "@/lib/coordonare/data";
import { getJobTypeLabel } from "@/lib/job-types";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CopyLinkButton } from "@/components/copy-link-button";
import {
  addStageAction,
  updateStageStatusAction,
  addChangeOrderAction,
  updateJobStatusAction,
  uploadStagePhotoAction,
  uploadDocumentAction,
} from "./actions";

const jobStatuses = ["intake", "evaluare", "oferte", "in_lucru", "finalizat"] as const;
const stageStatuses = ["pending", "in_progress", "awaiting_approval"] as const;
const stageStatusLabel: Record<string, string> = {
  pending: "Neînceput",
  in_progress: "În lucru",
  awaiting_approval: "Așteaptă client",
  approved: "Confirmat de client",
};
const documentKinds = [
  { value: "invoice", label: "Factură" },
  { value: "warranty", label: "Garanție" },
  { value: "instructions", label: "Instrucțiuni întreținere" },
  { value: "pv", label: "Proces verbal" },
  { value: "offer_pdf", label: "Ofertă (PDF)" },
];

export default async function AdminJobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { job, seed } = await getJobByIdForAdmin(id);
  if (!job) notFound();

  const brief = job.brief as { work_type?: string; description?: string; name?: string; phone?: string };
  const nextSequence = job.stages.length > 0 ? Math.max(...job.stages.map((s) => s.sequence)) + 1 : 1;

  const photoUrls = await Promise.all(
    job.photos.map(async (photo) => ({ photo, url: await getSignedUrl(photo.storage_path) })),
  );
  const intakePhotos = photoUrls.filter(({ photo, url }) => photo.kind === "intake" && url);
  const photosForStage = (stageId: string, kind: "before" | "after") =>
    photoUrls.filter(({ photo, url }) => photo.stage_id === stageId && photo.kind === kind && url);

  return (
    <div className="space-y-5">
      <Link href="/admin" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-900 hover:text-primary-700">
        <ArrowLeft size={16} /> Toate lucrările
      </Link>

      {seed && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">
          Date demo (seed) — modificările de mai jos nu se salvează fără SUPABASE_SERVICE_ROLE_KEY.
        </div>
      )}

      {/* Header lucrare */}
      <Card>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <Badge variant="accent">{getJobTypeLabel(brief.work_type)}</Badge>
            <h1 className="mt-3 text-2xl font-bold tracking-[-0.02em] text-slate-950">
              {job.client?.full_name ?? brief.name ?? "Client necunoscut"}
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              {job.client?.phone ?? brief.phone ?? "—"} · {job.city ?? "—"}
            </p>
          </div>
          <CopyLinkButton path={`/p/${job.public_token}`} />
        </div>

        {brief.description && (
          <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-slate-700">
            {brief.description}
          </p>
        )}

        <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-500">
          <span>Buget orientativ: {job.budget_hint ?? "—"}</span>
          <span>Termen dorit: {job.deadline_hint ?? "—"}</span>
        </div>

        {intakePhotos.length > 0 && (
          <div className="mt-4">
            <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              Poze de la client
            </p>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
              {intakePhotos.map(({ photo, url }) => (
                <a key={photo.id} href={url!} target="_blank" rel="noopener noreferrer">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={url!}
                    alt="Poză trimisă de client"
                    className="aspect-square w-full rounded-xl object-cover ring-1 ring-slate-200"
                  />
                </a>
              ))}
            </div>
          </div>
        )}

        <form action={updateJobStatusAction} className="mt-5 flex flex-wrap items-center gap-2">
          <input type="hidden" name="job_id" value={job.id} />
          <label className="text-sm font-medium text-slate-700">Status lucrare</label>
          <select
            name="status"
            defaultValue={job.status}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-primary-700 focus:ring-2 focus:ring-primary-700/15"
          >
            {jobStatuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <button type="submit" className="rounded-xl bg-primary-900 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700">
            Salvează
          </button>
        </form>
      </Card>

      {/* Etape */}
      <Card>
        <h2 className="text-xl font-bold tracking-[-0.015em] text-slate-950">Etape</h2>

        <div className="mt-4 space-y-3">
          {job.stages.map((stage) => (
            <div key={stage.id} className="rounded-2xl border border-slate-200 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-950">
                    <span className="font-mono text-slate-400">
                      {String(stage.sequence).padStart(2, "0")}
                    </span>{" "}
                    {stage.name}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500">
                    <span className="font-mono">{stage.deadline ?? "fără termen"}</span> ·{" "}
                    {stageStatusLabel[stage.status] ?? stage.status}
                  </p>
                </div>

                {stage.status !== "approved" && (
                  <form action={updateStageStatusAction} className="flex items-center gap-2">
                    <input type="hidden" name="job_id" value={job.id} />
                    <input type="hidden" name="stage_id" value={stage.id} />
                    <select
                      name="status"
                      defaultValue={stage.status}
                      className="rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs outline-none focus:border-primary-700 focus:ring-2 focus:ring-primary-700/15"
                    >
                      {stageStatuses.map((s) => (
                        <option key={s} value={s}>
                          {stageStatusLabel[s]}
                        </option>
                      ))}
                    </select>
                    <button type="submit" className="rounded-xl border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50">
                      Salvează
                    </button>
                  </form>
                )}
              </div>

              {/* Poze etapă existente */}
              {(photosForStage(stage.id, "before").length > 0 ||
                photosForStage(stage.id, "after").length > 0) && (
                <div className="mt-3 grid grid-cols-2 gap-3 sm:w-72">
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

              {/* Upload poze etapă */}
              <div className="mt-3 flex flex-wrap gap-2">
                {(["before", "after"] as const).map((kind) => (
                  <form key={kind} action={uploadStagePhotoAction} encType="multipart/form-data" className="flex items-center gap-2">
                    <input type="hidden" name="job_id" value={job.id} />
                    <input type="hidden" name="stage_id" value={stage.id} />
                    <input type="hidden" name="kind" value={kind} />
                    <label className="text-xs font-medium text-slate-500">
                      {kind === "before" ? "Poză înainte" : "Poză după"}
                    </label>
                    <input type="file" name="file" accept="image/*" required className="text-xs" />
                    <button type="submit" className="rounded-lg border border-slate-300 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50">
                      Încarcă
                    </button>
                  </form>
                ))}
              </div>
            </div>
          ))}
        </div>

        <form action={addStageAction} className="mt-5 grid gap-3 rounded-2xl border border-dashed border-slate-300 p-4 sm:grid-cols-[1fr_auto_auto_auto]">
          <input type="hidden" name="job_id" value={job.id} />
          <input
            name="name"
            type="text"
            required
            placeholder="Nume etapă nouă"
            className="rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-primary-700 focus:ring-2 focus:ring-primary-700/15"
          />
          <input
            name="sequence"
            type="number"
            defaultValue={nextSequence}
            min={1}
            className="w-20 rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-primary-700 focus:ring-2 focus:ring-primary-700/15"
          />
          <input
            name="deadline"
            type="date"
            className="rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-primary-700 focus:ring-2 focus:ring-primary-700/15"
          />
          <button type="submit" className="rounded-xl bg-primary-900 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700">
            + Etapă
          </button>
        </form>
      </Card>

      {/* Change orders */}
      <Card>
        <h2 className="text-xl font-bold tracking-[-0.015em] text-slate-950">Costuri suplimentare</h2>

        <div className="mt-4 space-y-2">
          {job.change_orders.map((co) => (
            <div key={co.id} className="rounded-2xl border border-slate-200 p-4">
              <p className="text-sm text-slate-700">{co.description}</p>
              <div className="mt-1 flex items-center gap-3">
                <p className="font-mono font-semibold text-slate-950">+{co.extra_cost} lei</p>
                <Badge variant={co.status === "approved" ? "success" : co.status === "rejected" ? "default" : "pending"} dot>
                  {co.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        <form action={addChangeOrderAction} className="mt-5 grid gap-3 rounded-2xl border border-dashed border-slate-300 p-4 sm:grid-cols-[1fr_auto_auto]">
          <input type="hidden" name="job_id" value={job.id} />
          <input
            name="description"
            type="text"
            required
            placeholder="Descriere cost suplimentar"
            className="rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-primary-700 focus:ring-2 focus:ring-primary-700/15"
          />
          <select
            name="stage_id"
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-primary-700 focus:ring-2 focus:ring-primary-700/15"
          >
            <option value="">— etapă (opțional) —</option>
            {job.stages.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          <div className="flex gap-2">
            <input
              name="extra_cost"
              type="number"
              step="0.01"
              min="0"
              required
              placeholder="lei"
              className="w-24 rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-primary-700 focus:ring-2 focus:ring-primary-700/15"
            />
            <button type="submit" className="rounded-xl bg-primary-900 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700">
              + Cost
            </button>
          </div>
        </form>
      </Card>

      {/* Documente */}
      <Card>
        <h2 className="text-xl font-bold tracking-[-0.015em] text-slate-950">Documente</h2>
        <div className="mt-4 space-y-2">
          {job.documents.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-2.5 text-sm">
              <span className="font-medium text-slate-800">{doc.label || doc.kind}</span>
              <span className="text-xs text-slate-400">{doc.kind}</span>
            </div>
          ))}
        </div>

        <form action={uploadDocumentAction} encType="multipart/form-data" className="mt-5 grid gap-3 rounded-2xl border border-dashed border-slate-300 p-4 sm:grid-cols-[auto_1fr_auto_auto]">
          <input type="hidden" name="job_id" value={job.id} />
          <select
            name="kind"
            required
            defaultValue=""
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-primary-700 focus:ring-2 focus:ring-primary-700/15"
          >
            <option value="" disabled>
              Tip document...
            </option>
            {documentKinds.map((k) => (
              <option key={k.value} value={k.value}>
                {k.label}
              </option>
            ))}
          </select>
          <input
            name="label"
            type="text"
            placeholder="Etichetă (opțional)"
            className="rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-primary-700 focus:ring-2 focus:ring-primary-700/15"
          />
          <input name="file" type="file" required className="text-sm" />
          <button type="submit" className="rounded-xl bg-primary-900 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700">
            Încarcă
          </button>
        </form>
      </Card>
    </div>
  );
}
