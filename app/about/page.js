'use client'
import { useEffect, useState } from 'react'
import { getSiteContent } from '../../lib/queries'

export default function AboutPage() {
  const [content, setContent] = useState(null)

  useEffect(() => {
    getSiteContent().then(setContent).catch(() => setContent(null))
  }, [])

  return (
    <section className="section">
      <div className="container-gesa max-w-3xl">
        <p className="text-xs uppercase tracking-wide text-dim mb-4">About</p>
        <h1 className="font-head font-bold text-3xl mb-6">
          GE<span className="text-gold2">SA</span> — Essikado Campus
        </h1>
        <p className="text-muted leading-relaxed whitespace-pre-line">
          {content?.aboutText ||
            `The Geomatic Engineering Students' Association (GESA) is the student body for Geomatic Engineering students at UMaT's Essikado campus. We bring students together around the discipline of surveying, mapping and spatial data — academically, socially and professionally.

This section is editable from the admin dashboard (Site Content).`}
        </p>
      </div>
    </section>
  )
}
