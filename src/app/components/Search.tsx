'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'

export default function Search() {
  const searchParams = useSearchParams()
  const query = searchParams.get('query') || ''

  return (
    <div className="w-full md:w-auto">
      <form method="GET" action="/search" className="flex gap-2">
        <div className="relative flex-1 md:flex-none">
          <input
            className="input-field md:w-64"
            type="text"
            name="query"
            placeholder="Search posts..."
            defaultValue={query}
            aria-label="Search"
          />
          <svg
            className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-foreground-subtle opacity-60"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <button className="group btn btn-primary whitespace-nowrap" type="submit">
          Search
          <svg
            aria-hidden="true"
            className="btn-icon h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </form>
    </div>
  )
}
