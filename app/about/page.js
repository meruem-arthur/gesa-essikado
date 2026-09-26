'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getSiteContent, getExecutives } from '../../lib/queries'
import ContourLines from '../../components/geo/ContourLines'

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
      <section className="relative overflow-hidden pt-28">
        <div className="absolute inset-0">
          {content?.aboutHeroImageUrl ? (
            <Image src={content.aboutHeroImageUrl} alt="" fill priority className="object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-purpledeep via-bg to-bg" />
          )}
          <div className="absolute inset-0 bg-bg/75" />
        </div>
        <ContourLines className="opacity-50" />
        <div className="container-gesa relative py-20 md:py-28">
          <p className="benchmark mb-6">BM&#8288;-00 &middot; OUR STORY</p>
          <h1 className="font-display font-semibold text-clamp-statement leading-[1.02] max-w-3xl text-ink">
            Geomatic Engineering and Land Administration
            Students&rsquo; Association
          </h1>
          <p className="coord mt-6">GE<span className="text-gold2">SA</span>-UMaT &middot; ESSIKADO CAMPUS</p>
        </div>
      </section>

      {/* Who are we + secondary image */}
      <section className="section-tight border-t border-line">
        <div className="container-gesa grid md:grid-cols-5 gap-10 items-start">
          {content?.aboutSecondImageUrl && (
            <div className="relative w-full h-80 md:h-[420px] md:col-span-2 overflow-hidden">
              <Image src={content.aboutSecondImageUrl} alt="GESA members" fill className="object-cover object-top" />
            </div>
          )}
          <div className={content?.aboutSecondImageUrl ? 'md:col-span-3' : 'md:col-span-5 max-w-2xl'}>
            <p className="coord mb-4">WHO WE ARE</p>
            <p className="text-muted leading-relaxed whitespace-pre-line text-lg font-display">
              {content?.aboutText ||
                `GESA-UMaT is the official student association for Geomatic Engineering and Land Administration students at UMaT. Established under the Constitution of the University, we serve as a platform for advocacy, collaboration, and development among members.

This section is editable from the admin dashboard (Site Content).`}
            </p>
          </div>
        </div>
      </section>

      {/* Executives preview */}
      <section className="section-tight border-t border-line">
        <div className="container-gesa">
          <div className="flex items-end justify-between mb-10 gap-6 flex-wrap">
            <p className="benchmark">BM&#8288;-03 &middot; EXECUTIVES</p>
            <Link href="/executives" className="link-underline font-mono-label text-[13px] text-muted hover:text-ink pb-1">
              MEET THE EXECUTIVES &rarr;
            </Link>
          </div>

          {execs === null ? (
            <p className="coord">LOADING&hellip;</p>
          ) : execs.length === 0 ? (
            <div className="border border-dashed border-line rounded-md p-10 text-center coord">
              EXECUTIVES WILL APPEAR HERE ONCE ADDED IN THE ADMIN DASHBOARD
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-px bg-line">
              {execs.slice(0, 4).map(e => (
                <div key={e.id} className="bg-bg p-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-surface2 mb-4 flex items-center justify-center">
                    {e.photoUrl ? (
                      <Image src={e.photoUrl} alt={e.name} width={64} height={64} className="object-cover w-full h-full" />
                    ) : (
                      <span className="text-gold2 font-display font-semibold">{(e.name || 'GE').slice(0, 2).toUpperCase()}</span>
                    )}
                  </div>
                  <p className="font-display text-ink">{e.name}</p>
                  <p className="coord mt-1">{e.position}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Wanna chat CTA */}
      <section className="border-t border-line">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0">
            {content?.aboutHeroImageUrl ? (
              <Image src={content.aboutHeroImageUrl} alt="" fill className="object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-purpledeep via-bg to-bg" />
            )}
            <div className="absolute inset-0 bg-bg/85" />
          </div>
          <div className="relative container-gesa py-20 text-center">
            <h2 className="font-display font-semibold text-2xl md:text-3xl text-ink mb-4">Wanna chat?</h2>
            <p className="text-muted max-w-md mx-auto mb-8">
              Got something to say? We&rsquo;re all ears &mdash; questions, suggestions, or just a hello.
            </p>
            <Link
              href="/contact"
              className="link-underline font-mono-label text-[13px] tracking-wide text-gold2 pb-1"
            >
              REACH OUT NOW &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
