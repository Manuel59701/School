import StarDecor from "./StarDecor";
import { SLIDES } from "../constants";

/**
 * Full-viewport Ken Burns hero with floating stars and a scroll indicator.
 * Props:
 *   onEnroll — callback to open the enrollment modal
 */
export default function Hero({ onEnroll }) {
  return (
    <header className="hero" id="top">
      {/* Slideshow layers */}
      {SLIDES.map((s, i) => (
        <div
          key={s.label}
          className="hero-slide"
          style={{
            backgroundImage: `url(${s.src})`,
            animationDelay: `${i * 6}s`,
          }}
          role="img"
          aria-label={s.label}
        />
      ))}

      {/* Dark gradient overlay */}
      <div className="hero-overlay" />

      {/* Floating decorative stars */}
      <StarDecor
        size={36}
        style={{ position:"absolute", top:"20%", right:"9%", opacity:0.75,
          animation:"floatStar 3s ease-in-out infinite" }}
      />
      <StarDecor
        size={22}
        color="#fff"
        style={{ position:"absolute", top:"32%", right:"17%", opacity:0.4,
          animation:"floatStar 4s ease-in-out infinite 1s" }}
      />
      <StarDecor
        size={28}
        style={{ position:"absolute", bottom:"30%", right:"7%", opacity:0.6,
          animation:"floatStar 3.5s ease-in-out infinite 0.5s" }}
      />

      {/* Main copy */}
      <div className="hero-content">
        <span className="hero-eyebrow">⭐ Nursery · Primary · Secondary ⭐</span>
        <h1>
          Where every child's <em>light</em> is trained to shine.
        </h1>
        <p className="hero-sub">
          A nurturing learning community where every child is seen, challenged, and equipped to discover their strengths, build confidence, and thrive—both in the classroom and beyond. With a vibrant on-campus experience and a full online programme, families can access quality education from anywhere.
        </p>
        <div className="hero-actions">
          <button
            className="btn-primary-orange"
            id="hero-enroll-btn"
            onClick={onEnroll}
          >
            Enroll Now →
          </button>
          <a className="btn-hero-outline" href="#programs">See Programs</a>
        </div>
        <p className="hero-tagline">Our Children, Our Future</p>
      </div>

      {/* Scroll cue */}
      <div className="scroll-indicator" aria-hidden="true"><span /></div>
    </header>
  );
}
