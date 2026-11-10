'use client';

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import Link from 'next/link';
import { ChapterData } from '../lib/types';
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Flag,
  CheckCircle,
  XCircle,
  Sparkles,
  RotateCcw,
  Home,
  Bookmark,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  recordStudyTime,
  recordQuestionAnswer,
  recordTestCompleted,
  toggleBookmarkQuestion,
  isQuestionBookmarked,
} from '../lib/study-tracker';
import StudyDashboard from './StudyDashboard';
import StudyTrackerPill from './StudyTrackerPill';

interface QuizEngineProps {
  chapter: ChapterData;
  slug: string;
  initialMode?: 'practice' | 'exam';
}

export default function QuizEngine({ chapter, slug, initialMode = 'practice' }: QuizEngineProps) {
  const [mode, setMode] = useState<'practice' | 'exam'>(initialMode);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [flagged, setFlagged] = useState<Record<number, boolean>>({});
  const [bookmarkedIds, setBookmarkedIds] = useState<Record<number, boolean>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'incorrect'>('all');
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [dashboardTab, setDashboardTab] = useState<'stats' | 'bookmarks' | 'history' | 'achievements'>('stats');

  // Timer for Exam Mode (15 min for 10-MCQ subjects; 25 min for 20-MCQ Class 12 English/Urdu; 20 min default)
  const is10QExam =
    slug.startsWith('physics-9-model-paper-') ||
    slug.startsWith('tarjuma-9-model-paper-') ||
    slug.startsWith('pakstudies-10-') ||
    slug.startsWith('tarjuma-10-') ||
    slug.startsWith('pakstudies-12-') ||
    slug.startsWith('tarjuma-12-');
  const is25MinExam =
    slug.startsWith('english-12-') ||
    slug.startsWith('urdu-12-') ||
    slug.startsWith('physics-12-') ||
    slug.startsWith('math-12-') ||
    slug.startsWith('biology-12-') ||
    slug.startsWith('chemistry-12-');
  const initialExamTime = is10QExam ? 900 : is25MinExam ? 1500 : 1200;
  const [timeLeft, setTimeLeft] = useState(initialExamTime);
  const [elapsedTime, setElapsedTime] = useState(0);

  const backHref = chapter.grade ? `/?grade=${chapter.grade}` : '/';
  const questions = chapter.questions;
  const currentQ = questions[currentIndex] || questions[0];
  const isUrdu =
    slug.startsWith('urdu') ||
    slug.startsWith('tarjuma') ||
    slug.startsWith('islamiat-9') ||
    /[\u0600-\u06FF]/.test(currentQ?.question || '');

  const urduOptionLabels: Record<'A' | 'B' | 'C' | 'D', string> = {
    A: 'الف (A)',
    B: 'ب (B)',
    C: 'ج (C)',
    D: 'د (D)',
  };

  // Initialize bookmark states for all questions in this chapter
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const initialMap: Record<number, boolean> = {};
    questions.forEach((q) => {
      initialMap[q.id] = isQuestionBookmarked(slug, q.id);
    });
    setBookmarkedIds(initialMap);
  }, [slug, questions]);

  // Periodic active study timer (tracks focus time every 5 seconds)
  const lastActiveRef = useRef<number>(Date.now());
  const handleSubmitRef = useRef<() => void>(() => {});

  useEffect(() => {
    if (isSubmitted) return;

    const interval = setInterval(() => {
      // Only track if document has focus
      if (document.hasFocus()) {
        const now = Date.now();
        const diffSeconds = Math.round((now - lastActiveRef.current) / 1000);
        if (diffSeconds > 0 && diffSeconds < 30) {
          recordStudyTime(diffSeconds);
        }
        lastActiveRef.current = now;
      } else {
        lastActiveRef.current = Date.now();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isSubmitted]);

  // Timer interval for Exam Mode
  useEffect(() => {
    if (mode !== 'exam' || isSubmitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitRef.current();
          return 0;
        }
        return prev - 1;
      });
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [mode, isSubmitted]);

  // Handle Option Select
  const handleSelectOption = useCallback((opt: string) => {
    if (isSubmitted && mode === 'exam') return;

    const prevAnswer = answers[currentQ.id];
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: opt,
    }));

    // Record question answer metric only on first attempt of this question
    if (!prevAnswer) {
      const isCorrect = opt === currentQ.correctAnswer;
      recordQuestionAnswer(isCorrect, chapter.subject);
    }
  }, [answers, chapter.subject, currentQ.correctAnswer, currentQ.id, isSubmitted, mode]);

  // Toggle Flag
  const toggleFlag = useCallback((qId: number) => {
    setFlagged((prev) => ({
      ...prev,
      [qId]: !prev[qId],
    }));
  }, []);

  // Toggle Bookmark
  const handleToggleBookmark = useCallback((q: typeof currentQ) => {
    const isNowBookmarked = toggleBookmarkQuestion({
      questionId: q.id,
      slug,
      chapterTitle: chapter.chapterTitle,
      subject: chapter.subject,
      grade: chapter.grade,
      question: q.question,
      options: q.options,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
    });

    setBookmarkedIds((prev) => ({
      ...prev,
      [q.id]: isNowBookmarked,
    }));
  }, [chapter.chapterTitle, chapter.grade, chapter.subject, slug]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isSubmitted) return;
      const key = e.key.toUpperCase();
      if (['A', 'B', 'C', 'D'].includes(key)) {
        handleSelectOption(key);
      } else if (e.key === 'ArrowRight' && currentIndex < questions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
      } else if (key === 'F') {
        toggleFlag(currentQ.id);
      } else if (key === 'B') {
        handleToggleBookmark(currentQ);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, currentQ, handleSelectOption, handleToggleBookmark, isSubmitted, questions.length, toggleFlag]);

  // Score Calculation
  const results = useMemo(() => {
    let correctCount = 0;
    const details = questions.map((q) => {
      const selected = answers[q.id];
      const isCorrect = selected === q.correctAnswer;
      if (isCorrect) correctCount++;
      return {
        ...q,
        selected,
        isCorrect,
      };
    });

    const percentage = Math.round((correctCount / questions.length) * 100);

    let grade = 'F';
    if (percentage >= 90) grade = 'A+';
    else if (percentage >= 80) grade = 'A';
    else if (percentage >= 70) grade = 'B';
    else if (percentage >= 60) grade = 'C';
    else if (percentage >= 50) grade = 'D';

    return {
      correctCount,
      total: questions.length,
      percentage,
      grade,
      details,
    };
  }, [answers, questions]);

  // Handle Submission
  const handleSubmit = useCallback(() => {
    setIsSubmitted(true);

    const correctCount = Object.entries(answers).filter(([id, ans]) => {
      const q = questions.find((item) => item.id === Number(id));
      return q && q.correctAnswer === ans;
    }).length;
    const currentPercentage = Math.round((correctCount / questions.length) * 100);
    const timeTaken = elapsedTime || initialExamTime - timeLeft;

    // Record into global study tracker
    recordTestCompleted({
      slug,
      chapterTitle: chapter.chapterTitle,
      subject: chapter.subject,
      grade: chapter.grade,
      score: correctCount,
      total: questions.length,
      percentage: currentPercentage,
      timeTakenSeconds: Math.max(1, timeTaken),
    });

    // Save best score to legacy local storage key for backwards compatibility
    try {
      const bestSaved = localStorage.getItem(`score_${slug}`);
      if (!bestSaved || currentPercentage > JSON.parse(bestSaved).percentage) {
        localStorage.setItem(
          `score_${slug}`,
          JSON.stringify({
            score: correctCount,
            total: questions.length,
            percentage: currentPercentage,
            updatedAt: new Date().toISOString(),
          })
        );
      }
    } catch {
      // Local storage not available
    }

    // Trigger celebration confetti if passed with flying colors
    if (currentPercentage >= 75) {
      confetti({
        particleCount: 90,
        spread: 65,
        origin: { y: 0.6 },
      });
    }
  }, [answers, chapter, elapsedTime, initialExamTime, questions, slug, timeLeft]);

  handleSubmitRef.current = handleSubmit;

  const handleRetake = () => {
    setAnswers({});
    setFlagged({});
    setIsSubmitted(false);
    setCurrentIndex(0);
    setTimeLeft(initialExamTime);
    setElapsedTime(0);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const openDashboardTab = (tab: 'stats' | 'bookmarks' | 'history' | 'achievements' = 'stats') => {
    setDashboardTab(tab);
    setIsDashboardOpen(true);
  };

  return (
    <div className="min-h-screen bg-[var(--color-paper)] flex flex-col justify-between selection:bg-emerald-100 selection:text-emerald-950">
      {/* Top Test Header */}
      <header className="border-b border-[var(--color-rule)] bg-[var(--color-paper)] sticky top-0 z-[var(--z-sticky-nav)] shadow-sm">
        <div className="max-w-[var(--container)] mx-auto px-4 sm:px-8 py-2.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link
              href={backHref}
              className="min-w-[40px] min-h-[40px] border border-[var(--color-rule-2)] hover:border-[var(--color-ink)] transition-colors text-[var(--color-ink)] flex items-center justify-center active:scale-95"
              title="Return to Chapter Index"
              aria-label="Return to chapter index"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div className="max-w-[200px] sm:max-w-md truncate">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-muted)] block">
                {slug.includes('model-paper') || slug.includes('past-papers')
                  ? 'Board Exam Simulator'
                  : `Unit ${chapter.chapterNumber.toString().padStart(2, '0')}`}
              </span>
              <h1 className="font-[family-name:var(--font-display)] text-sm sm:text-base font-bold text-[var(--color-ink)] tracking-tight truncate">
                {chapter.chapterTitle}
              </h1>
            </div>
          </div>

          {/* Mode Switcher, Timer & Study Tracker Pill */}
          <div className="flex items-center gap-2 sm:gap-3">
            <StudyTrackerPill onOpenDashboard={openDashboardTab} className="hidden sm:flex" />

            {!isSubmitted && (
              <div className="inline-flex border border-[var(--color-rule-2)] p-0.5 text-xs font-[family-name:var(--font-display)]">
                <button
                  type="button"
                  onClick={() => setMode('practice')}
                  className={`px-2.5 sm:px-3 py-1 font-semibold transition-colors min-h-[36px] sm:min-h-0 flex items-center ${
                    mode === 'practice'
                      ? 'bg-[var(--color-ink)] text-[var(--color-paper)]'
                      : 'text-[var(--color-muted)] hover:text-[var(--color-ink)]'
                  }`}
                >
                  Practice
                </button>
                <button
                  type="button"
                  onClick={() => setMode('exam')}
                  className={`px-2.5 sm:px-3 py-1 font-semibold transition-colors min-h-[36px] sm:min-h-0 flex items-center ${
                    mode === 'exam'
                      ? 'bg-[var(--color-ink)] text-[var(--color-paper)]'
                      : 'text-[var(--color-muted)] hover:text-[var(--color-ink)]'
                  }`}
                >
                  Exam
                </button>
              </div>
            )}

            {mode === 'exam' && !isSubmitted && (
              <div
                className={`font-mono text-xs px-2.5 py-1 border flex items-center gap-1.5 ${
                  timeLeft <= 120
                    ? 'border-red-600 text-red-700 bg-red-50 animate-pulse font-bold'
                    : 'border-[var(--color-rule-2)] text-[var(--color-ink)] bg-[var(--color-paper-2)]'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>{formatTimer(timeLeft)}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-[var(--container)] mx-auto px-4 sm:px-8 py-6 sm:py-8 w-full flex-1 pb-24 lg:pb-8">
        {isSubmitted ? (
          /* ============================================================== */
          /* SCORECARD & COMPREHENSIVE QUESTION REVIEW VIEW                 */
          /* ============================================================== */
          <div className="max-w-4xl mx-auto">
            {/* Score Summary Box */}
            <div className="border-2 sm:border-4 border-[var(--color-ink)] p-5 sm:p-8 bg-[var(--color-paper-2)] mb-8 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[var(--color-rule)]">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-muted)] block mb-1">
                    FBISE Examination Evaluation Sheet
                  </span>
                  <h2 className="font-[family-name:var(--font-display)] text-xl sm:text-2xl font-extrabold text-[var(--color-ink)] tracking-tight">
                    {chapter.chapterTitle}
                  </h2>
                  <p className="text-xs text-[var(--color-muted)] mt-1 font-[family-name:var(--font-body)]">
                    Mode: {mode === 'exam' ? 'Timed Board Simulation' : 'Self-Paced Practice'} · Completed in{' '}
                    {formatTimer(elapsedTime || initialExamTime - timeLeft)}
                  </p>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <span className="text-xs text-[var(--color-muted)] block uppercase font-mono">Grade</span>
                    <span className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-extrabold text-emerald-800">
                      {results.grade}
                    </span>
                  </div>
                  <div className="border-l border-[var(--color-rule)] pl-6 text-right">
                    <span className="text-xs text-[var(--color-muted)] block uppercase font-mono">Score</span>
                    <span className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-extrabold text-[var(--color-ink)]">
                      {results.correctCount}
                      <span className="text-lg font-normal text-[var(--color-muted)]">
                        /{results.total}
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress Metric Bar */}
              <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="w-full sm:w-2/3">
                  <div className="flex justify-between text-xs font-mono text-[var(--color-muted)] mb-1.5">
                    <span>Accuracy: {results.percentage}%</span>
                    <span>
                      {results.correctCount} Correct · {results.total - results.correctCount} Missed
                    </span>
                  </div>
                  <div className="w-full h-3 bg-[var(--color-paper)] border border-[var(--color-rule)] overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        results.percentage >= 70
                          ? 'bg-emerald-700'
                          : results.percentage >= 50
                          ? 'bg-amber-600'
                          : 'bg-red-700'
                      }`}
                      style={{ width: `${results.percentage}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto font-[family-name:var(--font-display)]">
                  <button
                    type="button"
                    onClick={handleRetake}
                    className="flex-1 sm:flex-initial px-4 py-2.5 min-h-[44px] bg-[var(--color-ink)] text-[var(--color-paper)] text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-neutral-800 transition-colors active:scale-95"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retake Test</span>
                  </button>
                  <Link
                    href={backHref}
                    className="flex-1 sm:flex-initial px-4 py-2.5 min-h-[44px] border border-[var(--color-ink)] text-[var(--color-ink)] text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-[var(--color-paper)] transition-colors active:scale-95"
                  >
                    <Home className="w-3.5 h-3.5" />
                    <span>Curriculum</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => openDashboardTab('stats')}
                    className="flex-1 sm:flex-initial px-3.5 py-2.5 min-h-[44px] border border-emerald-700 bg-emerald-50 text-emerald-900 text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-emerald-100 transition-colors active:scale-95"
                  >
                    <Award className="w-3.5 h-3.5 text-emerald-700" />
                    <span>My Stats</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Filter Toggle */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[var(--color-rule)] mb-6 gap-3 font-[family-name:var(--font-display)]">
              <h3 className="text-base sm:text-lg font-bold text-[var(--color-ink)]">
                Step-by-Step Question Breakdown
              </h3>
              <div className="flex items-center gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setReviewFilter('all')}
                  className={`px-3 py-1.5 min-h-[38px] border transition-colors ${
                    reviewFilter === 'all'
                      ? 'bg-[var(--color-ink)] text-[var(--color-paper)] border-[var(--color-ink)] font-bold'
                      : 'border-[var(--color-rule-2)] text-[var(--color-muted)] hover:text-[var(--color-ink)]'
                  }`}
                >
                  All Questions ({results.total})
                </button>
                <button
                  type="button"
                  onClick={() => setReviewFilter('incorrect')}
                  className={`px-3 py-1.5 min-h-[38px] border transition-colors ${
                    reviewFilter === 'incorrect'
                      ? 'bg-red-700 text-white border-red-700 font-bold'
                      : 'border-[var(--color-rule-2)] text-[var(--color-muted)] hover:text-[var(--color-ink)]'
                  }`}
                >
                  Incorrect Only ({results.total - results.correctCount})
                </button>
              </div>
            </div>

            {/* Questions Review List */}
            <div className="space-y-6">
              {results.details
                .filter((q) => (reviewFilter === 'incorrect' ? !q.isCorrect : true))
                .map((q) => {
                  const isSaved = bookmarkedIds[q.id];
                  return (
                    <article
                      key={q.id}
                      className={`border p-4 sm:p-6 transition-all ${
                        q.isCorrect
                          ? 'border-emerald-700/60 bg-emerald-50/20'
                          : 'border-red-700/60 bg-red-50/20'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-3 pb-3 border-b border-[var(--color-rule)]">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-xs font-bold text-[var(--color-muted)]">
                            Question #{q.id}
                          </span>
                          {q.isCorrect ? (
                            <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" /> Correct
                            </span>
                          ) : (
                            <span className="text-[11px] font-mono font-bold text-red-800 bg-red-100 border border-red-300 px-2 py-0.5 flex items-center gap-1">
                              <XCircle className="w-3 h-3" /> Incorrect
                            </span>
                          )}
                        </div>

                        {/* Bookmark Button */}
                        <button
                          type="button"
                          onClick={() => handleToggleBookmark(q)}
                          className={`flex items-center gap-1 text-xs px-2.5 py-1 min-h-[36px] border transition-colors font-mono ${
                            isSaved
                              ? 'border-emerald-700 bg-emerald-100 text-emerald-950 font-bold'
                              : 'border-[var(--color-rule-2)] bg-[var(--color-paper)] text-[var(--color-muted)] hover:text-emerald-900'
                          }`}
                          title={isSaved ? 'Remove from Saved Questions' : 'Save for Revision'}
                        >
                          <Bookmark
                            className={`w-3.5 h-3.5 ${
                              isSaved ? 'fill-emerald-700 text-emerald-700' : 'text-current'
                            }`}
                          />
                          <span>{isSaved ? 'Saved' : 'Save MCQ'}</span>
                        </button>
                      </div>

                      <div className="text-xs font-mono text-[var(--color-muted)] mb-3">
                        Your answer: <strong className="text-[var(--color-ink)]">{q.selected || 'None'}</strong> | Correct: <strong className="text-emerald-900">{q.correctAnswer}</strong>
                      </div>

                      <h4
                        className={`font-[family-name:var(--font-display)] text-base font-semibold text-[var(--color-ink)] mb-4 leading-relaxed ${
                          isUrdu ? 'text-right font-serif text-lg leading-relaxed' : ''
                        }`}
                        dir={isUrdu ? 'rtl' : 'ltr'}
                      >
                        {q.question}
                      </h4>

                      {/* Options list */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4 font-[family-name:var(--font-display)] text-xs">
                        {(['A', 'B', 'C', 'D'] as const).map((opt) => {
                          const optText = q.options[opt];
                          if (!optText) return null;
                          const isSelected = q.selected === opt;
                          const isActualCorrect = q.correctAnswer === opt;

                          let optClass = 'border-[var(--color-rule)] bg-[var(--color-paper)] text-[var(--color-ink)]';
                          if (isActualCorrect) {
                            optClass = 'border-emerald-700 dark:border-emerald-500 bg-emerald-100/70 dark:bg-emerald-950/50 text-emerald-950 dark:text-emerald-200 font-bold';
                          } else if (isSelected && !q.isCorrect) {
                            optClass = 'border-red-600 dark:border-red-500 bg-red-100/70 dark:bg-red-950/40 text-red-950 dark:text-red-200 line-through';
                          }

                          return (
                            <div
                              key={opt}
                              className={`p-3 border flex items-center gap-2.5 min-h-[46px] ${optClass} ${
                                isUrdu ? 'flex-row-reverse text-right' : ''
                              }`}
                              dir={isUrdu ? 'rtl' : 'ltr'}
                            >
                              <span className="font-mono font-bold px-1.5 py-0.5 border border-current text-[11px] whitespace-nowrap">
                                {isUrdu ? urduOptionLabels[opt] : opt}
                              </span>
                              <span className={`flex-1 ${isUrdu ? 'font-serif text-sm' : ''}`}>{optText}</span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Solution Justification */}
                      {q.explanation && (
                        <div
                          className={`bg-[var(--color-paper-2)] border-l-2 ${
                            isUrdu ? 'border-r-2 border-l-0 text-right' : ''
                          } border-emerald-800 dark:border-emerald-600 p-3 text-xs text-[var(--color-ink-2)] font-[family-name:var(--font-body)]`}
                          dir={isUrdu ? 'rtl' : 'ltr'}
                        >
                          <strong className="font-[family-name:var(--font-display)] uppercase tracking-wider text-[10px] text-emerald-900 dark:text-emerald-400 block mb-0.5">
                            {isUrdu ? 'امتحانی تشریح و مفہوم:' : 'Solution Justification:'}
                          </strong>
                          <p className={`text-[var(--color-ink-2)] ${isUrdu ? 'font-serif text-sm leading-relaxed' : ''}`}>
                            {q.explanation}
                          </p>
                        </div>
                      )}
                    </article>
                  );
                })}
            </div>
          </div>
        ) : (
          /* ============================================================== */
          /* ACTIVE QUIZ QUESTION VIEW                                      */
          /* ============================================================== */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
            {/* Left 8 Cols: Current Question */}
            <div className="lg:col-span-8 flex flex-col justify-between">
              <div>
                {/* Question Meta Bar */}
                <div className="flex items-center justify-between pb-3 border-b border-[var(--color-rule)] mb-6 font-[family-name:var(--font-display)] text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono bg-[var(--color-ink)] text-[var(--color-paper)] px-2.5 py-1 font-bold">
                      Q {currentIndex + 1}
                    </span>
                    <span className="text-[var(--color-muted)] font-mono">of {questions.length}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Bookmark Toggle */}
                    <button
                      type="button"
                      onClick={() => handleToggleBookmark(currentQ)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 min-h-[38px] border transition-colors font-mono text-xs ${
                        bookmarkedIds[currentQ.id]
                          ? 'border-emerald-700 dark:border-emerald-500 bg-emerald-100 dark:bg-emerald-950/50 text-emerald-950 dark:text-emerald-200 font-bold'
                          : 'border-[var(--color-rule-2)] text-[var(--color-muted)] hover:text-emerald-900 dark:hover:text-emerald-300 hover:border-emerald-700'
                      }`}
                      title="Save question to revision list"
                      aria-label="Bookmark this question"
                    >
                      <Bookmark
                        className={`w-3.5 h-3.5 ${
                          bookmarkedIds[currentQ.id] ? 'fill-emerald-700 text-emerald-700 dark:fill-emerald-400 dark:text-emerald-400' : 'text-current'
                        }`}
                      />
                      <span>{bookmarkedIds[currentQ.id] ? 'Saved' : 'Save'}</span>
                    </button>

                    {/* Flag Toggle */}
                    <button
                      type="button"
                      onClick={() => toggleFlag(currentQ.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 min-h-[38px] border transition-colors font-mono text-xs ${
                        flagged[currentQ.id]
                          ? 'border-amber-600 bg-amber-50 text-amber-900 font-bold'
                          : 'border-[var(--color-rule-2)] text-[var(--color-muted)] hover:text-[var(--color-ink)]'
                      }`}
                      title="Mark question for review later"
                      aria-label="Flag this question"
                    >
                      <Flag className={`w-3.5 h-3.5 ${flagged[currentQ.id] ? 'fill-current text-amber-600' : ''}`} />
                      <span>{flagged[currentQ.id] ? 'Flagged' : 'Flag'}</span>
                    </button>
                  </div>
                </div>

                {/* Question Prompt */}
                <div className="mb-6">
                  <h2
                    className={`font-[family-name:var(--font-display)] text-lg sm:text-2xl font-bold tracking-tight text-[var(--color-ink)] leading-snug ${
                      isUrdu ? 'text-right leading-relaxed font-serif text-2xl sm:text-3xl' : ''
                    }`}
                    dir={isUrdu ? 'rtl' : 'ltr'}
                  >
                    {currentQ.question}
                  </h2>
                </div>

                {/* 4 Options List */}
                <div className="space-y-3 font-[family-name:var(--font-display)] mb-8">
                  {(['A', 'B', 'C', 'D'] as const).map((opt) => {
                    const optText = currentQ.options[opt];
                    if (!optText) return null;
                    const isSelected = answers[currentQ.id] === opt;
                    const isCorrect = currentQ.correctAnswer === opt;
                    const hasAnswered = Boolean(answers[currentQ.id]);

                    let btnStyle =
                      'border-[var(--color-rule-2)] bg-[var(--color-paper)] hover:border-[var(--color-ink)] text-[var(--color-ink)]';

                    // Practice mode styling
                    if (mode === 'practice' && hasAnswered) {
                      if (isCorrect) {
                        btnStyle = 'border-emerald-700 dark:border-emerald-500 bg-emerald-100/70 dark:bg-emerald-950/50 text-emerald-950 dark:text-emerald-200 font-bold';
                      } else if (isSelected && !isCorrect) {
                        btnStyle = 'border-red-600 dark:border-red-500 bg-red-100/70 dark:bg-red-950/40 text-red-950 dark:text-red-200';
                      } else {
                        btnStyle = 'border-[var(--color-rule)] opacity-60 text-[var(--color-muted)]';
                      }
                    } else if (mode === 'exam' && isSelected) {
                      btnStyle =
                        'border-[var(--color-ink)] bg-[var(--color-paper-2)] font-bold text-[var(--color-ink)] ring-2 ring-[var(--color-ink)]';
                    }

                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleSelectOption(opt)}
                        className={`w-full text-left p-4 sm:p-4.5 min-h-[52px] border flex items-center justify-between gap-4 transition-all duration-150 active:scale-[0.99] ${btnStyle} ${
                          isUrdu ? 'flex-row-reverse text-right' : ''
                        }`}
                        dir={isUrdu ? 'rtl' : 'ltr'}
                      >
                        <div className={`flex items-center gap-3 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                          <span className="font-mono text-xs px-2.5 py-1 border border-current font-bold whitespace-nowrap bg-[var(--color-paper-2)]/80">
                            {isUrdu ? urduOptionLabels[opt] : opt}
                          </span>
                          <span
                            className={`text-sm sm:text-base font-normal ${
                              isUrdu ? 'font-serif text-base sm:text-lg' : ''
                            }`}
                          >
                            {optText}
                          </span>
                        </div>

                        {mode === 'practice' && hasAnswered && (
                          <div className="shrink-0">
                            {isCorrect && <CheckCircle className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />}
                            {isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Practice Mode Instant Explanation Box */}
                {mode === 'practice' && answers[currentQ.id] && currentQ.explanation && (
                  <div
                    className={`border-l-4 ${
                      isUrdu ? 'border-r-4 border-l-0 text-right' : ''
                    } border-emerald-800 dark:border-emerald-600 bg-[var(--color-paper-2)] p-4 mb-8 text-xs font-[family-name:var(--font-body)] text-[var(--color-ink)] leading-relaxed shadow-sm`}
                    dir={isUrdu ? 'rtl' : 'ltr'}
                  >
                    <div
                      className={`flex items-center gap-1.5 font-[family-name:var(--font-display)] font-bold text-emerald-900 dark:text-emerald-400 uppercase tracking-wider text-[11px] mb-1 ${
                        isUrdu ? 'flex-row-reverse' : ''
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                      <span>{isUrdu ? 'تفصیلی امتحانی تشریح و وضاحت' : 'Scientific Explanation'}</span>
                    </div>
                    <p className={`text-[var(--color-ink-2)] ${isUrdu ? 'font-serif text-sm leading-relaxed' : ''}`}>
                      {currentQ.explanation}
                    </p>
                  </div>
                )}
              </div>

              {/* Desktop Navigation Actions Footer */}
              <div className="pt-6 border-t border-[var(--color-rule)] hidden sm:flex items-center justify-between font-[family-name:var(--font-display)] text-xs">
                <button
                  type="button"
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex((prev) => prev - 1)}
                  className="px-4 py-2.5 min-h-[44px] border border-[var(--color-rule-2)] disabled:opacity-30 disabled:cursor-not-allowed hover:border-[var(--color-ink)] flex items-center gap-1.5 transition-colors font-semibold"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>

                <div className="flex items-center gap-3">
                  {currentIndex === questions.length - 1 ? (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="px-6 py-2.5 min-h-[44px] bg-emerald-800 hover:bg-emerald-900 text-white font-bold transition-colors shadow-sm active:scale-95"
                    >
                      Complete & View Score
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setCurrentIndex((prev) => prev + 1)}
                      className="px-5 py-2.5 min-h-[44px] bg-[var(--color-ink)] text-[var(--color-paper)] hover:bg-neutral-800 font-semibold flex items-center gap-1.5 transition-colors active:scale-95"
                    >
                      <span>Next</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Right 4 Cols: Question Navigator Sidebar */}
            <div className="lg:col-span-4 border border-[var(--color-rule-2)] p-5 bg-[var(--color-paper-2)] flex flex-col justify-between h-fit">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[var(--color-rule)] mb-4">
                  <h3 className="font-[family-name:var(--font-display)] text-xs font-bold uppercase tracking-wider text-[var(--color-ink)]">
                    Question Sheet
                  </h3>
                  <span className="font-mono text-xs text-[var(--color-muted)]">
                    {Object.keys(answers).length} / {questions.length} answered
                  </span>
                </div>

                {/* Question Grid Pills */}
                <div className="grid grid-cols-5 sm:grid-cols-6 lg:grid-cols-5 gap-1.5 max-h-[360px] overflow-y-auto pr-1">
                  {questions.map((q, idx) => {
                    const isAnswered = Boolean(answers[q.id]);
                    const isCurrent = idx === currentIndex;
                    const isFlag = Boolean(flagged[q.id]);
                    const isSaved = Boolean(bookmarkedIds[q.id]);

                    let pillClass =
                      'border-[var(--color-rule)] bg-[var(--color-paper)] text-[var(--color-muted)]';
                    if (isCurrent) {
                      pillClass =
                        'border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-paper)] font-bold';
                    } else if (isFlag) {
                      pillClass = 'border-amber-600 bg-amber-50 text-amber-900 font-bold';
                    } else if (isAnswered) {
                      pillClass = 'border-emerald-700 bg-emerald-100 text-emerald-950 font-medium';
                    }

                    return (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => setCurrentIndex(idx)}
                        className={`h-9 font-mono text-xs border flex items-center justify-center transition-colors relative min-h-[36px] ${pillClass}`}
                      >
                        {idx + 1}
                        {isFlag && (
                          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-600"></span>
                        )}
                        {isSaved && !isFlag && (
                          <span className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-emerald-600"></span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-6 border-t border-[var(--color-rule)] mt-6">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full py-3 min-h-[46px] bg-[var(--color-ink)] text-[var(--color-paper)] hover:bg-neutral-800 text-xs font-bold font-[family-name:var(--font-display)] tracking-wide transition-colors active:scale-95"
                >
                  Submit Examination
                </button>
                <div className="mt-3 text-[11px] text-center text-[var(--color-muted)] font-[family-name:var(--font-display)]">
                  Shortcut: Press <kbd className="px-1 border font-mono">A</kbd>-<kbd className="px-1 border font-mono">D</kbd> for options · <kbd className="px-1 border font-mono">B</kbd> bookmark
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Sticky Mobile Bottom Action Bar (Hallmark thumb zone) */}
      {!isSubmitted && (
        <div
          className="sm:hidden fixed bottom-0 left-0 right-0 z-30 bg-[var(--color-paper)]/95 backdrop-blur border-t border-[var(--color-rule)] p-2.5 shadow-lg flex items-center justify-between gap-2"
          style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 0.75rem)' }}
        >
          <button
            type="button"
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex((prev) => prev - 1)}
            className="flex-1 py-3 min-h-[48px] border border-[var(--color-rule-2)] disabled:opacity-30 disabled:cursor-not-allowed text-xs font-bold font-[family-name:var(--font-display)] flex items-center justify-center gap-1 active:scale-95 bg-[var(--color-paper)]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Prev</span>
          </button>

          <button
            type="button"
            onClick={() => handleToggleBookmark(currentQ)}
            className={`px-3.5 py-3 min-h-[48px] border text-xs font-bold flex items-center justify-center active:scale-95 ${
              bookmarkedIds[currentQ.id]
                ? 'border-emerald-700 bg-emerald-100 text-emerald-950'
                : 'border-[var(--color-rule-2)] bg-[var(--color-paper)] text-[var(--color-muted)]'
            }`}
            title="Bookmark"
            aria-label="Bookmark"
          >
            <Bookmark className={`w-4 h-4 ${bookmarkedIds[currentQ.id] ? 'fill-current' : ''}`} />
          </button>

          {currentIndex === questions.length - 1 ? (
            <button
              type="button"
              onClick={handleSubmit}
              className="flex-1 py-3 min-h-[48px] bg-emerald-800 text-white text-xs font-bold font-[family-name:var(--font-display)] flex items-center justify-center gap-1 active:scale-95 shadow-sm"
            >
              <span>Submit</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setCurrentIndex((prev) => prev + 1)}
              className="flex-1 py-3 min-h-[48px] bg-[var(--color-ink)] text-[var(--color-paper)] text-xs font-bold font-[family-name:var(--font-display)] flex items-center justify-center gap-1 active:scale-95 shadow-sm"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      {/* Embedded Study Dashboard */}
      <StudyDashboard
        isOpen={isDashboardOpen}
        onClose={() => setIsDashboardOpen(false)}
        initialTab={dashboardTab}
      />
    </div>
  );
}
