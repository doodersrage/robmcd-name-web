import Link from 'next/link'
import React from 'react'

import { MotionReveal } from '@/app/components/ui/MotionReveal'

export type ProjectShowcaseItem = {
  title: string
  tagline: string
  description: string
  href: string
  linkLabel: string
  external?: boolean
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
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{title}</h2>
        {description ? (
          <p className="max-w-2xl text-base leading-relaxed text-[var(--muted)]">{description}</p>
        ) : null}
      </div>

      <ul className="divide-y" style={{ borderColor: 'var(--line)' }}>
        {projects.map((project) => {
          const linkClass = 'mt-4 inline-flex text-sm font-medium text-link'

          return (
            <li key={project.title} className="py-8 first:pt-0">
              <h3 className="text-xl font-semibold">{project.title}</h3>
              <p className="mt-1 font-mono text-sm text-[var(--muted)]">{project.tagline}</p>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-[var(--muted)]">
                {project.description}
              </p>
              {project.external ? (
                <a href={project.href} className={linkClass} target="_blank" rel="noopener noreferrer">
                  {project.linkLabel}
                </a>
              ) : (
                <Link href={project.href} className={linkClass}>
                  {project.linkLabel}
                </Link>
              )}
            </li>
          )
        })}
      </ul>
    </MotionReveal>
  )
}
