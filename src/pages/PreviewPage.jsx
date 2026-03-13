// 📁 Location: src/pages/PreviewPage.jsx  ← MODIFIED (replace entire file)
// Changes:
//   - ExportBar added (Print/PDF + Copy as Text + validation warning)
//   - .print-root class added to resume wrapper so print CSS can isolate it
//   - export-badge placeholder replaced by real ExportBar

import ResumePreview from "../components/ResumePreview";
import TemplatePicker from "../components/TemplatePicker";
import ExportBar from "../components/ExportBar";
import "./PreviewPage.css";

export default function PreviewPage({ resume, template, setTemplate, nav }) {
  return (
    <div className="preview-page">

      {/* ── Toolbar: back + template picker ── */}
      <div className="preview-toolbar">
        <button className="btn btn-ghost btn-sm" onClick={() => nav("/builder")}>
          ← Back to Builder
        </button>
        <TemplatePicker template={template} setTemplate={setTemplate} />
        {/* spacer */}
        <div style={{ flex: 1 }} />
      </div>

      {/* ── Export bar: print + copy as text ── */}
      <ExportBar resume={resume} />

      {/* ── Resume document ── */}
      {/* .print-root is the anchor used by @media print to isolate this element */}
      <div className="preview-body">
        <div className="preview-paper print-root">
          <ResumePreview resume={resume} template={template} />
        </div>
      </div>

    </div>
  );
}
