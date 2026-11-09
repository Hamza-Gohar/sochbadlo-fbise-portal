import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ChapterCard from '../components/ChapterCard';
import { getChaptersIndex } from '../lib/data';

export default function HomePage() {
  const chapters = getChaptersIndex();
  const totalQuestions = chapters.reduce((acc, c) => acc + c.totalQuestions, 0);

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
                Official Curriculum Preparation Portal
              </div>
              <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--color-ink)] leading-[1.05] mb-5">
                FBISE Class 11th Physics Chapter-Wise Testing Platform
              </h1>
              <p className="text-base sm:text-lg text-[var(--color-ink-2)] max-w-2xl leading-relaxed font-[family-name:var(--font-body)]">
                Master all 14 chapters of Federal Board Intermediate Physics with comprehensive multiple choice questions,
                instant conceptual explanations, and timed board exam simulations.
              </p>
            </div>

            {/* Quick Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border border-[var(--color-rule-2)] p-4 bg-[var(--color-paper-2)] font-[family-name:var(--font-display)]">
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-[var(--color-ink)] block">
                  14
                </span>
                <span className="text-xs uppercase text-[var(--color-muted)] tracking-wider">
                  Units Covered
                </span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-[var(--color-ink)] block">
                  {totalQuestions || 941}
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

        {/* Subject Navigation Tabs */}
        <section className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--color-rule)]">
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-xl sm:text-2xl font-bold tracking-tight text-[var(--color-ink)]">
                Class 11 Curriculum (HSSC-I)
              </h2>
              <p className="text-xs text-[var(--color-muted)] mt-0.5">
                Select a subject to begin testing. Physics is fully unlocked with all 14 chapters.
              </p>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto font-[family-name:var(--font-display)] text-xs">
              <span className="px-3.5 py-1.5 bg-[var(--color-ink)] text-[var(--color-paper)] font-bold tracking-wide border border-[var(--color-ink)]">
                Physics (14 Units)
              </span>
              <button
                type="button"
                disabled
                className="px-3 py-1.5 border border-[var(--color-rule)] text-[var(--color-muted)] opacity-60 cursor-not-allowed"
              >
                Chemistry (Soon)
              </button>
              <button
                type="button"
                disabled
                className="px-3 py-1.5 border border-[var(--color-rule)] text-[var(--color-muted)] opacity-60 cursor-not-allowed"
              >
                Biology (Soon)
              </button>
              <button
                type="button"
                disabled
                className="px-3 py-1.5 border border-[var(--color-rule)] text-[var(--color-muted)] opacity-60 cursor-not-allowed"
              >
                Computer (Soon)
              </button>
            </div>
          </div>
        </section>

        {/* Chapters Grid */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {chapters.map((chapter) => (
              <ChapterCard key={chapter.slug} chapter={chapter} />
            ))}
          </div>
        </section>

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
