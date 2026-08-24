import Link from 'next/link'
import React from 'react'

import { DOCS_BASE_PATH, slugToPath } from '@/content/comfyui-prompt-studio/helpers'

type DocsBreadcrumbsProps = {
  slug: string[]
  title: string
}

export function DocsBreadcrumbs({ slug, title }: DocsBreadcrumbsProps) {
  const crumbs: { label: string; href: string }[] = [{ label: 'Prompt Studio', href: DOCS_BASE_PATH }]

  for (let i = 0; i < slug.length; i++) {
    const segment = slug[i]!
    const pathSlug = slug.slice(0, i + 1)
    crumbs.push({
      label: segment.replace(/-/g, ' '),
      href: slugToPath(pathSlug),
    })
  }

  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-500 dark:text-zinc-500">
      <ol className="flex flex-wrap items-center gap-1.5">
        {crumbs.map((crumb, i) => (
          <li key={crumb.href} className="flex items-center gap-1.5">
            {i > 0 ? <span aria-hidden>/</span> : null}
            {i === crumbs.length - 1 ? (
              <span className="font-medium text-slate-700 dark:text-zinc-300 capitalize">{title}</span>
            ) : (
              <Link
                href={crumb.href}
                className="capitalize hover:text-slate-900 dark:hover:text-zinc-100 transition-colors"
              >
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
