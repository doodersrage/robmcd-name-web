export const dynamic = 'force-dynamic'
export const revalidate = 0
export const dynamicParams = true

import type { MetadataRoute } from 'next'
import { getPayload, PaginatedDocs } from 'payload'
import configPromise from '@payload-config'
import { Page, Post } from '@/payload-types'
import { DOC_PAGES, slugToPath } from '@/content/comfyui-prompt-studio/pages'
import { WORK_CASE_STUDIES } from '@/content/work/case-studies'
import { getServerSideURL } from '@/utilities/getURL'
import { getPagePath } from '@/lib/pages'

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

  const now = new Date()

  return [
    ...posts.docs.map(({ slug, updatedAt }) => ({
      url: `${url}/blog/${slug}`,
      lastModified: new Date(updatedAt),
    })),
    ...pages.docs.map((page) => ({
      url: `${url}${getPagePath(page)}`,
      lastModified: new Date(page.updatedAt),
    })),
    ...DOC_PAGES.map((page) => ({
      url: `${url}${slugToPath(page.slug)}`,
      lastModified: now,
    })),
    { url: `${url}/work`, lastModified: now },
    ...WORK_CASE_STUDIES.map((study) => ({
      url: `${url}/work/${study.slug}`,
      lastModified: now,
    })),
  ]
}
