// 📁 Location: src/pages/BuilderPage.jsx  ← MODIFIED (replace entire file)
// Changes: ATS score panel added to right column below live preview

import { useState } from "react";
import FormField from "../components/FormField";
import ResumePreview from "../components/ResumePreview";
import ATSScore from "../components/ATSScore";
import { useATSScore } from "../hooks/useATSScore";
import "./BuilderPage.css";

function FormSection({ title, children, action }) {
  return (
    <div className="form-section">
      <div className="form-section-header">
        <h3 className="form-section-title">{title}</h3>
        {action}
      </div>
      <div className="form-section-body">{children}</div>
    </div>
  );
}

function AddBtn({ label, onClick }) {
  return (
    <button className="btn-add" onClick={onClick}>
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
      {label}
    </button>
  );
}

function RemoveBtn({ onClick }) {
  return (
    <button className="btn-remove" onClick={onClick} title="Remove">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
  );
}

export default function BuilderPage({ resume, handlers, nav }) {
  const {
    loadSample, clearAll,
    setPersonal, setSummary, setSkills, setLinks,
    addEducation, updateEducation, removeEducation,
    addExperience, updateExperience, removeExperience,
    addProject, updateProject, removeProject,
  } = handlers;

  const [activeSection, setActiveSection] = useState("personal");
  const { score, suggestions, breakdown } = useATSScore(resume);

  const SECTIONS = [
    { id: "personal",   label: "Personal"   },
    { id: "summary",    label: "Summary"    },
    { id: "experience", label: "Experience" },
    { id: "education",  label: "Education"  },
    { id: "projects",   label: "Projects"   },
    { id: "skills",     label: "Skills"     },
    { id: "links",      label: "Links"      },
  ];

  return (
    <div className="builder-page">

      {/* ── LEFT: FORM ── */}
      <div className="builder-left">
        <div className="builder-toolbar">
          <h2 className="builder-title">Resume Builder</h2>
          <div className="toolbar-actions">
            <button className="btn btn-ghost btn-sm" onClick={clearAll}>Clear</button>
            <button className="btn btn-outline-accent btn-sm" onClick={loadSample}>
              Load Sample Data
            </button>
          </div>
        </div>

        <div className="section-tabs">
          {SECTIONS.map(s => (
            <button
              key={s.id}
              className={`section-tab ${activeSection === s.id ? "active" : ""}`}
              onClick={() => setActiveSection(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="form-body">

          {activeSection === "personal" && (
            <FormSection title="Personal Info">
              <div className="grid-2">
                <FormField label="Full Name"    value={resume.personal.name}     onChange={v => setPersonal("name", v)}     placeholder="Priya Nair" />
                <FormField label="Email"        value={resume.personal.email}    onChange={v => setPersonal("email", v)}    placeholder="priya@email.com" type="email" />
                <FormField label="Phone"        value={resume.personal.phone}    onChange={v => setPersonal("phone", v)}    placeholder="+91 98765 43210" />
                <FormField label="Location"     value={resume.personal.location} onChange={v => setPersonal("location", v)} placeholder="Bengaluru, KA" />
              </div>
            </FormSection>
          )}

          {activeSection === "summary" && (
            <FormSection title="Professional Summary">
              <FormField
                type="textarea" rows={6}
                value={resume.summary}
                onChange={setSummary}
                placeholder="Write 2–4 sentences summarising your experience, strengths, and what you're looking for..."
                hint="Target: 40–120 words for best ATS score."
              />
              <div className="word-count">
                {resume.summary.trim()
                  ? `${resume.summary.trim().split(/\s+/).filter(Boolean).length} words`
                  : "0 words"}
              </div>
            </FormSection>
          )}

          {activeSection === "experience" && (
            <FormSection title="Work Experience" action={<AddBtn label="Add Role" onClick={addExperience} />}>
              {resume.experience.length === 0 && (
                <div className="empty-state">No experience added yet. Click "Add Role" to begin.</div>
              )}
              {resume.experience.map((exp, idx) => (
                <div key={exp.id} className="entry-card">
                  <div className="entry-card-header">
                    <span className="entry-card-num">#{idx + 1}</span>
                    <RemoveBtn onClick={() => removeExperience(exp.id)} />
                  </div>
                  <div className="grid-2">
                    <FormField label="Company"  value={exp.company}  onChange={v => updateExperience(exp.id, "company", v)}  placeholder="Razorpay" />
                    <FormField label="Role"     value={exp.role}     onChange={v => updateExperience(exp.id, "role", v)}     placeholder="Software Engineer II" />
                    <FormField label="Duration" value={exp.duration} onChange={v => updateExperience(exp.id, "duration", v)} placeholder="Jan 2022 – Present" />
                  </div>
                  <FormField
                    label="Description" type="textarea" rows={4}
                    value={exp.description}
                    onChange={v => updateExperience(exp.id, "description", v)}
                    placeholder="Led migration of checkout flow, reducing load time by 40%..."
                    hint="Include numbers and percentages for a higher ATS score."
                  />
                </div>
              ))}
            </FormSection>
          )}

          {activeSection === "education" && (
            <FormSection title="Education" action={<AddBtn label="Add Education" onClick={addEducation} />}>
              {resume.education.length === 0 && (
                <div className="empty-state">No education added yet. Click "Add Education" to begin.</div>
              )}
              {resume.education.map((edu, idx) => (
                <div key={edu.id} className="entry-card">
                  <div className="entry-card-header">
                    <span className="entry-card-num">#{idx + 1}</span>
                    <RemoveBtn onClick={() => removeEducation(edu.id)} />
                  </div>
                  <div className="grid-2">
                    <FormField label="Institution" value={edu.institution} onChange={v => updateEducation(edu.id, "institution", v)} placeholder="RV College of Engineering" />
                    <FormField label="Degree"      value={edu.degree}      onChange={v => updateEducation(edu.id, "degree", v)}      placeholder="B.E. Computer Science" />
                    <FormField label="Year"        value={edu.year}        onChange={v => updateEducation(edu.id, "year", v)}        placeholder="2016 – 2020" />
                    <FormField label="Grade / GPA" value={edu.grade}       onChange={v => updateEducation(edu.id, "grade", v)}       placeholder="8.7 CGPA" />
                  </div>
                </div>
              ))}
            </FormSection>
          )}

          {activeSection === "projects" && (
            <FormSection title="Projects" action={<AddBtn label="Add Project" onClick={addProject} />}>
              {resume.projects.length === 0 && (
                <div className="empty-state">No projects added yet. Click "Add Project" to begin.</div>
              )}
              {resume.projects.map((proj, idx) => (
                <div key={proj.id} className="entry-card">
                  <div className="entry-card-header">
                    <span className="entry-card-num">#{idx + 1}</span>
                    <RemoveBtn onClick={() => removeProject(proj.id)} />
                  </div>
                  <div className="grid-2">
                    <FormField label="Project Name" value={proj.name} onChange={v => updateProject(proj.id, "name", v)} placeholder="OpenResume" />
                    <FormField label="Tech Stack"   value={proj.tech} onChange={v => updateProject(proj.id, "tech", v)} placeholder="Next.js, Supabase, Tailwind" />
                    <FormField label="Link"         value={proj.link} onChange={v => updateProject(proj.id, "link", v)} placeholder="github.com/you/project" />
                  </div>
                  <FormField
                    label="Description" type="textarea" rows={3}
                    value={proj.description}
                    onChange={v => updateProject(proj.id, "description", v)}
                    placeholder="Built X using Y, resulting in Z% improvement..."
                    hint="Mention numbers and outcomes for ATS points."
                  />
                </div>
              ))}
            </FormSection>
          )}

          {activeSection === "skills" && (
            <FormSection title="Skills">
              <FormField
                label="Skills (comma-separated)"
                type="textarea" rows={4}
                value={resume.skills}
                onChange={setSkills}
                placeholder="React, TypeScript, Node.js, PostgreSQL, Docker, AWS, Figma, Redis..."
                hint="Add 8+ skills for maximum ATS score."
              />
              <div className="word-count">
                {resume.skills.trim()
                  ? `${resume.skills.split(",").map(s => s.trim()).filter(Boolean).length} skills`
                  : "0 skills"}
              </div>
            </FormSection>
          )}

          {activeSection === "links" && (
            <FormSection title="Links">
              <FormField label="GitHub"   value={resume.links.github}   onChange={v => setLinks("github", v)}   placeholder="github.com/yourname" />
              <FormField label="LinkedIn" value={resume.links.linkedin} onChange={v => setLinks("linkedin", v)} placeholder="linkedin.com/in/yourname" />
            </FormSection>
          )}

        </div>

        <div className="builder-footer">
          <button className="btn btn-ghost btn-sm" onClick={() => nav("/")}>← Home</button>
          <button className="btn btn-primary" onClick={() => nav("/preview")}>
            Preview Resume →
          </button>
        </div>
      </div>

      {/* ── RIGHT: LIVE PREVIEW + ATS ── */}
      <div className="builder-right">
        <div className="preview-panel-header">
          <span className="label">Live Preview</span>
          <div className="preview-header-right">
            <span className="autosave-badge">● Autosaved</span>
            <button className="btn btn-ghost btn-sm" onClick={() => nav("/preview")}>
              Full Preview →
            </button>
          </div>
        </div>

        <div className="builder-right-body">
          {/* ATS Score — sticky at top */}
          <ATSScore score={score} suggestions={suggestions} breakdown={breakdown} />

          {/* Live resume preview */}
          <div className="preview-scaler">
            <ResumePreview resume={resume} />
          </div>
        </div>
      </div>

    </div>
  );
}
