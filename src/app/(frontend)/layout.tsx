import React from 'react'
import Script from 'next/script'
import Footer from '@/app/components/ui/footer'
import Header from '@/app/components/ui/header'
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
        <main id="content" className="">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
