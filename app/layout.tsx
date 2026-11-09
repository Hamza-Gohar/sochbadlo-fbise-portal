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
  title: "SochBadlo Prep | FBISE Class 9, 10, 11, 12 Exam Practice & MCQ Portal",
  description: "Official FBISE chapter-wise MCQ practice and timed exam simulator for Class 11 Physics and board exams. Developed by Soch Badlo By MAK.",
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
