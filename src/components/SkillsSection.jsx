// 📁 Location: src/components/SkillsSection.jsx  ← NEW FILE
// Three skill categories with TagInput.
// "✨ Suggest Skills" button adds a preset skill list with 1s loading state.

import { useState } from "react";
import TagInput from "./TagInput";
import "./SkillsSection.css";

const CATEGORIES = [
  { key: "technical", label: "Technical Skills" },
  { key: "soft",      label: "Soft Skills"       },
  { key: "tools",     label: "Tools & Technologies" },
];

const SUGGESTED = {
  technical: ["TypeScript", "React", "Node.js", "PostgreSQL", "GraphQL"],
  soft:      ["Team Leadership", "Problem Solving"],
  tools:     ["Git", "Docker", "AWS"],
};

export default function SkillsSection({ skills, setSkillCategory }) {
  const [suggesting, setSuggesting] = useState(false);
  const [suggested,  setSuggested]  = useState(false);

  const handleSuggest = () => {
    if (suggesting || suggested) return;
    setSuggesting(true);
    setTimeout(() => {
      // Merge suggestions — don't duplicate existing tags
      Object.entries(SUGGESTED).forEach(([key, newTags]) => {
        const existing = skills[key] ?? [];
        const merged   = [...existing, ...newTags.filter(t => !existing.includes(t))];
        setSkillCategory(key, merged);
      });
      setSuggesting(false);
      setSuggested(true);
      // Allow re-suggesting after 4s (e.g. if user cleared)
      setTimeout(() => setSuggested(false), 4000);
    }, 1000);
  };

  return (
    <div className="skills-section">

      {/* Header row */}
      <div className="skills-header">
        <h3 className="skills-title">Skills</h3>
        <button
          className={`btn-suggest ${suggesting ? "loading" : ""} ${suggested ? "done" : ""}`}
          onClick={handleSuggest}
          disabled={suggesting}
        >
          {suggesting ? (
            <><span className="suggest-spinner" /> Suggesting…</>
          ) : suggested ? (
            <><span className="suggest-check">✓</span> Suggested!</>
          ) : (
            <>✨ Suggest Skills</>
          )}
        </button>
      </div>

      {/* Category groups */}
      <div className="skills-categories">
        {CATEGORIES.map(cat => {
          const tags = skills[cat.key] ?? [];
          return (
            <div key={cat.key} className="skill-category">
              <div className="skill-category-label">
                <span>{cat.label}</span>
                {tags.length > 0 && (
                  <span className="skill-count">({tags.length})</span>
                )}
              </div>
              <TagInput
                tags={tags}
                onChange={newTags => setSkillCategory(cat.key, newTags)}
                placeholder={`Add ${cat.label.toLowerCase()}…`}
              />
            </div>
          );
        })}
      </div>

    </div>
  );
}
