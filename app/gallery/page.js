'use client'
import { useEffect, useState } from 'react'
import { getGalleryPhotos } from '../../lib/queries'

export default function GalleryPage() {
  const [photos, setPhotos] = useState(null)

  useEffect(() => {
    getGalleryPhotos().then(setPhotos).catch(() => setPhotos([]))
  }, [])

  return (
    <section className="section pt-28">
      <div className="container-gesa">
        <p className="benchmark mb-6">BM&#8288;-10 &middot; MOMENTS</p>
        <h1 className="font-display font-semibold text-4xl md:text-5xl text-ink mb-14">Gallery</h1>

        {photos === null ? (
          <p className="coord">LOADING&hellip;</p>
        ) : photos.length === 0 ? (
          <div className="border border-dashed border-line rounded-md p-10 text-center coord">
            PHOTOS WILL APPEAR HERE ONCE ADDED IN THE ADMIN DASHBOARD
          </div>
        ) : (
          <div className="columns-2 md:columns-3 gap-4 [&>*]:mb-4">
            {photos.map(p => (
              <div key={p.id} className="group relative break-inside-avoid overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.imageUrl}
                  alt={p.caption || 'GESA'}
                  loading="lazy"
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {p.caption && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg/90 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-sm text-ink">{p.caption}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
