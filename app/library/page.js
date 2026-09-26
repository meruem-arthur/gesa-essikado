'use client'
import { useEffect, useState } from 'react'
import { getMaterials, getPastQuestions } from '../../lib/queries'

const LEVELS = ['100', '200', '300', '400']

export default function LibraryPage() {
  const [materials, setMaterials] = useState(null)
  const [pastQ, setPastQ] = useState(null)
  const [tab, setTab] = useState('materials')

  useEffect(() => {
    getMaterials().then(setMaterials).catch(() => setMaterials([]))
    getPastQuestions().then(setPastQ).catch(() => setPastQ([]))
  }, [])

  const data = tab === 'materials' ? materials : pastQ

  return (
    <section className="section">
      <div className="container-gesa">
        <p className="text-xs uppercase tracking-wide text-dim mb-2">Resources</p>
        <h1 className="font-head font-bold text-3xl mb-6">GESA Library</h1>
        <p className="text-muted max-w-[60ch] mb-8">
          Lecture notes and past questions for Geomatic Engineering, organised by level.
        </p>

        <div className="flex gap-3 mb-10">
          {['materials', 'pastq'].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border ${
                tab === t ? 'bg-gold2 text-bg border-gold2' : 'border-border text-muted'
              }`}
            >
              {t === 'materials' ? 'Learning Materials' : 'Past Questions'}
            </button>
          ))}
        </div>

        {data === null ? (
          <p className="text-dim text-sm">Loading…</p>
        ) : (
          <div className="space-y-10">
            {LEVELS.map(lvl => {
              const items = data.filter(d => String(d.level) === lvl)
              return (
                <div key={lvl}>
                  <h2 className="font-head font-semibold text-lg mb-4">Level {lvl}</h2>
                  {items.length === 0 ? (
                    <p className="text-dim text-sm">Nothing uploaded for this level yet</p>
                  ) : (
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {items.map(m => (
                        <a
                          key={m.id}
                          href={m.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="card-gesa p-4 flex items-center justify-between hover:border-gold2 transition-colors"
                        >
                          <div>
                            <p className="font-semibold text-sm text-gold3">{m.courseCode}</p>
                            <p className="text-xs text-dim">
                              {m.courseName || m.fileName} · Sem {m.semester}{m.year ? ` · ${m.year}` : ''}
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
  )
}
