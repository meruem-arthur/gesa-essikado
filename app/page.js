import HeroSlideshow from '../components/HeroSlideshow'
import Statement from '../components/Statement'
import ProgrammeSection from '../components/ProgrammeSection'
import WelcomeMessages from '../components/WelcomeMessages'
import EventsList from '../components/EventsList'
import ExploreMore from '../components/ExploreMore'

export default function HomePage() {
  return (
    <>
      <HeroSlideshow />
      <Statement />
      <ProgrammeSection />
      <WelcomeMessages />
      <EventsList />
      <ExploreMore />
    </>
  )
}
