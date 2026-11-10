'use client';

import React, { useState, useEffect, useMemo } from 'react';
import ChapterCard from './ChapterCard';
import { ChapterMeta } from '../lib/types';
import {
  Atom,
  BookMarked,
  Calculator,
  Languages,
  Cpu,
  BookOpen,
  ScrollText,
  Dna,
  FlaskConical,
  Landmark,
  Search
} from 'lucide-react';

interface SubjectTabsProps {
  physicsChapters: ChapterMeta[];
  urduChapters: ChapterMeta[];
  mathChapters: ChapterMeta[];
  englishChapters: ChapterMeta[];
  csChapters: ChapterMeta[];
  islamiatChapters: ChapterMeta[];
  tarjumaChapters: ChapterMeta[];
  biologyChapters: ChapterMeta[];
  chemistryChapters: ChapterMeta[];
  physics9Chapters?: ChapterMeta[];
  math9Chapters?: ChapterMeta[];
  urdu9Chapters?: ChapterMeta[];
  tarjuma9Chapters?: ChapterMeta[];
  english9Chapters?: ChapterMeta[];
  islamiat9Chapters?: ChapterMeta[];
  chemistry9Chapters?: ChapterMeta[];
  cs9Chapters?: ChapterMeta[];
  biology9Chapters?: ChapterMeta[];
  math10Chapters?: ChapterMeta[];
  physics10Chapters?: ChapterMeta[];
  chemistry10Chapters?: ChapterMeta[];
  cs10Chapters?: ChapterMeta[];
  biology10Chapters?: ChapterMeta[];
  english10Chapters?: ChapterMeta[];
  pakstudies10Chapters?: ChapterMeta[];
  urdu10Chapters?: ChapterMeta[];
  tarjuma10Chapters?: ChapterMeta[];
  english12Chapters?: ChapterMeta[];
  urdu12Chapters?: ChapterMeta[];
  pakstudies12Chapters?: ChapterMeta[];
  tarjuma12Chapters?: ChapterMeta[];
  physics12Chapters?: ChapterMeta[];
  math12Chapters?: ChapterMeta[];
  cs12Chapters?: ChapterMeta[];
  biology12Chapters?: ChapterMeta[];
  chemistry12Chapters?: ChapterMeta[];
}

interface SubjectItem {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  chapters: ChapterMeta[];
}

