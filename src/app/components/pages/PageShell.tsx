import React from 'react'

type PageShellProps = {
  title?: string | null
  showTitle?: boolean
  children: React.ReactNode
}

export function PageShell({ title, showTitle = true, children }: PageShellProps) {
  return (
    <article className="mx-auto w-full max-w-5xl space-y-12 md:space-y-24">
      <div className="card">
        <div className="card-content">
          {showTitle && title ? <h1 className="page-title">{title}</h1> : null}
          {children}
        </div>
      </div>
    </article>
  )
}

export function LandingShell({ children }: { children: React.ReactNode }) {
  return <article className="mx-auto w-full max-w-5xl space-y-12 md:space-y-24">{children}</article>
}

export function createPuckPageWrapper(title?: string | null) {
  return function PuckPageWrapper({ children }: { children: React.ReactNode }) {
    return (
      <PageShell title={title} showTitle={false}>
        <div className="puck-page">{children}</div>
      </PageShell>
    )
  }
}
