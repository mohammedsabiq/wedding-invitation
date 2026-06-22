import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

// Floating music control.
// If you add a real track at /public/music.mp3 it will be used and faded
// in/out smoothly. Otherwise a gentle generated ambient tone plays so the
// toggle always does something out of the box.
const TRACK_SRC = '/music.mp3'
const FADE_MS = 1200
const TARGET_VOLUME = 0.4

export default function MusicToggle({ autoStartSignal }) {
  const audioRef = useRef(null)
  const fadeRef = useRef(null)
  const synthRef = useRef(null) // { ctx, gain, oscillators }
  const [playing, setPlaying] = useState(false)
  const [hasTrack, setHasTrack] = useState(true)

  // Probe whether a real track exists.
  useEffect(() => {
    let cancelled = false
    fetch(TRACK_SRC, { method: 'HEAD' })
      .then((r) => !cancelled && setHasTrack(r.ok))
      .catch(() => !cancelled && setHasTrack(false))
    return () => {
      cancelled = true
    }
  }, [])

  const fadeAudio = (to) => {
    const audio = audioRef.current
    if (!audio) return
    clearInterval(fadeRef.current)
    const steps = 24
    const stepT = FADE_MS / steps
    const start = audio.volume
    let i = 0
    fadeRef.current = setInterval(() => {
      i++
      audio.volume = Math.min(1, Math.max(0, start + (to - start) * (i / steps)))
      if (i >= steps) {
        clearInterval(fadeRef.current)
        if (to === 0) audio.pause()
      }
    }, stepT)
  }

  // Gentle, original looping melody synthesised with the Web Audio API
  // (a calm major arpeggio progression with a soft pad underneath).
  const startSynth = () => {
    const Ctx = window.AudioContext || window.webkitAudioContext
    const ctx = new Ctx()
    const master = ctx.createGain()
    master.gain.setValueAtTime(0, ctx.currentTime)
    master.gain.linearRampToValueAtTime(0.5, ctx.currentTime + FADE_MS / 1000)
    master.connect(ctx.destination)

    // Four-chord progression (C – G – Am – F), each as [root, 3rd, 5th, octave].
    const chords = [
      [261.63, 329.63, 392.0, 523.25],
      [196.0, 246.94, 392.0, 587.33],
      [220.0, 261.63, 329.63, 440.0],
      [174.61, 261.63, 349.23, 523.25],
    ]
    const NOTE = 0.34 // seconds between arpeggio notes
    const CHORD = NOTE * 4 // 4 notes per chord
    const LOOP = CHORD * chords.length

    const pluck = (freq, when, dur, vol, type) => {
      const osc = ctx.createOscillator()
      const g = ctx.createGain()
      osc.type = type
      osc.frequency.value = freq
      g.gain.setValueAtTime(0, when)
      g.gain.linearRampToValueAtTime(vol, when + 0.02)
      g.gain.exponentialRampToValueAtTime(0.0001, when + dur)
      osc.connect(g).connect(master)
      osc.start(when)
      osc.stop(when + dur + 0.05)
    }

    const scheduleLoop = (start) => {
      chords.forEach((chord, ci) => {
        const cStart = start + ci * CHORD
        // soft sustained pad (root + fifth, low octave)
        pluck(chord[0] / 2, cStart, CHORD + 0.3, 0.05, 'triangle')
        pluck(chord[2] / 2, cStart, CHORD + 0.3, 0.04, 'sine')
        // arpeggio (one octave up, bell-like)
        chord.forEach((f, ni) => pluck(f * 2, cStart + ni * NOTE, 0.9, 0.12, 'sine'))
      })
    }

    let next = ctx.currentTime + 0.15
    const tick = () => {
      while (next < ctx.currentTime + 1) {
        scheduleLoop(next)
        next += LOOP
      }
      synthRef.current.timer = setTimeout(tick, 250)
    }
    synthRef.current = { ctx, master, timer: null }
    tick()
  }

  const stopSynth = () => {
    const s = synthRef.current
    if (!s) return
    clearTimeout(s.timer)
    s.master.gain.linearRampToValueAtTime(0, s.ctx.currentTime + FADE_MS / 1000)
    setTimeout(() => {
      s.ctx.close()
      synthRef.current = null
    }, FADE_MS + 100)
  }

  const toggle = () => {
    if (playing) {
      hasTrack ? fadeAudio(0) : stopSynth()
      setPlaying(false)
    } else {
      if (hasTrack && audioRef.current) {
        audioRef.current.volume = 0
        audioRef.current.play().then(() => fadeAudio(TARGET_VOLUME)).catch(() => {})
      } else {
        startSynth()
      }
      setPlaying(true)
    }
  }

  // Try to auto-start after the envelope opens (best-effort; browsers may block).
  useEffect(() => {
    if (autoStartSignal && !playing) {
      const t = setTimeout(() => {
        try {
          toggle()
        } catch {
          /* autoplay blocked — user can tap the button */
        }
      }, 400)
      return () => clearTimeout(t)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoStartSignal])

  return (
    <>
      {hasTrack && (
        <audio ref={audioRef} src={TRACK_SRC} loop preload="none" />
      )}
      <motion.button
        onClick={toggle}
        className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-maroon to-maroon-dark shadow-card ring-1 ring-gold/40"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        aria-label={playing ? 'Mute music' : 'Play music'}
        title={playing ? 'Mute music' : 'Play music'}
      >
        {/* animated equalizer bars when playing */}
        {playing ? (
          <div className="flex items-end gap-[3px]">
            {[0, 1, 2, 3].map((i) => (
              <motion.span
                key={i}
                className="w-[3px] rounded-full bg-gold-glow"
                animate={{ height: [6, 16, 9, 18, 6] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
              />
            ))}
          </div>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E7CD86" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18V5l11-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="17" cy="16" r="3" />
          </svg>
        )}
      </motion.button>
    </>
  )
}
