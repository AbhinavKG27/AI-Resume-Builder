import { useRef } from "react";
import ResumePreview from "../components/ResumePreview";
import DesignControls from "../components/DesignControls";
import ExportBar from "../components/ExportBar";
import ATSScore from "../components/ATSScore";
import { useATSScore } from "../hooks/useATSScore";
import "./PreviewPage.css";

export default function PreviewPage({ resume, template, setTemplate, themeId, setTheme, nav }) {
  const { score, suggestions, breakdown } = useATSScore(resume);
  const previewRef = useRef(null);

  return (
    <div className="preview-page">
      <div className="preview-toolbar">
        <button className="btn btn-ghost btn-sm" onClick={() => nav("/builder")}>
          ← Back to Builder
        </button>
        <span className="preview-toolbar-hint">
          Switch templates and accent color below
        </span>
      </div>

      <DesignControls
        template={template}
        setTemplate={setTemplate}
        themeId={themeId}
        setTheme={setTheme}
      />

      <ExportBar resume={resume} previewRef={previewRef} />

      <div className="preview-body">
        <div className="preview-content">
          <ATSScore
            score={score}
            suggestions={suggestions}
            breakdown={breakdown}
            variant="full"
          />

          <div className="preview-paper" ref={previewRef}>
            <ResumePreview resume={resume} template={template} />
          </div>
        </div>
      </div>
    </div>
  );
}