import { Suspense } from 'react'
import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

const Nav = async () => {
  const payload = await getPayload({ config: configPromise })

  const pages = await payload.find({
    collection: 'pages',
    where: {
      parent: {
        equals: null,
      },
      hideInMenu: {
        equals: false,
      },
    },
    sort: ['-sortOrder', 'title'],
  })

  return (
    <div
      id="hs-navbar-sticky-footer"
      className="hs-navbar-sticky-footer hidden w-full overflow-hidden transition-all duration-300 sm:block md:w-auto"
      aria-labelledby="hs-navbar-sticky-footer-collapse"
      role="region"
    >
      <div className="nav-menu flex flex-col gap-1 md:flex-row md:gap-8">
        <ul className="flex flex-col gap-1 md:flex-row md:gap-6">
          <Suspense fallback={<div className="animate-pulse text-foreground-subtle">Loading menu...</div>}>
            {pages.docs.map((page) =>
              page.hideInMenu ? null : (
                <li key={page.id}>
                  <a className="nav-link md:hover:-translate-y-px" href={`/${page.slug}`}>
                    {page.title}
                  </a>
                  {getPages(page.id).then((childPages) => {
                    return childPages ? childPages : ''
                  })}
                </li>
              ),
            )}
          </Suspense>
        </ul>
      </div>
    </div>
  )
}

const getPages = async (id: number | string) => {
  const payload = await getPayload({ config: configPromise })

  const pages = await payload.find({
    collection: 'pages',
    where: {
      parent: {
        equals: id,
      },
      hideInMenu: {
        equals: false,
      },
    },
    sort: ['-sortOrder', 'title'],
  })

  if (!pages.docs[0]) return null

  return (
    <ul className="hidden flex-col gap-1 p-2 md:mt-0 md:p-0">
      {pages.docs.map((page) => (
        <li key={page.id}>
          <a className="nav-link" href={`/${page.slug}`}>
            {page.title}
            {getPages(page.id).then((childPages) => {
              return childPages ? childPages : ''
            })}
          </a>
        </li>
      ))}
    </ul>
  )
}

export default Nav
