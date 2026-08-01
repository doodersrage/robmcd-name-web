import Link from 'next/link'
import React from 'react'

import { DocInteractivePanel } from '@/app/components/comfyui-prompt-studio/DocInteractivePanel'
import type { DocBlock, DocPage } from '@/content/comfyui-prompt-studio/types'
import { slugToPath } from '@/content/comfyui-prompt-studio/pages'

function DocBlockRenderer({
  block,
  page,
}: {
  block: DocBlock
  page: DocPage
}) {
  switch (block.type) {
    case 'p':
      return <p className="text-base leading-relaxed text-slate-600 dark:text-zinc-400">{block.text}</p>
    case 'h2':
      return (
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-zinc-100 pt-4 first:pt-0">{block.text}</h2>
      )
    case 'h3':
      return <h3 className="text-xl font-semibold text-slate-900 dark:text-zinc-100 pt-2">{block.text}</h3>
    case 'ul':
      return (
        <ul className="list-disc space-y-2 pl-5 text-base leading-relaxed text-slate-600 marker:text-slate-400 dark:text-zinc-400 dark:marker:text-zinc-600">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )
    case 'ol':
      return (
        <ol className="list-decimal space-y-2 pl-5 text-base leading-relaxed text-slate-600 dark:text-zinc-400">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      )
    case 'callout': {
      const variants = {
        info: 'border-slate-300/80 bg-slate-50/80 dark:border-zinc-700 dark:bg-zinc-900/60',
        tip: 'border-emerald-300/60 bg-emerald-50/50 dark:border-emerald-800/60 dark:bg-emerald-950/30',
        warn: 'border-amber-300/60 bg-amber-50/50 dark:border-amber-800/60 dark:bg-amber-950/30',
      }
      return (
        <div className={`rounded-2xl border p-4 ${variants[block.variant]}`}>
          {block.title ? (
            <p className="mb-1 font-semibold text-slate-900 dark:text-zinc-100">{block.title}</p>
          ) : null}
          <p className="text-sm leading-relaxed text-slate-600 dark:text-zinc-400">{block.text}</p>
        </div>
      )
    }
    case 'code':
      return (
        <pre className="overflow-x-auto rounded-2xl border border-slate-200/80 dark:border-zinc-800/80 bg-slate-950 dark:bg-zinc-950 p-4 font-mono text-sm leading-relaxed text-emerald-400/90">
          <code>{block.code}</code>
        </pre>
      )
    case 'links':
      return (
        <ul className="flex list-none flex-wrap gap-3 pl-0">
          {block.items.map((item) =>
            item.external ? (
              <li key={item.href}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary text-sm"
                >
                  {item.label}
                </a>
              </li>
            ) : (
              <li key={item.href}>
                <Link href={item.href} className="btn btn-secondary text-sm">
                  {item.label}
                </Link>
              </li>
            ),
          )}
        </ul>
      )
    case 'stats':
      return (
        <div className="not-prose grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {block.items.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-900/80 p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
            >
              <p className="text-3xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">{item.value}</p>
              <p className="mt-1 font-semibold text-slate-800 dark:text-zinc-200">{item.label}</p>
              {item.detail ? (
                <p className="mt-1 text-xs text-slate-500 dark:text-zinc-500">{item.detail}</p>
              ) : null}
            </div>
          ))}
        </div>
      )
    case 'quote':
      return (
        <blockquote className="not-prose rounded-2xl border border-slate-200/80 dark:border-zinc-800/80 bg-slate-50/80 dark:bg-zinc-950/80 px-6 py-5">
          <p className="text-lg leading-relaxed text-slate-700 dark:text-zinc-300">&ldquo;{block.text}&rdquo;</p>
          <footer className="mt-4 text-sm text-slate-500 dark:text-zinc-500">
            <span className="font-semibold text-slate-800 dark:text-zinc-200">{block.attribution}</span>
            {block.role ? <span className="text-slate-500 dark:text-zinc-500"> · {block.role}</span> : null}
          </footer>
        </blockquote>
      )
    case 'comparison':
      return (
        <div className="not-prose grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-amber-200/80 bg-amber-50/30 p-5 dark:border-amber-900/50 dark:bg-amber-950/20">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-amber-800 dark:text-amber-400">
              Before
            </p>
            <ul className="space-y-2 text-sm leading-relaxed text-slate-700 dark:text-zinc-300">
              {block.before.map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden className="text-amber-600 dark:text-amber-500">
                    ✕
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/30 p-5 dark:border-emerald-900/50 dark:bg-emerald-950/20">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
              After
            </p>
            <ul className="space-y-2 text-sm leading-relaxed text-slate-700 dark:text-zinc-300">
              {block.after.map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden className="text-emerald-600 dark:text-emerald-500">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )
    case 'timeline':
      return (
        <ol className="not-prose space-y-4">
          {block.items.map((item, i) => (
            <li
              key={item.title}
              className="relative rounded-2xl border border-slate-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-900/80 p-5 pl-12 shadow-sm"
            >
              <span className="absolute left-4 top-5 flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white dark:bg-zinc-100 dark:text-zinc-900">
                {i + 1}
              </span>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-500">
                {item.phase}
              </p>
              <p className="mt-1 font-bold text-slate-900 dark:text-zinc-100">{item.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-zinc-400">{item.body}</p>
            </li>
          ))}
        </ol>
      )
    case 'interactive-slot':
      return page.interactive ? <DocInteractivePanel type={page.interactive} /> : null
    default:
      return null
  }
}

function pageUsesInteractiveSlot(page: DocPage): boolean {
  return page.blocks.some((b) => b.type === 'interactive-slot')
}

export function DocPageContent({ page, showLead = true }: { page: DocPage; showLead?: boolean }) {
  const inlineInteractive = pageUsesInteractiveSlot(page)

  return (
    <div className="doc-content space-y-6">
      {showLead ? (
        <p className="text-lg leading-relaxed text-slate-600 dark:text-zinc-400">{page.description}</p>
      ) : null}
      {!inlineInteractive && page.interactive ? <DocInteractivePanel type={page.interactive} /> : null}
      {page.blocks.map((block, i) => (
        <DocBlockRenderer key={`${block.type}-${i}`} block={block} page={page} />
      ))}
      {page.related && page.related.length > 0 ? (
        <div className="border-t border-slate-200/80 dark:border-zinc-800/80 pt-8">
          <h2 className="text-lg font-bold text-slate-900 dark:text-zinc-100">Related</h2>
          <ul className="mt-3 flex list-none flex-wrap gap-2 pl-0">
            {page.related.map((rel) => (
              <li key={rel}>
                <Link href={slugToPath(rel.split('/'))} className="skill-pill hover-lift">
                  {rel.split('/').pop()?.replace(/-/g, ' ')}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  )
}
