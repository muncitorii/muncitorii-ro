import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type AuthCardProps = {
  title: string;
  subtitle: string;
  role: "client" | "muncitor";
};

export function AuthCard({ title, subtitle, role }: AuthCardProps) {
  const isWorker = role === "muncitor";

  return (
    <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-card md:p-8">
      <span className="inline-flex rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-900">
        {isWorker ? "Cont muncitor" : "Cont client"}
      </span>
      <h1 className="mt-4 text-3xl font-bold tracking-[-0.025em] text-slate-950">{title}</h1>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{subtitle}</p>

      <form className="mt-6 space-y-4">
        <div>
          <label htmlFor="auth-name" className="mb-1.5 block text-sm font-medium text-slate-700">
            Nume complet
          </label>
          <Input id="auth-name" type="text" placeholder="Ex: Ion Popescu" autoComplete="name" />
        </div>

        <div>
          <label htmlFor="auth-email" className="mb-1.5 block text-sm font-medium text-slate-700">
            Email
          </label>
          <Input id="auth-email" type="email" placeholder="tu@email.com" autoComplete="email" />
        </div>

        <div>
          <label htmlFor="auth-password" className="mb-1.5 block text-sm font-medium text-slate-700">
            Parolă
          </label>
          <Input
            id="auth-password"
            type="password"
            placeholder="Introdu parola"
            autoComplete="new-password"
          />
        </div>

        {isWorker && (
          <>
            <div>
              <label
                htmlFor="auth-trade"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Meserie principală
              </label>
              <Input id="auth-trade" type="text" placeholder="Ex: Electrician" />
            </div>
            <div>
              <label htmlFor="auth-city" className="mb-1.5 block text-sm font-medium text-slate-700">
                Oraș / Județ
              </label>
              <Input id="auth-city" type="text" placeholder="Ex: București" />
            </div>
          </>
        )}

        <Button type="submit" className="w-full">
          Creează cont
        </Button>
      </form>

      <div className="mt-5 text-center text-sm text-slate-600">
        <Link href="/login" className="font-semibold text-primary-900 hover:text-primary-700">
          Ai deja cont? Intră aici
        </Link>
      </div>
    </div>
  );
}
