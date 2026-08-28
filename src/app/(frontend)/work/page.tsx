import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

import { LandingShell } from '@/app/components/pages/PageShell'
import { WORK_CASE_STUDIES } from '@/content/work/case-studies'
import { SITE_LINKS } from '@/lib/site'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Work & case studies',
  description:
    'Selected work by Robert McDowell — LLM Prompt Studio, ThermalTrace temperature monitoring, and legacy modernization patterns.',
  alternates: { canonical: '/work' },
  openGraph: {
    title: 'Work & case studies — Robert McDowell',
    description:
      'Open-source tools and consulting patterns: LLM Prompt Studio, ThermalTrace, and legacy stack rescue.',
  },
}

export default function WorkIndexPage() {
  return (
    <LandingShell>
      <section className="space-y-4">
        <p className="eyebrow">Portfolio</p>
        <h1 className="page-title">Work & case studies</h1>
        <p className="max-w-2xl text-base leading-relaxed text-[var(--muted)]">
          Open-source products you can open today — LLM Prompt Studio and ThermalTrace — plus the consulting
          pattern behind legacy rescues. For live CMS project pages, see{' '}
          <Link href={SITE_LINKS.projects} className="text-link underline">
            Projects
          </Link>
          .
        </p>
      </section>

      <ul className="divide-y divide-[var(--line)]">
        {WORK_CASE_STUDIES.map((study) => (
          <li key={study.slug} className="py-10 first:pt-0">
            <h2 className="text-xl font-semibold">{study.title}</h2>
            <p className="mt-1 font-mono text-sm text-[var(--muted)]">{study.tagline}</p>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-[var(--muted)]">{study.description}</p>
            <p className="mt-4 font-mono text-xs text-[var(--muted)]">{study.stack.slice(0, 4).join(' · ')}</p>
            <Link href={`/work/${study.slug}`} className="mt-5 inline-flex text-sm font-medium text-link">
              Read case study
            </Link>
          </li>
        ))}
      </ul>

      <section className="flex flex-col gap-4 border-t border-[var(--line)] pt-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold">Live demos</h2>
          <p className="mt-1 max-w-md text-sm text-[var(--muted)]">
            ThermalTrace streams probe curves in public. Prompt Studio docs live on this site.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href={SITE_LINKS.thermalTrace} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
            ThermalTrace
          </a>
          <Link href={SITE_LINKS.promptStudio} className="btn btn-secondary">
            Prompt Studio docs
          </Link>
        </div>
      </section>
    </LandingShell>
  )
}
