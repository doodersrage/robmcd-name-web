import { DOCS_BASE_PATH, GH, LIVE, p, page } from '../helpers'

export const storiesPages = [
  page(
    ['stories', 'sales-pitch'],
    'Why Prompt Studio?',
    'A self-hosted prompt control plane for ComfyUI and cloud engines — 28+ tools, 40+ model targets, Cast, Roleplay, and queue-time workflow takeover.',
    'Sales & stories',
    -2,
    [
      { type: 'h2', text: 'The problem every ComfyUI power user hits' },
      ...p(
        'ComfyUI is unmatched at turning checkpoints into pixels, but it was never designed to be a prompt CMS. Most teams end up with prompts scattered across CLIP node text fields, Discord threads, and spreadsheets — while negatives, character bibles, and “what worked last Tuesday” live nowhere central. Every model family wants different prose: FLUX expects subject-first photographic language, SDXL wants scene descriptions, Qwen Edit expects short imperatives, and WAN video needs motion-forward clauses.',
        'Prompt Studio closes that gap without replacing ComfyUI or locking you into one cloud vendor. It owns the words, the lint rules, the gallery metadata, Cast homes, and the queue handoff; ComfyUI still owns local graphs when you want them, and Fal/Replicate/Grok/Gemini cover clips when you do not. The app is MIT-licensed, runs on Node.js 22+ or desktop installers, and stores production data locally — IndexedDB in the browser for settings, history, and gallery, with server-side persistence and optional multi-user auth when you expose it to a team.',
      ),
      { type: 'h2', text: 'Before & after' },
      {
        type: 'callout',
        variant: 'tip',
        title: 'Try the toggle below',
        text: 'Compare a typical ad-hoc workflow with a Prompt Studio pipeline: Generate → Format/Lint → Send to ComfyUI → Gallery review → re-queue with Draft/Final/Max quality.',
      },
      { type: 'interactive-slot' },
      { type: 'h2', text: 'What you get on day one' },
      {
        type: 'stats',
        items: [
          { value: '28+', label: 'Tool routes', detail: 'Generate through Plugins & Mobile' },
          { value: '40+', label: 'Model targets', detail: 'FLUX, Qwen, Z-Image, SDXL, video…' },
          { value: '4', label: 'Workspace modes', detail: 'Simple · Play · Studio · Full' },
          { value: 'MIT', label: 'License', detail: 'Self-hosted, no cloud lock-in' },
        ],
      },
      { type: 'h2', text: 'Built for real production loops' },
      {
        type: 'ul',
        items: [
          'Keywords or random surprise on Generate (`/`), then Format (`/format`) to adapt drafts for any selected architecture',
          'Dedicated Lint (`/lint`) and Refine (`/refine`) with image + intent hints before you burn GPU time',
          'Character, Pet, Fantasy, Cast (`/characters`), Roleplay (`/roleplay`), Background, Topics, and Compose',
          'Mobile Studio (`/m`) — capture plates, watch queue, rate gallery, Roleplay from photo',
          'Image → Prompt (`/image-prompt`) via vision LLM; Inpaint/Outpaint with `{{INPUT_IMAGE}}` / `{{MASK_IMAGE}}` tokens',
          'Cloud engines — Fal, Replicate, ChatGPT, Gemini, Grok via Settings → Inference engine',
          'Gallery (`/gallery`) with grid/dense/list layouts, review focus, compare modal, and semantic search',
          'Workflow takeover at queue time plus optional custom nodes under `comfyui/comfyui_image_prompt_tools/`',
          'Studio (`/studio`) for history, iteration trees, campaigns, analytics, templates, and portfolio export',
          'Settings heal/backup, ComfyUI cluster config, SMTP invites, and installable Plugins (`/plugins`)',
        ],
      },
      { type: 'h2', text: 'Who this is for' },
      ...p(
        'Indie creators shipping character IP, studios batching ComfyUI on local or remote GPUs, and technical artists who need repeatable prompts without rebuilding graphs every week. If you already run ComfyUI and an LLM (local or API), Prompt Studio is the missing text layer — with optional cloud stills/clips and desktop installs, not another closed SaaS generator.',
      ),
      { type: 'h2', text: 'Start now' },
      {
        type: 'links',
        items: [
          { label: 'GitHub repository', href: GH, external: true },
          { label: 'Quick start guide', href: `${DOCS_BASE_PATH}/getting-started/quick-start` },
          { label: 'Read the case study', href: `${DOCS_BASE_PATH}/stories/case-study` },
          { label: 'Open dashboard (local)', href: `${LIVE}/dashboard`, external: true },
        ],
      },
    ],
    { interactive: 'sales-pitch', layout: 'marketing', related: ['stories/case-study', 'getting-started/quick-start'] },
  ),

  page(
    ['stories', 'case-study'],
    'Case study: episodic FLUX → SDXL series',
    'Illustrative scenario — how structured campaigns, lint, and gallery review cut wasted renders.',
    'Sales & stories',
    -1,
    [
      {
        type: 'callout',
        variant: 'info',
        title: 'Illustrative scenario',
        text: 'This walkthrough is a composite example based on common Prompt Studio workflows — not a named client engagement.',
      },
      { type: 'h2', text: 'Profile' },
      {
        type: 'stats',
        items: [
          { value: '12', label: 'Episodes', detail: 'Single character IP' },
          { value: 'FLUX→SDXL', label: 'Pipeline', detail: 'Explore then deliver' },
          { value: '76%', label: 'Fewer wasted renders', detail: 'After lint + family rules' },
          { value: '48', label: 'Final frames', detail: 'Campaign output' },
        ],
      },
      ...p(
        'Maya Chen runs ComfyUI on a local RTX 4090. She uses FLUX Dev and Schnell on Generate for fast dailies, then SDXL Base with Final/Max quality profiles for print-bound delivery. Before Prompt Studio, every episode meant reconstructing prompts from PNG metadata, retyping negatives, and hoping character tags stayed consistent across model families.',
        'After adopting Prompt Studio, Maya defined her lead character once in `/character`, attached wardrobe catalog tokens, and built a Studio campaign tied to `/topics` rows — one topic per episode. Draft batches ran after work; winners were promoted to Final quality on weekends and reviewed in Gallery review mode with keyboard 1–5 ratings.',
      ),
      { type: 'h2', text: 'The challenge' },
      {
        type: 'ul',
        items: [
          'Character drift between FLUX exploration and SDXL print exports',
          'No shared negative library — `/negative` sport-aware blocks re-applied by hand',
          'Hundreds of unsorted ComfyUI outputs with no semantic search',
          'Client review required side-by-side prompt diffs between similar frames',
          'Tight deadline: 12 episodes in three weeks',
        ],
      },
      { type: 'interactive-slot' },
      { type: 'h2', text: 'Stack & features used' },
      {
        type: 'comparison',
        before: [
          'Prompts in Notion + manual CLIP paste',
          'No Lint — ~34% failed renders',
          'Unsorted output folder',
          'Manual seed hunting for re-runs',
        ],
        after: [
          '/character + wardrobe catalog + /topics campaign',
          '/format + /lint before every Send to ComfyUI',
          '/gallery review + semantic search + compare modal',
          'Re-queue from gallery with Final/Max quality profiles',
          'Workflow takeover into existing SDXL graph',
          'Backup v2 export before client handoff',
        ],
      },
      ...p(
        'Prompt prep dropped from roughly eighteen minutes to four minutes per approved frame. Client rubric scores for character consistency rose from 62% to 91%. Wasted renders fell from 34% to 8% once model-family lint enforced FLUX brevity before SDXL export.',
      ),
      {
        type: 'quote',
        text: 'The campaign + Topics combo was the unlock — I set up all twelve episode hooks once, ran Draft batches on weeknights, and only promoted winners to Final on weekends.',
        attribution: 'Composite scenario',
        role: 'Illustrative workflow',
      },
      {
        type: 'links',
        items: [
          { label: 'Studio campaigns', href: `${DOCS_BASE_PATH}/studio/campaigns-scheduled` },
          { label: 'Gallery review mode', href: `${DOCS_BASE_PATH}/gallery/review-mode` },
          { label: 'Workflow takeover', href: `${DOCS_BASE_PATH}/integration/workflow-takeover` },
          { label: 'View on GitHub', href: GH, external: true },
        ],
      },
    ],
    { interactive: 'case-study', layout: 'marketing', related: ['stories/sales-pitch', 'studio/campaigns-scheduled'] },
  ),
]
