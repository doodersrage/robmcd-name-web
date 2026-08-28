import React from 'react'

import { BentoGrid } from '@/app/components/ui/BentoGrid'
import { CtaBanner } from '@/app/components/ui/CtaBanner'
import { Hero } from '@/app/components/ui/Hero'
import { ProjectShowcase } from '@/app/components/ui/ProjectShowcase'
import { StatsBar } from '@/app/components/ui/StatsBar'
import { LandingShell } from '@/app/components/pages/PageShell'
import { SITE_LINKS } from '@/lib/site'
import type { ParsedBentoItem } from '@/puck/lib/fieldParsers'

const BENTO_ITEMS: ParsedBentoItem[] = [
  {
    span: 'wide',
    icon: 'Layers',
    title: 'Legacy Repair & Stack Modernization',
    description:
      'Inherited a fragile codebase or an outdated stack? I audit, repair, and refactor existing applications—stabilizing legacy C#/.NET or PHP (WordPress/ConcreteCMS) installations or migrating them to modern, headless Next.js architectures. C# / .NET · PHP · WordPress · ConcreteCMS · Next.js · TypeScript · Payload CMS',
  },
  {
    span: 'default',
    icon: 'Shield',
    title: 'Server Maintenance & Database Administration',
    description:
      'Keeping environments fast, secure, and available. Ongoing server maintenance, OS upgrades, cloud migrations, and deep database administration across MySQL and MSSQL. Linux & Windows Server · MySQL · MSSQL · IIS / Nginx · Docker · AWS',
  },
  {
    span: 'default',
    icon: 'BarChart3',
    title: 'Technical Advisory & System Audits',
    description:
      'Two decades across diverse operating systems and tech stacks means I build for stability and longevity. I help teams eliminate technical debt, patch critical vulnerabilities, and optimize query performance. Architecture Audits · SQL Optimization · Security Patching · Multi-Stack Integration',
  },
]

export function DefaultHomePage() {
  return (
    <LandingShell>
      <Hero
        showStatus
        statusLabel="20 Years of Cross-Platform Engineering & Systems Expertise"
        title="Resilient Infrastructure. Modern Codebases. Built to Last."
        gradientTitle
        description="Hi, I'm Rob McDowell. With two decades of hands-on experience across Linux and Windows environments, I specialize in full-stack engineering, database management, and rescuing, repairing, and modernizing complex software stacks — plus open-source products like LLM Prompt Studio and ThermalTrace."
        primaryCta={{ label: 'Explore Capabilities', href: '#capabilities' }}
        secondaryCta={{ label: 'Get in Touch', href: SITE_LINKS.contact }}
        badgeText="Linux · Windows · Full-Stack · IoT"
      />

      <StatsBar
        stats={[
          { value: '01', label: 'Experience', detail: '20 Years in Web & Systems Engineering' },
          { value: '02', label: 'Environments', detail: 'Linux & Windows Server Infrastructure' },
          { value: '03', label: 'Core Stack', detail: 'C#, PHP, Node, Next.js, MySQL & MSSQL' },
        ]}
      />

      <div id="capabilities">
        <BentoGrid
          eyebrow="Core expertise"
          title="What I Do"
          description="From low-level server administration to modern web applications and sensor dashboards, I keep cross-platform operations running smoothly."
          items={BENTO_ITEMS}
        />
      </div>

      <ProjectShowcase
        eyebrow="Built & shipped"
        title="Open source & live demos"
        description="Products you can open today — Prompt Studio docs on this site, ThermalTrace streaming live probe curves with freeze-aware alerts."
        projects={[
          {
            title: 'LLM Prompt Studio',
            tagline: 'ComfyUI + cloud prompt orchestration for image, video, audio, and 3D.',
            description:
              'MIT-licensed Next.js app with 28+ tool routes, Cast & Roleplay, Play mode, gallery review, workflow takeover, and desktop/Docker installs. Docs on robmcd.name; operator reference on GitHub Pages.',
            href: SITE_LINKS.promptStudio,
            linkLabel: 'Read the docs',
          },
          {
            title: 'ThermalTrace',
            tagline: 'Probe curves, freeze alerts, and household-ready IoT monitoring.',
            description:
              'Open-source Astro dashboard at garage-temp.robmcd.name — ESP/Arduino ingest, NWS-backed cold risk, multi-channel alerts, Supabase accounts, and 89+ sensor-to-screen guides.',
            href: SITE_LINKS.thermalTrace,
            linkLabel: 'Open live demo',
            external: true,
          },
          {
            title: 'Work & case studies',
            tagline: 'Prompt Studio, ThermalTrace, and legacy modernization patterns.',
            description:
              'Narrative write-ups covering problem, stack, and outcome — plus links into consulting projects.',
            href: SITE_LINKS.work,
            linkLabel: 'Browse case studies',
          },
          {
            title: 'Legacy stack rescue',
            tagline: 'Stabilize first, then modernize without losing historical data.',
            description:
              'Consulting pattern for aging Windows/Linux servers and C#/PHP apps — then optional headless Next.js when the business is ready.',
            href: '/work/legacy-stack-rescue',
            linkLabel: 'Read the pattern',
          },
        ]}
      />

      <section className="card">
        <div className="card-content space-y-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Engineering Philosophy
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl dark:text-zinc-100">
            &ldquo;20 years of pragmatic, battle-tested problem solving.&rdquo;
          </h2>
          <p className="text-base leading-relaxed text-slate-600 dark:text-zinc-400">
            Software isn&apos;t just about writing new code—it&apos;s about respecting and maintaining the
            systems already in production. Over the last 20 years across both Linux and Windows environments,
            I&apos;ve learned that stability, maintainability, and clean architecture outweigh hype. Whether you
            need an experienced engineer to maintain your servers, optimize your MSSQL/MySQL databases,
            ship an IoT dashboard like{' '}
            <a
              href={SITE_LINKS.thermalTrace}
              className="font-medium text-indigo-600 underline decoration-indigo-400/40 underline-offset-2 hover:text-indigo-700 dark:text-indigo-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              ThermalTrace
            </a>
            , or refactor a legacy application, I focus on reliable, long-term results.
          </p>
        </div>
      </section>

      <div className="space-y-4">
        <CtaBanner
          title="Need to repair a legacy stack or stabilize your server infrastructure?"
          description="Let's discuss how my 20 years of cross-platform engineering experience can bring peace of mind to your tech operations — or explore LLM Prompt Studio and ThermalTrace for open-source demos."
          primaryLabel="Start a Conversation"
          primaryHref={SITE_LINKS.contact}
          secondaryLabel="View case studies"
          secondaryHref={SITE_LINKS.work}
        />
        <p className="text-center text-sm text-slate-600 dark:text-zinc-400">
          or reach out directly at{' '}
          <a
            href="mailto:admin@robmcd.name"
            className="font-medium text-indigo-600 underline decoration-indigo-400/40 underline-offset-2 hover:text-indigo-700 dark:text-indigo-400"
          >
            admin@robmcd.name
          </a>
        </p>
      </div>
    </LandingShell>
  )
}
