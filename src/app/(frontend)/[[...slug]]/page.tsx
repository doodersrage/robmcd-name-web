import { getPayload } from 'payload'
import React from 'react'
import configPromise from '@payload-config'
import type { Metadata } from 'next'
import { RichText as RichTextConverter } from '@payloadcms/richtext-lexical/react'

export type paramsType = Promise<{ slug: string[] }>

type Props = {
  params: paramsType
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const payload = await getPayload({ config: configPromise })

  const { slug } = await params
  const pathArray = slug || []

  // Fetch the page by slug
  const pages = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: pathArray.join('/') || 'home', // Fallback to home page
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
  const pathArray = slug || []

  // Fetch the page by slug
  const pages = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: pathArray.join('/') || 'home', // Fallback to home page
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
