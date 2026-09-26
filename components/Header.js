'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getSiteContent } from '../lib/queries'

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/executives', label: 'Executives' },
  { href: '/news', label: 'News' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/library', label: 'Library' },
  { href: '/contact', label: 'Contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [sidebarImage, setSidebarImage] = useState(null)
  const panelRef = useRef(null)

  useEffect(() => {
    getSiteContent().then(c => setSidebarImage(c?.sidebarImageUrl || null)).catch(() => setSidebarImage(null))
  }, [])

  // Close the panel on any click/tap outside it.
  useEffect(() => {
    if (!open) return
    function handleOutside(e) {
      if (panelRef.current && !panelRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleOutside)
    document.addEventListener('touchstart', handleOutside)
    return () => {
      document.removeEventListener('mousedown', handleOutside)
      document.removeEventListener('touchstart', handleOutside)
    }
  }, [open])

  return (
    <header className="sticky top-0 z-40 bg-bg/90 backdrop-blur border-b border-border">
      <div className="container-gesa flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="GESA" width={40} height={40} priority />
          <span className="hidden sm:flex flex-col leading-none">
            <span className="font-head font-extrabold text-lg tracking-tight">
              GE<span className="text-gold2">SA</span>
            </span>
            <span className="text-[11px] font-body text-muted">Essikado Campus</span>
          </span>
        </Link>
        <nav className="hidden md:flex gap-7 text-sm text-muted">
          {NAV.map(n => (
            <Link key={n.href} href={n.href} className="hover:text-gold2 transition-colors">
              {n.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="md:hidden text-gold2 text-xl leading-none"
        >
          ≡
        </button>
      </div>

      {/* Mobile overlay sidebar */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/60" />
          <aside
            ref={panelRef}
            className="absolute right-0 top-0 h-full w-72 max-w-[85vw] overflow-hidden"
          >
            {/* Background image blended under a dark tint, same trick as the hero */}
            <div className="absolute inset-0">
              {sidebarImage ? (
                <Image src={sidebarImage} alt="" fill className="object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-b from-surface via-bg to-card" />
              )}
              <div className="absolute inset-0 bg-bg/85" />
            </div>

            <div className="relative flex flex-col h-full p-6">
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="self-end mb-6 w-9 h-9 rounded-full border border-border2 text-text flex items-center justify-center hover:border-gold2"
              >
                ✕
              </button>
              <Image src="/logo.png" alt="GESA" width={64} height={64} className="rounded-xl mb-6" />
              <nav className="flex flex-col gap-1">
                {NAV.map(n => (
                  <Link
                    key={n.href}
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="px-2 py-3 text-base text-muted hover:text-gold2 border-b border-border/60"
                  >
                    {n.label}
                  </Link>
                ))}
              </nav>
            </div>
          </aside>
        </div>
      )}
    </header>
  )
}
