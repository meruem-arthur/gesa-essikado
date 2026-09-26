'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { getHeroSlides, getSiteContent } from '../lib/queries'

export default function HeroSlideshow() {
  const [slides, setSlides] = useState([])
  const [content, setContent] = useState(null)
  const [i, setI] = useState(0)

  useEffect(() => {
    getHeroSlides().then(setSlides).catch(() => setSlides([]))
    getSiteContent().then(setContent).catch(() => setContent(null))
  }, [])

  useEffect(() => {
    if (slides.length < 2) return
    const t = setInterval(() => setI(v => (v + 1) % slides.length), 5000)
    return () => clearInterval(t)
  }, [slides.length])

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        {slides.length > 0 ? (
          slides.map((s, idx) => (
            <Image
              key={s.id}
              src={s.imageUrl}
              alt={s.caption || 'GESA'}
              fill
              priority={idx === 0}
              className="object-cover transition-opacity duration-1000"
              style={{ opacity: idx === i ? 1 : 0 }}
            />
          ))
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-surface via-bg to-card" />
        )}
        <div className="absolute inset-0 bg-bg/70" />
      </div>

      <div className="container-gesa relative py-28 md:py-36 text-center">
        <p className="text-gold2 text-sm tracking-wide font-body mb-3">
          GEOMATIC ENGINEERING STUDENTS&rsquo; ASSOCIATION
        </p>
        <h1 className="font-head font-extrabold text-4xl md:text-6xl mb-4">
          GE<span className="text-gold2">SA</span>
        </h1>
        <p className="text-lg md:text-xl italic text-gold3 font-head mb-6">
          &ldquo;{content?.tagline || 'The Eye of the Engineer'}&rdquo;
        </p>
        <p className="text-muted max-w-xl mx-auto mb-8">
          The home of Geomatic Engineering students at UMaT&rsquo;s {content?.campus || 'Essikado'} campus.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a href="/contact" className="px-6 py-3 rounded-full bg-gold2 text-bg font-semibold text-sm hover:bg-gold3 transition-colors">
            Get in touch
          </a>
          <a href="/about" className="px-6 py-3 rounded-full border border-border2 text-text font-semibold text-sm hover:border-gold2 transition-colors">
            About the association
          </a>
        </div>
      </div>

      {slides.length > 1 && (
        <div className="relative flex justify-center gap-2 pb-6">
          {slides.map((s, idx) => (
            <button
              key={s.id}
              aria-label={`Slide ${idx + 1}`}
              onClick={() => setI(idx)}
              className="w-2 h-2 rounded-full transition-colors"
              style={{ background: idx === i ? '#e8b82a' : '#584f7a' }}
            />
          ))}
        </div>
      )}
    </section>
  )
}
