'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import StudyTrackerPill from './StudyTrackerPill';
import StudyDashboard from './StudyDashboard';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [dashboardTab, setDashboardTab] = useState<'stats' | 'bookmarks' | 'history' | 'achievements'>('stats');

  const handleOpenDashboard = (tab: 'stats' | 'bookmarks' | 'history' | 'achievements' = 'stats') => {
    setDashboardTab(tab);
    setIsDashboardOpen(true);
  };

  return (
    <>
      <header className="border-b border-[var(--color-rule)] bg-[var(--color-paper)] sticky top-0 z-[var(--z-sticky-nav)] w-full overflow-hidden">
        {/* Top Utility Band */}
        <div className="border-b border-[var(--color-rule)] py-1.5 px-4 sm:px-8 text-xs text-[var(--color-muted)] flex justify-between items-center max-w-[var(--container)] mx-auto font-[family-name:var(--font-display)]">
          <div className="flex items-center gap-2 min-w-0">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-600 animate-pulse shrink-0"></span>
            <span className="truncate text-[11px] sm:text-xs">Federal Board (FBISE) Standard Examination Simulator · 2026 Session</span>
          </div>
          
          {/* Top Utility Right: Theme Toggle & Study Tracker */}
          <div className="shrink-0 ml-2 flex items-center gap-1.5 sm:gap-2">
            <ThemeToggle compact />
            <StudyTrackerPill onOpenDashboard={handleOpenDashboard} />
          </div>
        </div>

        {/* Main Nav */}
        <div className="max-w-[var(--container)] mx-auto px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="group flex items-baseline gap-2">
              <span className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--color-ink)]">
                FBISE<span className="text-emerald-700 dark:text-emerald-400 font-normal">Prep</span>
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700/80 px-1.5 py-0.5 font-bold">
                PORTAL
              </span>
            </Link>
          </div>

          {/* Desktop Class Selector Bar (Hidden on mobile to eliminate horizontal scrolling; mobile users navigate directly on-page or via bottom nav) */}
          <div className="hidden md:flex items-center gap-2 text-sm font-[family-name:var(--font-display)]">
            <Link
              href="/?grade=9"
              className="px-3 py-1.5 min-h-[38px] border border-emerald-700 dark:border-emerald-600/70 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 font-bold text-xs flex items-center gap-1.5 transition-colors whitespace-nowrap active:scale-95"
              title="FBISE Class 9th (SSC-I) Test Series"
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
              <span>Class 9th (SSC-I)</span>
            </Link>
            <Link
              href="/?grade=10"
              className="px-3 py-1.5 min-h-[38px] border border-emerald-700 dark:border-emerald-600/70 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 font-bold text-xs flex items-center gap-1.5 transition-colors whitespace-nowrap active:scale-95"
              title="FBISE Class 10th (SSC-II) Test Series"
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
              <span>Class 10th (SSC-II)</span>
            </Link>
            <Link
              href="/?grade=11"
              className="px-3 py-1.5 min-h-[38px] border border-emerald-700 dark:border-emerald-600/70 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 font-bold text-xs flex items-center gap-1.5 transition-colors whitespace-nowrap active:scale-95"
              title="FBISE Class 11th (HSSC-I) Test Series"
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
              <span>Class 11th (HSSC-I)</span>
            </Link>
            <Link
              href="/?grade=12"
              className="px-3.5 py-1.5 min-h-[38px] border border-purple-900 dark:border-purple-600/70 bg-purple-950 dark:bg-purple-950/60 text-white dark:text-purple-100 hover:bg-purple-900 dark:hover:bg-purple-900/70 font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors whitespace-nowrap active:scale-95"
              title="FBISE Class 12th (HSSC-II) Test Series"
            >
              <BookOpen className="w-3.5 h-3.5 text-purple-300 dark:text-purple-300" />
              <span>Class 12th (HSSC-II)</span>
              <span className="bg-emerald-600 dark:bg-emerald-500 text-white text-[9px] font-mono px-1 py-0.2 font-semibold rounded-sm">NEW</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Persistent Study Dashboard Drawer */}
      <StudyDashboard
        isOpen={isDashboardOpen}
        onClose={() => setIsDashboardOpen(false)}
        initialTab={dashboardTab}
      />
    </>
  );
}
