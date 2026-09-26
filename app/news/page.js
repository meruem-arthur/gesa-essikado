'use client'
import { useEffect, useState } from 'react'
import { getAnnouncements } from '../../lib/queries'

function fmt(d) {
  return d?.toDate ? d.toDate().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : ''
}

export default function NewsPage() {
  const [items, setItems] = useState(null)

  useEffect(() => {
    getAnnouncements().then(setItems).catch(() => setItems([]))
  }, [])

  const featured = items && items.length ? items[0] : null
  const rest = items && items.length ? items.slice(1) : []

  return (
    <section className="section pt-28">
      <div className="container-gesa max-w-3xl">
        <p className="benchmark mb-6">BM&#8288;-05 &middot; UPDATES</p>
        <h1 className="font-display font-semibold text-4xl md:text-5xl text-ink mb-14">News &amp; Announcements</h1>

        {items === null ? (
          <p className="coord">LOADING&hellip;</p>
        ) : items.length === 0 ? (
          <div className="border border-dashed border-line rounded-md p-10 text-center coord">
            NO ANNOUNCEMENTS YET
          </div>
        ) : (
          <>
            {featured && (
              <div className="border-t border-b border-line py-8 mb-4">
                <p className="coord mb-3">{fmt(featured.createdAt)}</p>
                <p className="font-display text-2xl md:text-3xl text-ink mb-4">{featured.title}</p>
                <p className="text-muted leading-relaxed whitespace-pre-line max-w-[64ch]">
                  {featured.body || featured.content}
                </p>
              </div>
            )}

            {rest.map(a => (
              <div key={a.id} className="py-6 border-b border-line">
                <p className="coord mb-2">{fmt(a.createdAt)}</p>
                <p className="font-display text-lg text-ink mb-2">{a.title}</p>
                <p className="text-muted text-sm whitespace-pre-line max-w-[64ch]">{a.body || a.content}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </section>
  )
}
