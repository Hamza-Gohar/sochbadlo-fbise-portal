# SochBadloPrep · FBISE Examination & MCQ Testing Portal

An anti-AI-slop, editorial study and testing platform engineered for **Federal Board of Intermediate and Secondary Education (FBISE)** students.

Designed using the **[Hallmark](https://github.com/nutlope/hallmark)** design system (Editorial/Academic Paper theme) with warm newsprint tones, bespoke typography, and rigorous focus on authentic learning.

Parent Learning Portal: [SochBadloByMAK.com](https://sochbadlobymak.com)

---

## 🌟 Highlights & Features

- **941 Curated & Verified MCQs**: Complete coverage for Class 11th (HSSC-I) Physics across all 14 units plus official board past papers.
- **Two Distinct Study Modes**:
  - **Practice Mode**: Instant answer reveals with detailed scientific explanations, step-by-step reasoning, and formula derivations.
  - **Timed Exam Mode**: Authentic FBISE 20-minute board simulation with automatic submission, question flagging, and time management.
- **Hallmark Editorial Design**:
  - Zero AI-slop, no generic low-contrast gray-on-gray or rounded purple cards.
  - Authentic newspaper/academic journal aesthetic (`Bricolage Grotesque` display + `Source Serif 4` body).
  - Clear visual hierarchy, solid borders, subtle tactile feedback, and accessible contrast.
- **Instant Client-Side Privacy**:
  - Scores, completion badges, and high-score tracking persist locally in browser `localStorage`.
  - Zero mandatory sign-up walls or tracking scripts.
- **Extensible Multi-Grade Architecture**:
  - Pre-architected navigation and data pipeline ready to expand to Class 9th, 10th, and 12th (Chemistry, Biology, Computer Science, and Mathematics).

---

## 📚 Class 11th Physics Curriculum Included

| Unit | Topic | MCQs |
|:---:|:---|:---:|
| 01 | Measurements | 56 |
| 02 | Vectors and Equilibrium | 60 |
| 03 | Motion and Force | 78 |
| 04 | Work and Energy | 84 |
| 05 | Circular Motion | 20 |
| 06 | Fluid Dynamics | 76 |
| 07 | Oscillations | 69 |
| 08 | Waves | 75 |
| 09 | Physical Optics | 78 |
| 10 | Optical Instruments | 57 |
| 11 | Heat and Thermodynamics | 60 |
| 12 | Electrostatics | 76 |
| 13 | Current Electricity | 50 |
| 14 | Electromagnetism | 44 |
| — | **Board Past Papers (2010–2022)** | 64 |
| **Total** | **All 14 Units + Board Simulator** | **941 MCQs** |

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router, Static Site Generation / SSG)
- **Styling**: Tailwind CSS + Custom CSS Variables from Hallmark Design Tokens
- **Icons**: Lucide React
- **Celebration**: Canvas-Confetti (on achieving ≥ 80% test mastery)
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

---

## 🌐 Deployment

Deployed seamlessly to **Vercel**:
```bash
vercel --prod
```

---

## 📄 License & Credits

Curriculum content provided by **[SochBadloByMAK.com](https://sochbadlobymak.com)** for educational non-commercial use by Pakistani students.
Design tokens inspired by the **Hallmark** open-source design framework.
