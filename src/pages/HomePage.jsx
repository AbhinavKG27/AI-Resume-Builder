import "./HomePage.css";

export default function HomePage({ nav }) {
  return (
    <main className="home">

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-inner">
          <div className="section-tag">KodNest Premium</div>

          <h1 className="hero-headline">
            Build a Resume<br />
            <em>That Gets Read.</em>
          </h1>

          <p className="hero-sub">
            Craft a clean, ATS-optimised resume in minutes.
            No templates. No noise. Just your story, told well.
          </p>

          <div className="hero-actions">
            <button className="btn btn-primary hero-cta" onClick={() => nav("/builder")}>
              Start Building
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
            <button className="btn btn-ghost" onClick={() => nav("/preview")}>
              See Example
            </button>
          </div>
        </div>

        {/* Decorative resume skeleton */}
        <div className="hero-visual">
          <div className="mock-resume">
            <div className="mock-name-block">
              <div className="mock-line mock-name" />
              <div className="mock-contact-row">
                <div className="mock-line mock-short" />
                <div className="mock-line mock-short" />
                <div className="mock-line mock-short" />
              </div>
            </div>
            <div className="mock-divider" />
            {["Experience", "Education", "Skills"].map(s => (
              <div key={s} className="mock-section">
                <div className="mock-section-label">{s}</div>
                <div className="mock-line mock-full" />
                <div className="mock-line mock-most" />
                <div className="mock-line mock-half" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="features">
        <div className="features-inner">
          {[
            { num: "01", title: "Clean Structure", desc: "Single-page format engineered to pass ATS scanners and impress human reviewers." },
            { num: "02", title: "Live Preview",    desc: "Every keystroke updates your resume in real time. No save button. No lag." },
            { num: "03", title: "Premium Output",  desc: "Export a polished PDF with professional typography — ready to send instantly." },
          ].map(f => (
            <div key={f.num} className="feature-card card">
              <div className="feature-num">{f.num}</div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
