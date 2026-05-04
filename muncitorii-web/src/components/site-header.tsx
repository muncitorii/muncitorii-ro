import Link from "next/link";
import { Logo } from "@/components/logo";
import { createClient } from "@/lib/supabase/server";
import { HeaderUserMenu } from "@/components/header-user-menu";

export async function SiteHeader() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const role = (user?.user_metadata?.role as string | undefined) ?? null;
  const fullName = (user?.user_metadata?.full_name as string | undefined) ?? user?.email?.split("@")[0] ?? "";
  const dashboardHref = role === "worker" ? "/dashboard/muncitor" : "/dashboard/client";

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <Link href="/" className="block">
          <Logo size="md" />
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          <Link href="/muncitori" className="transition hover:text-slate-950">
            Caută meseriași
          </Link>
          <Link href="/cum-functioneaza" className="transition hover:text-slate-950">
            Cum funcționează
          </Link>
          {!user && (
            <Link href="/register/muncitor" className="transition hover:text-slate-950">
              Pentru meseriași
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-2">
          {user ? (
            <HeaderUserMenu fullName={fullName} dashboardHref={dashboardHref} />
          ) : (
            <>
              <Link
                href="/login"
                className="hidden rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 sm:inline-flex"
              >
                Intră în cont
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-accent-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-800"
              >
                Cont nou
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
