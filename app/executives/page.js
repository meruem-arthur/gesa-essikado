'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { getExecutives } from '../../lib/queries'

export default function ExecutivesPage() {
  const [execs, setExecs] = useState(null)

  useEffect(() => {
    getExecutives().then(setExecs).catch(() => setExecs([]))
  }, [])

  const featured = execs && execs.length ? execs[0] : null
  const rest = execs && execs.length ? execs.slice(1) : []

  return (
    <section className="section pt-28">
      <div className="container-gesa">
        <p className="benchmark mb-6">BM&#8288;-03 &middot; LEADERSHIP</p>
        <h1 className="font-display font-semibold text-4xl md:text-5xl text-ink mb-14">Executives</h1>

        {execs === null ? (
          <p className="coord">LOADING&hellip;</p>
        ) : execs.length === 0 ? (
          <div className="border border-dashed border-line rounded-md p-10 text-center coord">
            EXECUTIVES WILL APPEAR HERE ONCE ADDED IN THE ADMIN DASHBOARD
          </div>
        ) : (
          <>
            {featured && (
              <div className="grid md:grid-cols-5 gap-10 items-center border-t border-b border-line py-10 mb-14">
                <div className="md:col-span-2 w-32 h-32 md:w-full md:h-64 rounded-full md:rounded-md overflow-hidden bg-surface2 flex items-center justify-center">
                  {featured.photoUrl ? (
                    <Image src={featured.photoUrl} alt={featured.name} width={256} height={256} className="object-cover w-full h-full" />
                  ) : (
                    <span className="text-gold2 font-display font-semibold text-3xl">{(featured.name || 'GE').slice(0, 2).toUpperCase()}</span>
                  )}
                </div>
                <div className="md:col-span-3">
                  <p className="coord mb-3">{(featured.position || 'PRESIDENT').toUpperCase()}</p>
                  <p className="font-display text-3xl md:text-4xl text-ink mb-4">{featured.name}</p>
                  {featured.bio && <p className="text-muted max-w-[56ch] leading-relaxed">{featured.bio}</p>}
                </div>
              </div>
            )}

            {rest.length > 0 && (
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-px bg-line">
                {rest.map(e => (
                  <div key={e.id} className="bg-bg p-6">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-surface2 mb-4 flex items-center justify-center">
                      {e.photoUrl ? (
                        <Image src={e.photoUrl} alt={e.name} width={64} height={64} className="object-cover w-full h-full" />
                      ) : (
                        <span className="text-gold2 font-display font-semibold">{(e.name || 'GE').slice(0, 2).toUpperCase()}</span>
                      )}
                    </div>
                    <p className="font-display text-ink">{e.name}</p>
                    <p className="coord mt-1 mb-2">{e.position}</p>
                    {e.bio && <p className="text-muted text-sm leading-relaxed">{e.bio}</p>}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
