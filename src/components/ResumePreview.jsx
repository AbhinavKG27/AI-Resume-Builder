// 📁 Location: src/components/ResumePreview.jsx  ← MODIFIED (replace entire file)
// Changes: accepts `template` prop, applies data-template attribute for CSS overrides

import "./ResumePreview.css";

export default function ResumePreview({ resume, template = "classic" }) {
  const { personal, summary, education, experience, projects, skills, links } = resume;

  const hasPersonal   = personal?.name?.trim();
  const hasSummary    = summary?.trim();
  const hasEducation  = education?.length > 0;
  const hasExperience = experience?.length > 0;
  const hasProjects   = projects?.length > 0;
  const skillList     = skills?.split(",").map(s => s.trim()).filter(Boolean) ?? [];
  const hasSkills     = skillList.length > 0;

  const contactItems = [
    personal?.email,
    personal?.phone,
    personal?.location,
    links?.github    || null,
    links?.linkedin  || null,
  ].filter(Boolean);

  return (
    <div data-template={template}>
      <div className="resume-doc">

        {/* NAME + CONTACT */}
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

        {/* SUMMARY */}
        {hasSummary && (
          <section className="rv-section">
            <h2 className="rv-section-title">Summary</h2>
            <p className="rv-body">{summary}</p>
          </section>
        )}

        {/* EXPERIENCE */}
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

        {/* EDUCATION */}
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

        {/* PROJECTS */}
        {hasProjects && (
          <section className="rv-section">
            <h2 className="rv-section-title">Projects</h2>
            {projects.map(proj => (
              <div key={proj.id} className="rv-entry">
                <div className="rv-entry-top">
                  <div className="rv-entry-left">
                    <span className="rv-entry-title">{proj.name || "Project"}</span>
                    {proj.tech && <span className="rv-entry-tech">{proj.tech}</span>}
                  </div>
                  {proj.link && <span className="rv-entry-date">{proj.link}</span>}
                </div>
                {proj.description && <p className="rv-body rv-entry-body">{proj.description}</p>}
              </div>
            ))}
          </section>
        )}

        {/* SKILLS */}
        {hasSkills && (
          <section className="rv-section">
            <h2 className="rv-section-title">Skills</h2>
            <div className="rv-skills">
              {skillList.map((s, i) => (
                <span key={i} className="rv-skill">{s}</span>
              ))}
            </div>
          </section>
        )}

        {/* Empty state */}
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
