import React from 'react'

import { BentoGrid } from '@/app/components/ui/BentoGrid'
import { CtaBanner } from '@/app/components/ui/CtaBanner'
import { Hero } from '@/app/components/ui/Hero'
import { ProjectShowcase } from '@/app/components/ui/ProjectShowcase'
import { LandingShell } from '@/app/components/pages/PageShell'
import { SITE_LINKS } from '@/lib/site'
import type { ParsedBentoItem } from '@/puck/lib/fieldParsers'

const BENTO_ITEMS: ParsedBentoItem[] = [
  {
    span: 'wide',
    icon: 'Layers',
    title: 'Legacy repair & stack modernization',
    description:
      'Inherited a fragile codebase or an outdated stack? I audit, repair, and refactor existing applications—stabilizing legacy C#/.NET or PHP (WordPress/ConcreteCMS) installations or migrating them to modern, headless Next.js architectures.',
  },
  {
    span: 'default',
    icon: 'Shield',
    title: 'Server maintenance & database administration',
    description:
      'Keeping environments fast, secure, and available. Ongoing server maintenance, OS upgrades, cloud migrations, and deep database administration across MySQL and MSSQL.',
  },
  {
    span: 'default',
    icon: 'BarChart3',
    title: 'Technical advisory & system audits',
    description:
      'Two decades across Linux and Windows means I build for stability and longevity: technical debt, security patching, and query performance.',
  },
]

export function DefaultHomePage() {
  return (
    <LandingShell>
      <Hero
        title="Resilient infrastructure. Modern codebases."
        description="Twenty years of Linux and Windows engineering — repairing live stacks, running servers, and shipping tools you can open today."
        primaryCta={{ label: 'See the work', href: SITE_LINKS.work }}
        secondaryCta={{ label: 'Get in touch', href: SITE_LINKS.contact }}
      />

      <div id="capabilities">
        <BentoGrid
          eyebrow="Practice"
          title="What I do"
          description="From low-level server work to modern web applications and sensor dashboards."
          items={BENTO_ITEMS}
        />
      </div>

      <ProjectShowcase
        eyebrow="Shipped"
        title="Open source"
        description="LLM Prompt Studio docs live here. ThermalTrace monitors garage sensors with freeze alerts at thermaltrace.dev."
        projects={[
          {
            title: 'LLM Prompt Studio',
            tagline: 'Prompt, queue, and ship films — ComfyUI + cloud stills/clips.',
            description:
              'MIT-licensed Next.js studio: Heal & ready, Play campaigns (Moodboard → Cut → Cast), 25+ tools, 40+ models, workflow takeover, Mobile Studio, and desktop/Docker installs.',
            href: SITE_LINKS.promptStudio,
            linkLabel: 'Read the docs',
          },
          {
            title: 'ThermalTrace',
            tagline: 'Garage sensors, freeze alerts, and household sharing.',
            description:
              'Open-source dashboard for ESP32/Arduino or HTTPS JSON probes — temp, flood, door, power, air quality; threshold/forecast/NWS alerts; Free / Member / Pro; PWA install.',
            href: SITE_LINKS.thermalTrace,
            linkLabel: 'Open thermaltrace.dev',
            external: true,
          },
          {
            title: 'Work & case studies',
            tagline: 'Prompt Studio, ThermalTrace, and legacy modernization patterns.',
            description: 'Problem, stack, and outcome — plus the consulting pattern behind stack rescues.',
            href: SITE_LINKS.work,
            linkLabel: 'Browse case studies',
          },
        ]}
      />

      <section className="space-y-4">
        <p className="eyebrow">Approach</p>
        <blockquote className="max-w-2xl text-2xl font-semibold tracking-tight md:text-3xl">
          Stability and maintainability outweigh hype.
        </blockquote>
        <p className="max-w-2xl text-base leading-relaxed text-[var(--muted)]">
          Software isn&apos;t just about writing new code — it&apos;s about respecting systems already in
          production. Whether you need servers kept, databases tuned, an IoT dashboard like{' '}
          <a
            href={SITE_LINKS.thermalTrace}
            className="text-link underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            ThermalTrace
          </a>
          , or a legacy application brought back to health, I focus on long-term results.
        </p>
      </section>

      <div className="space-y-4">
        <CtaBanner
          title="Need a stack repaired, or a server that stays up?"
          description="Twenty years of cross-platform engineering — or start with LLM Prompt Studio and ThermalTrace."
          primaryLabel="Start a conversation"
          primaryHref={SITE_LINKS.contact}
          secondaryLabel="View case studies"
          secondaryHref={SITE_LINKS.work}
        />
        <p className="font-mono text-sm text-[var(--muted)]">
          <a href="mailto:admin@robmcd.name" className="text-link">
            admin@robmcd.name
          </a>
        </p>
      </div>
    </LandingShell>
  )
}
