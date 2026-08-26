export type WorkCaseStudy = {
  slug: string
  title: string
  tagline: string
  description: string
  href?: string
  externalHref?: string
  linkLabel: string
  sections: { heading: string; body: string[] }[]
  stack: string[]
}

export const WORK_CASE_STUDIES: WorkCaseStudy[] = [
  {
    slug: 'llm-prompt-studio',
    title: 'LLM Prompt Studio',
    tagline: 'Self-hosted prompt control plane for ComfyUI and cloud engines',
    description:
      'A production Next.js app that turns keywords into model-ready prompts for image, video, audio, and 3D — with Cast, Roleplay, gallery review, and queue-time workflow takeover.',
    href: '/llm-prompt-studio',
    externalHref: 'https://github.com/doodersrage/llm-prompt-studio',
    linkLabel: 'Read the docs',
    stack: ['Next.js', 'TypeScript', 'ComfyUI', 'Fal / Replicate', 'SQLite', 'Tauri'],
    sections: [
      {
        heading: 'The problem',
        body: [
          'ComfyUI is excellent at rendering, but teams still paste prompts into CLIP nodes, Discord pins, and spreadsheets. Switching FLUX ↔ SDXL ↔ Qwen silently breaks tag density and length limits. Gallery folders become unsearchable PNG dumps.',
          'Prompt Studio owns the text layer: generate, format, lint, character bibles, Cast homes, Roleplay beats, and handoff into ComfyUI or cloud engines — without replacing the graph editor.',
        ],
      },
      {
        heading: 'What shipped',
        body: [
          '28+ tool routes, 40+ model targets, Simple / Play / Studio / Full workspace modes, desktop installers, and Docker images. Gallery review, semantic search, Draft/Final/Max quality profiles, and workflow takeover at queue time.',
          'Full narrative docs live on this site at /llm-prompt-studio; operator reference lives on GitHub Pages.',
        ],
      },
      {
        heading: 'Outcome',
        body: [
          'A reusable open-source product (MIT) that doubles as a portfolio piece for LLM tooling, ComfyUI integration, and edge-ready Next.js architecture — the same stack this marketing site runs on.',
        ],
      },
    ],
  },
  {
    slug: 'garage-temp',
    title: 'Garage Temperature Monitor',
    tagline: 'From DHT22 probes to a live Astro dashboard with weather context',
    description:
      'A public IoT demo that streams garage probe readings, compares them with outdoor weather, and explains the full path from sensor wire to screen.',
    externalHref: 'https://garage-temp.robmcd.name/',
    linkLabel: 'Open live demo',
    stack: ['Astro', 'DHT22', 'Arduino / firmware', 'JSON feeds', 'Weather API'],
    sections: [
      {
        heading: 'The problem',
        body: [
          'Garages swing hard with seasons and sun load. A single thermometer reading does not tell you whether the space is safer for tools, batteries, or storage — especially without outdoor context.',
          'Most hobby dashboards stop at “show a number.” This project closes the loop: probe placement, averaging, historical trends, and clear docs for anyone rebuilding the stack.',
        ],
      },
      {
        heading: 'What shipped',
        body: [
          'Live public readings at garage-temp.robmcd.name with outdoor weather comparison, account hooks for private probes/alerts, and an About section covering firmware, wiring, backend scripts, and the Astro front end — including interactive probe demos and Arduino sketches.',
          'It sits next to Prompt Studio as proof of embedded + web craft: sensors, feeds, and a polished public UI under the same robmcd.name brand.',
        ],
      },
      {
        heading: 'Outcome',
        body: [
          'A working product visitors can open immediately — not a mockup. Useful for clients who need IoT dashboards, telemetry UIs, or “sensor to screen” architecture explained clearly.',
        ],
      },
    ],
  },
  {
    slug: 'legacy-stack-rescue',
    title: 'Legacy stack rescue & headless modernization',
    tagline: 'Stabilize first, then modernize without losing historical data',
    description:
      'Composite consulting pattern: repair aging Windows/Linux servers and C#/PHP apps, then bridge databases into a fast Next.js front end when the business is ready.',
    href: '/projects',
    linkLabel: 'View projects',
    stack: ['C# / .NET', 'PHP', 'MySQL', 'MSSQL', 'Next.js', 'Payload CMS'],
    sections: [
      {
        heading: 'The pattern',
        body: [
          'Inherited stacks rarely need a greenfield rewrite on day one. The first win is usually uptime, query performance, and patching — then a headless front end that keeps years of content intact.',
          'This write-up captures the consulting approach behind client work on robmcd.name: audit → stabilize → optimize → optionally modernize.',
        ],
      },
      {
        heading: 'Typical moves',
        body: [
          'Database bottleneck repair (MySQL/MSSQL), IIS/Nginx and OS hygiene, security patching, and hybrid architectures that keep established backends while shipping Next.js for speed.',
          'When appropriate, Payload or WordPress remains the content engine; the public site becomes a fast, maintainable edge front end.',
        ],
      },
    ],
  },
]

export function getWorkBySlug(slug: string): WorkCaseStudy | undefined {
  return WORK_CASE_STUDIES.find((w) => w.slug === slug)
}
