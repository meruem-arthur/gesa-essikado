// Turns a phone number typed any way ("024 000 0001", "+233 24 000 0001",
// "0240000001") into the digits-only international form WhatsApp links need.
export function toWhatsAppNumber(raw) {
  let d = String(raw || '').replace(/\D/g, '')
  if (!d) return ''
  if (d.startsWith('00')) d = d.slice(2)
  if (d.startsWith('0')) d = '233' + d.slice(1) // local Ghana format
  return d
}

// tel: links want + and digits only.
export function toTelHref(raw) {
  const d = String(raw || '').replace(/[^\d+]/g, '')
  return d ? `tel:${d}` : ''
}
