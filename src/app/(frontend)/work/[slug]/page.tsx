import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

import { LandingShell } from '@/app/components/pages/PageShell'
import { getWorkBySlug } from '@/content/work/case-studies'
import { SITE_LINKS } from '@/lib/site'

export const dynamic = 'force-dynamic'

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const study = getWorkBySlug(slug)
  if (!study) return { title: 'Case study' }

  return {
    title: study.title,
    description: study.description,
    alternates: { canonical: `/work/${study.slug}` },
    openGraph: {
      title: `${study.title} — case study`,
      description: study.description,
    },
  }
}

export default async function WorkCaseStudyPage({ params }: PageProps) {
  const { slug } = await params
  const study = getWorkBySlug(slug)
  if (!study) notFound()

  const primaryHref = study.href ?? study.externalHref ?? SITE_LINKS.contact
  const primaryExternal = Boolean(study.externalHref && !study.href)

  return (
    <LandingShell>
      <section className="card">
        <div className="card-content space-y-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            <Link href="/work" className="hover:underline">
              Work
            </Link>{' '}
            / Case study
          </p>
          <h1 className="page-title">{study.title}</h1>
          <p className="text-lg font-medium text-indigo-600 dark:text-indigo-400">{study.tagline}</p>
          <p className="max-w-3xl text-base leading-relaxed text-slate-600 dark:text-zinc-400">
            {study.description}
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {study.stack.map((s) => (
              <span
                key={s}
                className="rounded-lg border border-slate-200/80 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700 dark:border-zinc-800/80 dark:bg-zinc-950 dark:text-zinc-300"
              >
                {s}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            {primaryExternal ? (
              <a href={primaryHref} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                {study.linkLabel}
              </a>
            ) : (
              <Link href={primaryHref} className="btn btn-primary">
                {study.linkLabel}
              </Link>
            )}
            {study.externalHref ? (
              <a href={study.externalHref} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
                {study.slug === 'llm-prompt-studio' ? 'View on GitHub' : 'Open live demo'}
              </a>
            ) : null}
            {study.slug === 'llm-prompt-studio' ? (
              <Link href={SITE_LINKS.promptStudio} className="btn btn-secondary">
                Docs on this site
              </Link>
            ) : null}
            {study.slug === 'thermaltrace' ? (
              <a
                href={SITE_LINKS.thermalTraceAbout}
                className="btn btn-secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Guides & About
              </a>
            ) : null}
            <Link href={SITE_LINKS.contact} className="btn btn-secondary">
              Start a conversation
            </Link>
          </div>
        </div>
      </section>

      {study.sections.map((section) => (
        <section key={section.heading} className="card">
          <div className="card-content space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">
              {section.heading}
            </h2>
            {section.body.map((p) => (
              <p key={p.slice(0, 48)} className="text-base leading-relaxed text-slate-600 dark:text-zinc-400">
                {p}
              </p>
            ))}
          </div>
        </section>
      ))}

      <section className="card">
        <div className="card-content flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-base text-slate-600 dark:text-zinc-400">
            Need similar work for your stack or IoT dashboard?
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href={SITE_LINKS.contact} className="btn btn-primary">
              Contact
            </Link>
            <Link href="/work" className="btn btn-secondary">
              All case studies
            </Link>
            <a href={SITE_LINKS.thermalTrace} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
              ThermalTrace live
            </a>
            <Link href={SITE_LINKS.promptStudio} className="btn btn-secondary">
              Prompt Studio docs
            </Link>
          </div>
        </div>
      </section>
    </LandingShell>
  )
}
