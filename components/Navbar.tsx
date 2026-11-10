'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import StudyTrackerPill from './StudyTrackerPill';
import StudyDashboard from './StudyDashboard';

export default function Navbar() {
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [dashboardTab, setDashboardTab] = useState<'stats' | 'bookmarks' | 'history' | 'achievements'>('stats');

  const handleOpenDashboard = (tab: 'stats' | 'bookmarks' | 'history' | 'achievements' = 'stats') => {
    setDashboardTab(tab);
    setIsDashboardOpen(true);
  };

  return (
    <>
      <header className="border-b border-[var(--color-rule)] bg-[var(--color-paper)] sticky top-0 z-[var(--z-sticky-nav)]">
        {/* Top Utility Band */}
        <div className="border-b border-[var(--color-rule)] py-1.5 px-4 sm:px-8 text-xs text-[var(--color-muted)] flex justify-between items-center max-w-[var(--container)] mx-auto font-[family-name:var(--font-display)]">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            <span className="truncate">Federal Board (FBISE) Standard Examination Simulator · 2026 Edition</span>
          </div>
          
          {/* Study streak & Focus pill on the top right */}
          <div className="flex items-center gap-2">
            <StudyTrackerPill onOpenDashboard={handleOpenDashboard} />
          </div>
        </div>

        {/* Main Nav */}
        <div className="max-w-[var(--container)] mx-auto px-4 sm:px-8 py-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="group flex items-baseline gap-2">
              <span className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--color-ink)]">
                FBISE<span className="text-emerald-700 font-normal">Prep</span>
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-800 bg-emerald-50 border border-emerald-300 px-1.5 py-0.5 font-bold">
                PORTAL
              </span>
            </Link>

            {/* Mobile trigger for study dashboard */}
            <div className="md:hidden">
              <button
                type="button"
                onClick={() => handleOpenDashboard('stats')}
                className="text-xs font-mono font-bold px-2 py-1 border border-[var(--color-rule-2)] bg-[var(--color-paper-alt)] text-emerald-800"
              >
                My Study Hub
              </button>
            </div>
          </div>

          {/* Class Selector Bar */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 md:pb-0 text-sm font-[family-name:var(--font-display)] -mx-1 px-1">
            <Link
              href="/?grade=9"
              className="px-3 py-1.5 min-h-[38px] border border-emerald-700 bg-emerald-50 text-emerald-950 hover:bg-emerald-100 font-bold text-xs flex items-center gap-1.5 transition-colors whitespace-nowrap active:scale-95"
              title="FBISE Class 9th (SSC-I) Test Series"
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
              <span>Class 9th (SSC-I)</span>
            </Link>
            <Link
              href="/?grade=10"
              className="px-3 py-1.5 min-h-[38px] border border-emerald-700 bg-emerald-50 text-emerald-950 hover:bg-emerald-100 font-bold text-xs flex items-center gap-1.5 transition-colors whitespace-nowrap active:scale-95"
              title="FBISE Class 10th (SSC-II) Test Series"
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
              <span>Class 10th (SSC-II)</span>
            </Link>
            <Link
              href="/?grade=11"
              className="px-3 py-1.5 min-h-[38px] border border-emerald-700 bg-emerald-50 text-emerald-950 hover:bg-emerald-100 font-bold text-xs flex items-center gap-1.5 transition-colors whitespace-nowrap active:scale-95"
              title="FBISE Class 11th (HSSC-I) Test Series"
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
              <span>Class 11th (HSSC-I)</span>
            </Link>
            <Link
              href="/?grade=12"
              className="px-3 py-1.5 min-h-[38px] border border-purple-900 bg-purple-950 text-white hover:bg-purple-900 font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors whitespace-nowrap active:scale-95"
              title="FBISE Class 12th (HSSC-II) Test Series"
            >
              <BookOpen className="w-3.5 h-3.5 text-purple-300" />
              <span>Class 12th (HSSC-II)</span>
              <span className="bg-emerald-600 text-white text-[9px] font-mono px-1 py-0.2 font-semibold rounded-sm">NEW</span>
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
