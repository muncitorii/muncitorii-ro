import { DashboardLayout } from "@/components/dashboard-layout";
import { Card } from "@/components/ui/card";
import { NewJobForm } from "@/components/new-job-form";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function NewJobPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login?redirectTo=/lucrari/nou");

  const fullName =
    (user.user_metadata?.full_name as string | undefined) ??
    user.email?.split("@")[0] ??
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

          <NewJobForm />
        </Card>
      </div>
    </DashboardLayout>
  );
}
