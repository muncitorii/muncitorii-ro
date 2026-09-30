import type { Metadata, Viewport } from "next";
import { Geist, IBM_Plex_Mono } from "next/font/google";
import { CookieBanner } from "@/components/cookie-banner";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://muncitorii.ro"),
  title: "Muncitorii.ro — Renovări coordonate, cu dovadă",
  description:
    "Coordonăm renovarea ta în Brașov: lucrare clară, ofertă clară, dovadă clară. Descrii lucrarea, primești caiet de sarcini și oferte comparabile, urmărești etapele cu poze înainte/după.",
  openGraph: {
    type: "website",
    locale: "ro_RO",
    siteName: "Muncitorii.ro",
    title: "Muncitorii.ro — Renovări coordonate, cu dovadă",
    description:
      "Coordonăm renovarea ta în Brașov: lucrare clară, ofertă clară, dovadă clară.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muncitorii.ro — Renovări coordonate, cu dovadă",
    description: "Coordonăm renovarea ta în Brașov: lucrare clară, ofertă clară, dovadă clară.",
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
      className={`${geistSans.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
