// Original delicate line-art illustrations (sepia/gold on cream), echoing the
// hand-drawn engravings in the reference invitation — drawn from scratch here.

const SEPIA = '#9A6B4B'

// A grand symmetric venue (palace / convention hall) engraving.
export function PalaceIllustration({ className = '', color = SEPIA }) {
  return (
    <svg
      viewBox="0 0 340 190"
      className={className}
      fill="none"
      stroke={color}
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* ground line */}
      <path d="M8 176h324" strokeOpacity="0.5" />

      {/* central pavilion */}
      <g>
        {/* dome */}
        <path d="M158 60c0-14 24-14 24 0" />
        <path d="M170 40v8" />
        <circle cx="170" cy="38" r="2" fill={color} stroke="none" />
        {/* pediment */}
        <path d="M150 78l20-16 20 16" />
        <path d="M150 78h40" />
        {/* central block */}
        <rect x="150" y="78" width="40" height="64" />
        <path d="M170 78v64" strokeOpacity="0.4" />
        {/* columns */}
        <path d="M156 92v44M163 92v44M177 92v44M184 92v44" strokeOpacity="0.6" />
        {/* door */}
        <path d="M165 142v-16a5 5 0 0 1 10 0v16" />
        {/* steps */}
        <path d="M144 142h52M140 148h60M136 154h68" strokeOpacity="0.7" />
      </g>

      {/* wings (mirrored) */}
      {[-1, 1].map((s) => (
        <g key={s} transform={`translate(${s === -1 ? 0 : 340} 0) scale(${s} 1)`}>
          <rect x="92" y="96" width="58" height="46" />
          <path d="M92 96h58" />
          {/* row of arched windows */}
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <path
                d={`M${100 + i * 13} 134v-16a4 4 0 0 1 8 0v16z`}
                strokeOpacity="0.65"
              />
            </g>
          ))}
          {/* small end pavilion */}
          <rect x="64" y="104" width="28" height="38" />
          <path d="M64 104l14-12 14 12" />
          <path d="M70 134v-12a4 4 0 0 1 8 0v12" strokeOpacity="0.6" />
        </g>
      ))}

      {/* flanking topiary trees */}
      {[34, 306].map((x, i) => (
        <g key={i}>
          <path
            d={`M${x} 168c-9 0-13-8-13-16 0-6 5-10 5-16 0-6 4-12 8-12s8 6 8 12c0 6 5 10 5 16 0 8-4 16-13 16z`}
            strokeOpacity="0.7"
          />
          <path d={`M${x} 176v-12`} strokeOpacity="0.7" />
        </g>
      ))}
    </svg>
  )
}

// A ribbon bow over a framed card — the closing flourish in the reference.
export function BowFrame({ className = '', color = '#B5566B' }) {
  return (
    <svg
      viewBox="0 0 220 120"
      className={className}
      fill="none"
      stroke={color}
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* card */}
      <rect x="34" y="34" width="152" height="74" rx="4" strokeOpacity="0.7" />
      <rect x="40" y="40" width="140" height="62" rx="3" strokeOpacity="0.35" />
      {/* ribbon tails */}
      <path d="M110 40c-10 18-26 30-44 40M110 40c10 18 26 30 44 40" strokeOpacity="0.6" />
      {/* bow loops */}
      <path d="M110 34c-8-12-34-16-34 0 0 14 26 12 34 2z" />
      <path d="M110 34c8-12 34-16 34 0 0 14-26 12-34 2z" />
      {/* knot */}
      <ellipse cx="110" cy="35" rx="5" ry="6" fill={color} fillOpacity="0.12" />
    </svg>
  )
}
