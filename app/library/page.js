'use client'
import { useEffect, useState } from 'react'
import { getMaterials, getPastQuestions, getSiteContent } from '../../lib/queries'
import PageHero from '../../components/PageHero'

const LEVELS = ['100', '200', '300', '400']

export default function LibraryPage() {
  const [materials, setMaterials] = useState(null)
  const [pastQ, setPastQ] = useState(null)
  const [content, setContent] = useState(null)
  const [tab, setTab] = useState('materials')

  useEffect(() => {
    getMaterials().then(setMaterials).catch(() => setMaterials([]))
    getPastQuestions().then(setPastQ).catch(() => setPastQ([]))
    getSiteContent().then(setContent).catch(() => setContent(null))
  }, [])

  const data = tab === 'materials' ? materials : pastQ

  return (
    <>
      <PageHero
        imageUrl={content?.libraryHeroImageUrl}
        eyebrow="Resources"
        title="GESA Library"
        subtitle="Lecture notes and past questions for Geomatic Engineering, organised by level."
      />
      <section className="section pt-16">
        <div className="container-gesa">
        <div className="flex gap-3 mb-12">
          {['materials', 'pastq'].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2.5 text-[11px] mono-label font-semibold border transition-colors ${
                tab === t ? 'bg-gold text-navy border-gold' : 'border-line2 text-muted hover:border-gold'
              }`}
            >
              {t === 'materials' ? 'Learning Materials' : 'Past Questions'}
            </button>
          ))}
        </div>

        {data === null ? (
          <p className="text-dim text-sm">Loading…</p>
        ) : (
          <div className="space-y-14">
            {LEVELS.map(lvl => {
              const items = data.filter(d => String(d.level) === lvl)
              return (
                <div key={lvl}>
                  <div className="flex items-baseline gap-3 mb-5 border-b border-line pb-4">
                    <h2 className="font-head font-semibold text-lg text-ink">Level {lvl}</h2>
                    <span className="mono-label text-[10px] text-dim">{String(items.length).padStart(2, '0')} FILES</span>
                  </div>
                  {items.length === 0 ? (
                    <p className="text-dim text-sm">Nothing uploaded for this level yet</p>
                  ) : (
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-px bg-line">
                      {items.map(m => (
                        <a
                          key={m.id}
                          href={m.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-navy p-5 flex items-center justify-between hover:bg-panel transition-colors"
                        >
                          <div>
                            <p className="font-semibold text-sm text-goldLight">{m.courseCode}</p>
                            <p className="mono-label text-[10px] text-dim mt-1">
                              {m.courseName || m.fileName} · SEM {m.semester}{m.year ? ` · ${m.year}` : ''}
                            </p>
                          </div>
                          <span className="text-dim">↗</span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
      </section>
    </>
  )
}
