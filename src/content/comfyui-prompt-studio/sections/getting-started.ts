import { GH, LIVE, p, page } from '../helpers'

export const gettingStartedPages = [
  page(
    ['getting-started', 'quick-start'],
    'Quick start',
    'Node 22+, clone, env vars, Heal & ready, and your first Send to ComfyUI.',
    'Getting started',
    5,
    [
      {
        type: 'callout',
        variant: 'tip',
        title: 'Requires Node.js 22+',
        text: 'Prompt Studio uses modern Node APIs. Verify with `node -v` before installing.',
      },
      {
        type: 'code',
        code: 'git clone https://github.com/doodersrage/comfyui-prompt-studio\ncd comfyui-prompt-studio\nnpm install\ncp .env.example .env.local\nnpm run dev',
      },
      ...p(
        `Dev server defaults to port 47832. Open ${LIVE}/ for the dashboard and ${LIVE}/gallery for outputs.`,
        'Before generating, set `COMFYUI_API_URL` (your ComfyUI instance), `LLM_MODEL` (text generation), and ideally `LLM_VISION_MODEL` (Image → Prompt and Refine with image hints) in `.env.local`.',
        'On first launch, open Settings → Overview and run **Heal & ready** — this validates LLM connectivity, ComfyUI probe, IndexedDB/Dexie, and default export paths. Then generate on **Generate** (`/`) and click **Send to ComfyUI**.',
      ),
      {
        type: 'links',
        items: [
          { label: 'Configuration & deployment', href: `${GH}/blob/main/docs/configuration.md`, external: true },
          { label: 'Operator guide (day-2 ops)', href: `${GH}/blob/main/docs/operator.md`, external: true },
        ],
      },
    ],
    { related: ['getting-started/environment', 'getting-started/comfyui-nodes'] },
  ),

  page(
    ['getting-started', 'first-run'],
    'First run walkthrough',
    'Dashboard, navigation, workspace mode, and your first generated prompt.',
    'Getting started',
    6,
    [
      ...p(
        'The dashboard (`/dashboard`) shows pending jobs, queue status, recent outputs, and the active project. From there, open **Generate** (`/`) — enter keywords or use random surprise — pick a model family from 40+ targets, set detail level, and generate a model-ready prompt.',
        'Copy the result, send it to Format (`/format`) to adapt for another architecture, or run Lint (`/lint`) before queueing. Quality profiles in the sidebar (Draft / Final / Max) control step counts and recipe aggressiveness when sending to ComfyUI.',
      ),
      { type: 'h2', text: 'Recommended first steps' },
      {
        type: 'ol',
        items: [
          'Run Heal & ready in Settings → Overview',
          'Set default model family and workspace mode (Simple or Studio)',
          'Generate one prompt with Balanced detail on `/`',
          'Run Format + Lint on the output before first GPU burn',
          'Save a template in Studio for repeat use',
        ],
      },
      { type: 'interactive-slot' },
    ],
    { interactive: 'prompt-detail', related: ['introduction/workspace-modes'] },
  ),

  page(
    ['getting-started', 'environment'],
    'Environment & configuration',
    'Ports, env vars, Settings, Plugins, heal, backup, and export directories.',
    'Getting started',
    7,
    [
      ...p(
        'Configuration lives in `.env.local` (server) and Settings (`/settings`) in the UI. Key env vars: `COMFYUI_API_URL`, `LLM_MODEL`, `LLM_VISION_MODEL`, optional `COMFYUI_ROOT` for asset downloads, and auth/SMTP vars for multi-user deployments. See the full env table in the repository configuration docs.',
        'Settings → Overview provides **Heal & ready** (connectivity checks), backup export, and data repair. Settings → LLM configures text and vision models. Settings → ComfyUI covers cluster URLs, workflow library import (API-format JSON), and model asset downloads. Settings → Automation, Data, and Users (SMTP + invite) support team ops.',
      ),
      { type: 'h2', text: 'Settings & plugins' },
      {
        type: 'ul',
        items: [
          'Default port: 47832',
          'IndexedDB (Dexie) for browser settings, history, gallery cache',
          'Gallery export and backup v2 folders — schedule from Settings → Data',
          'Plugins (`/plugins`) — installable manifests for nav items, queue mutators, and custom tool pages',
          'Optional auth, quotas, and per-user gallery for exposed deployments',
        ],
      },
      {
        type: 'links',
        items: [{ label: 'Full configuration doc', href: `${GH}/blob/main/docs/configuration.md`, external: true }],
      },
    ],
    { related: ['getting-started/docker', 'integration/http-api'] },
  ),

  page(
    ['getting-started', 'docker'],
    'Docker deployment',
    'Containerized install for homelab and remote GPU hosts.',
    'Getting started',
    8,
    [
      ...p(
        'Docker Compose bundles the Node app with volume mounts for SQLite, exports, and optional ComfyUI output ingestion. Mount your ComfyUI output folder for automatic gallery indexing when configured.',
        'Set the same env vars as bare-metal install: `COMFYUI_API_URL`, `LLM_MODEL`, `LLM_VISION_MODEL`, and production auth secrets. Health checks and PM2 configs also ship in the repo for non-Docker deployments.',
      ),
      {
        type: 'callout',
        variant: 'info',
        text: 'See the repository docker/ directory and docs/configuration.md for compose files, production checklist, and second-GPU operator notes.',
      },
      {
        type: 'links',
        items: [{ label: 'Configuration & deployment', href: `${GH}/blob/main/docs/configuration.md`, external: true }],
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
        'Custom nodes under `comfyui/comfyui_image_prompt_tools/` register endpoints that read the latest prompt, negative, and metadata from Prompt Studio. Wire them into CLIP text encode nodes instead of static strings — workflow takeover replaces values at queue time.',
        'Import pack-accurate graphs via Settings → ComfyUI → workflow library → Import. Download weights with `COMFYUI_ROOT` set, then Settings → ComfyUI → Model assets.',
      ),
      { type: 'h2', text: 'Install' },
      {
        type: 'ol',
        items: [
          'Copy or submodule `comfyui/comfyui_image_prompt_tools/` into ComfyUI/custom_nodes',
          'Restart ComfyUI and verify probe from Settings → ComfyUI',
          'Add Prompt Studio source nodes to your workflow graph',
          'Enable workflow takeover on the Prompt Studio side before queueing',
        ],
      },
      {
        type: 'links',
        items: [{ label: 'Custom nodes README', href: `${GH}/blob/main/comfyui/comfyui_image_prompt_tools/README.md`, external: true }],
      },
    ],
    { related: ['integration/workflow-takeover'] },
  ),
]
