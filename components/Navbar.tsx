'use client';

import React from 'react';
import Link from 'next/link';
import { ExternalLink, BookOpen } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="border-b border-[var(--color-rule)] bg-[var(--color-paper)] sticky top-0 z-[var(--z-sticky-nav)]">
      {/* Top Utility Band */}
      <div className="border-b border-[var(--color-rule)] py-1.5 px-4 sm:px-8 text-xs text-[var(--color-muted)] flex justify-between items-center max-w-[var(--container)] mx-auto font-[family-name:var(--font-display)]">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
          <span>Federal Board (FBISE) Examination Curriculum · 2026 Edition</span>
        </div>
        <a
          href="https://sochbadlobymak.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[var(--color-ink)] flex items-center gap-1 transition-colors underline underline-offset-2"
        >
          <span>Main Portal: SochBadloByMAK.com</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Main Nav */}
      <div className="max-w-[var(--container)] mx-auto px-4 sm:px-8 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="group flex items-baseline gap-2">
            <span className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--color-ink)]">
              SochBadlo<span className="text-emerald-700 font-normal">Prep</span>
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-muted)] border border-[var(--color-rule-2)] px-1.5 py-0.5">
              FBISE
            </span>
          </Link>
        </div>

        {/* Class Selector Bar */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-1 md:pb-0 text-sm font-[family-name:var(--font-display)]">
          <Link
            href="/?grade=9"
            className="px-3 py-1.5 border border-emerald-700 bg-emerald-50 text-emerald-900 hover:bg-emerald-100 font-bold text-xs flex items-center gap-1.5 transition-colors"
            title="FBISE Class 9th (SSC-I) Mathematics & Physics Test Series"
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
            <span>Class 9th (SSC-I)</span>
            <span className="bg-emerald-800 text-white text-[9px] font-mono px-1 py-0.2 font-semibold">NEW</span>
          </Link>
          <button
            type="button"
            disabled
            className="px-3 py-1.5 border border-[var(--color-rule)] text-[var(--color-muted)] cursor-not-allowed opacity-60 text-xs"
            title="Class 10th tests coming soon"
          >
            Class 10th <span className="text-[10px] opacity-75">(Soon)</span>
          </button>
          <Link
            href="/?grade=11"
            className="px-3.5 py-1.5 bg-[var(--color-ink)] text-[var(--color-paper)] hover:bg-neutral-800 font-medium text-xs flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Class 11th (HSSC-I)</span>
          </Link>
          <button
            type="button"
            disabled
            className="px-3 py-1.5 border border-[var(--color-rule)] text-[var(--color-muted)] cursor-not-allowed opacity-60 text-xs"
            title="Class 12th tests coming soon"
          >
            Class 12th <span className="text-[10px] opacity-75">(Soon)</span>
          </button>
        </div>
      </div>
    </header>
  );
}
