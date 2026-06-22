// Reusable Islamic geometric pattern generator.
// Renders a tiling SVG you can drop behind any section as a subtle texture.

export function IslamicPattern({ className = '', opacity = 0.08, color = '#6E1124' }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <svg width="100%" height="100%">
        <defs>
          <pattern
            id="islamic-star"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
            patternTransform="scale(1)"
          >
            <g fill="none" stroke={color} strokeWidth="1">
              {/* eight-point star */}
              <path d="M40 8l9 23 23 9-23 9-9 23-9-23-23-9 23-9z" />
              <rect
                x="22"
                y="22"
                width="36"
                height="36"
                transform="rotate(45 40 40)"
              />
              <circle cx="40" cy="40" r="6" />
              <circle cx="0" cy="0" r="4" />
              <circle cx="80" cy="0" r="4" />
              <circle cx="0" cy="80" r="4" />
              <circle cx="80" cy="80" r="4" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#islamic-star)" />
      </svg>
    </div>
  )
}

// A single ornate corner flourish (mirror it on each corner of a frame).
export function CornerFlourish({ className = '', color = '#E7CD86' }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      stroke={color}
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path d="M4 4h32" strokeLinecap="round" />
      <path d="M4 4v32" strokeLinecap="round" />
      <path d="M4 20c14 0 24 2 30 12" />
      <path d="M20 4c0 14 2 24 12 30" />
      <circle cx="36" cy="36" r="3.5" fill={color} stroke="none" />
      <path d="M10 10c8 0 12 4 12 12" />
    </svg>
  )
}

// Decorative crescent-and-star arch motif used in headers.
export function ArchMotif({ className = '', color = '#E7CD86' }) {
  return (
    <svg
      viewBox="0 0 120 60"
      className={className}
      fill="none"
      stroke={color}
      strokeWidth="1.4"
      aria-hidden="true"
    >
      <path d="M10 58c0-28 22-50 50-50s50 22 50 50" />
      <path d="M18 58c0-23 19-42 42-42s42 19 42 42" strokeOpacity="0.6" />
      <circle cx="60" cy="10" r="3" fill={color} stroke="none" />
      <path d="M60 2v-0M60 18v0" />
      <path
        d="M96 16a8 8 0 1 0 0 12 10 10 0 0 1 0-12z"
        fill={color}
        stroke="none"
        opacity="0.85"
      />
    </svg>
  )
}
