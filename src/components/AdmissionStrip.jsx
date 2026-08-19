/**
 * Green announcement strip below the hero.
 * Props:
 *   onEnroll — callback to open the enrollment modal
 */
export default function AdmissionStrip({ onEnroll }) {
  return (
    <div className="admission-strip">
      <span className="strip-label">🎓 ADMISSION! ADMISSION!! ADMISSION!!!</span>
      <span className="strip-sub">Purchase your admission form for any class level.</span>
      <button className="strip-btn" onClick={onEnroll}>Get Form →</button>
    </div>
  );
}
