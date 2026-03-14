# AI Resume Builder

A premium, fully client-side resume builder with live ATS scoring, template switching, dual-theme support, and PDF export. Built with React 18 + Vite. No backend, no account required — everything runs in the browser.

---

## What It Does

You fill in a form. A live resume preview updates on the right. An ATS score tells you exactly what's missing and how to improve. When you're happy, export to PDF in one click.

---

## Features

### Resume Builder
- **7 form sections** — Personal Info, Summary, Experience, Education, Projects, Skills, Links
- **Auto-save on every keystroke** — all data persists in `localStorage`, nothing is ever lost
- **Live right-panel preview** — resume re-renders instantly as you type
- **Load Sample Data** — fills the entire form with a complete example in one click
- **Bullet guidance** — inline hints appear when experience bullets lack action verbs or numbers
- **Skills tag input** — Enter/comma to add chips, three categories: Technical, Soft Skills, Tools
- **Project entries** — collapsible cards with 200-char description limit and tech stack chips

### ATS Score (Live, Deterministic)
No AI. No network call. Pure rule-based scoring that re-calculates on every keystroke.

| Rule | Points |
|---|---|
| Name provided | +10 |
| Email provided | +10 |
| Phone provided | +5 |
| Summary over 50 characters | +10 |
| Action verbs used (built, led, designed…) | +10 |
| At least 1 experience entry with description | +15 |
| At least 1 education entry | +10 |
| At least 5 skills | +10 |
| At least 1 project | +10 |
| LinkedIn link | +5 |
| GitHub link | +5 |
| **Maximum** | **100** |

Score tiers: 🔴 0–40 Needs Work · 🟡 41–70 Getting There · 🟢 71–100 Strong Resume

### Template System
Three layouts — same data, completely different presentation:

| Template | Style |
|---|---|
| **Classic** | Single column, Playfair Display serif headings, bold horizontal rules |
| **Modern** | Two-column — colored sidebar with contact info + skills on the left |
| **Minimal** | Single column, maximum whitespace, no borders, clean sans-serif throughout |

### Color Themes
Five accent colors that restyle headings, dividers, and sidebar backgrounds:
Teal · Navy · Burgundy · Forest · Charcoal

### Dark / Light Mode
A pill-shaped toggle in the navbar switches between themes with a 0.25s crossfade.
Preference is saved to `localStorage` and restored on every visit.

### Export
- **Print** — browser print dialog
- **Download PDF** — print dialog pre-aimed at "Save as PDF"
- **Copy as Text** — clean plain-text resume to clipboard

### Proof + Submission (`/proof`)
Built-in quality gate with four sections:
1. **Step Completion** — 8 steps auto-detected from your resume data
2. **Feature Test Checklist** — 10 automated + manual tests
3. **Artifact Collection** — Lovable, GitHub, deployed URL with validation
4. **Shipped Status** — unlocks only when all three gates pass simultaneously

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 18 |
| Build | Vite |
| Styling | Pure CSS with custom properties |
| State | useState + useCallback + useMemo |
| Persistence | localStorage (no backend) |
| Print / PDF | ReactDOM.createPortal + window.print() |
| Fonts | Playfair Display + DM Sans + DM Mono |
| Dependencies | React only |

---

## Getting Started

```bash
cd ai-resume
npm install
npm run dev
# Opens at http://localhost:5173
```

```bash
npm run build
# Production output in /dist
```

---

## Project Structure

```
src/
├── App.jsx                        # Root: routing, all state wiring
├── main.jsx                       # Entry point
│
├── data/
│   ├── sampleData.js              # Full example resume data
│   ├── templates.js               # Template definitions
│   └── themes.js                  # Accent color theme definitions
│
├── hooks/
│   ├── useResumeState.js          # Form state + localStorage + migration
│   ├── useATSScore.js             # Scoring engine (11 rules, 100 pts max)
│   ├── useTemplateState.js        # Template persistence
│   ├── useThemeState.js           # Accent color + CSS var injection
│   └── useAppTheme.js             # Dark / light mode toggle + persistence
│
├── components/
│   ├── TopNav                     # Navbar with theme toggle + CTA
│   ├── FormField                  # Labeled input / textarea
│   ├── TagInput                   # Chip-based tag input
│   ├── SkillsSection              # Three-category skills + Suggest button
│   ├── ProjectsSection            # Collapsible project cards
│   ├── ResumePreview              # Live resume render (all 3 templates)
│   ├── ATSScore                   # Ring + bars + suggestions
│   ├── BulletGuidance             # Inline writing hints
│   ├── DesignControls             # Template thumbnails + color circles
│   └── ExportBar                  # Print / PDF / Copy
│
├── pages/
│   ├── HomePage                   # / — landing
│   ├── BuilderPage                # /builder — form + live preview
│   ├── PreviewPage                # /preview — full preview + export
│   └── ProofPage                  # /proof — submission system
│
├── styles/
│   ├── global.css                 # All CSS variables + both themes + utilities
│   └── templates.css              # Resume template overrides
│
└── utils/
    └── exportText.js              # Plain-text generator + validation
```

---

## Routes

| Route | Page |
|---|---|
| `/` | Home |
| `/builder` | Builder |
| `/preview` | Preview + Export |
| `/proof` | Proof + Submission |

---

## localStorage Keys

| Key | Value |
|---|---|
| `resumeBuilderData` | Full resume JSON |
| `resumeBuilderTemplate` | `classic` / `modern` / `minimal` |
| `resumeBuilderTheme` | `teal` / `navy` / `burgundy` / `forest` / `charcoal` |
| `appThemeMode` | `dark` / `light` |
| `rb_final_submission` | Proof artifact links |

---

## Design System

### Color Palette

**Brand constants (both themes):**
```
Coral CTA:       #F58F7C
Coral hover:     #F07060
Soft pink:       #F2C4CE
Primary dark:    #2C2B30
Secondary dark:  #4F4F51
```

**Dark theme:**
```
Background:      #2C2B30
Alt background:  #242328
Surface / card:  #4F4F51
Primary text:    #D6D6D6
Secondary text:  #B8B8B8
Muted text:      #888890
Border:          rgba(214,214,214,0.18)
```

**Light theme:**
```
Background:      #F7F6F3
Alt background:  #F0EEE9
Surface / card:  #FFFFFF
Primary text:    #1E1E1E
Secondary text:  #6B6B6B
Muted text:      #9E9E9E
Border:          #E5E4E2
```

### Typography
- Headings — Playfair Display (serif)
- Body / UI — DM Sans (sans-serif)
- Labels / mono — DM Mono (monospace)

### Spacing
`8px · 16px · 24px · 40px · 64px`

### Breakpoints
- `≤ 900px` — builder stacks vertically
- `≤ 640px` — mobile padding + hidden toggle label

---

## Theme Toggle Design

52×28px pill in the navbar:
- **Dark** — charcoal pill, coral glow ring, circle slides right with coral fill and moon icon
- **Light** — warm beige pill, grey border, circle slides left with white fill and sun icon
- Spring animation: `cubic-bezier(0.34, 1.56, 0.64, 1)`
- Hover: coral glow ring pulses on the pill

---

## Shipped Gate

The proof page shows **"Project 3 Shipped Successfully."** only when all three are true at once:

1. All 8 build steps complete (auto-detected)
2. All 10 checklist tests passed
3. All 3 artifact URLs valid (Lovable + GitHub + Deployed)

Otherwise the badge reads **"In Progress"**.

---

## License

MIT
