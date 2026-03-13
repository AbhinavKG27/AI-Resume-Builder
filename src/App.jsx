import { useState, useCallback } from "react";
import { useResumeState } from "./hooks/useResumeState";

import TopNav      from "./components/TopNav";
import HomePage    from "./pages/HomePage";
import BuilderPage from "./pages/BuilderPage";
import PreviewPage from "./pages/PreviewPage";
import ProofPage   from "./pages/ProofPage";

import "./styles/global.css";

export default function App() {
  const [route, setRoute] = useState("/");
  const nav = useCallback((r) => { setRoute(r); window.scrollTo(0, 0); }, []);

  // All resume state lives here and is passed down
  const resumeState = useResumeState();
  const { resume } = resumeState;

  // Bundle all mutation handlers for BuilderPage
  const handlers = {
    loadSample:       resumeState.loadSample,
    clearAll:         resumeState.clearAll,
    setPersonal:      resumeState.setPersonal,
    setSummary:       resumeState.setSummary,
    setSkills:        resumeState.setSkills,
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

  // Hide topnav on home (it has its own CTA bar)
  const showNav = true;

  return (
    <>
      {showNav && <TopNav route={route} nav={nav} />}

      {route === "/"         && <HomePage    nav={nav} />}
      {route === "/builder"  && <BuilderPage resume={resume} handlers={handlers} nav={nav} />}
      {route === "/preview"  && <PreviewPage resume={resume} nav={nav} />}
      {route === "/proof"    && <ProofPage   nav={nav} />}
    </>
  );
}
