'use client'

import React from 'react'
import { ThemeProvider } from '@delmaredigital/payload-puck/theme'
import { LandingShell, PageShell } from './PageShell'
import { cn } from '@/lib/cn'

type PageLayout = 'default' | 'landing' | 'full-width'

type PuckPageWrapperProps = {
  title?: string | null
  pageLayout?: PageLayout
  children: React.ReactNode
}

const siteTheme = {
  buttonVariants: {
    default: {
      classes: 'bg-[var(--ink)] text-[var(--canvas)] hover:bg-[var(--accent)] hover:text-[#f4f7f4]',
    },
    secondary: {
      classes:
        'border border-[var(--line)] bg-transparent text-[var(--ink)] hover:border-[var(--ink)]',
    },
    outline: {
      classes: 'border border-[var(--line)] bg-transparent text-[var(--ink)] hover:border-[var(--ink)]',
    },
    ghost: {
      classes: 'bg-transparent text-[var(--ink)] hover:bg-[var(--paper)]',
    },
  },
  focusRingColor: 'focus:ring-[var(--accent)]',
  colorPresets: [
    { hex: '#1f6a4a', label: 'Pine' },
    { hex: '#1a211c', label: 'Ink' },
    { hex: '#eef1ee', label: 'Paper' },
    { hex: '#3d7a62', label: 'Moss' },
    { hex: '#141814', label: 'Night' },
    { hex: '#e6ebe4', label: 'Mist' },
  ],
}

function PuckContent({ pageLayout, children }: { pageLayout: PageLayout; children: React.ReactNode }) {
  const layoutClass =
    pageLayout === 'full-width' ? 'puck-page-wide' : pageLayout === 'landing' ? 'puck-page-landing' : 'puck-page'

  return <div className={cn(layoutClass)}>{children}</div>
}

export function PuckPageWrapper({ title, pageLayout = 'default', children }: PuckPageWrapperProps) {
  const shell =
    pageLayout === 'landing' || pageLayout === 'full-width' ? (
      <LandingShell>
        <PuckContent pageLayout={pageLayout}>{children}</PuckContent>
      </LandingShell>
    ) : (
      <PageShell title={title} showTitle={false}>
        <PuckContent pageLayout={pageLayout}>{children}</PuckContent>
      </PageShell>
    )

  return <ThemeProvider theme={siteTheme}>{shell}</ThemeProvider>
}
