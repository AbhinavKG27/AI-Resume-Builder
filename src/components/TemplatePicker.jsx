// 📁 Location: src/components/TemplatePicker.jsx  ← NEW FILE
// Three-tab template switcher. Used in both /builder and /preview.
// Switching templates changes ONLY visual styling — content/score untouched.

import { TEMPLATES } from "../data/templates";
import "./TemplatePicker.css";

export default function TemplatePicker({ template, setTemplate }) {
  return (
    <div className="template-picker">
      <span className="template-picker-label">Template</span>
      <div className="template-tabs">
        {TEMPLATES.map(t => (
          <button
            key={t.id}
            className={`template-tab ${template === t.id ? "active" : ""}`}
            onClick={() => setTemplate(t.id)}
            title={t.description}
          >
            <span className="template-tab-preview" data-id={t.id}>
              <TemplateThumb id={t.id} active={template === t.id} />
            </span>
            <span className="template-tab-name">{t.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// Tiny inline SVG thumbnail for each template
function TemplateThumb({ id, active }) {
  const stroke = active ? "#8B0000" : "#ccc";
  const thick  = active ? "#333"    : "#ddd";

  if (id === "classic") return (
    <svg viewBox="0 0 36 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="34" height="42" rx="1" fill="white" stroke="#e8e8e8" strokeWidth="1"/>
      {/* Name line — thick serif */}
      <rect x="5" y="5" width="18" height="3" rx="0.5" fill={thick}/>
      {/* Contact */}
      <rect x="5" y="10" width="8" height="1.5" rx="0.5" fill="#ddd"/>
      <rect x="15" y="10" width="8" height="1.5" rx="0.5" fill="#ddd"/>
      {/* Divider */}
      <rect x="5" y="14" width="26" height="1.5" rx="0" fill={thick}/>
      {/* Section */}
      <rect x="5" y="18" width="10" height="1.5" rx="0.5" fill={stroke}/>
      <rect x="5" y="21" width="26" height="1" rx="0.5" fill="#eee"/>
      <rect x="5" y="24" width="22" height="1" rx="0.5" fill="#eee"/>
      <rect x="5" y="29" width="10" height="1.5" rx="0.5" fill={stroke}/>
      <rect x="5" y="32" width="26" height="1" rx="0.5" fill="#eee"/>
      <rect x="5" y="35" width="20" height="1" rx="0.5" fill="#eee"/>
    </svg>
  );

  if (id === "modern") return (
    <svg viewBox="0 0 36 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="34" height="42" rx="1" fill="white" stroke="#e8e8e8" strokeWidth="1"/>
      {/* Left accent bar */}
      <rect x="1" y="1" width="3" height="42" rx="0" fill={thick}/>
      {/* Name */}
      <rect x="7" y="5" width="16" height="2.5" rx="0.5" fill={thick}/>
      {/* Contact */}
      <rect x="7" y="10" width="8" height="1.5" rx="0.5" fill="#ddd"/>
      {/* Divider */}
      <rect x="7" y="14" width="24" height="0.75" rx="0" fill="#eee"/>
      {/* Section with left bar */}
      <rect x="7" y="18" width="2.5" height="8" rx="0" fill={thick}/>
      <rect x="11" y="18" width="9" height="1.5" rx="0.5" fill={stroke}/>
      <rect x="11" y="22" width="20" height="1" rx="0.5" fill="#eee"/>
      <rect x="11" y="25" width="16" height="1" rx="0.5" fill="#eee"/>
      <rect x="7" y="30" width="2.5" height="8" rx="0" fill={thick}/>
      <rect x="11" y="30" width="9" height="1.5" rx="0.5" fill={stroke}/>
      <rect x="11" y="34" width="20" height="1" rx="0.5" fill="#eee"/>
    </svg>
  );

  if (id === "minimal") return (
    <svg viewBox="0 0 36 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="34" height="42" rx="1" fill="white" stroke="#e8e8e8" strokeWidth="1"/>
      {/* Name — spaced caps */}
      <rect x="5" y="6" width="14" height="2" rx="0.5" fill={thick}/>
      {/* Contact */}
      <rect x="5" y="11" width="6" height="1" rx="0.5" fill="#ddd"/>
      <rect x="13" y="11" width="6" height="1" rx="0.5" fill="#ddd"/>
      {/* Thin divider */}
      <rect x="5" y="15" width="26" height="0.5" rx="0" fill="#ddd"/>
      {/* Section — no border */}
      <rect x="5" y="19" width="8" height="1" rx="0.5" fill="#bbb"/>
      <rect x="5" y="22.5" width="26" height="1" rx="0.5" fill="#eee"/>
      <rect x="5" y="25.5" width="20" height="1" rx="0.5" fill="#eee"/>
      <rect x="5" y="31" width="8" height="1" rx="0.5" fill="#bbb"/>
      <rect x="5" y="34.5" width="26" height="1" rx="0.5" fill="#eee"/>
      <rect x="5" y="37.5" width="16" height="1" rx="0.5" fill="#eee"/>
    </svg>
  );

  return null;
}
