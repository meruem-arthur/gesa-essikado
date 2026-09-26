'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getSiteContent, getExecutives } from '../../lib/queries'

export default function AboutPage() {
  const [content, setContent] = useState(null)
  const [execs, setExecs] = useState(null)

  useEffect(() => {
    getSiteContent().then(setContent).catch(() => setContent(null))
    getExecutives().then(setExecs).catch(() => setExecs([]))
  }, [])

  return (
    <>
      {/* Hero banner */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          {content?.aboutHeroImageUrl ? (
            <Image src={content.aboutHeroImageUrl} alt="" fill priority className="object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-surface via-bg to-card" />
          )}
          <div className="absolute inset-0 bg-bg/70" />
        </div>
        <div className="container-gesa relative py-24 md:py-32 text-center">
          <p className="text-gold2 text-sm tracking-wide font-body mb-3">Our story</p>
          <h1 className="font-head font-extrabold text-3xl md:text-5xl mb-4 max-w-3xl mx-auto">
            Welcome to Geomatic Engineering and Land Administration Students&rsquo; Association (GE<span className="text-gold2">SA</span>-UMaT)
          </h1>
          <p className="text-muted max-w-xl mx-auto">
            Empowering Future Geospatial Leaders Through Innovation, Unity, and Excellence
          </p>
        </div>
      </section>

      {/* Who are we + secondary image */}
      <section className="section">
        <div className="container-gesa">
          {content?.aboutSecondImageUrl && (
            <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-10">
              <Image src={content.aboutSecondImageUrl} alt="GESA members" fill className="object-cover" />
            </div>
          )}
          <div className="max-w-3xl">
            <h2 className="font-head font-bold text-2xl mb-6">Who Are We?</h2>
            <p className="text-muted leading-relaxed whitespace-pre-line">
              {content?.aboutText ||
                `GESA-UMaT is the official student association for Geomatic Engineering and Land Administration students at UMaT. Established under the Constitution of the University, we serve as a platform for advocacy, collaboration, and development among members.

This section is editable from the admin dashboard (Site Content).`}
            </p>
          </div>
        </div>
      </section>

      {/* Executives preview */}
      <section className="section pt-0">
        <div className="container-gesa">
          <h2 className="font-head font-bold text-2xl mb-8">Our Executives</h2>

          {execs === null ? (
            <p className="text-dim text-sm">Loading…</p>
          ) : execs.length === 0 ? (
            <div className="border border-dashed border-border rounded-xl p-10 text-center text-dim text-sm">
              Executives will appear here once added in the admin dashboard
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
              {execs.slice(0, 4).map(e => (
                <div key={e.id} className="card-gesa p-6 text-center">
                  <div className="w-20 h-20 mx-auto rounded-full overflow-hidden bg-card2 mb-4 flex items-center justify-center">
                    {e.photoUrl ? (
                      <Image src={e.photoUrl} alt={e.name} width={80} height={80} className="object-cover w-full h-full" />
                    ) : (
                      <span className="text-gold2 font-head font-bold text-lg">{(e.name || 'GE').slice(0, 2).toUpperCase()}</span>
                    )}
                  </div>
                  <p className="font-head font-semibold text-sm">{e.name}</p>
                  <p className="text-gold2 text-xs mt-1">{e.position}</p>
                </div>
              ))}
            </div>
          )}

          <Link
            href="/executives"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold2 text-bg font-semibold text-sm hover:bg-gold3 transition-colors"
          >
            Know More Executives <span aria-hidden>→</span>
          </Link>
        </div>
      </section>

      {/* Wanna chat CTA */}
      <section className="container-gesa pb-20">
        <div className="relative rounded-2xl overflow-hidden">
          <div className="absolute inset-0">
            {content?.aboutHeroImageUrl ? (
              <Image src={content.aboutHeroImageUrl} alt="" fill className="object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-surface via-bg to-card" />
            )}
            <div className="absolute inset-0 bg-bg/75" />
          </div>
          <div className="relative py-16 px-8 text-center">
            <h2 className="font-head font-bold text-2xl md:text-3xl mb-3">Wanna chat?</h2>
            <p className="text-muted max-w-md mx-auto mb-6">
              Got something to say? We&rsquo;re all ears! Whether you have questions, suggestions, or just want to chat, we&rsquo;re here for you.
            </p>
            <Link
              href="/contact"
              className="inline-block px-6 py-3 rounded-full bg-gold2 text-bg font-semibold text-sm hover:bg-gold3 transition-colors"
            >
              Reach out now
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
