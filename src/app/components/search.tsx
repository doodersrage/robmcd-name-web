'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'

export type paramsType = Promise<{ query: string }>

type Props = {
  params: paramsType
}

export default function Search() {
  const searchParams = useSearchParams()
  const query = searchParams.get('query') || ''

  return (
    <div className="lg:w-[400px] lg:ml-4 sm:w-full sm:py-4">
      <form method="GET" action="/search">
        <input
          className="border-gray-500 border-width-1 inline-block min-w-0 grow bg-gray-800 py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
          type="text"
          name="query"
          placeholder="Search..."
          defaultValue={query}
        />
        <button
          className="inline-block rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          type="submit"
        >
          Search
        </button>
      </form>
    </div>
  )
}
