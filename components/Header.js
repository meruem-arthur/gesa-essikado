'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
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
  { href: '/contact', label: 'Contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [sidebarImage, setSidebarImage] = useState(null)
  const panelRef = useRef(null)
  const pathname = usePathname()

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

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header className="fixed top-0 inset-x-0 z-40">
      <div
        className={`transition-colors duration-500 ${
          scrolled ? 'bg-bg/85 backdrop-blur border-b border-line' : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="container-gesa flex items-center justify-between py-5">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="GESA" width={34} height={34} priority />
            <span className="hidden sm:flex flex-col leading-none">
              <span className="font-display font-semibold text-[15px] tracking-tight text-ink">
                GESA
              </span>
              <span className="coord !text-[10px] !text-dim">Essikado Campus</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-[13px] font-mono-label tracking-wide">
            {NAV.map(n => {
              const active = pathname === n.href
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  aria-current={active ? 'page' : undefined}
                  className={`link-underline pb-1 transition-colors ${
                    active ? 'text-gold2' : 'text-muted hover:text-ink'
                  }`}
                >
                  {n.label.toUpperCase()}
                </Link>
              )
            })}
          </nav>

          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="md:hidden text-ink flex flex-col gap-[5px] w-7"
          >
            <span className="h-px w-full bg-current" />
            <span className="h-px w-4 bg-current self-end" />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/70" onClick={() => setOpen(false)} />
          <aside
            ref={panelRef}
            className="absolute right-0 top-0 h-full w-80 max-w-[88vw] overflow-hidden bg-surface"
          >
            <div className="absolute inset-0">
              {sidebarImage ? (
                <Image src={sidebarImage} alt="" fill className="object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-b from-purpledeep via-surface to-bg" />
              )}
              <div className="absolute inset-0 bg-bg/90" />
            </div>

            <div className="relative flex flex-col h-full p-7">
              <div className="flex items-center justify-between mb-10">
                <span className="coord">UMaT · ESSIKADO</span>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="w-9 h-9 rounded-full border border-line2 text-ink flex items-center justify-center hover:border-gold"
                >
                  ✕
                </button>
              </div>

              <nav className="flex flex-col">
                {NAV.map((n, i) => {
                  const active = pathname === n.href
                  return (
                    <Link
                      key={n.href}
                      href={n.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? 'page' : undefined}
                      className={`flex items-baseline gap-4 py-3 border-b border-line font-display text-2xl ${
                        active ? 'text-gold2' : 'text-ink hover:text-gold2'
                      }`}
                    >
                      <span className="coord !text-dim">{String(i + 1).padStart(2, '0')}</span>
                      {n.label}
                    </Link>
                  )
                })}
              </nav>

              <div className="mt-auto coord">06°05&rsquo;12&Prime;N · 001°38&rsquo;42&Prime;W</div>
            </div>
          </aside>
        </div>
      )}
    </header>
  )
}
