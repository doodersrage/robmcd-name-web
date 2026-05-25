import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'
import configPromise from '@payload-config'
import type { Metadata } from 'next'
import { RichText as RichTextConverter } from '@payloadcms/richtext-lexical/react'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import config from '@/payload.config'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const payload = await getPayload({ config: configPromise })

  const { slug } = await params

  // Fetch the page by slug
  const pages = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: slug || 'home', // Fallback to home page
      },
    },
  })

  const page = pages.docs[0]

  if (!page) {
    return {
      title: 'Page Not Found',
      description: 'The requested page was not found.',
    }
  }

  return {
    title: page.title,
    description: page.pageMeta?.metaDescription,
    keywords: page.pageMeta?.metaKeywords,
  }
}

export default async function Page({ params }: Props): Promise<React.ReactNode> {
  const payload = await getPayload({ config: configPromise })

  const { slug } = await params

  // Fetch the page by slug
  const pages = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: slug || 'home', // Fallback to home page
      },
    },
  })

  const page = pages.docs[0]

  if (!page) return <div>Page Not Found</div>

  return (
    <main>
      <h1>{page.title}</h1>
      <RichTextConverter data={page.content} />
    </main>
  )
}
