'use client';

export interface BookmarkedQuestion {
  id: string; // `${slug}_${questionId}`
  questionId: number;
  slug: string;
  chapterTitle: string;
  subject?: string;
  grade?: string;
  question: string;
  options: { A: string; B: string; C: string; D: string };
  correctAnswer: string;
  explanation?: string;
  savedAt: string;
}

export interface TestAttempt {
  id: string;
  slug: string;
  chapterTitle: string;
  subject?: string;
  grade?: string;
  score: number;
  total: number;
  percentage: number;
  timeTakenSeconds: number;
  timestamp: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string | null;
}

export interface StudyStats {
  streak: {
    current: number;
    best: number;
    lastActiveDate: string; // YYYY-MM-DD
    activeDates: string[]; // List of YYYY-MM-DD strings
  };
  today: {
    date: string; // YYYY-MM-DD
    secondsSpent: number;
    questionsAnswered: number;
    correctAnswers: number;
  };
  lifetime: {
    totalSecondsSpent: number;
    totalQuestionsAnswered: number;
    totalCorrectAnswers: number;
    totalTestsCompleted: number;
  };
  subjectMastery: Record<
    string,
    {
      attempted: number;
      correct: number;
      testsCompleted: number;
      lastStudied: string;
    }
  >;
  recentTests: TestAttempt[];
  bookmarks: BookmarkedQuestion[];
  unlockedAchievements: Record<string, string>; // achievementId -> unlockedAt
}

const STORAGE_KEY = 'fbise_study_tracker_v2';
const EVENT_NAME = 'fbise-study-updated';
const ACHIEVEMENT_EVENT = 'fbise-achievement-unlocked';
const SYNC_CHANNEL_NAME = 'fbise_study_sync_v1';

// Cross-Window Realtime BroadcastChannel
let syncChannel: BroadcastChannel | null = null;
if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
  try {
    syncChannel = new BroadcastChannel(SYNC_CHANNEL_NAME);
    syncChannel.onmessage = (event) => {
      if (event.data?.type === 'STATS_UPDATED' && event.data.stats) {
        window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: event.data.stats }));
      } else if (event.data?.type === 'ACHIEVEMENT_UNLOCKED' && event.data.achievement) {
        window.dispatchEvent(new CustomEvent(ACHIEVEMENT_EVENT, { detail: event.data.achievement }));
      }
    };
  } catch {
    // BroadcastChannel unsupported or restricted in environment
  }
}

export const ALL_ACHIEVEMENTS: Omit<Achievement, 'unlockedAt'>[] = [
  {
    id: 'first_test',
    title: 'First Step',
    description: 'Complete your first practice module or exam.',
    icon: '🎓',
  },
  {
    id: 'streak_3',
    title: 'Habit Former',
    description: 'Maintain a 3-day consecutive study streak.',
    icon: '🔥',
  },
  {
    id: 'streak_7',
    title: 'Weekly Scholar',
    description: 'Study 7 days in a row without missing a day.',
    icon: '⚡',
  },
  {
    id: 'score_80',
    title: 'High Achiever',
    description: 'Score 80% or higher on any test.',
    icon: '🎯',
  },
  {
    id: 'score_100',
    title: 'Perfect Score',
    description: 'Score 100% on any board exam simulator.',
    icon: '💯',
  },
  {
    id: 'questions_50',
    title: 'Half-Century',
    description: 'Answer 50 questions across all subjects.',
    icon: '📖',
  },
  {
    id: 'questions_200',
    title: 'Master of Practice',
    description: 'Answer 200 questions across all subjects.',
    icon: '🏛️',
  },
  {
    id: 'time_30m',
    title: 'Deep Focus',
    description: 'Spend at least 30 minutes practicing today.',
    icon: '⏱️',
  },
  {
    id: 'bookmarks_5',
    title: 'Meticulous Reviewer',
    description: 'Bookmark 5 tricky questions for spaced revision.',
    icon: '🔖',
  },
];

function getTodayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function getYesterdayKey(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function getDefaultStats(): StudyStats {
  const today = getTodayKey();
  return {
    streak: {
      current: 1,
      best: 1,
      lastActiveDate: today,
      activeDates: [today],
    },
    today: {
      date: today,
      secondsSpent: 0,
      questionsAnswered: 0,
      correctAnswers: 0,
    },
    lifetime: {
      totalSecondsSpent: 0,
      totalQuestionsAnswered: 0,
      totalCorrectAnswers: 0,
      totalTestsCompleted: 0,
    },
    subjectMastery: {},
    recentTests: [],
    bookmarks: [],
    unlockedAchievements: {},
  };
}

/**
 * Self-anneals raw study stats by repairing corrupted fields, NaN counters,
 * out-of-bounds streaks, malformed bookmarks, and date rollover discrepancies.
 */
export function annealStudyStats(raw: unknown): { stats: StudyStats; wasRepaired: boolean } {
  let wasRepaired = false;
  const defaults = getDefaultStats();
  const today = getTodayKey();
  const yesterday = getYesterdayKey();

  if (!raw || typeof raw !== 'object') {
    return { stats: defaults, wasRepaired: true };
  }

  const input = raw as Partial<StudyStats>;

  // 1. Streak Annealing
  const streak = input.streak || defaults.streak;
  let streakCurrent =
    typeof streak.current === 'number' && !isNaN(streak.current) && streak.current >= 1
      ? Math.floor(streak.current)
      : 1;
  const streakBest =
    typeof streak.best === 'number' && !isNaN(streak.best) && streak.best >= streakCurrent
      ? Math.floor(streak.best)
      : streakCurrent;
  const lastActiveDate =
    typeof streak.lastActiveDate === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(streak.lastActiveDate)
      ? streak.lastActiveDate
      : today;
  const activeDates = Array.isArray(streak.activeDates)
    ? Array.from(new Set(streak.activeDates.filter((d): d is string => typeof d === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(d))))
    : [today];

  if (!activeDates.includes(lastActiveDate)) {
    activeDates.push(lastActiveDate);
  }

  if (
    streak.current !== streakCurrent ||
    streak.best !== streakBest ||
    streak.lastActiveDate !== lastActiveDate ||
    !Array.isArray(streak.activeDates)
  ) {
    wasRepaired = true;
  }

  // 2. Day Rollover & Continuity Check
  const todayObj = input.today || defaults.today;
  const todayDate = today;
  let todaySeconds =
    typeof todayObj.secondsSpent === 'number' && !isNaN(todayObj.secondsSpent) && todayObj.secondsSpent >= 0
      ? Math.floor(todayObj.secondsSpent)
      : 0;
  let todayQuestions =
    typeof todayObj.questionsAnswered === 'number' && !isNaN(todayObj.questionsAnswered) && todayObj.questionsAnswered >= 0
      ? Math.floor(todayObj.questionsAnswered)
      : 0;
  let todayCorrect =
    typeof todayObj.correctAnswers === 'number' && !isNaN(todayObj.correctAnswers) && todayObj.correctAnswers >= 0
      ? Math.floor(todayObj.correctAnswers)
      : 0;

  if (todayObj.date !== today) {
    wasRepaired = true;
    todaySeconds = 0;
    todayQuestions = 0;
    todayCorrect = 0;
    // Streak continuity: if last activity was yesterday, streak continues on next answer; otherwise resets to 1
    if (lastActiveDate !== yesterday && lastActiveDate !== today) {
      streakCurrent = 1;
    }
  }

  // 3. Lifetime Metrics Annealing
  const life = input.lifetime || defaults.lifetime;
  const totalSecondsSpent =
    typeof life.totalSecondsSpent === 'number' && !isNaN(life.totalSecondsSpent) && life.totalSecondsSpent >= 0
      ? Math.floor(life.totalSecondsSpent)
      : todaySeconds;
  const totalQuestionsAnswered =
    typeof life.totalQuestionsAnswered === 'number' && !isNaN(life.totalQuestionsAnswered) && life.totalQuestionsAnswered >= 0
      ? Math.floor(life.totalQuestionsAnswered)
      : todayQuestions;
  const totalCorrectAnswers =
    typeof life.totalCorrectAnswers === 'number' && !isNaN(life.totalCorrectAnswers) && life.totalCorrectAnswers >= 0
      ? Math.floor(life.totalCorrectAnswers)
      : todayCorrect;
  const totalTestsCompleted =
    typeof life.totalTestsCompleted === 'number' && !isNaN(life.totalTestsCompleted) && life.totalTestsCompleted >= 0
      ? Math.floor(life.totalTestsCompleted)
      : 0;

  // 4. Bookmarks Annealing & Deduplication
  const rawBookmarks = Array.isArray(input.bookmarks) ? input.bookmarks : [];
  const seenBookmarkIds = new Set<string>();
  const sanitizedBookmarks: BookmarkedQuestion[] = [];

  for (const b of rawBookmarks) {
    if (
      b &&
      typeof b === 'object' &&
      typeof b.id === 'string' &&
      typeof b.question === 'string' &&
      b.options &&
      !seenBookmarkIds.has(b.id)
    ) {
      seenBookmarkIds.add(b.id);
      sanitizedBookmarks.push({
        id: b.id,
        questionId: typeof b.questionId === 'number' ? b.questionId : 1,
        slug: typeof b.slug === 'string' ? b.slug : '',
        chapterTitle: typeof b.chapterTitle === 'string' ? b.chapterTitle : 'Practice Module',
        subject: typeof b.subject === 'string' ? b.subject : undefined,
        grade: typeof b.grade === 'string' ? b.grade : undefined,
        question: b.question,
        options: b.options,
        correctAnswer: typeof b.correctAnswer === 'string' ? b.correctAnswer : 'A',
        explanation: typeof b.explanation === 'string' ? b.explanation : undefined,
        savedAt: typeof b.savedAt === 'string' ? b.savedAt : new Date().toISOString(),
      });
    } else {
      wasRepaired = true;
    }
  }

  // 5. Subject Mastery & Achievements
  const subjectMastery =
    typeof input.subjectMastery === 'object' && input.subjectMastery !== null
      ? input.subjectMastery
      : {};
  const unlockedAchievements =
    typeof input.unlockedAchievements === 'object' && input.unlockedAchievements !== null
      ? input.unlockedAchievements
      : {};
  const recentTests = Array.isArray(input.recentTests)
    ? input.recentTests.slice(0, 15)
    : [];

  const annealed: StudyStats = {
    streak: {
      current: streakCurrent,
      best: streakBest,
      lastActiveDate,
      activeDates,
    },
    today: {
      date: todayDate,
      secondsSpent: todaySeconds,
      questionsAnswered: todayQuestions,
      correctAnswers: todayCorrect,
    },
    lifetime: {
      totalSecondsSpent,
      totalQuestionsAnswered,
      totalCorrectAnswers,
      totalTestsCompleted,
    },
    subjectMastery,
    recentTests,
    bookmarks: sanitizedBookmarks,
    unlockedAchievements,
  };

  return { stats: annealed, wasRepaired };
}

export function getStudyStats(): StudyStats {
  if (typeof window === 'undefined') {
    return getDefaultStats();
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial = getDefaultStats();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }

    const parsed = JSON.parse(raw);
    const { stats, wasRepaired } = annealStudyStats(parsed);

    if (wasRepaired) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
      } catch {
        // Storage full
      }
    }

    return stats;
  } catch {
    // Malformed JSON: heal with default
    const fallback = getDefaultStats();
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fallback));
    } catch {
      // Storage full
    }
    return fallback;
  }
}

