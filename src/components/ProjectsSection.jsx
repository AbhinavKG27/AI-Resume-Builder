// 📁 Location: src/components/ProjectsSection.jsx  ← NEW FILE
// Collapsible project entries.
// Each entry: title, description (max 200 chars), tech stack TagInput,
// live URL, GitHub URL, delete button.

import { useState } from "react";
import FormField from "./FormField";
import TagInput  from "./TagInput";
import "./ProjectsSection.css";

const DESC_MAX = 200;

export default function ProjectsSection({
  projects,
  addProject,
  updateProject,
  removeProject,
}) {
  // Track which entries are collapsed. New entries start expanded.
  const [collapsed, setCollapsed] = useState({});

  const toggle = (id) =>
    setCollapsed(prev => ({ ...prev, [id]: !prev[id] }));

  const isCollapsed = (id) => !!collapsed[id];

  return (
    <div className="projects-section">

      {/* Header */}
      <div className="projects-header">
        <h3 className="projects-title">Projects</h3>
        <button className="btn-add-project" onClick={addProject}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Add Project
        </button>
      </div>

      {/* Empty state */}
      {projects.length === 0 && (
        <div className="projects-empty">
          No projects yet. Click "Add Project" to begin.
        </div>
      )}

      {/* Project entries */}
      <div className="projects-list">
        {projects.map((proj, idx) => {
          const descLen   = proj.description?.length ?? 0;
          const descNear  = descLen >= DESC_MAX - 20;
          const descOver  = descLen >= DESC_MAX;
          const collapsed_ = isCollapsed(proj.id);

          return (
            <div key={proj.id} className={`project-entry ${collapsed_ ? "collapsed" : ""}`}>

              {/* Entry header — always visible */}
              <div className="project-entry-header" onClick={() => toggle(proj.id)}>
                <div className="project-entry-meta">
                  <span className="project-entry-num">#{idx + 1}</span>
                  <span className="project-entry-title-preview">
                    {proj.name?.trim() || "Untitled Project"}
                  </span>
                  {proj.techStack?.length > 0 && (
                    <span className="project-entry-tech-count">
                      {proj.techStack.length} tech
                    </span>
                  )}
                </div>
                <div className="project-entry-actions">
                  <button
                    className="btn-delete-project"
                    onClick={e => { e.stopPropagation(); removeProject(proj.id); }}
                    title="Delete project"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6"/>
                      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                      <path d="M10 11v6M14 11v6"/>
                      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                    </svg>
                  </button>
                  <span className={`project-chevron ${collapsed_ ? "" : "open"}`}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </span>
                </div>
              </div>

              {/* Collapsible body */}
              {!collapsed_ && (
                <div className="project-entry-body">

                  <FormField
                    label="Project Title"
                    value={proj.name}
                    onChange={v => updateProject(proj.id, "name", v)}
                    placeholder="e.g. OpenResume"
                  />

                  {/* Description with char counter */}
                  <div className="desc-field-wrap">
                    <label className="form-label">Description</label>
                    <textarea
                      className={`form-input form-textarea desc-textarea ${descOver ? "over-limit" : ""}`}
                      value={proj.description}
                      onChange={e => {
                        const val = e.target.value;
                        if (val.length <= DESC_MAX) {
                          updateProject(proj.id, "description", val);
                        }
                      }}
                      placeholder="Describe what you built, the problem it solved, and the outcome…"
                      rows={3}
                      maxLength={DESC_MAX}
                    />
                    <span className={`desc-counter ${descNear ? "near" : ""} ${descOver ? "over" : ""}`}>
                      {descLen}/{DESC_MAX}
                    </span>
                  </div>

                  <div className="project-field-group">
                    <label className="form-label">Tech Stack</label>
                    <TagInput
                      tags={proj.techStack ?? []}
                      onChange={tags => updateProject(proj.id, "techStack", tags)}
                      placeholder="React, Node.js, PostgreSQL…"
                    />
                  </div>

                  <div className="grid-2">
                    <FormField
                      label="Live URL (optional)"
                      value={proj.liveUrl ?? ""}
                      onChange={v => updateProject(proj.id, "liveUrl", v)}
                      placeholder="https://yourproject.com"
                    />
                    <FormField
                      label="GitHub URL (optional)"
                      value={proj.githubUrl ?? ""}
                      onChange={v => updateProject(proj.id, "githubUrl", v)}
                      placeholder="github.com/you/project"
                    />
                  </div>

                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
