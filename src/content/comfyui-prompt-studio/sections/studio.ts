import { LIVE, p, page } from '../helpers'

export const studioPages = [
  page(
    ['studio', 'history-lineage'],
    'History & lineage',
    'Iteration trees, parent/child edits, and rollback in Studio.',
    'Studio',
    34,
    [
      ...p(
        'Studio (`/studio`) History tracks every edit with parent/child relationships — refine passes, format conversions, and manual tweaks form an iteration tree. Roll back to any ancestor or branch for A/B experiments without losing the trunk.',
        'Lineage metadata travels to Gallery exports and backup v2 — client handoffs can include prompt diffs between approved frames and their exploration ancestors.',
      ),
      { type: 'h2', text: 'Lineage actions' },
      {
        type: 'ul',
        items: [
          'View diff between any two nodes in the tree',
          'Branch from an ancestor for parallel experiments',
          'Promote a leaf to campaign template',
          'Export subtree as JSON for team sync',
        ],
      },
    ],
    { related: ['studio/compare-portfolio', 'gallery/export-backup'] },
  ),

  page(
    ['studio', 'compare-portfolio'],
    'Compare & portfolio',
    'Side-by-side prompt and render comparison for review.',
    'Studio',
    35,
    [
      ...p(
        'Compare mode in Studio aligns prompts with gallery thumbnails — token-level diffs highlight what changed between similar renders. Portfolio views group best picks for sharing or client review with embedded prompt lineage.',
        'Pair with Gallery compare modal for render-focused review and Studio portfolio export for PDF or JSON deliverables. Keyboard-driven rating from Gallery feeds back into analytics.',
      ),
      { type: 'h2', text: 'Review workflow' },
      {
        type: 'ol',
        items: [
          'Filter campaign outputs in Gallery',
          'Open Compare for prompt diffs',
          'Rate winners 1–5 in review mode',
          'Add top picks to Studio portfolio export',
        ],
      },
    ],
    { related: ['gallery/review-mode', 'gallery/compare-mutate'] },
  ),

  page(
    ['studio', 'templates-presets'],
    'Templates & presets',
    'Reusable starting points across projects and tools.',
    'Studio',
    36,
    [
      ...p(
        'Templates capture tool state — model family, detail level, negative blocks, character attachments, and quality profile. Presets bundle sport/theme/generation defaults for one-click recall on Generate.',
        'Import/export JSON for team sync. Templates integrate with Plugins (`/plugins`) when custom tool pages need shared starting configurations.',
      ),
      { type: 'h2', text: 'Template contents' },
      {
        type: 'ul',
        items: [
          'Model family and lint profile',
          'Negative block selections',
          'Character + wardrobe catalog links',
          'Default quality profile (Draft/Final/Max)',
        ],
      },
    ],
    { related: ['generate/sport-presets', 'character/wardrobe-catalog'] },
  ),

  page(
    ['studio', 'analytics-experiments'],
    'Analytics & experiments',
    'Tag performance, lint failure rates, and A/B tagging.',
    'Studio',
    37,
    [
      ...p(
        'Analytics aggregates review scores, generation counts, lint failure rates, and campaign throughput. Experiments tag A/B runs — compare Draft vs Final quality adoption, or measure wasted render reduction after enabling Lint gates.',
        'Dashboard (`/dashboard`) surfaces high-level queue and output stats; Studio analytics drills into per-campaign and per-model-family breakdowns.',
      ),
      { type: 'h2', text: 'Metrics tracked' },
      {
        type: 'ul',
        items: [
          'Gallery rating distributions (1–5)',
          'Lint errors vs warnings over time',
          'Queue completion and backpressure events',
          'Campaign row completion status',
        ],
      },
    ],
    { related: ['gallery/gallery-overview', 'format-and-lint/lint'] },
  ),

  page(
    ['studio', 'campaigns-scheduled'],
    'Campaigns & scheduling',
    'Batch series with characters, topics, and scheduled queue.',
    'Studio',
    38,
    [
      ...p(
        'Campaigns tie characters, Topics rows, templates, and quality profiles to scheduled batches. Queue integration fires ComfyUI jobs on a cadence — Draft exploration on weeknights, Final/Max promotion on approved winners.',
        'The case study workflow: define character once, create twelve Topics rows, run Draft batches after work, review in Gallery with keyboard ratings, re-queue winners with Final quality and workflow takeover into an existing SDXL graph.',
      ),
      { type: 'h2', text: 'Campaign setup' },
      {
        type: 'ol',
        items: [
          'Create campaign in Studio with name and default template',
          'Attach character bible and wardrobe catalog',
          'Add Topics rows (one per episode or deliverable)',
          'Schedule Draft batches; promote via Gallery review',
        ],
      },
    ],
    { related: ['character/background-topics', 'integration/workflow-takeover'] },
  ),
]
