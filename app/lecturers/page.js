'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { getLecturers, getSiteContent } from '../../lib/queries'
import PageHero from '../../components/PageHero'
import { CoordinateTag } from '../../components/Geo'

// 'Dean' is the legacy value; the role is now Principal
const isPrincipal = l => l.pinnedRole === 'Principal' || l.pinnedRole === 'Dean'
const roleLabel = l => (l.pinnedRole === 'HOD' ? 'HEAD OF DEPARTMENT' : isPrincipal(l) ? 'PRINCIPAL' : l.pinnedRole.toUpperCase())

function Avatar({ lec, size }) {
  return (
    <div className="relative overflow-hidden bg-panel border border-line flex items-center justify-center" style={{ width: size, height: size * 1.25 }}>
      {lec.photoUrl ? (
        <Image src={lec.photoUrl} alt={lec.name} fill className="object-cover object-portrait" />
      ) : (
        <span className="text-gold font-head font-bold text-2xl">{(lec.name || 'GE').slice(0, 2).toUpperCase()}</span>
      )}
    </div>
  )
}

export default function LecturersPage() {
  const [list, setList] = useState(null)
  const [content, setContent] = useState(null)

  useEffect(() => {
    getLecturers().then(setList).catch(() => setList([]))
    getSiteContent().then(setContent).catch(() => setContent(null))
  }, [])

  const sorted = (list || []).slice().sort((a, b) => {
    const rank = l => (l.pinnedRole === 'HOD' ? 0 : isPrincipal(l) ? 1 : 2)
    return rank(a) - rank(b) || (a.name || '').localeCompare(b.name || '')
  })
  const pinned = sorted.filter(l => l.pinnedRole)
  const others = sorted.filter(l => !l.pinnedRole)

  return (
    <>
      <PageHero
        imageUrl={content?.lecturersHeroImageUrl}
        eyebrow="Faculty"
        title="Our Lecturers"
        subtitle="The department staff guiding Geomatic Engineering students at UMaT."
      />
      <section className="section pt-16">
        <div className="container-gesa">
          {list === null ? (
            <p className="text-dim text-sm">Loading…</p>
          ) : list.length === 0 ? (
            <div className="border border-dashed border-line p-14 text-center text-dim text-sm">
              Lecturers will appear here once added in the admin dashboard
            </div>
          ) : (
            <>
              {pinned.length > 0 && (
                <div className="grid md:grid-cols-2 gap-px bg-line mb-14">
                  {pinned.map(l => (
                    <div key={l.id} className="bg-navy2 p-8 md:p-10 flex gap-6">
                      <Avatar lec={l} size={160} />
                      <div className="min-w-0">
                        <CoordinateTag className="block mb-3">{roleLabel(l)}</CoordinateTag>
                        <p className="font-head font-bold text-xl text-ink">{l.title ? `${l.title} ` : ''}{l.name}</p>
                        {l.major && <p className="text-gold text-xs mono-label mt-1">{l.major}</p>}
                        {l.email && (
                          <a href={`mailto:${l.email}`} className="link-underline text-sm text-muted hover:text-ink mt-3 inline-block break-all">{l.email}</a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {others.length > 0 && (
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                  {others.map(l => (
                    <div key={l.id}>
                      <div className="relative w-full aspect-[4/5] overflow-hidden bg-panel border border-line mb-4 flex items-center justify-center">
                        {l.photoUrl ? (
                          <Image src={l.photoUrl} alt={l.name} fill className="object-cover object-portrait" />
                        ) : (
                          <span className="text-gold font-head font-bold text-2xl">{(l.name || 'GE').slice(0, 2).toUpperCase()}</span>
                        )}
                      </div>
                      <p className="font-head font-semibold text-sm text-ink">{l.title ? `${l.title} ` : ''}{l.name}</p>
                      {l.major && <p className="text-gold text-[11px] mono-label mt-1">{l.major}</p>}
                      {l.email && (
                        <a href={`mailto:${l.email}`} className="link-underline text-xs text-muted hover:text-ink mt-2 inline-block break-all">{l.email}</a>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  )
}
