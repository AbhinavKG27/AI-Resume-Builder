// 📁 Location: src/pages/PreviewPage.jsx  ← FIXED
// PRINT FIX: Uses ReactDOM.createPortal to render .print-portal directly on
// document.body, so @media print can isolate it without hiding ancestor chain.

import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import ResumePreview  from "../components/ResumePreview";
import DesignControls from "../components/DesignControls";
import ExportBar      from "../components/ExportBar";
import ATSScore       from "../components/ATSScore";
import { useATSScore } from "../hooks/useATSScore";
import "./PreviewPage.css";

// PrintPortal: renders resume into a <div class="print-portal"> on document.body
// This means @media print can hide `body > *:not(.print-portal)` cleanly.
function PrintPortal({ resume, template }) {
  const elRef = useRef(null);

  if (!elRef.current) {
    const div = document.createElement("div");
    div.className = "print-portal";
    document.body.appendChild(div);
    elRef.current = div;
  }

  useEffect(() => {
    return () => {
      if (elRef.current && document.body.contains(elRef.current)) {
        document.body.removeChild(elRef.current);
      }
    };
  }, []);

  return ReactDOM.createPortal(
    <ResumePreview resume={resume} template={template} />,
    elRef.current
  );
}

export default function PreviewPage({ resume, template, setTemplate, themeId, setTheme, nav }) {
  const { score, suggestions, breakdown } = useATSScore(resume);

  return (
    <div className="preview-page">

      {/* Toolbar */}
      <div className="preview-toolbar">
        <button className="btn btn-ghost btn-sm" onClick={() => nav("/builder")}>
          ← Back to Builder
        </button>
        <span className="preview-toolbar-hint">
          Switch templates and accent color below
        </span>
      </div>

      {/* Design controls */}
      <DesignControls
        template={template}
        setTemplate={setTemplate}
        themeId={themeId}
        setTheme={setTheme}
      />

      {/* Export bar */}
      <ExportBar resume={resume} />

      {/* Visible resume + ATS */}
      <div className="preview-body">
        <div className="preview-content">

          {/* ATS Score panel */}
          <ATSScore
            score={score}
            suggestions={suggestions}
            breakdown={breakdown}
            variant="full"
          />

          {/* Visual resume (not used for print — PrintPortal is) */}
          <div className="preview-paper">
            <ResumePreview resume={resume} template={template} />
          </div>

        </div>
      </div>

      {/* Print portal — lives on document.body, hidden from UI, shown on print */}
      <PrintPortal resume={resume} template={template} />

    </div>
  );
}
