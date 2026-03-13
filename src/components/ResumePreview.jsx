// 📁 Location: src/components/ResumePreview.jsx  ← MODIFIED
// Changes: grouped skills display, project cards with tech pills + link icons

import "./ResumePreview.css";

// ── Helpers ───────────────────────────────────────────────────────────────────

// Normalise skills — handles both old string and new object shape
function parseSkills(skills) {
  if (!skills) return { technical: [], soft: [], tools: [] };
  if (typeof skills === "string") {
    const list = skills.split(",").map(s => s.trim()).filter(Boolean);
    return { technical: list, soft: [], tools: [] };
  }
  return {
    technical: Array.isArray(skills.technical) ? skills.technical : [],
    soft:      Array.isArray(skills.soft)      ? skills.soft      : [],
    tools:     Array.isArray(skills.tools)     ? skills.tools     : [],
  };
}

const SKILL_GROUP_LABELS = {
  technical: "Technical",
  soft:      "Soft Skills",
  tools:     "Tools & Tech",
};

export default function ResumePreview({ resume, template = "classic" }) {
  const { personal, summary, education, experience, projects, links } = resume;
  const skillGroups = parseSkills(resume.skills);

  const hasPersonal   = personal?.name?.trim();
  const hasSummary    = summary?.trim();
  const hasEducation  = education?.length > 0;
  const hasExperience = experience?.length > 0;
  const hasProjects   = projects?.length > 0;
  const hasSkills     = skillGroups.technical.length > 0
                     || skillGroups.soft.length > 0
                     || skillGroups.tools.length > 0;

  const contactItems = [
    personal?.email,
    personal?.phone,
    personal?.location,
    links?.github   || null,
    links?.linkedin || null,
  ].filter(Boolean);

  return (
    <div data-template={template}>
      <div className="resume-doc">

        {/* ── NAME + CONTACT ── */}
        <div className="rv-header">
          <h1 className="rv-name">
            {hasPersonal ? personal.name : <span className="rv-ghost">Your Name</span>}
          </h1>
          {contactItems.length > 0 && (
            <div className="rv-contact">
              {contactItems.map((item, i) => (
                <span key={i} className="rv-contact-item">{item}</span>
              ))}
            </div>
          )}
        </div>

        <div className="rv-rule" />

        {/* ── SUMMARY ── */}
        {hasSummary && (
          <section className="rv-section">
            <h2 className="rv-section-title">Summary</h2>
            <p className="rv-body">{summary}</p>
          </section>
        )}

        {/* ── EXPERIENCE ── */}
        {hasExperience && (
          <section className="rv-section">
            <h2 className="rv-section-title">Experience</h2>
            {experience.map(exp => (
              <div key={exp.id} className="rv-entry">
                <div className="rv-entry-top">
                  <div className="rv-entry-left">
                    <span className="rv-entry-title">{exp.role || "Role"}</span>
                    <span className="rv-entry-company">{exp.company || "Company"}</span>
                  </div>
                  {exp.duration && <span className="rv-entry-date">{exp.duration}</span>}
                </div>
                {exp.description && <p className="rv-body rv-entry-body">{exp.description}</p>}
              </div>
            ))}
          </section>
        )}

        {/* ── EDUCATION ── */}
        {hasEducation && (
          <section className="rv-section">
            <h2 className="rv-section-title">Education</h2>
            {education.map(edu => (
              <div key={edu.id} className="rv-entry">
                <div className="rv-entry-top">
                  <div className="rv-entry-left">
                    <span className="rv-entry-title">{edu.degree || "Degree"}</span>
                    <span className="rv-entry-company">{edu.institution || "Institution"}</span>
                  </div>
                  <div className="rv-entry-right">
                    {edu.year  && <span className="rv-entry-date">{edu.year}</span>}
                    {edu.grade && <span className="rv-entry-grade">{edu.grade}</span>}
                  </div>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* ── PROJECTS — cards with tech pills + link icons ── */}
        {hasProjects && (
          <section className="rv-section">
            <h2 className="rv-section-title">Projects</h2>
            {projects.map(proj => {
              // Support both old shape (tech string, link) and new shape (techStack[], liveUrl, githubUrl)
              const techList = Array.isArray(proj.techStack)
                ? proj.techStack
                : (proj.tech ? proj.tech.split(",").map(s => s.trim()).filter(Boolean) : []);
              const liveUrl   = proj.liveUrl   || proj.link || "";
              const githubUrl = proj.githubUrl || "";

              return (
                <div key={proj.id} className="rv-project-card">
                  <div className="rv-project-header">
                    <span className="rv-entry-title">{proj.name || "Project"}</span>
                    <div className="rv-project-links">
                      {liveUrl && (
                        <span className="rv-project-link" title={liveUrl}>
                          <LinkIcon />
                        </span>
                      )}
                      {githubUrl && (
                        <span className="rv-project-link" title={githubUrl}>
                          <GithubIcon />
                        </span>
                      )}
                    </div>
                  </div>
                  {proj.description && (
                    <p className="rv-body rv-entry-body">{proj.description}</p>
                  )}
                  {techList.length > 0 && (
                    <div className="rv-tech-pills">
                      {techList.map((t, i) => (
                        <span key={i} className="rv-tech-pill">{t}</span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </section>
        )}

        {/* ── SKILLS — grouped by category ── */}
        {hasSkills && (
          <section className="rv-section">
            <h2 className="rv-section-title">Skills</h2>
            <div className="rv-skill-groups">
              {Object.entries(skillGroups).map(([key, tags]) => {
                if (!tags.length) return null;
                return (
                  <div key={key} className="rv-skill-group">
                    <span className="rv-skill-group-label">
                      {SKILL_GROUP_LABELS[key]}
                    </span>
                    <div className="rv-skills">
                      {tags.map((s, i) => (
                        <span key={i} className="rv-skill">{s}</span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ── Empty state ── */}
        {!hasPersonal && !hasSummary && !hasExperience && !hasEducation && !hasProjects && !hasSkills && (
          <div className="rv-empty">
            <p>Your resume preview will appear here as you fill in the form.</p>
            <p>Click <strong>Load Sample Data</strong> to see an example.</p>
          </div>
        )}

      </div>
    </div>
  );
}

// ── Inline SVG icons ─────────────────────────────────────────────────────────
function LinkIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  );
}
