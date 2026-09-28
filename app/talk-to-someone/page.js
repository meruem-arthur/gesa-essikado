'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getExecutives, getSiteContent } from '../../lib/queries'
import { toWhatsAppNumber, toTelHref } from '../../lib/contact'
import PageHero from '../../components/PageHero'

function ContactCard({ person }) {
  const callNumber = person.phone
  const waNumber = toWhatsAppNumber(person.whatsapp || person.phone)
  return (
    <div className="card-gesa p-6 md:p-7">
      <div className="flex gap-5">
        <div className="relative w-28 h-36 flex-none overflow-hidden bg-panel border border-line flex items-center justify-center">
          {person.photoUrl ? (
            <Image src={person.photoUrl} alt={person.name} fill className="object-cover object-portrait" />
          ) : (
            <span className="text-gold font-head font-bold text-2xl">{(person.name || 'GE').slice(0, 2).toUpperCase()}</span>
          )}
        </div>
        <div className="min-w-0">
          <p className="font-head font-bold text-xl text-ink leading-snug">{person.name}</p>
          <p className="text-gold text-xs mono-label mt-1">{person.position || 'Welfare Chairman'}</p>
          {callNumber && <p className="text-muted text-sm mt-3 break-all">{callNumber}</p>}
        </div>
      </div>
      <div className="flex flex-wrap gap-3 mt-6">
        {callNumber && (
          <a href={toTelHref(callNumber)} className="btn-gold">Call</a>
        )}
        {waNumber && (
          <a href={`https://wa.me/${waNumber}`} target="_blank" rel="noopener noreferrer" className="btn-outline">WhatsApp</a>
        )}
      </div>
    </div>
  )
}

export default function TalkToSomeonePage() {
  const [execs, setExecs] = useState(null)
  const [content, setContent] = useState(null)

  useEffect(() => {
    getExecutives().then(setExecs).catch(() => setExecs([]))
    getSiteContent().then(setContent).catch(() => setContent(null))
  }, [])

  const contacts = (execs || []).filter(e => e.isWelfareChair)

  return (
    <>
      <PageHero
        imageUrl={content?.welfareHeroImageUrl}
        eyebrow="Student Welfare"
        title="Talk to Someone"
        subtitle="Behind on fees? Fell ill in the middle of exams? Carrying something heavy you haven't told anyone? You don't have to sort it out by yourself."
      />

      <section className="section pt-16">
        <div className="container-gesa grid md:grid-cols-12 gap-12">
          {/* Contact — first on small screens so it is one scroll away */}
          <div className="md:col-span-5 md:order-2 order-first">
            <p className="mono-label text-[10px] text-dim mb-4">REACH OUT DIRECTLY</p>
            {execs === null ? (
              <p className="text-dim text-sm">Loading…</p>
            ) : contacts.length === 0 ? (
              <div className="border border-dashed border-line p-8 text-sm text-muted leading-relaxed">
                The welfare contact will be listed here shortly. Until then, you can reach the
                executive team through the <Link href="/contact" className="text-gold link-underline">Contact page</Link>.
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                {contacts.map(p => <ContactCard key={p.id} person={p} />)}
              </div>
            )}

            {content?.clinicPhone && (
              <div className="border border-line p-6 mt-5">
                <p className="mono-label text-[10px] text-dim mb-3">IF IT&rsquo;S A MEDICAL EMERGENCY</p>
                <p className="text-muted text-sm leading-relaxed mb-4">
                  Don&rsquo;t wait to reach the welfare team. Call the school clinic straight away.
                  {content.clinicNote ? ` ${content.clinicNote}` : ''}
                </p>
                <a href={toTelHref(content.clinicPhone)} className="btn-outline">Call the clinic · {content.clinicPhone}</a>
              </div>
            )}
          </div>

          <div className="md:col-span-7 md:order-1">
            <h2 className="font-head font-extrabold text-2xl md:text-3xl text-ink tracking-tight mb-6">
              Someone in this department is quietly struggling right now.
            </h2>
            <div className="space-y-5 text-muted leading-relaxed max-w-[60ch]">
              <p>
                Fees you can&rsquo;t cover this semester. An illness that hit during exams. A situation at home
                that has taken over everything else. Most students in that position say nothing, because it
                feels like something to handle alone.
              </p>
              <p>
                You don&rsquo;t have to. GESA has a Welfare Committee, and its chairman is a fellow student who
                will listen, take you seriously, and help work out what support is possible, including
                help with dues.
              </p>
              <p>
                Call or send a WhatsApp message, whichever feels easier. This page only gives you their number:
                nothing you say is sent through this website or stored here. It&rsquo;s a conversation between you
                and them.
              </p>
            </div>

            <div className="border-l border-gold/60 pl-6 mt-10 max-w-[58ch]">
              <p className="font-head font-bold text-ink mb-2">Know someone who is struggling?</p>
              <p className="text-muted leading-relaxed">
                The person who most needs help is often the last to ask. If a coursemate has gone quiet or
                mentioned money or health trouble, share this page with them, or reach out to the
                welfare team on their behalf.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
