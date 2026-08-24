import { GH, p, page } from '../helpers'

export const mediaPages = [
  page(
    ['media', 'video'],
    'Video prompts',
    'Motion and camera language for WAN / Hunyuan / LTX locally, or Fal / Replicate / Grok / Gemini clips in the cloud.',
    'Media',
    30,
    [
      ...p(
        'Video (`/video`) targets motion-forward language for WAN 2.2, Rapid AIO, Lightning, Hunyuan Video, and LTX when queueing through ComfyUI. The same tool routes cloud clips through Fal, Replicate, Grok, or Gemini — T2V, I2V, and extend paths — when Settings → Inference engine is configured.',
        'Lint enforces frame-safe descriptions and strips static-only photography tags that confuse T2V and I2V scaffolds. Roleplay **Continue** chains Fal extend-video when the parent clip is Fal; otherwise last-frame I2V applies. Pair Draft quality for motion exploration and Final for delivery clips.',
      ),
      { type: 'h2', text: 'Video prompt style' },
      {
        type: 'ul',
        items: [
          'Lead with subject action and camera movement',
          'Shorter adjective chains than SDXL stills',
          'Avoid "photograph" framing unless I2V from a still',
          'WAN / Hunyuan / LTX each have lint profile overrides',
        ],
      },
    ],
    { related: ['integration/cloud-engines', 'play/roleplay', 'models/video-audio-architectures'] },
  ),

  page(
    ['media', 'audio'],
    'Audio prompts',
    'Stable Audio templates with `{{AUDIO_SECONDS}}` on `/audio`.',
    'Media',
    31,
    [
      ...p(
        'Audio (`/audio`) generates Stable Audio prompts focused on tempo, instrumentation, mood, and SFX description — distinct from image tag soup. Templates include duration placeholders via `{{AUDIO_SECONDS}}` replaced at queue time.',
        'Use natural-language musical descriptors rather than comma-weighted tags. Lint profiles emphasize temporal structure (intro, build, drop) over visual quality tokens.',
      ),
      { type: 'h2', text: 'Template tokens' },
      {
        type: 'ul',
        items: [
          '`{{AUDIO_SECONDS}}` — target clip length',
          'Genre, BPM range, key instruments',
          'Mood and energy curve for generative music',
        ],
      },
    ],
    { related: ['models/video-audio-architectures'] },
  ),

  page(
    ['media', 'mesh-3d'],
    'Mesh & 3D',
    'Hunyuan3D-style prompts on `/mesh` with optional reference image.',
    'Media',
    32,
    [
      ...p(
        'Mesh / 3D (`/mesh`) targets geometry-friendly descriptors for Hunyuan3D-style pipelines: topology hints, material, scale, and silhouette language rather than photographic prose.',
        'Optional reference image upload guides shape intent. Pair with Workflow editor exports when tuning Comfy API graphs for 3D asset generation.',
      ),
      { type: 'h2', text: 'Descriptor focus' },
      {
        type: 'ul',
        items: [
          'Silhouette and topology (low-poly, smooth, hard-surface)',
          'Material and surface finish',
          'Scale relative to familiar objects',
          'Avoid lens/camera tags unless texture-baking stills',
        ],
      },
    ],
    { related: ['media/workflow-editor'] },
  ),

  page(
    ['media', 'workflow-editor'],
    'Workflow editor',
    'Edit Comfy API graphs with React Flow on `/workflow-editor`.',
    'Media',
    33,
    [
      ...p(
        'Workflow editor (`/workflow-editor`) renders Comfy API-format graphs in React Flow — edit prompt nodes, adjust parameters, save to the workflow library, and queue directly. Maps graph nodes to editable prompt fields with snapshots back to Studio templates.',
        'Import pack-accurate graphs via Settings → ComfyUI → workflow library → Import. Workflow takeover at queue time injects live Prompt Studio text into saved graphs without manual CLIP edits.',
      ),
      { type: 'interactive-slot' },
      {
        type: 'links',
        items: [{ label: 'Workflow takeover doc', href: `${GH}/blob/main/docs/workflow-takeover.md`, external: true }],
      },
    ],
    { interactive: 'workflow-pipeline', related: ['integration/workflow-takeover', 'getting-started/comfyui-nodes'] },
  ),
]
