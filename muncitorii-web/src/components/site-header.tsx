import Link from "next/link";

type SiteHeaderProps = {
  ctaHref?: string;
  ctaLabel?: string;
};

export function SiteHeader({
  ctaHref = "/register",
  ctaLabel = "Creează cont",
}: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <Link href="/" className="block">
          <p className="text-lg font-extrabold tracking-tight text-blue-700">
            Muncitorii.ro
          </p>
          <p className="text-xs text-slate-500">Meseriași pentru orice lucrare</p>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          <Link href="/cum-functioneaza" className="transition hover:text-slate-950">
            Cum funcționează
          </Link>
          <Link href="/muncitori" className="transition hover:text-slate-950">
            Muncitori
          </Link>
          <Link href="/login" className="transition hover:text-slate-950">
            Login
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Login
          </Link>
          <Link
            href={ctaHref}
            className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </header>
  );
}
