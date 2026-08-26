import React, { cache } from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Page } from '@/payload-types'
import { EXTRA_NAV_TREE, type SiteNavItem } from '@/lib/site'
import { NavMenu } from '@/app/components/ui/NavMenu'

const getNavPages = cache(async () => {
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'pages',
    where: {
      and: [
        { hideInMenu: { equals: false } },
        {
          or: [{ _status: { equals: 'published' } }, { _status: { exists: false } }],
        },
      ],
    },
    sort: ['-sortOrder', 'title'],
    limit: 100,
    depth: 0,
  })

  return docs
})

function getParentId(page: Page): number | null {
  if (!page.parent) return null
  if (typeof page.parent === 'number') return page.parent
  return page.parent.id ?? null
}

function pageHref(page: Page): string {
  const crumbs = page.breadcrumbs
  if (Array.isArray(crumbs) && crumbs.length > 0) {
    const last = crumbs[crumbs.length - 1]
    if (last?.url) return last.url.startsWith('/') ? last.url : `/${last.url}`
  }
  return page.slug === 'home' ? '/' : `/${page.slug}`
}

function buildCmsNavTree(pages: Page[], parentId: number | null = null): SiteNavItem[] {
  return pages
    .filter((page) => getParentId(page) === parentId)
    .filter((page) => page.slug !== 'home')
    .map((page) => {
      const children = buildCmsNavTree(pages, page.id)
      return {
        id: `cms-${page.id}`,
        label: page.title,
        href: pageHref(page),
        ...(children.length > 0 ? { children } : {}),
      }
    })
}

export function NavFallback({ mobile = false }: { mobile?: boolean }) {
  return (
    <div
      className={`nav-menu flex flex-col gap-1 ${mobile ? '' : 'md:flex-row md:gap-8'}`}
      aria-hidden="true"
    >
      <ul className={`flex flex-col gap-1 ${mobile ? '' : 'md:flex-row md:gap-6'}`}>
        {Array.from({ length: 5 }).map((_, index) => (
          <li key={index}>
            <span className="nav-link inline-block">
              <span className="inline-block h-4 w-14 animate-pulse rounded bg-slate-200 dark:bg-zinc-800" />
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

const Nav = async ({ mobile = false }: { mobile?: boolean }) => {
  const pages = await getNavPages()
  const items = [...buildCmsNavTree(pages), ...EXTRA_NAV_TREE]

  return (
    <div className={`nav-menu flex w-full flex-col gap-1 ${mobile ? '' : 'md:flex-row md:justify-end'}`}>
      <NavMenu items={items} mobile={mobile} />
    </div>
  )
}

export default Nav
