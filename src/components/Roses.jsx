// Stylised deep-red rose clusters used to decorate corners of maroon panels,
// echoing the floral arrangements in the reference invitation.

function Rose({ size = 60, hue = '#A81E32', dark = '#7C0F22' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" aria-hidden="true">
      {/* outer petals */}
      <g>
        <circle cx="30" cy="30" r="20" fill={hue} />
        <path
          d="M30 12c8 0 14 6 14 14s-6 14-14 14-14-6-14-14 6-14 14-14z"
          fill={dark}
          opacity="0.35"
        />
        {/* spiral petal lines */}
        <g fill="none" stroke={dark} strokeWidth="1.4" strokeLinecap="round" opacity="0.85">
          <path d="M30 22c5 0 8 3 8 8s-3 8-8 8-8-3-8-8" />
          <path d="M30 26c3 0 5 2 5 5s-2 4-5 4-4-2-4-4" />
          <path d="M30 30c1.6 0 2.6 1 2.6 2.5" />
        </g>
        {/* highlight */}
        <circle cx="24" cy="24" r="4" fill="#C8324A" opacity="0.5" />
      </g>
    </svg>
  )
}

function Leaf({ size = 34, rotate = 0 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      style={{ transform: `rotate(${rotate}deg)` }}
      aria-hidden="true"
    >
      <path
        d="M6 34C6 18 18 6 34 6c0 16-12 28-28 28z"
        fill="#5E6B3E"
      />
      <path d="M10 30C14 18 22 12 30 10" stroke="#46522F" strokeWidth="1.4" fill="none" />
    </svg>
  )
}

// A bouquet cluster — drop into a positioned wrapper.
export function RoseCluster({ className = '', flip = false, scale = 1 }) {
  return (
    <div
      className={`pointer-events-none select-none ${className}`}
      style={{ transform: `scale(${scale}) ${flip ? 'scaleX(-1)' : ''}` }}
      aria-hidden="true"
    >
      <div className="relative h-32 w-36">
        <div className="absolute left-2 top-8 rotate-[-20deg]"><Leaf size={42} rotate={-10} /></div>
        <div className="absolute right-3 top-10 rotate-[30deg]"><Leaf size={38} rotate={20} /></div>
        <div className="absolute left-1 top-16"><Leaf size={30} rotate={60} /></div>
        <div className="absolute left-8 top-2"><Rose size={56} /></div>
        <div className="absolute right-2 top-6"><Rose size={44} hue="#8E1A2C" dark="#660D1C" /></div>
        <div className="absolute left-3 top-14"><Rose size={40} hue="#B8283C" dark="#8C1322" /></div>
        {/* small buds */}
        <div className="absolute right-8 top-1"><Rose size={20} hue="#C8324A" dark="#9C1A2C" /></div>
      </div>
    </div>
  )
}

// Two gold wedding rings (interlocked) — a recurring accent in the reference.
export function GoldRings({ size = 70, className = '' }) {
  return (
    <svg
      width={size}
      height={size * 0.62}
      viewBox="0 0 120 74"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="ringGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#E7CD86" />
          <stop offset="0.5" stopColor="#FBEBC0" />
          <stop offset="1" stopColor="#A07A2C" />
        </linearGradient>
      </defs>
      <circle cx="44" cy="40" r="26" fill="none" stroke="url(#ringGold)" strokeWidth="6" />
      <circle cx="78" cy="40" r="26" fill="none" stroke="url(#ringGold)" strokeWidth="6" />
      {/* little diamond on the left ring */}
      <path d="M44 8l4 6-4 6-4-6z" fill="#FBEBC0" stroke="#A07A2C" strokeWidth="0.8" />
    </svg>
  )
}
