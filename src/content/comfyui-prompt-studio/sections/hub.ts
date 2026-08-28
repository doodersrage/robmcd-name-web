import { DOCS_BASE_PATH, DOCS_SITE, GH, LIVE, RELEASES, p, page } from '../helpers'
import { SITE_LINKS } from '@/lib/site'

export const hubPages = [
  page(
    [],
    'LLM Prompt Studio',
    'Model-aware prompts for image, video, audio, and 3D — ComfyUI, cloud engines, Cast, and gallery orchestration.',
    'Hub',
    0,
    [
      ...p(
        'LLM Prompt Studio (canonical repo: github.com/doodersrage/llm-prompt-studio; the old comfyui-prompt-studio name redirects here) is a self-hosted Next.js app that turns keywords or topics into model-specific prompts for image, video, audio, and 3D workflows. ComfyUI remains the primary local render engine; optional cloud engines (Fal, Replicate, ChatGPT, Gemini, Grok) and Diffusers cover stills and clips when you skip the graph editor.',
        'The app ships 28+ tool routes, 40+ model targets, four workspace modes (Simple · Play · Studio · Full), Play mode with Cast homes and Roleplay beats, Mobile Studio for phone-first queues, desktop Tauri installers, Docker images, and local-first persistence — IndexedDB via Dexie in the browser for settings, history, and gallery, with server-side SQLite and optional multi-user auth when you expose it to a team.',
      ),
      {
        type: 'callout',
        variant: 'info',
        title: 'Get it running',
        text: `Local dev: ${LIVE} (Node.js 22+). Desktop: GitHub Releases (.dmg / .exe / .deb). Docker: ghcr.io/doodersrage/llm-prompt-studio:latest. Full searchable docs at ${DOCS_SITE}.`,
      },
      {
        type: 'links',
        items: [
          { label: 'GitHub repository', href: GH, external: true },
          { label: 'GitHub Releases (desktop)', href: RELEASES, external: true },
          { label: 'Official docs site', href: DOCS_SITE, external: true },
          { label: 'Open dashboard (local)', href: `${LIVE}/dashboard`, external: true },
        ],
      },
      { type: 'h2', text: 'What this guide covers' },
      {
        type: 'ul',
        items: [
          'Sales pitch and case study for production ComfyUI and cloud hybrid workflows',
          'Tool routes from Generate through Cast, Roleplay, Mobile Studio, Gallery, and Integration',
          '40+ model families — FLUX, Qwen, Z-Image, Boogu, SDXL, WAN video, Stable Audio, Hunyuan3D',
          'Play mode, cloud inference engines, desktop/Docker install, and interactive demos',
        ],
      },
      { type: 'h2', text: 'Documentation on this site vs GitHub' },
      ...p(
        'This section on robmcd.name is the narrative hub — sales pitch, case study, interactive demos, and guided tool docs. Operator reference (env tables, API catalog, release process) lives on the official GitHub Pages docs site linked below. Bookmark both: this hub for onboarding and storytelling, GitHub Pages for day-to-day ops lookup.',
        'More of my open work sits alongside this product: ThermalTrace (probe curves, freeze alerts, and 89+ guides at thermaltrace.dev) and case studies under /work.',
      ),
      {
        type: 'links',
        items: [
          { label: 'Why Prompt Studio? (sales pitch)', href: `${DOCS_BASE_PATH}/stories/sales-pitch` },
          { label: 'Quick start (Node 22+)', href: `${DOCS_BASE_PATH}/getting-started/quick-start` },
          { label: 'Tools table & routes', href: `${DOCS_BASE_PATH}/introduction/feature-map` },
          { label: 'Play mode & Roleplay', href: `${DOCS_BASE_PATH}/play/roleplay` },
          { label: 'ThermalTrace live demo', href: SITE_LINKS.thermalTrace, external: true },
          { label: 'ThermalTrace guides', href: SITE_LINKS.thermalTraceAbout, external: true },
          { label: 'Work & case studies', href: '/work' },
        ],
      },
    ],
    { interactive: 'tool-routes', related: ['stories/sales-pitch', 'introduction/what-is-it', 'getting-started/quick-start'] },
  ),
]
