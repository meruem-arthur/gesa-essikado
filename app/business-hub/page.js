'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getBusinesses, getSiteContent } from '../../lib/queries'
import PageHero from '../../components/PageHero'
import BusinessLogo from '../../components/BusinessLogo'

const DEFAULT_TITLE = 'Get in touch with student business entrepreneurs in GESA'

export default function BusinessHubPage() {
  const [businesses, setBusinesses] = useState(null)
  const [content, setContent] = useState(null)

  useEffect(() => {
    getBusinesses().then(setBusinesses).catch(() => setBusinesses([]))
    getSiteContent().then(setContent).catch(() => setContent(null))
  }, [])

  return (
    <>
      <PageHero
        imageUrl={content?.businessHeroImageUrl}
        eyebrow="Business Hub"
        title={content?.businessHeroTitle || DEFAULT_TITLE}
        subtitle={content?.businessHeroSubtitle}
      />

      <section className="section pt-16">
        <div className="container-gesa">
          {businesses === null ? (
            <p className="text-dim text-sm">Loading…</p>
          ) : businesses.length === 0 ? (
            <div className="border border-dashed border-line p-14 text-center text-dim text-sm">
              Student businesses will appear here soon.
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {businesses.map(b => (
                <Link
                  key={b.id}
                  href={`/business-hub/${b.id}`}
                  className="card-gesa p-6 flex gap-5 group"
                >
                  <BusinessLogo business={b} className="w-20 h-20 flex-none" sizes="80px" />
                  <div className="min-w-0">
                    <p className="font-head font-bold text-lg text-ink leading-snug group-hover:text-gold transition-colors">
                      {b.name}
                    </p>
                    {b.shortDescription && (
                      <p className="text-muted text-sm leading-relaxed mt-1 line-clamp-3">{b.shortDescription}</p>
                    )}
                    <p className="text-gold text-xs mono-label mt-3">View details →</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
