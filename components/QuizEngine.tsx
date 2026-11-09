'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
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
  Home
} from 'lucide-react';
import confetti from 'canvas-confetti';

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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'incorrect'>('all');
  
  // Timer for Exam Mode (20 minutes default = 1200 seconds)
  const [timeLeft, setTimeLeft] = useState(1200);
  const [elapsedTime, setElapsedTime] = useState(0);

  const questions = chapter.questions;
  const currentQ = questions[currentIndex] || questions[0];
  const isUrdu = slug.startsWith('urdu') || /[\u0600-\u06FF]/.test(currentQ?.question || '');

  const urduOptionLabels: Record<'A' | 'B' | 'C' | 'D', string> = {
    A: 'الف (A)',
    B: 'ب (B)',
    C: 'ج (C)',
    D: 'د (D)',
  };

  // Timer interval for Exam Mode
  useEffect(() => {
    if (mode !== 'exam' || isSubmitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [mode, isSubmitted]);

  // Handle Option Select
  const handleSelectOption = (opt: string) => {
    if (isSubmitted && mode === 'exam') return;
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: opt,
    }));
  };

  // Toggle Flag
  const toggleFlag = (qId: number) => {
    setFlagged((prev) => ({
      ...prev,
      [qId]: !prev[qId],
    }));
  };

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
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, currentQ.id, isSubmitted, questions.length]);

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
    // Save to local storage
    try {
      const bestSaved = localStorage.getItem(`score_${slug}`);
      const currentPercentage = Math.round(
        (Object.entries(answers).filter(([id, ans]) => {
          const q = questions.find((item) => item.id === Number(id));
          return q && q.correctAnswer === ans;
        }).length /
          questions.length) *
          100
      );

      if (!bestSaved || currentPercentage > JSON.parse(bestSaved).percentage) {
        localStorage.setItem(
          `score_${slug}`,
          JSON.stringify({
            score: Object.entries(answers).filter(([id, ans]) => {
              const q = questions.find((item) => item.id === Number(id));
              return q && q.correctAnswer === ans;
            }).length,
            total: questions.length,
            percentage: currentPercentage,
            updatedAt: new Date().toISOString(),
          })
        );
      }
    } catch {
      // Local storage not available
    }

    // Trigger celebration if passed with flying colors
    if (results.percentage >= 75) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    }
  }, [answers, questions, results.percentage, slug]);

  const handleRetake = () => {
    setAnswers({});
    setFlagged({});
    setIsSubmitted(false);
    setCurrentIndex(0);
    setTimeLeft(1200);
    setElapsedTime(0);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-[var(--color-paper)] flex flex-col justify-between">
      {/* Top Test Header */}
      <header className="border-b border-[var(--color-rule)] bg-[var(--color-paper)] sticky top-0 z-[var(--z-sticky-nav)]">
        <div className="max-w-[var(--container)] mx-auto px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-1.5 border border-[var(--color-rule-2)] hover:border-[var(--color-ink)] transition-colors text-[var(--color-ink)]"
              title="Return to Chapter Index"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--color-muted)] block">
                {slug === 'past-papers' ? 'Board Simulator' : `Unit ${chapter.chapterNumber.toString().padStart(2, '0')}`}
              </span>
              <h1 className="font-[family-name:var(--font-display)] text-base sm:text-lg font-bold text-[var(--color-ink)] tracking-tight">
                {chapter.chapterTitle}
              </h1>
            </div>
          </div>

          {/* Mode Switcher & Timer */}
          <div className="flex items-center gap-3">
            {!isSubmitted && (
              <div className="inline-flex border border-[var(--color-rule-2)] p-0.5 text-xs font-[family-name:var(--font-display)]">
                <button
                  type="button"
                  onClick={() => setMode('practice')}
                  className={`px-3 py-1 font-semibold transition-colors ${
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
                  className={`px-3 py-1 font-semibold transition-colors ${
                    mode === 'exam'
                      ? 'bg-[var(--color-ink)] text-[var(--color-paper)]'
                      : 'text-[var(--color-muted)] hover:text-[var(--color-ink)]'
                  }`}
                >
                  Timed Exam
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
      <main className="max-w-[var(--container)] mx-auto px-4 sm:px-8 py-8 w-full flex-1">
        {isSubmitted ? (
          /* ============================================================== */
          /* SCORECARD & COMPREHENSIVE QUESTION REVIEW VIEW                 */
          /* ============================================================== */
          <div className="max-w-4xl mx-auto">
            {/* Score Summary Box */}
            <div className="border-4 border-[var(--color-ink)] p-8 bg-[var(--color-paper-2)] mb-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[var(--color-rule)]">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-muted)] block mb-1">
                    Examination Evaluation Sheet
                  </span>
                  <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-extrabold text-[var(--color-ink)] tracking-tight">
                    {chapter.chapterTitle}
                  </h2>
                  <p className="text-xs text-[var(--color-muted)] mt-1 font-[family-name:var(--font-body)]">
                    Mode: {mode === 'exam' ? 'Timed Board Simulation' : 'Practice Test'} · Completed in{' '}
                    {formatTimer(elapsedTime || 1200 - timeLeft)}
                  </p>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <span className="text-xs text-[var(--color-muted)] block uppercase font-mono">Grade</span>
                    <span className="font-[family-name:var(--font-display)] text-4xl font-extrabold text-emerald-800">
                      {results.grade}
                    </span>
                  </div>
                  <div className="border-l border-[var(--color-rule)] pl-6 text-right">
                    <span className="text-xs text-[var(--color-muted)] block uppercase font-mono">Score</span>
                    <span className="font-[family-name:var(--font-display)] text-4xl font-extrabold text-[var(--color-ink)]">
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
                        results.percentage >= 70 ? 'bg-emerald-700' : results.percentage >= 50 ? 'bg-amber-600' : 'bg-red-700'
                      }`}
                      style={{ width: `${results.percentage}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto font-[family-name:var(--font-display)]">
                  <button
                    type="button"
                    onClick={handleRetake}
                    className="flex-1 sm:flex-initial px-4 py-2 bg-[var(--color-ink)] text-[var(--color-paper)] text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-neutral-800 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retake Quiz</span>
                  </button>
                  <Link
                    href="/"
                    className="flex-1 sm:flex-initial px-4 py-2 border border-[var(--color-ink)] text-[var(--color-ink)] text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-[var(--color-paper)] transition-colors"
                  >
                    <Home className="w-3.5 h-3.5" />
                    <span>Chapters Hub</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Filter Toggle */}
            <div className="flex items-center justify-between pb-4 border-b border-[var(--color-rule)] mb-8 font-[family-name:var(--font-display)]">
              <h3 className="text-lg font-bold text-[var(--color-ink)]">
                Step-by-Step Question Breakdown
              </h3>
              <div className="flex items-center gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setReviewFilter('all')}
                  className={`px-3 py-1 border transition-colors ${
                    reviewFilter === 'all'
                      ? 'bg-[var(--color-ink)] text-[var(--color-paper)] border-[var(--color-ink)]'
                      : 'border-[var(--color-rule-2)] text-[var(--color-muted)] hover:text-[var(--color-ink)]'
                  }`}
                >
                  All Questions ({results.total})
                </button>
                <button
                  type="button"
                  onClick={() => setReviewFilter('incorrect')}
                  className={`px-3 py-1 border transition-colors ${
                    reviewFilter === 'incorrect'
                      ? 'bg-red-700 text-white border-red-700'
                      : 'border-[var(--color-rule-2)] text-[var(--color-muted)] hover:text-[var(--color-ink)]'
                  }`}
                >
                  Incorrect Only ({results.total - results.correctCount})
                </button>
              </div>
            </div>

            {/* Questions Review List */}
            <div className="space-y-8">
              {results.details
                .filter((q) => (reviewFilter === 'incorrect' ? !q.isCorrect : true))
                .map((q) => (
                  <article
                    key={q.id}
                    className={`border p-6 transition-all ${
                      q.isCorrect
                        ? 'border-emerald-700/60 bg-emerald-50/20'
                        : 'border-red-700/60 bg-red-50/20'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4 mb-3 pb-3 border-b border-[var(--color-rule)]">
                      <div className="flex items-center gap-2">
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

                      <div className="text-xs font-mono text-[var(--color-muted)]">
                        Your answer: <strong className="text-[var(--color-ink)]">{q.selected || 'None'}</strong> | Correct: <strong className="text-emerald-900">{q.correctAnswer}</strong>
                      </div>
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
                          optClass = 'border-emerald-700 bg-emerald-100/70 text-emerald-950 font-bold';
                        } else if (isSelected && !q.isCorrect) {
                          optClass = 'border-red-600 bg-red-100/70 text-red-950 line-through';
                        }

                        return (
                          <div
                            key={opt}
                            className={`p-2.5 border flex items-center gap-2.5 ${optClass} ${
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

                    {/* Explanation */}
                    {q.explanation && (
                      <div
                        className={`bg-[var(--color-paper-2)] border-l-2 ${
                          isUrdu ? 'border-r-2 border-l-0 text-right' : ''
                        } border-emerald-800 p-3 text-xs text-[var(--color-ink-2)] font-[family-name:var(--font-body)]`}
                        dir={isUrdu ? 'rtl' : 'ltr'}
                      >
                        <strong className="font-[family-name:var(--font-display)] uppercase tracking-wider text-[10px] text-emerald-900 block mb-0.5">
                          {isUrdu ? 'امتحانی تشریح و مفہوم:' : 'Solution Justification:'}
                        </strong>
                        <p className={isUrdu ? 'font-serif text-sm leading-relaxed text-neutral-800' : ''}>
                          {q.explanation}
                        </p>
                      </div>
                    )}
                  </article>
                ))}
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
                    <span className="font-mono bg-[var(--color-ink)] text-[var(--color-paper)] px-2 py-0.5 font-bold">
                      Q {currentIndex + 1}
                    </span>
                    <span className="text-[var(--color-muted)]">of {questions.length}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleFlag(currentQ.id)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 border transition-colors ${
                      flagged[currentQ.id]
                        ? 'border-amber-600 bg-amber-50 text-amber-900 font-bold'
                        : 'border-[var(--color-rule-2)] text-[var(--color-muted)] hover:text-[var(--color-ink)]'
                    }`}
                  >
                    <Flag className={`w-3.5 h-3.5 ${flagged[currentQ.id] ? 'fill-current' : ''}`} />
                    <span>{flagged[currentQ.id] ? 'Flagged' : 'Flag'}</span>
                  </button>
                </div>

                {/* Question Prompt */}
                <div className="mb-8">
                  <h2
                    className={`font-[family-name:var(--font-display)] text-xl sm:text-2xl font-bold tracking-tight text-[var(--color-ink)] leading-snug ${
                      isUrdu ? 'text-right leading-relaxed font-serif text-2xl sm:text-3xl' : ''
                    }`}
                    dir={isUrdu ? 'rtl' : 'ltr'}
                  >
                    {currentQ.question}
                  </h2>
                </div>

                {/* 4 Options Grid */}
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
                        btnStyle = 'border-emerald-700 bg-emerald-100/70 text-emerald-950 font-bold';
                      } else if (isSelected && !isCorrect) {
                        btnStyle = 'border-red-600 bg-red-100/70 text-red-950';
                      } else {
                        btnStyle = 'border-[var(--color-rule)] opacity-60 text-[var(--color-muted)]';
                      }
                    } else if (mode === 'exam' && isSelected) {
                      btnStyle =
                        'border-[var(--color-ink)] bg-[var(--color-paper-2)] font-bold text-[var(--color-ink)] ring-1 ring-[var(--color-ink)]';
                    }

                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleSelectOption(opt)}
                        className={`w-full text-left p-4 border flex items-center justify-between gap-4 transition-all duration-150 ${btnStyle} ${
                          isUrdu ? 'flex-row-reverse text-right' : ''
                        }`}
                        dir={isUrdu ? 'rtl' : 'ltr'}
                      >
                        <div className={`flex items-center gap-3 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                          <span className="font-mono text-xs px-2 py-0.5 border border-current font-bold whitespace-nowrap">
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
                          <div>
                            {isCorrect && <CheckCircle className="w-5 h-5 text-emerald-700" />}
                            {isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-600" />}
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
                    } border-emerald-800 bg-[var(--color-paper-2)] p-4 mb-8 text-xs font-[family-name:var(--font-body)] text-[var(--color-ink)] leading-relaxed`}
                    dir={isUrdu ? 'rtl' : 'ltr'}
                  >
                    <div
                      className={`flex items-center gap-1.5 font-[family-name:var(--font-display)] font-bold text-emerald-900 uppercase tracking-wider text-[11px] mb-1 ${
                        isUrdu ? 'flex-row-reverse' : ''
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{isUrdu ? 'تفصیلی امتحانی تشریح و وضاحت' : 'Scientific Explanation'}</span>
                    </div>
                    <p className={isUrdu ? 'font-serif text-sm leading-relaxed text-neutral-800' : ''}>
                      {currentQ.explanation}
                    </p>
                  </div>
                )}
              </div>

              {/* Navigation Actions Footer */}
              <div className="pt-6 border-t border-[var(--color-rule)] flex items-center justify-between font-[family-name:var(--font-display)] text-xs">
                <button
                  type="button"
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex((prev) => prev - 1)}
                  className="px-4 py-2 border border-[var(--color-rule-2)] disabled:opacity-30 disabled:cursor-not-allowed hover:border-[var(--color-ink)] flex items-center gap-1.5 transition-colors font-semibold"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>

                <div className="flex items-center gap-3">
                  {currentIndex === questions.length - 1 ? (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="px-6 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold transition-colors shadow-sm"
                    >
                      Complete & View Score
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setCurrentIndex((prev) => prev + 1)}
                      className="px-5 py-2 bg-[var(--color-ink)] text-[var(--color-paper)] hover:bg-neutral-800 font-semibold flex items-center gap-1.5 transition-colors"
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

                    let pillClass = 'border-[var(--color-rule)] bg-[var(--color-paper)] text-[var(--color-muted)]';
                    if (isCurrent) {
                      pillClass = 'border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-paper)] font-bold';
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
                        className={`h-8 font-mono text-xs border flex items-center justify-center transition-colors relative ${pillClass}`}
                      >
                        {idx + 1}
                        {isFlag && (
                          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-600"></span>
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
                  className="w-full py-2.5 bg-[var(--color-ink)] text-[var(--color-paper)] hover:bg-neutral-800 text-xs font-bold font-[family-name:var(--font-display)] tracking-wide transition-colors"
                >
                  Submit Examination
                </button>
                <div className="mt-3 text-[11px] text-center text-[var(--color-muted)] font-[family-name:var(--font-display)]">
                  Shortcut: Press <kbd className="px-1 border font-mono">A</kbd>-<kbd className="px-1 border font-mono">D</kbd> to select option
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
