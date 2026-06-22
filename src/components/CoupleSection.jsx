import { useState } from 'react'
import { motion } from 'framer-motion'
import { wedding } from '../data/config'
import { SectionHeading, Reveal } from './ui'
import CoupleAvatars from './CoupleAvatars'
import Watermark from './Watermark'

// The couple illustration: /public/couple.png if present, else the cartoon.
function CoupleVisual() {
  const [hasImg, setHasImg] = useState(true)
  if (hasImg) {
    return (
      <img
        src="/couple.png"
        alt={`${wedding.bride.name} & ${wedding.groom.name}`}
        className="block w-full"
        onError={() => setHasImg(false)}
      />
    )
  }
  return (
    <div className="relative bg-gradient-to-b from-maroon to-maroon-dark p-5">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(231,205,134,0.18),transparent_60%)]" />
      <CoupleAvatars />
    </div>
  )
}

function Name({ person }) {
  return (
    <div className="flex flex-col items-center">
      <h3 className="font-script text-4xl leading-tight text-maroon">{person.name}</h3>
      <p className="mt-2 font-serif text-base text-ink-light">{person.parents}</p>
      {person.house && (
        <p className="mt-1 font-body text-[11px] uppercase tracking-[0.15em] text-gold-dark">
          {person.house}
        </p>
      )}
    </div>
  )
}

export default function CoupleSection() {
  return (
    <section id="couple" className="relative overflow-hidden pattern-cream px-5 py-20">
      <Watermark tone="cream" />
      <div className="relative z-10 mx-auto max-w-sm">
        <SectionHeading
          kicker="Two Souls, One Path"
          title="The Happy Couple"
          subtitle="With hearts full of gratitude to Allah, we begin our journey together"
        />

        {/* one combined card: illustration on top, names below */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="gold-frame overflow-hidden rounded-[2rem] bg-cream-light shadow-card"
        >
          <CoupleVisual />

          <div className="px-6 pb-9 pt-7 text-center">
            <Name person={wedding.bride} />

            <div className="my-6 flex w-full items-center justify-center gap-3 text-gold">
              <span className="h-px w-12 bg-gold/45" />
              <span className="text-gold text-xs">✦</span>
              <span className="font-body text-[11px] uppercase tracking-[0.4em] text-gold-dark">And</span>
              <span className="text-gold text-xs">✦</span>
              <span className="h-px w-12 bg-gold/45" />
            </div>

            <Name person={wedding.groom} />
          </div>
        </motion.div>

        <Reveal delay={0.15}>
          <div className="glass-card mt-10 px-6 py-8 text-center">
            <p className="font-arabic text-xl leading-loose text-maroon">{wedding.quran.arabic}</p>
            <p className="mt-4 font-serif text-base italic text-ink text-balance">{wedding.quran.translation}</p>
            <p className="mt-2 font-body text-xs tracking-wide text-gold-dark">{wedding.quran.reference}</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
