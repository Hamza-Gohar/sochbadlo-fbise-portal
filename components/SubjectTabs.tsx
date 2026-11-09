'use client';

import React, { useState } from 'react';
import ChapterCard from './ChapterCard';
import { ChapterMeta } from '../lib/types';
import { Atom, BookMarked, Calculator, Languages, Cpu, Sparkles, BookOpen, ScrollText, Dna, FlaskConical } from 'lucide-react';

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
}: SubjectTabsProps) {
  const [activeGrade, setActiveGrade] = useState<'9' | '11'>('11');
  const [activeSubject, setActiveSubject] = useState<'physics' | 'urdu' | 'math' | 'english' | 'cs' | 'islamiat' | 'tarjuma' | 'biology' | 'chemistry'>('physics');

  // Detect grade from URL query on client mount
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('grade') === '9') {
        setActiveGrade('9');
      } else if (params.get('grade') === '11') {
        setActiveGrade('11');
      }
    }
  }, []);

  const physics9Total = physics9Chapters.reduce((acc, c) => acc + c.totalQuestions, 0);
  const physicsTotal = physicsChapters.reduce((acc, c) => acc + c.totalQuestions, 0);
  const urduTotal = urduChapters.reduce((acc, c) => acc + c.totalQuestions, 0);
  const mathTotal = mathChapters.reduce((acc, c) => acc + c.totalQuestions, 0);
  const englishTotal = englishChapters.reduce((acc, c) => acc + c.totalQuestions, 0);
  const csTotal = csChapters.reduce((acc, c) => acc + c.totalQuestions, 0);
  const islamiatTotal = islamiatChapters.reduce((acc, c) => acc + c.totalQuestions, 0);
  const tarjumaTotal = tarjumaChapters.reduce((acc, c) => acc + c.totalQuestions, 0);
  const biologyTotal = biologyChapters.reduce((acc, c) => acc + c.totalQuestions, 0);
  const chemistryTotal = chemistryChapters.reduce((acc, c) => acc + c.totalQuestions, 0);

  const activeChapters =
    activeGrade === '9'
      ? physics9Chapters
      : activeSubject === 'physics'
      ? physicsChapters
      : activeSubject === 'urdu'
      ? urduChapters
      : activeSubject === 'math'
      ? mathChapters
      : activeSubject === 'english'
      ? englishChapters
      : activeSubject === 'cs'
      ? csChapters
      : activeSubject === 'islamiat'
      ? islamiatChapters
      : activeSubject === 'tarjuma'
      ? tarjumaChapters
      : activeSubject === 'biology'
      ? biologyChapters
      : chemistryChapters;

  return (
    <div>
      {/* Grade Selector Switcher */}
      <section className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-[var(--color-rule-2)] bg-[var(--color-paper-2)]">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[var(--color-muted)]">
              Curriculum Level Switcher
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-lg sm:text-xl font-bold tracking-tight text-[var(--color-ink)] mt-0.5">
              {activeGrade === '9'
                ? 'Class 9th (SSC-I Matric Part 1) · Federal Board Curriculum'
                : 'Class 11th (HSSC-I Intermediate Part 1) · Federal Board Curriculum'}
            </h2>
          </div>

          <div className="flex items-center gap-2 font-[family-name:var(--font-display)]">
            <button
              type="button"
              onClick={() => setActiveGrade('9')}
              className={`px-4 py-2 border text-xs font-bold flex items-center gap-2 transition-all ${
                activeGrade === '9'
                  ? 'bg-emerald-900 text-white border-emerald-950 shadow-sm'
                  : 'bg-[var(--color-paper)] text-[var(--color-ink)] border-[var(--color-rule-2)] hover:border-[var(--color-ink)]'
              }`}
            >
              <Atom className="w-4 h-4 text-emerald-400" />
              <span>Class 9th (SSC-I)</span>
              <span className="bg-emerald-700 text-white text-[9px] font-mono px-1 py-0.2 rounded font-semibold">
                NEW
              </span>
            </button>
            <button
              type="button"
              onClick={() => setActiveGrade('11')}
              className={`px-4 py-2 border text-xs font-bold flex items-center gap-2 transition-all ${
                activeGrade === '11'
                  ? 'bg-[var(--color-ink)] text-[var(--color-paper)] border-[var(--color-ink)] shadow-sm'
                  : 'bg-[var(--color-paper)] text-[var(--color-ink)] border-[var(--color-rule-2)] hover:border-[var(--color-ink)]'
              }`}
            >
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span>Class 11th (HSSC-I)</span>
              <span className="text-[10px] opacity-75 font-mono">9 Subjects</span>
            </button>
          </div>
        </div>
      </section>

      {/* Subject Selector Bar */}
      <section className="mb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[var(--color-rule)]">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-xl sm:text-2xl font-bold tracking-tight text-[var(--color-ink)]">
              {activeGrade === '9'
                ? 'Class 9th FBISE Physics (SSC-I)'
                : 'Class 11 FBISE Subjects (HSSC-I)'}
            </h2>
            <p className="text-xs text-[var(--color-muted)] mt-1">
              {activeGrade === '9'
                ? 'Explore all 9 National Curriculum units + 2 official Section A annual board examination simulators.'
                : 'Select your subject below to explore full chapter-wise practice tests and timed board simulations.'}
            </p>
          </div>

          {activeGrade === '9' ? (
            <div className="flex items-center gap-2 font-[family-name:var(--font-display)] text-xs">
              <div className="px-4 py-2 bg-emerald-900 text-white border border-emerald-950 font-bold flex items-center gap-2 shadow-sm">
                <Atom className="w-4 h-4 text-emerald-400" />
                <span>Physics (فزکس)</span>
                <span className="font-mono text-[11px] opacity-90 px-1.5 py-0.2 border border-current rounded-sm">
                  11 Modules · {physics9Total} Qs
                </span>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 overflow-x-auto font-[family-name:var(--font-display)] text-xs pb-1">
            <button
              type="button"
              onClick={() => setActiveSubject('physics')}
              className={`px-3.5 py-2 flex items-center gap-2 transition-all duration-150 border font-bold whitespace-nowrap ${
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
              onClick={() => setActiveSubject('biology')}
              className={`px-3.5 py-2 flex items-center gap-2 transition-all duration-150 border font-bold whitespace-nowrap ${
                activeSubject === 'biology'
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-700 shadow-sm'
                  : 'bg-[var(--color-paper)] text-[var(--color-ink)] border-[var(--color-rule-2)] hover:border-[var(--color-ink)]'
              }`}
            >
              <Dna className="w-4 h-4 text-emerald-400" />
              <span>Biology (حیاتیات)</span>
              <span className="font-mono text-[11px] opacity-80 px-1.5 py-0.2 border border-current rounded-sm">
                {biologyChapters.length} Units · {biologyTotal} Qs
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSubject('chemistry')}
              className={`px-3.5 py-2 flex items-center gap-2 transition-all duration-150 border font-bold whitespace-nowrap ${
                activeSubject === 'chemistry'
                  ? 'bg-amber-950 text-amber-200 border-amber-800 shadow-sm'
                  : 'bg-[var(--color-paper)] text-[var(--color-ink)] border-[var(--color-rule-2)] hover:border-[var(--color-ink)]'
              }`}
            >
              <FlaskConical className="w-4 h-4 text-amber-400" />
              <span>Chemistry (کیمسٹری)</span>
              <span className="font-mono text-[11px] opacity-80 px-1.5 py-0.2 border border-current rounded-sm">
                {chemistryChapters.length} Units · {chemistryTotal} Qs
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSubject('urdu')}
              className={`px-3.5 py-2 flex items-center gap-2 transition-all duration-150 border font-bold whitespace-nowrap ${
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
              onClick={() => setActiveSubject('islamiat')}
              className={`px-3.5 py-2 flex items-center gap-2 transition-all duration-150 border font-bold whitespace-nowrap ${
                activeSubject === 'islamiat'
                  ? 'bg-teal-900 text-white border-teal-900 shadow-sm'
                  : 'bg-[var(--color-paper)] text-[var(--color-ink)] border-[var(--color-rule-2)] hover:border-[var(--color-ink)]'
              }`}
            >
              <BookOpen className="w-4 h-4 text-teal-300" />
              <span>اسلامیات لازمی (Islamiat)</span>
              <span className="font-mono text-[11px] opacity-80 px-1.5 py-0.2 border border-current rounded-sm">
                {islamiatChapters.length} Units · {islamiatTotal} Qs
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSubject('tarjuma')}
              className={`px-3.5 py-2 flex items-center gap-2 transition-all duration-150 border font-bold whitespace-nowrap ${
                activeSubject === 'tarjuma'
                  ? 'bg-emerald-950 text-emerald-200 border-emerald-800 shadow-sm'
                  : 'bg-[var(--color-paper)] text-[var(--color-ink)] border-[var(--color-rule-2)] hover:border-[var(--color-ink)]'
              }`}
            >
              <ScrollText className="w-4 h-4 text-emerald-400" />
              <span>ترجمۃ القرآن (Tarjuma)</span>
              <span className="font-mono text-[11px] opacity-80 px-1.5 py-0.2 border border-current rounded-sm">
                {tarjumaChapters.length} Units · {tarjumaTotal} Qs
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSubject('math')}
              className={`px-3.5 py-2 flex items-center gap-2 transition-all duration-150 border font-bold whitespace-nowrap ${
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
              className={`px-3.5 py-2 flex items-center gap-2 transition-all duration-150 border font-bold whitespace-nowrap ${
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
              onClick={() => setActiveSubject('cs')}
              className={`px-3.5 py-2 flex items-center gap-2 transition-all duration-150 border font-bold whitespace-nowrap ${
                activeSubject === 'cs'
                  ? 'bg-slate-900 text-cyan-300 border-cyan-700 shadow-sm'
                  : 'bg-[var(--color-paper)] text-[var(--color-ink)] border-[var(--color-rule-2)] hover:border-[var(--color-ink)]'
              }`}
            >
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>Computer Science</span>
              <span className="font-mono text-[11px] opacity-80 px-1.5 py-0.2 border border-current rounded-sm">
                {csChapters.length} Units · {csTotal} Qs
              </span>
            </button>
          </div>
        )}
        </div>

        {/* Dynamic Subject Banner */}
        <div className="mt-4 p-4 border border-[var(--color-rule-2)] bg-[var(--color-paper-2)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-[family-name:var(--font-display)]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 flex-shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-900 font-bold block">
                {activeGrade === '9'
                  ? 'Active Subject: Class 9th Physics (SSC-I Matric Part 1)'
                  : activeSubject === 'physics'
                  ? 'Active Subject: Class 11th Physics (SLO Based)'
                  : activeSubject === 'biology'
                  ? 'Active Subject: Class 11th Biology (HSSC-I FBISE Pre-Medical)'
                  : activeSubject === 'chemistry'
                  ? 'Active Subject: Class 11th Chemistry (HSSC-I FBISE Pre-Medical & Pre-Engineering)'
                  : activeSubject === 'urdu'
                  ? 'فعال مضمون: وفاقی تعلیمی بورڈ لازمی اردو سال اول (FBISE Urdu)'
                  : activeSubject === 'islamiat'
                  ? 'فعال مضمون: وفاقی تعلیمی بورڈ اسلامیات لازمی سال اول (FBISE Islamiat Compulsory)'
                  : activeSubject === 'tarjuma'
                  ? 'فعال مضمون: ترجمۃ القرآن المجید لازمی سال اول (FBISE Tarjuma-tul-Quran)'
                  : activeSubject === 'math'
                  ? 'Active Subject: Class 11th Mathematics (HSSC-I FBISE)'
                  : activeSubject === 'english'
                  ? 'Active Subject: Class 11th English Compulsory (HSSC-I FBISE)'
                  : 'Active Subject: Class 11th Computer Science (HSSC-I FBISE)'}
              </span>
              <p className="text-xs text-[var(--color-muted)] mt-0.5">
                {activeGrade === '9'
                  ? 'All 9 National Curriculum units (Physical Quantities, Kinematics, Dynamics, Turning Effect, Pressure, Work & Energy, Density, Magnetism, Nature of Science) + 2 official Section A annual board examination simulators.'
                  : activeSubject === 'physics'
                  ? 'All 14 textbook units + 13-year past board exams compiled with instant formula explanations.'
                  : activeSubject === 'biology'
                  ? 'All 15 National Curriculum chapters (Cell Biology, Genetics, Physiology, Biodiversity) + 2 official FBISE Board Section A exam simulators.'
                  : activeSubject === 'chemistry'
                  ? '12 core domains (Stoichiometry, Atomic Theory, Bonding, Gas Laws, Energetics, Organic) with rationales by Lecturer Ayesha Amjad + 3 FBISE Board Simulators.'
                  : activeSubject === 'urdu'
                  ? 'حصہ نثر، نظمیں، غزلیات، علم بیان (تشبیہ، استعارہ، مجاز مرسل، کنایہ) اور علم بدیع کے مکمل سوالات مع تفصیلی حل۔'
                  : activeSubject === 'islamiat'
                  ? 'علوم القرآن و الحدیث، ایمانیات، عبادات، سیرتِ طیبہ اور اخلاق و معاشرت کے مکمل 5 یونٹس مع 2 وفاقی بورڈ سالانہ ماڈل پرچے مع مستند تشریحات۔'
                  : activeSubject === 'tarjuma'
                  ? 'مقررہ قرآنی سورتیں (سورۃ البقرۃ، سورۃ آل عمران، سورۃ الانفال، سورۃ التوبۃ) کے 4 جامع یونٹس مع 3 وفاقی بورڈ سالانہ معروضی سمولیٹرز (بزبان اردو و انگریزی)۔'
                  : activeSubject === 'math'
                  ? 'Units 1–5 comprehensive guess papers + 3 official FBISE Board Section A simulators with step-by-step mathematical reasoning.'
                  : activeSubject === 'english'
                  ? 'Units 1–6 thematic SLO modules (syntax, verbals, clauses, poetic devices) + 4 official FBISE Board Section A exam simulators.'
                  : 'Chapters 1–8 topic-wise curriculum units + 3 official FBISE Board Section A simulators with author explanations (Aryan Ali & Sabahat-Ul-Hasan).'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono text-[var(--color-muted)] flex-shrink-0">
            <span>{activeChapters.length} Modules Available</span>
            <span>·</span>
            <span>
              {activeGrade === '9'
                ? physics9Total
                : activeSubject === 'physics'
                ? physicsTotal
                : activeSubject === 'biology'
                ? biologyTotal
                : activeSubject === 'chemistry'
                ? chemistryTotal
                : activeSubject === 'urdu'
                ? urduTotal
                : activeSubject === 'islamiat'
                ? islamiatTotal
                : activeSubject === 'tarjuma'
                ? tarjumaTotal
                : activeSubject === 'math'
                ? mathTotal
                : activeSubject === 'english'
                ? englishTotal
                : csTotal}{' '}
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
