// ============================================================================
//  WEDDING INVITATION CONFIG
//  Edit this single file to personalise the entire invitation.
// ============================================================================

export const wedding = {
  // --- Couple ---------------------------------------------------------------
  // `bride` = the name shown FIRST, `groom` = shown SECOND (display order only).
  bride: {
    name: 'Mohamed Saleeq',
    fullName: 'Mohamed Saleeq',
    parents: 'S/O ABDUSSATHAR & SHAMEERA ABDUSSATHAR',
    house: 'KANNANKILAKATH HOUSE, KUTTAMANGALAM',
    // Drop a real photo into /public and reference it, e.g. '/groom.jpg'
    photo: '',
  },
  groom: {
    name: 'Fasna',
    fullName: 'Fasna',
    parents: 'D/O KABEER & HIRUNNEESA KABEER',
    house: 'EDAKKATTUPARAMBIL HOUSE, KATTOOR',
    photo: '',
  },

  // --- Headline copy --------------------------------------------------------
  blessing: 'Together with the blessings of Allah',
  inviteLine:
    'With the blessings of Allah we are delighted to invite you to the Nikah ceremony of',
  quran: {
    arabic:
      'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً',
    translation:
      '“And among His signs is that He created for you mates from among yourselves, that you may find tranquillity in them; and He placed between you affection and mercy.”',
    reference: '— Surah Ar-Rum (30:21)',
  },

  // --- Date & Venue ---------------------------------------------------------
  // ISO date-time of the main ceremony (used by the countdown).
  date: '2026-08-15T16:00:00',
  dateLabel: 'Saturday, 15 August 2026',
  timeLabel: '11:00 PM onwards',
  venue: {
    name: 'Rahi Convention Centre',
    address: 'Pulinchodu, Edamuttam',
    mapsQuery: 'Rahi Convention Centre, Edamuttam',
    // Exact shared Google Maps link (used by the button + QR)
    mapsUrl: 'https://maps.app.goo.gl/nDbiSTmAgHUSeiZi6',
    // Precise coordinates (used by the embedded map)
    lat: 10.3773947,
    lng: 76.1314046,
  },

  // --- Event timeline (each ceremony shows Date / Time / Venue) -------------
  timeline: [
    {
      title: 'Nikah Ceremony',
      date: 'Saturday, 15 August 2026',
      time: '11:30 AM',
      venue: 'Rahi Convention Centre',
      desc: 'The nikah ceremony filled with duas, love, and blessings',
      icon: 'ring',
      showDetails: true,
    },
    {
      title: 'Walima Reception',
      date: 'Saturday, 15 August 2026',
      time: '6:30 PM',
      venue: 'Rahi Convention Centre',
      desc: 'Join us for a beautiful gathering as we celebrate this blessed occasion.',
      icon: 'cup',
    },
  ],

  // --- Gallery (placeholder gradients render when src is empty) -------------
  gallery: [
    { src: '', caption: 'The Proposal' },
    { src: '', caption: 'Mehndi Night' },
    { src: '', caption: 'Engagement' },
    { src: '', caption: 'Golden Hour' },
    { src: '', caption: 'Family' },
    { src: '', caption: 'Forever Begins' },
  ],

  // --- Contact / Share ------------------------------------------------------
  contactPhone: '+91 90000 00000',
  hashtag: '#Saleeq&Fasna',
}

// Convenience derived strings
export const coupleNames = `${wedding.bride.name} & ${wedding.groom.name}`

export const googleMapsUrl =
  wedding.venue.mapsUrl ||
  (wedding.venue.lat
    ? `https://www.google.com/maps/search/?api=1&query=${wedding.venue.lat},${wedding.venue.lng}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        wedding.venue.mapsQuery,
      )}`)
