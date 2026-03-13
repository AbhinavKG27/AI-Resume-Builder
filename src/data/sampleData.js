// 📁 Location: src/data/sampleData.js  ← MODIFIED

export const SAMPLE_DATA = {
  personal: {
    name: "Priya Nair",
    email: "priya.nair@email.com",
    phone: "+91 98765 43210",
    location: "Bengaluru, Karnataka",
  },
  summary:
    "Full-stack engineer with 4 years of experience building scalable web applications. Passionate about clean architecture, developer experience, and shipping products that users love. Open-source contributor and technical writer.",
  education: [
    {
      id: "edu-1",
      institution: "RV College of Engineering",
      degree: "B.E. in Computer Science",
      year: "2016 – 2020",
      grade: "8.7 CGPA",
    },
  ],
  experience: [
    {
      id: "exp-1",
      company: "Razorpay",
      role: "Software Engineer II",
      duration: "Jan 2022 – Present",
      description:
        "Led migration of legacy checkout flow to React micro-frontends, reducing load time by 40%. Mentored 3 junior engineers and drove adoption of TypeScript across the team.",
    },
    {
      id: "exp-2",
      company: "Freshworks",
      role: "Software Engineer",
      duration: "Jul 2020 – Dec 2021",
      description:
        "Built customer-facing features for Freshdesk using Vue.js and Rails. Improved API response time by 30% through query optimisation.",
    },
  ],
  // Projects now use the new shape: techStack[], liveUrl, githubUrl
  projects: [
    {
      id: "proj-1",
      name: "OpenResume",
      description: "Open-source resume builder with ATS scoring. 2,000+ GitHub stars. Featured on Product Hunt.",
      techStack: ["Next.js", "Tailwind", "Supabase"],
      liveUrl: "https://openresume.dev",
      githubUrl: "github.com/priya/openresume",
    },
    {
      id: "proj-2",
      name: "PayTrack",
      description: "Expense tracking dashboard with real-time sync. Reduced reconciliation time by 60% for 500+ users.",
      techStack: ["React", "Node.js", "PostgreSQL"],
      liveUrl: "",
      githubUrl: "github.com/priya/paytrack",
    },
  ],
  // Skills is now a structured object with three categories
  skills: {
    technical: ["React", "TypeScript", "Node.js", "PostgreSQL", "Redis"],
    soft:      ["Team Leadership", "Technical Writing", "Mentoring"],
    tools:     ["Docker", "AWS", "Figma", "Git"],
  },
  links: {
    github: "github.com/priyanair",
    linkedin: "linkedin.com/in/priyanair",
  },
};

export const EMPTY_DATA = {
  personal: { name: "", email: "", phone: "", location: "" },
  summary: "",
  education: [],
  experience: [],
  projects: [],
  skills: { technical: [], soft: [], tools: [] },
  links: { github: "", linkedin: "" },
};
