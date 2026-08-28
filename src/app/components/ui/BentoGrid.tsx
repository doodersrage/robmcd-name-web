import React from 'react'

import { MotionItem, MotionReveal } from '@/app/components/ui/MotionReveal'
import type { ParsedBentoItem } from '@/puck/lib/fieldParsers'

export type BentoGridProps = {
  eyebrow?: string
  title: string
  description?: string
  items: ParsedBentoItem[]
}

export function BentoGrid({ eyebrow, title, description, items }: BentoGridProps) {
  return (
    <MotionReveal as="section" className="not-prose space-y-8">
      <div className="space-y-3">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{title}</h2>
        {description ? (
          <p className="max-w-2xl text-base leading-relaxed text-[var(--muted)]">{description}</p>
        ) : null}
      </div>

      <ol className="divide-y divide-[var(--line)]">
        {items.map((item, index) => (
          <MotionItem
            key={`${item.title}-${item.icon}`}
            className="grid gap-3 py-8 first:pt-0 md:grid-cols-[4rem_1fr] md:gap-8"
          >
            <span className="font-mono text-sm text-[var(--muted)]">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              {item.description ? (
                <p className="max-w-2xl text-sm leading-relaxed text-[var(--muted)] md:text-base">
                  {item.description}
                </p>
              ) : null}
            </div>
          </MotionItem>
        ))}
      </ol>
    </MotionReveal>
  )
}
