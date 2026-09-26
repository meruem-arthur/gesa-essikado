'use client'
import { useEffect, useState } from 'react'
import { getEvents } from '../lib/queries'

export default function EventsList() {
  const [events, setEvents] = useState(null)

  useEffect(() => {
    getEvents().then(list => {
      const now = new Date()
      setEvents(list.filter(e => e.date?.toDate ? e.date.toDate() >= now : true))
    }).catch(() => setEvents([]))
  }, [])

  return (
    <section className="section border-t border-border">
      <div className="container-gesa">
        <p className="text-xs uppercase tracking-wide text-dim mb-8">Upcoming Events</p>
        {events === null ? (
          <p className="text-dim text-sm">Loading…</p>
        ) : events.length === 0 ? (
          <div className="border border-dashed border-border rounded-xl p-10 text-center text-dim text-sm">
            No upcoming events at this time
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {events.map(ev => (
              <div key={ev.id} className="card-gesa p-5">
                {ev.tag && <p className="text-xs text-gold2 mb-2">{ev.tag}</p>}
                <p className="font-head font-semibold mb-1">{ev.title}</p>
                <p className="text-xs text-dim mb-2">
                  {ev.date?.toDate ? ev.date.toDate().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : ''}
                  {ev.location ? ` · ${ev.location}` : ''}
                </p>
                {ev.description && <p className="text-sm text-muted">{ev.description}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
