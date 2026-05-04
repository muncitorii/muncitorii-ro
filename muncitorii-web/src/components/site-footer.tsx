import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white px-4 py-8 text-sm text-slate-500 md:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold text-slate-800">Muncitorii.ro</p>
          <p className="mt-1">Platformă pentru lucrări și servicii locale din România.</p>
        </div>
        <nav className="flex flex-wrap gap-x-5 gap-y-2">
          <Link href="/despre" className="hover:text-slate-800 transition">
            Despre noi
          </Link>
          <Link href="/cum-functioneaza" className="hover:text-slate-800 transition">
            Cum funcționează
          </Link>
          <Link href="/contact" className="hover:text-slate-800 transition">
            Contact
          </Link>
          <Link href="/termeni" className="hover:text-slate-800 transition">
            Termeni
          </Link>
          <Link href="/politica-confidentialitate" className="hover:text-slate-800 transition">
            Confidențialitate
          </Link>
        </nav>
      </div>
      <div className="mx-auto mt-6 max-w-6xl border-t border-slate-100 pt-4 text-xs text-slate-400">
        © {new Date().getFullYear()} Muncitorii.ro. Toate drepturile rezervate.
      </div>
    </footer>
  );
}
