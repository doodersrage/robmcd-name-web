import { DOCS, GH, p, page } from '../helpers'

export const introductionPages = [
  page(
    ['introduction', 'what-is-it'],
    'What is Prompt Studio?',
    'Purpose, audience, and how Prompt Studio complements ComfyUI.',
    'Introduction',
    1,
    [
      ...p(
        'Prompt Studio targets creators who outgrow ad-hoc prompt text files and CLIP node copy-paste. It centralizes generation, formatting, linting, character bibles, batch review, and workflow handoff while remaining optional — ComfyUI still renders pixels, samplers, and VRAM math.',
        'The app is built with React, TypeScript, and Next.js on Node.js 22+. A server exposes HTTP APIs consumed by the UI, ComfyUI custom nodes, and headless scripts. Browser state persists in IndexedDB (Dexie); server data lives in SQLite with configurable export paths.',
        'Primary integration is ComfyUI for generate, Lightning, and specialty graphs; an optional Diffusers engine exists for experimental txt2img. Every tool route is model-aware — switching from FLUX to SDXL or Qwen Edit revalidates length, negatives, and lint profiles automatically.',
      ),
      { type: 'h2', text: 'Core value' },
      {
        type: 'ul',
        items: [
          '40+ ComfyUI image model targets with architecture-specific scaffolds',
          'Dedicated Format (`/format`) and Lint (`/lint`) — separate tools, not one combined step',
          'Gallery with grid/dense/list layouts, review focus, compare modal, and semantic search',
          'Workflow takeover at queue time — inject live prompts without rebuilding graphs',
          'Draft / Final / Max quality profiles for exploration vs delivery',
        ],
      },
      {
        type: 'links',
        items: [{ label: 'Architecture docs on GitHub', href: `${DOCS}/architecture.md`, external: true }],
      },
    ],
    { related: ['introduction/workspace-modes', 'introduction/architecture'] },
  ),

  page(
    ['introduction', 'workspace-modes'],
    'Workspace modes',
    'Simple, Studio, and Full modes — progressive disclosure for different workflows.',
    'Introduction',
    2,
    [
      ...p(
        'Workspace modes control how much of the sidebar and shared controls you see. Switch from the sidebar footer or Profile → Appearance. New users stay in Simple mode; power users unlock Studio analytics and Full workflow editing with advanced sections expanded by default.',
        'Studio is the default: Edit / Media / Library groups in the sidebar, advanced sections collapsed, and all Studio tabs available (History, Compare, Templates, Presets, Analytics, Campaigns). Simple hides non-essential routes under "More tools" while keeping the same Studio tabs. Full matches Studio but expands quality sections and tool groups for daily production work.',
      ),
      { type: 'h2', text: 'Mode comparison' },
      {
        type: 'ul',
        items: [
          'Simple — Essentials + More tools; advanced controls collapsed; History, Compare, Templates, Presets, Analytics',
          'Studio (default) — Edit / Media / Library groups; collapsed advanced sections; all Studio tabs',
          'Full — Same groups as Studio, expanded by default; quality sections open; workflow editor and media tools prominent',
        ],
      },
      { type: 'interactive-slot' },
    ],
    { interactive: 'workspace-modes', related: ['getting-started/first-run'] },
  ),

  page(
    ['introduction', 'architecture'],
    'Architecture overview',
    'Frontend routes, IndexedDB + SQLite persistence, ComfyUI bridge, and plugin hooks.',
    'Introduction',
    3,
    [
      ...p(
        'The UI is organized around route-per-tool pages — Generate (`/`), Format (`/format`), Character (`/character`), Gallery (`/gallery`), Studio (`/studio`), Settings (`/settings`), Plugins (`/plugins`), and more. Shared state flows through React contexts and server APIs; the dashboard (`/dashboard`) surfaces pending jobs, queue status, and recent outputs.',
        'IndexedDB (Dexie) stores client-side settings, history, and gallery cache for fast offline browsing. SQLite on the server holds generations, characters, templates, campaign metadata, and user records when auth is enabled. Exports land in configurable directories for backup v2 and team sync.',
      ),
      { type: 'h2', text: 'Data flow' },
      {
        type: 'ol',
        items: [
          'User edits prompt in a tool page (or vision LLM writes one via Image → Prompt)',
          'Server validates against model family limits, lint rules, and quality profile (Draft/Final/Max)',
          'Queue submission or workflow takeover pushes text into ComfyUI at render time',
          'Outputs indexed in gallery with embeddings for semantic search and review ratings',
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
    'How major features connect across tools, studio, and gallery.',
    'Introduction',
    4,
    [
      ...p(
        'Features group into Generate & Refine, Character & Scene, Image & Control, Media (video/audio/mesh), Studio (history, campaigns, analytics), Gallery (review, queue, export), and Integration (workflow takeover, HTTP API). Each layer works independently or chains into production pipelines.',
        'The tools table in the README maps every route: Dashboard, Generate, Format, Character, Pet, Fantasy, Topics, Background, Image → Prompt, Inpaint, Outpaint, Compose, Workflow editor, Audio, Mesh, Video, Negative, Studio, Lint, Refine, Settings, Gallery, Variations, ControlNet, and Plugins.',
      ),
      { type: 'h2', text: 'Typical chains' },
      {
        type: 'ul',
        items: [
          'Generate (`/`) → Format (`/format`) → Lint (`/lint`) → Send to ComfyUI → Gallery review',
          'Character bible → Topics campaign → Draft batches → promote Final/Max winners',
          'Image → Prompt (vision LLM) → Refine → Variations matrix → Compare in Gallery',
          'Settings Heal & ready → ComfyUI asset downloads → workflow library import → queue',
        ],
      },
      { type: 'interactive-slot' },
    ],
    { interactive: 'tool-routes', related: ['generate/overview', 'gallery/gallery-overview'] },
  ),
]
