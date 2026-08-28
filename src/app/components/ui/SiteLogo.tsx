import Link from 'next/link'
import React from 'react'

import { SITE_TAGLINE } from '@/lib/site'

type SiteLogoProps = {
  className?: string
  as?: 'link' | 'static'
  size?: 'md' | 'sm'
  variant?: 'full' | 'compact'
  showTagline?: boolean
}

function LogoMark({ compact = false }: { compact?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={compact ? 'h-6 w-6 shrink-0' : 'h-7 w-7 shrink-0'}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="1" y="1" width="30" height="30" stroke="currentColor" strokeWidth="1.25" />
      <path d="M8 24V8h8.2c3.3 0 5.5 1.9 5.5 4.8 0 2.3-1.4 4-3.6 4.6L24 24h-3.4l-5.4-6.2H11V24H8Zm3-9.1h5c1.8 0 2.9-1 2.9-2.4S17.8 10 16 10H11v4.9Z" fill="currentColor" />
    </svg>
  )
}

function LogoWordmark({ size, compact = false }: { size: 'md' | 'sm'; compact?: boolean }) {
  return (
    <span
      className={
        compact
          ? 'site-brand-logo__wordmark site-brand-logo__wordmark--compact'
          : size === 'sm'
            ? 'site-brand-logo__wordmark site-brand-logo__wordmark--sm'
            : 'site-brand-logo__wordmark'
      }
    >
      Robmcd.name
    </span>
  )
}

function LogoTagline({ size }: { size: 'md' | 'sm' }) {
  return (
    <span
      className={
        size === 'sm' ? 'site-brand-logo__tagline site-brand-logo__tagline--sm' : 'site-brand-logo__tagline'
      }
    >
      {SITE_TAGLINE}
    </span>
  )
}

export function SiteLogo({
  className = '',
  as = 'link',
  size = 'md',
  variant = 'full',
  showTagline = true,
}: SiteLogoProps) {
  const compact = variant === 'compact'
  const logoClasses = [
    'site-brand',
    'site-brand-logo',
    compact ? 'site-brand-logo--compact' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')
  const ariaLabel = `Robmcd.name — ${SITE_TAGLINE}`

  const content = (
    <>
      <LogoMark compact={compact} />
      <span className="site-brand-logo__copy">
        <LogoWordmark size={size} compact={compact} />
        {showTagline && !compact ? <LogoTagline size={size} /> : null}
      </span>
    </>
  )

  if (as === 'static') {
    return <div className={logoClasses}>{content}</div>
  }

  return (
    <Link className={logoClasses} href="/" aria-label={ariaLabel}>
      {content}
    </Link>
  )
}
