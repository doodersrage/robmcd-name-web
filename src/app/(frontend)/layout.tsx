import React from 'react'
import Script from 'next/script'
import Footer from '../components/ui/footer'
import Header from '../components/ui/header'
import './globals.scss'

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <head>
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
        <Header />
        <main id="content" className="shrink-0">
          <div className="max-w-340 min-h-160 mx-auto py-10 px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
        <Footer />
      </body>
    </html>
  )
}
