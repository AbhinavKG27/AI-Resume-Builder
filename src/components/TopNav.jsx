import "./TopNav.css";

const LINKS = [
  { label: "Builder", route: "/builder" },
  { label: "Preview", route: "/preview" },
  { label: "Proof",   route: "/proof"   },
];

export default function TopNav({ route, nav }) {
  return (
    <header className="topnav">
      <div className="topnav-inner">
        {/* Logo */}
        <button className="topnav-logo" onClick={() => nav("/")}>
          <span className="logo-mark">AR</span>
          <span className="logo-name">AI Resume</span>
        </button>

        {/* Nav links */}
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

        {/* CTA */}
        <button className="btn btn-primary topnav-cta" onClick={() => nav("/builder")}>
          Start Building
        </button>
      </div>
    </header>
  );
}
