"use server";

import { z } from "zod";
import { createSubcontractorApplication } from "@/lib/coordonare/data";

const partnerSchema = z.object({
  full_name: z.string().min(2, "Completează numele."),
  trade: z.string().min(2, "Completează meseria."),
  city: z.string().optional(),
  phone: z.string().min(8, "Numărul de telefon nu este valid."),
  experience_years: z.string().optional(),
});

export type PartnerActionState = { ok: false; error: string } | { ok: true } | null;

export async function submitPartnerAction(
  _prevState: PartnerActionState,
  formData: FormData,
): Promise<PartnerActionState> {
  const raw = {
    full_name: String(formData.get("full_name") || ""),
    trade: String(formData.get("trade") || ""),
    city: String(formData.get("city") || ""),
    phone: String(formData.get("phone") || ""),
    experience_years: String(formData.get("experience_years") || ""),
  };

  const parsed = partnerSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Date invalide." };
  }

  const experienceYears = parsed.data.experience_years
    ? parseInt(parsed.data.experience_years, 10)
    : undefined;

  const result = await createSubcontractorApplication({
    full_name: parsed.data.full_name,
    trade: parsed.data.trade,
    city: parsed.data.city,
    phone: parsed.data.phone,
    experience_years: Number.isFinite(experienceYears) ? experienceYears : undefined,
  });

  if (!result.ok) return { ok: false, error: result.error };
  return { ok: true };
}
