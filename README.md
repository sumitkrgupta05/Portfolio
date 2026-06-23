# ⚡ Sumit's High-Performance Developer Portfolio

Welcome to the repository of **Sumit's Developer Portfolio**, a modern, high-performance web application designed with rich typography, glassmorphism, fluid interactive animations, and responsive layouts. Built with **Next.js 16**, **React 19**, and **Tailwind CSS v4**, this portfolio reflects state-of-the-art web aesthetics and animation performance.

---

## 🎨 Tech Stack & Libraries

This portfolio leverages a curated, high-performance stack chosen for visual excellence, micro-animations, and fluid physics-based interactions.

| Layer | Technology | Details |
|---|---|---|
| **Framework** | [Next.js 16 (App Router)](https://nextjs.org/) | Client-side rendering orchestration using `"use client"`. |
| **Runtime** | [React 19](https://react.dev/) | React 19 Client Components & Context-driven State Management. |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Modern layout engine with customized CSS Variables for theme synchronization. |
| **Animation Core** | [GSAP 3.15.0](https://gsap.com/) | Orchestrates timeline sequences, staggered animations, and entrance fades. |
| **Physics & Gestures** | [Framer Motion 12.40.0](https://framer.com/motion/) | Interactive elements, modal transitions, and spring-based custom cursor. |
| **Smooth Scrolling** | [Locomotive Scroll 5.0.1](https://github.com/locomotivemtl/locomotive-scroll) | Lenis-powered viewport smooth wheel controls. |
| **Particle Canvas** | HTML5 Canvas API | Low-overhead pixel-level custom animations. |
| **Celebrations** | `canvas-confetti` | One-off loading celebration trigger. |

---

## 🌌 Core Features & Component Architecture

Every component is written in TypeScript, strictly adhering to the modern design token system defined in [design-system/sumit-portfolio/MASTER.md](design-system/sumit-portfolio/MASTER.md).

### 1. Root Layout & State Management
- **[ThemeProvider.tsx](app/components/ThemeProvider.tsx)**: Context API wrapper managing local state (Dark vs. Light mode). It automatically reads preferences from `localStorage` or matches user system preferences, and applies corresponding variables dynamically.
- **[CursorFollower.tsx](app/components/CursorFollower.tsx)**: Dual-ring custom cursor tracking using Framer Motion's `useSpring()` hook. It scales up and updates opacity upon hovering over interactive components with the `.cursor-pointer` class.

### 2. Immersive Visual Introductions
- **[LoadingScreen.tsx](app/components/LoadingScreen.tsx)**: An initial loading screen that utilizes a custom `TextScramble` character-replacement utility. Features a celebration burst of `canvas-confetti` once load state completes.
- **[ScrambleBackground.tsx](app/components/ScrambleBackground.tsx)**: Canvas-based text matrix rain background that initializes after a set delay to avoid main thread blockage during startup, adjusting columns based on viewport sizing.

### 3. Dynamic Section Modules
- **[Hero.tsx](app/components/Hero.tsx)**: Integrates GSAP entrance sequences with titles that cycle continuously every 3.5 seconds (Salesforce Development, AI Engineering, Full-Stack Design).
- **[Navbar.tsx](app/components/Navbar.tsx)**: Sticky header containing scroll-aware active section highlights and GSAP-orchestrated mobile navigation drawer.
- **[Projects.tsx](app/components/Projects.tsx)**: Masonry-style filterable project grid (Filter by: Salesforce / AI / Full-Stack). Hovering displays custom interactive tags, and clicking opens a Framer Motion-animated modal view detailing code snippets.
- **[Skills.tsx](app/components/Skills.tsx)** & **[Experience.tsx](app/components/Experience.tsx)**: Detailed visual showcases detailing technologies and career paths.
- **[Contact.tsx](app/components/Contact.tsx)**: Fully interactive responsive communication form utilizing modern input focus styles.

---

## 💅 Visual Guidelines & Design System

The portfolio styling follows strict guidelines outlined in the portfolio master sheet:
- **Fonts**: Archivo (Headings) paired with Space Grotesk (Body typography) loaded from Google Fonts.
- **Theme Accents**: High contrast design system featuring Salesforce Blue (`#2563eb`) and AI Teal (`#14b8a6`) over structured monochrome bases.
- **Anti-Patterns Forbidden**:
  - No emojis are used as icons (using clean SVG icons from `lucide-react`).
  - No layout-shifting scale transformations.
  - Consistent focus and hover indicators on all clickable elements.

---

## 🚀 Getting Started & Scripts

This repository uses **pnpm** as its primary package manager. 

### Install Dependencies
```bash
pnpm install
```

### Development Server
Starts the Next.js development server on `http://localhost:3000`:
```bash
pnpm dev
```

### Production Build
Builds the optimized production-ready static assets:
```bash
pnpm build
```

### Run Production Server
Launches the built Next.js server locally:
```bash
pnpm start
```

### Lint Checks
Runs the ESLint static code analyzer:
```bash
pnpm lint
```

---

## 📁 Repository Map

```
├── .agent/                    # Autonomous workspace configurations
├── app/
│   ├── components/            # Reusable UI component modules
│   │   ├── ThemeProvider.tsx  # Theme context & storage logic
│   │   ├── CursorFollower.tsx # Interactive mouse follower
│   │   ├── Hero.tsx           # Page entry & title loop
│   │   └── ...                # Other section components
│   ├── globals.css            # Tailwind directive imports & theme variables
│   ├── layout.tsx             # Main HTML head structure and setup
│   └── page.tsx               # Main page layout & section sequencer
├── design-system/
│   └── sumit-portfolio/
│       └── MASTER.md          # Global styling token rules & standards
├── public/                    # Static image & vector assets
├── package.json               # Package setup and build hooks
├── tsconfig.json              # TypeScript compilation setup
└── pnpm-workspace.yaml        # Workspace configuration details
```

---

*Built with passion, performance, and modern animation engineering by Sumit.*
