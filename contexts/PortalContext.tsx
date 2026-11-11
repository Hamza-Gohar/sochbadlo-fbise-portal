'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  ReactNode,
} from 'react';
import {
  StudyStats,
  BookmarkedQuestion,
  TestAttempt,
  getDefaultStats,
  getStudyStats,
  recordStudyTime as recordTimeLib,
  recordQuestionAnswer as recordAnswerLib,
  recordTestCompleted as recordTestLib,
  toggleBookmarkQuestion as toggleBookmarkLib,
  isQuestionBookmarked as isBookmarkedLib,
  removeBookmark as removeBookmarkLib,
} from '../lib/study-tracker';

export type DashboardTab = 'stats' | 'bookmarks' | 'history' | 'achievements';
export type ThemeMode = 'light' | 'dark';

export interface PortalContextType {
  // Theme state
  theme: ThemeMode;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;

  // Study tracker state
  stats: StudyStats;
  streak: number;
  todaySeconds: number;
  bookmarkCount: number;
  bookmarks: BookmarkedQuestion[];
  recentTests: TestAttempt[];
  unlockedBadgesCount: number;
  hasNewAchievement: boolean;

  // Study tracker mutators & queries
  toggleBookmark: (item: Omit<BookmarkedQuestion, 'id' | 'savedAt'>) => boolean;
  isBookmarked: (slug: string, questionId: number) => boolean;
  removeBookmark: (bookmarkId: string) => void;
  recordStudyTime: (seconds: number) => void;
  recordQuestionAnswer: (isCorrect: boolean, subjectId?: string) => void;
  recordTestCompleted: (attempt: Omit<TestAttempt, 'id' | 'timestamp'>) => void;
  refreshStats: () => void;

  // Study Dashboard Modal state
  isDashboardOpen: boolean;
  dashboardTab: DashboardTab;
  openDashboard: (tab?: DashboardTab) => void;
  closeDashboard: () => void;
}

const PortalContext = createContext<PortalContextType | undefined>(undefined);

