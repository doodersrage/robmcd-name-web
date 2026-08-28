import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'

import { DocPageContent } from '@/app/components/comfyui-prompt-studio/DocPageContent'
import { DocPageNav } from '@/app/components/comfyui-prompt-studio/DocPageNav'
import { DocsBreadcrumbs } from '@/app/components/comfyui-prompt-studio/DocsBreadcrumbs'
import { LandingShell } from '@/app/components/pages/PageShell'
import { Hero } from '@/app/components/ui/Hero'
import { CPS_GITHUB, DOCS_BASE_PATH, getPageBySlug } from '@/content/comfyui-prompt-studio/helpers'
import type { DocPage } from '@/content/comfyui-prompt-studio/types'

export function buildDocMetadata(page: DocPage): Metadata {
  const isHub = page.slug.length === 0
  const title = isHub ? 'LLM Prompt Studio' : `${page.title} — LLM Prompt Studio`
  const path = isHub ? DOCS_BASE_PATH : `${DOCS_BASE_PATH}/${page.slug.join('/')}`

  return {
    title,
    description: page.description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description: page.description,
      url: path,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: page.description,
    },
  }
}

export function renderDocPage(page: DocPage) {
  const isHub = page.slug.length === 0
  const isMarketing = page.layout === 'marketing'

  if (isMarketing) {
    return (
      <LandingShell>
        <section className="space-y-4 border-l-2 border-[var(--ink)] pl-6">
          <p className="eyebrow">{page.section}</p>
          <h1 className="page-title">{page.title}</h1>
          <p className="max-w-2xl text-lg leading-relaxed text-[var(--muted)]">{page.description}</p>
        </section>
        <section className="space-y-8">
          <DocPageContent page={page} showLead={false} />
          <DocPageNav order={page.order} />
        </section>
      </LandingShell>
    )
  }

  if (isHub) {
    return (
      <LandingShell>
        <Hero
          title="LLM Prompt Studio"
          description={page.description}
          primaryCta={{ label: 'Why Prompt Studio?', href: `${DOCS_BASE_PATH}/stories/sales-pitch` }}
          secondaryCta={{ label: 'View on GitHub', href: CPS_GITHUB }}
        />
        <section className="space-y-8">
          <DocPageContent page={page} showLead={false} />
          <DocPageNav order={page.order} />
        </section>
      </LandingShell>
    )
  }

  return (
    <article className="space-y-8 pb-16 md:space-y-12">
      <DocsBreadcrumbs slug={page.slug} title={page.title} />
      <h1 className="page-title">{page.title}</h1>
      <DocPageContent page={page} />
      <DocPageNav order={page.order} />
    </article>
  )
}

export function requireDocPage(slug: string[] | undefined): DocPage {
  const page = getPageBySlug(slug)
  if (!page) notFound()
  return page
}
