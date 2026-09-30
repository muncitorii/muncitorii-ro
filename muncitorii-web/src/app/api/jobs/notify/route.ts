import { NextResponse } from "next/server";
import { getJobWithClientById } from "@/lib/coordonare/data";
import { sendNewJobEmail } from "@/lib/coordonare/notify";

// Extins pentru Sprint 1 (coordonare): endpoint-ul trimitea inițial
// notificări către muncitori din marketplace (matching pe trade+county).
// Marketplace-ul e arhivat, deci logica de matching a fost eliminată.
// Acum trimite un email echipei (via Resend) când vine o cerere nouă prin
// /cerere. Apelat din server action-ul submitIntakeAction — non-blocking,
// nu poate bloca salvarea cererii în DB.
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { jobId?: string };
    if (!body.jobId) {
      return NextResponse.json({ error: "Missing jobId" }, { status: 400 });
    }

    const job = await getJobWithClientById(body.jobId);
    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    const result = await sendNewJobEmail(job);
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    );
  }
}
