import { useState } from 'react'
import { motion } from 'framer-motion'
import { wedding, coupleNames } from '../data/config'

const ease = [0.22, 1, 0.36, 1]

// Full-length transparent overlay image for the hero: /public/couple4.png.
function HeroOverlay() {
  const [ok, setOk] = useState(true)
  if (!ok) return null
  return (
    <img
      src="/couple4.png"
      alt=""
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[1] h-full w-full object-cover opacity-40"
      onError={() => setOk(false)}
    />
  )
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-maroon-deep px-7 py-20"
    >
      <HeroOverlay />
      {/* highlight backdrop so the names & text stand out over the image */}
      <div className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_62%_56%_at_50%_50%,rgba(45,6,16,0.62),transparent_72%)]" />

      <div className="relative z-10 mx-auto flex w-full max-w-[22rem] flex-col items-center text-center">
        <motion.h1
          className="mt-7 pb-2 font-script text-6xl leading-[1.15] text-gold-shimmer"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.8, ease }}
        >
          {wedding.bride.name}
        </motion.h1>

        <motion.p
          className="my-5 font-body text-[11px] uppercase tracking-[0.5em] text-gold/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85, duration: 0.6 }}
        >
          And
        </motion.p>

        <motion.h1
          className="pb-2 font-script text-6xl leading-[1.15] text-gold-shimmer"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8, ease }}
        >
          {wedding.groom.name}
        </motion.h1>

      </div>

      {/* modern scroll cue */}
      <motion.div
        className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
      >
        <span className="font-body text-[10px] uppercase tracking-[0.4em] text-gold-light drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">Scroll</span>
        <motion.span
          className="block h-10 w-[1.5px] bg-gradient-to-b from-gold-light to-transparent"
          animate={{ scaleY: [0.5, 1, 0.5], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          style={{ transformOrigin: 'top' }}
        />
      </motion.div>

      <span className="sr-only">{coupleNames} wedding invitation</span>
    </section>
  )
}
