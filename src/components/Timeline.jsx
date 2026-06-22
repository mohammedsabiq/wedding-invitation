import { useState } from 'react'
import { motion } from 'framer-motion'
import { wedding } from '../data/config'
import { SectionHeading, Reveal } from './ui'
import Watermark from './Watermark'

// Couple illustration for this section: /public/couple3.png if present.
function CoupleImage3() {
  const [hasImg, setHasImg] = useState(true)
  if (!hasImg) return null
  return (
    <Reveal>
      <div className="gold-frame mx-auto mb-12 max-w-[20rem] overflow-hidden rounded-[1.8rem] shadow-card">
        <img
          src="/couple3.png"
          alt={`${wedding.bride.name} & ${wedding.groom.name}`}
          className="block w-full"
          onError={() => setHasImg(false)}
        />
      </div>
    </Reveal>
  )
}

const ICONS = {
  ring: <><circle cx="12" cy="14" r="6" /><path d="M9 8l3-4 3 4" /></>,
  cup: <><path d="M6 4h12l-1 8a5 5 0 0 1-10 0L6 4z" /><path d="M12 17v3M8 20h8" /></>,
  plate: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /></>,
}

function TimelineItem({ item }) {
  return (
    <div className="relative flex w-full items-start">
      <motion.span
        className="absolute left-4 z-10 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-br from-gold-light to-gold-dark text-maroon-dark shadow-gold"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 220, delay: 0.1 }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          {ICONS[item.icon]}
        </svg>
      </motion.span>

      <motion.div
        className="ml-12 w-full"
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        <div className="glass-card px-5 py-5">
          <h3 className="font-serif text-xl text-maroon">{item.title}</h3>
          <p className="mt-1 font-body text-sm italic text-ink-light">{item.desc}</p>

          {item.showDetails && (
            <>
              <div className="gold-divider my-3 max-w-[150px] justify-start before:hidden">
                <span className="text-gold text-[10px]">✦</span>
              </div>
              <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 font-body text-sm">
                {item.date && (
                  <>
                    <dt className="text-[10px] uppercase tracking-[0.18em] text-gold-dark">Date</dt>
                    <dd className="text-ink">{item.date}</dd>
                  </>
                )}
                <dt className="text-[10px] uppercase tracking-[0.18em] text-gold-dark">Time</dt>
                <dd className="text-ink">{item.time}</dd>
                {item.venue && (
                  <>
                    <dt className="text-[10px] uppercase tracking-[0.18em] text-gold-dark">Venue</dt>
                    <dd className="text-ink">{item.venue}</dd>
                  </>
                )}
              </dl>
            </>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default function Timeline() {
  return (
    <section id="timeline" className="relative overflow-hidden pattern-cream px-5 py-20">
      <Watermark tone="cream" />
      <div className="relative z-10 mx-auto max-w-sm">
        <SectionHeading kicker="The Celebration" title="Event" subtitle="A blessed evening, moment by moment" />

        <CoupleImage3 />

        <div className="relative">
          <motion.span
            className="absolute left-4 top-0 w-px bg-gradient-to-b from-gold/0 via-gold/60 to-gold/0"
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          />
          <div className="space-y-8">
            {wedding.timeline.map((item) => (
              <TimelineItem key={item.title} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
