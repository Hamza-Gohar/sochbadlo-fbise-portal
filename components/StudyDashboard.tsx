'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  X,
  Flame,
  CheckCircle2,
  Bookmark,
  Award,
  History,
  TrendingUp,
  Trash2,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import {
  StudyStats,
  getStudyStats,
  removeBookmark,
  formatStudyTime,
  ALL_ACHIEVEMENTS
} from '../lib/study-tracker';

interface StudyDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'stats' | 'bookmarks' | 'history' | 'achievements';
}

export default function StudyDashboard({
  isOpen,
  onClose,
  initialTab = 'stats',
}: StudyDashboardProps) {
  const [activeTab, setActiveTab] = useState<'stats' | 'bookmarks' | 'history' | 'achievements'>(initialTab);
  const [stats, setStats] = useState<StudyStats | null>(null);
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('all');

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const loadStats = () => {
    setStats(getStudyStats());
  };

  useEffect(() => {
    if (isOpen) {
      loadStats();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleUpdate = () => {
      loadStats();
    };
    window.addEventListener('fbise-study-updated', handleUpdate);
    return () => window.removeEventListener('fbise-study-updated', handleUpdate);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentStats = stats || getStudyStats();
  const accuracy =
    currentStats.lifetime.totalQuestionsAnswered > 0
      ? Math.round(
          (currentStats.lifetime.totalCorrectAnswers / currentStats.lifetime.totalQuestionsAnswered) * 100
        )
      : 0;

  // Filter bookmarks
  const filteredBookmarks =
    selectedSubjectFilter === 'all'
      ? currentStats.bookmarks
      : currentStats.bookmarks.filter((b) => (b.subject || 'general') === selectedSubjectFilter);

  // Unique subjects in bookmarks
  const bookmarkSubjects = Array.from(
    new Set(currentStats.bookmarks.map((b) => b.subject || 'general'))
  );

  // Generate 7-day streak pills
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    return {
      dateKey: key,
      dayName: dayNames[d.getDay()],
      isToday: i === 6,
      isActive: currentStats.streak.activeDates.includes(key),
    };
  });

  return (
    <div className="fixed inset-0 z-[var(--z-modal)] flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[var(--color-paper)] h-full overflow-y-auto border-l border-[var(--color-rule-2)] flex flex-col justify-between shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-[var(--color-paper)] border-b border-[var(--color-rule)] px-5 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--color-ink)] leading-tight">
                Study & Progress Dashboard
              </h2>
              <span className="text-xs text-[var(--color-muted)] font-mono">
                Persistent local storage · Stored in your browser
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 border border-[var(--color-rule-2)] hover:border-[var(--color-ink)] transition-colors text-[var(--color-ink)]"
            aria-label="Close Dashboard"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation (Responsive 2x2 grid on mobile, 4-col on desktop - ZERO horizontal scrolling) */}
        <div className="border-b border-[var(--color-rule)] px-3 sm:px-5 pt-2 bg-[var(--color-paper-2)] grid grid-cols-2 sm:grid-cols-4 gap-1 text-xs font-[family-name:var(--font-display)]">
          <button
            onClick={() => setActiveTab('stats')}
            className={`px-2.5 py-2 min-h-[44px] font-bold border-b-2 flex items-center justify-center gap-1.5 transition-colors ${
              activeTab === 'stats'
                ? 'border-emerald-700 dark:border-emerald-400 text-emerald-900 dark:text-emerald-300 bg-[var(--color-paper)]'
                : 'border-transparent text-[var(--color-muted)] hover:text-[var(--color-ink)]'
            }`}
          >
            <Flame className="w-4 h-4 text-orange-600 dark:text-orange-400 shrink-0" />
            <span className="truncate">Streaks & Stats</span>
          </button>

          <button
            onClick={() => setActiveTab('bookmarks')}
            className={`px-2.5 py-2 min-h-[44px] font-bold border-b-2 flex items-center justify-center gap-1.5 transition-colors ${
              activeTab === 'bookmarks'
                ? 'border-emerald-700 dark:border-emerald-400 text-emerald-900 dark:text-emerald-300 bg-[var(--color-paper)]'
                : 'border-transparent text-[var(--color-muted)] hover:text-[var(--color-ink)]'
            }`}
          >
            <Bookmark className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
            <span className="truncate">Saved ({currentStats.bookmarks.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`px-2.5 py-2 min-h-[44px] font-bold border-b-2 flex items-center justify-center gap-1.5 transition-colors ${
              activeTab === 'history'
                ? 'border-emerald-700 dark:border-emerald-400 text-emerald-900 dark:text-emerald-300 bg-[var(--color-paper)]'
                : 'border-transparent text-[var(--color-muted)] hover:text-[var(--color-ink)]'
            }`}
          >
            <History className="w-4 h-4 text-sky-700 dark:text-sky-400 shrink-0" />
            <span className="truncate">History ({currentStats.recentTests.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('achievements')}
            className={`px-2.5 py-2 min-h-[44px] font-bold border-b-2 flex items-center justify-center gap-1.5 transition-colors ${
              activeTab === 'achievements'
                ? 'border-emerald-700 dark:border-emerald-400 text-emerald-900 dark:text-emerald-300 bg-[var(--color-paper)]'
                : 'border-transparent text-[var(--color-muted)] hover:text-[var(--color-ink)]'
            }`}
          >
            <Award className="w-4 h-4 text-purple-700 dark:text-purple-400 shrink-0" />
            <span className="truncate">Badges ({Object.keys(currentStats.unlockedAchievements).length}/{ALL_ACHIEVEMENTS.length})</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="p-5 flex-1 space-y-6">
          {/* TAB 1: STATS & STREAKS */}
          {activeTab === 'stats' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {/* Streak Banner */}
              <div className="border border-orange-200 dark:border-orange-800/60 bg-orange-50/60 dark:bg-orange-950/30 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-xl shadow-sm flex-shrink-0 animate-bounce duration-1000">
                    🔥
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-orange-800 dark:text-orange-300 font-bold">
                      Current Study Streak
                    </div>
                    <div className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-orange-950 dark:text-orange-100">
                      {currentStats.streak.current} {currentStats.streak.current === 1 ? 'Day' : 'Days'} In A Row
                    </div>
                    <p className="text-xs text-orange-900/80 dark:text-orange-200/80 mt-0.5">
                      Best Streak: <span className="font-bold">{currentStats.streak.best} Days</span> · Practice daily to keep the fire lit!
                    </p>
                  </div>
                </div>

                {/* 7-day tracker */}
                <div className="flex items-center gap-1.5 self-start sm:self-center">
                  {last7Days.map((day) => (
                    <div key={day.dateKey} className="flex flex-col items-center">
                      <span className="text-[10px] font-mono text-[var(--color-muted)] mb-1">
                        {day.dayName}
                      </span>
                      <div
                        className={`w-7 h-7 rounded-sm flex items-center justify-center text-xs font-bold border transition-colors ${
                          day.isActive
                            ? 'bg-orange-600 text-white border-orange-700 shadow-xs'
                            : day.isToday
                            ? 'border-orange-400 bg-orange-100 text-orange-900 border-dashed'
                            : 'border-[var(--color-rule-2)] bg-[var(--color-paper)] text-[var(--color-muted)]'
                        }`}
                        title={`${day.dateKey}: ${day.isActive ? 'Studied' : 'Inactive'}`}
                      >
                        {day.isActive ? '✓' : ''}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Today's Focus Metrics */}
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-xs uppercase font-bold tracking-wider text-[var(--color-muted)] mb-2.5">
                  Today&apos;s Focus Activity
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  <div className="border border-[var(--color-rule-2)] p-3.5 bg-[var(--color-paper-2)]">
                    <span className="text-[11px] font-mono text-[var(--color-muted)] block">Time Studied</span>
                    <span className="font-[family-name:var(--font-display)] text-xl font-extrabold text-[var(--color-ink)] mt-0.5 block">
                      {formatStudyTime(currentStats.today.secondsSpent)}
                    </span>
                  </div>
                  <div className="border border-[var(--color-rule-2)] p-3.5 bg-[var(--color-paper-2)]">
                    <span className="text-[11px] font-mono text-[var(--color-muted)] block">Questions Done</span>
                    <span className="font-[family-name:var(--font-display)] text-xl font-extrabold text-[var(--color-ink)] mt-0.5 block">
                      {currentStats.today.questionsAnswered}
                    </span>
                  </div>
                  <div className="border border-[var(--color-rule-2)] p-3.5 bg-[var(--color-paper-2)]">
                    <span className="text-[11px] font-mono text-[var(--color-muted)] block">Today Correct</span>
                    <span className="font-[family-name:var(--font-display)] text-xl font-extrabold text-emerald-800 mt-0.5 block">
                      {currentStats.today.correctAnswers}
                    </span>
                  </div>
                </div>
              </div>

              {/* Lifetime Preparation Scoreboard */}
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-xs uppercase font-bold tracking-wider text-[var(--color-muted)] mb-2.5">
                  Lifetime Preparation Totals
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="border border-[var(--color-rule-2)] p-3.5 bg-[var(--color-paper)]">
                    <span className="text-[11px] font-mono text-[var(--color-muted)] block">Total Practice Time</span>
                    <span className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--color-ink)] mt-0.5 block">
                      {formatStudyTime(currentStats.lifetime.totalSecondsSpent)}
                    </span>
                  </div>
                  <div className="border border-[var(--color-rule-2)] p-3.5 bg-[var(--color-paper)]">
                    <span className="text-[11px] font-mono text-[var(--color-muted)] block">MCQs Attempted</span>
                    <span className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--color-ink)] mt-0.5 block">
                      {currentStats.lifetime.totalQuestionsAnswered}
                    </span>
                  </div>
                  <div className="border border-[var(--color-rule-2)] p-3.5 bg-[var(--color-paper)]">
                    <span className="text-[11px] font-mono text-[var(--color-muted)] block">Accuracy Rate</span>
                    <span className="font-[family-name:var(--font-display)] text-lg font-bold text-emerald-800 mt-0.5 block">
                      {accuracy}%
                    </span>
                  </div>
                  <div className="border border-[var(--color-rule-2)] p-3.5 bg-[var(--color-paper)]">
                    <span className="text-[11px] font-mono text-[var(--color-muted)] block">Tests Completed</span>
                    <span className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--color-ink)] mt-0.5 block">
                      {currentStats.lifetime.totalTestsCompleted}
                    </span>
                  </div>
                </div>
              </div>

              {/* Subject Mastery Progress */}
              {Object.keys(currentStats.subjectMastery).length > 0 && (
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-xs uppercase font-bold tracking-wider text-[var(--color-muted)] mb-2.5">
                    Subject Mastery Breakdown
                  </h3>
                  <div className="border border-[var(--color-rule-2)] p-4 bg-[var(--color-paper)] space-y-3">
                    {Object.entries(currentStats.subjectMastery).map(([subj, data]) => {
                      const subjAccuracy = data.attempted > 0 ? Math.round((data.correct / data.attempted) * 100) : 0;
                      return (
                        <div key={subj} className="space-y-1">
                          <div className="flex justify-between text-xs font-[family-name:var(--font-display)]">
                            <span className="font-bold text-[var(--color-ink)] uppercase">
                              {subj.replace('-', ' ')}
                            </span>
                            <span className="font-mono text-[var(--color-muted)]">
                              {data.correct}/{data.attempted} correct ({subjAccuracy}%) · {data.testsCompleted} tests
                            </span>
                          </div>
                          <div className="w-full bg-[var(--color-rule)] h-2 overflow-hidden">
                            <div
                              className="bg-emerald-700 h-full transition-all duration-300"
                              style={{ width: `${subjAccuracy}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: BOOKMARKS */}
          {activeTab === 'bookmarks' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[var(--color-rule)]">
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-sm font-bold text-[var(--color-ink)]">
                    Bookmarked Questions for Review
                  </h3>
                  <p className="text-xs text-[var(--color-muted)]">
                    Questions you flagged during tests for revision before official exams.
                  </p>
                </div>

                {bookmarkSubjects.length > 1 && (
                  <select
                    value={selectedSubjectFilter}
                    onChange={(e) => setSelectedSubjectFilter(e.target.value)}
                    className="border border-[var(--color-rule-2)] px-2.5 py-1 text-xs bg-[var(--color-paper)] font-mono text-[var(--color-ink)]"
                  >
                    <option value="all">All Subjects ({currentStats.bookmarks.length})</option>
                    {bookmarkSubjects.map((s) => (
                      <option key={s} value={s}>
                        {s.toUpperCase()}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {filteredBookmarks.length === 0 ? (
                <div className="border-2 border-dashed border-[var(--color-rule-2)] p-12 text-center text-[var(--color-muted)] space-y-2">
                  <Bookmark className="w-8 h-8 mx-auto text-[var(--color-rule-2)]" />
                  <p className="font-[family-name:var(--font-display)] font-bold text-sm text-[var(--color-ink)]">
                    No Saved Questions Yet
                  </p>
                  <p className="text-xs max-w-sm mx-auto">
                    While taking practice tests, tap the bookmark icon on any question you find challenging to review it here anytime!
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredBookmarks.map((bm) => (
                    <div
                      key={bm.id}
                      className="border border-[var(--color-rule-2)] p-4 bg-[var(--color-paper)] space-y-3"
                    >
                      <div className="flex items-center justify-between text-xs font-mono text-[var(--color-muted)] border-b border-[var(--color-rule)] pb-2">
                        <span className="font-bold uppercase text-emerald-800">
                          {bm.subject} · {bm.chapterTitle}
                        </span>
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/test/${bm.slug}`}
                            onClick={onClose}
                            className="hover:text-[var(--color-ink)] flex items-center gap-1 underline"
                          >
                            <span>Open Chapter</span>
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                          <button
                            onClick={() => removeBookmark(bm.id)}
                            className="text-red-700 hover:text-red-900 p-1"
                            title="Remove bookmark"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <p className="font-[family-name:var(--font-display)] text-sm font-semibold text-[var(--color-ink)]">
                        {bm.question}
                      </p>

                      {/* Options Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {(['A', 'B', 'C', 'D'] as const).map((optKey) => {
                          const isCorrect = bm.correctAnswer === optKey;
                          return (
                            <div
                              key={optKey}
                              className={`p-2 border ${
                                isCorrect
                                  ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold'
                                  : 'border-[var(--color-rule)] bg-[var(--color-paper-2)] text-[var(--color-ink-2)]'
                              }`}
                            >
                              <span className="font-mono font-bold mr-1.5">{optKey})</span>
                              <span>{bm.options[optKey]}</span>
                              {isCorrect && (
                                <span className="ml-1.5 text-[10px] text-emerald-700 uppercase font-mono">
                                  [Correct]
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Explanation */}
                      {bm.explanation && (
                        <div className="text-xs bg-[var(--color-paper-2)] border-l-2 border-emerald-700 p-2 text-[var(--color-muted)]">
                          <span className="font-bold text-[var(--color-ink)] block">Rationale:</span>
                          {bm.explanation}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: RECENT TESTS */}
          {activeTab === 'history' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="border-b border-[var(--color-rule)] pb-3">
                <h3 className="font-[family-name:var(--font-display)] text-sm font-bold text-[var(--color-ink)]">
                  Completed Tests & Simulators
                </h3>
                <p className="text-xs text-[var(--color-muted)]">
                  Track your scores, test completion speeds, and retake modules anytime.
                </p>
              </div>

              {currentStats.recentTests.length === 0 ? (
                <div className="border-2 border-dashed border-[var(--color-rule-2)] p-12 text-center text-[var(--color-muted)] space-y-2">
                  <History className="w-8 h-8 mx-auto text-[var(--color-rule-2)]" />
                  <p className="font-[family-name:var(--font-display)] font-bold text-sm text-[var(--color-ink)]">
                    No Tests Taken Yet
                  </p>
                  <p className="text-xs max-w-sm mx-auto">
                    Select any curriculum chapter or timed board simulator on the homepage to start testing your knowledge!
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {currentStats.recentTests.map((t) => (
                    <div
                      key={t.id}
                      className="border border-[var(--color-rule-2)] p-4 bg-[var(--color-paper)] flex items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono uppercase bg-[var(--color-paper-2)] border border-[var(--color-rule)] px-1.5 py-0.2">
                            {t.subject}
                          </span>
                          <span className="text-xs text-[var(--color-muted)] font-mono">
                            {new Date(t.timestamp).toLocaleDateString()} · {formatStudyTime(t.timeTakenSeconds)}
                          </span>
                        </div>
                        <h4 className="font-[family-name:var(--font-display)] text-sm font-bold text-[var(--color-ink)]">
                          {t.chapterTitle}
                        </h4>
                        <div className="text-xs text-[var(--color-muted)] font-mono">
                          Score: <span className="font-bold text-[var(--color-ink)]">{t.score} / {t.total}</span> ({t.percentage}%)
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div
                          className={`w-12 h-12 rounded-sm border flex items-center justify-center font-[family-name:var(--font-display)] font-extrabold text-lg ${
                            t.percentage >= 80
                              ? 'border-emerald-700 dark:border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200'
                              : t.percentage >= 50
                              ? 'border-amber-700 dark:border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200'
                              : 'border-red-700 dark:border-red-500 bg-red-50 dark:bg-red-950/40 text-red-900 dark:text-red-200'
                          }`}
                        >
                          {t.percentage}%
                        </div>
                        <Link
                          href={`/test/${t.slug}`}
                          onClick={onClose}
                          className="px-3 py-1.5 border border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-paper)] hover:bg-emerald-900 hover:border-emerald-900 transition-colors text-xs font-bold flex items-center gap-1"
                        >
                          <span>Retake</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: ACHIEVEMENTS */}
          {activeTab === 'achievements' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="border-b border-[var(--color-rule)] pb-3">
                <h3 className="font-[family-name:var(--font-display)] text-sm font-bold text-[var(--color-ink)]">
                  Milestones & Study Badges
                </h3>
                <p className="text-xs text-[var(--color-muted)]">
                  Unlock trophies as you build regular study habits, achieve high scores, and master difficult units.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ALL_ACHIEVEMENTS.map((ach) => {
                  const isUnlocked = Boolean(currentStats.unlockedAchievements[ach.id]);
                  const unlockedDate = currentStats.unlockedAchievements[ach.id];

                  return (
                    <div
                      key={ach.id}
                      className={`p-4 border flex items-start gap-3 transition-colors ${
                        isUnlocked
                          ? 'border-amber-300 dark:border-amber-600/60 bg-amber-50/50 dark:bg-amber-950/30 shadow-xs'
                          : 'border-[var(--color-rule)] bg-[var(--color-paper-2)] opacity-60'
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0 border ${
                          isUnlocked
                            ? 'bg-amber-100 dark:bg-amber-950/60 border-amber-300 dark:border-amber-600'
                            : 'bg-neutral-200 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 filter grayscale'
                        }`}
                      >
                        {ach.icon}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-[family-name:var(--font-display)] text-sm font-bold text-[var(--color-ink)]">
                            {ach.title}
                          </h4>
                          {isUnlocked && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                          )}
                        </div>
                        <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                          {ach.description}
                        </p>
                        {isUnlocked && unlockedDate && (
                          <span className="text-[10px] font-mono text-emerald-800 block pt-0.5">
                            Unlocked: {new Date(unlockedDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="border-t border-[var(--color-rule)] p-4 bg-[var(--color-paper-2)] flex items-center justify-between text-xs font-mono text-[var(--color-muted)]">
          <span>Data saved locally to your device</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[var(--color-ink)] text-[var(--color-paper)] font-bold text-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
