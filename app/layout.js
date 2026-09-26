import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'

export const metadata = {
  title: 'GESA — Essikado Campus',
  description: "Geomatic Engineering Students' Association — UMaT Essikado Campus. The Eye of the Engineer.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
