import React from 'react'
import Script from 'next/script'
import { Inter } from 'next/font/google'
import Footer from '@/app/components/ui/Footer'
import Header from '@/app/components/ui/Header'
import './globals.scss'
import { Metadata } from 'next'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Robert McDowell',
    default: "Robert McDowell's Website",
  },
  description:
    "Hello, I'm Robert. I'm a software developer specializing in web development. I share my knowledge and experiences through this blog, covering topics like JavaScript, React, Node.js, and more. Join me on this journey of learning and growth in the world of coding.",
  applicationName: "Robert McDowell's Web Development Blog",
  authors: [{ name: 'Robert McDowell' }],
  generator: 'Next.js',
  keywords: [
    'robert mcdowell',
    'code',
    'web development',
    'php',
    'C#',
    'javascript',
    'react',
    'node.js',
    'next.js',
    'web dev',
    'html',
    'css',
    'python',
  ],
  referrer: 'origin-when-cross-origin',
  creator: 'Robert McDowell',
  publisher: 'Robert McDowell',
  metadataBase: new URL('https://robmcd.name/'),
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={inter.variable}>
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
        <div className="site-shell">
          <div aria-hidden="true" className="site-bg">
            <div className="site-bg__mesh" />
            <div className="site-bg__noise" />
            <div className="site-bg__pattern" />
            <div className="site-bg__grid" />
            <div className="site-bg__glow site-bg__glow--primary" />
            <div className="site-bg__glow site-bg__glow--secondary" />
            <div className="site-bg__glow site-bg__glow--tertiary" />
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
