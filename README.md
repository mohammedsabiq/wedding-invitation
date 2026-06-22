# 💍 Luxury Muslim Wedding Invitation

A premium, interactive digital wedding invitation with a luxury Islamic
aesthetic — olive green, deep emerald, gold accents, warm beige, and soft
brown typography. Built with **React + Vite + Tailwind CSS + Framer Motion**.

## ✨ Features

- **Opening envelope animation** — tap the wax seal to open the invitation.
- **Scratch-to-reveal card** — drag (mouse/touch) over gold foil to uncover the
  date, time and venue, with a live reveal % and confetti on completion.
- **Hero** with Bismillah, blessings, couple names and animated gold typography.
- **Couple section** with animated portrait frames + a Qur'anic verse.
- **Wedding details** with a live **countdown timer** and **Add to Calendar**.
- **Animated event timeline** (Nikah · Walima · Dinner).
- **Location section** — embedded map, animated pin, "Open in Google Maps",
  and a **QR code** for directions.
- **RSVP form** with a beautiful confirmation animation + confetti.
- **Background music toggle** with smooth fade in/out (uses `/public/music.mp3`
  if present, otherwise plays a gentle generated ambient chord).
- **Gallery** — masonry layout, hover effects, lightbox with keyboard nav.
- **Premium extras** — Islamic geometric pattern generator, animated gold
  borders, floating petals & golden particles, glassmorphism cards, share
  button, responsive (desktop / tablet / mobile).

## 🚀 Getting started

```bash
npm install      # already done
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # production build into /dist
npm run preview  # preview the production build
```

## 🎨 Personalising

Almost everything is driven from **one file**:

```
src/data/config.js
```

Edit the couple names, parents, date/time, venue + coordinates, timeline,
gallery captions, hashtag and contact there.

### Photos
- Couple portraits: set `bride.photo` / `groom.photo` to an image path
  (drop the file in `/public`, e.g. `'/bride.jpg'`).
- Gallery images: set each `gallery[i].src`. Empty entries render elegant
  gradient placeholders.

### Music
Drop an MP3 at `public/music.mp3`. If absent, the toggle plays a soft
generated ambient tone so it always works.

### Map
The map auto-uses `venue.lat` / `venue.lng` if provided, otherwise falls back
to `venue.mapsQuery`.

## 🧩 Structure

```
src/
├─ App.jsx                 # composition of all sections
├─ data/config.js          # ← edit your wedding details here
└─ components/
   ├─ EnvelopeIntro.jsx    # opening envelope overlay
   ├─ Navbar.jsx           # sticky nav with smooth scroll
   ├─ Hero.jsx             # names + blessings
   ├─ ScratchCard.jsx      # scratch-to-reveal canvas
   ├─ CoupleSection.jsx
   ├─ WeddingDetails.jsx   # countdown + add-to-calendar
   ├─ Timeline.jsx
   ├─ LocationSection.jsx  # map + animated pin + QR
   ├─ RSVP.jsx             # form + confirmation
   ├─ Gallery.jsx          # masonry + lightbox
   ├─ MusicToggle.jsx
   ├─ ShareButton.jsx
   ├─ Confetti.jsx
   ├─ Petals.jsx           # ambient petals/particles
   ├─ IslamicPattern.jsx   # geometric pattern generator + flourishes
   └─ ui.jsx               # Reveal + SectionHeading helpers
```

## 📨 Hooking up RSVP submissions

By default the RSVP saves to `localStorage` for the demo. To collect real
responses, POST the form data in `RSVP.jsx`'s `handleSubmit` to your endpoint
(Formspree, Google Apps Script, a serverless function, etc.).

---

_Together with the blessings of Allah._ ✦
