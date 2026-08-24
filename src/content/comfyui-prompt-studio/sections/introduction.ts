import { DOCS, DOCS_SITE, GH, p, page } from '../helpers'

export const introductionPages = [
  page(
    ['introduction', 'what-is-it'],
    'What is Prompt Studio?',
    'Purpose, audience, and how Prompt Studio complements ComfyUI and cloud engines.',
    'Introduction',
    1,
    [
      ...p(
        'Prompt Studio targets creators who outgrow ad-hoc prompt text files and CLIP node copy-paste. It centralizes generation, formatting, linting, character bibles, Cast homes, Roleplay beats, batch review, and workflow handoff — while ComfyUI still handles local graphs, samplers, and VRAM when you want full control.',
        'The app is built with React, TypeScript, and Next.js on Node.js 22+. A server exposes HTTP APIs consumed by the UI, ComfyUI custom nodes, desktop (Tauri) builds, and headless scripts. Browser state persists in IndexedDB (Dexie); server data lives in SQLite with configurable export paths.',
        'Primary integration is ComfyUI for generate, Lightning, and specialty graphs. Optional Diffusers engine covers experimental txt2img; Settings → Inference engine adds Fal, Replicate, ChatGPT (stills only), Gemini, and Grok (stills + native video clips). Every tool route is model-aware — switching from FLUX to SDXL or Qwen Edit revalidates length, negatives, and lint profiles automatically.',
      ),
      { type: 'h2', text: 'Core value' },
      {
        type: 'ul',
        items: [
          '40+ ComfyUI image model targets with architecture-specific scaffolds',
          'Cloud engines for stills and clips without maintaining every graph locally',
          'Cast (`/characters`), Roleplay (`/roleplay`), and Mobile Studio (`/m`) for character IP workflows',
          'Dedicated Format (`/format`) and Lint (`/lint`) — separate tools, not one combined step',
          'Gallery with grid/dense/list layouts, review focus, compare modal, and semantic search',
          'Workflow takeover at queue time — inject live prompts without rebuilding graphs',
          'Draft / Final / Max quality profiles for exploration vs delivery',
        ],
      },
      {
        type: 'links',
        items: [
          { label: 'Architecture docs on GitHub', href: `${DOCS}/architecture.md`, external: true },
          { label: 'Official docs site', href: DOCS_SITE, external: true },
        ],
      },
    ],
    { related: ['introduction/workspace-modes', 'introduction/architecture'] },
  ),

  page(
    ['introduction', 'workspace-modes'],
    'Workspace modes',
    'Simple, Play, Studio, and Full — progressive disclosure for different workflows.',
    'Introduction',
    2,
    [
      ...p(
        'Workspace modes control how much of the sidebar and shared controls you see. Switch from the sidebar footer or Profile → Appearance. **Simple** is the default for new installs — essentials plus More tools, advanced sections collapsed.',
        '**Play** narrows the sidebar to Cast, Roleplay, Gallery, and Queue with a lean Roleplay rail for still-and-clip storytelling. **Studio** exposes Edit / Media / Library groups with collapsed advanced sections and all Studio tabs. **Full** matches Studio but expands quality sections and tool groups for daily production work.',
      ),
      { type: 'h2', text: 'Mode comparison' },
      {
        type: 'ul',
        items: [
          'Simple (default) — Essentials + More tools; advanced collapsed; History, Compare, Templates, Presets, Analytics',
          'Play — Cast, Roleplay, Gallery, Queue; lean Roleplay rail; same Studio tabs as Simple',
          'Studio — Edit / Media / Library groups; collapsed advanced sections; all Studio tabs',
          'Full — Same groups as Studio, expanded by default; quality sections open; workflow editor and media tools prominent',
        ],
      },
      { type: 'interactive-slot' },
    ],
    { interactive: 'workspace-modes', related: ['play/roleplay', 'getting-started/first-run'] },
  ),

  page(
    ['introduction', 'architecture'],
    'Architecture overview',
    'Frontend routes, IndexedDB + SQLite persistence, ComfyUI bridge, cloud engines, and plugin hooks.',
    'Introduction',
    3,
    [
      ...p(
        'The UI is organized around route-per-tool pages — Generate (`/`), Format (`/format`), Character (`/character`), Cast (`/characters`), Roleplay (`/roleplay`), Mobile Studio (`/m`), Gallery (`/gallery`), Studio (`/studio`), Settings (`/settings`), Plugins (`/plugins`), and more. The dashboard (`/dashboard`) surfaces pending jobs, queue status, recent outputs, and the active project.',
        'IndexedDB (Dexie) stores client-side settings, history, and gallery cache for fast offline browsing. SQLite on the server holds generations, characters, cast records, templates, campaign metadata, and user records when auth is enabled. Exports land in configurable directories for backup v2 and team sync.',
      ),
      { type: 'h2', text: 'Data flow' },
      {
        type: 'ol',
        items: [
          'User edits prompt in a tool page (or vision LLM writes one via Image → Prompt)',
          'Server validates against model family limits, lint rules, and quality profile (Draft/Final/Max)',
          'Queue submission routes to ComfyUI, Diffusers, or a cloud engine (Image 1 becomes img2img when attached)',
          'Workflow takeover pushes live text into ComfyUI graphs at render time when using local paths',
          'Outputs indexed in gallery with embeddings for semantic search, Cast looks, and review ratings',
        ],
      },
      { type: 'interactive-slot' },
      {
        type: 'links',
        items: [{ label: 'Full architecture doc', href: `${GH}/blob/main/docs/architecture.md`, external: true }],
      },
    ],
    { interactive: 'workflow-pipeline', related: ['models/model-families', 'integration/workflow-takeover'] },
  ),

  page(
    ['introduction', 'feature-map'],
    'Feature map',
    'How major features connect across tools, Play, studio, and gallery.',
    'Introduction',
    4,
    [
      ...p(
        'Features group into Generate & Refine, Character & Scene, Play (Cast / Roleplay / Mobile), Image & Control, Media (video/audio/mesh), Studio (history, campaigns, analytics), Gallery (review, queue, export), and Integration (ComfyUI, cloud engines, HTTP API). Each layer works independently or chains into production pipelines.',
        'The README tools table maps every route: Dashboard, Generate, Format, Character, Pet, Fantasy, Roleplay, Topics, Background, Image → Prompt, Inpaint, Outpaint, Mobile Studio, Compose, Workflow editor, Audio, Mesh, Cast, Video, Negative, Studio, Lint, Refine, Settings, Gallery, Variations, ControlNet, and Plugins.',
      ),
      { type: 'h2', text: 'Typical chains' },
      {
        type: 'ul',
        items: [
          'Generate (`/`) → Format (`/format`) → Lint (`/lint`) → Send to ComfyUI → Gallery review',
          'Cast look → Roleplay beat → Continue (Fal extend or last-frame I2V) → Cut film → Save to Cast',
          'Mobile Studio plate capture → Compose isolate on white → Character / Cast identity lock',
          'Image → Prompt (vision LLM) → Refine → Variations matrix → Compare in Gallery',
          'Settings Heal & ready → cloud engine keys → ComfyUI asset downloads → queue',
        ],
      },
      { type: 'interactive-slot' },
    ],
    { interactive: 'tool-routes', related: ['generate/overview', 'gallery/gallery-overview'] },
  ),
]
