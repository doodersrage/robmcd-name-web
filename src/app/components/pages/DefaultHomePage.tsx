import Link from 'next/link'
import React from 'react'

import { Hero } from '@/app/components/ui/Hero'
import { LandingShell } from '@/app/components/pages/PageShell'
import { SITE_LINKS } from '@/lib/site'

export function DefaultHomePage() {
  return (
    <LandingShell>
      <Hero
        showStatus
        statusLabel="Building in public"
        title="Notes from the workbench"
        description="A personal site for website development, programming, and electronics — projects, write-ups, and experiments as they happen."
        skills={['Next.js', 'TypeScript', 'Payload CMS', 'Embedded systems', 'Node.js']}
        primaryCta={{ label: 'View Projects', href: SITE_LINKS.projects }}
        secondaryCta={{ label: 'Read the Blog', href: SITE_LINKS.blog }}
      />

      <section className="card">
        <div className="card-content space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">
            What you&apos;ll find here
          </h2>
          <p className="text-base leading-relaxed text-slate-600 dark:text-zinc-400">
            Tutorials and project write-ups spanning modern web stacks, software craft, and hands-on
            electronics. The site itself is part of the experiment — built with Payload CMS and Next.js
            on Cloudflare.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link href={SITE_LINKS.about} className="btn btn-secondary">
              About
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
