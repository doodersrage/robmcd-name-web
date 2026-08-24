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

  return {
    title: isHub ? 'LLM Prompt Studio' : `${page.title} — LLM Prompt Studio`,
    description: page.description,
    openGraph: {
      title: page.title,
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
        <section className="card overflow-hidden">
          <div className="card-content border-l-4 border-slate-800 pl-6 dark:border-zinc-300">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-500">
              {page.section}
            </p>
            <h1 className="page-title mt-2">{page.title}</h1>
            <p className="mt-3 text-lg leading-relaxed text-slate-600 dark:text-zinc-400">{page.description}</p>
          </div>
        </section>
        <section className="card">
          <div className="card-content">
            <DocPageContent page={page} showLead={false} />
            <DocPageNav order={page.order} />
          </div>
        </section>
      </LandingShell>
    )
  }

  if (isHub) {
    return (
      <LandingShell>
        <Hero
          showStatus
          statusLabel="Open source · ComfyUI + cloud"
          title="LLM Prompt Studio"
          description={page.description}
          skills={['Prompt generation', 'Cast & Roleplay', 'Cloud engines', 'Gallery review', 'Workflow takeover']}
          primaryCta={{ label: 'Why Prompt Studio?', href: `${DOCS_BASE_PATH}/stories/sales-pitch` }}
          secondaryCta={{ label: 'View on GitHub', href: CPS_GITHUB }}
        />
        <section className="card">
          <div className="card-content">
            <DocPageContent page={page} showLead={false} />
            <DocPageNav order={page.order} />
          </div>
        </section>
      </LandingShell>
    )
  }

  return (
    <article className="space-y-8 pb-16 md:space-y-12">
      <div className="card">
        <div className="card-content">
          <DocsBreadcrumbs slug={page.slug} title={page.title} />
          <h1 className="page-title">{page.title}</h1>
          <DocPageContent page={page} />
          <DocPageNav order={page.order} />
        </div>
      </div>
    </article>
  )
}

export function requireDocPage(slug: string[] | undefined): DocPage {
  const page = getPageBySlug(slug)
  if (!page) notFound()
  return page
}
