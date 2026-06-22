import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { coupleNames, wedding } from '../data/config'

// Share the invitation via the Web Share API, with a copy-link fallback.
export default function ShareButton() {
  const [copied, setCopied] = useState(false)

  const shareData = {
    title: `${coupleNames} — Wedding Invitation`,
    text: `${wedding.blessing}. You're invited to the wedding of ${coupleNames}! ${wedding.hashtag}`,
    url: typeof window !== 'undefined' ? window.location.href : '',
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData)
        return
      } catch {
        /* user cancelled — fall through to copy */
      }
    }
    try {
      await navigator.clipboard.writeText(shareData.url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      /* clipboard blocked */
    }
  }

  return (
    <div className="relative">
      <motion.button
        onClick={handleShare}
        whileTap={{ scale: 0.94 }}
        className="btn-outline"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
        </svg>
        Share Invitation
      </motion.button>

      <AnimatePresence>
        {copied && (
          <motion.span
            className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gold px-4 py-1.5 font-body text-xs text-maroon-dark shadow-card"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
          >
            Link copied ✓
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}
