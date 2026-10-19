# PrepMaster - Certification & Exam Simulator Template

> **Currently Configured For:** EC-Council Ethical Hacking Essentials (EHE / CEPS 5.0)  
> **Architecture:** 100% Client-Side SPA (React 19 + TypeScript + Vite + Tailwind CSS)  
> **Privacy & Offline Ready:** Zero database or external backend required. All user attempts, scores, and imported notes are saved privately in local browser storage (`localStorage`).

A modern, distraction-free, Pearson VUE–style exam simulator and study suite. While this repository comes pre-loaded with a comprehensive question bank and flashcard deck for the **EC-Council Ethical Hacking Essentials (EHE)** certification, it is architected as an easily adaptable **open template** that anyone can customize for any subject, course, or certification (Accounting, IGCSE, SAT, Bar Exam, Medical, Cloud Certifications, etc.).

---

## Table of Contents
- [Key Features](#key-features)
- [How to Run Locally on Your PC](#how-to-run-locally-on-your-pc)
- [Deploying for Free (Netlify, Vercel, GitHub Pages)](#deploying-for-free-netlify-vercel-github-pages)
- [How to Customize / Remodel for Another Exam](#how-to-customize--remodel-for-another-exam)
  - [1. Update the Modules (`src/data/modules.ts`)](#1-update-the-modules-srcdatamodulests)
  - [2. Replace the Question Bank (`src/data/questions.ts`)](#2-replace-the-question-bank-srcdataquestionsts)
  - [3. Update Flashcards (`src/data/flashcards.ts`)](#3-update-flashcards-srcdataflashcardsts)
  - [4. Rebrand App Titles & Passing Mark](#4-rebrand-app-titles--passing-mark)
- [Project Directory Structure](#project-directory-structure)
- [Contributing & License](#license)

---

## Key Features

- **Realistic Full Mock Exam Simulator**:
  - Timed session (configurable countdown, defaults to official 2-hour format).
  - Configurable passing threshold (EC-Council standard 70%).
  - **Option Strikethrough Elimination**: Click to cross out answers you know are wrong (just like Pearson VUE test centers).
  - **Question Navigator Grid**: Color-coded view showing Answered, Unanswered, and Flagged items.
  - **Pause & Resume**: Pause the timer when life interrupts without losing your progress.
- **Unlimited Retakes & Anti-Memorization Shuffling**:
  - Automatically randomizes question sequence and multiple-choice option positions on every attempt so users master concepts instead of memorizing letter positions.
  - Saves the exact session snapshot so the post-exam review always accurately displays what the user chose.
- **"Retake Missed Questions" Mode**:
  - Immediate one-click drill to re-test only the questions missed in past attempts.
- **Module-by-Module Practice Drills**:
  - Practice specific domain areas independently with on-demand explanation reveals.
- **Interactive Flashcard Cram Deck**:
  - Flip cards with key terms, formulas, attack vectors, and countermeasures.
- **In-Browser PDF & Notes Importer**:
  - Drag-and-drop lecture slides (`.pdf`, `.txt`, `.md`) or paste study summaries. The browser reads them client-side to extract key concepts and lets users create custom questions.
- **Attempt History & Portability**:
  - Comprehensive score breakdown by module across attempts.
  - One-click **JSON Export & Import** to migrate study data between PCs and mobile devices.
- **Calm, Eye-Friendly UI**:
  - Zero eye-straining "neon hacker" cliches. Designed with a clean slate/editorial palette and an optional soft dark mode for long study sessions.

---

## How to Run Locally on Your PC

### Prerequisites
Make sure you have [Node.js](https://nodejs.org) (v18 or newer) installed.

### Steps
1. **Clone or download this repository**:
   ```bash
   git clone https://github.com/your-username/exam-prepmaster.git
   cd exam-prepmaster
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` (or `http://localhost:5173`) in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```
   This generates an optimized static `dist/` directory.

---

## Deploying for Free (Netlify, Vercel, GitHub Pages)

Because this app has no server backend or database dependencies, you can host it anywhere for free:

### Option A: Netlify Drop (Fastest — 30 Seconds)
1. Run `npm run build` in your terminal.
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
3. Drag and drop the generated `dist/` folder into the upload box.
4. You will immediately receive a live public URL (e.g. `https://my-exam-prep.netlify.app`) that works on both desktop and mobile browsers.

### Option B: Vercel / GitHub
1. Push your code to a GitHub repository.
2. Connect your repo to [Vercel](https://vercel.com) or [Netlify](https://netlify.com).
3. Set the build command to `npm run build` and output directory to `dist`.
4. Deploy!

> **Note on User Privacy:** When deployed to Netlify or Vercel, every user who visits the site has their own private `localStorage`. Uploaded PDFs and custom questions remain completely private on their local device and do not leak to other users.

---

## How to Customize / Remodel for Another Exam

You can adapt this application for **Accounting (CPA/ACCA)**, **IGCSE / GCSE**, **Medical (USMLE/NCLEX)**, **Law Bar Exams**, **AWS / CompTIA / Cisco**, or high-school tests in 4 easy steps:

### 1. Update the Modules (`src/data/modules.ts`)
Define the chapters, domains, or syllabus modules for your new subject. Each module requires an `id`, `number`, `title`, `shortTitle`, and a list of `subTopics`:

```typescript
// Example: Customizing for Financial Accounting
export const EHE_MODULES: ModuleInfo[] = [
  {
    id: 'mod-01',
    number: 1,
    title: 'Module 01: Introduction to Financial Accounting',
    shortTitle: 'Accounting Fundamentals',
    subTopics: [
      'The Accounting Equation (Assets = Liabilities + Equity)',
      'Double-Entry Bookkeeping Principles',
      'Accruals vs. Cash Accounting'
    ],
    description: 'Core concepts of double-entry ledger bookkeeping, debit/credit mechanics, and financial statement structures.',
    iconName: 'BookOpen'
  },
  // Add additional modules here...
];
```

### 2. Replace the Question Bank (`src/data/questions.ts`)
Populate the questions array with your subject's scenario-based and theoretical questions:

```typescript
export const EHE_QUESTIONS: Question[] = [
  {
    id: 'q-acc-001',
    moduleId: 'mod-01',
    moduleTitle: 'Module 01: Introduction to Financial Accounting',
    subTopic: 'Double-Entry Bookkeeping Principles',
    scenario: 'A company purchases $15,000 of office equipment on credit from an approved supplier. The bookkeeper needs to record the transaction in the general ledger.',
    questionText: 'Which ledger entries correctly record this transaction?',
    options: [
      'Debit Cash $15,000; Credit Equipment $15,000',
      'Debit Equipment $15,000; Credit Accounts Payable $15,000',
      'Debit Accounts Payable $15,000; Credit Equipment $15,000',
      'Debit Retained Earnings $15,000; Credit Cash $15,000'
    ],
    correctAnswers: [1], // 0-based index of the correct option
    difficulty: 'Scenario',
    explanation: 'Purchasing an asset on credit increases an asset account (Equipment is debited) and increases a liability account (Accounts Payable is credited).',
    keyTakeaway: 'Assets increase with Debits; Liabilities increase with Credits.',
    pageRef: 'Chapter 2, Page 45'
  }
];
```

### 3. Update Flashcards (`src/data/flashcards.ts`)
Add high-yield summary cards for quick revision:

```typescript
export const EHE_FLASHCARDS: Flashcard[] = [
  {
    id: 'fc-01',
    moduleId: 'mod-01',
    moduleTitle: 'Module 01: Introduction to Financial Accounting',
    topic: 'Accounting Equation',
    front: 'What is the fundamental accounting equation?',
    back: 'Assets = Liabilities + Equity\n\nEvery financial transaction must keep this balance identical on both sides.',
    keyNote: 'Crucial foundational rule for balance sheet questions.'
  }
];
```

### 4. Rebrand App Titles & Passing Mark
1. **Title and Meta tags**: Edit `index.html` and `metadata.json` to reflect your new exam name.
2. **Navbar and Dashboard Brand**: Edit the brand text in `src/components/Navbar.tsx` and `src/components/Dashboard.tsx`.
3. **Default Passing Score & Time**: In `src/utils/storage.ts`, adjust `DEFAULT_SETTINGS`:
   ```typescript
   export const DEFAULT_SETTINGS: AppSettings = {
     mockExamQuestionCount: 50,
     mockExamDurationMinutes: 60,
     passingScorePercentage: 75, // e.g., 75% for CPA, 50% for IGCSE
     shuffleQuestions: true,
     shuffleOptions: true,
     darkMode: false
   };
   ```

---

## Project Directory Structure

```
├── index.html                  # HTML entry point and web fonts
├── package.json                # Project dependencies and npm scripts
├── src/
│   ├── App.tsx                 # Main application state and tab router
│   ├── main.tsx                # React root mount
│   ├── index.css               # Tailwind CSS rules and typography
│   ├── types.ts                # TypeScript interfaces (Question, Attempt, Module, etc.)
│   ├── data/
│   │   ├── modules.ts          # Course modules and syllabus hierarchy
│   │   ├── questions.ts        # Question bank (scenarios, options, explanations)
│   │   └── flashcards.ts       # Interactive flashcard deck
│   ├── components/
│   │   ├── Navbar.tsx          # Top navigation, dark mode, settings
│   │   ├── Dashboard.tsx       # Exam overview, score KPIs, quick launch buttons
│   │   ├── ExamRunner.tsx      # Active test engine (timer, strikethrough, grid)
│   │   ├── ExamResults.tsx     # Score diagnostics, retake buttons, detailed review
│   │   ├── ModuleDrillSelector.tsx # 12-module practice selector
│   │   ├── FlashcardDeck.tsx   # Interactive 3D flip card viewer
│   │   ├── HistoryAnalytics.tsx# Attempt logs, stats, and JSON backup/restore
│   │   ├── StudyNotesImporter.tsx # PDF / text notes uploader & question creator
│   │   └── SettingsModal.tsx   # Configurable timer, question counts, shuffle toggles
│   └── utils/
│       └── storage.ts          # LocalStorage persistence, backup export/import
└── tsconfig.json               # TypeScript configuration
```

---

## License

MIT License — Feel free to fork, customize, and distribute this application for non-commercial or educational purposes.
