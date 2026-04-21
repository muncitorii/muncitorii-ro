export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 px-4 py-6 text-sm text-slate-500 md:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold text-slate-800">Muncitorii.ro</p>
          <p>Platformă pentru lucrări și servicii locale în România.</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <a href="/despre" className="hover:text-slate-800">
            Despre noi
          </a>
          <a href="/cum-functioneaza" className="hover:text-slate-800">
            Cum funcționează
          </a>
          <a href="/contact" className="hover:text-slate-800">
            Contact
          </a>
          <a href="/termeni" className="hover:text-slate-800">
            Termeni
          </a>
        </div>
      </div>
    </footer>
  );
}
