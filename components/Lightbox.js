'use client'
import { useCallback, useEffect, useRef, useState } from 'react'

const MIN_ZOOM = 1
const MAX_ZOOM = 4
const STEP = 0.5
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v))

/**
 * Full-screen image viewer.
 *  images:   [{ src, alt?, caption? }]
 *  index:    current index (null/undefined = closed)
 *  onClose:  () => void
 *  onChange: (newIndex) => void   (only needed for multiple images)
 *  zoom:     show zoom in / zoom out controls (pan by dragging, pinch, wheel, double-tap)
 *  counter:  show "n / total" (defaults to true when more than one image)
 */
export default function Lightbox({ images, index, onClose, onChange, zoom = false, counter }) {
  const open = index !== null && index !== undefined && images && images[index]
  const total = images ? images.length : 0
  const showCounter = counter ?? total > 1

  const [scale, setScale] = useState(1)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const pointers = useRef(new Map())
  const drag = useRef(null)
  const pinch = useRef(null)
  const touchStart = useRef(null)
  const lastTap = useRef(0)

  const resetZoom = useCallback(() => {
    setScale(1)
    setPos({ x: 0, y: 0 })
  }, [])

  const go = useCallback(
    dir => {
      if (total < 2 || !onChange) return
      onChange((index + dir + total) % total)
    },
    [index, total, onChange]
  )

  const changeZoom = useCallback(delta => {
    setScale(s => {
      const next = clamp(s + delta, MIN_ZOOM, MAX_ZOOM)
      if (next === 1) setPos({ x: 0, y: 0 })
      return next
    })
  }, [])

  // Reset zoom whenever the image changes
  useEffect(() => {
    resetZoom()
  }, [index, resetZoom])

  // Keyboard + body scroll lock
  useEffect(() => {
    if (!open) return
    const onKey = e => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') go(1)
      else if (e.key === 'ArrowLeft') go(-1)
      else if (zoom && (e.key === '+' || e.key === '=')) changeZoom(STEP)
      else if (zoom && (e.key === '-' || e.key === '_')) changeZoom(-STEP)
    }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose, go, zoom, changeZoom])

  if (!open) return null
  const img = images[index]

  // ---- pointer handling (pan when zoomed, pinch to zoom, swipe when not zoomed)
  const dist = () => {
    const [a, b] = [...pointers.current.values()]
    return Math.hypot(a.x - b.x, a.y - b.y)
  }

  const onPointerDown = e => {
    e.currentTarget.setPointerCapture?.(e.pointerId)
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    if (pointers.current.size === 2 && zoom) {
      pinch.current = { d: dist(), s: scale }
      drag.current = null
      touchStart.current = null
    } else if (pointers.current.size === 1) {
      if (zoom && scale > 1) {
        drag.current = { x: e.clientX, y: e.clientY, ox: pos.x, oy: pos.y }
      } else {
        touchStart.current = { x: e.clientX, y: e.clientY }
      }
    }
  }

  const onPointerMove = e => {
    if (!pointers.current.has(e.pointerId)) return
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    if (pinch.current && pointers.current.size === 2) {
      const next = clamp(pinch.current.s * (dist() / pinch.current.d), MIN_ZOOM, MAX_ZOOM)
      setScale(next)
      if (next === 1) setPos({ x: 0, y: 0 })
    } else if (drag.current) {
      setPos({
        x: drag.current.ox + (e.clientX - drag.current.x),
        y: drag.current.oy + (e.clientY - drag.current.y),
      })
    }
  }

  const onPointerUp = e => {
    pointers.current.delete(e.pointerId)
    if (pointers.current.size < 2) pinch.current = null
    if (pointers.current.size === 0) {
      drag.current = null
      // swipe left / right to change image (only when not zoomed)
      if (touchStart.current && scale === 1 && total > 1) {
        const dx = e.clientX - touchStart.current.x
        const dy = e.clientY - touchStart.current.y
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1)
      }
      touchStart.current = null
      // double tap toggles zoom
      if (zoom) {
        const now = Date.now()
        if (now - lastTap.current < 300) {
          if (scale > 1) resetZoom()
          else setScale(2)
        }
        lastTap.current = now
      }
    }
  }

  const onWheel = e => {
    if (!zoom) return
    changeZoom(e.deltaY < 0 ? 0.25 : -0.25)
  }

  const btn =
    'w-11 h-11 flex items-center justify-center rounded-full text-white/90 hover:text-white hover:bg-white/15 transition-colors'

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/90 flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label={img.alt || 'Image viewer'}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 text-white shrink-0">
        <span className="text-lg tabular-nums">{showCounter ? `${index + 1} / ${total}` : ''}</span>
        <div className="flex items-center gap-1">
          {zoom && (
            <>
              <button type="button" onClick={() => changeZoom(STEP)} disabled={scale >= MAX_ZOOM} aria-label="Zoom in" className={`${btn} disabled:opacity-40`}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M21 21l-4.3-4.3M11 8v6M8 11h6" />
                </svg>
              </button>
              <button type="button" onClick={() => changeZoom(-STEP)} disabled={scale <= MIN_ZOOM} aria-label="Zoom out" className={`${btn} disabled:opacity-40`}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M21 21l-4.3-4.3M8 11h6" />
                </svg>
              </button>
            </>
          )}
          <button type="button" onClick={onClose} aria-label="Close" className={btn}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M5 5l14 14M19 5L5 19" />
            </svg>
          </button>
        </div>
      </div>

      {/* Image area — clicking the dark backdrop closes the viewer */}
      <div
        className="relative flex-1 min-h-0 flex items-center justify-center overflow-hidden"
        onClick={e => {
          if (e.target === e.currentTarget) onClose()
        }}
      >
        {total > 1 && (
          <button type="button" onClick={() => go(-1)} aria-label="Previous image" className={`${btn} absolute left-2 md:left-6 z-10 bg-black/40`}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </button>
        )}

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={img.src}
          src={img.src}
          alt={img.alt || ''}
          draggable={false}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onWheel={onWheel}
          className="max-w-full max-h-full object-contain select-none"
          style={{
            transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`,
            transition: drag.current || pinch.current ? 'none' : 'transform 0.15s ease-out',
            cursor: zoom ? (scale > 1 ? 'grab' : 'zoom-in') : 'default',
            touchAction: zoom || total > 1 ? 'none' : 'auto',
          }}
        />

        {total > 1 && (
          <button type="button" onClick={() => go(1)} aria-label="Next image" className={`${btn} absolute right-2 md:right-6 z-10 bg-black/40`}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>

      {img.caption && <p className="text-center text-white/80 text-sm px-4 py-3 shrink-0">{img.caption}</p>}
    </div>
  )
}
