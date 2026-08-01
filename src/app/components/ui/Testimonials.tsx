import { Star } from 'lucide-react'
import React from 'react'

import { MotionItem, MotionReveal } from '@/app/components/ui/MotionReveal'
import { cn } from '@/lib/cn'
import type { ParsedTestimonial } from '@/puck/lib/fieldParsers'

export type TestimonialsProps = {
  eyebrow?: string
  title: string
  description?: string
  items: ParsedTestimonial[]
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            'h-4 w-4',
            i < rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-zinc-700',
          )}
          aria-hidden
        />
      ))}
    </div>
  )
}

function Avatar({ name, url }: { name: string; url?: string }) {
  if (url) {
    return (
      <img
        src={url}
        alt=""
        className="h-11 w-11 rounded-full border border-slate-200/80 object-cover dark:border-zinc-700"
      />
    )
  }

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-sm font-bold text-white">
      {initials}
    </span>
  )
}

export function Testimonials({ eyebrow, title, description, items }: TestimonialsProps) {
  return (
    <MotionReveal as="section" className="not-prose space-y-8">
      <div className="space-y-3 text-center md:text-left">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl dark:text-zinc-50">{title}</h2>
        {description ? (
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-600 md:mx-0 dark:text-zinc-400">
            {description}
          </p>
        ) : null}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <MotionItem
            key={`${item.name}-${item.quote.slice(0, 24)}`}
            className="glass-card flex flex-col justify-between p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
          >
            <div className="space-y-4">
              <StarRating rating={item.rating} />
              <blockquote className="text-base leading-relaxed text-slate-700 dark:text-zinc-300">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
            </div>
            <div className="mt-6 flex items-center gap-3 border-t border-slate-200/80 pt-4 dark:border-zinc-800/80">
              <Avatar name={item.name} url={item.avatarUrl} />
              <div>
                <p className="font-semibold text-slate-900 dark:text-zinc-100">{item.name}</p>
                {item.role ? <p className="text-sm text-slate-500 dark:text-zinc-500">{item.role}</p> : null}
              </div>
            </div>
          </MotionItem>
        ))}
      </div>
    </MotionReveal>
  )
}
