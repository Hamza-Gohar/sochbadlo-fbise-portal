'use client';

import React, { useState } from 'react';
import ChapterCard from './ChapterCard';
import { ChapterMeta } from '../lib/types';
import { Atom, BookMarked, Calculator, Languages, Cpu, Sparkles, BookOpen, ScrollText, Dna, FlaskConical, Landmark } from 'lucide-react';

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
}: SubjectTabsProps) {
  const [activeGrade, setActiveGrade] = useState<'9' | '10' | '11'>('11');
  const [activeGrade10Subject, setActiveGrade10Subject] = useState<'math' | 'physics' | 'chemistry' | 'cs' | 'biology' | 'english' | 'pakstudies' | 'urdu' | 'tarjuma'>('math');
  const [activeGrade9Subject, setActiveGrade9Subject] = useState<'urdu' | 'tarjuma' | 'english' | 'islamiat' | 'chemistry' | 'cs' | 'biology' | 'math' | 'physics'>('urdu');
  const [activeSubject, setActiveSubject] = useState<'physics' | 'urdu' | 'math' | 'english' | 'cs' | 'islamiat' | 'tarjuma' | 'biology' | 'chemistry'>('physics');

  // Detect grade and subject from URL query on client mount
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('grade') === '9') {
        setActiveGrade('9');
        if (params.get('subject') === 'physics') {
          setActiveGrade9Subject('physics');
        } else if (params.get('subject') === 'math') {
          setActiveGrade9Subject('math');
        } else if (params.get('subject') === 'urdu') {
          setActiveGrade9Subject('urdu');
        } else if (params.get('subject') === 'tarjuma') {
          setActiveGrade9Subject('tarjuma');
        } else if (params.get('subject') === 'english') {
          setActiveGrade9Subject('english');
        } else if (params.get('subject') === 'islamiat') {
          setActiveGrade9Subject('islamiat');
        } else if (params.get('subject') === 'chemistry') {
          setActiveGrade9Subject('chemistry');
        } else if (params.get('subject') === 'cs') {
          setActiveGrade9Subject('cs');
        } else if (params.get('subject') === 'biology') {
          setActiveGrade9Subject('biology');
        }
      } else if (params.get('grade') === '10') {
        setActiveGrade('10');
        if (params.get('subject') === 'pakstudies') {
          setActiveGrade10Subject('pakstudies');
        } else if (params.get('subject') === 'urdu') {
          setActiveGrade10Subject('urdu');
        } else if (params.get('subject') === 'tarjuma') {
          setActiveGrade10Subject('tarjuma');
        } else if (params.get('subject') === 'english') {
          setActiveGrade10Subject('english');
        } else if (params.get('subject') === 'biology') {
          setActiveGrade10Subject('biology');
        } else if (params.get('subject') === 'cs') {
          setActiveGrade10Subject('cs');
        } else if (params.get('subject') === 'chemistry') {
          setActiveGrade10Subject('chemistry');
        } else if (params.get('subject') === 'physics') {
          setActiveGrade10Subject('physics');
        } else if (params.get('subject') === 'math') {
          setActiveGrade10Subject('math');
        }
      } else if (params.get('grade') === '11') {
        setActiveGrade('11');
      }
    }
  }, []);

  const physics9Total = physics9Chapters.reduce((acc, c) => acc + c.totalQuestions, 0);
  const math9Total = math9Chapters.reduce((acc, c) => acc + c.totalQuestions, 0);
  const urdu9Total = urdu9Chapters.reduce((acc, c) => acc + c.totalQuestions, 0);
  const tarjuma9Total = tarjuma9Chapters.reduce((acc, c) => acc + c.totalQuestions, 0);
  const english9Total = english9Chapters.reduce((acc, c) => acc + c.totalQuestions, 0);
  const islamiat9Total = islamiat9Chapters.reduce((acc, c) => acc + c.totalQuestions, 0);
  const chemistry9Total = chemistry9Chapters.reduce((acc, c) => acc + c.totalQuestions, 0);
  const cs9Total = cs9Chapters.reduce((acc, c) => acc + c.totalQuestions, 0);
  const biology9Total = biology9Chapters.reduce((acc, c) => acc + c.totalQuestions, 0);
  const math10Total = math10Chapters.reduce((acc, c) => acc + c.totalQuestions, 0);
  const physics10Total = physics10Chapters.reduce((acc, c) => acc + c.totalQuestions, 0);
  const chemistry10Total = chemistry10Chapters.reduce((acc, c) => acc + c.totalQuestions, 0);
  const cs10Total = cs10Chapters.reduce((acc, c) => acc + c.totalQuestions, 0);
  const biology10Total = biology10Chapters.reduce((acc, c) => acc + c.totalQuestions, 0);
  const english10Total = english10Chapters.reduce((acc, c) => acc + c.totalQuestions, 0);
  const pakstudies10Total = pakstudies10Chapters.reduce((acc, c) => acc + c.totalQuestions, 0);
  const urdu10Total = urdu10Chapters.reduce((acc, c) => acc + c.totalQuestions, 0);
  const tarjuma10Total = tarjuma10Chapters.reduce((acc, c) => acc + c.totalQuestions, 0);
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
    activeGrade === '10'
      ? activeGrade10Subject === 'pakstudies'
        ? pakstudies10Chapters
        : activeGrade10Subject === 'urdu'
        ? urdu10Chapters
        : activeGrade10Subject === 'tarjuma'
        ? tarjuma10Chapters
        : activeGrade10Subject === 'english'
        ? english10Chapters
        : activeGrade10Subject === 'biology'
        ? biology10Chapters
        : activeGrade10Subject === 'cs'
        ? cs10Chapters
        : activeGrade10Subject === 'chemistry'
        ? chemistry10Chapters
        : activeGrade10Subject === 'physics'
        ? physics10Chapters
        : math10Chapters
      : activeGrade === '9'
      ? activeGrade9Subject === 'urdu'
        ? urdu9Chapters
        : activeGrade9Subject === 'tarjuma'
        ? tarjuma9Chapters
        : activeGrade9Subject === 'english'
        ? english9Chapters
        : activeGrade9Subject === 'islamiat'
        ? islamiat9Chapters
        : activeGrade9Subject === 'chemistry'
        ? chemistry9Chapters
        : activeGrade9Subject === 'cs'
        ? cs9Chapters
        : activeGrade9Subject === 'biology'
        ? biology9Chapters
        : activeGrade9Subject === 'math'
        ? math9Chapters
        : physics9Chapters
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
              {activeGrade === '10'
                ? 'Class 10th (SSC-II Matric Part 2) · Federal Board Curriculum'
                : activeGrade === '9'
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
              <span className="text-[10px] opacity-75 font-mono">9 Subjects</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveGrade('10')}
              className={`px-4 py-2 border text-xs font-bold flex items-center gap-2 transition-all ${
                activeGrade === '10'
                  ? 'bg-blue-950 text-white border-blue-950 shadow-sm'
                  : 'bg-[var(--color-paper)] text-[var(--color-ink)] border-[var(--color-rule-2)] hover:border-[var(--color-ink)]'
              }`}
            >
              <Calculator className="w-4 h-4 text-amber-400" />
              <span>Class 10th (SSC-II)</span>
              <span className="text-[10px] opacity-75 font-mono">9 Subjects</span>
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
              {activeGrade === '10'
                ? activeGrade10Subject === 'pakstudies'
                  ? 'Class 10th FBISE Pakistan Studies (مطالعہ پاکستان - SSC-II Bilingual)'
                  : activeGrade10Subject === 'urdu'
                  ? 'Class 10th FBISE Urdu Compulsory (اردو لازمی - SSC-II)'
                  : activeGrade10Subject === 'tarjuma'
                  ? 'Class 10th FBISE Tarjuma-tul-Quran (ترجمۃ القرآن المجید - SSC-II Bilingual)'
                  : activeGrade10Subject === 'english'
                  ? 'Class 10th FBISE English Compulsory (انگریزی لازمی - SSC-II)'
                  : activeGrade10Subject === 'biology'
                  ? 'Class 10th FBISE Biology (حیاتیات - SSC-II)'
                  : activeGrade10Subject === 'cs'
                  ? 'Class 10th FBISE Computer Science (کمپیوٹر سائنس - SSC-II)'
                  : activeGrade10Subject === 'physics'
                  ? 'Class 10th FBISE Physics (فزکس - SSC-II)'
                  : activeGrade10Subject === 'chemistry'
                  ? 'Class 10th FBISE Chemistry (کیمسٹری - SSC-II)'
                  : 'Class 10th FBISE Mathematics (ریاضی - SSC-II)'
                : activeGrade === '9'
                ? activeGrade9Subject === 'urdu'
                  ? 'Class 9th FBISE Urdu Compulsory (اردو لازمی)'
                  : activeGrade9Subject === 'tarjuma'
                  ? 'Class 9th FBISE Tarjuma-tul-Quran (ترجمۃ القرآن المجید)'
                  : activeGrade9Subject === 'english'
                  ? 'Class 9th FBISE English Compulsory (SSC-I)'
                  : activeGrade9Subject === 'islamiat'
                  ? 'Class 9th FBISE Islamiat Compulsory (اسلامیات لازمی)'
                  : activeGrade9Subject === 'chemistry'
                  ? 'Class 9th FBISE Chemistry (کیمسٹری)'
                  : activeGrade9Subject === 'cs'
                  ? 'Class 9th FBISE Computer Science (SSC-I)'
                  : activeGrade9Subject === 'biology'
                  ? 'Class 9th FBISE Biology (حیاتیات)'
                  : activeGrade9Subject === 'math'
                  ? 'Class 9th FBISE Mathematics (SSC-I)'
                  : 'Class 9th FBISE Physics (SSC-I)'
                : 'Class 11 FBISE Subjects (HSSC-I)'}
            </h2>
            <p className="text-xs text-[var(--color-muted)] mt-1">
              {activeGrade === '10'
                ? activeGrade10Subject === 'pakstudies'
                  ? 'All 6 National Curriculum units (Culture, Sports & Leisure, Constitution & Governance, Citizenship & Rights, Foreign Policy, Economy & Resources) + 10 Annual Federal Board Examination Simulators (Bilingual Urdu + English).'
                  : activeGrade10Subject === 'urdu'
                  ? 'حصہ نثر، حصہ نظم، حصہ غزل، علم بیان، علم بدیع، قواعد و ترکیبِ نحوی، محاورات و ضرب الامثال اور اصنافِ سخن و ادب کے 8 یونٹس مع 10 سالانہ وفاقی بورڈ امتحانی سمولیٹرز۔'
                  : activeGrade10Subject === 'tarjuma'
                  ? 'All 15 Holy Quran Surahs (Al-An\'am through Ash-Shura) across 8 thematic modules + 10 Annual Federal Board Examination Simulators (Bilingual Urdu + English).'
                  : activeGrade10Subject === 'english'
                  ? 'All 10 National Curriculum units (Direct/Indirect Speech, Voice, Tenses, Verbals, Clauses, Conditionals & Modals, Parts of Speech, Conjunctions & Syntax, Prepositions & Articles, Poetic Devices) + 10 Annual Federal Board Examination Simulators.'
                  : activeGrade10Subject === 'biology'
                  ? 'All 9 National Curriculum units (Gaseous Exchange, Homeostasis, Coordination & Control, Support & Movement, Reproduction, Inheritance, Man & Environment, Biotechnology, Pharmacology) + 10 Annual Federal Board Examination Simulators.'
                  : activeGrade10Subject === 'cs'
                  ? 'All 8 National Curriculum units (Computer Systems, Computational Thinking, Programming & Web Development, Data Science, IoT & Automation, Impacts of Computing, Digital Literacy, Research Methodologies) + 10 Annual Federal Board Examination Simulators.'
                  : activeGrade10Subject === 'physics'
                  ? 'All 9 National Curriculum units (Simple Harmonic Motion, Sound, Geometrical Optics, Electrostatics, Current Electricity, Electromagnetism, Introductory Electronics, ICT, Atomic & Nuclear Physics) + 10 Annual Federal Board Examination Simulators.'
                  : activeGrade10Subject === 'chemistry'
                  ? 'All 8 National Curriculum units (Chemical Equilibrium, Acids, Bases & Salts, Organic Chemistry, Hydrocarbons, Biochemistry, Atmosphere, Water, Chemical Industries) + 10 Annual Federal Board Examination Simulators.'
                  : 'All 13 National Curriculum chapters (Quadratic Equations, Variations, Partial Fractions, Sets & Functions, Basic Statistics, Trigonometry, Circle Geometry) + 10 Annual Federal Board Examination Simulators.'
                : activeGrade === '9'
                ? activeGrade9Subject === 'urdu'
                  ? 'حصہ نثر، حصہ نظم، حصہ غزل، علم بیان، علم بدیع، اصناف ادب اور قواعد و انشا کے 7 یونٹس مع 4 وفاقی بورڈ سیکشن اے سالانہ امتحانی سمولیٹرز۔'
                  : activeGrade9Subject === 'tarjuma'
                  ? 'تمام 18 قرآنی سورتوں (مریم تا الاحقاف) کے 9 موضوعاتی ماڈیولز مع 4 وفاقی بورڈ سالانہ معروضی سمولیٹرز (بزبان اردو و انگریزی)۔'
                  : activeGrade9Subject === 'english'
                  ? 'Prepositions, Articles, Conditionals, Verbals, Poetic Devices, Parts of Speech, Transitional Devices, Passivization + 4 Board Simulators.'
                  : activeGrade9Subject === 'islamiat'
                  ? 'قرآن و حدیث، ایمانیات و عبادات، سیرتِ طیبہ، اخلاق و آداب، قسم اور شہادت، مشاہیرِ اسلام کے 7 ابواب مع 4 وفاقی بورڈ سالانہ سمولیٹرز۔'
                  : activeGrade9Subject === 'chemistry'
                  ? 'All 19 National Curriculum chapters (Nature of Science, Matter, Atomic Structure, Periodic Table, Bonding, Stoichiometry, Redox, Energetics, Equilibrium, Acids/Bases, Air & Water, Organic, Hydrocarbons, Biomolecules, Measurements, Separation, Industrial, Chromatography) + 4 Board Simulators.'
                  : activeGrade9Subject === 'cs'
                  ? 'Computer Systems, Computational Thinking, Programming Fundamentals, Data Analysis, AI Applications, Impacts & Entrepreneurship + 4 Board Simulators.'
                  : activeGrade9Subject === 'biology'
                  ? 'All 10 National Curriculum chapters (The Science of Biology, Biodiversity, The Cell, Cell Cycle, Tissues/Organs, Biomolecules, Enzymes, Plant Physiology, Floral Reproduction, Evolution) + 8 Board Simulators by Lecturer Rubina Ashraf.'
                  : activeGrade9Subject === 'math'
                  ? 'All 11 National Curriculum chapters (Real Numbers, Logarithms, Sets, Algebra, Geometry, Statistics) + 2 Board Simulators.'
                  : 'Explore all 9 National Curriculum units + 2 official Section A annual board examination simulators.'
                : 'Select your subject below to explore full chapter-wise practice tests and timed board simulations.'}
            </p>
          </div>

          {activeGrade === '10' ? (
            <div className="flex items-center gap-2 overflow-x-auto font-[family-name:var(--font-display)] text-xs pb-1">
              <button
                type="button"
                onClick={() => setActiveGrade10Subject('pakstudies')}
                className={`px-3.5 py-2 flex items-center gap-2 transition-all border font-bold whitespace-nowrap ${
                  activeGrade10Subject === 'pakstudies'
                    ? 'bg-emerald-950 text-white border-emerald-950 shadow-sm'
                    : 'bg-[var(--color-paper)] text-[var(--color-ink)] border-[var(--color-rule-2)] hover:border-[var(--color-ink)]'
                }`}
              >
                <Landmark className="w-4 h-4 text-emerald-400" />
                <span>Pak Studies (مطالعہ پاکستان)</span>
                <span className="font-mono text-[11px] opacity-90 px-1.5 py-0.2 border border-current rounded-sm">
                  {pakstudies10Chapters.length} Modules · {pakstudies10Total} Qs
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveGrade10Subject('urdu')}
                className={`px-3.5 py-2 flex items-center gap-2 transition-all border font-bold whitespace-nowrap ${
                  activeGrade10Subject === 'urdu'
                    ? 'bg-emerald-900 text-white border-emerald-950 shadow-sm'
                    : 'bg-[var(--color-paper)] text-[var(--color-ink)] border-[var(--color-rule-2)] hover:border-[var(--color-ink)]'
                }`}
              >
                <BookMarked className="w-4 h-4 text-emerald-400" />
                <span>اردو لازمی (Urdu)</span>
                <span className="font-mono text-[11px] opacity-90 px-1.5 py-0.2 border border-current rounded-sm">
                  {urdu10Chapters.length} Modules · {urdu10Total} Qs
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveGrade10Subject('tarjuma')}
                className={`px-3.5 py-2 flex items-center gap-2 transition-all border font-bold whitespace-nowrap ${
                  activeGrade10Subject === 'tarjuma'
                    ? 'bg-teal-900 text-white border-teal-950 shadow-sm'
                    : 'bg-[var(--color-paper)] text-[var(--color-ink)] border-[var(--color-rule-2)] hover:border-[var(--color-ink)]'
                }`}
              >
                <ScrollText className="w-4 h-4 text-teal-300" />
                <span>ترجمۃ القرآن (Tarjuma)</span>
                <span className="font-mono text-[11px] opacity-90 px-1.5 py-0.2 border border-current rounded-sm">
                  {tarjuma10Chapters.length} Modules · {tarjuma10Total} Qs
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveGrade10Subject('english')}
                className={`px-3.5 py-2 flex items-center gap-2 transition-all border font-bold whitespace-nowrap ${
                  activeGrade10Subject === 'english'
                    ? 'bg-purple-950 text-white border-purple-950 shadow-sm'
                    : 'bg-[var(--color-paper)] text-[var(--color-ink)] border-[var(--color-rule-2)] hover:border-[var(--color-ink)]'
                }`}
              >
                <Languages className="w-4 h-4 text-purple-400" />
                <span>English (انگریزی)</span>
                <span className="font-mono text-[11px] opacity-90 px-1.5 py-0.2 border border-current rounded-sm">
                  {english10Chapters.length} Modules · {english10Total} Qs
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveGrade10Subject('biology')}
                className={`px-3.5 py-2 flex items-center gap-2 transition-all border font-bold whitespace-nowrap ${
                  activeGrade10Subject === 'biology'
                    ? 'bg-emerald-950 text-white border-emerald-950 shadow-sm'
                    : 'bg-[var(--color-paper)] text-[var(--color-ink)] border-[var(--color-rule-2)] hover:border-[var(--color-ink)]'
                }`}
              >
                <Dna className="w-4 h-4 text-emerald-400" />
                <span>Biology (حیاتیات)</span>
                <span className="font-mono text-[11px] opacity-90 px-1.5 py-0.2 border border-current rounded-sm">
                  {biology10Chapters.length} Modules · {biology10Total} Qs
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveGrade10Subject('cs')}
                className={`px-3.5 py-2 flex items-center gap-2 transition-all border font-bold whitespace-nowrap ${
                  activeGrade10Subject === 'cs'
                    ? 'bg-cyan-950 text-white border-cyan-950 shadow-sm'
                    : 'bg-[var(--color-paper)] text-[var(--color-ink)] border-[var(--color-rule-2)] hover:border-[var(--color-ink)]'
                }`}
              >
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>Computer Science (کمپیوٹر سائنس)</span>
                <span className="font-mono text-[11px] opacity-90 px-1.5 py-0.2 border border-current rounded-sm">
                  {cs10Chapters.length} Modules · {cs10Total} Qs
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveGrade10Subject('chemistry')}
                className={`px-3.5 py-2 flex items-center gap-2 transition-all border font-bold whitespace-nowrap ${
                  activeGrade10Subject === 'chemistry'
                    ? 'bg-amber-950 text-white border-amber-950 shadow-sm'
                    : 'bg-[var(--color-paper)] text-[var(--color-ink)] border-[var(--color-rule-2)] hover:border-[var(--color-ink)]'
                }`}
              >
                <FlaskConical className="w-4 h-4 text-amber-400" />
                <span>Chemistry (کیمسٹری)</span>
                <span className="font-mono text-[11px] opacity-90 px-1.5 py-0.2 border border-current rounded-sm">
                  {chemistry10Chapters.length} Modules · {chemistry10Total} Qs
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveGrade10Subject('physics')}
                className={`px-3.5 py-2 flex items-center gap-2 transition-all border font-bold whitespace-nowrap ${
                  activeGrade10Subject === 'physics'
                    ? 'bg-sky-950 text-white border-sky-950 shadow-sm'
                    : 'bg-[var(--color-paper)] text-[var(--color-ink)] border-[var(--color-rule-2)] hover:border-[var(--color-ink)]'
                }`}
              >
                <Atom className="w-4 h-4 text-sky-400" />
                <span>Physics (فزکس)</span>
                <span className="font-mono text-[11px] opacity-90 px-1.5 py-0.2 border border-current rounded-sm">
                  {physics10Chapters.length} Modules · {physics10Total} Qs
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveGrade10Subject('math')}
                className={`px-3.5 py-2 flex items-center gap-2 transition-all border font-bold whitespace-nowrap ${
                  activeGrade10Subject === 'math'
                    ? 'bg-blue-950 text-white border-blue-950 shadow-sm'
                    : 'bg-[var(--color-paper)] text-[var(--color-ink)] border-[var(--color-rule-2)] hover:border-[var(--color-ink)]'
                }`}
              >
                <Calculator className="w-4 h-4 text-amber-400" />
                <span>Mathematics (ریاضی)</span>
                <span className="font-mono text-[11px] opacity-90 px-1.5 py-0.2 border border-current rounded-sm">
                  {math10Chapters.length} Modules · {math10Total} Qs
                </span>
              </button>
            </div>
          ) : activeGrade === '9' ? (
            <div className="flex items-center gap-2 overflow-x-auto font-[family-name:var(--font-display)] text-xs pb-1">
              <button
                type="button"
                onClick={() => setActiveGrade9Subject('urdu')}
                className={`px-3.5 py-2 flex items-center gap-2 transition-all border font-bold whitespace-nowrap ${
                  activeGrade9Subject === 'urdu'
                    ? 'bg-emerald-900 text-white border-emerald-950 shadow-sm'
                    : 'bg-[var(--color-paper)] text-[var(--color-ink)] border-[var(--color-rule-2)] hover:border-[var(--color-ink)]'
                }`}
              >
                <BookMarked className="w-4 h-4 text-emerald-400" />
                <span>اردو لازمی (Urdu)</span>
                <span className="font-mono text-[11px] opacity-90 px-1.5 py-0.2 border border-current rounded-sm">
                  {urdu9Chapters.length} Modules · {urdu9Total} Qs
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveGrade9Subject('tarjuma')}
                className={`px-3.5 py-2 flex items-center gap-2 transition-all border font-bold whitespace-nowrap ${
                  activeGrade9Subject === 'tarjuma'
                    ? 'bg-teal-900 text-white border-teal-950 shadow-sm'
                    : 'bg-[var(--color-paper)] text-[var(--color-ink)] border-[var(--color-rule-2)] hover:border-[var(--color-ink)]'
                }`}
              >
                <ScrollText className="w-4 h-4 text-teal-300" />
                <span>ترجمۃ القرآن (Tarjuma)</span>
                <span className="font-mono text-[11px] opacity-90 px-1.5 py-0.2 border border-current rounded-sm">
                  {tarjuma9Chapters.length} Modules · {tarjuma9Total} Qs
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveGrade9Subject('english')}
                className={`px-3.5 py-2 flex items-center gap-2 transition-all border font-bold whitespace-nowrap ${
                  activeGrade9Subject === 'english'
                    ? 'bg-purple-950 text-white border-purple-950 shadow-sm'
                    : 'bg-[var(--color-paper)] text-[var(--color-ink)] border-[var(--color-rule-2)] hover:border-[var(--color-ink)]'
                }`}
              >
                <Languages className="w-4 h-4 text-purple-400" />
                <span>English Compulsory</span>
                <span className="font-mono text-[11px] opacity-90 px-1.5 py-0.2 border border-current rounded-sm">
                  {english9Chapters.length} Modules · {english9Total} Qs
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveGrade9Subject('islamiat')}
                className={`px-3.5 py-2 flex items-center gap-2 transition-all border font-bold whitespace-nowrap ${
                  activeGrade9Subject === 'islamiat'
                    ? 'bg-teal-950 text-white border-teal-950 shadow-sm'
                    : 'bg-[var(--color-paper)] text-[var(--color-ink)] border-[var(--color-rule-2)] hover:border-[var(--color-ink)]'
                }`}
              >
                <BookOpen className="w-4 h-4 text-teal-400" />
                <span>اسلامیات لازمی (Islamiat)</span>
                <span className="font-mono text-[11px] opacity-90 px-1.5 py-0.2 border border-current rounded-sm">
                  {islamiat9Chapters.length} Modules · {islamiat9Total} Qs
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveGrade9Subject('chemistry')}
                className={`px-3.5 py-2 flex items-center gap-2 transition-all border font-bold whitespace-nowrap ${
                  activeGrade9Subject === 'chemistry'
                    ? 'bg-amber-950 text-amber-200 border-amber-900 shadow-sm'
                    : 'bg-[var(--color-paper)] text-[var(--color-ink)] border-[var(--color-rule-2)] hover:border-[var(--color-ink)]'
                }`}
              >
                <FlaskConical className="w-4 h-4 text-amber-400" />
                <span>Chemistry (کیمسٹری)</span>
                <span className="font-mono text-[11px] opacity-90 px-1.5 py-0.2 border border-current rounded-sm">
                  {chemistry9Chapters.length} Modules · {chemistry9Total} Qs
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveGrade9Subject('cs')}
                className={`px-3.5 py-2 flex items-center gap-2 transition-all border font-bold whitespace-nowrap ${
                  activeGrade9Subject === 'cs'
                    ? 'bg-slate-900 text-cyan-300 border-cyan-700 shadow-sm'
                    : 'bg-[var(--color-paper)] text-[var(--color-ink)] border-[var(--color-rule-2)] hover:border-[var(--color-ink)]'
                }`}
              >
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>Computer Science</span>
                <span className="font-mono text-[11px] opacity-90 px-1.5 py-0.2 border border-current rounded-sm">
                  {cs9Chapters.length} Modules · {cs9Total} Qs
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveGrade9Subject('biology')}
                className={`px-3.5 py-2 flex items-center gap-2 transition-all border font-bold whitespace-nowrap ${
                  activeGrade9Subject === 'biology'
                    ? 'bg-emerald-950 text-emerald-200 border-emerald-800 shadow-sm'
                    : 'bg-[var(--color-paper)] text-[var(--color-ink)] border-[var(--color-rule-2)] hover:border-[var(--color-ink)]'
                }`}
              >
                <Dna className="w-4 h-4 text-emerald-400" />
                <span>Biology (حیاتیات)</span>
                <span className="font-mono text-[11px] opacity-90 px-1.5 py-0.2 border border-current rounded-sm">
                  {biology9Chapters.length} Modules · {biology9Total} Qs
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveGrade9Subject('math')}
                className={`px-3.5 py-2 flex items-center gap-2 transition-all border font-bold whitespace-nowrap ${
                  activeGrade9Subject === 'math'
                    ? 'bg-blue-950 text-white border-blue-950 shadow-sm'
                    : 'bg-[var(--color-paper)] text-[var(--color-ink)] border-[var(--color-rule-2)] hover:border-[var(--color-ink)]'
                }`}
              >
                <Calculator className="w-4 h-4 text-amber-400" />
                <span>Mathematics (ریاضی)</span>
                <span className="font-mono text-[11px] opacity-90 px-1.5 py-0.2 border border-current rounded-sm">
                  {math9Chapters.length} Modules · {math9Total} Qs
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveGrade9Subject('physics')}
                className={`px-3.5 py-2 flex items-center gap-2 transition-all border font-bold whitespace-nowrap ${
                  activeGrade9Subject === 'physics'
                    ? 'bg-emerald-950 text-white border-emerald-950 shadow-sm'
                    : 'bg-[var(--color-paper)] text-[var(--color-ink)] border-[var(--color-rule-2)] hover:border-[var(--color-ink)]'
                }`}
              >
                <Atom className="w-4 h-4 text-emerald-400" />
                <span>Physics (فزکس)</span>
                <span className="font-mono text-[11px] opacity-90 px-1.5 py-0.2 border border-current rounded-sm">
                  {physics9Chapters.length} Modules · {physics9Total} Qs
                </span>
              </button>
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
                {activeGrade === '10'
                  ? activeGrade10Subject === 'pakstudies'
                    ? 'Active Subject: Class 10th Pakistan Studies (مطالعہ پاکستان - SSC-II Bilingual)'
                    : activeGrade10Subject === 'urdu'
                    ? 'فعال مضمون: وفاقی تعلیمی بورڈ اردو لازمی جماعت دہم (FBISE Urdu Class 10)'
                    : activeGrade10Subject === 'tarjuma'
                    ? 'فعال مضمون: ترجمۃ القرآن المجید جماعت دہم (FBISE Tarjuma-tul-Quran Class 10 Bilingual)'
                    : activeGrade10Subject === 'english'
                    ? 'Active Subject: Class 10th English Compulsory (SSC-II Matric Part 2)'
                    : activeGrade10Subject === 'biology'
                    ? 'Active Subject: Class 10th Biology (SSC-II Matric Part 2)'
                    : activeGrade10Subject === 'cs'
                    ? 'Active Subject: Class 10th Computer Science (SSC-II Matric Part 2)'
                    : activeGrade10Subject === 'chemistry'
                    ? 'Active Subject: Class 10th Chemistry (SSC-II Matric Part 2)'
                    : activeGrade10Subject === 'physics'
                    ? 'Active Subject: Class 10th Physics (SSC-II Matric Part 2)'
                    : 'Active Subject: Class 10th Mathematics (SSC-II Matric Part 2)'
                  : activeGrade === '9'
                  ? activeGrade9Subject === 'urdu'
                    ? 'فعال مضمون: وفاقی تعلیمی بورڈ اردو لازمی جماعت نہم (FBISE Urdu Class 9)'
                    : activeGrade9Subject === 'tarjuma'
                    ? 'فعال مضمون: ترجمۃ القرآن المجید جماعت نہم (FBISE Tarjuma-tul-Quran Class 9)'
                    : activeGrade9Subject === 'english'
                    ? 'Active Subject: Class 9th English Compulsory (SSC-I Matric Part 1)'
                    : activeGrade9Subject === 'islamiat'
                    ? 'فعال مضمون: وفاقی تعلیمی بورڈ اسلامیات لازمی جماعت نہم (FBISE Islamiat Class 9)'
                    : activeGrade9Subject === 'chemistry'
                    ? 'Active Subject: Class 9th Chemistry (SSC-I Matric Part 1)'
                    : activeGrade9Subject === 'cs'
                    ? 'Active Subject: Class 9th Computer Science (SSC-I Matric Part 1)'
                    : activeGrade9Subject === 'biology'
                    ? 'Active Subject: Class 9th Biology (SSC-I Matric Part 1)'
                    : activeGrade9Subject === 'math'
                    ? 'Active Subject: Class 9th Mathematics (SSC-I Matric Part 1)'
                    : 'Active Subject: Class 9th Physics (SSC-I Matric Part 1)'
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
                {activeGrade === '10'
                  ? activeGrade10Subject === 'pakstudies'
                    ? 'All 6 National Curriculum units + 10 official Section A annual board examination simulators (Founder Muhammad Ahmad Khan & Lecturer Tayabah Rafaqat) with bilingual conceptual rationales.'
                    : activeGrade10Subject === 'urdu'
                    ? 'حصہ نثر، حصہ نظم، حصہ غزل، علم بیان، علم بدیع، قواعد و ترکیبِ نحوی، محاورات و اصناف کے 8 یونٹس مع 10 سالانہ وفاقی بورڈ امتحانی سمولیٹرز (لیکچرار نرجس ظہیر مع محمد احمد خان)۔'
                    : activeGrade10Subject === 'tarjuma'
                    ? 'تمام 15 قرآنی سورتوں (الأنعام تا الشوریٰ) کے 8 موضوعاتی ماڈیولز مع 10 وفاقی بورڈ سالانہ معروضی سمولیٹرز (بزبان اردو و انگریزی از لیکچرار طیبہ رفاقت مع محمد احمد خان)۔'
                    : activeGrade10Subject === 'english'
                    ? 'All 10 National Curriculum units + 10 official Section A annual board examination simulators (Founder Muhammad Ahmad Khan & Soch Badlo By MAK English Faculty) with comprehensive grammatical rules and literary explanations.'
                    : activeGrade10Subject === 'biology'
                    ? 'All 9 National Curriculum units + 10 official Section A annual board examination simulators (Lecturer Ma&apos;am Rubina Ashraf & Soch Badlo By MAK Academic Board) with biological diagrams and physiological rationales.'
                    : activeGrade10Subject === 'cs'
                    ? 'All 8 National Curriculum units + 10 official Section A annual board examination simulators (Lecturer Sabahat Ul Hasan & Soch Badlo By MAK) with programming logic, algorithmic tracing, and computing rationales.'
                    : activeGrade10Subject === 'chemistry'
                    ? 'All 8 National Curriculum units + 10 official Section A annual board examination simulators (Soch Badlo By MAK Academic Board) with balanced chemical equations, equilibrium calculations, and molecular rationales.'
                    : activeGrade10Subject === 'physics'
                    ? 'All 9 National Curriculum units + 10 official Section A annual board examination simulators (Soch Badlo By MAK Academic Board) with step-by-step physical principles and formula explanations.'
                    : 'All 13 National Curriculum chapters + 10 official Section A annual board examination simulators (Lecturer Jazab, Lecturer Nimra Abid & Soch Badlo By MAK) with full mathematical reasoning.'
                  : activeGrade === '9'
                  ? activeGrade9Subject === 'urdu'
                    ? 'حصہ نثر، حصہ نظم، حصہ غزل، علم بیان، علم بدیع، اصناف ادب اور قواعد و انشا کے 7 یونٹس مع 4 وفاقی بورڈ سالانہ امتحانی سمولیٹرز (لیکچرار نرجس ظہیر)۔'
                    : activeGrade9Subject === 'tarjuma'
                    ? 'تمام 18 قرآنی سورتوں (مریم تا الاحقاف) کے 9 موضوعاتی ماڈیولز مع 4 وفاقی بورڈ سالانہ معروضی سمولیٹرز (بزبان اردو و انگریزی از لیکچرار طیبہ رفاقت)۔'
                    : activeGrade9Subject === 'english'
                    ? 'Prepositions, Articles, Conditionals (Zero–3rd), Verbals, Poetic Devices, Parts of Speech, Transitional Devices, Passivization + 4 official Section A simulators (Lecturer Adeela Naheed).'
                    : activeGrade9Subject === 'islamiat'
                    ? 'قرآن و حدیث، ایمانیات و عبادات، سیرتِ طیبہ، اخلاق و آداب، قسم و شہادت، مشاہیرِ اسلام اور جدید تقاضے مع 4 وفاقی بورڈ سالانہ امتحانی سمولیٹرز (لیکچرار طیبہ رفاقت)۔'
                    : activeGrade9Subject === 'chemistry'
                    ? 'All 19 National Curriculum chapters (Nature of Science, Matter, Atomic Structure, Periodic Table, Bonding, Stoichiometry, Redox, Energetics, Equilibrium, Acids/Bases, Air & Water, Organic, Hydrocarbons, Biomolecules, Measurements, Separation, Industrial, Chromatography) + 4 official Section A simulators (Lecturer Ayesha Amjad).'
                    : activeGrade9Subject === 'cs'
                    ? 'All 7 National Curriculum chapters (Computer Systems, Algorithms, Web/JS, Data, AI, Impacts, Entrepreneurship) + 4 official Section A simulators by Lecturer Sabahat Ul Hasan & Aryan Ali.'
                    : activeGrade9Subject === 'biology'
                    ? 'All 10 National Curriculum chapters (The Science of Biology, Biodiversity, The Cell, Cell Cycle, Tissues/Organs, Biomolecules, Enzymes, Plant Physiology, Floral Reproduction, Evolution) + 8 official Section A simulators by Lecturer Rubina Ashraf.'
                    : activeGrade9Subject === 'math'
                    ? 'All 11 National Curriculum chapters (Real Numbers, Logarithms, Sets, Factorization, Linear Equations, Trigonometry, Coordinate Geometry, Straight Lines, Polygons, Practical Geometry, Statistics) + 2 official Section A annual board examination simulators.'
                    : 'All 9 National Curriculum units (Physical Quantities, Kinematics, Dynamics, Turning Effect, Pressure, Work & Energy, Density, Magnetism, Nature of Science) + 2 official Section A annual board examination simulators.'
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
              {activeGrade === '10'
                ? activeGrade10Subject === 'pakstudies'
                  ? pakstudies10Total
                  : activeGrade10Subject === 'urdu'
                  ? urdu10Total
                  : activeGrade10Subject === 'tarjuma'
                  ? tarjuma10Total
                  : activeGrade10Subject === 'english'
                  ? english10Total
                  : activeGrade10Subject === 'biology'
                  ? biology10Total
                  : activeGrade10Subject === 'cs'
                  ? cs10Total
                  : activeGrade10Subject === 'chemistry'
                  ? chemistry10Total
                  : activeGrade10Subject === 'physics'
                  ? physics10Total
                  : math10Total
                : activeGrade === '9'
                ? activeGrade9Subject === 'urdu'
                  ? urdu9Total
                  : activeGrade9Subject === 'tarjuma'
                  ? tarjuma9Total
                  : activeGrade9Subject === 'english'
                  ? english9Total
                  : activeGrade9Subject === 'islamiat'
                  ? islamiat9Total
                  : activeGrade9Subject === 'chemistry'
                  ? chemistry9Total
                  : activeGrade9Subject === 'cs'
                  ? cs9Total
                  : activeGrade9Subject === 'biology'
                  ? biology9Total
                  : activeGrade9Subject === 'math'
                  ? math9Total
                  : physics9Total
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
