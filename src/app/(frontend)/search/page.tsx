export const dynamic = 'force-dynamic'

import React from 'react'
import Link from 'next/link'
import qs from 'qs'

export type paramsType = Promise<{ query: string }>

type Props = {
  params: paramsType
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
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
    const url = `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/search?${qs.stringify(queryObj)}`

    const response = await fetch(url)

    const data: { docs: [] } = await response.json()

    if (!response.ok) {
      console.error('Search API error:', data)
      return (
        <>
          <main>
            <h1>Search Results for {query}</h1>
            <p>Error fetching search results. Please try again later.</p>
          </main>
        </>
      )
    }

    return (
      <>
        <main>
          <h1>Search Results for {query}</h1>
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
        </main>
      </>
    )
  } catch (error) {
    console.error('Network error:', error)
    return (
      <>
        <main>
          <h1>Search Results for {query}</h1>
          <p>
            Network error while fetching search results. Please check your connection and try again.
          </p>
        </main>
      </>
    )
  }
}
