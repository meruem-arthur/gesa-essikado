'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { getSiteContent } from '../../lib/queries'
import { SectionLabel, CoordinateTag, ContourField } from '../../components/Geo'

export default function ContactPage() {
  const [content, setContent] = useState(null)

  useEffect(() => {
    getSiteContent().then(setContent).catch(() => setContent(null))
  }, [])

  return (
    <>
      <section className="relative overflow-hidden pt-40 pb-16 md:pt-48 md:pb-20">
        <div className="absolute inset-0">
          {content?.contactHeroImageUrl ? (
            <Image src={content.contactHeroImageUrl} alt="" fill priority className="object-cover" />
          ) : (
            <ContourField className="w-full h-full text-purpleSoft" />
          )}
          <div className="absolute inset-0 bg-navy/78" />
        </div>
        <div className="container-gesa relative">
          <SectionLabel className="mb-6">Wanna Chat?</SectionLabel>
          <h1 className="font-head font-extrabold text-[clamp(2rem,6vw,3.8rem)] leading-[1.02] tracking-tight text-ink mb-5">
            Contact GE<span className="text-gold">SA</span>
          </h1>
          <p className="text-muted max-w-xl leading-relaxed">
            Reach the executive team for anything related to the association — dues, events, or general enquiries.
          </p>
        </div>
      </section>

      <section className="section border-t border-line">
        <div className="container-gesa grid md:grid-cols-12 gap-10">
          <div className="md:col-span-7 card-gesa p-8 md:p-10">
            <p className="mono-label text-[10px] text-dim mb-5">GET IN TOUCH</p>
            <p className="text-muted mb-8 leading-relaxed max-w-[48ch]">
              Have a question or message for us? Reach out below and we&rsquo;ll respond as soon as possible.
            </p>
            <a href={`mailto:${content?.contactEmail || 'gesa.essikado@example.com'}`} className="btn-gold mb-4 w-fit">
              {content?.contactEmail || 'gesa.essikado@example.com'} →
            </a>
            {content?.contactPhone && (
              <p className="text-muted text-sm mt-4">Phone: {content.contactPhone}</p>
            )}
          </div>
          <div className="md:col-span-5 border border-line p-8 md:p-10 flex flex-col justify-between">
            <CoordinateTag className="block leading-relaxed">
              ESSIKADO<br />UMaT<br />GHANA
            </CoordinateTag>
            <p className="mono-label text-[10px] text-dim mt-10">06°05&rsquo;12&Prime;N · 001°38&rsquo;42&Prime;W</p>
          </div>
        </div>
      </section>
    </>
  )
}
