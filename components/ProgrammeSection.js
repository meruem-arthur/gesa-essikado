'use client'
import { useState } from 'react'
import { SectionLabel, Reveal } from './Geo'

const DISCIPLINES = [
  { code: '01', name: 'Surveying', desc: 'Precision field measurement — total stations, levelling and control networks.' },
  { code: '02', name: 'GIS', desc: 'Geographic Information Systems — capturing, storing and analysing spatial data.' },
  { code: '03', name: 'Remote Sensing', desc: 'Reading the earth from satellites and aircraft to monitor change over time.' },
  { code: '04', name: 'Cartography', desc: 'The science and craft of representing spatial information as maps.' },
  { code: '05', name: 'Photogrammetry', desc: 'Extracting reliable measurements and 3D models from imagery.' },
  { code: '06', name: 'GNSS · Positioning', desc: 'Satellite-based positioning underpinning every modern survey.' },
  { code: '07', name: 'Land Administration', desc: 'Cadastral systems, land tenure, and property boundary management.' },
  { code: '08', name: 'Geospatial Data', desc: 'Managing and modelling the data that describes our physical world.' },
]

export default function ProgrammeSection() {
  const [active, setActive] = useState(0)

  return (
    <section className="section border-t border-line bg-navy">
      <div className="container-gesa">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <SectionLabel className="mb-4">What We Study</SectionLabel>
            <h2 className="font-head font-bold text-3xl md:text-4xl text-ink max-w-xl">
              One discipline. <span className="text-gold">Eight lenses</span> on the same world.
            </h2>
          </div>
          <div className="mono-label text-[11px] text-muted text-right">
            BSc · GEOMATIC ENGINEERING<br />FACULTY OF GEOSCIENCES &amp; ENV. STUDIES · UMaT
          </div>
        </div>

        {/* Mobile / tablet — always-visible 2-column grid, no hover required */}
        <div className="grid grid-cols-2 gap-px bg-line border border-line md:hidden">
          {DISCIPLINES.map(d => (
            <div key={d.code} className="bg-navy p-4">
              <span className="mono-label text-[10px] text-gold block mb-2">{d.code}</span>
              <p className="font-head font-semibold text-sm text-ink mb-1.5">{d.name}</p>
              <p className="text-[13px] text-muted leading-relaxed">{d.desc}</p>
            </div>
          ))}
        </div>

        {/* Desktop — interactive master/detail, hover reveals the corresponding panel */}
        <div className="hidden md:grid md:grid-cols-12 gap-0 border-t border-l border-line">
          <div className="md:col-span-5">
            {DISCIPLINES.map((d, idx) => (
              <button
                key={d.code}
                onMouseEnter={() => setActive(idx)}
                onFocus={() => setActive(idx)}
                onClick={() => setActive(idx)}
                className={`w-full text-left px-6 py-5 border-r border-b border-line flex items-center gap-5 transition-colors ${
                  active === idx ? 'bg-panel' : 'hover:bg-panel/50'
                }`}
              >
                <span className={`mono-label text-[11px] ${active === idx ? 'text-gold' : 'text-dim'}`}>{d.code}</span>
                <span className={`font-head font-semibold text-lg ${active === idx ? 'text-ink' : 'text-muted'}`}>
                  {d.name}
                </span>
              </button>
            ))}
          </div>

          <div className="md:col-span-7 border-r border-b border-line bg-panel relative overflow-hidden">
            <div className="absolute inset-0 bg-survey-grid-fine opacity-60" />
            <div className="relative p-8 md:p-12 h-full flex flex-col justify-between min-h-[280px]">
              <div>
                <p className="mono-label text-[11px] text-gold mb-4">{DISCIPLINES[active].code} / 08</p>
                <h3 className="font-head font-bold text-2xl md:text-3xl text-ink mb-4">{DISCIPLINES[active].name}</h3>
                <p className="text-muted max-w-[46ch] leading-relaxed">{DISCIPLINES[active].desc}</p>
              </div>
              <svg viewBox="0 0 300 100" className="w-full max-w-xs mt-8 text-purpleSoft/60" aria-hidden="true">
                <line x1="0" y1="50" x2="300" y2="50" stroke="currentColor" strokeWidth="1" strokeDasharray="2 6" />
                {[20, 100, 180, 260].map((x, k) => (
                  <circle key={x} cx={x} cy="50" r={k === active % 4 ? 5 : 3} fill={k === active % 4 ? '#c69a2e' : 'currentColor'} />
                ))}
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
