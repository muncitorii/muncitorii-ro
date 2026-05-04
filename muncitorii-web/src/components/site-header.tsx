import Link from "next/link";
import { Logo } from "@/components/logo";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <Link href="/" className="block">
          <Logo size="md" />
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          <Link href="/muncitori" className="transition hover:text-slate-950">
            Muncitori
          </Link>
          <Link href="/cum-functioneaza" className="transition hover:text-slate-950">
            Cum funcționează
          </Link>
          <Link href="/register/muncitor" className="transition hover:text-slate-950">
            Pentru meseriași
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Intră în cont
          </Link>
          <Link
            href="/register"
            className="rounded-full bg-accent-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-800"
          >
            Creează cont
          </Link>
        </div>
      </div>
    </header>
  );
}
