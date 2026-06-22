import { useState } from 'react'
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
  const [opened, setOpened] = useState(false)

  return (
    // Dark maroon "stage" — on desktop the invitation sits centred like a card;
    // on mobile the device column is full-width (true mobile-first experience).
    <div className="relative min-h-screen stage-bg sm:py-8">
      {/* Opening envelope overlay */}
      <EnvelopeIntro onOpened={() => setOpened(true)} />

      {/* Ambient floating rose petals + golden particles */}
      <Petals />

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
        <Footer />
        <MusicToggle autoStartSignal={opened} />
      </div>
    </div>
  )
}
