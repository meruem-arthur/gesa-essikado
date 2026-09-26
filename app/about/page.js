'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getSiteContent, getExecutives } from '../../lib/queries'
import { SectionLabel, CoordinateTag, ContourField } from '../../components/Geo'

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
      <section className="relative overflow-hidden pt-40 pb-20 md:pt-48 md:pb-28">
        <div className="absolute inset-0">
          {content?.aboutHeroImageUrl ? (
            <Image src={content.aboutHeroImageUrl} alt="" fill priority className="object-cover object-portrait" />
          ) : (
            <div className="w-full h-full bg-survey-grid" />
          )}
          <div className="absolute inset-0 scrim-full" />
          <div className="absolute inset-0 scrim-bottom" />
        </div>
        <div className="container-gesa relative">
          <SectionLabel className="mb-6 text-shadow-safe">Our Story</SectionLabel>
          <h1 className="font-head font-extrabold text-[clamp(1.9rem,4.6vw,3.4rem)] leading-[1.12] tracking-tight text-ink max-w-3xl mb-6 text-shadow-safe">
            Geomatic Engineering &amp; Land Administration Students&rsquo; Association
          </h1>
          <p className="text-ink/85 max-w-xl leading-relaxed text-shadow-safe">
            Empowering future geospatial leaders through innovation, unity, and excellence — GE<span className="text-gold">SA</span>-UMaT.
          </p>
        </div>
      </section>

      {/* Who are we + secondary image */}
      <section className="section border-t border-line">
        <div className="container-gesa">
          {content?.aboutSecondImageUrl && (
            <div className="relative w-full h-80 md:h-[30rem] overflow-hidden mb-14">
              <Image src={content.aboutSecondImageUrl} alt="GESA members" fill className="object-cover object-portrait" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                <CoordinateTag className="text-shadow-safe">UMaT · ESSIKADO CAMPUS</CoordinateTag>
              </div>
            </div>
          )}
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <SectionLabel>Who Are We?</SectionLabel>
            </div>
            <div className="md:col-span-8">
              <p className="text-muted leading-relaxed whitespace-pre-line max-w-[64ch] text-[15px]">
                {content?.aboutText ||
                  `GESA-UMaT is the official student association for Geomatic Engineering and Land Administration students at UMaT. Established under the Constitution of the University, we serve as a platform for advocacy, collaboration, and development among members.`}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Executives preview */}
      <section className="section pt-0 border-t border-line">
        <div className="container-gesa">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <SectionLabel>Our Executives</SectionLabel>
            <Link href="/executives" className="link-underline mono-label text-[11px] text-gold">
              MEET THE EXECUTIVES →
            </Link>
          </div>

          {execs === null ? (
            <p className="text-dim text-sm">Loading…</p>
          ) : execs.length === 0 ? (
            <div className="border border-dashed border-line p-14 text-center text-dim text-sm">
              Executives will appear here once added in the admin dashboard
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-px bg-line">
              {execs.slice(0, 4).map(e => (
                <div key={e.id} className="bg-navy p-6 text-center hover:bg-panel transition-colors">
                  <div className="w-20 h-20 mx-auto rounded-full overflow-hidden bg-panel mb-4 flex items-center justify-center border border-line">
                    {e.photoUrl ? (
                      <Image src={e.photoUrl} alt={e.name} width={80} height={80} className="object-cover object-portrait w-full h-full" />
                    ) : (
                      <span className="text-gold font-head font-bold text-lg">{(e.name || 'GE').slice(0, 2).toUpperCase()}</span>
                    )}
                  </div>
                  <p className="font-head font-semibold text-sm text-ink">{e.name}</p>
                  <p className="text-gold text-[11px] mono-label mt-1">{e.position}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Wanna chat CTA */}
      <section className="container-gesa pb-24">
        <div className="relative overflow-hidden border border-line">
          <div className="absolute inset-0">
            {content?.aboutHeroImageUrl ? (
              <Image src={content.aboutHeroImageUrl} alt="" fill className="object-cover object-portrait" />
            ) : (
              <ContourField className="w-full h-full text-purpleSoft" />
            )}
            <div className="absolute inset-0 scrim-full" />
          </div>
          <div className="relative py-20 px-8 text-center">
            <h2 className="font-head font-bold text-2xl md:text-3xl text-ink mb-3 text-shadow-safe">Wanna chat?</h2>
            <p className="text-ink/80 max-w-md mx-auto mb-8 leading-relaxed text-shadow-safe">
              Got something to say? We&rsquo;re all ears — questions, suggestions, or just a hello.
            </p>
            <Link href="/contact" className="btn-gold">Reach Out Now →</Link>
          </div>
        </div>
      </section>
    </>
  )
}
