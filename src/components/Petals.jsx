import { useMemo } from 'react'
import { motion } from 'framer-motion'

// Ambient floating petals + golden particles drifting across the screen.
// Lightweight: a fixed number of CSS/transform-animated elements.

const PETAL_COLORS = ['#A81E32', '#C8324A', '#E7CD86', '#C29A45']

function Petal({ i }) {
  // Deterministic-ish pseudo random based on index so layout is stable.
  const left = (i * 9.7) % 100
  const delay = (i * 1.37) % 8
  const duration = 11 + ((i * 2.3) % 9)
  const size = 8 + ((i * 3) % 12)
  const drift = ((i % 2 === 0 ? 1 : -1) * (30 + ((i * 7) % 60)))
  const color = PETAL_COLORS[i % PETAL_COLORS.length]

  return (
    <motion.div
      className="absolute top-[-8%]"
      style={{ left: `${left}%` }}
      initial={{ y: '-10vh', x: 0, rotate: 0, opacity: 0 }}
      animate={{
        y: '110vh',
        x: [0, drift, -drift * 0.5, drift],
        rotate: [0, 180, 360],
        opacity: [0, 0.9, 0.9, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      {/* petal shape */}
      <svg width={size} height={size} viewBox="0 0 20 20" fill={color}>
        <path d="M10 0C13 6 20 8 20 13a10 10 0 0 1-20 0C0 8 7 6 10 0z" opacity="0.75" />
      </svg>
    </motion.div>
  )
}

function Sparkle({ i }) {
  const left = (i * 17.3) % 100
  const top = (i * 23.7) % 100
  const delay = (i * 0.9) % 6
  const size = 2 + ((i * 2) % 4)
  return (
    <motion.span
      className="absolute rounded-full bg-gold-glow"
      style={{
        left: `${left}%`,
        top: `${top}%`,
        width: size,
        height: size,
        boxShadow: '0 0 6px 1px rgba(226,201,126,0.8)',
      }}
      animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
      transition={{ duration: 3 + (i % 3), delay, repeat: Infinity }}
    />
  )
}

export default function Petals({ petalCount = 14, sparkleCount = 18 }) {
  const petals = useMemo(
    () => Array.from({ length: petalCount }, (_, i) => i),
    [petalCount],
  )
  const sparkles = useMemo(
    () => Array.from({ length: sparkleCount }, (_, i) => i),
    [sparkleCount],
  )

  return (
    <div
      className="pointer-events-none fixed inset-0 z-20 overflow-hidden"
      aria-hidden="true"
    >
      {petals.map((i) => (
        <Petal key={`p${i}`} i={i} />
      ))}
      {sparkles.map((i) => (
        <Sparkle key={`s${i}`} i={i} />
      ))}
    </div>
  )
}
