'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { getHOD, getExecutives } from '../lib/queries'

export default function WelcomeMessages() {
  const [hod, setHod] = useState(null)
  const [president, setPresident] = useState(null)

  useEffect(() => {
    getHOD().then(setHod).catch(() => setHod(null))
    getExecutives().then(list => setPresident(list.find(e => e.order === 1) || list[0] || null)).catch(() => setPresident(null))
  }, [])

  return (
    <section className="section border-t border-border">
      <div className="container-gesa">
        <p className="text-xs uppercase tracking-wide text-dim mb-8">From the Leadership</p>
        <div className="grid md:grid-cols-2 gap-10">
          <Person
            person={hod}
            fallbackRole="Head, Geomatic Engineering Department"
            message="hodMessage"
            placeholder="Welcome message from the Head of Department will appear here once added in the admin dashboard."
          />
          <Person
            person={president}
            fallbackRole="President, GESA — Essikado"
            message="bio"
            placeholder="Welcome message from the President will appear here once added in the admin dashboard."
          />
        </div>
      </div>
    </section>
  )
}

function Person({ person, fallbackRole, message, placeholder }) {
  return (
    <div className="card-gesa p-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 rounded-full overflow-hidden bg-card2 flex-none flex items-center justify-center">
          {person?.photoUrl ? (
            <Image src={person.photoUrl} alt={person.name} width={64} height={64} className="object-cover w-full h-full" />
          ) : (
            <span className="text-gold2 font-head font-bold">{(person?.name || 'GE').slice(0, 2).toUpperCase()}</span>
          )}
        </div>
        <div>
          <p className="font-head font-semibold">{person?.name || 'Name pending'}</p>
          <p className="text-gold2 text-xs">{person?.position || person?.title || fallbackRole}</p>
        </div>
      </div>
      <p className="text-sm text-muted leading-relaxed">
        {person?.[message] || placeholder}
      </p>
    </div>
  )
}
