import React from 'react'

export type paramsType = Promise<{ query: string }>

type Props = {
  params: paramsType
}

export default async function Search({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | '' }>
}) {
  const { query } = (await searchParams) || {}

  return (
    <div className="w-[400px] ml-4">
      <form method="GET" action="/search">
        <input
          className="inline-block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
          type="text"
          name="query"
          placeholder="Search..."
          value={query}
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
