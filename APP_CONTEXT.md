# FBISE Prep Portal — Master Architecture & App Context

> **Authoritative Specification & Operational Manual**  
> **App Name**: FBISE Prep Portal (`FBISEPrep`)  
> **Primary Domains**: [fbise-prep.vercel.app](https://fbise-prep.vercel.app) · [fbise-prep-portal.vercel.app](https://fbise-prep-portal.vercel.app)  
> **Target Audience**: Federal Board of Intermediate and Secondary Education (FBISE) Students (Grades 9, 10, 11 & 12)  
> **Tech Stack**: Next.js 15 (App Router, Static Exports), React 19, TypeScript, Tailwind CSS, Lucide Icons, Canvas Confetti  
> **Design Language**: Hallmark Editorial Design System with Zero-Flicker Dual Dark Mode  

---

## 1. Executive Summary & Brand Directives

### Purpose
The **FBISE Prep Portal** is an authoritative, zero-bloat, distraction-free examination testing platform built specifically for students preparing for FBISE Federal Board Matric (SSC-I & SSC-II) and Intermediate (HSSC-I & HSSC-II) examinations. It delivers interactive practice modules and authentic, timed Section A board examination simulators covering all core science and humanities subjects.

### Brand Integrity & Directives
1. **Strict Neutrality**: The portal is branded strictly as an educational board testing platform (**FBISEPrep / Federal Board Standard Examination Simulator**).
2. **Zero External Promo / Ad Slop**: The application contains **zero** references, banners, external links, promotional popups, or claims to any unrelated organizations (e.g., legacy "SochBadlo" brand tags have been completely scrubbed from all headers, footers, meta tags, and component copy).
3. **Privacy First**: 100% of study tracking, streaks, focus time, quiz attempts, and bookmarked questions are persisted **entirely in the user's browser via client-side `localStorage`**. No user registration, authentication wall, or personal data collection is required.
4. **Mobile First**: Adheres strictly to the Hallmark mobile floor—zero horizontal scrolling (`overflow-x: clip`), wrapping chips, minimum 48px touch targets, and sticky bottom navigation on handheld viewports.

---

## 2. Architecture & File Structure

```
sochbadlo-fbise-portal/
├── app/
│   ├── globals.css              # Hallmark baseline, base typography, reset
│   ├── tokens.css               # Hallmark CSS tokens for light & dark modes
│   ├── layout.tsx               # Root layout, fonts, anti-FOUC blocking script, <Providers>
│   ├── page.tsx                 # Dynamic curriculum directory with Class 9, 10, 11, 12 filters
│   └── test/
│       └── [slug]/
│           └── page.tsx         # Static generation of 571 interactive quiz/exam modules
├── components/
│   ├── Providers.tsx            # Root Client Provider (<PortalProvider> + single <StudyDashboard>)
│   ├── Navbar.tsx               # Header with utility band, brand, desktop class links, StudyTrackerPill
│   ├── MobileBottomNav.tsx      # Mobile sticky bottom bar (Curriculum, Streak, Saved, Badges)
│   ├── QuizEngine.tsx           # Full practice/exam simulator, timers, review mode, bookmarking
│   ├── RecentStudyCard.tsx      # Home hero widget showing active streak, focus time, recent module
│   ├── StudyDashboard.tsx       # Comprehensive slide-over drawer (Stats, Bookmarks, History, Badges)
│   ├── StudyTrackerPill.tsx     # Compact navigation pill displaying streak & study time
│   └── ThemeToggle.tsx          # Dual-mode Light/Dark toggle with seamless token sync
├── contexts/
│   └── PortalContext.tsx        # Central React state store (Theme, Study Tracking, Modal Controls)
├── data/
│   ├── index.ts                 # Master registry exporting all 571 subject chapters & simulators
│   ├── chem-12.ts               # Class 12 Chemistry (Units 1-16 + Model Paper Simulators)
│   ├── bio-12.ts                # Class 12 Biology (Units 1-13 + Simulators)
│   ├── cs-12.ts                 # Class 12 Computer Science (Units 1-7 + Simulators)
│   ├── math-12.ts               # Class 12 Mathematics (Units 1-7 + Simulators)
│   ├── physics-12.ts            # Class 12 Physics (Units 1-10 + Simulators)
│   ├── ...                      # Class 9, 10, 11 subjects (Math, Physics, Bio, CS, Chem, English, etc.)
├── lib/
│   └── study-tracker.ts         # Pure functional client storage engine, streak rules, badge triggers
├── tailwind.config.ts           # Extended colors, font families, dark mode: ['class', '[data-mode="dark"]']
└── APP_CONTEXT.md               # This authoritative master documentation
```

---

## 3. The Dual Context System

The portal utilizes a **Dual Context System** that pairs a global React Context runtime with comprehensive codebase documentation:

```
┌───────────────────────────────────────────────────────────┐
│                      APP_CONTEXT.md                       │
│     (Authoritative Architectural & Operational Blueprint) │
└─────────────────────────────┬─────────────────────────────┘
                              │
            ┌─────────────────┴─────────────────┐
            ▼                                   ▼
┌─────────────────────────┐       ┌─────────────────────────┐
│   lib/study-tracker.ts  │       │  contexts/PortalContext │
│ (Pure Storage & Events) │◄──────┤  (React State Runtime)  │
└─────────────────────────┘       └─────────────┬───────────┘
                                                │
                                                ▼
                                  ┌─────────────────────────┐
                                  │ components/Providers.tsx│
                                  │   (Single Modal Root)   │
                                  └─────────────────────────┘
```

### 1. `contexts/PortalContext.tsx`
Provides unified reactive state across all components:
- **Theme Slice**: `theme` ('light' | 'dark'), `isDark`, `toggleTheme()`, `setTheme()`. Synchronizes with `localStorage` (`fbise_theme_mode`), document root attributes (`data-mode`, `data-theme`, `.dark`), and window custom events (`fbise-theme-changed`).
- **Study Slice**: `stats` (`StudyStats`), `streak`, `todaySeconds`, `bookmarkCount`, `bookmarks`, `recentTests`, `unlockedBadgesCount`, `hasNewAchievement`. Exposes helpers: `toggleBookmark()`, `isBookmarked()`, `removeBookmark()`, `recordStudyTime()`, `recordQuestionAnswer()`, `recordTestCompleted()`.
- **Modal Slice**: `isDashboardOpen`, `dashboardTab`, `openDashboard(tab)`, `closeDashboard()`.
- **Granular Hooks**:
  - `usePortal()`: Complete context access.
  - `useStudy()`: Study stats, mutators, and dashboard opener.
  - `useTheme()`: Theme state and toggling functions.

### 2. `components/Providers.tsx`
Next.js App Router root layouts are Server Components. `Providers.tsx` is the client boundary mounted in `app/layout.tsx`:
```tsx
<PortalProvider>
  {children}
  <StudyDashboardModal />
</PortalProvider>
```
**Key Architecture Win**: `<StudyDashboard />` is mounted **strictly once** at the root level, eliminating the duplicate DOM trees and out-of-sync modal instances previously found in `Navbar.tsx`, `RecentStudyCard.tsx`, and `QuizEngine.tsx`.

---

## 4. Hallmark Editorial Design System & Styling Rules

The interface adheres to the **Hallmark Design System** guidelines for calm, authoritative, non-templated educational typography:

### Color System (`app/tokens.css`)
- **Light Mode (Warm Editorial Paper)**:
  - `--color-paper`: `#faf8f5` (warm newsprint background)
  - `--color-paper-2`: `#f3eee6` (secondary card surface)
  - `--color-paper-alt`: `#ede6da` (utility pills and borders)
  - `--color-ink`: `#14171a` (deep charcoal text, avoiding harsh `#000000`)
  - `--color-ink-2`: `#4a525a` (reading secondary copy)
  - `--color-muted`: `#717c87` (metadata and timestamps)
  - `--color-rule`: `#e2dad0` (hairline dividers)
- **Dark Mode (Midnight Scholar Slate)**:
  - Re-derived high-contrast slate surfaces: `#0f1115` (base), `#161922` (elevated card), `#1c212d` (subtle border)
  - High-contrast text: `#e8ecf2` (headline), `#b2bccb` (body), `#7e899b` (muted)
  - Zero-flicker anti-FOUC script placed directly in `<head>` ensures theme is applied before the first browser paint.

### Typography
- **Display & Headings**: `Bricolage Grotesque` (`--font-display`) — distinctive, humanistic geometric grotesque.
- **Body & Longform**: `Source Serif 4` (`--font-body`) — elegant, highly legible optical reading serif for question stems and explanations.
- **Data & Timers**: Monospace system font stack (`font-mono`) for numerical scores, countdown timers, and unit badges.

### Responsive & Layout Floor
- Container max width: `var(--container)` (1240px).
- Zero mobile horizontal overflow: `overflow-x: clip` applied on `html`, `body`, and outer containers.
- All interactive controls (buttons, links, pills) provide a minimum bounding box of **48px** for accessible mobile touch ergonomics.

---

## 5. Gamification & Study Habit Tracking System

Implemented in `lib/study-tracker.ts` and synced across the app via `PortalContext`:

### Core Mechanics
1. **Consecutive Daily Streak**:
   - Tracks consecutive calendar days where a student engaged with questions or simulations.
   - Preserves `streak.current`, `streak.best`, and an array of `streak.activeDates`.
   - Broken streaks reset smoothly to 1 without erasing lifetime question metrics.
2. **Focus Time Engine**:
   - Accrues active practice seconds (`today.secondsSpent` & `lifetime.totalSecondsSpent`).
   - Auto-formats to clean human strings (e.g. `24s`, `15m`, `1h 45m`).
3. **Spaced Revision Bookmarks**:
   - Students bookmark tricky or missed questions directly within `QuizEngine`.
   - Accessible at any time via the top navbar, bottom nav, or slide-over drawer with instant search and chapter filtering.
4. **Milestone Achievements & Badges**:
   - `first_test`: Complete first practice module or exam.
   - `streak_3` & `streak_7`: Maintain 3-day and 7-day study consistency.
   - `score_80` & `score_100`: High-achiever test milestones.
   - `questions_50` & `questions_200`: Volume mastery milestones.
   - `time_30m`: Deep focus session badge.
   - `bookmarks_5`: Meticulous revision badge.
   - Unlocking triggers a celebratory toast and micro-animation in `StudyTrackerPill`.

---

## 6. Comprehensive Module & Exam Simulator Inventory

The platform compiles into **571 statically pre-rendered modules**:

| Grade Level | Total Modules | Core Subjects Covered |
| :--- | :---: | :--- |
| **Class 9 (SSC-I)** | **133** | Mathematics, Physics, Chemistry, Biology, Computer Science, English, Urdu, Islamiat, Tarjuma-tul-Quran, Pak Studies + Model Exam Simulators |
| **Class 10 (SSC-II)** | **106** | Mathematics, Physics, Chemistry, Biology, Computer Science, English, Urdu, Pak Studies + Model Exam Simulators |
| **Class 11 (HSSC-I)** | **171** | Mathematics, Physics, Chemistry, Biology, Computer Science, English, Urdu, Islamiat + Model Exam Simulators |
| **Class 12 (HSSC-II)** | **161** | Mathematics (Units 1-7), Physics (Units 1-10), Chemistry (Units 1-16), Biology (Units 1-13), Computer Science (Units 1-7), English, Urdu, Pak Studies + Board Exam Simulators |
| **Grand Total** | **571** | **All 571 Pages statically generated with 0 errors (`npm run build`)** |

### Simulator Modes
- **Practice Mode**: Untimed, instant feedback on selection, detailed rationales and textbook references.
- **Exam Mode**: Authentic FBISE Section A simulation with timed countdown (15m, 20m, or 25m depending on paper specification), question review palette, flagged questions, and comprehensive performance scorecards upon submission.

---

## 7. Build, Verification & Deployment Runbook

### Local Development
```bash
npm install
npm run dev
```

### Static Build & Verification
```bash
npm run build
```
*Verification criteria: Next.js must compile all 571 static paths under `/test/[slug]` with 0 TypeScript and 0 lint errors.*

### Production Deployment (Vercel)
```bash
# Production release
npx vercel --prod --yes

# Domain Alias Verification
# Ensure both domains point to the latest production deployment:
# - https://fbise-prep.vercel.app
# - https://fbise-prep-portal.vercel.app
```

---

*FBISE Prep Portal — Designed for Academic Excellence & Flawless Performance.*
