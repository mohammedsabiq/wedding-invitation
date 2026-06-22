import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { coupleNames } from '../data/config'

const LINKS = [
  ['Home', 'home'],
  ['Couple', 'couple'],
  ['Details', 'details'],
  ['Schedule', 'timeline'],
  ['Venue', 'location'],
  ['Gallery', 'gallery'],
  ['RSVP', 'rsvp'],
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (id) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.header
      className={`sticky top-0 z-40 transition-all duration-500 ${
        scrolled ? 'bg-maroon-deep/85 shadow-md backdrop-blur-md' : 'bg-transparent'
      }`}
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
    >
      <nav className="flex items-center justify-between px-4 py-2.5">
        <button onClick={() => go('home')} className="font-script text-xl text-gold-shimmer">
          {coupleNames}
        </button>

        <button onClick={() => setOpen((o) => !o)} className="text-gold-light" aria-label="Menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            className="flex flex-col gap-1 bg-maroon-deep/95 px-4 pb-3 backdrop-blur"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            {LINKS.map(([label, id]) => (
              <li key={id}>
                <button
                  onClick={() => go(id)}
                  className="block w-full rounded-lg px-3 py-2.5 text-left font-body text-sm uppercase tracking-wide text-cream-light/90 transition hover:bg-gold/15 hover:text-gold-light"
                >
                  {label}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
