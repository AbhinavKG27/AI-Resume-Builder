export const STEPS = [
  { id: 1, route: "/rb/01-problem",      label: "Problem",      tag: "01", phase: "DISCOVER" },
  { id: 2, route: "/rb/02-market",       label: "Market",       tag: "02", phase: "DISCOVER" },
  { id: 3, route: "/rb/03-architecture", label: "Architecture", tag: "03", phase: "DESIGN"   },
  { id: 4, route: "/rb/04-hld",          label: "HLD",          tag: "04", phase: "DESIGN"   },
  { id: 5, route: "/rb/05-lld",          label: "LLD",          tag: "05", phase: "DESIGN"   },
  { id: 6, route: "/rb/06-build",        label: "Build",        tag: "06", phase: "BUILD"    },
  { id: 7, route: "/rb/07-test",         label: "Test",         tag: "07", phase: "SHIP"     },
  { id: 8, route: "/rb/08-ship",         label: "Ship",         tag: "08", phase: "SHIP"     },
];

export const STEP_META = {
  1: {
    title: "Problem Definition",
    context: "Identify and articulate the core problem your AI Resume Builder solves. Define user pain points, scope, and success criteria.",
    prompt: `You are a senior product engineer at a top-tier tech company.

Define the problem statement for an AI Resume Builder with:
1. Core user pain points (3–5 specific problems)
2. Who the target users are (personas)
3. What "solved" looks like — measurable success criteria
4. Out-of-scope items (to maintain focus)
5. One-liner product vision statement

Format your response as a clean product brief. Be specific and opinionated.`,
  },
  2: {
    title: "Market Research",
    context: "Analyze the competitive landscape, identify gaps, and position your product for maximum impact.",
    prompt: `You are a product strategist conducting market analysis for an AI Resume Builder.

Provide:
1. Top 5 competitors with key strengths/weaknesses
2. Market size estimate (TAM/SAM/SOM)
3. 3 underserved user segments
4. Differentiation angle — what makes this product win
5. Monetization model recommendation

Be data-informed and direct. No fluff.`,
  },
  3: {
    title: "System Architecture",
    context: "Design the high-level technical blueprint. Choose your tech stack and map out system boundaries.",
    prompt: `You are a staff engineer designing an AI Resume Builder system.

Design the system architecture covering:
1. Tech stack recommendation (frontend, backend, AI layer, storage)
2. System components diagram (describe as text/ASCII)
3. Data flow: user input → AI processing → resume output
4. Third-party integrations (LLMs, PDF generation, auth)
5. Scalability considerations

Be opinionated about tech choices and explain tradeoffs.`,
  },
  4: {
    title: "High-Level Design",
    context: "Define the major modules, services, and their interactions at a 10,000-foot view.",
    prompt: `You are designing the HLD for an AI Resume Builder.

Document:
1. Core modules (Auth, Resume Engine, AI Service, Export, User Profile)
2. Service boundaries and responsibilities
3. API surface area overview (key endpoints)
4. Database schema overview (main entities)
5. Infrastructure diagram (cloud services, CDN, storage)

Present as an HLD document a senior engineer would review.`,
  },
  5: {
    title: "Low-Level Design",
    context: "Go deep on implementation details for the critical path — the AI resume generation flow.",
    prompt: `You are writing the LLD for the AI Resume Generation feature of an AI Resume Builder.

Detail:
1. Resume data model (full schema with field types)
2. AI prompt engineering strategy (how to extract structured data)
3. Resume scoring algorithm outline
4. PDF generation pipeline (steps, libraries)
5. State machine for resume editing lifecycle
6. Error handling and edge cases

Be precise. Include pseudo-code where helpful.`,
  },
  6: {
    title: "Build Sprint",
    context: "Translate your design into working code. Use Lovable to scaffold the core UI and logic.",
    prompt: `You are a fullstack engineer building an AI Resume Builder MVP in Lovable.

Generate a Lovable prompt to create:
1. Landing page with hero + CTA
2. Onboarding flow (collect name, role, experience level)
3. Resume builder workspace (left: form, right: live preview)
4. AI generation button that calls an API endpoint
5. Export to PDF button
6. Clean, professional design with dark/light mode

Write this as a detailed Lovable prompt that will produce production-ready code.`,
  },
  7: {
    title: "Testing",
    context: "Validate your build against requirements. Cover unit, integration, and user acceptance testing.",
    prompt: `You are a QA lead testing an AI Resume Builder MVP.

Create a test plan covering:
1. Unit tests for resume data validation (10 test cases)
2. Integration tests for AI generation flow (5 scenarios)
3. UI/UX checklist (20 items)
4. Edge cases to test (empty inputs, long text, special characters)
5. Performance benchmarks (generation time, PDF export time)
6. UAT script for 3 user personas

Format as a structured test plan document.`,
  },
  8: {
    title: "Ship It",
    context: "Deploy your application, set up monitoring, and prepare your launch checklist.",
    prompt: `You are a DevOps engineer shipping an AI Resume Builder to production.

Create a launch checklist covering:
1. Deployment steps (Vercel/Netlify config)
2. Environment variables to set
3. Pre-launch QA checklist (10 items)
4. Monitoring setup (error tracking, analytics)
5. Launch announcement draft (Twitter/LinkedIn)
6. Post-launch metrics to track (day 1, week 1, month 1)

Be specific and actionable. This is a real launch.`,
  },
};
