'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { getSections, slugToPath } from '@/content/comfyui-prompt-studio/pages'

export function DocsSidebar() {
  const pathname = usePathname()
  const sections = getSections()
  const [open, setOpen] = useState(false)

  const nav = (
    <nav className="space-y-6">
      {sections.map((section) => (
        <div key={section.id}>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-500">
            {section.title}
          </p>
          <ul className="space-y-1">
            {section.pages.map((page) => {
              const href = slugToPath(page.slug)
              const active = pathname === href
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`block rounded-lg px-3 py-2 text-sm transition-all duration-200 ${
                      active
                        ? 'bg-slate-100 font-medium text-slate-900 dark:bg-zinc-800 dark:text-zinc-100'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100'
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {page.title}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </nav>
  )

  return (
    <>
      <button
        type="button"
        className="btn btn-secondary mb-4 w-full lg:hidden"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        {open ? 'Hide' : 'Show'} documentation menu
      </button>
      <aside
        className={`lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto ${
          open ? 'block' : 'hidden lg:block'
        }`}
      >
        <div className="card lg:bg-transparent lg:shadow-none lg:backdrop-blur-none lg:border-0">
          <div className="card-content lg:p-0">{nav}</div>
        </div>
      </aside>
    </>
  )
}
