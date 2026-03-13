// 📁 Location: src/components/TagInput.jsx  ← NEW FILE
// Reusable tag/chip input. Press Enter or comma to add a tag.
// Each tag has an X button to remove it.
// Used in SkillsSection categories and ProjectsSection tech stack.

import { useState } from "react";
import "./TagInput.css";

export default function TagInput({
  tags = [],
  onChange,
  placeholder = "Type and press Enter…",
  maxTags,
}) {
  const [inputVal, setInputVal] = useState("");

  const addTag = (raw) => {
    const val = raw.trim().replace(/,+$/, "").trim();
    if (!val) return;
    if (tags.includes(val)) { setInputVal(""); return; }
    if (maxTags && tags.length >= maxTags) return;
    onChange([...tags, val]);
    setInputVal("");
  };

  const removeTag = (idx) => {
    onChange(tags.filter((_, i) => i !== idx));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(inputVal);
    }
    if (e.key === "Backspace" && !inputVal && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  };

  const handleBlur = () => {
    if (inputVal.trim()) addTag(inputVal);
  };

  return (
    <div className="tag-input-wrap">
      {tags.map((tag, i) => (
        <span key={i} className="tag-chip">
          {tag}
          <button
            className="tag-chip-remove"
            onClick={() => removeTag(i)}
            tabIndex={-1}
            aria-label={`Remove ${tag}`}
          >
            ✕
          </button>
        </span>
      ))}
      <input
        className="tag-input-field"
        value={inputVal}
        onChange={e => setInputVal(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        placeholder={tags.length === 0 ? placeholder : ""}
      />
    </div>
  );
}
