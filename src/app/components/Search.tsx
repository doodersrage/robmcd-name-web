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
            className="w-full md:w-64 px-4 py-2 rounded-lg bg-[#0a0f17] border-2 border-[#598392] border-opacity-50 text-[#EFF6E0] placeholder:text-[#AEC3B0] placeholder:opacity-70 focus:outline-none focus:border-[#AEC3B0] focus:border-opacity-100 focus:ring-2 focus:ring-[#598392] focus:ring-opacity-30 transition-all duration-300"
            type="text"
            name="query"
            placeholder="Search posts..."
            defaultValue={query}
            aria-label="Search"
          />
          <svg
            className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#598392] opacity-60 pointer-events-none"
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
        <button
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#124559] to-[#0d3447] text-[#EFF6E0] font-semibold text-sm md:text-base border-2 border-[#598392] border-opacity-50 transition-all duration-300 hover:border-[#AEC3B0] hover:border-opacity-100 hover:shadow-lg hover:shadow-[#124559]/30 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-[#AEC3B0] focus:ring-opacity-30 whitespace-nowrap"
          type="submit"
        >
          Search
        </button>
      </form>
    </div>
  )
}
