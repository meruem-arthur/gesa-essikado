'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { getHeroSlides, getSiteContent } from '../lib/queries'
import { CoordinateTag, Crosshair, ScaleBar } from './Geo'

export default function HeroSlideshow() {
  const [slides, setSlides] = useState([])
  const [content, setContent] = useState(null)
  const [i, setI] = useState(0)
  const [markerX, setMarkerX] = useState(18)

  useEffect(() => {
    getHeroSlides().then(setSlides).catch(() => setSlides([]))
    getSiteContent().then(setContent).catch(() => setContent(null))
  }, [])

  useEffect(() => {
    if (slides.length < 2) return
    const t = setInterval(() => setI(v => (v + 1) % slides.length), 5500)
    return () => clearInterval(t)
  }, [slides.length])

  useEffect(() => {
    const t = setInterval(() => setMarkerX(v => (v >= 82 ? 18 : v + 0.4)), 60)
    return () => clearInterval(t)
  }, [])

  return (
    <section className="relative h-[82vh] min-h-[520px] max-h-[760px] overflow-hidden bg-navy">
      <div className="absolute inset-0">
        {slides.length > 0 ? (
          slides.map((s, idx) => (
            <Image
              key={s.id}
              src={s.imageUrl}
              alt={s.caption || 'GESA fieldwork'}
              fill
              priority={idx === 0}
              className="object-cover object-portrait-soft transition-opacity duration-[1400ms]"
              style={{ opacity: idx === i ? 1 : 0 }}
            />
          ))
        ) : (
          <div className="w-full h-full bg-survey-grid" />
        )}
        {/* Reliable scrims: darken the top (nav legibility) and bottom (headline legibility) */}
        <div className="absolute inset-0 scrim-bottom" />
        <div className="absolute inset-0 scrim-top" />
      </div>

      {/* Geospatial overlay chrome */}
      <div className="hidden md:block absolute inset-0 pointer-events-none">
        <div className="absolute top-28 left-8">
          <CoordinateTag className="block text-glow">06°05&rsquo;12&Prime;N</CoordinateTag>
          <CoordinateTag className="block mt-1 text-glow">001°38&rsquo;42&Prime;W</CoordinateTag>
        </div>
        <div className="absolute top-28 right-8 text-right">
          <CoordinateTag className="block text-glow">ELEVATION 128.4M</CoordinateTag>
          <CoordinateTag className="block mt-1 text-muted text-glow">ESSIKADO / GHANA</CoordinateTag>
        </div>

        {/* Animated survey marker drifting across the frame */}
        <div
          className="absolute top-1/2 transition-[left] duration-[60ms] linear"
          style={{ left: `${markerX}%` }}
        >
          <Crosshair size={26} className="text-goldLight/80" />
        </div>
      </div>

      <div className="relative h-full flex flex-col justify-end">
        <div className="container-gesa pb-16 md:pb-20">
          <div className="hero-panel inline-block px-6 py-7 md:px-9 md:py-9 max-w-2xl md:max-w-3xl">
            <p className="mono-label text-[12px] text-goldLight mb-5 flex items-center gap-3">
              <ScaleBar />
              GEOMATIC ENGINEERING STUDENTS&rsquo; ASSOCIATION
            </p>
            <h1 className="font-head font-extrabold text-[clamp(1.85rem,4.8vw,3.6rem)] leading-[1.05] tracking-tight text-ink mb-6">
              THE EYE OF THE<br />
              <span className="text-gold">ENGINEER.</span>
            </h1>
            <p className="text-ink/90 max-w-md leading-relaxed">
              {content?.tagline ? `\u201c${content.tagline}\u201d ` : ''}The home of Geomatic Engineering
              students at UMaT&rsquo;s {content?.campus || 'Essikado'} campus.
            </p>
          </div>
          <div className="flex gap-4 flex-wrap mt-7">
            <a href="/about" className="btn-gold">Explore GESA ↗</a>
            <a href="/events" className="btn-outline">View Events →</a>
          </div>
        </div>

        {slides.length > 1 && (
          <div className="container-gesa pb-6 flex items-center gap-2">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                aria-label={`Slide ${idx + 1}`}
                onClick={() => setI(idx)}
                className="h-[2px] transition-all duration-300"
                style={{ width: idx === i ? '28px' : '12px', background: idx === i ? '#c69a2e' : 'rgba(244,241,234,0.3)' }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
