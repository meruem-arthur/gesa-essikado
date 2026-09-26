'use client'
import { useEffect, useState } from 'react'
import { getAllEvents } from '../../lib/queries'
import { SectionLabel, CoordinateTag } from '../../components/Geo'

function formatDate(ev) {
  return ev.date?.toDate
    ? ev.date.toDate().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    : ''
}

function EventCard({ ev, idx, past }) {
  return (
    <div className={`bg-navy p-7 hover:bg-panel transition-colors ${past ? 'opacity-60' : ''}`}>
      <div className="flex items-start justify-between mb-6">
        <span className="mono-label text-[11px] text-dim">EVT / {String(idx + 1).padStart(2, '0')}</span>
        {ev.tag && <span className="mono-label text-[10px] text-gold">{ev.tag}</span>}
      </div>
      <p className="font-head font-bold text-lg text-ink mb-3">{ev.title}</p>
      <CoordinateTag className="block mb-3 text-muted">
        {formatDate(ev)}{ev.location ? ` · ${ev.location}` : ''}
      </CoordinateTag>
      {ev.description && <p className="text-sm text-muted leading-relaxed">{ev.description}</p>}
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
    <section className="section pt-40 md:pt-48">
      <div className="container-gesa">
        <SectionLabel className="mb-6">Calendar</SectionLabel>
        <h1 className="font-head font-extrabold text-[clamp(2rem,5vw,3.5rem)] tracking-tight text-ink mb-6">Events</h1>
        <p className="text-muted max-w-[60ch] mb-10 leading-relaxed">
          Everything GESA has planned, and everything we&rsquo;ve already pulled off.
        </p>

        <div className="flex gap-3 mb-10">
          {['upcoming', 'past'].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2.5 text-[11px] mono-label font-semibold border transition-colors ${
                tab === t ? 'bg-gold text-navy border-gold' : 'border-line2 text-muted hover:border-gold'
              }`}
            >
              {t === 'upcoming' ? `Upcoming${events ? ` (${upcoming.length})` : ''}` : `Past${events ? ` (${past.length})` : ''}`}
            </button>
          ))}
        </div>

        {events === null ? (
          <p className="text-dim text-sm">Loading…</p>
        ) : list.length === 0 ? (
          <div className="border border-dashed border-line p-14 text-center text-dim text-sm">
            {tab === 'upcoming' ? 'No upcoming events at this time' : 'No past events recorded yet'}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-px bg-line">
            {list.map((ev, idx) => (
              <EventCard key={ev.id} ev={ev} idx={idx} past={tab === 'past'} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
