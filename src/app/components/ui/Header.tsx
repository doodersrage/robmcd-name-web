import React, { Suspense } from 'react'
import Nav, { NavFallback } from '@/app/components/ui/Nav'
import Search from '@/app/components/Search'
import { SearchFallback } from '@/app/components/SearchFallback'
import { MobileHeaderNav } from '@/app/components/ui/MobileHeaderNav'
import { SiteLogo } from '@/app/components/ui/SiteLogo'
import { ThemeToggle } from '@/app/components/ui/ThemeToggle'

const Header = () => {
  return (
    <header className="site-header">
      <nav className="site-header__inner">
        <div className="flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-6">
          <SiteLogo variant="compact" showTagline={false} />

          <div className="hidden min-w-0 md:flex md:flex-1 md:items-center md:justify-end md:gap-4 lg:gap-6">
            <Suspense fallback={<NavFallback />}>
              <Nav />
            </Suspense>
            <ThemeToggle />
            <Suspense fallback={<SearchFallback />}>
              <Search />
            </Suspense>
          </div>

          <MobileHeaderNav
            menuButton={
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <Suspense fallback={<SearchFallback />}>
                  <Search />
                </Suspense>
                <ThemeToggle />
              </div>
            }
          >
            <Suspense fallback={<NavFallback mobile />}>
              <Nav mobile />
            </Suspense>
          </MobileHeaderNav>
        </div>
      </nav>
    </header>
  )
}

export default Header
