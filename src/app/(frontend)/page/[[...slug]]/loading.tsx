import React from 'react'

export default function PageLoading() {
  return (
    <article className="mx-auto w-full max-w-5xl space-y-12 md:space-y-24">
      <div className="card animate-pulse">
        <div className="card-content space-y-6">
          <div className="h-4 w-32 rounded-lg bg-slate-200 dark:bg-zinc-800" />
          <div className="h-12 w-3/4 max-w-lg rounded-xl bg-slate-200 dark:bg-zinc-800" />
          <div className="space-y-2">
            <div className="h-4 w-full rounded bg-slate-200 dark:bg-zinc-800" />
            <div className="h-4 w-5/6 rounded bg-slate-200 dark:bg-zinc-800" />
          </div>
          <div className="flex gap-3 pt-2">
            <div className="h-10 w-28 rounded-xl bg-slate-200 dark:bg-zinc-800" />
            <div className="h-10 w-28 rounded-xl bg-slate-200 dark:bg-zinc-800" />
          </div>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="glass-card h-40 animate-pulse bg-slate-100/80 dark:bg-zinc-900/80" />
        ))}
      </div>
    </article>
  )
}
