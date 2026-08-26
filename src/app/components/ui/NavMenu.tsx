'use client'

import React, { useId, useState } from 'react'

import type { SiteNavItem } from '@/lib/site'

function NavAnchor({
  item,
  className,
  onNavigate,
  children,
}: {
  item: SiteNavItem
  className?: string
  onNavigate?: () => void
  children?: React.ReactNode
}) {
  const content = children ?? item.label

  if (item.external) {
    return (
      <a
        className={className ?? 'nav-link'}
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onNavigate}
      >
        {content}
      </a>
    )
  }

  return (
    <a className={className ?? 'nav-link'} href={item.href} onClick={onNavigate}>
      {content}
    </a>
  )
}

function DesktopNavItem({ item }: { item: SiteNavItem }) {
  const hasChildren = Boolean(item.children?.length)

  if (!hasChildren) {
    return (
      <li>
        <NavAnchor item={item} />
      </li>
    )
  }

  return (
    <li className="nav-item-has-children group relative">
      <NavAnchor item={item} className="nav-link inline-flex items-center gap-1">
        {item.label}
        <svg
          className="h-3.5 w-3.5 opacity-60 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </NavAnchor>
      <ul className="nav-dropdown" role="list">
        {item.children!.map((child) => (
          <li key={child.id}>
            <NavAnchor item={child} className="nav-dropdown__link" />
          </li>
        ))}
      </ul>
    </li>
  )
}

function MobileNavItem({ item, depth = 0 }: { item: SiteNavItem; depth?: number }) {
  const hasChildren = Boolean(item.children?.length)
  const panelId = useId()
  const [open, setOpen] = useState(true)

  if (!hasChildren) {
    return (
      <li>
        <NavAnchor item={item} className={depth > 0 ? 'nav-link nav-link--nested' : 'nav-link'} />
      </li>
    )
  }

  return (
    <li>
      <div className="flex items-center gap-1">
        <NavAnchor item={item} className="nav-link min-w-0 flex-1" />
        <button
          type="button"
          className="nav-submenu-toggle"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? 'Collapse' : 'Expand'} {item.label}</span>
          <svg
            className={`h-4 w-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <ul id={panelId} className={`nav-submenu ${open ? 'block' : 'hidden'}`} role="list">
        {item.children!.map((child) => (
          <MobileNavItem key={child.id} item={child} depth={depth + 1} />
        ))}
      </ul>
    </li>
  )
}

export function NavMenu({ items, mobile = false }: { items: SiteNavItem[]; mobile?: boolean }) {
  if (items.length === 0) return null

  if (mobile) {
    return (
      <ul className="flex flex-col gap-1" role="list">
        {items.map((item) => (
          <MobileNavItem key={item.id} item={item} />
        ))}
      </ul>
    )
  }

  return (
    <ul className="flex flex-col gap-1 md:flex-row md:items-center md:gap-6" role="list">
      {items.map((item) => (
        <DesktopNavItem key={item.id} item={item} />
      ))}
    </ul>
  )
}
