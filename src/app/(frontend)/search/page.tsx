import { getPayload } from 'payload'
import React from 'react'
import Link from 'next/link'
import configPromise from '@payload-config'
import { RichText as RichTextConverter } from '@payloadcms/richtext-lexical/react'
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
  const url = `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/search?${qs.stringify(queryObj)}`

  const response = await fetch(url)
  const data = await response.json()

  console.log('Search results:', data)

  return (
    <>
      <main>
        <h1>Search Results for "{query}"</h1>
        {data.docs.length > 0 ? (
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
}
