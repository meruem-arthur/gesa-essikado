'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { getHOD, getExecutives } from '../lib/queries'
import { SectionLabel, CoordinateTag } from './Geo'

export default function WelcomeMessages() {
  const [hod, setHod] = useState(null)
  const [president, setPresident] = useState(null)

  useEffect(() => {
    getHOD().then(setHod).catch(() => setHod(null))
    getExecutives().then(list => setPresident(list.find(e => e.order === 1) || list[0] || null)).catch(() => setPresident(null))
  }, [])

  return (
    <section className="section border-t border-line bg-navy2">
      <div className="container-gesa">
        <SectionLabel className="mb-10">From the Leadership</SectionLabel>
        <div className="grid md:grid-cols-2 gap-px bg-line">
          <Person
            person={hod}
            fallbackRole="Head, Geomatic Engineering Department"
            message="hodMessage"
            tag="HOD / 01"
            placeholder="Welcome message from the Head of Department will appear here once added in the admin dashboard."
          />
          <Person
            person={president}
            fallbackRole="President, GESA — Essikado"
            message="bio"
            tag="PRESIDENT / 02"
            placeholder="Welcome message from the President will appear here once added in the admin dashboard."
          />
        </div>
      </div>
    </section>
  )
}

function Person({ person, fallbackRole, message, placeholder, tag }) {
  return (
    <div className="bg-navy2 p-8 md:p-10">
      <div className="flex items-start justify-between mb-8">
        <div className="w-20 h-20 rounded-full overflow-hidden bg-panel flex-none flex items-center justify-center border border-line">
          {person?.photoUrl ? (
            <Image src={person.photoUrl} alt={person.name} width={80} height={80} className="object-cover w-full h-full" />
          ) : (
            <span className="text-gold font-head font-bold">{(person?.name || 'GE').slice(0, 2).toUpperCase()}</span>
          )}
        </div>
        <CoordinateTag>{tag}</CoordinateTag>
      </div>
      <p className="font-head font-bold text-xl text-ink">{person?.name || 'Name pending'}</p>
      <p className="text-gold text-xs mono-label mt-1 mb-5">{person?.position || person?.title || fallbackRole}</p>
      <p className="text-sm text-muted leading-relaxed max-w-[52ch]">
        {person?.[message] || placeholder}
      </p>
    </div>
  )
}
