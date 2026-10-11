'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { getBusiness } from '../../../lib/queries'
import { toWhatsAppNumber, toTelHref, toMailHref, toWebHref } from '../../../lib/contact'
import BusinessLogo from '../../../components/BusinessLogo'

export default function BusinessPage() {
  const { id } = useParams()
  const [business, setBusiness] = useState(undefined) // undefined = loading, null = not found
  const [shared, setShared] = useState(false)

  useEffect(() => {
    if (!id) return
    getBusiness(id).then(setBusiness).catch(() => setBusiness(null))
  }, [id])

  useEffect(() => {
    if (business?.name) document.title = `${business.name} · GESA Business Hub`
  }, [business])

  async function handleShare() {
    const url = window.location.href
    try {
      if (navigator.share) {
        await navigator.share({ title: business.name, text: business.shortDescription || business.name, url })
      } else {
        await navigator.clipboard.writeText(url)
        setShared(true)
        setTimeout(() => setShared(false), 2000)
      }
    } catch { /* share cancelled */ }
  }

  const back = (
    <Link href="/business-hub" className="link-underline text-gold text-sm mono-label inline-block mb-10">
      ← All businesses
    </Link>
  )

  if (business === undefined) {
    return (
      <section className="section pt-40 md:pt-48">
        <div className="container-gesa"><p className="text-dim text-sm">Loading…</p></div>
      </section>
    )
  }

  if (business === null) {
    return (
      <section className="section pt-40 md:pt-48">
        <div className="container-gesa">
          {back}
          <div className="border border-dashed border-line p-14 text-center text-dim text-sm">
            This business isn&rsquo;t available.
          </div>
        </div>
      </section>
    )
  }

  const callNumber = business.phone
  const waNumber = toWhatsAppNumber(business.whatsapp || business.phone)
  const mailHref = toMailHref(business.email)
  const webHref = toWebHref(business.website)

  return (
    <section className="section pt-40 md:pt-48 relative overflow-hidden">
      {/* Soft glow: the business's own logo, enlarged and blurred, fading into the page. */}
      {business.logoUrl && (
        <div aria-hidden className="absolute inset-x-0 top-0 h-[36rem] overflow-hidden pointer-events-none">
          <Image
            src={business.logoUrl}
            alt=""
            fill
            sizes="320px"
            className="object-cover scale-150 blur-[2px] opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/50 via-navy/75 to-navy" />
        </div>
      )}
      <div className="container-gesa relative">
        {back}

        <div className="flex items-center gap-6 mb-12">
          <BusinessLogo business={business} className="w-24 h-24 md:w-32 md:h-32 flex-none" sizes="128px" />
          <div className="min-w-0">
            <p className="mono-label text-[10px] text-dim mb-2">STUDENT BUSINESS</p>
            <h1 className="font-head font-extrabold text-[clamp(1.8rem,4.4vw,3rem)] tracking-tight text-ink leading-tight">
              {business.name}
            </h1>
            {business.shortDescription && (
              <p className="text-muted mt-2 max-w-[56ch]">{business.shortDescription}</p>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-7">
            {business.description && (
              <>
                <p className="mono-label text-[10px] text-dim mb-4">ABOUT THE BUSINESS</p>
                <p className="text-muted leading-relaxed max-w-[60ch] whitespace-pre-line">{business.description}</p>
              </>
            )}
          </div>

          <div className="md:col-span-5 flex flex-col gap-5">
            <div className="card-gesa p-6 md:p-7">
              <p className="mono-label text-[10px] text-dim mb-4">GET IN TOUCH</p>
              <div className="space-y-1 text-sm text-muted break-all mb-6">
                {callNumber && <p>{callNumber}</p>}
                {business.email && <p>{business.email}</p>}
                {webHref && <p>{business.website}</p>}
              </div>
              <div className="flex flex-wrap gap-3">
                {callNumber && <a href={toTelHref(callNumber)} className="btn-gold">Call</a>}
                {waNumber && (
                  <a href={`https://wa.me/${waNumber}`} target="_blank" rel="noopener noreferrer" className="btn-outline">WhatsApp</a>
                )}
                {mailHref && <a href={mailHref} className="btn-outline">Email</a>}
                {webHref && (
                  <a href={webHref} target="_blank" rel="noopener noreferrer" className="btn-outline">Visit website</a>
                )}
              </div>
            </div>

            {business.ownerPhotoUrl && (
              <div className="card-gesa p-6 md:p-7">
                <p className="mono-label text-[10px] text-dim mb-4">THE OWNER</p>
                <div className="relative w-full aspect-[4/5] overflow-hidden bg-panel border border-line mb-4">
                  <Image
                    src={business.ownerPhotoUrl}
                    alt={business.ownerName || `Owner of ${business.name}`}
                    fill
                    sizes="(min-width: 768px) 40vw, 100vw"
                    className="object-cover object-portrait"
                  />
                </div>
                {business.ownerName && <p className="font-head font-bold text-ink">{business.ownerName}</p>}
              </div>
            )}
            {!business.ownerPhotoUrl && business.ownerName && (
              <p className="text-sm text-muted">Owner: <span className="text-ink font-semibold">{business.ownerName}</span></p>
            )}

            <button type="button" onClick={handleShare} className="btn-outline self-start">
              {shared ? 'Link copied ✓' : 'Share this business'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
