import { DashboardLayout } from "@/components/dashboard-layout";
import { Card } from "@/components/ui/card";
import { WorkerProfileForm } from "@/components/worker-profile-form";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

type WorkerRow = {
  id: string;
  slug: string;
  name: string;
  trade: string;
  trade_slug: string;
  city: string;
  county: string;
  bio: string;
  experience_years: number;
  response_time: string;
  availability: string;
  hourly_rate_min: number | null;
  hourly_rate_max: number | null;
  phone: string | null;
};

export default async function WorkerProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const fullName =
    (user.user_metadata?.full_name as string | undefined) ??
    user.email?.split("@")[0] ??
    "Utilizator";

  const { data } = await supabase
    .from("workers")
    .select(
      "id, slug, name, trade, trade_slug, city, county, bio, experience_years, response_time, availability, hourly_rate_min, hourly_rate_max, phone",
    )
    .eq("user_id", user.id)
    .maybeSingle();

  const worker = data as WorkerRow | null;

  return (
    <DashboardLayout
      role="muncitor"
      activeHref="/dashboard/muncitor/profil"
      userName={fullName}
    >
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold tracking-[-0.025em] text-slate-950">Profilul tău</h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          Completează cât mai multe detalii — meseriași cu profil complet primesc cu 3x mai multe
          cereri.
        </p>

        <Card className="mt-6">
          {worker ? (
            <WorkerProfileForm worker={worker} />
          ) : (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-center">
              <p className="font-semibold text-amber-900">Profilul tău nu e configurat încă</p>
              <p className="mt-2 text-sm text-amber-800">
                Pare că nu ai un profil de meseriaș activ. Contactează-ne dacă ai înregistrat un cont
                de meseriaș dar nu apare aici.
              </p>
            </div>
          )}
        </Card>

        {worker && (
          <div className="mt-4 rounded-2xl bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-700">Profilul tău public</p>
            <p className="mt-1 text-sm text-slate-500">
              Așa te văd clienții care te caută:{" "}
              <a
                href={`/muncitori/${worker.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary-900 hover:text-primary-700"
              >
                muncitorii.ro/muncitori/{worker.slug}
              </a>
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
