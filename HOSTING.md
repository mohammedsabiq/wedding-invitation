# 🌐 Hosting this invitation

This is a **static site** (Vite + React). It builds to a plain `dist/` folder of
HTML/CSS/JS — no server or database needed — so any static host works and most
have a **free tier** that is more than enough for a wedding invite.

Build settings (same everywhere):
- **Build command:** `npm run build`
- **Output / publish directory:** `dist`
- **Node version:** 18+ (20 recommended)

---

## Option 1 — Vercel  ⭐ recommended (this is what the reference uses)

Free, fastest setup, automatic HTTPS, great for sharing a link.

**Easiest (drag & drop):**
1. Run `npm run build` locally → creates `dist/`.
2. Go to https://vercel.com → sign up (free).
3. New Project → drag the `dist` folder in. Done — you get a URL like
   `your-wedding.vercel.app`.

**Better (auto-deploys on every change) — via GitHub:**
1. Push this folder to a GitHub repo.
2. Vercel → "Add New… → Project" → import the repo.
3. It auto-detects Vite. Confirm: build `npm run build`, output `dist`. Deploy.

---

## Option 2 — Netlify

1. `npm run build`.
2. https://app.netlify.com → "Add new site → Deploy manually" → drag in `dist`.
   (or connect GitHub for auto-deploys; build `npm run build`, publish `dist`.)

## Option 3 — Cloudflare Pages

Connect the GitHub repo → Framework preset **Vite** → build `npm run build`,
output `dist`. Free, very fast global CDN.

## Option 4 — GitHub Pages (100% free)

1. Add to `vite.config.js`: `base: '/<your-repo-name>/'`.
2. `npm run build`, then publish `dist` to the `gh-pages` branch
   (e.g. with the `gh-pages` npm package or an Actions workflow).

---

## Custom domain (e.g. aishaandyusuf.com)

1. Buy a domain (Namecheap, GoDaddy, Google Domains, ~$10–15/yr).
2. In Vercel/Netlify/Cloudflare → Project → **Domains** → add your domain and
   follow the DNS instructions (add the CNAME/A record they show you).
3. HTTPS is issued automatically. A bare `*.vercel.app` URL is totally fine too
   if you don't want to buy a domain.

---

## Before you go live — checklist

- [ ] Update `src/data/config.js` with real names, date, time, venue + map.
- [ ] Add couple photos to `/public` and set `bride.photo` / `groom.photo`.
- [ ] (Optional) add `public/music.mp3` for background nasheed.
- [ ] Wire the **RSVP form** to a real backend so you actually receive responses
      (see below) — by default it only saves to the guest's own browser.
- [ ] Test on a real phone (open the deployed link on your mobile).

### Collecting RSVPs (pick one, all free)

The form is in `src/components/RSVP.jsx` → `handleSubmit`. Easiest options:
- **Formspree** (https://formspree.io) — create a form, POST to its URL. ~5 lines.
- **Google Forms / Google Sheets** via a Google Apps Script web-app URL.
- **Getform / Basin / Web3Forms** — similar drop-in form endpoints.

Tell me which one you want and I'll wire it up for you.
