"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("cookie-consent")) {
      setVisible(true);
    }
  }, []);

  function accept() {
    localStorage.setItem("cookie-consent", "1");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white px-4 py-4 shadow-card md:px-6">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-600">
          Folosim cookie-uri esențiale pentru funcționarea platformei.{" "}
          <Link
            href="/politica-confidentialitate"
            className="font-semibold text-primary-900 hover:text-primary-700"
          >
            Detalii
          </Link>
        </p>
        <button
          onClick={accept}
          className="shrink-0 rounded-full bg-primary-900 px-5 py-2 text-sm font-semibold text-white transition-all duration-200 ease-out hover:bg-primary-700"
        >
          Acceptă
        </button>
      </div>
    </div>
  );
}
