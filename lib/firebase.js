import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Same Firebase project as the GESA mobile app and admin dashboard.
// This is a public web API key (safe to ship client-side) — access
// control lives in Firestore security rules, not this key.
const firebaseConfig = {
  apiKey: 'AIzaSyDwTbJQIzr5iA9Bz7AdFla-5cMP2Zt18ZA',
  authDomain: 'gesa-app-2026.firebaseapp.com',
  projectId: 'gesa-app-2026',
  storageBucket: 'gesa-app-2026.firebasestorage.app',
  messagingSenderId: '1053669315305',
  appId: '1:1053669315305:web:f75a8dc46583a15c429678',
}

const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
export const db = getFirestore(app)
