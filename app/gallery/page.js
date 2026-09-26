'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { getGalleryPhotos } from '../../lib/queries'
import { SectionLabel } from '../../components/Geo'

export default function GalleryPage() {
  const [photos, setPhotos] = useState(null)

  useEffect(() => {
    getGalleryPhotos().then(setPhotos).catch(() => setPhotos([]))
  }, [])

  const groups = {}
  ;(photos || []).forEach(p => {
    const key = p.caption || 'Gallery'
    if (!groups[key]) groups[key] = []
    groups[key].push(p)
  })

  return (
    <section className="section pt-40 md:pt-48">
      <div className="container-gesa">
        <SectionLabel className="mb-6">Moments</SectionLabel>
        <h1 className="font-head font-extrabold text-[clamp(2rem,5vw,3.5rem)] tracking-tight text-ink mb-12">Gallery</h1>

        {photos === null ? (
          <p className="text-dim text-sm">Loading…</p>
        ) : photos.length === 0 ? (
          <div className="border border-dashed border-line p-14 text-center text-dim text-sm">
            Photos will appear here once added in the admin dashboard
          </div>
        ) : (
          <div className="space-y-16">
            {Object.entries(groups).map(([category, items]) => (
              <div key={category}>
                <div className="flex items-baseline gap-3 mb-6 border-b border-line pb-4">
                  <h2 className="font-head font-semibold text-lg text-ink">{category}</h2>
                  <span className="mono-label text-[10px] text-dim">({items.length})</span>
                </div>
                {/* Asymmetric editorial masonry via CSS columns */}
                <div className="columns-2 md:columns-3 gap-3 [column-fill:_balance]">
                  {items.map((p, i) => (
                    <div
                      key={p.id}
                      className="relative mb-3 break-inside-avoid overflow-hidden group bg-panel"
                      style={{ aspectRatio: i % 5 === 0 ? '3 / 4' : i % 3 === 0 ? '1 / 1' : '4 / 3' }}
                    >
                      <Image
                        src={p.imageUrl}
                        alt={p.caption || category}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                        <p className="mono-label text-[10px] text-ink">{p.caption || category}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
