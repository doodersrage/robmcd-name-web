import React from 'react'

type PageShellProps = {
  title?: string | null
  children: React.ReactNode
}

export function PageShell({ title, children }: PageShellProps) {
  return (
    <article className="mx-auto max-w-4xl">
      <div className="card">
        <div className="card-content">
          {title ? <h1 className="page-title">{title}</h1> : null}
          {children}
        </div>
      </div>
    </article>
  )
}

export function createPuckPageWrapper(title?: string | null) {
  return function PuckPageWrapper({ children }: { children: React.ReactNode }) {
    return (
      <PageShell title={title}>
        <div className="puck-page">{children}</div>
      </PageShell>
    )
  }
}
