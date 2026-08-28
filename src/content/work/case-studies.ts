import { SITE_LINKS } from '@/lib/site'

export type WorkCaseStudy = {
  slug: string
  title: string
  tagline: string
  description: string
  href?: string
  externalHref?: string
  linkLabel: string
  sections: { heading: string; body: string[] }[]
  stack: string[]
}

export const WORK_CASE_STUDIES: WorkCaseStudy[] = [
  {
    slug: 'llm-prompt-studio',
    title: 'LLM Prompt Studio',
    tagline: 'Self-hosted prompt control plane for ComfyUI, cloud engines, and production creative pipelines',
    description:
      'An MIT-licensed Next.js app that turns keywords and topics into model-ready prompts for image, video, audio, and 3D — with Cast character homes, Roleplay beats, gallery review, Play mode, Mobile Studio, and queue-time workflow takeover into ComfyUI or Fal/Replicate/Grok/Gemini when you skip the graph editor.',
    href: SITE_LINKS.promptStudio,
    externalHref: SITE_LINKS.promptStudioGithub,
    linkLabel: 'Read the docs on robmcd.name',
    stack: [
      'Next.js',
      'TypeScript',
      'ComfyUI',
      'Fal / Replicate / Grok',
      'Tauri desktop',
      'Docker',
      'SQLite',
    ],
    sections: [
      {
        heading: 'The problem',
        body: [
          'ComfyUI excels at rendering, but teams still paste prompts into CLIP nodes, Discord pins, and spreadsheets. Switching FLUX ↔ SDXL ↔ Qwen silently breaks tag density and length limits. Gallery folders become unsearchable PNG dumps with no shared character bible or campaign structure.',
          'Prompt Studio owns the text layer: generate, format, lint, character bibles, Cast homes, Roleplay beats, batch review, and handoff into ComfyUI or cloud engines — without replacing the graph editor or locking you into one vendor.',
        ],
      },
      {
        heading: 'What shipped',
        body: [
          '28+ tool routes across Generate, Refine, Compose, Image → Prompt, Cast, Roleplay, Mobile Studio, Gallery, and Integration. 40+ ComfyUI model targets with family-aware scaffolds, plus optional cloud stills and clips when local VRAM is not the bottleneck.',
          'Four workspace modes (Simple · Play · Studio · Full), Draft/Final/Max quality profiles, semantic gallery search, keyboard review ratings, and workflow takeover that injects live prompt values at ComfyUI queue time — no graph rebuild between iterations.',
          'Desktop installers (.dmg / .exe / .deb) via Tauri, Docker image at ghcr.io/doodersrage/llm-prompt-studio, and local-first persistence (IndexedDB in the browser; SQLite server-side with optional multi-user auth for team deployments).',
          'Narrative docs and interactive demos live on robmcd.name at /llm-prompt-studio; operator reference (env tables, API catalog, release process) lives on GitHub Pages.',
        ],
      },
      {
        heading: 'Outcome',
        body: [
          'A reusable open-source product that doubles as a portfolio piece for LLM tooling, ComfyUI integration, and edge-ready Next.js architecture — the same stack this marketing site runs on. Creators get a missing text layer between their LLM and their render farm, with an escape hatch to cloud when ComfyUI is not in the loop.',
        ],
      },
    ],
  },
  {
    slug: 'thermaltrace',
    title: 'ThermalTrace',
    tagline: 'Probe curves, freeze-aware alerts, and household-ready monitoring — from Arduino to Astro on Cloudflare',
    description:
      'An open-source temperature monitoring platform (live at garage-temp.robmcd.name) that tracks, logs, and analyzes probe curves with outdoor weather context, NWS-backed freeze risk, multi-channel alerts, and 89+ guides from sensor wire to signed-in dashboard.',
    externalHref: SITE_LINKS.thermalTrace,
    linkLabel: 'Open ThermalTrace',
    stack: [
      'Astro',
      'Cloudflare Workers',
      'Supabase',
      'DHT22 / ESP32',
      'FastAPI relay',
      'Stripe',
      'PWA',
    ],
    sections: [
      {
        heading: 'The problem',
        body: [
          'Garages, workshops, and outbuildings swing hard with seasons, sun load, and door events. A single thermometer reading does not tell you whether pipes, batteries, or stored goods are at risk — especially without outdoor context or forecast-aware freeze warnings.',
          'Most hobby dashboards stop at “show a number.” ThermalTrace closes the loop: probe placement, multi-zone layout, historical curves, freeze thresholds derived from history, and alerts before damage — not after.',
        ],
      },
      {
        heading: 'What shipped',
        body: [
          'Public live dashboard with three probe zones, outdoor weather comparison, and an interactive probe demo that mirrors the real JSON feed rhythm. Freeze-aware alerts combine threshold rules, forecast data, and NWS-backed cold risk across email, SMS, push, and HMAC webhooks.',
          'Hardware paths for ESP/Arduino HTTPS ingest and typed JSON feeds, plus a FastAPI relay with Redis caching for stable endpoints from flaky home uplinks. Kit QR onboarding, ESP32 OTA, and open firmware in arduino-network-json-temperature-sever.',
          'Accounts via Supabase auth, household sharing without password handoffs, Stripe subscriptions for Pro alert channels and CSV history export, and a PWA install path for desktop and mobile status checks.',
          '89+ searchable guides on robmcd.name’s ThermalTrace About hub — probe mounting, DHT22 wiring, seasonal patterns, ingest API, data flow, middleware auth, and the full sensor-to-chart pipeline documented for anyone rebuilding the stack.',
        ],
      },
      {
        heading: 'Outcome',
        body: [
          'A working product visitors can open immediately — not a mockup. Useful for clients who need IoT dashboards, telemetry UIs, alert routing, or “sensor to screen” architecture explained clearly. Sits alongside LLM Prompt Studio as proof of embedded + web craft under the robmcd.name brand.',
        ],
      },
    ],
  },
  {
    slug: 'legacy-stack-rescue',
    title: 'Legacy stack rescue & headless modernization',
    tagline: 'Stabilize first, then modernize without losing historical data',
    description:
      'Composite consulting pattern: repair aging Windows/Linux servers and C#/PHP apps, then bridge databases into a fast Next.js front end when the business is ready.',
    href: '/projects',
    linkLabel: 'View projects',
    stack: ['C# / .NET', 'PHP', 'MySQL', 'MSSQL', 'Next.js', 'Payload CMS'],
    sections: [
      {
        heading: 'The pattern',
        body: [
          'Inherited stacks rarely need a greenfield rewrite on day one. The first win is usually uptime, query performance, and patching — then a headless front end that keeps years of content intact.',
          'This write-up captures the consulting approach behind client work on robmcd.name: audit → stabilize → optimize → optionally modernize.',
        ],
      },
      {
        heading: 'Typical moves',
        body: [
          'Database bottleneck repair (MySQL/MSSQL), IIS/Nginx and OS hygiene, security patching, and hybrid architectures that keep established backends while shipping Next.js for speed.',
          'When appropriate, Payload or WordPress remains the content engine; the public site becomes a fast, maintainable edge front end.',
        ],
      },
    ],
  },
]

const SLUG_ALIASES: Record<string, string> = {
  'garage-temp': 'thermaltrace',
}

export function getWorkBySlug(slug: string): WorkCaseStudy | undefined {
  const resolved = SLUG_ALIASES[slug] ?? slug
  return WORK_CASE_STUDIES.find((w) => w.slug === resolved)
}
