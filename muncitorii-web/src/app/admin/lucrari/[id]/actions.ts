"use server";

import { revalidatePath } from "next/cache";
import {
  adminCreateStage,
  adminUpdateStageStatus,
  adminCreateChangeOrder,
  adminUpdateJobStatus,
  adminCreateDocument,
  attachStagePhoto,
  uploadJobFile,
} from "@/lib/coordonare/data";
import type { JobStatus, StageStatus, DocumentKind } from "@/lib/supabase/types";

export async function addStageAction(formData: FormData) {
  const jobId = String(formData.get("job_id") || "");
  const name = String(formData.get("name") || "").trim();
  const sequence = parseInt(String(formData.get("sequence") || "1"), 10);
  const deadline = String(formData.get("deadline") || "");
  if (!jobId || !name) return;

  await adminCreateStage({ jobId, name, sequence, deadline: deadline || undefined });
  revalidatePath(`/admin/lucrari/${jobId}`);
}

export async function updateStageStatusAction(formData: FormData) {
  const jobId = String(formData.get("job_id") || "");
  const stageId = String(formData.get("stage_id") || "");
  const status = String(formData.get("status") || "") as StageStatus;
  if (!jobId || !stageId || !["pending", "in_progress", "awaiting_approval"].includes(status)) return;

  await adminUpdateStageStatus(stageId, status as "pending" | "in_progress" | "awaiting_approval");
  revalidatePath(`/admin/lucrari/${jobId}`);
}

export async function addChangeOrderAction(formData: FormData) {
  const jobId = String(formData.get("job_id") || "");
  const stageId = String(formData.get("stage_id") || "");
  const description = String(formData.get("description") || "").trim();
  const extraCost = parseFloat(String(formData.get("extra_cost") || "0"));
  if (!jobId || !description || !Number.isFinite(extraCost)) return;

  await adminCreateChangeOrder({ jobId, stageId: stageId || undefined, description, extraCost });
  revalidatePath(`/admin/lucrari/${jobId}`);
}

export async function updateJobStatusAction(formData: FormData) {
  const jobId = String(formData.get("job_id") || "");
  const status = String(formData.get("status") || "") as JobStatus;
  if (!jobId || !status) return;

  await adminUpdateJobStatus(jobId, status);
  revalidatePath(`/admin/lucrari/${jobId}`);
  revalidatePath("/admin");
}

export async function uploadStagePhotoAction(formData: FormData) {
  const jobId = String(formData.get("job_id") || "");
  const stageId = String(formData.get("stage_id") || "");
  const kind = String(formData.get("kind") || "") as "before" | "after";
  const file = formData.get("file");

  if (!jobId || !(file instanceof File) || file.size === 0) return;
  if (kind !== "before" && kind !== "after") return;

  const result = await uploadJobFile(jobId, kind, file);
  if (result.ok) {
    await attachStagePhoto({ jobId, stageId: stageId || undefined, kind, storagePath: result.path });
  }
  revalidatePath(`/admin/lucrari/${jobId}`);
}

export async function uploadDocumentAction(formData: FormData) {
  const jobId = String(formData.get("job_id") || "");
  const kind = String(formData.get("kind") || "") as DocumentKind;
  const label = String(formData.get("label") || "");
  const file = formData.get("file");

  if (!jobId || !(file instanceof File) || file.size === 0) return;

  const result = await uploadJobFile(jobId, "documents", file);
  if (result.ok) {
    await adminCreateDocument({ jobId, kind, storagePath: result.path, label });
  }
  revalidatePath(`/admin/lucrari/${jobId}`);
}
