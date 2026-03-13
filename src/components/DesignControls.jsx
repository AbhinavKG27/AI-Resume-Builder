// 📁 Location: src/components/DesignControls.jsx  ← NEW FILE
// Unified design panel: 3 template thumbnail cards + 5 color theme circles.
// Replaces the old TemplatePicker strip.
// Active template: blue border + checkmark badge.
// Active color: white ring + check.

import { TEMPLATES } from "../data/templates";
import { THEMES }    from "../data/themes";
import "./DesignControls.css";

export default function DesignControls({ template, setTemplate, themeId, setTheme }) {
  return (
    <div className="design-controls">

      {/* ── Template row ── */}
      <div className="dc-row">
        <span className="dc-label">Template</span>
        <div className="dc-templates">
          {TEMPLATES.map(t => (
            <button
              key={t.id}
              className={`dc-template-card ${template === t.id ? "active" : ""}`}
              onClick={() => setTemplate(t.id)}
              title={t.description}
            >
              {template === t.id && (
                <span className="dc-check">✓</span>
              )}
              <div className="dc-thumb">
                <TemplateThumb id={t.id} active={template === t.id} themeId={themeId} />
              </div>
              <span className="dc-template-name">{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Color row ── */}
      <div className="dc-row dc-row-color">
        <span className="dc-label">Accent Color</span>
        <div className="dc-colors">
          {THEMES.map(th => (
            <button
              key={th.id}
              className={`dc-color-circle ${themeId === th.id ? "active" : ""}`}
              style={{ background: th.color }}
              onClick={() => setTheme(th.id)}
              title={th.label}
              aria-label={th.label}
            >
              {themeId === th.id && (
                <span className="dc-color-check">✓</span>
              )}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}

// ── Template thumbnails — 120px wide, show layout sketch ─────────────────────
// Accent color from current theme is reflected in the thumbnails.
function TemplateThumb({ id, active, themeId }) {
  const theme  = THEMES.find(t => t.id === themeId) ?? THEMES[0];
  const accent = theme.color;
  const dark   = `hsl(${theme.css.h}, ${theme.css.s}, 20%)`;

  if (id === "classic") return (
    <svg viewBox="0 0 80 104" fill="none" xmlns="http://www.w3.org/2000/svg" className="dc-thumb-svg">
      <rect width="80" height="104" fill="white"/>
      {/* Name */}
      <rect x="8" y="8"  width="40" height="5"   rx="1" fill={dark}/>
      <rect x="8" y="15" width="26" height="2.5" rx="1" fill="#ddd"/>
      {/* Divider */}
      <rect x="8" y="21" width="64" height="2"   rx="0" fill={dark}/>
      {/* Summary section */}
      <rect x="8" y="27" width="20" height="2.5" rx="1" fill={accent}/>
      <rect x="8" y="31" width="64" height="1.5" rx="1" fill="#e8e8e8"/>
      <rect x="8" y="34" width="56" height="1.5" rx="1" fill="#e8e8e8"/>
      <rect x="8" y="37" width="48" height="1.5" rx="1" fill="#e8e8e8"/>
      {/* Experience section */}
      <rect x="8" y="43" width="24" height="2.5" rx="1" fill={accent}/>
      <rect x="8" y="47" width="40" height="2"   rx="1" fill="#ccc"/>
      <rect x="8" y="51" width="64" height="1.5" rx="1" fill="#e8e8e8"/>
      <rect x="8" y="54" width="52" height="1.5" rx="1" fill="#e8e8e8"/>
      <rect x="8" y="60" width="36" height="2"   rx="1" fill="#ccc"/>
      <rect x="8" y="64" width="64" height="1.5" rx="1" fill="#e8e8e8"/>
      <rect x="8" y="67" width="44" height="1.5" rx="1" fill="#e8e8e8"/>
      {/* Skills section */}
      <rect x="8" y="73" width="16" height="2.5" rx="1" fill={accent}/>
      {[0,1,2,3].map(i => (
        <rect key={i} x={8 + i*17} y="78" width="14" height="8" rx="3" fill="#f0f0f0" stroke="#ddd" strokeWidth="0.5"/>
      ))}
    </svg>
  );

  if (id === "modern") return (
    <svg viewBox="0 0 80 104" fill="none" xmlns="http://www.w3.org/2000/svg" className="dc-thumb-svg">
      <rect width="80" height="104" fill="white"/>
      {/* Left sidebar */}
      <rect x="0" y="0" width="26" height="104" fill={accent} opacity="0.9"/>
      {/* Sidebar: name placeholder (white) */}
      <rect x="3" y="8"  width="20" height="3.5" rx="1" fill="white" opacity="0.9"/>
      <rect x="3" y="13" width="14" height="2"   rx="1" fill="white" opacity="0.5"/>
      {/* Sidebar divider */}
      <rect x="3" y="18" width="20" height="0.75" rx="0" fill="white" opacity="0.25"/>
      {/* Sidebar: contact items */}
      <rect x="3" y="21" width="7"  height="1.5" rx="1" fill="white" opacity="0.4"/>
      <rect x="3" y="24" width="11" height="1.5" rx="1" fill="white" opacity="0.4"/>
      <rect x="3" y="27" width="9"  height="1.5" rx="1" fill="white" opacity="0.4"/>
      {/* Sidebar divider */}
      <rect x="3" y="32" width="20" height="0.75" rx="0" fill="white" opacity="0.25"/>
      {/* Sidebar: skills label */}
      <rect x="3" y="35" width="12" height="1.5" rx="1" fill="white" opacity="0.6"/>
      {/* Sidebar: skill chips */}
      {[0,1,2,3,4].map(i => (
        <rect key={i} x="3" y={39 + i * 6} width={[14,11,16,13,10][i]} height="4" rx="2"
          fill="white" opacity="0.2"/>
      ))}
      {/* Main content area */}
      <rect x="30" y="8"  width="32" height="4"   rx="1" fill={dark}/>
      {/* Section label */}
      <rect x="30" y="17" width="20" height="2"   rx="1" fill={accent}/>
      <rect x="30" y="21" width="46" height="1.5" rx="1" fill="#e8e8e8"/>
      <rect x="30" y="24" width="38" height="1.5" rx="1" fill="#e8e8e8"/>
      <rect x="30" y="27" width="44" height="1.5" rx="1" fill="#e8e8e8"/>
      <rect x="30" y="33" width="20" height="2"   rx="1" fill={accent}/>
      <rect x="30" y="37" width="46" height="1.5" rx="1" fill="#e8e8e8"/>
      <rect x="30" y="40" width="32" height="1.5" rx="1" fill="#e8e8e8"/>
      <rect x="30" y="46" width="20" height="2"   rx="1" fill={accent}/>
      <rect x="30" y="50" width="46" height="1.5" rx="1" fill="#e8e8e8"/>
      <rect x="30" y="53" width="40" height="1.5" rx="1" fill="#e8e8e8"/>
      <rect x="30" y="56" width="36" height="1.5" rx="1" fill="#e8e8e8"/>
    </svg>
  );

  if (id === "minimal") return (
    <svg viewBox="0 0 80 104" fill="none" xmlns="http://www.w3.org/2000/svg" className="dc-thumb-svg">
      <rect width="80" height="104" fill="white"/>
      {/* Name — wide spaced */}
      <rect x="10" y="10" width="36" height="4"   rx="1" fill={dark}/>
      <rect x="10" y="16" width="22" height="2"   rx="1" fill="#ddd"/>
      {/* Ultra-thin divider */}
      <rect x="10" y="22" width="60" height="0.5" rx="0" fill="#ddd"/>
      {/* Section — no border, loose spacing */}
      <rect x="10" y="28" width="14" height="1.5" rx="1" fill="#aaa"/>
      <rect x="10" y="33" width="60" height="1.5" rx="1" fill="#eee"/>
      <rect x="10" y="36" width="50" height="1.5" rx="1" fill="#eee"/>
      <rect x="10" y="39" width="44" height="1.5" rx="1" fill="#eee"/>
      {/* Section */}
      <rect x="10" y="48" width="18" height="1.5" rx="1" fill="#aaa"/>
      <rect x="10" y="53" width="38" height="2"   rx="1" fill="#ccc"/>
      <rect x="10" y="57" width="60" height="1.5" rx="1" fill="#eee"/>
      <rect x="10" y="60" width="46" height="1.5" rx="1" fill="#eee"/>
      {/* Section */}
      <rect x="10" y="69" width="14" height="1.5" rx="1" fill="#aaa"/>
      <rect x="10" y="74" width="36" height="2"   rx="1" fill="#ccc"/>
      <rect x="10" y="78" width="60" height="1.5" rx="1" fill="#eee"/>
      <rect x="10" y="81" width="40" height="1.5" rx="1" fill="#eee"/>
      {/* Skills: spaced out */}
      <rect x="10" y="90" width="14" height="1.5" rx="1" fill="#aaa"/>
      {[0,1,2,3].map(i => (
        <rect key={i} x={10 + i*16} y="95" width="13" height="5" rx="2.5" fill="#f5f5f5" stroke="#e8e8e8" strokeWidth="0.5"/>
      ))}
    </svg>
  );

  return null;
}
