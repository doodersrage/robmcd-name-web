'use client'

import React, { useState } from 'react'

type MobileHeaderNavProps = {
  menuButton: React.ReactNode
  children: React.ReactNode
}

export function MobileHeaderNav({ menuButton, children }: MobileHeaderNavProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="md:hidden">
      <div className="flex items-center gap-3 pt-4">
        <div className="min-w-0 flex-1">{menuButton}</div>
        <button
          type="button"
          className="btn-icon-toggle"
          onClick={() => setOpen((current) => !current)}
          aria-expanded={open}
          aria-controls="mobile-nav-menu"
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
        >
          <svg
            className={`h-5 w-5 transition-all duration-300 ${open ? 'hidden' : 'block'}`}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="3" x2="21" y1="6" y2="6" />
            <line x1="3" x2="21" y1="12" y2="12" />
            <line x1="3" x2="21" y1="18" y2="18" />
          </svg>
          <svg
            className={`h-5 w-5 transition-all duration-300 ${open ? 'block' : 'hidden'}`}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>

      <div
        id="mobile-nav-menu"
        className={`mobile-nav-menu mt-4 w-full overflow-hidden transition-all duration-300 ${open ? 'block' : 'hidden'}`}
        role="region"
        aria-label="Main navigation"
      >
        {children}
      </div>
    </div>
  )
}
