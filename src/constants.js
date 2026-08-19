// ---------------------------------------------------------------------------
// CONFIG — edit these before going live
// ---------------------------------------------------------------------------

/** School email used for the mailto fallback */
export const SCHOOL_EMAIL = "admissions@radiantgloryacademy.com"; // TODO: replace

/**
 * EmailJS credentials — see setup docs at the top of App.jsx.
 * Leave as "YOUR_…" placeholders until you've created an EmailJS account.
 */
export const EMAILJS_CONFIG = {
  serviceId:  "YOUR_SERVICE_ID",
  templateId: "YOUR_TEMPLATE_ID",
  publicKey:  "YOUR_PUBLIC_KEY",
};

/** Hero slideshow images. Replace src values with real school photos. */
export const SLIDES = [
  {
    src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1600&q=80",
    label: "Students learning together",
  },
  {
    src: "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1600&q=80",
    label: "ICT lab",
  },
  {
    src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=80",
    label: "Physics lab",
  },
  {
    src: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1600&q=80",
    label: "Chemistry lab",
  },
];

/** All class levels shown in the enrollment form. */
export const CLASS_OPTIONS = [
  "Nursery 1", "Nursery 2", "Nursery 3",
  "Primary 1", "Primary 2", "Primary 3", "Primary 4", "Primary 5",
  "JSS 1", "JSS 2", "JSS 3",
  "SSS 1", "SSS 2", "SSS 3",
];

/** Online subjects offered (also shown as chips on the Online section). */
export const SUBJECT_OPTIONS = ["Mathematics", "English", "Igbo", "Coding", "Design"];

/** Program cards data. */
export const PROGRAMS = [
  {
    emoji: "🌱",
    title: "Nursery 1 – 3",
    desc: "Early foundations in a warm, guided setting. Play-based learning that sparks curiosity.",
    color: "#3CB731",
  },
  {
    emoji: "📚",
    title: "Primary 1 – 5",
    desc: "Core literacy, numeracy and creative skills. Strong academic base with holistic growth.",
    color: "#1AA896",
  },
  {
    emoji: "🔬",
    title: "JSS 1 – 3",
    desc: "Junior secondary, building toward WAEC/NECO readiness with science and arts tracks.",
    color: "#E84B1A",
  },
  {
    emoji: "🎓",
    title: "SSS 1 – 3",
    desc: "Senior secondary with focused exam preparation, subject specialization and career guidance.",
    color: "#F5C518",
  },
];

/** Steps shown in the Online section. */
export const ONLINE_STEPS = [
  ["1", "Choose 'Online'",   "Select Online when you enroll and pick the subjects you need."],
  ["2", "Set availability",  "Tell us when you're free, e.g. Monday 2pm–5pm (UTC+1)."],
  ["3", "Confirm & start",   "We reply by email to confirm your very first session."],
];
