import { collection, getDocs, getDoc, doc, query, orderBy, limit as fbLimit } from 'firebase/firestore'
import { db } from './firebase'

async function fetchCollection(col, ...constraints) {
  const q = constraints.length ? query(collection(db, col), ...constraints) : collection(db, col)
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

async function fetchDoc(path) {
  const snap = await getDoc(doc(db, path))
  return snap.exists() ? snap.data() : null
}

// ── Existing app/admin collections (read-only here) ──────────────────────
export const getExecutives   = () => fetchCollection('executives', orderBy('order', 'asc'))
export const getLecturers    = () => fetchCollection('lecturers')
export const getHOD          = async () => (await getLecturers()).find(l => l.pinnedRole === 'HOD') || null
export const getEvents       = (max = 6) => fetchCollection('events', orderBy('date', 'asc'), fbLimit(max))
export const getAllEvents    = () => fetchCollection('events', orderBy('date', 'asc'))
export const getAnnouncements = (max = 12) => fetchCollection('announcements', orderBy('createdAt', 'desc'), fbLimit(max))
export const getMaterials    = () => fetchCollection('learningMaterials', orderBy('level', 'asc'))
export const getPastQuestions = () => fetchCollection('pastQuestions', orderBy('level', 'asc'))

// ── New collections this site introduces ──────────────────────────────────
// heroSlides: { imageUrl, caption, order }
export const getHeroSlides = () => fetchCollection('heroSlides', orderBy('order', 'asc'))

// galleryPhotos: { imageUrl, caption, createdAt }
export const getGalleryPhotos = () => fetchCollection('galleryPhotos', orderBy('createdAt', 'desc'))

// siteContent/home: { hodMessage, presidentMessage, aboutText, tagline, campus }
export const getSiteContent = () => fetchDoc('siteContent/home')

// siteLinks: collection of { label, url, order } — open-ended, managed in admin
export const getSiteLinks = () => fetchCollection('siteLinks', orderBy('order', 'asc'))
