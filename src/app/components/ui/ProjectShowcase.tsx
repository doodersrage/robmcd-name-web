import Link from 'next/link'
import React from 'react'
import { ArrowUpRight } from 'lucide-react'

import { MotionReveal } from '@/app/components/ui/MotionReveal'
import { cn } from '@/lib/cn'

export type ProjectShowcaseItem = {
  title: string
  tagline: string
  description: string
  href: string
  linkLabel: string
}

export type ProjectShowcaseProps = {
  eyebrow?: string
  title: string
  description?: string
  projects: ProjectShowcaseItem[]
}

export function ProjectShowcase({ eyebrow, title, description, projects }: ProjectShowcaseProps) {
  return (
    <MotionReveal as="section" className="not-prose space-y-8">
      <div className="space-y-3">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl dark:text-zinc-50">{title}</h2>
        {description ? (
          <p className="max-w-2xl text-base leading-relaxed text-slate-600 dark:text-zinc-400">{description}</p>
        ) : null}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.title}
            className={cn(
              'glass-card group flex flex-col justify-between p-6 transition-all duration-300',
              'hover:-translate-y-1 hover:shadow-glow',
            )}
          >
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-slate-900 dark:text-zinc-100">{project.title}</h3>
              <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{project.tagline}</p>
              <p className="text-base leading-relaxed text-slate-600 dark:text-zinc-400">{project.description}</p>
            </div>
            <Link
              href={project.href}
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 transition-colors group-hover:text-indigo-600 dark:text-zinc-100 dark:group-hover:text-indigo-400"
            >
              {project.linkLabel}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </article>
        ))}
      </div>
    </MotionReveal>
  )
}
