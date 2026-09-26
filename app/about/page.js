'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getSiteContent, getExecutives } from '../../lib/queries'
import { SectionLabel, CoordinateTag } from '../../components/Geo'

function parseLines(str) {
  return (str || '')
    .split('\n')
    .map(l => l.trim())
    .filter(Boolean)
    .map(line => {
      const idx = line.indexOf(':')
      return idx === -1
        ? { label: line, desc: '' }
        : { label: line.slice(0, idx).trim(), desc: line.slice(idx + 1).trim() }
    })
}

const EyeIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M2 12C2 12 5.5 5.5 12 5.5S22 12 22 12 18.5 18.5 12 18.5 2 12 2 12Z" stroke="currentColor" strokeWidth="1.4" />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4" />
  </svg>
)
const PinIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 22s7-7.2 7-12.5A7 7 0 0 0 5 9.5C5 14.8 12 22 12 22Z" stroke="currentColor" strokeWidth="1.4" />
    <circle cx="12" cy="9.5" r="2.4" stroke="currentColor" strokeWidth="1.4" />
  </svg>
)
const QuoteIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M4 15V10a4 4 0 0 1 4-4" stroke="currentColor" strokeWidth="1.4" />
    <path d="M4 15h4v-3H5" stroke="currentColor" strokeWidth="1.4" />
    <path d="M14 15V10a4 4 0 0 1 4-4" stroke="currentColor" strokeWidth="1.4" />
    <path d="M14 15h4v-3h-3" stroke="currentColor" strokeWidth="1.4" />
  </svg>
)

