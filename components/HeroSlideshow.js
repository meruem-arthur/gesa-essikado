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
    <section className="relative h-[100svh] min-h-[560px] overflow-hidden bg-navy">
      <div className="absolute inset-0">
        {slides.length > 0 ? (
          slides.map((s, idx) => (
            <Image
              key={s.id}
              src={s.imageUrl}
              alt={s.caption || 'GESA fieldwork'}
              fill
              priority={idx === 0}
              className="object-cover transition-opacity duration-[1400ms]"
              style={{ opacity: idx === i ? 1 : 0 }}
            />
          ))
        ) : (
          <div className="w-full h-full bg-survey-grid" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/55 to-navy/25" />
        <div className="absolute inset-0 bg-navy/20" />
      </div>

      {/* Geospatial overlay chrome */}
      <div className="hidden md:block absolute inset-0 pointer-events-none">
        <div className="absolute top-28 left-8">
          <CoordinateTag>06°05&rsquo;12&Prime;N</CoordinateTag>
        </div>
        <div className="absolute top-[6.7rem] left-8 mt-4">
          <CoordinateTag className="block mt-1">001°38&rsquo;42&Prime;W</CoordinateTag>
        </div>
        <div className="absolute top-28 right-8 text-right">
          <CoordinateTag className="block">ELEVATION 128.4M</CoordinateTag>
          <CoordinateTag className="block mt-1 text-muted">ESSIKADO / GHANA</CoordinateTag>
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
          <p className="mono-label text-[11px] text-goldLight mb-5 flex items-center gap-3">
            <ScaleBar />
            GEOMATIC ENGINEERING STUDENTS&rsquo; ASSOCIATION
          </p>
          <h1 className="font-head font-extrabold text-[clamp(2.6rem,9vw,7.5rem)] leading-[0.92] tracking-tight text-ink mb-6">
            THE EYE<br />
            OF THE <span className="text-gold">ENGINEER.</span>
          </h1>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <p className="text-muted max-w-md leading-relaxed">
              {content?.tagline ? `\u201c${content.tagline}\u201d ` : ''}The home of Geomatic Engineering
              students at UMaT&rsquo;s {content?.campus || 'Essikado'} campus.
            </p>
            <div className="flex gap-4 flex-wrap">
              <a href="/about" className="btn-gold">Explore GESA ↗</a>
              <a href="/events" className="btn-outline">View Events →</a>
            </div>
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
