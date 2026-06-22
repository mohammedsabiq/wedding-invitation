import { useEffect, useRef } from 'react'

// Lightweight canvas confetti in the wedding palette. Self-contained:
// mount it (e.g. when `burst` is true) and it animates for ~3.5s.
const COLORS = ['#C29A45', '#E7CD86', '#FBEBC0', '#6E1124', '#A81E32', '#C8324A']

export default function Confetti({ count = 140 }) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    let raf
    const dpr = window.devicePixelRatio || 1
    const resize = () => {
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const W = () => window.innerWidth
    const H = () => window.innerHeight

    const pieces = Array.from({ length: count }, () => ({
      x: Math.random() * W(),
      y: -20 - Math.random() * H() * 0.5,
      r: 4 + Math.random() * 7,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      vx: -2 + Math.random() * 4,
      vy: 2 + Math.random() * 4,
      rot: Math.random() * Math.PI,
      vr: -0.15 + Math.random() * 0.3,
      shape: Math.random() > 0.5 ? 'rect' : 'circ',
      sway: Math.random() * Math.PI * 2,
    }))

    let frame = 0
    const maxFrames = 230
    const tick = () => {
      ctx.clearRect(0, 0, W(), H())
      pieces.forEach((p) => {
        p.sway += 0.03
        p.x += p.vx + Math.sin(p.sway) * 1.2
        p.y += p.vy
        p.rot += p.vr
        p.vy += 0.03 // gravity
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rot)
        ctx.fillStyle = p.color
        ctx.globalAlpha = Math.max(0, 1 - frame / maxFrames)
        if (p.shape === 'rect') {
          ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 0.6)
        } else {
          ctx.beginPath()
          ctx.arc(0, 0, p.r / 2, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.restore()
      })
      frame++
      if (frame < maxFrames) raf = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [count])

  return (
    <canvas
      ref={ref}
      className="pointer-events-none fixed inset-0 z-[55]"
      aria-hidden="true"
    />
  )
}
