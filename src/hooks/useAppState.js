import { useState, useEffect, useCallback } from "react";
import { storage } from "../data/storage";
import { STEPS } from "../data/steps";

export function useAppState() {
  const [currentRoute, setCurrentRoute] = useState("/rb/01-problem");
  const [artifacts,    setArtifacts]    = useState(() => storage.get("rb_artifacts")    || {});
  const [screenshots,  setScreenshots]  = useState(() => storage.get("rb_screenshots")  || {});
  const [feedback,     setFeedback]     = useState(() => storage.get("rb_feedback")     || {});
  const [proofLinks,   setProofLinks]   = useState(() => storage.get("rb_proof_links")  || { lovable: "", github: "", deploy: "" });
  const [toast,        setToast]        = useState(null);

  useEffect(() => { storage.set("rb_artifacts",   artifacts);   }, [artifacts]);
  useEffect(() => { storage.set("rb_screenshots", screenshots); }, [screenshots]);
  useEffect(() => { storage.set("rb_feedback",    feedback);    }, [feedback]);
  useEffect(() => { storage.set("rb_proof_links", proofLinks);  }, [proofLinks]);

  const showToast = useCallback((msg, icon = "check") => {
    setToast({ msg, icon });
    setTimeout(() => setToast(null), 2500);
  }, []);

  const nav = useCallback((route) => {
    setCurrentRoute(route);
    window.scrollTo(0, 0);
  }, []);

  const isStepUnlocked = useCallback((stepId) => {
    if (stepId === 1) return true;
    return !!artifacts[`rb_step_${stepId - 1}_artifact`];
  }, [artifacts]);

  const doneCount = STEPS.filter(s => !!artifacts[`rb_step_${s.id}_artifact`]).length;
  const allDone   = doneCount === STEPS.length;

  const handleArtifact = useCallback((stepId, file) => {
    if (!file) return;
    const key = `rb_step_${stepId}_artifact`;
    setArtifacts(prev => ({ ...prev, [key]: { name: file.name, size: file.size, ts: Date.now() } }));
    showToast(`Artifact saved for Step ${stepId}`);
  }, [showToast]);

  const handleScreenshot = useCallback((stepId, file) => {
    if (!file) return;
    const key = `rb_step_${stepId}_ss`;
    setScreenshots(prev => ({ ...prev, [key]: { name: file.name, ts: Date.now() } }));
    showToast("Screenshot attached");
  }, [showToast]);

  const copySubmission = useCallback(() => {
    const lines = [
      "=== KodNest Premium — AI Resume Builder Submission ===",
      "Project: AI Resume Builder (Project 3)",
      `Completed: ${doneCount}/8 steps`,
      "",
      ...STEPS.map(s => {
        const a = artifacts[`rb_step_${s.id}_artifact`];
        return `Step ${s.tag} ${s.label}: ${a ? `✓ ${a.name}` : "⏳ Pending"}`;
      }),
      "",
      `Lovable URL: ${proofLinks.lovable || "—"}`,
      `GitHub URL:  ${proofLinks.github  || "—"}`,
      `Deploy URL:  ${proofLinks.deploy  || "—"}`,
    ];
    navigator.clipboard.writeText(lines.join("\n")).then(() => showToast("Submission copied!"));
  }, [artifacts, doneCount, proofLinks, showToast]);

  return {
    currentRoute, nav, isStepUnlocked,
    artifacts, screenshots,
    feedback, setFeedback,
    proofLinks, setProofLinks,
    toast,
    doneCount, allDone,
    handleArtifact, handleScreenshot, copySubmission, showToast,
  };
}
