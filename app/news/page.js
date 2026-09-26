'use client'
import { useEffect, useState } from 'react'
import { getAnnouncements } from '../../lib/queries'

export default function NewsPage() {
  const [items, setItems] = useState(null)

  useEffect(() => {
    getAnnouncements().then(setItems).catch(() => setItems([]))
  }, [])

  return (
    <section className="section">
      <div className="container-gesa max-w-3xl">
        <p className="text-xs uppercase tracking-wide text-dim mb-2">Updates</p>
        <h1 className="font-head font-bold text-3xl mb-10">News &amp; Announcements</h1>

        {items === null ? (
          <p className="text-dim text-sm">Loading…</p>
        ) : items.length === 0 ? (
          <div className="border border-dashed border-border rounded-xl p-10 text-center text-dim text-sm">
            No announcements yet
          </div>
        ) : (
          <div className="space-y-5">
            {items.map(a => (
              <div key={a.id} className="card-gesa p-6">
                <p className="text-xs text-dim mb-2">
                  {a.createdAt?.toDate ? a.createdAt.toDate().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : ''}
                </p>
                <p className="font-head font-semibold mb-2">{a.title}</p>
                <p className="text-muted text-sm whitespace-pre-line">{a.body || a.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
