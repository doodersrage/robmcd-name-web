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
      classes:
        'bg-gradient-to-r from-indigo-500 to-violet-600 text-white hover:from-indigo-400 hover:to-violet-500 shadow-lg shadow-indigo-500/20',
    },
    secondary: {
      classes:
        'border border-slate-200/80 bg-white/80 text-slate-700 backdrop-blur-md hover:bg-slate-50 dark:border-zinc-800/80 dark:bg-zinc-900/80 dark:text-zinc-300 dark:hover:bg-zinc-800/80',
    },
    outline: {
      classes:
        'border border-slate-200/80 bg-transparent text-slate-700 hover:bg-slate-50 dark:border-zinc-800/80 dark:text-zinc-300 dark:hover:bg-zinc-800/80',
    },
    ghost: {
      classes: 'bg-transparent text-slate-700 hover:bg-slate-100 dark:text-zinc-300 dark:hover:bg-zinc-800',
    },
  },
  focusRingColor: 'focus:ring-indigo-500/30',
  colorPresets: [
    { hex: '#6366f1', label: 'Indigo' },
    { hex: '#8b5cf6', label: 'Violet' },
    { hex: '#22d3ee', label: 'Cyan' },
    { hex: '#34d399', label: 'Emerald' },
    { hex: '#0f172a', label: 'Slate Dark' },
    { hex: '#f4f4f5', label: 'Zinc Light' },
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
