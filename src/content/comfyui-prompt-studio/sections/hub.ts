import { GH, LIVE, p, page } from '../helpers'

export const hubPages = [
  page(
    [],
    'ComfyUI Prompt Studio',
    'Model-aware prompt generation, refinement, and orchestration for ComfyUI — documentation hub.',
    'Hub',
    0,
    [
      ...p(
        'ComfyUI Prompt Studio is a self-hosted Next.js app that turns keywords or topics into model-specific prompts for image, video, audio, and 3D workflows. ComfyUI remains the render engine; Prompt Studio owns the words, lint rules, gallery metadata, and queue-time workflow handoff.',
        'The app ships 25+ tool routes, 40+ ComfyUI model targets, three workspace modes (Simple · Studio · Full), and local-first persistence — IndexedDB via Dexie in the browser for settings, history, and gallery, with server-side SQLite and optional multi-user auth when you expose it to a team.',
      ),
      {
        type: 'callout',
        variant: 'info',
        title: 'Live instance',
        text: `When running locally, open the dashboard at ${LIVE}/dashboard or the gallery at ${LIVE}/gallery. Requires Node.js 22+. Source and full README on GitHub.`,
      },
      {
        type: 'links',
        items: [
          { label: 'GitHub repository', href: GH, external: true },
          { label: 'Open dashboard (local)', href: `${LIVE}/dashboard`, external: true },
          { label: 'Open gallery (local)', href: `${LIVE}/gallery`, external: true },
        ],
      },
      { type: 'h2', text: 'What this guide covers' },
      {
        type: 'ul',
        items: [
          'Sales pitch and case study for production ComfyUI workflows',
          'Tool routes from Generate through Gallery, Studio, and Integration',
          '40+ model families — FLUX, Qwen, Z-Image, Boogu, SDXL, WAN video, Stable Audio, Hunyuan3D',
          'Interactive demos for workspace modes, quality profiles, tool routes, and API endpoints',
        ],
      },
      {
        type: 'links',
        items: [
          { label: 'Why Prompt Studio? (sales pitch)', href: '/comfyui-prompt-studio/stories/sales-pitch' },
          { label: 'Quick start (Node 22+)', href: '/comfyui-prompt-studio/getting-started/quick-start' },
          { label: 'Tools table & routes', href: '/comfyui-prompt-studio/introduction/feature-map' },
        ],
      },
    ],
    { interactive: 'tool-routes', related: ['stories/sales-pitch', 'introduction/what-is-it', 'getting-started/quick-start'] },
  ),
]
