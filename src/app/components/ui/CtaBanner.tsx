import React from 'react'

import { CtaLink } from '@/app/components/ui/CtaLink'
import { MotionReveal } from '@/app/components/ui/MotionReveal'

export type CtaBannerProps = {
  title: string
  description?: string
  primaryLabel: string
  primaryHref: string
  secondaryLabel?: string
  secondaryHref?: string
}

export function CtaBanner({
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: CtaBannerProps) {
  return (
    <MotionReveal as="section" className="not-prose" stagger={false}>
      <div className="space-y-6 border-t pt-10" style={{ borderColor: 'var(--line)' }}>
        <h2 className="max-w-2xl text-2xl font-semibold tracking-tight md:text-3xl">{title}</h2>
        {description ? (
          <p className="max-w-2xl text-base leading-relaxed text-[var(--muted)]">{description}</p>
        ) : null}
        <div className="flex flex-wrap items-center gap-3">
          <CtaLink label={primaryLabel} href={primaryHref} variant="primary" />
          {secondaryLabel && secondaryHref ? (
            <CtaLink label={secondaryLabel} href={secondaryHref} variant="secondary" />
          ) : null}
        </div>
      </div>
    </MotionReveal>
  )
}
