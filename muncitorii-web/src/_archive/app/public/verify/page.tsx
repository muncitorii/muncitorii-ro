import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { VerifyOtpForm } from "@/components/verify-otp-form";

export const metadata: Metadata = {
  title: "Confirmă-ți contul | Muncitorii.ro",
  description:
    "Introdu codul de 6 cifre primit pe email ca să-ți activezi contul Muncitorii.ro.",
};

type SearchParams = Promise<{ email?: string; role?: string }>;

export default async function VerifyPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { email, role } = await searchParams;

  const normalizedRole: "client" | "worker" =
    role === "worker" ? "worker" : "client";

  return (
    <section className="px-4 py-12 md:px-6 md:py-20">
      <div className="mx-auto max-w-md">
        <Link
          href="/register"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 transition hover:text-slate-950"
        >
          <ArrowLeft size={16} />
          Înapoi la înregistrare
        </Link>

        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-card md:p-8">
          <span className="inline-flex rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-900">
            Confirmă-ți contul
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-[-0.025em] text-slate-950">
            Introdu codul primit pe email
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Ți-am trimis un cod de 6 cifre{email ? <> la <strong className="text-slate-900">{email}</strong></> : null}.
            Verifică inbox-ul (și folder-ul spam) și scrie codul mai jos.
          </p>

          <div className="mt-6">
            <VerifyOtpForm email={email ?? ""} role={normalizedRole} />
          </div>

          <p className="mt-6 text-center text-xs text-slate-500">
            Codul expiră în 60 de minute.
          </p>
        </div>
      </div>
    </section>
  );
}
