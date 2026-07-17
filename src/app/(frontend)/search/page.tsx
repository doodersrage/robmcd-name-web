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
        <div className="card">
          <div className="card-content">
            <h1 className="page-title">Search Results for &quot;{query}&quot;</h1>
            <p className="text-foreground-muted">Error fetching search results. Please try again later.</p>
          </div>
        </div>
      )
    }

    return (
      <div className="card">
        <div className="card-content">
          <h1 className="page-title">Search Results for &quot;{query}&quot;</h1>
          {query && data?.docs ? (
            <ul className="space-y-6">
              {data.docs.map((result: any) => (
                <li key={result.id} className="border-b border-[color:var(--color-border)] pb-6 last:border-0">
                  <h2 className="mb-2 text-xl font-semibold text-foreground">
                    <Link className="text-accent-hover hover:text-accent" href={result.slug}>
                      {result.title}
                    </Link>
                  </h2>
                  <p className="text-foreground-muted">{result.description}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-foreground-muted">No results found.</p>
          )}
        </div>
      </div>
    )
  } catch (error) {
    console.error('Network error:', error)
    return (
      <div className="card">
        <div className="card-content">
          <h1 className="page-title">Search Results for {query}</h1>
          <p className="text-foreground-muted">
            Network error while fetching search results. Please check your connection and try again.
          </p>
        </div>
      </div>
    )
  }
}
