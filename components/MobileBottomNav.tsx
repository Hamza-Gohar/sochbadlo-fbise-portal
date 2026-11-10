'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Home, Flame, Bookmark, Award } from 'lucide-react';
import { getStudyStats, StudyStats } from '../lib/study-tracker';

interface MobileBottomNavProps {
  onOpenDashboard: (tab: 'stats' | 'bookmarks' | 'history' | 'achievements') => void;
}

export default function MobileBottomNav({ onOpenDashboard }: MobileBottomNavProps) {
  const [stats, setStats] = useState<StudyStats | null>(null);

  const loadStats = () => {
    setStats(getStudyStats());
  };

  useEffect(() => {
    loadStats();
    const handleUpdate = () => loadStats();
    window.addEventListener('fbise-study-updated', handleUpdate);
    return () => window.removeEventListener('fbise-study-updated', handleUpdate);
  }, []);

  const streak = stats?.streak?.current || 0;
  const bookmarkCount = stats?.bookmarks?.length || 0;
  const unlockedCount = Object.keys(stats?.unlockedAchievements || {}).length;

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[var(--color-paper)]/95 backdrop-blur-md border-t border-[var(--color-rule)] shadow-lg transition-transform"
      style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 0.5rem)' }}
      aria-label="Mobile Navigation"
    >
      <div className="grid grid-cols-4 items-center justify-around px-2 pt-1.5">
        {/* Curriculum Home */}
        <Link
          href="/"
          className="flex flex-col items-center justify-center min-h-[48px] py-1 text-xs font-mono text-[var(--color-muted)] hover:text-emerald-800 transition-colors active:scale-95"
        >
          <Home className="w-5 h-5 text-emerald-800 mb-0.5" />
          <span className="text-[11px] font-sans font-medium">Curriculum</span>
        </Link>

        {/* Streak & Focus */}
        <button
          type="button"
          onClick={() => onOpenDashboard('stats')}
          className="flex flex-col items-center justify-center min-h-[48px] py-1 text-xs font-mono text-[var(--color-muted)] hover:text-amber-800 transition-colors active:scale-95"
        >
          <div className="relative">
            <Flame className="w-5 h-5 text-amber-600 fill-amber-500 mb-0.5" />
            {streak > 0 && (
              <span className="absolute -top-1 -right-2 bg-amber-600 text-white text-[9px] font-bold px-1 rounded-full">
                {streak}
              </span>
            )}
          </div>
          <span className="text-[11px] font-sans font-medium">Streak</span>
        </button>

        {/* Saved MCQs */}
        <button
          type="button"
          onClick={() => onOpenDashboard('bookmarks')}
          className="flex flex-col items-center justify-center min-h-[48px] py-1 text-xs font-mono text-[var(--color-muted)] hover:text-emerald-800 transition-colors active:scale-95"
        >
          <div className="relative">
            <Bookmark className="w-5 h-5 text-emerald-700 mb-0.5" />
            {bookmarkCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-emerald-700 text-white text-[9px] font-bold px-1 rounded-full">
                {bookmarkCount}
              </span>
            )}
          </div>
          <span className="text-[11px] font-sans font-medium">Saved ({bookmarkCount})</span>
        </button>

        {/* Milestones & Badges */}
        <button
          type="button"
          onClick={() => onOpenDashboard('achievements')}
          className="flex flex-col items-center justify-center min-h-[48px] py-1 text-xs font-mono text-[var(--color-muted)] hover:text-purple-800 transition-colors active:scale-95"
        >
          <div className="relative">
            <Award className="w-5 h-5 text-purple-700 mb-0.5" />
            {unlockedCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-purple-700 text-white text-[9px] font-bold px-1 rounded-full">
                {unlockedCount}
              </span>
            )}
          </div>
          <span className="text-[11px] font-sans font-medium">Badges</span>
        </button>
      </div>
    </nav>
  );
}
