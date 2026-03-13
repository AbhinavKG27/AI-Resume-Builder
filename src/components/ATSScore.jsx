// 📁 Location: src/components/ATSScore.jsx  ← NEW FILE

import "./ATSScore.css";

// Score tier labels and colors
function getTier(score) {
  if (score >= 80) return { label: "Strong",      cls: "tier-strong"  };
  if (score >= 55) return { label: "Good",         cls: "tier-good"    };
  if (score >= 30) return { label: "Needs Work",   cls: "tier-fair"    };
  return               { label: "Getting Started", cls: "tier-weak"    };
}

export default function ATSScore({ score, suggestions, breakdown }) {
  const tier = getTier(score);
  const circumference = 2 * Math.PI * 36; // r=36
  const dash = (score / 100) * circumference;

  return (
    <div className="ats-panel">

      {/* Header */}
      <div className="ats-header">
        <span className="ats-title">ATS Readiness Score</span>
        <span className={`ats-tier-badge ${tier.cls}`}>{tier.label}</span>
      </div>

      {/* Meter */}
      <div className="ats-meter-row">
        <div className="ats-ring-wrap">
          <svg className="ats-ring" viewBox="0 0 80 80">
            {/* Track */}
            <circle
              cx="40" cy="40" r="36"
              fill="none"
              stroke="var(--border)"
              strokeWidth="6"
            />
            {/* Fill */}
            <circle
              cx="40" cy="40" r="36"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={`${dash} ${circumference}`}
              strokeDashoffset={circumference * 0.25}
              className="ats-ring-fill"
              style={{
                stroke: score >= 80 ? "#16a34a"
                      : score >= 55 ? "#b45309"
                      : "var(--accent)",
              }}
            />
            <text
              x="40" y="44"
              textAnchor="middle"
              className="ats-ring-label"
              fill="var(--text)"
            >
              {score}
            </text>
          </svg>
        </div>

        {/* Breakdown bars */}
        <div className="ats-breakdown">
          {breakdown.map((b) => (
            <div key={b.id} className="ats-bar-row">
              <div className={`ats-bar-dot ${b.passed ? "passed" : ""}`} />
              <div className="ats-bar-track">
                <div
                  className={`ats-bar-fill ${b.passed ? "passed" : ""}`}
                  style={{ width: b.passed ? "100%" : "0%" }}
                />
              </div>
              <span className="ats-bar-pts">
                {b.passed ? `+${b.earned}` : `+0`}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
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
        <div className="ats-perfect">
          ✓ Your resume is fully optimised for ATS.
        </div>
      )}

    </div>
  );
}
