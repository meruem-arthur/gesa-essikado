'use client'
import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { getExecutives, getSiteContent } from '../../lib/queries'
import PageHero from '../../components/PageHero'
import Lightbox from '../../components/Lightbox'

export default function ExecutivesPage() {
  const [execs, setExecs] = useState(null)
  const [content, setContent] = useState(null)
  const [viewing, setViewing] = useState(null)
  const closeViewer = useCallback(() => setViewing(null), [])

  useEffect(() => {
    getExecutives().then(setExecs).catch(() => setExecs([]))
    getSiteContent().then(setContent).catch(() => setContent(null))
  }, [])

  return (
    <>
      <PageHero
        imageUrl={content?.executivesHeroImageUrl}
        eyebrow="Leadership"
        title="Executives"
        subtitle="The elected committee steering GESA — Essikado Campus."
      />
      <section className="section pt-16">
        <div className="container-gesa">
          {execs === null ? (
            <p className="text-dim text-sm">Loading…</p>
          ) : execs.length === 0 ? (
            <div className="border border-dashed border-line p-14 text-center text-dim text-sm">
              Executives will appear here once added in the admin dashboard
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
              {execs.map(e => (
                <div key={e.id}>
                  {e.photoUrl ? (
                    <button
                      type="button"
                      onClick={() => setViewing({ src: e.photoUrl, alt: e.name, caption: `${e.name}${e.position ? ' — ' + e.position : ''}` })}
                      aria-label={`View photo of ${e.name}`}
                      className="relative block w-full aspect-[4/5] overflow-hidden bg-panel border border-line mb-4 cursor-zoom-in"
                    >
                      <Image src={e.photoUrl} alt={e.name} fill className="object-cover object-portrait" />
                    </button>
                  ) : (
                    <div className="relative w-full aspect-[4/5] overflow-hidden bg-panel border border-line mb-4 flex items-center justify-center">
                      <span className="text-gold font-head font-bold text-2xl">{(e.name || 'GE').slice(0, 2).toUpperCase()}</span>
                    </div>
                  )}
                  <p className="font-head font-bold text-ink">{e.name}</p>
                  <p className="text-gold text-[11px] mono-label mt-1 mb-3">{e.position}</p>
                  {e.bio && <p className="text-muted text-sm leading-relaxed">{e.bio}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <Lightbox zoom images={viewing ? [viewing] : []} index={viewing ? 0 : null} onClose={closeViewer} />
    </>
  )
}
