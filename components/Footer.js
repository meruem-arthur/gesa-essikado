'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getSiteLinks } from '../lib/queries'

function normalizeUrl(url) {
  if (!url) return '#'

  const value = url.trim()

  if (!value) return '#'

  // Keep URLs that already have a protocol such as:
  // https://
  // http://
  // mailto:
  // tel:
  if (/^[a-z][a-z0-9+.-]*:/i.test(value)) {
    return value
  }

  // If the admin entered something like:
  // dues.gesa-essikado.com
  // automatically make it:
  // https://dues.gesa-essikado.com
  return `https://${value}`
}

export default function Footer() {
  const [links, setLinks] = useState(null)

  useEffect(() => {
    getSiteLinks().then(setLinks).catch(() => setLinks([]))
  }, [])

  const important = links || []

  return (
    <footer className="border-t border-border mt-16">
      <div className="container-gesa py-14 grid gap-10 sm:grid-cols-3">
        <div>
          <Image
            src="/logo.png"
            alt="GESA"
            width={48}
            height={48}
            className="mb-3"
          />
          <p className="text-sm text-muted max-w-[26ch]">
            Geomatic Engineering Students&rsquo; Association — UMaT Essikado Campus.
          </p>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-wide text-dim mb-3">
            About GESA
          </h4>

          <ul className="space-y-2 text-sm text-muted">
            <li>
              <Link href="/about" className="hover:text-gold2">
                About
              </Link>
            </li>

            <li>
              <Link href="/executives" className="hover:text-gold2">
                Executives
              </Link>
            </li>

            <li>
              <Link href="/gallery" className="hover:text-gold2">
                Gallery
              </Link>
            </li>

            <li>
              <Link href="/contact" className="hover:text-gold2">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-wide text-dim mb-3">
            Important Links
          </h4>

          <ul className="space-y-2 text-sm text-muted">
            {important.length === 0 && (
              <li className="text-dim">Links coming soon</li>
            )}

            {important.map(l => (
              <li key={l.id}>
                <a
                  href={normalizeUrl(l.url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold2"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border py-5 text-center text-xs text-dim">
        © {new Date().getFullYear()} GESA · Essikado Campus · The Eye of the Engineer
      </div>
    </footer>
  )
}