'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { getExecutives } from '../../lib/queries'
import { SectionLabel } from '../../components/Geo'

export default function ExecutivesPage() {
  const [execs, setExecs] = useState(null)

  useEffect(() => {
    getExecutives().then(setExecs).catch(() => setExecs([]))
  }, [])

  return (
    <section className="section pt-40 md:pt-48">
      <div className="container-gesa">
        <SectionLabel className="mb-6">Leadership</SectionLabel>
        <h1 className="font-head font-extrabold text-[clamp(2rem,5vw,3.5rem)] tracking-tight text-ink mb-12">Executives</h1>

        {execs === null ? (
          <p className="text-dim text-sm">Loading…</p>
        ) : execs.length === 0 ? (
          <div className="border border-dashed border-line p-14 text-center text-dim text-sm">
            Executives will appear here once added in the admin dashboard
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-px bg-line">
            {execs.map((e, idx) => (
              <div key={e.id} className="bg-navy p-8 hover:bg-panel transition-colors">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-20 h-20 rounded-full overflow-hidden bg-panel flex items-center justify-center border border-line">
                    {e.photoUrl ? (
                      <Image src={e.photoUrl} alt={e.name} width={80} height={80} className="object-cover object-portrait w-full h-full" />
                    ) : (
                      <span className="text-gold font-head font-bold text-lg">{(e.name || 'GE').slice(0, 2).toUpperCase()}</span>
                    )}
                  </div>
                  <span className="mono-label text-[10px] text-dim">{String(idx + 1).padStart(2, '0')}</span>
                </div>
                <p className="font-head font-bold text-ink">{e.name}</p>
                <p className="text-gold text-[11px] mono-label mt-1 mb-3">{e.position}</p>
                {e.bio && <p className="text-muted text-sm leading-relaxed">{e.bio}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
