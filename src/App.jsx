import React, { useState, useEffect, useRef } from "react";
import "./App.css";

const SCHOOL_EMAIL = "admissions@radiantgloryacademy.com";

const EMAILJS_CONFIG = {
  serviceId: "YOUR_SERVICE_ID",
  templateId: "YOUR_TEMPLATE_ID",
  publicKey: "YOUR_PUBLIC_KEY",
};

const SLIDES = [
  { src: "https://images.pexels.com/photos/12448839/pexels-photo-12448839.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop", label: "Nigerian students learning in classroom" },
  { src: "https://images.pexels.com/photos/12714654/pexels-photo-12714654.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop", label: "Students studying together" },
  { src: "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1600&q=80", label: "ICT lab" },
  { src: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1600&q=80", label: "Science lab" },
];

const CLASS_OPTIONS = [
  "Nursery 1","Nursery 2","Nursery 3",
  "Primary 1","Primary 2","Primary 3","Primary 4","Primary 5",
  "JSS 1","JSS 2","JSS 3",
  "SSS 1","SSS 2","SSS 3",
];

const GRADE_EQ = {
  "Nursery 1": "Age 3–4", "Nursery 2": "Age 4–5", "Nursery 3": "Age 5–6",
  "Primary 1": "Grade 1", "Primary 2": "Grade 2", "Primary 3": "Grade 3",
  "Primary 4": "Grade 4", "Primary 5": "Grade 5",
  "JSS 1": "Grade 7", "JSS 2": "Grade 8", "JSS 3": "Grade 9",
  "SSS 1": "Grade 10", "SSS 2": "Grade 11", "SSS 3": "Grade 12",
};

const SUBJECT_OPTIONS = ["Mathematics","English","Igbo","Coding","Design"];

const Icon = {
  facebook: <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M13.5 22v-8.5H16l.5-3.5h-3V7.8c0-1 .3-1.7 1.7-1.7H16.6V3c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.8H7v3.5h2.9V22h3.6z"/></svg>,
  instagram: <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 2.2c2.7 0 3 0 4.1.06 1 .05 1.6.2 1.9.34.5.2.8.4 1.2.8.4.4.6.7.8 1.2.14.4.3 1 .34 1.9.06 1.1.06 1.4.06 4.1s0 3-.06 4.1c-.05 1-.2 1.6-.34 1.9-.2.5-.4.8-.8 1.2-.4.4-.7.6-1.2.8-.4.14-1 .3-1.9.34-1.1.06-1.4.06-4.1.06s-3 0-4.1-.06c-1-.05-1.6-.2-1.9-.34-.5-.2-.8-.4-1.2-.8-.4-.4-.6-.7-.8-1.2-.14-.4-.3-1-.34-1.9C2 15 2 14.7 2 12s0-3 .06-4.1c.05-1 .2-1.6.34-1.9.2-.5.4-.8.8-1.2.4-.4.7-.6 1.2-.8.4-.14 1-.3 1.9-.34C7.4 2.2 7.7 2.2 10.4 2.2H12zm0 1.8H10.4c-2.6 0-2.9 0-3.9.06-.8.04-1.3.16-1.6.27-.4.15-.7.34-1 .63-.3.3-.48.6-.63 1-.1.3-.23.8-.27 1.6-.05 1-.06 1.3-.06 3.9s0 2.9.06 3.9c.04.8.16 1.3.27 1.6.15.4.34.7.63 1 .3.3.6.48 1 .63.3.1.8.23 1.6.27 1 .05 1.3.06 3.9.06s2.9 0 3.9-.06c.8-.04 1.3-.16 1.6-.27.4-.15.7-.34 1-.63.3-.3.48-.6.63-1 .1-.3.23-.8.27-1.6.05-1 .06-1.3.06-3.9s0-2.9-.06-3.9c-.04-.8-.16-1.3-.27-1.6-.15-.4-.34-.7-.63-1-.3-.3-.6-.48-1-.63-.3-.1-.8-.23-1.6-.27-1-.05-1.3-.06-3.9-.06zM12 6.9a5.1 5.1 0 1 1 0 10.2 5.1 5.1 0 0 1 0-10.2zm0 1.8a3.3 3.3 0 1 0 0 6.6 3.3 3.3 0 0 0 0-6.6zm5.3-2a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4z"/></svg>,
  x: <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M18.9 2H22l-7.4 8.4L23.3 22h-6.8l-5.3-6.9L5 22H1.9l7.9-9L1 2h6.9l4.8 6.3L18.9 2zm-1.2 18h1.9L7.4 3.9H5.4L17.7 20z"/></svg>,
  whatsapp: <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm0 1.8a8.2 8.2 0 0 1 6.9 12.6l-.2.4.9 3.3-3.4-.9-.4.2A8.2 8.2 0 1 1 12 3.8zm-3.4 4.5c-.2 0-.5 0-.7.3-.2.3-.9.9-.9 2.1 0 1.2.9 2.4 1 2.6.1.1 1.8 2.9 4.4 4 2.2.9 2.6.7 3.1.7.5-.1 1.7-.7 1.9-1.4.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.5-.3-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1-.2.3-.6.8-.7.9-.1.2-.3.2-.5.1-.3-.1-1.1-.4-2-1.3-.8-.7-1.3-1.6-1.4-1.8-.1-.2 0-.4.1-.5l.4-.4c.1-.1.2-.3.2-.4.1-.2 0-.3 0-.5-.1-.1-.6-1.5-.9-2-.2-.5-.4-.4-.6-.4z"/></svg>,
  chevron: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" width="14" height="14"><path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  close: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><path d="M6 6l12 12M18 6L6 18" strokeLinecap="round"/></svg>,
  location: <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>,
  mail: <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>,
};

function Badge({ size = 44 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id="sg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1A6B12"/>
          <stop offset="100%" stopColor="#3CB731"/>
        </linearGradient>
      </defs>
      <path d="M32 3 L58 12 V30 C58 46 47 57 32 61 C17 57 6 46 6 30 V12 Z"
        fill="url(#sg)" stroke="#F5C518" strokeWidth="2.5"/>
      <circle cx="32" cy="30" r="13" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.25)" strokeWidth="1"/>
      <path d="M32 17 l3.5 7.1 7.8 1.1-5.6 5.5 1.3 7.8L32 34.7l-7 3.8 1.3-7.8-5.6-5.5 7.8-1.1z" fill="#F5C518"/>
    </svg>
  );
}

