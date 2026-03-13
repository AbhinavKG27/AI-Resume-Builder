// StepRail — fixed left sidebar showing all 8 steps + proof icon.
// Locked steps show a padlock and are not clickable.

import Icon from "./Icon";
import { STEPS } from "../data/steps";
import "./StepRail.css";

export default function StepRail({ currentRoute, artifacts, isStepUnlocked, nav }) {
  return (
    <nav className="step-rail">
      {STEPS.map(s => {
        const done     = !!artifacts[`rb_step_${s.id}_artifact`];
        const current  = s.route === currentRoute;
        const unlocked = isStepUnlocked(s.id);

        return (
          <div
            key={s.id}
            className={[
              "rail-step",
              current  ? "current" : "",
              done     ? "done"    : "",
              !unlocked ? "locked" : "",
            ].join(" ")}
            title={unlocked ? s.label : `Complete Step ${s.id - 1} to unlock`}
            onClick={() => unlocked && nav(s.route)}
          >
            {done     ? <Icon name="check" size={14} />  :
             !unlocked ? <Icon name="lock"  size={12} /> :
             <span className="rail-step-num">{s.tag}</span>}
          </div>
        );
      })}

      {/* Proof trophy at the bottom */}
      <div
        className={`rail-proof ${currentRoute === "/rb/proof" ? "active" : ""}`}
        title="Proof of Work"
        onClick={() => nav("/rb/proof")}
      >
        <Icon name="trophy" size={15} />
      </div>
    </nav>
  );
}
