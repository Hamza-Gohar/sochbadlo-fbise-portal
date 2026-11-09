import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t-4 border-[var(--color-ink)] bg-[var(--color-paper)] mt-24">
      <div className="max-w-[var(--container)] mx-auto px-4 sm:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-[var(--color-rule)]">
          {/* Col 1 */}
          <div className="md:col-span-2">
            <h3 className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-[var(--color-ink)] mb-3">
              SochBadlo<span className="text-emerald-700 font-normal">Prep</span>
            </h3>
            <p className="text-sm text-[var(--color-muted)] max-w-md leading-relaxed font-[family-name:var(--font-body)]">
              An authentic FBISE exam practice platform engineered for intermediate students.
              Compiles verified multiple choice questions, numericals, and board standard solutions directly from curriculum syllabus notes.
            </p>
            <div className="mt-4 text-xs font-mono text-[var(--color-muted)]">
              Curriculum: Federal Board of Intermediate & Secondary Education (FBISE) Islamabad.
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="font-[family-name:var(--font-display)] text-xs font-bold uppercase tracking-wider text-[var(--color-ink)] mb-3">
              Physics 11 Chapters
            </h4>
            <ul className="text-xs space-y-1.5 text-[var(--color-muted)] font-[family-name:var(--font-display)]">
              <li>Units 1–5: Mechanics & Energy</li>
              <li>Units 6–9: Waves, Fluids & Optics</li>
              <li>Units 10–12: Thermal & Electromagnetics</li>
              <li>Units 13–14: Relativity & Particle Physics</li>
              <li>Special: Past Papers Simulator</li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="font-[family-name:var(--font-display)] text-xs font-bold uppercase tracking-wider text-[var(--color-ink)] mb-3">
              Ecosystem
            </h4>
            <ul className="text-xs space-y-2 font-[family-name:var(--font-display)]">
              <li>
                <a
                  href="https://sochbadlobymak.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--color-ink)] underline underline-offset-2"
                >
                  Soch Badlo By MAK Official
                </a>
              </li>
              <li>
                <a
                  href="https://sochbadlobymak.com/courses/phy-class-11th/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--color-ink)] underline underline-offset-2"
                >
                  Class 11 Physics Video Lectures
                </a>
              </li>
              <li>
                <a
                  href="https://sochbadlobymak.com/courses/english-class-11/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--color-ink)] underline underline-offset-2"
                >
                  Class 11 English Notes & Lessons
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-[var(--color-muted)] font-[family-name:var(--font-display)]">
          <p>© {new Date().getFullYear()} SochBadlo Prep. Built for Pakistani students.</p>
          <p className="mt-2 sm:mt-0">Designed with Hallmark Editorial System · Zero AI Slop</p>
        </div>
      </div>
    </footer>
  );
}