export default function SubjectTabs({
  physicsChapters,
  urduChapters,
  mathChapters,
  englishChapters,
  csChapters,
  islamiatChapters,
  tarjumaChapters,
  biologyChapters,
  chemistryChapters,
  physics9Chapters = [],
  math9Chapters = [],
  urdu9Chapters = [],
  tarjuma9Chapters = [],
  english9Chapters = [],
  islamiat9Chapters = [],
  chemistry9Chapters = [],
  cs9Chapters = [],
  biology9Chapters = [],
  math10Chapters = [],
  physics10Chapters = [],
  chemistry10Chapters = [],
  cs10Chapters = [],
  biology10Chapters = [],
  english10Chapters = [],
  pakstudies10Chapters = [],
  urdu10Chapters = [],
  tarjuma10Chapters = [],
  english12Chapters = [],
  urdu12Chapters = [],
  pakstudies12Chapters = [],
  tarjuma12Chapters = [],
  physics12Chapters = [],
  math12Chapters = [],
  cs12Chapters = [],
  biology12Chapters = [],
  chemistry12Chapters = [],
}: SubjectTabsProps) {
  const [activeGrade, setActiveGrade] = useState<'9' | '10' | '11' | '12'>('12');
  const [activeSubjectId, setActiveSubjectId] = useState<string>('physics');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Structured subject list per grade
  const gradeSubjects: Record<'9' | '10' | '11' | '12', SubjectItem[]> = useMemo(
    () => ({
      '12': [
        { id: 'physics', name: 'Physics (فزکس)', icon: Atom, chapters: physics12Chapters },
        { id: 'chemistry', name: 'Chemistry (کیمسٹری)', icon: FlaskConical, chapters: chemistry12Chapters },
        { id: 'math', name: 'Mathematics (ریاضی)', icon: Calculator, chapters: math12Chapters },
        { id: 'cs', name: 'Computer Science (کمپیوٹر سائنس)', icon: Cpu, chapters: cs12Chapters },
        { id: 'biology', name: 'Biology (حیاتیات)', icon: Dna, chapters: biology12Chapters },
        { id: 'english', name: 'English Compulsory', icon: Languages, chapters: english12Chapters },
        { id: 'urdu', name: 'Urdu (اردو لازمی)', icon: BookMarked, chapters: urdu12Chapters },
        { id: 'pakstudies', name: 'Pakistan Studies (مطالعہ پاکستان)', icon: Landmark, chapters: pakstudies12Chapters },
        { id: 'tarjuma', name: 'Tarjuma-tul-Quran (ترجمۃ القرآن)', icon: ScrollText, chapters: tarjuma12Chapters },
      ],
      '11': [
        { id: 'physics', name: 'Physics (فزکس)', icon: Atom, chapters: physicsChapters },
        { id: 'biology', name: 'Biology (حیاتیات)', icon: Dna, chapters: biologyChapters },
        { id: 'chemistry', name: 'Chemistry (کیمسٹری)', icon: FlaskConical, chapters: chemistryChapters },
        { id: 'math', name: 'Mathematics (ریاضی)', icon: Calculator, chapters: mathChapters },
        { id: 'cs', name: 'Computer Science', icon: Cpu, chapters: csChapters },
        { id: 'english', name: 'English Compulsory', icon: Languages, chapters: englishChapters },
        { id: 'urdu', name: 'Urdu (اردو لازمی)', icon: BookMarked, chapters: urduChapters },
        { id: 'islamiat', name: 'Islamiat (اسلامیات لازمی)', icon: BookOpen, chapters: islamiatChapters },
        { id: 'tarjuma', name: 'Tarjuma-tul-Quran (ترجمۃ القرآن)', icon: ScrollText, chapters: tarjumaChapters },
      ],
      '10': [
        { id: 'math', name: 'Mathematics (ریاضی)', icon: Calculator, chapters: math10Chapters },
        { id: 'physics', name: 'Physics (فزکس)', icon: Atom, chapters: physics10Chapters },
        { id: 'chemistry', name: 'Chemistry (کیمسٹری)', icon: FlaskConical, chapters: chemistry10Chapters },
        { id: 'cs', name: 'Computer Science', icon: Cpu, chapters: cs10Chapters },
        { id: 'biology', name: 'Biology (حیاتیات)', icon: Dna, chapters: biology10Chapters },
        { id: 'english', name: 'English Compulsory', icon: Languages, chapters: english10Chapters },
        { id: 'pakstudies', name: 'Pakistan Studies (مطالعہ پاکستان)', icon: Landmark, chapters: pakstudies10Chapters },
        { id: 'urdu', name: 'Urdu (اردو لازمی)', icon: BookMarked, chapters: urdu10Chapters },
        { id: 'tarjuma', name: 'Tarjuma-tul-Quran (ترجمۃ القرآن)', icon: ScrollText, chapters: tarjuma10Chapters },
      ],
      '9': [
        { id: 'physics', name: 'Physics (فزکس)', icon: Atom, chapters: physics9Chapters },
        { id: 'chemistry', name: 'Chemistry (کیمسٹری)', icon: FlaskConical, chapters: chemistry9Chapters },
        { id: 'math', name: 'Mathematics (ریاضی)', icon: Calculator, chapters: math9Chapters },
        { id: 'biology', name: 'Biology (حیاتیات)', icon: Dna, chapters: biology9Chapters },
        { id: 'cs', name: 'Computer Science', icon: Cpu, chapters: cs9Chapters },
        { id: 'english', name: 'English Compulsory', icon: Languages, chapters: english9Chapters },
        { id: 'islamiat', name: 'Islamiat (اسلامیات لازمی)', icon: BookOpen, chapters: islamiat9Chapters },
        { id: 'urdu', name: 'Urdu (اردو لازمی)', icon: BookMarked, chapters: urdu9Chapters },
        { id: 'tarjuma', name: 'Tarjuma-tul-Quran (ترجمۃ القرآن)', icon: ScrollText, chapters: tarjuma9Chapters },
      ],
    }),
    [
      physics12Chapters,
      chemistry12Chapters,
      math12Chapters,
      cs12Chapters,
      biology12Chapters,
      english12Chapters,
      urdu12Chapters,
      pakstudies12Chapters,
      tarjuma12Chapters,
      physicsChapters,
      biologyChapters,
      chemistryChapters,
      mathChapters,
      csChapters,
      englishChapters,
      urduChapters,
      islamiatChapters,
      tarjumaChapters,
      math10Chapters,
      physics10Chapters,
      chemistry10Chapters,
      cs10Chapters,
      biology10Chapters,
      english10Chapters,
      pakstudies10Chapters,
      urdu10Chapters,
      tarjuma10Chapters,
      physics9Chapters,
      chemistry9Chapters,
      math9Chapters,
      biology9Chapters,
      cs9Chapters,
      english9Chapters,
      islamiat9Chapters,
      urdu9Chapters,
      tarjuma9Chapters,
    ]
  );

  // Read URL query parameters on initial load
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const gradeParam = params.get('grade');
      const subjectParam = params.get('subject');

      if (gradeParam === '9' || gradeParam === '10' || gradeParam === '11' || gradeParam === '12') {
        setActiveGrade(gradeParam);
      }
      if (subjectParam) {
        setActiveSubjectId(subjectParam);
      }
    }
  }, []);

  // Update URL parameters when student switches grade or subject (without page reload)
  const handleGradeChange = (grade: '9' | '10' | '11' | '12') => {
    setActiveGrade(grade);
    const available = gradeSubjects[grade];
    // Keep same subject if available, otherwise switch to first subject of that grade
    const exists = available.some((s) => s.id === activeSubjectId);
    const newSubjectId = exists ? activeSubjectId : available[0].id;
    setActiveSubjectId(newSubjectId);
    setSearchQuery('');

    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('grade', grade);
      url.searchParams.set('subject', newSubjectId);
      window.history.replaceState({}, '', url.toString());
    }
  };

  const handleSubjectChange = (subjectId: string) => {
    setActiveSubjectId(subjectId);
    setSearchQuery('');

    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('grade', activeGrade);
      url.searchParams.set('subject', subjectId);
      window.history.replaceState({}, '', url.toString());
    }
  };

  // Get current active subject and its chapters
  const currentGradeSubjects = gradeSubjects[activeGrade] || gradeSubjects['12'];
  const activeSubjectItem =
    currentGradeSubjects.find((s) => s.id === activeSubjectId) || currentGradeSubjects[0];
  const activeChapters = useMemo(() => activeSubjectItem?.chapters || [], [activeSubjectItem]);

  // Filter chapters based on user search query
  const filteredChapters = useMemo(() => {
    if (!searchQuery.trim()) return activeChapters;
    const query = searchQuery.toLowerCase().trim();
    return activeChapters.filter(
      (c) =>
        c.title.toLowerCase().includes(query) ||
        `unit ${c.chapterNumber}`.toLowerCase().includes(query) ||
        c.slug.toLowerCase().includes(query)
    );
  }, [activeChapters, searchQuery]);

  const totalSubjectMCQs = useMemo(
    () => activeChapters.reduce((acc, c) => acc + c.totalQuestions, 0),
    [activeChapters]
  );

  return (
    <div className="w-full">
      {/* ============================================================== */}
      {/* 1. GRADE SELECTOR: Clean 2x2 Grid on Mobile, 4-Cols on Desktop */}
      {/* ============================================================== */}
      <section className="mb-6">
        <div className="p-3 sm:p-4 border border-[var(--color-rule-2)] bg-[var(--color-paper-2)]">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--color-muted)] font-bold">
              Step 1 · Select Your Curriculum Grade
            </span>
            <span className="text-[11px] font-mono text-[var(--color-muted)] hidden sm:inline">
              4 Examination Tracks
            </span>
          </div>

          {/* Clean 4-Button Grid - ZERO horizontal scrolling */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-[family-name:var(--font-display)] w-full">
            <button
              type="button"
              onClick={() => handleGradeChange('9')}
              className={`p-3 min-h-[48px] border text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
                activeGrade === '9'
                  ? 'bg-emerald-900 text-white border-emerald-950 shadow-sm'
                  : 'bg-[var(--color-paper)] text-[var(--color-ink)] border-[var(--color-rule-2)] hover:border-[var(--color-ink)]'
              }`}
            >
              <Atom className="w-4 h-4 text-emerald-400 shrink-0" />
              <div className="text-left">
                <span className="block leading-tight">Class 9th</span>
                <span className="text-[10px] opacity-75 font-mono block">SSC-I Matric</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleGradeChange('10')}
              className={`p-3 min-h-[48px] border text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
                activeGrade === '10'
                  ? 'bg-blue-950 text-white border-blue-950 shadow-sm'
                  : 'bg-[var(--color-paper)] text-[var(--color-ink)] border-[var(--color-rule-2)] hover:border-[var(--color-ink)]'
              }`}
            >
              <Calculator className="w-4 h-4 text-amber-400 shrink-0" />
              <div className="text-left">
                <span className="block leading-tight">Class 10th</span>
                <span className="text-[10px] opacity-75 font-mono block">SSC-II Matric</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleGradeChange('11')}
              className={`p-3 min-h-[48px] border text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
                activeGrade === '11'
                  ? 'bg-[var(--color-ink)] text-[var(--color-paper)] border-[var(--color-ink)] shadow-sm'
                  : 'bg-[var(--color-paper)] text-[var(--color-ink)] border-[var(--color-rule-2)] hover:border-[var(--color-ink)]'
              }`}
            >
              <BookOpen className="w-4 h-4 text-emerald-400 shrink-0" />
              <div className="text-left">
                <span className="block leading-tight">Class 11th</span>
                <span className="text-[10px] opacity-75 font-mono block">HSSC-I Inter</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleGradeChange('12')}
              className={`p-3 min-h-[48px] border text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
                activeGrade === '12'
                  ? 'bg-purple-950 text-white border-purple-950 shadow-sm'
                  : 'bg-[var(--color-paper)] text-[var(--color-ink)] border-[var(--color-rule-2)] hover:border-[var(--color-ink)]'
              }`}
            >
              <Landmark className="w-4 h-4 text-purple-300 shrink-0" />
              <div className="text-left">
                <span className="block leading-tight">Class 12th</span>
                <span className="text-[10px] opacity-75 font-mono block">HSSC-II Inter</span>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. SUBJECT SELECTOR: Full Width Wrapping Chips - ZERO OVERFLOW */}
      {/* ============================================================== */}
      <section className="mb-8">
        <div className="pb-4 border-b border-[var(--color-rule)]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--color-muted)] font-bold">
              Step 2 · Choose Your Subject ({currentGradeSubjects.length} Available)
            </span>
            <span className="text-xs font-mono text-emerald-800 font-semibold hidden sm:inline">
              All Units Aligned to FBISE SLOs
            </span>
          </div>

          {/* Subject Pills wrap naturally on mobile without ANY horizontal scrolling */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 font-[family-name:var(--font-display)] text-xs w-full">
            {currentGradeSubjects.map((sub) => {
              const Icon = sub.icon;
              const isSelected = activeSubjectItem?.id === sub.id;
              const moduleCount = sub.chapters.length;

              return (
                <button
                  key={sub.id}
                  type="button"
                  onClick={() => handleSubjectChange(sub.id)}
                  className={`px-3 py-2 min-h-[44px] flex items-center gap-2 transition-all border font-bold text-xs active:scale-[0.98] ${
                    isSelected
                      ? 'bg-[var(--color-ink)] text-[var(--color-paper)] border-[var(--color-ink)] shadow-sm'
                      : 'bg-[var(--color-paper)] text-[var(--color-ink)] border-[var(--color-rule-2)] hover:border-[var(--color-ink)]'
                  }`}
                  aria-pressed={isSelected}
                >
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-emerald-400' : 'text-emerald-700'}`} />
                  <span>{sub.name}</span>
                  <span className={`font-mono text-[10px] px-1.5 py-0.2 border border-current rounded-sm ${
                    isSelected ? 'opacity-90' : 'text-[var(--color-muted)]'
                  }`}>
                    {moduleCount}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. ACTIVE SUBJECT BANNER & SEARCH/FILTER BAR                    */}
      {/* ============================================================== */}
      <section className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-[var(--color-rule-2)] bg-[var(--color-paper-alt)]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest bg-emerald-100 text-emerald-900 border border-emerald-300 px-1.5 py-0.5 font-bold">
                Class {activeGrade}th
              </span>
              <h2 className="font-[family-name:var(--font-display)] text-lg sm:text-xl font-bold tracking-tight text-[var(--color-ink)]">
                {activeSubjectItem?.name}
              </h2>
            </div>
            <p className="text-xs text-[var(--color-muted)] font-[family-name:var(--font-body)] mt-1">
              Federal Board National Curriculum · {activeChapters.length} Practice Units & Section A Simulators · {totalSubjectMCQs} Total MCQs
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-2 text-xs font-mono shrink-0">
            <span className="px-2.5 py-1.5 border border-[var(--color-rule)] bg-[var(--color-paper)] font-bold text-[var(--color-ink)]">
              {activeChapters.length} Modules
            </span>
            <span className="px-2.5 py-1.5 border border-emerald-700 bg-emerald-50 text-emerald-950 font-bold">
              {totalSubjectMCQs} MCQs
            </span>
          </div>
        </div>

        {/* Real-Time Chapter Search Filter */}
        <div className="mt-3 flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[var(--color-muted)] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${activeChapters.length} chapters, topics, or past paper simulators...`}
              className="w-full pl-9 pr-8 py-2.5 min-h-[42px] border border-[var(--color-rule-2)] bg-[var(--color-paper)] text-xs font-[family-name:var(--font-body)] text-[var(--color-ink)] placeholder:text-[var(--color-muted)] focus:outline-none focus:border-[var(--color-ink)] transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-mono px-1.5 py-0.5 text-[var(--color-muted)] hover:text-[var(--color-ink)]"
                title="Clear Search"
              >
                ✕
              </button>
            )}
          </div>
          {searchQuery && (
            <span className="text-xs font-mono text-[var(--color-muted)] shrink-0 hidden sm:inline">
              Found {filteredChapters.length} matching
            </span>
          )}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. CHAPTERS GRID: Responsive 1/2/3 Columns                     */}
      {/* ============================================================== */}
      <section className="mb-16">
        {filteredChapters.length === 0 ? (
          <div className="border-2 border-dashed border-[var(--color-rule-2)] p-12 text-center text-[var(--color-muted)] space-y-3">
            <Search className="w-8 h-8 mx-auto text-[var(--color-muted)]" />
            <p className="font-[family-name:var(--font-display)] font-bold text-sm text-[var(--color-ink)]">
              No modules found matching &ldquo;{searchQuery}&rdquo;
            </p>
            <p className="text-xs max-w-sm mx-auto">
              Try searching with another keyword or clear the search to view all {activeChapters.length} units in {activeSubjectItem?.name}.
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="px-3.5 py-1.5 border border-[var(--color-ink)] text-xs font-bold font-mono text-[var(--color-ink)] hover:bg-[var(--color-paper-2)] transition-colors"
            >
              Clear Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredChapters.map((chapter) => (
              <ChapterCard key={chapter.slug} chapter={chapter} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
