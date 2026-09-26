'use client'
import { useEffect, useState } from 'react'
import { getAllEvents } from '../../lib/queries'
import SurveyPoint from '../../components/geo/SurveyPoint'

function DateBlock({ date }) {
  const d = date?.toDate ? date.toDate() : null
  if (!d) return <div className="coord w-16">TBA</div>
  return (
    <div className="w-16 flex-none text-center">
      <p className="font-display text-2xl leading-none text-ink">{d.getDate()}</p>
      <p className="coord mt-1">{d.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }).toUpperCase()}</p>
    </div>
  )
}

function EventRow({ ev, past }) {
  return (
    <div className={`flex items-start gap-6 py-6 border-b border-line ${past ? 'opacity-60' : ''}`}>
      <DateBlock date={ev.date} />
      <div className="flex-1 min-w-0">
        {ev.tag && <p className="coord mb-1">{ev.tag.toUpperCase()}</p>}
        <p className="font-display text-lg md:text-xl text-ink mb-1">{ev.title}</p>
        {ev.location && (
          <p className="flex items-center gap-1.5 text-sm text-muted mb-2">
            <SurveyPoint className="w-3 h-3 text-gold" />
            {ev.location}
          </p>
        )}
        {ev.description && <p className="text-sm text-muted max-w-[60ch]">{ev.description}</p>}
      </div>
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
    <section className="section pt-28">
      <div className="container-gesa">
        <p className="benchmark mb-6">BM&#8288;-04 &middot; CALENDAR</p>
        <h1 className="font-display font-semibold text-4xl md:text-5xl text-ink mb-4">Events</h1>
        <p className="text-muted max-w-[56ch] mb-10">
          Everything GESA has planned, and everything we&rsquo;ve already pulled off.
        </p>

        <div className="flex items-center gap-8 mb-4 border-b border-line">
          {['upcoming', 'past'].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`pb-4 -mb-px font-mono-label text-[13px] tracking-wide border-b-2 transition-colors ${
                tab === t ? 'text-gold2 border-gold2' : 'text-muted border-transparent hover:text-ink'
              }`}
            >
              {t === 'upcoming' ? `UPCOMING${events ? ` (${upcoming.length})` : ''}` : `PAST${events ? ` (${past.length})` : ''}`}
            </button>
          ))}
        </div>

        {events === null ? (
          <p className="coord mt-8">LOADING&hellip;</p>
        ) : list.length === 0 ? (
          <div className="border border-dashed border-line rounded-md p-10 text-center coord mt-8">
            {tab === 'upcoming' ? 'NO UPCOMING EVENTS AT THIS TIME' : 'NO PAST EVENTS RECORDED YET'}
          </div>
        ) : (
          <div>
            {list.map(ev => (
              <EventRow key={ev.id} ev={ev} past={tab === 'past'} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
