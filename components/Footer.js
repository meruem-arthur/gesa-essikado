'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getSiteLinks } from '../lib/queries'
import { ContourField, CoordinateTag, SectionLabel } from './Geo'

function normalizeUrl(url) {
  if (!url) return '#'
  const value = url.trim()
  if (!value) return '#'
  if (/^[a-z][a-z0-9+.-]*:/i.test(value)) return value
  return `https://${value}`
}

const NAV = [
  { href: '/about', label: 'About' },
  { href: '/executives', label: 'Executives' },
  { href: '/events', label: 'Events' },
  { href: '/news', label: 'News' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/library', label: 'Library' },
  { href: '/talk-to-someone', label: 'Talk to Someone' },
  { href: '/contact', label: 'Contact' },
]

export default function Footer() {
  const [links, setLinks] = useState(null)

  useEffect(() => {
    getSiteLinks().then(setLinks).catch(() => setLinks([]))
  }, [])

  const important = links || []

  return (
    <footer className="relative border-t border-line bg-navy2 overflow-hidden">
      <ContourField className="absolute inset-0 w-full h-full text-purpleSoft" />

      <div className="relative container-gesa pt-20 pb-10">
        <div className="mb-16">
          <SectionLabel className="mb-6">GESA · UMaT · Essikado</SectionLabel>
          <h2 className="font-head font-extrabold text-[clamp(1.7rem,4.6vw,3.2rem)] leading-[1.05] tracking-tight text-ink max-w-4xl">
            THE WORLD<br />THROUGH OUR <span className="text-gold">LENS.</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10 border-t border-line pt-10">
          <div>
            <Image src="/logo.png" alt="GESA" width={44} height={44} className="mb-4" />
            <p className="text-sm text-muted max-w-[28ch] leading-relaxed">
              Geomatic Engineering Students&rsquo; Association — UMaT Essikado Campus.
            </p>
            <CoordinateTag className="block mt-4">06°05&rsquo;12&Prime;N · 001°38&rsquo;42&Prime;W</CoordinateTag>
          </div>

          <div>
            <p className="mono-label text-[10px] text-dim mb-4">Navigate</p>
            <ul className="space-y-2.5 text-sm">
              {NAV.slice(0, 4).map(n => (
                <li key={n.href}>
                  <Link href={n.href} className="text-muted hover:text-gold transition-colors">{n.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mono-label text-[10px] text-dim mb-4">Resources</p>
            <ul className="space-y-2.5 text-sm">
              {NAV.slice(4).map(n => (
                <li key={n.href}>
                  <Link href={n.href} className="text-muted hover:text-gold transition-colors">{n.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mono-label text-[10px] text-dim mb-4">Important Links</p>
            <ul className="space-y-2.5 text-sm">
              {important.length === 0 && <li className="text-dim">Coming soon</li>}
              {important.map(l => (
                <li key={l.id}>
                  <a
                    href={normalizeUrl(l.url)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-gold transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-line mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="mono-label text-[10px] text-dim">
            © {new Date().getFullYear()} GESA · ESSIKADO CAMPUS
          </p>
          <p className="mono-label text-[10px] text-dim">THE EYE OF THE ENGINEER</p>
        </div>
      </div>
    </footer>
  )
}
