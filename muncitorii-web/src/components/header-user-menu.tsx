"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { LogOut, LayoutDashboard, ChevronDown } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Props = {
  fullName: string;
  dashboardHref: string;
};

export function HeaderUserMenu({ fullName, dashboardHref }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  const initial = fullName.charAt(0).toUpperCase() || "U";
  const displayName = fullName.length > 18 ? fullName.slice(0, 18) + "…" : fullName;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-2 py-1.5 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-900 text-xs font-bold text-white">
          {initial}
        </span>
        <span className="hidden sm:inline">{displayName}</span>
        <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-52 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card-hover">
          <Link
            href={dashboardHref}
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            <LayoutDashboard size={16} />
            Dashboard
          </Link>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-2.5 border-t border-slate-100 px-4 py-3 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
          >
            <LogOut size={16} />
            Ieși din cont
          </button>
        </div>
      )}
    </div>
  );
}
