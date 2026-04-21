import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Muncitorii.ro",
  description: "Platformă pentru lucrări și servicii locale în România.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
