import { motion } from 'framer-motion'
import { wedding, googleMapsUrl } from '../data/config'
import { SectionHeading, Reveal } from './ui'
import { PalaceIllustration, BowFrame } from './Illustrations'
import Watermark from './Watermark'

function AnimatedPin() {
  return (
    <div className="relative flex h-32 items-center justify-center">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="absolute rounded-full border border-gold/50"
          style={{ width: 36, height: 36 }}
          animate={{ scale: [1, 3.2], opacity: [0.6, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.8, ease: 'easeOut' }}
        />
      ))}
      <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }} className="relative z-10">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
          <path d="M12 22s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" fill="#6E1124" stroke="#C29A45" strokeWidth="1.2" />
          <circle cx="12" cy="11" r="2.6" fill="#E7CD86" />
        </svg>
      </motion.div>
      <span className="absolute bottom-3 h-2 w-8 rounded-full bg-maroon/20 blur-sm" />
    </div>
  )
}

export default function LocationSection() {
  const embedSrc = wedding.venue.lat
    ? `https://maps.google.com/maps?q=${wedding.venue.lat},${wedding.venue.lng}&z=15&output=embed`
    : `https://maps.google.com/maps?q=${encodeURIComponent(wedding.venue.mapsQuery)}&z=15&output=embed`

  return (
    <section id="location" className="relative overflow-hidden pattern-cream px-5 py-20">
      <Watermark tone="cream" />
      <div className="relative z-10 mx-auto max-w-sm">
        <SectionHeading kicker="Find Your Way" title="The Venue" subtitle="We look forward to welcoming you" />

        {/* Hand-drawn venue engraving */}
        <Reveal>
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
            title="Open the venue in Google Maps"
          >
            <PalaceIllustration className="mx-auto h-40 w-full max-w-xs opacity-90 transition-opacity hover:opacity-100" />
            <p className="mt-3 text-center font-serif text-base italic text-ink-light">
              Click on the venue to see the location on Google Map
            </p>
          </a>
        </Reveal>

        <div className="mt-8 space-y-6">
          <Reveal>
            <div className="gold-frame overflow-hidden rounded-3xl shadow-card">
              <iframe
                title="Venue location map"
                src={embedSrc}
                className="h-60 w-full border-0 grayscale-[0.15]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="glass-card flex flex-col items-center px-6 py-8 text-center">
              <AnimatedPin />
              <h3 className="font-serif text-2xl text-maroon">{wedding.venue.name}</h3>
              <p className="mt-2 max-w-xs font-body text-sm text-ink-light">{wedding.venue.address}</p>

              <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="btn-gold mt-6">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
                Open in Google Maps
              </a>

              <div className="mt-8 flex flex-col items-center">
                <div className="rounded-2xl border border-gold/40 bg-cream-light p-3 shadow-sm">
                  <img src="/qr.png" alt="Scan for venue location" className="h-[104px] w-[104px]" />
                </div>
                <span className="mt-2 font-body text-[10px] uppercase tracking-[0.25em] text-ink-light">Scan for directions</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-col items-center pt-4">
              <BowFrame className="h-24 w-44 opacity-80" />
              <p className="mt-1 font-serif text-sm italic text-ink-light">With love & gratitude</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
