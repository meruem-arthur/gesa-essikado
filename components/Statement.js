import { ContourField, CoordinateTag } from './Geo'

export default function Statement() {
  return (
    <section className="relative border-t border-line bg-navy overflow-hidden py-28 md:py-36">
      <ContourField className="absolute inset-0 w-full h-full text-purpleSoft opacity-70" />
      <div className="container-gesa relative">
        <div className="grid md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-9">
            <h2 className="font-head font-extrabold text-[clamp(1.7rem,4.4vw,3.2rem)] leading-[1.08] tracking-tight text-ink">
              WE DON&rsquo;T JUST MAP<br />
              THE WORLD. WE <span className="text-gold">UNDERSTAND</span> IT.
            </h2>
          </div>
          <div className="md:col-span-3 flex md:justify-end">
            <CoordinateTag className="block text-right leading-relaxed">
              GESA / 2026<br />UMaT · ESSIKADO<br />GEOMATIC ENGINEERING
            </CoordinateTag>
          </div>
        </div>
      </div>
    </section>
  )
}
