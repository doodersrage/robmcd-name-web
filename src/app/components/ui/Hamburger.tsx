'use client'

import React, { useState } from 'react'
import Script from 'next/dist/client/script'

const Hamburger = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="md:hidden">
        <button
          type="button"
          className="{`${isOpen ? 'open' : ''}'} hamburger w-10 h-10 flex justify-center items-center text-[#EFF6E0] rounded-lg bg-[#598392] hover:bg-[#AEC3B0] transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#AEC3B0] focus:ring-opacity-50"
          id="hs-navbar-sticky-footer-collapse"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="hs-navbar-sticky-footer"
          aria-label="Toggle navigation"
          data-hs-collapse="#hs-navbar-sticky-footer"
        >
          <svg
            className={`w-5 h-5 transition-all duration-300 ${isOpen ? 'hidden' : 'block'}`}
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
            className={`w-5 h-5 transition-all duration-300 ${isOpen ? 'block' : 'hidden'}`}
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
      <Script id="nav-toggle" strategy="beforeInteractive">
        {`const menuBtn = document.getElementById('hs-navbar-sticky-footer-collapse');
      const menu = document.querySelectorAll('.hs-navbar-sticky-footer');

      menuBtn.addEventListener('click', () => {
      console.log(menu.classList);
        menu.forEach(element => {
          element.classList.toggle('hidden');
        });
      });`}
      </Script>
    </>
  )
}

export default Hamburger
