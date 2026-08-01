import {
  BarChart3,
  Box,
  Cpu,
  Globe,
  Layers,
  Lock,
  Rocket,
  Shield,
  Sparkles,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import React from 'react'

import { MotionItem, MotionReveal } from '@/app/components/ui/MotionReveal'
import { cn } from '@/lib/cn'
import type { ParsedBentoItem } from '@/puck/lib/fieldParsers'

const ICONS: Record<string, LucideIcon> = {
  Sparkles,
  Zap,
  Shield,
  Rocket,
  Layers,
  Globe,
  Lock,
  Cpu,
  Box,
  BarChart3,
}

function BentoIcon({ name }: { name: string }) {
  const Icon = ICONS[name] ?? Sparkles
  return (
    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 ring-1 ring-indigo-500/20 dark:bg-indigo-500/15 dark:text-indigo-400">
      <Icon className="h-5 w-5" aria-hidden />
    </span>
  )
}

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
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl dark:text-zinc-50">
          {title}
        </h2>
        {description ? (
          <p className="max-w-2xl text-base leading-relaxed text-slate-600 dark:text-zinc-400">{description}</p>
        ) : null}
      </div>

      <div className="grid auto-rows-[minmax(9rem,auto)] grid-cols-1 gap-4 md:grid-cols-3">
        {items.map((item) => (
          <MotionItem
            key={`${item.title}-${item.icon}`}
            className={cn(
              'glass-card group relative overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow',
              item.span === 'wide' && 'md:col-span-2',
              item.span === 'tall' && 'md:row-span-2',
            )}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-violet-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
            <div className="relative space-y-4">
              <BentoIcon name={item.icon} />
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-zinc-100">{item.title}</h3>
                {item.description ? (
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-zinc-400">{item.description}</p>
                ) : null}
              </div>
            </div>
          </MotionItem>
        ))}
      </div>
    </MotionReveal>
  )
}
