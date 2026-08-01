import React from 'react'

import { CtaLink } from '@/app/components/ui/CtaLink'
import { MotionReveal } from '@/app/components/ui/MotionReveal'
import { cn } from '@/lib/cn'

export type HeroCta = {
  label: string
  href: string
}

export type HeroProps = {
  showStatus?: boolean
  statusLabel?: string
  title: string
  gradientTitle?: boolean
  description?: string
  skills?: string[]
  primaryCta?: HeroCta | null
  secondaryCta?: HeroCta | null
  imageUrl?: string
  imageAlt?: string
  badgeText?: string
}

export function Hero({
  showStatus = true,
  statusLabel,
  title,
  gradientTitle = false,
  description,
  skills = [],
  primaryCta,
  secondaryCta,
  imageUrl,
  imageAlt,
  badgeText,
}: HeroProps) {
  const hasCtas = Boolean(primaryCta?.label && primaryCta.href) || Boolean(secondaryCta?.label && secondaryCta.href)
  const visibleSkills = skills.map((skill) => skill.trim()).filter(Boolean)

  return (
    <MotionReveal as="section" className="not-prose" stagger={false}>
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="space-y-6 lg:col-span-7">
          {showStatus && statusLabel ? (
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600 backdrop-blur-md dark:text-emerald-400">
              <span aria-hidden="true" className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              {statusLabel}
            </div>
          ) : null}

          <h1
            className={cn(
              'page-title',
              gradientTitle &&
                'bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 bg-clip-text text-transparent dark:from-indigo-400 dark:via-violet-400 dark:to-purple-400',
            )}
          >
            {title}
          </h1>

          {description ? (
            <p className="max-w-xl text-base leading-relaxed text-slate-600 dark:text-zinc-400">{description}</p>
          ) : null}

          {visibleSkills.length > 0 ? (
            <ul className="flex flex-wrap gap-2 pt-1">
              {visibleSkills.map((skill) => (
                <li key={skill}>
                  <span className="skill-pill">{skill}</span>
                </li>
              ))}
            </ul>
          ) : null}

          {hasCtas ? (
            <div className="flex flex-wrap items-center gap-3 pt-1">
              {primaryCta?.label && primaryCta.href ? (
                <CtaLink label={primaryCta.label} href={primaryCta.href} variant="gradient" />
              ) : null}
              {secondaryCta?.label && secondaryCta.href ? (
                <CtaLink label={secondaryCta.label} href={secondaryCta.href} variant="secondary" />
              ) : null}
            </div>
          ) : null}
        </div>

        <div className="relative lg:col-span-5">
          {badgeText ? (
            <div className="absolute -left-2 top-4 z-10 hidden rounded-xl border border-slate-200/80 bg-white/90 px-3 py-2 text-xs font-medium text-slate-700 shadow-lg backdrop-blur-md md:block dark:border-zinc-700 dark:bg-zinc-900/90 dark:text-zinc-200">
              {badgeText}
            </div>
          ) : null}
          {imageUrl ? (
            <div className="hover-lift overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 shadow-2xl shadow-indigo-500/10 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-900/80">
              <img
                src={imageUrl}
                alt={imageAlt || title}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          ) : (
            <div
              aria-hidden="true"
              className="hover-lift aspect-[4/3] rounded-2xl border border-slate-200/80 bg-gradient-to-br from-indigo-500/15 via-slate-100/80 to-violet-500/10 shadow-2xl shadow-indigo-500/10 backdrop-blur-md dark:border-zinc-800/80 dark:from-indigo-500/25 dark:via-zinc-900/80 dark:to-violet-500/15"
            />
          )}
        </div>
      </div>
    </MotionReveal>
  )
}
