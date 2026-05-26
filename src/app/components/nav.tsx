import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

const Nav = async () => {
  const payload = await getPayload({ config: configPromise })

  // Fetch the page by slug
  const pages = await payload.find({
    collection: 'pages',
    where: {},
  })

  return (
    <div
      id="hs-navbar-sticky-footer"
      className="hidden hs-collapse overflow-hidden transition-all duration-300 basis-full grow sm:block"
      aria-labelledby="hs-navbar-sticky-footer-collapse"
      role="region"
    >
      <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
          {pages.docs.map((page) => (
            <li key={page.id}>
              <a href={`/${page.slug}`}>{page.title}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Nav
