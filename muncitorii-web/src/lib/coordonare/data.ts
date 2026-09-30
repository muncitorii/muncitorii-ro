// Notă: acest modul folosește SUPABASE_SERVICE_ROLE_KEY și trebuie importat
// DOAR din server components / server actions / route handlers, niciodată
// dintr-un "use client". Nu adăugăm pachetul `server-only` (nu e pe lista
// de dependențe permise) — disciplina se ține prin convenție + code review.
import { createAdminClient, hasServiceRole } from "@/lib/supabase/admin";
import { seedJobs, seedSubcontractors } from "./seed";
import type { JobFull, JobWithClient, Subcontractor } from "./types";
import type { JobBrief } from "@/lib/supabase/types";

export { hasServiceRole };

// ------------------------------------------------------------
// Listare pentru /admin
// ------------------------------------------------------------
export async function listJobsForAdmin(): Promise<{
  jobs: JobWithClient[];
  seed: boolean;
}> {
  const admin = createAdminClient();
  if (!admin) {
    return { jobs: seedJobs.map(({ stages, change_orders, photos, documents, ...j }) => j), seed: true };
  }

  const { data, error } = await admin
    .from("jobs")
    .select("*, client:clients(*)")
    .order("created_at", { ascending: false });

  if (error || !data) {
    return { jobs: seedJobs.map(({ stages, change_orders, photos, documents, ...j }) => j), seed: true };
  }

  return { jobs: data as unknown as JobWithClient[], seed: false };
}

// ------------------------------------------------------------
// Detaliu lucrare — folosit de /admin/lucrari/[id] și /p/[token]
// ------------------------------------------------------------
async function loadJobFull(
  filter: { id: string } | { public_token: string },
): Promise<{ job: JobFull | null; seed: boolean }> {
  const admin = createAdminClient();

  if (!admin) {
    const key = "id" in filter ? filter.id : filter.public_token;
    const job = seedJobs.find((j) => j.id === key || j.public_token === key) ?? null;
    return { job, seed: true };
  }

  let query = admin.from("jobs").select("*, client:clients(*)");
  query = "id" in filter ? query.eq("id", filter.id) : query.eq("public_token", filter.public_token);
  const { data: jobRow, error } = await query.maybeSingle();

  if (error || !jobRow) return { job: null, seed: false };

  const jobId = (jobRow as { id: string }).id;

  const [{ data: stages }, { data: changeOrders }, { data: photos }, { data: documents }] =
    await Promise.all([
      admin.from("job_stages").select("*").eq("job_id", jobId).order("sequence", { ascending: true }),
      admin.from("change_orders").select("*").eq("job_id", jobId).order("created_at", { ascending: false }),
      admin.from("photos").select("*").eq("job_id", jobId).order("created_at", { ascending: false }),
      admin.from("documents").select("*").eq("job_id", jobId).order("created_at", { ascending: false }),
    ]);

  return {
    job: {
      ...(jobRow as unknown as JobFull),
      stages: stages ?? [],
      change_orders: changeOrders ?? [],
      photos: photos ?? [],
      documents: documents ?? [],
    },
    seed: false,
  };
}

export function getJobByIdForAdmin(id: string) {
  return loadJobFull({ id });
}

export function getJobByToken(token: string) {
  return loadJobFull({ public_token: token });
}

// ------------------------------------------------------------
// /cerere — intake public (server action)
// ------------------------------------------------------------
export type IntakeInput = {
  work_type: string;
  description: string;
  city: string;
  budget_hint?: string;
  deadline_hint?: string;
  name: string;
  phone: string;
};

export async function createIntakeJob(
  input: IntakeInput,
): Promise<{ ok: true; jobId: string; publicToken: string } | { ok: false; error: string }> {
  const admin = createAdminClient();
  if (!admin) {
    return {
      ok: false,
      error:
        "Supabase service role key nu e configurat (SUPABASE_SERVICE_ROLE_KEY). Cererea nu a putut fi salvată — vezi README-COORDONARE.md.",
    };
  }

  const { data: client, error: clientError } = await admin
    .from("clients")
    .insert({ full_name: input.name, phone: input.phone, city: input.city })
    .select("id")
    .single();

  if (clientError || !client) {
    return { ok: false, error: clientError?.message ?? "Eroare la salvarea clientului." };
  }

  const brief: JobBrief = {
    work_type: input.work_type,
    description: input.description,
    name: input.name,
    phone: input.phone,
  };

  const { data: job, error: jobError } = await admin
    .from("jobs")
    .insert({
      client_id: client.id,
      brief,
      city: input.city,
      budget_hint: input.budget_hint || null,
      deadline_hint: input.deadline_hint || null,
    })
    .select("id, public_token")
    .single();

  if (jobError || !job) {
    return { ok: false, error: jobError?.message ?? "Eroare la salvarea lucrării." };
  }

  return { ok: true, jobId: job.id, publicToken: job.public_token };
}

export async function attachIntakePhotos(jobId: string, storagePaths: string[]) {
  const admin = createAdminClient();
  if (!admin || storagePaths.length === 0) return;
  await admin
    .from("photos")
    .insert(storagePaths.map((storage_path) => ({ job_id: jobId, kind: "intake" as const, storage_path })));
}

export async function getJobWithClientById(jobId: string): Promise<JobWithClient | null> {
  const admin = createAdminClient();
  if (!admin) return null;
  const { data } = await admin.from("jobs").select("*, client:clients(*)").eq("id", jobId).maybeSingle();
  return (data as unknown as JobWithClient) ?? null;
}

// ------------------------------------------------------------
// /parteneri — formular subcontractori (server action)
// ------------------------------------------------------------
export type PartnerInput = {
  full_name: string;
  trade: string;
  city?: string;
  phone: string;
  experience_years?: number;
};

