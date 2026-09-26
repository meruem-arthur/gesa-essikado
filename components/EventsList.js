'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getEvents } from '../lib/queries'
import SurveyPoint from './geo/SurveyPoint'

function DateBlock({ date }) {
  const d = date?.toDate ? date.toDate() : null
  if (!d) return <div className="coord w-16">TBA</div>
  return (
    <div className="w-16 flex-none text-center">
      <p className="font-display text-2xl leading-none text-ink">{d.getDate()}</p>
      <p className="coord mt-1">{d.toLocaleDateString('en-GB', { month: 'short' }).toUpperCase()}</p>
    </div>
  )
}

export default function EventsList() {
  const [events, setEvents] = useState(null)

  useEffect(() => {
    getEvents(20).then(list => {
      const now = new Date()
      setEvents(list.filter(e => e.date?.toDate ? e.date.toDate() >= now : true).slice(0, 3))
    }).catch(() => setEvents([]))
  }, [])

  return (
    <section className="section-tight border-t border-line">
      <div className="container-gesa">
        <div className="flex items-end justify-between mb-10 gap-6 flex-wrap">
          <p className="benchmark">BM&#8288;-04 &middot; EVENTS</p>
          <Link href="/events" className="link-underline font-mono-label text-[13px] text-muted hover:text-ink pb-1">
            VIEW EVENTS &rarr;
          </Link>
        </div>

        {events === null ? (
          <p className="coord">LOADING&hellip;</p>
        ) : events.length === 0 ? (
          <div className="border border-dashed border-line rounded-md p-10 text-center coord">
            NO UPCOMING EVENTS AT THIS TIME
          </div>
        ) : (
          <div className="border-t border-line">
            {events.map(ev => (
              <div key={ev.id} className="flex items-start gap-6 py-6 border-b border-line">
                <DateBlock date={ev.date} />
                <div className="flex-1 min-w-0">
                  {ev.tag && <p className="coord mb-1">{ev.tag.toUpperCase()}</p>}
                  <p className="font-display text-lg text-ink mb-1">{ev.title}</p>
                  {ev.location && (
                    <p className="flex items-center gap-1.5 text-sm text-muted">
                      <SurveyPoint className="w-3 h-3 text-gold" />
                      {ev.location}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
