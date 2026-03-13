// 📁 Location: src/components/ATSScore.jsx  ← MODIFIED (replace entire file)
// Added: "Top 3 Improvements" panel below score meter

import "./ATSScore.css";

function getTier(score) {
  if (score >= 80) return { label: "Strong",        cls: "tier-strong" };
  if (score >= 55) return { label: "Good",           cls: "tier-good"   };
  if (score >= 30) return { label: "Needs Work",     cls: "tier-fair"   };
  return               { label: "Getting Started",  cls: "tier-weak"   };
}

// Build top 3 improvement suggestions from resume state directly
function getImprovements(resume) {
  const items = [];

  const wordCount = (s) => s?.trim().split(/\s+/).filter(Boolean).length ?? 0;
  const hasNumber = (s) => /(\d+\s*%|\d+\s*x|\d+k|\d+\+|\d{2,})/i.test(s ?? "");

  if ((resume?.experience?.length ?? 0) === 0) {
    items.push("Add at least one work experience or internship entry.");
  }

  if ((resume?.projects?.length ?? 0) < 2) {
    items.push("Add at least 2 projects to demonstrate initiative.");
  }

  if (wordCount(resume?.summary) < 40) {
    items.push("Expand your summary to 40–120 words for best ATS results.");
  }

  const skillCount = resume?.skills?.split(",").map(s => s.trim()).filter(Boolean).length ?? 0;
  if (skillCount < 8) {
    items.push(`Add more skills — you have ${skillCount}, target is 8+.`);
  }

  const bullets = [
    ...(resume?.experience ?? []).map(e => e.description),
    ...(resume?.projects   ?? []).map(p => p.description),
  ];
  const hasImpact = bullets.some(b => hasNumber(b));
  if (!hasImpact) {
    items.push("Add measurable impact (%, numbers, results) to your bullets.");
  }

  if (!resume?.links?.github?.trim() && !resume?.links?.linkedin?.trim()) {
    items.push("Add your GitHub or LinkedIn link.");
  }

  // Return top 3 only
  return items.slice(0, 3);
}

export default function ATSScore({ score, suggestions, breakdown, resume }) {
  const tier = getTier(score);
  const circumference = 2 * Math.PI * 36;
  const dash = (score / 100) * circumference;
  const ringColor = score >= 80 ? "#16a34a" : score >= 55 ? "#b45309" : "var(--accent)";
  const improvements = getImprovements(resume);

  return (
    <div className="ats-panel">

      {/* ── Header ── */}
      <div className="ats-header">
        <span className="ats-title">ATS Readiness Score</span>
        <span className={`ats-tier-badge ${tier.cls}`}>{tier.label}</span>
      </div>

      {/* ── Ring + breakdown ── */}
      <div className="ats-meter-row">
        <div className="ats-ring-wrap">
          <svg className="ats-ring" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="36" fill="none" stroke="var(--border)" strokeWidth="6"/>
            <circle
              cx="40" cy="40" r="36"
              fill="none"
              stroke={ringColor}
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={`${dash} ${circumference}`}
              strokeDashoffset={circumference * 0.25}
              className="ats-ring-fill"
              style={{ stroke: ringColor }}
            />
            <text x="40" y="44" textAnchor="middle" className="ats-ring-label" fill="var(--text)">
              {score}
            </text>
          </svg>
        </div>

        <div className="ats-breakdown">
          {breakdown.map((b) => (
            <div key={b.id} className="ats-bar-row">
              <div className={`ats-bar-dot ${b.passed ? "passed" : ""}`} />
              <div className="ats-bar-track">
                <div className={`ats-bar-fill ${b.passed ? "passed" : ""}`}
                  style={{ width: b.passed ? "100%" : "0%" }} />
              </div>
              <span className="ats-bar-pts">{b.passed ? `+${b.earned}` : "+0"}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Top 3 Improvements ── */}
      {improvements.length > 0 && (
        <div className="ats-improvements">
          <div className="ats-improvements-label">Top 3 Improvements</div>
          {improvements.map((item, i) => (
            <div key={i} className="ats-improvement-row">
              <span className="ats-improvement-num">{i + 1}</span>
              <span className="ats-improvement-text">{item}</span>
            </div>
          ))}
        </div>
      )}

      {/* ── Legacy suggestions (hidden if improvements shown) ── */}
      {improvements.length === 0 && suggestions.length > 0 && (
        <div className="ats-suggestions">
          <div className="ats-suggestions-label">Improve your score</div>
          {suggestions.map((s, i) => (
            <div key={i} className="ats-suggestion-row">
              <span className="ats-suggestion-icon">→</span>
              <span className="ats-suggestion-text">{s}</span>
            </div>
          ))}
        </div>
      )}

      {score === 100 && (
        <div className="ats-perfect">✓ Your resume is fully optimised for ATS.</div>
      )}

    </div>
  );
}
