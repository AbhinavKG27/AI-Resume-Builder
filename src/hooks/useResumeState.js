// 📁 Location: src/hooks/useResumeState.js  ← MODIFIED
// Changes:
//   - skills migrated from comma-string → { technical, soft, tools }
//   - projects migrated from { tech, link } → { techStack[], liveUrl, githubUrl }
//   - setSkillCategory replaces setSkills
//   - addProject creates entries in new shape

import { useState, useCallback, useEffect } from "react";
import { EMPTY_DATA, SAMPLE_DATA } from "../data/sampleData";

const LS_KEY = "resumeBuilderData";

function makeId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
}

// ── Migrate old skills string → new object ───────────────────────────────────
function migrateSkills(raw) {
  if (!raw) return { technical: [], soft: [], tools: [] };
  // Already new format
  if (typeof raw === "object" && !Array.isArray(raw)) {
    return {
      technical: Array.isArray(raw.technical) ? raw.technical : [],
      soft:      Array.isArray(raw.soft)      ? raw.soft      : [],
      tools:     Array.isArray(raw.tools)     ? raw.tools     : [],
    };
  }
  // Old comma-string — migrate all into technical
  if (typeof raw === "string") {
    const list = raw.split(",").map(s => s.trim()).filter(Boolean);
    return { technical: list, soft: [], tools: [] };
  }
  return { technical: [], soft: [], tools: [] };
}

// ── Migrate old project shape → new shape ────────────────────────────────────
function migrateProject(p) {
  return {
    id:          p.id          ?? makeId("proj"),
    name:        p.name        ?? "",
    description: p.description ?? "",
    // new fields
    techStack:   Array.isArray(p.techStack) ? p.techStack
                 : (p.tech ? p.tech.split(",").map(s => s.trim()).filter(Boolean) : []),
    liveUrl:     p.liveUrl  ?? p.link ?? "",
    githubUrl:   p.githubUrl ?? "",
  };
}

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return EMPTY_DATA;
    const parsed = JSON.parse(raw);
    return {
      personal:   { ...EMPTY_DATA.personal,   ...(parsed.personal   ?? {}) },
      summary:    parsed.summary    ?? "",
      education:  parsed.education  ?? [],
      experience: parsed.experience ?? [],
      projects:   (parsed.projects  ?? []).map(migrateProject),
      skills:     migrateSkills(parsed.skills),
      links:      { ...EMPTY_DATA.links,       ...(parsed.links      ?? {}) },
    };
  } catch {
    return EMPTY_DATA;
  }
}

function saveToStorage(data) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(data));
  } catch {}
}

export function useResumeState() {
  const [resume, setResume] = useState(() => loadFromStorage());

  // Auto-save on every change
  useEffect(() => { saveToStorage(resume); }, [resume]);

  // ── Reset / sample ────────────────────────────────────────────────────────
  const loadSample = useCallback(() => setResume(SAMPLE_DATA), []);
  const clearAll   = useCallback(() => {
    setResume(EMPTY_DATA);
    localStorage.removeItem(LS_KEY);
  }, []);

  // ── Scalars ───────────────────────────────────────────────────────────────
  const setPersonal = useCallback((field, value) =>
    setResume(r => ({ ...r, personal: { ...r.personal, [field]: value } })), []);
  const setSummary  = useCallback(value =>
    setResume(r => ({ ...r, summary: value })), []);
  const setLinks    = useCallback((field, value) =>
    setResume(r => ({ ...r, links: { ...r.links, [field]: value } })), []);

  // ── Skills — per-category ─────────────────────────────────────────────────
  const setSkillCategory = useCallback((category, tags) =>
    setResume(r => ({
      ...r,
      skills: { ...r.skills, [category]: tags },
    })), []);

  // ── Education ─────────────────────────────────────────────────────────────
  const addEducation = useCallback(() =>
    setResume(r => ({
      ...r,
      education: [...r.education, { id: makeId("edu"), institution: "", degree: "", year: "", grade: "" }],
    })), []);
  const updateEducation = useCallback((id, field, value) =>
    setResume(r => ({
      ...r,
      education: r.education.map(e => e.id === id ? { ...e, [field]: value } : e),
    })), []);
  const removeEducation = useCallback(id =>
    setResume(r => ({ ...r, education: r.education.filter(e => e.id !== id) })), []);

  // ── Experience ────────────────────────────────────────────────────────────
  const addExperience = useCallback(() =>
    setResume(r => ({
      ...r,
      experience: [...r.experience, { id: makeId("exp"), company: "", role: "", duration: "", description: "" }],
    })), []);
  const updateExperience = useCallback((id, field, value) =>
    setResume(r => ({
      ...r,
      experience: r.experience.map(e => e.id === id ? { ...e, [field]: value } : e),
    })), []);
  const removeExperience = useCallback(id =>
    setResume(r => ({ ...r, experience: r.experience.filter(e => e.id !== id) })), []);

  // ── Projects — new shape ──────────────────────────────────────────────────
  const addProject = useCallback(() =>
    setResume(r => ({
      ...r,
      projects: [
        ...r.projects,
        { id: makeId("proj"), name: "", description: "", techStack: [], liveUrl: "", githubUrl: "" },
      ],
    })), []);
  const updateProject = useCallback((id, field, value) =>
    setResume(r => ({
      ...r,
      projects: r.projects.map(p => p.id === id ? { ...p, [field]: value } : p),
    })), []);
  const removeProject = useCallback(id =>
    setResume(r => ({ ...r, projects: r.projects.filter(p => p.id !== id) })), []);

  return {
    resume, loadSample, clearAll,
    setPersonal, setSummary, setLinks,
    setSkillCategory,
    addEducation,  updateEducation,  removeEducation,
    addExperience, updateExperience, removeExperience,
    addProject,    updateProject,    removeProject,
  };
}
