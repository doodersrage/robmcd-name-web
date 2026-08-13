import { p, page } from '../helpers'

export const formatAndLintPages = [
  page(
    ['format-and-lint', 'format'],
    'Format tool',
    'Adapt existing drafts for any selected model — `/format` is its own route.',
    'Format & lint',
    15,
    [
      ...p(
        'Format (`/format`) reformats an existing prompt draft for a selected architecture. Paste SDXL tag soup and convert to FLUX photographic prose, or adapt FLUX output for Qwen Edit imperatives — without regenerating from scratch.',
        'The tool dedupes tags, fixes parentheses weights, aligns comma vs natural-language conventions, and respects family-specific prompt size limits documented in prompt-limits.md.',
      ),
      { type: 'h2', text: 'Format vs Generate' },
      {
        type: 'ul',
        items: [
          'Generate (`/`) — create new text from keywords or surprise',
          'Format (`/format`) — reshape existing drafts for a different model target',
          'Always run Lint (`/lint`) after Format before queueing expensive renders',
        ],
      },
    ],
    { related: ['format-and-lint/lint', 'models/model-families'] },
  ),

  page(
    ['format-and-lint', 'lint'],
    'Lint tool',
    'Dedicated diagnostics on `/lint` — separate from Format.',
    'Format & lint',
    16,
    [
      ...p(
        'Lint (`/lint`) is a standalone tool — paste prompts for diagnostics, auto-fix, compact, and reformat. It surfaces errors (blocking) and warnings (advisory) per model family before you burn GPU time.',
        'Rulesets cover max token/character limits, conflicting style tags, missing SDXL quality anchors, FLUX brevity hints, Qwen instruction shape, and video motion-forward constraints. Customize rules in Settings.',
      ),
      { type: 'h2', text: 'Lint checks' },
      {
        type: 'ul',
        items: [
          'Length overflow vs architecture prompt limits',
          'Conflicting tags (e.g. photoreal + illustration)',
          'Negative/positive dedupe collisions',
          'Missing required scaffolds per family',
        ],
      },
    ],
    { related: ['format-and-lint/readiness', 'models/prompt-limits'] },
  ),

  page(
    ['format-and-lint', 'refine'],
    'Refine tool',
    'Iterative improvement with image + intent hints on `/refine`.',
    'Format & lint',
    17,
    [
      ...p(
        'Refine (`/refine`) improves an existing prompt using text and optional image hints — stronger lighting, clearer subject, tighter composition — without a full regenerate from Generate.',
        'Supports img2img queue paths on FLUX, Qwen (multi-ref ReferenceLatent), Z-Image (Figure 1 VAEEncode), and Boogu (TextEncodeBooguEdit instruction TI2I). Pair with vision LLM output from Image → Prompt for img2img pipelines.',
      ),
      { type: 'h2', text: 'Refine vs Format' },
      {
        type: 'ul',
        items: [
          'Format — structural adaptation between model families',
          'Refine — creative iteration on intent while preserving core subject',
          'Both should pass Lint before Send to ComfyUI',
        ],
      },
    ],
    { related: ['image-tools/image-to-prompt', 'generate/overview'] },
  ),

  page(
    ['format-and-lint', 'negative'],
    'Negative prompts',
    'Sport-aware negatives and preserve blocks on `/negative`.',
    'Format & lint',
    18,
    [
      ...p(
        'Negative (`/negative`) maintains block libraries for quality, anatomy, style exclusion, and sport-aware preserve prompts on SD-family models. Blocks merge intelligently and dedupe against the positive prompt.',
        'Sport-aware blocks prevent the model from stripping athletic gear, team colors, or action context when negatives are aggressive. Attach blocks per model family — SDXL defaults differ from SD 1.5 weighted tag style.',
      ),
      { type: 'h2', text: 'Block types' },
      {
        type: 'ul',
        items: [
          'Universal quality (blur, watermark, lowres)',
          'Anatomy and hand fixes',
          'Style exclusion (cartoon, oversaturated)',
          'Sport preserve (uniform, equipment, court/field context)',
        ],
      },
    ],
    { related: ['generate/sport-presets', 'format-and-lint/readiness'] },
  ),

  page(
    ['format-and-lint', 'readiness'],
    'Render readiness checklist',
    'Verify a prompt before spending GPU time.',
    'Format & lint',
    19,
    [
      ...p(
        'Run this checklist before every Send to ComfyUI — especially when promoting from Draft to Final or Max quality profiles.',
      ),
      {
        type: 'ol',
        items: [
          'Lint (`/lint`) passes with zero errors',
          'Negative blocks attached via `/negative` where applicable',
          'Model family matches checkpoint and workflow in ComfyUI',
          'Detail level and quality profile match target resolution',
          'Workflow takeover target workflow ID confirmed in Settings',
          'Optional: compare against last good render in Gallery or Studio',
        ],
      },
      {
        type: 'callout',
        variant: 'warn',
        text: 'Truncation without review can drop negatives — always read lint warnings before queueing.',
      },
    ],
    { related: ['gallery/review-mode', 'integration/workflow-takeover'] },
  ),
]