function saveStudyStats(stats: StudyStats): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: stats }));
    syncChannel?.postMessage({ type: 'STATS_UPDATED', stats });
  } catch {
    // localStorage full or disabled
  }
}

function checkAchievements(stats: StudyStats): void {
  const now = new Date().toISOString();
  const newlyUnlocked: string[] = [];

  const unlock = (id: string) => {
    if (!stats.unlockedAchievements[id]) {
      stats.unlockedAchievements[id] = now;
      newlyUnlocked.push(id);
    }
  };

  if (stats.lifetime.totalTestsCompleted >= 1) unlock('first_test');
  if (stats.streak.current >= 3) unlock('streak_3');
  if (stats.streak.current >= 7) unlock('streak_7');
  if (stats.lifetime.totalQuestionsAnswered >= 50) unlock('questions_50');
  if (stats.lifetime.totalQuestionsAnswered >= 200) unlock('questions_200');
  if (stats.today.secondsSpent >= 1800) unlock('time_30m');
  if (stats.bookmarks.length >= 5) unlock('bookmarks_5');

  if (newlyUnlocked.length > 0 && typeof window !== 'undefined') {
    newlyUnlocked.forEach((id) => {
      const ach = ALL_ACHIEVEMENTS.find((a) => a.id === id);
      if (ach) {
        const fullAch = { ...ach, unlockedAt: now };
        window.dispatchEvent(new CustomEvent(ACHIEVEMENT_EVENT, { detail: fullAch }));
        syncChannel?.postMessage({ type: 'ACHIEVEMENT_UNLOCKED', achievement: fullAch });
      }
    });
  }
}

export function recordStudyTime(seconds: number): void {
  if (seconds <= 0) return;
  const stats = getStudyStats();
  const today = getTodayKey();

  stats.today.secondsSpent += seconds;
  stats.lifetime.totalSecondsSpent += seconds;

  // Update streak touch
  if (stats.streak.lastActiveDate !== today) {
    const yesterday = getYesterdayKey();
    if (stats.streak.lastActiveDate === yesterday) {
      stats.streak.current += 1;
    } else {
      stats.streak.current = 1;
    }
    stats.streak.lastActiveDate = today;
    if (!stats.streak.activeDates.includes(today)) {
      stats.streak.activeDates.push(today);
    }
    if (stats.streak.current > stats.streak.best) {
      stats.streak.best = stats.streak.current;
    }
  }

  checkAchievements(stats);
  saveStudyStats(stats);
}

