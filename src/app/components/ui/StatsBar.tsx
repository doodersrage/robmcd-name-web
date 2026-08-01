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
    <MotionReveal as="section" className="not-prose">
      <div className={cn('glass-card overflow-hidden !p-0')}>
        {(eyebrow || title) && (
          <div className="border-b border-slate-200/80 px-6 py-5 dark:border-zinc-800/80">
            {eyebrow ? (
              <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                {eyebrow}
              </p>
            ) : null}
            {title ? (
              <h2 className="mt-1 text-xl font-bold tracking-tight text-slate-900 dark:text-zinc-50">{title}</h2>
            ) : null}
          </div>
        )}
        <dl
          className={cn(
            'grid divide-y divide-slate-200/80 dark:divide-zinc-800/80',
            stats.length >= 4 ? 'sm:grid-cols-2 lg:grid-cols-4 sm:divide-y-0 sm:divide-x' : 'sm:grid-cols-3 sm:divide-y-0 sm:divide-x',
          )}
        >
          {stats.map((stat) => (
            <MotionItem key={`${stat.value}-${stat.label}`} className="px-6 py-8 text-center sm:text-left">
              <dt className="text-sm font-medium text-slate-500 dark:text-zinc-500">{stat.label}</dt>
              <dd className="mt-2 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl dark:text-zinc-50">
                {stat.value}
              </dd>
              {stat.detail ? (
                <p className="mt-1 text-xs text-slate-500 dark:text-zinc-500">{stat.detail}</p>
              ) : null}
            </MotionItem>
          ))}
        </dl>
      </div>
    </MotionReveal>
  )
}
