# AI Agent Guidelines for Sumit's Portfolio

**Project**: High-performance developer portfolio with animation-rich UI  
**Stack**: Next.js 16 + React 19 + TypeScript + Tailwind CSS v4 + GSAP + Framer Motion  
**Package Manager**: pnpm  

---

## Quick Start for Agents

### Build & Dev Commands
```bash
pnpm dev         # Start dev server on localhost:3000
pnpm build       # Production build
pnpm start       # Run production server
pnpm lint        # Run ESLint
```

### Architecture Overview
- **App Structure**: `app/layout.tsx` (root) → `app/page.tsx` (home) → multiple section components
- **Components**: `app/components/` contains all major UI pieces (Hero, Navbar, Projects, Skills, etc.)
- **Design System**: `design-system/sumit-portfolio/MASTER.md` defines global design rules
- **State Management**: Context API via `ThemeProvider` (dark/light mode with localStorage)
- **All components use `"use client"` directive** (client-side rendering)

---

## Key Conventions & Patterns

### TypeScript
- **Strict mode enabled** in [tsconfig.json](tsconfig.json)
- **Path alias**: `@/*` maps to workspace root
- Type all component props and hooks (useRef, useContext, etc.)
- Target: ES2017

### Components & Styling
- **Naming**: PascalCase components, camelCase files/variables
- **CSS**: Tailwind v4 with CSS variables for theme colors
- **Theme Colors**: 
  - Light: `bg-#fafafa`, `text-#09090b`
  - Dark: `bg-#09090b`, `text-#f4f4f5`
  - Accents: Salesforce blue (`#2563eb`), AI teal (`#14b8a6`)

### Animation Libraries (Pick the right tool!)

| Library | Use For | Example |
|---------|---------|---------|
| **GSAP 3.15.0** | Timeline sequencing, staggered fades, entrance effects | Hero entrance fade, Navbar drawer animation |
| **Framer Motion 12.40.0** | Interactive spring physics, component-level animations, character stagger | CursorFollower dual-ring, ScrambleText letter reveals |
| **Canvas API** | Custom pixel-level effects | ScrambleBackground falling text matrix effect |
| **canvas-confetti** | One-off celebration effects | LoadingScreen confetti burst |

---

## Key Components & Their Patterns

### ThemeProvider
- Manages dark/light mode via Context API
- Persists to localStorage, respects system preferences
- Usage: Wrap layout, consume via `useContext(ThemeContext)`

### CursorFollower
- Custom animated cursor with dual-ring design
- Framer Motion `useSpring()` with different damping configs per ring
- Detects hover on `.cursor-pointer` elements
- Disabled on touch devices

### ScrambleText & LoadingScreen
- Character-by-character animation with custom `TextScramble` class
- Renders random symbols during reveal
- Use for animated text introductions and loading states

### Hero
- Cycles titles every 3.5 seconds
- GSAP entrance fade-in + Framer Motion stagger reveals
- Pattern: Combine GSAP timeline with Framer Motion component animations

### Navbar
- Sticky positioning with scroll detection
- Active section highlighting based on scroll position
- GSAP animated hamburger drawer for mobile
- Pattern: useRef for DOM manipulation + GSAP for smooth animations

### Projects
- Filterable grid (filters: salesforce/ai/fullstack)
- Modal details view with code snippets
- Pattern: useState for filter state + Framer Motion for modal animations

---

## Development Workflow

### Adding a New Component
1. Create `app/components/YourComponent.tsx`
2. Add `"use client"` at top
3. Use TypeScript interfaces for props
4. Apply animations with GSAP or Framer Motion as needed
5. Import theme colors from `globals.css` CSS variables
6. Add to `app/page.tsx` in appropriate section

### Styling
- Use Tailwind classes primarily
- For theme-aware colors, reference CSS variables: `var(--text-primary)`
- Check [globals.css](app/globals.css) for available CSS variables

### Animation Guidelines
- **GSAP**: Use for sequenced, multi-step animations (entrance timelines, staggered reveals)
- **Framer Motion**: Use for interactive animations (hover states, spring physics, gesture-driven)
- **Combine both**: Use GSAP timeline for orchestration, Framer Motion for component interactivity
- Always optimize canvas/WebGL performance on mobile

### Type Safety
- Run `pnpm lint` before committing
- ESLint config inherits from `eslint-config-next` (core-web-vitals + TypeScript)
- Strict TypeScript checking is enforced

---

## Project-Specific Conventions

### Theme System
- Light/dark mode toggled via ThemeProvider context
- CSS variables defined in `@theme` block in globals.css
- Component theme: Salesforce Blue + AI Teal accents

### Canvas Components
- ScrambleBackground starts animation after 4-second delay
- ScrambleBackground columns dynamically generated based on viewport width
- Avoid blocking main thread with heavy Canvas operations

### Responsive Design
- Mobile-first approach with Tailwind breakpoints
- CursorFollower disabled on touch devices
- Hamburger menu for mobile navigation via Navbar

---

## Common Development Tasks

| Task | Approach |
|------|----------|
| Add new section | Create component in `app/components/`, add to `page.tsx` |
| Change theme colors | Update CSS variables in `globals.css` @theme block |
| Add animation to component | Use Framer Motion for interactive, GSAP for sequenced |
| Add project | Update Projects component data structure |
| Update design rules | Edit `design-system/sumit-portfolio/MASTER.md` |
| Debug layout issues | Check Tailwind v4 config in `tailwind.config.*` and globals.css |

---

## Important Files Reference

- [app/layout.tsx](app/layout.tsx) — Root layout, ThemeProvider wrapper
- [app/page.tsx](app/page.tsx) — Main home page, orchestrates all sections
- [app/globals.css](app/globals.css) — CSS variables, theme definitions, Tailwind v4 @theme
- [app/components/ThemeProvider.tsx](app/components/ThemeProvider.tsx) — Theme management
- [package.json](package.json) — Dependencies and scripts
- [tsconfig.json](tsconfig.json) — TypeScript config, path aliases
- [design-system/sumit-portfolio/MASTER.md](design-system/sumit-portfolio/MASTER.md) — Design rules

---

## Performance & Optimization

- Framer Motion spring configs tuned per-component (check CursorFollower for damping/stiffness values)
- Canvas animations optimized for 60fps (check ScrambleBackground for requestAnimationFrame patterns)
- LoadingScreen TextScramble class batches DOM updates
- Lazy load heavy animations on mobile devices

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Theme not persisting | Check ThemeProvider localStorage logic in [app/components/ThemeProvider.tsx](app/components/ThemeProvider.tsx) |
| Animation janky on mobile | Disable via device detection (touch), or reduce particle counts in Canvas components |
| ESLint errors | Run `pnpm lint --fix` to auto-fix, or check `eslint.config.mjs` for rule overrides |
| Tailwind styles not applying | Verify content paths in `tailwind.config.*` include all component files |
| TypeScript errors | Ensure `"use client"` at top of client-side components, check tsconfig path aliases |

---

## Next Steps for New Agents

1. Read [app/page.tsx](app/page.tsx) to understand page orchestration
2. Review [app/components/ThemeProvider.tsx](app/components/ThemeProvider.tsx) for state management pattern
3. Study [app/components/Hero.tsx](app/components/Hero.tsx) for GSAP + Framer Motion combination
4. Check [globals.css](app/globals.css) for available CSS variables and theme colors
5. Review [design-system/sumit-portfolio/MASTER.md](design-system/sumit-portfolio/MASTER.md) for design rules
