export default function ProgrammeSection() {
  return (
    <section className="section border-t border-border">
      <div className="container-gesa">
        <p className="text-xs uppercase tracking-wide text-dim mb-8">What We Study</p>
        <div className="card-gesa p-8 md:p-10">
          <p className="text-gold2 text-sm mb-2 font-body">BSc · GM</p>
          <h2 className="font-head font-bold text-2xl mb-4">Geomatic Engineering</h2>
          <p className="text-muted max-w-[62ch] mb-8">
            Surveying, GIS, remote sensing, cartography and drone mapping — the discipline of measuring,
            modelling and managing the earth&rsquo;s surface. It&rsquo;s the sole programme GESA
            represents at the Essikado campus.
          </p>
          <div className="grid grid-cols-3 gap-6 border-t border-border pt-6 text-sm">
            <div>
              <p className="text-dim text-xs mb-1">Campus</p>
              <p className="font-head font-semibold">Essikado</p>
            </div>
            <div>
              <p className="text-dim text-xs mb-1">Faculty</p>
              <p className="font-head font-semibold">Geosciences &amp; Env. Studies</p>
            </div>
            <div>
              <p className="text-dim text-xs mb-1">Institution</p>
              <p className="font-head font-semibold">UMaT</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
