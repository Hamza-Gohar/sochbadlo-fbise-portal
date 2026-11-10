import React from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export default function Footer() {
  return (
    <footer className="border-t-4 border-[var(--color-ink)] bg-[var(--color-paper)] mt-24">
      <div className="max-w-[var(--container)] mx-auto px-4 sm:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 pb-12 border-b border-[var(--color-rule)]">
          {/* Col 1 */}
          <div className="lg:col-span-1">
            <h3 className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-[var(--color-ink)] mb-3">
              FBISE<span className="text-emerald-700 dark:text-emerald-400 font-normal">Prep</span>
            </h3>
            <p className="text-xs text-[var(--color-muted)] leading-relaxed font-[family-name:var(--font-body)]">
              Authentic FBISE exam practice platform engineered for secondary and intermediate students (Matric SSC-I, SSC-II, HSSC-I & HSSC-II).
              Compiles verified multiple choice questions, numericals, and board standard solutions directly from official syllabus notes.
            </p>
            <div className="mt-4 text-[11px] font-mono text-[var(--color-muted)]">
              Curriculum: Federal Board of Intermediate & Secondary Education (FBISE) Islamabad.
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="font-[family-name:var(--font-display)] text-xs font-bold uppercase tracking-wider text-[var(--color-ink)] mb-3">
              Class 9th (SSC-I)
            </h4>
            <ul className="text-xs space-y-1.5 text-[var(--color-muted)] font-[family-name:var(--font-display)]">
              <li className="font-semibold text-emerald-900">Biology (10 Units + 8 Simulators)</li>
              <li className="font-semibold text-cyan-900">Computer Science (7 Units + 4 Simulators)</li>
              <li className="font-semibold text-amber-800">Chemistry (19 Units + 4 Simulators)</li>
              <li className="font-semibold text-sky-900">English Compulsory (7 Units + 4 Simulators)</li>
              <li className="font-semibold text-emerald-800">اسلامیات لازمی (7 Units + 4 Simulators)</li>
              <li className="font-semibold text-amber-900">اردو لازمی (7 Units + 4 Simulators)</li>
              <li className="font-semibold text-teal-800">ترجمۃ القرآن (9 Units + 4 Simulators)</li>
              <li className="font-semibold text-blue-900">Mathematics (11 Units + 2 Simulators)</li>
              <li className="font-semibold text-emerald-950">Physics (9 Units + 2 Simulators)</li>
              <li className="pt-1 text-[11px]">• Cytology, Genetics, Algorithms & AI</li>
              <li className="pt-1 font-semibold text-[var(--color-ink)]">• 36 Board Simulators</li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="font-[family-name:var(--font-display)] text-xs font-bold uppercase tracking-wider text-[var(--color-ink)] mb-3">
              Class 10th (SSC-II)
            </h4>
            <ul className="text-xs space-y-1.5 text-[var(--color-muted)] font-[family-name:var(--font-display)]">
              <li className="font-semibold text-emerald-950">Pakistan Studies (6 Units + 10 Simulators)</li>
              <li className="font-semibold text-amber-900">اردو لازمی (8 Units + 10 Simulators)</li>
              <li className="font-semibold text-teal-800">ترجمۃ القرآن (8 Units + 10 Simulators)</li>
              <li className="font-semibold text-sky-900">English Compulsory (10 Units + 10 Simulators)</li>
              <li className="font-semibold text-emerald-900">Biology (9 Units + 10 Simulators)</li>
              <li className="font-semibold text-cyan-900">Computer Science (8 Units + 10 Simulators)</li>
              <li className="font-semibold text-amber-900">Chemistry (8 Units + 10 Simulators)</li>
              <li className="font-semibold text-teal-900">Physics (9 Units + 10 Simulators)</li>
              <li className="font-semibold text-blue-900">Mathematics (13 Units + 10 Simulators)</li>
              <li className="pt-1 font-semibold text-[var(--color-ink)]">• 90 Board Simulators (3,850 MCQs)</li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="font-[family-name:var(--font-display)] text-xs font-bold uppercase tracking-wider text-[var(--color-ink)] mb-3">
              Class 11th (HSSC-I)
            </h4>
            <ul className="text-xs space-y-1.5 text-[var(--color-muted)] font-[family-name:var(--font-display)]">
              <li>Physics (14 Units + Past Papers)</li>
              <li>Biology (15 Units + 2 Simulators)</li>
              <li>Chemistry (12 Units + 3 Simulators)</li>
              <li>اردو لازمی (نثر، نظمیں، علمِ بیان و بدیع)</li>
              <li>اسلامیات لازمی (5 ابواب + 2 ماڈل پرچے)</li>
              <li>ترجمۃ القرآن (4 سورتیں + 3 سمولیٹرز)</li>
              <li>Mathematics (5 Units + 3 Simulators)</li>
              <li>English Compulsory (6 Units + 4 Simulators)</li>
              <li>Computer Science (8 Units + 3 Simulators)</li>
              <li className="pt-1 font-semibold text-[var(--color-ink)]">• 77 Modules (3,163 MCQs)</li>
            </ul>
          </div>

          {/* Col 5 */}
          <div>
            <h4 className="font-[family-name:var(--font-display)] text-xs font-bold uppercase tracking-wider text-[var(--color-ink)] mb-3">
              Class 12th (HSSC-II)
            </h4>
            <ul className="text-xs space-y-1.5 text-[var(--color-muted)] font-[family-name:var(--font-display)]">
              <li className="font-semibold text-amber-900">Chemistry (16 Units + 10 Simulators)</li>
              <li className="font-semibold text-cyan-900">Computer Science (7 Units + 10 Simulators)</li>
              <li className="font-semibold text-emerald-900">Biology (13 Units + 10 Simulators)</li>
              <li className="font-semibold text-sky-900">Physics (10 Units + 10 Simulators)</li>
              <li className="font-semibold text-amber-800">Mathematics (10 Units + 10 Simulators)</li>
              <li className="font-semibold text-purple-900">English Compulsory (10 Units + 10 Simulators)</li>
              <li className="font-semibold text-emerald-900">اردو لازمی (8 Units + 10 Simulators)</li>
              <li className="font-semibold text-emerald-950">Pakistan Studies (7 Units + 10 Simulators)</li>
              <li className="font-semibold text-teal-900">ترجمۃ القرآن (7 Units + 10 Simulators)</li>
              <li className="pt-1 text-[11px]">• Organic Mechanisms, Genetics, Calculus & Physics</li>
              <li className="pt-1 font-semibold text-[var(--color-ink)]">• 90 Board Simulators (4,540 MCQs)</li>
            </ul>
          </div>

          {/* Col 6 */}
          <div>
            <h4 className="font-[family-name:var(--font-display)] text-xs font-bold uppercase tracking-wider text-[var(--color-ink)] mb-3">
              Curriculum Tracks
            </h4>
            <ul className="text-xs space-y-2 font-[family-name:var(--font-display)]">
              <li>
                <Link
                  href="/?grade=12"
                  className="hover:text-[var(--color-ink)] underline underline-offset-2"
                >
                  Class 12 HSSC-II Test Series
                </Link>
              </li>
              <li>
                <Link
                  href="/?grade=11"
                  className="hover:text-[var(--color-ink)] underline underline-offset-2"
                >
                  Class 11 HSSC-I Test Series
                </Link>
              </li>
              <li>
                <Link
                  href="/?grade=10"
                  className="hover:text-[var(--color-ink)] underline underline-offset-2"
                >
                  Class 10 SSC-II Matric Part 2
                </Link>
              </li>
              <li>
                <Link
                  href="/?grade=9"
                  className="hover:text-[var(--color-ink)] underline underline-offset-2"
                >
                  Class 9 SSC-I Matric Part 1
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[var(--color-muted)] font-[family-name:var(--font-display)]">
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <p>© {new Date().getFullYear()} FBISE Prep Portal. Independent examination testing platform for Pakistani students.</p>
            <ThemeToggle compact />
          </div>
          <p className="mt-2 sm:mt-0">Designed with Hallmark Editorial System · Zero AI Slop</p>
        </div>
      </div>
    </footer>
  );
}
