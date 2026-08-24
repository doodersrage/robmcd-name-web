import { DOCKER_IMAGE, GH, LIVE, RELEASES, p, page } from '../helpers'

export const gettingStartedPages = [
  page(
    ['getting-started', 'quick-start'],
    'Quick start',
    'Node 22+, clone, env vars, Heal & ready, desktop/Docker options, and your first queue.',
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
        code: 'git clone https://github.com/doodersrage/llm-prompt-studio.git\ncd llm-prompt-studio\nnpm install\ncp .env.example .env.local\nnpm run dev',
      },
      ...p(
        `Dev server defaults to port 47832. Open ${LIVE}/ for Generate and ${LIVE}/dashboard for queue status. The canonical repo is \`llm-prompt-studio\`; the old \`comfyui-prompt-studio\` GitHub name redirects here.`,
        'Before generating, set `COMFYUI_API_URL` (your ComfyUI instance), `LLM_MODEL` (text generation), and ideally `LLM_VISION_MODEL` (Image → Prompt and Refine with image hints) in `.env.local`. For cloud stills or clips, add keys in Settings → Inference engine (Fal, Replicate, ChatGPT, Gemini, Grok).',
        'On first launch, open Settings → Overview and run **Heal & ready** — this validates LLM connectivity, ComfyUI probe, IndexedDB/Dexie, and default export paths. Then generate on **Generate** (`/`) and click **Send to ComfyUI** or queue through your selected cloud engine.',
      ),
      { type: 'h2', text: 'Other install paths' },
      {
        type: 'ul',
        items: [
          `Desktop — GitHub Releases: macOS .dmg, Windows .exe, Linux .deb (${RELEASES})`,
          `Docker — \`docker pull ${DOCKER_IMAGE}\` (see docs/configuration.md)`,
          'Tauri desktop builds ship in the repo under desktop/ — same env vars as web',
        ],
      },
      {
        type: 'links',
        items: [
          { label: 'GitHub Releases (desktop)', href: RELEASES, external: true },
          { label: 'Configuration & deployment', href: `${GH}/blob/main/docs/configuration.md`, external: true },
          { label: 'Desktop installers guide', href: `${GH}/blob/main/docs/desktop.md`, external: true },
          { label: 'Operator guide (day-2 ops)', href: `${GH}/blob/main/docs/operator.md`, external: true },
        ],
      },
    ],
    { related: ['getting-started/environment', 'getting-started/docker'] },
  ),

  page(
    ['getting-started', 'first-run'],
    'First run walkthrough',
    'Dashboard, workspace mode, Play vs Studio, and your first generated prompt.',
    'Getting started',
    6,
    [
      ...p(
        'The dashboard (`/dashboard`) shows pending jobs, queue status, recent outputs, and the active project. From there, open **Generate** (`/`) — enter keywords or use random surprise — pick a model family from 40+ targets, set detail level, and generate a model-ready prompt.',
        'Copy the result, send it to Format (`/format`) to adapt for another architecture, or run Lint (`/lint`) before queueing. Quality profiles in the sidebar (Draft / Final / Max) control step counts and recipe aggressiveness. Switch to **Play** mode if your workflow is Cast + Roleplay; stay in **Simple** or **Studio** for batch campaigns.',
      ),
      { type: 'h2', text: 'Recommended first steps' },
      {
        type: 'ol',
        items: [
          'Run Heal & ready in Settings → Overview',
          'Set default model family and workspace mode (Simple, Play, or Studio)',
          'Generate one prompt with Balanced detail on `/`',
          'Run Format + Lint on the output before first GPU or cloud spend',
          'Optional: create a Cast entry at `/characters` for episodic work',
        ],
      },
      { type: 'interactive-slot' },
    ],
    { interactive: 'prompt-detail', related: ['introduction/workspace-modes', 'play/cast'] },
  ),

  page(
    ['getting-started', 'environment'],
    'Environment & configuration',
    'Ports, env vars, Settings, cloud engines, Plugins, heal, backup, and export directories.',
    'Getting started',
    7,
    [
      ...p(
        'Configuration lives in `.env.local` (server) and Settings (`/settings`) in the UI. Key env vars: `COMFYUI_API_URL`, `LLM_MODEL`, `LLM_VISION_MODEL`, optional `COMFYUI_ROOT` for asset downloads, cloud provider keys (Fal, Replicate, etc.), and auth/SMTP vars for multi-user deployments. See the full env table in the repository configuration docs.',
        'Settings → Overview provides **Heal & ready** (connectivity checks), backup export, and data repair. Settings → LLM configures text and vision models. Settings → ComfyUI covers cluster URLs, workflow library import (API-format JSON), and model asset downloads. Settings → Inference engine selects ComfyUI, Diffusers, or cloud providers — set matching env keys or browser-stored keys, then queue (Image 1 becomes img2img when attached).',
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
          'Runway is not exposed in Settings — use Fal/Replicate/Grok/Gemini for cloud clips',
        ],
      },
      {
        type: 'links',
        items: [{ label: 'Full configuration doc', href: `${GH}/blob/main/docs/configuration.md`, external: true }],
      },
    ],
    { related: ['getting-started/docker', 'integration/cloud-engines'] },
  ),

  page(
    ['getting-started', 'docker'],
    'Docker & desktop deployment',
    'Container images, desktop installers, and homelab deployment.',
    'Getting started',
    8,
    [
      ...p(
        `Pull the published image with \`docker pull ${DOCKER_IMAGE}\`. Docker Compose bundles the Node app with volume mounts for SQLite, exports, and optional ComfyUI output ingestion. Mount your ComfyUI output folder for automatic gallery indexing when configured.`,
        'Desktop installers from GitHub Releases (macOS .dmg, Windows .exe, Linux .deb) wrap the same Next.js server with Tauri — configure env vars or use in-app Settings. Set the same keys as bare-metal: `COMFYUI_API_URL`, `LLM_MODEL`, `LLM_VISION_MODEL`, cloud engine keys, and production auth secrets.',
      ),
      {
        type: 'callout',
        variant: 'info',
        text: 'See docs/configuration.md and docs/desktop.md for compose files, production checklist, and second-GPU operator notes.',
      },
      {
        type: 'links',
        items: [
          { label: 'GitHub Releases', href: RELEASES, external: true },
          { label: 'Configuration & deployment', href: `${GH}/blob/main/docs/configuration.md`, external: true },
        ],
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
        'Import pack-accurate graphs via Settings → ComfyUI → workflow library → Import. Download weights with `COMFYUI_ROOT` set, then Settings → ComfyUI → Model assets. Cloud-engine queues bypass ComfyUI graphs entirely — custom nodes apply only to local ComfyUI paths.',
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
