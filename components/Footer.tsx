import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t-4 border-[var(--color-ink)] bg-[var(--color-paper)] mt-24">
      <div className="max-w-[var(--container)] mx-auto px-4 sm:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-[var(--color-rule)]">
          {/* Col 1 */}
          <div className="md:col-span-1">
            <h3 className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-[var(--color-ink)] mb-3">
              SochBadlo<span className="text-emerald-700 font-normal">Prep</span>
            </h3>
            <p className="text-xs text-[var(--color-muted)] leading-relaxed font-[family-name:var(--font-body)]">
              Authentic FBISE exam practice platform engineered for secondary and intermediate students (Matric SSC-I & HSSC-I).
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
              <li className="font-semibold text-emerald-800">Physics (9 Units)</li>
              <li>• Unit 1: Physical Quantities</li>
              <li>• Unit 2: Kinematics</li>
              <li>• Unit 3: Dynamics</li>
              <li>• Unit 4: Turning Effect</li>
              <li>• Unit 5: Pressure & Solids</li>
              <li>• Unit 6: Work & Energy</li>
              <li>• Unit 7: Properties of Matter</li>
              <li>• Unit 8: Thermal Physics</li>
              <li>• Unit 9: Nature of Science</li>
              <li className="pt-1 font-semibold text-[var(--color-ink)]">• 2 Section A Simulators</li>
            </ul>
          </div>

          {/* Col 3 */}
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
