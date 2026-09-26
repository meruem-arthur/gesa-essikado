'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { getExecutives } from '../../lib/queries'

export default function ExecutivesPage() {
  const [execs, setExecs] = useState(null)

  useEffect(() => {
    getExecutives().then(setExecs).catch(() => setExecs([]))
  }, [])

  return (
    <section className="section">
      <div className="container-gesa">
        <p className="text-xs uppercase tracking-wide text-dim mb-2">Leadership</p>
        <h1 className="font-head font-bold text-3xl mb-10">Executives</h1>

        {execs === null ? (
          <p className="text-dim text-sm">Loading…</p>
        ) : execs.length === 0 ? (
          <div className="border border-dashed border-border rounded-xl p-10 text-center text-dim text-sm">
            Executives will appear here once added in the admin dashboard
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {execs.map(e => (
              <div key={e.id} className="card-gesa p-6 text-center">
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden bg-card2 mb-4 flex items-center justify-center">
                  {e.photoUrl ? (
                    <Image src={e.photoUrl} alt={e.name} width={96} height={96} className="object-cover w-full h-full" />
                  ) : (
                    <span className="text-gold2 font-head font-bold text-lg">{(e.name || 'GE').slice(0, 2).toUpperCase()}</span>
                  )}
                </div>
                <p className="font-head font-semibold">{e.name}</p>
                <p className="text-gold2 text-xs mb-2">{e.position}</p>
                {e.bio && <p className="text-muted text-sm">{e.bio}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
