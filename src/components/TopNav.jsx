// 📁 Location: src/components/TopNav.jsx  ← MODIFIED

import "./TopNav.css";

const LINKS = [
  { label: "Builder", route: "/builder" },
  { label: "Preview", route: "/preview" },
  { label: "Proof",   route: "/proof"   },
];

export default function TopNav({ route, nav, isDark, onToggleTheme }) {
  return (
    <header className="topnav">
      <div className="topnav-inner">

        <button className="topnav-logo" onClick={() => nav("/")}>
          <span className="logo-mark">AR</span>
          <span className="logo-name">AI Resume</span>
        </button>

        <nav className="topnav-links">
          {LINKS.map(l => (
            <button
              key={l.route}
              className={`nav-link ${route === l.route ? "active" : ""}`}
              onClick={() => nav(l.route)}
            >
              {l.label}
            </button>
          ))}
        </nav>

        {/* Elegant theme toggle */}
        <button
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          title={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          <span className="toggle-pill">
            <span className="toggle-circle">
              {isDark ? <MoonIcon /> : <SunIcon />}
            </span>
          </span>
          <span className="toggle-label">{isDark ? "Dark" : "Light"}</span>
        </button>

        <button className="btn btn-primary topnav-cta" onClick={() => nav("/builder")}>
          Start Building
        </button>

      </div>
    </header>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <circle cx="12" cy="12" r="4.5"/>
      <line x1="12" y1="1.5" x2="12" y2="3.5"/>
      <line x1="12" y1="20.5" x2="12" y2="22.5"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1.5" y1="12" x2="3.5" y2="12"/>
      <line x1="20.5" y1="12" x2="22.5" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  );
}
