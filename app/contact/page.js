'use client'
import { useEffect, useState } from 'react'
import { getSiteContent } from '../../lib/queries'

export default function ContactPage() {
  const [content, setContent] = useState(null)

  useEffect(() => {
    getSiteContent().then(setContent).catch(() => setContent(null))
  }, [])

  return (
    <section className="section">
      <div className="container-gesa max-w-2xl">
        <p className="text-xs uppercase tracking-wide text-dim mb-2">Get in touch</p>
        <h1 className="font-head font-bold text-3xl mb-6">Contact GESA</h1>
        <div className="card-gesa p-8">
          <p className="text-muted mb-6">
            Reach the executive team for anything related to the association — dues, events, or general enquiries.
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
  )
}
