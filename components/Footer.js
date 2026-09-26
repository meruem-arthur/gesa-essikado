'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getSiteLinks } from '../lib/queries'
import ContourLines from './geo/ContourLines'

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
  { href: '/contact', label: 'Contact' },
]

export default function Footer() {
  const [links, setLinks] = useState(null)

  useEffect(() => {
    getSiteLinks().then(setLinks).catch(() => setLinks([]))
  }, [])

  const important = links || []

  return (
    <footer className="relative border-t border-line overflow-hidden">
      <ContourLines className="opacity-40" tone="gold" />

      <div className="relative container-gesa pt-20 pb-10">
        <h2 className="font-display font-semibold text-clamp-statement leading-[0.95] tracking-tight text-ink max-w-3xl">
          We measure <span className="text-gold2">what matters.</span>
        </h2>

        <div className="grid sm:grid-cols-3 gap-10 mt-16 pt-10 border-t border-line">
          <div>
            <Image src="/logo.png" alt="GESA" width={40} height={40} className="mb-4" />
            <p className="coord max-w-[28ch]">
              Geomatic Engineering Students&rsquo; Association &mdash; UMaT Essikado Campus.
            </p>
          </div>

          <div>
            <p className="coord mb-4">NAVIGATE</p>
            <ul className="space-y-2 text-sm">
              {NAV.map(n => (
                <li key={n.href}>
                  <Link href={n.href} className="text-muted hover:text-gold2 transition-colors">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="coord mb-4">LINKS</p>
            <ul className="space-y-2 text-sm">
              {important.length === 0 && <li className="text-dim">Links coming soon</li>}
              {important.map(l => (
                <li key={l.id}>
                  <a
                    href={normalizeUrl(l.url)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-gold2 transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="relative border-t border-line py-5">
        <div className="container-gesa flex flex-wrap items-center justify-between gap-3">
          <p className="coord">GESA &middot; UMaT &middot; ESSIKADO</p>
          <p className="coord">&copy; {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  )
}
