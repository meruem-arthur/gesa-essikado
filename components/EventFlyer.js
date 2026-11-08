'use client'
import { useCallback, useState } from 'react'
import Image from 'next/image'
import Lightbox from './Lightbox'

/**
 * Event flyer thumbnail for an event card. Clicking it opens the full flyer in
 * the lightbox (with zoom) so tall posters are readable, not cropped.
 * Renders nothing when the event has no flyer.
 */
export default function EventFlyer({ src, title }) {
  const [open, setOpen] = useState(null)
  const close = useCallback(() => setOpen(null), [])

  if (!src) return null

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(0)}
        aria-label={`View flyer for ${title || 'event'}`}
        className="relative block w-full aspect-[4/3] mb-5 overflow-hidden bg-panel cursor-zoom-in group/flyer"
      >
        <Image
          src={src}
          alt={title ? `${title} flyer` : 'Event flyer'}
          fill
          sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-top transition-transform duration-500 group-hover/flyer:scale-[1.03]"
        />
        <span className="absolute bottom-2 right-2 mono-label text-[10px] text-ink bg-navy/80 px-2 py-1">
          VIEW FLYER
        </span>
      </button>
      <Lightbox
        images={[{ src, alt: title ? `${title} flyer` : 'Event flyer', caption: title }]}
        index={open}
        onClose={close}
        zoom
      />
    </>
  )
}
