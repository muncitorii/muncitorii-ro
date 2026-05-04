"use client";

import { useState, useEffect } from "react";
import { Mail, X, CheckCircle2 } from "lucide-react";

export function ContactButton() {
  const [open, setOpen] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const data = new FormData(e.currentTarget);
    const body = {
      name: data.get("name") as string,
      email: data.get("email") as string,
      subject: data.get("subject") as string,
      message: data.get("message") as string,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const json = (await res.json().catch(() => ({}))) as { error?: string };
        setError(json.error ?? "Eroare la trimitere. Încearcă din nou.");
        setLoading(false);
        return;
      }

      setSuccess(true);
      setLoading(false);
      setTimeout(() => {
        setOpen(false);
        setSuccess(false);
      }, 2500);
    } catch {
      setError("Eroare de conexiune. Încearcă din nou.");
      setLoading(false);
    }
  }

  return (
    <>
      {/* Floating button + tooltip */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
        {tooltipOpen && !open && (
          <div className="relative flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-lg">
            <button
              onClick={() => setTooltipOpen(false)}
              className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 text-slate-500 hover:bg-slate-300"
              aria-label="Închide"
            >
              <X size={10} strokeWidth={2.5} />
            </button>
            <p className="max-w-[200px] text-xs font-medium text-slate-700">
              Ai întrebări sau feedback? Scrie-ne — răspundem rapid.
            </p>
          </div>
        )}

        <button
          onClick={() => {
            setOpen(true);
            setTooltipOpen(false);
          }}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-900 shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95"
          aria-label="Contactează-ne"
        >
          <Mail size={24} strokeWidth={2} className="text-white" />
        </button>
      </div>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
                  Scrie-ne
                </span>
                <h2 className="mt-3 text-2xl font-bold tracking-[-0.015em] text-slate-950">
                  Contact rapid
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Trimitem mesajul direct la <strong>contact@muncitorii.ro</strong>. Răspundem în aceeași zi.
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200"
                aria-label="Închide"
              >
                <X size={16} />
              </button>
            </div>

            {success ? (
              <div className="mt-6 flex flex-col items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
                <CheckCircle2 size={36} className="text-emerald-600" strokeWidth={1.75} />
                <p className="font-semibold text-emerald-800">Mesajul a fost trimis!</p>
                <p className="text-sm text-emerald-700">Îți răspundem cât mai curând.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Nume *</label>
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="Numele tău"
                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-primary-700 focus:ring-2 focus:ring-primary-700/15"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Email *</label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="tu@email.com"
                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-primary-700 focus:ring-2 focus:ring-primary-700/15"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Subiect <span className="text-slate-400">(opțional)</span>
                  </label>
                  <input
                    name="subject"
                    type="text"
                    placeholder="Despre ce vrei să ne scrii?"
                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-primary-700 focus:ring-2 focus:ring-primary-700/15"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Mesaj *</label>
                  <textarea
                    name="message"
                    required
                    minLength={10}
                    rows={4}
                    placeholder="Spune-ne pe scurt..."
                    className="w-full resize-none rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-primary-700 focus:ring-2 focus:ring-primary-700/15"
                  />
                </div>

                {error && (
                  <p className="rounded-xl bg-red-50 px-4 py-2.5 text-sm text-red-700">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-2xl bg-primary-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-700 disabled:opacity-60"
                >
                  {loading ? "Se trimite..." : "Trimite mesaj"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
