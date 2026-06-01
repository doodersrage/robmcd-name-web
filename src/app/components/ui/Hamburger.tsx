'use client'

import React, { useState } from 'react'
import Script from 'next/dist/client/script'

const Hamburger = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="sm:hidden">
        <button
          type="button"
          className="{`${isOpen ? 'open' : ''}'} hamburger hs-collapse-toggle size-9 flex justify-center items-center text-sm font-semibold rounded-lg bg-layer border border-layer-line text-layer-foreground hover:bg-layer-hover focus:outline-hidden focus:bg-layer-focus disabled:opacity-50 disabled:pointer-events-none"
          id="hs-navbar-sticky-footer-collapse"
          onClick={() => setIsOpen(!isOpen)}
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
      <Script id="nav-toggle" strategy="beforeInteractive">
        {`const menuBtn = document.querySelector('.hamburger');
          const menuBtnState = document.querySelector('.hamburger.open');
          const menu = document.getElementById('hs-navbar-sticky-footer');

          menuBtn.addEventListener('click', () => {
            if (menuBtnState) {
              menu.classList.add('open');
            } else {
              menu.classList.toggle('hidden');
            }
          });
        `}
      </Script>
    </>
  )
}

export default Hamburger
