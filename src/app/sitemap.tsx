export const dynamic = 'force-dynamic'
export const revalidate = 0
export const dynamicParams = true

import type { MetadataRoute } from 'next'
import { getPayload, PaginatedDocs } from 'payload'
import configPromise from '@payload-config'
import { Page, Post } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config: configPromise })

  // Fetch all posts
  const posts: PaginatedDocs<Post> = await payload.find({
    collection: 'posts',
    limit: 0,
    where: {},
  })

  // Define the base URL dynamically
  const url: string = getServerSideURL()

  const pages: PaginatedDocs<Page> = await payload.find({
    collection: 'pages',
    limit: 0,
    where: {},
  })

  return [
    ...posts.docs.map(({ slug, updatedAt }) => ({
      url: `${url}/blog/${slug}`,
      lastModified: new Date(updatedAt),
    })),
    ...pages.docs.map(({ slug, updatedAt }) => ({
      url: `${url}/${slug}`,
      lastModified: new Date(updatedAt),
    })),
  ]
}
