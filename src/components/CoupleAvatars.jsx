import { useMemo } from 'react'
import { motion } from 'framer-motion'

// Original hand-drawn, animated bride & groom cartoon illustration.
export default function CoupleAvatars({ className = '' }) {
  const sparkles = useMemo(() => Array.from({ length: 10 }, (_, i) => i), [])

  const blink = {
    scaleY: [1, 1, 0.1, 1, 1],
    transition: { duration: 4, times: [0, 0.92, 0.95, 0.98, 1], repeat: Infinity },
  }

  return (
    <div className={`relative ${className}`}>
      {/* floating sparkles / hearts */}
      {sparkles.map((i) => {
        const left = 8 + (i * 9.3) % 84
        const delay = (i * 0.5) % 4
        const heart = i % 3 === 0
        return (
          <motion.span
            key={i}
            className="pointer-events-none absolute"
            style={{ left: `${left}%`, top: `${(i * 17) % 70 + 8}%` }}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: [0, 1, 0], y: [-2, -16, -2], scale: [0.6, 1, 0.6] }}
            transition={{ duration: 3 + (i % 3), delay, repeat: Infinity }}
          >
            {heart ? (
              <svg width="11" height="11" viewBox="0 0 12 12"><path d="M6 11C1 7 1 3 4 3c1.4 0 2 1 2 1s.6-1 2-1c3 0 3 4-2 8z" fill="#C8324A" /></svg>
            ) : (
              <span className="block h-1.5 w-1.5 rounded-full bg-gold-light" style={{ boxShadow: '0 0 6px rgba(231,205,134,0.8)' }} />
            )}
          </motion.span>
        )
      })}

      {/* the couple — gentle float + sway */}
      <motion.svg
        viewBox="0 0 240 280"
        className="relative mx-auto w-full max-w-[15rem]"
        animate={{ y: [0, -7, 0], rotate: [-0.8, 0.8, -0.8] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        aria-label="Illustration of the bride and groom"
      >
        <ellipse cx="120" cy="266" rx="80" ry="9" fill="#6E1124" opacity="0.10" />

        {/* BRIDE */}
        <g>
          <path d="M74 150 Q58 215 48 256 L118 256 Q114 205 108 150 Z" fill="#FFFFFF" stroke="#E6DACB" strokeWidth="1.5" />
          <path d="M92 152 L96 256 L118 256 Q114 205 108 150 Z" fill="#F2EADF" />
          <path d="M70 92 Q60 170 72 250 L86 250 Q72 160 80 96 Z" fill="#F4ECE0" stroke="#E2D5C4" strokeWidth="1" />
          <path d="M80 118 Q78 140 84 158 L106 158 Q110 138 106 118 Z" fill="#FFFFFF" stroke="#E6DACB" strokeWidth="1.2" />
          <circle cx="92" cy="96" r="19" fill="#EBCBA6" />
          <path d="M71 100 Q66 62 92 60 Q118 62 113 100 Q108 86 92 86 Q76 86 71 100 Z" fill="#F4ECE0" stroke="#E2D5C4" strokeWidth="1.2" />
          <motion.g style={{ transformBox: 'fill-box', transformOrigin: 'center' }} animate={blink}>
            <circle cx="86" cy="97" r="2.1" fill="#3A2A20" />
            <circle cx="98" cy="97" r="2.1" fill="#3A2A20" />
          </motion.g>
          <path d="M82 91 Q86 89 90 91" stroke="#7A5A40" strokeWidth="1" fill="none" strokeLinecap="round" />
          <path d="M94 91 Q98 89 102 91" stroke="#7A5A40" strokeWidth="1" fill="none" strokeLinecap="round" />
          <path d="M88 104 Q92 107 96 104" stroke="#C0526A" strokeWidth="1.4" fill="none" strokeLinecap="round" />
          <circle cx="82" cy="102" r="3" fill="#E89AA0" opacity="0.45" />
          <circle cx="102" cy="102" r="3" fill="#E89AA0" opacity="0.45" />
          {/* bouquet */}
          <motion.g animate={{ rotate: [-3, 3, -3] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
            <path d="M92 156 L90 172 M99 158 L101 174" stroke="#5E6B3E" strokeWidth="2" strokeLinecap="round" />
            <circle cx="95" cy="150" r="6" fill="#A81E32" />
            <circle cx="104" cy="152" r="5" fill="#C8324A" />
            <circle cx="88" cy="154" r="5" fill="#8E1A2C" />
            <circle cx="98" cy="158" r="4.5" fill="#E7CD86" />
          </motion.g>
        </g>

        {/* GROOM */}
        <g>
          <path d="M142 206 L140 250 L150 250 L152 208 Z" fill="#F0E8DA" />
          <path d="M158 208 L160 250 L170 250 L168 206 Z" fill="#F0E8DA" />
          <path d="M138 250 q-3 6 6 6 h8 v-6 z" fill="#3A2A20" />
          <path d="M156 250 q-3 6 6 6 h8 v-6 z" fill="#3A2A20" />
          <path d="M133 116 Q124 180 130 214 L180 214 Q184 180 174 116 Z" fill="#EFE6D5" stroke="#DBCBB2" strokeWidth="1.5" />
          <path d="M153 120 L153 210" stroke="#DBCBB2" strokeWidth="1" />
          <circle cx="153" cy="132" r="1.6" fill="#C29A45" />
          <circle cx="153" cy="146" r="1.6" fill="#C29A45" />
          <circle cx="153" cy="160" r="1.6" fill="#C29A45" />
          <circle cx="153" cy="174" r="1.6" fill="#C29A45" />
          <path d="M145 118 L153 128 L161 118 Z" fill="#FFFFFF" />
          <path d="M170 116 L190 196 L180 199 L160 122 Z" fill="#E7CD86" opacity="0.85" />
          <circle cx="153" cy="98" r="18" fill="#E4BD96" />
          <path d="M135 96 Q138 76 153 76 Q168 76 171 96 Q166 84 153 84 Q140 84 135 96 Z" fill="#2E2018" />
          <motion.g style={{ transformBox: 'fill-box', transformOrigin: 'center' }} animate={blink}>
            <circle cx="147" cy="98" r="2.1" fill="#3A2A20" />
            <circle cx="159" cy="98" r="2.1" fill="#3A2A20" />
          </motion.g>
          <path d="M143 92 Q147 90 151 92" stroke="#3A2A20" strokeWidth="1" fill="none" strokeLinecap="round" />
          <path d="M155 92 Q159 90 163 92" stroke="#3A2A20" strokeWidth="1" fill="none" strokeLinecap="round" />
          <path d="M149 105 Q153 108 157 105" stroke="#9A4030" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        </g>
      </motion.svg>
    </div>
  )
}
