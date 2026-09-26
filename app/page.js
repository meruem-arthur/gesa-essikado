import HeroSlideshow from '../components/HeroSlideshow'
import Statement from '../components/Statement'
import ProgrammeSection from '../components/ProgrammeSection'
import EventsList from '../components/EventsList'
import WelcomeMessages from '../components/WelcomeMessages'
import CTASection from '../components/CTASection'

export default function HomePage() {
  return (
    <>
      <HeroSlideshow />
      <Statement />
      <ProgrammeSection />
      <EventsList />
      <WelcomeMessages />
      <CTASection />
    </>
  )
}
