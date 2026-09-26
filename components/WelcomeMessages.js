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
    <section className="section-tight border-t border-line">
      <div className="container-gesa">
        <p className="benchmark mb-10">BM&#8288;-03 &middot; LEADERSHIP</p>
        <div className="grid md:grid-cols-2 gap-px bg-line">
          <Person
            person={hod}
            tag="HOD &middot; GEOMATIC ENGINEERING DEPT."
            message="hodMessage"
            placeholder="Welcome message from the Head of Department will appear here once added in the admin dashboard."
          />
          <Person
            person={president}
            tag="PRESIDENT &middot; GESA ESSIKADO"
            message="bio"
            placeholder="Welcome message from the President will appear here once added in the admin dashboard."
          />
        </div>
      </div>
    </section>
  )
}

function Person({ person, tag, message, placeholder }) {
  return (
    <div className="bg-bg p-8 md:p-10">
      <div className="w-16 h-16 rounded-full overflow-hidden bg-surface2 mb-6 flex items-center justify-center flex-none">
        {person?.photoUrl ? (
          <Image src={person.photoUrl} alt={person.name} width={64} height={64} className="object-cover w-full h-full" />
        ) : (
          <span className="text-gold2 font-display font-semibold">{(person?.name || 'GE').slice(0, 2).toUpperCase()}</span>
        )}
      </div>
      <p className="font-display text-xl text-ink mb-1">{person?.name || 'Name pending'}</p>
      <p className="coord mb-6">{person?.position || person?.title || tag}</p>
      <p className="text-sm text-muted leading-relaxed max-w-[52ch]">
        {person?.[message] || placeholder}
      </p>
    </div>
  )
}
