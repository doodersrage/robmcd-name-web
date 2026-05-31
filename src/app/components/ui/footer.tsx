import Link from 'next/dist/client/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className="mt-auto relative w-full p-4 bg-neutral-primary-soft border-t border-default shadow-sm md:flex md:items-center md:justify-between md:p-6">
      <span className="text-sm text-body sm:text-center">
        &copy; {new Date().getFullYear()}{' '}
        <Link href="/" className="hover:underline">
          Robmcd.name
        </Link>
      </span>
      <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-body sm:mt-0">
        <li>
          <Link href="/about" className="hover:underline me-4 md:me-6">
            About
          </Link>
        </li>
        <li>
          <Link href="/privacy" className="hover:underline me-4 md:me-6">
            Privacy Policy
          </Link>
        </li>
        <li>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
        </li>
      </ul>
    </footer>
  )
}

export default Footer
