import ResumePreview from "../components/ResumePreview";
import "./PreviewPage.css";

export default function PreviewPage({ resume, nav }) {
  return (
    <div className="preview-page">

      {/* Toolbar */}
      <div className="preview-toolbar">
        <button className="btn btn-ghost btn-sm" onClick={() => nav("/builder")}>
          ← Back to Builder
        </button>
        <span className="label">Preview — Clean Layout</span>
        <div className="preview-toolbar-right">
          <span className="export-badge">Export coming soon</span>
        </div>
      </div>

      {/* Resume */}
      <div className="preview-body">
        <div className="preview-paper">
          <ResumePreview resume={resume} />
        </div>
      </div>

    </div>
  );
}
