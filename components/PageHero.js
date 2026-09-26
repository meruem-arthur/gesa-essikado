import Image from 'next/image'
import { SectionLabel } from './Geo'

export default function PageHero({ imageUrl, eyebrow, title, subtitle }) {
  return (
    <section className="relative overflow-hidden pt-40 pb-16 md:pt-48 md:pb-20">
      <div className="absolute inset-0">
        {imageUrl ? (
          <Image src={imageUrl} alt="" fill priority className="object-cover object-portrait-soft" />
        ) : (
          <div className="w-full h-full bg-survey-grid" />
        )}
        <div className="absolute inset-0 scrim-top" />
      </div>
      <div className="container-gesa relative">
        <div className="hero-panel inline-block px-6 py-7 md:px-9 md:py-9 max-w-xl">
          {eyebrow && <SectionLabel className="mb-6">{eyebrow}</SectionLabel>}
          <h1 className="font-head font-extrabold text-[clamp(1.9rem,4.4vw,3.2rem)] tracking-tight text-ink mb-4">
            {title}
          </h1>
          {subtitle && <p className="text-ink/90 max-w-[56ch] leading-relaxed">{subtitle}</p>}
        </div>
      </div>
    </section>
  )
}
