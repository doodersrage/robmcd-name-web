import React from 'react'
import Footer from '@/app/components/ui/Footer'
import Header from '@/app/components/ui/Header'
import './globals.scss'
import { Metadata } from 'next'

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
    <html lang="en">
      <head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-ETMLWXCT6M"
          strategy="afterInteractive"
        />
        <script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-ETMLWXCT6M');`}
        </script>
      </head>
      <body>
        <Header />
        <main
          id="content"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 w-full flex-1"
        >
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
