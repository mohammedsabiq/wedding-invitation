import { useState } from 'react'
import { motion } from 'framer-motion'
import { wedding } from '../data/config'
import { Reveal } from './ui'
import { CornerFlourish } from './IslamicPattern'
import Watermark from './Watermark'

// Couple illustration for this section: /public/couple2.png if present.
function CoupleImage2() {
  const [hasImg, setHasImg] = useState(true)
  if (!hasImg) return null
  return (
    <Reveal>
      <div className="gold-frame mx-auto mb-10 max-w-[18rem] overflow-hidden rounded-[1.8rem] shadow-card">
        <img
          src="/couple2.png"
          alt={`${wedding.bride.name} & ${wedding.groom.name}`}
          className="block w-full"
          onError={() => setHasImg(false)}
        />
      </div>
    </Reveal>
  )
}

// Quiet cream "In the name of Allah" screen, echoing the reference flow:
// envelope -> names -> this gentle Bismillah interstitial -> details.
export default function BismillahSection() {
  return (
    <section className="relative overflow-hidden pattern-cream px-6 py-24">
      <Watermark tone="cream" />
      <CornerFlourish className="absolute left-5 top-8 h-12 w-12 opacity-30" />
      <CornerFlourish className="absolute right-5 top-8 h-12 w-12 -scale-x-100 opacity-30" />

      <div className="relative z-10 mx-auto max-w-sm text-center">
        <CoupleImage2 />

        <Reveal>
          <motion.p
            className="font-arabic text-3xl leading-relaxed text-maroon"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
          </motion.p>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-6 font-body text-xs uppercase leading-loose tracking-[0.3em] text-ink-light">
            In the name of Allah,
            <br />
            the Most Gracious and the Most Merciful
          </p>
        </Reveal>

        <Reveal delay={0.35}>
          <div className="gold-divider mx-auto mt-8 max-w-[14rem]">
            <span className="text-gold">✦</span>
          </div>
          <p className="mx-auto mt-6 max-w-xs font-serif text-lg italic text-ink text-balance">
            {wedding.inviteLine}
          </p>
          <p className="mt-4 font-script text-4xl text-maroon">
            {wedding.bride.name} &amp; {wedding.groom.name}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
