import React, { useState, Suspense } from 'react'
import Nav from '@/app/components/ui/Nav'
import Search from '@/app/components/Search'
import Hamburger from '@/app/components/ui/Hamburger'
import Link from 'next/link'

const Header = () => {
  return (
    <>
      <header className="relative w-full bg-gradient-to-r from-[#124559] to-[#0d3447] border-b border-[#598392] border-opacity-30 z-50">
        <nav className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
          <div className="flex items-center justify-between">
            {/* Brand */}
            <Link
              className="flex-none font-bold text-2xl bg-gradient-to-r from-[#EFF6E0] to-[#AEC3B0] bg-clip-text text-transparent hover:opacity-80 transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-[#AEC3B0] rounded px-2 py-1"
              href="/"
              aria-label="Brand"
            >
              Robmcd.name
            </Link>

            {/* Center Navigation and Search */}
            <div className="hidden md:flex items-center gap-6 flex-1 justify-end">
              <Nav />
              <Suspense fallback={<div className="animate-pulse text-[#AEC3B0]">Loading...</div>}>
                <Search />
              </Suspense>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center gap-3">
              <Suspense fallback={null}>
                <Search />
              </Suspense>
              <Hamburger />
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden mt-4">
            <Nav />
          </div>
        </nav>
      </header>
    </>
  )
}

export default Header
