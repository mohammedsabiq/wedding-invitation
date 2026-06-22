import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { wedding } from '../data/config'
import Watermark from './Watermark'
import Confetti from './Confetti'

const COIN_THRESHOLD = 0.55

function dateCoins() {
  const d = new Date(wedding.date)
  if (isNaN(d)) return [{ v: wedding.dateLabel, k: 'Date' }]
  const day = d.getDate()
  const suffix =
    day % 10 === 1 && day !== 11 ? 'st'
    : day % 10 === 2 && day !== 12 ? 'nd'
    : day % 10 === 3 && day !== 13 ? 'rd'
    : 'th'
  return [
    { v: `${day}${suffix}`, k: 'Day' },
    { v: d.toLocaleString('en', { month: 'long' }), k: 'Month' },
    { v: `${d.getFullYear()}`, k: 'Year' },
  ]
}

// A circular gold coin you scratch to uncover a date part.
function ScratchCoin({ coin, onReveal, revealedInit = false }) {
  const canvasRef = useRef(null)
  const wrapRef = useRef(null)
  const drawing = useRef(false)
  const last = useRef(null)
  const done = useRef(revealedInit)
  const [revealed, setRevealed] = useState(revealedInit)

  const paint = useCallback((ctx, w, h) => {
    const g = ctx.createLinearGradient(0, 0, w, h)
    g.addColorStop(0, '#A07A2C')
    g.addColorStop(0.4, '#E7CD86')
    g.addColorStop(0.5, '#FBEBC0')
    g.addColorStop(0.6, '#E7CD86')
    g.addColorStop(1, '#A07A2C')
    ctx.globalCompositeOperation = 'source-over'
    ctx.fillStyle = g
    ctx.fillRect(0, 0, w, h)
    ctx.fillStyle = 'rgba(74,10,24,0.5)'
    ctx.font = '600 22px Cormorant Garamond, serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('✦', w / 2, h / 2)
  }, [])

  const setup = useCallback(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return
    const r = window.devicePixelRatio || 1
    const rect = wrap.getBoundingClientRect()
    canvas.width = rect.width * r
    canvas.height = rect.height * r
    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`
    const ctx = canvas.getContext('2d')
    ctx.scale(r, r)
    if (done.current) ctx.clearRect(0, 0, rect.width, rect.height)
    else paint(ctx, rect.width, rect.height)
  }, [paint])

  useEffect(() => {
    setup()
    window.addEventListener('resize', setup)
    return () => window.removeEventListener('resize', setup)
  }, [setup])

  const pos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect()
    const p = e.touches ? e.touches[0] : e
    return { x: p.clientX - rect.left, y: p.clientY - rect.top }
  }
  const scratch = (x, y) => {
    const ctx = canvasRef.current.getContext('2d')
    ctx.globalCompositeOperation = 'destination-out'
    ctx.lineWidth = 28
    ctx.lineCap = 'round'
    const from = last.current || { x, y }
    ctx.beginPath()
    ctx.moveTo(from.x, from.y)
    ctx.lineTo(x, y)
    ctx.stroke()
    ctx.beginPath()
    ctx.arc(x, y, 14, 0, Math.PI * 2)
    ctx.fill()
    last.current = { x, y }
  }
  const pct = () => {
    const c = canvasRef.current
    const ctx = c.getContext('2d')
    const data = ctx.getImageData(0, 0, c.width, c.height).data
    let cleared = 0, total = 0
    for (let i = 3; i < data.length; i += 4 * 24) {
      total++
      if (data[i] === 0) cleared++
    }
    return total ? cleared / total : 0
  }
  const reveal = () => {
    if (done.current) return
    done.current = true
    setRevealed(true)
    const c = canvasRef.current
    const ctx = c.getContext('2d')
    let a = 1
    const fade = () => {
      a -= 0.1
      ctx.clearRect(0, 0, c.width, c.height)
      if (a > 0) {
        ctx.globalCompositeOperation = 'source-over'
        ctx.globalAlpha = a
        paint(ctx, c.clientWidth, c.clientHeight)
        ctx.globalAlpha = 1
        requestAnimationFrame(fade)
      }
    }
    requestAnimationFrame(fade)
    onReveal?.()
  }

  const start = (e) => { if (done.current) return; drawing.current = true; const { x, y } = pos(e); last.current = { x, y }; scratch(x, y) }
  const move = (e) => { if (!drawing.current || done.current) return; e.preventDefault(); const { x, y } = pos(e); scratch(x, y) }
  const end = () => { if (!drawing.current || done.current) return; drawing.current = false; last.current = null; if (pct() >= COIN_THRESHOLD) reveal() }

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative">
        {!revealed && (
          <motion.span
            className="absolute -inset-1 rounded-full"
            style={{ boxShadow: '0 0 18px 3px rgba(231,205,134,0.45)' }}
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
        )}
        <motion.div
          ref={wrapRef}
          className="relative h-[92px] w-[92px] select-none overflow-hidden rounded-full bg-cream-light shadow-card ring-2 ring-gold/60"
          animate={revealed ? {} : { y: [0, -4, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.span
              className="font-serif text-2xl font-semibold text-maroon"
              animate={revealed ? { scale: [0.5, 1.2, 1] } : {}}
              transition={{ duration: 0.5 }}
            >
              {coin.v}
            </motion.span>
          </div>
          <canvas
            ref={canvasRef}
            className={`absolute inset-0 touch-none ${revealed ? 'pointer-events-none' : 'cursor-grab active:cursor-grabbing'}`}
            onMouseDown={start}
            onMouseMove={move}
            onMouseUp={end}
            onMouseLeave={end}
            onTouchStart={start}
            onTouchMove={move}
            onTouchEnd={end}
          />
        </motion.div>
      </div>
      <span className="font-body text-[9px] uppercase tracking-[0.25em] text-gold-light/70">{coin.k}</span>
    </div>
  )
}

const DONE_KEY = 'sf-scratch-done'

export default function ScratchCard() {
  const coins = dateCoins()
  // Remember if this guest already scratched — don't make them do it again.
  const initialDone = (() => {
    try {
      return localStorage.getItem(DONE_KEY) === '1'
    } catch {
      return false
    }
  })()
  const [revealedCount, setRevealedCount] = useState(initialDone ? coins.length : 0)
  const [burst, setBurst] = useState(false)
  const allDone = revealedCount >= coins.length

  const handleReveal = () => {
    setRevealedCount((n) => {
      const next = n + 1
      if (next >= coins.length) {
        setBurst(true)
        setTimeout(() => setBurst(false), 4000)
        try {
          localStorage.setItem(DONE_KEY, '1')
        } catch {
          /* ignore */
        }
      }
      return next
    })
  }

  return (
    <section id="invitation" className="relative overflow-hidden pattern-maroon px-5 py-20">
      {burst && <Confetti />}
      <Watermark tone="maroon" />

      <div className="relative z-10 mx-auto max-w-sm">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[2rem] bg-gradient-to-b from-maroon-wine to-maroon-dark px-6 py-9 text-center shadow-card ring-1 ring-gold/30"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(231,205,134,0.2),transparent_60%)]" />
          <span className="pointer-events-none absolute inset-2.5 rounded-[1.6rem] border border-gold/20" />

          <p className="font-body text-[10px] uppercase tracking-[0.45em] text-gold/80">Save the Date</p>
          <h2 className="mt-2 font-script text-5xl text-gold-shimmer">Reveal</h2>
          <p className="mt-2 font-serif text-base text-cream/85">
            {wedding.bride.name} &amp; {wedding.groom.name}
          </p>

          {/* hint / done line */}
          <div className="mt-3 h-5">
            <AnimatePresence mode="wait">
              {!allDone ? (
                <motion.p
                  key="hint"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                  className="font-body text-[11px] uppercase tracking-[0.25em] text-gold-light"
                >
                  ✦ scratch the coins ✦
                </motion.p>
              ) : (
                <motion.p
                  key="done"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-body text-[11px] uppercase tracking-[0.25em] text-gold-light"
                >
                  Save the date ♥
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* coins */}
          <div className="mt-6 flex items-start justify-center gap-3">
            {coins.map((coin, i) => (
              <ScratchCoin key={i} coin={coin} onReveal={handleReveal} revealedInit={initialDone} />
            ))}
          </div>

          {/* progress */}
          <div className="mx-auto mt-7 w-full max-w-[16rem]">
            <div className="h-1.5 overflow-hidden rounded-full bg-maroon-dark/70">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-gold to-gold-light"
                animate={{ width: `${Math.round((revealedCount / coins.length) * 100)}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>
            <p className="mt-2 font-body text-[10px] uppercase tracking-[0.2em] text-cream/55">
              {revealedCount} / {coins.length} revealed
            </p>
          </div>

          {/* celebration reveal */}
          <AnimatePresence>
            {allDone && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="mt-6"
              >
                <div className="mx-auto mb-4 h-px w-24 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
                <p className="font-serif text-2xl text-cream-light">{wedding.dateLabel}</p>
                <p className="mt-2 font-body text-[11px] uppercase tracking-[0.25em] text-gold-light">{wedding.timeLabel}</p>
                <p className="mt-1 font-serif text-base text-cream/80">{wedding.venue.name}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
