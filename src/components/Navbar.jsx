import Badge from "./Badge";
import Icon from "./Icons";

/**
 * Sticky top navigation bar.
 * Props:
 *   scrolled   — boolean, true when page has scrolled past 40 px
 *   onEnroll   — callback to open the enrollment modal
 *   onMenuToggle — callback to toggle the mobile menu
 */
export default function Navbar({ scrolled, onEnroll, onMenuToggle }) {
  return (
    <nav className={`nav${scrolled ? " scrolled" : ""}`}>
      <a href="#top" className="nav-brand" aria-label="Radiant Glory Academy home">
        <Badge size={40} />
        <span className="nav-brand-text">RADIANT GLORY<br />ACADEMY</span>
      </a>

      <ul className="nav-links">
        <li><a href="#about">About</a></li>
        <li><a href="#programs">Programs</a></li>
        <li><a href="#online">Online</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>

      <div className="nav-right">
        <div className="nav-socials">
          <a href="#" aria-label="Facebook">{Icon.facebook}</a>    {/* TODO SOCIAL LINK */}
          <a href="#" aria-label="Instagram">{Icon.instagram}</a>  {/* TODO SOCIAL LINK */}
          <a href="#" aria-label="X (Twitter)">{Icon.x}</a>        {/* TODO SOCIAL LINK */}
          <a href="#" aria-label="WhatsApp">{Icon.whatsapp}</a>    {/* TODO SOCIAL LINK */}
        </div>
        <button className="nav-cta" id="nav-enroll-btn" onClick={onEnroll}>
          Enroll Now
        </button>
        <button className="hamburger" aria-label="Toggle menu" onClick={onMenuToggle}>
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}
