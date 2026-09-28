'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getSiteContent } from '../lib/queries'

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/executives', label: 'Executives' },
  { href: '/events', label: 'Events' },
  { href: '/news', label: 'News' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/library', label: 'Library' },
  { href: '/lecturers', label: 'Lecturers' },
  { href: '/talk-to-someone', label: 'Talk to Someone' },
  { href: '/contact', label: 'Contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [sidebarImage, setSidebarImage] = useState(null)
  const panelRef = useRef(null)

  useEffect(() => {
    getSiteContent().then(c => setSidebarImage(c?.sidebarImageUrl || null)).catch(() => setSidebarImage(null))
  }, [])

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 24) }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
    <header className="fixed top-0 inset-x-0 z-40">
      {/* Permanent top scrim — keeps nav legible over any hero image, scroll or not */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-300 scrim-top ${
          scrolled ? 'opacity-0' : 'opacity-100'
        }`}
        aria-hidden="true"
      />
      <div
        className={`transition-all duration-300 border-b ${
          scrolled
            ? 'bg-navy/92 backdrop-blur-md border-line'
            : 'bg-transparent border-transparent'
        }`}
      >
        <div className="container-gesa flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-3 group">
            <Image src="/logo.png" alt="GESA" width={46} height={46} priority className="rounded-sm" />
            <span className="hidden sm:flex flex-col leading-none">
              <span className="font-head font-extrabold text-lg tracking-tight text-ink text-glow">
                GE<span className="text-gold">SA</span>
              </span>
              <span className="mono-label text-[10px] text-muted tracking-widest2 text-glow">Essikado Campus</span>
            </span>
          </Link>

          <nav className="hidden lg:flex gap-5 xl:gap-8 text-[13.5px]">
            {NAV.map(n => (
              <Link
                key={n.href}
                href={n.href}
                className="link-underline text-ink/90 hover:text-gold transition-colors font-semibold tracking-wide text-glow"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="lg:hidden relative w-9 h-9 flex flex-col items-center justify-center gap-[5px] text-ink text-glow"
          >
            <span className="block w-6 h-px bg-current" />
            <span className="block w-6 h-px bg-current" />
          </button>
        </div>
      </div>

      {/* Mobile overlay sidebar */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/70" onClick={() => setOpen(false)} />
          <aside
            ref={panelRef}
            className="absolute right-0 top-0 h-full w-80 max-w-[88vw] overflow-hidden bg-navy2 border-l border-line"
          >
            <div className="absolute inset-0">
              {sidebarImage ? (
                <Image src={sidebarImage} alt="" fill className="object-cover opacity-25" />
              ) : (
                <div className="w-full h-full bg-survey-grid opacity-40" />
              )}
              <div className="absolute inset-0 bg-navy2/90" />
            </div>

            <div className="relative flex flex-col h-full p-7">
              <div className="flex items-center justify-between mb-10">
                <Image src="/logo.png" alt="GESA" width={52} height={52} className="rounded-sm" />
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="w-9 h-9 rounded-full border border-line2 text-ink flex items-center justify-center hover:border-gold"
                >
                  ✕
                </button>
              </div>
              <p className="mono-label text-[10px] text-dim mb-4">Navigate</p>
              <nav className="flex flex-col">
                {NAV.map((n, i) => (
                  <Link
                    key={n.href}
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="py-3 text-lg font-head font-semibold text-ink hover:text-gold border-b border-line/70 flex items-center justify-between"
                  >
                    {n.label}
                    <span className="mono-label text-[10px] text-dim">{String(i + 1).padStart(2, '0')}</span>
                  </Link>
                ))}
              </nav>
              <div className="mt-auto pt-6 mono-label text-[10px] text-dim">
                GESA · UMaT · ESSIKADO
              </div>
            </div>
          </aside>
        </div>
      )}
    </header>
  )
}
