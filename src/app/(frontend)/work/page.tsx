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
    'Selected work by Robert McDowell — LLM Prompt Studio, Garage Temperature Monitor, and legacy modernization patterns.',
  alternates: { canonical: '/work' },
  openGraph: {
    title: 'Work & case studies — Robert McDowell',
    description:
      'Open-source tools and consulting patterns: Prompt Studio, Garage Temp, and legacy stack rescue.',
  },
}

export default function WorkIndexPage() {
  return (
    <LandingShell>
      <section className="card">
        <div className="card-content space-y-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Portfolio
          </p>
          <h1 className="page-title">Work & case studies</h1>
          <p className="max-w-2xl text-base leading-relaxed text-slate-600 dark:text-zinc-400">
            Open-source products you can open today, plus the consulting pattern behind legacy rescues
            and headless modernization. For live CMS project pages, see{' '}
            <Link href={SITE_LINKS.projects} className="text-link font-medium text-indigo-600 dark:text-indigo-400">
              Projects
            </Link>
            .
          </p>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2">
        {WORK_CASE_STUDIES.map((study) => (
          <article
            key={study.slug}
            className="rounded-2xl border border-slate-200/80 bg-white/80 p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800/80 dark:bg-zinc-900/80"
          >
            <h2 className="text-xl font-bold text-slate-900 dark:text-zinc-100">{study.title}</h2>
            <p className="mt-2 text-sm font-medium text-indigo-600 dark:text-indigo-400">{study.tagline}</p>
            <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-zinc-400">
              {study.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {study.stack.slice(0, 4).map((s) => (
                <span
                  key={s}
                  className="rounded-lg bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-zinc-950 dark:text-zinc-400"
                >
                  {s}
                </span>
              ))}
            </div>
            <Link
              href={`/work/${study.slug}`}
              className="mt-5 inline-flex text-sm font-semibold text-slate-900 hover:text-indigo-600 dark:text-zinc-100 dark:hover:text-indigo-400"
            >
              Read case study →
            </Link>
          </article>
        ))}
      </div>

      <section className="card">
        <div className="card-content flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-zinc-100">Try the live demos</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-zinc-400">
              Garage Temp streams probe readings in public. Prompt Studio docs live on this site.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={SITE_LINKS.garageTemp} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
              Garage Temp
            </a>
            <Link href={SITE_LINKS.promptStudio} className="btn btn-secondary">
              Prompt Studio docs
            </Link>
            <Link href={SITE_LINKS.contact} className="btn btn-secondary">
              Contact
            </Link>
          </div>
        </div>
      </section>
    </LandingShell>
  )
}
