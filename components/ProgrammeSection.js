const FOCUS_AREAS = [
  { code: 'GM-01', title: 'Surveying', desc: 'Land, engineering and cadastral surveys — the foundation of every geospatial dataset.' },
  { code: 'GM-02', title: 'Geographic Information Systems', desc: 'Capturing, storing and analysing spatial data to model the real world digitally.' },
  { code: 'GM-03', title: 'Remote Sensing', desc: 'Reading the earth from satellites and sensors — land use, change detection, environment.' },
  { code: 'GM-04', title: 'Cartography', desc: 'Turning raw coordinates into maps people can actually read and act on.' },
  { code: 'GM-05', title: 'Photogrammetry', desc: 'Measuring the world from photographs and drone imagery — precision without contact.' },
  { code: 'GM-06', title: 'GNSS & Positioning', desc: 'Satellite-based positioning — the backbone of every modern survey.' },
  { code: 'GM-07', title: 'Land Administration', desc: 'Boundaries, titles and tenure — where engineering meets law and policy.' },
  { code: 'GM-08', title: 'Geospatial Data', desc: 'Databases, pipelines and analysis behind every spatial decision made today.' },
]

export default function ProgrammeSection() {
  return (
    <section className="section-tight border-t border-line">
      <div className="container-gesa">
        <div className="flex items-end justify-between mb-10 gap-6 flex-wrap">
          <div>
            <p className="benchmark mb-3">BM&#8288;-02 &middot; ACADEMICS</p>
            <h2 className="font-display font-semibold text-3xl md:text-4xl text-ink">What we study</h2>
          </div>
          <p className="coord max-w-[32ch]">
            BSc GEOMATIC ENGINEERING &middot; ESSIKADO CAMPUS &middot; UMaT
          </p>
        </div>

        <div className="border-t border-line">
          {FOCUS_AREAS.map(a => (
            <details key={a.code} className="group border-b border-line">
              <summary className="flex items-center gap-6 py-5 cursor-pointer list-none">
                <span className="coord w-14 flex-none">{a.code}</span>
                <span className="font-display text-lg md:text-xl text-ink group-open:text-gold2 transition-colors flex-1">
                  {a.title}
                </span>
                <span className="coord transition-transform group-open:rotate-45 text-lg leading-none">+</span>
              </summary>
              <p className="pl-[80px] pb-6 -mt-1 text-muted max-w-[62ch] text-sm leading-relaxed">
                {a.desc}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
