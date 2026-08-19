/** Shield-and-star emblem that echoes the school badge colours. */
export default function Badge({ size = 44 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id="sg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1A6B12"/>
          <stop offset="100%" stopColor="#3CB731"/>
        </linearGradient>
      </defs>
      <path
        d="M32 3 L58 12 V30 C58 46 47 57 32 61 C17 57 6 46 6 30 V12 Z"
        fill="url(#sg)"
        stroke="#F5C518"
        strokeWidth="2.5"
      />
      <circle
        cx="32" cy="30" r="13"
        fill="rgba(255,255,255,0.1)"
        stroke="rgba(255,255,255,0.25)"
        strokeWidth="1"
      />
      <path
        d="M32 17 l3.5 7.1 7.8 1.1-5.6 5.5 1.3 7.8L32 34.7l-7 3.8 1.3-7.8-5.6-5.5 7.8-1.1z"
        fill="#F5C518"
      />
    </svg>
  );
}
