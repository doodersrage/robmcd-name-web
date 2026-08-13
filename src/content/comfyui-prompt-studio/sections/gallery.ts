import { LIVE, p, page } from '../helpers'

export const galleryPages = [
  page(
    ['gallery', 'gallery-overview'],
    'Gallery overview',
    'Stats dashboard, layouts, semantic search, and metadata.',
    'Gallery',
    39,
    [
      ...p(
        `Gallery (${LIVE}/gallery) indexes renders with metadata — prompts, negatives, seeds, model family, campaign, ratings, and embeddings for semantic search. Layouts include grid, dense, and list views plus a stats dashboard at the top.`,
        'Filter by model, campaign, rating, date, or free-text semantic query. IndexedDB (Dexie) caches gallery state locally for fast browsing; server SQLite holds authoritative records and export paths.',
      ),
      { type: 'h2', text: 'Gallery features' },
      {
        type: 'ul',
        items: [
          'Grid / dense / list layouts',
          'Review focus mode for keyboard throughput',
          'Compare modal for side-by-side renders',
          'Semantic search over prompt embeddings',
          'One-click re-queue with quality profile override',
        ],
      },
      { type: 'interactive-slot' },
    ],
    { interactive: 'gallery-review', related: ['gallery/review-mode', 'gallery/queue-orchestration'] },
  ),

  page(
    ['gallery', 'review-mode'],
    'Review mode',
    'Keyboard-driven rating and culling in focus view.',
    'Gallery',
    40,
    [
      ...p(
        'Review mode optimizes throughput for large batches: rate 1–5, flag, archive, or promote without leaving the keyboard. Ratings feed Studio analytics and help filter campaign winners for Final/Max re-queue.',
        'Focus view hides chrome and enlarges the active frame — ideal after Variations matrix sweeps or scheduled campaign batches.',
      ),
      { type: 'interactive-slot' },
      { type: 'h2', text: 'Keyboard shortcuts' },
      {
        type: 'ul',
        items: [
          '1–5 — star rating',
          'Navigate — next/previous in queue',
          'Flag / archive — cull without delete',
          'Compare — open modal with previous pick',
        ],
      },
    ],
    { interactive: 'gallery-review', related: ['studio/analytics-experiments'] },
  ),

  page(
    ['gallery', 'compare-mutate'],
    'Compare & mutate',
    'Prompt diffs and variation launches from gallery picks.',
    'Gallery',
    41,
    [
      ...p(
        'Select two gallery items to see token-level prompt diffs alongside render thumbnails. Mutate launches Variations (`/variations`) from the delta — systematic sweeps on the tags that differ between similar frames.',
        'Compare integrates with Studio lineage — jump to history nodes for either item to see refine ancestry.',
      ),
      { type: 'h2', text: 'Mutate workflow' },
      {
        type: 'ol',
        items: [
          'Pick reference and candidate in Gallery compare',
          'Review token diff highlight',
          'Launch Variations matrix from delta',
          'Review batch in focus mode; promote winners',
        ],
      },
    ],
    { related: ['image-tools/variations-matrix', 'studio/compare-portfolio'] },
  ),

  page(
    ['gallery', 'queue-orchestration'],
    'Queue orchestration',
    'Batch jobs, priorities, and ComfyUI backpressure.',
    'Gallery',
    42,
    [
      ...p(
        'Queue view shows pending ComfyUI jobs sourced from Prompt Studio — Generate sends, Variations batches, campaign schedules, and re-queues from Gallery. Pause, reorder, or cancel when the GPU is saturated.',
        'Dashboard (`/dashboard`) mirrors queue status with pending jobs and recent outputs. Workflow takeover applies live prompt text at queue time for each job.',
      ),
      { type: 'h2', text: 'Backpressure' },
      {
        type: 'ul',
        items: [
          'Pause campaign schedules during manual work',
          'Prioritize Final/Max jobs over Draft exploration',
          'Cancel stale Variations sweeps after review cutoff',
          'Monitor ComfyUI probe status in Settings',
        ],
      },
    ],
    { related: ['integration/workflow-takeover', 'media/workflow-editor'] },
  ),

  page(
    ['gallery', 'export-backup'],
    'Export & backup',
    'Metadata export, backup v2, and external storage.',
    'Gallery',
    43,
    [
      ...p(
        'Export gallery metadata and prompts for backup v2 — JSON bundles include lineage, campaign tags, ratings, and embedded prompt text. Schedule copies to external storage from Settings → Data.',
        'Run backup before client handoff or machine migration. Heal & ready in Settings → Overview validates export path writability and IndexedDB integrity.',
      ),
      { type: 'h2', text: 'Export contents' },
      {
        type: 'ul',
        items: [
          'Prompt + negative + seed + model family',
          'Campaign and topic metadata',
          'Gallery ratings and review flags',
          'Optional media path references',
        ],
      },
    ],
    { related: ['getting-started/environment', 'studio/history-lineage'] },
  ),
]
