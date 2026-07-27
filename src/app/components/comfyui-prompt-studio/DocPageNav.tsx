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
      className="mt-10 grid gap-3 border-t border-slate-200/80 pt-8 dark:border-zinc-800/80 sm:grid-cols-2"
    >
      {prev ? (
        <Link
          href={slugToPath(prev.slug)}
          className="group rounded-2xl border border-slate-200/80 bg-white/80 p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800/80 dark:bg-zinc-900/80"
        >
          <span className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-zinc-500">
            Previous
          </span>
          <p className="mt-1 font-semibold text-slate-900 group-hover:text-slate-700 dark:text-zinc-100 dark:group-hover:text-zinc-300">
            {prev.title}
          </p>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={slugToPath(next.slug)}
          className="group rounded-2xl border border-slate-200/80 bg-white/80 p-4 text-right shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800/80 dark:bg-zinc-900/80 sm:col-start-2"
        >
          <span className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-zinc-500">
            Next
          </span>
          <p className="mt-1 font-semibold text-slate-900 group-hover:text-slate-700 dark:text-zinc-100 dark:group-hover:text-zinc-300">
            {next.title}
          </p>
        </Link>
      ) : null}
    </nav>
  )
}
