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
      <div className="relative overflow-hidden rounded-2xl border border-indigo-500/20 bg-slate-950 px-6 py-12 shadow-2xl shadow-indigo-500/10 md:px-12 md:py-16 dark:border-indigo-500/30">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgb(99_102_241_/_0.35),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgb(139_92_246_/_0.25),transparent_50%)]"
        />
        <div className="relative mx-auto max-w-2xl space-y-6 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-white md:text-4xl">{title}</h2>
          {description ? (
            <p className="text-base leading-relaxed text-slate-300 md:text-lg">{description}</p>
          ) : null}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <CtaLink label={primaryLabel} href={primaryHref} variant="gradient" />
            {secondaryLabel && secondaryHref ? (
              <CtaLink
                label={secondaryLabel}
                href={secondaryHref}
                variant="secondary"
                className="border-white/20 bg-white/10 text-white hover:bg-white/15"
              />
            ) : null}
          </div>
        </div>
      </div>
    </MotionReveal>
  )
}
