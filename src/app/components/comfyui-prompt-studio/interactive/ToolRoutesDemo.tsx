'use client'

import Link from 'next/link'
import { useState } from 'react'

const TOOLS = [
  { route: '/', label: 'Generate', slug: 'generate/overview' },
  { route: '/format', label: 'Format', slug: 'format-and-lint/format' },
  { route: '/character', label: 'Character', slug: 'character/character-tool' },
  { route: '/gallery', label: 'Gallery', slug: 'gallery/gallery-overview' },
  { route: '/studio', label: 'Studio', slug: 'studio/history-lineage' },
  { route: '/video', label: 'Video', slug: 'media/video' },
  { route: '/workflow-editor', label: 'Workflow', slug: 'media/workflow-editor' },
  { route: '/settings', label: 'Settings', slug: 'getting-started/environment' },
]

const LIVE = 'http://localhost:47832'

export function ToolRoutesDemo() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <div className="not-prose my-8">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {TOOLS.map((tool) => (
          <Link
            key={tool.route}
            href={`/comfyui-prompt-studio/${tool.slug}`}
            onMouseEnter={() => setHovered(tool.route)}
            onMouseLeave={() => setHovered(null)}
            className={`rounded-2xl border border-slate-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-900/80 p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
              hovered === tool.route ? 'ring-2 ring-slate-300/80 dark:ring-zinc-600' : ''
            }`}
          >
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-zinc-500">
              {tool.route}
            </p>
            <p className="mt-1 font-bold text-slate-900 dark:text-zinc-100">{tool.label}</p>
          </Link>
        ))}
      </div>
      <p className="mt-4 text-center text-sm text-slate-600 dark:text-zinc-400">
        Open live tool:{' '}
        <a
          href={`${LIVE}${hovered ?? '/'}`}
          className="font-medium text-slate-900 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-600 dark:text-zinc-100 dark:decoration-zinc-600"
          target="_blank"
          rel="noopener noreferrer"
        >
          {LIVE}
          {hovered ?? '/dashboard'}
        </a>
      </p>
    </div>
  )
}
