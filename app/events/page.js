'use client'
import { useEffect, useState } from 'react'
import { getAllEvents, getSiteContent } from '../../lib/queries'
import { CoordinateTag } from '../../components/Geo'
import PageHero from '../../components/PageHero'

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
  const [content, setContent] = useState(null)
  const [tab, setTab] = useState('upcoming')

  useEffect(() => {
    getAllEvents().then(setEvents).catch(() => setEvents([]))
    getSiteContent().then(setContent).catch(() => setContent(null))
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
    <>
      <PageHero
        imageUrl={content?.eventsHeroImageUrl}
        eyebrow="Calendar"
        title="Events"
        subtitle="Everything GESA has planned, and everything we've already pulled off."
      />
      <section className="section pt-16">
        <div className="container-gesa">
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
    </>
  )
}
