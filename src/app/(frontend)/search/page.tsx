export const dynamic = 'force-dynamic'

import React from 'react'
import Link from 'next/link'
import qs from 'qs'
import { Metadata } from 'next/dist/lib/metadata/types/metadata-interface'

import { DOC_PAGES, slugToPath } from '@/content/comfyui-prompt-studio/pages'
import { WORK_CASE_STUDIES } from '@/content/work/case-studies'
import { SITE_LINKS } from '@/lib/site'

export type paramsType = Promise<{ query: string }>

type SearchHit = {
  id: string
  title: string
  description: string
  href: string
  source: string
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<paramsType>
}): Promise<Metadata> {
  const { query } = await searchParams

  return {
    title: 'Search results for ' + query,
    description: 'Search results for ' + query,
    keywords: ['search', query],
    alternates: {
      canonical: `/search?query=${encodeURIComponent(query)}`,
    },
  }
}

function SearchResultsShell({ query, children }: { query: string; children: React.ReactNode }) {
  return (
    <div className="card">
      <div className="card-content space-y-8">
        <h1 className="page-title">Search Results for &quot;{query}&quot;</h1>
        {children}
      </div>
    </div>
  )
}

function searchLocalContent(term: string): SearchHit[] {
  const q = term.trim().toLowerCase()
  if (!q) return []

  const docHits: SearchHit[] = DOC_PAGES.filter(
    (page) =>
      page.title.toLowerCase().includes(q) ||
      page.description.toLowerCase().includes(q) ||
      page.section.toLowerCase().includes(q) ||
      page.slug.join('/').toLowerCase().includes(q),
  ).map((page) => ({
    id: `doc-${slugToPath(page.slug)}`,
    title: page.title,
    description: page.description,
    href: slugToPath(page.slug),
    source: `Prompt Studio · ${page.section}`,
  }))

  const workHits: SearchHit[] = WORK_CASE_STUDIES.filter(
    (study) =>
      study.title.toLowerCase().includes(q) ||
      study.tagline.toLowerCase().includes(q) ||
      study.description.toLowerCase().includes(q) ||
      study.stack.some((s) => s.toLowerCase().includes(q)),
  ).map((study) => ({
    id: `work-${study.slug}`,
    title: study.title,
    description: study.description,
    href: `/work/${study.slug}`,
    source: 'Work · Case study',
  }))

  const extras: SearchHit[] = []
  if (
    q.includes('garage') ||
    q.includes('temp') ||
    q.includes('iot') ||
    q.includes('dht') ||
    q.includes('probe') ||
    q.includes('sensor')
  ) {
    extras.push({
      id: 'garage-temp',
      title: 'Garage Temperature Monitor',
      description:
        'Live DHT22 garage probes with outdoor weather comparison, firmware guides, and Astro dashboard.',
      href: SITE_LINKS.garageTemp,
      source: 'External · Live demo',
    })
  }

  return [...workHits, ...docHits, ...extras].slice(0, 20)
}

export default async function Page({ searchParams }: { searchParams: Promise<paramsType> }) {
  const { query } = await searchParams
  const localHits = searchLocalContent(query ?? '')

  const queryObj = {
    where: {
      or: [
        {
          title: {
            like: query,
          },
        },
        {
          description: {
            like: query,
          },
        },
      ],
    },
  }

  let cmsHits: SearchHit[] = []
  let cmsError = false

  try {
    const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/search?${qs.stringify(queryObj)}`
    const response = await fetch(url)
    const data: { docs: { id: string | number; title: string; description?: string; slug?: string }[] } =
      await response.json()

    if (!response.ok) {
      console.error('Search API error:', data)
      cmsError = true
    } else if (query && data?.docs) {
      cmsHits = data.docs.map((result) => ({
        id: `cms-${result.id}`,
        title: result.title,
        description: result.description ?? '',
        href: result.slug ?? '/',
        source: 'Site',
      }))
    }
  } catch (error) {
    console.error('Network error:', error)
    cmsError = true
  }

  const allHits = [...cmsHits, ...localHits]
  const seen = new Set<string>()
  const merged = allHits.filter((hit) => {
    if (seen.has(hit.href)) return false
    seen.add(hit.href)
    return true
  })

  return (
    <SearchResultsShell query={query}>
      {cmsError && localHits.length === 0 ? (
        <p className="text-base leading-relaxed text-slate-600 dark:text-zinc-400">
          Error fetching search results. Please try again later.
        </p>
      ) : query && merged.length > 0 ? (
        <ul className="space-y-8">
          {merged.map((result) => {
            const isExternal = result.href.startsWith('http')
            return (
              <li
                key={result.id}
                className="border-b border-slate-200/80 pb-8 last:border-0 dark:border-zinc-800/80"
              >
                <p className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-zinc-500">
                  {result.source}
                </p>
                <h2 className="mb-2 text-xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">
                  {isExternal ? (
                    <a
                      className="text-link text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                      href={result.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {result.title}
                    </a>
                  ) : (
                    <Link
                      className="text-link text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                      href={result.href}
                    >
                      {result.title}
                    </Link>
                  )}
                </h2>
                <p className="text-base leading-relaxed text-slate-600 dark:text-zinc-400">
                  {result.description}
                </p>
              </li>
            )
          })}
        </ul>
      ) : (
        <p className="text-base leading-relaxed text-slate-600 dark:text-zinc-400">No results found.</p>
      )}
    </SearchResultsShell>
  )
}
