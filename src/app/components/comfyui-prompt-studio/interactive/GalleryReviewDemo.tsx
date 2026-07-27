'use client'

import { useCallback, useEffect, useState } from 'react'

const ITEMS = [
  { id: 1, label: 'Golden hour street portrait', seed: 42891 },
  { id: 2, label: 'Neon alley variant', seed: 42892 },
  { id: 3, label: 'Wide cinematic take', seed: 42893 },
]

export function GalleryReviewDemo() {
  const [index, setIndex] = useState(0)
  const [ratings, setRatings] = useState<Record<number, number>>({})
  const item = ITEMS[index]!

  const rate = useCallback(
    (score: number) => {
      setRatings((r) => ({ ...r, [item.id]: score }))
      setIndex((i) => Math.min(i + 1, ITEMS.length - 1))
    },
    [item.id],
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const n = Number(e.key)
      if (n >= 1 && n <= 5) {
        e.preventDefault()
        rate(n)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [rate])

  return (
    <div className="not-prose my-8 rounded-2xl border border-slate-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-900/80 p-6 shadow-sm">
      <p className="text-sm text-slate-600 dark:text-zinc-400">
        Press <kbd className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs dark:bg-zinc-800">1</kbd>
        –
        <kbd className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs dark:bg-zinc-800">5</kbd> to rate
      </p>
      <div
        key={item.id}
        className="mt-4 flex aspect-video items-center justify-center rounded-xl bg-gradient-to-br from-slate-200 to-slate-100 dark:from-zinc-800 dark:to-zinc-900 transition-opacity duration-200"
      >
        <div className="text-center">
          <p className="font-bold text-slate-800 dark:text-zinc-200">{item.label}</p>
          <p className="mt-1 text-sm text-slate-500 dark:text-zinc-500">seed {item.seed}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => rate(n)}
            className="btn btn-secondary min-w-[2.5rem] px-3 py-1.5 text-sm"
          >
            {n}
          </button>
        ))}
      </div>
      {Object.keys(ratings).length > 0 ? (
        <ul className="mt-4 space-y-1 text-sm text-slate-600 dark:text-zinc-400">
          {ITEMS.filter((i) => ratings[i.id]).map((i) => (
            <li key={i.id}>
              {i.label}: {'★'.repeat(ratings[i.id]!)}
              {'☆'.repeat(5 - ratings[i.id]!)}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
