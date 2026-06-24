import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { wedding } from '../data/config'
import { SectionHeading, Reveal } from './ui'
import Watermark from './Watermark'

// --- Countdown ---------------------------------------------------------------
function useCountdown(targetIso) {
  const target = new Date(targetIso).getTime()
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])
  const diff = Math.max(0, target - now)
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
    done: diff === 0,
  }
}

// A single flip-style tile with a big numeral.
function FlipTile({ value, label, index }) {
  const text = String(value).padStart(2, '0')
  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative h-[68px] w-[60px] overflow-hidden rounded-xl border border-gold/35 bg-gradient-to-b from-[#3c0712] to-[#23040c] shadow-[inset_0_1px_0_rgba(231,205,134,0.25),0_8px_18px_rgba(0,0,0,0.35)]">
        {/* center seam line like a flip clock */}
        <span className="pointer-events-none absolute inset-x-0 top-1/2 z-10 h-px -translate-y-1/2 bg-black/40" />
        <span className="pointer-events-none absolute inset-x-0 top-1/2 z-10 h-px bg-gold/10" />
        <div className="flex h-full items-center justify-center overflow-hidden">
          <motion.span
            key={text}
            initial={{ rotateX: -90, y: -8, opacity: 0 }}
            animate={{ rotateX: 0, y: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-[2rem] font-semibold text-gold-shimmer"
            style={{ transformOrigin: 'center bottom' }}
          >
            {text}
          </motion.span>
        </div>
      </div>
      <span className="mt-2 font-body text-[9px] uppercase tracking-[0.22em] text-gold-light/75">{label}</span>
    </motion.div>
  )
}

function Separator() {
  return (
    <motion.span
      className="mb-5 self-center font-serif text-2xl text-gold/50"
      animate={{ opacity: [0.25, 0.8, 0.25] }}
      transition={{ duration: 1.6, repeat: Infinity }}
    >
      :
    </motion.span>
  )
}

function Countdown() {
  const { days, hours, minutes, seconds, done } = useCountdown(wedding.date)
  if (done) {
    return <p className="text-center font-script text-4xl text-gold-shimmer">The blessed day is here!</p>
  }
  return (
    <div className="flex items-start justify-center gap-1.5">
      <FlipTile value={days} label="Days" index={0} />
      <Separator />
      <FlipTile value={hours} label="Hours" index={1} />
      <Separator />
      <FlipTile value={minutes} label="Mins" index={2} />
      <Separator />
      <FlipTile value={seconds} label="Secs" index={3} />
    </div>
  )
}

const DETAIL_ICONS = {
  date: <path d="M7 3v3M17 3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" />,
  time: <><circle cx="12" cy="12" r="8" /><path d="M12 8v4l3 2" /></>,
  venue: <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />,
}

// One row on the gold timeline: an illuminated icon node beside the detail.
function DetailRow({ icon, label, value, sub, index, last }) {
  return (
    <motion.div
      className="relative flex items-start gap-5"
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ delay: index * 0.14, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gold/35 bg-gradient-to-b from-[#3c0712] to-[#23040c] text-gold-light shadow-[inset_0_1px_0_rgba(231,205,134,0.25),0_8px_18px_rgba(0,0,0,0.35)]">
        {/* center seam, like the countdown flip-tiles */}
        <span className="pointer-events-none absolute inset-x-0 top-1/2 z-10 h-px -translate-y-1/2 bg-black/40" />
        <span className="pointer-events-none absolute inset-x-0 top-1/2 z-10 h-px bg-gold/10" />
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          {DETAIL_ICONS[icon]}
        </svg>
      </span>
      <div className={`min-w-0 flex-1 pt-1 ${last ? 'pb-0' : 'pb-8'}`}>
        <span className="font-body text-[9px] uppercase tracking-[0.34em] text-gold-light/80">{label}</span>
        <p className="mt-1 font-serif text-xl leading-snug text-cream-light">{value}</p>
        {sub && <p className="mt-0.5 font-body text-xs text-cream/60">{sub}</p>}
      </div>
    </motion.div>
  )
}

export default function WeddingDetails() {
  return (
    <section id="details" className="relative overflow-hidden pattern-maroon px-5 py-20">
      <Watermark tone="maroon" />
      <div className="relative z-10 mx-auto max-w-sm">
        <SectionHeading kicker="Save The Date" title="Wedding Details" subtitle="We would be honoured to have you celebrate with us" tone="maroon" />

        {/* Flip-tile countdown */}
        <Reveal>
          <p className="mb-5 text-center font-body text-[10px] uppercase tracking-[0.4em] text-gold-light/85">
            Counting Down To Forever
          </p>
          <Countdown />
        </Reveal>

        {/* Framed invitation card with the details */}
        <Reveal delay={0.15}>
          <div className="gold-frame relative mt-12 overflow-hidden rounded-[1.75rem] bg-gradient-to-b from-maroon-wine/60 to-maroon-dark/80 px-6 py-9 backdrop-blur-md">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(231,205,134,0.16),transparent_62%)]" />
            <span className="pointer-events-none absolute inset-3 rounded-[1.4rem] border border-gold/15" />
            <div className="relative">
              {/* connecting gold timeline line behind the icon tiles */}
              <span className="pointer-events-none absolute bottom-9 left-7 top-7 w-px -translate-x-1/2 bg-gradient-to-b from-gold/15 via-gold/50 to-gold/15" />
              <DetailRow icon="date" label="Date" value={wedding.dateLabel} index={0} />
              <DetailRow icon="time" label="Time" value={wedding.timeLabel} index={1} />
              <DetailRow icon="venue" label="Venue" value={wedding.venue.name} sub={wedding.venue.address} index={2} last />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
