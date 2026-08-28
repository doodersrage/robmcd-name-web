export const SITE_NAME = 'Robmcd.name'
export const SITE_OWNER = 'Robert McDowell'
export const SITE_URL = 'https://robmcd.name'
export const SITE_TAGLINE = 'Cross-Platform Engineering · Legacy Modernization · Infrastructure'
export const SITE_DESCRIPTION =
  'Robert McDowell — 20 years of full-stack engineering across Linux and Windows. Legacy repair, server administration, database optimization, and modern Next.js architectures.'
export const SITE_KEYWORDS = [
  'robert mcdowell',
  'full-stack engineer',
  'legacy modernization',
  'linux server administration',
  'windows server',
  'mysql mssql',
  'next.js',
  'c# dotnet',
  'php wordpress',
  'database administration',
  'llm prompt studio',
  'prompt studio',
  'comfyui',
  'llm tooling',
  'thermaltrace',
  'temperature monitoring',
  'iot',
  'embedded systems',
  'freeze alerts',
]

export const SITE_LINKS = {
  github: 'https://github.com/doodersrage',
  about: '/about',
  contact: '/contact',
  blog: '/blog',
  projects: '/projects',
  work: '/work',
  promptStudio: '/llm-prompt-studio',
  promptStudioGithub: 'https://github.com/doodersrage/llm-prompt-studio',
  promptStudioDocs: 'https://doodersrage.github.io/llm-prompt-studio',
  promptStudioDocker: 'ghcr.io/doodersrage/llm-prompt-studio:latest',
  thermalTrace: 'https://garage-temp.robmcd.name/',
  thermalTraceAbout: 'https://garage-temp.robmcd.name/about',
  thermalTraceGithub: 'https://github.com/doodersrage/garage-temp',
  /** @deprecated Use thermalTrace — same URL, kept for older references */
  garageTemp: 'https://garage-temp.robmcd.name/',
} as const

export type SiteNavItem = {
  id: string
  label: string
  href: string
  external?: boolean
  children?: SiteNavItem[]
}

/** Extra nav tree appended after CMS pages (not managed in Payload). */
export const EXTRA_NAV_TREE: SiteNavItem[] = [
  {
    id: 'work',
    label: 'Work',
    href: SITE_LINKS.work,
    children: [
      { id: 'work-overview', label: 'Case studies', href: SITE_LINKS.work },
      { id: 'work-prompt-studio', label: 'LLM Prompt Studio', href: SITE_LINKS.promptStudio },
      {
        id: 'work-thermaltrace',
        label: 'ThermalTrace',
        href: SITE_LINKS.thermalTrace,
        external: true,
      },
    ],
  },
]
