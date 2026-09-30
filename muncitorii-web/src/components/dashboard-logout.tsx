"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function DashboardLogout() {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="inline-flex items-center gap-1.5 rounded-full border border-white/30 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
    >
      <LogOut size={14} />
      Ieși
    </button>
  );
}
