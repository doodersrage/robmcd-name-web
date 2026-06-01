export const dynamic = 'force-dynamic'

import { Suspense } from 'react'
import React from 'react'
import Link from 'next/link'
import qs from 'qs'

export type paramsType = Promise<{ query: string }>

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
        <>
          <main className="max-w-340 mx-auto py-5 sm:px-6 lg:px-8">
            <h1>Search Results for {query}</h1>
            <p>Error fetching search results. Please try again later.</p>
          </main>
        </>
      )
    }

    return (
      <>
        <main className="max-w-340 mx-auto py-5 sm:px-6 lg:px-8">
          <h1>Search Results for &quot;{query}&quot;</h1>
          <Suspense fallback={<p>Loading results...</p>}>
            {query && data?.docs ? (
              <ul>
                {data.docs.map((result: any) => (
                  <li key={result.id}>
                    <h2>
                      <Link target="_blank" href={result.slug}>
                        {result.title}
                      </Link>
                    </h2>
                    <p>{result.description}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No results found.</p>
            )}
          </Suspense>
        </main>
      </>
    )
  } catch (error) {
    console.error('Network error:', error)
    return (
      <>
        <main className="max-w-340 mx-auto py-5 sm:px-6 lg:px-8">
          <h1>Search Results for {query}</h1>
          <p>
            Network error while fetching search results. Please check your connection and try again.
          </p>
        </main>
      </>
    )
  }
}
