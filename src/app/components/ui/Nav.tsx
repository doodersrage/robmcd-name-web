import { Suspense } from 'react'
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
    sort: ['-sortOrder', 'title'],
  })

  return (
    <>
      <div
        id="hs-navbar-sticky-footer"
        className="hidden hs-collapse hs-navbar-sticky-footer overflow-hidden transition-all duration-300 sm:block w-full md:w-auto"
        aria-labelledby="hs-navbar-sticky-footer-collapse"
        role="region"
      >
        <div className="nav-menu flex flex-col md:flex-row gap-1 md:gap-8">
          <ul className="flex flex-col md:flex-row gap-1 md:gap-6">
            <Suspense
              fallback={<div className="animate-pulse text-[#AEC3B0]">Loading menu...</div>}
            >
              {pages.docs.map((page) =>
                page.hideInMenu ? null : (
                  <li key={page.id}>
                    <a
                      className="block py-2 px-3 md:p-0 text-[#EFF6E0] font-semibold capitalize text-sm md:text-base transition-all duration-300 hover:text-[#AEC3B0] hover:translate-x-1 md:hover:translate-x-0 md:border-b-2 md:border-transparent md:hover:border-[#AEC3B0] relative"
                      href={`/${page.slug}`}
                    >
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

      <style>
        {`
          .nav-menu a::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 0;
            height: 2px;
            background: linear-gradient(to right, #AEC3B0, #EFF6E0);
            transition: width 0.3s ease;
          }
          {/* Mobile Navigation */}
          <div className="md:hidden mt-4">
            <Nav />
          </div>
          .nav-menu a:hover::after {
            width: 100%;
          }

          @media (min-width: 768px) {
            .nav-menu a::after {
              display: none;
            }

            .nav-menu a:hover::after {
              display: none;
            }
          }

          .dd-menu ul > li:hover ul {
            display: block;
            position: absolute;
            background-color: #0d3447;
            padding: 0.5rem;
            border-radius: 0.5rem;
            margin-top: 0.25rem;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            border: 1px solid rgba(89, 131, 146, 0.3);
          }

          .dd-menu ul > li:hover ul li a {
            color: #EFF6E0;
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
    sort: ['-sortOrder', 'title'],
  })

  if (!pages.docs[0]) return null

  return (
    <>
      <ul className="flex flex-col gap-1 p-2 md:p-0 md:mt-0 hidden">
        {pages.docs.map((page) => (
          <li key={page.id}>
            <a
              className="block py-2 px-3 md:p-0 text-[#EFF6E0] font-semibold text-sm capitalize transition-all duration-300 hover:text-[#AEC3B0]"
              href={`/${page.slug}`}
            >
              {page.title}
              {getPages(page.id).then((childPages) => {
                return childPages ? childPages : ''
              })}
            </a>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Nav
