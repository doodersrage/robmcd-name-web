import React from 'react'

export function SearchFallback() {
  return (
    <div className="w-full md:w-auto" aria-hidden="true">
      <div className="flex gap-2">
        <div className="input-field h-10 w-full animate-pulse bg-slate-200/60 md:w-64 dark:bg-zinc-800/60" />
        <div className="btn btn-primary h-10 w-24 animate-pulse opacity-60" />
      </div>
    </div>
  )
}
