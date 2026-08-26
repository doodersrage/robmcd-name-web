import { getPayload } from 'payload'
import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import configPromise from '@payload-config'
import { HybridPageRenderer, toHybridPageData } from '@delmaredigital/payload-puck/render'
import type { HybridPageDataInput } from '@delmaredigital/payload-puck/render'
import { siteConfig } from '@/puck/config'
import type { Page } from '@/payload-types'
import { DefaultHomePage } from '@/app/components/pages/DefaultHomePage'
import { LegacyPageContent } from '@/app/components/pages/LegacyPageContent'
import { PuckPageWrapper } from '@/app/components/pages/PuckPageWrapper'

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

function isCodedHomePage(page: Page) {
  return page.slug === 'home'
}

export async function generateMetadata({
  params,
}: {
  params: Promise<paramsType>
}): Promise<Metadata> {
  const { slug } = await params
  const page = await getPage(slug)

  if (page?.slug === 'home') {
    return {
      title: 'Robert McDowell — Cross-Platform Engineering & Legacy Modernization',
      description:
        'Resilient infrastructure and modern codebases. Prompt Studio, Garage Temp, legacy stack rescue, and 20 years of Linux & Windows engineering.',
      alternates: { canonical: '/' },
      openGraph: {
        title: 'Robert McDowell — Cross-Platform Engineering',
        description:
          'Consulting, Prompt Studio docs, and Garage Temperature Monitor — built and shipped by Robert McDowell.',
      },
    }
  }

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

  if (!page) notFound()

  if (isCodedHomePage(page)) {
    return <DefaultHomePage />
  }

  const PuckWrapper = ({ children }: { children: React.ReactNode }) => (
    <PuckPageWrapper title={page.title} pageLayout={page.pageLayout ?? 'default'}>
      {children}
    </PuckPageWrapper>
  )

  return (
    <HybridPageRenderer
      page={toHybridPageData(page as unknown as HybridPageDataInput)}
      config={siteConfig}
      wrapper={PuckWrapper}
      legacyRenderer={() => <LegacyPageContent page={page} />}
      fallback={<LegacyPageContent page={page} />}
    />
  )
}
