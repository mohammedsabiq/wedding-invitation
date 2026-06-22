import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { wedding } from '../data/config'
import { SectionHeading, Reveal } from './ui'

const GRADIENTS = [
  'from-maroon to-rose',
  'from-rose to-gold-dark',
  'from-gold-dark to-maroon',
  'from-maroon-dark to-rose-light',
  'from-maroon-wine to-gold',
  'from-rose to-maroon',
]

function Tile({ item, index, onOpen }) {
  const tall = index % 3 === 0
  return (
    <Reveal delay={(index % 2) * 0.08}>
      <motion.button
        onClick={onOpen}
        whileHover={{ scale: 1.02 }}
        className={`group relative w-full overflow-hidden rounded-2xl shadow-card ${tall ? 'aspect-[3/4]' : 'aspect-square'}`}
      >
        {item.src ? (
          <img src={item.src} alt={item.caption} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
        ) : (
          <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${GRADIENTS[index % GRADIENTS.length]}`}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FBF4EC" strokeWidth="1" opacity="0.5">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <circle cx="8.5" cy="10" r="1.5" />
              <path d="M21 16l-5-5L5 19" />
            </svg>
          </div>
        )}
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-maroon-dark/75 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <span className="p-3 font-serif text-base text-cream-light">{item.caption}</span>
        </div>
        <span className="absolute left-2 top-2 h-4 w-4 border-l border-t border-gold/0 transition-all duration-500 group-hover:border-gold/90" />
        <span className="absolute bottom-2 right-2 h-4 w-4 border-b border-r border-gold/0 transition-all duration-500 group-hover:border-gold/90" />
      </motion.button>
    </Reveal>
  )
}

export default function Gallery() {
  const [active, setActive] = useState(null)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setActive(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <section id="gallery" className="relative pattern-cream px-5 py-20">
      <div className="mx-auto max-w-sm">
        <SectionHeading kicker="Cherished Moments" title="Our Gallery" subtitle="Glimpses of the journey that brought us here" />

        <div className="columns-2 gap-3 [&>*]:mb-3">
          {wedding.gallery.map((item, i) => (
            <div key={i} className="break-inside-avoid">
              <Tile item={item} index={i} onOpen={() => setActive(i)} />
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-maroon-deep/90 p-4 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              className="gold-frame relative max-h-[85vh] w-full max-w-md overflow-hidden rounded-2xl"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {wedding.gallery[active].src ? (
                <img src={wedding.gallery[active].src} alt={wedding.gallery[active].caption} className="max-h-[85vh] w-full object-contain" />
              ) : (
                <div className={`flex aspect-[4/3] w-full items-center justify-center bg-gradient-to-br ${GRADIENTS[active % GRADIENTS.length]}`}>
                  <span className="font-script text-4xl text-cream-light">{wedding.gallery[active].caption}</span>
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-maroon-dark/85 to-transparent p-4 text-center">
                <span className="font-serif text-lg text-cream-light">{wedding.gallery[active].caption}</span>
              </div>

              <button onClick={() => setActive((a) => (a - 1 + wedding.gallery.length) % wedding.gallery.length)} className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-cream-light/85 p-2 text-maroon" aria-label="Previous">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
              </button>
              <button onClick={() => setActive((a) => (a + 1) % wedding.gallery.length)} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-cream-light/85 p-2 text-maroon" aria-label="Next">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
              </button>
              <button onClick={() => setActive(null)} className="absolute right-2 top-2 rounded-full bg-cream-light/85 p-2 text-maroon" aria-label="Close">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6L6 18" /></svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
