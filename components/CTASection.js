import { SectionLabel, Crosshair } from './Geo'

export default function CTASection() {
  return (
    <section className="border-t border-line bg-navy2 py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-survey-grid opacity-30" />
      <div className="container-gesa relative text-center">
        <SectionLabel className="justify-center mb-6">Go Deeper</SectionLabel>
        <h2 className="font-head font-extrabold text-[clamp(1.8rem,5vw,3.2rem)] leading-tight text-ink max-w-2xl mx-auto mb-10">
          Notes, past questions and every field moment — archived and organised.
        </h2>
        <div className="flex gap-4 justify-center flex-wrap">
          <a href="/library" className="btn-gold">Open Library →</a>
          <a href="/gallery" className="btn-outline">Explore Gallery →</a>
        </div>
        <div className="flex justify-center mt-14 text-purpleSoft/50">
          <Crosshair size={30} />
        </div>
      </div>
    </section>
  )
}
