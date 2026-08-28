import Link from 'next/link'
import React from 'react'

import { cn } from '@/lib/cn'

export type CtaLinkProps = {
  label: string
  href: string
  variant?: 'primary' | 'secondary' | 'gradient'
  className?: string
}

const variants = {
  primary: 'btn btn-primary',
  secondary: 'btn btn-secondary',
  gradient: 'btn btn-primary',
}

export function CtaLink({ label, href, variant = 'primary', className }: CtaLinkProps) {
  const isExternal = /^https?:\/\//.test(href)
  const classes = cn(
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]',
    variants[variant],
    className,
  )

  if (isExternal) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {label}
      </a>
    )
  }

  return (
    <Link href={href} className={classes}>
      {label}
    </Link>
  )
}
