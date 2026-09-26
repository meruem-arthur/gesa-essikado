import Link from 'next/link'

const LINKS = [
  { href: '/library', label: 'Open Library', code: 'GM-09' },
  { href: '/gallery', label: 'Explore Gallery', code: 'GM-10' },
  { href: '/contact', label: 'Get In Touch', code: 'GM-11' },
]

export default function ExploreMore() {
  return (
    <section className="section-tight border-t border-line">
      <div className="container-gesa grid sm:grid-cols-3 gap-px bg-line">
        {LINKS.map(l => (
          <Link
            key={l.href}
            href={l.href}
            className="group bg-bg p-8 flex flex-col justify-between min-h-[140px] hover:bg-surface transition-colors"
          >
            <span className="coord">{l.code}</span>
            <span className="font-display text-xl text-ink flex items-center gap-2">
              {l.label}
              <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
