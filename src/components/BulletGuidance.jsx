// 📁 Location: src/components/BulletGuidance.jsx  ← NEW FILE
// Inline guidance shown below Experience and Project description fields.
// Does NOT block input. Only shows contextual suggestions.

import "./BulletGuidance.css";

// Common strong action verbs to check for at start of text
const ACTION_VERBS = [
  "built", "developed", "designed", "implemented", "led", "improved",
  "created", "optimized", "automated", "managed", "launched", "deployed",
  "architected", "migrated", "reduced", "increased", "delivered", "owned",
  "scaled", "integrated", "refactored", "wrote", "shipped", "drove",
  "mentored", "collaborated", "established", "streamlined", "maintained",
];

// Check if text starts with a strong action verb (case-insensitive)
function startsWithActionVerb(text) {
  if (!text?.trim()) return true; // empty — no hint yet
  const firstWord = text.trim().split(/\s+/)[0].toLowerCase().replace(/[^a-z]/g, "");
  return ACTION_VERBS.includes(firstWord);
}

// Check if text contains a measurable indicator
function hasMeasurableImpact(text) {
  if (!text?.trim()) return true; // empty — no hint yet
  return /(\d+\s*%|\d+\s*x|\d+k|\d+\+|\d{2,})/i.test(text);
}

export default function BulletGuidance({ text }) {
  if (!text?.trim()) return null;

  const needsVerb   = !startsWithActionVerb(text);
  const needsNumber = !hasMeasurableImpact(text);

  if (!needsVerb && !needsNumber) return null;

  return (
    <div className="bullet-guidance">
      {needsVerb && (
        <div className="bg-hint">
          <span className="bg-icon">↑</span>
          <span>Start with a strong action verb — e.g. <em>Built, Led, Improved, Reduced</em></span>
        </div>
      )}
      {needsNumber && (
        <div className="bg-hint">
          <span className="bg-icon">↑</span>
          <span>Add measurable impact — e.g. <em>"reduced load time by 40%"</em></span>
        </div>
      )}
    </div>
  );
}

// Export helpers for testing / use in other components
export { startsWithActionVerb, hasMeasurableImpact };
