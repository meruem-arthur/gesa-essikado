'use client'
import { useEffect, useState } from 'react'
import { getAllEvents } from '../../lib/queries'

function formatDate(ev) {
  return ev.date?.toDate
    ? ev.date.toDate().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    : ''
}

function EventCard({ ev, past }) {
  return (
    <div className={`card-gesa p-5 ${past ? 'opacity-70' : ''}`}>
      {ev.tag && <p className="text-xs text-gold2 mb-2">{ev.tag}</p>}
      <p className="font-head font-semibold mb-1">{ev.title}</p>
      <p className="text-xs text-dim mb-2">
        {formatDate(ev)}
        {ev.location ? ` · ${ev.location}` : ''}
      </p>
      {ev.description && <p className="text-sm text-muted">{ev.description}</p>}
    </div>
  )
}

export default function EventsPage() {
  const [events, setEvents] = useState(null)
  const [tab, setTab] = useState('upcoming')

  useEffect(() => {
    getAllEvents().then(setEvents).catch(() => setEvents([]))
  }, [])

  let upcoming = []
  let past = []

  if (events) {
    const now = new Date()
    upcoming = events
      .filter(e => (e.date?.toDate ? e.date.toDate() >= now : true))
      .sort((a, b) => (a.date?.toDate?.() || 0) - (b.date?.toDate?.() || 0))
    past = events
      .filter(e => (e.date?.toDate ? e.date.toDate() < now : false))
      .sort((a, b) => (b.date?.toDate?.() || 0) - (a.date?.toDate?.() || 0))
  }

  const list = tab === 'upcoming' ? upcoming : past

  return (
    <section className="section">
      <div className="container-gesa">
        <p className="text-xs uppercase tracking-wide text-dim mb-2">Calendar</p>
        <h1 className="font-head font-bold text-3xl mb-6">Events</h1>
        <p className="text-muted max-w-[60ch] mb-8">
          Everything GESA has planned, and everything we&rsquo;ve already pulled off.
        </p>

        <div className="flex gap-3 mb-10">
          {['upcoming', 'past'].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                tab === t ? 'bg-gold2 text-bg border-gold2' : 'border-border text-muted hover:border-gold2'
              }`}
            >
              {t === 'upcoming' ? `Upcoming${events ? ` (${upcoming.length})` : ''}` : `Past${events ? ` (${past.length})` : ''}`}
            </button>
          ))}
        </div>

        {events === null ? (
          <p className="text-dim text-sm">Loading…</p>
        ) : list.length === 0 ? (
          <div className="border border-dashed border-border rounded-xl p-10 text-center text-dim text-sm">
            {tab === 'upcoming' ? 'No upcoming events at this time' : 'No past events recorded yet'}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {list.map(ev => (
              <EventCard key={ev.id} ev={ev} past={tab === 'past'} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
