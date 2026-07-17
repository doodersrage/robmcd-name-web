import React, { cache } from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Page } from '@/payload-types'

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

function pageHref(slug: string): string {
  return slug === 'home' ? '/' : `/${slug}`
}

function NavList({
  pages,
  parentId = null,
  nested = false,
}: {
  pages: Page[]
  parentId?: number | null
  nested?: boolean
}) {
  const items = pages.filter((page) => getParentId(page) === parentId)

  if (items.length === 0) return null

  return (
    <ul
      className={
        nested
          ? 'hidden flex-col gap-1 p-2 md:mt-0 md:p-0'
          : 'flex flex-col gap-1 md:flex-row md:gap-6'
      }
    >
      {items.map((page) => (
        <li key={page.id}>
          <a className="nav-link md:hover:-translate-y-px" href={pageHref(page.slug)}>
            {page.title}
          </a>
          <NavList pages={pages} parentId={page.id} nested />
        </li>
      ))}
    </ul>
  )
}

export function NavFallback() {
  return (
    <div className="nav-menu flex flex-col gap-1 md:flex-row md:gap-8" aria-hidden="true">
      <ul className="flex flex-col gap-1 md:flex-row md:gap-6">
        {Array.from({ length: 5 }).map((_, index) => (
          <li key={index}>
            <span className="nav-link inline-block">
              <span className="inline-block h-4 w-14 animate-pulse rounded bg-highlight" />
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

const Nav = async () => {
  const pages = await getNavPages()

  return (
    <div
      id="hs-navbar-sticky-footer"
      className="hs-navbar-sticky-footer hidden w-full overflow-hidden transition-all duration-300 sm:block md:w-auto"
      aria-labelledby="hs-navbar-sticky-footer-collapse"
      role="region"
    >
      <div className="nav-menu flex flex-col gap-1 md:flex-row md:gap-8">
        <NavList pages={pages} />
      </div>
    </div>
  )
}

export default Nav
