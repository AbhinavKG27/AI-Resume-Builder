// StepPage — rendered for routes /rb/01-problem through /rb/08-ship.
// Layout: ContextHeader on top, then a 70/30 split of workspace and BuildPanel.

import ContextHeader from "../components/ContextHeader";
import ArtifactUpload from "../components/ArtifactUpload";
import BuildPanel from "../components/BuildPanel";
import Icon from "../components/Icon";
import { STEPS, STEP_META } from "../data/steps";
import "./StepPage.css";

export default function StepPage({
  step,
  artifacts,
  screenshots,
  feedback,
  setFeedback,
  onArtifact,
  onScreenshot,
  nav,
}) {
  const meta        = STEP_META[step.id];
  const artifactKey = `rb_step_${step.id}_artifact`;
  const hasArtifact = !!artifacts[artifactKey];

  const goNext = () => {
    if (step.id < 8) nav(STEPS[step.id].route);  // STEPS is 0-indexed, step.id is 1-indexed
    else nav("/rb/proof");
  };
  const goPrev = () => {
    if (step.id > 1) nav(STEPS[step.id - 2].route);
  };

  return (
    <div className="main-layout">

      {/* ── LEFT: WORKSPACE (70%) ── */}
      <div className="workspace-col">
        <ContextHeader
          phase={step.phase}
          tag={step.tag}
          title={meta.title}
          context={meta.context}
        />

        <div className="workspace-body">

          {/* Artifact upload */}
          <ArtifactUpload
            stepId={step.id}
            artifact={artifacts[artifactKey]}
            onArtifact={onArtifact}
          />

          {/* Navigation */}
          <div className="workspace-card nav-card">
            <h3>Navigation</h3>
            <div className="nav-row">
              {step.id > 1 && (
                <button className="btn btn-ghost" onClick={goPrev}>
                  ← Prev
                </button>
              )}

              <button
                className="btn btn-primary"
                disabled={!hasArtifact}
                onClick={goNext}
                title={!hasArtifact ? "Upload an artifact to unlock the next step" : ""}
              >
                {!hasArtifact && <Icon name="lock" size={13} />}
                {step.id === 8 ? "View Proof →" : "Next Step →"}
              </button>

              {!hasArtifact && (
                <span className="nav-hint">Upload artifact to continue</span>
              )}
            </div>
          </div>

          {/* Mini progress tracker */}
          <div className="workspace-card">
            <h3>Build Track Progress</h3>
            <div className="progress-chips">
              {STEPS.map(s => {
                const done = !!artifacts[`rb_step_${s.id}_artifact`];
                const cur  = s.id === step.id;
                return (
                  <div
                    key={s.id}
                    className={`chip ${done ? "chip-done" : cur ? "chip-current" : ""}`}
                  >
                    {done ? "✓" : s.tag} {s.label}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* ── RIGHT: BUILD PANEL (30%) ── */}
      <BuildPanel
        step={step}
        prompt={meta.prompt}
        artifacts={artifacts}
        screenshots={screenshots}
        feedback={feedback}
        setFeedback={setFeedback}
        onScreenshot={onScreenshot}
      />

    </div>
  );
}
