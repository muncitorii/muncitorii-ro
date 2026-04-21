import { DashboardLayout } from "@/components/dashboard-layout";

const categories = [
  "Electrician",
  "Instalator",
  "Zugrav",
  "Dulgher",
  "Curățenie",
  "Mutări",
  "IT",
  "Grădinărit",
  "Altele",
];

export default function NewJobPage() {
  return (
    <DashboardLayout role="client" activeHref="/lucrari/nou" userName="Andreea">
      <div className="max-w-2xl">
        <div className="rounded-[2rem] bg-white p-6 shadow-sm md:p-8">
          <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
            Cerere nouă
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950">
            Postează o lucrare
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Descrie lucrarea și primești oferte de la muncitori potriviți din zona ta.
          </p>

          <form className="mt-6 space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Titlul lucrării
              </label>
              <input
                type="text"
                placeholder="Ex: Zugrăvit living și dormitor"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Descriere</label>
              <textarea
                rows={4}
                placeholder="Descrie ce ai nevoie: suprafață, materiale, detalii importante..."
                className="w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-blue-500"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Categorie</label>
                <select className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500">
                  <option value="">Alege categoria</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Locație</label>
                <input
                  type="text"
                  placeholder="Ex: București, Sector 3"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Buget estimat (lei)
                </label>
                <input
                  type="text"
                  placeholder="Ex: 500–1000"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Termen dorit
                </label>
                <input
                  type="date"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-slate-700">Tip publicare</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="flex cursor-pointer gap-3 rounded-2xl border border-blue-500 bg-blue-50 p-4">
                  <input
                    type="radio"
                    name="type"
                    value="public"
                    defaultChecked
                    className="mt-0.5 accent-blue-600"
                  />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Cerere publică</p>
                    <p className="text-xs text-slate-500">Orice muncitor potrivit poate aplica</p>
                  </div>
                </label>
                <label className="flex cursor-pointer gap-3 rounded-2xl border border-slate-200 p-4">
                  <input
                    type="radio"
                    name="type"
                    value="direct"
                    className="mt-0.5 accent-blue-600"
                  />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Invitație directă</p>
                    <p className="text-xs text-slate-500">Alege tu muncitorul și trimite-i invitație</p>
                  </div>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Publică lucrarea
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
