// 📁 Location: src/pages/PreviewPage.jsx  ← MODIFIED
// Shows ATS score (full variant) above the resume paper.

import ResumePreview  from "../components/ResumePreview";
import DesignControls from "../components/DesignControls";
import ExportBar      from "../components/ExportBar";
import ATSScore       from "../components/ATSScore";
import { useATSScore } from "../hooks/useATSScore";
import "./PreviewPage.css";

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
          Use the controls below to switch templates and accent color
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

      {/* Resume + ATS score */}
      <div className="preview-body">
        <div className="preview-content">

          {/* ATS Score — full variant, live-updating */}
          <ATSScore
            score={score}
            suggestions={suggestions}
            breakdown={breakdown}
            variant="full"
          />

          {/* Resume paper */}
          <div className="preview-paper print-root">
            <ResumePreview resume={resume} template={template} />
          </div>

        </div>
      </div>

    </div>
  );
}
