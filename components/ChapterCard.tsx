'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChapterMeta } from '../lib/types';
import { Play, Sparkles, CheckCircle } from 'lucide-react';

interface ChapterCardProps {
  chapter: ChapterMeta;
}

export default function ChapterCard({ chapter }: ChapterCardProps) {
  const [bestScore, setBestScore] = useState<{ score: number; total: number; percentage: number } | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(`score_${chapter.slug}`);
      if (stored) {
        setBestScore(JSON.parse(stored));
      }
    } catch {
      // Local storage not available
    }
  }, [chapter.slug]);

  const isPastPapers = chapter.slug === 'past-papers';

  return (
    <article
      className={`relative border p-6 flex flex-col justify-between transition-all duration-200 ${
        isPastPapers
          ? 'border-emerald-800 bg-emerald-50/40 col-span-1 md:col-span-2 shadow-sm'
          : 'border-[var(--color-rule-2)] bg-[var(--color-paper)] hover:border-[var(--color-ink)]'
      }`}
    >
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[var(--color-rule)] mb-4">
          <span className="font-[family-name:var(--font-display)] text-xs font-bold tracking-widest uppercase text-[var(--color-muted)]">
            {isPastPapers ? 'Board Simulator' : `Unit ${chapter.chapterNumber.toString().padStart(2, '0')}`}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono bg-[var(--color-paper-2)] border border-[var(--color-rule)] px-2 py-0.5 text-[var(--color-ink)]">
              {chapter.totalQuestions} MCQs
            </span>
            {bestScore && (
              <span
                className={`text-[11px] font-mono px-2 py-0.5 border flex items-center gap-1 ${
                  bestScore.percentage >= 80
                    ? 'border-emerald-600 bg-emerald-100/60 text-emerald-900 font-bold'
                    : 'border-amber-600 bg-amber-50 text-amber-900'
                }`}
              >
                <CheckCircle className="w-3 h-3" />
                Best: {bestScore.percentage}%
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="font-[family-name:var(--font-display)] text-lg sm:text-xl font-bold tracking-tight text-[var(--color-ink)] leading-snug mb-3">
          {chapter.title}
        </h3>

        <p className="text-xs text-[var(--color-muted)] leading-relaxed mb-6 font-[family-name:var(--font-body)]">
          {isPastPapers
            ? 'Official past board exam papers (FBISE 2010–2022). Comprehensive simulation matching the exact 17-mark section A pattern.'
            : `Comprehensive conceptual questions, dimensional formulas, and numericals for ${chapter.title} aligned with textbook SLOs.`}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="pt-4 border-t border-[var(--color-rule)] flex flex-col sm:flex-row gap-2 font-[family-name:var(--font-display)]">
        <Link
          href={`/test/${chapter.slug}?mode=practice`}
          className="flex-1 text-center py-2 px-3 border border-[var(--color-ink)] text-[var(--color-ink)] hover:bg-[var(--color-paper-2)] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
          <span>Practice Mode</span>
        </Link>
        <Link
          href={`/test/${chapter.slug}?mode=exam`}
          className="flex-1 text-center py-2 px-3 bg-[var(--color-ink)] text-[var(--color-paper)] hover:bg-neutral-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Timed Exam</span>
        </Link>
      </div>
    </article>
  );
}
