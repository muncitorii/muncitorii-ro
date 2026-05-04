"use client";

import { MessageCircle, X } from "lucide-react";
import { useState } from "react";

const WA_NUMBER = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "40712345678").replace(/^\+/, "");
const WA_MESSAGE = encodeURIComponent(
  "Bună! Am o întrebare despre Muncitorii.ro."
);
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;

export function WhatsAppButton() {
  const [tooltipOpen, setTooltipOpen] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {tooltipOpen && (
        <div className="relative flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-lg">
          <button
            onClick={() => setTooltipOpen(false)}
            className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 text-slate-500 hover:bg-slate-300"
            aria-label="Închide"
          >
            <X size={10} strokeWidth={2.5} />
          </button>
          <p className="max-w-[180px] text-xs font-medium text-slate-700">
            Ai întrebări? Scrie-ne pe WhatsApp — răspundem rapid.
          </p>
        </div>
      )}

      <a
        href={WA_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95"
        aria-label="Contactează-ne pe WhatsApp"
        onClick={() => setTooltipOpen(false)}
      >
        <MessageCircle size={26} strokeWidth={2} className="text-white" />
      </a>
    </div>
  );
}
