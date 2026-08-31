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
    tagline: 'Prompt, queue, and ship films — ComfyUI takeover plus cloud stills and clips',
    description:
      'An MIT-licensed Next.js studio that turns topics into model-ready prompts for image, video, audio, and 3D. Heal & ready on first launch, Play campaign loops (Moodboard → Cut → Cast), Mobile Studio, workflow takeover, and optional Fal/Replicate/Grok/Gemini when you skip the local graph.',
    href: SITE_LINKS.promptStudio,
    externalHref: SITE_LINKS.promptStudioGithub,
    linkLabel: 'Read the docs on robmcd.name',
    stack: [
      'Next.js',
      'TypeScript',
      'ComfyUI',
      'Fal / Replicate / Grok / Gemini',
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
          '25+ tool routes across Generate, Format, Refine, Compose, Image → Prompt, Inpaint/Outpaint, Character, Cast, Roleplay, Video, Audio, 3D Mesh, Gallery, Variations, ControlNet, Workflow editor, Plugins, and Mobile Studio. 40+ ComfyUI image targets (FLUX including Klein, Qwen Image, Z-Image, Boogu, SDXL, Hunyuan, WAN video, and more) with family-aware scaffolds.',
          'Four workspace modes (Simple · Play · Studio · Full). Play campaigns run Moodboard → Fitting → Day → Roleplay → Cut film → Save to Cast. Draft/Final/Max quality profiles, semantic gallery search, keyboard review ratings, and workflow takeover that patches live prompt values at ComfyUI queue time.',
          'Heal & ready on first launch, optional Diffusers stills sidecar, cloud engines for stills and clips (Fal, Replicate, Grok, Gemini; ChatGPT stills), desktop installers via Tauri, Docker at ghcr.io/doodersrage/llm-prompt-studio, and local-first persistence (IndexedDB + server SQLite with optional multi-user auth).',
          'Narrative docs and interactive demos live on robmcd.name at /llm-prompt-studio; operator reference (env tables, API catalog, Play guide, release process) lives on GitHub Pages.',
        ],
      },
      {
        heading: 'Outcome',
        body: [
          'A reusable open-source product that doubles as a portfolio piece for LLM tooling, ComfyUI integration, and edge-ready Next.js architecture — the same stack this marketing site runs on. Creators get a missing text layer between their LLM and their render farm, with a 10-minute still→clip→Cast loop and an escape hatch to cloud when ComfyUI is not in the loop.',
        ],
      },
    ],
  },
  {
    slug: 'thermaltrace',
    title: 'ThermalTrace',
    tagline: 'Garage and workshop sensors — live curves, freeze alerts, and household sharing',
    description:
      'Open-source monitoring at thermaltrace.dev for ESP32, Arduino, or any HTTPS JSON probe. Temperature, humidity, flood, door, power, air quality, and more — with freeze-aware alerts, history tiers, PWA install, and free / Member / Pro plans.',
    externalHref: SITE_LINKS.thermalTrace,
    linkLabel: 'Open ThermalTrace',
    stack: [
      'Astro',
      'Cloudflare Workers',
      'Supabase',
      'ESP32 / Arduino',
      'MQTT bridge',
      'Stripe',
      'PWA',
    ],
    sections: [
      {
        heading: 'The problem',
        body: [
          'Garages, workshops, and outbuildings swing hard with seasons, sun load, and door events. A single thermometer reading does not tell you whether pipes, batteries, or stored goods are at risk — especially without outdoor context or forecast-aware freeze warnings.',
          'Most hobby dashboards stop at “show a number.” ThermalTrace closes the loop: push a device, map sensors, watch live curves, and get alerts before damage — not after.',
        ],
      },
      {
        heading: 'What shipped',
        body: [
          'Three steps to first reading: create a push device, POST JSON (or pull HTTPS feeds), then set freeze thresholds and test alerts. Works with ESP32, Arduino, HTTPS JSON push/pull, MQTT bridge, and Home Assistant webhooks — MQTT can stay on the LAN while ThermalTrace mirrors over HTTPS for household alerts.',
          'Sensor types beyond temperature: humidity, CO₂, pressure, PM2.5, VOC, water level, energy, doors, power, flood, and motion. Threshold freeze and automatic leak alerts on every plan; Member adds forecast cold-risk; Pro adds official NWS freeze alerts plus SMS, WhatsApp, browser push, webhooks, guest share links, and a printable claims evidence pack.',
          'Alert channels include email, Discord, Telegram, and Slack; Telegram bots support /status, /snooze, and /vacation replies. Free forever with live curves and 7-day history; Member ($4/mo) and Pro ($10/mo) unlock longer retention, CSV export, and more devices. PWA install for phone home-screen access; native Android app coming soon.',
          'Public live demo, About guides, sample Arduino and MicroPython sketches, and operator docs at doodersrage.github.io/thermaltrace — source at github.com/doodersrage/thermaltrace.',
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
