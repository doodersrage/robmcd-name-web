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
      <section className="space-y-4">
        <p className="eyebrow">
          <Link href="/work" className="hover:underline">
            Work
          </Link>
          <span className="mx-2 text-[var(--muted)]">/</span>
          Case study
        </p>
        <h1 className="page-title">{study.title}</h1>
        <p className="font-mono text-sm text-[var(--muted)] md:text-base">{study.tagline}</p>
        <p className="max-w-3xl text-base leading-relaxed text-[var(--muted)]">{study.description}</p>
        <p className="font-mono text-xs text-[var(--muted)]">{study.stack.join(' · ')}</p>
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
          {study.href && study.externalHref ? (
            <a
              href={study.externalHref}
              className="btn btn-secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
            </a>
          ) : null}
          {study.slug === 'thermaltrace' ? (
            <>
              <a
                href={SITE_LINKS.thermalTraceAbout}
                className="btn btn-secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Guides & About
              </a>
              <a
                href={SITE_LINKS.thermalTraceGithub}
                className="btn btn-secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </a>
            </>
          ) : null}
          <Link href={SITE_LINKS.contact} className="btn btn-secondary">
            Start a conversation
          </Link>
        </div>
      </section>

      {study.sections.map((section) => (
        <section key={section.heading} className="space-y-4 border-t border-[var(--line)] pt-10">
          <h2 className="text-2xl font-semibold tracking-tight">{section.heading}</h2>
          {section.body.map((p) => (
            <p key={p.slice(0, 48)} className="max-w-3xl text-base leading-relaxed text-[var(--muted)]">
              {p}
            </p>
          ))}
        </section>
      ))}

      <section className="flex flex-col gap-4 border-t border-[var(--line)] pt-10 sm:flex-row sm:items-end sm:justify-between">
        <p className="text-base text-[var(--muted)]">Need similar work for your stack or IoT dashboard?</p>
        <div className="flex flex-wrap gap-3">
          <Link href={SITE_LINKS.contact} className="btn btn-primary">
            Contact
          </Link>
          <Link href="/work" className="btn btn-secondary">
            All case studies
          </Link>
        </div>
      </section>
    </LandingShell>
  )
}
