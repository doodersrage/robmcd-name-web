import React, { useState } from 'react'
import Nav from '@/app/components/ui/nav'
import Search from '@/app/components/search'
import Hamburger from '@/app/components/ui/hamburger'
import Link from 'next/link'

const Header = () => {
  return (
    <>
      <header className="shadow-[0_8px_10px_-5px_rgba(0,0,0,0.3)] flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-navbar border-b border-navbar-line text-sm py-4">
        <nav className="max-w-340 w-full mx-auto lg:px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link
              className="text-shadow-lgflex-none font-semibold text-xl text-foreground focus:outline-hidden focus:opacity-80"
              href="/"
              aria-label="Brand"
            >
              Robmcd.name
            </Link>
            <Hamburger />
          </div>
          <Nav />
          <Search />
        </nav>
      </header>
    </>
  )
}

export default Header
