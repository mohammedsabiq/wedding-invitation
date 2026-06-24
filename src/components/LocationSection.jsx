import { motion } from 'framer-motion'
import { wedding, googleMapsUrl } from '../data/config'
import { SectionHeading, Reveal } from './ui'
import Watermark from './Watermark'

function AnimatedPin() {
  return (
    <div className="relative flex h-20 items-center justify-center">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="absolute rounded-full border border-gold/50"
          style={{ width: 32, height: 32 }}
          animate={{ scale: [1, 3], opacity: [0.6, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.8, ease: 'easeOut' }}
        />
      ))}
      <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }} className="relative z-10">
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
          <path d="M12 22s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" fill="#6E1124" stroke="#C29A45" strokeWidth="1.2" />
          <circle cx="12" cy="11" r="2.6" fill="#E7CD86" />
        </svg>
      </motion.div>
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

        <Reveal>
          <div className="gold-frame overflow-hidden rounded-[2rem] bg-cream-light shadow-card">
            {/* venue header */}
            <div className="flex flex-col items-center px-6 pt-7 text-center">
              <AnimatedPin />
              <h3 className="mt-1 font-serif text-[1.7rem] font-semibold text-maroon">{wedding.venue.name}</h3>
              <p className="mt-1.5 max-w-xs font-body text-sm tracking-wide text-ink-light">{wedding.venue.address}</p>
              <div className="mt-4 flex items-center gap-2 text-gold">
                <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold/60" />
                <span className="text-[10px]">✦</span>
                <span className="h-px w-10 bg-gradient-to-l from-transparent to-gold/60" />
              </div>
            </div>

            {/* interactive map */}
            <div className="mt-6 px-4">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block overflow-hidden rounded-2xl ring-1 ring-gold/30"
                title="Open the venue in Google Maps"
              >
                <iframe
                  title="Venue location map"
                  src={embedSrc}
                  className="pointer-events-none h-56 w-full border-0 grayscale-[0.1]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <span className="absolute inset-0 bg-maroon/0 transition-colors duration-300 group-hover:bg-maroon/5" />
                <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-maroon/85 px-4 py-1.5 font-body text-[10px] uppercase tracking-[0.22em] text-cream-light backdrop-blur">
                  Tap to open in Maps
                </span>
              </a>
            </div>

            {/* action: directions */}
            <div className="flex flex-col items-center px-6 pb-8 pt-7">
              <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="btn-gold w-full max-w-[18rem]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
                Get Directions
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
