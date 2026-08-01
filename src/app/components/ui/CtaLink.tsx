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
  primary: 'btn btn-primary shadow-2xl shadow-indigo-500/10',
  secondary: 'btn btn-secondary backdrop-blur-md',
  gradient:
    'btn bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-2xl shadow-indigo-500/20 hover:-translate-y-1 hover:from-indigo-400 hover:to-violet-500',
}

export function CtaLink({ label, href, variant = 'primary', className }: CtaLinkProps) {
  const isExternal = /^https?:\/\//.test(href)
  const classes = cn(
    'transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 active:scale-[0.98]',
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
