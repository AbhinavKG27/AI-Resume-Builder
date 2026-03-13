// ContextHeader — top section of the workspace column.
// Shows the phase tag, step title, and guiding description.

import "./ContextHeader.css";

export default function ContextHeader({ phase, tag, title, context }) {
  return (
    <div className="context-header">
      <div className="context-phase">{phase} · STEP {tag}</div>
      <div className="context-title">{title}</div>
      <div className="context-desc">{context}</div>
    </div>
  );
}
