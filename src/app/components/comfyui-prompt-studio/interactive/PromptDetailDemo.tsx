'use client'

import { useState } from 'react'

const LEVELS = {
  concise: {
    label: 'Concise',
    sample:
      'woman in red jacket, city street, golden hour, shallow depth of field',
    chars: 68,
  },
  balanced: {
    label: 'Balanced',
    sample:
      'young woman wearing a red windbreaker with reflective trim, standing on a rain-slick city street, warm golden hour light, cinematic composition, shallow depth of field, 85mm lens',
    chars: 168,
  },
  rich: {
    label: 'Rich',
    sample:
      'masterpiece, best quality, young woman wearing a fitted red windbreaker with reflective trim and silver zipper, standing confidently on a rain-slick urban street at dusk, warm golden hour rim light, neon signs reflected in puddles, cinematic wide-angle composition, shallow depth of field, bokeh city lights, 85mm f/1.4, film grain, editorial fashion photography',
    chars: 312,
  },
} as const

type Level = keyof typeof LEVELS

export function PromptDetailDemo() {
  const [level, setLevel] = useState<Level>('balanced')
  const current = LEVELS[level]

  return (
    <div className="not-prose my-8 space-y-4">
      <div className="flex gap-2">
        {(Object.keys(LEVELS) as Level[]).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setLevel(key)}
            className={`skill-pill cursor-pointer transition-all duration-300 ${
              level === key ? 'ring-2 ring-slate-400/80 dark:ring-zinc-500 scale-105' : ''
            }`}
          >
            {LEVELS[key].label}
          </button>
        ))}
      </div>
      <div className="rounded-2xl border border-slate-200/80 dark:border-zinc-800/80 bg-slate-950 dark:bg-zinc-950 p-5 font-mono text-sm leading-relaxed text-emerald-400/90 shadow-inner">
        <span key={level} className="block transition-opacity duration-300">
          {current.sample}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-zinc-800">
          <div
            className="h-full rounded-full bg-slate-700 dark:bg-zinc-400 transition-all duration-500 ease-out"
            style={{ width: `${Math.min(100, (current.chars / 400) * 100)}%` }}
          />
        </div>
        <span className="text-sm tabular-nums text-slate-600 dark:text-zinc-400">{current.chars} chars</span>
      </div>
    </div>
  )
}
