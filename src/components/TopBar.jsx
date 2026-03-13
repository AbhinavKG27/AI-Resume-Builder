// TopBar — fixed header across all pages.
// Shows: project name (left) | step indicator (center) | status badge (right)

import "./TopBar.css";

export default function TopBar({ stepLabel, isProof, isComplete }) {
  const badge = isProof
    ? { cls: "proof",    text: "PROOF"       }
    : isComplete
      ? { cls: "complete", text: "COMPLETE"  }
      : { cls: "active",   text: "IN PROGRESS" };

  return (
    <header className="topbar">
      <div className="topbar-left">
        <span className="topbar-logo">KODNEST</span>
        <span className="topbar-project">AI RESUME BUILDER</span>
      </div>

      <div className="topbar-center">{stepLabel}</div>

      <div className="topbar-right">
        <span className={`status-badge ${badge.cls}`}>{badge.text}</span>
      </div>
    </header>
  );
}