function StarDecor({ color = "#F5C518", size = 24, style = {} }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill={color} style={style} aria-hidden="true">
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
    </svg>
  );
}

function SubjectPicker({ selected, onToggle }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="subject-picker" ref={ref}>
      <span className="field-label">Subjects <span className="req">*</span></span>
      <div className="subject-display" onClick={() => setOpen(o => !o)}>
        {selected.length === 0
          ? <span className="subject-placeholder">Select subjects...</span>
          : selected.map(s => (
            <span className="subject-tag" key={s}>
              {s}
              <button type="button" className="subject-tag-x" onClick={e => { e.stopPropagation(); onToggle(s); }}>&times;</button>
            </span>
          ))
        }
        <svg className={`subject-chevron${open ? " open" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16"><path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>
      {open && (
        <div className="subject-dropdown">
          {SUBJECT_OPTIONS.map(s => (
            <button type="button" key={s}
              className={`subject-option${selected.includes(s) ? " selected" : ""}`}
              onClick={() => onToggle(s)}>
              <span className="subject-option-check">{selected.includes(s) ? "✓" : ""}</span>
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function EnrollModal({ open, onClose }) {
  const [mode, setMode] = useState("physical");
  const [form, setForm] = useState({
    parentName: "", studentName: "", parentEmail: "",
    parentPhone: "", className: "", subjects: [], availability: "",
  });
  const [status, setStatus] = useState("idle");
  const firstRef = useRef(null);

  useEffect(() => {
    if (open) {
      setStatus("idle");
      document.body.style.overflow = "hidden";
      setTimeout(() => firstRef.current?.focus(), 80);
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const toggleSubject = s => setForm(f => ({
    ...f,
    subjects: f.subjects.includes(s) ? f.subjects.filter(x => x !== s) : [...f.subjects, s],
  }));

  const buildMailto = () => {
    const subj = encodeURIComponent(`Admission Enquiry — ${form.studentName || "New Student"}`);
    const lines = [
      `Parent's name: ${form.parentName}`,
      `Student's name: ${form.studentName}`,
      `Parent's email: ${form.parentEmail}`,
      `Parent's phone: ${form.parentPhone}`,
      `Mode: ${mode === "online" ? "Online" : "Physical"}`,
      `Class: ${form.className}`,
      ...(mode === "online" ? [`Subjects: ${form.subjects.join(", ")}`, `Availability: ${form.availability}`] : []),
    ];
    return `mailto:${SCHOOL_EMAIL}?subject=${subj}&body=${encodeURIComponent(lines.join("\n"))}`;
  };

  const validate = () => {
    if (!form.parentName.trim() || !form.studentName.trim() || !form.className) return false;
    if (!form.parentEmail.trim() && !form.parentPhone.trim()) return false;
    if (mode === "online" && (form.subjects.length === 0 || !form.availability.trim())) return false;
    return true;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) { setStatus("error"); return; }
    setStatus("submitting");
    try {
      if (EMAILJS_CONFIG.serviceId !== "YOUR_SERVICE_ID") {
        const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            service_id: EMAILJS_CONFIG.serviceId,
            template_id: EMAILJS_CONFIG.templateId,
            user_id: EMAILJS_CONFIG.publicKey,
            template_params: {
              parent_name: form.parentName, student_name: form.studentName,
              parent_email: form.parentEmail, parent_phone: form.parentPhone,
              mode: mode === "online" ? "Online" : "Physical",
              student_class: form.className,
              subjects: mode === "online" ? form.subjects.join(", ") : "N/A",
              availability: mode === "online" ? form.availability : "N/A",
            },
          }),
        });
        if (!res.ok) throw new Error("EmailJS failed");
      }
      setStatus("success");
    } catch { setStatus("error"); }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-panel" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Enrollment form">
        <button className="modal-close" onClick={onClose} aria-label="Close">{Icon.close}</button>

        {status === "success" ? (
          <div className="modal-success">
            <Badge size={56}/>
            <h3>Enrollment Request Sent! 🎉</h3>
            <p>Thank you, <strong>{form.parentName.split(" ")[0] || "there"}</strong>. We'll email you shortly to confirm your child's place.</p>
            <a className="btn-outline-green" href={buildMailto()}>Send via email instead</a>
            <button className="btn-primary-green btn-block" onClick={onClose}>Done</button>
          </div>
        ) : (
          <>
            <div className="modal-header">
              <Badge size={42}/>
              <div>
                <h3 className="modal-title">Enroll at Radiant Glory Academy</h3>
                <p className="modal-subtitle">Fill in the details — we'll email you to confirm.</p>
              </div>
            </div>

            <div className="mode-toggle">
              <button type="button" className={`mode-btn${mode === "physical" ? " active" : ""}`} onClick={() => setMode("physical")}>🏫 Physical</button>
              <button type="button" className={`mode-btn${mode === "online" ? " active" : ""}`} onClick={() => setMode("online")}>💻 Online</button>
            </div>

            <form onSubmit={handleSubmit} className="enroll-form">
              <label>
                Parent's name <span className="req">*</span>
                <input ref={firstRef} type="text" value={form.parentName} onChange={e => update("parentName", e.target.value)} placeholder="e.g. Chidinma Okafor"/>
              </label>
              <label>
                Student's name <span className="req">*</span>
                <input type="text" value={form.studentName} onChange={e => update("studentName", e.target.value)} placeholder="e.g. David Okafor"/>
              </label>
              <div className="field-row">
                <label>
                  Parent's email
                  <input type="email" value={form.parentEmail} onChange={e => update("parentEmail", e.target.value)} placeholder="you@example.com"/>
                </label>
                <label>
                  Parent's phone
                  <input type="tel" value={form.parentPhone} onChange={e => update("parentPhone", e.target.value)} placeholder="080..."/>
                </label>
              </div>
              <label>
                Class <span className="req">*</span>
                <select value={form.className} onChange={e => update("className", e.target.value)}>
                  <option value="">Select class</option>
                  {CLASS_OPTIONS.map(c => (
                    <option key={c} value={c}>
                      {c}{mode === "online" && GRADE_EQ[c] ? ` (${GRADE_EQ[c]})` : ""}
                    </option>
                  ))}
                </select>
              </label>

              {mode === "online" && (
                <div className="online-fields">
                  <SubjectPicker selected={form.subjects} onToggle={toggleSubject}/>
                  <label>
                    Availability <span className="req">*</span>
                    <input type="text" value={form.availability} onChange={e => update("availability", e.target.value)} placeholder="e.g. Monday 2pm–5pm (UTC+1)"/>
                  </label>
                </div>
              )}

              {status === "error" && (
                <p className="form-error">
                  ⚠ Please fill in all required fields{mode === "online" ? " including subjects and availability" : ""}.{" "}
                  <a href={buildMailto()}>Send manually instead</a>.
                </p>
              )}

              <button type="submit" id="enroll-submit-btn" className="btn-primary-green btn-block" disabled={status === "submitting"}>
                {status === "submitting" ? "Sending…" : "Submit Enrollment →"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default function RadiantGloryAcademy() {
  const [modalOpen, setModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openModal = () => { setModalOpen(true); setMenuOpen(false); };

  return (
    <div className="rga-root">

      {loading && (
        <div className="loader-overlay">
          <div className="loader-content">
            <div className="loader-icon">
              <svg viewBox="0 0 64 64" width="72" height="72">
                <defs>
                  <linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1A6B12"/>
                    <stop offset="100%" stopColor="#3CB731"/>
                  </linearGradient>
                </defs>
                <path d="M32 3 L58 12 V30 C58 46 47 57 32 61 C17 57 6 46 6 30 V12 Z"
                  fill="url(#lg)" stroke="#F5C518" strokeWidth="2.5" className="loader-shield"/>
                <path d="M32 17 l3.5 7.1 7.8 1.1-5.6 5.5 1.3 7.8L32 34.7l-7 3.8 1.3-7.8-5.6-5.5 7.8-1.1z"
                  fill="#F5C518" className="loader-star"/>
              </svg>
            </div>
            <span className="loader-name">RADIANT GLORY ACADEMY</span>
            <div className="loader-bar-track">
              <div className="loader-bar-fill"/>
            </div>
          </div>
        </div>
      )}

      {/* NAV */}
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <a href="#top" className="nav-brand">
          <Badge size={40}/>
          <span className="nav-brand-text">RADIANT GLORY<br/>ACADEMY</span>
        </a>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#programs">Programs</a></li>
          <li><a href="#online">Online</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <div className="nav-right">
          <div className="nav-socials">
            <a href="#" aria-label="Facebook">{Icon.facebook}</a>   {/* TODO SOCIAL LINK */}
            <a href="#" aria-label="Instagram">{Icon.instagram}</a> {/* TODO SOCIAL LINK */}
            <a href="#" aria-label="X">{Icon.x}</a>                 {/* TODO SOCIAL LINK */}
            <a href="#" aria-label="WhatsApp">{Icon.whatsapp}</a>   {/* TODO SOCIAL LINK */}
          </div>
          <button className="nav-cta" id="nav-enroll-btn" onClick={openModal}>Enroll Now</button>
          <button className="hamburger" aria-label="Menu" onClick={() => setMenuOpen(o => !o)}>
            <span/><span/><span/>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="mobile-menu">
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#programs" onClick={() => setMenuOpen(false)}>Programs</a>
          <a href="#online" onClick={() => setMenuOpen(false)}>Online Learning</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          <button className="btn-primary-orange" onClick={openModal}>Enroll Now</button>
        </div>
      )}

      {/* HERO */}
      <header className="hero" id="top">
        {SLIDES.map((s, i) => (
          <div key={s.label} className="hero-slide"
            style={{ backgroundImage: `url(${s.src})`, animationDelay: `${i * 6}s` }}
            role="img" aria-label={s.label}/>
        ))}
        <div className="hero-overlay"/>
        <StarDecor size={36} style={{ position:"absolute", top:"20%", right:"9%", opacity:0.75, animation:"floatStar 3s ease-in-out infinite" }}/>
        <StarDecor size={22} color="#fff" style={{ position:"absolute", top:"32%", right:"17%", opacity:0.4, animation:"floatStar 4s ease-in-out infinite 1s" }}/>
        <StarDecor size={28} style={{ position:"absolute", bottom:"30%", right:"7%", opacity:0.6, animation:"floatStar 3.5s ease-in-out infinite 0.5s" }}/>
        <StarDecor size={18} color="#fff" style={{ position:"absolute", top:"15%", right:"25%", opacity:0.35, animation:"floatStar 4.5s ease-in-out infinite 2s" }}/>
        <StarDecor size={24} style={{ position:"absolute", top:"45%", right:"4%", opacity:0.5, animation:"floatStar 3.2s ease-in-out infinite 1.5s" }}/>
        <StarDecor size={16} color="#fff" style={{ position:"absolute", bottom:"22%", right:"18%", opacity:0.3, animation:"floatStar 5s ease-in-out infinite 0.8s" }}/>
        <StarDecor size={20} style={{ position:"absolute", top:"60%", left:"85%", opacity:0.45, animation:"floatStar 3.8s ease-in-out infinite 2.5s" }}/>
        <StarDecor size={14} color="#fff" style={{ position:"absolute", top:"10%", left:"88%", opacity:0.25, animation:"floatStar 4.2s ease-in-out infinite 1.2s" }}/>

        <div className="hero-content">
          <span className="hero-eyebrow">⭐ Nursery · Primary · Secondary ⭐</span>
          <h1>Where every child's <em>light</em> is trained to shine.</h1>
          <p className="hero-sub">
            A nurturing learning community where every child is seen, challenged, and equipped
            to discover their strengths, build confidence, and thrive both in the classroom and
            beyond. With a vibrant on-campus experience and a full online programme, families
            can access quality education from anywhere.
          </p>
          <div className="hero-actions">
            <button className="btn-primary-orange" id="hero-enroll-btn" onClick={openModal}>Enroll Now →</button>
            <a className="btn-hero-outline" href="#programs">See Programs</a>
          </div>
          <p className="hero-tagline">Our Children, Our Future</p>
        </div>
        <div className="scroll-indicator" aria-hidden="true"><span/></div>
      </header>

      {/* ADMISSION STRIP */}
      <div className="admission-strip">
        <span className="strip-label">🎓 ADMISSION! ADMISSION!! ADMISSION!!!</span>
        <span className="strip-sub">Purchase your admission form for any class level.</span>
        <button className="strip-btn" onClick={openModal}>Get Form →</button>
      </div>

      {/* ABOUT */}
      <section className="section about-section" id="about">
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
        <div className="about-card">
          <div className="about-card-header">
            <Badge size={38}/>
            <div>
              <span className="eyebrow" style={{ color:"var(--rga-gold)" }}>At a glance</span>
              <h3 style={{ color:"#fff", fontSize:"1.1rem" }}>Physical &amp; Online</h3>
            </div>
          </div>
          <div className="about-stats">
            <div className="stat-item"><b>4</b><span>School sections</span></div>
            <div className="stat-item"><b>5</b><span>Online subjects</span></div>
            <div className="stat-item"><b>2</b><span>Ways to learn</span></div>
          </div>
          <div className="about-address">
            {Icon.location}
            <p>No. 7 Dominion Close, off Umuchichi Road,<br/>Okpu Umuobo, Aba, Nigeria</p>
          </div>
          <button className="btn-primary-orange" style={{ width:"100%", marginTop:18 }} onClick={openModal}>Enroll today →</button>
        </div>
      </section>

      {/* PROGRAMS */}
      <section className="section programs-section" id="programs">
        <div className="programs-header">
          <span className="eyebrow">Admission is open</span>
          <h2>Programs across every stage</h2>
          <p className="section-lead">Purchase your admission form for any of the sections below.</p>
        </div>
        <div className="program-grid">
          {[
            { emoji:"🌱", title:"Nursery 1 – 3", desc:"Early foundations in a warm, guided setting. Play-based learning that sparks curiosity.", color:"#3CB731" },
            { emoji:"📚", title:"Primary 1 – 5", desc:"Core literacy, numeracy and creative skills. Strong academic base with holistic growth.", color:"#1AA896" },
            { emoji:"🔬", title:"JSS 1 – 3", desc:"Junior secondary, building toward WAEC/NECO readiness with science and arts tracks.", color:"#E84B1A" },
            { emoji:"🎓", title:"SSS 1 – 3", desc:"Senior secondary with focused exam preparation, subject specialization and career guidance.", color:"#F5C518" },
          ].map(({ emoji, title, desc, color }) => (
            <div className="program-card" key={title}>
              <div className="program-icon" style={{ background: color }}>{emoji}</div>
              <h3>{title}</h3>
              <p>{desc}</p>
              <button className="program-cta" onClick={openModal} style={{ color }}>Enroll {Icon.chevron}</button>
            </div>
          ))}
        </div>
      </section>

      {/* ONLINE */}
      <section className="section-tight online-wrapper" id="online">
        <div className="online">
          <div className="online-text">
            <span className="eyebrow" style={{ color:"var(--rga-gold)" }}>Learn from anywhere</span>
            <h2>The Online Programme</h2>
            <p className="section-lead" style={{ color:"rgba(255,255,255,0.85)" }}>
              Students join live one-to-one or small-group sessions in the subjects they need most.
              You pick the days and times that work, and we schedule around it.
            </p>
            <div className="online-chips">
              {SUBJECT_OPTIONS.map(s => <span className="online-chip" key={s}>{s}</span>)}
            </div>
          </div>
          <div className="online-steps">
            {[
              ["1","Choose 'Online'","Select Online when you enroll and pick the subjects you need."],
              ["2","Set availability","Tell us when you're free, e.g. Monday 2pm–5pm (UTC+1)."],
              ["3","Confirm & start","We reply by email to confirm your very first session."],
            ].map(([num, head, body]) => (
              <div className="step-card" key={num}>
                <div className="step-num">{num}</div>
                <div><b>{head}</b><p>{body}</p></div>
              </div>
            ))}
            <button className="btn-primary-orange" style={{ width:"100%" }} onClick={openModal}>Enroll online →</button>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <div className="cta-banner">
        <StarDecor size={60} color="rgba(255,255,255,0.08)" style={{ position:"absolute", left:30, top:"-10px" }}/>
        <StarDecor size={40} color="rgba(255,255,255,0.06)" style={{ position:"absolute", right:80, bottom:10 }}/>
        <div className="cta-content">
          <span className="eyebrow" style={{ color:"var(--rga-gold)" }}>Don't wait</span>
          <h2>Admission forms are open for the new session.</h2>
          <p>Secure your child's place today — spaces fill up fast.</p>
        </div>
        <button className="cta-btn" id="cta-enroll-btn" onClick={openModal}>Start Enrollment →</button>
      </div>

      {/* FOOTER */}
      <footer id="contact">
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-col">
              <div className="nav-brand" style={{ marginBottom:16 }}>
                <Badge size={36}/><span className="nav-brand-text">RADIANT GLORY<br/>ACADEMY</span>
              </div>
              <p>Quality education from Nursery through Senior Secondary — both in person and online.</p>
              <div className="footer-socials">
                <a href="#" aria-label="Facebook">{Icon.facebook}</a>   {/* TODO SOCIAL LINK */}
                <a href="#" aria-label="Instagram">{Icon.instagram}</a> {/* TODO SOCIAL LINK */}
                <a href="#" aria-label="X">{Icon.x}</a>                 {/* TODO SOCIAL LINK */}
                <a href="#" aria-label="WhatsApp">{Icon.whatsapp}</a>   {/* TODO SOCIAL LINK */}
              </div>
            </div>
            <div className="footer-col">
              <h4>Explore</h4>
              <ul className="footer-links">
                <li><a href="#about">About Us</a></li>
                <li><a href="#programs">Programs</a></li>
                <li><a href="#online">Online Learning</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Contact Us</h4>
              <ul className="footer-links">
                <li><span className="footer-contact-item">{Icon.location} No. 7 Dominion Close, off Umuchichi Road, Okpu Umuobo, Aba, Nigeria</span></li>
                <li><a href={`mailto:${SCHOOL_EMAIL}`} className="footer-contact-item">{Icon.mail} {SCHOOL_EMAIL}</a></li>
              </ul>
              <button className="btn-primary-orange" style={{ marginTop:20 }} onClick={openModal}>Enroll now →</button>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Radiant Glory Academy. All rights reserved.</span>
            <span className="footer-motto">Our Children, Our Future ✨</span>
          </div>
        </div>
      </footer>

      <EnrollModal open={modalOpen} onClose={() => setModalOpen(false)}/>
    </div>
  );
}
