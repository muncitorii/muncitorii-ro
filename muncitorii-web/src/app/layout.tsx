import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CookieBanner } from "@/components/cookie-banner";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://muncitorii.ro"),
  title: "Muncitorii.ro — Meseriași verificați din România",
  description:
    "Găsește meseriași verificați din România. Compară profiluri, citește recenzii și alege direct.",
  openGraph: {
    type: "website",
    locale: "ro_RO",
    siteName: "Muncitorii.ro",
    title: "Muncitorii.ro — Meseriași verificați din România",
    description:
      "Găsește meseriași verificați din România. Compară profiluri, citește recenzii și alege direct.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muncitorii.ro — Meseriași verificați din România",
    description: "Găsește meseriași verificați din România.",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
