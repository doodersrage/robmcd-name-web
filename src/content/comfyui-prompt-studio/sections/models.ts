import { GH, p, page } from '../helpers'

export const modelsPages = [
  page(
    ['models', 'model-families'],
    'Model families',
    '40+ ComfyUI targets — FLUX, Qwen, Z-Image, Boogu, SDXL, video, and more.',
    'Models',
    44,
    [
      ...p(
        'Prompt Studio supports 40+ ComfyUI image model targets grouped by architecture family. Natively supported models include built-in scaffolds, Settings → ComfyUI asset downloads, system workflow paths, and full tool coverage on Generate, Refine, Compose, and Image → Prompt.',
        'Each family defines max length, default negatives, lint rules, generation templates, and queue paths. Switching family revalidates all open tools.',
      ),
      { type: 'h2', text: 'Natively supported highlights' },
      {
        type: 'ul',
        items: [
          'FLUX — Dev, Schnell, 2, Klein (4B/9B base + distilled), Inpaint',
          'Qwen Image — 2512, Edit-2511, Lightning, Rapid AIO, Image-2.0',
          'Z-Image — Base, Turbo; Boogu Image — Base, Turbo, Edit, Edit Turbo',
          'SDXL — Base, Refiner, SSD-1B, Segmind Vega',
          'Hunyuan still-image — DiT, Image 2.1, HiDream',
          'WAN / Hunyuan / LTX Video — T2V/I2V on Video tool',
        ],
      },
      { type: 'h2', text: 'Additional families' },
      {
        type: 'ul',
        items: [
          'Stable Diffusion 1.5/2.x — short weighted tags',
          'SD3 / AuraFlow — longer NLP; quote visible text in "quotes"',
          'PixArt, Lumina 2, OmniGen2, Kandinsky 5, Stable Cascade',
          'Instruct/Edit — SD InstructPix2Pix, Lotus-D imperatives',
        ],
      },
      { type: 'interactive-slot' },
      {
        type: 'links',
        items: [{ label: 'Prompt limits doc', href: `${GH}/blob/main/docs/prompt-limits.md`, external: true }],
      },
    ],
    { interactive: 'model-families', related: ['models/flux-sdxl', 'models/prompt-limits'] },
  ),

  page(
    ['models', 'flux-sdxl'],
    'Flux & SDXL',
    'Subject-first FLUX prose vs SDXL natural-language scenes.',
    'Models',
    45,
    [
      ...p(
        'FLUX (Dev, Schnell, 2, Klein, Chroma) prefers subject-first photographic prose — the linter warns on SDXL-style quality tag stuffing. T2I on Generate; img2img/inpaint on Refine, Inpaint, and Outpaint.',
        'SDXL (Base, Refiner, SSD-1B, Segmind Vega) favors natural-language scene descriptions with structured quality and medium tags. T2I scaffolds on Generate; img2img/inpaint via Comfy or optional Diffusers engine.',
      ),
      { type: 'h2', text: 'Cross-family workflow' },
      {
        type: 'ul',
        items: [
          'Explore on FLUX Dev/Schnell with Draft quality',
          'Format (`/format`) winning prompts for SDXL delivery',
          'Lint before Final/Max queue to catch length and tag conflicts',
          'Workflow takeover into existing SDXL graph at queue time',
        ],
      },
    ],
    { related: ['format-and-lint/format', 'generate/model-picker'] },
  ),

  page(
    ['models', 'qwen-edit'],
    'Qwen, Z-Image & Boogu',
    'Edit instructions, ReferenceLatent, and Boogu TI2I paths.',
    'Models',
    46,
    [
      ...p(
        'Qwen Image (Edit, Edit-2511, Image-2512, Image-2.0, Lightning, Rapid AIO) uses edit instructions or factual/rich T2I prose. Multi-ref ReferenceLatent on Refine, Compose, and Image → Prompt.',
        'Z-Image (Base, Turbo) uses photoreal T2I prose with Figure 1 VAEEncode img2img on Refine/Compose. Boogu Image (Base, Turbo, Edit, Edit Turbo) supports photoreal T2I or short edit instructions via TextEncodeBooguEdit on Refine/Compose/Image → Prompt.',
      ),
      { type: 'h2', text: 'Prompt style' },
      {
        type: 'ul',
        items: [
          'Qwen Edit — imperative instructions ("change the jacket to blue")',
          'Z-Image / Boogu T2I — photographic scene prose',
          'Boogu Edit — short instruction TI2I',
          'Auto-switch lint profile when changing variant',
        ],
      },
    ],
    { related: ['format-and-lint/refine', 'image-tools/compose-transfer'] },
  ),

  page(
    ['models', 'video-audio-architectures'],
    'Video & audio architectures',
    'WAN, Hunyuan Video, LTX, and Stable Audio constraints.',
    'Models',
    47,
    [
      ...p(
        'Video families (WAN 2.2, Rapid AIO, Lightning, Hunyuan Video, LTX) cap adjective chains and require motion-forward clauses. Tools route through `/video` with system scaffolds and asset catalog entries.',
        'Stable Audio on `/audio` uses tempo, instrumentation, and `{{AUDIO_SECONDS}}` placeholders — lint profiles emphasize temporal structure over visual quality tokens. Hunyuan3D mesh prompts on `/mesh` use geometry-friendly descriptors.',
      ),
      { type: 'h2', text: 'Route summary' },
      {
        type: 'ul',
        items: [
          'Video — `/video` T2V/I2V',
          'Audio — `/audio` Stable Audio + duration token',
          'Mesh — `/mesh` Hunyuan3D-style + optional reference image',
        ],
      },
    ],
    { related: ['media/video', 'media/audio', 'media/mesh-3d'] },
  ),

  page(
    ['models', 'prompt-limits'],
    'Prompt limits & validation',
    'Character counts, CLIP layers, and truncation behavior.',
    'Models',
    48,
    [
      ...p(
        'Limits are enforced at save and send time per architecture — see prompt-limits.md for the full table. Overflow trims from lowest-priority clauses first (configurable in Settings).',
        'Truncation without review can drop negatives — always read Lint warnings before queueing. Format and Lint both surface approaching-limit advisories before hard truncation.',
      ),
      {
        type: 'callout',
        variant: 'warn',
        text: 'SD3/AuraFlow and Hunyuan families allow longer NLP; FLUX and video families need aggressive brevity — switch detail level before switching family.',
      },
      {
        type: 'links',
        items: [{ label: 'prompt-limits.md', href: `${GH}/blob/main/docs/prompt-limits.md`, external: true }],
      },
    ],
    { related: ['format-and-lint/lint', 'generate/detail-levels'] },
  ),
]
