'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Flame,
  Clock,
  Bookmark,
  Award,
  ArrowRight,
  RotateCcw
} from 'lucide-react';
import { getStudyStats, formatStudyTime, StudyStats, TestAttempt } from '../lib/study-tracker';
import StudyDashboard from './StudyDashboard';
import MobileBottomNav from './MobileBottomNav';

export default function RecentStudyCard() {
  const [stats, setStats] = useState<StudyStats | null>(null);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [dashboardTab, setDashboardTab] = useState<'stats' | 'bookmarks' | 'history' | 'achievements'>('stats');

  const loadStats = () => {
    setStats(getStudyStats());
  };

  useEffect(() => {
    loadStats();
    const handleUpdate = () => loadStats();
    window.addEventListener('fbise-study-updated', handleUpdate);
    return () => window.removeEventListener('fbise-study-updated', handleUpdate);
  }, []);

  const openDashboard = (tab: 'stats' | 'bookmarks' | 'history' | 'achievements' = 'stats') => {
    setDashboardTab(tab);
    setIsDashboardOpen(true);
  };

  if (!stats) return null;

  const hasActivity =
    stats.streak.current > 0 ||
    stats.today.secondsSpent > 0 ||
    stats.lifetime.totalTestsCompleted > 0 ||
    stats.bookmarks.length > 0;

  const lastTest: TestAttempt | undefined = stats.recentTests[0];
  const unlockedBadgesCount = Object.keys(stats.unlockedAchievements).length;

  return (
    <>
      {hasActivity ? (
        <section className="mb-10 border-2 border-emerald-800 dark:border-emerald-700/80 bg-[var(--color-paper-2)] p-4 sm:p-6 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-mono font-bold bg-amber-100 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-700/60">
                  <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-600 dark:text-amber-400" />
                  {stats.streak.current} {stats.streak.current === 1 ? 'Day Streak' : 'Days Streak'}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-mono text-emerald-950 dark:text-emerald-200 bg-emerald-100/80 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700/60">
                  <Clock className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                  Today: {formatStudyTime(stats.today.secondsSpent)}
                </span>
                {stats.bookmarks.length > 0 && (
                  <button
                    type="button"
                    onClick={() => openDashboard('bookmarks')}
                    className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-mono text-emerald-900 dark:text-emerald-200 bg-[var(--color-paper)] border border-emerald-600 dark:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors"
                  >
                    <Bookmark className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400 fill-emerald-700 dark:fill-emerald-400" />
                    <span>{stats.bookmarks.length} Saved MCQs</span>
                  </button>
                )}
                {unlockedBadgesCount > 0 && (
                  <button
                    type="button"
                    onClick={() => openDashboard('achievements')}
                    className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-mono text-purple-900 dark:text-purple-200 bg-purple-50 dark:bg-purple-950/40 border border-purple-300 dark:border-purple-700/60 hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-colors"
                  >
                    <Award className="w-3.5 h-3.5 text-purple-700 dark:text-purple-400" />
                    <span>{unlockedBadgesCount} Badges</span>
                  </button>
                )}
              </div>

              <h2 className="font-[family-name:var(--font-display)] text-xl sm:text-2xl font-bold text-[var(--color-ink)]">
                Welcome back! Ready for today&apos;s board prep?
              </h2>

              {lastTest ? (
                <p className="text-xs sm:text-sm text-[var(--color-ink-2)] font-[family-name:var(--font-body)]">
                  Last studied: <strong className="font-semibold text-[var(--color-ink)]">{lastTest.chapterTitle}</strong> · Scored{' '}
                  <span className="font-mono font-bold text-emerald-800 dark:text-emerald-400">{lastTest.score}/{lastTest.total} ({lastTest.percentage}%)</span>
                </p>
              ) : (
                <p className="text-xs sm:text-sm text-[var(--color-ink-2)] font-[family-name:var(--font-body)]">
                  Select any subject unit below or launch a Section A board exam simulator to build your streak.
                </p>
              )}
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
              {lastTest && (
                <Link
                  href={`/test/${lastTest.slug}`}
                  className="px-4 py-2.5 min-h-[44px] bg-[var(--color-ink)] hover:bg-neutral-800 dark:hover:bg-neutral-200 text-[var(--color-paper)] font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm active:scale-95"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Resume {lastTest.chapterTitle.slice(0, 20)}...</span>
                </Link>
              )}

              <button
                type="button"
                onClick={() => openDashboard('stats')}
                className="px-4 py-2.5 min-h-[44px] border border-emerald-800 dark:border-emerald-600/70 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 text-emerald-950 dark:text-emerald-200 font-bold text-xs flex items-center gap-1.5 transition-colors active:scale-95"
              >
                <span>Open Study Hub</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-800 dark:text-emerald-400" />
              </button>
            </div>
          </div>
        </section>
      ) : null}

      {/* Persistent Mobile Bottom Navigation */}
      <MobileBottomNav onOpenDashboard={openDashboard} />

      {/* Embedded Study Dashboard */}
      <StudyDashboard
        isOpen={isDashboardOpen}
        onClose={() => setIsDashboardOpen(false)}
        initialTab={dashboardTab}
      />
    </>
  );
}
