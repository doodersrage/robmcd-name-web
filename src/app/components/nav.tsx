import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

const Nav = async () => {
  const payload = await getPayload({ config: configPromise })

  // Fetch the page by slug
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
    sort: '-sortOrder',
  })

  return (
    <>
      <div
        id="hs-navbar-sticky-footer"
        className="hidden hs-collapse overflow-hidden transition-all duration-300 basis-full grow sm:block"
        aria-labelledby="hs-navbar-sticky-footer-collapse"
        role="region"
      >
        <div className="dd-menu flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0">
            {pages.docs.map((page) =>
              page.hideInMenu ? null : (
                <li key={page.id}>
                  <a
                    className="text-lg capitalize font-semibold text-shadow-md"
                    href={`/${page.slug}`}
                  >
                    {page.title}
                  </a>
                  {getPages(page.id).then((childPages) => {
                    const childPage = childPages
                    return childPage ? childPage : ''
                  })}
                </li>
              ),
            )}
          </ul>
        </div>
      </div>
      <style>
        {`
            .dd-menu ul > li:hover ul {
              display: block;
              position: absolute;
              background-color: #1f2937; /* Tailwind's gray-800 */
              padding: 0.5rem;
              border-radius: 0.25rem;
              margin-top: 0;
            }
        `}
      </style>
    </>
  )
}

const getPages = async (id: number | string) => {
  const payload = await getPayload({ config: configPromise })

  // Fetch the page by slug
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
    sort: '-sortOrder',
  })

  if (!pages.docs[0]) return null

  return (
    <>
      <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 hidden">
        {pages.docs.map((page) => (
          <li key={page.id}>
            <a className="text-lg capitalize font-semibold text-shadow-md" href={`/${page.slug}`}>
              {page.title}
              {getPages(page.id).then((childPages) => {
                const childPage = childPages
                return childPage ? childPage : ''
              })}
            </a>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Nav
