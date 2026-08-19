import Badge from "./Badge";
import Icon from "./Icons";

/**
 * About section — two-column layout with copy on the left
 * and a dark-green stats card on the right.
 * Props:
 *   onEnroll — callback to open the enrollment modal
 */
export default function About({ onEnroll }) {
  return (
    <section className="section about-section" id="about">
      {/* Left column — copy */}
      <div className="about-text">
        <span className="eyebrow">Our Children, Our Future</span>
        <h2>A school built for the classroom — and for the screen.</h2>
        <p className="section-lead">
          Radiant Glory Academy runs a full physical campus alongside a
          structured online programme, so families can choose the format
          that fits their child without compromising on attention or
          academic rigour.
        </p>
        <div className="about-highlights">
          <div className="highlight-chip">✅ Qualified teachers</div>
          <div className="highlight-chip">✅ Small class sizes</div>
          <div className="highlight-chip">✅ Live online sessions</div>
          <div className="highlight-chip">✅ Flexible scheduling</div>
        </div>
      </div>

      {/* Right column — stat card */}
      <div className="about-card">
        <div className="about-card-header">
          <Badge size={38} />
          <div>
            <span className="eyebrow" style={{ color: "var(--rga-gold)" }}>At a glance</span>
            <h3 style={{ color: "#fff", fontSize: "1.1rem" }}>Physical &amp; Online</h3>
          </div>
        </div>

        <div className="about-stats">
          <div className="stat-item"><b>4</b><span>School sections</span></div>
          <div className="stat-item"><b>5</b><span>Online subjects</span></div>
          <div className="stat-item"><b>2</b><span>Ways to learn</span></div>
        </div>

        <div className="about-address">
          {Icon.location}
          <p>No. 7 Dominion Close, off Umuchichi Road,<br />Okpu Umuobo, Aba, Nigeria</p>
        </div>

        <button
          className="btn-primary-orange"
          style={{ width: "100%", marginTop: 18 }}
          onClick={onEnroll}
        >
          Enroll today →
        </button>
      </div>
    </section>
  );
}
