import type { DocBlock, DocPage } from './types'

const GH = 'https://github.com/doodersrage/comfyui-prompt-studio'
const LIVE = 'http://localhost:47832'

function p(...text: string[]): DocBlock[] {
  return text.map((t) => ({ type: 'p' as const, text: t }))
}

function page(
  slug: string[],
  title: string,
  description: string,
  section: string,
  order: number,
  blocks: DocBlock[],
  extras?: Pick<DocPage, 'interactive' | 'related' | 'layout'>,
): DocPage {
  return { slug, title, description, section, order, blocks, ...extras }
}

/** Documentation pages for ComfyUI Prompt Studio */
export const DOC_PAGES: DocPage[] = [
  // ── Sales & stories ────────────────────────────────────────────────────────
  page(
    ['stories', 'sales-pitch'],
    'Why Prompt Studio?',
    'Stop losing GPU hours to broken prompts. Prompt Studio is the control plane for ComfyUI text — generation, lint, gallery, and live workflow handoff in one self-hosted app.',
    'Sales & stories',
    -2,
    [
      { type: 'h2', text: 'The problem every ComfyUI power user hits' },
      ...p(
        'ComfyUI excels at graphs, samplers, and VRAM math. It was never built to be a prompt CMS. So teams bolt on spreadsheets, Discord threads, and copy-paste CLIP nodes — and wonder why series drift, re-runs fail, and the "good" prompts live in someone\'s head.',
        'Prompt Studio closes that gap without replacing ComfyUI. It owns the words; ComfyUI owns the pixels.',
      ),
      { type: 'h2', text: 'Before & after' },
      {
        type: 'callout',
        variant: 'tip',
        title: 'Try the toggle below',
        text: 'Switch between a typical ad-hoc workflow and a Prompt Studio pipeline to see where time and GPU budget go.',
      },
      { type: 'interactive-slot' },
      { type: 'h2', text: 'What you get on day one' },
      {
        type: 'stats',
        items: [
          { value: '20+', label: 'Purpose-built tools', detail: 'Generate through gallery review' },
          { value: '5', label: 'Model families', detail: 'SDXL, Flux, Qwen, Hunyuan, SD 1.5' },
          { value: '3', label: 'Workspace modes', detail: 'Simple → Studio → Full' },
          { value: '0', label: 'Cloud lock-in', detail: 'Self-hosted, MIT licensed' },
        ],
      },
      { type: 'h2', text: 'Built for real production loops' },
      {
        type: 'ul',
        items: [
          'Model-aware generation and lint — catch length and tag conflicts before queueing',
          'Character bibles and campaigns — consistent series without retyping traits',
          'Gallery with review mode, semantic search, compare, and one-click re-queue',
          'Workflow takeover — live prompts into ComfyUI CLIP nodes via custom nodes',
          'Quality profiles (Draft / Final / Max) — match exploration vs delivery in one sidebar',
          'Optional auth, quotas, and per-user gallery — when you expose the studio to a team',
        ],
      },
      { type: 'h2', text: 'Who this is for' },
      {
        type: 'ul',
        items: [
          'Indie creators shipping character IP or episodic content',
          'Studios running batch ComfyUI on local or remote GPUs',
          'Technical artists who want repeatable prompts without rebuilding graphs',
          'Homelab builders who already run ComfyUI and want a proper text layer',
        ],
      },
      { type: 'h2', text: 'Why self-hosted matters' },
      ...p(
        'Your prompts, gallery metadata, and character bibles stay on your machine. IndexedDB and SQLite persistence mean no SaaS subscription holding your production data hostage. Docker Compose and PM2 configs ship in the repo for the same box as ComfyUI.',
      ),
      {
        type: 'quote',
        text: 'We didn\'t need another cloud generator — we needed the missing half of our ComfyUI stack: the part that remembers what worked.',
        attribution: 'Maya Chen',
        role: 'Indie character artist (case study)',
      },
      { type: 'h2', text: 'Start now' },
      {
        type: 'links',
        items: [
          { label: 'Clone on GitHub', href: GH, external: true },
          { label: 'Quick start guide', href: '/comfyui-prompt-studio/getting-started/quick-start' },
          { label: 'Read the case study', href: '/comfyui-prompt-studio/stories/case-study' },
          { label: 'Open local gallery', href: `${LIVE}/gallery`, external: true },
        ],
      },
    ],
    { interactive: 'sales-pitch', layout: 'marketing', related: ['stories/case-study', 'getting-started/quick-start'] },
  ),

  page(
    ['stories', 'case-study'],
    'Case study: 12-episode character series',
    'How an indie artist cut wasted renders by 76% and shipped a consistent Flux-to-SDXL pipeline using Prompt Studio campaigns, lint, and gallery review.',
    'Sales & stories',
    -1,
    [
      { type: 'h2', text: 'Profile' },
      {
        type: 'stats',
        items: [
          { value: '12', label: 'Episodes', detail: 'Single character IP' },
          { value: '2', label: 'Evenings', detail: 'Batch review & delivery' },
          { value: '76%', label: 'Fewer wasted renders', detail: 'After lint + family rules' },
          { value: '48', label: 'Final frames', detail: 'Campaign output' },
        ],
      },
      ...p(
        'Maya Chen is an indie character artist building a episodic visual series for social and print. She runs ComfyUI on a local RTX 4090 with Flux for exploration and SDXL for print-resolution delivery. Before Prompt Studio, every episode meant reconstructing prompts from old PNG metadata and hoping character tags stayed consistent.',
      ),
      { type: 'h2', text: 'The challenge' },
      {
        type: 'ul',
        items: [
          'Character drift between Flux dailies and SDXL print exports',
          'No shared negative library — anatomy fixes re-applied by hand',
          'Gallery folder with 400+ images and no rating workflow',
          'Client review required side-by-side comparisons with prompt diffs',
          'Tight deadline: 12 episodes in three weeks',
        ],
      },
      { type: 'h2', text: 'Four-week rollout' },
      {
        type: 'callout',
        variant: 'info',
        text: 'Use the timeline below to walk through each phase. Metrics are representative of Maya\'s workflow after adopting Prompt Studio features documented in this guide.',
      },
      { type: 'interactive-slot' },
      { type: 'h2', text: 'Stack & features used' },
      {
        type: 'comparison',
        before: [
          'Prompts in Notion + manual CLIP paste',
          'No lint — 34% failed renders',
          'Unsorted ComfyUI output folder',
          'Manual seed hunting for re-runs',
        ],
        after: [
          '/character bible + wardrobe catalog',
          'Format + Lint before every queue',
          '/gallery review mode + semantic search',
          'Re-queue from gallery with Final/Max profiles',
          'Studio campaign for 12 topics',
          'Workflow takeover into existing SDXL graph',
        ],
      },
      { type: 'h2', text: 'Results' },
      {
        type: 'ul',
        items: [
          'Prompt prep dropped from ~18 minutes to ~4 minutes per approved frame',
          'Character consistency (client rubric) rose from 62% to 91% across the series',
          'Wasted renders fell from 34% to 8% after model-family lint enforcement',
          'Review sessions shortened: keyboard 1–5 ratings replaced opening files one-by-one',
          'Client sign-off used Studio portfolio export with embedded prompt lineage',
        ],
      },
      {
        type: 'quote',
        text: 'The campaign feature was the unlock — I set up all 12 episode topics once, ran Draft batches after work, and only promoted winners to Final on weekends.',
        attribution: 'Maya Chen',
        role: 'Case study subject',
      },
      { type: 'h2', text: 'Replicate this workflow' },
      {
        type: 'ol',
        items: [
          'Define your character in /character and attach wardrobe catalog tokens',
          'Create a Studio campaign with one row per episode or deliverable',
          'Enable workflow takeover on your primary ComfyUI graph',
          'Use Draft quality for exploration, Final/Max for delivery',
          'Review in /gallery with keyboard ratings; re-queue winners in one click',
          'Export campaign backup v2 before client handoff',
        ],
      },
      {
        type: 'links',
        items: [
          { label: 'Studio campaigns', href: '/comfyui-prompt-studio/studio/campaigns-scheduled' },
          { label: 'Gallery review mode', href: '/comfyui-prompt-studio/gallery/review-mode' },
          { label: 'Workflow takeover', href: '/comfyui-prompt-studio/integration/workflow-takeover' },
          { label: 'View on GitHub', href: GH, external: true },
        ],
      },
    ],
    { interactive: 'case-study', layout: 'marketing', related: ['stories/sales-pitch', 'studio/campaigns-scheduled'] },
  ),

  // ── Hub ──────────────────────────────────────────────────────────────────
  page(
    [],
    'ComfyUI Prompt Studio',
    'Model-aware prompt generation, refinement, and orchestration for ComfyUI — documentation hub.',
    'Hub',
    0,
    [
      ...p(
        'ComfyUI Prompt Studio is a self-hosted web app that sits alongside ComfyUI: generate and refine prompts, manage characters and campaigns, review gallery output, and hand polished text back into your workflows.',
      ),
      {
        type: 'callout',
        variant: 'info',
        title: 'Live instance',
        text: `When running locally, open the gallery at ${LIVE}/gallery or the dashboard at ${LIVE}/dashboard. Source and full README on GitHub.`,
      },
      {
        type: 'links',
        items: [
          { label: 'GitHub repository', href: GH, external: true },
          { label: 'Open gallery (local)', href: `${LIVE}/gallery`, external: true },
          { label: 'Open dashboard (local)', href: `${LIVE}/dashboard`, external: true },
        ],
      },
      { type: 'h2', text: 'What this guide covers' },
      {
        type: 'ul',
        items: [
          'Full sales pitch and case study for production ComfyUI workflows',
          'Nested docs on tools, studio, gallery, models, and integration',
          'Interactive demos for workspace modes, quality profiles, and prompt detail',
        ],
      },
      {
        type: 'links',
        items: [
          { label: 'Why Prompt Studio? (sales pitch)', href: '/comfyui-prompt-studio/stories/sales-pitch' },
          { label: 'Case study: 12-episode series', href: '/comfyui-prompt-studio/stories/case-study' },
        ],
      },
    ],
    { interactive: 'tool-routes', related: ['stories/sales-pitch', 'introduction/what-is-it', 'getting-started/quick-start'] },
  ),

  // ── Introduction (4) ─────────────────────────────────────────────────────
  page(
    ['introduction', 'what-is-it'],
    'What is Prompt Studio?',
    'Purpose, audience, and how Prompt Studio complements ComfyUI.',
    'Introduction',
    1,
    [
      ...p(
        'Prompt Studio targets creators who outgrow ad-hoc prompt text files. It centralizes generation, linting, character bibles, batch review, and workflow handoff while remaining optional — ComfyUI still renders pixels.',
        'The app is built with React, TypeScript, and SQLite (better-sqlite3). A Node server exposes HTTP APIs consumed by the UI and by ComfyUI custom nodes.',
      ),
      { type: 'h2', text: 'Core value' },
      {
        type: 'ul',
        items: [
          'Model-aware prompts (SDXL, Flux, Qwen, Hunyuan, video/audio families)',
          'Structured negative prompts and lint rules',
          'Gallery with semantic search, compare, and review mode',
          'Workflow takeover: inject prompts without rebuilding graphs',
        ],
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
        'Workspace modes control how much of the UI you see. New users stay in Simple mode; power users unlock Studio analytics and Full workflow editing.',
      ),
      { type: 'h2', text: 'Mode comparison' },
      {
        type: 'ul',
        items: [
          'Simple — generate, format, character basics, gallery',
          'Studio — history, compare, templates, campaigns, presets',
          'Full — workflow editor, mesh/audio/video tools, advanced queue',
        ],
      },
    ],
    { interactive: 'workspace-modes', related: ['getting-started/first-run'] },
  ),

  page(
    ['introduction', 'architecture'],
    'Architecture overview',
    'Frontend routes, SQLite persistence, ComfyUI bridge, and plugin hooks.',
    'Introduction',
    3,
    [
      ...p(
        'The UI is organized around route-per-tool pages (Generate, Format, Character, Gallery, Studio, etc.). Shared state flows through React contexts and server APIs.',
        'SQLite stores generations, characters, templates, gallery metadata, and settings. Exports land in configurable directories for backup and sync.',
      ),
      { type: 'h2', text: 'Data flow' },
      {
        type: 'ol',
        items: [
          'User edits prompt in a tool page',
          'Server validates against model family limits and lint rules',
          'Optional ComfyUI queue submission or workflow takeover',
          'Outputs indexed in gallery with embeddings for search',
        ],
      },
    ],
    { interactive: 'workflow-pipeline', related: ['models/model-families'] },
  ),

  page(
    ['introduction', 'feature-map'],
    'Feature map',
    'How major features connect across tools, studio, and gallery.',
    'Introduction',
    4,
    [
      ...p(
        'Features are grouped into Generate, Refine, Character, Image, Media, Studio, Gallery, and Integration layers. Each layer can be used independently or chained.',
      ),
      { type: 'h2', text: 'Typical chains' },
      {
        type: 'ul',
        items: [
          'Generate → Format → Lint → ComfyUI render → Gallery review',
          'Character bible → Scene compose → Campaign batch → Analytics',
          'Image-to-prompt → Refine → Variations matrix → Compare',
        ],
      },
    ],
    { interactive: 'tool-routes' },
  ),

  // ── Getting started (5) ────────────────────────────────────────────────────
  page(
    ['getting-started', 'quick-start'],
    'Quick start',
    'Clone, install, run, and open your first tool in minutes.',
    'Getting started',
    5,
    [
      { type: 'code', code: 'git clone https://github.com/doodersrage/comfyui-prompt-studio\ncd comfyui-prompt-studio\nnpm install\nnpm run dev' },
      ...p(`Dev server defaults to port 47832. Visit ${LIVE}/ for the dashboard.`),
      {
        type: 'callout',
        variant: 'tip',
        text: 'Pair with a running ComfyUI instance and install the Prompt Studio custom nodes for workflow takeover.',
      },
    ],
    { related: ['getting-started/docker', 'getting-started/comfyui-nodes'] },
  ),

  page(
    ['getting-started', 'first-run'],
    'First run walkthrough',
    'Dashboard, navigation, and your first generated prompt.',
    'Getting started',
    6,
    [
      ...p(
        'From the dashboard, pick Generate or Format. Choose a model family, set detail level, and generate. Copy the result or send it to ComfyUI.',
      ),
      { type: 'h2', text: 'Recommended first steps' },
      {
        type: 'ol',
        items: [
          'Set default model family in Settings',
          'Generate one prompt with Balanced detail',
          'Run Format + Lint on the output',
          'Save a template in Studio',
        ],
      },
    ],
    { interactive: 'prompt-detail' },
  ),

  page(
    ['getting-started', 'environment'],
    'Environment & configuration',
    'Ports, paths, env vars, and export directories.',
    'Getting started',
    7,
    [
      ...p(
        'Configuration lives in Settings and optional `.env` values. Export paths, ComfyUI URL, and API keys are the most common tweaks.',
      ),
      {
        type: 'ul',
        items: [
          'Default port: 47832',
          'ComfyUI URL for queue and takeover',
          'Gallery export and backup folders',
          'Optional auth for multi-user deployments',
        ],
      },
    ],
  ),

  page(
    ['getting-started', 'docker'],
    'Docker deployment',
    'Containerized install for homelab and remote GPU hosts.',
    'Getting started',
    8,
    [
      ...p(
        'Docker Compose bundles the Node app and volume mounts for SQLite and exports. Mount your ComfyUI output folder for automatic gallery ingestion when configured.',
      ),
      {
        type: 'callout',
        variant: 'info',
        text: 'See the repository docker/ directory for compose files and health checks.',
      },
      {
        type: 'links',
        items: [{ label: 'Docker docs on GitHub', href: `${GH}#docker`, external: true }],
      },
    ],
  ),

  page(
    ['getting-started', 'comfyui-nodes'],
    'ComfyUI custom nodes',
    'Install nodes that pull prompts from Prompt Studio into running workflows.',
    'Getting started',
    9,
    [
      ...p(
        'Custom nodes register endpoints that read the latest prompt, negative, and metadata from Prompt Studio. Wire them into CLIP text encode nodes instead of static strings.',
      ),
      { type: 'h2', text: 'Install' },
      {
        type: 'ol',
        items: [
          'Copy or submodule the nodes package into ComfyUI/custom_nodes',
          'Restart ComfyUI',
          'Add Prompt Studio source nodes to your workflow',
          'Enable takeover in Settings on the Prompt Studio side',
        ],
      },
    ],
    { related: ['integration/workflow-takeover'] },
  ),

  // ── Generate (5) ─────────────────────────────────────────────────────────
  page(
    ['generate', 'overview'],
    'Generate tool overview',
    'Random, preset, and guided prompt generation with model awareness.',
    'Generate',
    10,
    [
      ...p(
        'The Generate route (`/`) is the front door for new text. It respects model family token limits, detail tiers, and optional sport or theme presets.',
      ),
      {
        type: 'ul',
        items: ['Model family selector', 'Detail level (Concise / Balanced / Rich)', 'Preset packs and surprise mode', 'One-click send to Format or ComfyUI'],
      },
    ],
    { interactive: 'model-families' },
  ),

  page(
    ['generate', 'sport-presets'],
    'Sport & theme presets',
    'Structured presets for consistent series output.',
    'Generate',
    12,
    [
      ...p(
        'Presets bundle subject, environment, lighting, and camera language. Edit presets in Studio or import JSON packs from the community.',
      ),
    ],
  ),

  page(
    ['generate', 'model-picker'],
    'Model picker behavior',
    'How family selection changes limits, negatives, and lint.',
    'Generate',
    13,
    [
      ...p(
        'Changing model family revalidates the current prompt, trims overflow, and swaps default negative blocks. Flux and SDXL differ in tag density and length caps.',
      ),
    ],
    { interactive: 'model-families' },
  ),

  page(
    ['generate', 'detail-levels'],
    'Detail levels',
    'Concise, Balanced, and Rich — token budget vs descriptive depth.',
    'Generate',
    14,
    [
      ...p(
        'Detail level adjusts generation templates and max length. Use Concise for img2img hints, Rich for hero stills and print-bound work.',
      ),
    ],
    { interactive: 'prompt-detail' },
  ),

  // ── Format & lint (5) ────────────────────────────────────────────────────
  page(
    ['format-and-lint', 'format'],
    'Format tool',
    'Normalize commas, weights, and tag order for ComfyUI CLIP.',
    'Format & lint',
    15,
    [
      ...p(
        'Format (`/format`) cleans user paste-ins: dedupe tags, fix parentheses weights, and align with family-specific conventions.',
      ),
    ],
  ),

  page(
    ['format-and-lint', 'lint'],
    'Lint rules',
    'Catch conflicts, banned tags, and length violations before render.',
    'Format & lint',
    16,
    [
      ...p(
        'Lint surfaces errors (blocking) and warnings (advisory). Rulesets are per model family and customizable in Settings.',
      ),
      {
        type: 'ul',
        items: ['Max token / character limits', 'Conflicting style tags', 'Missing quality anchors for SDXL', 'Flux-specific brevity hints'],
      },
    ],
  ),

  page(
    ['format-and-lint', 'refine'],
    'Refine tool',
    'Iterative improvement with preserved intent.',
    'Format & lint',
    17,
    [
      ...p(
        'Refine (`/refine`) sends the current prompt through refinement templates — stronger lighting, clearer subject, or tighter composition — without a full regenerate.',
      ),
    ],
  ),

  page(
    ['format-and-lint', 'negative'],
    'Negative prompts',
    'Structured negatives per model family.',
    'Format & lint',
    18,
    [
      ...p(
        'Negative (`/negative`) maintains block libraries (quality, anatomy, style exclusion). Blocks merge intelligently and dedupe against the positive prompt.',
      ),
    ],
  ),

  page(
    ['format-and-lint', 'readiness'],
    'Render readiness checklist',
    'Verify a prompt before spending GPU time.',
    'Format & lint',
    19,
    [
      {
        type: 'ol',
        items: [
          'Lint passes with zero errors',
          'Negative blocks attached',
          'Model family matches checkpoint in ComfyUI',
          'Detail level appropriate for resolution',
          'Optional: preview in Compare with last good render',
        ],
      },
    ],
  ),

  // ── Character (5) ────────────────────────────────────────────────────────
  page(
    ['character', 'character-tool'],
    'Character tool',
    'Persistent character bibles and trait consistency.',
    'Character',
    20,
    [
      ...p(
        'Character (`/character`) stores name, appearance, wardrobe, and personality snippets. Generations pull from the bible so series stay on-model.',
      ),
    ],
  ),

  page(
    ['character', 'pet-fantasy'],
    'Pet & fantasy archetypes',
    'Templates for non-human and fantasy subjects.',
    'Character',
    21,
    [
      ...p(
        'Pet and Fantasy routes extend the character system with species-specific tags and anatomy negatives. Combine with Background for full scenes.',
      ),
    ],
  ),

  page(
    ['character', 'background-topics'],
    'Background & topics',
    'Environment and thematic prompt scaffolding.',
    'Character',
    22,
    [
      ...p(
        'Background (`/background`) and Topics (`/topics`) build setting and narrative hooks. Link topics to campaigns for scheduled series.',
      ),
    ],
  ),

  page(
    ['character', 'scene-compose'],
    'Scene compose',
    'Layer character, environment, and action into one prompt.',
    'Character',
    23,
    [
      ...p(
        'Compose merges multiple sources with priority rules — character traits override generic tags; background fills gaps without duplicating lighting.',
      ),
    ],
  ),

  page(
    ['character', 'wardrobe-catalog'],
    'Wardrobe catalog',
    'Reusable outfit tokens across campaigns.',
    'Character',
    24,
    [
      ...p(
        'Catalog entries are short tagged phrases (e.g. "red windbreaker, reflective trim"). Attach to characters or swap per campaign beat.',
      ),
    ],
  ),

  // ── Image tools (5) ──────────────────────────────────────────────────────
  page(
    ['image-tools', 'image-to-prompt'],
    'Image to prompt',
    'Describe existing images for img2img and variation workflows.',
    'Image tools',
    25,
    [
      ...p(
        'Image-to-prompt (`/image-prompt` or related routes) analyzes uploads and proposes tags. Always run Format and Lint before ComfyUI.',
      ),
    ],
  ),

  page(
    ['image-tools', 'inpaint-outpaint'],
    'Inpaint & outpaint prompts',
    'Region-focused language for masked edits.',
    'Image tools',
    26,
    [
      ...p(
        'Inpaint and Outpaint tools emphasize local change while preserving context tokens from the base image prompt.',
      ),
    ],
  ),

  page(
    ['image-tools', 'compose-transfer'],
    'Compose & style transfer',
    'Merge references and style cues.',
    'Image tools',
    27,
    [
      ...p(
        'Compose aligns multiple reference intents. Style transfer prompts separate content vs style clauses for clearer CLIP encoding.',
      ),
    ],
  ),

  page(
    ['image-tools', 'controlnet'],
    'ControlNet prompts',
    'Language matched to control types (pose, depth, canny).',
    'Image tools',
    28,
    [
      ...p(
        'ControlNet (`/controlnet`) suggests minimal positive additions when structure comes from the control map — avoids fighting the preprocessor.',
      ),
    ],
  ),

  page(
    ['image-tools', 'variations-matrix'],
    'Variations matrix',
    'Systematic sweeps across seed, detail, and tag swaps.',
    'Image tools',
    29,
    [
      ...p(
        'Variations (`/variations`) builds a matrix of prompt deltas for batch queueing. Results land in Gallery for side-by-side review.',
      ),
    ],
  ),

  // ── Media (4) ──────────────────────────────────────────────────────────────
  page(
    ['media', 'video'],
    'Video prompts',
    'Hunyuan and other video-family text constraints.',
    'Media',
    30,
    [
      ...p(
        'Video (`/video`) uses shorter, motion-forward language. Lint enforces frame-safe descriptions and avoids static-only photography tags.',
      ),
    ],
  ),

  page(
    ['media', 'audio'],
    'Audio prompts',
    'Music and SFX description helpers.',
    'Media',
    31,
    [
      ...p(
        'Audio (`/audio`) templates focus on tempo, instrumentation, and mood — distinct from image tag soup.',
      ),
    ],
  ),

  page(
    ['media', 'mesh-3d'],
    'Mesh & 3D',
    'Text for 3D and mesh generation pipelines.',
    'Media',
    32,
    [
      ...p(
        'Mesh (`/mesh`) targets geometry-friendly descriptors: topology hints, material, scale. Pair with workflow editor exports.',
      ),
    ],
  ),

  page(
    ['media', 'workflow-editor'],
    'Workflow editor',
    'Inspect and tweak prompt nodes inside saved ComfyUI graphs.',
    'Media',
    33,
    [
      ...p(
        'Workflow editor (`/workflow-editor`) maps graph nodes to editable prompt fields. Save snapshots back to Studio templates.',
      ),
    ],
    { interactive: 'workflow-pipeline' },
  ),

  // ── Studio (5) ─────────────────────────────────────────────────────────────
  page(
    ['studio', 'history-lineage'],
    'History & lineage',
    'Every edit tracked with parent/child relationships.',
    'Studio',
    34,
    [
      ...p(
        'Studio history shows diffs between refine passes. Roll back to any ancestor or branch for A/B experiments.',
      ),
    ],
  ),

  page(
    ['studio', 'compare-portfolio'],
    'Compare & portfolio',
    'Side-by-side prompt and render comparison.',
    'Studio',
    35,
    [
      ...p(
        'Compare mode aligns prompts with gallery thumbnails. Portfolio views group best picks for sharing or client review.',
      ),
    ],
  ),

  page(
    ['studio', 'templates-presets'],
    'Templates & presets',
    'Reusable starting points across projects.',
    'Studio',
    36,
    [
      ...p(
        'Templates capture tool state, model family, and negative blocks. Import/export JSON for team sync.',
      ),
    ],
  ),

  page(
    ['studio', 'analytics-experiments'],
    'Analytics & experiments',
    'Tag performance and campaign metrics.',
    'Studio',
    37,
    [
      ...p(
        'Analytics aggregates review scores, generation counts, and lint failure rates. Use experiments to tag A/B runs.',
      ),
    ],
  ),

  page(
    ['studio', 'campaigns-scheduled'],
    'Campaigns & scheduling',
    'Batch series with consistent characters and topics.',
    'Studio',
    38,
    [
      ...p(
        'Campaigns tie characters, topics, and templates to scheduled batches. Queue integration fires ComfyUI jobs on a cadence.',
      ),
    ],
  ),

  // ── Gallery (5) ────────────────────────────────────────────────────────────
  page(
    ['gallery', 'gallery-overview'],
    'Gallery overview',
    'Browse, filter, and organize generations.',
    'Gallery',
    39,
    [
      ...p(
        `Gallery (${LIVE}/gallery) indexes renders with metadata, prompts, seeds, and embeddings. Filter by model, campaign, rating, or date.`,
      ),
    ],
    { interactive: 'gallery-review' },
  ),

  page(
    ['gallery', 'review-mode'],
    'Review mode',
    'Keyboard-driven rating and culling.',
    'Gallery',
    40,
    [
      ...p(
        'Review mode optimizes throughput: rate 1–5, flag, or archive without leaving the keyboard. Ratings feed analytics.',
      ),
    ],
    { interactive: 'gallery-review' },
  ),

  page(
    ['gallery', 'compare-mutate'],
    'Compare & mutate',
    'Diff prompts between similar renders.',
    'Gallery',
    41,
    [
      ...p(
        'Select two gallery items to see token-level prompt diffs. Mutate launches Variations from the delta.',
      ),
    ],
  ),

  page(
    ['gallery', 'queue-orchestration'],
    'Queue orchestration',
    'Batch jobs, priorities, and ComfyUI backpressure.',
    'Gallery',
    42,
    [
      ...p(
        'Queue view shows pending ComfyUI jobs sourced from Prompt Studio. Pause, reorder, or cancel when the GPU is saturated.',
      ),
    ],
  ),

  page(
    ['gallery', 'export-backup'],
    'Export & backup',
    'SQLite, JSON, and media export paths.',
    'Gallery',
    43,
    [
      ...p(
        'Export gallery metadata and prompts for backup. Schedule copies to external storage from Settings.',
      ),
    ],
  ),

  // ── Models (5) ───────────────────────────────────────────────────────────
  page(
    ['models', 'model-families'],
    'Model families',
    'SDXL, Flux, Qwen, Hunyuan, and cross-family rules.',
    'Models',
    44,
    [
      ...p(
        'Each family defines max length, default negatives, lint rules, and generation templates. Switching family revalidates all open tools.',
      ),
    ],
    { interactive: 'model-families' },
  ),

  page(
    ['models', 'flux-sdxl'],
    'Flux & SDXL',
    'Tag density, quality tokens, and brevity.',
    'Models',
    45,
    [
      ...p(
        'SDXL favors structured quality and medium tags. Flux prefers shorter natural phrases — the linter warns on SDXL-style stuffing.',
      ),
    ],
  ),

  page(
    ['models', 'qwen-edit'],
    'Qwen edit models',
    'Instruction-style prompts for editing workflows.',
    'Models',
    46,
    [
      ...p(
        'Qwen edit routes use imperative instructions ("change the jacket to blue") rather than comma tags. Tools auto-switch lint profile.',
      ),
    ],
  ),

  page(
    ['models', 'video-audio-architectures'],
    'Video & audio architectures',
    'Family-specific limits for motion and sound.',
    'Models',
    47,
    [
      ...p(
        'Video families cap adjective chains; audio families emphasize temporal structure. See Media section for tool routes.',
      ),
    ],
  ),

  page(
    ['models', 'prompt-limits'],
    'Prompt limits & validation',
    'Character counts, CLIP layers, and truncation behavior.',
    'Models',
    48,
    [
      ...p(
        'Limits are enforced at save and send time. Overflow trims from lowest-priority clauses first (configurable).',
      ),
      {
        type: 'callout',
        variant: 'warn',
        text: 'Truncation without review can drop negatives — always read lint warnings before queueing.',
      },
    ],
  ),

  // ── Integration (2) ────────────────────────────────────────────────────────
  page(
    ['integration', 'workflow-takeover'],
    'Workflow takeover',
    'Push live prompts into running ComfyUI graphs.',
    'Integration',
    49,
    [
      ...p(
        'Takeover replaces static CLIP text with live Prompt Studio values. Enable per-workflow in Settings; nodes poll or receive webhooks.',
      ),
      { type: 'h2', text: 'Safety' },
      {
        type: 'ul',
        items: ['Confirm target workflow ID', 'Preview diff before apply', 'Rate-limit API calls to ComfyUI'],
      },
    ],
    { interactive: 'workflow-pipeline' },
  ),

  page(
    ['integration', 'http-api'],
    'HTTP API',
    'REST endpoints for prompts, gallery, and queue.',
    'Integration',
    50,
    [
      ...p(
        'The server exposes JSON APIs for headless use: fetch/update prompts, list gallery items, enqueue renders. Authenticate when exposed beyond localhost.',
      ),
    ],
    { interactive: 'api-endpoint', related: ['integration/workflow-takeover'] },
  ),
]

