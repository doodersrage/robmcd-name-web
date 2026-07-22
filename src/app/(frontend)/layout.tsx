import React from 'react'
import Script from 'next/script'
import { Inter } from 'next/font/google'
import Footer from '@/app/components/ui/Footer'
import Header from '@/app/components/ui/Header'
import { ThemeScript } from '@/app/components/ui/ThemeToggle'
import './globals.scss'
import { Metadata } from 'next'
import {
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_OWNER,
  SITE_TAGLINE,
  SITE_URL,
} from '@/lib/site'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: `%s | ${SITE_OWNER}`,
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_OWNER, url: SITE_URL }],
  creator: SITE_OWNER,
  publisher: SITE_OWNER,
  keywords: SITE_KEYWORDS,
  referrer: 'origin-when-cross-origin',
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': `${SITE_URL}/feed.xml`,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/icon.svg', type: 'image/svg+xml' }],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      publisher: { '@id': `${SITE_URL}/#person` },
    },
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: SITE_OWNER,
      url: SITE_URL,
    },
  ],
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <ThemeScript />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-ETMLWXCT6M"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-ETMLWXCT6M');`}
        </Script>
      </head>
      <body>
        <a href="#content" className="skip-link">
          Skip to content
        </a>
        <div className="site-shell">
          <div aria-hidden="true" className="site-bg">
            <div className="site-bg__mesh" />
            <div className="site-bg__noise" />
            <div className="site-bg__vignette" />
          </div>

          <Header />
          <main id="content" className="site-main">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
