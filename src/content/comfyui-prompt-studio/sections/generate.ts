import { p, page } from '../helpers'

export const generatePages = [
  page(
    ['generate', 'overview'],
    'Generate tool overview',
    'Keywords or random surprise on `/` — model-aware prompt generation.',
    'Generate',
    10,
    [
      ...p(
        'The Generate route (`/`) is the front door for new text. Enter keywords or use random surprise to roll a fresh scene. The tool respects model family token limits, detail tiers (Concise / Balanced / Rich), and optional sport or theme presets.',
        'Output is scaffolded for the selected architecture — FLUX gets subject-first photographic prose, SDXL gets natural-language scene descriptions, Qwen Edit gets short imperatives. One-click actions send to Format, Lint, or ComfyUI with Draft/Final/Max quality profiles.',
      ),
      { type: 'h2', text: 'Capabilities' },
      {
        type: 'ul',
        items: [
          '40+ ComfyUI model targets grouped by architecture family',
          'Sport and theme preset packs for consistent series',
          'Surprise mode for exploration without blank-page paralysis',
          'T2I queue path on Generate; img2img/inpaint routes on Refine and Inpaint tools',
        ],
      },
      { type: 'interactive-slot' },
    ],
    { interactive: 'model-families', related: ['generate/detail-levels', 'format-and-lint/format'] },
  ),

  page(
    ['generate', 'sport-presets'],
    'Sport & theme presets',
    'Structured presets for solo, duo, and sport-aware series output.',
    'Generate',
    12,
    [
      ...p(
        'Sport presets bundle subject, environment, lighting, and camera language for athletic and action scenes. They integrate with Character (`/character`) for solo and duo modes and with Negative (`/negative`) for sport-aware preserve blocks on SD models.',
        'Edit presets in Studio or import JSON packs. Presets respect the active model family — a FLUX sport preset stays concise while an SDXL preset may include medium and quality anchors.',
      ),
      { type: 'h2', text: 'When to use presets' },
      {
        type: 'ul',
        items: [
          'Episodic content needing consistent camera and lighting language',
          'Campaign batches tied to Topics rows in Studio',
          'Quick exploration before locking a Character bible',
        ],
      },
    ],
    { related: ['character/character-tool', 'format-and-lint/negative'] },
  ),

  page(
    ['generate', 'model-picker'],
    'Model picker behavior',
    'How family selection changes limits, negatives, lint, and queue paths.',
    'Generate',
    13,
    [
      ...p(
        'Changing model family revalidates the current prompt, trims overflow, and swaps default negative blocks. FLUX Dev/Schnell/2/Klein differ from SDXL Base/Refiner/SSD-1B in tag density and length caps. Qwen Image (2512, Edit-2511, Lightning), Z-Image, and Boogu Image each have dedicated scaffolds.',
        'The picker also determines queue path: T2I on Generate for most families; img2img and inpaint flow through Refine, Inpaint, and Outpaint with `{{INPUT_IMAGE}}` / `{{MASK_IMAGE}}` tokens where applicable.',
      ),
      { type: 'interactive-slot' },
    ],
    { interactive: 'model-families', related: ['models/model-families', 'models/prompt-limits'] },
  ),

  page(
    ['generate', 'detail-levels'],
    'Detail levels',
    'Concise, Balanced, and Rich — token budget vs descriptive depth.',
    'Generate',
    14,
    [
      ...p(
        'Detail level adjusts generation templates and max length. Use Concise for img2img hints and ControlNet companions; Balanced for daily production; Rich for hero stills and print-bound SDXL work.',
        'Detail tiers interact with quality profiles: Draft exploration may use Concise + Draft quality; Final delivery pairs Rich detail with Final or Max quality recipes when sending to ComfyUI.',
      ),
      { type: 'interactive-slot' },
    ],
    { interactive: 'prompt-detail', related: ['format-and-lint/readiness'] },
  ),
]
