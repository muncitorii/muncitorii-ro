import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://afesbzdgftvvebkerjpp.supabase.co";

const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "sb_publishable_WJ1gtrDaUatNbD3SCW_GLw_7dE9SkPK";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const NOTIFY_EMAIL = process.env.CONTACT_NOTIFY_EMAIL || "contact@muncitorii.ro";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "Muncitorii.ro <noreply@muncitorii.ro>";

type ContactBody = {
  name: string;
  email: string;
  subject?: string;
  message: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ContactBody;
    const name = (body.name ?? "").trim();
    const email = (body.email ?? "").trim();
    const subject = (body.subject ?? "").trim();
    const message = (body.message ?? "").trim();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Câmpuri obligatorii lipsă" }, { status: 400 });
    }
    if (message.length < 10) {
      return NextResponse.json({ error: "Mesajul e prea scurt" }, { status: 400 });
    }
    if (!email.includes("@")) {
      return NextResponse.json({ error: "Email invalid" }, { status: 400 });
    }

    // 1. Save to Supabase (always, even if Resend fails)
    const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      cookies: { getAll: () => [], setAll: () => {} },
    });

    const { error: insertError } = await (supabase.from("contact_messages") as never as {
      insert: (v: unknown) => Promise<{ error: Error | null }>;
    }).insert({
      name,
      email,
      subject,
      message,
    });

    if (insertError) {
      return NextResponse.json(
        { error: "Eroare salvare mesaj: " + insertError.message },
        { status: 500 },
      );
    }

    // 2. Send email via Resend if configured
    let emailSent = false;
    if (RESEND_API_KEY) {
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
            reply_to: email,
            subject: subject ? `[Contact] ${subject}` : `Mesaj nou de la ${name}`,
            html: `
              <h2>Mesaj nou pe Muncitorii.ro</h2>
              <p><strong>De la:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
              ${subject ? `<p><strong>Subiect:</strong> ${escapeHtml(subject)}</p>` : ""}
              <p><strong>Mesaj:</strong></p>
              <p style="white-space: pre-wrap; padding: 12px; background: #f8fafc; border-radius: 8px;">${escapeHtml(message)}</p>
              <hr/>
              <p style="color:#94a3b8;font-size:12px;">Răspunde direct la acest email — răspunsul ajunge la ${escapeHtml(email)}</p>
            `,
          }),
        });
        emailSent = res.ok;
      } catch {
        emailSent = false;
      }
    }

    return NextResponse.json({ ok: true, emailSent });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    );
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
