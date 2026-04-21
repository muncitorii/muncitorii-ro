import { AuthCard } from "@/components/auth-card";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <SiteHeader ctaHref="/register/muncitor" ctaLabel="Cont muncitor" />

      <section className="px-4 py-10 md:px-6 md:py-16">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div>
            <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
              Începe simplu
            </span>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-950 md:text-5xl">
              Creează cont și începe să folosești platforma
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 md:text-lg">
              Ca client poți posta lucrări, primi oferte și alege rapid muncitorul potrivit.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm font-medium">
              <a href="/register/muncitor" className="rounded-full border border-slate-300 px-4 py-2.5 text-slate-700 transition hover:bg-white">
                Ești muncitor? Creează cont aici
              </a>
            </div>
          </div>

          <AuthCard
            role="client"
            title="Creează cont client"
            subtitle="Postează lucrări, compară profile și discută rapid cu muncitori potriviți pentru nevoia ta."
          />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
