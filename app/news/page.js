'use client'
import { useEffect, useState } from 'react'
import { getAnnouncements } from '../../lib/queries'
import { SectionLabel } from '../../components/Geo'

export default function NewsPage() {
  const [items, setItems] = useState(null)

  useEffect(() => {
    getAnnouncements().then(setItems).catch(() => setItems([]))
  }, [])

  const [featured, ...rest] = items || []

  return (
    <section className="section pt-40 md:pt-48">
      <div className="container-gesa max-w-4xl">
        <SectionLabel className="mb-6">Updates</SectionLabel>
        <h1 className="font-head font-extrabold text-[clamp(2rem,5vw,3.5rem)] tracking-tight text-ink mb-12">
          News &amp; Announcements
        </h1>

        {items === null ? (
          <p className="text-dim text-sm">Loading…</p>
        ) : items.length === 0 ? (
          <div className="border border-dashed border-line p-14 text-center text-dim text-sm">
            No announcements yet
          </div>
        ) : (
          <>
            <div className="card-gesa p-8 md:p-10 mb-12">
              <p className="mono-label text-[10px] text-gold mb-3">FEATURED</p>
              <p className="mono-label text-[10px] text-dim mb-4">
                {featured.createdAt?.toDate ? featured.createdAt.toDate().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : ''}
              </p>
              <h2 className="font-head font-bold text-2xl md:text-3xl text-ink mb-4">{featured.title}</h2>
              <p className="text-muted leading-relaxed whitespace-pre-line max-w-[64ch]">{featured.body || featured.content}</p>
            </div>

            {rest.length > 0 && (
              <div className="space-y-px bg-line border border-line">
                {rest.map(a => (
                  <div key={a.id} className="bg-navy p-6 hover:bg-panel transition-colors">
                    <p className="mono-label text-[10px] text-dim mb-2">
                      {a.createdAt?.toDate ? a.createdAt.toDate().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : ''}
                    </p>
                    <p className="font-head font-semibold text-ink mb-2">{a.title}</p>
                    <p className="text-muted text-sm whitespace-pre-line leading-relaxed">{a.body || a.content}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
