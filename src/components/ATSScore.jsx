// 📁 Location: src/components/ATSScore.jsx  ← REPLACED
// variant="compact" → builder sidebar (smaller ring, top 3 suggestions)
// variant="full"    → /preview page (larger ring, all suggestions)

import { getScoreTier } from "../hooks/useATSScore";
import "./ATSScore.css";

export default function ATSScore({ score, suggestions, breakdown, variant = "compact" }) {
  const tier   = getScoreTier(score);
  const isFull = variant === "full";

  // Ring geometry
  const R    = isFull ? 52 : 34;
  const SW   = isFull ? 8  : 6;
  const SIZE = R * 2 + SW * 2 + 4;
  const C    = SIZE / 2;
  const circ = 2 * Math.PI * R;
  const dash = (score / 100) * circ;

  return (
    <div className={`ats-panel ats-variant-${variant}`}>

      {/* Header */}
      <div className="ats-header">
        <span className="ats-title">ATS Score</span>
        <span className={`ats-badge ${tier.cls}`}>{tier.label}</span>
      </div>

      {/* Ring + bars */}
      <div className="ats-body">
        {/* Circular progress */}
        <div className="ats-ring-wrap">
          <svg viewBox={`0 0 ${SIZE} ${SIZE}`} width={SIZE} height={SIZE} style={{ display:"block", transform:"rotate(-90deg)" }}>
            <circle cx={C} cy={C} r={R} fill="none" stroke="var(--border)" strokeWidth={SW} />
            <circle
              cx={C} cy={C} r={R}
              fill="none"
              stroke={tier.color}
              strokeWidth={SW}
              strokeLinecap="round"
              strokeDasharray={`${dash} ${circ}`}
              strokeDashoffset={0}
              className="ats-ring-progress"
            />
          </svg>
          {/* Centered text overlay */}
          <div className="ats-ring-center">
            <span className="ats-score-num" style={{ color: tier.color }}>{score}</span>
            <span className="ats-score-denom">/100</span>
          </div>
        </div>

        {/* Rule breakdown bars */}
        <div className="ats-bars">
          {breakdown.map(b => (
            <div key={b.id} className="ats-bar-row" title={b.label}>
              <span
                className="ats-bar-dot"
                style={{ background: b.passed ? tier.color : "var(--border-2)" }}
              />
              <div className="ats-bar-track">
                <div
                  className="ats-bar-fill"
                  style={{
                    width:      b.passed ? "100%" : "0%",
                    background: b.passed ? tier.color : "var(--border-2)",
                  }}
                />
              </div>
              <span className="ats-bar-pts" style={{ color: b.passed ? tier.color : "var(--text-3)" }}>
                {b.passed ? `+${b.points}` : `+0`}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="ats-suggestions">
          <p className="ats-suggestions-title">
            {isFull ? "How to improve your score" : "Top improvements"}
          </p>
          {(isFull ? suggestions : suggestions.slice(0, 3)).map((s, i) => (
            <div key={s.id} className="ats-suggestion">
              <span className="ats-suggestion-num">{i + 1}</span>
              <span className="ats-suggestion-text">{s.text}</span>
            </div>
          ))}
        </div>
      )}

      {score >= 100 && (
        <div className="ats-perfect">✓ Resume fully optimised for ATS</div>
      )}
    </div>
  );
}
