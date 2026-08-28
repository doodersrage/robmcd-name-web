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
          className={cn('h-4 w-4', i < rating ? 'fill-[var(--ink)] text-[var(--ink)]' : 'text-[var(--line)]')}
          aria-hidden
        />
      ))}
    </div>
  )
}

function Avatar({ name, url }: { name: string; url?: string }) {
  if (url) {
    return <img src={url} alt="" className="h-10 w-10 object-cover" />
  }

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <span className="flex h-10 w-10 items-center justify-center border border-[var(--line)] font-mono text-xs">
      {initials}
    </span>
  )
}

export function Testimonials({ eyebrow, title, description, items }: TestimonialsProps) {
  return (
    <MotionReveal as="section" className="not-prose space-y-8">
      <div className="space-y-3">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{title}</h2>
        {description ? (
          <p className="max-w-2xl text-base leading-relaxed text-[var(--muted)]">{description}</p>
        ) : null}
      </div>

      <ul className="divide-y divide-[var(--line)]">
        {items.map((item) => (
          <MotionItem key={`${item.name}-${item.quote.slice(0, 24)}`} className="py-8 first:pt-0">
            <StarRating rating={item.rating} />
            <blockquote className="mt-4 max-w-2xl text-base leading-relaxed">
              &ldquo;{item.quote}&rdquo;
            </blockquote>
            <div className="mt-5 flex items-center gap-3">
              <Avatar name={item.name} url={item.avatarUrl} />
              <div>
                <p className="font-medium">{item.name}</p>
                {item.role ? <p className="text-sm text-[var(--muted)]">{item.role}</p> : null}
              </div>
            </div>
          </MotionItem>
        ))}
      </ul>
    </MotionReveal>
  )
}
