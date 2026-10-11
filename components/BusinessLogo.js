import Image from 'next/image'

/* Business logo on a square panel. With no logo, shows the business's first letter. */
export default function BusinessLogo({ business, className = '', sizes = '120px' }) {
  const letter = (business?.name || '?').trim().slice(0, 1).toUpperCase()
  return (
    <div className={`relative overflow-hidden bg-panel border border-line flex items-center justify-center ${className}`}>
      {business?.logoUrl ? (
        <Image src={business.logoUrl} alt={`${business.name} logo`} fill sizes={sizes} className="object-contain p-2" />
      ) : (
        <span className="text-gold font-head font-bold text-3xl">{letter}</span>
      )}
    </div>
  )
}
