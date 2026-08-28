import React from 'react'

type PageShellProps = {
  title?: string | null
  showTitle?: boolean
  children: React.ReactNode
}

export function PageShell({ title, showTitle = true, children }: PageShellProps) {
  return (
    <article className="mx-auto w-full max-w-5xl space-y-12 md:space-y-20">
      {showTitle && title ? <h1 className="page-title">{title}</h1> : null}
      {children}
    </article>
  )
}

export function LandingShell({ children }: { children: React.ReactNode }) {
  return <article className="mx-auto w-full max-w-5xl space-y-16 md:space-y-24">{children}</article>
}
