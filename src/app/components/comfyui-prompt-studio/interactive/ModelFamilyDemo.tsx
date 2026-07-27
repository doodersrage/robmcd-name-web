'use client'

import { useMemo, useState } from 'react'

const FAMILIES = [
  { id: 'sdxl', name: 'SDXL', limit: 400, style: 'Quality tags, medium, structured commas' },
  { id: 'flux', name: 'Flux', limit: 280, style: 'Natural phrases, brevity preferred' },
  { id: 'qwen', name: 'Qwen Edit', limit: 512, style: 'Imperative edit instructions' },
  { id: 'hunyuan', name: 'Hunyuan Video', limit: 180, style: 'Motion-first, short clauses' },
  { id: 'sd15', name: 'SD 1.5', limit: 220, style: 'Classic tag soup, danbooru hints' },
] as const

export function ModelFamilyDemo() {
  const [filter, setFilter] = useState<string | null>(null)

  const visible = useMemo(
    () => (filter ? FAMILIES.filter((f) => f.id === filter) : FAMILIES),
    [filter],
  )

  return (
    <div className="not-prose my-8 space-y-4">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setFilter(null)}
          className={`skill-pill cursor-pointer ${filter === null ? 'ring-2 ring-slate-400/80 dark:ring-zinc-500' : ''}`}
        >
          All families
        </button>
        {FAMILIES.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            className={`skill-pill cursor-pointer transition-transform duration-300 hover:scale-105 ${
              filter === f.id ? 'ring-2 ring-slate-400/80 dark:ring-zinc-500' : ''
            }`}
          >
            {f.name}
          </button>
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {visible.map((f, i) => (
          <div
            key={f.id}
            className="rounded-2xl border border-slate-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-900/80 p-4 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <div className="flex items-baseline justify-between gap-2">
              <h4 className="font-bold text-slate-900 dark:text-zinc-100">{f.name}</h4>
              <span className="text-xs text-slate-500 dark:text-zinc-500">~{f.limit} chars</span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-zinc-400">{f.style}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
