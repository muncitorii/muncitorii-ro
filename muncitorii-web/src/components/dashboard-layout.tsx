import Link from "next/link";

type NavItem = { label: string; href: string };

type DashboardLayoutProps = {
  role: "client" | "muncitor";
  activeHref: string;
  userName?: string;
  children: React.ReactNode;
};

const clientNav: NavItem[] = [
  { label: "Lucrările mele", href: "/dashboard/client" },
  { label: "Postează lucrare", href: "/lucrari/nou" },
  { label: "Muncitori", href: "/muncitori" },
  { label: "Mesaje", href: "/dashboard/client/mesaje" },
];

const workerNav: NavItem[] = [
  { label: "Dashboard", href: "/dashboard/muncitor" },
  { label: "Lucrări disponibile", href: "/lucrari" },
  { label: "Aplicațiile mele", href: "/dashboard/muncitor/aplicatii" },
  { label: "Mesaje", href: "/dashboard/muncitor/mesaje" },
  { label: "Profilul meu", href: "/dashboard/muncitor/profil" },
];

export function DashboardLayout({
  role,
  activeHref,
  userName = "Utilizator",
  children,
}: DashboardLayoutProps) {
  const nav = role === "client" ? clientNav : workerNav;
  const roleLabel = role === "client" ? "Cont client" : "Cont muncitor";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
          <Link href="/" className="block">
            <p className="text-lg font-extrabold tracking-tight text-blue-700">Muncitorii.ro</p>
          </Link>
          <div className="flex items-center gap-3">
            <div className="hidden text-right md:block">
              <p className="text-sm font-semibold text-slate-900">{userName}</p>
              <p className="text-xs text-slate-500">{roleLabel}</p>
            </div>
            <Link
              href="/login"
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Ieși
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-6 md:px-6 md:py-8">
        <div className="flex gap-6 md:items-start">
          {/* Sidebar — desktop */}
          <aside className="hidden w-52 shrink-0 md:block">
            <div className="rounded-[2rem] bg-white p-3 shadow-sm">
              <div className="mb-3 border-b border-slate-100 px-3 pb-3">
                <p className="text-sm font-semibold text-slate-900">{userName}</p>
                <p className="text-xs text-slate-500">{roleLabel}</p>
              </div>
              <nav className="space-y-1">
                {nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block rounded-2xl px-3 py-2.5 text-sm font-medium transition ${
                      activeHref === item.href
                        ? "bg-blue-600 text-white"
                        : "text-slate-700 hover:bg-slate-50 hover:text-slate-950"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </aside>

          <div className="min-w-0 flex-1">
            {/* Mobile nav */}
            <div className="-mx-1 mb-4 flex gap-2 overflow-x-auto pb-1 md:hidden">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
                    activeHref === item.href
                      ? "bg-blue-600 text-white"
                      : "border border-slate-200 bg-white text-slate-700"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
