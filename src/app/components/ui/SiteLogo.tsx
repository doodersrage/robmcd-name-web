import Link from 'next/link'
import React, { useId } from 'react'

import { SITE_TAGLINE } from '@/lib/site'

type SiteLogoProps = {
  className?: string
  as?: 'link' | 'static'
  size?: 'md' | 'sm'
  variant?: 'full' | 'compact'
  showTagline?: boolean
}

function LogoMark({ gradientId, compact = false }: { gradientId: string; compact?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={compact ? 'h-7 w-7 shrink-0' : 'h-9 w-9 shrink-0 sm:h-10 sm:w-10'}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={gradientId} x1="8" y1="6" x2="32" y2="34" gradientUnits="userSpaceOnUse">
          <stop stopColor="#27272a" />
          <stop offset="1" stopColor="#09090b" />
        </linearGradient>
      </defs>

      <rect width="40" height="40" rx="11" fill={`url(#${gradientId})`} />
      <rect
        x="5"
        y="5"
        width="30"
        height="30"
        rx="8"
        stroke="rgb(255 255 255 / 0.12)"
        strokeWidth="1"
      />

      {/* Website development: layout grid / browser window */}
      <rect x="9" y="9" width="22" height="9" rx="1.5" stroke="#818cf8" strokeWidth="1.2" />
      <line x1="9" y1="12.5" x2="31" y2="12.5" stroke="#818cf8" strokeWidth="0.8" opacity="0.7" />
      <rect x="11" y="14" width="4.5" height="2.5" rx="0.5" fill="#818cf8" opacity="0.55" />
      <rect x="17" y="14" width="4.5" height="2.5" rx="0.5" fill="#818cf8" opacity="0.55" />
      <rect x="23" y="14" width="4.5" height="2.5" rx="0.5" fill="#818cf8" opacity="0.55" />

      {/* Programming: angle brackets */}
      <path
        d="M14.5 23.5 11 26.5 14.5 29.5"
        stroke="#34d399"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M25.5 23.5 29 26.5 25.5 29.5"
        stroke="#34d399"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="22.5" y1="22.5" x2="17.5" y2="30.5" stroke="#34d399" strokeWidth="1.2" strokeLinecap="round" />

      {/* Electronics: circuit trace */}
      <circle cx="12" cy="33" r="1.4" fill="#fbbf24" />
      <circle cx="20" cy="33" r="1.4" fill="#fbbf24" />
      <circle cx="28" cy="33" r="1.4" fill="#fbbf24" />
      <path
        d="M12 33h8M20 33h8"
        stroke="#fbbf24"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path d="M20 33v-2.5" stroke="#fbbf24" strokeWidth="1.2" strokeLinecap="round" />
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
  const gradientId = useId().replace(/:/g, '')
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
      <LogoMark gradientId={gradientId} compact={compact} />
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
