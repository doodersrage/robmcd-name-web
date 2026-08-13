import { p, page } from '../helpers'

export const imageToolsPages = [
  page(
    ['image-tools', 'image-to-prompt'],
    'Image to prompt',
    'Vision LLM analysis on `/image-prompt`.',
    'Image tools',
    25,
    [
      ...p(
        'Image → Prompt (`/image-prompt`) uploads an image and uses the vision LLM (`LLM_VISION_MODEL`) to write a model-ready prompt. Essential for img2img, variation, and reverse-engineering reference stills.',
        'Always run Format (`/format`) and Lint (`/lint`) on vision output before ComfyUI — vision models may over-tag for SDXL when your target is FLUX, or vice versa. Full tool coverage on Generate, Refine, Compose, and Image → Prompt for natively supported families (FLUX, Qwen, Z-Image, Boogu, SDXL).',
      ),
      { type: 'h2', text: 'Setup' },
      {
        type: 'ul',
        items: [
          'Set `LLM_VISION_MODEL` in `.env.local`',
          'Verify vision connectivity in Settings → Overview Heal & ready',
          'Pick target model family before accepting generated text',
        ],
      },
    ],
    { related: ['format-and-lint/refine', 'getting-started/quick-start'] },
  ),

  page(
    ['image-tools', 'inpaint-outpaint'],
    'Inpaint & outpaint',
    'Region edits with `{{INPUT_IMAGE}}` and `{{MASK_IMAGE}}` tokens.',
    'Image tools',
    26,
    [
      ...p(
        'Inpaint (`/inpaint`) masks a region and queues FLUX/Qwen inpaint workflows with `{{INPUT_IMAGE}}` and `{{MASK_IMAGE}}` placeholder tokens replaced at queue time.',
        'Outpaint (`/outpaint`) expands canvas borders via pad + mask, queueing through the inpaint path with Final quality recipes. Emphasize local change language while preserving context tokens from the base image prompt.',
      ),
      { type: 'h2', text: 'Supported paths' },
      {
        type: 'ul',
        items: [
          'FLUX Dev/Schnell/2/Klein Inpaint variants',
          'Qwen Edit multi-ref on Refine/Inpaint flows',
          'Final quality profile recommended for border expansion',
        ],
      },
    ],
    { related: ['format-and-lint/refine', 'models/flux-sdxl'] },
  ),

  page(
    ['image-tools', 'compose-transfer'],
    'Compose & identity lock',
    'Multi-image transfer on `/compose` with optional identity lock.',
    'Image tools',
    27,
    [
      ...p(
        'Compose (`/compose`) handles multi-image transfer and edit — merge references, apply regional edits, and optionally lock identity across variations. Gallery re-edit handoffs let you send a reviewed frame back into Compose without losing lineage.',
        'Architecture-specific paths: Qwen ReferenceLatent for multi-ref, Z-Image Figure 1 VAEEncode for img2img, Boogu TextEncodeBooguEdit for instruction TI2I. Separate content vs style clauses for clearer CLIP encoding when doing style transfer.',
      ),
      { type: 'h2', text: 'Identity lock' },
      {
        type: 'ul',
        items: [
          'Preserve face/outfit tokens across reference swaps',
          'Regional edit limits changes to masked areas',
          'Pair with Variations matrix for controlled sweeps',
        ],
      },
    ],
    { related: ['character/scene-compose', 'gallery/compare-mutate'] },
  ),

  page(
    ['image-tools', 'controlnet'],
    'ControlNet prompts',
    'Structure-first language on `/controlnet`.',
    'Image tools',
    28,
    [
      ...p(
        'ControlNet (`/controlnet`) generates structure-matched prompts for pose, depth, canny, and image-assisted control types. When structure comes from the control map, positive prompts stay minimal — avoid fighting the preprocessor with redundant composition tags.',
        'Supports text-only and image-assisted modes. Use Concise detail level; run Lint to catch tag conflicts with control type expectations.',
      ),
      { type: 'h2', text: 'Control types' },
      {
        type: 'ul',
        items: [
          'Pose / OpenPose — action verbs, limb visibility',
          'Depth — spatial layering, foreground/background separation',
          'Canny / line — edge fidelity, avoid texture soup',
        ],
      },
    ],
    { related: ['generate/detail-levels', 'format-and-lint/lint'] },
  ),

  page(
    ['image-tools', 'variations-matrix'],
    'Variations matrix',
    'Batch prompt sweeps on `/variations` with ComfyUI queue.',
    'Image tools',
    29,
    [
      ...p(
        'Variations (`/variations`) rolls N prompt variations and batch-queues them to ComfyUI. Build systematic sweeps across seed, detail level, tag swaps, or wardrobe catalog tokens.',
        'Results land in Gallery for side-by-side review. Select winners for Final/Max re-queue; use Compare modal for token-level diffs and Mutate to launch new variation sets from deltas.',
      ),
      { type: 'h2', text: 'Matrix patterns' },
      {
        type: 'ul',
        items: [
          'Single-tag swap (lighting, time of day, lens)',
          'Detail tier sweep (Concise → Rich)',
          'Quality profile sweep (Draft exploration → Final delivery)',
          'Campaign topic rotation with fixed character bible',
        ],
      },
    ],
    { related: ['gallery/compare-mutate', 'gallery/queue-orchestration'] },
  ),
]