export function recordQuestionAnswer(isCorrect: boolean, subjectId?: string): void {
  const stats = getStudyStats();
  const today = getTodayKey();

  stats.today.questionsAnswered += 1;
  stats.lifetime.totalQuestionsAnswered += 1;

  if (isCorrect) {
    stats.today.correctAnswers += 1;
    stats.lifetime.totalCorrectAnswers += 1;
  }

  if (subjectId) {
    if (!stats.subjectMastery[subjectId]) {
      stats.subjectMastery[subjectId] = {
        attempted: 0,
        correct: 0,
        testsCompleted: 0,
        lastStudied: today,
      };
    }
    stats.subjectMastery[subjectId].attempted += 1;
    if (isCorrect) stats.subjectMastery[subjectId].correct += 1;
    stats.subjectMastery[subjectId].lastStudied = today;
  }

  // Update streak touch
  if (stats.streak.lastActiveDate !== today) {
    const yesterday = getYesterdayKey();
    if (stats.streak.lastActiveDate === yesterday) {
      stats.streak.current += 1;
    } else {
      stats.streak.current = 1;
    }
    stats.streak.lastActiveDate = today;
    if (!stats.streak.activeDates.includes(today)) {
      stats.streak.activeDates.push(today);
    }
    if (stats.streak.current > stats.streak.best) {
      stats.streak.best = stats.streak.current;
    }
  }

  checkAchievements(stats);
  saveStudyStats(stats);
}

export function recordTestCompleted(attempt: Omit<TestAttempt, 'id' | 'timestamp'>): void {
  const stats = getStudyStats();
  const today = getTodayKey();
  const now = new Date().toISOString();

  const fullAttempt: TestAttempt = {
    ...attempt,
    id: `${attempt.slug}_${Date.now()}`,
    timestamp: now,
  };

  stats.lifetime.totalTestsCompleted += 1;

  // Add to recent tests (keep last 12)
  stats.recentTests = [fullAttempt, ...stats.recentTests.filter((t) => t.slug !== attempt.slug)].slice(0, 12);

  // Update subject mastery
  if (attempt.subject) {
    if (!stats.subjectMastery[attempt.subject]) {
      stats.subjectMastery[attempt.subject] = {
        attempted: 0,
        correct: 0,
        testsCompleted: 0,
        lastStudied: today,
      };
    }
    stats.subjectMastery[attempt.subject].testsCompleted += 1;
    stats.subjectMastery[attempt.subject].lastStudied = today;
  }

  // Check score achievements
  if (attempt.percentage >= 80) {
    stats.unlockedAchievements['score_80'] = now;
  }
  if (attempt.percentage === 100 && (attempt.slug.includes('model-paper') || attempt.slug.includes('past-papers'))) {
    stats.unlockedAchievements['score_100'] = now;
  }

  checkAchievements(stats);
  saveStudyStats(stats);
}

export function toggleBookmarkQuestion(item: Omit<BookmarkedQuestion, 'id' | 'savedAt'>): boolean {
  const stats = getStudyStats();
  const bookmarkId = `${item.slug}_${item.questionId}`;
  const existingIndex = stats.bookmarks.findIndex((b) => b.id === bookmarkId);

  let isBookmarked = false;
  if (existingIndex >= 0) {
    stats.bookmarks.splice(existingIndex, 1);
    isBookmarked = false;
  } else {
    stats.bookmarks.unshift({
      ...item,
      id: bookmarkId,
      savedAt: new Date().toISOString(),
    });
    isBookmarked = true;
  }

  checkAchievements(stats);
  saveStudyStats(stats);
  return isBookmarked;
}

export function isQuestionBookmarked(slug: string, questionId: number): boolean {
  if (typeof window === 'undefined') return false;
  const stats = getStudyStats();
  const bookmarkId = `${slug}_${questionId}`;
  return stats.bookmarks.some((b) => b.id === bookmarkId);
}

export function removeBookmark(bookmarkId: string): void {
  const stats = getStudyStats();
  stats.bookmarks = stats.bookmarks.filter((b) => b.id !== bookmarkId);
  saveStudyStats(stats);
}

export function formatStudyTime(totalSeconds: number): string {
  if (totalSeconds < 60) return `${totalSeconds}s`;
  const mins = Math.floor(totalSeconds / 60);
  if (mins < 60) return `${mins}m`;
  const hours = Math.floor(mins / 60);
  const remainingMins = mins % 60;
  return `${hours}h ${remainingMins}m`;
}
