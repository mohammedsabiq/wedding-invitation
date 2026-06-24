import { wedding } from '../data/config'
import { GoldRings } from './Roses'
import { Reveal } from './ui'
import Watermark from './Watermark'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden px-5 pt-4 pb-14 text-center text-cream-light">
      {/* full-bleed looping video backdrop */}
      <video
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      >
        <source src="/footer-bg.mp4" type="video/mp4" />
      </video>
      <Watermark tone="maroon" />

      <div className="relative z-10 mx-auto max-w-sm">
        <Reveal>
          {/* spacer preserving the height the monogram + arch motif + blessing used to occupy */}
          <div aria-hidden="true" className="h-[11rem]" />

          <div className="mt-6 flex flex-col items-center font-script text-5xl leading-[1.2] text-gold-shimmer">
            <span className="pb-1">{wedding.bride.name}</span>
            <span className="my-1 text-3xl">&amp;</span>
            <span className="pb-1">{wedding.groom.name}</span>
          </div>

          {/* original closing line */}
          <p className="mx-auto mt-5 max-w-xs font-serif text-lg italic leading-relaxed text-cream/80 text-balance">
            Two souls, one path —
            <br />
            written with love, sealed with His blessings.
          </p>

          <div className="my-7 flex justify-center"><GoldRings size={56} /></div>

          <p className="font-body text-sm tracking-[0.25em] text-gold-light/90">{wedding.hashtag}</p>
          <p className="mt-1 font-body text-sm text-cream/70">{wedding.dateLabel}</p>

          <div className="mt-10 flex items-center justify-center gap-3 text-gold/40">
            <span className="h-px w-12 bg-gold/25" />
            <span>✦</span>
            <span className="h-px w-12 bg-gold/25" />
          </div>
        </Reveal>
      </div>
    </footer>
  )
}
