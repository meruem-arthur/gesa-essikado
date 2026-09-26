import Link from 'next/link'
import Image from 'next/image'

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
        <details className="md:hidden">
          <summary className="list-none cursor-pointer text-gold2 text-xl">≡</summary>
          <div className="absolute right-4 mt-3 flex flex-col gap-1 bg-card border border-border rounded-xl p-3 w-44">
            {NAV.map(n => (
              <Link key={n.href} href={n.href} className="px-2 py-2 text-sm text-muted hover:text-gold2">
                {n.label}
              </Link>
            ))}
          </div>
        </details>
      </div>
    </header>
  )
}
