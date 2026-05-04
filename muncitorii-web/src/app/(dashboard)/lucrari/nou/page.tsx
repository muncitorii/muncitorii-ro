import { DashboardLayout } from "@/components/dashboard-layout";
import { Card } from "@/components/ui/card";
import { categories } from "@/lib/categories";
import { createClient } from "@/lib/supabase/server";

export default async function NewJobPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const fullName =
    (user?.user_metadata?.full_name as string | undefined) ??
    user?.email?.split("@")[0] ??
    "Utilizator";

  return (
    <DashboardLayout role="client" activeHref="/lucrari/nou" userName={fullName}>
      <div className="max-w-2xl">
        <Card>
          <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
            Cerere nouă
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-[-0.025em] text-slate-950">
            Postează o lucrare
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Descrie lucrarea și primești oferte de la meseriași potriviți din zona ta.
          </p>

          <form className="mt-6 space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Titlul lucrării
              </label>
              <input
                type="text"
                placeholder="Ex: Zugrăvit living și dormitor"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Descriere</label>
              <textarea
                rows={4}
                placeholder="Descrie ce ai nevoie: suprafață, materiale, detalii importante..."
                className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Categorie</label>
                <select className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20">
                  <option value="">Alege categoria</option>
                  {categories.map(({ slug, name }) => (
                    <option key={slug} value={slug}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Locație</label>
                <input
                  type="text"
                  placeholder="Ex: București, Sector 3"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
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
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Termen dorit
                </label>
                <input
                  type="date"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                />
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-slate-700">Tip de publicare</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="flex cursor-pointer gap-3 rounded-2xl border border-primary-500 bg-primary-50 p-4">
                  <input
                    type="radio"
                    name="type"
                    value="public"
                    defaultChecked
                    className="mt-0.5 accent-primary-900"
                  />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Cerere publică</p>
                    <p className="text-xs text-slate-500">Orice meseriaș potrivit poate aplica</p>
                  </div>
                </label>
                <label className="flex cursor-pointer gap-3 rounded-2xl border border-slate-200 p-4">
                  <input
                    type="radio"
                    name="type"
                    value="direct"
                    className="mt-0.5 accent-primary-900"
                  />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Invitație directă</p>
                    <p className="text-xs text-slate-500">Alegi tu meseriașul</p>
                  </div>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-2xl bg-primary-900 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 ease-out hover:bg-primary-700"
            >
              Publică lucrarea
            </button>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
}
