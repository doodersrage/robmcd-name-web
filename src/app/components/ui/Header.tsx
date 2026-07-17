import React, { Suspense } from 'react'
import Nav, { NavFallback } from '@/app/components/ui/Nav'
import Search from '@/app/components/Search'
import Hamburger from '@/app/components/ui/Hamburger'
import Link from 'next/link'

const Header = () => {
  return (
    <header className="site-header">
      <nav className="site-header__inner">
        <div className="flex w-full flex-col md:flex-row md:items-center md:justify-between">
          <Link className="site-brand" href="/" aria-label="Brand">
            Robmcd.name
          </Link>

          <div className="hidden md:flex md:flex-1 md:items-center md:justify-end md:gap-6">
            <Suspense fallback={<NavFallback />}>
              <Nav />
            </Suspense>
            <Suspense fallback={<div className="animate-pulse text-foreground-subtle">Loading...</div>}>
              <Search />
            </Suspense>
          </div>

          <div className="flex items-center gap-3 pt-4 md:hidden">
            <Suspense fallback={null}>
              <Search />
            </Suspense>
            <Hamburger />
          </div>
        </div>

        <div className="mt-4 md:hidden">
          <Suspense fallback={<NavFallback />}>
            <Nav />
          </Suspense>
        </div>
      </nav>
    </header>
  )
}

export default Header
