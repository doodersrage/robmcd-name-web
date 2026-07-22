import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getServerSideURL } from '@/utilities/getURL'
import { SITE_DESCRIPTION, SITE_NAME, SITE_OWNER } from '@/lib/site'

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET() {
  const payload = await getPayload({ config: configPromise })
  const baseUrl = getServerSideURL()

  const { docs } = await payload.find({
    collection: 'posts',
    sort: ['-createdAt'],
    limit: 20,
  })

  const items = docs
    .map((post) => {
      const url = `${baseUrl}/blog/${post.slug}`
      const title = escapeXml(post.title)
      const pubDate = post.createdAt ? new Date(post.createdAt).toUTCString() : new Date().toUTCString()

      return `<item>
  <title>${title}</title>
  <link>${url}</link>
  <guid>${url}</guid>
  <pubDate>${pubDate}</pubDate>
</item>`
    })
    .join('\n')

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${baseUrl}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en-us</language>
    <managingEditor>${escapeXml(SITE_OWNER)}</managingEditor>
    <webMaster>${escapeXml(SITE_OWNER)}</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  })
}
