import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import EnvelopeIntro from './components/EnvelopeIntro'
import Petals from './components/Petals'
import Hero from './components/Hero'
import BismillahSection from './components/BismillahSection'
import ScratchCard from './components/ScratchCard'
import CoupleSection from './components/CoupleSection'
import WeddingDetails from './components/WeddingDetails'
import Timeline from './components/Timeline'
import LocationSection from './components/LocationSection'
import Footer from './components/Footer'
import MusicToggle from './components/MusicToggle'

export default function App() {
  // `?open=1` skips the intro, so the page starts unlocked in that case.
  const [opened, setOpened] = useState(
    () => typeof window !== 'undefined' && /[?&]open=1\b/.test(window.location.search),
  )
  // Hide the ambient petals/sparkles over the last section (footer video).
  const [atFooter, setAtFooter] = useState(false)
  const footerRef = useRef(null)
  const lenisRef = useRef(null)

  // Smooth, inertial scrolling via Lenis.
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const lenis = new Lenis({
      lerp: 0.06, // lower = floatier, longer glide
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 0.9, // slower, more controlled touch scrolling
    })
    lenisRef.current = lenis
    let raf
    const loop = (t) => {
      lenis.raf(t)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    // Route in-page anchor links through Lenis for smooth section jumps.
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]')
      if (!a) return
      const id = a.getAttribute('href')
      if (id.length > 1) {
        const el = document.querySelector(id)
        if (el) {
          e.preventDefault()
          lenis.scrollTo(el, { offset: -8 })
        }
      }
    }
    document.addEventListener('click', onClick)

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('click', onClick)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  // Lock page scrolling while the opening intro is showing.
  useEffect(() => {
    document.body.style.overflow = opened ? '' : 'hidden'
    const lenis = lenisRef.current
    if (lenis) opened ? lenis.start() : lenis.stop()
    return () => {
      document.body.style.overflow = ''
    }
  }, [opened])

  useEffect(() => {
    const el = footerRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => setAtFooter(entry.isIntersecting),
      { threshold: 0.12 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    // Dark maroon "stage" — on desktop the invitation sits centred like a card;
    // on mobile the device column is full-width (true mobile-first experience).
    <div className="relative min-h-screen stage-bg sm:py-8">
      {/* Opening envelope overlay */}
      <EnvelopeIntro onOpened={() => setOpened(true)} />

      {/* Ambient floating rose petals + golden particles — hidden on the footer */}
      {!atFooter && <Petals />}

      {/* The portrait invitation card */}
      <div className="device sm:rounded-[2rem]">
        <main>
          <Hero />
          <BismillahSection />
          <ScratchCard />
          <CoupleSection />
          <WeddingDetails />
          <Timeline />
          <LocationSection />
        </main>
        <div ref={footerRef}>
          <Footer />
        </div>
        <MusicToggle autoStartSignal={opened} />
      </div>
    </div>
  )
}
