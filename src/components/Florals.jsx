// Original stylised lotus / water-lily blooms used as a strip along the bottom
// edge of the deep-maroon panels, echoing the reference's floral base.

function Lotus({ size = 60, petal = '#C8324A', deep = '#8E1A2C', heart = '#E7CD86' }) {
  return (
    <svg width={size} height={size * 0.7} viewBox="0 0 60 42" aria-hidden="true">
      {/* back petals */}
      <g fill={deep}>
        <path d="M30 40C16 38 6 30 4 20c8 2 14 8 18 16z" />
        <path d="M30 40c14-2 24-10 26-20-8 2-14 8-18 16z" />
      </g>
      {/* side petals */}
      <g fill={petal}>
        <path d="M30 40C22 36 16 26 18 14c7 4 11 14 12 26z" />
        <path d="M30 40c8-4 14-14 12-26-7 4-11 14-12 26z" />
      </g>
      {/* centre petal */}
      <path d="M30 40c-5-6-7-18-0-30 7 12 5 24 0 30z" fill={petal} />
      <path d="M30 40c-3-6-4-16 0-24 4 8 3 18 0 24z" fill={heart} fillOpacity="0.85" />
    </svg>
  )
}

function Pad({ size = 34, color = '#5E6B3E' }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 40 24" aria-hidden="true">
      <path d="M2 14a18 9 0 1 0 36 0 18 9 0 1 0-36 0z" fill={color} fillOpacity="0.85" />
      <path d="M20 14L34 9" stroke="#46522F" strokeWidth="1" />
    </svg>
  )
}

// Symmetric strip of lotuses + pads. Drop along a panel's bottom edge.
export function FloralStrip({ className = '' }) {
  return (
    <div className={`pointer-events-none flex items-end justify-center gap-1 ${className}`} aria-hidden="true">
      <Pad size={40} />
      <Lotus size={44} petal="#8E1A2C" deep="#660D1C" />
      <Pad size={30} />
      <Lotus size={64} />
      <Lotus size={48} petal="#B8283C" deep="#8C1322" />
      <Pad size={36} />
      <Lotus size={40} petal="#8E1A2C" deep="#660D1C" />
      <Pad size={42} />
    </div>
  )
}
