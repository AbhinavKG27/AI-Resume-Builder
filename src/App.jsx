// App.jsx — Root of the application.
// Responsibilities:
//   1. Hold all shared state via useAppState()
//   2. Decide which page to render based on currentRoute
//   3. Render TopBar, StepRail, active page, and Toast

import { useAppState } from "./hooks/useAppState";
import { STEPS }       from "./data/steps";

import TopBar   from "./components/TopBar";
import StepRail from "./components/StepRail";
import Icon     from "./components/Icon";

import StepPage  from "./pages/StepPage";
import ProofPage from "./pages/ProofPage";

import "./styles/global.css";

export default function App() {
  const state = useAppState();

  const {
    currentRoute, nav, isStepUnlocked,
    artifacts, screenshots,
    feedback, setFeedback,
    proofLinks, setProofLinks,
    toast,
    doneCount, allDone,
    handleArtifact, handleScreenshot, copySubmission,
  } = state;

  // Resolve which step object matches the current route
  const isProof      = currentRoute === "/rb/proof";
  const currentStep  = STEPS.find(s => s.route === currentRoute);
  const hasArtifact  = currentStep
    ? !!artifacts[`rb_step_${currentStep.id}_artifact`]
    : false;

  // Top bar center label
  const topCenter = isProof
    ? "Project 3 — Proof of Work"
    : currentStep
      ? `Project 3 — Step ${currentStep.id} of 8`
      : "Project 3";

  return (
    <>
      {/* ── Fixed top bar ── */}
      <TopBar
        stepLabel={topCenter}
        isProof={isProof}
        isComplete={hasArtifact}
      />

      {/* ── Fixed left rail ── */}
      <StepRail
        currentRoute={currentRoute}
        artifacts={artifacts}
        isStepUnlocked={isStepUnlocked}
        nav={nav}
      />

      {/* ── Page content ── */}
      {isProof ? (
        <ProofPage
          artifacts={artifacts}
          proofLinks={proofLinks}
          setProofLinks={setProofLinks}
          copySubmission={copySubmission}
          doneCount={doneCount}
          allDone={allDone}
          nav={nav}
        />
      ) : currentStep ? (
        <StepPage
          step={currentStep}
          artifacts={artifacts}
          screenshots={screenshots}
          feedback={feedback}
          setFeedback={setFeedback}
          onArtifact={handleArtifact}
          onScreenshot={handleScreenshot}
          nav={nav}
        />
      ) : (
        // Fallback — unknown route, redirect home
        <div style={{ marginLeft: 64, marginTop: 52, padding: 40, color: "var(--muted)" }}>
          Route not found.{" "}
          <button
            className="btn btn-ghost"
            style={{ marginLeft: 12 }}
            onClick={() => nav("/rb/01-problem")}
          >
            Go to Step 1
          </button>
        </div>
      )}

      {/* ── Toast notifications ── */}
      {toast && (
        <div className="toast">
          <Icon name={toast.icon} size={14} />
          {toast.msg}
        </div>
      )}
    </>
  );
}