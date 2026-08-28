import React from 'react'

export default function PageLoading() {
  return (
    <article className="mx-auto w-full max-w-5xl space-y-12 md:space-y-20">
      <div className="animate-pulse space-y-6">
        <div className="h-3 w-28 bg-[var(--line)]" />
        <div className="h-12 w-3/4 max-w-lg bg-[var(--line)]" />
        <div className="space-y-2">
          <div className="h-4 w-full bg-[var(--line)]" />
          <div className="h-4 w-5/6 bg-[var(--line)]" />
        </div>
      </div>
    </article>
  )
}
