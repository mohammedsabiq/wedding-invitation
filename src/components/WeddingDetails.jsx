import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { wedding, googleMapsUrl } from '../data/config'
import { SectionHeading, Reveal } from './ui'
import { GoldRings } from './Roses'
import { FloralStrip } from './Florals'
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

function CountUnit({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative h-[72px] w-[72px]">
        {/* gold ring */}
        <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 72 72" aria-hidden="true">
          <defs>
            <linearGradient id={`cg-${label}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#E7CD86" />
              <stop offset="0.5" stopColor="#FBEBC0" />
              <stop offset="1" stopColor="#A07A2C" />
            </linearGradient>
          </defs>
          <circle cx="36" cy="36" r="33" fill="#5A0E1E" />
          <circle cx="36" cy="36" r="33" fill="none" stroke={`url(#cg-${label})`} strokeWidth="2.5" />
          <circle cx="36" cy="36" r="28" fill="none" stroke="#E7CD86" strokeOpacity="0.35" strokeWidth="0.8" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center font-serif text-2xl font-semibold text-cream-light">
          <motion.span key={value} initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.3 }}>
            {String(value).padStart(2, '0')}
          </motion.span>
        </div>
      </div>
      <span className="mt-2 font-body text-[10px] uppercase tracking-[0.18em] text-gold-light/80">{label}</span>
    </div>
  )
}

function Countdown() {
  const { days, hours, minutes, seconds, done } = useCountdown(wedding.date)
  if (done) {
    return <p className="text-center font-script text-4xl text-gold-shimmer">The blessed day is here!</p>
  }
  return (
    <div className="flex items-center justify-center gap-3">
      <CountUnit value={days} label="Days" />
      <CountUnit value={hours} label="Hours" />
      <CountUnit value={minutes} label="Mins" />
      <CountUnit value={seconds} label="Secs" />
    </div>
  )
}

const DETAIL_ICONS = {
  date: <path d="M7 3v3M17 3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" />,
  time: <><circle cx="12" cy="12" r="8" /><path d="M12 8v4l3 2" /></>,
  venue: <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />,
}

function DetailRow({ icon, label, value, sub, delay }) {
  return (
    <Reveal delay={delay}>
      <div className="glass-card-dark flex items-center gap-4 px-5 py-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold-light to-gold text-maroon-dark shadow-gold">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            {DETAIL_ICONS[icon]}
          </svg>
        </div>
        <div>
          <span className="font-body text-[10px] uppercase tracking-[0.22em] text-gold-light">{label}</span>
          <p className="font-serif text-lg text-cream-light">{value}</p>
          {sub && <p className="font-body text-xs text-cream/70">{sub}</p>}
        </div>
      </div>
    </Reveal>
  )
}

export default function WeddingDetails() {
  return (
    <section id="details" className="relative overflow-hidden pattern-maroon px-5 py-20">
      <Watermark tone="maroon" />
      <div className="relative z-10 mx-auto max-w-sm">
        <SectionHeading kicker="Save The Date" title="Wedding Details" subtitle="We would be honoured to have you celebrate with us" tone="maroon" />

        <Reveal>
          <div className="glass-card-dark mb-10 px-5 py-8">
            <div className="mb-5 flex justify-center"><GoldRings size={56} /></div>
            <p className="mb-5 text-center font-body text-[10px] uppercase tracking-[0.3em] text-cream/70">The Countdown Begins</p>
            <Countdown />
          </div>
        </Reveal>

        <div className="space-y-4">
          <DetailRow icon="date" label="Date" value={wedding.dateLabel} delay={0} />
          <DetailRow icon="time" label="Time" value={wedding.timeLabel} delay={0.08} />
          <DetailRow icon="venue" label="Venue" value={wedding.venue.name} sub={wedding.venue.address} delay={0.16} />
        </div>

        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-col items-center gap-3">
            <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="btn-gold w-full max-w-[18rem]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              Get Directions
            </a>
          </div>
        </Reveal>
      </div>

      <FloralStrip className="absolute inset-x-0 -bottom-2 z-20 opacity-95" />
    </section>
  )
}
