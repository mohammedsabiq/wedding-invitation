// Ornate gold Islamic arch (mihrab / ogee) frame.
// Wrap any content; it draws a pointed-arch double gold border around it with
// a small finial at the apex. Use on maroon panels for that royal card look.

export default function ArchFrame({
  children,
  className = '',
  tone = 'gold', // border colour
  bg = 'transparent', // inner fill
  pad = 'px-6 pt-16 pb-8',
}) {
  const stroke = tone === 'gold' ? '#E7CD86' : tone
  return (
    <div className={`relative ${className}`}>
      {/* Arch outline drawn as SVG so it scales with the box */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 100 140"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {/* inner fill */}
        <path
          d="M6 138 V52 C6 28 26 4 50 2 C74 4 94 28 94 52 V138 Z"
          fill={bg}
        />
        {/* outer gold line */}
        <path
          d="M6 138 V52 C6 28 26 4 50 2 C74 4 94 28 94 52 V138"
          fill="none"
          stroke={stroke}
          strokeWidth="0.9"
          vectorEffect="non-scaling-stroke"
        />
        {/* inner gold line */}
        <path
          d="M11 138 V53 C11 31 29 10 50 8 C71 10 89 31 89 53 V138"
          fill="none"
          stroke={stroke}
          strokeOpacity="0.55"
          strokeWidth="0.7"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Apex finial ornament */}
      <svg
        className="pointer-events-none absolute left-1/2 top-1 -translate-x-1/2"
        width="34"
        height="34"
        viewBox="0 0 34 34"
        aria-hidden="true"
      >
        <g fill="none" stroke={stroke} strokeWidth="1.2" strokeLinecap="round">
          <path d="M17 2v8" />
          <circle cx="17" cy="13" r="3.2" fill={stroke} stroke="none" />
          <path d="M9 22c3-3 5-3 8-3s5 0 8 3" />
          <path d="M11 28c2-2 4-2 6-2s4 0 6 2" strokeOpacity="0.6" />
        </g>
      </svg>

      <div className={`relative z-10 ${pad}`}>{children}</div>
    </div>
  )
}
