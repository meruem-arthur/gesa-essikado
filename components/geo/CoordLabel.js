export default function CoordLabel({ children, align = 'left' }) {
  return (
    <p className={`coord ${align === 'right' ? 'text-right' : ''}`}>
      {children}
    </p>
  )
}
