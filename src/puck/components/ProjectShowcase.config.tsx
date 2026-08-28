import type { ComponentConfig } from '@puckeditor/core'

import { ProjectShowcase } from '@/app/components/ui/ProjectShowcase'
import { SITE_LINKS } from '@/lib/site'

type ProjectItem = {
  title: string
  tagline: string
  description: string
  href: string
  linkLabel: string
  external?: boolean | 'internal' | 'external'
}

export type ProjectShowcaseBlockProps = {
  eyebrow: string
  title: string
  description: string
  projects: ProjectItem[]
}

export const ProjectShowcaseConfig: ComponentConfig<ProjectShowcaseBlockProps> = {
  label: 'Project Showcase',
  defaultProps: {
    eyebrow: 'Open source',
    title: 'Built & shipped',
    description: 'Tools and platforms from the workbench.',
    projects: [
      {
        title: 'LLM Prompt Studio',
        tagline: 'ComfyUI + cloud prompt orchestration',
        description:
          'MIT-licensed Next.js app with 28+ tool routes, Cast & Roleplay, Play mode, gallery review, workflow takeover, and desktop/Docker installs.',
        href: '/llm-prompt-studio',
        linkLabel: 'Read the docs',
        external: 'internal',
      },
      {
        title: 'ThermalTrace',
        tagline: 'Probe curves, freeze alerts, and IoT monitoring',
        description:
          'Open-source dashboard at thermaltrace.dev — ESP/Arduino ingest, NWS-backed cold risk, multi-channel alerts, and 89+ guides.',
        href: SITE_LINKS.thermalTrace,
        linkLabel: 'Open live demo',
        external: 'external',
      },
    ],
  },
  fields: {
    eyebrow: { type: 'text', label: 'Eyebrow' },
    title: { type: 'text', label: 'Title' },
    description: { type: 'textarea', label: 'Description' },
    projects: {
      type: 'array',
      label: 'Projects',
      arrayFields: {
        title: { type: 'text', label: 'Title' },
        tagline: { type: 'text', label: 'Tagline' },
        description: { type: 'textarea', label: 'Description' },
        href: { type: 'text', label: 'Link URL' },
        linkLabel: { type: 'text', label: 'Link label' },
        external: {
          type: 'select',
          label: 'Link type',
          options: [
            { label: 'Internal', value: 'internal' },
            { label: 'External', value: 'external' },
          ],
        },
      },
      defaultItemProps: {
        title: 'Project',
        tagline: 'Tagline',
        description: 'Short description',
        href: '/projects',
        linkLabel: 'Learn more',
        external: 'internal',
      },
    },
  },
  render: ({ eyebrow, title, description, projects }) => (
    <ProjectShowcase
      eyebrow={eyebrow || undefined}
      title={title}
      description={description || undefined}
      projects={(projects ?? []).map((p) => ({
        title: p.title,
        tagline: p.tagline,
        description: p.description,
        href: p.href,
        linkLabel: p.linkLabel,
        external: p.external === 'external' || p.external === true,
      }))}
    />
  ),
}
