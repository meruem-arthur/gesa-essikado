'use client'
import { useEffect, useMemo, useState } from 'react'
import { getMaterials, getPastQuestions } from '../../lib/queries'

const LEVELS = ['100', '200', '300', '400']

export default function LibraryPage() {
  const [materials, setMaterials] = useState(null)
  const [pastQ, setPastQ] = useState(null)
  const [tab, setTab] = useState('materials')
  const [query, setQuery] = useState('')

  useEffect(() => {
    getMaterials().then(setMaterials).catch(() => setMaterials([]))
    getPastQuestions().then(setPastQ).catch(() => setPastQ([]))
  }, [])

  const data = tab === 'materials' ? materials : pastQ

  const filtered = useMemo(() => {
    if (!data) return null
    const q = query.trim().toLowerCase()
    if (!q) return data
    return data.filter(d =>
      `${d.courseCode || ''} ${d.courseName || ''} ${d.fileName || ''}`.toLowerCase().includes(q)
    )
  }, [data, query])

  return (
    <section className="section pt-28">
      <div className="container-gesa">
        <p className="benchmark mb-6">BM&#8288;-09 &middot; ARCHIVE</p>
        <h1 className="font-display font-semibold text-4xl md:text-5xl text-ink mb-4">Library</h1>
        <p className="text-muted max-w-[56ch] mb-10">
          Lecture notes and past questions for Geomatic Engineering, indexed by level and semester.
        </p>

        <div className="flex flex-wrap items-center gap-8 mb-4 border-b border-line pb-0">
          {['materials', 'pastq'].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`pb-4 -mb-px font-mono-label text-[13px] tracking-wide border-b-2 transition-colors ${
                tab === t ? 'text-gold2 border-gold2' : 'text-muted border-transparent hover:text-ink'
              }`}
            >
              {t === 'materials' ? 'LEARNING MATERIALS' : 'PAST QUESTIONS'}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 py-6 border-b border-line mb-10">
          <span className="coord">SEARCH</span>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Course code or name&hellip;"
            className="bg-transparent border-b border-line focus:border-gold2 outline-none py-1 text-sm text-ink flex-1 max-w-xs placeholder:text-dim"
          />
        </div>

        {filtered === null ? (
          <p className="coord">LOADING&hellip;</p>
        ) : (
          <div className="space-y-12">
            {LEVELS.map(lvl => {
              const items = filtered.filter(d => String(d.level) === lvl)
              if (items.length === 0 && query) return null
              return (
                <div key={lvl}>
                  <p className="coord mb-4">LEVEL {lvl}</p>
                  {items.length === 0 ? (
                    <p className="text-dim text-sm">Nothing uploaded for this level yet</p>
                  ) : (
                    <div className="border-t border-line">
                      {items.map(m => (
                        <a
                          key={m.id}
                          href={m.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between gap-4 py-4 border-b border-line hover:bg-surface/40 transition-colors px-2 -mx-2"
                        >
                          <div className="min-w-0">
                            <p className="font-mono-label text-sm text-gold2">{m.courseCode}</p>
                            <p className="text-sm text-muted truncate">
                              {m.courseName || m.fileName} &middot; SEM {m.semester}{m.year ? ` \u00b7 ${m.year}` : ''}
                            </p>
                          </div>
                          <span className="text-dim flex-none">&nearr;</span>
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
