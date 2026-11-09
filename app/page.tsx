import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SubjectTabs from '../components/SubjectTabs';
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
    biology10Total;
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
    biology10Chapters.length;

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Navbar />

      <main className="max-w-[var(--container)] mx-auto px-4 sm:px-8 py-10 w-full">
        {/* Editorial Hero */}
        <section className="border-b-4 border-[var(--color-ink)] pb-12 mb-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 border border-[var(--color-rule-2)] text-xs font-mono uppercase tracking-widest text-[var(--color-muted)] mb-4 bg-[var(--color-paper-2)]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                Official FBISE Curriculum Preparation Portal · Class 9th, 10th & 11th
              </div>
              <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--color-ink)] leading-[1.05] mb-5">
                FBISE Examination Testing & Preparation Platform
              </h1>
              <p className="text-base sm:text-lg text-[var(--color-ink-2)] max-w-2xl leading-relaxed font-[family-name:var(--font-body)]">
                Master Federal Board SSC-I (Matric Part 1), SSC-II (Matric Part 2), and HSSC-I (Intermediate Part 1) examinations with authentic chapter-wise test series, instant conceptual explanations,
                Class 10th Biology (9 units + 10 Section A simulators by Lecturer Ma&apos;am Rubina Ashraf & Soch Badlo By MAK), Class 10th Computer Science (8 units + 10 Section A simulators by Lecturer Sabahat Ul Hasan & Soch Badlo By MAK), Class 10th Chemistry (8 units + 10 Section A simulators by Soch Badlo By MAK), Class 10th Physics (9 units + 10 Section A simulators by Soch Badlo By MAK), Class 10th Mathematics (13 units + 10 Section A simulators by Lecturer Jazab & Nimra Abid), Class 9th Biology (10 chapters + 8 Section A simulators by Lecturer Rubina Ashraf), Class 9th Computer Science (7 chapters + 4 Section A simulators by Lecturer Sabahat Ul Hasan & Aryan Ali), Class 9th Chemistry (19 chapters + 4 Section A simulators by Lecturer Ayesha Amjad), Class 9th English Compulsory (7 units + 4 Section A simulators by Lecturer Adeela Naheed), Class 9th Islamiat Compulsory (7 units + 4 Section A simulators by Lecturer Tayabah Rafaqat), Class 9th Urdu Compulsory (7 units + 4 Section A simulators), Class 9th Tarjuma-tul-Quran (9 units + 4 bilingual simulators), Class 9th Mathematics (11 units + 2 Section A simulators), Class 9th Physics (9 units + 2 Section A simulators), Biology (حیاتیات), Chemistry (کیمسٹری with Lecturer Ayesha Amjad rationales),
                Physics formulas, English syntax & poetic devices, Urdu literature and rhetoric (علمِ بیان و علمِ بدیع), Islamiat Compulsory (اسلامیات لازمی),
                Tarjuma-tul-Quran (ترجمۃ القرآن المجید), Mathematics step-by-step problem solving, Computer Science logic, and timed board exam simulations.
              </p>
            </div>

            {/* Quick Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border border-[var(--color-rule-2)] p-4 bg-[var(--color-paper-2)] font-[family-name:var(--font-display)]">
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-[var(--color-ink)] block">
                  {totalModules}
                </span>
                <span className="text-xs uppercase text-[var(--color-muted)] tracking-wider">
                  Modules Ready
                </span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-[var(--color-ink)] block">
                  {totalQuestions}
                </span>
                <span className="text-xs uppercase text-[var(--color-muted)] tracking-wider">
                  Active MCQs
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1 border-t sm:border-t-0 sm:border-l border-[var(--color-rule)] pt-2 sm:pt-0 sm:pl-4">
                <span className="text-2xl sm:text-3xl font-extrabold text-emerald-800 block">
                  100%
                </span>
                <span className="text-xs uppercase text-[var(--color-muted)] tracking-wider">
                  Detailed Solutions
                </span>
              </div>
            </div>
          </div>
        </section>

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
