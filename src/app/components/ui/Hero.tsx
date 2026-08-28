import React from 'react'

import { CtaLink } from '@/app/components/ui/CtaLink'
import { MotionReveal } from '@/app/components/ui/MotionReveal'
import { SITE_NAME } from '@/lib/site'
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
  brand?: string
}

export function Hero({
  title,
  description,
  skills = [],
  primaryCta,
  secondaryCta,
  imageUrl,
  imageAlt,
  brand = SITE_NAME,
}: HeroProps) {
  const hasCtas = Boolean(primaryCta?.label && primaryCta.href) || Boolean(secondaryCta?.label && secondaryCta.href)
  const visibleSkills = skills.map((skill) => skill.trim()).filter(Boolean)

  return (
    <MotionReveal as="section" className="not-prose" stagger={false}>
      <div className={cn('max-w-3xl space-y-6', imageUrl && 'grid grid-cols-1 items-end gap-10 lg:max-w-none lg:grid-cols-12')}>
        <div className={cn('space-y-6', imageUrl && 'lg:col-span-7')}>
          {brand ? <p className="brand-display">{brand}</p> : null}

          <h1 className="page-title">{title}</h1>

          {description ? (
            <p className="max-w-xl text-base leading-relaxed text-[var(--muted)]">{description}</p>
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
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {primaryCta?.label && primaryCta.href ? (
                <CtaLink label={primaryCta.label} href={primaryCta.href} variant="primary" />
              ) : null}
              {secondaryCta?.label && secondaryCta.href ? (
                <CtaLink label={secondaryCta.label} href={secondaryCta.href} variant="secondary" />
              ) : null}
            </div>
          ) : null}
        </div>

        {imageUrl ? (
          <div className="lg:col-span-5">
            <img
              src={imageUrl}
              alt={imageAlt || title}
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        ) : null}
      </div>
    </MotionReveal>
  )
}
