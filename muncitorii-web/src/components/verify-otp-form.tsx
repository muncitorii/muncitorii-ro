"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

type VerifyOtpFormProps = {
  email: string;
  role: "client" | "worker";
};

export function VerifyOtpForm({ email: initialEmail, role }: VerifyOtpFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState(initialEmail);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setInfo(null);

    const cleanCode = code.replace(/\s+/g, "").trim();
    if (cleanCode.length !== 6 || !/^\d{6}$/.test(cleanCode)) {
      setError("Codul trebuie să aibă exact 6 cifre.");
      return;
    }
    if (!email) {
      setError("Lipsește emailul. Întoarce-te la înregistrare.");
      return;
    }

    setLoading(true);
    try {
      const supabase = createClient();
      const { error: verifyError } = await supabase.auth.verifyOtp({
        email,
        token: cleanCode,
        type: "signup",
      });

      if (verifyError) {
        setError(
          verifyError.message.includes("expired")
            ? "Codul a expirat. Cere unul nou."
            : verifyError.message.includes("invalid")
            ? "Cod incorect. Verifică emailul și încearcă din nou."
            : verifyError.message,
        );
        setLoading(false);
        return;
      }

      router.push(role === "worker" ? "/dashboard/muncitor" : "/dashboard/client");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setLoading(false);
    }
  }

  async function handleResend() {
    setError(null);
    setInfo(null);
    if (!email) {
      setError("Lipsește emailul.");
      return;
    }
    setResending(true);
    try {
      const supabase = createClient();
      const { error: resendError } = await supabase.auth.resend({
        type: "signup",
        email,
      });
      if (resendError) {
        setError(resendError.message);
      } else {
        setInfo("Ți-am trimis un cod nou pe email.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setResending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!initialEmail && (
        <div>
          <label htmlFor="verify-email" className="mb-1.5 block text-sm font-medium text-slate-700">
            Email
          </label>
          <Input
            id="verify-email"
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </div>
      )}

      <div>
        <label htmlFor="verify-code" className="mb-1.5 block text-sm font-medium text-slate-700">
          Cod de 6 cifre
        </label>
        <Input
          id="verify-code"
          type="text"
          inputMode="numeric"
          pattern="[0-9]{6}"
          maxLength={6}
          placeholder="123456"
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, ""))}
          autoComplete="one-time-code"
          autoFocus
          required
          className="text-center text-2xl font-mono tracking-[0.5em] py-4"
        />
      </div>

      {error && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      )}
      {info && (
        <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{info}</p>
      )}

      <Button type="submit" className="w-full" disabled={loading || code.length !== 6}>
        {loading ? "Se verifică..." : "Confirmă cont"}
      </Button>

      <button
        type="button"
        onClick={handleResend}
        disabled={resending || !email}
        className="w-full text-sm text-slate-600 hover:text-primary-900 disabled:opacity-50"
      >
        {resending ? "Se trimite..." : "Nu ai primit codul? Trimite din nou"}
      </button>
    </form>
  );
}
