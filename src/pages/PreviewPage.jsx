// 📁 Location: src/pages/PreviewPage.jsx  ← MODIFIED

import ResumePreview  from "../components/ResumePreview";
import DesignControls from "../components/DesignControls";
import ExportBar      from "../components/ExportBar";
import "./PreviewPage.css";

export default function PreviewPage({ resume, template, setTemplate, themeId, setTheme, nav }) {
  return (
    <div className="preview-page">

      {/* Toolbar */}
      <div className="preview-toolbar">
        <button className="btn btn-ghost btn-sm" onClick={() => nav("/builder")}>
          ← Back to Builder
        </button>
      </div>

      {/* Design controls: template thumbnails + color picker */}
      <DesignControls
        template={template}
        setTemplate={setTemplate}
        themeId={themeId}
        setTheme={setTheme}
      />

      {/* Export bar */}
      <ExportBar resume={resume} />

      {/* Resume paper */}
      <div className="preview-body">
        <div className="preview-paper print-root">
          <ResumePreview resume={resume} template={template} />
        </div>
      </div>

    </div>
  );
}
