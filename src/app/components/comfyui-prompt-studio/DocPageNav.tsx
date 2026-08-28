import Link from 'next/link'
import React from 'react'

import { getAllPages, slugToPath } from '@/content/comfyui-prompt-studio/pages'

type DocPageNavProps = {
  order: number
}

export function DocPageNav({ order }: DocPageNavProps) {
  const pages = getAllPages()
  const idx = pages.findIndex((p) => p.order === order)
  const prev = idx > 0 ? pages[idx - 1] : null
  const next = idx >= 0 && idx < pages.length - 1 ? pages[idx + 1] : null

  if (!prev && !next) return null

  return (
    <nav
      aria-label="Documentation pagination"
      className="mt-10 grid gap-6 border-t border-[var(--line)] pt-8 sm:grid-cols-2"
    >
      {prev ? (
        <Link href={slugToPath(prev.slug)} className="group">
          <span className="eyebrow">Previous</span>
          <p className="mt-1 font-medium group-hover:text-[var(--accent)]">{prev.title}</p>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link href={slugToPath(next.slug)} className="group sm:col-start-2 sm:text-right">
          <span className="eyebrow">Next</span>
          <p className="mt-1 font-medium group-hover:text-[var(--accent)]">{next.title}</p>
        </Link>
      ) : null}
    </nav>
  )
}
