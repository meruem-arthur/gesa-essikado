'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getEvents } from '../lib/queries'
import { SectionLabel, CoordinateTag } from './Geo'

export default function EventsList() {
  const [events, setEvents] = useState(null)

  useEffect(() => {
    getEvents().then(list => {
      const now = new Date()
      setEvents(list.filter(e => e.date?.toDate ? e.date.toDate() >= now : true).slice(0, 3))
    }).catch(() => setEvents([]))
  }, [])

  return (
    <section className="section border-t border-line bg-navy">
      <div className="container-gesa">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <SectionLabel>Upcoming Events</SectionLabel>
          <Link href="/events" className="link-underline mono-label text-[11px] text-gold">
            SEE ALL EVENTS →
          </Link>
        </div>

        {events === null ? (
          <p className="text-dim text-sm">Loading…</p>
        ) : events.length === 0 ? (
          <div className="border border-dashed border-line p-14 text-center text-dim text-sm">
            No upcoming events at this time
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-px bg-line">
            {events.map((ev, idx) => (
              <div key={ev.id} className="bg-navy p-7 hover:bg-panel transition-colors group">
                <div className="flex items-start justify-between mb-6">
                  <span className="mono-label text-[11px] text-dim">EVT / {String(idx + 1).padStart(2, '0')}</span>
                  {ev.tag && <span className="mono-label text-[10px] text-gold">{ev.tag}</span>}
                </div>
                <p className="font-head font-bold text-lg text-ink mb-3 group-hover:text-gold transition-colors">
                  {ev.title}
                </p>
                <CoordinateTag className="block mb-3 text-muted">
                  {ev.date?.toDate ? ev.date.toDate().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : ''}
                  {ev.location ? ` · ${ev.location}` : ''}
                </CoordinateTag>
                {ev.description && <p className="text-sm text-muted leading-relaxed">{ev.description}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
