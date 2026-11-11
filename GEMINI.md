# Antigravity Project Rules & Self-Annealing Context Protocol

> **Target Workspace**: `sochbadlo-fbise-portal` (FBISE Prep Portal)  
> **Master Reference**: [`APP_CONTEXT.md`](./APP_CONTEXT.md) · [`data/portal-manifest.json`](./data/portal-manifest.json)  
> **Primary Domains**: `https://fbise-prep.vercel.app` · `https://fbise-prep-portal.vercel.app`  

---

## 1. Prime Directives for Every New Context Window

Whenever a new context window or conversation begins:

1. **Brand Neutrality & Zero-Promo Policy (STRICT)**:
   - This portal is branded strictly as **FBISEPrep** (`FBISE Prep Portal` / Federal Board Examination Testing Platform).
   - **ZERO** occurrences of "SochBadlo", "sochbadlo is our new website", external links, phone numbers, or WhatsApp channels.
   - Any commit, PR, or code edit that introduces promotional claims or external ads is considered a critical regression.

2. **Hallmark Design System Floor**:
   - Always respect tokens in `app/tokens.css` (`var(--color-paper)`, `var(--color-ink)`, `var(--color-rule)`).
   - Maintain dual light/dark mode parity with high contrast and zero-flicker anti-FOUC script in `app/layout.tsx`.
   - **Zero Horizontal Scrolling**: Enforce `overflow-x: clip` on viewports; wrap all button strips and subject chips on mobile.
   - All interactive touch targets must meet the minimum mobile ergonomic floor of **$\ge 48\text{px}$**.

3. **Single Modal Root Architecture**:
   - `<StudyDashboard />` must **NEVER** be mounted inside individual page components, cards, or navbars.
   - It is mounted strictly once at the root level inside [`components/Providers.tsx`](./components/Providers.tsx).
   - All components trigger the dashboard via `openDashboard()` from `usePortal()` (`contexts/PortalContext.tsx`).

---

## 2. The Self-Annealing & Self-Updating Context Protocol

To prevent documentation, dataset, and runtime drift across context windows:

1. **Automated Verification**:
   - The project includes a self-annealing verification engine:
     ```bash
     npm run context:sync
     ```
   - This script scans all 36 subject directories (566 JSON files, 16,923+ MCQs), validates options, asserts 0 brand violations, auto-generates `data/portal-manifest.json`, and dynamically updates `APP_CONTEXT.md`.
   - It is automatically wired to execute before `npm run build` (`prebuild`) and before `npm run dev` (`predev`).

2. **Mandatory Post-Edit Annealing**:
   - Whenever you add or edit MCQs, change subject data, or alter components, you MUST execute:
     ```bash
     npm run context:sync
     ```
   - If brand violations or corrupt JSON files are reported, self-heal them immediately before proceeding.

3. **Production Deployment Standards**:
   - Always verify static compilation with `npm run build` (all 571 static paths must compile cleanly with 0 errors).
   - Deploy to Vercel production using `npx vercel --prod --yes` and ensure both `fbise-prep.vercel.app` and `fbise-prep-portal.vercel.app` point to the latest ready deployment.
