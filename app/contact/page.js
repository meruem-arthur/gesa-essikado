'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { getSiteContent } from '../../lib/queries'

export default function ContactPage() {
  const [content, setContent] = useState(null)

  useEffect(() => {
    getSiteContent().then(setContent).catch(() => setContent(null))
  }, [])

  return (
    <>
      {/* Hero banner */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          {content?.contactHeroImageUrl ? (
            <Image src={content.contactHeroImageUrl} alt="" fill priority className="object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-surface via-bg to-card" />
          )}
          <div className="absolute inset-0 bg-bg/70" />
        </div>
        <div className="container-gesa relative py-20 md:py-28 text-center">
          <p className="text-gold2 text-sm tracking-wide font-body mb-3">Wanna Chat?</p>
          <h1 className="font-head font-bold text-3xl md:text-4xl mb-4">Contact GESA</h1>
          <p className="text-muted max-w-xl mx-auto">
            For inquiries or collaborations, reach the executive team for anything related to the association — dues, events, or general enquiries.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-gesa max-w-2xl">
          <div className="card-gesa p-8">
            <p className="text-muted mb-6">
              Have a question or message for us? Use the contact below to get in touch. We&rsquo;ll respond to you as soon as possible.
            </p>
            <a
              href={`mailto:${content?.contactEmail || 'gesa.essikado@example.com'}`}
              className="inline-block px-6 py-3 rounded-full bg-gold2 text-bg font-semibold text-sm hover:bg-gold3 transition-colors"
            >
              {content?.contactEmail || 'gesa.essikado@example.com'}
            </a>
            {content?.contactPhone && (
              <p className="text-muted text-sm mt-4">Phone: {content.contactPhone}</p>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
