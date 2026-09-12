import type { Metadata } from 'next'
import { Inter, Manrope } from 'next/font/google'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { site } from '@/lib/site'
import './globals.css'

// Self-hosted via next/font — removes the two render-blocking requests to
// fonts.googleapis.com the old site made, and lets the CSP stay at font-src 'self'.
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  weight: ['600', '700', '800'],
  variable: '--font-manrope',
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Ozatech Services | Professional IT & Renewable Solutions',
    template: '%s | Ozatech Services',
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    siteName: site.name,
    type: 'website',
    locale: 'en_GB',
  },
  twitter: { card: 'summary_large_image' },
}

export const viewport = {
  themeColor: '#12254F',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const organizationLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    url: site.url,
    foundingDate: site.foundedYear,
    description: site.description,
  }

  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body className="flex min-h-screen flex-col">
        <a className="oz-skip" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
      </body>
    </html>
  )
}
