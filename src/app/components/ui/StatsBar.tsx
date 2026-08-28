import React from 'react'

import { MotionItem, MotionReveal } from '@/app/components/ui/MotionReveal'
import { cn } from '@/lib/cn'
import type { ParsedStat } from '@/puck/lib/fieldParsers'

export type StatsBarProps = {
  eyebrow?: string
  title?: string
  stats: ParsedStat[]
}

export function StatsBar({ eyebrow, title, stats }: StatsBarProps) {
  if (stats.length === 0) return null

  return (
    <MotionReveal as="section" className="not-prose space-y-6">
      {(eyebrow || title) && (
        <div className="space-y-2">
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          {title ? <h2 className="text-xl font-semibold tracking-tight">{title}</h2> : null}
        </div>
      )}
      <dl
        className={cn(
          'grid gap-8 border-y py-8',
          stats.length >= 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-3',
        )}
        style={{ borderColor: 'var(--line)' }}
      >
        {stats.map((stat) => (
          <MotionItem key={`${stat.value}-${stat.label}`}>
            <dt className="font-mono text-xs uppercase tracking-wider text-[var(--muted)]">{stat.label}</dt>
            <dd className="mt-2 font-mono text-2xl font-medium tracking-tight">{stat.value}</dd>
            {stat.detail ? <p className="mt-1 text-sm text-[var(--muted)]">{stat.detail}</p> : null}
          </MotionItem>
        ))}
      </dl>
    </MotionReveal>
  )
}
