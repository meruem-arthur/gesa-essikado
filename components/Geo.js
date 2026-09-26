'use client'
import { useEffect, useRef, useState } from 'react'

/* Small uppercase mono label used throughout as a section eyebrow. */
export function SectionLabel({ children, className = '' }) {
  return <p className={`section-label ${className}`}>{children}</p>
}

/* Coordinate / metadata chip — e.g. 06°05'12"N — used around images & heroes. */
export function CoordinateTag({ children, className = '' }) {
  return (
    <span className={`mono-label text-[11px] text-goldLight/90 ${className}`}>
      {children}
    </span>
  )
}

/* Minimal crosshair mark, purely decorative. */
export function Crosshair({ size = 22, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      <line x1="12" y1="0" x2="12" y2="7" stroke="currentColor" strokeWidth="1" />
      <line x1="12" y1="17" x2="12" y2="24" stroke="currentColor" strokeWidth="1" />
      <line x1="0" y1="12" x2="7" y2="12" stroke="currentColor" strokeWidth="1" />
      <line x1="17" y1="12" x2="24" y2="12" stroke="currentColor" strokeWidth="1" />
      <circle cx="12" cy="12" r="1.3" fill="currentColor" />
    </svg>
  )
}

/* Survey benchmark glyph — triangle + dot, used to flag key figures/stats. */
export function Benchmark({ size = 18, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 3 L21 19 H3 Z" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="12" cy="14" r="1.4" fill="currentColor" />
    </svg>
  )
}

/* Subtle topographic contour lines used behind headline / hero content. */
export function ContourField({ className = '' }) {
  return (
    <svg
      viewBox="0 0 1200 500"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
    >
      {[0, 1, 2, 3, 4, 5].map(i => (
        <path
          key={i}
          d={`M -50 ${80 + i * 70} C 200 ${20 + i * 70}, 350 ${150 + i * 70}, 600 ${70 + i * 70} S 1000 ${170 + i * 70}, 1250 ${60 + i * 70}`}
          stroke="currentColor"
          strokeWidth="1"
          opacity={0.12 - i * 0.012}
        />
      ))}
    </svg>
  )
}

/* Fine engineering grid, as an SVG so it can sit inside rounded/clipped containers. */
export function SurveyGrid({ className = '', spacing = 40 }) {
  const id = 'grid-' + spacing
  return (
    <svg className={className} aria-hidden="true" width="100%" height="100%">
      <defs>
        <pattern id={id} width={spacing} height={spacing} patternUnits="userSpaceOnUse">
          <path d={`M ${spacing} 0 L 0 0 0 ${spacing}`} fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  )
}

/* Decorative traverse-line / survey points connector. */
export function TraverseLine({ className = '' }) {
  return (
    <svg viewBox="0 0 400 40" fill="none" className={className} aria-hidden="true">
      <line x1="0" y1="20" x2="400" y2="20" stroke="currentColor" strokeWidth="1" strokeDasharray="2 6" opacity="0.5" />
      <circle cx="0" cy="20" r="3" fill="currentColor" />
      <circle cx="133" cy="20" r="3" fill="currentColor" />
      <circle cx="266" cy="20" r="3" fill="currentColor" />
      <circle cx="400" cy="20" r="3" fill="currentColor" />
    </svg>
  )
}

/* Small scale-bar decoration. */
export function ScaleBar({ className = '' }) {
  return (
    <span className={`scale-bar ${className}`} aria-hidden="true">
      {Array.from({ length: 6 }).map((_, i) => <span key={i} />)}
    </span>
  )
}

/* Fades + rises children into view on scroll. Wrap any block-level section content. */
export function Reveal({ children, className = '', as: Tag = 'div', delay = 0 }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            setVisible(true)
            obs.unobserve(e.target)
          }
        })
      },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}
