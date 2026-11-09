'use client';

import React, { useState } from 'react';
import ChapterCard from './ChapterCard';
import { ChapterMeta } from '../lib/types';
import { Atom, BookMarked, Calculator, Languages, Sparkles } from 'lucide-react';

interface SubjectTabsProps {
  physicsChapters: ChapterMeta[];
  urduChapters: ChapterMeta[];
  mathChapters: ChapterMeta[];
  englishChapters: ChapterMeta[];
}

export default function SubjectTabs({
  physicsChapters,
  urduChapters,
  mathChapters,
  englishChapters,
}: SubjectTabsProps) {
  const [activeSubject, setActiveSubject] = useState<'physics' | 'urdu' | 'math' | 'english'>('physics');

  const physicsTotal = physicsChapters.reduce((acc, c) => acc + c.totalQuestions, 0);
  const urduTotal = urduChapters.reduce((acc, c) => acc + c.totalQuestions, 0);
  const mathTotal = mathChapters.reduce((acc, c) => acc + c.totalQuestions, 0);
  const englishTotal = englishChapters.reduce((acc, c) => acc + c.totalQuestions, 0);

  const activeChapters =
    activeSubject === 'physics'
      ? physicsChapters
      : activeSubject === 'urdu'
      ? urduChapters
      : activeSubject === 'math'
      ? mathChapters
      : englishChapters;

  return (
    <div>
      {/* Subject Selector Bar */}
      <section className="mb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[var(--color-rule)]">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-xl sm:text-2xl font-bold tracking-tight text-[var(--color-ink)]">
              Class 11 FBISE Subjects (HSSC-I)
            </h2>
            <p className="text-xs text-[var(--color-muted)] mt-1">
              Select your subject below to explore full chapter-wise practice tests and timed board simulations.
            </p>
          </div>

          {/* Subject Pills */}
          <div className="flex items-center gap-2 overflow-x-auto font-[family-name:var(--font-display)] text-xs">
            <button
              type="button"
              onClick={() => setActiveSubject('physics')}
              className={`px-4 py-2 flex items-center gap-2 transition-all duration-150 border font-bold ${
                activeSubject === 'physics'
                  ? 'bg-[var(--color-ink)] text-[var(--color-paper)] border-[var(--color-ink)] shadow-sm'
                  : 'bg-[var(--color-paper)] text-[var(--color-ink)] border-[var(--color-rule-2)] hover:border-[var(--color-ink)]'
              }`}
            >
              <Atom className="w-4 h-4 text-emerald-500" />
              <span>Physics</span>
              <span className="font-mono text-[11px] opacity-80 px-1.5 py-0.2 border border-current rounded-sm">
                14 Units · {physicsTotal} Qs
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSubject('urdu')}
              className={`px-4 py-2 flex items-center gap-2 transition-all duration-150 border font-bold ${
                activeSubject === 'urdu'
                  ? 'bg-emerald-900 text-white border-emerald-900 shadow-sm'
                  : 'bg-[var(--color-paper)] text-[var(--color-ink)] border-[var(--color-rule-2)] hover:border-[var(--color-ink)]'
              }`}
            >
              <BookMarked className="w-4 h-4 text-emerald-400" />
              <span>اردو لازمی (Urdu)</span>
              <span className="font-mono text-[11px] opacity-80 px-1.5 py-0.2 border border-current rounded-sm">
                7 Units · {urduTotal} Qs
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSubject('math')}
              className={`px-4 py-2 flex items-center gap-2 transition-all duration-150 border font-bold ${
                activeSubject === 'math'
                  ? 'bg-blue-950 text-white border-blue-950 shadow-sm'
                  : 'bg-[var(--color-paper)] text-[var(--color-ink)] border-[var(--color-rule-2)] hover:border-[var(--color-ink)]'
              }`}
            >
              <Calculator className="w-4 h-4 text-amber-400" />
              <span>Mathematics</span>
              <span className="font-mono text-[11px] opacity-80 px-1.5 py-0.2 border border-current rounded-sm">
                {mathChapters.length} Units · {mathTotal} Qs
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSubject('english')}
              className={`px-4 py-2 flex items-center gap-2 transition-all duration-150 border font-bold ${
                activeSubject === 'english'
                  ? 'bg-purple-950 text-white border-purple-950 shadow-sm'
                  : 'bg-[var(--color-paper)] text-[var(--color-ink)] border-[var(--color-rule-2)] hover:border-[var(--color-ink)]'
              }`}
            >
              <Languages className="w-4 h-4 text-purple-400" />
              <span>English</span>
              <span className="font-mono text-[11px] opacity-80 px-1.5 py-0.2 border border-current rounded-sm">
                {englishChapters.length} Units · {englishTotal} Qs
              </span>
            </button>

            <button
              type="button"
              disabled
              className="px-3 py-2 border border-[var(--color-rule)] text-[var(--color-muted)] opacity-50 cursor-not-allowed hidden sm:flex items-center gap-1"
            >
              <span>Chemistry (Soon)</span>
            </button>
            <button
              type="button"
              disabled
              className="px-3 py-2 border border-[var(--color-rule)] text-[var(--color-muted)] opacity-50 cursor-not-allowed hidden sm:flex items-center gap-1"
            >
              <span>Biology (Soon)</span>
            </button>
          </div>
        </div>

        {/* Dynamic Subject Banner */}
        <div className="mt-4 p-4 border border-[var(--color-rule-2)] bg-[var(--color-paper-2)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-[family-name:var(--font-display)]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-900 font-bold block">
                {activeSubject === 'physics'
                  ? 'Active Subject: Class 11th Physics (SLO Based)'
                  : activeSubject === 'urdu'
                  ? 'فعال مضمون: وفاقی تعلیمی بورڈ لازمی اردو سال اول (FBISE Urdu)'
                  : activeSubject === 'math'
                  ? 'Active Subject: Class 11th Mathematics (HSSC-I FBISE)'
                  : 'Active Subject: Class 11th English Compulsory (HSSC-I FBISE)'}
              </span>
              <p className="text-xs text-[var(--color-muted)] mt-0.5">
                {activeSubject === 'physics'
                  ? 'All 14 textbook units + 13-year past board exams compiled with instant formula explanations.'
                  : activeSubject === 'urdu'
                  ? 'حصہ نثر، نظمیں، غزلیات، علم بیان (تشبیہ، استعارہ، مجاز مرسل، کنایہ) اور علم بدیع کے مکمل سوالات مع تفصیلی حل۔'
                  : activeSubject === 'math'
                  ? 'Units 1–5 comprehensive guess papers + 3 official FBISE Board Section A simulators with step-by-step mathematical reasoning.'
                  : 'Units 1–6 thematic SLO modules (syntax, verbals, clauses, poetic devices) + 4 official FBISE Board Section A exam simulators.'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono text-[var(--color-muted)]">
            <span>{activeChapters.length} Modules Available</span>
            <span>·</span>
            <span>
              {activeSubject === 'physics'
                ? physicsTotal
                : activeSubject === 'urdu'
                ? urduTotal
                : activeSubject === 'math'
                ? mathTotal
                : englishTotal}{' '}
              Authentic MCQs
            </span>
          </div>
        </div>
      </section>

      {/* Chapters Grid */}
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeChapters.map((chapter) => (
            <ChapterCard key={chapter.slug} chapter={chapter} />
          ))}
        </div>
      </section>
    </div>
  );
}
