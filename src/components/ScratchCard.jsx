import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { wedding } from '../data/config'
import Watermark from './Watermark'
import Confetti from './Confetti'

const REVEAL_THRESHOLD = 0.5

// Small decorative flourish used in the card corners.
function CornerFlourish({ className }) {
  return (
    <svg className={className} width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true">
      <path d="M2 2v14M2 2h14" stroke="#E7CD86" strokeOpacity="0.5" strokeWidth="1" strokeLinecap="round" />
      <path d="M8 8c8 0 14 6 14 14" stroke="#E7CD86" strokeOpacity="0.3" strokeWidth="0.8" strokeLinecap="round" />
      <circle cx="6" cy="6" r="1.6" fill="#E7CD86" fillOpacity="0.7" />
    </svg>
  )
}

// One wide gold panel the guest scratches to uncover the full wedding date.
function ScratchPanel({ onReveal, revealedInit, children }) {
  const canvasRef = useRef(null)
  const wrapRef = useRef(null)
  const drawing = useRef(false)
  const last = useRef(null)
  const done = useRef(revealedInit)
  const [revealed, setRevealed] = useState(revealedInit)

  const paint = useCallback((ctx, w, h) => {
    const g = ctx.createLinearGradient(0, 0, w, h)
    g.addColorStop(0, '#9C7529')
    g.addColorStop(0.35, '#E7CD86')
    g.addColorStop(0.5, '#FBEBC0')
    g.addColorStop(0.65, '#E7CD86')
    g.addColorStop(1, '#9C7529')
    ctx.globalCompositeOperation = 'source-over'
    ctx.fillStyle = g
    ctx.fillRect(0, 0, w, h)
    // subtle minted texture dots
    ctx.fillStyle = 'rgba(122,90,46,0.18)'
    for (let y = 10; y < h; y += 16) {
      for (let x = (y % 32 === 0 ? 10 : 18); x < w; x += 16) {
        ctx.beginPath()
        ctx.arc(x, y, 1, 0, Math.PI * 2)
        ctx.fill()
      }
    }
    ctx.fillStyle = 'rgba(74,10,24,0.55)'
    ctx.font = '600 15px Cormorant Garamond, serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('✦  S C R A T C H   H E R E  ✦', w / 2, h / 2)
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
    ctx.lineWidth = 34
    ctx.lineCap = 'round'
    const from = last.current || { x, y }
    ctx.beginPath()
    ctx.moveTo(from.x, from.y)
    ctx.lineTo(x, y)
    ctx.stroke()
    ctx.beginPath()
    ctx.arc(x, y, 18, 0, Math.PI * 2)
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
  const end = () => { if (!drawing.current || done.current) return; drawing.current = false; last.current = null; if (pct() >= REVEAL_THRESHOLD) reveal() }

  return (
    <div className="relative">
      {!revealed && (
        <motion.span
          className="pointer-events-none absolute -inset-1.5 rounded-[1.4rem]"
          style={{ boxShadow: '0 0 26px 4px rgba(231,205,134,0.4)' }}
          animate={{ opacity: [0.25, 0.7, 0.25] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
      {/* embossed gold rim */}
      <div
        className="relative rounded-[1.4rem] p-[3px]"
        style={{ background: 'conic-gradient(from 210deg, #A07A2C, #FBEBC0, #E7CD86, #A07A2C, #FBEBC0, #A07A2C)' }}
      >
        <div
          ref={wrapRef}
          className="relative h-[140px] w-full select-none overflow-hidden rounded-[1.25rem] bg-cream-light shadow-[inset_0_2px_8px_rgba(122,90,46,0.3)]"
        >
          <span className="pointer-events-none absolute inset-[8px] z-10 rounded-[1rem] border border-gold-dark/25" />
          <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
            {children}
          </div>
          {revealed && (
            <motion.span
              className="pointer-events-none absolute inset-y-0 z-20 w-1/3 bg-gradient-to-r from-transparent via-white/55 to-transparent"
              initial={{ x: '-160%' }}
              animate={{ x: '320%' }}
              transition={{ duration: 1, delay: 0.15, ease: 'easeInOut' }}
            />
          )}
          <canvas
            ref={canvasRef}
            className={`absolute inset-0 z-30 touch-none ${revealed ? 'pointer-events-none' : 'cursor-grab active:cursor-grabbing'}`}
            onMouseDown={start}
            onMouseMove={move}
            onMouseUp={end}
            onMouseLeave={end}
            onTouchStart={start}
            onTouchMove={move}
            onTouchEnd={end}
          />
        </div>
      </div>
    </div>
  )
}

export default function ScratchCard() {
  // Always start covered so every guest gets to scratch the date open.
  const initialDone = false
  const [revealed, setRevealed] = useState(initialDone)
  const [burst, setBurst] = useState(false)

  const handleReveal = () => {
    setRevealed(true)
    setBurst(true)
    setTimeout(() => setBurst(false), 4000)
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
          className="gold-frame relative overflow-hidden rounded-[2rem] bg-gradient-to-b from-maroon-wine to-maroon-dark px-6 py-9 text-center shadow-card"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(231,205,134,0.2),transparent_60%)]" />
          {/* refined double inset frame */}
          <span className="pointer-events-none absolute inset-2 rounded-[1.7rem] border border-gold/35" />
          <span className="pointer-events-none absolute inset-[0.65rem] rounded-[1.5rem] border border-gold/15" />
          <CornerFlourish className="pointer-events-none absolute left-3 top-3" />
          <CornerFlourish className="pointer-events-none absolute right-3 top-3 -scale-x-100" />
          <CornerFlourish className="pointer-events-none absolute bottom-3 left-3 -scale-y-100" />
          <CornerFlourish className="pointer-events-none absolute bottom-3 right-3 -scale-100" />

          <div className="relative">
            <p className="font-body text-[10px] uppercase tracking-[0.45em] text-gold/80">Save the Date</p>
            <h2 className="mt-2 font-script text-5xl text-gold-shimmer">Reveal</h2>
            <p className="mt-2 font-serif text-base text-cream/85">
              {wedding.bride.name} &amp; {wedding.groom.name}
            </p>

            {/* hint line — only before the reveal; nothing shown afterwards */}
            <div className="mb-6 mt-3 h-5">
              <AnimatePresence mode="wait">
                {!revealed && (
                  <motion.p
                    key="hint"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                    className="font-body text-[11px] uppercase tracking-[0.25em] text-gold-light"
                  >
                    ✦ scratch to reveal the date ✦
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* single scratch panel revealing the full date */}
            <ScratchPanel onReveal={handleReveal} revealedInit={initialDone}>
              <motion.div
                animate={revealed ? { scale: [0.85, 1.05, 1], opacity: 1 } : { opacity: 1 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center text-maroon-dark"
              >
                <span className="font-body text-[10px] uppercase tracking-[0.4em] text-gold-dark">
                  {new Date(wedding.date).toLocaleString('en', { weekday: 'long' })}
                </span>
                {/* day flanked by hairlines */}
                <div className="mt-1.5 flex items-center gap-3">
                  <span className="h-px w-8 bg-gold-dark/40" />
                  <span className="font-script text-[3.4rem] leading-none">
                    {new Date(wedding.date).getDate()}
                  </span>
                  <span className="h-px w-8 bg-gold-dark/40" />
                </div>
                <span className="mt-1 font-serif text-xl font-semibold uppercase tracking-[0.28em]">
                  {new Date(wedding.date).toLocaleString('en', { month: 'long' })}{' '}
                  {new Date(wedding.date).getFullYear()}
                </span>
              </motion.div>
            </ScratchPanel>

            {/* venue line appears after the reveal */}
            <AnimatePresence>
              {revealed && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.6 }}
                  className="mt-6"
                >
                  <div className="mx-auto mb-3 h-px w-24 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
                  <p className="mb-1.5 font-body text-[10px] uppercase tracking-[0.28em] text-gold-light">
                    {wedding.timeLabel}
                  </p>
                  <p className="font-serif text-base text-cream-light">{wedding.venue.name}</p>
                  <p className="mt-0.5 font-body text-[10px] uppercase tracking-[0.22em] text-cream/60">
                    {wedding.venue.address}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
