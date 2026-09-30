import { getJobTypeLabel } from "@/lib/job-types";
import type { JobWithClient } from "./types";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const NOTIFY_EMAIL = process.env.CONTACT_NOTIFY_EMAIL || "contact@muncitorii.ro";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "Muncitorii.ro <noreply@muncitorii.ro>";

/**
 * Trimite un email echipei (CONTACT_NOTIFY_EMAIL) când vine o cerere nouă
 * prin /cerere. No-op silențios dacă RESEND_API_KEY nu e setat — cererea
 * e deja salvată în DB, emailul e doar un bonus de notificare rapidă.
 */
export async function sendNewJobEmail(
  job: JobWithClient,
): Promise<{ sent: boolean; reason?: string }> {
  if (!RESEND_API_KEY) return { sent: false, reason: "RESEND_API_KEY not configured" };

  const brief = job.brief as { work_type?: string; description?: string };
  const clientName = job.client?.full_name ?? "necunoscut";
  const clientPhone = job.client?.phone ?? "—";

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: NOTIFY_EMAIL,
        subject: `Cerere nouă: ${getJobTypeLabel(brief.work_type)} — ${job.city ?? "oraș necunoscut"}`,
        html: `
          <h2>Cerere nouă pe Muncitorii.ro</h2>
          <p><strong>Client:</strong> ${escapeHtml(clientName)} — ${escapeHtml(clientPhone)}</p>
          <p><strong>Tip lucrare:</strong> ${escapeHtml(getJobTypeLabel(brief.work_type))}</p>
          <p><strong>Oraș:</strong> ${escapeHtml(job.city ?? "—")}</p>
          <p><strong>Buget orientativ:</strong> ${escapeHtml(job.budget_hint ?? "—")}</p>
          <p><strong>Termen dorit:</strong> ${escapeHtml(job.deadline_hint ?? "—")}</p>
          <p><strong>Descriere:</strong></p>
          <p style="white-space: pre-wrap; padding: 12px; background: #f8fafc; border-radius: 8px;">${escapeHtml(brief.description ?? "")}</p>
          <hr/>
          <p><a href="https://muncitorii.ro/admin">Vezi în admin →</a></p>
        `,
      }),
    });
    return { sent: res.ok, reason: res.ok ? undefined : `Resend HTTP ${res.status}` };
  } catch (err) {
    return { sent: false, reason: err instanceof Error ? err.message : String(err) };
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
