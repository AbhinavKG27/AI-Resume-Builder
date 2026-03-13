// BuildPanel — 30% right panel on every step page.
// Contains: prompt textarea, copy button, Lovable link,
//           It Worked / Error feedback, screenshot uploader, progress strip.

import { useState } from "react";
import Icon from "./Icon";
import { STEPS } from "../data/steps";
import "./BuildPanel.css";

export default function BuildPanel({
  step,
  prompt,
  artifacts,
  screenshots,
  feedback,
  setFeedback,
  onScreenshot,
}) {
  const [copied, setCopied] = useState(false);
  const ssKey   = `rb_step_${step.id}_ss`;
  const hasSS   = !!screenshots[ssKey];
  const fbState = feedback[step.id] || null;

  const copyPrompt = () => {
    navigator.clipboard.writeText(prompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const setFb = (val) =>
    setFeedback(prev => ({ ...prev, [step.id]: val }));

  return (
    <aside className="build-panel">
      <div className="panel-header">
        <div className="panel-title">Build Panel</div>
        <div className="panel-subtitle">Copy This Into Lovable</div>
      </div>

      <div className="panel-body">
        {/* Prompt */}
        <div>
          <div className="panel-label">Prompt for Step {step.tag}</div>
          <div className="prompt-box">{prompt}</div>
        </div>

        {/* Copy button */}
        <button
          className={`btn-copy ${copied ? "copied" : ""}`}
          onClick={copyPrompt}
        >
          <Icon name={copied ? "check" : "copy"} size={13} />
          {copied ? "Copied!" : "Copy Prompt"}
        </button>

        {/* Open Lovable */}
        <a
          href="https://lovable.dev"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          <button className="btn-lovable">
            <Icon name="external" size={14} />
            Build in Lovable
          </button>
        </a>

        {/* Feedback */}
        <div>
          <div className="panel-label">Build Feedback</div>
          <div className="feedback-row">
            <button
              className={`fb-btn worked ${fbState === "worked" ? "active" : ""}`}
              onClick={() => setFb("worked")}
            >
              ✓ It Worked
            </button>
            <button
              className={`fb-btn error ${fbState === "error" ? "active" : ""}`}
              onClick={() => setFb("error")}
            >
              ✗ Error
            </button>
          </div>
        </div>

        {/* Screenshot */}
        <div>
          <div className="panel-label">Screenshot</div>
          <div className={`ss-upload ${hasSS ? "has-ss" : ""}`}>
            <input
              type="file"
              accept="image/*"
              onChange={e => onScreenshot(step.id, e.target.files[0])}
            />
            <Icon name={hasSS ? "check" : "image"} size={14} />
            <span>
              {hasSS ? screenshots[ssKey].name : "Add Screenshot"}
            </span>
          </div>
        </div>
      </div>

      {/* Progress strip at the bottom */}
      <div className="progress-strip">
        {STEPS.map(s => {
          const done = !!artifacts[`rb_step_${s.id}_artifact`];
          const cur  = s.id === step.id;
          return (
            <div
              key={s.id}
              className={`ps-dot ${done ? "done" : cur ? "current" : ""}`}
            />
          );
        })}
      </div>
    </aside>
  );
}
