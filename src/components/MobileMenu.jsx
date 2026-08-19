/**
 * Full-screen mobile navigation drawer.
 * Props:
 *   onClose  — callback to close the menu (called after each link click)
 *   onEnroll — callback to open the enrollment modal
 */
export default function MobileMenu({ onClose, onEnroll }) {
  const handleEnroll = () => { onClose(); onEnroll(); };

  return (
    <div className="mobile-menu">
      <a href="#about"    onClick={onClose}>About</a>
      <a href="#programs" onClick={onClose}>Programs</a>
      <a href="#online"   onClick={onClose}>Online Learning</a>
      <a href="#contact"  onClick={onClose}>Contact</a>
      <button className="btn-primary-orange" onClick={handleEnroll}>
        Enroll Now
      </button>
    </div>
  );
}
