// 📁 Location: src/utils/exportText.js  ← NEW FILE
// Generates a clean plain-text version of the resume for clipboard copy.
// No dependencies. Pure string construction.

const divider = (char = "─", len = 48) => char.repeat(len);

function section(title, content) {
  if (!content?.trim()) return "";
  return `${title.toUpperCase()}\n${divider()}\n${content.trim()}\n`;
}

export function generatePlainText(resume) {
  const { personal, summary, education, experience, projects, skills, links } = resume;
  const parts = [];

  // ── Name ──────────────────────────────────────────────────────────────────
  if (personal?.name?.trim()) {
    parts.push(personal.name.trim().toUpperCase());
  }

  // ── Contact line ──────────────────────────────────────────────────────────
  const contact = [
    personal?.email,
    personal?.phone,
    personal?.location,
    links?.github,
    links?.linkedin,
  ].filter(s => s?.trim()).join("  ·  ");

  if (contact) parts.push(contact);

  if (parts.length > 0) parts.push(divider("═"));

  // ── Summary ───────────────────────────────────────────────────────────────
  if (summary?.trim()) {
    parts.push(section("Summary", summary));
  }

  // ── Experience ────────────────────────────────────────────────────────────
  if (experience?.length > 0) {
    const lines = experience.map(exp => {
      const header = [exp.role, exp.company].filter(Boolean).join(" — ");
      const date   = exp.duration ? `  (${exp.duration})` : "";
      const desc   = exp.description?.trim() ? `\n  ${exp.description.trim()}` : "";
      return `${header}${date}${desc}`;
    }).join("\n\n");
    parts.push(section("Experience", lines));
  }

  // ── Education ─────────────────────────────────────────────────────────────
  if (education?.length > 0) {
    const lines = education.map(edu => {
      const degree  = [edu.degree, edu.institution].filter(Boolean).join(", ");
      const details = [edu.year, edu.grade].filter(Boolean).join("  ·  ");
      return details ? `${degree}\n  ${details}` : degree;
    }).join("\n\n");
    parts.push(section("Education", lines));
  }

  // ── Projects ──────────────────────────────────────────────────────────────
  if (projects?.length > 0) {
    const lines = projects.map(proj => {
      const name  = proj.name?.trim() || "Untitled Project";
      const tech  = proj.tech?.trim()  ? `  [${proj.tech}]`  : "";
      const link  = proj.link?.trim()  ? `\n  ${proj.link}`  : "";
      const desc  = proj.description?.trim() ? `\n  ${proj.description.trim()}` : "";
      return `${name}${tech}${link}${desc}`;
    }).join("\n\n");
    parts.push(section("Projects", lines));
  }

  // ── Skills ────────────────────────────────────────────────────────────────
  if (skills?.trim()) {
    const formatted = skills
      .split(",")
      .map(s => s.trim())
      .filter(Boolean)
      .join("  ·  ");
    parts.push(section("Skills", formatted));
  }

  // ── Links ─────────────────────────────────────────────────────────────────
  const linkLines = [
    links?.github   ? `GitHub:   ${links.github}`   : "",
    links?.linkedin ? `LinkedIn: ${links.linkedin}` : "",
  ].filter(Boolean).join("\n");

  if (linkLines) parts.push(section("Links", linkLines));

  return parts.join("\n");
}

// ── Validation check (non-blocking) ─────────────────────────────────────────
// Returns array of warning strings. Empty = all good.
export function validateForExport(resume) {
  const warnings = [];

  if (!resume?.personal?.name?.trim()) {
    warnings.push("Name is missing from Personal Info.");
  }

  const hasContent =
    (resume?.experience?.length ?? 0) > 0 ||
    (resume?.projects?.length   ?? 0) > 0;

  if (!hasContent) {
    warnings.push("Add at least one experience or project entry.");
  }

  return warnings;
}
