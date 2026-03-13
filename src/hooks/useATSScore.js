// 📁 Location: src/hooks/useATSScore.js  ← NEW FILE
// Deterministic ATS scoring hook.
// Re-computes score + suggestions whenever resume data changes.

import { useMemo } from "react";

// ── Helpers ──────────────────────────────────────────────────────────────────
const wordCount = (str) =>
  str?.trim().split(/\s+/).filter(Boolean).length ?? 0;

// Detects numbers, %, k, x in a string (measurable impact)
const hasMeasurableImpact = (str) =>
  /(\d+\s*%|\d+\s*x|\d+k|\d+\+|\d{2,})/i.test(str ?? "");

// ── Scoring rules ─────────────────────────────────────────────────────────────
// Each rule returns { points, id, suggestion }
// points > 0 means the rule passed and those points are awarded.
// suggestion is shown only when points === 0.

const RULES = [
  {
    id: "summary_length",
    maxPoints: 15,
    check: (r) => {
      const wc = wordCount(r.summary);
      return wc >= 40 && wc <= 120;
    },
    suggestion: "Write a stronger summary (40–120 words).",
  },
  {
    id: "two_projects",
    maxPoints: 10,
    check: (r) => (r.projects?.length ?? 0) >= 2,
    suggestion: "Add at least 2 projects.",
  },
  {
    id: "one_experience",
    maxPoints: 10,
    check: (r) => (r.experience?.length ?? 0) >= 1,
    suggestion: "Add at least 1 work experience entry.",
  },
  {
    id: "eight_skills",
    maxPoints: 10,
    check: (r) => {
      let count = 0;
      const s = r.skills;
      if (!s) { count = 0; }
      else if (typeof s === "string") {
        // legacy comma-string
        count = s.split(",").map(x => x.trim()).filter(Boolean).length;
      } else {
        // new object shape { technical[], soft[], tools[] }
        count = (s.technical?.length ?? 0)
              + (s.soft?.length      ?? 0)
              + (s.tools?.length     ?? 0);
      }
      return count >= 8;
    },
    suggestion: "Add more skills (target 8+).",
  },
  {
    id: "has_links",
    maxPoints: 10,
    check: (r) =>
      r.links?.github?.trim().length > 0 ||
      r.links?.linkedin?.trim().length > 0,
    suggestion: "Add your GitHub or LinkedIn link.",
  },
  {
    id: "measurable_impact",
    maxPoints: 15,
    check: (r) => {
      const bullets = [
        ...(r.experience ?? []).map((e) => e.description),
        ...(r.projects   ?? []).map((p) => p.description),
      ];
      return bullets.some(hasMeasurableImpact);
    },
    suggestion: "Add measurable impact (numbers, %, growth) in your bullets.",
  },
  {
    id: "education_complete",
    maxPoints: 10,
    check: (r) => {
      const edu = r.education ?? [];
      return (
        edu.length >= 1 &&
        edu.every(
          (e) =>
            e.institution?.trim() &&
            e.degree?.trim() &&
            e.year?.trim()
        )
      );
    },
    suggestion: "Complete your education section (institution, degree, year).",
  },
];

// Total possible points = sum of all maxPoints = 80
// We scale to 100 at the end.
const MAX_RAW = RULES.reduce((s, r) => s + r.maxPoints, 0); // 80

// ── Hook ──────────────────────────────────────────────────────────────────────
export function useATSScore(resume) {
  return useMemo(() => {
    const results = RULES.map((rule) => ({
      ...rule,
      passed: rule.check(resume),
    }));

    const raw = results
      .filter((r) => r.passed)
      .reduce((s, r) => s + r.maxPoints, 0);

    // Scale 0–80 → 0–100, cap at 100
    const score = Math.min(100, Math.round((raw / MAX_RAW) * 100));

    // Up to 3 suggestions from failed rules (highest-value rules first)
    const suggestions = results
      .filter((r) => !r.passed)
      .sort((a, b) => b.maxPoints - a.maxPoints)
      .slice(0, 3)
      .map((r) => r.suggestion);

    // Per-rule breakdown for meter detail (optional future use)
    const breakdown = results.map(({ id, maxPoints, passed }) => ({
      id,
      maxPoints,
      earned: passed ? maxPoints : 0,
      passed,
    }));

    return { score, suggestions, breakdown };
  }, [resume]);
}
