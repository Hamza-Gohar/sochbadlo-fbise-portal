import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SubjectTabs from '../components/SubjectTabs';
import RecentStudyCard from '../components/RecentStudyCard';
import { getChaptersIndex } from '../lib/data';

export default function HomePage() {
  const physicsChapters = getChaptersIndex('physics');
  const biologyChapters = getChaptersIndex('biology');
  const chemistryChapters = getChaptersIndex('chemistry');
  const urduChapters = getChaptersIndex('urdu');
  const mathChapters = getChaptersIndex('math');
  const englishChapters = getChaptersIndex('english');
  const csChapters = getChaptersIndex('cs');
  const islamiatChapters = getChaptersIndex('islamiat');
  const tarjumaChapters = getChaptersIndex('tarjuma');
  const physics9Chapters = getChaptersIndex('physics-9');
  const math9Chapters = getChaptersIndex('math-9');
  const urdu9Chapters = getChaptersIndex('urdu-9');
  const tarjuma9Chapters = getChaptersIndex('tarjuma-9');
  const english9Chapters = getChaptersIndex('english-9');
  const islamiat9Chapters = getChaptersIndex('islamiat-9');
  const chemistry9Chapters = getChaptersIndex('chemistry-9');
  const cs9Chapters = getChaptersIndex('cs-9');
  const biology9Chapters = getChaptersIndex('biology-9');
  const math10Chapters = getChaptersIndex('math-10');
  const physics10Chapters = getChaptersIndex('physics-10');
  const chemistry10Chapters = getChaptersIndex('chemistry-10');
  const cs10Chapters = getChaptersIndex('cs-10');
  const biology10Chapters = getChaptersIndex('biology-10');
  const english10Chapters = getChaptersIndex('english-10');
  const pakstudies10Chapters = getChaptersIndex('pakstudies-10');
  const urdu10Chapters = getChaptersIndex('urdu-10');
  const tarjuma10Chapters = getChaptersIndex('tarjuma-10');
  const english12Chapters = getChaptersIndex('english-12');
  const urdu12Chapters = getChaptersIndex('urdu-12');
  const pakstudies12Chapters = getChaptersIndex('pakstudies-12');
  const tarjuma12Chapters = getChaptersIndex('tarjuma-12');
  const physics12Chapters = getChaptersIndex('physics-12');
  const math12Chapters = getChaptersIndex('math-12');
  const cs12Chapters = getChaptersIndex('cs-12');
  const biology12Chapters = getChaptersIndex('biology-12');
  const chemistry12Chapters = getChaptersIndex('chemistry-12');

  const physicsTotal = physicsChapters.reduce((acc, c) => acc + c.totalQuestions, 0);
  const biologyTotal = biologyChapters.reduce((acc, c) => acc + c.totalQuestions, 0);
  const chemistryTotal = chemistryChapters.reduce((acc, c) => acc + c.totalQuestions, 0);
  const urduTotal = urduChapters.reduce((acc, c) => acc + c.totalQuestions, 0);
  const mathTotal = mathChapters.reduce((acc, c) => acc + c.totalQuestions, 0);
  const englishTotal = englishChapters.reduce((acc, c) => acc + c.totalQuestions, 0);
  const csTotal = csChapters.reduce((acc, c) => acc + c.totalQuestions, 0);
  const islamiatTotal = islamiatChapters.reduce((acc, c) => acc + c.totalQuestions, 0);
  const tarjumaTotal = tarjumaChapters.reduce((acc, c) => acc + c.totalQuestions, 0);
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
  const english12Total = english12Chapters.reduce((acc, c) => acc + c.totalQuestions, 0);
  const urdu12Total = urdu12Chapters.reduce((acc, c) => acc + c.totalQuestions, 0);
  const pakstudies12Total = pakstudies12Chapters.reduce((acc, c) => acc + c.totalQuestions, 0);
  const tarjuma12Total = tarjuma12Chapters.reduce((acc, c) => acc + c.totalQuestions, 0);
  const physics12Total = physics12Chapters.reduce((acc, c) => acc + c.totalQuestions, 0);
  const chemistry12Total = chemistry12Chapters.reduce((acc, c) => acc + c.totalQuestions, 0);
  const math12Total = math12Chapters.reduce((acc, c) => acc + c.totalQuestions, 0);
  const cs12Total = cs12Chapters.reduce((acc, c) => acc + c.totalQuestions, 0);
  const biology12Total = biology12Chapters.reduce((acc, c) => acc + c.totalQuestions, 0);

  const totalQuestions =
    physicsTotal +
    biologyTotal +
    chemistryTotal +
    urduTotal +
    mathTotal +
    englishTotal +
    csTotal +
    islamiatTotal +
    tarjumaTotal +
    physics9Total +
    math9Total +
    urdu9Total +
    tarjuma9Total +
    english9Total +
    islamiat9Total +
    chemistry9Total +
    cs9Total +
    biology9Total +
    math10Total +
    physics10Total +
    chemistry10Total +
    cs10Total +
    biology10Total +
    english10Total +
    pakstudies10Total +
    urdu10Total +
    tarjuma10Total +
    english12Total +
    urdu12Total +
    pakstudies12Total +
    tarjuma12Total +
    physics12Total +
    chemistry12Total +
    math12Total +
    cs12Total +
    biology12Total;
  const totalModules =
    physicsChapters.length +
    biologyChapters.length +
    chemistryChapters.length +
    urduChapters.length +
    mathChapters.length +
    englishChapters.length +
    csChapters.length +
    islamiatChapters.length +
    tarjumaChapters.length +
    physics9Chapters.length +
    math9Chapters.length +
    urdu9Chapters.length +
    tarjuma9Chapters.length +
    english9Chapters.length +
    islamiat9Chapters.length +
    chemistry9Chapters.length +
    cs9Chapters.length +
    biology9Chapters.length +
    math10Chapters.length +
    physics10Chapters.length +
    chemistry10Chapters.length +
    cs10Chapters.length +
    biology10Chapters.length +
    english10Chapters.length +
    pakstudies10Chapters.length +
    urdu10Chapters.length +
    tarjuma10Chapters.length +
    english12Chapters.length +
    urdu12Chapters.length +
    pakstudies12Chapters.length +
    tarjuma12Chapters.length +
    physics12Chapters.length +
    chemistry12Chapters.length +
    math12Chapters.length +
    cs12Chapters.length +
    biology12Chapters.length;

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Navbar />

      <main className="max-w-[var(--container)] mx-auto px-4 sm:px-8 py-10 w-full">
        {/* Debloated Hallmark Editorial Hero */}
        <section className="border-b-4 border-[var(--color-ink)] pb-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 border border-[var(--color-rule-2)] text-xs font-mono uppercase tracking-widest text-[var(--color-muted)] mb-3 bg-[var(--color-paper-2)]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                Official FBISE Preparation Portal · Class 9th, 10th, 11th & 12th
              </div>
              <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--color-ink)] leading-[1.08] mb-3">
                Master Board Examinations with Verified MCQs
              </h1>
              <p className="text-sm sm:text-base text-[var(--color-ink-2)] max-w-xl leading-relaxed font-[family-name:var(--font-body)]">
                Official SLO-aligned chapter tests and timed Section A board exam simulators with step-by-step solutions for Matric (SSC) and Intermediate (HSSC) students.
              </p>
            </div>

            {/* Quick Metrics Strip */}
            <div className="grid grid-cols-3 gap-3 border border-[var(--color-rule-2)] p-3.5 bg-[var(--color-paper-2)] font-[family-name:var(--font-display)] shrink-0">
              <div>
                <span className="text-xl sm:text-2xl font-extrabold text-[var(--color-ink)] block">
                  {totalModules}
                </span>
                <span className="text-[11px] uppercase text-[var(--color-muted)] tracking-wider">
                  Modules
                </span>
              </div>
              <div className="border-l border-[var(--color-rule)] pl-3">
                <span className="text-xl sm:text-2xl font-extrabold text-[var(--color-ink)] block">
                  {totalQuestions.toLocaleString()}
                </span>
                <span className="text-[11px] uppercase text-[var(--color-muted)] tracking-wider">
                  Active MCQs
                </span>
              </div>
              <div className="border-l border-[var(--color-rule)] pl-3">
                <span className="text-xl sm:text-2xl font-extrabold text-emerald-800 block">
                  100%
                </span>
                <span className="text-[11px] uppercase text-[var(--color-muted)] tracking-wider">
                  Free
                </span>
              </div>
            </div>
          </div>

          {/* "What To Do Next" 3-Step Guided Roadmap for Students */}
          <div className="mt-8 pt-6 border-t border-[var(--color-rule)] grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 border border-[var(--color-rule-2)] bg-[var(--color-paper-2)] flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-[var(--color-ink)] text-[var(--color-paper)] text-xs font-mono font-bold flex items-center justify-center shrink-0">
                1
              </span>
              <div>
                <h3 className="text-xs font-bold font-[family-name:var(--font-display)] text-[var(--color-ink)] uppercase tracking-wider">
                  Pick Your Class
                </h3>
                <p className="text-xs text-[var(--color-muted)] font-[family-name:var(--font-body)] mt-0.5">
                  Select Grade 9, 10, 11, or 12 below to load your exact syllabus.
                </p>
              </div>
            </div>

            <div className="p-3.5 border border-[var(--color-rule-2)] bg-[var(--color-paper-2)] flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-[var(--color-ink)] text-[var(--color-paper)] text-xs font-mono font-bold flex items-center justify-center shrink-0">
                2
              </span>
              <div>
                <h3 className="text-xs font-bold font-[family-name:var(--font-display)] text-[var(--color-ink)] uppercase tracking-wider">
                  Choose Subject
                </h3>
                <p className="text-xs text-[var(--color-muted)] font-[family-name:var(--font-body)] mt-0.5">
                  Tap your course: Sciences, Mathematics, Computer Science, or Languages.
                </p>
              </div>
            </div>

            <div className="p-3.5 border border-[var(--color-rule-2)] bg-[var(--color-paper-2)] flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-emerald-800 dark:bg-emerald-600 text-white text-xs font-mono font-bold flex items-center justify-center shrink-0">
                3
              </span>
              <div>
                <h3 className="text-xs font-bold font-[family-name:var(--font-display)] text-[var(--color-ink)] uppercase tracking-wider">
                  Start Practicing
                </h3>
                <p className="text-xs text-[var(--color-muted)] font-[family-name:var(--font-body)] mt-0.5">
                  Use Practice Mode for instant answer keys or Timed Exam for board simulation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Personalized Study Progress & Mobile Nav */}
        <RecentStudyCard />

        {/* Interactive Subject Tabs & Chapters Grid */}
        <SubjectTabs
          physicsChapters={physicsChapters}
          urduChapters={urduChapters}
          mathChapters={mathChapters}
          englishChapters={englishChapters}
          csChapters={csChapters}
          islamiatChapters={islamiatChapters}
          tarjumaChapters={tarjumaChapters}
          biologyChapters={biologyChapters}
          chemistryChapters={chemistryChapters}
          physics9Chapters={physics9Chapters}
          math9Chapters={math9Chapters}
          urdu9Chapters={urdu9Chapters}
          tarjuma9Chapters={tarjuma9Chapters}
          english9Chapters={english9Chapters}
          islamiat9Chapters={islamiat9Chapters}
          chemistry9Chapters={chemistry9Chapters}
          cs9Chapters={cs9Chapters}
          biology9Chapters={biology9Chapters}
          math10Chapters={math10Chapters}
          physics10Chapters={physics10Chapters}
          chemistry10Chapters={chemistry10Chapters}
          cs10Chapters={cs10Chapters}
          biology10Chapters={biology10Chapters}
          english10Chapters={english10Chapters}
          pakstudies10Chapters={pakstudies10Chapters}
          urdu10Chapters={urdu10Chapters}
          tarjuma10Chapters={tarjuma10Chapters}
          english12Chapters={english12Chapters}
          urdu12Chapters={urdu12Chapters}
          pakstudies12Chapters={pakstudies12Chapters}
          tarjuma12Chapters={tarjuma12Chapters}
          physics12Chapters={physics12Chapters}
          chemistry12Chapters={chemistry12Chapters}
          math12Chapters={math12Chapters}
          cs12Chapters={cs12Chapters}
          biology12Chapters={biology12Chapters}
        />

        {/* Hallmark Editorial Note & Exam Tips */}
        <section className="border-t border-[var(--color-rule)] pt-12 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border-l-2 border-emerald-800 pl-4">
              <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-[var(--color-ink)] mb-1">
                Authentic Board Pattern
              </h3>
              <p className="text-xs text-[var(--color-muted)] leading-relaxed font-[family-name:var(--font-body)]">
                Each unit test follows the official Federal Board SLO guidelines with questions covering recall,
                understanding, and conceptual calculation questions.
              </p>
            </div>

            <div className="border-l-2 border-[var(--color-rule-2)] pl-4">
              <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-[var(--color-ink)] mb-1">
                Two Study Modes
              </h3>
              <p className="text-xs text-[var(--color-muted)] leading-relaxed font-[family-name:var(--font-body)]">
                Toggle Practice Mode to view instant answers and scientific justifications, or take Timed Exam Mode
                to simulate high-pressure examination conditions.
              </p>
            </div>

            <div className="border-l-2 border-[var(--color-rule-2)] pl-4">
              <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-[var(--color-ink)] mb-1">
                100% Client-Side Privacy
              </h3>
              <p className="text-xs text-[var(--color-muted)] leading-relaxed font-[family-name:var(--font-body)]">
                Your test scores, completion badges, and question bookmarks are persisted directly in your browser.
                No forced account creation required to study.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
