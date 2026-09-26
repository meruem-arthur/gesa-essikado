import HeroSlideshow from '../components/HeroSlideshow'
import WelcomeMessages from '../components/WelcomeMessages'
import ProgrammeSection from '../components/ProgrammeSection'
import EventsList from '../components/EventsList'

export default function HomePage() {
  return (
    <>
      <HeroSlideshow />
      <WelcomeMessages />
      <ProgrammeSection />
      <EventsList />
    </>
  )
}
