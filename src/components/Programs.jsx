import Icon from "./Icons";
import { PROGRAMS } from "../constants";

/**
 * Programs section — 4-column grid of program cards.
 * Props:
 *   onEnroll — callback to open the enrollment modal
 */
export default function Programs({ onEnroll }) {
  return (
    <section className="section programs-section" id="programs">
      <div className="programs-header">
        <span className="eyebrow">Admission is open</span>
        <h2>Programs across every stage</h2>
        <p className="section-lead">
          Purchase your admission form for any of the sections below.
        </p>
      </div>

      <div className="program-grid">
        {PROGRAMS.map(({ emoji, title, desc, color }) => (
          <div className="program-card" key={title}>
            <div className="program-icon" style={{ background: color }}>
              {emoji}
            </div>
            <h3>{title}</h3>
            <p>{desc}</p>
            <button
              className="program-cta"
              onClick={onEnroll}
              style={{ color }}
            >
              Enroll {Icon.chevron}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
