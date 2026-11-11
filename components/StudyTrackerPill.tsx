'use client';

import React from 'react';
import { Flame, Clock, Bookmark, Sparkles } from 'lucide-react';
import { formatStudyTime } from '../lib/study-tracker';
import { usePortal, DashboardTab } from '../contexts/PortalContext';

interface StudyTrackerPillProps {
  onOpenDashboard?: (tab?: DashboardTab) => void;
  className?: string;
}

export default function StudyTrackerPill({ onOpenDashboard, className = '' }: StudyTrackerPillProps) {
  const { streak, todaySeconds, bookmarkCount, hasNewAchievement, openDashboard } = usePortal();
  const handleOpen = onOpenDashboard || openDashboard;

  return (
    <div className={`flex items-center gap-1.5 sm:gap-2 ${className}`}>
      {/* Streak & Today Focus Pill */}
      <button
        type="button"
        onClick={() => handleOpen('stats')}
        className="group flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-sm border border-[var(--color-rule-2)] bg-[var(--color-paper-alt)] hover:bg-[var(--color-paper)] hover:border-emerald-700 transition-colors text-xs font-mono"
        title="View Daily Study Streak & Stats"
        aria-label="Daily Study Streak and Progress"
      >
        <div className="flex items-center gap-1 text-amber-700 font-bold">
          <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-600 animate-pulse" />
          <span>{streak} {streak === 1 ? 'day' : 'days'}</span>
        </div>
        <span className="text-[var(--color-rule-2)]">|</span>
        <div className="flex items-center gap-1 text-[var(--color-muted)] group-hover:text-[var(--color-ink)] transition-colors">
          <Clock className="w-3 h-3" />
          <span>{formatStudyTime(todaySeconds)}</span>
        </div>
        {hasNewAchievement && (
          <span className="flex items-center gap-0.5 px-1 py-0.2 bg-amber-100 text-amber-800 text-[10px] font-bold rounded-sm animate-bounce">
            <Sparkles className="w-2.5 h-2.5 text-amber-600" />
            <span>Badge!</span>
          </span>
        )}
      </button>

      {/* Bookmarks quick button */}
      <button
        type="button"
        onClick={() => handleOpen('bookmarks')}
        className="relative flex items-center justify-center p-1.5 sm:px-2.5 sm:py-1.5 rounded-sm border border-[var(--color-rule-2)] bg-[var(--color-paper-alt)] hover:bg-[var(--color-paper)] hover:border-emerald-700 transition-colors text-xs font-mono text-[var(--color-muted)] hover:text-emerald-800"
        title="View Saved Questions for Revision"
        aria-label="Saved Revision Questions"
      >
        <Bookmark className="w-3.5 h-3.5 text-emerald-700" />
        <span className="hidden sm:inline ml-1 font-bold text-emerald-900">{bookmarkCount}</span>
        {bookmarkCount > 0 && (
          <span className="sm:hidden absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-700 text-white text-[9px] flex items-center justify-center font-bold">
            {bookmarkCount > 9 ? '9+' : bookmarkCount}
          </span>
        )}
      </button>
    </div>
  );
}
