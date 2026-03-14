# AI Resume Builder

A premium, fully client-side resume builder with deterministic ATS scoring, live preview, template switching, color theming, and PDF export. Built with React + Vite. No backend required.

---

## Features

### Resume Builder
- **7-section form** — Personal Info, Summary, Experience, Education, Projects, Skills, Links
- **Auto-save** — every keystroke persists to `localStorage` automatically
- **Live preview** — right panel updates in real time as you type
- **Sample data** — one-click load with a complete example resume (Priya Nair)
- **Bullet guidance** — inline hints for action verbs and measurable impact

### ATS Score
Deterministic scoring engine — no AI, no network calls. Score updates live as you edit.

| Rule | Points |
|---|---|
| Name provided | +10 |
| Email provided | +10 |
| Phone provided | +5 |
| Summary > 50 characters | +10 |
| Action verbs in summary/experience | +10 |
| At least 1 experience with description | +15 |
| At least 1 education entry | +10 |
| At least 5 skills | +10 |
| At least 1 project | +10 |
| LinkedIn link | +5 |
| GitHub link | +5 |
| **Total** | **100** |

Score tiers: 🔴 **0–40** Needs Work · 🟡 **41–70** Getting There · 🟢 **71–100** Strong Resume

### Template System
Three resume layouts, switchable without losing data:

| Template | Style |
|---|---|
| **Classic** | Single-column, Playfair Display serif headings, horizontal rules |
| **Modern** | Two-column — colored sidebar (contact + skills) + main content |
| **Minimal** | Single-column, generous whitespace, no borders, sans-serif throughout |

### Color Themes
Five accent colors applied across headings, borders, and the Modern sidebar:

| Theme | Value |
|---|---|
| Teal (default) | `hsl(168, 60%, 40%)` |
| Navy | `hsl(220, 60%, 35%)` |
| Burgundy | `hsl(345, 60%, 35%)` |
| Forest | `hsl(150, 50%, 30%)` |
| Charcoal | `hsl(0, 0%, 25%)` |

### Export
- **Print** — opens browser print dialog
- **Download PDF** — opens print dialog pre-configured for PDF save
- **Copy as Text** — copies plain-text resume to clipboard

### Proof + Submission (`/proof`)
- **Step Completion Overview** — 8 auto-detected build steps
- **Feature Test Checklist** — 10 automated + manual tests
- **Artifact Collection** — Lovable, GitHub, and deployed URL inputs with validation
- **Shipped Status** — unlocks only when all 3 gates pass simultaneously

---

## Tech Stack

- **React 18** — UI and state management
- **Vite** — dev server and build tool
- **CSS Variables** — theming and design tokens
- **localStorage** — all persistence (no backend)
- **ReactDOM.createPortal** — print isolation
- **No external UI libraries** — fully custom components

---

## Project Structure

```
src/
├── App.jsx                        # Root: routing, state wiring
├── main.jsx                       # React entry point
│
├── data/
│   ├── sampleData.js              # SAMPLE_DATA + EMPTY_DATA
│   ├── templates.js               # 3 template definitions
│   └── themes.js                  # 5 color theme definitions
│
├── hooks/
│   ├── useResumeState.js          # All resume state + localStorage + migration
│   ├── useATSScore.js             # Deterministic ATS scoring (11 rules, max 100)
│   ├── useTemplateState.js        # Template persistence
│   └── useThemeState.js           # Theme persistence + CSS var injection
│
├── components/
│   ├── TopNav.jsx/css             # Fixed navigation bar
│   ├── FormField.jsx/css          # Reusable input + textarea
│   ├── TagInput.jsx/css           # Chip/pill tag input
│   ├── SkillsSection.jsx/css      # 3 skill categories + Suggest button
│   ├── ProjectsSection.jsx/css    # Collapsible project entries
│   ├── ResumePreview.jsx/css      # Live resume render (Classic/Modern/Minimal)
│   ├── ATSScore.jsx/css           # Circular progress ring + suggestions
│   ├── BulletGuidance.jsx/css     # Inline action verb hints
│   ├── DesignControls.jsx/css     # Template thumbnails + color picker
│   └── ExportBar.jsx/css          # Print + PDF + Copy as Text
│
├── pages/
│   ├── HomePage.jsx/css           # / — landing
│   ├── BuilderPage.jsx/css        # /builder — form + live preview
│   ├── PreviewPage.jsx/css        # /preview — full preview + ATS + export
│   └── ProofPage.jsx/css          # /proof — submission system
│
├── styles/
│   ├── global.css                 # Design tokens, reset, shared utilities
│   └── templates.css              # Template CSS overrides via data-template attr
│
└── utils/
    └── exportText.js              # Plain-text resume generator + export validation
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Install and Run

```bash
# Clone or download the project
cd ai-resume

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Build for Production

```bash
npm run build
# Output in dist/
```

---

## Routes

| Route | Page |
|---|---|
| `/` | Home — landing page |
| `/builder` | Builder — form + live preview + ATS score |
| `/preview` | Preview — full resume + template/color controls + export |
| `/proof` | Proof — test checklist + submission system |

---

## localStorage Keys

| Key | Contents |
|---|---|
| `resumeBuilderData` | Full resume object (JSON) |
| `resumeBuilderTemplate` | Selected template id (`classic` / `modern` / `minimal`) |
| `resumeBuilderTheme` | Selected color theme id (`teal` / `navy` / `burgundy` / `forest` / `charcoal`) |
| `rb_final_submission` | Proof page artifact links (Lovable / GitHub / Deployed URL) |

---

## Resume Data Shape

```js
{
  personal: {
    name: string,
    email: string,
    phone: string,
    location: string,
  },
  summary: string,
  experience: [
    { id, company, role, duration, description }
  ],
  education: [
    { id, institution, degree, year, grade }
  ],
  projects: [
    { id, name, description, techStack: string[], liveUrl, githubUrl }
  ],
  skills: {
    technical: string[],
    soft: string[],
    tools: string[],
  },
  links: {
    github: string,
    linkedin: string,
  }
}
```

---

## Shipped Status Rules

The `/proof` page shows **"Project 3 Shipped Successfully."** only when ALL three conditions are true simultaneously:

1. All 8 build steps auto-detected as complete
2. All 10 feature checklist tests passed
3. All 3 artifact links (Lovable + GitHub + Deployed) are valid URLs

---

## Design System

- **Fonts** — Playfair Display (headings) + DM Sans (body) + DM Mono (code/labels)
- **Base color** — `#F7F6F3` off-white background
- **Accent** — driven by selected theme via `--rv-accent` CSS variable
- **Spacing** — 8px base scale (`--s1` through `--s5`)
- **Breakpoints** — mobile layout activates at ≤ 900px

---

## License

MIT
