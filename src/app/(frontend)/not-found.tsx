import Link from 'next/link'
import React from 'react'

import { SiteLogo } from '@/app/components/ui/SiteLogo'
import { SITE_LINKS } from '@/lib/site'

export default function NotFound() {
  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col items-center py-16 text-center md:py-24">
      <SiteLogo as="static" variant="full" />
      <p className="eyebrow mt-8">404 — Page not found</p>
      <h1 className="page-title mt-3">This page doesn&apos;t exist</h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-[var(--muted)]">
        The link may be outdated or the page may have moved. Try search or head back to a main section.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link href="/" className="btn btn-primary">
          Go home
        </Link>
        <Link href={SITE_LINKS.work} className="btn btn-secondary">
          Case studies
        </Link>
        <Link href={SITE_LINKS.promptStudio} className="btn btn-secondary">
          LLM Prompt Studio
        </Link>
        <a
          href={SITE_LINKS.thermalTrace}
          className="btn btn-secondary"
          target="_blank"
          rel="noopener noreferrer"
        >
          ThermalTrace
        </a>
        <Link href={SITE_LINKS.contact} className="btn btn-secondary">
          Contact
        </Link>
      </div>
    </section>
  )
}