export default function AboutPage() {
  const [content, setContent] = useState(null)
  const [execs, setExecs] = useState(null)

  useEffect(() => {
    getSiteContent().then(setContent).catch(() => setContent(null))
    getExecutives().then(setExecs).catch(() => setExecs([]))
  }, [])

  const coreValues = parseLines(content?.coreValues) .length
    ? parseLines(content?.coreValues)
    : parseLines('Integrity: Upholding ethical standards in all activities.\nExcellence: Striving for academic and professional distinction.\nUnity: Fostering inclusivity and teamwork.\nInnovation: Encouraging creative solutions in geospatial work.')

  const activities = parseLines(content?.activities).length
    ? parseLines(content?.activities)
    : parseLines('Academic: Lectures, workshops, and study trips to enhance technical skills.\nProfessional: Networking sessions with industry experts and alumni.')

  return (
    <>
      {/* Hero banner — clear image, boxed copy */}
      <section className="relative overflow-hidden pt-40 pb-20 md:pt-48 md:pb-28">
        <div className="absolute inset-0">
          {content?.aboutHeroImageUrl ? (
            <Image src={content.aboutHeroImageUrl} alt="" fill priority className="object-cover object-portrait" />
          ) : (
            <div className="w-full h-full bg-survey-grid" />
          )}
          <div className="absolute inset-0 scrim-top" />
        </div>
        <div className="container-gesa relative">
          <div className="hero-panel inline-block px-6 py-7 md:px-9 md:py-9 max-w-2xl">
            <SectionLabel className="mb-6">Our Story</SectionLabel>
            <h1 className="font-head font-extrabold text-[clamp(1.7rem,4vw,3rem)] leading-[1.15] tracking-tight text-ink mb-5">
              Welcome to Geomatic Engineering &amp; Land Administration Students&rsquo; Association
            </h1>
            <p className="text-ink/90 max-w-xl leading-relaxed">
              Empowering future geospatial leaders through innovation, unity, and excellence — GE<span className="text-gold">SA</span>-UMaT.
            </p>
          </div>
        </div>
      </section>

      {/* Who Are We — compact portrait image + text, two columns */}
      <section className="section border-t border-line">
        <div className="container-gesa grid md:grid-cols-12 gap-10 md:gap-14 items-center">
          {content?.aboutSecondImageUrl && (
            <div className="md:col-span-5">
              <div className="relative w-full aspect-[4/5] max-w-sm overflow-hidden">
                <Image src={content.aboutSecondImageUrl} alt="GESA members" fill className="object-cover object-portrait" />
              </div>
              <CoordinateTag className="block mt-3">UMaT · ESSIKADO CAMPUS</CoordinateTag>
            </div>
          )}
          <div className={content?.aboutSecondImageUrl ? 'md:col-span-7' : 'md:col-span-12'}>
            <SectionLabel className="mb-5">Who Are We?</SectionLabel>
            <p className="text-muted leading-relaxed whitespace-pre-line max-w-[64ch] text-[15px]">
              {content?.aboutText ||
                `GESA-UMaT is the official student association for Geomatic Engineering and Land Administration students at UMaT. Established under the Constitution of the University, we serve as a platform for advocacy, collaboration, and development among members.`}
            </p>
          </div>
        </div>
      </section>

      {/* Vision / Mission / Slogan */}
      <section className="section pt-0 border-t border-line">
        <div className="container-gesa grid sm:grid-cols-3 gap-10">
          <div>
            <div className="text-gold mb-4"><EyeIcon /></div>
            <h3 className="font-head font-bold text-lg text-ink mb-2">Vision</h3>
            <p className="text-sm text-muted leading-relaxed">
              {content?.vision || 'To be a leading student association promoting excellence, unity, and innovation in Geomatic Engineering and Land Administration.'}
            </p>
          </div>
          <div>
            <div className="text-gold mb-4"><PinIcon /></div>
            <h3 className="font-head font-bold text-lg text-ink mb-2">Mission</h3>
            <p className="text-sm text-muted leading-relaxed">
              {content?.mission || 'To empower students through academic support, professional growth, and collaborative initiatives that advance geospatial innovation.'}
            </p>
          </div>
          <div>
            <div className="text-gold mb-4"><QuoteIcon /></div>
            <h3 className="font-head font-bold text-lg text-ink mb-2">Slogan</h3>
            <p className="text-sm text-muted leading-relaxed">{content?.tagline || 'The Eye of the Engineer'}</p>
          </div>
        </div>
      </section>

      {/* Core Values / Activities */}
      <section className="section pt-0 border-t border-line">
        <div className="container-gesa grid md:grid-cols-2 gap-12">
          <div>
            <SectionLabel className="mb-6">Core Values</SectionLabel>
            <ol className="space-y-3">
              {coreValues.map((v, idx) => (
                <li key={idx} className="text-sm text-muted leading-relaxed">
                  <span className="text-ink font-semibold">{idx + 1}. {v.label}</span>
                  {v.desc ? <> — {v.desc}</> : null}
                </li>
              ))}
            </ol>
          </div>
          <div>
            <SectionLabel className="mb-6">Our Activities</SectionLabel>
            <ol className="space-y-3">
              {activities.map((v, idx) => (
                <li key={idx} className="text-sm text-muted leading-relaxed">
                  <span className="text-ink font-semibold">{idx + 1}. {v.label}:</span>
                  {v.desc ? <> {v.desc}</> : null}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Executives preview */}
      <section className="section pt-0 border-t border-line">
        <div className="container-gesa">
          <SectionLabel className="mb-4">Our Executives</SectionLabel>
          <p className="text-muted text-sm max-w-[62ch] mb-10 leading-relaxed">
            GESA-UMaT is governed by an elected Executive Committee and supported by various sub-committees, ensuring transparency, accountability, and inclusive representation.
          </p>

          {execs === null ? (
            <p className="text-dim text-sm">Loading…</p>
          ) : execs.length === 0 ? (
            <div className="border border-dashed border-line p-14 text-center text-dim text-sm">
              Executives will appear here once added in the admin dashboard
            </div>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                {execs.slice(0, 4).map(e => (
                  <div key={e.id}>
                    <div className="relative w-full aspect-[4/5] bg-panel overflow-hidden mb-4 border border-line">
                      {e.photoUrl ? (
                        <Image src={e.photoUrl} alt={e.name} fill className="object-cover object-portrait" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-gold font-head font-bold text-2xl">{(e.name || 'GE').slice(0, 2).toUpperCase()}</span>
                        </div>
                      )}
                    </div>
                    <p className="font-head font-semibold text-sm text-ink">{e.name}</p>
                    <p className="text-gold text-[11px] mono-label mt-1">{e.position}</p>
                  </div>
                ))}
              </div>
              <Link href="/executives" className="btn-gold">Know More Executives →</Link>
            </>
          )}
        </div>
      </section>

      {/* Wanna chat CTA — clear image, boxed copy */}
      <section className="container-gesa pb-24">
        <div className="relative overflow-hidden border border-line h-72 md:h-80 flex items-end">
          <div className="absolute inset-0">
            {content?.aboutHeroImageUrl ? (
              <Image src={content.aboutHeroImageUrl} alt="" fill className="object-cover object-portrait" />
            ) : (
              <div className="w-full h-full bg-survey-grid" />
            )}
            <div className="absolute inset-0 scrim-bottom" />
          </div>
          <div className="relative p-8 md:p-10">
            <div className="hero-panel inline-block px-6 py-6 md:px-8 md:py-7 max-w-lg">
              <h2 className="font-head font-bold text-xl md:text-2xl text-ink mb-2">Wanna chat?</h2>
              <p className="text-ink/85 text-sm mb-5 leading-relaxed">
                Got something to say? We&rsquo;re all ears — questions, suggestions, or just a hello.
              </p>
              <Link href="/contact" className="btn-gold">Reach Out Now →</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
