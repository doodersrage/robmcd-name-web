import type { Page } from '@/payload-types'
import type { Where } from 'payload'

export const publishedPageFilter: Where = {
  or: [{ _status: { equals: 'published' } }, { _status: { exists: false } }],
}

export function getParentId(page: Page): number | null {
  if (!page.parent) return null
  if (typeof page.parent === 'number') return page.parent
  return page.parent.id ?? null
}

/** Public URL for a CMS page (uses nested-docs breadcrumbs when present). */
export function getPagePath(page: Page): string {
  const crumbs = page.breadcrumbs
  if (Array.isArray(crumbs) && crumbs.length > 0) {
    const last = crumbs[crumbs.length - 1]
    if (last?.url) {
      const url = last.url.startsWith('/') ? last.url : `/${last.url}`
      return url === '/home' ? '/' : url
    }
  }
  return page.slug === 'home' ? '/' : `/${page.slug}`
}
