import React from 'react'
import Script from 'next/script'
import { Inter } from 'next/font/google'
import Footer from '@/app/components/ui/Footer'
import Header from '@/app/components/ui/Header'
import { ThemeScript } from '@/app/components/ui/ThemeToggle'
import '../(frontend)/globals.scss'
import { SITE_OWNER, SITE_NAME, SITE_TAGLINE, SITE_URL, SITE_DESCRIPTION } from '@/lib/site'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export default function StaticLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <ThemeScript />
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
