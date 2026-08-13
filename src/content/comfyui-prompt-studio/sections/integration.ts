import { GH, LIVE, p, page } from '../helpers'

export const integrationPages = [
  page(
    ['integration', 'workflow-takeover'],
    'Workflow takeover',
    'Live prompt injection at ComfyUI queue time.',
    'Integration',
    49,
    [
      ...p(
        'Workflow takeover replaces static CLIP text with live Prompt Studio values when a job reaches the ComfyUI queue — no graph rebuild between iterations. Custom nodes under `comfyui/comfyui_image_prompt_tools/` poll or receive updates; Enable per-workflow in Settings before sending.',
        'Inpaint and Outpaint substitute `{{INPUT_IMAGE}}` and `{{MASK_IMAGE}}` at queue time. Audio jobs replace `{{AUDIO_SECONDS}}`. Confirm target workflow ID, preview prompt diff, and rate-limit API calls to ComfyUI on shared hosts.',
      ),
      { type: 'h2', text: 'Safety checklist' },
      {
        type: 'ul',
        items: [
          'Confirm target workflow ID matches imported library graph',
          'Preview diff before apply on production graphs',
          'Verify ComfyUI probe green in Settings → ComfyUI',
          'Use Draft quality for takeover debugging, Final for delivery',
        ],
      },
      { type: 'interactive-slot' },
      {
        type: 'links',
        items: [{ label: 'workflow-takeover.md', href: `${GH}/blob/main/docs/workflow-takeover.md`, external: true }],
      },
    ],
    { interactive: 'workflow-pipeline', related: ['getting-started/comfyui-nodes', 'gallery/queue-orchestration'] },
  ),

  page(
    ['integration', 'http-api'],
    'HTTP API, Settings & Plugins',
    'REST endpoints, GET /api catalog, Settings routes, and plugin manifests.',
    'Integration',
    50,
    [
      ...p(
        'The server exposes JSON APIs for headless use — fetch/update prompts, list gallery items, enqueue renders, health probe, invite, and SMTP hooks. Live catalog: `GET /api` on a running instance (default `${LIVE}/api`). Authenticate when exposed beyond localhost.',
        'Settings (`/settings`) covers Overview (Heal & ready, backup), LLM config, ComfyUI cluster and workflow library, Automation, Data export paths, and Users (SMTP + invite). Plugins (`/plugins`) install manifests that add nav items, queue mutators, and custom tool pages without forking core.',
      ),
      { type: 'h2', text: 'Common endpoints' },
      {
        type: 'ul',
        items: [
          'GET /api — live tool and route catalog',
          'Health and ComfyUI probe routes',
          'Prompt read/write for custom nodes and scripts',
          'Gallery list, metadata, and re-queue actions',
          'CLI: `npm run prompt:cli` for headless generation',
        ],
      },
      { type: 'interactive-slot' },
      {
        type: 'links',
        items: [
          { label: 'http-api.md', href: `${GH}/blob/main/docs/http-api.md`, external: true },
          { label: 'Plugins & Settings in app', href: `${LIVE}/settings`, external: true },
        ],
      },
    ],
    { interactive: 'api-endpoint', related: ['integration/workflow-takeover', 'getting-started/environment'] },
  ),
]
