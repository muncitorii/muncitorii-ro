import Link from "next/link";
import { redirect } from "next/navigation";
import { Logo } from "@/components/logo";
import { DashboardLogout } from "@/components/dashboard-logout";
import { getCurrentAdmin } from "@/lib/coordonare/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isAdmin, fullName } = await getCurrentAdmin();

  if (!user) redirect("/login?redirectTo=/admin");
  if (!isAdmin) {
    redirect("/login?error=not_admin");
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-20 bg-gradient-to-br from-primary-900 to-primary-950 text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
          <Link href="/admin" className="flex items-center gap-3">
            <Logo size="md" variant="light" />
            <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold text-white/80">
              Admin
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="hidden text-right md:block">
              <p className="text-sm font-semibold text-white">{fullName}</p>
            </div>
            <DashboardLogout />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-6 md:px-6 md:py-8">{children}</div>
    </div>
  );
}
