import ContourLines from './geo/ContourLines'
import Reveal from './Reveal'

export default function Statement() {
  return (
    <section className="relative section overflow-hidden border-t border-line">
      <ContourLines className="opacity-60" />
      <div className="relative container-gesa">
        <Reveal>
          <p className="benchmark mb-8">BM&#8288;-01 &middot; FIELD NOTE</p>
          <h2 className="font-display font-semibold text-clamp-statement leading-[1.02] tracking-tight text-ink max-w-4xl">
            We don&rsquo;t just map the world.
            <br />
            <span className="text-muted">We understand it.</span>
          </h2>
          <p className="mt-8 max-w-md text-muted leading-relaxed">
            Every survey point, every coordinate, every layer of data is a way of asking the
            same question &mdash; where are we, and what does it mean. That&rsquo;s the discipline
            GESA represents at Essikado.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
