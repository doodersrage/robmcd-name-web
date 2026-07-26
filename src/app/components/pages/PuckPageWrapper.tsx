'use client'

import React from 'react'
import { ThemeProvider } from '@delmaredigital/payload-puck/theme'
import { PageShell } from './PageShell'

type PuckPageWrapperProps = {
  title?: string | null
  children: React.ReactNode
}

const siteTheme = {
  buttonVariants: {
    default: {
      classes: 'bg-indigo-600 text-zinc-50 hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400',
    },
    secondary: {
      classes: 'border border-slate-200/80 bg-white/80 text-slate-700 hover:bg-slate-50 dark:border-zinc-800/80 dark:bg-zinc-900/80 dark:text-zinc-300 dark:hover:bg-zinc-800/80',
    },
    outline: {
      classes: 'border border-slate-200/80 bg-transparent text-slate-700 hover:bg-slate-50 dark:border-zinc-800/80 dark:text-zinc-300 dark:hover:bg-zinc-800/80',
    },
    ghost: {
      classes: 'bg-transparent text-slate-700 hover:bg-slate-100 dark:text-zinc-300 dark:hover:bg-zinc-800',
    },
  },
  focusRingColor: 'focus:ring-indigo-500/30',
  colorPresets: [
    { hex: '#6366f1', label: 'Indigo' },
    { hex: '#4f46e5', label: 'Indigo Dark' },
    { hex: '#0f172a', label: 'Slate Dark' },
    { hex: '#f4f4f5', label: 'Zinc Light' },
    { hex: '#a1a1aa', label: 'Zinc Muted' },
  ],
}

export function PuckPageWrapper({ title, children }: PuckPageWrapperProps) {
  return (
    <ThemeProvider theme={siteTheme}>
      <PageShell title={title} showTitle={false}>
        <div className="puck-page">{children}</div>
      </PageShell>
    </ThemeProvider>
  )
}
