import Link from 'next/link'
import React from 'react'

export type HeroCta = {
  label: string
  href: string
}

export type HeroProps = {
  showStatus?: boolean
  statusLabel?: string
  title: string
  description?: string
  skills?: string[]
  primaryCta?: HeroCta | null
  secondaryCta?: HeroCta | null
  imageUrl?: string
  imageAlt?: string
}

const interactiveClasses =
  'transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 active:scale-[0.98]'

const primaryCtaClasses =
  `inline-flex items-center justify-center px-5 py-2.5 rounded-xl font-medium text-sm bg-slate-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:bg-slate-800 dark:hover:bg-white hover:-translate-y-px hover:shadow-lg hover:shadow-slate-500/5 dark:hover:shadow-black/20 shadow-sm ${interactiveClasses}`

const secondaryCtaClasses =
  `inline-flex items-center justify-center px-5 py-2.5 rounded-xl font-medium text-sm text-slate-600 dark:text-zinc-300 bg-transparent hover:bg-slate-100 dark:hover:bg-zinc-800/60 hover:-translate-y-px border border-slate-200 dark:border-zinc-800 ${interactiveClasses}`

function HeroCtaLink({ cta, className }: { cta: HeroCta; className: string }) {
  const isExternal = /^https?:\/\//.test(cta.href)

  if (isExternal) {
    return (
      <a href={cta.href} className={className} target="_blank" rel="noopener noreferrer">
        {cta.label}
      </a>
    )
  }

  return (
    <Link href={cta.href} className={className}>
      {cta.label}
    </Link>
  )
}

export function Hero({
  showStatus = true,
  statusLabel,
  title,
  description,
  skills = [],
  primaryCta,
  secondaryCta,
  imageUrl,
  imageAlt,
}: HeroProps) {
  const hasCtas = Boolean(primaryCta?.label && primaryCta.href) || Boolean(secondaryCta?.label && secondaryCta.href)
  const visibleSkills = skills.map((skill) => skill.trim()).filter(Boolean)

  return (
    <section className="not-prose">
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="space-y-6 lg:col-span-7">
          {showStatus && statusLabel ? (
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
              <span aria-hidden="true" className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              {statusLabel}
            </div>
          ) : null}

          <h1 className="page-title">{title}</h1>

          {description ? (
            <p className="max-w-xl text-base leading-relaxed text-slate-600 dark:text-zinc-400">
              {description}
            </p>
          ) : null}

          {visibleSkills.length > 0 ? (
            <ul className="flex flex-wrap gap-2 pt-1">
              {visibleSkills.map((skill) => (
                <li key={skill}>
                  <span className="skill-pill">{skill}</span>
                </li>
              ))}
            </ul>
          ) : null}

          {hasCtas ? (
            <div className="flex flex-wrap items-center gap-3 pt-1">
              {primaryCta?.label && primaryCta.href ? (
                <HeroCtaLink cta={primaryCta} className={primaryCtaClasses} />
              ) : null}
              {secondaryCta?.label && secondaryCta.href ? (
                <HeroCtaLink cta={secondaryCta} className={secondaryCtaClasses} />
              ) : null}
            </div>
          ) : null}
        </div>

        <div className="lg:col-span-5">
          {imageUrl ? (
            <div className="hover-lift overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 shadow-sm backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-900/80">
              <img
                src={imageUrl}
                alt={imageAlt || title}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          ) : (
            <div
              aria-hidden="true"
              className="hover-lift aspect-[4/3] rounded-2xl border border-slate-200/80 bg-gradient-to-br from-indigo-500/10 via-slate-100/80 to-zinc-900/40 shadow-sm backdrop-blur-md dark:border-zinc-800/80 dark:from-indigo-500/20 dark:via-zinc-900/80 dark:to-zinc-950/80"
            />
          )}
        </div>
      </div>
    </section>
  )
}
