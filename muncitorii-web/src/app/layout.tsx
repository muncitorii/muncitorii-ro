import type { Metadata, Viewport } from "next";
import { Fraunces, Inter_Tight } from "next/font/google";
import { CookieBanner } from "@/components/cookie-banner";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter-tight",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://muncitorii.ro"),
  title: "Muncitorii.ro — Liviu îți coordonează renovarea, în Iași",
  description:
    "Renovezi baia sau apartamentul și nu vrei meseriaș dispărut și factură dublă. Îți scriu ce trebuie făcut, aduc 2–3 oferte pe același format, țin șantierul pe etape.",
  openGraph: {
    type: "website",
    locale: "ro_RO",
    siteName: "Muncitorii.ro",
    title: "Muncitorii.ro — Liviu îți coordonează renovarea, în Iași",
    description:
      "Îți scriu ce trebuie făcut, aduc 2–3 oferte pe același format, țin șantierul pe etape.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muncitorii.ro — Liviu îți coordonează renovarea, în Iași",
    description: "Îți scriu ce trebuie făcut, aduc 2–3 oferte pe același format, țin șantierul pe etape.",
  },
};

export const viewport: Viewport = {
  themeColor: "#1e3a8a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ro"
      className={`${fraunces.variable} ${interTight.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
