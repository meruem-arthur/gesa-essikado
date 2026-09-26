'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { getSiteContent } from '../../lib/queries'
import ContourLines from '../../components/geo/ContourLines'

export default function ContactPage() {
  const [content, setContent] = useState(null)

  useEffect(() => {
    getSiteContent().then(setContent).catch(() => setContent(null))
  }, [])

  return (
    <>
      <section className="relative overflow-hidden pt-28">
        <div className="absolute inset-0">
          {content?.contactHeroImageUrl ? (
            <Image src={content.contactHeroImageUrl} alt="" fill priority className="object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-purpledeep via-bg to-bg" />
          )}
          <div className="absolute inset-0 bg-bg/80" />
        </div>
        <ContourLines className="opacity-50" tone="gold" />
        <div className="container-gesa relative py-20 md:py-28">
          <p className="benchmark mb-6">WANNA CHAT?</p>
          <h1 className="font-display font-semibold text-clamp-hero leading-[0.95] tracking-tight text-ink">
            ESSIKADO
            <br />
            <span className="text-muted">UMaT, GHANA</span>
          </h1>
          <p className="coord mt-6">06&deg;05&rsquo;12&Prime;N &middot; 001&deg;38&rsquo;42&Prime;W</p>
        </div>
      </section>

      <section className="section-tight border-t border-line">
        <div className="container-gesa max-w-2xl">
          <p className="text-muted mb-10 max-w-md">
            Have a question or message for us? Reach the executive team below for dues, events,
            or general enquiries &mdash; we&rsquo;ll respond as soon as we can.
          </p>

          <div className="border-t border-line">
            <div className="flex items-center justify-between py-6 border-b border-line">
              <span className="coord">EMAIL</span>
              <a
                href={`mailto:${content?.contactEmail || 'gesa.essikado@example.com'}`}
                className="link-underline font-display text-lg text-ink hover:text-gold2 pb-1 text-right"
              >
                {content?.contactEmail || 'gesa.essikado@example.com'}
              </a>
            </div>
            {content?.contactPhone && (
              <div className="flex items-center justify-between py-6 border-b border-line">
                <span className="coord">PHONE</span>
                <span className="font-display text-lg text-ink">{content.contactPhone}</span>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
