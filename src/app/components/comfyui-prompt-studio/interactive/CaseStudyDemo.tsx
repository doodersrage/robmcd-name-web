'use client'

import { useState } from 'react'

const PHASES = [
  {
    id: 'week1',
    week: 'Week 1',
    title: 'Baseline chaos',
    metric: '34% wasted renders',
    body: 'Maya kept prompts in three places. Flux shots looked great; SDXL exports for print failed lint silently. Gallery was an unsorted output folder.',
  },
  {
    id: 'week2',
    week: 'Week 2',
    title: 'Character bible + lint',
    metric: '12 min → 4 min per prompt',
    body: 'Imported the lead character into /character, attached wardrobe catalog tokens, and ran Format + Lint before every queue. Workflow takeover replaced static CLIP strings.',
  },
  {
    id: 'week3',
    week: 'Week 3',
    title: 'Campaign batch',
    metric: '48 frames / 2 evenings',
    body: 'Studio campaign tied 12 episode topics to templates. Draft quality for exploration, Final for delivery. Review mode culled rejects without opening Finder.',
  },
  {
    id: 'week4',
    week: 'Week 4',
    title: 'Analytics loop',
    metric: '91% character consistency',
    body: 'Studio analytics surfaced high-rated lighting tags. Param experiment queue swept CFG on the best gallery frame. Client signed off the series bible export.',
  },
]

export function CaseStudyDemo() {
  const [active, setActive] = useState(0)
  const phase = PHASES[active]!

  return (
    <div className="not-prose my-8">
      <div className="flex gap-1 overflow-x-auto pb-2">
        {PHASES.map((p, i) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setActive(i)}
            className={`shrink-0 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-300 ${
              active === i
                ? 'bg-slate-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800'
            }`}
          >
            {p.week}
          </button>
        ))}
      </div>

      <div
        key={phase.id}
        className="mt-4 rounded-2xl border border-slate-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-900/80 p-6 shadow-sm transition-all duration-300"
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-500">
              {phase.week}
            </p>
            <h4 className="mt-1 text-xl font-bold text-slate-900 dark:text-zinc-100">{phase.title}</h4>
          </div>
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            {phase.metric}
          </span>
        </div>
        <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-zinc-400">{phase.body}</p>

        <ol className="mt-6 flex gap-2">
          {PHASES.map((_, i) => (
            <li key={i}>
              <button
                type="button"
                aria-label={`Go to ${PHASES[i]!.week}`}
                onClick={() => setActive(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === active ? 'w-8 bg-slate-800 dark:bg-zinc-200' : 'w-2 bg-slate-300 dark:bg-zinc-700'
                }`}
              />
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
