export const dynamic = 'force-dynamic'

import React from 'react'
import Link from 'next/link'
import qs from 'qs'
import { Metadata } from 'next/dist/lib/metadata/types/metadata-interface'

export type paramsType = Promise<{ query: string }>

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

export default async function Page({ searchParams }: { searchParams: Promise<paramsType> }) {
  const { query } = await searchParams

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

  try {
    const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/search?${qs.stringify(queryObj)}`

    const response = await fetch(url)

    const data: { docs: [] } = await response.json()

    if (!response.ok) {
      console.error('Search API error:', data)
      return (
        <SearchResultsShell query={query}>
          <p className="text-base leading-relaxed text-slate-600 dark:text-zinc-400">
            Error fetching search results. Please try again later.
          </p>
        </SearchResultsShell>
      )
    }

    return (
      <SearchResultsShell query={query}>
        {query && data?.docs ? (
          <ul className="space-y-8">
            {data.docs.map((result: any) => (
              <li
                key={result.id}
                className="border-b border-slate-200/80 pb-8 last:border-0 dark:border-zinc-800/80"
              >
                <h2 className="mb-2 text-xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">
                  <Link
                  className="text-link text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                    href={result.slug}
                  >
                    {result.title}
                  </Link>
                </h2>
                <p className="text-base leading-relaxed text-slate-600 dark:text-zinc-400">
                  {result.description}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-base leading-relaxed text-slate-600 dark:text-zinc-400">
            No results found.
          </p>
        )}
      </SearchResultsShell>
    )
  } catch (error) {
    console.error('Network error:', error)
    return (
      <SearchResultsShell query={query}>
        <p className="text-base leading-relaxed text-slate-600 dark:text-zinc-400">
          Network error while fetching search results. Please check your connection and try again.
        </p>
      </SearchResultsShell>
    )
  }
}
