import React from 'react'
import Nav from '../nav'
import Search from '../search'

const Header = () => {
  return (
    <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-navbar border-b border-navbar-line text-sm py-4">
      <nav className="max-w-340 w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <a
            className="flex-none font-semibold text-xl text-foreground focus:outline-hidden focus:opacity-80"
            href="#"
            aria-label="Brand"
          >
            Robmcd.name
          </a>
          <div className="sm:hidden">
            <button
              type="button"
              className="hs-collapse-toggle size-9 flex justify-center items-center text-sm font-semibold rounded-lg bg-layer border border-layer-line text-layer-foreground hover:bg-layer-hover focus:outline-hidden focus:bg-layer-focus disabled:opacity-50 disabled:pointer-events-none"
              id="hs-navbar-sticky-footer-collapse"
              aria-expanded="false"
              aria-controls="hs-navbar-sticky-footer"
              aria-label="Toggle navigation"
              data-hs-collapse="#hs-navbar-sticky-footer"
            >
              <svg
                className="hs-collapse-open:hidden shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" x2="21" y1="6" y2="6" />
                <line x1="3" x2="21" y1="12" y2="12" />
                <line x1="3" x2="21" y1="18" y2="18" />
              </svg>
              <svg
                className="hs-collapse-open:block hidden shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
        </div>
        <Nav />
        <Search />
      </nav>
    </header>
  )
}

export default Header
