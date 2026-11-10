# FBISE Prep Portal · Federal Board Examination & MCQ Testing Platform

An editorial, distraction-free study and examination testing platform engineered for **Federal Board of Intermediate and Secondary Education (FBISE)** students across Class 9th, 10th, 11th, and 12th.

Designed using the **Hallmark** design system (Editorial/Academic Paper theme) with warm newsprint tones, high contrast typography, mobile-first responsive layout, and rigorous focus on authentic learning.

---

## 🌟 Highlights & Features

- **Comprehensive Multi-Grade Curriculum**: Complete coverage for Class 9th, 10th, 11th, and 12th across Sciences, Mathematics, Languages, Islamiat, and Computer Science.
- **Two Distinct Study Modes**:
  - **Practice Mode**: Instant answer reveals with detailed scientific explanations, step-by-step reasoning, and formula derivations.
  - **Timed Exam Mode**: Authentic FBISE timed board simulations with automatic submission, question flagging, and time management.
- **Browser-Based Study Habit & Progress Engine**:
  - **Daily Streaks**: Automatic tracking of consecutive study days and streak records.
  - **Active Focus Time**: Measures and stores actual time spent learning and practicing.
  - **Question Bookmarks**: 1-click question bookmarking to save tricky questions for revision.
  - **Subject Mastery**: Accuracy metrics and question attempt breakdown by subject.
  - **Gamified Achievements**: Milestones and badges unlocked directly in the browser.
- **Hallmark Editorial Design & Mobile Excellence**:
  - Zero AI-slop, no generic low-contrast gray-on-gray or rounded purple cards.
  - Authentic academic journal aesthetic (`Bricolage Grotesque` display + `Source Serif 4` body).
  - Mobile bottom navigation bar for quick access to curriculum, streaks, saved MCQs, and badges.
  - Touch targets $\ge 48$px for thumb-friendly mobile testing.
- **100% Client-Side Privacy**:
  - Scores, completion badges, focus time, and saved questions persist locally in browser `localStorage`.
  - Zero forced account walls, cookies, or telemetry tracking.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router, Static Site Generation / SSG)
- **Styling**: Tailwind CSS + Custom CSS Variables from Hallmark Design Tokens
- **Icons**: Lucide React
- **Celebration**: Canvas-Confetti (on achieving high test scores)
- **Data Store**: Structured JSON with static compile-time bundling for zero-latency loading

---

## 🚀 Getting Started Locally

```bash
# Clone the repository
git clone https://github.com/Hamza-Gohar/sochbadlo-fbise-portal.git

# Enter project directory
cd sochbadlo-fbise-portal

# Install dependencies
npm install --legacy-peer-deps

# Run local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portal.

---

## 📦 Production Build

```bash
npm run build
npm run start
```
