'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getHeroSlides, getSiteContent } from '../lib/queries'
import ContourLines from './geo/ContourLines'

export default function HeroSlideshow() {
  const [slides, setSlides] = useState([])
  const [content, setContent] = useState(null)
  const [i, setI] = useState(0)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    getHeroSlides().then(setSlides).catch(() => setSlides([]))
    getSiteContent().then(setContent).catch(() => setContent(null))
    const t = setTimeout(() => setLoaded(true), 60)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (slides.length < 2) return
    const t = setInterval(() => setI(v => (v + 1) % slides.length), 6000)
    return () => clearInterval(t)
  }, [slides.length])

  const tagline = (content?.tagline || 'The Eye of the Engineer').toUpperCase()
  const words = tagline.split(' ')

  return (
    <section className="relative h-[100svh] min-h-[640px] overflow-hidden flex flex-col">
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
          <div className="w-full h-full bg-gradient-to-br from-purpledeep via-bg to-bg" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/70 to-bg/40" />
        <div className="absolute inset-0 bg-bg/25" />
      </div>

      <ContourLines className="opacity-70" />
      <div className="grid-overlay" />

      {/* Coordinate readouts — corners */}
      <div className="relative container-gesa pt-28 flex justify-between">
        <p className="coord">
          06&deg;05&rsquo;12&Prime;N<br />001&deg;38&rsquo;42&Prime;W
        </p>
        <p className="coord text-right">
          ESSIKADO / GHANA<br />UMaT
        </p>
      </div>

      {/* Main statement */}
      <div className="relative flex-1 flex flex-col justify-center container-gesa">
        <p
          className={`benchmark mb-6 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
        >
          GESA / {new Date().getFullYear()}
        </p>
        <h1
          className={`font-display font-semibold text-clamp-hero leading-[0.95] tracking-tight text-ink transition-all duration-700 delay-100 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          {words.map((w, idx) => (
            <span key={idx} className="block">
              {idx === words.length - 1 ? <span className="text-gold2">{w}</span> : w}
            </span>
          ))}
        </h1>
        <p
          className={`mt-8 text-muted max-w-md text-[15px] leading-relaxed transition-all duration-700 delay-200 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
        >
          Geomatic Engineering Students&rsquo; Association &mdash; the student body for surveying,
          GIS and geospatial technology at UMaT&rsquo;s {content?.campus || 'Essikado'} campus.
        </p>

        <div
          className={`mt-10 flex items-center gap-8 transition-all duration-700 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
        >
          <Link
            href="/about"
            className="link-underline font-mono-label text-[13px] tracking-wide text-ink hover:text-gold2 pb-1"
          >
            EXPLORE GESA &nearr;
          </Link>
          <Link
            href="/events"
            className="link-underline font-mono-label text-[13px] tracking-wide text-muted hover:text-ink pb-1"
          >
            VIEW EVENTS &rarr;
          </Link>
        </div>
      </div>

      {slides.length > 1 && (
        <div className="relative container-gesa pb-8 flex items-center gap-2">
          <span className="coord mr-2">{String(i + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</span>
          <div className="scale-ticks h-3 text-muted">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                aria-label={`Slide ${idx + 1}`}
                onClick={() => setI(idx)}
                className="!w-px h-full"
                style={{ opacity: idx === i ? 1 : 0.3, background: idx === i ? '#cf9f3f' : undefined }}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
