import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { wedding } from '../data/config'
import { SectionHeading, Reveal } from './ui'
import { IslamicPattern } from './IslamicPattern'
import { FloralStrip } from './Florals'
import Confetti from './Confetti'

const FIELD =
  'w-full rounded-xl border border-gold/40 bg-maroon-dark/40 px-4 py-3 font-body text-cream-light placeholder:text-cream/40 outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30'

export default function RSVP() {
  const [form, setForm] = useState({ name: '', guests: '1', attending: 'yes', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim()) return
    try {
      localStorage.setItem('wedding-rsvp', JSON.stringify(form))
    } catch {
      /* ignore */
    }
    setSubmitted(true)
  }

  return (
    <section id="rsvp" className="relative overflow-hidden pattern-maroon px-5 py-20">
      {submitted && <Confetti />}
      <IslamicPattern opacity={0.1} color="#E7CD86" />

      <div className="relative mx-auto max-w-sm">
        <SectionHeading kicker="Will You Join Us?" title="RSVP" subtitle="Kindly respond by 1st September 2026" tone="maroon" />

        <Reveal>
          <div className="gold-frame relative overflow-hidden rounded-3xl">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-4 bg-maroon-wine/70 p-6 backdrop-blur"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                >
                  <div>
                    <label className="mb-1 block font-body text-[10px] uppercase tracking-[0.2em] text-gold-light">Full Name</label>
                    <input type="text" required value={form.name} onChange={update('name')} placeholder="Your name" className={FIELD} />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="mb-1 block font-body text-[10px] uppercase tracking-[0.2em] text-gold-light">Guests</label>
                      <select value={form.guests} onChange={update('guests')} className={FIELD}>
                        {[1, 2, 3, 4, 5, 6].map((n) => (<option key={n} value={n} className="text-ink">{n}</option>))}
                      </select>
                    </div>
                    <div>
                      <label className="mb-1 block font-body text-[10px] uppercase tracking-[0.2em] text-gold-light">Attending?</label>
                      <select value={form.attending} onChange={update('attending')} className={FIELD}>
                        <option value="yes" className="text-ink">Joyfully accepts</option>
                        <option value="no" className="text-ink">Regretfully declines</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block font-body text-[10px] uppercase tracking-[0.2em] text-gold-light">Message / Dua</label>
                    <textarea rows={4} value={form.message} onChange={update('message')} placeholder="Share your blessings…" className={`${FIELD} resize-none`} />
                  </div>

                  <button type="submit" className="btn-gold w-full">Send RSVP</button>
                </motion.form>
              ) : (
                <motion.div
                  key="thanks"
                  className="flex flex-col items-center bg-maroon-wine/80 p-10 text-center backdrop-blur"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <motion.div
                    className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-gold-light to-gold-dark shadow-gold"
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                  >
                    <motion.svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#4A0A18" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                      <motion.path d="M5 13l4 4L19 7" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.4 }} />
                    </motion.svg>
                  </motion.div>

                  <h3 className="mt-5 font-script text-4xl text-gold-shimmer">
                    {form.attending === 'yes' ? 'JazakAllah Khair!' : 'Thank You'}
                  </h3>
                  <p className="mt-3 max-w-sm font-serif text-base text-cream-light text-balance">
                    {form.attending === 'yes'
                      ? `Dear ${form.name}, we are overjoyed that you'll celebrate with us. See you there, In sha Allah!`
                      : `Dear ${form.name}, we'll miss you — thank you for your kind wishes. You'll be in our duas.`}
                  </p>
                  {form.message && <p className="mt-3 font-body text-sm italic text-cream/70">“{form.message}”</p>}
                  <button onClick={() => setSubmitted(false)} className="btn-outline mt-7">Edit Response</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>

      <FloralStrip className="absolute inset-x-0 -bottom-2 z-20 opacity-95" />
    </section>
  )
}