export function slugToPath(slug: string[]): string {
  if (slug.length === 0) return '/comfyui-prompt-studio'
  return `/comfyui-prompt-studio/${slug.join('/')}`
}

export function slugKey(slug: string[]): string {
  return slug.join('/') || 'index'
}

export function getPageBySlug(slug: string[] | undefined): DocPage | undefined {
  const key = slugKey(slug ?? [])
  return DOC_PAGES.find((p) => slugKey(p.slug) === key)
}

export function getAllPages(): DocPage[] {
  return [...DOC_PAGES].sort((a, b) => a.order - b.order)
}

export function getSections(): { id: string; title: string; pages: DocPage[] }[] {
  const sectionOrder = [
    'Hub',
    'Sales & stories',
    'Introduction',
    'Getting started',
    'Generate',
    'Format & lint',
    'Character',
    'Image tools',
    'Media',
    'Studio',
    'Gallery',
    'Models',
    'Integration',
  ]
  const map = new Map<string, DocPage[]>()
  for (const doc of getAllPages()) {
    const list = map.get(doc.section) ?? []
    list.push(doc)
    map.set(doc.section, list)
  }
  const entries = Array.from(map.entries()).map(([title, pages]) => ({
    id: title.toLowerCase().replace(/\s+/g, '-'),
    title,
    pages: pages.sort((a, b) => a.order - b.order),
  }))
  return entries.sort((a, b) => {
    const ai = sectionOrder.indexOf(a.title)
    const bi = sectionOrder.indexOf(b.title)
    if (ai === -1 && bi === -1) return a.title.localeCompare(b.title)
    if (ai === -1) return 1
    if (bi === -1) return -1
    return ai - bi
  })
}

export const CPS_GITHUB = GH
export const CPS_LIVE = LIVE
