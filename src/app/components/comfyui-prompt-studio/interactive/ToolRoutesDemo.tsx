'use client'

import Link from 'next/link'
import { useState } from 'react'

const TOOLS = [
  { route: '/dashboard', label: 'Dashboard', slug: 'introduction/architecture' },
  { route: '/', label: 'Generate', slug: 'generate/overview' },
  { route: '/format', label: 'Format', slug: 'format-and-lint/format' },
  { route: '/lint', label: 'Lint', slug: 'format-and-lint/lint' },
  { route: '/refine', label: 'Refine', slug: 'format-and-lint/refine' },
  { route: '/character', label: 'Character', slug: 'character/character-tool' },
  { route: '/pet', label: 'Pet', slug: 'character/pet-fantasy' },
  { route: '/fantasy', label: 'Fantasy', slug: 'character/pet-fantasy' },
  { route: '/topics', label: 'Topics', slug: 'character/background-topics' },
  { route: '/background', label: 'Background', slug: 'character/background-topics' },
  { route: '/image-prompt', label: 'Image → Prompt', slug: 'image-tools/image-to-prompt' },
  { route: '/inpaint', label: 'Inpaint', slug: 'image-tools/inpaint-outpaint' },
  { route: '/outpaint', label: 'Outpaint', slug: 'image-tools/inpaint-outpaint' },
  { route: '/compose', label: 'Compose', slug: 'image-tools/compose-transfer' },
  { route: '/controlnet', label: 'ControlNet', slug: 'image-tools/controlnet' },
  { route: '/variations', label: 'Variations', slug: 'image-tools/variations-matrix' },
  { route: '/video', label: 'Video', slug: 'media/video' },
  { route: '/audio', label: 'Audio', slug: 'media/audio' },
  { route: '/mesh', label: '3D Mesh', slug: 'media/mesh-3d' },
  { route: '/workflow-editor', label: 'Workflow editor', slug: 'media/workflow-editor' },
  { route: '/negative', label: 'Negative', slug: 'format-and-lint/negative' },
  { route: '/studio', label: 'Studio', slug: 'studio/history-lineage' },
  { route: '/gallery', label: 'Gallery', slug: 'gallery/gallery-overview' },
  { route: '/settings', label: 'Settings', slug: 'getting-started/environment' },
  { route: '/plugins', label: 'Plugins', slug: 'integration/http-api' },
] as const

const LIVE = 'http://localhost:47832'

export function ToolRoutesDemo() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <div className="not-prose my-8">
      <p className="mb-4 text-sm leading-relaxed text-slate-600 dark:text-zinc-400">
        25+ tool routes — click a card for docs, hover for the live local URL (Node.js 22+, port 47832).
      </p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
        {TOOLS.map((tool) => (
          <Link
            key={tool.route}
            href={`/comfyui-prompt-studio/${tool.slug}`}
            onMouseEnter={() => setHovered(tool.route)}
            onMouseLeave={() => setHovered(null)}
            className={`rounded-2xl border border-slate-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-900/80 p-3 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${
              hovered === tool.route ? 'ring-2 ring-slate-300/80 dark:ring-zinc-600' : ''
            }`}
          >
            <p className="truncate text-[10px] font-medium uppercase tracking-wide text-slate-500 dark:text-zinc-500">
              {tool.route}
            </p>
            <p className="mt-0.5 truncate text-sm font-bold text-slate-900 dark:text-zinc-100">{tool.label}</p>
          </Link>
        ))}
      </div>
      <p className="mt-4 text-center text-sm text-slate-600 dark:text-zinc-400">
        Open live tool:{' '}
        <a
          href={`${LIVE}${hovered ?? '/dashboard'}`}
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
