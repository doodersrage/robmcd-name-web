import { getPayload } from 'payload'
import React from 'react'
import { Metadata } from 'next'
import configPromise from '@payload-config'
import { HybridPageRenderer, toHybridPageData } from '@delmaredigital/payload-puck/render'
import type { HybridPageDataInput } from '@delmaredigital/payload-puck/render'
import { baseConfig } from '@delmaredigital/payload-puck/config'
import type { Page } from '@/payload-types'
import { LegacyPageContent } from '@/app/components/pages/LegacyPageContent'
import { createPuckPageWrapper } from '@/app/components/pages/PageShell'

export type paramsType = Promise<{ slug: string[] }>

async function getPage(slug?: string[]): Promise<Page | null> {
  const payload = await getPayload({ config: configPromise })
  const slugPath = slug?.join('/') || 'home'

  const { docs } = await payload.find({
    collection: 'pages',
    where: {
      and: [
        { slug: { equals: slugPath } },
        {
          or: [{ _status: { equals: 'published' } }, { _status: { exists: false } }],
        },
      ],
    },
    limit: 1,
  })

  return docs[0] || null
}

export async function generateMetadata({
  params,
}: {
  params: Promise<paramsType>
}): Promise<Metadata> {
  const { slug } = await params
  const page = await getPage(slug)

  return {
    title: page?.pageMeta?.headerTitle || page?.title,
    description: page?.pageMeta?.metaDescription || '',
    keywords: page?.pageMeta?.metaKeywords ? [page.pageMeta.metaKeywords] : [],
    alternates: {
      canonical: page?.slug === 'home' ? '/' : `/${page?.slug}`,
    },
  }
}

export default async function Page({ params }: { params: Promise<paramsType> }) {
  const { slug } = await params
  const page = await getPage(slug)

  if (!page) return <div className="py-12 text-center text-foreground-muted">Page Not Found</div>

  return (
    <HybridPageRenderer
      page={toHybridPageData(page as unknown as HybridPageDataInput)}
      config={baseConfig}
      wrapper={createPuckPageWrapper(page.title)}
      legacyRenderer={() => <LegacyPageContent page={page} />}
      fallback={<LegacyPageContent page={page} />}
    />
  )
}