export async function createSubcontractorApplication(
  input: PartnerInput,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const admin = createAdminClient();
  if (!admin) {
    return {
      ok: false,
      error:
        "Supabase service role key nu e configurat (SUPABASE_SERVICE_ROLE_KEY). Cererea nu a putut fi salvată — vezi README-COORDONARE.md.",
    };
  }

  const { error } = await admin.from("subcontractors").insert({
    full_name: input.full_name,
    trade: input.trade,
    city: input.city || null,
    phone: input.phone,
    experience_years: input.experience_years ?? null,
  });

  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function listSubcontractorsForAdmin(): Promise<{
  subcontractors: Subcontractor[];
  seed: boolean;
}> {
  const admin = createAdminClient();
  if (!admin) return { subcontractors: seedSubcontractors, seed: true };

  const { data, error } = await admin
    .from("subcontractors")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) return { subcontractors: seedSubcontractors, seed: true };
  return { subcontractors: data, seed: false };
}

// ------------------------------------------------------------
// Portal client (/p/[token]) — aprobări
// ------------------------------------------------------------
export async function approveStage(
  stageId: string,
  ip: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const admin = createAdminClient();
  if (!admin) return { ok: false, error: "Service role key nu e configurat — nu se poate salva aprobarea." };

  const { error } = await admin
    .from("job_stages")
    .update({
      status: "approved",
      client_approved_at: new Date().toISOString(),
      client_approved_ip: ip,
      client_approved_method: "click_link",
    })
    .eq("id", stageId)
    .eq("status", "awaiting_approval");

  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function decideChangeOrder(
  changeOrderId: string,
  decision: "approved" | "rejected",
  ip: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const admin = createAdminClient();
  if (!admin) return { ok: false, error: "Service role key nu e configurat — nu se poate salva decizia." };

  const { error } = await admin
    .from("change_orders")
    .update({
      status: decision,
      approved_at: new Date().toISOString(),
      approved_ip: ip,
      approved_method: "click_link",
    })
    .eq("id", changeOrderId)
    .eq("status", "pending");

  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

// ------------------------------------------------------------
// Admin — gestiune etape / change orders / documente
// ------------------------------------------------------------
export async function adminCreateStage(input: {
  jobId: string;
  name: string;
  sequence: number;
  deadline?: string;
}) {
  const admin = createAdminClient();
  if (!admin) return { ok: false as const, error: "Service role key nu e configurat." };
  const { error } = await admin.from("job_stages").insert({
    job_id: input.jobId,
    name: input.name,
    sequence: input.sequence,
    deadline: input.deadline || null,
  });
  if (error) return { ok: false as const, error: error.message };
  return { ok: true as const };
}

export async function adminUpdateStageStatus(stageId: string, status: "pending" | "in_progress" | "awaiting_approval") {
  const admin = createAdminClient();
  if (!admin) return { ok: false as const, error: "Service role key nu e configurat." };
  const { error } = await admin.from("job_stages").update({ status }).eq("id", stageId);
  if (error) return { ok: false as const, error: error.message };
  return { ok: true as const };
}

export async function adminCreateChangeOrder(input: {
  jobId: string;
  stageId?: string;
  description: string;
  extraCost: number;
}) {
  const admin = createAdminClient();
  if (!admin) return { ok: false as const, error: "Service role key nu e configurat." };
  const { error } = await admin.from("change_orders").insert({
    job_id: input.jobId,
    stage_id: input.stageId || null,
    description: input.description,
    extra_cost: input.extraCost,
  });
  if (error) return { ok: false as const, error: error.message };
  return { ok: true as const };
}

export async function adminUpdateJobStatus(
  jobId: string,
  status: "intake" | "evaluare" | "oferte" | "in_lucru" | "finalizat",
) {
  const admin = createAdminClient();
  if (!admin) return { ok: false as const, error: "Service role key nu e configurat." };
  const { error } = await admin.from("jobs").update({ status }).eq("id", jobId);
  if (error) return { ok: false as const, error: error.message };
  return { ok: true as const };
}

export async function adminCreateDocument(input: {
  jobId: string;
  kind: "invoice" | "warranty" | "instructions" | "pv" | "offer_pdf";
  storagePath: string;
  label?: string;
}) {
  const admin = createAdminClient();
  if (!admin) return { ok: false as const, error: "Service role key nu e configurat." };
  const { error } = await admin.from("documents").insert({
    job_id: input.jobId,
    kind: input.kind,
    storage_path: input.storagePath,
    label: input.label || "",
  });
  if (error) return { ok: false as const, error: error.message };
  return { ok: true as const };
}

/** Upload generic în bucket-ul privat job-photos, returnează storage_path. */
export async function uploadJobFile(
  jobId: string,
  folder: "intake" | "before" | "after" | "documents",
  file: File,
): Promise<{ ok: true; path: string } | { ok: false; error: string }> {
  const admin = createAdminClient();
  if (!admin) return { ok: false, error: "Service role key nu e configurat." };

  const ext = file.name.split(".").pop() || "bin";
  const path = `${jobId}/${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error } = await admin.storage.from("job-photos").upload(path, file, {
    contentType: file.type || undefined,
  });
  if (error) return { ok: false, error: error.message };
  return { ok: true, path };
}

/** URL semnat temporar (10 min) pentru o poză/document privat. */
export async function getSignedUrl(path: string): Promise<string | null> {
  const admin = createAdminClient();
  if (!admin) return null;
  const { data, error } = await admin.storage.from("job-photos").createSignedUrl(path, 600);
  if (error || !data) return null;
  return data.signedUrl;
}