function applyThemeToDocument(isDark: boolean) {
  if (typeof document === 'undefined') return;
  const mode: ThemeMode = isDark ? 'dark' : 'light';
  document.documentElement.setAttribute('data-mode', mode);
  document.documentElement.setAttribute('data-theme', mode);
  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

export function PortalProvider({ children }: { children: ReactNode }) {
  // 1. Theme State
  const [theme, setThemeState] = useState<ThemeMode>('light');
  const [isDark, setIsDark] = useState<boolean>(false);

  // 2. Study Tracker State
  const [stats, setStats] = useState<StudyStats>(getDefaultStats);
  const [hasNewAchievement, setHasNewAchievement] = useState<boolean>(false);

  // 3. Modal / Dashboard State
  const [isDashboardOpen, setIsDashboardOpen] = useState<boolean>(false);
  const [dashboardTab, setDashboardTab] = useState<DashboardTab>('stats');

  // Initialize theme and study stats on mount
  useEffect(() => {
    // Theme sync
    try {
      const saved = localStorage.getItem('fbise_theme_mode');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialDark = saved === 'dark' || (!saved && prefersDark);
      setIsDark(initialDark);
      setThemeState(initialDark ? 'dark' : 'light');
      applyThemeToDocument(initialDark);
    } catch {
      // Ignore localStorage access failures
    }

    // Stats sync
    setStats(getStudyStats());
  }, []);

  // Listen to cross-component and cross-tab events
  useEffect(() => {
    const handleStudyUpdate = () => {
      setStats(getStudyStats());
    };

    const handleAchievementUnlocked = () => {
      setStats(getStudyStats());
      setHasNewAchievement(true);
      setTimeout(() => setHasNewAchievement(false), 5000);
    };

    const handleThemeEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ mode: ThemeMode }>;
      if (customEvent.detail?.mode) {
        const dark = customEvent.detail.mode === 'dark';
        setIsDark(dark);
        setThemeState(customEvent.detail.mode);
        applyThemeToDocument(dark);
      }
    };

    const handleStorageEvent = (e: StorageEvent) => {
      if (e.key === 'fbise_study_tracker_v2') {
        setStats(getStudyStats());
      } else if (e.key === 'fbise_theme_mode') {
        const dark = e.newValue === 'dark';
        setIsDark(dark);
        setThemeState(dark ? 'dark' : 'light');
        applyThemeToDocument(dark);
      }
    };

    window.addEventListener('fbise-study-updated', handleStudyUpdate);
    window.addEventListener('fbise-achievement-unlocked', handleAchievementUnlocked);
    window.addEventListener('fbise-theme-changed', handleThemeEvent);
    window.addEventListener('storage', handleStorageEvent);

    return () => {
      window.removeEventListener('fbise-study-updated', handleStudyUpdate);
      window.removeEventListener('fbise-achievement-unlocked', handleAchievementUnlocked);
      window.removeEventListener('fbise-theme-changed', handleThemeEvent);
      window.removeEventListener('storage', handleStorageEvent);
    };
  }, []);

  // Theme controls
  const setTheme = useCallback((mode: ThemeMode) => {
    const nextDark = mode === 'dark';
    setIsDark(nextDark);
    setThemeState(mode);
    applyThemeToDocument(nextDark);
    try {
      localStorage.setItem('fbise_theme_mode', mode);
      window.dispatchEvent(new CustomEvent('fbise-theme-changed', { detail: { mode } }));
    } catch {
      // Storage unavailable
    }
  }, []);

  const toggleTheme = useCallback(() => {
    const nextMode: ThemeMode = isDark ? 'light' : 'dark';
    setTheme(nextMode);
  }, [isDark, setTheme]);

  // Dashboard modal controls
  const openDashboard = useCallback((tab: DashboardTab = 'stats') => {
    setDashboardTab(tab);
    setIsDashboardOpen(true);
  }, []);

  const closeDashboard = useCallback(() => {
    setIsDashboardOpen(false);
  }, []);

  // Study tracker action wrappers (updates both lib and local React state synchronously)
  const refreshStats = useCallback(() => {
    setStats(getStudyStats());
  }, []);

  const toggleBookmark = useCallback((item: Omit<BookmarkedQuestion, 'id' | 'savedAt'>) => {
    const result = toggleBookmarkLib(item);
    setStats(getStudyStats());
    return result;
  }, []);

  const isBookmarked = useCallback((slug: string, questionId: number) => {
    return isBookmarkedLib(slug, questionId);
  }, []);

  const removeBookmark = useCallback((bookmarkId: string) => {
    removeBookmarkLib(bookmarkId);
    setStats(getStudyStats());
  }, []);

  const recordStudyTime = useCallback((seconds: number) => {
    recordTimeLib(seconds);
    setStats(getStudyStats());
  }, []);

  const recordQuestionAnswer = useCallback((isCorrect: boolean, subjectId?: string) => {
    recordAnswerLib(isCorrect, subjectId);
    setStats(getStudyStats());
  }, []);

  const recordTestCompleted = useCallback((attempt: Omit<TestAttempt, 'id' | 'timestamp'>) => {
    recordTestLib(attempt);
    setStats(getStudyStats());
  }, []);

  // Derived counts
  const streak = stats.streak?.current || 0;
  const todaySeconds = stats.today?.secondsSpent || 0;
  const bookmarkCount = stats.bookmarks?.length || 0;
  const bookmarks = stats.bookmarks || [];
  const recentTests = stats.recentTests || [];
  const unlockedBadgesCount = Object.keys(stats.unlockedAchievements || {}).length;

  const value: PortalContextType = useMemo(
    () => ({
      theme,
      isDark,
      toggleTheme,
      setTheme,
      stats,
      streak,
      todaySeconds,
      bookmarkCount,
      bookmarks,
      recentTests,
      unlockedBadgesCount,
      hasNewAchievement,
      toggleBookmark,
      isBookmarked,
      removeBookmark,
      recordStudyTime,
      recordQuestionAnswer,
      recordTestCompleted,
      refreshStats,
      isDashboardOpen,
      dashboardTab,
      openDashboard,
      closeDashboard,
    }),
    [
      theme,
      isDark,
      toggleTheme,
      setTheme,
      stats,
      streak,
      todaySeconds,
      bookmarkCount,
      bookmarks,
      recentTests,
      unlockedBadgesCount,
      hasNewAchievement,
      toggleBookmark,
      isBookmarked,
      removeBookmark,
      recordStudyTime,
      recordQuestionAnswer,
      recordTestCompleted,
      refreshStats,
      isDashboardOpen,
      dashboardTab,
      openDashboard,
      closeDashboard,
    ]
  );

  return <PortalContext.Provider value={value}>{children}</PortalContext.Provider>;
}

// Hook: Full Portal Context
export function usePortal(): PortalContextType {
  const context = useContext(PortalContext);
  if (!context) {
    throw new Error('usePortal must be used within a <PortalProvider>');
  }
  return context;
}

// Hook: Study Tracker Slice
export function useStudy() {
  const {
    stats,
    streak,
    todaySeconds,
    bookmarkCount,
    bookmarks,
    recentTests,
    unlockedBadgesCount,
    hasNewAchievement,
    toggleBookmark,
    isBookmarked,
    removeBookmark,
    recordStudyTime,
    recordQuestionAnswer,
    recordTestCompleted,
    refreshStats,
    openDashboard,
  } = usePortal();

  return {
    stats,
    streak,
    todaySeconds,
    bookmarkCount,
    bookmarks,
    recentTests,
    unlockedBadgesCount,
    hasNewAchievement,
    toggleBookmark,
    isBookmarked,
    removeBookmark,
    recordStudyTime,
    recordQuestionAnswer,
    recordTestCompleted,
    refreshStats,
    openDashboard,
  };
}

// Hook: Theme Slice
export function useTheme() {
  const { theme, isDark, toggleTheme, setTheme } = usePortal();
  return { theme, isDark, toggleTheme, setTheme };
}
