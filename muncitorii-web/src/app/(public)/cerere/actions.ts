"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import {
  createIntakeJob,
  attachIntakePhotos,
  uploadJobFile,
  getJobWithClientById,
} from "@/lib/coordonare/data";
import { sendNewJobEmail } from "@/lib/coordonare/notify";
import { jobTypes } from "@/lib/job-types";

const intakeSchema = z.object({
  work_type: z.enum(jobTypes.map((t) => t.slug) as [string, ...string[]]),
  description: z.string().min(10, "Descrie lucrarea în cel puțin 10 caractere."),
  city: z.string().min(2, "Completează orașul."),
  budget_hint: z.string().optional(),
  deadline_hint: z.string().optional(),
  name: z.string().min(2, "Completează numele."),
  phone: z.string().min(8, "Numărul de telefon nu este valid."),
});

export type IntakeActionState = { ok: false; error: string } | { ok: true } | null;

export async function submitIntakeAction(
  _prevState: IntakeActionState,
  formData: FormData,
): Promise<IntakeActionState> {
  const raw = {
    work_type: String(formData.get("work_type") || ""),
    description: String(formData.get("description") || ""),
    city: String(formData.get("city") || ""),
    budget_hint: String(formData.get("budget_hint") || ""),
    deadline_hint: String(formData.get("deadline_hint") || ""),
    name: String(formData.get("name") || ""),
    phone: String(formData.get("phone") || ""),
  };

  const parsed = intakeSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Date invalide." };
  }

  const result = await createIntakeJob(parsed.data);
  if (!result.ok) {
    return { ok: false, error: result.error };
  }

  const photoFiles = formData
    .getAll("photos")
    .filter((f): f is File => f instanceof File && f.size > 0)
    .slice(0, 8);

  if (photoFiles.length > 0) {
    const uploaded: string[] = [];
    for (const file of photoFiles) {
      const uploadResult = await uploadJobFile(result.jobId, "intake", file);
      if (uploadResult.ok) uploaded.push(uploadResult.path);
    }
    await attachIntakePhotos(result.jobId, uploaded);
  }

  // Notificare email — non-blocking pentru utilizator (nu oprim redirect-ul
  // dacă Resend nu e configurat sau dă eroare).
  const jobWithClient = await getJobWithClientById(result.jobId);
  if (jobWithClient) {
    sendNewJobEmail(jobWithClient).catch(() => {});
  }

  redirect(`/cerere/confirmare?token=${result.publicToken}`);
}
