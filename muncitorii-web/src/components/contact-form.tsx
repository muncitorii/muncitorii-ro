"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = e.currentTarget;
    const data = new FormData(form);
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
      form.reset();
    } catch {
      setError("Eroare de conexiune. Încearcă din nou.");
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="mt-6 flex flex-col items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <CheckCircle2 size={40} className="text-emerald-600" strokeWidth={1.75} />
        <p className="text-lg font-semibold text-emerald-800">Mesajul a fost trimis!</p>
        <p className="text-sm text-emerald-700">Îți răspundem în aceeași zi.</p>
        <button
          onClick={() => setSuccess(false)}
          className="mt-2 rounded-full border border-emerald-300 bg-white px-4 py-2 text-xs font-semibold text-emerald-800 hover:bg-emerald-50"
        >
          Trimite alt mesaj
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Nume *</label>
          <input
            name="name"
            type="text"
            required
            placeholder="Numele tău"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-primary-700 focus:bg-white focus:ring-2 focus:ring-primary-700/15"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Email *</label>
          <input
            name="email"
            type="email"
            required
            placeholder="tu@email.com"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-primary-700 focus:bg-white focus:ring-2 focus:ring-primary-700/15"
          />
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">
          Subiect <span className="text-slate-400">(opțional)</span>
        </label>
        <input
          name="subject"
          type="text"
          placeholder="Despre ce vrei să ne scrii?"
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-primary-700 focus:bg-white focus:ring-2 focus:ring-primary-700/15"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">Mesaj *</label>
        <textarea
          name="message"
          required
          minLength={10}
          rows={5}
          placeholder="Scrie mesajul tău..."
          className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-primary-700 focus:bg-white focus:ring-2 focus:ring-primary-700/15"
        />
      </div>

      {error && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="rounded-2xl bg-primary-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-700 disabled:opacity-60"
      >
        {loading ? "Se trimite..." : "Trimite mesaj"}
      </button>
    </form>
  );
}
