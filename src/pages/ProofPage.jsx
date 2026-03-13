import "./ProofPage.css";

const ARTIFACTS = [
  { id: 1, label: "Problem Statement",    status: "pending" },
  { id: 2, label: "Market Research",      status: "pending" },
  { id: 3, label: "System Architecture",  status: "pending" },
  { id: 4, label: "High-Level Design",    status: "pending" },
  { id: 5, label: "Low-Level Design",     status: "pending" },
  { id: 6, label: "Build Screenshot",     status: "pending" },
  { id: 7, label: "Test Plan",            status: "pending" },
  { id: 8, label: "Deployment Proof",     status: "pending" },
];

export default function ProofPage({ nav }) {
  return (
    <div className="proof-page">
      <div className="proof-inner">

        {/* Header */}
        <div className="proof-header">
          <div className="section-tag">KodNest Premium · Project 3</div>
          <h1 className="proof-title">Proof of Work</h1>
          <p className="proof-sub">
            Complete all 8 build steps and submit your artifacts below.
            This page is your final submission record.
          </p>
        </div>

        {/* Artifacts grid */}
        <div className="artifacts-grid">
          {ARTIFACTS.map(a => (
            <div key={a.id} className="artifact-card card">
              <div className="artifact-num">{String(a.id).padStart(2, "0")}</div>
              <div className="artifact-info">
                <div className="artifact-label">{a.label}</div>
                <div className="artifact-status pending">Awaiting artifact</div>
              </div>
              <div className="artifact-upload-zone">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                Upload
              </div>
            </div>
          ))}
        </div>

        {/* Submission links */}
        <div className="proof-links card">
          <h3 className="proof-links-title">Submission Links</h3>
          <div className="proof-links-grid">
            <div className="proof-link-row">
              <label className="label">Lovable URL</label>
              <input className="proof-input" type="url" placeholder="https://lovable.dev/projects/..." />
            </div>
            <div className="proof-link-row">
              <label className="label">GitHub URL</label>
              <input className="proof-input" type="url" placeholder="https://github.com/username/..." />
            </div>
            <div className="proof-link-row">
              <label className="label">Deploy URL</label>
              <input className="proof-input" type="url" placeholder="https://your-app.vercel.app" />
            </div>
          </div>
          <button className="btn btn-primary proof-submit">
            Copy Final Submission
          </button>
        </div>

      </div>
    </div>
  );
}
