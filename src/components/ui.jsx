import { motion } from 'framer-motion'
import { ArchMotif } from './IslamicPattern'

// Fade/slide-in on scroll wrapper.
export function Reveal({ children, delay = 0, y = 28, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

// Ornate section heading with arch motif + gold divider.
// tone: 'cream' (dark text on cream) | 'maroon' (light text on maroon panel)
export function SectionHeading({ kicker, title, subtitle, tone = 'cream' }) {
  const titleColor = tone === 'maroon' ? 'text-cream-light' : 'text-maroon'
  const subColor = tone === 'maroon' ? 'text-cream/80' : 'text-ink-light'
  return (
    <div className="mb-10 flex flex-col items-center text-center">
      <ArchMotif className="mb-3 h-9 w-20 opacity-90" />
      {kicker && (
        <span className="mb-2 font-body text-[10px] uppercase tracking-[0.35em] text-gold-dark">
          {kicker}
        </span>
      )}
      <h2 className={`section-title text-balance ${titleColor}`}>{title}</h2>
      <div className="gold-divider mt-4 w-full max-w-[16rem]">
        <svg width="13" height="13" viewBox="0 0 14 14" className="text-gold">
          <path
            d="M7 0l1.8 5.2L14 7l-5.2 1.8L7 14l-1.8-5.2L0 7l5.2-1.8z"
            fill="currentColor"
          />
        </svg>
      </div>
      {subtitle && (
        <p className={`mt-4 max-w-md font-serif text-base italic text-balance ${subColor}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
