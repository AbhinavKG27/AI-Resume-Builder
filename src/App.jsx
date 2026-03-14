// 📁 Location: src/App.jsx  ← MODIFIED
// Added: useAppTheme hook wired to TopNav toggle

import { useState, useCallback } from "react";
import { useResumeState }   from "./hooks/useResumeState";
import { useTemplateState } from "./hooks/useTemplateState";
import { useThemeState }    from "./hooks/useThemeState";
import { useAppTheme }      from "./hooks/useAppTheme";

import TopNav      from "./components/TopNav";
import HomePage    from "./pages/HomePage";
import BuilderPage from "./pages/BuilderPage";
import PreviewPage from "./pages/PreviewPage";
import ProofPage   from "./pages/ProofPage";

import "./styles/global.css";
import "./styles/templates.css";

export default function App() {
  const [route, setRoute] = useState("/");
  const nav = useCallback((r) => { setRoute(r); window.scrollTo(0, 0); }, []);

  const resumeState               = useResumeState();
  const { template, setTemplate } = useTemplateState();
  const { themeId, setTheme }     = useThemeState();
  const { isDark, toggle }        = useAppTheme();
  const { resume } = resumeState;

  const handlers = {
    loadSample:       resumeState.loadSample,
    clearAll:         resumeState.clearAll,
    setPersonal:      resumeState.setPersonal,
    setSummary:       resumeState.setSummary,
    setSkillCategory: resumeState.setSkillCategory,
    setLinks:         resumeState.setLinks,
    addEducation:     resumeState.addEducation,
    updateEducation:  resumeState.updateEducation,
    removeEducation:  resumeState.removeEducation,
    addExperience:    resumeState.addExperience,
    updateExperience: resumeState.updateExperience,
    removeExperience: resumeState.removeExperience,
    addProject:       resumeState.addProject,
    updateProject:    resumeState.updateProject,
    removeProject:    resumeState.removeProject,
  };

  return (
    <>
      <TopNav
        route={route}
        nav={nav}
        isDark={isDark}
        onToggleTheme={toggle}
      />

      {route === "/"        && <HomePage nav={nav} />}

      {route === "/builder" && (
        <BuilderPage
          resume={resume}
          handlers={handlers}
          template={template}
          setTemplate={setTemplate}
          themeId={themeId}
          setTheme={setTheme}
          nav={nav}
        />
      )}

      {route === "/preview" && (
        <PreviewPage
          resume={resume}
          template={template}
          setTemplate={setTemplate}
          themeId={themeId}
          setTheme={setTheme}
          nav={nav}
        />
      )}

      {route === "/proof" && <ProofPage nav={nav} />}
    </>
  );
}
