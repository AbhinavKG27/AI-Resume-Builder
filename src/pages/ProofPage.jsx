// ProofPage — /rb/proof
// Shows: 8-step completion status, links form, copy submission button.

import Icon from "../components/Icon";
import { STEPS } from "../data/steps";
import "./ProofPage.css";

export default function ProofPage({
  artifacts,
  proofLinks,
  setProofLinks,
  copySubmission,
  doneCount,
  nav,
}) {
  const pct = Math.round((doneCount / 8) * 100);

  const goToNextIncomplete = () => {
    const next = STEPS.find(s => !artifacts[`rb_step_${s.id}_artifact`]);
    if (next) nav(next.route);
  };

  return (
    <div className="proof-page">

      {/* Hero */}
      <div className="proof-hero">
        <div className="proof-badge">
          <Icon name="trophy" size={12} /> PROOF OF WORK
        </div>
        <div className="proof-title">
          AI Resume Builder<br />Build Track
        </div>
        <div className="proof-sub">
          Project 3 · KodNest Premium · {doneCount}/8 steps complete
        </div>
      </div>

      {/* Body grid */}
      <div className="proof-body">

        {/* Step status */}
        <div className="proof-card">
          <h3>Step Completion</h3>
          <div className="step-grid">
            {STEPS.map(s => {
              const done = !!artifacts[`rb_step_${s.id}_artifact`];
              const a    = artifacts[`rb_step_${s.id}_artifact`];
              return (
                <div key={s.id} className={`step-row ${done ? "done" : "pending"}`}>
                  <div className={`step-dot ${done ? "done" : "pending"}`}>
                    {done ? <Icon name="check" size={12} /> : s.tag}
                  </div>
                  <div className="step-row-info">
                    <div className="step-row-label">{s.label}</div>
                    {done && (
                      <div className="step-row-file">{a.name}</div>
                    )}
                  </div>
                  <div className="step-row-status">
                    {done ? "✓ DONE" : "PENDING"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right column: completion + links */}
        <div className="proof-right-col">

          {/* Completion % */}
          <div className="proof-card">
            <h3>Completion</h3>
            <span className="completion-pct">{pct}%</span>
            <div className="completion-label">
              {doneCount} of 8 steps with artifacts uploaded
            </div>
            <div className="completion-bar-track">
              <div
                className="completion-bar-fill"
                style={{
                  width: `${pct}%`,
                  background: pct === 100 ? "var(--success)" : "var(--accent)",
                }}
              />
            </div>
            {doneCount < 8 && (
              <button
                className="btn btn-ghost continue-btn"
                onClick={goToNextIncomplete}
              >
                <Icon name="arrow" size={13} />
                Continue Building
              </button>
            )}
          </div>

          {/* Submission links */}
          <div className="proof-card">
            <h3>Submission Links</h3>
            <div className="link-input-group">

              <div className="link-input-row">
                <label><Icon name="external" size={10} /> LOVABLE URL</label>
                <input
                  type="url"
                  placeholder="https://lovable.dev/projects/..."
                  value={proofLinks.lovable}
                  onChange={e => setProofLinks(l => ({ ...l, lovable: e.target.value }))}
                />
              </div>

              <div className="link-input-row">
                <label><Icon name="github" size={10} /> GITHUB URL</label>
                <input
                  type="url"
                  placeholder="https://github.com/username/..."
                  value={proofLinks.github}
                  onChange={e => setProofLinks(l => ({ ...l, github: e.target.value }))}
                />
              </div>

              <div className="link-input-row">
                <label><Icon name="globe" size={10} /> DEPLOY URL</label>
                <input
                  type="url"
                  placeholder="https://your-app.vercel.app"
                  value={proofLinks.deploy}
                  onChange={e => setProofLinks(l => ({ ...l, deploy: e.target.value }))}
                />
              </div>

            </div>
          </div>

        </div>

        {/* Full-width submit button */}
        <div className="proof-submit-row">
          <button className="btn-submit" onClick={copySubmission}>
            <Icon name="copy" size={16} />
            Copy Final Submission
          </button>
        </div>

      </div>
    </div>
  );
}
