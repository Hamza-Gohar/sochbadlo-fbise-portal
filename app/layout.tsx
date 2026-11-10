import type { Metadata } from "next";
import { Bricolage_Grotesque, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FBISE Prep Portal | Federal Board Class 9, 10, 11 & 12 Examination Testing Platform",
  description: "Official Federal Board (FBISE) chapter-wise MCQ testing platform, SLO-based practice modules, and timed Section A board exam simulators for Class 9, 10, 11, and 12.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bricolage.variable} ${sourceSerif.variable}`}>
      <body className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)] selection:bg-emerald-100 selection:text-emerald-950 font-[family-name:var(--font-body)]">
        {children}
      </body>
    </html>
  );
}
