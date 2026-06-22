import { wedding } from '../data/config'
import { ArchMotif } from './IslamicPattern'
import { GoldRings } from './Roses'
import { Reveal } from './ui'
import Watermark from './Watermark'

// Gold monogram ring with the couple's initials.
function Monogram() {
  const initials = `${wedding.bride.name[0]} · ${wedding.groom.name[0]}`
  return (
    <div className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center">
      <span className="absolute inset-0 rounded-full border border-dashed border-gold/40 animate-spin-slow" />
      <span className="absolute inset-[6px] rounded-full border border-gold/60" />
      <span className="font-serif text-2xl font-semibold text-gold-shimmer">{initials}</span>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden px-5 py-20 text-center text-cream-light">
      {/* dark luxury backdrop */}
      <div className="absolute inset-0 bg-gradient-to-b from-maroon-deep via-[#27060e] to-black" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(194,154,69,0.2),transparent_60%)]" />
      <Watermark tone="maroon" />

      <div className="relative z-10 mx-auto max-w-sm">
        <Reveal>
          <Monogram />
          <ArchMotif className="mx-auto mb-3 h-10 w-24 opacity-90" color="#E7CD86" />
          <p className="font-arabic text-2xl text-gold-light">بَارَكَ اللّٰهُ لَكُمَا</p>

          <div className="mt-6 flex flex-col items-center font-script text-5xl leading-[1.05] text-gold-shimmer">
            <span>{wedding.bride.name}</span>
            <span className="my-1 text-3xl">&amp;</span>
            <span>{wedding.groom.name}</span>
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
