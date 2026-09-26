export default function ContourLines({ className = '', tone = 'purple' }) {
  const stroke = tone === 'gold' ? '#cf9f3f' : '#6d4fd1'
  return (
    <svg
      className={`contour-field ${className}`}
      viewBox="0 0 1200 700"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {[0, 1, 2, 3, 4, 5].map(i => (
        <path
          key={i}
          d={`M -50 ${120 + i * 90} C 250 ${20 + i * 90}, 450 ${220 + i * 90}, 700 ${100 + i * 90} S 1150 ${40 + i * 90}, 1250 ${140 + i * 90}`}
          fill="none"
          stroke={stroke}
          strokeWidth="1"
          opacity={0.14 - i * 0.012}
        />
      ))}
    </svg>
  )
}
