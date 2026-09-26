'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { getGalleryPhotos } from '../../lib/queries'

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
    <section className="section">
      <div className="container-gesa">
        <p className="text-xs uppercase tracking-wide text-dim mb-2">Moments</p>
        <h1 className="font-head font-bold text-3xl mb-10">Gallery</h1>

        {photos === null ? (
          <p className="text-dim text-sm">Loading…</p>
        ) : photos.length === 0 ? (
          <div className="border border-dashed border-border rounded-xl p-10 text-center text-dim text-sm">
            Photos will appear here once added in the admin dashboard
          </div>
        ) : (
          <div className="space-y-12">
            {Object.entries(groups).map(([category, items]) => (
              <div key={category}>
                <h2 className="font-head font-semibold text-lg mb-4">
                  {category} <span className="text-dim font-normal text-sm">({items.length})</span>
                </h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {items.map(p => (
                    <div key={p.id} className="relative aspect-square rounded-xl overflow-hidden bg-card2">
                      <Image src={p.imageUrl} alt={p.caption || category} fill className="object-cover" />
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
