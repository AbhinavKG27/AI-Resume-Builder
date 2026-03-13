// 📁 Location: src/hooks/useATSScore.js  ← REPLACED
// Deterministic ATS scoring. Max 100. 11 rules.
// Re-computes live on every resume change via useMemo.

import { useMemo } from "react";

const ACTION_VERBS = [
  "built","led","designed","improved","created","developed","launched",
  "managed","optimized","automated","reduced","increased","implemented",
  "delivered","architected","scaled","migrated","shipped","drove","mentored",
  "established","streamlined","deployed","integrated","refactored","owned",
  "spearheaded","engineered","coordinated","directed","accelerated",
];

const hasActionVerb = (text = "") =>
  ACTION_VERBS.some(v => new RegExp(`\\b${v}\\b`, "i").test(text));

const countSkills = (skills) => {
  if (!skills) return 0;
  if (typeof skills === "string")
    return skills.split(",").map(s => s.trim()).filter(Boolean).length;
  return (skills.technical?.length ?? 0)
       + (skills.soft?.length ?? 0)
       + (skills.tools?.length ?? 0);
};

export const RULES = [
  {
    id: "name", points: 10, label: "Name",
    check: r => !!r.personal?.name?.trim(),
    suggestion: "Add your full name",
  },
  {
    id: "email", points: 10, label: "Email",
    check: r => !!r.personal?.email?.trim(),
    suggestion: "Add your email address",
  },
  {
    id: "phone", points: 5, label: "Phone",
    check: r => !!r.personal?.phone?.trim(),
    suggestion: "Add your phone number",
  },
  {
    id: "summary", points: 10, label: "Summary",
    check: r => (r.summary?.trim().length ?? 0) > 50,
    suggestion: "Write a professional summary (50+ characters)",
  },
  {
    id: "action_verbs", points: 10, label: "Action verbs",
    check: r => {
      const text = [
        r.summary ?? "",
        ...(r.experience ?? []).map(e => e.description ?? ""),
      ].join(" ");
      return hasActionVerb(text);
    },
    suggestion: "Use action verbs (built, led, designed, improved…)",
  },
  {
    id: "experience", points: 15, label: "Experience",
    check: r => (r.experience?.length ?? 0) >= 1
             && r.experience.some(e => e.description?.trim()),
    suggestion: "Add a work experience entry with a description",
  },
  {
    id: "education", points: 10, label: "Education",
    check: r => (r.education?.length ?? 0) >= 1,
    suggestion: "Add your education details",
  },
  {
    id: "skills", points: 10, label: "Skills (5+)",
    check: r => countSkills(r.skills) >= 5,
    suggestion: "Add at least 5 skills",
  },
  {
    id: "project", points: 10, label: "Project",
    check: r => (r.projects?.length ?? 0) >= 1,
    suggestion: "Add at least 1 project",
  },
  {
    id: "linkedin", points: 5, label: "LinkedIn",
    check: r => !!r.links?.linkedin?.trim(),
    suggestion: "Add your LinkedIn profile URL",
  },
  {
    id: "github", points: 5, label: "GitHub",
    check: r => !!r.links?.github?.trim(),
    suggestion: "Add your GitHub profile URL",
  },
];

export function getScoreTier(score) {
  if (score >= 71) return { label: "Strong Resume", color: "#16a34a", cls: "tier-green", emoji: "🟢" };
  if (score >= 41) return { label: "Getting There", color: "#d97706", cls: "tier-amber", emoji: "🟡" };
  return               { label: "Needs Work",      color: "#dc2626", cls: "tier-red",   emoji: "🔴" };
}

export function useATSScore(resume) {
  return useMemo(() => {
    const results = RULES.map(rule => ({
      ...rule,
      passed: !!rule.check(resume),
    }));

    const score = Math.min(100,
      results.filter(r => r.passed).reduce((s, r) => s + r.points, 0)
    );

    const tier = getScoreTier(score);

    const suggestions = results
      .filter(r => !r.passed)
      .sort((a, b) => b.points - a.points)
      .map(r => ({ id: r.id, text: `${r.suggestion} (+${r.points} pts)`, points: r.points }));

    const breakdown = results.map(({ id, label, points, passed }) => ({
      id, label, points, earned: passed ? points : 0, passed,
    }));

    return { score, tier, suggestions, breakdown };
  }, [resume]);
}
