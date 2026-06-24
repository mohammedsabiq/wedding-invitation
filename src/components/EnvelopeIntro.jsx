import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { wedding } from '../data/config'

// Gold coin with red monogram letters — clean, no extra ornament.
function WaxSeal() {
  const initials = `${wedding.bride.name[0]}·${wedding.groom.name[0]}`
  return (
    <svg width="92" height="92" viewBox="0 0 120 120" aria-hidden="true">
      <defs>
        <radialGradient id="coinGold" cx="38%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#FBEBC0" />
          <stop offset="45%" stopColor="#E7CD86" />
          <stop offset="100%" stopColor="#A07A2C" />
        </radialGradient>
        <filter id="coinShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="2.2" floodColor="#7A5A2E" floodOpacity="0.35" />
        </filter>
      </defs>
      {/* coin body */}
      <circle cx="60" cy="60" r="52" fill="url(#coinGold)" filter="url(#coinShadow)" />
      {/* coin rim */}
      <circle cx="60" cy="60" r="46" fill="none" stroke="#A07A2C" strokeOpacity="0.65" strokeWidth="2" />
      {/* red monogram letters */}
      <text
        x="60"
        y="74"
        textAnchor="middle"
        fontFamily="'Cormorant Garamond', serif"
        fontSize="34"
        fontWeight="700"
        fill="#9E1B2E"
      >
        {initials}
      </text>
    </svg>
  )
}

export default function EnvelopeIntro({ onOpened }) {
  const skip =
    typeof window !== 'undefined' && /[?&]open=1\b/.test(window.location.search)
  const [opened, setOpened] = useState(skip)
  const [gone, setGone] = useState(skip)
  const sparkles = useMemo(() => Array.from({ length: 14 }, (_, i) => i), [])

  const open = () => {
    if (opened) return
    setOpened(true)
    setTimeout(() => {
      setGone(true)
      onOpened?.()
    }, 2500)
  }

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center stage-bg px-7"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(231,205,134,0.16),transparent_62%)]" />
          {sparkles.map((i) => {
            const left = (i * 37) % 100
            const top = (i * 53) % 100
            return (
              <motion.span
                key={i}
                className="pointer-events-none absolute rounded-full bg-gold-glow"
                style={{ left: `${left}%`, top: `${top}%`, width: 3, height: 3, boxShadow: '0 0 8px 2px rgba(231,205,134,0.6)' }}
                animate={{ opacity: [0, 1, 0], scale: [0.4, 1.2, 0.4] }}
                transition={{ duration: 2.6 + (i % 4), delay: (i % 5) * 0.4, repeat: Infinity }}
              />
            )
          })}

          <div className="relative w-full max-w-[300px]">
            {/* modern header — minimal, no date */}
            <motion.div
              className="mb-7 flex flex-col items-center text-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: opened ? 0 : 1, y: 0 }}
              transition={{ duration: opened ? 0.4 : 0.8, delay: opened ? 0 : 0.2 }}
            >
              <p className="font-body text-[9px] uppercase tracking-[0.45em] text-gold/80">
                You Are Invited
              </p>
              <div className="mt-3 flex flex-col items-center font-script text-4xl leading-[1.18] text-gold-shimmer">
                <span className="pb-1">{wedding.bride.name}</span>
                <span className="my-0.5 text-xl">&amp;</span>
                <span className="pb-1">{wedding.groom.name}</span>
              </div>
            </motion.div>

            {/* rising card → zoom into site */}
            <motion.div
              className="pointer-events-none absolute inset-x-6 bottom-10 z-[55] origin-center"
              initial={{ y: 30, opacity: 0, scale: 0.9 }}
              animate={
                opened
                  ? { y: [30, -110, -140], opacity: [0, 1, 1], scale: [0.9, 1, 1.4] }
                  : { y: 30, opacity: 0, scale: 0.9 }
              }
              transition={{ delay: opened ? 0.55 : 0, duration: 1.6, times: [0, 0.45, 1], ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative rounded-2xl bg-cream-light px-8 py-9 text-center shadow-card ring-1 ring-gold/40">
                <p className="font-arabic text-xl leading-relaxed text-maroon">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>
                <div className="mx-auto my-3 h-px w-12 bg-gold/50" />
                <h2 className="font-script text-3xl text-gold-shimmer">{wedding.bride.name}</h2>
                <p className="font-body text-[10px] uppercase tracking-[0.3em] text-gold-dark">&amp;</p>
                <h2 className="font-script text-3xl text-gold-shimmer">{wedding.groom.name}</h2>
              </div>
            </motion.div>

            {/* modern flat envelope */}
            <motion.div
              className="relative aspect-[4/3] w-full"
              animate={{ opacity: opened ? 0 : 1 }}
              transition={{ delay: opened ? 1.0 : 0, duration: 0.6 }}
            >
              {/* body */}
              <div className="absolute inset-0 rounded-2xl bg-[#F4ECE0] shadow-card ring-1 ring-gold/30" />
              {/* front pocket (clean V) */}
              <div className="absolute inset-0 rounded-2xl bg-[#ECE0CF]" style={{ clipPath: 'polygon(0 100%, 50% 44%, 100% 100%)' }} />
              <svg className="absolute inset-0 z-10 h-full w-full" viewBox="0 0 100 75" preserveAspectRatio="none" aria-hidden="true">
                <path d="M0 75L50 44 100 75" fill="none" stroke="#C29A45" strokeOpacity="0.5" strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
                <path d="M2 4L50 38 98 4" fill="none" stroke="#C29A45" strokeOpacity="0.25" strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
              </svg>

              {/* top flap */}
              <motion.div
                className="absolute inset-x-0 top-0 z-20 origin-top"
                style={{ transformStyle: 'preserve-3d' }}
                initial={{ rotateX: 0 }}
                animate={{ rotateX: opened ? -180 : 0 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
              >
                <div className="relative w-full" style={{ aspectRatio: '4 / 1.55' }}>
                  <div className="h-full w-full bg-[#F0E6D6]" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }} />
                  <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">
                    <path d="M0 0L50 40 100 0" fill="none" stroke="#C29A45" strokeOpacity="0.55" strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
                  </svg>
                </div>
              </motion.div>

              {/* wax seal */}
              {!opened && (
                <div className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2">
                  <motion.button
                    onClick={open}
                    className="relative block rounded-full"
                    whileHover={{ scale: 1.07 }}
                    whileTap={{ scale: 0.94 }}
                    animate={{ scale: [1, 1.04, 1] }}
                    transition={{ scale: { duration: 2.2, repeat: Infinity } }}
                    aria-label="Open the invitation"
                  >
                    <motion.span
                      className="absolute inset-0 rounded-full"
                      style={{ boxShadow: '0 0 28px 6px rgba(231,205,134,0.5)' }}
                      animate={{ opacity: [0.3, 0.8, 0.3] }}
                      transition={{ duration: 2.2, repeat: Infinity }}
                    />
                    <WaxSeal />
                  </motion.button>
                </div>
              )}
            </motion.div>

            {/* modern tap prompt */}
            {!opened && (
              <motion.div
                className="absolute -bottom-16 left-0 right-0 flex flex-col items-center gap-2"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <p className="font-body text-[10px] uppercase tracking-[0.35em] text-gold/80">Tap the seal to open</p>
                <span className="block h-6 w-px bg-gradient-to-b from-gold/70 to-transparent" />
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
