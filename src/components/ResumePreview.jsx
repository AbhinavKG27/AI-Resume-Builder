import "./ResumePreview.css";

export default function ResumePreview({ resume, scale = 1 }) {
  const { personal, summary, education, experience, projects, skills, links } = resume;
  const hasName = personal?.name?.trim();

  return (
    <div className="resume-shell" style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}>
      <div className="resume-doc">

        <div className="rv-header">
          {hasName
            ? <h1 className="rv-name">{personal.name}</h1>
            : <h1 className="rv-name rv-placeholder">Your Name</h1>
          }
          <div className="rv-contact">
            {personal?.email    && <span>{personal.email}</span>}
            {personal?.phone    && <span>{personal.phone}</span>}
            {personal?.location && <span>{personal.location}</span>}
            {links?.github      && <span>{links.github}</span>}
            {links?.linkedin    && <span>{links.linkedin}</span>}
          </div>
        </div>

        <div className="rv-divider" />

        {summary ? (
          <div className="rv-section">
            <h2 className="rv-section-title">Summary</h2>
            <p className="rv-body">{summary}</p>
          </div>
        ) : (
          <div className="rv-section rv-empty-section">
            <h2 className="rv-section-title">Summary</h2>
            <p className="rv-placeholder-text">Your professional summary will appear here.</p>
          </div>
        )}

        <div className="rv-section">
          <h2 className="rv-section-title">Experience</h2>
          {experience?.length > 0 ? experience.map(exp => (
            <div key={exp.id} className="rv-entry">
              <div className="rv-entry-header">
                <div>
                  <div className="rv-entry-title">{exp.role || "Role"}</div>
                  <div className="rv-entry-sub">{exp.company || "Company"}</div>
                </div>
                <div className="rv-entry-date">{exp.duration}</div>
              </div>
              {exp.description && <p className="rv-body rv-entry-desc">{exp.description}</p>}
            </div>
          )) : <PlaceholderLines count={3} />}
        </div>

        <div className="rv-section">
          <h2 className="rv-section-title">Education</h2>
          {education?.length > 0 ? education.map(edu => (
            <div key={edu.id} className="rv-entry">
              <div className="rv-entry-header">
                <div>
                  <div className="rv-entry-title">{edu.degree || "Degree"}</div>
                  <div className="rv-entry-sub">{edu.institution || "Institution"}</div>
                </div>
                <div className="rv-entry-date">{edu.year}{edu.grade ? ` · ${edu.grade}` : ""}</div>
              </div>
            </div>
          )) : <PlaceholderLines count={2} />}
        </div>

        {projects?.length > 0 && (
          <div className="rv-section">
            <h2 className="rv-section-title">Projects</h2>
            {projects.map(proj => (
              <div key={proj.id} className="rv-entry">
                <div className="rv-entry-header">
                  <div>
                    <div className="rv-entry-title">{proj.name || "Project Name"}</div>
                    {proj.tech && <div className="rv-entry-sub rv-tech">{proj.tech}</div>}
                  </div>
                  {proj.link && <div className="rv-entry-date">{proj.link}</div>}
                </div>
                {proj.description && <p className="rv-body rv-entry-desc">{proj.description}</p>}
              </div>
            ))}
          </div>
        )}

        <div className="rv-section">
          <h2 className="rv-section-title">Skills</h2>
          {skills?.trim() ? (
            <div className="rv-skills">
              {skills.split(",").map((s, i) => (
                <span key={i} className="rv-skill-tag">{s.trim()}</span>
              ))}
            </div>
          ) : <PlaceholderLines count={1} />}
        </div>

      </div>
    </div>
  );
}

function PlaceholderLines({ count }) {
  return (
    <div className="rv-placeholder-lines">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rv-placeholder-line" style={{ width: `${70 + (i % 3) * 10}%` }} />
      ))}
    </div>
  );
}
