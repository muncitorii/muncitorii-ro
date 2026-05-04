import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://afesbzdgftvvebkerjpp.supabase.co";

const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "sb_publishable_WJ1gtrDaUatNbD3SCW_GLw_7dE9SkPK";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "Muncitorii.ro <noreply@muncitorii.ro>";

type NotifyBody = {
  category: string;
  county: string;
  city: string;
  title: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as NotifyBody;
    const { category, county, city, title } = body;

    if (!category || !county || !title) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      cookies: { getAll: () => [], setAll: () => {} },
    });

    // Find matching workers (by trade + county, fallback to city)
    const { data: workers } = await supabase
      .from("workers")
      .select("id, name, user_id, county")
      .eq("trade_slug", category)
      .eq("is_active", true);

    const matchingWorkers = (workers ?? []).filter(
      (w) => w.county === county || w.county.toLowerCase() === city.toLowerCase()
    );

    if (matchingWorkers.length === 0) {
      return NextResponse.json({ matched: 0, sent: 0 });
    }

    // If Resend not configured, just return count (no email sent yet)
    if (!RESEND_API_KEY) {
      return NextResponse.json({
        matched: matchingWorkers.length,
        sent: 0,
        note: "Resend not configured — no emails sent",
      });
    }

    // Get worker emails via auth admin (need service role for this; using anon won't work)
    // For now, we just return the matched count.
    // TODO: when Resend + service role key are available, fetch emails and send
    return NextResponse.json({
      matched: matchingWorkers.length,
      sent: 0,
      note: "Email sending requires service role key — not yet configured",
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}
