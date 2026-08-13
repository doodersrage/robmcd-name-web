'use client'

import { useMemo, useState } from 'react'

const FAMILIES = [
  { id: 'flux', name: 'FLUX / Chroma', limit: 280, style: 'Subject-first photographic prose; Dev, Schnell, 2, Klein variants' },
  { id: 'qwen', name: 'Qwen Image', limit: 512, style: 'Edit imperatives or factual T2I prose; ReferenceLatent on Refine/Compose' },
  { id: 'zimage', name: 'Z-Image', limit: 320, style: 'Photoreal T2I prose; Figure 1 VAEEncode img2img on Refine' },
  { id: 'boogu', name: 'Boogu Image', limit: 340, style: 'Photoreal T2I or short edit instructions via TextEncodeBooguEdit' },
  { id: 'sdxl', name: 'SDXL', limit: 400, style: 'Natural-language scene descriptions; Base, Refiner, SSD-1B, Segmind Vega' },
  { id: 'sd3', name: 'SD3 / AuraFlow', limit: 450, style: 'Longer NLP; quote visible text in "quotes"' },
  { id: 'sd15', name: 'Stable Diffusion', limit: 220, style: 'Short weighted tags or brief phrases; SD 1.5 / 2.x' },
  { id: 'hunyuan', name: 'Hunyuan / HiDream', limit: 380, style: 'Descriptive unified scene prose for DiT still-image targets' },
  { id: 'dit', name: 'Other DiT', limit: 360, style: 'PixArt, Lumina 2, OmniGen2, Kandinsky 5, Stable Cascade — architecture-tuned NLP' },
  { id: 'instruct', name: 'Instruct / Edit', limit: 200, style: 'Short imperative edit instructions; InstructPix2Pix, Lotus-D' },
  { id: 'video', name: 'WAN / Hunyuan / LTX Video', limit: 180, style: 'Motion-first, short clauses for T2V and I2V on Video tool' },
  { id: 'audio', name: 'Stable Audio', limit: 240, style: 'Audio prompts with {{AUDIO_SECONDS}} token on /audio' },
  { id: 'mesh', name: 'Hunyuan3D', limit: 260, style: 'Mesh generation prompts; optional reference image on /mesh' },
] as const

type FamilyId = (typeof FAMILIES)[number]['id']

export function ModelFamilyDemo() {
  const [filter, setFilter] = useState<FamilyId | null>(null)

  const visible = useMemo(
    () => (filter ? FAMILIES.filter((f) => f.id === filter) : FAMILIES),
    [filter],
  )

  return (
    <div className="not-prose my-8 space-y-4">
      <p className="text-sm leading-relaxed text-slate-600 dark:text-zinc-400">
        40+ ComfyUI model targets grouped by architecture family — filter to compare prompt style and length limits.
      </p>
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
            className="rounded-2xl border border-slate-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-900/80 p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <div className="flex items-baseline justify-between gap-2">
              <h4 className="font-bold text-slate-900 dark:text-zinc-100">{f.name}</h4>
              <span className="shrink-0 text-xs text-slate-500 dark:text-zinc-500">~{f.limit} chars</span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-zinc-400">{f.style}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
