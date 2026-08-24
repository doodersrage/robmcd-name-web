'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'

import { getAllPages, slugToPath } from '@/content/comfyui-prompt-studio/pages'

export function DocsSearch() {
  const [query, setQuery] = useState('')
  const pages = getAllPages()

  const results = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return []

    return pages
      .filter(
        (page) =>
          page.title.toLowerCase().includes(term) ||
          page.description.toLowerCase().includes(term) ||
          page.section.toLowerCase().includes(term) ||
          page.slug.join('/').toLowerCase().includes(term),
      )
      .slice(0, 10)
  }, [pages, query])

  return (
    <div className="not-prose mb-6">
      <label htmlFor="docs-search" className="sr-only">
        Search documentation
      </label>
      <input
        id="docs-search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search docs…"
        className="w-full rounded-xl border border-slate-200/80 bg-white/80 px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-slate-300 focus:ring-2 focus:ring-slate-200/80 dark:border-zinc-800/80 dark:bg-zinc-900/80 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-700 dark:focus:ring-zinc-800/80"
      />
      {query.trim() ? (
        <ul className="mt-2 max-h-64 space-y-1 overflow-y-auto rounded-xl border border-slate-200/80 bg-white/90 p-2 shadow-sm dark:border-zinc-800/80 dark:bg-zinc-900/90">
          {results.length === 0 ? (
            <li className="px-3 py-2 text-sm text-slate-500 dark:text-zinc-500">No matches</li>
          ) : (
            results.map((page) => (
              <li key={slugToPath(page.slug)}>
                <Link
                  href={slugToPath(page.slug)}
                  className="block rounded-lg px-3 py-2 transition-colors hover:bg-slate-50 dark:hover:bg-zinc-800/80"
                  onClick={() => setQuery('')}
                >
                  <p className="text-sm font-medium text-slate-900 dark:text-zinc-100">{page.title}</p>
                  <p className="text-xs text-slate-500 dark:text-zinc-500">{page.section}</p>
                </Link>
              </li>
            ))
          )}
        </ul>
      ) : null}
    </div>
  )
}
