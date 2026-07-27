'use client'

import { useState } from 'react'

const ENDPOINT = 'GET http://localhost:47832/api/prompts/current'

export function ApiEndpointDemo() {
  const [copied, setCopied] = useState(false)

  async function copy() {
    await navigator.clipboard.writeText(ENDPOINT)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="not-prose my-8 space-y-3">
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200/80 dark:border-zinc-800/80 bg-slate-950 dark:bg-zinc-950 px-4 py-3 font-mono text-sm text-emerald-400/90">
        <code>{ENDPOINT}</code>
        <button type="button" onClick={copy} className="btn btn-secondary shrink-0 text-xs">
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="overflow-x-auto rounded-2xl border border-slate-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-900/80 p-4 text-xs leading-relaxed text-slate-700 dark:text-zinc-300">
        {`{
  "positive": "young woman, red windbreaker, city street...",
  "negative": "low quality, blurry, watermark",
  "modelFamily": "flux",
  "detailLevel": "balanced",
  "updatedAt": "2026-07-27T14:00:00.000Z"
}`}
      </pre>
    </div>
  )
}
